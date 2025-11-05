import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase/supabase.config";

export const useUserTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false); // Flag para evitar recargas innecesarias

  // Cargar tareas del usuario
  const loadTasks = async () => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      setHasLoaded(true);
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("user_tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading tasks:", error);
        throw error;
      }

      setTasks(data || []);
      setError(null);
      setHasLoaded(true);
    } catch (err) {
      console.error("Error loading user tasks:", err);
      setError(err.message);

      // Fallback a localStorage si hay error
      try {
        const stored = localStorage.getItem(`userTasks_${user.id}`);
        if (stored) {
          const localTasks = JSON.parse(stored);
          setTasks(localTasks);
          setHasLoaded(true);
        }
      } catch (localError) {
        console.error("Error loading from localStorage:", localError);
      }
    } finally {
      setLoading(false);
    }
  };

  // Crear nueva tarea
  const createTask = async (taskData) => {
    if (!user) {
      console.log("No user authenticated");
      return false;
    }

    try {
      const newTask = {
        user_id: user.id,
        title: taskData.title,
        description: taskData.description || "",
        priority: taskData.priority || 1,
        completed: false,
      };

      const { data, error } = await supabase
        .from("user_tasks")
        .insert(newTask)
        .select()
        .single();

      if (error) {
        console.error("Error creating task:", error);
        throw error;
      }

      // Actualizar estado local
      setTasks((prev) => [data, ...prev]);

      // Guardar backup en localStorage
      saveTasksToLocalStorage([data, ...tasks]);

      return data;
    } catch (err) {
      console.error("Error creating task:", err);
      setError(err.message);
      return false;
    }
  };

  // Actualizar tarea
  const updateTask = async (taskId, updates) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from("user_tasks")
        .update(updates)
        .eq("id", taskId)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating task:", error);
        throw error;
      }

      // Actualizar estado local
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? data : task))
      );

      // Guardar backup en localStorage
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? data : task
      );
      saveTasksToLocalStorage(updatedTasks);

      return data;
    } catch (err) {
      console.error("Error updating task:", err);
      setError(err.message);
      return false;
    }
  };

  // Eliminar tarea
  const deleteTask = async (taskId) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from("user_tasks")
        .delete()
        .eq("id", taskId)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error deleting task:", error);
        throw error;
      }

      // Actualizar estado local
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);

      // Guardar backup en localStorage
      saveTasksToLocalStorage(updatedTasks);

      return true;
    } catch (err) {
      console.error("Error deleting task:", err);
      setError(err.message);
      return false;
    }
  };

  // Alternar estado completado de tarea
  const toggleTaskCompletion = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return false;

    return await updateTask(taskId, {
      completed: !task.completed,
      completed_at: !task.completed ? new Date().toISOString() : null,
    });
  };

  // Guardar en localStorage como backup
  const saveTasksToLocalStorage = (tasksToSave) => {
    if (!user?.id) return;

    try {
      localStorage.setItem(`userTasks_${user.id}`, JSON.stringify(tasksToSave));
    } catch (error) {
      console.warn("Error saving tasks to localStorage:", error);
    }
  };

  // Obtener estadísticas de tareas
  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;
    const highPriority = tasks.filter(
      (task) => task.priority === 3 && !task.completed
    ).length;

    return {
      total,
      completed,
      pending,
      highPriority,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  };

  // Cargar tareas solo una vez cuando el usuario esté disponible
  useEffect(() => {
    if (user && !hasLoaded) {
      loadTasks();
    } else if (!user) {
      // Reset si no hay usuario
      setTasks([]);
      setLoading(false);
      setHasLoaded(false);
    }
  }, [user?.id]); // Solo depende del ID del usuario, no del objeto completo

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    getTaskStats,
    loadTasks,
  };
};
