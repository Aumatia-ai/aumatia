const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://db.aumatia.com.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE2NDE3NjkyMDAsImV4cCI6MTc5OTUzNTYwMH0.wIl2C6dgFZPjvIqHkbsr5fyUqw3GWKmIXGMfB2Y9_BY";

const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
});

async function run() {
    console.log("Conectando a:", supabaseUrl);
    console.log("Obteniendo usuarios de Auth...");
    const { data: users, error: authError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (authError) {
        console.error("Error Auth:", authError);
    } else {
        if (!users || !users.users || users.users.length === 0) {
            console.log("No hay usuarios en auth.");
        } else {
            console.log("Usuarios en Auth:");
            users.users.forEach(u => {
                console.log(`- ${u.email}`);
            });
        }
    }

    console.log("\nObteniendo usuarios de la tabla 'users'...");
    const { data: dbUsers, error: dbError } = await supabaseAdmin
        .from('users')
        .select('id, email, role');
    
    if (dbError) {
        console.error("Error DB:", dbError.message);
    } else {
        if (!dbUsers || dbUsers.length === 0) {
            console.log("No hay registros en la tabla 'users'.");
        } else {
            console.log("Registros en 'users':", dbUsers);
        }
    }
}

run();
