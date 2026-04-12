-- =================================================================================
-- Update RLS Policy for public.users to allow viewing users in the same tenant
-- =================================================================================

-- 1. Drop the overly restrictive policy on public.users
DROP POLICY IF EXISTS "Users can view their own record" ON public.users;

-- 2. Create the new policy allowing users to view their own record AND any record of a user in the same tenant
CREATE POLICY "Users can view members of their tenant" ON public.users
  FOR SELECT
  USING (
    -- You can view yourself
    auth.uid() = id
    OR 
    -- Or you share at least one active tenant_id combination
    EXISTS (
      SELECT 1 
      FROM public.tenant_users t_me
      INNER JOIN public.tenant_users t_them ON t_me.tenant_id = t_them.tenant_id
      WHERE t_me.user_id = auth.uid() 
        AND t_them.user_id = public.users.id
    )
  );
