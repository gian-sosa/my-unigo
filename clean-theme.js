#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Patrones de reemplazo para eliminar dependencias del tema del sistema
const replacements = [
  // Textos básicos
  { from: /text-gray-900 dark:text-white/g, to: "theme-text-primary" },
  { from: /text-gray-700 dark:text-gray-300/g, to: "theme-text-primary" },
  { from: /text-gray-600 dark:text-gray-400/g, to: "theme-text-secondary" },
  { from: /text-gray-500 dark:text-gray-400/g, to: "theme-text-secondary" },

  // Backgrounds problemáticos
  { from: /bg-white\/80 dark:bg-slate-800\/80/g, to: "theme-card-bg" },
  { from: /bg-white\/50 dark:bg-slate-700\/50/g, to: "theme-card-small" },

  // Borders problemáticos
  {
    from: /border-white\/20 dark:border-slate-700\/50/g,
    to: "theme-card-border",
  },
  {
    from: /border-white\/30 dark:border-slate-600\/30/g,
    to: "theme-card-border",
  },
  {
    from: /border-gray-200\/50 dark:border-slate-600\/50/g,
    to: "theme-divider",
  },

  // Hover states problemáticos
  {
    from: /hover:bg-blue-50 dark:hover:bg-slate-600\/50/g,
    to: "hover:bg-blue-50",
  },
  {
    from: /hover:bg-gray-50 dark:hover:bg-slate-600\/30/g,
    to: "hover:bg-gray-50",
  },

  // Gradientes problemáticos
  {
    from: /bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900\/20 dark:to-blue-800\/20/g,
    to: "bg-gradient-to-br from-blue-50 to-blue-100",
  },
  {
    from: /bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900\/20 dark:to-purple-800\/20/g,
    to: "bg-gradient-to-br from-purple-50 to-purple-100",
  },
  {
    from: /bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900\/20 dark:to-emerald-800\/20/g,
    to: "bg-gradient-to-br from-emerald-50 to-emerald-100",
  },
  {
    from: /bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900\/20 dark:to-orange-800\/20/g,
    to: "bg-gradient-to-br from-orange-50 to-orange-100",
  },
  {
    from: /bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900\/20 dark:to-orange-900\/20/g,
    to: "bg-gradient-to-r from-amber-50 to-orange-50",
  },
  {
    from: /bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900\/20 dark:to-indigo-900\/20/g,
    to: "bg-gradient-to-r from-blue-50 to-indigo-50",
  },

  // Elementos específicos de colores
  { from: /text-blue-600 dark:text-blue-400/g, to: "text-blue-600" },
  { from: /text-blue-700 dark:text-blue-300/g, to: "text-blue-700" },
  { from: /text-green-700 dark:text-green-300/g, to: "text-green-700" },
  { from: /text-purple-700 dark:text-purple-300/g, to: "text-purple-700" },
  { from: /text-orange-700 dark:text-orange-300/g, to: "text-orange-700" },
  { from: /text-emerald-700 dark:text-emerald-300/g, to: "text-emerald-700" },
  { from: /text-amber-800 dark:text-amber-200/g, to: "text-amber-800" },
  { from: /text-amber-600 dark:text-amber-400/g, to: "text-amber-600" },

  // Elementos específicos que quedaron
  { from: /bg-amber-50 dark:bg-amber-900\/20/g, to: "bg-amber-50" },
  {
    from: /dark:hover:from-blue-800\/30 dark:hover:to-indigo-800\/30/g,
    to: "",
  },
  { from: /bg-blue-100 dark:bg-blue-900\/50/g, to: "bg-blue-100" },
  { from: /bg-green-100 dark:bg-green-900\/50/g, to: "bg-green-100" },
  { from: /bg-purple-100 dark:bg-purple-900\/50/g, to: "bg-purple-100" },

  // Gradientes para bg-clip-text que quedaron
  { from: / dark:from-blue-400 dark:to-purple-400/g, to: "" },
  { from: /dark:from-blue-400 dark:to-purple-400 /g, to: "" },

  // Elementos finales de backup
  { from: /bg-orange-100 dark:bg-orange-900\/50/g, to: "bg-orange-100" },
  {
    from: /border-gray-200\/50 dark:border-slate-700\/50/g,
    to: "border-gray-200/50",
  },

  // Header específicos
  { from: /dark:ring-slate-600/g, to: "" },
  {
    from: /text-blue-500 cursor-pointer dark:text-blue-400/g,
    to: "text-blue-500 cursor-pointer",
  },
  {
    from: /bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 dark:bg-slate-800/g,
    to: "bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50",
  },
  { from: /bg-gray-200 my-2 dark:bg-slate-600/g, to: "bg-gray-200 my-2" },
  { from: /dark:hover:bg-red-500\/20 dark:hover:text-red-300/g, to: "" },
  {
    from: /hover:bg-black\/10 rounded-lg transition-colors duration-200 cursor-pointer dark:hover:bg-white\/10/g,
    to: "hover:bg-black/10 rounded-lg transition-colors duration-200 cursor-pointer",
  },

  // Elementos de estado/badge
  {
    from: /bg-green-100 text-green-800 dark:bg-green-900\/30 dark:text-green-300/g,
    to: "bg-green-100 text-green-800",
  },
  {
    from: /bg-red-100 text-red-800 dark:bg-red-900\/30 dark:text-red-300/g,
    to: "bg-red-100 text-red-800",
  },

  // Borders específicos
  {
    from: /border-amber-200 dark:border-amber-700\/50/g,
    to: "border-amber-200",
  },
  { from: /border-blue-200 dark:border-blue-700\/50/g, to: "border-blue-200" },

  // Elementos de formulario
  {
    from: /bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600/g,
    to: "bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2",
  },

  // Elementos del background principal
  {
    from: /min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900/g,
    to: "min-h-screen theme-bg-gradient",
  },
  {
    from: /bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200(.+?)dark:from-slate-900 dark:via-slate-800 dark:to-gray-900/g,
    to: "theme-bg-gradient",
  },

  // Login específicos
  {
    from: /bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700(.+?)dark:bg-slate-700 dark:border-slate-600 dark:hover:border-slate-500 dark:text-slate-200/g,
    to: "bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700",
  },
  {
    from: /bg-white\/95(.+?)dark:bg-slate-800\/95 dark:border-slate-700\/20/g,
    to: "theme-card-bg border theme-card-border",
  },

  // Hover de texto
  {
    from: /hover:text-blue-800 dark:hover:text-blue-300/g,
    to: "hover:text-blue-800",
  },

  // Backgrounds de gradientes para bg-clip-text
  {
    from: /bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400/g,
    to: "bg-gradient-to-r from-blue-600 to-purple-600",
  },

  // Iconos específicos
  {
    from: /text-blue-400 transition-colors duration-300 flex-shrink-0 dark:text-blue-300/g,
    to: "text-blue-400 transition-colors duration-300 flex-shrink-0",
  },

  // Otros elementos de texto
  {
    from: /font-semibold text-gray-700 text-base dark:text-slate-300/g,
    to: "font-semibold theme-text-primary text-base",
  },
  {
    from: /text-gray-600 text-sm dark:text-slate-400/g,
    to: "theme-text-secondary text-sm",
  },
];

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let modified = false;

    replacements.forEach(({ from, to }) => {
      const originalContent = content;
      content = content.replace(from, to);
      if (content !== originalContent) {
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`✅ Procesado: ${filePath}`);
      return true;
    } else {
      console.log(`⚪ Sin cambios: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error procesando ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  let totalProcessed = 0;

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      totalProcessed += processDirectory(fullPath);
    } else if (file.endsWith(".jsx") || file.endsWith(".js")) {
      if (processFile(fullPath)) {
        totalProcessed++;
      }
    }
  });

  return totalProcessed;
}

// Procesar archivos
console.log("🚀 Iniciando limpieza de dependencias del tema del sistema...\n");

const srcPath = path.join(__dirname, "src");
const totalProcessed = processDirectory(srcPath);

console.log(`\n✨ Proceso completado! ${totalProcessed} archivos modificados.`);
