import { Metadata } from 'next';
import { EcosystemProvider } from '@/components/builder/EcosystemContext';
import EcosystemToggle from '@/components/builder/EcosystemToggle';
import EcosystemCard from '@/components/builder/EcosystemCard';
import SmartPosCard from '@/components/builder/SmartPosCard';
import OSBuilderCard from '@/components/builder/OSBuilderCard';
import StickySummaryBar from '@/components/builder/StickySummaryBar';
import Navbar from '@/components/Navbar';
import TrustFooter from '@/components/TrustFooter';
import { builderModules } from '@/lib/builderData';

export const metadata: Metadata = {
    title: 'Constructor de Ecosistema - Aumatia',
    description: 'Arma tu ecosistema de ventas físico y digital a la medida. Entre más módulos conectes, más ahorras mes a mes.',
};

export default function BuilderPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-neon-blue/30 overflow-x-hidden relative pb-40">
            <Navbar />

            <EcosystemProvider>
                <main className="pt-32 pb-24">
                    <div className="container mx-auto px-6 max-w-6xl">
                        
                        {/* HEADER EXPLICATIVO */}
                        <div className="text-center mb-12 max-w-3xl mx-auto">
                            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white">
                                Arma tu Ecosistema <br className="hidden md:block"/> 
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Aumatia a la medida</span>
                            </h1>
                            <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed font-medium">
                                Selecciona las herramientas que necesitas. Entre más módulos de hardware, software o Inteligencia Artificial conectes, <strong className="text-white">mayor será tu descuento mensual (hasta 25% Off).</strong>
                            </p>
                            <EcosystemToggle />
                        </div>

                        {/* EL GRID PRINCIPAL DEL CONSTRUCTOR */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 mb-20">
                            {/* Destacados: ocupan 2 tarjetas cada uno */}
                            <div className="sm:col-span-2">
                                <SmartPosCard />
                            </div>
                            <div className="sm:col-span-2">
                                <OSBuilderCard />
                            </div>

                            {/* Resto de herramientas */}
                            {builderModules
                                .filter(module => module.id !== 'smart-pos')
                                .map(module => (
                                    <EcosystemCard key={module.id} module={module} />
                                ))}
                        </div>

                        {/* EXPLICACIÓN DE DESCUENTOS - VISUAL TIER LIST */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-4xl mx-auto text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-fuchsia-500/5 pointer-events-none" />
                            <h3 className="text-2xl font-bold mb-8 text-white">Tu crecimiento recompensado</h3>
                            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                                {[
                                    { qty: "2 Mods", off: "5%" },
                                    { qty: "3 Mods", off: "10%" },
                                    { qty: "4 Mods", off: "15%" },
                                    { qty: "5 Mods", off: "20%" },
                                    { qty: "6 Mods", off: "25%", highlight: true },
                                ].map((tier, i) => (
                                    <div key={i} className="flex flex-col items-center">
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-xl mb-2 ${tier.highlight ? 'bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-white shadow-[0_0_20px_rgba(0,240,255,0.4)]' : 'bg-white/10 text-white/60'}`}>
                                            -{tier.off}
                                        </div>
                                        <span className={`text-xs font-bold uppercase tracking-wider ${tier.highlight ? 'text-cyan-400' : 'text-white/40'}`}>{tier.qty}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </main>

                {/* EL CARRITO STICKY INYECTADO */}
                <StickySummaryBar />
            </EcosystemProvider>

            <TrustFooter />
        </div>
    );
}
