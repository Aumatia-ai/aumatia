import { Target, Users, Briefcase } from "lucide-react";

const audiences = [
    {
        title: "Para Founders",
        description: "Deja de perder tiempo configurando 5 herramientas. Consigue tus primeros 100 clientes desde el día 1.",
        icon: Target
    },
    {
        title: "Para SDRs",
        description: "Elimina el trabajo manual. Prospecta, contacta y agenda sin salir de la pantalla.",
        icon: Users
    },
    {
        title: "Para Agencias",
        description: "Gestiona múltiples clientes y pipelines con eficiencia brutal.",
        icon: Briefcase
    }
];

export default function OSTargetAudience() {
    return (
        <section className="py-24 px-6 sm:px-12">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {audiences.map((audience, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center text-center space-y-4"
                        >
                            <div className="h-16 w-16 rounded-full bg-neon-blue/10 flex items-center justify-center border border-neon-blue/30 mb-2">
                                <audience.icon className="w-8 h-8 text-neon-blue" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">{audience.title}</h3>
                            <p className="text-white/60 leading-relaxed max-w-sm">
                                {audience.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
