import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";

function Ciclo1() {
  const { user, signout, loading } = userAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMatematicaLibros, setShowMatematicaLibros] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!loading && user === null) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSignout = async () => {
    await signout();
    navigate("/", { replace: true }); // Login ahora en '/'
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const toggleMatematicaLibros = () => {
    setShowMatematicaLibros(!showMatematicaLibros);
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

  // Filtrar libros basado en el término de búsqueda
  const librosFiltrados = librosMatematica.filter((libro) =>
    libro.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      {/* Header */}
      <div className="w-full bg-[#222831] text-[#DFD0B8] relative">
        <div className="h-16 md:h-20 px-4 md:px-8 flex items-center justify-between max-w-7xl mx-auto relative">
          {/* Logo centrado en móvil, izquierda en desktop */}
          <h1
            onClick={() => navigate("/")}
            className="text-2xl md:text-4xl font-medium md:relative absolute left-1/2 transform -translate-x-1/2 md:transform-none md:left-auto cursor-pointer hover:opacity-80 transition-opacity duration-200"
          >
            UniGo
          </h1>
          {/* Desktop Profile Menu - Solo visible en pantallas grandes */}
          <div className="hidden md:block relative">
            <div
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={toggleDropdown}
            >
              <img
                src={user?.picture}
                alt="Foto de perfil"
                className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
              />
              <h2 className="text-sm lg:text-base">{user?.name}</h2>
              {user?.email?.endsWith("@cidie.edu.pe") && (
                <div className="relative group">
                  <svg
                    className="w-4 h-4 text-blue-500 cursor-pointer"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-500 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                    Verificado UNSCH
                  </span>
                </div>
              )}
            </div>

            {showDropdown && (
              <div className="absolute right-0 top-12 bg-[#222831] border border-[#393E46] rounded-md shadow-lg z-20 min-w-48">
                <div className="p-3 border-b border-[#393E46]">
                  {/* <p className="text-sm text-[#DFD0B8] font-medium">
                    {user?.name}
                  </p> */}
                  <p className="text-xs text-[#817d74]">{user?.email}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => {
                      handleSignout();
                      closeDropdown();
                    }}
                    className="w-full text-left px-3 py-2 text-[#DFD0B8] hover:bg-[#393E46] rounded-md transition-colors duration-200 cursor-pointer"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            )}

            {showDropdown && (
              <div className="fixed inset-0 z-10" onClick={closeDropdown}></div>
            )}
          </div>

          {/* Mobile Hamburger Menu - Solo visible en móvil */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-[#DFD0B8] hover:bg-[#393E46] rounded-md transition-colors duration-200 cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="absolute top-full left-0 right-0 bg-[#222831] border-t border-[#393E46] border-b-2 border-b-[#393E46] shadow-lg z-30 md:hidden">
            <div className="px-4 py-3 space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-[#393E46]">
                <img
                  src={user?.picture}
                  alt="Foto de perfil"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[#DFD0B8] font-medium">{user?.name}</p>
                    {user?.email?.endsWith("@cidie.edu.pe") && (
                      <div className="relative group">
                        <svg
                          className="w-4 h-4 text-blue-500 cursor-pointer"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                          Verificado UNSCH
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-[#817d74]">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSignout();
                  closeMobileMenu();
                }}
                className="w-full text-center px-3 py-3 text-[#DFD0B8] hover:bg-[#393E46] rounded-md transition-colors duration-200 cursor-pointer"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu Overlay */}
        {showMobileMenu && (
          <div
            className="fixed inset-0 z-20 md:hidden"
            onClick={closeMobileMenu}
          ></div>
        )}
      </div>

      {/* Contenido Principal - Ciclo 1 */}
      <div className="flex-1 w-full px-4 md:px-8 py-8 flex items-start justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center">
            {!showMatematicaLibros ? (
              <>
                <h1 className="text-4xl md:text-6xl font-bold text-[#DFD0B8] mb-8">
                  Ciclo 1
                </h1>
                <p className="text-[#DFD0B8] text-lg md:text-xl opacity-80 mb-8">
                  Elige el curso para acceder a los libros
                </p>

                {/* Grid de materias */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
                  <button className="bg-[#222831] hover:bg-[#2A3038] text-[#DFD0B8] px-8 py-6 rounded-lg transition-colors duration-200 font-medium cursor-pointer text-lg shadow-lg hover:shadow-xl">
                    Comunicación Oral y Escrita
                  </button>
                  <button className="bg-[#222831] hover:bg-[#2A3038] text-[#DFD0B8] px-8 py-6 rounded-lg transition-colors duration-200 font-medium cursor-pointer text-lg shadow-lg hover:shadow-xl">
                    Metodología del Trabajo Universitario
                  </button>
                  <button className="bg-[#222831] hover:bg-[#2A3038] text-[#DFD0B8] px-8 py-6 rounded-lg transition-colors duration-200 font-medium cursor-pointer text-lg shadow-lg hover:shadow-xl">
                    Ciencias Naturales y Medio Ambiente
                  </button>
                  <button
                    onClick={toggleMatematicaLibros}
                    className="bg-[#222831] hover:bg-[#2A3038] text-[#DFD0B8] px-8 py-6 rounded-lg transition-colors duration-200 font-medium cursor-pointer text-lg shadow-lg hover:shadow-xl"
                  >
                    Matemática Básica
                  </button>
                  <button className="bg-[#222831] hover:bg-[#2A3038] text-[#DFD0B8] px-8 py-6 rounded-lg transition-colors duration-200 font-medium cursor-pointer text-lg shadow-lg hover:shadow-xl">
                    Filosofía
                  </button>
                  <button className="bg-[#222831] hover:bg-[#2A3038] text-[#DFD0B8] px-8 py-6 rounded-lg transition-colors duration-200 font-medium cursor-pointer text-lg shadow-lg hover:shadow-xl">
                    Fundamentos de Sistemas de Información
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
                  Matemática Básica
                </h1>
                <p className="text-[#DFD0B8] text-lg md:text-xl opacity-80 mb-8">
                  Libros disponibles para el curso
                </p>

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
                    onClick={toggleMatematicaLibros}
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

export default Ciclo1;
