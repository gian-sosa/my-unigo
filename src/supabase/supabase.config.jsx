import { createClient } from "@supabase/supabase-js";

// Configuración con fallbacks para producción
const supabaseUrl =
  import.meta.env.VITE_APP_SUPABASE_URL ||
  "https://jyaccaqwurmztjsjlacb.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5YWNjYXF3dXJtenRqc2psYWNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4NTk5ODAsImV4cCI6MjA3MDQzNTk4MH0.BVZ-zRpa27z8G6FURlQi3zft27-kjgHVvf_i6BGpNpg";

// Validar que las variables estén configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Faltan variables de entorno de Supabase. Verifica tu archivo .env"
  );
}

// Suprimir warnings innecesarios de Supabase
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  // Filtrar el warning específico del reloj del dispositivo
  if (
    args[0]?.includes?.(
      "@supabase/gotrue-js: Session as retrieved from URL was issued in the future"
    )
  ) {
    return; // No mostrar este warning
  }
  // Mostrar otros warnings normalmente
  originalConsoleWarn.apply(console, args);
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
