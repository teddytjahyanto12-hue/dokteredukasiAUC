import Link from "next/link";
import { searchSite } from "@/lib/search";
import { SiteSearch } from "@/components/site-search";

export const metadata = { title: "Pencarian" };
export const dynamic = "force-dynamic";

// Halaman hasil pencarian lengkap seluruh fitur situs.
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const groups = q.trim().length >= 2 ? await searchSite(q, 20) : [];
  return (
    <div className="container-page py-10">
      <h1 className="h1">Pencarian</h1>
      <p className="mt-2 text-slate-600">Cari kelas, Blok, materi, kalkulator medis, paket, dan fitur lain di Dokter Edukasi.</p>
      <div className="mt-6">
        <SiteSearch variant="page" initial={q} />
      </div>
      {q.trim().length >= 2 && (
        <div className="mt-8 space-y-8">
          {groups.length === 0 && <p className="text-slate-600">Tidak ada hasil untuk &ldquo;{q}&rdquo;. Coba kata lain atau kode Blok (mis. BKV-12).</p>}
          {groups.map((g) => (
            <section key={g.key}>
              <h2 className="h2">{g.label}</h2>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {g.items.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} className="card block transition hover:-translate-y-0.5 hover:border-slate-400">
                      <span className="block font-semibold text-slate-900">{it.title}</span>
                      {it.subtitle && <span className="mt-1 block text-sm text-slate-600">{it.subtitle}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
