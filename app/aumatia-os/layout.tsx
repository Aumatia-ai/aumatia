import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aumatia OS - El Sistema Operativo para tu Empresa",
  description: "Conecta tu punto de venta, tienda online, finanzas y agentes de IA bajo un mismo núcleo de datos. Multi-tenant y conectividad total.",
  openGraph: {
    title: "Aumatia OS - Sistema Operativo B2B",
    description: "Conecta tu punto de venta, tienda online, finanzas y agentes de IA bajo un mismo núcleo de datos.",
    url: "https://aumatia.com.co/aumatia-os",
  }
};

export default function AumatiaOSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Aumatia OS",
            "operatingSystem": "Web",
            "applicationCategory": "BusinessApplication",
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
