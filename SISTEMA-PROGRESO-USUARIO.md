# Sistema de Progreso de Usuario

## Descripción

Se ha implementado un sistema completo de seguimiento del progreso del usuario que permite marcar materiales como completados y guardar este progreso en la base de datos de Supabase.

## Archivos Implementados

### 1. Base de Datos (supabase-user-progress.sql)

- **Tabla `user_progress`**: Almacena el progreso de cada usuario
- **Row Level Security (RLS)**: Los usuarios solo pueden acceder a su propio progreso
- **Índices**: Para optimizar las consultas de rendimiento
- **Triggers**: Actualización automática de timestamps

### 2. Hook de React (src/hooks/useUserProgress.js)

Funciones principales:

- `isMaterialCompleted(materialId)`: Verificar si un material está completado
- `toggleMaterialProgress(materialId)`: Marcar/desmarcar material como completado
- `getCourseProgress(courseId)`: Obtener estadísticas del curso
- `getOverallProgress()`: Obtener estadísticas generales

### 3. Interfaz de Usuario (src/pages/Home.jsx)

- **Checkboxes**: Cada material tiene una casilla de verificación
- **Indicadores visuales**: Los materiales completados aparecen con estilo diferente
- **Barra de progreso por curso**: Muestra el porcentaje de materiales completados
- **Barra de progreso general**: En el sidebar con todas las estadísticas

## Características

### Visual

- ✅ Checkboxes interactivos en cada material
- 🎨 Estilos diferentes para materiales completados (fondo verde, texto tachado)
- 📊 Barras de progreso animadas con gradientes
- 🎯 Indicadores de progreso en tiempo real
- 🎉 Animación de celebración al completar todo

### Funcionalidad

- 💾 Persistencia en base de datos Supabase
- 🔒 Seguridad con Row Level Security
- ⚡ Actualizaciones en tiempo real
- 🚀 Carga optimizada del progreso
- 🔄 Sincronización automática

### Responsivo

- 📱 Funciona en dispositivos móviles y desktop
- 🌙 Compatible con modo oscuro/claro
- ♿ Accesible con teclado y screen readers

## Configuración Requerida

### 1. Ejecutar SQL en Supabase

```sql
-- Copiar y ejecutar el contenido completo de supabase-user-progress.sql
-- en el SQL Editor de Supabase
```

### 2. Verificar Autenticación

Asegurarse de que el usuario esté autenticado para usar las funciones de progreso.

### 3. Permisos de Base de Datos

Las políticas RLS están configuradas para permitir solo acceso al progreso propio del usuario.

## Uso

### Para el Usuario

1. Navegar a cualquier curso con materiales
2. Marcar las casillas junto a los materiales completados
3. Ver el progreso en tiempo real en las barras de progreso
4. El progreso se guarda automáticamente

### Para el Desarrollador

```javascript
// Usar el hook en cualquier componente
const {
  isMaterialCompleted,
  toggleMaterialProgress,
  getCourseProgress,
  getOverallProgress,
} = useUserProgress();

// Verificar si un material está completado
const isCompleted = isMaterialCompleted("matematica-basica-0");

// Marcar/desmarcar material
await toggleMaterialProgress("matematica-basica-0");

// Obtener progreso del curso
const courseStats = getCourseProgress("matematica-basica");

// Obtener progreso general
const overallStats = getOverallProgress();
```

## Estructura de Datos

### Material ID Format

Los materiales se identifican con el formato: `{courseId}-{materialIndex}`
Ejemplo: `matematica-basica-0`, `matematica-basica-1`, etc.

### Base de Datos

```sql
user_progress {
  id: UUID
  user_id: UUID (FK to auth.users)
  course_id: TEXT
  cycle_id: INTEGER
  material_id: TEXT
  completed: BOOLEAN
  completed_at: TIMESTAMP
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

## Beneficios

1. **Experiencia de Usuario Mejorada**: Los estudiantes pueden seguir su progreso fácilmente
2. **Motivación**: Las barras de progreso y celebraciones motivan a completar materiales
3. **Persistencia**: El progreso se mantiene entre sesiones y dispositivos
4. **Análisis**: Posibilidad de agregar métricas y análisis futuro
5. **Escalabilidad**: Estructura preparada para agregar más funciones

## Próximas Mejoras Posibles

- 📈 Dashboard de analytics para profesores
- 🏆 Sistema de logros y badges
- 📅 Programación de estudio y recordatorios
- 👥 Comparación de progreso con compañeros
- 📊 Exportar informes de progreso
- 🎯 Metas personalizadas de estudio
