import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/Header";

function Home() {
  const { user, loading } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

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
      {/* Ciclos Grid */}
      <div className="flex-1 w-full px-4 md:px-8 py-8 flex items-center justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 dark:from-blue-400 dark:to-purple-400">
              Bienvenido a UniGo
            </h1>
            <p className="theme-text-secondary text-base md:text-lg">
              Selecciona tu ciclo académico para acceder a los recursos
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            <button
              onClick={() => navigate("/ciclo1")}
              className="group theme-card backdrop-blur-sm border theme-text-primary text-center p-4 md:p-6 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer"
            >
              <div className="text-lg md:text-xl font-bold mb-2 group-hover:text-slate-800 transition-colors duration-300 dark:group-hover:text-blue-500">
                Ciclo 1
              </div>
              <div className="text-sm theme-text-secondary group-hover:opacity-80 transition-colors duration-300">
                Primer ciclo académico
              </div>
            </button>
            <button
              onClick={() => navigate("/ciclo2")}
              className="group theme-card backdrop-blur-sm border theme-text-primary text-center p-4 md:p-6 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer"
            >
              <div className="text-lg md:text-xl font-bold mb-2 group-hover:text-slate-800 transition-colors duration-300 dark:group-hover:text-blue-500">
                Ciclo 2
              </div>
              <div className="text-sm theme-text-secondary group-hover:opacity-80 transition-colors duration-300">
                Segundo ciclo académico
              </div>
            </button>
            <button
              onClick={() => navigate("/ciclo3")}
              className="group theme-card backdrop-blur-sm border theme-text-primary text-center p-4 md:p-6 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer"
            >
              <div className="text-lg md:text-xl font-bold mb-2 group-hover:text-slate-800 transition-colors duration-300 dark:group-hover:text-blue-500">
                Ciclo 3
              </div>
              <div className="text-sm theme-text-secondary group-hover:opacity-80 transition-colors duration-300">
                Tercer ciclo académico
              </div>
            </button>
            <button
              onClick={() => navigate("/ciclo4")}
              className="group theme-card backdrop-blur-sm border theme-text-primary text-center p-4 md:p-6 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer"
            >
              <div className="text-lg md:text-xl font-bold mb-2 group-hover:text-slate-800 transition-colors duration-300 dark:group-hover:text-blue-500">
                Ciclo 4
              </div>
              <div className="text-sm theme-text-secondary group-hover:opacity-80 transition-colors duration-300">
                Cuarto ciclo académico
              </div>
            </button>
            <button
              onClick={() => navigate("/ciclo5")}
              className="group theme-card backdrop-blur-sm border theme-text-primary text-center p-4 md:p-6 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer"
            >
              <div className="text-lg md:text-xl font-bold mb-2 group-hover:text-slate-800 transition-colors duration-300 dark:group-hover:text-blue-500">
                Ciclo 5
              </div>
              <div className="text-sm theme-text-secondary group-hover:opacity-80 transition-colors duration-300">
                Quinto ciclo académico
              </div>
            </button>
            <button
              onClick={() => navigate("/ciclo6")}
              className="group theme-card backdrop-blur-sm border theme-text-primary text-center p-4 md:p-6 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer"
            >
              <div className="text-lg md:text-xl font-bold mb-2 group-hover:text-slate-800 transition-colors duration-300 dark:group-hover:text-blue-500">
                Ciclo 6
              </div>
              <div className="text-sm theme-text-secondary group-hover:opacity-80 transition-colors duration-300">
                Sexto ciclo académico
              </div>
            </button>
            <button
              onClick={() => navigate("/ciclo7")}
              className="group theme-card backdrop-blur-sm border theme-text-primary text-center p-4 md:p-6 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer"
            >
              <div className="text-lg md:text-xl font-bold mb-2 group-hover:text-slate-800 transition-colors duration-300 dark:group-hover:text-blue-500">
                Ciclo 7
              </div>
              <div className="text-sm theme-text-secondary group-hover:opacity-80 transition-colors duration-300">
                Séptimo ciclo académico
              </div>
            </button>
            <button
              onClick={() => navigate("/ciclo8")}
              className="group theme-card backdrop-blur-sm border theme-text-primary text-center p-4 md:p-6 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer"
            >
              <div className="text-lg md:text-xl font-bold mb-2 group-hover:text-slate-800 transition-colors duration-300 dark:group-hover:text-blue-500">
                Ciclo 8
              </div>
              <div className="text-sm theme-text-secondary group-hover:opacity-80 transition-colors duration-300">
                Octavo ciclo académico
              </div>
            </button>
            <button
              onClick={() => navigate("/ciclo9")}
              className="group theme-card backdrop-blur-sm border theme-text-primary text-center p-4 md:p-6 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer"
            >
              <div className="text-lg md:text-xl font-bold mb-2 group-hover:text-slate-800 transition-colors duration-300 dark:group-hover:text-blue-500">
                Ciclo 9
              </div>
              <div className="text-sm theme-text-secondary group-hover:opacity-80 transition-colors duration-300">
                Noveno ciclo académico
              </div>
            </button>
            <button
              onClick={() => navigate("/ciclo10")}
              className="group theme-card backdrop-blur-sm border theme-text-primary text-center p-4 md:p-6 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer"
            >
              <div className="text-lg md:text-xl font-bold mb-2 group-hover:text-slate-800 transition-colors duration-300 dark:group-hover:text-blue-500">
                Ciclo 10
              </div>
              <div className="text-sm theme-text-secondary group-hover:opacity-80 transition-colors duration-300">
                Décimo ciclo académico
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
