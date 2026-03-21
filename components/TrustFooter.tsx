import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">

                {/* Trust Bar */}
                <div className="border-b border-white/10 pb-12 mb-12">
                    <p className="text-center text-sm text-white/40 mb-8 uppercase tracking-widest">Ecosistema de Integraciones</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Text placeholders for logos as per requirements, normally would be SVGs */}
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">Siigo</span>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">DIAN</span>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">Mercado Libre</span>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-lime-500">Falabella</span>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-600">VTEX</span>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div className="md:col-span-1">
                        <Link href="/" className="mb-4 block">
                            <img src="/logo.png" alt="Aumatia" className="h-10 md:h-12 w-auto object-contain" />
                        </Link>
                        <p className="text-white/40 text-sm">
                            El ecosistema modular para negocios modernos. Conecta solo lo que necesitas.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Compañía</h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-white/60 hover:text-neon-blue transition-colors text-sm">Quiénes Somos</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Legales</h4>
                        <ul className="space-y-4">
                            <li><Link href="/legal/privacy-policy" className="text-white/60 hover:text-neon-blue transition-colors text-sm">Política de Privacidad</Link></li>
                            <li><Link href="/legal/terms-conditions" className="text-white/60 hover:text-neon-blue transition-colors text-sm">Términos y Condiciones</Link></li>
                            <li><Link href="/legal/aup" className="text-white/60 hover:text-neon-blue transition-colors text-sm">Política de Uso Aceptable (AUP)</Link></li>
                            <li><Link href="/legal/sla" className="text-white/60 hover:text-neon-blue transition-colors text-sm">Acuerdo SLA</Link></li>
                            <li><Link href="/legal/dpa" className="text-white/60 hover:text-neon-blue transition-colors text-sm">Procesamiento de Datos (DPA)</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
                    <div className="flex flex-col gap-2">
                        <p className="text-white/40 text-sm">© 2026 Aumatia. Todos los derechos reservados.</p>
                        <p className="text-white/20 text-xs max-w-xl">
                            Aumatia es una plataforma independiente. Las marcas comerciales (Siigo, Mercado Libre, Falabella, VTEX, DIAN) pertenecen a sus respectivos dueños y se mencionan solo con fines de compatibilidad e integración.
                        </p>
                    </div>


                </div>
            </div>
        </footer>
    );
}
