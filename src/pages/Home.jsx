import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/Header";
import examenAdmisionImg from "../assets/examen_admision.jpg";
import carrosAlegoricosImg from "../assets/carros_alegoricos.png";

function Home() {
  const { user, loading } = useAuth();
  const { isDark } = useTheme();
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [expandedCycles, setExpandedCycles] = useState(new Set());
  const [expandedPublications, setExpandedPublications] = useState(new Set());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Timeline de publicaciones
  const timelinePublications = [
    {
      id: 1,
      titulo: "Examen de Admisión 2025-II",
      descripcion:
        "🙋‍♀️🙋‍♂️Atención postulante a la modalidad Ordinario del Examen de Admisión 2026-II.\n👉Ingresa a la página web: admision.unsch.edu.pe y sigue los pasos para tu inscripción.\n\n📅 Inscripción regular: Hasta el 31 de octubre\n📅 Inscripción extemporánea: Del 01 al 14 de noviembre\n\n#AdmisiónUnsch #modalidadordinario #Inscripciones",
      imagen: examenAdmisionImg,
      fecha: "Sábado 04 de agosto de 2025",
      hora: "18:09",
    },
    {
      id: 2,
      titulo: "Carro Alegórico Sistémico",
      descripcion:
        "Con creatividad, tecnología y orgullo universitario, la Escuela Profesional de Ingeniería de Sistemas se hace presente en el paseo de carros alegóricos por los 348 años de fundación y 68 años de reapertura de nuestra querida Universidad Nacional de San Cristóbal de Huamanga. ¡Innovación que transforma!\n\nIng. Sistemas 💛🖤",
      imagen: carrosAlegoricosImg,
      fecha: "Jueves 03 de julio de 2025",
      hora: "16:30",
    },
  ];

  // Estructura completa de datos de todos los ciclos
  const ciclosData = {
    1: {
      nombre: "Primer Ciclo",
      cursos: [
        {
          id: "com-oral",
          nombre: "Comunicación Oral y Escrita",
          materiales: [],
        },
        {
          id: "metodologia",
          nombre: "Metodología del Trabajo Universitario",
          materiales: [],
        },
        {
          id: "ciencias-nat",
          nombre: "Ciencias Naturales y Medio Ambiente",
          materiales: [],
        },
        {
          id: "matematica-basica",
          nombre: "Matemática Básica",
          materiales: [
            {
              titulo: "Matemática Básica - González, Chacón, Fonseca",
              url: "https://drive.google.com/file/d/1BKGpp1HsjY0hZheOgQrP7tEFsTmwCQjn/view?usp=drive_link",
              tipo: "libro",
            },
            {
              titulo: "Matemática Básica - Figueroa",
              url: "https://drive.google.com/file/d/12Acjz6LH0n_-UqJG9RGqZpOR850eA9Xi/view?usp=drive_link",
              tipo: "libro",
            },
            {
              titulo: "Matemáticas Básicas - Ocaña, Pérez",
              url: "https://drive.google.com/file/d/1ww93Z-x2u-ImBAtm7IC4RAr2MlxqbtEx/view?usp=drive_link",
              tipo: "libro",
            },
          ],
        },
        { id: "filosofia", nombre: "Filosofía", materiales: [] },
        {
          id: "fundamentos-si",
          nombre: "Fundamentos de Sistemas de Información",
          materiales: [
            {
              titulo:
                "Fundamentos de Sistemas de Información - Guill, Guitart, Joana, Rodriguez",
              url: "https://drive.google.com/file/d/1OrZP6a9S9EGF8puNy7a7UASIYcRB8Sxr/view?usp=drive_link",
              tipo: "libro",
            },
          ],
        },
      ],
    },
    2: {
      nombre: "Segundo Ciclo",
      cursos: [
        {
          id: "comprension-textos",
          nombre: "Comprensión y Producción de Textos",
          materiales: [],
        },
        {
          id: "sociedad-cultura",
          nombre: "Sociedad y Cultura",
          materiales: [],
        },
        {
          id: "realidad-nacional",
          nombre: "Realidad Nacional y Mundial",
          materiales: [],
        },
        { id: "liderazgo", nombre: "Liderazgo y Gestión", materiales: [] },
        {
          id: "psicologia",
          nombre: "Psicología y Desarrollo Humano",
          materiales: [],
        },
        {
          id: "algoritmos",
          nombre: "Algoritmos y Solución de Problemas",
          materiales: [],
        },
      ],
    },
    3: {
      nombre: "Tercer Ciclo",
      cursos: [
        { id: "calculo-1", nombre: "Cálculo I", materiales: [] },
        { id: "fisica-1", nombre: "Física I", materiales: [] },
        {
          id: "estructura-datos",
          nombre: "Estructura de Datos Fundamentales y Algoritmos",
          materiales: [],
        },
        {
          id: "teoria-sistemas",
          nombre: "Teoría General de Sistemas",
          materiales: [],
        },
        {
          id: "seminario-empresarial",
          nombre: "Seminario y Gestión Empresarial",
          materiales: [],
        },
        { id: "algebra-lineal", nombre: "Álgebra Lineal", materiales: [] },
      ],
    },
    4: {
      nombre: "Cuarto Ciclo",
      cursos: [
        { id: "calculo-2", nombre: "Cálculo II", materiales: [] },
        { id: "fisica-2", nombre: "Física II", materiales: [] },
        {
          id: "poo",
          nombre: "Programación Orientada a Objetos",
          materiales: [],
        },
        {
          id: "estadistica-prob",
          nombre: "Estadística y Probabilidades",
          materiales: [],
        },
        {
          id: "modelamiento-analisis",
          nombre: "Modelamiento de Análisis de Software",
          materiales: [],
        },
        {
          id: "matematica-discreta",
          nombre: "Matemática Discreta",
          materiales: [],
        },
      ],
    },
    5: {
      nombre: "Quinto Ciclo",
      cursos: [
        {
          id: "metodos-numericos",
          nombre: "Métodos Numéricos",
          materiales: [],
        },
        {
          id: "modelamiento-datos",
          nombre: "Modelamiento de Datos",
          materiales: [],
        },
        {
          id: "sistemas-electricos",
          nombre: "Sistemas Eléctricos y Electrónicos",
          materiales: [],
        },
        {
          id: "gestion-procesos",
          nombre: "Gestión de Procesos de Negocios",
          materiales: [],
        },
        { id: "diseno-software", nombre: "Diseño de Software", materiales: [] },
        {
          id: "estadistica-aplicada",
          nombre: "Estadística Aplicada",
          materiales: [],
        },
      ],
    },
    6: {
      nombre: "Sexto Ciclo",
      cursos: [
        {
          id: "gestion-bd",
          nombre: "Gestión de Entornos de Bases de Datos",
          materiales: [],
        },
        {
          id: "sistemas-digitales",
          nombre: "Sistemas Digitales y Arquitectura de Computadoras",
          materiales: [
            {
              titulo: "Chat de WhatsApp Grupo A",
              url: "https://chat.whatsapp.com/ExmG8p2TsnM6cRVEbS0mnj?mode=ems_wa_t",
              tipo: "whatsapp",
            },
            {
              titulo: "Chat de WhatsApp Grupo B",
              url: "https://chat.whatsapp.com/ExmG8p2TsnM6cRVEbS0mnj?mode=ems_wa_t",
              tipo: "whatsapp",
            },
            {
              titulo: "Sílabo 2025",
              url: "https://drive.google.com/file/d/1I9no9NNd5Uvv2-NLEGb6vyD1DFbFX4WC/view?usp=sharing",
              tipo: "pdf",
            },
            {
              titulo: "Sílabo 2024",
              url: "https://drive.google.com/file/d/1I9no9NNd5Uvv2-NLEGb6vyD1DFbFX4WC/view?usp=sharing",
              tipo: "pdf",
            },
            {
              titulo: "Primera Práctica Calificada 2025",
              url: "https://drive.google.com/file/d/1O1nj7EC3tNecSQ3fh7oMWAeaRj_sLYk_/view?usp=sharing",
              tipo: "pdf",
            },
            {
              titulo: "Segunda Práctica Calificada 2025",
              url: "https://drive.google.com/file/d/1XR1NZKlLepI8UR0RgQ_pSjR3bRlopjXj/view?usp=sharing",
              tipo: "pdf",
            },
            {
              titulo: "Primera Práctica Calificada 2024",
              url: "https://drive.google.com/file/d/1O1nj7EC3tNecSQ3fh7oMWAeaRj_sLYk_/view?usp=sharing",
              tipo: "pdf",
            },
            {
              titulo: "Fundamentos de Sistemas Digitales - Floyd",
              url: "https://drive.google.com/file/d/1BrasZI_NauCL2nKBUcXkgUDJvPbnqM_t/view?usp=drive_link",
              tipo: "libro",
            },
            {
              titulo:
                "Sistemas Digitales Principios y Aplicaciones - Tocci, Widmer, Moss",
              url: "https://drive.google.com/file/d/15Zpi6uImOR1T4mAknRdgCvMiIOlZNGB4/view?usp=drive_link",
              tipo: "libro",
            },
          ],
          info: {
            docente: "Ing. Christian Lezama Cuéllar",
            correoDocente: "christian.lezama@unsch.edu.pe",
            celularDocente: "907 889 415",
            whatsappDocente: true,
            docenteAuxiliar: "Ing. Fiorella Luque Mendieta",
            correoDocenteAuxiliar: "fiorella.luque@unsch.edu.pe",
            celularDocenteAuxiliar: "967 897 001",
            whatsappDocenteAuxiliar: false,
            horarioA: {
              teoria: "Martes 07:00 - 09:00",
              practica: "Jueves 07:00 - 09:00",
            },
            horarioB: {
              teoria: "Martes 16:00 - 18:00",
              practica: "Jueves 14:00 - 16:00",
            },
            importante: [
              "Todo estudiante debe contar con su calculadora para las prácticas.",
              "Tolerancia máxima de 10 minutos para el ingreso a clases.",
            ],
          },
        },
        {
          id: "sistemas-operativos",
          nombre: "Sistemas Operativos",
          materiales: [],
        },
        {
          id: "innovacion-tec",
          nombre: "Innovación Tecnológica, Creatividad y Emprendimiento",
          materiales: [],
        },
        {
          id: "construccion-software",
          nombre: "Construcción y Evolución de Software",
          materiales: [],
        },
      ],
    },
    7: {
      nombre: "Séptimo Ciclo",
      cursos: [
        {
          id: "gestion-datos",
          nombre: "Gestión de Datos e Información",
          materiales: [],
        },
        {
          id: "derecho-informatico",
          nombre: "Derecho Informático",
          materiales: [],
        },
        { id: "redes-datos", nombre: "Redes de Datos", materiales: [] },
        {
          id: "gestion-riesgos",
          nombre: "Gestión de Riesgos y Seguridad de TI",
          materiales: [],
        },
        {
          id: "metodologia-investigacion",
          nombre: "Metodología de la Investigación Científica",
          materiales: [],
        },
        {
          id: "pruebas-calidad",
          nombre: "Pruebas y Aseguramiento de Calidad de Software",
          materiales: [],
        },
      ],
    },
    8: {
      nombre: "Octavo Ciclo",
      cursos: [
        {
          id: "servicio-social",
          nombre: "Servicio Social Universitario",
          materiales: [],
        },
        {
          id: "seminario-tesis-1",
          nombre: "Seminario de Tesis I",
          materiales: [],
        },
        { id: "ia-1", nombre: "Inteligencia Artificial I", materiales: [] },
        {
          id: "telecomunicaciones",
          nombre: "Telecomunicaciones",
          materiales: [],
        },
        {
          id: "arquitectura-software",
          nombre: "Arquitectura de Software",
          materiales: [],
        },
        { id: "desarrollo-web", nombre: "Desarrollo Web", materiales: [] },
        {
          id: "informatica-forense",
          nombre: "Informática Forense",
          materiales: [],
        },
      ],
    },
    9: {
      nombre: "Noveno Ciclo",
      cursos: [
        { id: "ia-2", nombre: "Inteligencia Artificial II", materiales: [] },
        {
          id: "seminario-tesis-2",
          nombre: "Seminario de Tesis II",
          materiales: [],
        },
        {
          id: "practicas-pre",
          nombre: "Prácticas Pre-Profesionales",
          materiales: [],
        },
        {
          id: "computacion-paralela",
          nombre: "Computación Paralela y Distribuida",
          materiales: [],
        },
        {
          id: "gestion-proyectos",
          nombre: "Gestión de Proyectos de Software",
          materiales: [],
        },
        {
          id: "programacion-moviles",
          nombre: "Programación de Móviles",
          materiales: [],
        },
        { id: "big-data", nombre: "Big Data", materiales: [] },
      ],
    },
    10: {
      nombre: "Décimo Ciclo",
      cursos: [
        {
          id: "auditoria-ti",
          nombre: "Auditoría y Control de TI",
          materiales: [],
        },
        {
          id: "seminario-tesis-3",
          nombre: "Seminario de Tesis III",
          materiales: [],
        },
        { id: "iot", nombre: "Internet de las Cosas", materiales: [] },
        {
          id: "transformacion-digital",
          nombre: "Transformación Digital",
          materiales: [],
        },
        {
          id: "comercio-electronico",
          nombre: "Comercio Electrónico",
          materiales: [],
        },
        { id: "marketing", nombre: "Marketing Empresarial", materiales: [] },
        {
          id: "proyectos-inversion",
          nombre: "Formulación y Evaluación de Proyectos de Inversión en TI",
          materiales: [],
        },
      ],
    },
  };

  // Funciones
  const toggleCycle = (cycleId) => {
    const newExpanded = new Set(expandedCycles);
    if (newExpanded.has(cycleId)) {
      newExpanded.delete(cycleId);
    } else {
      newExpanded.add(cycleId);
    }
    setExpandedCycles(newExpanded);
  };

  const selectCourse = (cycleId, course) => {
    setSelectedCycle(cycleId);
    setSelectedCourse(course);
    setIsMobileMenuOpen(false); // Cerrar menú móvil al seleccionar curso
  };

  const togglePublicationExpansion = (publicationId) => {
    const newExpanded = new Set(expandedPublications);
    if (newExpanded.has(publicationId)) {
      newExpanded.delete(publicationId);
    } else {
      newExpanded.add(publicationId);
    }
    setExpandedPublications(newExpanded);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const truncateText = (text, maxLines = 2) => {
    const words = text.split(" ");
    const wordsPerLine = window.innerWidth < 768 ? 8 : 12;
    const maxWords = maxLines * wordsPerLine;

    if (words.length <= maxWords) {
      return { text, isTruncated: false };
    }

    return {
      text: words.slice(0, maxWords).join(" "),
      isTruncated: true,
    };
  };

  const handleMaterialClick = (url) => {
    window.open(url, "_blank");
  };

  const getIconForMaterial = (tipo) => {
    switch (tipo) {
      case "whatsapp":
        return (
          <svg
            className="w-5 h-5 text-green-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787" />
          </svg>
        );
      case "pdf":
        return (
          <svg
            className="w-5 h-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5 text-blue-400"
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
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen theme-bg-gradient flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <div className="theme-text-primary text-sm font-medium">
            Cargando...
          </div>
        </div>
      </div>
    );
  }

  if (user === null) {
    return null;
  }

  return (
    <div className="min-h-screen theme-main-bg">
      <Header />

      {/* Main Container */}
      <div className="pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Botón hamburguesa para móvil */}
          <div className="lg:hidden mb-4">
            <button
              onClick={toggleMobileMenu}
              className="flex items-center justify-center w-full theme-card-bg rounded-2xl border theme-card-border shadow-lg p-4 hover:shadow-xl transition-all duration-300"
            >
              <span className="mr-3 text-xl">🎓</span>
              <span className="text-lg font-bold theme-text-primary flex-1 text-left">
                Ciclos Académicos
              </span>
              <svg
                className={`w-6 h-6 transition-transform duration-300 theme-text-primary ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-8">
            {/* Overlay para móvil */}
            {isMobileMenuOpen && (
              <div
                className="fixed inset-0 z-40 lg:hidden"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
                onClick={closeMobileMenu}
              />
            )}

            {/* Sidebar - Ciclos */}
            <div
              className={`lg:col-span-1 mb-4 ${
                isMobileMenuOpen
                  ? "fixed inset-x-4 top-32 bottom-12 z-50 lg:relative lg:inset-auto lg:top-auto lg:bottom-auto lg:z-auto"
                  : "hidden lg:block"
              }`}
            >
              <div className="theme-card-bg rounded-3xl border theme-card-border shadow-xl overflow-hidden lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] h-full lg:h-auto flex flex-col">
                {/* Header */}
                <div className="p-4 lg:p-6 border-b theme-divider flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg lg:text-xl font-bold theme-text-primary flex items-center">
                      <span className="mr-3 text-xl lg:text-2xl">🎓</span>
                      Ciclos Académicos
                    </h2>
                    {/* Botón cerrar solo en móvil */}
                    <button
                      onClick={closeMobileMenu}
                      className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 theme-text-secondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-3 lg:p-4 overflow-y-auto flex-1 lg:max-h-[calc(100vh-14rem)]">
                  <div className="space-y-2 lg:space-y-3">
                    {Object.entries(ciclosData).map(([cycleId, cycleData]) => (
                      <div
                        key={cycleId}
                        className="theme-card-small backdrop-blur-sm rounded-xl lg:rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        {/* Cycle Button */}
                        <button
                          className="w-full text-left px-3 lg:px-4 py-2.5 lg:py-3 font-medium transition-all duration-300 flex items-center justify-between text-sm hover:bg-blue-400 hover:bg-opacity-20 cursor-pointer group"
                          onClick={() => toggleCycle(parseInt(cycleId))}
                        >
                          <span className="theme-text-primary group-hover:text-blue-600">
                            {cycleData.nombre}
                          </span>
                          <svg
                            className={`w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-300 theme-text-secondary group-hover:text-blue-600 ${
                              expandedCycles.has(parseInt(cycleId))
                                ? "rotate-180"
                                : ""
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        {/* Courses List */}
                        {expandedCycles.has(parseInt(cycleId)) && (
                          <div className="border-t theme-divider">
                            {cycleData.cursos.map((curso) => (
                              <button
                                key={curso.id}
                                className={`course-button w-full text-left px-4 lg:px-5 py-2 lg:py-2.5 text-sm transition-all duration-300 cursor-pointer border-b border-gray-200 dark:border-gray-200 last:border-b-0 hover:bg-blue-400 hover:bg-opacity-20 group ${
                                  selectedCourse?.id === curso.id
                                    ? "bg-blue-100 bg-opacity-20 border-l-blue-400"
                                    : ""
                                }`}
                                onClick={() =>
                                  selectCourse(parseInt(cycleId), curso)
                                }
                              >
                                <span
                                  className={`text-sm ${
                                    selectedCourse?.id === curso.id
                                      ? "text-blue-400"
                                      : "theme-text-primary group-hover:text-blue-600"
                                  }`}
                                >
                                  {curso.nombre}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {selectedCourse ? (
                /* Información del curso */
                <div className="space-y-4 lg:space-y-6">
                  {/* Course Header */}
                  <div className="theme-card-large rounded-2xl lg:rounded-3xl border shadow-xl p-4 lg:p-6 xl:p-8">
                    <div className="flex items-start justify-between sm:flex-row gap-3 lg:gap-4">
                      <div className="flex-1 min-w-0">
                        <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold theme-text-primary mb-1 lg:mb-2 leading-tight break-words">
                          {selectedCourse.nombre}
                        </h1>
                        <p className="text-blue-600 font-medium text-sm lg:text-base">
                          {ciclosData[selectedCycle]?.nombre}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedCourse(null);
                          setSelectedCycle(null);
                        }}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer flex-shrink-0"
                      >
                        <svg
                          className="w-5 h-5 theme-text-secondary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Course Information */}
                  {selectedCourse.info && (
                    <div className="theme-card-large backdrop-blur-sm rounded-2xl lg:rounded-3xl border shadow-xl p-4 lg:p-6 xl:p-8">
                      <h2 className="text-base lg:text-lg xl:text-xl font-bold theme-text-primary mb-3 lg:mb-4 xl:mb-6 flex items-center">
                        <span className="mr-2 lg:mr-3 text-lg lg:text-xl xl:text-2xl">
                          📚
                        </span>
                        Información del Curso
                      </h2>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 xl:gap-4">
                        {/* Docente Principal */}
                        <div className="theme-card-small rounded-xl lg:rounded-2xl p-3 lg:p-4 xl:p-6 border theme-card-border">
                          <h3 className="font-bold text-blue-600 mb-2 lg:mb-3 flex items-center text-sm lg:text-base">
                            <span className="mr-2 text-sm lg:text-base xl:text-lg">
                              👨‍🏫
                            </span>
                            Docente Principal
                          </h3>
                          <p className="font-semibold theme-text-primary mb-1">
                            {selectedCourse.info.docente}
                          </p>
                          <p className="text-sm theme-text-secondary mb-2">
                            {selectedCourse.info.correoDocente}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm theme-text-secondary">
                              {selectedCourse.info.celularDocente}
                            </span>
                            {selectedCourse.info.whatsappDocente && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                WhatsApp
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Docente Auxiliar */}
                        <div className="theme-card-small rounded-xl lg:rounded-2xl p-3 lg:p-4 xl:p-6 border theme-card-border">
                          <h3 className="font-bold text-purple-600 mb-2 lg:mb-3 flex items-center text-sm lg:text-base">
                            <span className="mr-2 text-sm lg:text-base xl:text-lg">
                              👩‍🏫
                            </span>
                            Docente Auxiliar
                          </h3>
                          <p className="font-semibold theme-text-primary mb-1">
                            {selectedCourse.info.docenteAuxiliar}
                          </p>
                          <p className="text-sm theme-text-secondary mb-2">
                            {selectedCourse.info.correoDocenteAuxiliar}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm theme-text-secondary">
                              {selectedCourse.info.celularDocenteAuxiliar}
                            </span>
                            {!selectedCourse.info.whatsappDocenteAuxiliar && (
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                Solo llamadas
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Horarios */}
                      <div className="mt-6 lg:mt-8">
                        <h3 className="font-bold theme-text-primary mb-3 lg:mb-4 flex items-center text-sm lg:text-base">
                          <span className="mr-2 text-base lg:text-lg">🕒</span>
                          Horarios
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                          <div className="theme-card-small rounded-xl lg:rounded-2xl p-3 lg:p-4 border theme-card-border">
                            <h4 className="font-bold text-emerald-600 mb-2 flex items-center text-sm lg:text-base">
                              <span className="mr-2 text-xs lg:text-sm">
                                🅰️
                              </span>
                              Grupo A
                            </h4>
                            <p className="text-xs lg:text-sm theme-text-primary mb-1">
                              <span className="font-medium">Teoría:</span>{" "}
                              {selectedCourse.info.horarioA.teoria}
                            </p>
                            <p className="text-xs lg:text-sm theme-text-primary">
                              <span className="font-medium">Práctica:</span>{" "}
                              {selectedCourse.info.horarioA.practica}
                            </p>
                          </div>
                          <div className="theme-card-small rounded-xl lg:rounded-2xl p-3 lg:p-4 border theme-card-border">
                            <h4 className="font-bold text-orange-600 mb-2 flex items-center text-sm lg:text-base">
                              <span className="mr-2 text-xs lg:text-sm">
                                🅱️
                              </span>
                              Grupo B
                            </h4>
                            <p className="text-xs lg:text-sm theme-text-primary mb-1">
                              <span className="font-medium">Teoría:</span>{" "}
                              {selectedCourse.info.horarioB.teoria}
                            </p>
                            <p className="text-xs lg:text-sm theme-text-primary">
                              <span className="font-medium">Práctica:</span>{" "}
                              {selectedCourse.info.horarioB.practica}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Información Importante */}
                      {selectedCourse.info.importante && (
                        <div className="mt-8">
                          <h3 className="font-bold theme-text-primary mb-4 flex items-center">
                            <span className="mr-2 text-lg">⚠️</span>
                            Información Importante
                          </h3>
                          <div className="theme-card-small rounded-2xl p-4 border theme-card-border">
                            <ul className="space-y-2">
                              {selectedCourse.info.importante.map(
                                (item, index) => (
                                  <li
                                    key={index}
                                    className="text-sm theme-text-primary flex items-start"
                                  >
                                    <span className="text-amber-500 mr-2 mt-0.5 font-bold">
                                      •
                                    </span>
                                    <span>{item}</span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Materials */}
                  {selectedCourse.materiales &&
                  selectedCourse.materiales.length > 0 ? (
                    <div className="theme-card-bg backdrop-blur-sm rounded-2xl lg:rounded-3xl border theme-card-border shadow-xl p-4 lg:p-6 xl:p-8">
                      <h2 className="text-base lg:text-lg xl:text-xl font-bold theme-text-primary mb-3 lg:mb-4 xl:mb-6 flex items-center">
                        <span className="mr-2 lg:mr-3 text-lg lg:text-xl xl:text-2xl">
                          📁
                        </span>
                        Materiales del Curso
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                        {selectedCourse.materiales.map((material, index) => (
                          <button
                            key={index}
                            onClick={() => handleMaterialClick(material.url)}
                            className="theme-card-small border theme-card-border rounded-xl lg:rounded-2xl p-3 lg:p-4 theme-card-hover transition-all duration-300 hover:shadow-lg text-left cursor-pointer"
                          >
                            <div className="flex items-center space-x-2 lg:space-x-3">
                              <div className="flex-shrink-0">
                                {getIconForMaterial(material.tipo)}
                              </div>
                              <span className="theme-text-primary font-medium text-xs lg:text-sm break-words">
                                {material.titulo}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="theme-card-bg backdrop-blur-sm rounded-2xl lg:rounded-3xl border theme-card-border shadow-xl p-6 lg:p-8 text-center">
                      <div className="text-4xl lg:text-6xl mb-3 lg:mb-4">
                        📚
                      </div>
                      <h2 className="text-lg lg:text-xl font-bold theme-text-primary mb-2">
                        Materiales próximamente
                      </h2>
                      <p className="theme-text-secondary text-sm lg:text-base">
                        Los materiales para este curso se agregarán pronto.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* Timeline de publicaciones */
                <div className="space-y-6 mt-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl lg:text-2xl font-bold theme-text-primary flex items-center">
                      <span className="mr-3 text-xl lg:text-2xl">📰</span>
                      Noticias y Eventos
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {timelinePublications.map((publication) => (
                      <div
                        key={publication.id}
                        className="theme-card-bg rounded-3xl border theme-card-border shadow-xl overflow-hidden"
                      >
                        {/* Header de la publicación */}
                        <div className="p-6 border-b theme-divider">
                          <h3 className="text-lg font-bold theme-text-primary mb-4 text-center">
                            {publication.titulo}
                          </h3>
                          <div className="theme-text-primary text-sm leading-relaxed">
                            {(() => {
                              const isExpanded = expandedPublications.has(
                                publication.id
                              );
                              const { text: truncatedText, isTruncated } =
                                truncateText(publication.descripcion);
                              const displayText = isExpanded
                                ? publication.descripcion
                                : truncatedText;

                              return (
                                <div>
                                  <p className="whitespace-pre-line">
                                    {displayText}
                                    {!isExpanded && isTruncated && "..."}
                                  </p>
                                  {isTruncated && (
                                    <button
                                      onClick={() =>
                                        togglePublicationExpansion(
                                          publication.id
                                        )
                                      }
                                      className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 transition-colors cursor-pointer"
                                    >
                                      {isExpanded
                                        ? "Ver menos..."
                                        : "Ver más..."}
                                    </button>
                                  )}
                                </div>
                              );
                            })()}
                          </div>
                        </div>

                        {/* Imagen de la publicación */}
                        <div className="relative w-full">
                          <img
                            src={publication.imagen}
                            alt={publication.titulo}
                            className="w-full h-auto object-contain"
                          />
                        </div>

                        {/* Fecha de la publicación */}
                        <div className="p-6">
                          <p className="text-sm theme-text-secondary">
                            {publication.fecha} • {publication.hora}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
