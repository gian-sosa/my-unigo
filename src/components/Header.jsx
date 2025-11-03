import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const { user, signout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const handleImageError = () => {
    setImageError(true);
  };

  const getImageUrl = () => {
    if (imageError) return null;
    return (
      user?.picture ||
      user?.avatar_url ||
      user?.user_metadata?.picture ||
      user?.user_metadata?.avatar_url ||
      null
    );
  };

  const getUserInitials = () => {
    const name = user?.user_metadata?.name || user?.name || user?.email;
    if (!name) return "?";
    const nameParts = name.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        showDropdown
      ) {
        setShowDropdown(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target) &&
        showMobileMenu
      ) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown, showMobileMenu]);

  const handleSignout = async () => {
    if (isSigningOut) return;
    try {
      setIsSigningOut(true);
      await signout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error en handleSignout:", error);
    } finally {
      setIsSigningOut(false);
    }
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
    <div className="w-full theme-header backdrop-blur-sm border-b shadow-lg fixed top-0 left-0 right-0 z-[9999]">
      <div className="h-16 md:h-20 px-4 md:px-8 flex items-center justify-between max-w-7xl mx-auto relative">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <h1
            onClick={() => navigate("/")}
            className="text-lg sm:text-xl md:text-2xl font-bold cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            UniGo
          </h1>
          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            BETA
          </span>
        </div>

        {/* Spacer for mobile centering */}
        <div className="flex-1 md:hidden"></div>

        {/* Desktop Profile Menu */}
        <div className="hidden md:block relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-3 cursor-pointer hover:bg-black/10 p-2 rounded-xl transition-all duration-200"
            onClick={toggleDropdown}
          >
            {/* Avatar */}
            <div className="relative">
              {getImageUrl() ? (
                <img
                  src={getImageUrl()}
                  alt="Foto de perfil"
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full ring-2 ring-gray-300 object-cover"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full ring-2 ring-gray-300 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-xs lg:text-sm">
                    {getUserInitials()}
                  </span>
                </div>
              )}
            </div>
            <h2 className="text-sm lg:text-base theme-text-primary font-medium">
              {user?.user_metadata?.name ||
                user?.name ||
                user?.email?.split("@")[0]}
            </h2>
            {user?.email?.endsWith("@unsch.edu.pe") && (
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
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-xs text-white bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  Verificado UNSCH
                </span>
              </div>
            )}
          </div>

          {showDropdown && (
            <div className="absolute right-0 top-12 theme-header backdrop-blur-md border-0 rounded-2xl shadow-2xl z-[9999] min-w-56 overflow-hidden ring-1 ring-black/10">
              {/* Header del menú */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs theme-text-secondary truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contenido del menú */}
              <div className="p-2 space-y-1">
                {/* Botón de Progreso */}
                <button
                  onClick={() => {
                    navigate("/progreso");
                    closeDropdown();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 theme-text-secondary hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 group cursor-pointer"
                >
                  <div className="flex items-center justify-center w-9 h-9 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors duration-200">
                    <svg
                      className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">Mi Progreso</span>
                </button>

                {/* Botón de tema */}
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 theme-text-secondary hover:bg-amber-100 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 group cursor-pointer"
                >
                  <div className="flex items-center justify-center w-9 h-9 bg-amber-100 dark:bg-amber-900/30 rounded-lg group-hover:bg-amber-200 dark:group-hover:bg-amber-800/40 transition-colors duration-200">
                    {isDark ? (
                      <svg
                        className="w-5 h-5 text-amber-600 dark:text-amber-400 transition-colors duration-200"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-amber-600 dark:text-amber-400 transition-colors duration-200"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium">
                    {isDark ? "Modo claro" : "Modo oscuro"}
                  </span>
                </button>

                {/* Separador */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-600 to-transparent my-3"></div>

                {/* Cerrar sesión */}
                <button
                  onClick={async () => {
                    if (isSigningOut) return;
                    try {
                      await handleSignout();
                      closeDropdown();
                    } catch (error) {
                      console.error("Error al cerrar sesión:", error);
                      closeDropdown();
                    }
                  }}
                  disabled={isSigningOut}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 font-medium ${
                    isSigningOut
                      ? "theme-text-secondary cursor-not-allowed opacity-50"
                      : "theme-text-secondary hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 cursor-pointer group"
                  }`}
                >
                  <div className="flex items-center justify-center w-9 h-9 bg-red-100 dark:bg-red-900/30 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-800/40 transition-colors duration-200">
                    <svg
                      className="w-5 h-5 text-red-600 dark:text-red-400 transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </div>
                  <span>
                    {isSigningOut ? "Cerrando sesión..." : "Cerrar sesión"}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Profile Menu */}
        <div className="md:hidden">
          <button
            ref={hamburgerRef}
            onClick={toggleMobileMenu}
            className="p-2 theme-text-secondary hover:bg-black/10 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <div className="relative">
              {getImageUrl() ? (
                <img
                  src={getImageUrl()}
                  alt="Foto de perfil"
                  className="w-7 h-7 rounded-full ring-2 ring-gray-300 object-cover"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-7 h-7 rounded-full ring-2 ring-gray-300 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">
                    {getUserInitials()}
                  </span>
                </div>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div
          ref={mobileMenuRef}
          className="fixed top-full left-0 right-0 theme-header backdrop-blur-md border-0 shadow-2xl z-[99999] md:hidden ring-1 ring-black/10"
        >
          <div className="px-4 py-4 space-y-4">
            {/* Header móvil */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {getImageUrl() ? (
                    <img
                      src={getImageUrl()}
                      alt="Foto de perfil"
                      className="w-14 h-14 rounded-full ring-2 ring-white shadow-md object-cover"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full ring-2 ring-white bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                      <span className="text-white font-semibold text-lg">
                        {getUserInitials()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="theme-text-primary font-semibold text-base truncate">
                      {user?.user_metadata?.name ||
                        user?.name ||
                        user?.email?.split("@")[0]}
                    </p>
                    {user?.email?.endsWith("@unsch.edu.pe") && (
                      <svg
                        className="w-5 h-5 text-blue-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm theme-text-secondary truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Botones móvil */}
            <div className="space-y-2">
              {/* Progreso */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/progreso");
                  closeMobileMenu();
                }}
                className="w-full flex items-center gap-4 px-4 py-4 theme-text-secondary hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-2xl transition-all duration-200 cursor-pointer font-medium select-none group"
              >
                <div className="flex items-center justify-center w-11 h-11 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors duration-200">
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400 transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <span className="text-base">Mi Progreso</span>
              </div>

              {/* Tema */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTheme();
                }}
                className="w-full flex items-center gap-4 px-4 py-4 theme-text-secondary hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 rounded-2xl transition-all duration-200 cursor-pointer font-medium select-none group"
              >
                <div className="flex items-center justify-center w-11 h-11 bg-amber-100 dark:bg-amber-900/30 rounded-xl group-hover:bg-amber-200 dark:group-hover:bg-amber-800/40 transition-colors duration-200">
                  {isDark ? (
                    <svg
                      className="w-6 h-6 text-amber-600 dark:text-amber-400 transition-colors duration-200"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-amber-600 dark:text-amber-400 transition-colors duration-200"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-base">
                  {isDark ? "Modo claro" : "Modo oscuro"}
                </span>
              </div>

              {/* Separador */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-600 to-transparent my-4"></div>

              {/* Cerrar sesión */}
              <div
                onClick={async (e) => {
                  e.stopPropagation();
                  if (isSigningOut) return;
                  try {
                    await handleSignout();
                    closeMobileMenu();
                  } catch (error) {
                    console.error("Error al cerrar sesión:", error);
                    closeMobileMenu();
                  }
                }}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 font-medium select-none ${
                  isSigningOut
                    ? "theme-text-secondary cursor-not-allowed opacity-50"
                    : "theme-text-secondary hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 cursor-pointer group"
                }`}
              >
                <div className="flex items-center justify-center w-11 h-11 bg-red-100 dark:bg-red-900/30 rounded-xl group-hover:bg-red-200 dark:group-hover:bg-red-800/40 transition-colors duration-200">
                  <svg
                    className="w-6 h-6 text-red-600 dark:text-red-400 transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
                <span className="text-base">
                  {isSigningOut ? "Cerrando sesión..." : "Cerrar sesión"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
