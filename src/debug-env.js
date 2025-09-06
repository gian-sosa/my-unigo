// Script para validar variables de entorno en build
console.log('=== VALIDACIÓN DE VARIABLES DE ENTORNO ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('VITE_APP_SUPABASE_URL:', import.meta.env.VITE_APP_SUPABASE_URL);
console.log('VITE_APP_SUPABASE_ANON_KEY existe:', !!import.meta.env.VITE_APP_SUPABASE_ANON_KEY);
console.log('Todas las variables VITE_:', Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')));
console.log('=== FIN VALIDACIÓN ===');
