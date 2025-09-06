# Guía de Troubleshooting para Despliegue

## Problemas Comunes y Soluciones

### 1. Página en Blanco
**Síntomas:** La página se ve en blanco en producción pero funciona en localhost
**Causas:**
- Rutas incorrectas en el build
- Variables de entorno faltantes
- Problemas de CORS

### 2. Errores de JavaScript
**Revisar:** Consola del navegador (F12 > Console)
**Buscar:** Errores de módulos no encontrados

### 3. Variables de Entorno
**En tu plataforma de despliegue, configura:**
```
VITE_APP_SUPABASE_URL=https://jyaccaqwurmztjsjlacb.supabase.co
VITE_APP_SUPABASE_ANON_KEY=[tu_anon_key]
```

### 4. Configuración de Supabase
**En Supabase Dashboard:**
1. Ve a Authentication > Settings
2. En "Site URL" agrega tu dominio de producción
3. En "Redirect URLs" agrega:
   - https://tu-dominio.com
   - https://tu-dominio.netlify.app
   - etc.

### 5. Comandos de Debugging
```bash
# Construir y previsualizar localmente
npm run build
npm run preview

# Verificar que funciona en http://localhost:4173
```

### 6. Plataformas de Despliegue Recomendadas
- **Netlify** (Gratis, fácil configuración)
- **Vercel** (Gratis, optimizado para React)
- **Firebase Hosting** (Gratis, Google)

### 7. Checklist Antes del Despliegue
- ✅ npm run build funciona sin errores
- ✅ npm run preview muestra la app correctamente
- ✅ Variables de entorno configuradas
- ✅ URLs de redirect en Supabase configuradas
- ✅ Archivos de configuración (.netlify.toml, vercel.json) agregados
