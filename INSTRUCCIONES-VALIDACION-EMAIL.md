# Implementación de Validación de Email en Supabase

## Pasos para configurar la validación del servidor:

### 1. Acceder al Editor SQL de Supabase

1. Ve a tu dashboard de Supabase: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a "SQL Editor" en el menú lateral

### 2. Ejecutar el script de validación

1. Copia el contenido del archivo `supabase-email-validation.sql`
2. Pégalo en el editor SQL
3. Ejecuta el script

### 3. Verificar la implementación

- La función `validate_email_domain()` se ejecutará automáticamente
- Solo permitirá registros con emails @unsch.edu.pe
- Los usuarios con otros dominios recibirán un error antes de completar el registro

### 4. Configuración adicional (Opcional)

Para mayor seguridad, también puedes:

1. **Configurar Row Level Security (RLS)**:

   - Ve a "Authentication" > "Policies"
   - Crea políticas que solo permitan acceso a usuarios con emails @unsch.edu.pe

2. **Configurar hooks de autenticación**:
   - Ve a "Authentication" > "Hooks"
   - Configura hooks adicionales para validaciones más complejas

## Resultado esperado:

- ✅ Usuarios con @unsch.edu.pe: Registro exitoso
- ❌ Usuarios con otros dominios: Error inmediato, no se crea cuenta

## Nota importante:

Después de implementar esto, los usuarios existentes con dominios no válidos seguirán en la base de datos pero no podrán autenticarse exitosamente en tu aplicación.
