import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno
  const env = loadEnv(mode, process.cwd(), "");

  // SEGURIDAD: Validar que las variables críticas estén presentes en producción
  const requiredEnvVars = [
    "VITE_APP_SUPABASE_URL",
    "VITE_APP_SUPABASE_ANON_KEY",
  ];
  const missingVars = requiredEnvVars.filter((varName) => !env[varName]);

  if (missingVars.length > 0 && mode === "production") {
    throw new Error(
      `❌ SEGURIDAD: Faltan variables de entorno críticas: ${missingVars.join(
        ", "
      )}`
    );
  }

  return {
    plugins: [react(), tailwindcss()],
    base: "./", // Importante para rutas relativas en producción
    define: {
      // SEGURIDAD: Variables de entorno sin valores por defecto expuestos
      "import.meta.env.VITE_APP_SUPABASE_URL": JSON.stringify(
        env.VITE_APP_SUPABASE_URL
      ),
      "import.meta.env.VITE_APP_SUPABASE_ANON_KEY": JSON.stringify(
        env.VITE_APP_SUPABASE_ANON_KEY
      ),
      __DEV__: JSON.stringify(mode === "development"),
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: mode === "development", // SEGURIDAD: Solo sourcemaps en desarrollo
      minify: mode === "production" ? "esbuild" : false,
      rollupOptions: {
        output: {
          // SEGURIDAD: Configuración de chunks para evitar exposición de código
          manualChunks: {
            vendor: ["react", "react-dom"],
            router: ["react-router-dom"],
            auth: ["@supabase/supabase-js"],
          },
        },
      },
    },
    preview: {
      port: 4173,
      host: true,
    },
  };
});
