import { requirePermission } from "@/lib/auth";
import Link from "next/link";
import { db } from "@/lib/db";
import { rupiah, tanggal } from "@/lib/format";
import { PAYROLL_STATUS_LABEL } from "@/lib/constants";
import { createPayrollAction, markPayrollPaidAction, voidPayrollAction } from "@/app/actions/admin";
import { ConfirmButton } from "@/components/confirm-button";
import { Empty, Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Payroll" };

export default async function AdminPayroll({ searchParams }: { searchParams: SearchParams }) {
  await requirePermission("admin.payroll");
  const { pesan, tipe } = await readFlash(searchParams);
  const [tutors, payrolls] = await Promise.all([
    db.user.findMany({
      where: { role: "TUTOR" },
      orderBy: { name: "asc" },
      include: {
        tutorProfile: true,
        mentoringsAsTutor: {
          select: {
            sessions: { where: { verifiedAt: { not: null }, payrollId: null }, select: { fee: true } },
            tasks: { where: { validatedAt: { not: null }, fee: { gt: 0 }, payrollId: null }, select: { fee: true } },
          },
        },
      },
    }),
    db.payroll.findMany({
      orderBy: { createdAt: "desc" },
      include: { tutor: { include: { tutorProfile: true } }, proofFile: { select: { id: true } }, _count: { select: { sessions: true, tasks: true } } },
    }),
  ]);
  const defaultPeriod = new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric", timeZone: "Asia/Jakarta" }).format(new Date());

  return (
    <>
      <PageHeader title="Payroll tutor" subtitle="Sesi Zoom dan pencapaian yang sudah diverifikasi admin dikumpulkan menjadi payroll, lalu unggah bukti transfer ke rekening tutor." />
      <Flash pesan={pesan} tipe={tipe} />

      <section className="card mb-6">
        <h2 className="h2 mb-3">Siap dibuatkan payroll</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Tutor</th>
                <th>Rekening</th>
                <th>Sesi & pencapaian terverifikasi</th>
                <th>Total</th>
                <th>Buat payroll</th>
              </tr>
            </thead>
            <tbody>
              {tutors.map((t) => {
                const sessions = t.mentoringsAsTutor.flatMap((m) => m.sessions);
                const tasks = t.mentoringsAsTutor.flatMap((m) => m.tasks);
                const total = [...sessions, ...tasks].reduce((s, x) => s + (x.fee ?? 0), 0);
                return (
                  <tr key={t.id}>
                    <td>
                      <Link href={`/admin/pengguna/${t.id}`} className="link">
                        {t.name}
                      </Link>
                    </td>
                    <td className="text-xs">
                      {t.tutorProfile?.bankName ? `${t.tutorProfile.bankName} ${t.tutorProfile.bankAccount ?? ""} a.n. ${t.tutorProfile.bankHolder ?? "-"}` : "Belum diisi"}
                    </td>
                    <td>
                      {sessions.length} sesi
                      {tasks.length > 0 && ` · ${tasks.length} pencapaian`}
                    </td>
                    <td>{rupiah(total)}</td>
                    <td>
                      {sessions.length + tasks.length > 0 ? (
                        <form action={createPayrollAction} className="flex gap-2">
                          <input type="hidden" name="tutorId" value={t.id} />
                          <input className="input w-40" name="periodLabel" defaultValue={defaultPeriod} required />
                          <button className="btn btn-sm" type="submit">
                            Buat
                          </button>
                        </form>
                      ) : (
                        <span className="text-xs text-slate-500">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {tutors.length === 0 && <Empty>Belum ada tutor.</Empty>}
        </div>
      </section>

      <section>
        <h2 className="h2 mb-3">Riwayat payroll</h2>
        {payrolls.length === 0 ? (
          <Empty>Belum ada payroll.</Empty>
        ) : (
          <div className="space-y-3">
            {payrolls.map((p) => (
              <div key={p.id} className="card">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold">
                      {p.tutor.name} · {p.periodLabel}
                    </p>
                    <p className="text-sm text-slate-600">
                      {rupiah(p.amount)} · {p._count.sessions} sesi{p._count.tasks ? ` · ${p._count.tasks} pencapaian` : ""} · dibuat {tanggal(p.createdAt)}
                      {p.paidAt && ` · dibayar ${tanggal(p.paidAt)}`}
                    </p>
                  </div>
                  <span className={p.status === "PAID" ? "badge-brand" : p.status === "VOID" ? "badge" : "badge-warn"}>{PAYROLL_STATUS_LABEL[p.status]}</span>
                </div>
                {p.paymentRef && <p className="mt-1 text-xs text-slate-500">Ref. transfer: {p.paymentRef}</p>}
                {p.status === "VOID" ? (
                  <p className="mt-2 text-sm text-slate-500">Alasan pembatalan: {p.voidReason}</p>
                ) : (
                  <form action={markPayrollPaidAction} className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr_160px_auto] sm:items-end">
                    <input type="hidden" name="payrollId" value={p.id} />
                    <Field label={p.proofFile ? "Ganti bukti transfer" : "Unggah bukti transfer"}>
                      <input className="input" type="file" name="proofFile" accept="image/*,application/pdf" />
                    </Field>
                    <Field label="Referensi transfer" hint="Wajib saat ditandai dibayar">
                      <input className="input" name="paymentRef" defaultValue={p.paymentRef ?? ""} placeholder="No. referensi / tanggal & bank" />
                    </Field>
                    <Field label="Status">
                      <select className="input" name="status" defaultValue={p.status}>
                        <option value="UNPAID">Belum dibayar</option>
                        <option value="PAID">Sudah dibayar</option>
                      </select>
                    </Field>
                    <button className="btn" type="submit">
                      Simpan
                    </button>
                  </form>
                )}
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                  {p.proofFile && (
                    <a href={`/api/berkas/${p.proofFile.id}`} target="_blank" rel="noopener noreferrer" className="link">
                      Lihat bukti transfer
                    </a>
                  )}
                  {p.status === "UNPAID" && (
                    <form action={voidPayrollAction} className="flex flex-wrap items-center gap-2">
                      <input type="hidden" name="payrollId" value={p.id} />
                      <input className="input w-56" name="reason" placeholder="Alasan pembatalan" required />
                      <ConfirmButton message="Batalkan (void) payroll ini? Sesi kembali ke daftar payable." className="btn-danger btn-sm">
                        Batalkan payroll
                      </ConfirmButton>
                    </form>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
