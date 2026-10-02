import { requirePermission } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import Link from "next/link";
import { db } from "@/lib/db";
import { rupiah, tanggal } from "@/lib/format";
import { ORDER_STATUS_LABEL } from "@/lib/constants";
import { Empty, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Order" };

export default async function AdminOrders({ searchParams }: { searchParams: SearchParams }) {
  const me = await requirePermission("admin.orders");
  const finance = hasPermission(me, "admin.finance");
  const { pesan, tipe, pick } = await readFlash(searchParams);
  const status = pick("status");
  const q = pick("q")?.trim();
  const orders = await db.order.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(q ? { OR: [{ code: { contains: q } }, { user: { name: { contains: q } } }, { user: { email: { contains: q } } }] } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { user: true, package: true },
  });

  return (
    <>
      <PageHeader
        title="Order"
        subtitle="Konfirmasi pembayaran untuk mengaktifkan akses pelanggan."
        actions={
          <Link href="/admin/order/baru" className="btn btn-sm">
            + Input penjualan
          </Link>
        }
      />
      <Flash pesan={pesan} tipe={tipe} />
      <form className="mb-4 flex flex-wrap gap-2">
        <input className="input max-w-xs" name="q" defaultValue={q} placeholder="Cari kode, nama, email" />
        <select className="input max-w-[200px]" name="status" defaultValue={status ?? ""}>
          <option value="">Semua status</option>
          {Object.entries(ORDER_STATUS_LABEL).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
        <button className="btn-secondary" type="submit">
          Filter
        </button>
      </form>
      {orders.length === 0 ? (
        <Empty>Tidak ada order.</Empty>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="table">
            <thead>
              <tr>
                <th>Kode</th>
                <th>Murid</th>
                <th>Paket</th>
                {finance && <th>Jumlah</th>}
                <th>Tanggal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>
                    <Link href={`/admin/order/${o.id}`} className="link">
                      {o.code}
                    </Link>
                  </td>
                  <td>
                    {o.user.name}
                    <p className="text-xs text-slate-500">{o.user.phone}</p>
                  </td>
                  <td>{o.package.name}</td>
                  {finance && <td>{rupiah(o.amount)}</td>}
                  <td>{tanggal(o.createdAt, true)}</td>
                  <td>
                    <span className={o.status === "PAID" ? "badge-brand" : o.status === "PENDING" || o.status === "PARTIAL" ? "badge-warn" : "badge"}>
                      {ORDER_STATUS_LABEL[o.status]}
                    </span>
                    {o.paymentPlan === "INSTALLMENT" && <p className="text-xs text-slate-500">Cicilan</p>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
