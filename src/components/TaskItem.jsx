import { useState } from "react";

const TaskItem = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  loading = false,
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 3:
        return {
          color: "bg-red-100 text-red-700 border-red-200",
          label: "Alta",
          icon: "🔴",
        };
      case 2:
        return {
          color: "bg-yellow-100 text-yellow-700 border-yellow-200",
          label: "Media",
          icon: "🟡",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-700 border-gray-200",
          label: "Baja",
          icon: "⚪",
        };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleToggleComplete = async () => {
    setActionLoading(true);
    await onToggleComplete(task.id);
    setActionLoading(false);
  };

  const handleDelete = async () => {
    setActionLoading(true);
    const success = await onDelete(task.id);
    if (success) {
      setShowConfirmDelete(false);
    }
    setActionLoading(false);
  };

  const priorityConfig = getPriorityConfig(task.priority);

  return (
    <div
      className={`p-4 rounded-xl border transition-all duration-200 ${
        task.completed
          ? "bg-green-50 border-green-200 opacity-75"
          : "theme-card-small theme-card-border hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={handleToggleComplete}
          disabled={actionLoading || loading}
          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            task.completed
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300 hover:border-green-500"
          }`}
        >
          {task.completed && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Contenido de la tarea */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3
                className={`font-medium transition-all ${
                  task.completed
                    ? "text-green-700 line-through"
                    : "theme-text-primary"
                }`}
              >
                {task.title}
              </h3>

              {task.description && (
                <p
                  className={`mt-1 text-sm transition-all ${
                    task.completed
                      ? "text-green-600 line-through"
                      : "theme-text-secondary"
                  }`}
                >
                  {task.description}
                </p>
              )}

              <div className="flex items-center gap-3 mt-2">
                {/* Prioridad */}
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${priorityConfig.color}`}
                >
                  <span>{priorityConfig.icon}</span>
                  {priorityConfig.label}
                </span>

                {/* Fecha de creación */}
                <span className="text-xs theme-text-secondary">
                  📅 {formatDate(task.created_at)}
                </span>

                {/* Fecha de completado */}
                {task.completed && task.completed_at && (
                  <span className="text-xs text-green-600">
                    ✅ {formatDate(task.completed_at)}
                  </span>
                )}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex items-center gap-1">
              {/* Botón de editar - solo para tareas no completadas */}
              {!task.completed && (
                <button
                  onClick={() => onEdit(task)}
                  disabled={actionLoading || loading}
                  className="p-2 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors cursor-pointer"
                  title="Editar tarea"
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              )}

              {/* Botón de eliminar - disponible para todas las tareas */}
              <button
                onClick={() => setShowConfirmDelete(true)}
                disabled={actionLoading || loading}
                className={`p-2 rounded-lg cursor-pointer transition-colors ${
                  task.completed
                    ? "text-red-600 hover:bg-red-200"
                    : "text-red-600 hover:bg-red-200"
                }`}
                title="Eliminar tarea"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmación de eliminación */}
      {showConfirmDelete && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800 mb-3">
            ¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se
            puede deshacer.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              disabled={actionLoading}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-sm rounded-md transition-colors cursor-pointer"
            >
              {actionLoading ? "Eliminando..." : "Sí, eliminar"}
            </button>
            <button
              onClick={() => setShowConfirmDelete(false)}
              disabled={actionLoading}
              className="px-3 py-1 border bg-gray-100 border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
