import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { addPathStepAction, deletePathAction, deletePathStepAction, savePathAction, savePathStepAction } from "@/app/actions/paths";
import { ConfirmButton } from "@/components/confirm-button";
import { Empty, Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export default async function AdminPath({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  await requirePermission("admin.content");
  const { id } = await params;
  const { pesan, tipe } = await readFlash(searchParams);
  const [path, categories] = await Promise.all([
    db.learningPath.findUnique({
      where: { id },
      include: { steps: { orderBy: { order: "asc" }, include: { category: { include: { track: { select: { title: true } } } } } } },
    }),
    db.category.findMany({ orderBy: [{ track: { order: "asc" } }, { order: "asc" }], include: { track: { select: { title: true } } } }),
  ]);
  if (!path) notFound();
  const used = new Set(path.steps.map((s) => s.categoryId));
  const available = categories.filter((c) => !used.has(c.id));

  return (
    <>
      <PageHeader
        title={path.title}
        subtitle={path.published ? "Ditampilkan di website" : "Belum ditampilkan di website"}
        back={{ href: "/admin/jalur", label: "Jalur belajar" }}
        actions={
          path.published ? (
            <Link href={`/jalur/${path.slug}`} className="btn-secondary btn-sm">
              Lihat halaman
            </Link>
          ) : undefined
        }
      />
      <Flash pesan={pesan} tipe={tipe} />

      <section className="card mb-6">
        <h2 className="h2 mb-3">Kelas dalam jalur (berurutan)</h2>
        {path.steps.length === 0 ? (
          <Empty>Belum ada kelas. Tambahkan dari daftar di bawah.</Empty>
        ) : (
          <ul className="divide-y divide-slate-100">
            {path.steps.map((s) => (
              <li key={s.id} className="py-3">
                <p className="text-sm font-medium text-slate-900">
                  {s.category.title} <span className="text-xs font-normal text-slate-500">· {s.category.track.title}</span>
                  {!s.category.published && <span className="badge ml-2">Kelas disembunyikan</span>}
                </p>
                <div className="mt-2 flex flex-wrap items-end gap-2">
                  <form action={savePathStepAction} className="flex min-w-0 flex-1 flex-wrap items-end gap-2">
                    <input type="hidden" name="id" value={s.id} />
                    <label className="text-xs text-slate-500">
                      Urutan
                      <input className="input mt-1 w-20" name="order" inputMode="numeric" defaultValue={s.order} />
                    </label>
                    <label className="min-w-0 flex-1 text-xs text-slate-500">
                      Catatan (opsional)
                      <input className="input mt-1 w-full" name="note" defaultValue={s.note ?? ""} placeholder="Mis. Dasar yang wajib sebelum kelas berikutnya" />
                    </label>
                    <button className="btn-secondary btn-sm" type="submit">
                      Simpan
                    </button>
                  </form>
                  <form action={deletePathStepAction}>
                    <input type="hidden" name="id" value={s.id} />
                    <button className="btn-secondary btn-sm text-red-700" type="submit">
                      Keluarkan
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
        <form action={addPathStepAction} className="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <input type="hidden" name="pathId" value={path.id} />
          <Field label="Tambah kelas">
            <select className="input" name="categoryId" required defaultValue="">
              <option value="" disabled>
                Pilih kelas…
              </option>
              {available.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.track.title}: {c.title}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Catatan (opsional)">
            <input className="input" name="note" />
          </Field>
          <button className="btn" type="submit">
            Tambah
          </button>
        </form>
      </section>

      <form action={savePathAction} className="card grid gap-3 sm:grid-cols-2">
        <input type="hidden" name="id" value={path.id} />
        <h2 className="h2 sm:col-span-2">Pengaturan jalur</h2>
        <Field label="Judul">
          <input className="input" name="title" defaultValue={path.title} required />
        </Field>
        <Field label="Slug (alamat URL)">
          <input className="input" name="slug" defaultValue={path.slug} />
        </Field>
        <Field label="Urutan tampil">
          <input className="input" name="order" inputMode="numeric" defaultValue={path.order} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Ringkasan singkat">
            <input className="input" name="summary" defaultValue={path.summary ?? ""} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Deskripsi">
            <textarea className="input" name="description" rows={4} defaultValue={path.description ?? ""} />
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" name="published" defaultChecked={path.published} /> Tampilkan di website
        </label>
        <div>
          <button className="btn" type="submit">
            Simpan jalur
          </button>
        </div>
      </form>

      <form action={deletePathAction} className="mt-6">
        <input type="hidden" name="id" value={path.id} />
        <ConfirmButton message="Hapus jalur belajar ini? Kelas di dalamnya tidak ikut terhapus.">Hapus jalur</ConfirmButton>
      </form>
    </>
  );
}
