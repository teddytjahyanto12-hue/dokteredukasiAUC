import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { homeForRole, requireUser } from "@/lib/auth";
import { canManage, findMentoringFor } from "@/lib/mentoring";
import { rupiah, tanggal, toWibInput } from "@/lib/format";
import { FIELD_LABEL, MENTORING_STATUS, MENTORING_STATUS_LABEL, SESSION_STATUS_LABEL, type MentoringField } from "@/lib/constants";
import {
  addSessionAction,
  assignTutorAction,
  postProgressAction,
  sendMessageAction,
  updateSessionAction,
  verifySessionAction,
} from "@/app/actions/mentoring";
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
      package: { select: { name: true } },
      order: { select: { code: true } },
      sessions: { orderBy: { scheduledAt: "asc" }, include: { proofFile: { select: { id: true, originalName: true } } } },
      updates: { orderBy: { createdAt: "desc" } },
      messages: { orderBy: { createdAt: "asc" }, include: { sender: { select: { id: true, name: true, role: true } } } },
    },
  });
  const manage = canManage(user, m);
  const isAdmin = user.role === "ADMIN";
  const tutors = isAdmin
    ? await db.user.findMany({
        where: { role: "TUTOR", active: true },
        orderBy: { name: "asc" },
        select: { id: true, name: true, tutorProfile: { select: { field: true, acceptingClients: true } } },
      })
    : [];
  const backLink = isAdmin ? { href: "/admin/bimbingan", label: "Semua bimbingan" } : { href: homeForRole(user.role), label: "Dashboard" };

  return (
    <div className="container-page py-10">
      <PageHeader title={`Bimbingan ${FIELD_LABEL[m.field as MentoringField] ?? m.field}`} subtitle={m.title ?? m.package?.name ?? undefined} back={backLink} />
      <Flash pesan={pesan} tipe={tipe} />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="card">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="badge">{MENTORING_STATUS_LABEL[m.status]}</span>
              <span className="text-sm text-slate-500">Progres {m.progress}%</span>
            </div>
            <div className="mt-3">
              <ProgressBar value={m.progress} />
            </div>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">Murid</dt>
                <dd className="font-medium">{m.student.name}</dd>
                {user.role !== "STUDENT" && (
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
                  <dt className="text-slate-500">Order</dt>
                  <dd>{m.order.code}</dd>
                </div>
              )}
            </dl>
          </section>

          <section className="card">
            <h2 className="h2 mb-3">Sesi bimbingan (Zoom)</h2>
            {m.sessions.length === 0 ? (
              <Empty>Belum ada sesi terjadwal.</Empty>
            ) : (
              <ul className="space-y-4">
                {m.sessions.map((s, i) => (
                  <li key={s.id} className="rounded-lg border border-slate-200 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold">
                        Sesi {i + 1} · {tanggal(s.scheduledAt, true)} WIB
                      </p>
                      <div className="flex gap-2">
                        <span className="badge">{SESSION_STATUS_LABEL[s.status]}</span>
                        {s.verifiedAt && <span className="badge-brand">Terverifikasi</span>}
                      </div>
                    </div>
                    {s.zoomLink && (
                      <a href={s.zoomLink} target="_blank" rel="noopener noreferrer" className="link mt-1 inline-block text-sm">
                        Link Zoom ↗
                      </a>
                    )}
                    {s.summary && <p className="mt-2 whitespace-pre-line text-sm text-slate-700">{s.summary}</p>}
                    <div className="mt-2 flex flex-wrap gap-3 text-sm">
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
                      {isAdmin && s.fee !== null && <span className="text-slate-500">Fee: {rupiah(s.fee)}</span>}
                    </div>

                    {manage && (!s.verifiedAt || isAdmin) && (
                      <details className="mt-3">
                        <summary className="cursor-pointer text-sm font-medium text-brand">Perbarui sesi / unggah bukti</summary>
                        <form action={updateSessionAction} className="mt-3 grid gap-3 sm:grid-cols-2">
                          <input type="hidden" name="mentoringId" value={m.id} />
                          <input type="hidden" name="sessionId" value={s.id} />
                          <Field label="Jadwal (WIB)">
                            <input className="input" type="datetime-local" name="scheduledAt" defaultValue={toWibInput(s.scheduledAt)} />
                          </Field>
                          <Field label="Status">
                            <select className="input" name="status" defaultValue={s.status}>
                              {Object.entries(SESSION_STATUS_LABEL).map(([k, v]) => (
                                <option key={k} value={k}>
                                  {v}
                                </option>
                              ))}
                            </select>
                          </Field>
                          <Field label="Link Zoom">
                            <input className="input" name="zoomLink" defaultValue={s.zoomLink ?? ""} />
                          </Field>
                          <Field label="Link bukti (rekaman/screenshot)">
                            <input className="input" name="proofUrl" defaultValue={s.proofUrl ?? ""} />
                          </Field>
                          <div className="sm:col-span-2">
                            <Field label="Catatan / bahasan sesi">
                              <textarea className="input" name="summary" rows={3} defaultValue={s.summary ?? ""} />
                            </Field>
                          </div>
                          <Field label="Unggah bukti Zoom (gambar/PDF)">
                            <input className="input" type="file" name="proofFile" accept="image/*,application/pdf" />
                          </Field>
                          <div className="flex items-end">
                            <button className="btn" type="submit">
                              Simpan sesi
                            </button>
                          </div>
                        </form>
                      </details>
                    )}

                    {isAdmin && !s.payrollId && (
                      <form action={verifySessionAction} className="mt-3 flex flex-wrap items-end gap-2">
                        <input type="hidden" name="mentoringId" value={m.id} />
                        <input type="hidden" name="sessionId" value={s.id} />
                        {!s.verifiedAt && (
                          <input className="input w-40" name="fee" placeholder="Fee (opsional)" inputMode="numeric" />
                        )}
                        <button className={s.verifiedAt ? "btn-secondary btn-sm" : "btn btn-sm"} type="submit">
                          {s.verifiedAt ? "Batalkan verifikasi" : "Verifikasi sesi"}
                        </button>
                      </form>
                    )}
                    {s.payrollId && <p className="mt-2 text-xs text-slate-500">Sudah masuk payroll.</p>}
                  </li>
                ))}
              </ul>
            )}

            {manage && (
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
            {manage && (
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
          {isAdmin && (
            <form action={assignTutorAction} className="card space-y-3">
              <input type="hidden" name="mentoringId" value={m.id} />
              <h2 className="h2">Pengaturan admin</h2>
              <Field label="Tutor" hint="Pilih sesuai bidang bimbingan.">
                <select className="input" name="tutorId" defaultValue={m.tutor?.id ?? ""}>
                  <option value="">— Belum ditugaskan —</option>
                  {tutors.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} · {FIELD_LABEL[t.tutorProfile?.field as MentoringField] ?? "bidang belum diisi"}
                      {t.tutorProfile?.field === m.field ? " ✓" : ""}
                      {t.tutorProfile && !t.tutorProfile.acceptingClients ? " (tidak menerima klien)" : ""}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Status">
                <select className="input" name="status" defaultValue={m.status}>
                  {MENTORING_STATUS.map((s) => (
                    <option key={s} value={s}>
                      {MENTORING_STATUS_LABEL[s]}
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
            <form action={sendMessageAction} className="mt-3 flex gap-2">
              <input type="hidden" name="mentoringId" value={m.id} />
              <input className="input" name="body" placeholder="Tulis pesan…" required maxLength={4000} autoComplete="off" />
              <button className="btn" type="submit">
                Kirim
              </button>
            </form>
          </section>
        </aside>
      </div>
    </div>
  );
}
