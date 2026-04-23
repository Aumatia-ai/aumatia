import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketplace Integrado | Aumatia",
  description: "Gestión de ventas en múltiples canales digitales desde un solo lugar. Mercado Libre, Linio, Falabella y más.",
  openGraph: {
    title: "Marketplace Integrado - Aumatia",
    description: "Gestión de ventas en múltiples canales digitales desde un solo lugar. Mercado Libre, Linio, Falabella y más.",
    url: "https://aumatia.com.co/marketplace",
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
            "name": "Aumatia Marketplace",
            "operatingSystem": "Web",
            "applicationCategory": "BusinessApplication",
            "description": "Gestión de ventas en múltiples canales digitales desde un solo lugar. Mercado Libre, Linio, Falabella y más.",
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
