const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://yxohhquoppatndzzalyq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4b2hocXVvcHBhdG5kenphbHlxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTY4NjQ2OCwiZXhwIjoyMDkxMjYyNDY4fQ.0HuoEG5gPvKebI7aFu3kKtfknLAFN9H2SFA6W3BnkZ8'; // From .env.local

const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
});

async function run() {
    console.log("Fetching from usuarios...");
    const { data: usuario, error } = await supabaseAdmin
        .from('usuarios')
        .select('*')
        .limit(1);
    
    if (error) {
        console.error("DB Error:", error.message, error.details, error.hint, error.code);
    } else {
        console.log("Success! Users found:", usuario.length);
    }
}

run();
