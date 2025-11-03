# 🚀 GUÍA DE DIAGNÓSTICO: Sistema de Progreso de Usuario

## 📋 Pasos para Diagnosticar el Problema

### 1. Verificar la Base de Datos en Supabase

1. **Ir al Dashboard de Supabase** → Tu proyecto → SQL Editor
2. **Ejecutar este query** para verificar si la tabla existe:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name = 'user_progress';
```

3. **Si la tabla NO existe**, ejecutar el script completo de `supabase-setup-clean.sql`
4. **Si la tabla SÍ existe**, verificar la estructura:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'user_progress'
ORDER BY ordinal_position;
```

### 2. Verificar las Políticas RLS

```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'user_progress';
```

**Deberías ver 4 políticas:**

- Users can view own progress
- Users can insert own progress
- Users can update own progress
- Users can delete own progress

### 3. Verificar Autenticación

1. **Ejecutar en el navegador**: Abrir la aplicación y entrar a la consola del navegador
2. **Buscar los logs** que empiezan con:
   - `🔄 [useUserProgress] Cargando progreso del usuario...`
   - `👤 [useUserProgress] Usuario actual:`

### 4. Probar Inserción Manual

1. **Obtener tu User ID**:

```sql
SELECT id FROM auth.users WHERE email = 'tu-email@aqui.com';
```

2. **Insertar un registro de prueba**:

```sql
INSERT INTO user_progress (user_id, course_id, cycle_id, material_id, completed)
VALUES ('TU_USER_ID_AQUI', 'test-course', 1, 'test-material', true);
```

3. **Verificar que se insertó**:

```sql
SELECT * FROM user_progress;
```

### 5. Verificar Permisos

**En Supabase Dashboard:**

1. Ir a **Authentication** → **Policies**
2. Buscar la tabla `user_progress`
3. Verificar que las políticas estén **habilitadas**

### 6. Verificar Logs en la Aplicación

1. **Abrir la aplicación** en el navegador
2. **Abrir Developer Tools** (F12)
3. **Ir a la pestaña Console**
4. **Buscar logs** con los emojis 🔄, 👤, 📊, etc.
5. **Intentar hacer click en un checkbox** de material
6. **Ver si aparecen logs** de `[toggleMaterialProgress]`

## 🔍 Problemas Comunes y Soluciones

### ❌ La tabla no existe

**Solución**: Ejecutar `supabase-setup-clean.sql` completo

### ❌ Error de permisos

**Solución**: Verificar que RLS esté habilitado y las políticas creadas

### ❌ Usuario no autenticado

**Solución**: Verificar que el usuario esté logueado en la aplicación

### ❌ Error de inserción

**Solución**: Verificar que el formato de datos sea correcto

## 📱 Usando el Debug Panel

En la aplicación web, ahora hay un **panel de debug** en la esquina inferior derecha que muestra:

- User ID (primeros 8 caracteres)
- Estado de carga del progreso
- Cantidad de registros de progreso
- Curso seleccionado
- Datos del progreso en JSON

## 🎯 Qué Buscar

1. **En los logs del navegador**: Mensajes que empiecen con emojis
2. **En el debug panel**: Que Progress Count sea > 0 después de hacer clicks
3. **En Supabase**: Que aparezcan registros en la tabla user_progress

## 📞 Información para Reportar

Si sigues teniendo problemas, comparte:

1. **Screenshot del debug panel**
2. **Logs de la consola del navegador**
3. **Resultado de los queries SQL de verificación**
4. **Mensaje de error específico si aparece**
