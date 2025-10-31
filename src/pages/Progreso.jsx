import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/Header";

function Progreso() {
  const { user, loading } = useAuth();
  const { isDark } = useTheme();
  const [expandedCycles, setExpandedCycles] = useState(new Set());

  // Función para cargar cursos aprobados desde localStorage
  const loadApprovedCourses = () => {
    if (!user?.id) return new Set();

    try {
      const stored = localStorage.getItem(`approvedCourses_${user.id}`);
      if (stored) {
        return new Set(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error cargando cursos aprobados:", error);
    }

    // Cursos por defecto si no hay datos guardados (ciclos 1-5 completados)
    return new Set([
      "com-oral",
      "metodologia",
      "ciencias-nat",
      "matematica-basica",
      "filosofia",
      "fundamentos-si", // Ciclo 1
      "comprension-textos",
      "sociedad-cultura",
      "realidad-nacional",
      "liderazgo",
      "psicologia",
      "algoritmos", // Ciclo 2
      "calculo-1",
      "fisica-1",
      "estructura-datos",
      "teoria-sistemas",
      "seminario-empresarial",
      "algebra-lineal", // Ciclo 3
      "calculo-2",
      "fisica-2",
      "poo",
      "estadistica-prob",
      "modelamiento-analisis",
      "matematica-discreta", // Ciclo 4
      "metodos-numericos",
      "modelamiento-datos",
      "sistemas-electricos",
      "gestion-procesos",
      "diseno-software",
      "estadistica-aplicada", // Ciclo 5
    ]);
  };

  const [approvedCourses, setApprovedCourses] = useState(loadApprovedCourses);

  // Efecto para cargar datos cuando el usuario esté disponible
  useEffect(() => {
    if (user?.id) {
      setApprovedCourses(loadApprovedCourses());
    }
  }, [user?.id]);

  // Función para guardar cursos aprobados en localStorage
  const saveApprovedCourses = (newApprovedCourses) => {
    if (!user?.id) return;

    try {
      localStorage.setItem(
        `approvedCourses_${user.id}`,
        JSON.stringify(Array.from(newApprovedCourses))
      );
    } catch (error) {
      console.error("Error guardando cursos aprobados:", error);
    }
  };

  // Estructura completa de datos de todos los ciclos
  const ciclosData = {
    1: {
      nombre: "Primer Ciclo",
      cursos: [
        { id: "com-oral", nombre: "Comunicación Oral y Escrita" },
        { id: "metodologia", nombre: "Metodología del Trabajo Universitario" },
        { id: "ciencias-nat", nombre: "Ciencias Naturales y Medio Ambiente" },
        { id: "matematica-basica", nombre: "Matemática Básica" },
        { id: "filosofia", nombre: "Filosofía" },
        {
          id: "fundamentos-si",
          nombre: "Fundamentos de Sistemas de Información",
        },
      ],
    },
    2: {
      nombre: "Segundo Ciclo",
      cursos: [
        {
          id: "comprension-textos",
          nombre: "Comprensión y Producción de Textos",
        },
        { id: "sociedad-cultura", nombre: "Sociedad y Cultura" },
        { id: "realidad-nacional", nombre: "Realidad Nacional y Mundial" },
        { id: "liderazgo", nombre: "Liderazgo y Gestión" },
        { id: "psicologia", nombre: "Psicología y Desarrollo Humano" },
        { id: "algoritmos", nombre: "Algoritmos y Solución de Problemas" },
      ],
    },
    3: {
      nombre: "Tercer Ciclo",
      cursos: [
        { id: "calculo-1", nombre: "Cálculo I" },
        { id: "fisica-1", nombre: "Física I" },
        {
          id: "estructura-datos",
          nombre: "Estructura de Datos Fundamentales y Algoritmos",
        },
        { id: "teoria-sistemas", nombre: "Teoría General de Sistemas" },
        {
          id: "seminario-empresarial",
          nombre: "Seminario y Gestión Empresarial",
        },
        { id: "algebra-lineal", nombre: "Álgebra Lineal" },
      ],
    },
    4: {
      nombre: "Cuarto Ciclo",
      cursos: [
        { id: "calculo-2", nombre: "Cálculo II" },
        { id: "fisica-2", nombre: "Física II" },
        { id: "poo", nombre: "Programación Orientada a Objetos" },
        { id: "estadistica-prob", nombre: "Estadística y Probabilidades" },
        {
          id: "modelamiento-analisis",
          nombre: "Modelamiento de Análisis de Software",
        },
        { id: "matematica-discreta", nombre: "Matemática Discreta" },
      ],
    },
    5: {
      nombre: "Quinto Ciclo",
      cursos: [
        { id: "metodos-numericos", nombre: "Métodos Numéricos" },
        { id: "modelamiento-datos", nombre: "Modelamiento de Datos" },
        {
          id: "sistemas-electricos",
          nombre: "Sistemas Eléctricos y Electrónicos",
        },
        { id: "gestion-procesos", nombre: "Gestión de Procesos de Negocios" },
        { id: "diseno-software", nombre: "Diseño de Software" },
        { id: "estadistica-aplicada", nombre: "Estadística Aplicada" },
      ],
    },
    6: {
      nombre: "Sexto Ciclo",
      cursos: [
        { id: "gestion-bd", nombre: "Gestión de Entornos de Bases de Datos" },
        {
          id: "sistemas-digitales",
          nombre: "Sistemas Digitales y Arquitectura de Computadoras",
        },
        { id: "sistemas-operativos", nombre: "Sistemas Operativos" },
        {
          id: "innovacion-tec",
          nombre: "Innovación Tecnológica, Creatividad y Emprendimiento",
        },
        {
          id: "construccion-software",
          nombre: "Construcción y Evolución de Software",
        },
      ],
    },
    7: {
      nombre: "Séptimo Ciclo",
      cursos: [
        { id: "gestion-datos", nombre: "Gestión de Datos e Información" },
        { id: "derecho-informatico", nombre: "Derecho Informático" },
        { id: "redes-datos", nombre: "Redes de Datos" },
        {
          id: "gestion-riesgos",
          nombre: "Gestión de Riesgos y Seguridad de TI",
        },
        {
          id: "metodologia-investigacion",
          nombre: "Metodología de la Investigación Científica",
        },
        {
          id: "pruebas-calidad",
          nombre: "Pruebas y Aseguramiento de Calidad de Software",
        },
      ],
    },
    8: {
      nombre: "Octavo Ciclo",
      cursos: [
        { id: "servicio-social", nombre: "Servicio Social Universitario" },
        { id: "seminario-tesis-1", nombre: "Seminario de Tesis I" },
        { id: "ia-1", nombre: "Inteligencia Artificial I" },
        { id: "telecomunicaciones", nombre: "Telecomunicaciones" },
        { id: "arquitectura-software", nombre: "Arquitectura de Software" },
        { id: "desarrollo-web", nombre: "Desarrollo Web" },
        { id: "informatica-forense", nombre: "Informática Forense" },
      ],
    },
    9: {
      nombre: "Noveno Ciclo",
      cursos: [
        { id: "ia-2", nombre: "Inteligencia Artificial II" },
        { id: "seminario-tesis-2", nombre: "Seminario de Tesis II" },
        { id: "practicas-pre", nombre: "Prácticas Pre-Profesionales" },
        {
          id: "computacion-paralela",
          nombre: "Computación Paralela y Distribuida",
        },
        { id: "gestion-proyectos", nombre: "Gestión de Proyectos de Software" },
        { id: "programacion-moviles", nombre: "Programación de Móviles" },
        { id: "big-data", nombre: "Big Data" },
      ],
    },
    10: {
      nombre: "Décimo Ciclo",
      cursos: [
        { id: "auditoria-ti", nombre: "Auditoría y Control de TI" },
        { id: "seminario-tesis-3", nombre: "Seminario de Tesis III" },
        { id: "iot", nombre: "Internet de las Cosas" },
        { id: "transformacion-digital", nombre: "Transformación Digital" },
        { id: "comercio-electronico", nombre: "Comercio Electrónico" },
        { id: "marketing", nombre: "Marketing Empresarial" },
        {
          id: "proyectos-inversion",
          nombre: "Formulación y Evaluación de Proyectos de Inversión en TI",
        },
      ],
    },
  };

  // Datos de ejemplo del progreso académico
  const [progressData] = useState({
    cicloActual: 6,
    totalCiclos: 10,
    creditosCompletados: 107,
    creditosTotales: 202,
    promedioGeneral: 15.8,
    cursosAprobados: 28,
    cursosPendientes: 12,
    ciclosProgreso: [
      { numero: 1, estado: "completado", promedio: 16.2, creditos: 22 },
      { numero: 2, estado: "completado", promedio: 15.8, creditos: 20 },
      { numero: 3, estado: "completado", promedio: 16.5, creditos: 21 },
      { numero: 4, estado: "completado", promedio: 15.2, creditos: 22 },
      { numero: 5, estado: "completado", promedio: 16.0, creditos: 22 },
      { numero: 6, estado: "en-curso", promedio: 15.8, creditos: 19 },
      { numero: 7, estado: "pendiente", promedio: null, creditos: 21 },
      { numero: 8, estado: "pendiente", promedio: null, creditos: 19 },
      { numero: 9, estado: "pendiente", promedio: null, creditos: 18 },
      { numero: 10, estado: "pendiente", promedio: null, creditos: 18 },
    ],
    logros: [
      {
        titulo: "Primer puesto en ciclo",
        descripcion: "Ciclo III - 2024",
        icono: "🏆",
      },
      {
        titulo: "Mejor promedio general",
        descripcion: "Top 10% de la promoción",
        icono: "⭐",
      },
      {
        titulo: "Participación destacada",
        descripcion: "Proyecto de investigación",
        icono: "🔬",
      },
      {
        titulo: "Liderazgo estudiantil",
        descripcion: "Representante de aula",
        icono: "👥",
      },
    ],
  });

  // Función para alternar expansión de ciclos
  const toggleCycle = (cycleId) => {
    const newExpanded = new Set(expandedCycles);
    if (newExpanded.has(cycleId)) {
      newExpanded.delete(cycleId);
    } else {
      newExpanded.add(cycleId);
    }
    setExpandedCycles(newExpanded);
  };

  // Función para alternar aprobación de cursos
  const toggleCourseApproval = (courseId) => {
    const newApproved = new Set(approvedCourses);
    if (newApproved.has(courseId)) {
      newApproved.delete(courseId);
    } else {
      newApproved.add(courseId);
    }
    setApprovedCourses(newApproved);
    saveApprovedCourses(newApproved); // Guardar cambios en localStorage
  };

  // Función para obtener cursos aprobados por ciclo
  const getApprovedCoursesInCycle = (cycleId) => {
    const cycle = ciclosData[cycleId];
    if (!cycle) return 0;
    return cycle.cursos.filter((curso) => approvedCourses.has(curso.id)).length;
  };

  // Función para obtener el color del indicador basado en progreso de cursos
  const getCycleIndicatorColor = (cycleId) => {
    const cycle = ciclosData[cycleId];
    if (!cycle) return "bg-gray-300";

    const totalCourses = cycle.cursos.length;
    const approvedCourses = getApprovedCoursesInCycle(cycleId);

    if (approvedCourses === 0) {
      // Ningún curso marcado - ROJO
      return "bg-red-500";
    } else if (approvedCourses < totalCourses) {
      // Al menos 1 curso sin marcar - NARANJA
      return "bg-orange-500";
    } else {
      // Todos los cursos marcados - VERDE
      return "bg-green-500";
    }
  };

  // Función para obtener el color del estado (mantener para compatibilidad)
  const getEstadoColor = (estado) => {
    switch (estado) {
      case "completado":
        return "bg-green-500";
      case "en-curso":
        return "bg-blue-500";
      case "pendiente":
        return "bg-gray-300 dark:bg-gray-600";
      default:
        return "bg-gray-300";
    }
  };

  // Función para obtener el texto del estado
  const getEstadoTexto = (estado) => {
    switch (estado) {
      case "completado":
        return "Completado";
      case "en-curso":
        return "En Curso";
      case "pendiente":
        return "Pendiente";
      default:
        return "Sin estado";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <div className="text-gray-900 dark:text-white text-sm font-medium">
            Cargando progreso...
          </div>
        </div>
      </div>
    );
  }

  if (user === null) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header />

      {/* Main Container */}
      <div className="pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-xl p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Mi Progreso Académico 📊
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Seguimiento de tu avance en Ingeniería de Sistemas
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🎯</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {progressData.cicloActual}/{progressData.totalCiclos}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Ciclos
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {progressData.promedioGeneral}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Promedio
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {progressData.creditosCompletados}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Créditos
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                  {Math.round(
                    (progressData.creditosCompletados /
                      progressData.creditosTotales) *
                      100
                  )}
                  %
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Completado
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-xl p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="mr-3 text-2xl">📈</span>
                Progreso General
              </h2>

              <div className="space-y-4">
                {/* Progreso de Ciclos */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ciclos Académicos
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {progressData.cicloActual} de {progressData.totalCiclos}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          (progressData.cicloActual /
                            progressData.totalCiclos) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Progreso de Créditos */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Créditos Académicos
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {progressData.creditosCompletados} de{" "}
                      {progressData.creditosTotales}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          (progressData.creditosCompletados /
                            progressData.creditosTotales) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Progreso por Ciclos */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-xl p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="mr-3 text-2xl">📚</span>
                Progreso por Ciclos
              </h2>

              <div className="space-y-3">
                {progressData.ciclosProgreso.map((ciclo) => (
                  <div
                    key={ciclo.numero}
                    className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-slate-600/30 overflow-hidden"
                  >
                    {/* Cycle Header Button */}
                    <button
                      className="w-full text-left px-4 py-3 font-medium transition-all duration-300 flex items-center justify-between hover:bg-blue-50 dark:hover:bg-slate-600/50 cursor-pointer"
                      onClick={() => toggleCycle(ciclo.numero)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${getCycleIndicatorColor(
                            ciclo.numero
                          )}`}
                        ></div>
                        <span className="text-gray-900 dark:text-white text-sm">
                          {ciclosData[ciclo.numero]?.nombre}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {getApprovedCoursesInCycle(ciclo.numero)}/
                            {ciclosData[ciclo.numero]?.cursos.length || 0}{" "}
                            cursos
                          </div>
                          <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {ciclo.promedio ? ciclo.promedio.toFixed(1) : "-"} •{" "}
                            {ciclo.creditos} créd.
                          </div>
                        </div>
                        <svg
                          className={`w-5 h-5 transition-transform duration-300 text-gray-600 dark:text-gray-400 ${
                            expandedCycles.has(ciclo.numero) ? "rotate-180" : ""
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
                      </div>
                    </button>

                    {/* Courses List */}
                    {expandedCycles.has(ciclo.numero) && (
                      <div className="border-t border-gray-200/50 dark:border-slate-600/50 p-4">
                        <div className="space-y-2">
                          {ciclosData[ciclo.numero]?.cursos.map((curso) => (
                            <div
                              key={curso.id}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600/30 transition-colors"
                            >
                              <input
                                type="checkbox"
                                id={curso.id}
                                checked={approvedCourses.has(curso.id)}
                                onChange={() => toggleCourseApproval(curso.id)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                              />
                              <label
                                htmlFor={curso.id}
                                className={`text-sm cursor-pointer transition-colors ${
                                  approvedCourses.has(curso.id)
                                    ? "text-green-700 dark:text-green-300 font-medium"
                                    : "text-gray-700 dark:text-gray-300"
                                }`}
                              >
                                {curso.nombre}
                              </label>
                              {approvedCourses.has(curso.id) && (
                                <svg
                                  className="w-4 h-4 text-green-500 ml-auto"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Logros y Reconocimientos */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-xl p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="mr-3 text-2xl">🏆</span>
                Logros y Reconocimientos
              </h2>

              <div className="space-y-4">
                {progressData.logros.map((logro, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-700/50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{logro.icono}</div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white mb-1">
                          {logro.titulo}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {logro.descripcion}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Meta del siguiente logro */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-700/50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <div className="font-bold text-blue-700 dark:text-blue-300">
                      Próximo Objetivo
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">
                      Mantener promedio mayor a 16.0 este ciclo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progreso;
