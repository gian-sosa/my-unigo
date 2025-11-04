import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useUserProgress } from "../hooks/useUserProgress";
import { useUserTasks } from "../hooks/useUserTasks";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

function Progreso() {
  const { user, loading } = useAuth();
  const { isDark } = useTheme();
  const {
    approvedCourses,
    loading: progressLoading,
    toggleCourseApproval,
    error: progressError,
    forceReload,
  } = useUserProgress();

  // Hook para manejar tareas
  const {
    tasks,
    loading: tasksLoading,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    getTaskStats,
    error: tasksError,
  } = useUserTasks();

  const [expandedCycles, setExpandedCycles] = useState(new Set());

  // Estados para el sistema de tareas
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskFormLoading, setTaskFormLoading] = useState(false);
  const [filterCompleted, setFilterCompleted] = useState(false);

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

  // Funciones para manejar tareas
  const handleCreateTask = async (taskData) => {
    setTaskFormLoading(true);
    const success = await createTask(taskData);
    if (success) {
      setShowTaskForm(false);
    }
    setTaskFormLoading(false);
  };

  const handleUpdateTask = async (taskData) => {
    setTaskFormLoading(true);
    const success = await updateTask(editingTask.id, taskData);
    if (success) {
      setEditingTask(null);
      setShowTaskForm(false);
    }
    setTaskFormLoading(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCancelTaskForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleDeleteTask = async (taskId) => {
    return await deleteTask(taskId);
  };

  const handleToggleTaskCompletion = async (taskId) => {
    await toggleTaskCompletion(taskId);
  };

  // Filtrar tareas
  const filteredTasks = tasks.filter((task) => {
    if (filterCompleted === "completed") return task.completed;
    if (filterCompleted === "pending") return !task.completed;
    return true;
  });

  // Obtener estadísticas de tareas
  const taskStats = getTaskStats();
  // Estructura completa de datos de todos los ciclos
  const ciclosData = {
    1: {
      nombre: "Primer Ciclo",
      cursos: [
        { id: "com-oral", nombre: "Comunicación Oral y Escrita", creditos: 3 },
        {
          id: "metodologia",
          nombre: "Metodología del Trabajo Universitario",
          creditos: 3,
        },
        {
          id: "ciencias-nat",
          nombre: "Ciencias Naturales y Medio Ambiente",
          creditos: 5,
        },
        { id: "matematica-basica", nombre: "Matemática Básica", creditos: 5 },
        { id: "filosofia", nombre: "Filosofía", creditos: 3 },
        {
          id: "fundamentos-si",
          nombre: "Fundamentos de Sistemas de Información",
          creditos: 3,
        },
      ],
    },
    2: {
      nombre: "Segundo Ciclo",
      cursos: [
        {
          id: "comprension-textos",
          nombre: "Comprensión y Producción de Textos",
          creditos: 4,
        },
        { id: "sociedad-cultura", nombre: "Sociedad y Cultura", creditos: 3 },
        {
          id: "realidad-nacional",
          nombre: "Realidad Nacional y Mundial",
          creditos: 3,
        },
        { id: "liderazgo", nombre: "Liderazgo y Gestión", creditos: 3 },
        {
          id: "psicologia",
          nombre: "Psicología y Desarrollo Humano",
          creditos: 3,
        },
        {
          id: "algoritmos",
          nombre: "Algoritmos y Solución de Problemas",
          creditos: 4,
        },
      ],
    },
    3: {
      nombre: "Tercer Ciclo",
      cursos: [
        { id: "calculo-1", nombre: "Cálculo I", creditos: 4 },
        { id: "fisica-1", nombre: "Física I", creditos: 4 },
        {
          id: "estructura-datos",
          nombre: "Estructura de Datos Fundamentales y Algoritmos",
          creditos: 3,
        },
        {
          id: "teoria-sistemas",
          nombre: "Teoría General de Sistemas",
          creditos: 3,
        },
        {
          id: "seminario-empresarial",
          nombre: "Seminario y Gestión Empresarial",
          creditos: 4,
        },
        { id: "algebra-lineal", nombre: "Álgebra Lineal", creditos: 3 },
      ],
    },
    4: {
      nombre: "Cuarto Ciclo",
      cursos: [
        { id: "calculo-2", nombre: "Cálculo II", creditos: 4 },
        { id: "fisica-2", nombre: "Física II", creditos: 4 },
        { id: "poo", nombre: "Programación Orientada a Objetos", creditos: 4 },
        {
          id: "estadistica-prob",
          nombre: "Estadística y Probabilidades",
          creditos: 4,
        },
        {
          id: "modelamiento-analisis",
          nombre: "Modelamiento de Análisis de Software",
          creditos: 4,
        },
        {
          id: "matematica-discreta",
          nombre: "Matemática Discreta",
          creditos: 2,
        },
      ],
    },
    5: {
      nombre: "Quinto Ciclo",
      cursos: [
        { id: "metodos-numericos", nombre: "Métodos Numéricos", creditos: 4 },
        {
          id: "modelamiento-datos",
          nombre: "Modelamiento de Datos",
          creditos: 4,
        },
        {
          id: "sistemas-electricos",
          nombre: "Sistemas Eléctricos y Electrónicos",
          creditos: 4,
        },
        {
          id: "gestion-procesos",
          nombre: "Gestión de Procesos de Negocios",
          creditos: 3,
        },
        { id: "diseno-software", nombre: "Diseño de Software", creditos: 4 },
        {
          id: "estadistica-aplicada",
          nombre: "Estadística Aplicada",
          creditos: 3,
        },
      ],
    },
    6: {
      nombre: "Sexto Ciclo",
      cursos: [
        {
          id: "gestion-bd",
          nombre: "Gestión de Entornos de Bases de Datos",
          creditos: 4,
        },
        {
          id: "sistemas-digitales",
          nombre: "Sistemas Digitales y Arquitectura de Computadoras",
          creditos: 4,
        },
        {
          id: "sistemas-operativos",
          nombre: "Sistemas Operativos",
          creditos: 4,
        },
        {
          id: "innovacion-tec",
          nombre: "Innovación Tecnológica, Creatividad y Emprendimiento",
          creditos: 3,
        },
        {
          id: "construccion-software",
          nombre: "Construcción y Evolución de Software",
          creditos: 4,
        },
      ],
    },
    7: {
      nombre: "Séptimo Ciclo",
      cursos: [
        {
          id: "gestion-datos",
          nombre: "Gestión de Datos e Información",
          creditos: 4,
        },
        {
          id: "derecho-informatico",
          nombre: "Derecho Informático",
          creditos: 2,
        },
        { id: "redes-datos", nombre: "Redes de Datos", creditos: 4 },
        {
          id: "gestion-riesgos",
          nombre: "Gestión de Riesgos y Seguridad de TI",
          creditos: 4,
        },
        {
          id: "metodologia-investigacion",
          nombre: "Metodología de la Investigación Científica",
          creditos: 4,
        },
        {
          id: "pruebas-calidad",
          nombre: "Pruebas y Aseguramiento de Calidad de Software",
          creditos: 3,
        },
      ],
    },
    8: {
      nombre: "Octavo Ciclo",
      cursos: [
        {
          id: "servicio-social",
          nombre: "Servicio Social Universitario",
          creditos: 3,
        },
        {
          id: "seminario-tesis-1",
          nombre: "Seminario de Tesis I",
          creditos: 4,
        },
        { id: "ia-1", nombre: "Inteligencia Artificial I", creditos: 4 },
        { id: "telecomunicaciones", nombre: "Telecomunicaciones", creditos: 4 },
        {
          id: "arquitectura-software",
          nombre: "Arquitectura de Software",
          creditos: 4,
        },
        { id: "desarrollo-web", nombre: "Desarrollo Web", creditos: 3 },
        {
          id: "informatica-forense",
          nombre: "Informática Forense",
          creditos: 3,
        },
      ],
    },
    9: {
      nombre: "Noveno Ciclo",
      cursos: [
        { id: "ia-2", nombre: "Inteligencia Artificial II", creditos: 4 },
        {
          id: "seminario-tesis-2",
          nombre: "Seminario de Tesis II",
          creditos: 3,
        },
        {
          id: "practicas-pre",
          nombre: "Prácticas Pre-Profesionales",
          creditos: 3,
        },
        {
          id: "computacion-paralela",
          nombre: "Computación Paralela y Distribuida",
          creditos: 4,
        },
        {
          id: "gestion-proyectos",
          nombre: "Gestión de Proyectos de Software",
          creditos: 4,
        },
        {
          id: "programacion-moviles",
          nombre: "Programación de Móviles",
          creditos: 3,
        },
        { id: "big-data", nombre: "Big Data", creditos: 3 },
      ],
    },
    10: {
      nombre: "Décimo Ciclo",
      cursos: [
        {
          id: "auditoria-ti",
          nombre: "Auditoría y Control de TI",
          creditos: 3,
        },
        {
          id: "seminario-tesis-3",
          nombre: "Seminario de Tesis III",
          creditos: 3,
        },
        { id: "iot", nombre: "Internet de las Cosas", creditos: 4 },
        {
          id: "transformacion-digital",
          nombre: "Transformación Digital",
          creditos: 4,
        },
        {
          id: "comercio-electronico",
          nombre: "Comercio Electrónico",
          creditos: 4,
        },
        { id: "marketing", nombre: "Marketing Empresarial", creditos: 3 },
        {
          id: "proyectos-inversion",
          nombre: "Formulación y Evaluación de Proyectos de Inversión en TI",
          creditos: 3,
        },
      ],
    },
  };

  // Función para calcular créditos totales
  const calcularCreditosTotales = () => {
    let total = 0;
    Object.values(ciclosData).forEach((ciclo) => {
      ciclo.cursos.forEach((curso) => {
        total += curso.creditos;
      });
    });
    return total;
  };

  // Función para calcular créditos completados
  const calcularCreditosCompletados = () => {
    let completados = 0;
    Object.values(ciclosData).forEach((ciclo) => {
      ciclo.cursos.forEach((curso) => {
        if (approvedCourses.has(curso.id)) {
          completados += curso.creditos;
        }
      });
    });
    return completados;
  };

  // Función para calcular créditos por ciclo
  const calcularCreditosCiclo = (numeroCiclo) => {
    const ciclo = ciclosData[numeroCiclo];
    if (!ciclo) return 0;
    return ciclo.cursos.reduce((total, curso) => total + curso.creditos, 0);
  };

  // Función para calcular el ciclo actual basado en créditos aprobados
  const calcularCicloActual = () => {
    const creditosCompletados = calcularCreditosCompletados();

    if (creditosCompletados === 0) return 1;
    if (creditosCompletados <= 21) return 1;
    if (creditosCompletados <= 43) return 2;
    if (creditosCompletados <= 65) return 3;
    if (creditosCompletados <= 87) return 4;
    if (creditosCompletados <= 109) return 5;
    if (creditosCompletados <= 131) return 6;
    if (creditosCompletados <= 153) return 7;
    if (creditosCompletados <= 175) return 8;
    if (creditosCompletados <= 197) return 9;
    return 10; // 198 o más créditos
  };

  // Datos de ejemplo del progreso académico
  const progressData = {
    cicloActual: calcularCicloActual(),
    totalCiclos: 10,
    creditosCompletados: calcularCreditosCompletados(),
    creditosTotales: calcularCreditosTotales(),
    cursosAprobados: approvedCourses.size,
    cursosPendientes:
      Object.values(ciclosData).reduce(
        (total, ciclo) => total + ciclo.cursos.length,
        0
      ) - approvedCourses.size,
    ciclosProgreso: [
      { numero: 1, estado: "completado", creditos: calcularCreditosCiclo(1) },
      { numero: 2, estado: "completado", creditos: calcularCreditosCiclo(2) },
      { numero: 3, estado: "completado", creditos: calcularCreditosCiclo(3) },
      { numero: 4, estado: "completado", creditos: calcularCreditosCiclo(4) },
      { numero: 5, estado: "completado", creditos: calcularCreditosCiclo(5) },
      { numero: 6, estado: "en-curso", creditos: calcularCreditosCiclo(6) },
      { numero: 7, estado: "pendiente", creditos: calcularCreditosCiclo(7) },
      { numero: 8, estado: "pendiente", creditos: calcularCreditosCiclo(8) },
      { numero: 9, estado: "pendiente", creditos: calcularCreditosCiclo(9) },
      { numero: 10, estado: "pendiente", creditos: calcularCreditosCiclo(10) },
    ],
    logros: [
      {
        titulo: "Primer puesto en ciclo",
        descripcion: "Ciclo III - 2024",
        icono: "🏆",
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
  };

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
      return "bg-yellow-400";
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
        return "bg-gray-300";
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
      <div className="min-h-screen theme-bg-gradient flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <div className="theme-text-primary text-sm font-medium">
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
    <div className="min-h-screen theme-bg-gradient">
      <Header />

      {/* Main Container - Con z-index bajo para no interferir con el header */}
      <div className="pt-16 md:pt-20 relative z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="theme-card-large backdrop-blur-sm rounded-3xl border shadow-xl p-8 relative z-0">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold theme-text-primary mb-2">
                    Mi Progreso Académico 🎓
                  </h1>
                  <p className="theme-text-secondary text-lg">
                    Seguimiento de tu avance en Ingeniería de Sistemas
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={forceReload}
                      disabled={progressLoading}
                      className="px-3 py-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors disabled:opacity-50"
                      title="Recargar progreso desde la base de datos"
                    >
                      {progressLoading ? (
                        <svg
                          className="animate-spin w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      )}
                    </button>
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-4xl">🎯</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="theme-card-small backdrop-blur-sm rounded-2xl p-6 border shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {progressData.cicloActual}/{progressData.totalCiclos}
                </div>
                <div className="text-sm theme-text-secondary">Ciclos</div>
              </div>
            </div>

            <div className="theme-card-small backdrop-blur-sm rounded-2xl p-6 border shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {progressData.creditosCompletados}
                </div>
                <div className="text-sm theme-text-secondary">Créditos</div>
              </div>
            </div>

            <div className="theme-card-small backdrop-blur-sm rounded-2xl p-6 border shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {Math.round(
                    (progressData.creditosCompletados /
                      progressData.creditosTotales) *
                      100
                  )}
                  %
                </div>
                <div className="text-sm theme-text-secondary">Completado</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="theme-card-large backdrop-blur-sm rounded-3xl border shadow-xl p-8">
              <h2 className="text-xl font-bold theme-text-primary mb-6 flex items-center">
                <span className="mr-3 text-2xl">📈</span>
                Progreso General
              </h2>

              <div className="space-y-4">
                {/* Progreso de Ciclos */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium theme-text-primary">
                      Ciclos Académicos
                    </span>
                    <span className="text-sm theme-text-secondary">
                      {progressData.cicloActual} de {progressData.totalCiclos}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
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
                    <span className="text-sm font-medium theme-text-primary">
                      Créditos Académicos
                    </span>
                    <span className="text-sm theme-text-secondary">
                      {progressData.creditosCompletados} de{" "}
                      {progressData.creditosTotales}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
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
            <div className="theme-card-large backdrop-blur-sm rounded-3xl border shadow-xl p-8">
              <h2 className="text-xl font-bold theme-text-primary mb-6 flex items-center">
                <span className="mr-3 text-2xl">📚</span>
                Progreso por Ciclos
              </h2>

              {/* Error de progreso */}
              {progressError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-800">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm">
                      Error al cargar progreso: {progressError}
                    </span>
                    <button
                      onClick={forceReload}
                      className="ml-2 px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                    >
                      Reintentar
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {progressData.ciclosProgreso.map((ciclo) => (
                  <div
                    key={ciclo.numero}
                    className="theme-card-small backdrop-blur-sm rounded-2xl border overflow-hidden"
                  >
                    {/* Cycle Header Button */}
                    <button
                      className="w-full text-left px-4 py-3 font-medium transition-all duration-300 flex items-center justify-between hover:bg-blue-50 cursor-pointer"
                      onClick={() => toggleCycle(ciclo.numero)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${getCycleIndicatorColor(
                            ciclo.numero
                          )}`}
                        ></div>
                        <span className="theme-text-primary text-sm">
                          {ciclosData[ciclo.numero]?.nombre}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-xs theme-text-secondary">
                            {getApprovedCoursesInCycle(ciclo.numero)}/
                            {ciclosData[ciclo.numero]?.cursos.length || 0}{" "}
                            cursos
                          </div>
                          <div className="text-xs font-medium theme-text-primary">
                            {ciclo.creditos} créditos
                          </div>
                        </div>
                        <svg
                          className={`w-5 h-5 transition-transform duration-300 theme-text-secondary ${
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
                      <div className="border-t theme-divider p-4">
                        <div className="space-y-2">
                          {ciclosData[ciclo.numero]?.cursos.map((curso) => (
                            <div
                              key={curso.id}
                              className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  id={curso.id}
                                  checked={approvedCourses.has(curso.id)}
                                  onChange={() => {
                                    console.log(
                                      `📝 Checkbox clicked for course: ${curso.id}`
                                    );
                                    toggleCourseApproval(curso.id);
                                  }}
                                  disabled={progressLoading}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <label
                                  htmlFor={curso.id}
                                  className={`text-sm cursor-pointer transition-colors ${
                                    approvedCourses.has(curso.id)
                                      ? "text-green-700 font-medium"
                                      : "theme-text-primary"
                                  } ${progressLoading ? "opacity-50" : ""}`}
                                >
                                  {curso.nombre}
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs theme-text-secondary bg-gray-100 px-2 py-1 rounded">
                                  {curso.creditos}
                                </span>
                                {approvedCourses.has(curso.id) && (
                                  <svg
                                    className="w-4 h-4 text-green-500"
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
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tareas y Pendientes */}
            <div className="theme-card-large backdrop-blur-sm rounded-3xl border shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold theme-text-primary flex items-center">
                  <span className="mr-3 text-2xl">📌</span>
                  Tareas y Pendientes
                </h2>
                <button
                  onClick={() => setShowTaskForm(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Nueva Tarea
                </button>
              </div>

              {/* Estadísticas de tareas */}
              {taskStats.total > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-3 theme-card-small rounded-lg border theme-card-border text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {taskStats.total}
                    </div>
                    <div className="text-sm theme-text-secondary">Total</div>
                  </div>
                  <div className="p-3 theme-card-small rounded-lg border theme-card-border text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {taskStats.completed}
                    </div>
                    <div className="text-sm theme-text-secondary">
                      Completadas
                    </div>
                  </div>
                  <div className="p-3 theme-card-small rounded-lg border theme-card-border text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {taskStats.pending}
                    </div>
                    <div className="text-sm theme-text-secondary">
                      Pendientes
                    </div>
                  </div>
                  <div className="p-3 theme-card-small rounded-lg border theme-card-border text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {taskStats.highPriority}
                    </div>
                    <div className="text-sm theme-text-secondary">
                      Alta Prioridad
                    </div>
                  </div>
                </div>
              )}

              {/* Filtros */}
              {taskStats.total > 0 && (
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setFilterCompleted(false)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      filterCompleted === false
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Todas
                  </button>
                  <button
                    onClick={() => setFilterCompleted("pending")}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      filterCompleted === "pending"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Pendientes
                  </button>
                  <button
                    onClick={() => setFilterCompleted("completed")}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      filterCompleted === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Completadas
                  </button>
                </div>
              )}

              {/* Formulario de tarea */}
              {showTaskForm && (
                <div className="mb-6 p-4 theme-card-small rounded-xl border theme-card-border">
                  <h3 className="font-bold theme-text-primary mb-4">
                    {editingTask ? "Editar Tarea" : "Nueva Tarea"}
                  </h3>
                  <TaskForm
                    onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                    onCancel={handleCancelTaskForm}
                    initialData={editingTask}
                    loading={taskFormLoading}
                  />
                </div>
              )}

              {/* Lista de tareas */}
              <div className="space-y-3">
                {tasksLoading && (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center gap-2 theme-text-secondary">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Cargando tareas...
                    </div>
                  </div>
                )}

                {!tasksLoading && filteredTasks.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">📝</div>
                    <div className="theme-text-secondary">
                      {taskStats.total === 0
                        ? "¡Comienza agregando tu primera tarea!"
                        : "No hay tareas que coincidan con el filtro seleccionado"}
                    </div>
                  </div>
                )}

                {!tasksLoading && filteredTasks.length > 0 && (
                  <div className="space-y-3">
                    {filteredTasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onToggleComplete={handleToggleTaskCompletion}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                        loading={tasksLoading}
                      />
                    ))}
                  </div>
                )}

                {tasksError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-800">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Error al cargar tareas: {tasksError}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progreso;
