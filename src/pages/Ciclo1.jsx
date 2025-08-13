import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";

function Ciclo1() {
  const { user, signout, loading } = userAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (!loading && user === null) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSignout = async () => {
    await signout();
    navigate("/login", { replace: true });
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
              <h2 className="text-sm lg:text-base">{user?.name}</h2>
              <img
                src={user?.picture}
                alt="Foto de perfil"
                className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
              />
            </div>

            {showDropdown && (
              <div className="absolute right-0 top-12 bg-[#222831] border border-[#393E46] rounded-md shadow-lg z-20 min-w-48">
                <div className="p-3 border-b border-[#393E46]">
                  <p className="text-sm text-[#DFD0B8] font-medium">
                    {user?.name}
                  </p>
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
                  <p className="text-[#DFD0B8] font-medium">{user?.name}</p>
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
      <div className="flex-1 w-full px-4 md:px-8 py-8 flex items-center justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#DFD0B8] mb-8">
              Ciclo 1
            </h1>
            <p className="text-[#DFD0B8] text-lg md:text-xl opacity-80 mb-8">
              Contenido del primer ciclo académico
            </p>

            {/* Aquí puedes agregar el contenido específico del Ciclo 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#222831] p-6 rounded-lg">
                <h3 className="text-[#DFD0B8] text-xl font-semibold mb-4">
                  Materias
                </h3>
                <p className="text-[#DFD0B8] opacity-70">
                  Lista de materias del Ciclo 1
                </p>
              </div>

              <div className="bg-[#222831] p-6 rounded-lg">
                <h3 className="text-[#DFD0B8] text-xl font-semibold mb-4">
                  Horarios
                </h3>
                <p className="text-[#DFD0B8] opacity-70">
                  Horarios de clases del Ciclo 1
                </p>
              </div>
            </div>

            {/* Botón para regresar */}
            <div className="mt-8">
              <button
                onClick={() => navigate("/")}
                className="bg-[#222831] text-[#DFD0B8] px-6 py-3 rounded-md hover:bg-[#2A3038] transition-colors duration-200 font-medium"
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

export default Ciclo1;
