# Guía de Troubleshooting para Despliegue

## ✅ Problemas Resueltos

### 1. Error "supabaseUrl is required"

**Solución aplicada:**

- ✅ Validación de variables de entorno en supabase.config.jsx
- ✅ Archivo .env.local como backup
- ✅ Mensajes de error descriptivos

### 2. Variables de Entorno

**Configuración correcta:**

```
VITE_APP_SUPABASE_URL=https://jyaccaqwurmztjsjlacb.supabase.co
VITE_APP_SUPABASE_ANON_KEY=[tu_anon_key]
```

### 3. Verificación Local

**Comandos para verificar:**

```bash
npm run build      # Debe completarse sin errores
npm run preview    # Debe funcionar en http://localhost:4173
```

## Configuración de Supabase para Producción

### En Supabase Dashboard:

1. **Authentication > Settings**
2. **Site URL:** Agregar tu dominio de producción
3. **Redirect URLs:** Agregar todas las URLs donde se desplegará

### Plataformas de Despliegue

#### Netlify:

1. Conectar repositorio
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Variables de entorno en Dashboard

#### Vercel:

1. Conectar repositorio
2. Framework: Vite
3. Variables de entorno en Dashboard

#### Variables requeridas en plataforma:

```
VITE_APP_SUPABASE_URL=https://jyaccaqwurmztjsjlacb.supabase.co
VITE_APP_SUPABASE_ANON_KEY=[tu_anon_key]
```

## Checklist Final ✅

- ✅ npm run build funciona sin errores
- ✅ npm run preview muestra la app correctamente
- ✅ Variables de entorno configuradas
- ✅ URLs de redirect en Supabase configuradas
- ✅ Archivos de configuración (.netlify.toml, vercel.json) agregados
- ✅ Validación de variables implementada
