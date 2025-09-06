# Configuración de OAuth en Supabase para Reducir Mensajes Repetitivos

## Pasos para configurar en el Dashboard de Supabase:

### 1. Acceder a Configuración de Auth
1. Ve a tu dashboard de Supabase
2. Navega a **Authentication** → **Settings**

### 2. Configurar URLs de Redirect
1. En la sección **"URL Configuration"**
2. Asegúrate de que la **Site URL** sea: `http://localhost:5174` (para desarrollo)
3. En **"Redirect URLs"** agrega:
   - `http://localhost:5174`
   - `http://localhost:5173` (por si cambia el puerto)
   - Tu dominio de producción cuando lo tengas

### 3. Configurar Google OAuth Provider
1. Ve a **Authentication** → **Providers**
2. Haz clic en **Google**
3. En **"Additional Scopes"** agrega: `openid profile email`
4. En **"Skip nonce check"**: ✅ Habilitado (esto puede ayudar)

### 4. Configuraciones Avanzadas (Opcional)
- **"Confirm email"**: ❌ Deshabilitado (si solo usas OAuth)
- **"Enable email confirmations"**: ❌ Deshabilitado (para OAuth)
- **"Secure email change"**: ❌ Deshabilitado (para simplificar)

## Resultado esperado:
- ✅ Menos mensajes de confirmación
- ✅ Login más fluido
- ✅ Restricción automática a @unsch.edu.pe

## Nota:
El parámetro `hd: "unsch.edu.pe"` en el código limita automáticamente 
la selección de cuentas a solo las del dominio UNSCH.
