import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import TrustFooter from '@/components/TrustFooter';
import DemoForm from './DemoForm';

export const metadata: Metadata = {
    title: 'Aumatia | Agendar Demo',
    description: 'Solicita una demostración personalizada del Ecosistema Aumatia y descubre cómo transformar tus ventas B2B.',
};

export default function DemoPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-neon-blue/30 relative flex flex-col">
            <Navbar />

            <main className="flex-1 pt-32 pb-24 relative z-10">
                <div className="container mx-auto px-6 max-w-7xl">
                    
                    {/* Header Sutil Arriba */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">
                            Agenda tu Demostración <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Personalizada</span>
                        </h1>
                        <p className="text-lg text-white/50 max-w-2xl mx-auto">
                            Selecciona las soluciones que quieres conocer y agenda tu reunión directamente por WhatsApp.
                        </p>
                    </div>

                    {/* FORMULARIO COMO EJE CENTRAL */}
                    <div className="relative mb-16">
                        {/* Glow effect for the form */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/5 to-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
                        
                        <DemoForm />
                    </div>

                    {/* Explicación Debajo del Formulario */}
                    <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 p-8 rounded-2xl text-center backdrop-blur-sm relative z-10">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                            <span className="text-xl">💬</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">¿Cómo funciona?</h3>
                        <p className="text-white/60 leading-relaxed max-w-2xl mx-auto">
                            Selecciona los productos que te interesan y al presionar el botón serás redirigido a WhatsApp con un mensaje listo. 
                            Nuestro equipo <strong className="text-white">confirmará tu demo y coordinará el mejor horario</strong> para una reunión 100% personalizada.
                        </p>
                    </div>

                </div>
            </main>

            {/* Background elements - Constrained to prevent scroll overflow */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-900/10 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-900 via-black to-black opacity-40" />
            </div>

            <div className="relative z-10">
                <TrustFooter />
            </div>
        </div>
    );
}
