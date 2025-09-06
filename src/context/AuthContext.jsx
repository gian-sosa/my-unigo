import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabase/supabase.config";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionError, setSessionError] = useState(null);

  // Función para validar la integridad de la sesión
  const validateSession = async (session) => {
    try {
      if (!session || !session.user) {
        return false;
      }

      // Verificar que el token no haya expirado
      const now = Math.floor(Date.now() / 1000);
      if (session.expires_at && session.expires_at < now) {
        console.warn("Sesión expirada");
        return false;
      }

      // Verificar que el usuario tenga los campos necesarios
      const { user_metadata, email } = session.user;
      if (!email || !user_metadata) {
        console.warn("Datos de usuario incompletos");
        return false;
      }

      // Validar que el email termine con @unsch.edu.pe para restricción institucional
      if (!email.endsWith("@unsch.edu.pe")) {
        console.warn(
          "Email no autorizado - solo permitidos emails @unsch.edu.pe"
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error al validar sesión:", error);
      return false;
    }
  };

  async function signInWithGoogle() {
    try {
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
      if (error) throw new Error("Ocurrió un error en la Autenticación");
      return data;
    } catch (error) {
      console.error("Error en login:", error);
      setSessionError("Error al iniciar sesión");
      throw error;
    }
  }

  async function signout() {
    try {
      setSessionError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error("Ocurrió un error al cerrar sesión");
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
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
        console.error("Error al obtener sesión:", error);
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
      console.error("Error al verificar sesión:", error);
      setSessionError("Error de conexión");
      return null;
    }
  };

  useEffect(() => {
    // Verificar sesión inicial
    checkSession().then((session) => {
      if (session && session.user) {
        setUser(session.user.user_metadata);
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
          return;
        }

        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          const isValid = await validateSession(session);

          if (isValid) {
            setUser(session.user.user_metadata);

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

export const userAuth = () => {
  return useContext(AuthContext);
};
