import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";

function Header() {
  const { user, signout, sessionError } = userAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [imageError, setImageError] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Función para manejar errores de carga de imagen
  const handleImageError = () => {
    setImageError(true);
  };

  // Función para obtener URL de imagen o fallback
  const getImageUrl = () => {
    if (imageError) return null;

    // Intentar diferentes campos donde puede estar la imagen
    return (
      user?.picture ||
      user?.avatar_url ||
      user?.user_metadata?.picture ||
      user?.user_metadata?.avatar_url ||
      null
    );
  };

  // Generar iniciales como fallback
  const getUserInitials = () => {
    const name = user?.name || user?.user_metadata?.name || user?.email;
    if (!name) return "?";

    const nameParts = name.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  // Efecto para manejar clicks fuera del dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowDropdown(false);
        setShowMobileMenu(false);
      }
    };

    if (showDropdown || showMobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [showDropdown, showMobileMenu]);

  const handleSignout = async () => {
    await signout();
    navigate("/", { replace: true });
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

  return (
    <div className="w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 shadow-lg relative">
      <div className="h-16 md:h-20 px-4 md:px-8 flex items-center justify-between max-w-7xl mx-auto relative">
        {/* Logo - Responsive positioning */}
        <div className="flex-shrink-0">
          <h1
            onClick={() => navigate("/")}
            className="text-lg sm:text-xl md:text-2xl font-bold cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            UniGo
          </h1>
        </div>

        {/* Spacer for mobile centering */}
        <div className="flex-1 md:hidden"></div>

        {/* Desktop Profile Menu - Solo visible en pantallas grandes */}
        <div className="hidden md:block relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-3 cursor-pointer hover:bg-white/10 p-2 rounded-xl transition-all duration-200"
            onClick={toggleDropdown}
          >
            {/* Avatar con fallback */}
            <div className="relative">
              {getImageUrl() ? (
                <img
                  src={getImageUrl()}
                  alt="Foto de perfil"
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full ring-2 ring-slate-600 object-cover"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full ring-2 ring-slate-600 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-xs lg:text-sm">
                    {getUserInitials()}
                  </span>
                </div>
              )}
            </div>
            <h2 className="text-sm lg:text-base text-white font-medium">
              {user?.name}
            </h2>
            {user?.email?.endsWith("@unsch.edu.pe") && (
              <div className="relative group">
                <svg
                  className="w-4 h-4 text-blue-400 cursor-pointer"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-xs text-white bg-slate-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  Verificado UNSCH
                </span>
              </div>
            )}
          </div>

          {showDropdown && (
            <div className="absolute right-0 top-12 bg-slate-800/95 backdrop-blur-sm border border-slate-600 rounded-xl shadow-xl z-50 min-w-48 overflow-hidden">
              <div className="p-3 border-b border-slate-600 bg-slate-700/50">
                <p className="text-xs text-slate-300 font-medium">
                  {user?.email}
                </p>
              </div>
              <div className="p-2">
                <button
                  onClick={() => {
                    handleSignout();
                    closeDropdown();
                  }}
                  className="w-full text-left px-3 py-2 text-white hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-all duration-200 cursor-pointer font-medium"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu - Solo visible en móvil */}
        <div className="md:hidden" ref={mobileMenuRef}>
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-slate-300 hover:bg-white/10 rounded-lg transition-colors duration-200 cursor-pointer"
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
        <div className="absolute top-full left-0 right-0 bg-slate-800/95 backdrop-blur-sm border-b border-slate-600 shadow-lg z-50 md:hidden">
          <div className="px-4 py-3 space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-600">
              {/* Avatar móvil con fallback */}
              <div className="relative">
                {getImageUrl() ? (
                  <img
                    src={getImageUrl()}
                    alt="Foto de perfil"
                    className="w-12 h-12 rounded-full ring-2 ring-slate-600 object-cover"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full ring-2 ring-slate-600 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-base">
                      {getUserInitials()}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-white font-semibold">{user?.name}</p>
                  {user?.email?.endsWith("@unsch.edu.pe") && (
                    <div className="relative group">
                      <svg
                        className="w-4 h-4 text-blue-400 cursor-pointer"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-xs text-white bg-slate-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                        Verificado UNSCH
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-300">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSignout();
                closeMobileMenu();
              }}
              className="w-full text-center px-4 py-3 text-red-300 hover:bg-red-500/20 rounded-lg transition-colors duration-200 cursor-pointer font-semibold"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
