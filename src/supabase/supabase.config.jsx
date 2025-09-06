import { createClient } from "@supabase/supabase-js";

// Obtener variables de entorno con validación
const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;

// Validar que las variables existen
if (!supabaseUrl) {
  console.error('VITE_APP_SUPABASE_URL no está definida');
  console.error('Variables disponibles:', import.meta.env);
  throw new Error('La URL de Supabase es requerida. Verifica tu configuración de variables de entorno.');
}

if (!supabaseAnonKey) {
  console.error('VITE_APP_SUPABASE_ANON_KEY no está definida');
  throw new Error('La clave anónima de Supabase es requerida. Verifica tu configuración de variables de entorno.');
}

console.log('Supabase URL configurada:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
