-- SCRIPT PARA AGREGAR LA COLUMNA cycle_id A LA TABLA user_progress
-- Ejecutar en el SQL Editor de Supabase

-- 1. Agregar la columna cycle_id a la tabla user_progress
ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS cycle_id INTEGER;

-- 2. Crear un índice para cycle_id para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_user_progress_cycle_id ON user_progress(cycle_id);

-- 3. Actualizar registros existentes con cycle_id basado en course_id
-- Esta función mapea cada curso a su ciclo correspondiente
UPDATE user_progress 
SET cycle_id = CASE 
    -- Ciclo 1
    WHEN course_id IN ('com-oral', 'metodologia', 'ciencias-nat', 'matematica-basica', 'filosofia', 'fundamentos-si') 
    THEN 1
    
    -- Ciclo 2
    WHEN course_id IN ('comprension-textos', 'sociedad-cultura', 'realidad-nacional', 'liderazgo', 'psicologia', 'algoritmos') 
    THEN 2
    
    -- Ciclo 3
    WHEN course_id IN ('calculo-1', 'fisica-1', 'estructura-datos', 'teoria-sistemas', 'seminario-empresarial', 'algebra-lineal') 
    THEN 3
    
    -- Ciclo 4
    WHEN course_id IN ('calculo-2', 'fisica-2', 'poo', 'estadistica-prob', 'modelamiento-analisis', 'matematica-discreta') 
    THEN 4
    
    -- Ciclo 5
    WHEN course_id IN ('metodos-numericos', 'modelamiento-datos', 'sistemas-electricos', 'gestion-procesos', 'diseno-software', 'estadistica-aplicada') 
    THEN 5
    
    -- Ciclo 6
    WHEN course_id IN ('gestion-bd', 'sistemas-digitales', 'sistemas-operativos', 'innovacion-tec', 'construccion-software') 
    THEN 6
    
    -- Ciclo 7
    WHEN course_id IN ('gestion-datos', 'derecho-informatico', 'redes-datos', 'gestion-riesgos', 'metodologia-investigacion', 'pruebas-calidad') 
    THEN 7
    
    -- Ciclo 8
    WHEN course_id IN ('servicio-social', 'seminario-tesis-1', 'ia-1', 'telecomunicaciones', 'arquitectura-software', 'desarrollo-web', 'informatica-forense') 
    THEN 8
    
    -- Ciclo 9
    WHEN course_id IN ('ia-2', 'seminario-tesis-2', 'practicas-pre', 'computacion-paralela', 'gestion-proyectos', 'programacion-moviles', 'big-data') 
    THEN 9
    
    -- Ciclo 10
    WHEN course_id IN ('auditoria-ti', 'seminario-tesis-3', 'iot', 'transformacion-digital', 'comercio-electronico', 'marketing', 'proyectos-inversion') 
    THEN 10
    
    -- Por defecto ciclo 1 si no se encuentra el curso
    ELSE 1
END
WHERE cycle_id IS NULL;

-- 4. Crear una función para obtener el ciclo de un curso automáticamente
CREATE OR REPLACE FUNCTION get_cycle_id_for_course(course_name TEXT)
RETURNS INTEGER AS $$
BEGIN
    RETURN CASE 
        -- Ciclo 1
        WHEN course_name IN ('com-oral', 'metodologia', 'ciencias-nat', 'matematica-basica', 'filosofia', 'fundamentos-si') 
        THEN 1
        
        -- Ciclo 2
        WHEN course_name IN ('comprension-textos', 'sociedad-cultura', 'realidad-nacional', 'liderazgo', 'psicologia', 'algoritmos') 
        THEN 2
        
        -- Ciclo 3
        WHEN course_name IN ('calculo-1', 'fisica-1', 'estructura-datos', 'teoria-sistemas', 'seminario-empresarial', 'algebra-lineal') 
        THEN 3
        
        -- Ciclo 4
        WHEN course_name IN ('calculo-2', 'fisica-2', 'poo', 'estadistica-prob', 'modelamiento-analisis', 'matematica-discreta') 
        THEN 4
        
        -- Ciclo 5
        WHEN course_name IN ('metodos-numericos', 'modelamiento-datos', 'sistemas-electricos', 'gestion-procesos', 'diseno-software', 'estadistica-aplicada') 
        THEN 5
        
        -- Ciclo 6
        WHEN course_name IN ('gestion-bd', 'sistemas-digitales', 'sistemas-operativos', 'innovacion-tec', 'construccion-software') 
        THEN 6
        
        -- Ciclo 7
        WHEN course_name IN ('gestion-datos', 'derecho-informatico', 'redes-datos', 'gestion-riesgos', 'metodologia-investigacion', 'pruebas-calidad') 
        THEN 7
        
        -- Ciclo 8
        WHEN course_name IN ('servicio-social', 'seminario-tesis-1', 'ia-1', 'telecomunicaciones', 'arquitectura-software', 'desarrollo-web', 'informatica-forense') 
        THEN 8
        
        -- Ciclo 9
        WHEN course_name IN ('ia-2', 'seminario-tesis-2', 'practicas-pre', 'computacion-paralela', 'gestion-proyectos', 'programacion-moviles', 'big-data') 
        THEN 9
        
        -- Ciclo 10
        WHEN course_name IN ('auditoria-ti', 'seminario-tesis-3', 'iot', 'transformacion-digital', 'comercio-electronico', 'marketing', 'proyectos-inversion') 
        THEN 10
        
        -- Por defecto ciclo 1
        ELSE 1
    END;
END;
$$ LANGUAGE plpgsql;

-- 5. Crear trigger para establecer cycle_id automáticamente en nuevos registros
CREATE OR REPLACE FUNCTION set_cycle_id_trigger()
RETURNS TRIGGER AS $$
BEGIN
    NEW.cycle_id = get_cycle_id_for_course(NEW.course_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Crear el trigger
DROP TRIGGER IF EXISTS set_cycle_id_on_insert ON user_progress;
CREATE TRIGGER set_cycle_id_on_insert
    BEFORE INSERT ON user_progress
    FOR EACH ROW
    EXECUTE FUNCTION set_cycle_id_trigger();

-- 7. Verificar la estructura actualizada de la tabla
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'user_progress' 
ORDER BY ordinal_position;

-- 8. Verificar algunos datos de ejemplo
SELECT 
    course_id,
    cycle_id,
    completed,
    created_at
FROM user_progress 
LIMIT 10;