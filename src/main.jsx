import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// Debug de variables de entorno
console.log('=== DEBUG VARIABLES DE ENTORNO ===');
console.log('VITE_APP_SUPABASE_URL:', import.meta.env.VITE_APP_SUPABASE_URL);
console.log('VITE_APP_SUPABASE_ANON_KEY exists:', !!import.meta.env.VITE_APP_SUPABASE_ANON_KEY);
console.log('Modo:', import.meta.env.MODE);
console.log('Todas las variables VITE_:', Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')));
console.log('=== FIN DEBUG ===');

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
