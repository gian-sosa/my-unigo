import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabase/supabase.config";
import { validateSessionData } from "../utils/validation";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionError, setSessionError] = useState(null);

  // Función para validar la integridad de la sesión
  const validateSession = async (session) => {
    try {
      const validation = validateSessionData(session);

      if (!validation.valid) {
        console.warn("Validación de sesión falló:", validation.error);

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
            access_type: "offline",
            prompt: "select_account",
          },
        },
      });

      if (error) {
        console.error("Error en login:", error);
        setSessionError(error.message);
        throw error;
      }
    } catch (error) {
      console.error("Error en login:", error);
      setSessionError("Error al iniciar sesión con Google");
      throw error;
    }
  }

  async function signout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setSessionError(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      throw error;
    }
  }

  // Obtener la sesión actual
  const getSession = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error al obtener sesión:", error);
        return null;
      }
      return session;
    } catch (error) {
      console.error("Error al verificar sesión:", error);
      return null;
    }
  };

  useEffect(() => {
    // Verificar sesión inicial
    const checkSession = async () => {
      try {
        const session = await getSession();

        if (session?.user) {
          // Validar la sesión antes de aceptarla
          const isValid = await validateSession(session);

          if (isValid) {
            setUser(session.user);
          } else {
            setUser(null);
            setSessionError("Sesión inválida o expirada");
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error al verificar sesión inicial:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Escuchar cambios de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || session === null) {
        setUser(null);
        setSessionError(null);
      } else if (event === "SIGNED_IN" && session) {
        const isValid = await validateSession(session);

        if (isValid) {
          setUser(session.user);
          setSessionError(null);
        } else {
          setUser(null);
          setSessionError("Email no autorizado. Solo se permite @unsch.edu.pe");
          await supabase.auth.signOut();
        }
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    sessionError,
    signInWithGoogle,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de AuthContextProvider");
  }
  return context;
};
