import Link from "next/link";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { deleteFaqAction, deleteTestimonialAction, saveFaqAction, saveTestimonialAction } from "@/app/actions/paths";
import { Empty, Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Halaman penawaran" };

export default async function AdminOffer({ searchParams }: { searchParams: SearchParams }) {
  await requirePermission("admin.content");
  const { pesan, tipe } = await readFlash(searchParams);
  const [testimonials, faqs] = await Promise.all([db.testimonial.findMany({ orderBy: { order: "asc" } }), db.faq.findMany({ orderBy: { order: "asc" } })]);

  return (
    <>
      <PageHeader
        title="Halaman penawaran"
        subtitle="Testimoni dan pertanyaan umum yang tampil di /penawaran. Judul, subjudul, dan daftar keunggulan diubah di Pengaturan situs."
        actions={
          <>
            <Link href="/penawaran" className="btn-secondary btn-sm">
              Lihat halaman
            </Link>
            <Link href="/admin/pengaturan" className="btn-secondary btn-sm">
              Pengaturan situs
            </Link>
          </>
        }
      />
      <Flash pesan={pesan} tipe={tipe} />

      <section className="card mb-6">
        <h2 className="h2 mb-1">Testimoni</h2>
        <p className="mb-3 text-xs text-slate-500">Isi hanya dengan testimoni asli dari pelanggan yang sudah memberi izin.</p>
        {testimonials.length === 0 && <Empty>Belum ada testimoni. Bagian testimoni tidak ditampilkan di halaman sampai ada isinya.</Empty>}
        <ul className="space-y-4">
          {testimonials.map((t) => (
            <li key={t.id} className="rounded-lg border border-slate-200 p-3">
              <form action={saveTestimonialAction} className="grid gap-2 sm:grid-cols-[1fr_1fr_90px]">
                <input type="hidden" name="id" value={t.id} />
                <Field label="Nama">
                  <input className="input" name="name" defaultValue={t.name} required />
                </Field>
                <Field label="Keterangan (mis. Koas, FK …)">
                  <input className="input" name="role" defaultValue={t.role ?? ""} />
                </Field>
                <Field label="Urutan">
                  <input className="input" name="order" inputMode="numeric" defaultValue={t.order} />
                </Field>
                <div className="sm:col-span-3">
                  <Field label="Testimoni">
                    <textarea className="input" name="quote" rows={2} defaultValue={t.quote} required />
                  </Field>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:col-span-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="published" defaultChecked={t.published} /> Tampilkan
                  </label>
                  <button className="btn-secondary btn-sm" type="submit">
                    Simpan
                  </button>
                  <button className="btn-secondary btn-sm text-red-700" formAction={deleteTestimonialAction}>
                    Hapus
                  </button>
                </div>
              </form>
            </li>
          ))}
        </ul>
        <form action={saveTestimonialAction} className="mt-4 grid gap-2 border-t border-slate-100 pt-4 sm:grid-cols-2">
          <Field label="Nama">
            <input className="input" name="name" required />
          </Field>
          <Field label="Keterangan (opsional)">
            <input className="input" name="role" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Testimoni baru">
              <textarea className="input" name="quote" rows={2} required />
            </Field>
          </div>
          <div>
            <button className="btn" type="submit">
              Tambah testimoni
            </button>
          </div>
        </form>
      </section>

      <section className="card">
        <h2 className="h2 mb-3">Pertanyaan umum (FAQ)</h2>
        {faqs.length === 0 && <Empty>Belum ada pertanyaan. Bagian FAQ tidak ditampilkan di halaman sampai ada isinya.</Empty>}
        <ul className="space-y-4">
          {faqs.map((f) => (
            <li key={f.id} className="rounded-lg border border-slate-200 p-3">
              <form action={saveFaqAction} className="grid gap-2 sm:grid-cols-[1fr_90px]">
                <input type="hidden" name="id" value={f.id} />
                <Field label="Pertanyaan">
                  <input className="input" name="question" defaultValue={f.question} required />
                </Field>
                <Field label="Urutan">
                  <input className="input" name="order" inputMode="numeric" defaultValue={f.order} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Jawaban">
                    <textarea className="input" name="answer" rows={2} defaultValue={f.answer} required />
                  </Field>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="published" defaultChecked={f.published} /> Tampilkan
                  </label>
                  <button className="btn-secondary btn-sm" type="submit">
                    Simpan
                  </button>
                  <button className="btn-secondary btn-sm text-red-700" formAction={deleteFaqAction}>
                    Hapus
                  </button>
                </div>
              </form>
            </li>
          ))}
        </ul>
        <form action={saveFaqAction} className="mt-4 grid gap-2 border-t border-slate-100 pt-4">
          <Field label="Pertanyaan baru">
            <input className="input" name="question" required />
          </Field>
          <Field label="Jawaban">
            <textarea className="input" name="answer" rows={2} required />
          </Field>
          <div>
            <button className="btn" type="submit">
              Tambah pertanyaan
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
