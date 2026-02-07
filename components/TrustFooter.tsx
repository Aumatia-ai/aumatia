export default function TrustFooter() {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">

                {/* Trust Bar */}
                <div className="border-b border-white/10 pb-12 mb-12">
                    <p className="text-center text-sm text-white/40 mb-8 uppercase tracking-widest">Integraciones Oficiales & Partners</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Text placeholders for logos as per requirements, normally would be SVGs */}
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">Siigo</span>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">DIAN</span>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">MercadoLibre</span>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-lime-500">Falabella</span>
                    </div>
                </div>

                {/* Footer Content */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold text-white mb-2">Aumatia.</h3>
                        <p className="text-white/40 text-sm">© 2026 Aumatia POS. Todos los derechos reservados.</p>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-mono text-white/70">Compliant con DIAN 2026</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
