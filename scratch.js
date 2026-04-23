require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  const { data, error } = await supabase
    .from('tenant_users')
    .select(`
      id, user_id, tenant_id, role, is_active, active_modules,
      users ( id, email, full_name )
    `)
    .limit(1);
    
  console.log("Data:", data);
  console.log("Error:", error);
}

test();
