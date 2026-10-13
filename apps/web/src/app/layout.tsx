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
  return { title: { default: s.siteName, template: `%s · ${s.siteName}` }, description: s.heroSubtitle };
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
