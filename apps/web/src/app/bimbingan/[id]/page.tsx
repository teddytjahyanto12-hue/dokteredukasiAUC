import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { homeFor, requireUser } from "@/lib/auth";
import { canManage, findMentoringFor } from "@/lib/mentoring";
import { hasPermission } from "@/lib/permissions";
import { sessionFeeStatus, FEE_STATUS_TONE } from "@/lib/fees";
import { ELIGIBILITY_LABEL } from "@/lib/services";
import { rupiah, tanggal, toWibInput } from "@/lib/format";
import {
  CLOSE_REASONS,
  CLOSE_REASON_LABEL,
  FEE_STATUS_LABEL,
  FIELD_LABEL,
  MENTORING_STATUS_LABEL,
  SESSION_STATUS_LABEL,
  type MentoringField,
} from "@/lib/constants";
import {
  addSessionAction,
  assignTutorAction,
  closeProjectAction,
  postProgressAction,
  reopenProjectAction,
  sendMessageAction,
  updateSessionAction,
  validateSessionAction,
} from "@/app/actions/mentoring";
import { ConfirmButton } from "@/components/confirm-button";
import { Empty, Field, Flash, PageHeader, ProgressBar } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Bimbingan" };

export default async function MentoringDetail({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  const user = await requireUser();
  const { id } = await params;
  const { pesan, tipe } = await readFlash(searchParams);
  if (!(await findMentoringFor(user, id))) notFound();

  const m = await db.mentoring.findUniqueOrThrow({
    where: { id },
    include: {
      student: { select: { name: true, email: true, phone: true, institution: true } },
      tutor: { select: { id: true, name: true } },
      package: { select: { id: true, name: true, sopUrl: true, sopNote: true, eligibilities: { select: { tutorId: true, level: true } } } },
      order: { select: { code: true, status: true } },
      sessions: {
        orderBy: { scheduledAt: "asc" },
        include: { proofFile: { select: { id: true, originalName: true } }, payroll: { select: { status: true } } },
      },
      updates: { orderBy: { createdAt: "desc" } },
      messages: { orderBy: { createdAt: "asc" }, include: { sender: { select: { id: true, name: true } } } },
    },
  });
  const manage = canManage(user, m);
  const isStaffMentoring = hasPermission(user, "admin.mentoring");
  const canValidate = hasPermission(user, "admin.validation");
  const isTutor = user.role === "TUTOR";
  const isStudent = user.role === "STUDENT";
  const showFee = hasPermission(user, "admin.finance") || isTutor;
  const closed = m.status === "CLOSED";
  // Bimbingan dari layanan: hanya tutor Primary/Backup layanan itu. Bimbingan manual: semua tutor aktif.
  const eligibleLevel = new Map(m.package?.eligibilities.map((e) => [e.tutorId, e.level]));
  const tutors = isStaffMentoring
    ? (
        await db.user.findMany({
          where: { role: "TUTOR", active: true },
          orderBy: { name: "asc" },
          select: { id: true, name: true, tutorProfile: { select: { field: true, acceptingClients: true } } },
        })
      )
        .filter((t) => !m.package || eligibleLevel.has(t.id))
        .sort((a, b) => (eligibleLevel.get(a.id) === "PRIMARY" ? -1 : 0) - (eligibleLevel.get(b.id) === "PRIMARY" ? -1 : 0))
    : [];
  const backLink = isStaffMentoring ? { href: "/admin/bimbingan", label: "Semua bimbingan" } : { href: homeFor(user), label: "Dashboard" };

  return (
    <div className="container-page py-10">
      <PageHeader title={`Bimbingan ${FIELD_LABEL[m.field as MentoringField] ?? m.field}`} subtitle={m.title ?? m.package?.name ?? undefined} back={backLink} />
      <Flash pesan={pesan} tipe={tipe} />

      {closed && (
        <div className="mb-6 rounded-xl border border-slate-300 bg-slate-100 p-4 text-sm text-slate-700">
          Proyek ditutup {tanggal(m.closedAt)} — {CLOSE_REASON_LABEL[m.closeReason ?? ""] ?? m.closeReason}
          {m.closeNote && `. Catatan: ${m.closeNote}`}. Sesi yang belum selesai dibatalkan tanpa fee; chat hanya bisa dibaca.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="card">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="badge">{MENTORING_STATUS_LABEL[m.status] ?? m.status}</span>
              <span className="text-sm text-slate-500">Progres {m.progress}%</span>
            </div>
            <div className="mt-3">
              <ProgressBar value={m.progress} />
            </div>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">Murid</dt>
                <dd className="font-medium">{m.student.name}</dd>
                {!isStudent && (
                  <dd className="text-slate-500">
                    {m.student.phone ?? "-"} · {m.student.email}
                  </dd>
                )}
              </div>
              <div>
                <dt className="text-slate-500">Tutor</dt>
                <dd className="font-medium">{m.tutor?.name ?? "Belum ditugaskan"}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Paket</dt>
                <dd>{m.package?.name ?? "-"}</dd>
              </div>
              {m.order && (
                <div>
                  <dt className="text-slate-500">Status pembayaran pelanggan</dt>
                  <dd>
                    <span className={m.order.status === "PAID" ? "badge-brand" : "badge-warn"}>{m.order.status === "PAID" ? "Paid" : "Unpaid"}</span>
                  </dd>
                </div>
              )}
            </dl>
          </section>

          {!isStudent && (m.package?.sopUrl || m.package?.sopNote) && (
            <section className="card border-brand/30 bg-brand-soft/20">
              <h2 className="h2">SOP / instruksi kerja layanan</h2>
              {m.package.sopNote && <p className="mt-1 whitespace-pre-line text-sm text-slate-700">{m.package.sopNote}</p>}
              {m.package.sopUrl && (
                <a href={m.package.sopUrl} target="_blank" rel="noopener noreferrer" className="link mt-2 inline-block text-sm">
                  Buka SOP ↗
                </a>
              )}
            </section>
          )}

          <section className="card">
            <h2 className="h2 mb-1">Sesi bimbingan (Zoom)</h2>
            {isTutor && (
              <p className="mb-3 text-xs text-slate-500">
                Setelah sesi berlangsung, isi catatan + bukti lalu pilih “Tandai selesai”. Fee menjadi terutang setelah admin memvalidasi.
              </p>
            )}
            {m.sessions.length === 0 ? (
              <Empty>Belum ada sesi terjadwal.</Empty>
            ) : (
              <ul className="space-y-4">
                {m.sessions.map((s, i) => {
                  const fee = sessionFeeStatus({ ...s, mentoringStatus: m.status });
                  const editable = manage && !closed && !s.verifiedAt && s.status !== "CANCELLED";
                  return (
                    <li key={s.id} className="rounded-lg border border-slate-200 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold">
                          Sesi {i + 1} · {tanggal(s.scheduledAt, true)} WIB
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="badge">{s.verifiedAt ? "Tervalidasi admin" : SESSION_STATUS_LABEL[s.status]}</span>
                          {!isStudent && <span className={FEE_STATUS_TONE[fee]}>Fee: {FEE_STATUS_LABEL[fee]}</span>}
                        </div>
                      </div>
                      {s.status === "REVISION" && s.revisionNote && (
                        <p className="mt-2 rounded-lg bg-amber-50 p-2 text-sm text-amber-900">Catatan revisi admin: {s.revisionNote}</p>
                      )}
                      <div className="mt-1 flex flex-wrap gap-3 text-sm">
                        {s.zoomLink && (
                          <a href={s.zoomLink} target="_blank" rel="noopener noreferrer" className="link">
                            Link Zoom ↗
                          </a>
                        )}
                        {s.recordingUrl && (
                          <a href={s.recordingUrl} target="_blank" rel="noopener noreferrer" className="link">
                            Rekaman ↗
                          </a>
                        )}
                        {s.proofUrl && (
                          <a href={s.proofUrl} target="_blank" rel="noopener noreferrer" className="link">
                            Bukti (tautan) ↗
                          </a>
                        )}
                        {s.proofFile && (
                          <a href={`/api/berkas/${s.proofFile.id}`} target="_blank" rel="noopener noreferrer" className="link">
                            Bukti: {s.proofFile.originalName}
                          </a>
                        )}
                        {showFee && s.fee !== null && <span className="text-slate-500">Fee: {rupiah(s.fee)}</span>}
                      </div>
                      {s.summary && <p className="mt-2 whitespace-pre-line text-sm text-slate-700">{s.summary}</p>}

                      {editable && (
                        <details className="mt-3" open={s.status === "REVISION"}>
                          <summary className="cursor-pointer text-sm font-medium text-brand">Perbarui sesi / tandai selesai</summary>
                          <form action={updateSessionAction} className="mt-3 grid gap-3 sm:grid-cols-2">
                            <input type="hidden" name="mentoringId" value={m.id} />
                            <input type="hidden" name="sessionId" value={s.id} />
                            <Field label="Jadwal (WIB)">
                              <input className="input" type="datetime-local" name="scheduledAt" defaultValue={toWibInput(s.scheduledAt)} />
                            </Field>
                            <Field label="Status">
                              <select className="input" name="status" defaultValue={s.status === "REVISION" ? "DONE" : s.status}>
                                <option value="SCHEDULED">Terjadwal</option>
                                <option value="DONE">Tandai selesai (kirim ke validasi)</option>
                                {isStaffMentoring && <option value="CANCELLED">Batalkan sesi (tanpa fee)</option>}
                              </select>
                            </Field>
                            <Field label="Link Zoom">
                              <input className="input" name="zoomLink" defaultValue={s.zoomLink ?? ""} />
                            </Field>
                            <Field label="Link rekaman">
                              <input className="input" name="recordingUrl" defaultValue={s.recordingUrl ?? ""} />
                            </Field>
                            <Field label="Link bukti lain (opsional)">
                              <input className="input" name="proofUrl" defaultValue={s.proofUrl ?? ""} />
                            </Field>
                            <Field label="Unggah bukti Zoom (gambar/PDF)">
                              <input className="input" type="file" name="proofFile" accept="image/*,application/pdf" />
                            </Field>
                            <div className="sm:col-span-2">
                              <Field label="Catatan / bahasan sesi" hint="Wajib saat menandai selesai.">
                                <textarea className="input" name="summary" rows={3} defaultValue={s.summary ?? ""} />
                              </Field>
                            </div>
                            <div>
                              <button className="btn" type="submit">
                                Simpan sesi
                              </button>
                            </div>
                          </form>
                        </details>
                      )}

                      {canValidate && s.status === "DONE" && !s.verifiedAt && (
                        <div className="mt-3 grid gap-3 rounded-lg bg-slate-50 p-3 md:grid-cols-2">
                          <form action={validateSessionAction} className="flex flex-wrap items-end gap-2">
                            <input type="hidden" name="mentoringId" value={m.id} />
                            <input type="hidden" name="sessionId" value={s.id} />
                            <input type="hidden" name="decision" value="APPROVE" />
                            {showFee && <input className="input w-36" name="fee" placeholder="Fee (kosong = rate)" inputMode="numeric" />}
                            <button className="btn btn-sm" type="submit">
                              Validasi
                            </button>
                          </form>
                          <form action={validateSessionAction} className="flex flex-wrap items-end gap-2">
                            <input type="hidden" name="mentoringId" value={m.id} />
                            <input type="hidden" name="sessionId" value={s.id} />
                            <input type="hidden" name="decision" value="REVISION" />
                            <input className="input w-48" name="note" placeholder="Alasan revisi" />
                            <button className="btn-secondary btn-sm" type="submit">
                              Minta revisi
                            </button>
                          </form>
                        </div>
                      )}
                      {canValidate && s.verifiedAt && !s.payrollId && (
                        <form action={validateSessionAction} className="mt-3">
                          <input type="hidden" name="mentoringId" value={m.id} />
                          <input type="hidden" name="sessionId" value={s.id} />
                          <input type="hidden" name="decision" value="UNVALIDATE" />
                          <ConfirmButton message="Batalkan validasi sesi ini? Fee kembali ke belum terutang." className="btn-secondary btn-sm">
                            Batalkan validasi
                          </ConfirmButton>
                        </form>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}

            {manage && !closed && (
              <form action={addSessionAction} className="mt-6 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
                <input type="hidden" name="mentoringId" value={m.id} />
                <p className="font-semibold sm:col-span-2">Jadwalkan sesi baru</p>
                <Field label="Tanggal & jam (WIB)">
                  <input className="input" type="datetime-local" name="scheduledAt" required />
                </Field>
                <Field label="Link Zoom">
                  <input className="input" name="zoomLink" placeholder="https://zoom.us/j/…" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Agenda (opsional)">
                    <input className="input" name="summary" />
                  </Field>
                </div>
                <div>
                  <button className="btn" type="submit">
                    Tambah sesi
                  </button>
                </div>
              </form>
            )}
          </section>

          <section className="card">
            <h2 className="h2 mb-3">Catatan progres</h2>
            {manage && !closed && (
              <form action={postProgressAction} className="mb-5 grid gap-3 sm:grid-cols-[1fr_120px_auto] sm:items-end">
                <input type="hidden" name="mentoringId" value={m.id} />
                <Field label="Catatan">
                  <input className="input" name="text" required placeholder="Mis. Judul fix, protokol selesai…" />
                </Field>
                <Field label="Progres (%)">
                  <input className="input" name="progress" inputMode="numeric" defaultValue={m.progress} />
                </Field>
                <button className="btn" type="submit">
                  Catat
                </button>
              </form>
            )}
            {m.updates.length === 0 ? (
              <p className="muted">Belum ada catatan progres.</p>
            ) : (
              <ul className="space-y-3">
                {m.updates.map((u) => (
                  <li key={u.id} className="border-l-2 border-brand pl-3 text-sm">
                    <p className="text-slate-800">{u.text}</p>
                    <p className="text-xs text-slate-500">
                      {u.authorName} · {tanggal(u.createdAt, true)}
                      {u.progress !== null && ` · ${u.progress}%`}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside className="space-y-6">
          {isStaffMentoring && !closed && (
            <form action={assignTutorAction} className="card space-y-3">
              <input type="hidden" name="mentoringId" value={m.id} />
              <h2 className="h2">Penugasan</h2>
              {m.package && tutors.length === 0 && (
                <p className="rounded-lg bg-amber-50 p-2 text-xs text-amber-900">
                  Belum ada tutor berwenang untuk layanan ini. Atur di Layanan → {m.package.name} → Tutor yang berwenang.
                </p>
              )}
              <Field label="Tutor" hint={m.package ? "Hanya tutor Primary/Backup layanan ini." : "✓ = bidang tutor sesuai bidang bimbingan."}>
                <select className="input" name="tutorId" defaultValue={m.tutor?.id ?? ""}>
                  <option value="">— Belum ditugaskan —</option>
                  {tutors.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} · {ELIGIBILITY_LABEL[eligibleLevel.get(t.id) ?? ""] ?? FIELD_LABEL[t.tutorProfile?.field as MentoringField] ?? "bidang belum diisi"}
                      {!m.package && t.tutorProfile?.field === m.field ? " ✓" : ""}
                      {t.tutorProfile && !t.tutorProfile.acceptingClients ? " (tidak menerima klien)" : ""}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Judul / topik">
                <input className="input" name="title" defaultValue={m.title ?? ""} />
              </Field>
              <Field label="Catatan internal">
                <textarea className="input" name="notes" rows={2} defaultValue={m.notes ?? ""} />
              </Field>
              <button className="btn w-full" type="submit">
                Simpan
              </button>
            </form>
          )}

          {isStaffMentoring && !closed && (
            <form action={closeProjectAction} className="card space-y-3">
              <input type="hidden" name="mentoringId" value={m.id} />
              <h2 className="h2">Tutup proyek</h2>
              <p className="text-xs text-slate-500">Sesi yang belum selesai dibatalkan tanpa fee. Sesi yang sudah divalidasi tetap dibayar.</p>
              <Field label="Alasan">
                <select className="input" name="reason" required defaultValue="">
                  <option value="" disabled>
                    Pilih alasan
                  </option>
                  {CLOSE_REASONS.map((r) => (
                    <option key={r} value={r}>
                      {CLOSE_REASON_LABEL[r]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Catatan (opsional)">
                <input className="input" name="note" placeholder="Mis. tidak ada respons sejak 1 Sep" />
              </Field>
              <ConfirmButton message="Tutup proyek ini?" className="btn-danger w-full">
                Tutup proyek
              </ConfirmButton>
            </form>
          )}
          {isStaffMentoring && closed && (
            <form action={reopenProjectAction} className="card space-y-3">
              <input type="hidden" name="mentoringId" value={m.id} />
              <h2 className="h2">Proyek ditutup</h2>
              <ConfirmButton message="Buka kembali proyek ini?" className="btn-secondary w-full">
                Buka kembali
              </ConfirmButton>
            </form>
          )}

          <section className="card flex max-h-[640px] flex-col">
            <h2 className="h2 mb-3">Chat</h2>
            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {m.messages.length === 0 && <p className="muted">Belum ada pesan.</p>}
              {m.messages.map((msg) => {
                const mine = msg.sender.id === user.id;
                return (
                  <div key={msg.id} className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${mine ? "ml-auto bg-brand text-white" : "bg-slate-100 text-slate-800"}`}>
                    {!mine && <p className="text-xs font-semibold">{msg.sender.name}</p>}
                    <p className="whitespace-pre-line">{msg.body}</p>
                    <p className={`mt-1 text-[10px] ${mine ? "text-white/70" : "text-slate-500"}`}>{tanggal(msg.createdAt, true)}</p>
                  </div>
                );
              })}
            </div>
            {closed ? (
              <p className="mt-3 text-xs text-slate-500">Chat hanya bisa dibaca karena proyek ditutup.</p>
            ) : (
              <form action={sendMessageAction} className="mt-3 flex gap-2">
                <input type="hidden" name="mentoringId" value={m.id} />
                <input className="input" name="body" placeholder="Tulis pesan…" required maxLength={4000} autoComplete="off" />
                <button className="btn" type="submit">
                  Kirim
                </button>
              </form>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
