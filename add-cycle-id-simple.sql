-- SCRIPT SIMPLE PARA AGREGAR COLUMNA cycle_id
-- Ejecutar línea por línea en el SQL Editor de Supabase

-- 1. Agregar la columna cycle_id
ALTER TABLE user_progress ADD COLUMN cycle_id INTEGER;

-- 2. Crear índice para mejor rendimiento
CREATE INDEX idx_user_progress_cycle_id ON user_progress(cycle_id);

-- 3. Actualizar registros existentes (ejecutar por separado)
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

-- 4. Establecer cycle_id = 1 para cualquier registro que aún sea NULL
UPDATE user_progress SET cycle_id = 1 WHERE cycle_id IS NULL;

-- 5. Verificar la estructura de la tabla
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'user_progress' 
ORDER BY ordinal_position;

-- 6. Verificar algunos datos
SELECT course_id, cycle_id, completed 
FROM user_progress 
LIMIT 10;