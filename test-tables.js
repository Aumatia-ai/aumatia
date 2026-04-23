const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://db.aumatia.com.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE2NDE3NjkyMDAsImV4cCI6MTc5OTUzNTYwMH0.wIl2C6dgFZPjvIqHkbsr5fyUqw3GWKmIXGMfB2Y9_BY";

const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
});

async function run() {
    console.log("Consultando tablas públicas en:", supabaseUrl);
    
    // Podemos intentar ejecutar una raw sql o rpc si tuvieran uno,
    // o simplemente listar tablas con PostgREST metadata.
    // Una manera sencilla es consultar información de la base de datos haciendo un query al schema.
    const { data: tables, error } = await supabaseAdmin
        .rpc('get_tables'); // A veces esto no existe.

    if (error) {
        // En Supabase podemos ver si está configurada alguna tabla como `usuarios_adm`
        console.log("Probando select en 'usuarios_adm'...");
        const { error: err1 } = await supabaseAdmin.from('usuarios_adm').select('id').limit(1);
        console.log("usuarios_adm err:", err1 ? err1.message : "Existe!");

        console.log("Probando select en 'super_admins'...");
        const { error: err2 } = await supabaseAdmin.from('super_admins').select('id').limit(1);
        console.log("super_admins err:", err2 ? err2.message : "Existe!");
        
        console.log("Probando select en 'clientes'...");
        const { error: err3 } = await supabaseAdmin.from('clientes').select('id').limit(1);
        console.log("clientes err:", err3 ? err3.message : "Existe!");
    } else {
        console.log(tables);
    }
}

run();
