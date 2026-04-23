import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data: usersData, error: usersErr } = await supabase.from('users').select('*').limit(1);
  console.log('Test public.users ->', usersErr ? usersErr.message : (usersData?.length ? 'exists' : 'empty'));

  const { data: tenantUsers, error: tuErr } = await supabase.from('tenant_users').select('user_id').limit(1);
  console.log('Test tenant_users ->', tuErr ? tuErr.message : 'exists');
}

check();
