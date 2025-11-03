-- SCRIPT PARA CREAR EL SISTEMA DE PROGRESO DE USUARIO
-- Ejecutar en el SQL Editor de Supabase paso a paso

-- 1. Crear la tabla principal
CREATE TABLE
IF NOT EXISTS user_progress
(
  id UUID DEFAULT gen_random_uuid
() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users
(id) ON
DELETE CASCADE,
  course_id TEXT
NOT NULL,
  cycle_id INTEGER NOT NULL,
  material_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW
(),
  updated_at TIMESTAMPTZ DEFAULT NOW
(),
  
  -- Índice único para evitar duplicados
  UNIQUE
(user_id, course_id, cycle_id, material_id)
);

-- 2. Crear índices para mejor rendimiento
CREATE INDEX
IF NOT EXISTS idx_user_progress_user_id ON user_progress
(user_id);
CREATE INDEX
IF NOT EXISTS idx_user_progress_course_cycle ON user_progress
(course_id, cycle_id);
CREATE INDEX
IF NOT EXISTS idx_user_progress_completed ON user_progress
(completed);

-- 3. Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column
()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW
();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Crear trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_user_progress_updated_at
ON user_progress;
CREATE TRIGGER update_user_progress_updated_at 
    BEFORE
UPDATE ON user_progress 
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column
();

-- 5. Habilitar Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- 6. Eliminar políticas existentes si existen
DROP POLICY
IF EXISTS "Users can view own progress" ON user_progress;
DROP POLICY
IF EXISTS "Users can insert own progress" ON user_progress;
DROP POLICY
IF EXISTS "Users can update own progress" ON user_progress;
DROP POLICY
IF EXISTS "Users can delete own progress" ON user_progress;

-- 7. Crear políticas de seguridad
CREATE POLICY "Users can view own progress" ON user_progress
    FOR
SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress
    FOR
INSERT WITH CHECK (auth.uid() =
user_id);

CREATE POLICY "Users can update own progress" ON user_progress
    FOR
UPDATE USING (auth.uid()
= user_id);

CREATE POLICY "Users can delete own progress" ON user_progress
    FOR
DELETE USING (auth.uid
() = user_id);

-- 8. Verificar que todo se creó correctamente
SELECT
  'user_progress' as table_name,
  COUNT(*) as policy_count
FROM pg_policies
WHERE tablename = 'user_progress';

-- 9. Mostrar estructura de la tabla
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'user_progress'
ORDER BY ordinal_position;