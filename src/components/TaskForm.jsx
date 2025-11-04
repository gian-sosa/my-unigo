import { useState } from "react";

const TaskForm = ({
  onSubmit,
  onCancel,
  initialData = null,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    priority: initialData?.priority || 1,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "El título es requerido";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "El título debe tener al menos 3 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
      });
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const priorityOptions = [
    { value: 1, label: "Baja", color: "bg-gray-100 text-gray-700 " },
    { value: 2, label: "Media", color: "bg-yellow-100 text-yellow-700" },
    { value: 3, label: "Alta", color: "bg-red-100 text-red-700" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Título */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium theme-text-primary mb-2"
        >
          Título de la tarea *
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors theme-input ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Ej: Estudiar para el examen de Cálculo"
          maxLength={100}
          disabled={loading}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium theme-text-primary mb-2"
        >
          Descripción (opcional)
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors theme-input"
          placeholder="Detalles adicionales de la tarea..."
          rows={3}
          maxLength={500}
          disabled={loading}
        />
        <div className="mt-1 text-xs theme-text-secondary text-right">
          {formData.description.length}/500
        </div>
      </div>

      {/* Prioridad */}
      <div>
        <label className="block text-sm font-medium theme-text-primary mb-2">
          Prioridad
        </label>
        <div className="flex gap-2">
          {priorityOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleChange("priority", option.value)}
              disabled={loading}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                formData.priority === option.value
                  ? option.color
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
          )}
          {initialData ? "Actualizar" : "Crear"} Tarea
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 border border-gray-300 rounded-lg font-medium theme-text-secondary hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
