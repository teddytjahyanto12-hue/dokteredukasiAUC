import { requirePermission } from "@/lib/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { DISPLAY_TYPE_LABEL, DISPLAY_TYPES } from "@/lib/constants";
import { studentCounts } from "@/lib/courses";
import { deleteCategoryAction, saveCategoryAction, saveTopicAction } from "@/app/actions/admin-content";
import { ConfirmButton } from "@/components/confirm-button";
import { Empty, Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export default async function AdminCategory({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  await requirePermission("admin.content");
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
  const counts = (await studentCounts([category])).get(category.id)!;

  return (
    <>
      <PageHeader title={category.title} subtitle={`${category.track.title} · ${DISPLAY_TYPE_LABEL[category.displayType as keyof typeof DISPLAY_TYPE_LABEL]}`} back={{ href: "/admin/konten", label: "Konten" }}
        actions={
          <Link href={`/kelas/${category.id}`} className="btn-secondary btn-sm">
            Lihat halaman kelas
          </Link>
        }
      />
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
        <h2 className="h2 sm:col-span-2">Pengaturan kategori (kelas)</h2>
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
        <h3 className="mt-2 text-sm font-semibold text-slate-900 sm:col-span-2">Halaman kelas (opsional)</h3>
        <Field label="Jumlah murid awal (manual)" hint={`Tampil di kartu kelas: ${counts.total.toLocaleString("id-ID")} murid = ${counts.base.toLocaleString("id-ID")} (angka ini) + ${counts.auto.toLocaleString("id-ID")} pembeli. Bertambah otomatis setiap ada pembeli baru.`}>
          <input className="input" name="studentBase" inputMode="numeric" defaultValue={category.studentBase} />
        </Field>
        <Field label="Lama belajar" hint="Mis. 6 jam video · 4 minggu">
          <input className="input" name="durationText" defaultValue={category.durationText ?? ""} />
        </Field>
        <Field label="Pengajar">
          <input className="input" name="instructor" defaultValue={category.instructor ?? ""} />
        </Field>
        <Field label="Poster kelas (gambar, rasio 16:9)">
          <input className="input" type="file" name="poster" accept="image/*" />
        </Field>
        {category.posterFileId && (
          <div className="flex items-center gap-3 sm:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/api/berkas/${category.posterFileId}`} alt="Poster kelas" className="h-20 rounded-lg border border-slate-200 object-cover" />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="removePoster" /> Hapus poster
            </label>
          </div>
        )}
        <div className="sm:col-span-2">
          <Field label="Yang akan dipelajari" hint="Satu baris satu poin">
            <textarea className="input" name="outcomes" rows={4} defaultValue={category.outcomes ?? ""} />
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
