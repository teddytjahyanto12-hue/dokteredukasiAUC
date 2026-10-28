import Link from "next/link";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { tanggal } from "@/lib/format";
import { deleteMedicalReviewCategoryAction, saveMedicalReviewCategoryAction } from "@/app/actions/site-content";
import { ConfirmButton } from "@/components/confirm-button";
import { Empty, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Tinjauan Medis" };

export default async function AdminMedicalReviews({ searchParams }: { searchParams: SearchParams }) {
  await requirePermission("admin.content");
  const { pesan, tipe } = await readFlash(searchParams);
  const [rows, categories] = await Promise.all([
    db.medicalReview.findMany({
      orderBy: [{ updatedAt: "desc" }],
      select: { id: true, slug: true, title: true, author: true, coverFileId: true, published: true, publishedAt: true, updatedAt: true, category: { select: { name: true } } },
    }),
    db.medicalReviewCategory.findMany({ orderBy: [{ order: "asc" }, { name: "asc" }], include: { _count: { select: { reviews: true } } } }),
  ]);
  return (
    <>
      <PageHeader
        title="Tinjauan Medis"
        subtitle="Artikel tampil sebagai kartu bergambar, dikelompokkan per kategori. Hanya artikel berstatus Terbit yang tampil di menu Tinjauan Medis."
        actions={
          <Link href="/admin/tinjauan-medis/baru" className="btn btn-sm">
            + Artikel baru
          </Link>
        }
      />
      <Flash pesan={pesan} tipe={tipe} />

      <section className="card mb-6">
        <h2 className="h2 mb-1">Kategori</h2>
        <p className="mb-4 text-xs text-slate-500">Tampil sebagai pilihan di bagian atas halaman Tinjauan Medis. Urutan kecil tampil lebih dulu. Menghapus kategori tidak menghapus artikelnya.</p>
        {categories.length === 0 && <Empty>Belum ada kategori.</Empty>}
        <ul className="space-y-2">
          {categories.map((c) => (
            <li key={c.id} className="flex flex-wrap items-center gap-2">
              <form action={saveMedicalReviewCategoryAction} className="flex flex-1 flex-wrap items-center gap-2">
                <input type="hidden" name="id" value={c.id} />
                <input className="input min-w-[180px] flex-1" name="name" defaultValue={c.name} required minLength={2} aria-label="Nama kategori" />
                <input className="input w-20" type="number" name="order" defaultValue={c.order} aria-label="Urutan" title="Urutan" />
                <span className="text-xs text-slate-500">{c._count.reviews} artikel</span>
                <button className="btn-secondary btn-sm" type="submit">Simpan</button>
              </form>
              <form action={deleteMedicalReviewCategoryAction}>
                <input type="hidden" name="id" value={c.id} />
                <ConfirmButton message={`Hapus kategori "${c.name}"? ${c._count.reviews} artikel akan menjadi tanpa kategori.`} className="btn-danger btn-sm">
                  Hapus
                </ConfirmButton>
              </form>
            </li>
          ))}
        </ul>
        <form action={saveMedicalReviewCategoryAction} className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
          <input className="input min-w-[180px] flex-1" name="name" placeholder="Kategori baru, mis. Kardiologi" required minLength={2} />
          <input className="input w-20" type="number" name="order" placeholder="Urutan" aria-label="Urutan" />
          <button className="btn btn-sm" type="submit">+ Tambah kategori</button>
        </form>
      </section>

      <section className="card">
        <h2 className="h2 mb-3">Artikel</h2>
        {rows.length === 0 ? (
          <Empty>Belum ada artikel.</Empty>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Kategori</th>
                  <th>Penulis</th>
                  <th>Gambar</th>
                  <th>Status</th>
                  <th>Diubah</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <Link href={`/admin/tinjauan-medis/${r.id}`} className="link">
                        {r.title}
                      </Link>
                    </td>
                    <td>{r.category?.name ?? "-"}</td>
                    <td>{r.author ?? "-"}</td>
                    <td>{r.coverFileId ? "Ada" : <span className="text-slate-400">Belum</span>}</td>
                    <td>
                      {r.published ? (
                        <Link href={`/tinjauan-medis/${r.slug}`} className="font-semibold text-success">
                          Terbit {tanggal(r.publishedAt)}
                        </Link>
                      ) : (
                        <span className="text-slate-500">Draf</span>
                      )}
                    </td>
                    <td>{tanggal(r.updatedAt, true)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
