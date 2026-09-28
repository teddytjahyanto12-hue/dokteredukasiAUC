import Link from "next/link";
import { db } from "@/lib/db";
import { rupiah } from "@/lib/format";

export const metadata = { title: "Paket" };

export default async function PackagesPage() {
  const [tracks, packages] = await Promise.all([
    db.track.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    db.package.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
  ]);
  const groups = [
    ...tracks.map((t) => ({ key: t.slug, title: t.title, items: packages.filter((p) => p.trackSlug === t.slug) })),
    { key: "lainnya", title: "Lainnya", items: packages.filter((p) => !tracks.some((t) => t.slug === p.trackSlug)) },
  ].filter((g) => g.items.length);

  return (
    <div className="container-page py-10">
      <h1 className="h1">Paket belajar</h1>
      <p className="mt-2 text-slate-600">Pilih materi mandiri atau paket dengan bimbingan tutor.</p>

      {groups.map((g) => (
        <section key={g.key} className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">{g.title}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map((p) => (
              <Link key={p.id} href={`/paket/${p.slug}`} className="card flex flex-col transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-slate-900">{p.name}</h3>
                  {p.includesMentoring && <span className="badge-warn shrink-0">Bimbingan</span>}
                </div>
                <p className="mt-2 flex-1 text-sm text-slate-600">{p.summary}</p>
                <p className="mt-4 text-lg font-bold text-brand">{rupiah(p.price)}</p>
                <p className="text-xs text-slate-500">{p.accessDays ? `Akses ${p.accessDays} hari` : "Masa akses: menyusul"}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
