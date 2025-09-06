import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabase/supabase.config";
import { logger, prodLogger } from "../utils/logger";
import { validateSessionData, sanitizeForLogging } from "../utils/validation";
import { useSecurityMonitor } from "../utils/security-monitor";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionError, setSessionError] = useState(null);
  const { logEvent, isRateLimited } = useSecurityMonitor();

  // Función para validar la integridad de la sesión
  const validateSession = async (session) => {
    try {
      // Usar validación centralizada y segura
      const validation = validateSessionData(session);

      if (!validation.valid) {
        logger.warn("Validación de sesión falló:", validation.error);
        prodLogger.error("Session validation failed", {
          reason: validation.error,
        });

        // Si es un problema de dominio o sesión expirada, cerrar sesión
        if (
          validation.error.includes("dominio") ||
          validation.error.includes("expirada")
        ) {
          await supabase.auth.signOut();
          setUser(null);
        }

        return false;
      }

      return true;
    } catch (error) {
      logger.error("Error al validar sesión:", sanitizeForLogging(error));
      prodLogger.error("Session validation failed");
      return false;
    }
  };

  async function signInWithGoogle() {
    try {
      // Verificar rate limiting antes del intento de login
      if (isRateLimited()) {
        const error = new Error(
          "Demasiados intentos fallidos. Intenta en 15 minutos."
        );
        logEvent("RATE_LIMITED_LOGIN", {
          reason: "Too many failed attempts",
        });
        throw error;
      }

      setSessionError(null);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            prompt: "select_account", // Muestra cuentas ya logueadas para elegir
            access_type: "online", // No requiere refresh token, más rápido
            hd: "unsch.edu.pe", // Restricción a dominio institucional
          },
        },
      });

      if (error) {
        logEvent("LOGIN_FAILED", {
          provider: "google",
          error: error.message,
        });
        throw new Error("Ocurrió un error en la Autenticación");
      }

      logEvent("LOGIN_ATTEMPT", {
        provider: "google",
      });

      return data;
    } catch (error) {
      logger.error("Error en login:", sanitizeForLogging(error));
      prodLogger.error("Login failed");
      setSessionError("Error al iniciar sesión");
      throw error;
    }
  }

  async function signout() {
    try {
      setSessionError(null);
      logEvent("LOGOUT", {
        userEmail: user?.email ? "authenticated_user" : "unknown",
      });

      const { error } = await supabase.auth.signOut();
      if (error) throw new Error("Ocurrió un error al cerrar sesión");
      setUser(null);
    } catch (error) {
      logger.error("Error al cerrar sesión:", sanitizeForLogging(error));
      prodLogger.error("Logout failed");
      setSessionError("Error al cerrar sesión");
      throw error;
    }
  }

  // Función para verificar la sesión actual
  const checkSession = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        logger.error("Error al obtener sesión:", error);
        prodLogger.error("Session retrieval failed");
        setSessionError("Error de autenticación");
        return null;
      }

      if (session) {
        const isValid = await validateSession(session);
        if (!isValid) {
          await signout();
          return null;
        }
      }

      return session;
    } catch (error) {
      logger.error("Error al verificar sesión:", error);
      prodLogger.error("Session check failed");
      setSessionError("Error de conexión");
      return null;
    }
  };

  useEffect(() => {
    // Verificar sesión inicial
    checkSession().then((session) => {
      if (session && session.user) {
        setUser(session.user.user_metadata);
        logEvent("SESSION_RESTORED", {
          userEmail: "authenticated_user",
        });
      }
      setLoading(false);
    });

    // Escuchar cambios de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setLoading(true);
        setSessionError(null);

        if (event === "SIGNED_OUT" || session === null) {
          setUser(null);
          setLoading(false);
          logEvent("SESSION_ENDED", {
            event: event,
          });
          return;
        }

        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          const isValid = await validateSession(session);

          if (isValid) {
            setUser(session.user.user_metadata);
            logEvent("LOGIN_SUCCESS", {
              event: event,
              provider: "google",
            });

            // Limpiar el hash de la URL si contiene access_token (OAuth)
            if (
              window.location.hash &&
              window.location.hash.includes("access_token")
            ) {
              window.history.replaceState(
                null,
                "",
                window.location.pathname + window.location.search
              );
            }
          } else {
            // Sesión inválida - cerrar sesión y mostrar mensaje específico
            setSessionError(
              "Email no autorizado. Solo se permiten emails del dominio @unsch.edu.pe"
            );
            await signout();
          }
        }

        setLoading(false);
      }
    );

    // Verificar sesión cada 5 minutos para detectar tokens expirados
    const sessionCheckInterval = setInterval(async () => {
      const currentSession = await checkSession();
      if (!currentSession && user) {
        setUser(null);
        setSessionError(
          "Sesión expirada. Por favor, inicia sesión nuevamente."
        );
      }
    }, 5 * 60 * 1000); // 5 minutos

    return () => {
      authListener?.subscription.unsubscribe();
      clearInterval(sessionCheckInterval);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signout,
        loading,
        sessionError,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthContextProvider");
  }
  return context;
};
