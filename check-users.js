const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://yxohhquoppatndzzalyq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4b2hocXVvcHBhdG5kenphbHlxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTY4NjQ2OCwiZXhwIjoyMDkxMjYyNDY4fQ.0HuoEG5gPvKebI7aFu3kKtfknLAFN9H2SFA6W3BnkZ8'; // From .env.local

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function run() {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error('Error:', error);
  } else {
    data.users.forEach(u => {
      console.log(`User: ${u.email}, confirmed_at: ${u.email_confirmed_at}, last_sign_in: ${u.last_sign_in_at}`);
    });
  }
}

run();
