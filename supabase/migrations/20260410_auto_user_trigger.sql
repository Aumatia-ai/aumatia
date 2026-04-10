-- Relajamos la restricción de password por completo por si interfiere
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'password'
    ) THEN
        ALTER TABLE public.users ALTER COLUMN password DROP NOT NULL;
    END IF;
END $$;

-- También username, por seguridad
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'username'
    ) THEN
        ALTER TABLE public.users ALTER COLUMN username DROP NOT NULL;
    END IF;
END $$;

-- También tenant_id, como ya teníamos
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'tenant_id'
    ) THEN
        ALTER TABLE public.users ALTER COLUMN tenant_id DROP NOT NULL;
    END IF;
END $$;

-- Nos aseguramos orgánicamente de que TODAS las columnas existan
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS username TEXT,
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS password TEXT,
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- 1. Redefinimos la función rellenando la columna "password" obligatoria
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, username, password, full_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    SPLIT_PART(NEW.email, '@', 1), -- Username basado en correo electrónico
    COALESCE(NEW.encrypted_password, 'managed_by_supabase_auth'), -- Clave administrada por Supabase Auth
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Usuario Nuevo'),
    NOW(),
    NOW()
  );
  
  RETURN NEW;
END;
$$;

-- 2. El trigger ya existente se sobrescribirá sin problemas
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
