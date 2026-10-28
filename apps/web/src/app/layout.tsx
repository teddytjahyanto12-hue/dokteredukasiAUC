import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getSettings } from "@/lib/settings";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  // Ikon tab & gambar pratinjau tautan berasal dari src/app/icon.png, apple-icon.png, opengraph-image.png (logo DEA).
  return {
    metadataBase: new URL(process.env.APP_URL || "http://localhost:3000"),
    title: { default: s.siteName, template: `%s · ${s.siteName}` },
    description: s.heroSubtitle,
    openGraph: { siteName: s.siteName, locale: "id_ID", type: "website" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${manrope.variable} flex min-h-screen flex-col antialiased`}>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <WhatsAppButton />
      </body>
    </html>
  );
}
