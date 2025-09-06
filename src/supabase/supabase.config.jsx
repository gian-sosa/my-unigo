import { createClient } from "@supabase/supabase-js";

// Configuración robusta con múltiples fallbacks
const supabaseUrl =
  import.meta.env.VITE_APP_SUPABASE_URL ||
  process.env.VITE_APP_SUPABASE_URL ||
  "https://jyaccaqwurmztjsjlacb.supabase.co";

const supabaseAnonKey =
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY ||
  process.env.VITE_APP_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5YWNjYXF3dXJtenRqc2psYWNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4NTk5ODAsImV4cCI6MjA3MDQzNTk4MH0.BVZ-zRpa27z8G6FURlQi3zft27-kjgHVvf_i6BGpNpg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
