import Link from "next/link";
import { db } from "@/lib/db";
import { rupiah } from "@/lib/format";
import { startingPrice } from "@/lib/services";

export const metadata = { title: "Layanan" };

export default async function ServicesPage() {
  const [tracks, services] = await Promise.all([
    db.track.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    db.package.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
      include: { durations: { where: { active: true } }, addons: { where: { active: true } }, benefits: { orderBy: { order: "asc" }, take: 3 } },
    }),
  ]);
  const groups = [
    ...tracks.map((t) => ({ key: t.slug, title: t.title, items: services.filter((p) => p.trackSlug === t.slug) })),
    { key: "lainnya", title: "Lainnya", items: services.filter((p) => !tracks.some((t) => t.slug === p.trackSlug)) },
  ].filter((g) => g.items.length);

  return (
    <div className="container-page py-10">
      <h1 className="h1">Layanan</h1>
      <p className="mt-2 text-slate-600">Pilih layanan, masa belajar, dan add-on sesuai kebutuhan Anda.</p>

      {groups.map((g) => (
        <section key={g.key} className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">{g.title}</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map((p) => {
              const from = startingPrice(p);
              return (
                <Link key={p.id} href={`/paket/${p.slug}`} className="card flex flex-col overflow-hidden p-0 transition hover:-translate-y-0.5 hover:shadow-md">
                  {p.posterFileId ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`/api/berkas/${p.posterFileId}`} alt={`Poster ${p.name}`} className="aspect-[4/5] w-full object-cover" />
                  ) : (
                    // Tanpa poster: tampilkan kartu berbentuk poster agar grid tetap rapi.
                    <div className="flex aspect-[4/5] w-full flex-col justify-end bg-gradient-to-br from-brand to-brand-dark p-6 text-white" aria-hidden>
                      <span className="text-xs font-semibold uppercase tracking-widest text-white/70">{g.title}</span>
                      <span className="mt-2 text-2xl font-bold leading-tight">{p.name}</span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-slate-900">{p.name}</h3>
                      {p.includesMentoring && <span className="badge-warn shrink-0">Bimbingan</span>}
                    </div>
                    {p.summary && <p className="mt-2 text-sm text-slate-600">{p.summary}</p>}
                    {p.benefits.length > 0 && (
                      <ul className="mt-3 space-y-1 text-sm text-slate-600">
                        {p.benefits.map((b) => (
                          <li key={b.id}>✓ {b.text}</li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-auto pt-4">
                      <p className="text-lg font-bold text-brand">{from !== null ? `Mulai ${rupiah(from)}` : "Harga segera diumumkan"}</p>
                      <p className="text-xs text-slate-500">
                        {p.durations.length ? `Pilihan ${p.durations.map((d) => d.label).join(" / ")}` : "Masa akses sesuai layanan"}
                        {p.addons.length > 0 && ` · ${p.addons.length} add-on`}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
