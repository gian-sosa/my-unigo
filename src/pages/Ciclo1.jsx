import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

function Ciclo1() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showMatematicaLibros, setShowMatematicaLibros] = useState(false);
  const [showFundamentosLibros, setShowFundamentosLibros] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!loading && user === null) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  const toggleMatematicaLibros = () => {
    setShowMatematicaLibros(!showMatematicaLibros);
  };

  const toggleFundamentosLibros = () => {
    setShowFundamentosLibros(!showFundamentosLibros);
  };

  const handleLibroClick = (url) => {
    window.open(url, "_blank");
  };

  // Lista de libros para Matemática Básica
  const librosMatematica = [
    {
      id: 1,
      titulo: "Matemática Básica - Gonzáles, Chacón, Fonseca",
      url: "https://drive.google.com/file/d/1BKGpp1HsjY0hZheOgQrP7tEFsTmwCQjn/view?usp=drive_link",
    },
    {
      id: 2,
      titulo: "Matemática Básica - Figueroa",
      url: "https://drive.google.com/file/d/12Acjz6LH0n_-UqJG9RGqZpOR850eA9Xi/view?usp=drive_link",
    },
    {
      id: 3,
      titulo: "Matemáticas Básicas - Ocaña, Pérez",
      url: "https://drive.google.com/file/d/1ww93Z-x2u-ImBAtm7IC4RAr2MlxqbtEx/view?usp=drive_link",
    },
  ];

  // Lista de libros para Fundamentos de Sistemas de Información
  const librosFundamentos = [
    {
      id: 1,
      titulo:
        "Fundamentos de Sistemas de Información - Guill, Guitart, Joana, Rodriguex",
      url: "https://drive.google.com/file/d/1OrZP6a9S9EGF8puNy7a7UASIYcRB8Sxr/view?usp=drive_link",
    },
  ];

  // Filtrar libros basado en el término de búsqueda
  const librosFiltrados = showMatematicaLibros
    ? librosMatematica.filter((libro) =>
        libro.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : showFundamentosLibros
    ? librosFundamentos.filter((libro) =>
        libro.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

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

      {/* Contenido Principal - Ciclo 1 */}
      <div className="flex-1 w-full px-4 md:px-8 py-8 flex items-start justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center">
            {!showMatematicaLibros && !showFundamentosLibros ? (
              <>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
                  Ciclo 1
                </h1>
                <p className="text-slate-300 text-base md:text-lg mb-8">
                  Elige el curso para acceder a los libros
                </p>

                {/* Grid de materias */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
                  <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-2xl hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                    Comunicación Oral y Escrita
                  </button>
                  <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-2xl hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                    Metodología del Trabajo Universitario
                  </button>
                  <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-2xl hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                    Ciencias Naturales y Medio Ambiente
                  </button>
                  <button
                    onClick={toggleMatematicaLibros}
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-2xl hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg"
                  >
                    Matemática Básica
                  </button>
                  <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-2xl hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                    Filosofía
                  </button>
                  <button
                    onClick={toggleFundamentosLibros}
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-2xl hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg"
                  >
                    Fundamentos de Sistemas de Información
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
              </>
            ) : showFundamentosLibros ? (
              <>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
                  Fundamentos de Sistemas de Información
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
                        className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-2xl hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg"
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
                    onClick={toggleFundamentosLibros}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 font-semibold cursor-pointer"
                  >
                    ← Regresar a cursos
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
                  Matemática Básica
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
                        className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-2xl hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg"
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
                    onClick={toggleMatematicaLibros}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300 font-semibold cursor-pointer"
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

export default Ciclo1;


