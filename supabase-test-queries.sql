-- Test simple para verificar la tabla user_progress
-- Ejecutar estos comandos uno por uno en el SQL Editor de Supabase

-- 1. Verificar si la tabla existe
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name = 'user_progress';

-- 2. Ver la estructura de la tabla
\d user_progress;

-- 3. Verificar las políticas RLS
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'user_progress';

-- 4. Insertar un registro de prueba (reemplaza el user_id con tu ID real)
-- Primero obtener tu user_id:
SELECT id
FROM auth.users LIMIT
1;

-- Luego insertar (usa el ID que obtuviste arriba):
INSERT INTO user_progress
  (user_id, course_id, cycle_id, material_id, completed)
VALUES
  ('TU_USER_ID_AQUI', 'test-course', 1, 'test-material', true);

-- 5. Verificar que se insertó
SELECT *
FROM user_progress;