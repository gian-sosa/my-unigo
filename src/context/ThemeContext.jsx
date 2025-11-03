import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Solo verificar preferencia guardada en localStorage
    // NUNCA detectar el tema del sistema operativo
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      return true;
    }
    if (savedTheme === "light") {
      return false;
    }
    // Si no hay preferencia guardada, SIEMPRE empezar con modo claro
    return false;
  });

  useEffect(() => {
    // Aplicar la clase al documento al inicializar y cuando cambie isDark
    // Limpiar todas las clases relacionadas con tema primero
    document.documentElement.classList.remove("dark", "light");
    document.body.classList.remove("dark", "light");

    if (isDark) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      document.body.classList.add("light");
      document.documentElement.style.colorScheme = "light";
      localStorage.setItem("theme", "light");
    }

    // Forzar que el documento ignore el tema del sistema
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }, [isDark]);

  // useEffect adicional para forzar el tema al montar el componente
  useEffect(() => {
    // Forzar la aplicación del tema al inicializar la aplicación
    // Esto previene que el navegador use el tema del sistema antes de que React se monte
    const applyInitialTheme = () => {
      document.documentElement.classList.remove("dark", "light");
      document.body.classList.remove("dark", "light");

      if (isDark) {
        document.documentElement.classList.add("dark");
        document.body.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
      } else {
        document.documentElement.classList.add("light");
        document.body.classList.add("light");
        document.documentElement.style.colorScheme = "light";
      }

      document.documentElement.dataset.theme = isDark ? "dark" : "light";
    };

    applyInitialTheme();
  }, []); // Solo se ejecuta al montar

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
