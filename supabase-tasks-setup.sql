-- SCRIPT PARA CREAR EL SISTEMA DE TAREAS (TO-DO)
-- Ejecutar en el SQL Editor de Supabase

-- 1. Crear la tabla de tareas
CREATE TABLE IF NOT EXISTS user_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  priority INTEGER DEFAULT 1, -- 1: Baja, 2: Media, 3: Alta
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- 2. Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_user_tasks_user_id ON user_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tasks_completed ON user_tasks(completed);
CREATE INDEX IF NOT EXISTS idx_user_tasks_priority ON user_tasks(priority);
CREATE INDEX IF NOT EXISTS idx_user_tasks_created_at ON user_tasks(created_at DESC);

-- 3. Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_user_tasks_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    IF NEW.completed = true AND OLD.completed = false THEN
        NEW.completed_at = NOW();
    ELSIF NEW.completed = false AND OLD.completed = true THEN
        NEW.completed_at = NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Crear trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_user_tasks_updated_at_trigger ON user_tasks;
CREATE TRIGGER update_user_tasks_updated_at_trigger
    BEFORE UPDATE ON user_tasks 
    FOR EACH ROW 
    EXECUTE FUNCTION update_user_tasks_updated_at();

-- 5. Habilitar Row Level Security
ALTER TABLE user_tasks ENABLE ROW LEVEL SECURITY;

-- 6. Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Users can view own tasks" ON user_tasks;
DROP POLICY IF EXISTS "Users can insert own tasks" ON user_tasks;
DROP POLICY IF EXISTS "Users can update own tasks" ON user_tasks;
DROP POLICY IF EXISTS "Users can delete own tasks" ON user_tasks;

-- 7. Crear políticas de seguridad
CREATE POLICY "Users can view own tasks" ON user_tasks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks" ON user_tasks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" ON user_tasks
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks" ON user_tasks
    FOR DELETE USING (auth.uid() = user_id);

-- 8. Verificar que todo se creó correctamente
SELECT 
    'user_tasks' as table_name,
    COUNT(*) as policy_count
FROM pg_policies 
WHERE tablename = 'user_tasks';

-- 9. Insertar algunas tareas de ejemplo (opcional)
-- Reemplaza 'TU_USER_ID_AQUI' con tu ID real de usuario
/*
INSERT INTO user_tasks (user_id, title, description, priority) VALUES
('TU_USER_ID_AQUI', 'Estudiar para examen de Cálculo I', 'Repasar límites y derivadas', 3),
('TU_USER_ID_AQUI', 'Completar proyecto de Programación', 'Terminar la implementación del algoritmo', 2),
('TU_USER_ID_AQUI', 'Leer capítulo 5 de Algoritmos', 'Estructuras de datos avanzadas', 1);
*/

-- 10. Ver estructura de la tabla
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'user_tasks' 
ORDER BY ordinal_position;