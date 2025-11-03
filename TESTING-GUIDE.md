# 🧪 GUÍA DE PRUEBAS: Llenar la Tabla user_progress

## 📋 Pasos para Probar y Llenar la Tabla

### 1️⃣ Verificación Inicial en Supabase

**En el SQL Editor de Supabase, ejecuta:**

```sql
-- Verificar que la tabla existe y está vacía
SELECT COUNT(*) as total_records FROM user_progress;

-- Ver usuarios disponibles
SELECT id, email FROM auth.users LIMIT 3;
```

### 2️⃣ Iniciar la Aplicación

```bash
cd /Users/giancarlos/Desktop/Code/my-unigo
npm run dev
```

### 3️⃣ Probar desde la Aplicación Web

1. **Abrir la aplicación** en el navegador (http://localhost:5173)
2. **Loguearse** con tu cuenta de Google
3. **Abrir Developer Tools** (F12) → pestaña Console
4. **Buscar el debug panel** en la esquina inferior derecha

### 4️⃣ Verificar Logs de Debugging

En la consola del navegador deberías ver:

```
🔧 [Debug] Supabase expuesto globalmente como window.supabase
🔄 [useUserProgress] Cargando progreso del usuario...
👤 [useUserProgress] Usuario actual: {id: "...", email: "..."}
📡 [useUserProgress] Consultando Supabase...
```

### 5️⃣ Probar Inserción Automática

1. **Navegar a un curso** que tenga materiales (ej: Matemática Básica)
2. **Hacer click en un checkbox** junto a un material
3. **Verificar en la consola** los logs de `[toggleMaterialProgress]`
4. **Ver si el debug panel** muestra Progress Count > 0

### 6️⃣ Probar Inserción Manual (Botón de Prueba)

1. **En el debug panel**, hacer click en **"🧪 Test Insert"**
2. **Ver los logs** en la consola
3. **Verificar** que Progress Count aumenta

### 7️⃣ Verificar en Supabase

**Ejecutar en SQL Editor:**

```sql
-- Ver todos los registros creados
SELECT * FROM user_progress ORDER BY created_at DESC;

-- Contar registros por usuario
SELECT user_id, COUNT(*) as registros
FROM user_progress
GROUP BY user_id;
```

### 8️⃣ Prueba Manual desde la Consola del Navegador

**En la consola del navegador (F12), ejecutar:**

```javascript
// Probar inserción directa
const {
  data: { user },
} = await window.supabase.auth.getUser();
console.log("👤 Usuario:", user?.id);

// Insertar un registro de prueba
const result = await window.supabase.from("user_progress").insert({
  user_id: user.id,
  course_id: "manual-test",
  cycle_id: 1,
  material_id: "test-material",
  completed: true,
});

console.log("📝 Resultado inserción:", result);

// Verificar que se insertó
const check = await window.supabase
  .from("user_progress")
  .select("*")
  .eq("user_id", user.id);

console.log("📊 Registros del usuario:", check.data);
```

## 🔍 Posibles Problemas y Soluciones

### ❌ Error: "user is not defined"

**Causa**: No estás logueado
**Solución**: Hacer login con Google primero

### ❌ Error: "RLS policy violation"

**Causa**: Problemas con las políticas de seguridad
**Solución**: Verificar que las políticas estén bien creadas

### ❌ Error: "relation user_progress does not exist"

**Causa**: La tabla no se creó correctamente
**Solución**: Re-ejecutar `supabase-setup-clean.sql`

### ❌ Los checkboxes no responden

**Causa**: Problemas en el hook useUserProgress
**Solución**: Verificar logs en la consola

### ❌ Progress Count siempre es 0

**Causa**: Los datos no se están cargando o insertando
**Solución**: Usar el botón "Test Insert" y verificar logs

## 📊 Qué Esperar

### ✅ Funcionamiento Correcto:

- **Debug panel** muestra User ID y Progress Count > 0
- **Consola** muestra logs con ✅ y sin errores ❌
- **Checkboxes** cambian estado y se mantienen al recargar
- **Supabase** muestra registros en la tabla user_progress

### 🎯 Archivos Modificados:

- `src/main.jsx` - Supabase expuesto globalmente
- `src/pages/Home.jsx` - Botón de prueba agregado
- `src/hooks/useUserProgress.js` - Logs de debugging extensos

## 📞 Información a Reportar

Si algo no funciona, comparte:

1. **Screenshot del debug panel**
2. **Logs completos de la consola** (especialmente errores ❌)
3. **Resultado del query** `SELECT * FROM user_progress;`
4. **ID del usuario** desde el debug panel
