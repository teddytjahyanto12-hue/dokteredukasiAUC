import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { rupiah, tanggal } from "@/lib/format";
import { PAYROLL_STATUS_LABEL } from "@/lib/constants";
import { Empty, PageHeader, Stat } from "@/components/ui";

export const metadata = { title: "Payroll" };

export default async function TutorPayroll() {
  const user = await requirePermission("tutor.payroll");
  const payrolls = await db.payroll.findMany({
    where: { tutorId: user.id },
    orderBy: { createdAt: "desc" },
    include: { proofFile: { select: { id: true } }, _count: { select: { sessions: true, tasks: true } } },
  });
  const paid = payrolls.filter((p) => p.status === "PAID").reduce((sum, p) => sum + p.amount, 0);
  const unpaid = payrolls.filter((p) => p.status === "UNPAID").reduce((sum, p) => sum + p.amount, 0);

  return (
    <>
      <PageHeader title="Payroll" subtitle="Rekap pembayaran fee dari owner/admin." />
      <div className="grid gap-4 sm:grid-cols-2">
        <Stat label="Payroll menunggu transfer" value={rupiah(unpaid)} />
        <Stat label="Total sudah dibayar" value={rupiah(paid)} />
      </div>
      <section className="mt-8">
        {payrolls.length === 0 ? (
          <Empty>Belum ada payroll.</Empty>
        ) : (
          <div className="card overflow-x-auto p-0">
            <table className="table">
              <thead>
                <tr>
                  <th>Periode</th>
                  <th>Sesi</th>
                  <th>Jumlah</th>
                  <th>Status</th>
                  <th>Bukti transfer</th>
                </tr>
              </thead>
              <tbody>
                {payrolls.map((p) => (
                  <tr key={p.id}>
                    <td>{p.periodLabel}</td>
                    <td>{p._count.sessions}{p._count.tasks ? ` + ${p._count.tasks} pencapaian` : ""}</td>
                    <td>{rupiah(p.amount)}</td>
                    <td>
                      <span className={p.status === "PAID" ? "badge-brand" : p.status === "VOID" ? "badge" : "badge-warn"}>{PAYROLL_STATUS_LABEL[p.status]}</span>
                      {p.paidAt && <p className="text-xs text-slate-500">{tanggal(p.paidAt)}</p>}
                      {p.paymentRef && <p className="text-xs text-slate-500">Ref: {p.paymentRef}</p>}
                    </td>
                    <td>
                      {p.proofFile ? (
                        <a href={`/api/berkas/${p.proofFile.id}`} target="_blank" rel="noopener noreferrer" className="link">
                          Lihat bukti
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
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
