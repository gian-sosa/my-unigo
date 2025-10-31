# Implementación con Supabase Database

## 1. Crear tabla en Supabase

```sql
-- Tabla para guardar el progreso de cursos de cada usuario
CREATE TABLE user_course_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT FALSE,
  approved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Índices para optimizar consultas
CREATE INDEX idx_user_course_progress_user_id ON user_course_progress(user_id);
CREATE INDEX idx_user_course_progress_course_id ON user_course_progress(course_id);

-- Política de seguridad (RLS)
ALTER TABLE user_course_progress ENABLE ROW LEVEL SECURITY;

-- Solo el usuario puede ver y modificar su propio progreso
CREATE POLICY "Users can view own progress" ON user_course_progress
  FOR ALL USING (auth.uid() = user_id);
```

## 2. Funciones para Supabase en Progreso.jsx

```javascript
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { supabase } from "../supabase/supabase.config";
import Header from "../components/Header";

function Progreso() {
  const { user, loading } = useAuth();
  const { isDark } = useTheme();
  const [expandedCycles, setExpandedCycles] = useState(new Set());
  const [approvedCourses, setApprovedCourses] = useState(new Set());
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  // Cargar progreso desde Supabase
  const loadProgressFromDatabase = async () => {
    if (!user?.id) return;

    setIsLoadingProgress(true);
    try {
      const { data, error } = await supabase
        .from("user_course_progress")
        .select("course_id")
        .eq("user_id", user.id)
        .eq("is_approved", true);

      if (error) {
        console.error("Error cargando progreso:", error);
        return;
      }

      const approvedCourseIds = data.map((item) => item.course_id);
      setApprovedCourses(new Set(approvedCourseIds));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoadingProgress(false);
    }
  };

  // Guardar progreso en Supabase
  const saveProgressToDatabase = async (courseId, isApproved) => {
    if (!user?.id) return;

    try {
      if (isApproved) {
        // Insertar o actualizar como aprobado
        const { error } = await supabase.from("user_course_progress").upsert({
          user_id: user.id,
          course_id: courseId,
          is_approved: true,
          updated_at: new Date().toISOString(),
        });

        if (error) console.error("Error guardando progreso:", error);
      } else {
        // Eliminar o marcar como no aprobado
        const { error } = await supabase
          .from("user_course_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("course_id", courseId);

        if (error) console.error("Error eliminando progreso:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Función para alternar aprobación de cursos
  const toggleCourseApproval = async (courseId) => {
    const newApproved = new Set(approvedCourses);
    const isCurrentlyApproved = newApproved.has(courseId);

    if (isCurrentlyApproved) {
      newApproved.delete(courseId);
    } else {
      newApproved.add(courseId);
    }

    // Actualizar estado local inmediatamente
    setApprovedCourses(newApproved);

    // Guardar en base de datos
    await saveProgressToDatabase(courseId, !isCurrentlyApproved);
  };

  // Efecto para cargar datos cuando el usuario esté disponible
  useEffect(() => {
    if (user?.id) {
      loadProgressFromDatabase();
    }
  }, [user?.id]);

  // Resto del componente...
}
```

## 3. Ventajas de cada opción

### LocalStorage (Implementado)

✅ **Pros:**

- Más simple de implementar
- No requiere conexión a internet
- Datos instantáneos
- No consume ancho de banda

❌ **Contras:**

- Solo funciona en ese navegador/dispositivo
- Se pierde si el usuario borra datos del navegador
- No se sincroniza entre dispositivos

### Supabase Database

✅ **Pros:**

- Datos sincronizados entre dispositivos
- Persistencia permanente
- Permite análisis de progreso estudiantil
- Backup automático

❌ **Contras:**

- Más complejo de implementar
- Requiere conexión a internet
- Consume recursos de base de datos

## 4. Recomendación

Para una aplicación educativa como UniGo, recomiendo **usar Supabase** porque:

1. Los estudiantes usan múltiples dispositivos
2. El progreso académico es información crítica
3. Permite futuras funcionalidades como reportes para profesores
4. Mayor profesionalismo de la plataforma
