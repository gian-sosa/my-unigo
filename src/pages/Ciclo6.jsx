import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/Header";

function Ciclo6() {
  const { user, loading } = useAuth();
  const { isDark } = useTheme();
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
    {
      id: 2,
      titulo:
        "Sistemas Digitales Principios y Aplicaciones - Tocci, Widmer, Moss",
      url: "https://drive.google.com/file/d/15Zpi6uImOR1T4mAknRdgCvMiIOlZNGB4/view?usp=drive_link",
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

      {/* Contenido Principal - Ciclo 6 */}
      <div className="flex-1 w-full px-4 md:px-8 py-8 flex items-start justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center">
            {!showSistemasDigitalesLibros ? (
              <>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 dark:from-blue-400 dark:to-purple-400">
                  Ciclo 6
                </h1>
                <p className="theme-text-secondary text-base md:text-lg mb-8">
                  Elige el curso para acceder a los libros
                </p>

                {/* Grid de materias */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
                  <button className="group theme-card backdrop-blur-sm border theme-text-primary px-6 py-4 rounded-2xl theme-card-hover transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                    <div className="text-base group-hover:text-blue-300 transition-colors duration-300">
                      Gestión de Entornos de Bases de Datos
                    </div>
                  </button>
                  <button
                    onClick={toggleSistemasDigitalesLibros}
                    className="group theme-card backdrop-blur-sm border theme-text-primary px-6 py-4 rounded-2xl theme-card-hover transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg"
                  >
                    <div className="text-base group-hover:text-blue-300 transition-colors duration-300">
                      Sistemas Digitales y Arquitectura de Computadoras
                    </div>
                  </button>
                  <button className="group theme-card backdrop-blur-sm border theme-text-primary px-6 py-4 rounded-2xl theme-card-hover transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                    <div className="text-base group-hover:text-blue-300 transition-colors duration-300">
                      Sistemas Operativos
                    </div>
                  </button>
                  <button className="group theme-card backdrop-blur-sm border theme-text-primary px-6 py-4 rounded-2xl theme-card-hover transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                    <div className="text-base group-hover:text-blue-300 transition-colors duration-300">
                      Innovación Tecnológica, Creatividad y Emprendimiento
                    </div>
                  </button>
                  <button className="group theme-card backdrop-blur-sm border theme-text-primary px-6 py-4 rounded-2xl theme-card-hover transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg">
                    <div className="text-base group-hover:text-blue-300 transition-colors duration-300">
                      Construcción y Evolución de Software
                    </div>
                  </button>
                </div>

                {/* Botón para regresar */}
                <div className="mt-8">
                  <button
                    onClick={() => navigate("/")}
                    className="theme-card backdrop-blur-sm border theme-text-primary px-6 py-3 rounded-xl theme-card-hover transition-all duration-300 font-semibold cursor-pointer"
                  >
                    ← Regresar al Inicio
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 dark:from-blue-400 dark:to-purple-400">
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
                      className="w-full px-4 py-3 pl-10 theme-input theme-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    />
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 theme-text-secondary"
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
                        className="group theme-card backdrop-blur-sm border theme-text-primary px-6 py-4 rounded-2xl theme-card-hover transition-all duration-300 font-semibold cursor-pointer hover:shadow-lg text-left"
                      >
                        <div className="flex items-center gap-3">
                          <svg
                            className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300 flex-shrink-0 dark:text-blue-300 dark:group-hover:text-blue-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                          {libro.titulo}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <p className="theme-text-secondary text-lg">
                        No se encontraron libros que coincidan con tu búsqueda
                      </p>
                    </div>
                  )}
                </div>

                {/* Botón para regresar */}
                <div className="mt-8">
                  <button
                    onClick={toggleSistemasDigitalesLibros}
                    className="theme-card backdrop-blur-sm border theme-text-primary px-6 py-3 rounded-xl theme-card-hover transition-all duration-300 font-semibold cursor-pointer"
                  >
                    ← Regresar a Cursos
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


