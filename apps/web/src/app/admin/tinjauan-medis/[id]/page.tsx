import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { toWibInput } from "@/lib/format";
import { DEFAULT_SECTION_TITLES, parseSections } from "@/lib/medical-review";
import { deleteMedicalReviewAction, saveMedicalReviewAction } from "@/app/actions/site-content";
import { ConfirmButton } from "@/components/confirm-button";
import { SectionEditor } from "@/components/section-editor";
import { Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Edit Tinjauan Medis" };

export default async function AdminMedicalReviewEdit({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  await requirePermission("admin.content");
  const { id } = await params;
  const { pesan, tipe } = await readFlash(searchParams);
  const [r, categories] = await Promise.all([
    id === "baru" ? null : db.medicalReview.findUnique({ where: { id } }),
    db.medicalReviewCategory.findMany({ orderBy: [{ order: "asc" }, { name: "asc" }] }),
  ]);
  if (id !== "baru" && !r) notFound();
  const sections = r ? parseSections(r.sections) : DEFAULT_SECTION_TITLES.map((title) => ({ title, body: "" }));

  return (
    <>
      <PageHeader
        title={r ? r.title : "Artikel Tinjauan Medis baru"}
        subtitle="Di kolom isi: baris kosong = paragraf baru, “- ” = butir, “1. ” = daftar bernomor, “### ” = subjudul kecil."
        back={{ href: "/admin/tinjauan-medis", label: "Semua artikel" }}
        actions={
          r?.published ? (
            <Link href={`/tinjauan-medis/${r.slug}`} className="btn-secondary btn-sm" target="_blank">
              Lihat artikel
            </Link>
          ) : undefined
        }
      />
      <Flash pesan={pesan} tipe={tipe} />
      <form action={saveMedicalReviewAction} className="card space-y-5">
        {r && <input type="hidden" name="id" value={r.id} />}
        <h2 className="h2">1. Header & kartu artikel</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Kategori" hint="Kategori dikelola di halaman Semua artikel.">
            <select className="input" name="categoryId" defaultValue={r?.categoryId ?? ""}>
              <option value="">Tanpa kategori</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Penulis" hint="Mis. dr. Nama Penulis">
            <input className="input" name="author" defaultValue={r?.author ?? ""} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Judul utama">
              <input className="input text-base font-semibold" name="title" defaultValue={r?.title ?? ""} required minLength={5} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Gambar ilustrasi (kartu & header artikel)" hint="PNG, JPG, atau WEBP. Disarankan mendatar (mis. 1200×675). Kosongkan bila tidak ingin mengganti.">
              <div className="flex flex-wrap items-center gap-4">
                {r?.coverFileId && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/api/berkas/${r.coverFileId}`} alt="Gambar ilustrasi saat ini" className="h-24 w-40 rounded-lg border border-slate-200 object-cover" />
                )}
                <input className="input max-w-sm" type="file" name="cover" accept="image/png,image/jpeg,image/webp" />
                {r?.coverFileId && (
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="removeCover" /> Hapus gambar
                  </label>
                )}
              </div>
            </Field>
          </div>
          <Field label="Slug alamat (opsional)" hint="Kosongkan agar dibuat otomatis dari judul.">
            <input className="input" name="slug" defaultValue={r?.slug ?? ""} />
          </Field>
          <Field label="Tanggal terbit (WIB, opsional)" hint="Kosongkan = waktu saat pertama kali diterbitkan.">
            <input className="input" type="datetime-local" name="publishedAt" defaultValue={r?.publishedAt ? toWibInput(r.publishedAt) : ""} />
          </Field>
        </div>

        <h2 className="h2">2. Abstract</h2>
        <Field label="Abstract / ringkasan poin kunci" hint="Tampil dalam kotak berlatar lembut sebelum teks utama. Boleh berupa paragraf atau butir “- ”.">
          <textarea className="input" name="abstract" rows={5} defaultValue={r?.abstract ?? ""} />
        </Field>

        <h2 className="h2">3. Isi artikel</h2>
        <p className="-mt-3 text-sm text-slate-500">Atur sendiri bagian-bagiannya. Judul bagian tampil besar dan tebal, isinya di bawahnya.</p>
        <SectionEditor initial={sections} />

        <h2 className="h2">4. Daftar pustaka</h2>
        <Field label="Daftar pustaka (References)" hint="Satu baris satu rujukan, gaya Vancouver atau APA. Diawali “1. ” agar bernomor.">
          <textarea className="input font-mono text-xs" name="references" rows={8} defaultValue={r?.references ?? ""} />
        </Field>

        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="published" defaultChecked={r?.published ?? false} /> Terbitkan (tampil untuk pengunjung)
        </label>
        <button className="btn" type="submit">
          Simpan artikel
        </button>
      </form>
      {r && (
        <form action={deleteMedicalReviewAction} className="mt-4">
          <input type="hidden" name="id" value={r.id} />
          <ConfirmButton message={`Hapus artikel "${r.title}" secara permanen?`}>Hapus artikel</ConfirmButton>
        </form>
      )}
    </>
  );
}
