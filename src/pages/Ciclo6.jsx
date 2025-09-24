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
      titulo: "Chat de WhatsApp Grupo A",
      url: "https://chat.whatsapp.com/ExmG8p2TsnM6cRVEbS0mnj?mode=ems_wa_t",
    },
    {
      id: 2,
      titulo: "Chat de WhatsApp Grupo B",
      url: "https://chat.whatsapp.com/ExmG8p2TsnM6cRVEbS0mnj?mode=ems_wa_t",
    },
    {
      id: 3,
      titulo: "Sílabo 2025",
      url: "https://drive.google.com/file/d/1I9no9NNd5Uvv2-NLEGb6vyD1DFbFX4WC/view?usp=sharing",
    },
    {
      id: 4,
      titulo: "Sílabo 2024",
      url: "https://drive.google.com/file/d/1I9no9NNd5Uvv2-NLEGb6vyD1DFbFX4WC/view?usp=sharing",
    },
    {
      id: 5,
      titulo: "Primera Práctica Calificada 2025",
      url: "https://drive.google.com/file/d/1O1nj7EC3tNecSQ3fh7oMWAeaRj_sLYk_/view?usp=sharing",
    },
    {
      id: 6,
      titulo: "Segunda Práctica Calificada 2025",
      url: "https://drive.google.com/file/d/1XR1NZKlLepI8UR0RgQ_pSjR3bRlopjXj/view?usp=sharing",
    },
    {
      id: 7,
      titulo: "Primera Práctica Calificada 2024",
      url: "https://drive.google.com/file/d/1O1nj7EC3tNecSQ3fh7oMWAeaRj_sLYk_/view?usp=sharing",
    },
    {
      id: 8,
      titulo: "Segunda Práctica Calificada 2024",
      url: "https://drive.google.com/file/d/1XR1NZKlLepI8UR0RgQ_pSjR3bRlopjXj/view?usp=sharing",
    },
    {
      id: 9,
      titulo: "Fundamentos de Sistemas Digitales - Floyd",
      url: "https://drive.google.com/file/d/1BrasZI_NauCL2nKBUcXkgUDJvPbnqM_t/view?usp=drive_link",
    },
    {
      id: 10,
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
                  Elige un curso para acceder al contenido
                </p>

                {/* Grid de materias */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
                  <button className="group theme-card theme-card-hover backdrop-blur-sm border theme-text-primary px-6 py-4 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer">
                    Gestión de Entornos de Bases de Datos
                  </button>
                  <button
                    onClick={toggleSistemasDigitalesLibros}
                    className="group theme-card theme-card-hover backdrop-blur-sm border theme-text-primary px-6 py-4 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer"
                  >
                    Sistemas Digitales y Arquitectura de Computadoras
                  </button>
                  <button className="group theme-card theme-card-hover backdrop-blur-sm border theme-text-primary px-6 py-4 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer">
                    Sistemas Operativos
                  </button>
                  <button className="group theme-card theme-card-hover backdrop-blur-sm border theme-text-primary px-6 py-4 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer">
                    Innovación Tecnológica, Creatividad y Emprendimiento
                  </button>
                  <button className="group theme-card theme-card-hover backdrop-blur-sm border theme-text-primary px-6 py-4 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer">
                    Construcción y Evolución de Software
                  </button>
                </div>

                {/* Botón para regresar */}
                <div className="mt-8">
                  <button
                    onClick={() => navigate("/")}
                    className="theme-card theme-card-hover backdrop-blur-sm border theme-text-primary px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer"
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

                {/* Información del Curso */}
                <div className="text-left max-w-2xl mx-auto mb-8 theme-card backdrop-blur-sm border rounded-2xl p-6">
                  <h2 className="text-xl font-semibold theme-text-primary mb-4 text-center">
                    Información del Curso 2025-II
                  </h2>
                  <div className="theme-text-secondary space-y-3 text-sm">
                    <div className="pt-2">
                      <p className="font-medium">
                        <b>Docente:</b> Ing. Christian Lezama Cuéllar
                      </p>
                      <p>
                        <b>Correo:</b> christian.lezama@unsch.edu.pe
                      </p>
                      <p className="flex items-center gap-2">
                        <span>
                          <b>Celular:</b> 907 889 415
                        </span>
                        <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-medium px-2 rounded-full shadow-md">
                          Solo WhatsApp
                        </span>
                      </p>
                    </div>

                    <div className="pt-2">
                      <p className="font-medium">
                        <b>Docente Auxiliar:</b> Ing. Fiorella Luque Mendieta
                      </p>
                      <p>
                        <b>Correo:</b> fiorella.luque@unsch.edu.pe
                      </p>
                      <p className="flex items-center gap-2">
                        <span>
                          <b>Celular:</b> 967 897 001
                        </span>
                        <span className="bg-gradient-to-r from-red-400 to-red-500 text-white text-xs  px-2 rounded-full shadow-md">
                          No disponible
                        </span>
                      </p>
                    </div>

                    <div className="pt-2">
                      <p className="font-medium">
                        <b>Horario Turno A - Mañana:</b>
                      </p>
                      <p>Teoría: Martes 07:00 - 09:00</p>
                      <p>Práctica: Jueves 07:00 - 09:00</p>
                    </div>

                    <div className="pt-2">
                      <p className="font-medium">
                        <b>Horario Turno B - Tarde:</b>
                      </p>
                      <p>Teoría: Martes 16:00 - 18:00</p>
                      <p>Práctica: Jueves 14:00 - 16:00</p>
                    </div>
                    <div className="pt-2">
                      <p className="font-medium">
                        <b>Importante: </b>
                      </p>
                      <p className="mt-1">
                        • Todo estudiante debe contar con su calculadora para
                        las prácticas.
                      </p>
                      <p>
                        • Tolerancia máxima de 10 minutos para el ingreso a
                        clases.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Buscador de libros */}
                <div className="max-w-md mx-auto mb-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar..."
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
                        className="group theme-card theme-card-hover backdrop-blur-sm border theme-text-primary px-6 py-4 rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-3">
                          {libro.titulo.includes("WhatsApp") ? (
                            <svg
                              className="w-5 h-5 text-green-500 transition-colors duration-300 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787" />
                            </svg>
                          ) : libro.titulo.includes("Sílabo") ||
                            libro.titulo.includes("Práctica Calificada") ? (
                            <svg
                              className="w-5 h-5 text-red-500 transition-colors duration-300 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                            </svg>
                          ) : (
                            <svg
                              className="w-5 h-5 text-blue-400 transition-colors duration-300 flex-shrink-0 dark:text-blue-300"
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
                          )}
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
                    className="theme-card theme-card-hover backdrop-blur-sm border theme-text-primary px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer"
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
