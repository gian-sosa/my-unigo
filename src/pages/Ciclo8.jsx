import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";
import Header from "../components/Header";

function Ciclo8() {
  const { user, loading } = userAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user === null) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    // Mostrar loader mientras se resuelve la autenticación
    return (
      <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <div className="text-white text-xl font-medium">Cargando...</div>
        </div>
      </div>
    );
  }

  if (user === null) {
    // Loader o nada mientras se resuelve la autenticación
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex flex-col">
      <Header />

      {/* Contenido Principal - Ciclo 8 */}
      <div className="flex-1 w-full px-4 md:px-8 py-8 flex items-start justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
              Ciclo 8
            </h1>
            <p className="text-slate-300 text-base md:text-lg mb-8">
              Elige el curso para acceder a los libros
            </p>

            {/* Grid de materias */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-2xl hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                Servicio Social Universitario
              </button>
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-2xl hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                Seminario de Tesis I
              </button>
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-2xl hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                Inteligencia Artificial I
              </button>
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-2xl hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                Telecomunicaciones
              </button>
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-2xl hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                Arquitectura de Software
              </button>
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-2xl hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                Desarrollo Web
              </button>
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-2xl hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                Informática Forense
              </button>
            </div>

            {/* Botón para regresar */}
            <div className="mt-8">
              <button
                onClick={() => navigate("/")}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 font-semibold cursor-pointer"
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

export default Ciclo8;



