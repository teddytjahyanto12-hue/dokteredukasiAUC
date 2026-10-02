import { requirePermission } from "@/lib/auth";
import Link from "next/link";
import { db } from "@/lib/db";
import { rupiah } from "@/lib/format";
import { Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Paket" };

export default async function AdminPackages({ searchParams }: { searchParams: SearchParams }) {
  await requirePermission("admin.packages");
  const { pesan, tipe } = await readFlash(searchParams);
  const packages = await db.package.findMany({
    orderBy: [{ trackSlug: "asc" }, { order: "asc" }],
    include: { _count: { select: { categories: true, orders: true } } },
  });
  return (
    <>
      <PageHeader
        title="Paket"
        subtitle="Nama, harga, masa akses, isi materi, dan bimbingan. Harga kosong tampil sebagai “Harga segera diumumkan”."
        actions={
          <Link href="/admin/paket/baru" className="btn btn-sm">
            + Paket baru
          </Link>
        }
      />
      <Flash pesan={pesan} tipe={tipe} />
      <div className="card overflow-x-auto p-0">
        <table className="table">
          <thead>
            <tr>
              <th>Paket</th>
              <th>Jalur</th>
              <th>Harga</th>
              <th>Masa akses</th>
              <th>Isi</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((p) => (
              <tr key={p.id}>
                <td>
                  <Link href={`/admin/paket/${p.id}`} className="link">
                    {p.name}
                  </Link>
                  {p.includesMentoring && <span className="badge-warn ml-2">Bimbingan</span>}
                </td>
                <td className="text-xs">{p.trackSlug ?? "-"}</td>
                <td>{p.price === null ? <span className="text-amber-700">Belum diisi</span> : rupiah(p.price)}</td>
                <td>{p.accessDays ? `${p.accessDays} hari` : "Tanpa batas / belum diisi"}</td>
                <td className="text-xs">
                  {p._count.categories} kategori · {p._count.orders} order
                </td>
                <td>{p.active ? <span className="badge-brand">Aktif</span> : <span className="badge">Nonaktif</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
