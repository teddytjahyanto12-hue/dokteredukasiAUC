import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { FIELD_LABEL, MENTORING_FIELDS } from "@/lib/constants";
import { deletePackageAction, savePackageAction } from "@/app/actions/admin";
import { ConfirmButton } from "@/components/confirm-button";
import { Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export default async function AdminPackageEdit({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  const { id } = await params;
  const { pesan, tipe } = await readFlash(searchParams);
  const isNew = id === "baru";
  const pkg = isNew ? null : await db.package.findUnique({ where: { id }, include: { categories: true } });
  if (!isNew && !pkg) notFound();
  const tracks = await db.track.findMany({ orderBy: { order: "asc" }, include: { categories: { orderBy: { order: "asc" } } } });
  const selected = new Set(pkg?.categories.map((c) => c.categoryId));

  return (
    <>
      <PageHeader title={pkg?.name ?? "Paket baru"} back={{ href: "/admin/paket", label: "Semua paket" }} />
      <Flash pesan={pesan} tipe={tipe} />
      <form action={savePackageAction} className="card grid gap-4 sm:grid-cols-2">
        {pkg && <input type="hidden" name="id" value={pkg.id} />}
        <Field label="Nama paket">
          <input className="input" name="name" defaultValue={pkg?.name} required />
        </Field>
        <Field label="Slug (alamat URL)" hint="Kosongkan untuk dibuat otomatis dari nama.">
          <input className="input" name="slug" defaultValue={pkg?.slug} />
        </Field>
        <Field label="Jalur (pengelompokan katalog)">
          <select className="input" name="trackSlug" defaultValue={pkg?.trackSlug ?? ""}>
            <option value="">Lainnya</option>
            {tracks.map((t) => (
              <option key={t.id} value={t.slug}>
                {t.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Urutan">
          <input className="input" name="order" inputMode="numeric" defaultValue={pkg?.order ?? 0} />
        </Field>
        <Field label="Harga (Rp)" hint="Kosongkan bila belum ditetapkan.">
          <input className="input" name="price" inputMode="numeric" defaultValue={pkg?.price ?? ""} />
        </Field>
        <Field label="Masa akses (hari)" hint="Kosongkan = tanpa batas waktu.">
          <input className="input" name="accessDays" inputMode="numeric" defaultValue={pkg?.accessDays ?? ""} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Ringkasan (tampil di kartu paket)">
            <input className="input" name="summary" defaultValue={pkg?.summary ?? ""} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Deskripsi & keterangan lengkap">
            <textarea className="input" name="description" rows={5} defaultValue={pkg?.description ?? ""} />
          </Field>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="label">Isi materi (kategori yang dibuka paket ini)</legend>
          <div className="grid gap-4 md:grid-cols-3">
            {tracks.map((t) => (
              <div key={t.id} className="rounded-lg border border-slate-200 p-3">
                <p className="mb-2 text-sm font-semibold">{t.title}</p>
                {t.categories.map((c) => (
                  <label key={c.id} className="flex items-center gap-2 py-0.5 text-sm">
                    <input type="checkbox" name="categoryIds" value={c.id} defaultChecked={selected.has(c.id)} /> {c.title}
                  </label>
                ))}
              </div>
            ))}
          </div>
        </fieldset>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="includesMentoring" defaultChecked={pkg?.includesMentoring ?? false} /> Termasuk bimbingan tutor
        </label>
        <Field label="Bidang bimbingan">
          <select className="input" name="mentoringField" defaultValue={pkg?.mentoringField ?? ""}>
            <option value="">—</option>
            {MENTORING_FIELDS.map((f) => (
              <option key={f} value={f}>
                {FIELD_LABEL[f]}
              </option>
            ))}
          </select>
        </Field>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="active" defaultChecked={pkg?.active ?? true} /> Aktif (tampil & bisa dipesan)
        </label>
        <div className="sm:col-span-2">
          <button className="btn" type="submit">
            Simpan paket
          </button>
        </div>
      </form>
      {pkg && (
        <form action={deletePackageAction} className="mt-6">
          <input type="hidden" name="id" value={pkg.id} />
          <ConfirmButton message="Hapus paket ini? Paket yang sudah punya order hanya akan dinonaktifkan.">Hapus paket</ConfirmButton>
        </form>
      )}
    </>
  );
}
