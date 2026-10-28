import Link from "next/link";
import { db } from "@/lib/db";
import { tanggal } from "@/lib/format";
import { Empty } from "@/components/ui";

export const metadata = { title: "Tinjauan Medis", description: "Artikel tinjauan medis ringkas dan sistematis untuk praktisi dan mahasiswa kedokteran." };

export default async function MedicalReviewList() {
  const rows = await db.medicalReview.findMany({
    where: { published: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    select: { slug: true, title: true, category: true, author: true, abstract: true, publishedAt: true },
  });
  return (
    <div className="container-page py-10 sm:py-14">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Dokter Edukasi Academy</p>
        <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Tinjauan Medis</h1>
        <p className="mt-3 text-slate-600">Ulasan klinis yang ringkas dan sistematis: abstrak, patofisiologi, diagnosis, tata laksana, dan pesan klinis.</p>
      </header>
      <div className="mx-auto mt-10 max-w-4xl">
        {rows.length === 0 ? (
          <Empty>Artikel Tinjauan Medis segera hadir.</Empty>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2">
            {rows.map((r) => (
              <li key={r.slug}>
                <Link href={`/tinjauan-medis/${r.slug}`} className="card block h-full transition hover:border-ink">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand">{r.category ? `${r.category} | ` : ""}Tinjauan Medis</p>
                  <h2 className="mt-2 font-serif text-lg font-bold leading-snug text-slate-900">{r.title}</h2>
                  {r.abstract && <p className="mt-2 line-clamp-3 text-sm text-slate-600">{r.abstract.replace(/^[-•]\s+/gm, "")}</p>}
                  <p className="mt-3 text-xs text-slate-500">
                    {r.author ? `Oleh: ${r.author} | ` : ""}Diterbitkan: {tanggal(r.publishedAt)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
