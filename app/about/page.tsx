import { Zap, Puzzle, LayoutGrid } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 overflow-hidden relative">
            {/* Background elements to keep the tech ecosystem feel */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background -z-10" />

            <div className="container mx-auto px-6 max-w-5xl">
                {/* Hero section */}
                <div className="text-center mb-24">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 relative z-10">
                        Transformando el comercio, <br className="hidden md:block"/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                            pieza a pieza.
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Construimos el ecosistema operativo definitivo para empresas modernas. No te adaptes al software; deja que la tecnología se adapte a tu negocio.
                    </p>
                </div>

                {/* Nuestra Historia */}
                <div className="mb-24 relative p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="absolute top-0 left-12 w-32 h-32 bg-neon-blue/20 blur-[50px] -z-10 rounded-full" />
                    <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
                        <Zap className="w-8 h-8 text-neon-blue" />
                        Nuestra Historia
                    </h2>
                    <div className="prose prose-invert max-w-none text-white/80 leading-relaxed space-y-4">
                        <p>
                            Nacimos de observar un problema que asfixiaba a miles de comerciantes: la fragmentación extrema. Por años, los negocios han tenido que lidiar con un sistema para facturar, otro distinto para controlar el inventario de la tienda física, una plataforma separada para la venta online, y por si fuera poco, Excel o libretas para las finanzas. 
                        </p>
                        <p>
                            Esa desarticulación costaba tiempo, generaba errores humanos costosos y frenaba el crecimiento. 
                        </p>
                        <p>
                            Fundamos <strong>Aumatia</strong> para cambiar este paradigma. Decidimos crear no solo un programa de ventas, sino un verdadero <em>Sistema Operativo Comercial (OS)</em>. Un "Cerebro Central" donde todo se conecta: desde el datáfono inteligente en mostrador, pasando por los canales de WhatsApp con Inteligencia Artificial, hasta la tienda virtual y el proceso contable. Todo sincronizado en menos de 1.5 segundos.
                        </p>
                    </div>
                </div>

                {/* Nuestra Visión */}
                <div className="mb-24 flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
                            <LayoutGrid className="w-8 h-8 text-neon-purple" />
                            Nuestra Visión
                        </h2>
                        <p className="text-white/80 leading-relaxed text-lg">
                            Imaginamos un futuro en el que cualquier emprendedor o empresa instalada pueda operar con la misma sofisticación tecnológica que los gigantes del retail, pero sin la complejidad de sistemas heredados. Queremos democratizar la omnicanalidad, dándole el poder a los comercios de elegir, construir y escalar sus operaciones logísticas y de ventas de forma modular y automatizada.
                        </p>
                    </div>
                    {/* Visual Placeholder Graphic */}
                    <div className="flex-1 w-full bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-white/10 p-8 rounded-3xl backdrop-blur-sm relative overflow-hidden flex items-center justify-center min-h-[300px]">
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
                        <div className="relative z-10 text-center space-y-4">
                            <div className="w-24 h-24 mx-auto rounded-full bg-neon-blue/20 flex items-center justify-center animate-pulse">
                                <Puzzle className="w-12 h-12 text-neon-blue" />
                            </div>
                            <h3 className="text-2xl font-bold text-white tracking-widest uppercase">Ecosistema Central</h3>
                        </div>
                    </div>
                </div>

                {/* Core Values */}
                <div>
                    <h2 className="text-3xl font-bold mb-12 text-center text-white">Nuestros Valores</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Valor 1 */}
                        <div className="p-8 rounded-2xl bg-black/40 border border-white/10 hover:border-neon-blue/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
                                <span className="text-2xl font-bold text-neon-blue">01</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Modularidad</h3>
                            <p className="text-white/70">
                                Creemos en componentes que encajan perfectamente. No forzamos paquetes pesados; tú eliges qué piezas necesitas hoy y cuáles mañana.
                            </p>
                        </div>
                        
                        {/* Valor 2 */}
                        <div className="p-8 rounded-2xl bg-black/40 border border-white/10 hover:border-purple-500/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
                                <span className="text-2xl font-bold text-neon-purple">02</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Innovación Pragmática</h3>
                            <p className="text-white/70">
                                Implementamos inteligencia artificial y automatización no por ser la moda, sino porque reducen directamente los costos y multiplican las ventas de nuestros clientes.
                            </p>
                        </div>

                        {/* Valor 3 */}
                        <div className="p-8 rounded-2xl bg-black/40 border border-white/10 hover:border-cyan-500/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6">
                                <span className="text-2xl font-bold text-cyan-400">03</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Transparencia Total</h3>
                            <p className="text-white/70">
                                Somos claros con nuestra infraestructura, nuestros precios y nuestro soporte técnico. Sin letas pequeñas ni comisiones ocultas por transición.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
