import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase/supabase.config";

export const useUserProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar progreso del usuario
  const loadUserProgress = async () => {
    console.log("🔄 [useUserProgress] Cargando progreso del usuario...");
    console.log("👤 [useUserProgress] Usuario actual:", user);

    if (!user) {
      console.log("❌ [useUserProgress] No hay usuario autenticado");
      setProgress({});
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log("📡 [useUserProgress] Consultando Supabase...");

      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id);

      console.log("📊 [useUserProgress] Respuesta de Supabase:");
      console.log("  - Data:", data);
      console.log("  - Error:", error);

      if (error) {
        console.error("❌ [useUserProgress] Error de Supabase:", error);
        throw error;
      }

      // Convertir array a objeto para fácil acceso
      const progressMap = {};
      data.forEach((item) => {
        const key = `${item.course_id}-${item.material_id}`;
        progressMap[key] = {
          completed: item.completed,
          completed_at: item.completed_at,
          id: item.id,
        };
      });

      console.log("✅ [useUserProgress] Progreso cargado:", progressMap);
      setProgress(progressMap);
      setError(null);
    } catch (err) {
      console.error("💥 [useUserProgress] Error cargando progreso:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      console.log("🏁 [useUserProgress] Carga completada");
    }
  };

  // Verificar si un material está completado
  const isMaterialCompleted = (materialKey) => {
    return progress[materialKey]?.completed || false;
  };

  // Marcar/desmarcar material como completado
  const toggleMaterialProgress = async (materialKey) => {
    console.log(
      "🔄 [toggleMaterialProgress] Iniciando toggle para:",
      materialKey
    );
    console.log("👤 [toggleMaterialProgress] Usuario:", user);

    if (!user) {
      console.log("❌ [toggleMaterialProgress] No hay usuario autenticado");
      return false;
    }

    try {
      const existingProgress = progress[materialKey];
      const isCurrentlyCompleted = existingProgress?.completed || false;
      const newCompletedState = !isCurrentlyCompleted;

      console.log(
        "📊 [toggleMaterialProgress] Estado actual:",
        isCurrentlyCompleted
      );
      console.log(
        "🔄 [toggleMaterialProgress] Nuevo estado:",
        newCompletedState
      );

      // Extraer courseId y materialId del key
      const [courseId, materialIndex] = materialKey.split("-");
      console.log(
        "📝 [toggleMaterialProgress] CourseId:",
        courseId,
        "MaterialIndex:",
        materialIndex
      );

      if (existingProgress) {
        // Actualizar progreso existente
        console.log(
          "🔄 [toggleMaterialProgress] Actualizando progreso existente, ID:",
          existingProgress.id
        );

        const { error } = await supabase
          .from("user_progress")
          .update({
            completed: newCompletedState,
            completed_at: newCompletedState ? new Date().toISOString() : null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingProgress.id);

        if (error) {
          console.error(
            "❌ [toggleMaterialProgress] Error actualizando:",
            error
          );
          throw error;
        }
        console.log(
          "✅ [toggleMaterialProgress] Progreso actualizado exitosamente"
        );
      } else {
        // Crear nuevo progreso
        console.log("➕ [toggleMaterialProgress] Creando nuevo progreso");

        const insertData = {
          user_id: user.id,
          course_id: courseId,
          cycle_id: 1, // Para simplificar, usamos un ciclo por defecto
          material_id: materialIndex,
          completed: newCompletedState,
          completed_at: newCompletedState ? new Date().toISOString() : null,
        };

        console.log(
          "📝 [toggleMaterialProgress] Datos a insertar:",
          insertData
        );

        const { error } = await supabase
          .from("user_progress")
          .insert(insertData);

        if (error) {
          console.error("❌ [toggleMaterialProgress] Error insertando:", error);
          throw error;
        }
        console.log(
          "✅ [toggleMaterialProgress] Nuevo progreso creado exitosamente"
        );
      }

      // Actualizar estado local
      console.log("🔄 [toggleMaterialProgress] Actualizando estado local");
      setProgress((prev) => ({
        ...prev,
        [materialKey]: {
          completed: newCompletedState,
          completed_at: newCompletedState ? new Date().toISOString() : null,
          id: existingProgress?.id,
        },
      }));

      console.log("🎉 [toggleMaterialProgress] Toggle completado exitosamente");
      return true;
    } catch (err) {
      console.error("💥 [toggleMaterialProgress] Error en toggle:", err);
      setError(err.message);
      return false;
    }
  };

  // Obtener estadísticas de progreso para un curso
  const getCourseProgress = (courseId) => {
    const courseProgressEntries = Object.entries(progress).filter(([key]) => {
      const [cId] = key.split("-");
      return cId === courseId;
    });

    const completed = courseProgressEntries.filter(
      ([, data]) => data.completed
    ).length;
    const total = courseProgressEntries.length;

    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  };

  // Obtener estadísticas generales del usuario
  const getOverallProgress = () => {
    const allEntries = Object.values(progress);
    const completed = allEntries.filter((item) => item.completed).length;
    const total = allEntries.length;

    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  };

  // Cargar progreso cuando el usuario cambie
  useEffect(() => {
    loadUserProgress();
  }, [user]);

  return {
    progress,
    loading,
    error,
    isMaterialCompleted,
    toggleMaterialProgress,
    getCourseProgress,
    getOverallProgress,
    reloadProgress: loadUserProgress,
  };
};
