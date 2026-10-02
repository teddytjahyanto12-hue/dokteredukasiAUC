import Link from "next/link";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { rupiah, tanggal } from "@/lib/format";
import { sessionFeeStatus, FEE_STATUS_TONE, type FeeStatus } from "@/lib/fees";
import { FEE_BASIS_LABEL, FEE_STATUS_LABEL, FIELD_LABEL, SESSION_STATUS_LABEL, type MentoringField } from "@/lib/constants";
import { Empty, PageHeader, Stat } from "@/components/ui";

export const metadata = { title: "Pencapaian" };

export default async function TutorAchievements() {
  const user = await requirePermission("tutor.achievements");
  const [profile, sessions, clients] = await Promise.all([
    db.tutorProfile.findUnique({ where: { userId: user.id } }),
    db.mentoringSession.findMany({
      where: { mentoring: { tutorId: user.id } },
      orderBy: { scheduledAt: "desc" },
      include: { payroll: { select: { status: true } }, mentoring: { select: { id: true, status: true, field: true, student: { select: { name: true } } } } },
    }),
    db.mentoring.groupBy({ by: ["status"], where: { tutorId: user.id }, _count: true }),
  ]);

  const rows = sessions.map((s) => ({ ...s, feeStatus: sessionFeeStatus({ ...s, mentoringStatus: s.mentoring.status }) }));
  const total = (st: FeeStatus) => rows.filter((r) => r.feeStatus === st).reduce((sum, r) => sum + (r.fee ?? 0), 0);
  const count = (st: FeeStatus) => rows.filter((r) => r.feeStatus === st).length;
  const projectedEstimate = profile?.rate ? (count("PROJECTED") + count("PENDING_VALIDATION")) * profile.rate : null;
  const clientCount = (st: string) => clients.find((c) => c.status === st)?._count ?? 0;

  return (
    <>
      <PageHeader title="Pencapaian" subtitle="Jenis fee Anda, sesi yang sudah divalidasi, dan status fee per sesi." />

      <section className="card mb-6">
        <h2 className="h2">Jenis fee Anda</h2>
        <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-slate-500">Bidang</dt>
            <dd className="font-medium">{FIELD_LABEL[profile?.field as MentoringField] ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Dasar fee</dt>
            <dd className="font-medium">{profile?.feeBasis ? FEE_BASIS_LABEL[profile.feeBasis] : "Belum ditetapkan owner"}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Nominal</dt>
            <dd className="font-medium">{profile?.rate ? rupiah(profile.rate) : "Belum ditetapkan owner"}</dd>
          </div>
        </dl>
        {profile?.rateNote && <p className="mt-3 text-sm text-slate-600">{profile.rateNote}</p>}
        <p className="mt-3 text-xs text-slate-500">
          Fee baru terutang (payable) setelah admin memvalidasi sesi yang Anda tandai selesai. Sesi yang dibatalkan atau proyek yang ditutup sebelum validasi
          tidak menghasilkan fee.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label={`Projected (${count("PROJECTED") + count("PENDING_VALIDATION")} sesi)`} value={projectedEstimate !== null ? `± ${rupiah(projectedEstimate)}` : "—"} />
        <Stat label={`Menunggu validasi (${count("PENDING_VALIDATION")} sesi)`} value={count("PENDING_VALIDATION")} />
        <Stat label={`Payable / belum dibayar (${count("PAYABLE")} sesi)`} value={rupiah(total("PAYABLE"))} />
        <Stat label={`Sudah dibayar (${count("PAID")} sesi)`} value={rupiah(total("PAID"))} />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Stat label="Klien aktif" value={clientCount("ACTIVE")} />
        <Stat label="Proyek ditutup" value={clientCount("CLOSED")} />
        <Stat label="Sesi tervalidasi" value={count("PAYABLE") + count("PAID")} />
      </div>

      <section className="mt-8">
        <h2 className="h2 mb-3">Riwayat sesi & status fee</h2>
        {rows.length === 0 ? (
          <Empty>Belum ada sesi.</Empty>
        ) : (
          <div className="card overflow-x-auto p-0">
            <table className="table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Klien</th>
                  <th>Status sesi</th>
                  <th>Status fee</th>
                  <th>Fee</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((s) => (
                  <tr key={s.id}>
                    <td>{tanggal(s.scheduledAt, true)}</td>
                    <td>
                      <Link href={`/bimbingan/${s.mentoring.id}`} className="link">
                        {s.mentoring.student.name}
                      </Link>
                      <p className="text-xs text-slate-500">{FIELD_LABEL[s.mentoring.field as MentoringField] ?? s.mentoring.field}</p>
                    </td>
                    <td>{s.verifiedAt ? "Tervalidasi" : SESSION_STATUS_LABEL[s.status]}</td>
                    <td>
                      <span className={FEE_STATUS_TONE[s.feeStatus]}>{FEE_STATUS_LABEL[s.feeStatus]}</span>
                    </td>
                    <td>{s.fee !== null ? rupiah(s.fee) : "—"}</td>
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
