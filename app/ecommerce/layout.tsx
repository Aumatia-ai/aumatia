import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda Online E-commerce | Aumatia",
  description: "Tu propia tienda online B2B o B2C, sincronizada 100% con tu inventario físico y bodegas.",
  openGraph: {
    title: "Tienda Online E-commerce - Aumatia",
    description: "Tu propia tienda online B2B o B2C, sincronizada 100% con tu inventario físico y bodegas.",
    url: "https://aumatia.com.co/ecommerce",
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
            "name": "Aumatia E-commerce",
            "operatingSystem": "Web",
            "applicationCategory": "BusinessApplication",
            "description": "Tu propia tienda online B2B o B2C, sincronizada 100% con tu inventario físico y bodegas.",
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
