-- 003_launcher_features.sql
-- Creates schema extensions for SaaS owners and pos_users

DO $$ 
BEGIN
  -- Make sure public.usuarios exists
  CREATE TABLE IF NOT EXISTS public.usuarios (
      id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
  );

  -- Safe add columns
  BEGIN ALTER TABLE public.usuarios ADD COLUMN email TEXT; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.usuarios ADD COLUMN nombre TEXT; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.usuarios ADD COLUMN telefono TEXT; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.usuarios ADD COLUMN brand_name TEXT; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.usuarios ADD COLUMN logourl TEXT; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.usuarios ADD COLUMN primary_color TEXT DEFAULT '#050b14'; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.usuarios ADD COLUMN secondary_color TEXT DEFAULT '#06b6d4'; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.usuarios ADD COLUMN role TEXT DEFAULT 'admin'; EXCEPTION WHEN duplicate_column THEN END;
  BEGIN ALTER TABLE public.usuarios ADD COLUMN active_modules JSONB DEFAULT '{"pos_retail": true, "pos_restaurant": true, "billing": true, "inventory": true}'; EXCEPTION WHEN duplicate_column THEN END;
END $$;

-- Drop and recreate the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.usuarios (id, email, nombre, telefono)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'nombre', 
    new.raw_user_meta_data->>'telefono'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    nombre = COALESCE(public.usuarios.nombre, EXCLUDED.nombre),
    telefono = COALESCE(public.usuarios.telefono, EXCLUDED.telefono);
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Ensure pos_users table exists for the admin UI
CREATE TABLE IF NOT EXISTS public.pos_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Optional if they use real tokens
    tenant_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    role TEXT DEFAULT 'cashier',
    is_active BOOLEAN DEFAULT true,
    active_modules JSONB DEFAULT '{"billing": true, "inventory": true}'
);

-- RLS setup (baseline)
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pos_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Own user profile read/write" ON public.usuarios;
CREATE POLICY "Own user profile read/write" ON public.usuarios
    FOR ALL USING (auth.uid() = id);

DROP POLICY IF EXISTS "Tenant pos users policy" ON public.pos_users;
CREATE POLICY "Tenant pos users policy" ON public.pos_users
    FOR ALL USING (auth.uid() = tenant_id);
