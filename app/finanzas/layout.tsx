import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finanzas e Inteligencia de Negocios | Aumatia",
  description: "Control financiero, reportes automáticos e integración nativa con Siigo para tu contabilidad B2B.",
  openGraph: {
    title: "Finanzas e Inteligencia de Negocios - Aumatia",
    description: "Control financiero, reportes automáticos e integración nativa con Siigo para tu contabilidad B2B.",
    url: "https://aumatia.com.co/finanzas",
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
            "name": "Aumatia Finanzas & Siigo",
            "operatingSystem": "Web",
            "applicationCategory": "BusinessApplication",
            "description": "Control financiero, reportes automáticos e integración nativa con Siigo para tu contabilidad B2B.",
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
