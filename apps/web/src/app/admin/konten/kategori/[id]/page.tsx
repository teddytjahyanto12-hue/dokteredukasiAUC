import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { DISPLAY_TYPE_LABEL, DISPLAY_TYPES } from "@/lib/constants";
import { deleteCategoryAction, saveCategoryAction, saveTopicAction } from "@/app/actions/admin-content";
import { ConfirmButton } from "@/components/confirm-button";
import { Empty, Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export default async function AdminCategory({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  const { id } = await params;
  const { pesan, tipe } = await readFlash(searchParams);
  const category = await db.category.findUnique({
    where: { id },
    include: {
      track: true,
      topics: { orderBy: { order: "asc" }, include: { _count: { select: { items: true } }, quiz: { include: { _count: { select: { questions: true } } } } } },
      packages: { include: { package: { select: { name: true } } } },
    },
  });
  if (!category) notFound();

  return (
    <>
      <PageHeader title={category.title} subtitle={`${category.track.title} · ${DISPLAY_TYPE_LABEL[category.displayType as keyof typeof DISPLAY_TYPE_LABEL]}`} back={{ href: "/admin/konten", label: "Konten" }} />
      <Flash pesan={pesan} tipe={tipe} />

      <section className="card mb-6">
        <h2 className="h2 mb-3">Topik</h2>
        {category.topics.length === 0 ? (
          <Empty>Belum ada topik.</Empty>
        ) : (
          <ul className="divide-y divide-slate-100">
            {category.topics.map((t) => (
              <li key={t.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <div>
                  <Link href={`/admin/konten/topik/${t.id}`} className="link">
                    {t.order}. {t.title}
                  </Link>
                  {!t.published && <span className="badge ml-2">Disembunyikan</span>}
                  <p className="text-xs text-slate-500">
                    {t._count.items} materi{t.quiz ? ` · quiz ${t.quiz._count.questions} soal` : " · belum ada quiz"}
                  </p>
                </div>
                <Link href={`/admin/konten/topik/${t.id}`} className="btn-secondary btn-sm">
                  Kelola materi & quiz
                </Link>
              </li>
            ))}
          </ul>
        )}
        <form action={saveTopicAction} className="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-[1fr_100px_auto] sm:items-end">
          <input type="hidden" name="categoryId" value={category.id} />
          <Field label="Topik baru">
            <input className="input" name="title" required placeholder={category.displayType === "LINKS" ? "Mis. Section: Anatomi" : "Mis. Sistem Kardiovaskular"} />
          </Field>
          <Field label="Urutan">
            <input className="input" name="order" inputMode="numeric" defaultValue={category.topics.length} />
          </Field>
          <button className="btn" type="submit">
            Tambah topik
          </button>
        </form>
      </section>

      <form action={saveCategoryAction} className="card grid gap-3 sm:grid-cols-2">
        <input type="hidden" name="id" value={category.id} />
        <input type="hidden" name="trackId" value={category.trackId} />
        <h2 className="h2 sm:col-span-2">Pengaturan kategori</h2>
        <Field label="Judul">
          <input className="input" name="title" defaultValue={category.title} required />
        </Field>
        <Field label="Slug (alamat URL)">
          <input className="input" name="slug" defaultValue={category.slug} />
        </Field>
        <Field label="Tipe tampilan">
          <select className="input" name="displayType" defaultValue={category.displayType}>
            {DISPLAY_TYPES.map((d) => (
              <option key={d} value={d}>
                {DISPLAY_TYPE_LABEL[d]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Urutan">
          <input className="input" name="order" inputMode="numeric" defaultValue={category.order} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Deskripsi">
            <textarea className="input" name="description" rows={2} defaultValue={category.description ?? ""} />
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked={category.published} /> Tampilkan di website
        </label>
        <p className="text-xs text-slate-500 sm:col-span-2">
          Termasuk dalam paket: {category.packages.map((p) => p.package.name).join(", ") || "belum ada — atur di menu Paket"}
        </p>
        <div>
          <button className="btn" type="submit">
            Simpan kategori
          </button>
        </div>
      </form>

      <form action={deleteCategoryAction} className="mt-6">
        <input type="hidden" name="id" value={category.id} />
        <ConfirmButton message="Hapus kategori ini? (hanya bisa bila tidak ada topik)">Hapus kategori</ConfirmButton>
      </form>
    </>
  );
}
