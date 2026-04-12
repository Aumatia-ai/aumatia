-- =================================================================================
-- Solución a Bucle Infinito y Conflictos de Trigger en Auth
-- =================================================================================

-- 1. Eliminar el trigger conflictivo de Supabase Auth
-- Debido a restricciones de las columnas de public.users, este trigger generaba 
-- rollbacks silenciosos en la BD remota arruinando la vinculación de tenant_users.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. Eliminar la política RLS que causa el bucle "Infinite Recursion"
-- La base de datos crasheaba porque para validar la lectura de tenant_users,
-- Postgres intentaba leer... tenant_users.
DROP POLICY IF EXISTS "Users can view members of their tenant" ON public.tenant_users;

-- 3. Crear una función interna con privilegios de sistema (Bypasa el RLS)
-- Extraeremos el Tenant ID asociado al usuario que consulta, pero al tener 
-- SECURITY DEFINER, Postgres no aplicará reglas de Row Level Security a esta sub-consulta.
CREATE OR REPLACE FUNCTION public.get_my_tenant_ids() 
RETURNS SETOF uuid 
LANGUAGE sql 
SECURITY DEFINER 
SET search_path = public 
AS $$
  SELECT tenant_id FROM public.tenant_users WHERE user_id = auth.uid();
$$;

-- 4. Re-crear la política utilizando la función maestra
-- Al usar una función que salta el RLS, ¡rompemos matemáticamente la recursión infinita!
CREATE POLICY "Users can view members of their tenant" ON public.tenant_users
  FOR SELECT
  USING (
    tenant_id IN (SELECT public.get_my_tenant_ids())
  );
