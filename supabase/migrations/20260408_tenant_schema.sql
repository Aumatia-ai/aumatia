-- =================================================================================
-- FASE 1: Esquema de Base de Datos Central (IAM y Permisos) para Aumatia OS
-- Este script despliega la estructura Multi-tenant usando Supabase / PostgreSQL.
-- =================================================================================

-- 1. Tabla de Inquilinos (Tenants)
CREATE TABLE public.tenants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE, -- Ej. 'bigboys', se usa como subdominio
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Tabla de Usuarios (Extendiendo auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Tabla Relacional de Usuarios por Tenant (Tenant Users)
CREATE TABLE public.tenant_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'cashier', 'user')), -- Definición de roles
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, tenant_id) -- Un usuario pertenece a un tenant_id una sola vez
);

-- 4. Tabla de Módulos Habilitados por Tenant
CREATE TABLE public.tenant_modules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  module_name TEXT NOT NULL CHECK (module_name IN ('pos', 'marketplace', 'finanzas', 'contactia', 'web')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(tenant_id, module_name)
);

-- =================================================================================
-- Row Level Security (RLS)
-- =================================================================================

ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_modules ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura base (usuarios pueden leer su propia info y la de su tenant)
CREATE POLICY "Users can view their own record" ON public.users FOR SELECT USING (auth.uid() = id);

-- Políticas para la tabla tenant_users
CREATE POLICY "Users can view their tenant association" ON public.tenant_users
  FOR SELECT USING (user_id = auth.uid());

-- Políticas para tenants (se lee la data de un tenant si el usuario pertenece al mismo)
CREATE POLICY "Users can view their own tenant" ON public.tenants
  FOR SELECT USING (id IN (
    SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid()
  ));

-- =================================================================================
-- Custom Claims Hook para inyectar metadata en el JWT
-- =================================================================================
-- Este hook se configurará en Supabase (Auth Hooks) para ejecutarse en cada 
-- generación de JWT (sign-in/refresh), permitiendo que la App Cliente pueda 
-- validar acceso sin consultas adicionales.

CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
  v_tenant_record record;
  v_allowed_modules jsonb;
  claims jsonb;
BEGIN
  -- Extraer el ID del usuario desencadenante
  v_user_id := (event->>'user_id')::uuid;
  claims := event->'claims';

  -- Buscar la relación activa de tenant_user. 
  -- (Nota: Para usuarios en múltiples tenants simultáneamente, se suele seleccionar
  -- el último tenant activo o se maneja un 'current_tenant_id' en metadata).
  SELECT tu.tenant_id, tu.role, t.slug 
  INTO v_tenant_record
  FROM public.tenant_users tu
  INNER JOIN public.tenants t ON tu.tenant_id = t.id
  WHERE tu.user_id = v_user_id AND tu.is_active = true AND t.is_active = true
  LIMIT 1;

  IF FOUND THEN
    -- Inyectar tenant_slug y rol en el token
    claims := jsonb_set(claims, '{tenant_slug}', to_jsonb(v_tenant_record.slug));
    claims := jsonb_set(claims, '{role}', to_jsonb(v_tenant_record.role));

    -- Obtener la lista de los módulos que tiene activo el tenant
    SELECT jsonb_agg(module_name) INTO v_allowed_modules
    FROM public.tenant_modules
    WHERE tenant_id = v_tenant_record.tenant_id AND is_active = true;
    
    -- Si no hay módulos listados, crear array vacío en el JSON
    IF v_allowed_modules IS NULL THEN
      v_allowed_modules := '[]'::jsonb;
    END IF;

    -- Inyectar módulos en el JWT
    claims := jsonb_set(claims, '{allowed_modules}', v_allowed_modules);
  END IF;

  -- Retornar el evento original con los claims actualizados
  event := jsonb_set(event, '{claims}', claims);
  
  RETURN event;
END;
$$;
