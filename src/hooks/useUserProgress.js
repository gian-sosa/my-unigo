import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase/supabase.config";

export const useUserProgress = () => {
  const { user } = useAuth();
  const [approvedCourses, setApprovedCourses] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar cursos aprobados del usuario
  const loadApprovedCourses = async () => {
    if (!user) {
      setApprovedCourses(new Set());
      setLoading(false);
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

    try {
      const isCurrentlyApproved = approvedCourses.has(courseId);
      const newApprovalState = !isCurrentlyApproved;

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
      } else {
        // Agregar aprobación
        const insertData = {
          user_id: user.id,
          course_id: courseId,
          cycle_id: 1, // Simplificado por ahora
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
      }

      // Actualizar estado local
      const newApprovedCourses = new Set(approvedCourses);
      if (newApprovalState) {
        newApprovedCourses.add(courseId);
      } else {
        newApprovedCourses.delete(courseId);
      }

      setApprovedCourses(newApprovedCourses);

      // Guardar también en localStorage como backup
      try {
        localStorage.setItem(
          `approvedCourses_${user.id}`,
          JSON.stringify(Array.from(newApprovedCourses))
        );
      } catch (localError) {
        console.warn("Error saving backup to localStorage:", localError);
      }

      return true;
    } catch (err) {
      console.error("Error toggling course approval:", err);
      setError(err.message);
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

  // Cargar cursos cuando el usuario cambie
  useEffect(() => {
    loadApprovedCourses();
  }, [user]);

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
