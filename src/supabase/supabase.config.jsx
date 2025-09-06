import { createClient } from "@supabase/supabase-js";

// Obtener variables de entorno - SIN FALLBACKS INSEGUROS
const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;

// Validar que las variables existen
if (!supabaseUrl) {
  // Mostrar error más útil en producción
  const errorMsg = `
🚨 CONFIGURACIÓN FALTANTE:
Variable VITE_APP_SUPABASE_URL no configurada en Netlify.

📋 SOLUCIÓN:
1. Ve a Netlify Dashboard → Site Settings → Environment variables
2. Agrega: VITE_APP_SUPABASE_URL = https://jyaccaqwurmztjsjlacb.supabase.co
3. Agrega: VITE_APP_SUPABASE_ANON_KEY = [tu_key]
4. Redeploy el sitio

Ver NETLIFY-FIX-URGENTE.md para instrucciones detalladas.
  `;

  console.error(errorMsg);
  throw new Error(
    "VITE_APP_SUPABASE_URL es requerida. Configura las variables de entorno."
  );
}

if (!supabaseAnonKey) {
  console.error("🚨 VITE_APP_SUPABASE_ANON_KEY no configurada en Netlify");
  throw new Error(
    "VITE_APP_SUPABASE_ANON_KEY es requerida. Configura las variables de entorno."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
