import Link from "next/link";
import { getSettings, whatsappLink } from "@/lib/settings";

export async function SiteFooter() {
  const s = await getSettings();
  const wa = whatsappLink(s.adminWhatsapp, `Halo admin ${s.siteName}`);
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white print:hidden">
      <div className="container-page flex flex-col gap-3 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>{s.footerNote}</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/program/pre-clinical" className="hover:text-brand">
            Pre-Clinical
          </Link>
          <Link href="/program/clinical-practice" className="hover:text-brand">
            Clinical Practice
          </Link>
          <Link href="/program/medical-research" className="hover:text-brand">
            Medical Research
          </Link>
          <Link href="/paket" className="hover:text-brand">
            Layanan
          </Link>
          <Link href="/gabung-tutor" className="hover:text-brand">
            Jadi Tutor
          </Link>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
              WhatsApp Admin
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
