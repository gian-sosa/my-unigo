import { createClient } from "@supabase/supabase-js";

// Configuración segura usando solo variables de entorno
const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;

// Validar que las variables de entorno estén configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Faltan variables de entorno de Supabase. Verifica tu archivo .env");
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
