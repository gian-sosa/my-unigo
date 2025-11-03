import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { supabase } from "./supabase/supabase.config.jsx";

// Exponer Supabase globalmente para debugging
if (typeof window !== "undefined") {
  window.supabase = supabase;
  console.log("🔧 [Debug] Supabase expuesto globalmente como window.supabase");
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
