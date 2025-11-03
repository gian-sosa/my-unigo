-- Crear tabla para el progreso del usuario
CREATE TABLE user_progress
(
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  cycle_id INTEGER NOT NULL,
  material_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP
  WITH TIME ZONE,
  created_at TIMESTAMP
  WITH TIME ZONE DEFAULT NOW
  (),
  updated_at TIMESTAMP
  WITH TIME ZONE DEFAULT NOW
  (),
  
  -- Índice único para evitar duplicados
  UNIQUE
  (user_id, course_id, cycle_id, material_id)
);

  -- Crear índices para mejor rendimiento
  CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
  CREATE INDEX idx_user_progress_course_cycle ON user_progress(course_id, cycle_id);
  CREATE INDEX idx_user_progress_completed ON user_progress(completed);

  -- Función para actualizar updated_at automáticamente
  CREATE OR REPLACE FUNCTION update_updated_at_column
  ()
RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW
  ();
  RETURN NEW;
  END;
$$ language 'plpgsql';

  -- Trigger para actualizar updated_at
  CREATE TRIGGER update_user_progress_updated_at 
    BEFORE
  UPDATE ON user_progress 
    FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column
  ();

  -- Políticas de seguridad (RLS)
  ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

  -- Política: Los usuarios solo pueden ver su propio progreso
  CREATE POLICY "Users can view own progress" ON user_progress
    FOR
  SELECT USING (auth.uid() = user_id);

  -- Política: Los usuarios solo pueden insertar su propio progreso
  CREATE POLICY "Users can insert own progress" ON user_progress
    FOR
  INSERT WITH CHECK (auth.uid() =
  user_id);

  -- Política: Los usuarios solo pueden actualizar su propio progreso
  CREATE POLICY "Users can update own progress" ON user_progress
    FOR
  UPDATE USING (auth.uid()
  = user_id);

  -- Política: Los usuarios solo pueden eliminar su propio progreso
  CREATE POLICY "Users can delete own progress" ON user_progress
    FOR
  DELETE USING (auth.uid
  () = user_id);