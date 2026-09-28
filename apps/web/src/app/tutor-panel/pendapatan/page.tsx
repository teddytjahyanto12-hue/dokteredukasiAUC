import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { rupiah, tanggal } from "@/lib/format";
import { PAYROLL_STATUS_LABEL } from "@/lib/constants";
import { Empty, PageHeader, Stat } from "@/components/ui";

export const metadata = { title: "Pendapatan Tutor" };

export default async function TutorIncome() {
  const user = await requireUser(["TUTOR"]);
  const [profile, sessions, payrolls] = await Promise.all([
    db.tutorProfile.findUnique({ where: { userId: user.id } }),
    db.mentoringSession.findMany({
      where: { mentoring: { tutorId: user.id }, status: "DONE" },
      orderBy: { scheduledAt: "desc" },
      include: { mentoring: { select: { id: true, student: { select: { name: true } } } } },
    }),
    db.payroll.findMany({ where: { tutorId: user.id }, orderBy: { createdAt: "desc" }, include: { proofFile: { select: { id: true } } } }),
  ]);
  const unpaid = sessions.filter((s) => s.verifiedAt && !s.payrollId).reduce((sum, s) => sum + (s.fee ?? 0), 0);
  const waiting = sessions.filter((s) => !s.verifiedAt).length;
  const paid = payrolls.filter((p) => p.status === "PAID").reduce((sum, p) => sum + p.amount, 0);

  return (
    <>
      <PageHeader title="Pendapatan & payroll" subtitle={`Rate: ${profile?.rate ? `${rupiah(profile.rate)} per sesi` : profile?.rateNote ?? "belum ditetapkan admin"}`} />
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Terverifikasi, belum masuk payroll" value={rupiah(unpaid)} />
        <Stat label="Sesi selesai menunggu verifikasi admin" value={waiting} />
        <Stat label="Total sudah dibayar" value={rupiah(paid)} />
      </div>

      <section className="mt-8">
        <h2 className="h2 mb-3">Payroll</h2>
        {payrolls.length === 0 ? (
          <Empty>Belum ada payroll.</Empty>
        ) : (
          <div className="card overflow-x-auto p-0">
            <table className="table">
              <thead>
                <tr>
                  <th>Periode</th>
                  <th>Jumlah</th>
                  <th>Status</th>
                  <th>Bukti transfer</th>
                </tr>
              </thead>
              <tbody>
                {payrolls.map((p) => (
                  <tr key={p.id}>
                    <td>{p.periodLabel}</td>
                    <td>{rupiah(p.amount)}</td>
                    <td>
                      <span className={p.status === "PAID" ? "badge-brand" : "badge-warn"}>{PAYROLL_STATUS_LABEL[p.status]}</span>
                      {p.paidAt && <p className="text-xs text-slate-500">{tanggal(p.paidAt)}</p>}
                    </td>
                    <td>
                      {p.proofFile ? (
                        <a href={`/api/berkas/${p.proofFile.id}`} target="_blank" rel="noopener noreferrer" className="link">
                          Lihat bukti
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="h2 mb-3">Laporan sesi selesai</h2>
        {sessions.length === 0 ? (
          <Empty>Belum ada sesi selesai.</Empty>
        ) : (
          <div className="card overflow-x-auto p-0">
            <table className="table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Klien</th>
                  <th>Verifikasi</th>
                  <th>Fee</th>
                  <th>Payroll</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s) => (
                  <tr key={s.id}>
                    <td>{tanggal(s.scheduledAt, true)}</td>
                    <td>
                      <Link href={`/bimbingan/${s.mentoring.id}`} className="link">
                        {s.mentoring.student.name}
                      </Link>
                    </td>
                    <td>{s.verifiedAt ? <span className="badge-brand">Terverifikasi</span> : <span className="badge-warn">Menunggu</span>}</td>
                    <td>{s.fee !== null ? rupiah(s.fee) : "—"}</td>
                    <td>{s.payrollId ? "Sudah" : "Belum"}</td>
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
