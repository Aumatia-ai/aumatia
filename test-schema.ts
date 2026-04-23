import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl!, serviceRoleKey!);

async function check() {
  console.log("Checking DB...");
  const { data: usersData, error: usersErr } = await supabaseAdmin.from('users').select('*').limit(1);
  console.log('Test public.users ->', usersErr ? usersErr.message : (usersData?.length ? 'exists' : 'empty'));

  const { data: tenantUsers, error: tuErr } = await supabaseAdmin.from('tenant_users').select('user_id').limit(1);
  console.log('Test tenant_users ->', tuErr ? tuErr.message : 'exists');
}

check();
