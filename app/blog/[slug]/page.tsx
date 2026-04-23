import Navbar from "@/components/Navbar";
import TrustFooter from "@/components/TrustFooter";
import { blogPosts } from "@/lib/blog-data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    title: `${post.title} | Blog Aumatia`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      authors: [post.author],
      publishedTime: post.date,
      url: `https://aumatia.com.co/blog/${post.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    datePublished: post.date,
  };

  const isHowTo = post.title.toLowerCase().includes("cómo");
  const howToSchema = isHowTo ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: post.title,
    description: post.description,
    step: [
      {
        "@type": "HowToStep",
        text: "Paso 1: Configura tu cuenta",
      },
      {
        "@type": "HowToStep",
        text: "Paso 2: Activa las automatizaciones",
      }
    ]
  } : null;

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}

      <div className="pt-32 pb-24 container mx-auto px-6 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al blog</span>
        </Link>
        
        <header className="mb-12">
          <div className="flex flex-wrap gap-4 text-sm mb-6 text-white/50">
            <span className="text-cyan-400 font-semibold">{post.category}</span>
            <span>•</span>
            <span>{new Date(post.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>•</span>
            <span>{post.readingTime} de lectura</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">{post.title}</h1>
          <p className="text-xl text-white/60 leading-relaxed border-l-4 border-cyan-500 pl-6">{post.description}</p>
        </header>

        {/* Minimalist markdown renderer simulation */}
        <div 
          className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-cyan-400 prose-strong:text-white prose-li:text-white/80"
          dangerouslySetInnerHTML={{ 
            __html: post.content
              .replace(/\n\n/g, '</p><p>')
              .replace(/## (.*?)\n/g, '<h2>$1</h2>')
              .replace(/### (.*?)\n/g, '<h3>$1</h3>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/- (.*?)\n/g, '<li>$1</li>')
              .replace(/\n1\. (.*?)\n/g, '<li>$1</li>')
              .replace(/\n2\. (.*?)\n/g, '<li>$1</li>')
              .replace(/\n3\. (.*?)\n/g, '<li>$1</li>')
          }}
        />

        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="bg-white/5 p-8 rounded-3xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">¿Listo para aplicar esto en tu PYME?</h3>
            <p className="text-white/60 mb-6">Agenda una demo gratuita y descubre cómo Aumatia puede escalar tus ventas automáticamente.</p>
            <Link href="/demo" className="inline-block px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-full transition-colors">
              Solicitar Demo
            </Link>
          </div>
        </div>
      </div>
      <TrustFooter />
    </main>
  );
}
