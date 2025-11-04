# INSTRUCCIONES PARA AGREGAR LA COLUMNA cycle_id

## 📋 Pasos a Seguir:

### 1. 🗃️ **Ejecutar SQL en Supabase**

1. Ir al **SQL Editor** en tu dashboard de Supabase
2. Ejecutar los siguientes comandos **uno por uno**:

```sql
-- Agregar la columna cycle_id
ALTER TABLE user_progress ADD COLUMN cycle_id INTEGER;

-- Crear índice para mejor rendimiento
CREATE INDEX idx_user_progress_cycle_id ON user_progress(cycle_id);
```

### 2. 🔄 **Actualizar Datos Existentes**

Ejecutar estos comandos para asignar el ciclo correcto a cada curso:

```sql
UPDATE user_progress SET cycle_id = 1 WHERE course_id IN ('com-oral', 'metodologia', 'ciencias-nat', 'matematica-basica', 'filosofia', 'fundamentos-si');
UPDATE user_progress SET cycle_id = 2 WHERE course_id IN ('comprension-textos', 'sociedad-cultura', 'realidad-nacional', 'liderazgo', 'psicologia', 'algoritmos');
UPDATE user_progress SET cycle_id = 3 WHERE course_id IN ('calculo-1', 'fisica-1', 'estructura-datos', 'teoria-sistemas', 'seminario-empresarial', 'algebra-lineal');
UPDATE user_progress SET cycle_id = 4 WHERE course_id IN ('calculo-2', 'fisica-2', 'poo', 'estadistica-prob', 'modelamiento-analisis', 'matematica-discreta');
UPDATE user_progress SET cycle_id = 5 WHERE course_id IN ('metodos-numericos', 'modelamiento-datos', 'sistemas-electricos', 'gestion-procesos', 'diseno-software', 'estadistica-aplicada');
UPDATE user_progress SET cycle_id = 6 WHERE course_id IN ('gestion-bd', 'sistemas-digitales', 'sistemas-operativos', 'innovacion-tec', 'construccion-software');
UPDATE user_progress SET cycle_id = 7 WHERE course_id IN ('gestion-datos', 'derecho-informatico', 'redes-datos', 'gestion-riesgos', 'metodologia-investigacion', 'pruebas-calidad');
UPDATE user_progress SET cycle_id = 8 WHERE course_id IN ('servicio-social', 'seminario-tesis-1', 'ia-1', 'telecomunicaciones', 'arquitectura-software', 'desarrollo-web', 'informatica-forense');
UPDATE user_progress SET cycle_id = 9 WHERE course_id IN ('ia-2', 'seminario-tesis-2', 'practicas-pre', 'computacion-paralela', 'gestion-proyectos', 'programacion-moviles', 'big-data');
UPDATE user_progress SET cycle_id = 10 WHERE course_id IN ('auditoria-ti', 'seminario-tesis-3', 'iot', 'transformacion-digital', 'comercio-electronico', 'marketing', 'proyectos-inversion');
```

### 3. 🛡️ **Limpiar Datos**

```sql
-- Establecer cycle_id = 1 para cualquier registro que aún sea NULL
UPDATE user_progress SET cycle_id = 1 WHERE cycle_id IS NULL;
```

### 4. ✅ **Verificar Cambios**

```sql
-- Verificar estructura de la tabla
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'user_progress'
ORDER BY ordinal_position;

-- Verificar algunos datos
SELECT course_id, cycle_id, completed, created_at
FROM user_progress
ORDER BY created_at DESC
LIMIT 10;
```

## 🔧 **Cambios en el Código**

✅ **Ya implementados:**

1. **Hook `useUserProgress`** actualizado:

   - Función `getCycleIdForCourse()` que mapea cada curso a su ciclo
   - `toggleCourseApproval()` ahora usa el ciclo correcto automáticamente
   - Mejor logging para debugging

2. **Componente `Progreso.jsx`** mejorado:
   - Botón de recarga para refrescar desde la base de datos
   - Manejo de errores más visible
   - Estados de carga en checkboxes

## 🚀 **Resultado Final**

Una vez ejecutado el SQL:

- ✅ Las casillas funcionarán correctamente para marcar/desmarcar
- ✅ Cada curso se guardará con su ciclo correspondiente
- ✅ Los datos existentes mantendrán su integridad
- ✅ Nuevos registros tendrán cycle_id automáticamente

## 🐛 **Troubleshooting**

Si las casillas siguen sin funcionar:

1. **Verificar en consola del navegador** si hay errores
2. **Usar el botón de recarga** en la página de Progreso
3. **Verificar en Supabase** que los datos se guardan correctamente
4. **Comprobar las políticas RLS** están habilitadas

---

**📌 Nota:** Los archivos SQL pueden mostrar errores de linting en VS Code porque interpreta PostgreSQL como SQL Server, pero funcionarán correctamente en Supabase.
