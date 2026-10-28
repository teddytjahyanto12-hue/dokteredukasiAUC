import Link from "next/link";
import { db } from "@/lib/db";
import { tanggal } from "@/lib/format";
import { Empty } from "@/components/ui";
import { Icon } from "@/components/icons";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Tinjauan Medis", description: "Artikel tinjauan medis ringkas dan sistematis untuk praktisi dan mahasiswa kedokteran." };

// Daftar artikel berupa kartu bergambar; kategori (diatur admin) jadi pilihan di atas.
export default async function MedicalReviewList({ searchParams }: { searchParams: SearchParams }) {
  const { pick } = await readFlash(searchParams);
  const active = pick("kategori");
  const categories = await db.medicalReviewCategory.findMany({
    where: { reviews: { some: { published: true } } },
    orderBy: [{ order: "asc" }, { name: "asc" }],
    select: { id: true, name: true, slug: true },
  });
  const current = categories.find((c) => c.slug === active);
  const rows = await db.medicalReview.findMany({
    where: { published: true, ...(current ? { categoryId: current.id } : {}) },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    select: { slug: true, title: true, author: true, coverFileId: true, publishedAt: true, category: { select: { name: true } } },
  });
  const chip = (on: boolean) =>
    `inline-flex shrink-0 items-center rounded-full border px-4 py-2 text-sm font-semibold transition ${on ? "border-ink bg-ink text-white" : "border-slate-300 bg-white text-slate-700 hover:border-ink"}`;

  return (
    <div className="container-page py-10 sm:py-14">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Dokter Edukasi Academy</p>
        <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Tinjauan Medis</h1>
        <p className="mt-3 text-slate-600">Ulasan klinis yang ringkas dan sistematis. Pilih kategori, lalu buka topik yang ingin dibaca.</p>
      </header>

      {categories.length > 0 && (
        <nav aria-label="Kategori" className="mx-auto mt-8 flex max-w-5xl gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center">
          <Link href="/tinjauan-medis" className={chip(!current)} aria-current={!current ? "page" : undefined}>
            Semua
          </Link>
          {categories.map((c) => (
            <Link key={c.id} href={`/tinjauan-medis?kategori=${c.slug}`} className={chip(current?.id === c.id)} aria-current={current?.id === c.id ? "page" : undefined}>
              {c.name}
            </Link>
          ))}
        </nav>
      )}

      <div className="mx-auto mt-8 max-w-6xl">
        {rows.length === 0 ? (
          <Empty>Artikel Tinjauan Medis segera hadir.</Empty>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((r) => (
              <li key={r.slug}>
                <Link href={`/tinjauan-medis/${r.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-ink hover:shadow-lg">
                  <div className="relative aspect-[16/10] bg-mascot/20">
                    {r.coverFileId ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`/api/berkas/${r.coverFileId}`} alt="" loading="lazy" className="h-full w-full object-cover transition group-hover:scale-[1.02]" />
                    ) : (
                      <span className="grid h-full w-full place-items-center text-brand" aria-hidden>
                        <Icon name="file" className="h-10 w-10" />
                      </span>
                    )}
                    {r.category && <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-ink shadow-sm">{r.category.name}</span>}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h2 className="font-serif text-lg font-bold leading-snug text-slate-900">{r.title}</h2>
                    <p className="mt-auto pt-3 text-xs text-slate-500">
                      {r.author ? `${r.author} · ` : ""}
                      {tanggal(r.publishedAt)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
