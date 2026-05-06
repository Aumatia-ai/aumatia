import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import WhatsAppBubble from "@/components/WhatsAppBubble";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aumatia.com.co'),
  title: "Aumatia - Ecosistema SaaS de Aceleración de Ventas con IA",
  description: "SaaS de prospección inteligente para PYMES. Unifica inventario, ventas y clientes. POS, Marketplaces, Contabilidad y Agentes AI 24/7 en un solo flujo.",
  keywords: "Generación de leads con IA, Automatización de prospección B2B, SaaS de prospección inteligente, Omnicanalidad para PYMES",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://aumatia.com.co",
    title: "Aumatia - SaaS de Aceleración de Ventas con IA",
    description: "Todo tu negocio conectado a un solo inventario. POS, Marketplaces, Contabilidad y Agentes de IA en perfecta sincronía.",
    siteName: "Aumatia",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aumatia Dashboard - Ecosistema Unificado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aumatia - Ecosistema SaaS de Aceleración de Ventas",
    description: "SaaS de prospección inteligente para PYMES. Unifica inventario, ventas y clientes.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Aumatia",
  "url": "https://aumatia.com.co",
  "logo": "https://aumatia.com.co/icon.png",
  "description": "Ecosistema SaaS de aceleración de ventas impulsado por IA dirigido a PYMES.",
  "sameAs": [
    "https://www.linkedin.com/company/aumatia",
    "https://www.facebook.com/aumatia"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {children}
          <WhatsAppBubble />
        </Providers>
        
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
