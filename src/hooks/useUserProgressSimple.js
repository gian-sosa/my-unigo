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
    console.log("🔄 [useUserProgress] Cargando cursos aprobados...");
    console.log("👤 [useUserProgress] Usuario actual:", user);

    if (!user) {
      console.log("❌ [useUserProgress] No hay usuario autenticado");
      setApprovedCourses(new Set());
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log("📡 [useUserProgress] Consultando Supabase...");

      const { data, error } = await supabase
        .from("user_progress")
        .select("course_id")
        .eq("user_id", user.id)
        .eq("completed", true);

      console.log("📊 [useUserProgress] Respuesta de Supabase:");
      console.log("  - Data:", data);
      console.log("  - Error:", error);

      if (error) {
        console.error("❌ [useUserProgress] Error de Supabase:", error);
        throw error;
      }

      // Convertir array a Set para fácil acceso
      const approvedSet = new Set(data.map((item) => item.course_id));
      console.log(
        "✅ [useUserProgress] Cursos aprobados cargados:",
        Array.from(approvedSet)
      );

      setApprovedCourses(approvedSet);
      setError(null);
    } catch (err) {
      console.error("💥 [useUserProgress] Error cargando cursos:", err);
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
          console.log(
            "✅ [useUserProgress] Cursos cargados desde localStorage"
          );
        }
      } catch (localError) {
        console.error(
          "❌ [useUserProgress] Error cargando desde localStorage:",
          localError
        );
      }
    } finally {
      setLoading(false);
      console.log("🏁 [useUserProgress] Carga completada");
    }
  };

  // Marcar/desmarcar curso como aprobado
  const toggleCourseApproval = async (courseId) => {
    console.log(
      "🔄 [toggleCourseApproval] Iniciando toggle para curso:",
      courseId
    );
    console.log("👤 [toggleCourseApproval] Usuario:", user);

    if (!user) {
      console.log("❌ [toggleCourseApproval] No hay usuario autenticado");
      return false;
    }

    try {
      const isCurrentlyApproved = approvedCourses.has(courseId);
      const newApprovalState = !isCurrentlyApproved;

      console.log(
        "📊 [toggleCourseApproval] Estado actual:",
        isCurrentlyApproved
      );
      console.log("🔄 [toggleCourseApproval] Nuevo estado:", newApprovalState);

      if (isCurrentlyApproved) {
        // Eliminar aprobación (marcar como no completado o eliminar registro)
        console.log("🗑️ [toggleCourseApproval] Eliminando aprobación");

        const { error } = await supabase
          .from("user_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("course_id", courseId);

        if (error) {
          console.error("❌ [toggleCourseApproval] Error eliminando:", error);
          throw error;
        }
        console.log(
          "✅ [toggleCourseApproval] Aprobación eliminada exitosamente"
        );
      } else {
        // Agregar aprobación
        console.log("➕ [toggleCourseApproval] Agregando aprobación");

        const insertData = {
          user_id: user.id,
          course_id: courseId,
          cycle_id: 1, // Simplificado por ahora
          material_id: "course", // Simplificado por ahora
          completed: true,
        };

        console.log("📝 [toggleCourseApproval] Datos a insertar:", insertData);

        const { error } = await supabase
          .from("user_progress")
          .upsert(insertData, {
            onConflict: "user_id,course_id,cycle_id,material_id",
          });

        if (error) {
          console.error("❌ [toggleCourseApproval] Error insertando:", error);
          throw error;
        }
        console.log(
          "✅ [toggleCourseApproval] Aprobación agregada exitosamente"
        );
      }

      // Actualizar estado local
      console.log("🔄 [toggleCourseApproval] Actualizando estado local");
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
        console.log(
          "💾 [toggleCourseApproval] Backup guardado en localStorage"
        );
      } catch (localError) {
        console.warn(
          "⚠️ [toggleCourseApproval] Error guardando backup:",
          localError
        );
      }

      console.log("🎉 [toggleCourseApproval] Toggle completado exitosamente");
      return true;
    } catch (err) {
      console.error("💥 [toggleCourseApproval] Error en toggle:", err);
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
