import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Descarga la Guía: Automatiza y Escala tu PYME con IA | Aumatia",
  description: "Descubre cómo usar IA para generar leads B2B, automatizar tu inventario y reducir costos operativos. Descarga gratuita.",
  openGraph: {
    title: "Guía Práctica: Automatiza y Escala tu PYME con IA",
    description: "Manual B2B para implementar Inteligencia Artificial en ventas, prospección e inventario.",
    url: "https://aumatia.com.co/guia-pymes-ia",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
