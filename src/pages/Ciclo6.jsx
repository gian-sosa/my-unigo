import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";
import Header from "../components/Header";

function Ciclo6() {
  const { user, loading } = userAuth();
  const navigate = useNavigate();
  const [showSistemasDigitalesLibros, setShowSistemasDigitalesLibros] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!loading && user === null) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  const toggleSistemasDigitalesLibros = () => {
    setShowSistemasDigitalesLibros(!showSistemasDigitalesLibros);
  };

  const handleLibroClick = (url) => {
    window.open(url, "_blank");
  };

  // Lista de libros para Sistemas Digitales y Arquitectura de Computadoras
  const librosSistemasDigitales = [
    {
      id: 1,
      titulo: "Fundamentos de Sistemas Digitales - Floyd",
      url: "https://drive.google.com/file/d/1BrasZI_NauCL2nKBUcXkgUDJvPbnqM_t/view?usp=drive_link",
    },
  ];

  // Filtrar libros basado en el término de búsqueda
  const librosFiltrados = showSistemasDigitalesLibros
    ? librosSistemasDigitales.filter((libro) =>
        libro.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

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
            {!showSistemasDigitalesLibros ? (
              <>
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
                  <button
                    onClick={toggleSistemasDigitalesLibros}
                    className="bg-[#222831] hover:bg-[#2A3038] text-[#DFD0B8] px-8 py-6 rounded-lg transition-colors duration-200 font-medium cursor-pointer text-lg shadow-lg hover:shadow-xl"
                  >
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
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-6xl font-bold text-[#DFD0B8] mb-8">
                  Sistemas Digitales y Arquitectura de Computadoras
                </h1>

                {/* Buscador de libros */}
                <div className="max-w-md mx-auto mb-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar libros..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 pl-10 bg-[#222831] text-[#DFD0B8] border border-[#393E46] rounded-lg focus:outline-none focus:border-[#DFD0B8] transition-colors duration-200"
                    />
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#817d74]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Grid de libros */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
                  {librosFiltrados.length > 0 ? (
                    librosFiltrados.map((libro) => (
                      <button
                        key={libro.id}
                        onClick={() => handleLibroClick(libro.url)}
                        className="bg-[#222831] hover:bg-[#2A3038] text-[#DFD0B8] px-8 py-6 rounded-lg transition-colors duration-200 font-medium cursor-pointer text-lg shadow-lg hover:shadow-xl"
                      >
                        {libro.titulo}
                      </button>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <p className="text-[#817d74] text-lg">
                        No se encontraron libros que coincidan con tu búsqueda
                      </p>
                    </div>
                  )}
                </div>

                {/* Botón para regresar */}
                <div className="mt-8">
                  <button
                    onClick={toggleSistemasDigitalesLibros}
                    className="bg-[#222831] text-[#DFD0B8] px-6 py-3 rounded-md hover:bg-[#2A3038] transition-colors duration-200 font-medium cursor-pointer"
                  >
                    ← Regresar a cursos
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ciclo6;
