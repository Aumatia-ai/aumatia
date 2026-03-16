import { ArrowRight, Merge } from "lucide-react";

export default function PricingBanner() {
    return (
        <div className="w-full relative overflow-hidden rounded-3xl mt-20 mb-20 group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-600 opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
            
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[length:20px_20px]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10 px-8 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 text-center md:text-left">
                <div className="md:w-2/3">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                        <Merge className="w-8 h-8 text-white" />
                        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                            ⚡ Ecosistema Total Conectado
                        </h2>
                    </div>
                    <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed max-w-3xl">
                        Aunque son mundos separados, puedes vincular tu <strong>Smart POS</strong> directamente con el <strong>Marketplace</strong> para que tu inventario físico y tus ventas en MercadoLibre se sincronicen en menos de 2 segundos.
                    </p>
                </div>
                
                <div className="md:w-1/3 flex justify-center md:justify-end">
                    <button className="bg-white text-black font-bold py-4 px-8 rounded-full flex items-center gap-2 hover:bg-white/90 transition-transform duration-300 hover:scale-105 shadow-2xl">
                        Explorar Integración
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
