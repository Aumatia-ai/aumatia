import Navbar from "@/components/Navbar";
import TrustFooter from "@/components/TrustFooter";
import { blogPosts } from "@/lib/blog-data";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Recursos sobre IA y Automatización de Ventas | Aumatia",
  description: "Aprende cómo usar la IA, automatizar la prospección B2B y optimizar tu inventario. Consejos y guías prácticas para PYMES.",
  openGraph: {
    title: "Blog de Aumatia | Recursos sobre IA y Ventas",
    description: "Recursos, guías y casos de uso para escalar tu negocio con automatización e Inteligencia Artificial.",
    url: "https://aumatia.com.co/blog",
  }
};

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <div className="pt-32 pb-24 container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Recursos B2B</span>
          <h1 className="text-5xl font-black mb-6 text-white">Blog de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Aumatia</span></h1>
          <p className="text-white/60 text-lg">Guías prácticas, casos de uso y estrategias para acelerar tus ventas usando Inteligencia Artificial y automatización.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-cyan-500/30 transition-all h-full flex flex-col">
                <div className="flex justify-between items-center mb-6 text-sm">
                  <span className="text-cyan-400 font-semibold">{post.category}</span>
                  <span className="text-white/40">{post.readingTime} de lectura</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">{post.title}</h2>
                <p className="text-white/60 mb-8 flex-grow">{post.description}</p>
                <div className="flex items-center justify-between text-sm mt-auto pt-4 border-t border-white/5">
                  <span className="text-white/80">{post.author}</span>
                  <span className="text-white/40">{new Date(post.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
      <TrustFooter />
    </main>
  );
}
