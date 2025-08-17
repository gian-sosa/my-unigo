import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";
import Header from "../components/Header";

function Ciclo6() {
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
      <div className="absolute inset-0 h-full w-full bg-[#393E46] flex items-center justify-center">
        <div className="text-[#DFD0B8] text-xl">Cargando...</div>
      </div>
    );
  }

  if (user === null) {
    // Loader o nada mientras se resuelve la autenticación
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-[#393E46] flex flex-col">
      <Header />

      {/* Contenido Principal - Ciclo 6 */}
      <div className="flex-1 w-full px-4 md:px-8 py-8 flex items-start justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#DFD0B8] mb-8">
              Ciclo 6
            </h1>
            <p className="text-[#DFD0B8] text-lg md:text-xl opacity-80 mb-8">
              Elige el curso para acceder a los libros
            </p>

            {/* Grid de materias */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
              <button className="bg-[#222831] hover:bg-[#2A3038] text-[#DFD0B8] px-8 py-6 rounded-lg transition-colors duration-200 font-medium cursor-pointer text-lg shadow-lg hover:shadow-xl">
                Gestión de Entornos de Bases de Datos
              </button>
              <button className="bg-[#222831] hover:bg-[#2A3038] text-[#DFD0B8] px-8 py-6 rounded-lg transition-colors duration-200 font-medium cursor-pointer text-lg shadow-lg hover:shadow-xl">
                Sistemas Digitales y Arquitectura de Computadoras
              </button>
              <button className="bg-[#222831] hover:bg-[#2A3038] text-[#DFD0B8] px-8 py-6 rounded-lg transition-colors duration-200 font-medium cursor-pointer text-lg shadow-lg hover:shadow-xl">
                Sistemas Operativos
              </button>
              <button className="bg-[#222831] hover:bg-[#2A3038] text-[#DFD0B8] px-8 py-6 rounded-lg transition-colors duration-200 font-medium cursor-pointer text-lg shadow-lg hover:shadow-xl">
                Innovación Tecnológica, Creatividad y Emprendimiento
              </button>
              <button className="bg-[#222831] hover:bg-[#2A3038] text-[#DFD0B8] px-8 py-6 rounded-lg transition-colors duration-200 font-medium cursor-pointer text-lg shadow-lg hover:shadow-xl">
                Construcción y Evolución de Software
              </button>
            </div>

            {/* Botón para regresar */}
            <div className="mt-8">
              <button
                onClick={() => navigate("/")}
                className="bg-[#222831] text-[#DFD0B8] px-6 py-3 rounded-md hover:bg-[#2A3038] transition-colors duration-200 font-medium cursor-pointer"
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

export default Ciclo6;
