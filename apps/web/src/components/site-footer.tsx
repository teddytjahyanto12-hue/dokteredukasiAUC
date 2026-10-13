import Link from "next/link";
import { db } from "@/lib/db";
import { getSettings, whatsappLink } from "@/lib/settings";

export async function SiteFooter() {
  const [s, tracks] = await Promise.all([
    getSettings(),
    db.track.findMany({ where: { published: true }, orderBy: { order: "asc" }, select: { slug: true, title: true } }),
  ]);
  const wa = whatsappLink(s.adminWhatsapp, `Halo admin ${s.siteName}`);
  const col = "text-xs font-bold uppercase tracking-[0.12em] text-white";
  const link = "block text-sm text-slate-400 hover:text-white";
  return (
    <footer className="mt-16 bg-ink print:hidden">
      <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-mascot text-sm font-bold text-ink">DE</span>
            <span className="leading-tight">
              <span className="block font-[family-name:var(--font-fraunces),Georgia,serif] text-lg font-bold text-white">{s.siteName}</span>
              {s.siteTagline && <span className="block text-xs font-semibold text-mascot">{s.siteTagline}</span>}
            </span>
          </p>
          <p className="mt-4 max-w-xs whitespace-pre-line text-sm leading-relaxed text-slate-400">{s.heroSubtitle}</p>
        </div>
        <div>
          <p className={col}>Jalur Pembelajaran</p>
          <div className="mt-4 space-y-2">
            {tracks.map((t) => (
              <Link key={t.slug} href={`/kelas?program=${t.slug}`} className={link}>
                {t.title}
              </Link>
            ))}
            <Link href="/jalur" className={link}>
              Jalur belajar bertahap
            </Link>
          </div>
        </div>
        <div>
          <p className={col}>Fitur Platform</p>
          <div className="mt-4 space-y-2">
            <Link href="/belajar" className={link}>
              Dashboard Progres Belajar
            </Link>
            <Link href="/paket" className={link}>
              Layanan
            </Link>
            <Link href="/penawaran" className={link}>
              Penawaran & Harga
            </Link>
            <Link href="/gabung-tutor" className={link}>
              Jadi Tutor
            </Link>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className={link}>
                WhatsApp Admin
              </a>
            )}
          </div>
        </div>
        <div>
          <p className={col}>Kepatuhan & Integritas Medis</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Materi kelas ditujukan untuk tujuan edukasi kedokteran dan pelatihan akademik. Penerapan klinis pada pasien nyata selalu memerlukan pertimbangan dokter penanggung jawab pelayanan
            (DPJP).
          </p>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1400px] border-t border-white/10 px-4 py-5 text-xs text-slate-500 sm:px-6">{s.footerNote}</div>
    </footer>
  );
}
