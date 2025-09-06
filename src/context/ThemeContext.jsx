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
    // Verificar preferencia guardada en localStorage
    const savedTheme = localStorage.getItem("theme");
    console.log("💾 Tema guardado:", savedTheme);
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // Si no hay preferencia guardada, empezar con modo claro para pruebas
    console.log("🆕 No hay tema guardado, usando modo claro por defecto");
    return false; // Cambié de detectar sistema a false (modo claro)
  });

  useEffect(() => {
    // Aplicar la clase al documento
    console.log("🎨 Cambiando tema a:", isDark ? "oscuro" : "claro");
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    console.log(
      "📱 Clases del documento:",
      document.documentElement.classList.toString()
    );
  }, [isDark]);

  const toggleTheme = () => {
    console.log("🔄 Toggle theme clicked, current isDark:", isDark);
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
