import { createClient } from "@supabase/supabase-js";

// Obtener variables de entorno con validación
const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;

// Validar que las variables existen
if (!supabaseUrl) {
  throw new Error('VITE_APP_SUPABASE_URL es requerida. Verifica tu configuración de variables de entorno.');
}

if (!supabaseAnonKey) {
  throw new Error('VITE_APP_SUPABASE_ANON_KEY es requerida. Verifica tu configuración de variables de entorno.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
