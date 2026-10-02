import Link from "next/link";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { rupiah, tanggal } from "@/lib/format";
import { FIELD_LABEL, type MentoringField } from "@/lib/constants";
import { validateSessionAction, validateTaskAction } from "@/app/actions/mentoring";
import { Empty, Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Validasi" };

export default async function ValidationQueue({ searchParams }: { searchParams: SearchParams }) {
  const me = await requirePermission("admin.validation");
  const finance = hasPermission(me, "admin.finance");
  const { pesan, tipe } = await readFlash(searchParams);
  const queue = await db.mentoringSession.findMany({
    where: { status: "DONE", verifiedAt: null },
    orderBy: { doneAt: "asc" },
    include: {
      proofFile: { select: { id: true, originalName: true } },
      mentoring: {
        select: {
          id: true,
          field: true,
          title: true,
          student: { select: { name: true } },
          tutor: { select: { name: true, tutorProfile: { select: { rate: true } } } },
        },
      },
    },
  });

  const tasks = await db.projectTask.findMany({
    where: { status: "DONE", validatedAt: null },
    orderBy: { doneAt: "asc" },
    include: { mentoring: { select: { id: true, field: true, student: { select: { name: true } }, tutor: { select: { name: true } } } } },
  });

  return (
    <>
      <PageHeader
        title="Antrean validasi"
        subtitle="Task dan sesi yang ditandai selesai oleh tutor. Fee baru menjadi terutang (payable) setelah divalidasi di sini. Tutor tidak bisa memvalidasi pekerjaannya sendiri."
      />
      <Flash pesan={pesan} tipe={tipe} />
      <h2 className="h2 mb-3">Task checklist ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <Empty>Tidak ada task yang menunggu validasi.</Empty>
      ) : (
        <ul className="mb-8 space-y-3">
          {tasks.map((t) => (
            <li key={t.id} className="card">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">
                    Tahap {t.stageNumber}: {t.title}
                  </p>
                  <p className="text-sm text-slate-600">
                    {t.mentoring.student.name} · tutor {t.mentoring.tutor?.name ?? "-"} · ditandai {tanggal(t.doneAt, true)}
                  </p>
                </div>
                <Link href={`/bimbingan/${t.mentoring.id}`} className="btn-secondary btn-sm">
                  Buka proyek
                </Link>
              </div>
              <p className="mt-2 rounded-lg bg-slate-50 p-3 text-sm">
                {t.note}
                {t.evidenceUrl && (
                  <>
                    {" · "}
                    <a href={t.evidenceUrl} target="_blank" rel="noopener noreferrer" className="link">
                      bukti ↗
                    </a>
                  </>
                )}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <form action={validateTaskAction}>
                  <input type="hidden" name="mentoringId" value={t.mentoring.id} />
                  <input type="hidden" name="taskId" value={t.id} />
                  <input type="hidden" name="decision" value="APPROVE" />
                  <input type="hidden" name="back" value="validasi" />
                  <button className="btn" type="submit">
                    Setujui
                  </button>
                </form>
                <form action={validateTaskAction} className="flex flex-wrap gap-2">
                  <input type="hidden" name="mentoringId" value={t.mentoring.id} />
                  <input type="hidden" name="taskId" value={t.id} />
                  <input type="hidden" name="decision" value="REVISION" />
                  <input type="hidden" name="back" value="validasi" />
                  <input className="input w-56" name="note" placeholder="Alasan revisi" />
                  <button className="btn-secondary" type="submit">
                    Minta revisi
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h2 className="h2 mb-3">Sesi Zoom ({queue.length})</h2>
      {queue.length === 0 ? (
        <Empty>Tidak ada sesi yang menunggu validasi.</Empty>
      ) : (
        <ul className="space-y-4">
          {queue.map((s) => (
            <li key={s.id} className="card">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">
                    {s.mentoring.student.name} · {FIELD_LABEL[s.mentoring.field as MentoringField] ?? s.mentoring.field}
                  </p>
                  <p className="text-sm text-slate-600">
                    Tutor: {s.mentoring.tutor?.name ?? "-"} · Sesi {tanggal(s.scheduledAt, true)} WIB · ditandai selesai {tanggal(s.doneAt, true)}
                  </p>
                </div>
                <Link href={`/bimbingan/${s.mentoring.id}`} className="btn-secondary btn-sm">
                  Buka proyek
                </Link>
              </div>
              <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm">
                <p className="font-medium text-slate-700">Catatan tutor</p>
                <p className="whitespace-pre-line text-slate-700">{s.summary || "—"}</p>
                <div className="mt-2 flex flex-wrap gap-4">
                  {s.recordingUrl && (
                    <a href={s.recordingUrl} target="_blank" rel="noopener noreferrer" className="link">
                      Rekaman ↗
                    </a>
                  )}
                  {s.proofUrl && (
                    <a href={s.proofUrl} target="_blank" rel="noopener noreferrer" className="link">
                      Link bukti ↗
                    </a>
                  )}
                  {s.proofFile && (
                    <a href={`/api/berkas/${s.proofFile.id}`} target="_blank" rel="noopener noreferrer" className="link">
                      {s.proofFile.originalName}
                    </a>
                  )}
                  {!s.recordingUrl && !s.proofUrl && !s.proofFile && <span className="text-amber-700">Tanpa bukti</span>}
                </div>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <form action={validateSessionAction} className="flex flex-wrap items-end gap-2">
                  <input type="hidden" name="mentoringId" value={s.mentoring.id} />
                  <input type="hidden" name="sessionId" value={s.id} />
                  <input type="hidden" name="decision" value="APPROVE" />
                  <input type="hidden" name="back" value="validasi" />
                  {finance && (
                    <Field label="Fee sesi (Rp)" hint={`Kosong = rate tutor (${rupiah(s.mentoring.tutor?.tutorProfile?.rate ?? null)})`}>
                      <input className="input w-40" name="fee" inputMode="numeric" />
                    </Field>
                  )}
                  <button className="btn" type="submit">
                    Setujui
                  </button>
                </form>
                <form action={validateSessionAction} className="flex flex-wrap items-end gap-2">
                  <input type="hidden" name="mentoringId" value={s.mentoring.id} />
                  <input type="hidden" name="sessionId" value={s.id} />
                  <input type="hidden" name="decision" value="REVISION" />
                  <input type="hidden" name="back" value="validasi" />
                  <Field label="Alasan revisi">
                    <input className="input" name="note" placeholder="Mis. bukti Zoom belum diunggah" />
                  </Field>
                  <button className="btn-secondary" type="submit">
                    Minta revisi
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
