import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabase/supabase.config";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  async function signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw new Error("Ocurrió un error en la Autenticación");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function signout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error("Ocurrió un error al cerrar sesión");
  }

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("supabase event ", event);
        setLoading(false);
        if (session == null) {
          setUser(null);
          // No redirigir, HomeOrLogin se encarga
        } else {
          setUser(session?.user.user_metadata);
          console.log("Data de usuario ", session?.user.user_metadata);
          // Limpiar el hash de la URL si contiene access_token (OAuth) SOLO después de que la sesión es válida
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
          // No redirigir, HomeOrLogin se encarga
        }
      }
    );
    return () => {
      authListener?.subscription;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const userAuth = () => {
  return useContext(AuthContext);
};
