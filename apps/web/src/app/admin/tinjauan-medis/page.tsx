import Link from "next/link";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { tanggal } from "@/lib/format";
import { Empty, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Tinjauan Medis" };

export default async function AdminMedicalReviews({ searchParams }: { searchParams: SearchParams }) {
  await requirePermission("admin.content");
  const { pesan, tipe } = await readFlash(searchParams);
  const rows = await db.medicalReview.findMany({ orderBy: [{ updatedAt: "desc" }], select: { id: true, slug: true, title: true, category: true, author: true, published: true, publishedAt: true, updatedAt: true } });
  return (
    <>
      <PageHeader
        title="Tinjauan Medis"
        subtitle="Artikel gaya jurnal: rubrik, judul, penulis, abstrak, batang tubuh, dan daftar pustaka. Hanya artikel berstatus Terbit yang tampil di menu Tinjauan Medis."
        actions={
          <Link href="/admin/tinjauan-medis/baru" className="btn btn-sm">
            + Artikel baru
          </Link>
        }
      />
      <Flash pesan={pesan} tipe={tipe} />
      <section className="card">
        {rows.length === 0 ? (
          <Empty>Belum ada artikel.</Empty>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Rubrik</th>
                  <th>Penulis</th>
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
                    <td>{r.category ?? "-"}</td>
                    <td>{r.author ?? "-"}</td>
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
