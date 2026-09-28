import Link from "next/link";
import { db } from "@/lib/db";
import { DISPLAY_TYPE_LABEL, DISPLAY_TYPES } from "@/lib/constants";
import { saveCategoryAction, saveTrackAction } from "@/app/actions/admin-content";
import { Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Konten" };

export default async function AdminContent({ searchParams }: { searchParams: SearchParams }) {
  const { pesan, tipe } = await readFlash(searchParams);
  const tracks = await db.track.findMany({
    orderBy: { order: "asc" },
    include: {
      categories: {
        orderBy: { order: "asc" },
        include: { _count: { select: { topics: true } } },
      },
    },
  });

  return (
    <>
      <PageHeader title="Konten materi" subtitle="Struktur: Jalur → Kategori → Topik → Materi (slide/PDF/video/tautan/teks) + quiz per topik." />
      <Flash pesan={pesan} tipe={tipe} />
      <div className="space-y-6">
        {tracks.map((t) => (
          <section key={t.id} className="card">
            <details>
              <summary className="cursor-pointer">
                <span className="text-lg font-bold">{t.title}</span>{" "}
                {!t.published && <span className="badge ml-2">Disembunyikan</span>}
                {t.hasMentoring && <span className="badge-warn ml-2">Ada bimbingan</span>}
                <span className="ml-2 text-sm text-brand">(ubah jalur)</span>
              </summary>
              <form action={saveTrackAction} className="mt-3 grid gap-3 sm:grid-cols-2">
                <input type="hidden" name="id" value={t.id} />
                <Field label="Judul">
                  <input className="input" name="title" defaultValue={t.title} required />
                </Field>
                <Field label="Urutan">
                  <input className="input" name="order" inputMode="numeric" defaultValue={t.order} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Deskripsi">
                    <textarea className="input" name="description" rows={2} defaultValue={t.description ?? ""} />
                  </Field>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="hasMentoring" defaultChecked={t.hasMentoring} /> Jalur memiliki bimbingan
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="published" defaultChecked={t.published} /> Tampilkan di website
                </label>
                <div>
                  <button className="btn-secondary btn-sm" type="submit">
                    Simpan jalur
                  </button>
                </div>
              </form>
            </details>

            <ul className="mt-4 divide-y divide-slate-100">
              {t.categories.map((c) => (
                <li key={c.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <div>
                    <Link href={`/admin/konten/kategori/${c.id}`} className="link">
                      {c.title}
                    </Link>
                    {!c.published && <span className="badge ml-2">Disembunyikan</span>}
                    <p className="text-xs text-slate-500">
                      {DISPLAY_TYPE_LABEL[c.displayType as keyof typeof DISPLAY_TYPE_LABEL]} · {c._count.topics} topik
                    </p>
                  </div>
                  <Link href={`/admin/konten/kategori/${c.id}`} className="btn-secondary btn-sm">
                    Kelola
                  </Link>
                </li>
              ))}
            </ul>

            <details className="mt-3">
              <summary className="cursor-pointer text-sm font-medium text-brand">+ Tambah kategori di {t.title}</summary>
              <form action={saveCategoryAction} className="mt-3 grid gap-3 sm:grid-cols-2">
                <input type="hidden" name="trackId" value={t.id} />
                <Field label="Judul kategori">
                  <input className="input" name="title" required />
                </Field>
                <Field label="Tipe tampilan">
                  <select className="input" name="displayType" defaultValue="MATERIAL">
                    {DISPLAY_TYPES.map((d) => (
                      <option key={d} value={d}>
                        {DISPLAY_TYPE_LABEL[d]}
                      </option>
                    ))}
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Deskripsi">
                    <input className="input" name="description" />
                  </Field>
                </div>
                <input type="hidden" name="order" value={t.categories.length} />
                <div>
                  <button className="btn btn-sm" type="submit">
                    Tambah kategori
                  </button>
                </div>
              </form>
            </details>
          </section>
        ))}
      </div>
    </>
  );
}
