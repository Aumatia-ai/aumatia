import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart POS - Facturación y Control de Stock Físico",
  description: "Aumatia Smart POS: Facturación electrónica, control de inventario en tiempo real y ventas físicas para PYMES. Unifica tu stock hoy mismo.",
  openGraph: {
    title: "Smart POS - Control de Stock Físico | Aumatia",
    description: "Facturación electrónica y control de inventario en tiempo real para tu tienda física.",
    url: "https://aumatia.com.co/smart-pos",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Aumatia Smart POS",
            "operatingSystem": "Web, iOS, Android",
            "applicationCategory": "BusinessApplication",
            "description": "Sistema de Punto de Venta inteligente con facturación electrónica y control de stock unificado.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "COP"
            }
          })
        }}
      />
      {children}
    </>
  );
}
