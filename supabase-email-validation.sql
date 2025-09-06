-- Función SQL para validar emails en Supabase
-- Esta función se ejecuta antes de que se complete el registro

CREATE OR REPLACE FUNCTION public.validate_email_domain
()
RETURNS TRIGGER AS $$
BEGIN
  -- Verificar que el email termine con @unsch.edu.pe
  IF NOT (NEW.email LIKE '%@unsch.edu.pe') THEN
    RAISE EXCEPTION 'Solo se permiten emails del dominio @unsch.edu.pe'
      USING HINT = 'Debes usar tu email institucional para registrarte';
END
IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crear trigger que ejecuta la validación antes de insertar en auth.users
DROP TRIGGER IF EXISTS validate_email_trigger
ON auth.users;
CREATE TRIGGER validate_email_trigger
  BEFORE
INSERT ON
auth.users
FOR EACH ROW
EXECUTE
FUNCTION public.validate_email_domain
();
