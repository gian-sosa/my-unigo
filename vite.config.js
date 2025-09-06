import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Cargar variables de entorno
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react(), tailwindcss()],
    base: "./", // Importante para rutas relativas en producción
    define: {
      // Garantizar que las variables estén disponibles en build
      'import.meta.env.VITE_APP_SUPABASE_URL': JSON.stringify(
        env.VITE_APP_SUPABASE_URL || 'https://jyaccaqwurmztjsjlacb.supabase.co'
      ),
      'import.meta.env.VITE_APP_SUPABASE_ANON_KEY': JSON.stringify(
        env.VITE_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5YWNjYXF3dXJtenRqc2psYWNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4NTk5ODAsImV4cCI6MjA3MDQzNTk4MH0.BVZ-zRpa27z8G6FURlQi3zft27-kjgHVvf_i6BGpNpg'
      ),
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    preview: {
      port: 4173,
      host: true,
    },
  };
});
