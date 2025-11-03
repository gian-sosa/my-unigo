-- SCRIPT OPTIMIZADO PARA CURSOS APROBADOS
-- Ejecutar en el SQL Editor de Supabase

-- 1. Verificar si ya existe data en la tabla
SELECT COUNT(*) as total_records FROM user_progress;

-- 2. Limpiar datos existentes si es necesario (opcional)
-- DELETE FROM user_progress; -- Descomenta si quieres empezar de cero

-- 3. Verificar estructura de la tabla
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'user_progress' 
ORDER BY ordinal_position;

-- 4. Insertar un curso de prueba (reemplaza con tu user_id real)
-- Primero obtén tu user_id:
SELECT id, email FROM auth.users WHERE email ILIKE '%tu-email%';

-- Luego inserta un curso de prueba:
INSERT INTO user_progress (
  user_id, 
  course_id, 
  cycle_id, 
  material_id, 
  completed
) VALUES (
  'TU_USER_ID_AQUI', -- Reemplaza con tu ID real
  'matematica-basica', 
  1, 
  'course', 
  true
) 
ON CONFLICT (user_id, course_id, cycle_id, material_id) 
DO UPDATE SET 
  completed = EXCLUDED.completed,
  updated_at = NOW();

-- 5. Verificar que se insertó
SELECT * FROM user_progress ORDER BY created_at DESC;

-- 6. Probar consulta de cursos aprobados (lo que hace la app)
SELECT course_id 
FROM user_progress 
WHERE user_id = auth.uid() 
AND completed = true;

-- 7. Verificar políticas RLS están funcionando
SELECT 
  policyname, 
  cmd, 
  permissive,
  qual 
FROM pg_policies 
WHERE tablename = 'user_progress'
ORDER BY policyname;