import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/Header";

function Ciclo2() {
  const { user, loading } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user === null) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    // Mostrar loader mientras se resuelve la autenticación
    return (
      <div className="absolute inset-0 h-full w-full theme-bg-gradient flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <div className="theme-text-primary text-xl font-medium">
            Cargando...
          </div>
        </div>
      </div>
    );
  }

  if (user === null) {
    // Loader o nada mientras se resuelve la autenticación
    return null;
  }

  return (
    <div className="min-h-screen w-full theme-bg-gradient flex flex-col">
      <Header />

      {/* Contenido Principal - Ciclo 2 */}
      <div className="flex-1 w-full px-4 md:px-8 py-8 pt-24 flex items-start justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-8">
              Ciclo 2
            </h1>
            <p className="theme-text-secondary text-base md:text-lg mb-8">
              Elige el curso para acceder a los libros
            </p>

            {/* Grid de materias */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
              <button className="group theme-card backdrop-blur-sm border theme-text-primary px-6 py-4 rounded-2xl theme-card-hover transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                Comprensión y Producción de Textos
              </button>
              <button className="group theme-card backdrop-blur-sm border theme-text-primary px-6 py-4 rounded-2xl theme-card-hover transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                Sociedad y Cultura
              </button>
              <button className="group theme-card backdrop-blur-sm border theme-text-primary px-6 py-4 rounded-2xl theme-card-hover transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                Realidad Nacional y Mundial
              </button>
              <button className="group theme-card backdrop-blur-sm border theme-text-primary px-6 py-4 rounded-2xl theme-card-hover transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                Liderazgo y Gestión
              </button>
              <button className="group theme-card backdrop-blur-sm border theme-text-primary px-6 py-4 rounded-2xl theme-card-hover transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                Psicología y Desarrollo Humano
              </button>
              <button className="group theme-card backdrop-blur-sm border theme-text-primary px-6 py-4 rounded-2xl theme-card-hover transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                Algoritmos y Solución de Problemas
              </button>
            </div>

            {/* Botón para regresar */}
            <div className="mt-8">
              <button
                onClick={() => navigate("/")}
                className="theme-card backdrop-blur-sm border theme-text-primary px-6 py-3 rounded-xl theme-card-hover transition-all duration-300 font-semibold cursor-pointer"
              >
                ← Regresar al inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ciclo2;

