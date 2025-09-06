import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    base: "./", // Importante para rutas relativas en producción
    define: {
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
