import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agentes AI - Empleados Virtuales | Aumatia",
  description: "Conversaciones naturales con IA. Tus agentes atienden, venden y agendan reuniones 24/7 en WhatsApp y Web.",
  openGraph: {
    title: "Agentes AI - Empleados Virtuales - Aumatia",
    description: "Conversaciones naturales con IA. Tus agentes atienden, venden y agendan reuniones 24/7 en WhatsApp y Web.",
    url: "https://aumatia.com.co/agentes-ai",
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
            "name": "Aumatia Agentes AI",
            "operatingSystem": "Web",
            "applicationCategory": "BusinessApplication",
            "description": "Conversaciones naturales con IA. Tus agentes atienden, venden y agendan reuniones 24/7 en WhatsApp y Web.",
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
