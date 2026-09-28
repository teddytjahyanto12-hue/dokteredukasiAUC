import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { rupiah, tanggal } from "@/lib/format";
import { ORDER_STATUS_LABEL } from "@/lib/constants";
import { Empty, PageHeader } from "@/components/ui";

export const metadata = { title: "Riwayat Pembelian" };

export default async function PurchasesPage() {
  const user = await requireUser();
  const orders = await db.order.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, include: { package: true } });
  return (
    <div className="container-page py-10">
      <PageHeader title="Riwayat pembelian" back={{ href: "/belajar", label: "Dashboard" }} />
      {orders.length === 0 ? (
        <Empty>
          Belum ada pembelian. <Link href="/paket" className="link">Lihat paket</Link>
        </Empty>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="table">
            <thead>
              <tr>
                <th>Kode</th>
                <th>Paket</th>
                <th>Tanggal</th>
                <th>Jumlah</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>
                    <Link href={`/pembelian/${o.id}`} className="link">
                      {o.code}
                    </Link>
                  </td>
                  <td>{o.package.name}</td>
                  <td>{tanggal(o.createdAt, true)}</td>
                  <td>{rupiah(o.amount)}</td>
                  <td>
                    <span className={o.status === "PAID" ? "badge-brand" : o.status === "PENDING" ? "badge-warn" : "badge"}>{ORDER_STATUS_LABEL[o.status]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
