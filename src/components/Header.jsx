import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const { user, signout, sessionError: _sessionError } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Debug: Mostrar datos del usuario
  useEffect(() => {
    if (user) {
      console.log("Datos del usuario en Header:", {
        id: user.id,
        email: user.email,
        name: user.name,
        user_metadata: user.user_metadata,
        picture: user.picture,
        avatar_url: user.avatar_url,
      });
    }
  }, [user]);

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
    const name = user?.user_metadata?.name || user?.name || user?.email;
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
      // No cerrar el menú si se hace click en el botón de logout o en el contenedor del menú móvil
      if (
        event.target.textContent === "Cerrar sesión" ||
        event.target.closest(".mobile-menu-container")
      ) {
        return;
      }

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
    try {
      if (isSigningOut) return; // Evitar múltiples clicks

      setIsSigningOut(true);
      console.log("Iniciando proceso de cerrar sesión...");
      await signout();
      console.log("Sesión cerrada exitosamente, navegando a home...");
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
        {/* Logo - Responsive positioning */}
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

        {/* Desktop Profile Menu - Solo visible en pantallas grandes */}
        <div className="hidden md:block relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-3 cursor-pointer hover:bg-black/10 p-2 rounded-xl transition-all duration-200 dark:hover:bg-white/10"
            onClick={toggleDropdown}
          >
            {/* Avatar con fallback */}
            <div className="relative">
              {getImageUrl() ? (
                <img
                  src={getImageUrl()}
                  alt="Foto de perfil"
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full ring-2 ring-gray-300 object-cover dark:ring-slate-600"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full ring-2 ring-gray-300 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center dark:ring-slate-600">
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
                  className="w-4 h-4 text-blue-500 cursor-pointer dark:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-xs text-white bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 dark:bg-slate-800">
                  Verificado UNSCH
                </span>
              </div>
            )}
          </div>

          {showDropdown && (
            <div className="absolute right-0 top-12 theme-header backdrop-blur-sm border theme-border rounded-xl shadow-xl z-[9999] min-w-48 overflow-hidden">
              <div className="p-3 border-b theme-border theme-bg-secondary">
                <p className="text-xs theme-text-secondary font-medium">
                  {user?.email}
                </p>
              </div>
              <div className="p-2">
                {/* Botón de cambio de tema */}
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 theme-text-secondary theme-menu-hover group"
                >
                  <div className="flex items-center justify-center w-5 h-5">
                    {isDark ? (
                      <svg
                        className="w-5 h-5 text-amber-500 transition-colors duration-200"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-gray-500 transition-colors duration-200"
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
                <div className="w-full h-px bg-gray-200 my-2 dark:bg-slate-600"></div>

                <button
                  onClick={async () => {
                    if (isSigningOut) return;
                    try {
                      await handleSignout();
                      closeDropdown();
                    } catch (error) {
                      console.error(
                        "Error al cerrar sesión desde desktop:",
                        error
                      );
                      closeDropdown();
                    }
                  }}
                  disabled={isSigningOut}
                  className={`w-full text-center px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
                    isSigningOut
                      ? "theme-text-secondary cursor-not-allowed opacity-50"
                      : "theme-text-primary hover:bg-red-50 hover:text-red-600 cursor-pointer dark:hover:bg-red-500/20 dark:hover:text-red-300"
                  }`}
                >
                  {isSigningOut ? "Cerrando sesión..." : "Cerrar sesión"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu - Solo visible en móvil */}
        <div className="md:hidden" ref={mobileMenuRef}>
          <button
            onClick={toggleMobileMenu}
            className="p-2 theme-text-secondary hover:bg-black/10 rounded-lg transition-colors duration-200 cursor-pointer dark:hover:bg-white/10"
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
        <div className="fixed top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg z-[99999] md:hidden mobile-menu-container dark:bg-slate-800/95 dark:border-slate-600">
          <div className="px-4 py-3 space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-slate-600">
              {/* Avatar móvil con fallback */}
              <div className="relative">
                {getImageUrl() ? (
                  <img
                    src={getImageUrl()}
                    alt="Foto de perfil"
                    className="w-12 h-12 rounded-full ring-2 ring-gray-300 object-cover dark:ring-slate-600"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full ring-2 ring-gray-300 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center dark:ring-slate-600">
                    <span className="text-white font-semibold text-base">
                      {getUserInitials()}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-gray-800 font-semibold dark:text-white">
                    {user?.user_metadata?.name ||
                      user?.name ||
                      user?.email?.split("@")[0]}
                  </p>
                  {user?.email?.endsWith("@unsch.edu.pe") && (
                    <div className="relative group">
                      <svg
                        className="w-4 h-4 text-blue-500 cursor-pointer dark:text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-xs text-white bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 dark:bg-slate-800">
                        Verificado UNSCH
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-600 dark:text-slate-300">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Botón de cambio de tema móvil */}
            <div
              onTouchStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleTheme();
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleTheme();
              }}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer font-medium select-none dark:text-slate-300 dark:hover:bg-slate-700/50"
              style={{ userSelect: "none", touchAction: "manipulation" }}
            >
              <div className="flex items-center justify-center w-5 h-5">
                {isDark ? (
                  <svg
                    className="w-5 h-5 text-amber-500 transition-colors duration-200"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-500 transition-colors duration-200"
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
              <span>
                {isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              </span>
            </div>

            <div style={{ position: "relative", zIndex: 999999 }}>
              <div
                onTouchStart={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("🔴 TOUCH START - LOGOUT MÓVIL");
                  signout()
                    .then(() => {
                      console.log("✅ LOGOUT EXITOSO");
                      window.location.replace("/");
                    })
                    .catch((error) => {
                      console.error("❌ ERROR LOGOUT:", error);
                      window.location.replace("/");
                    });
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("🔴 MOUSE DOWN - LOGOUT MÓVIL");
                  signout()
                    .then(() => {
                      console.log("✅ LOGOUT EXITOSO");
                      window.location.replace("/");
                    })
                    .catch((error) => {
                      console.error("❌ ERROR LOGOUT:", error);
                      window.location.replace("/");
                    });
                }}
                className="w-full text-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer font-semibold select-none dark:text-red-300 dark:hover:bg-red-500/20"
                style={{ userSelect: "none", touchAction: "manipulation" }}
              >
                Cerrar sesión
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
