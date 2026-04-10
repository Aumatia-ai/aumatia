-- Add active_modules column to tenant_users to manage module-level permissions per user
ALTER TABLE public.tenant_users
ADD COLUMN active_modules JSONB DEFAULT '{}'::jsonb;

-- RLS Policy: Only 'admin' roles in the same tenant can UPDATE the tenant_users table
CREATE POLICY "Admins can update users in their tenant" ON public.tenant_users
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.tenant_users tu
      WHERE tu.user_id = auth.uid()
        AND tu.tenant_id = public.tenant_users.tenant_id
        AND tu.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.tenant_users tu
      WHERE tu.user_id = auth.uid()
        AND tu.tenant_id = public.tenant_users.tenant_id
        AND tu.role = 'admin'
    )
  );

-- RLS Policy: Admins can view users in their tenant (Extending the previous SELECT policy if necessary, but "Users can view their tenant association" already existed. However, we need them to view ALL users in the same tenant).
CREATE POLICY "Users can view members of their tenant" ON public.tenant_users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.tenant_users tu 
      WHERE tu.user_id = auth.uid() 
        AND tu.tenant_id = public.tenant_users.tenant_id
    )
  );
