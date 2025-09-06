# ✅ CHECKLIST RÁPIDO: Configurar Netlify

## 🎯 **ACCIÓN REQUERIDA AHORA:**

### [ ] **Paso 1: Acceder a Netlify**

- Ve a: https://app.netlify.com/
- Inicia sesión
- Busca tu proyecto: `my-unigo`

### [ ] **Paso 2: Encontrar Environment Variables**

- Clic en tu proyecto `my-unigo`
- Busca: **Site Settings** (en el menú principal)
- Busca: **Environment variables** (en el menú lateral)

### [ ] **Paso 3: Agregar Primera Variable**

```
Key: VITE_APP_SUPABASE_URL
Value: https://jyaccaqwurmztjsjlacb.supabase.co
```

- Clic: **Add variable** → **Create variable**

### [ ] **Paso 4: Agregar Segunda Variable**

```
Key: VITE_APP_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5YWNjYXF3dXJtenRqc2psYWNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4NTk5ODAsImV4cCI6MjA3MDQzNTk4MH0.BVZ-zRpa27z8G6FURlQi3zft27-kjgHVvf_i6BGpNpg
```

- Clic: **Add variable** → **Create variable**

### [ ] **Paso 5: Redeploy**

- Ve a: **Deploys** (en el menú principal)
- Clic: **Trigger deploy** → **Deploy site**

### [ ] **Paso 6: Verificar**

- Esperar 2-3 minutos
- Abrir tu sitio web
- ✅ Debería cargar sin errores

---

## 🚨 **IMPORTANTE:**

- El archivo `.env` local NO se sube a Netlify automáticamente
- Debes configurar las variables manualmente en el dashboard
- Es normal que funcione local pero falle en producción sin esta configuración

## ⏱️ **Tiempo total:** 3-5 minutos máximo

---

**¿Necesitas ayuda visual?** Ver `NETLIFY-VISUAL-GUIDE.md`
