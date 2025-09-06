# 🚨 SOLUCIÓN INMEDIATA: Configurar Variables en Netlify

## ❌ Error Actual:

```
VITE_APP_SUPABASE_URL es requerida. Configura las variables de entorno.
Página en blanco en producción
```

## ✅ SOLUCIÓN PASO A PASO:

### 🎯 **Paso 1: Acceder a Netlify**

1. Ve a [https://app.netlify.com/](https://app.netlify.com/)
2. Inicia sesión con tu cuenta
3. Busca y selecciona tu proyecto `my-unigo`

### 🎯 **Paso 2: Configurar Variables de Entorno**

1. En tu proyecto, ve a: **Site Settings** (Configuración del sitio)
2. En el menú lateral, busca: **Environment variables** (Variables de entorno)
3. Haz clic en **Add variable** (Agregar variable)

### 🎯 **Paso 3: Agregar Primera Variable**

```
Key (Clave): VITE_APP_SUPABASE_URL
Value (Valor): https://jyaccaqwurmztjsjlacb.supabase.co
```

- Haz clic en **Create variable**

### 🎯 **Paso 4: Agregar Segunda Variable**

```
Key (Clave): VITE_APP_SUPABASE_ANON_KEY
Value (Valor): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5YWNjYXF3dXJtenRqc2psYWNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4NTk5ODAsImV4cCI6MjA3MDQzNTk4MH0.BVZ-zRpa27z8G6FURlQi3zft27-kjgHVvf_i6BGpNpg
```

- Haz clic en **Create variable**

### 🎯 **Paso 5: Forzar Nuevo Deploy**

1. Ve a: **Deploys** (Despliegues)
2. Haz clic en: **Trigger deploy** → **Deploy site**
3. O simplemente haz un nuevo commit y push al repositorio

## ⏱️ **Tiempo Estimado:** 2-3 minutos

## 🔍 **Verificación:**

Después del deploy, la página debería cargar correctamente sin el error.

## 📸 **Captura de Pantalla de Referencia:**

```
Site Settings > Environment variables > Add variable

[Key]   VITE_APP_SUPABASE_URL
[Value] https://jyaccaqwurmztjsjlacb.supabase.co
        [Create variable]

[Key]   VITE_APP_SUPABASE_ANON_KEY
[Value] eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
        [Create variable]
```

## 🚨 **¿No encuentras la sección?**

- Busca "Environment" en la barra de búsqueda de Netlify
- O ve a: **Site configuration** → **Environment variables**
- En algunos casos aparece como: **Build & deploy** → **Environment**

---

**⚡ ACCIÓN INMEDIATA REQUERIDA:** Configura estas variables AHORA para solucionar la página en blanco.
