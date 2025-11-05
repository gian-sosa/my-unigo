import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase/supabase.config";

export const useUserProgress = () => {
  const { user } = useAuth();
  const [approvedCourses, setApprovedCourses] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false); // Flag para evitar recargas innecesarias

  // Función para obtener el ciclo de un curso
  const getCycleIdForCourse = (courseId) => {
    const cycleMap = {
      // Ciclo 1
      "com-oral": 1,
      metodologia: 1,
      "ciencias-nat": 1,
      "matematica-basica": 1,
      filosofia: 1,
      "fundamentos-si": 1,

      // Ciclo 2
      "comprension-textos": 2,
      "sociedad-cultura": 2,
      "realidad-nacional": 2,
      liderazgo: 2,
      psicologia: 2,
      algoritmos: 2,

      // Ciclo 3
      "calculo-1": 3,
      "fisica-1": 3,
      "estructura-datos": 3,
      "teoria-sistemas": 3,
      "seminario-empresarial": 3,
      "algebra-lineal": 3,

      // Ciclo 4
      "calculo-2": 4,
      "fisica-2": 4,
      poo: 4,
      "estadistica-prob": 4,
      "modelamiento-analisis": 4,
      "matematica-discreta": 4,

      // Ciclo 5
      "metodos-numericos": 5,
      "modelamiento-datos": 5,
      "sistemas-electricos": 5,
      "gestion-procesos": 5,
      "diseno-software": 5,
      "estadistica-aplicada": 5,

      // Ciclo 6
      "gestion-bd": 6,
      "sistemas-digitales": 6,
      "sistemas-operativos": 6,
      "innovacion-tec": 6,
      "construccion-software": 6,

      // Ciclo 7
      "gestion-datos": 7,
      "derecho-informatico": 7,
      "redes-datos": 7,
      "gestion-riesgos": 7,
      "metodologia-investigacion": 7,
      "pruebas-calidad": 7,

      // Ciclo 8
      "servicio-social": 8,
      "seminario-tesis-1": 8,
      "ia-1": 8,
      telecomunicaciones: 8,
      "arquitectura-software": 8,
      "desarrollo-web": 8,
      "informatica-forense": 8,

      // Ciclo 9
      "ia-2": 9,
      "seminario-tesis-2": 9,
      "practicas-pre": 9,
      "computacion-paralela": 9,
      "gestion-proyectos": 9,
      "programacion-moviles": 9,
      "big-data": 9,

      // Ciclo 10
      "auditoria-ti": 10,
      "seminario-tesis-3": 10,
      iot: 10,
      "transformacion-digital": 10,
      "comercio-electronico": 10,
      marketing: 10,
      "proyectos-inversion": 10,
    };

    return cycleMap[courseId] || 1; // Por defecto ciclo 1
  };

  // Cargar cursos aprobados del usuario
  const loadApprovedCourses = async () => {
    if (!user) {
      setApprovedCourses(new Set());
      setLoading(false);
      setHasLoaded(true);
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("user_progress")
        .select("course_id")
        .eq("user_id", user.id)
        .eq("completed", true);

      if (error) {
        console.error("Error loading approved courses:", error);
        throw error;
      }

      // Convertir array a Set para fácil acceso
      const approvedSet = new Set(data.map((item) => item.course_id));

      setApprovedCourses(approvedSet);
      setError(null);
      setHasLoaded(true);
    } catch (err) {
      console.error("Error loading user progress:", err);
      setError(err.message);

      // Fallback a localStorage si hay error
      console.log(
        "🔄 [useUserProgress] Intentando cargar desde localStorage..."
      );
      try {
        const stored = localStorage.getItem(`approvedCourses_${user.id}`);
        if (stored) {
          const localCourses = new Set(JSON.parse(stored));
          setApprovedCourses(localCourses);
          setHasLoaded(true);
        }
      } catch (localError) {
        console.error("Error loading from localStorage:", localError);
      }
    } finally {
      setLoading(false);
    }
  };

  // Marcar/desmarcar curso como aprobado
  const toggleCourseApproval = async (courseId) => {
    if (!user) {
      console.log("No user authenticated");
      return false;
    }

    const isCurrentlyApproved = approvedCourses.has(courseId);
    const newApprovalState = !isCurrentlyApproved;

    console.log(
      `🔄 Toggling course ${courseId}: ${isCurrentlyApproved} -> ${newApprovalState}`
    );

    // Actualizar UI inmediatamente para mejor experiencia de usuario
    setApprovedCourses((prevCourses) => {
      const newApprovedCourses = new Set(prevCourses);
      if (newApprovalState) {
        newApprovedCourses.add(courseId);
      } else {
        newApprovedCourses.delete(courseId);
      }
      return newApprovedCourses;
    });

    try {
      if (isCurrentlyApproved) {
        // Eliminar aprobación
        const { error } = await supabase
          .from("user_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("course_id", courseId);

        if (error) {
          console.error("Error removing course approval:", error);
          throw error;
        }
        console.log(`✅ Course ${courseId} removed from database`);
      } else {
        // Agregar aprobación
        const cycleId = getCycleIdForCourse(courseId);
        const insertData = {
          user_id: user.id,
          course_id: courseId,
          cycle_id: cycleId,
          material_id: "course", // Simplificado por ahora
          completed: true,
        };

        const { error } = await supabase
          .from("user_progress")
          .upsert(insertData, {
            onConflict: "user_id,course_id,cycle_id,material_id",
          });

        if (error) {
          console.error("Error adding course approval:", error);
          throw error;
        }
        console.log(
          `✅ Course ${courseId} added to database with cycle_id ${cycleId}`
        );
      }

      // Confirmar estado final y guardar en localStorage
      setApprovedCourses((prevCourses) => {
        const finalCourses = new Set(prevCourses);

        // Guardar backup en localStorage
        try {
          localStorage.setItem(
            `approvedCourses_${user.id}`,
            JSON.stringify(Array.from(finalCourses))
          );
          console.log(`💾 State saved to localStorage`);
        } catch (localError) {
          console.warn("Error saving backup to localStorage:", localError);
        }

        return finalCourses;
      });

      return true;
    } catch (err) {
      console.error("Error toggling course approval:", err);
      setError(err.message);

      // Revertir estado en caso de error
      setApprovedCourses((prevCourses) => {
        const revertedCourses = new Set(prevCourses);
        if (isCurrentlyApproved) {
          revertedCourses.add(courseId); // Revertir eliminación
        } else {
          revertedCourses.delete(courseId); // Revertir adición
        }
        console.log(`🔄 Reverted state for course ${courseId} due to error`);
        return revertedCourses;
      });

      return false;
    }
  };

  // Verificar si un curso está aprobado
  const isCourseApproved = (courseId) => {
    return approvedCourses.has(courseId);
  };

  // Obtener cursos aprobados como array
  const getApprovedCoursesArray = () => {
    return Array.from(approvedCourses);
  };

  // Cargar cursos solo una vez cuando el usuario esté disponible
  useEffect(() => {
    if (user && !hasLoaded) {
      loadApprovedCourses();
    } else if (!user) {
      // Reset si no hay usuario
      setApprovedCourses(new Set());
      setLoading(false);
      setHasLoaded(false);
    }
  }, [user?.id]); // Solo depende del ID del usuario, no del objeto completo

  return {
    approvedCourses,
    loading,
    error,
    toggleCourseApproval,
    isCourseApproved,
    getApprovedCoursesArray,
    loadApprovedCourses,
  };
};
