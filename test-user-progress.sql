-- SCRIPT DE PRUEBA PARA VERIFICAR USER_PROGRESS
-- Ejecutar estos comandos paso a paso en Supabase SQL Editor

-- 1. Verificar que la tabla existe y está vacía
SELECT COUNT(*) as total_records FROM user_progress;

-- 2. Verificar usuarios autenticados disponibles
SELECT id, email, created_at FROM auth.users LIMIT 5;

-- 3. Insertar un registro de prueba manual
-- (Reemplaza 'YOUR_USER_ID' con un ID real de auth.users)
INSERT INTO user_progress (
  user_id, 
  course_id, 
  cycle_id, 
  material_id, 
  completed
) VALUES (
  'REEMPLAZA_CON_TU_USER_ID', 
  'matematica-basica', 
  1, 
  '0', 
  true
);

-- 4. Verificar que se insertó correctamente
SELECT * FROM user_progress;

-- 5. Verificar las políticas RLS
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  cmd, 
  qual 
FROM pg_policies 
WHERE tablename = 'user_progress';

-- 6. Probar consulta como usuario autenticado
-- Este query simula lo que hace la aplicación
SELECT * FROM user_progress WHERE user_id = auth.uid();