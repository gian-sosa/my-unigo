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
    if (!user) {
      setProgress({});
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;

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

      setProgress(progressMap);
      setError(null);
    } catch (err) {
      console.error("Error loading user progress:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Verificar si un material está completado
  const isMaterialCompleted = (materialKey) => {
    return progress[materialKey]?.completed || false;
  };

  // Marcar/desmarcar material como completado
  const toggleMaterialProgress = async (materialKey) => {
    if (!user) return false;

    try {
      const existingProgress = progress[materialKey];
      const isCurrentlyCompleted = existingProgress?.completed || false;
      const newCompletedState = !isCurrentlyCompleted;

      // Extraer courseId y materialId del key
      const [courseId, materialIndex] = materialKey.split("-");

      if (existingProgress) {
        // Actualizar progreso existente
        const { error } = await supabase
          .from("user_progress")
          .update({
            completed: newCompletedState,
            completed_at: newCompletedState ? new Date().toISOString() : null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingProgress.id);

        if (error) throw error;
      } else {
        // Crear nuevo progreso
        const { error } = await supabase.from("user_progress").insert({
          user_id: user.id,
          course_id: courseId,
          cycle_id: 1, // Para simplificar, usamos un ciclo por defecto
          material_id: materialIndex,
          completed: newCompletedState,
          completed_at: newCompletedState ? new Date().toISOString() : null,
        });

        if (error) throw error;
      }

      // Actualizar estado local
      setProgress((prev) => ({
        ...prev,
        [materialKey]: {
          completed: newCompletedState,
          completed_at: newCompletedState ? new Date().toISOString() : null,
          id: existingProgress?.id,
        },
      }));

      return true;
    } catch (err) {
      console.error("Error updating progress:", err);
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
