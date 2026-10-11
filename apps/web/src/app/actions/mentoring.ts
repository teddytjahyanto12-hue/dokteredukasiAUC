"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireUser, type CurrentUser } from "@/lib/auth";
import { canManage, findMentoringFor } from "@/lib/mentoring";
import { hasPermission } from "@/lib/permissions";
import { notifyStaff, notifyUser } from "@/lib/notify";
import { logAudit } from "@/lib/audit";
import { saveUpload, UploadError } from "@/lib/storage";
import { back, optInt, optStr, str } from "@/lib/flash";
import { parseWibDateTime, tanggal } from "@/lib/format";
import { CLOSE_REASONS, CLOSE_REASON_LABEL } from "@/lib/constants";
import { isStageLocked, lockedFromStage } from "@/lib/installments";
import { copyServiceTasks } from "@/lib/orders";
import { zoomAllowance } from "@/lib/zoom";
import { getSettings, whatsappLink } from "@/lib/settings";
import { redirect } from "next/navigation";

async function load(form: FormData) {
  const user = await requireUser();
  const id = str(form, "mentoringId");
  const m = await findMentoringFor(user, id);
  if (!m) back("/dashboard", "Bimbingan tidak ditemukan.", "error");
  return { user, m, path: str(form, "back") === "validasi" ? "/admin/validasi" : `/bimbingan/${m.id}` };
}

function actor(user: CurrentUser) {
  return { id: user.id, name: user.name };
}

// Pihak lain dalam bimbingan yang perlu diberi tahu (selain pengirim).
function others(m: { studentId: string; tutorId: string | null }, senderId: string) {
  return [m.studentId, m.tutorId].filter((id): id is string => !!id && id !== senderId);
}

function assertOpen(m: { status: string }, path: string) {
  if (m.status === "CLOSED") back(path, "Proyek sudah ditutup. Buka kembali dulu bila perlu perubahan.", "error");
}

export async function sendMessageAction(form: FormData) {
  const { user, m, path } = await load(form);
  assertOpen(m, path);
  const body = str(form, "body");
  if (!body) back(path, "Pesan kosong.", "error");
  if (body.length > 4000) back(path, "Pesan terlalu panjang (maks. 4000 karakter).", "error");
  await db.message.create({ data: { mentoringId: m.id, senderId: user.id, body } });
  for (const id of others(m, user.id)) {
    await notifyUser(id, { title: `Pesan baru dari ${user.name}`, body: body.slice(0, 120), link: `/bimbingan/${m.id}` });
  }
  revalidatePath(path);
}

export async function addSessionAction(form: FormData) {
  const { user, m, path } = await load(form);
  if (!canManage(user, m)) back(path, "Hanya tutor yang ditugaskan atau admin yang dapat menambah sesi.", "error");
  assertOpen(m, path);
  const scheduledAt = parseWibDateTime(str(form, "scheduledAt"));
  if (!scheduledAt) back(path, "Tanggal & jam sesi wajib diisi.", "error");
  const zoomLink = optStr(form, "zoomLink");
  if (zoomLink && !/^https?:\/\//.test(zoomLink)) back(path, "Link Zoom harus diawali http(s)://", "error");

  const s = await db.mentoringSession.create({ data: { mentoringId: m.id, scheduledAt, zoomLink, summary: optStr(form, "summary") } });
  await db.mentoring.update({ where: { id: m.id }, data: { status: "ACTIVE" } });
  await logAudit(actor(user), "SESSION_CREATED", "MentoringSession", s.id, `Sesi ${tanggal(scheduledAt, true)} WIB dijadwalkan`);
  await notifyUser(m.studentId, { title: "Sesi bimbingan dijadwalkan", body: `${tanggal(scheduledAt, true)} WIB`, link: `/bimbingan/${m.id}`, email: true });
  back(path, "Sesi ditambahkan.");
}

// Tutor/admin memperbarui sesi. Tutor hanya bisa: Terjadwal atau "Tandai selesai"
// (menjadi menunggu validasi admin). Pembatalan hanya oleh admin.
export async function updateSessionAction(form: FormData) {
  const { user, m, path } = await load(form);
  if (!canManage(user, m)) back(path, "Tidak diizinkan.", "error");
  assertOpen(m, path);
  const session = await db.mentoringSession.findFirst({ where: { id: str(form, "sessionId"), mentoringId: m.id } });
  if (!session) back(path, "Sesi tidak ditemukan.", "error");
  if (session.verifiedAt) back(path, "Sesi sudah divalidasi dan dikunci. Batalkan validasi dulu bila perlu perubahan.", "error");
  if (session.status === "CANCELLED") back(path, "Sesi sudah dibatalkan.", "error");
  if (session.status === "REQUESTED") back(path, "Jadwal Zoom ini masih menunggu konfirmasi admin.", "error");

  const isAdmin = hasPermission(user, "admin.mentoring");
  const status = str(form, "status");
  const allowed = isAdmin ? ["SCHEDULED", "DONE", "CANCELLED"] : ["SCHEDULED", "DONE"];
  if (!allowed.includes(status)) back(path, "Status tidak valid.", "error");
  const proofUrl = optStr(form, "proofUrl");
  if (proofUrl && !/^https?:\/\//.test(proofUrl)) back(path, "Link bukti harus diawali http(s)://", "error");
  const recordingUrl = optStr(form, "recordingUrl");
  if (recordingUrl && !/^https?:\/\//.test(recordingUrl)) back(path, "Link rekaman harus diawali http(s)://", "error");
  const summary = optStr(form, "summary");

  let proofFileId = session.proofFileId;
  try {
    const upload = await saveUpload(form.get("proofFile") as File | null, user.id);
    if (upload) proofFileId = upload.id;
  } catch (e) {
    if (e instanceof UploadError) back(path, e.message, "error");
    throw e;
  }

  // Menandai selesai wajib menyertakan bukti untuk divalidasi admin.
  if (status === "DONE" && !summary) back(path, "Isi catatan/bahasan sesi sebelum menandai selesai.", "error");
  // Zoom dari kuota paket: rekaman wajib diunggah ke Drive dan tautannya dilampirkan.
  if (status === "DONE" && session.seq !== null && !recordingUrl) {
    back(path, "Lampirkan link Google Drive rekaman Zoom (pastikan aksesnya bisa dilihat) sebelum menandai selesai.", "error");
  }
  if (status === "DONE" && !proofUrl && !proofFileId && !recordingUrl) {
    back(path, "Sertakan bukti sesi (link rekaman, link bukti, atau unggah screenshot/PDF) sebelum menandai selesai.", "error");
  }

  const becameDone = status === "DONE" && session.status !== "DONE";
  await db.mentoringSession.update({
    where: { id: session.id },
    data: {
      status,
      summary,
      zoomLink: optStr(form, "zoomLink"),
      recordingUrl,
      proofUrl,
      proofFileId,
      scheduledAt: parseWibDateTime(str(form, "scheduledAt")) ?? session.scheduledAt,
      ...(becameDone ? { doneAt: new Date(), revisionNote: null } : {}),
    },
  });

  if (becameDone) {
    await logAudit(actor(user), "SESSION_MARKED_DONE", "MentoringSession", session.id, `${user.name} menandai sesi selesai`, {
      before: { status: session.status },
      after: { status: "DONE" },
    });
    await notifyStaff("admin.validation", { title: "Sesi menunggu validasi", body: `${user.name} menandai sesi selesai.`, link: "/admin/validasi" });
    back(path, "Sesi ditandai selesai dan masuk antrean validasi admin. Fee belum terutang sampai divalidasi.");
  }
  await logAudit(actor(user), status === "CANCELLED" ? "SESSION_CANCELLED" : "SESSION_UPDATED", "MentoringSession", session.id, `Sesi diperbarui (${status})`, {
    before: { status: session.status },
    after: { status },
  });
  back(path, "Sesi diperbarui.");
}

export async function postProgressAction(form: FormData) {
  const { user, m, path } = await load(form);
  if (!canManage(user, m)) back(path, "Tidak diizinkan.", "error");
  assertOpen(m, path);
  const text = str(form, "text");
  const progress = optInt(form, "progress");
  if (!text) back(path, "Catatan progres wajib diisi.", "error");
  if (progress !== null && (progress < 0 || progress > 100)) back(path, "Progres harus 0–100.", "error");

  await db.progressUpdate.create({ data: { mentoringId: m.id, authorName: user.name, text, progress } });
  if (progress !== null) await db.mentoring.update({ where: { id: m.id }, data: { progress } });
  await notifyUser(m.studentId, { title: "Progres bimbingan diperbarui", body: text.slice(0, 120), link: `/bimbingan/${m.id}` });
  back(path, "Progres dicatat.");
}

// ----- owner/admin -----

export async function assignTutorAction(form: FormData) {
  const { user, m, path } = await load(form);
  if (!hasPermission(user, "admin.mentoring")) back(path, "Tidak memiliki akses bimbingan.", "error");
  assertOpen(m, path);
  const tutorId = optStr(form, "tutorId");
  if (tutorId) {
    const tutor = await db.user.findFirst({ where: { id: tutorId, role: "TUTOR", active: true } });
    if (!tutor) back(path, "Tutor tidak valid.", "error");
    // Bimbingan dari layanan: hanya tutor Primary/Backup layanan tersebut yang boleh ditugaskan.
    const full = await db.mentoring.findUnique({ where: { id: m.id }, select: { packageId: true } });
    if (full?.packageId) {
      const eligible = await db.tutorServiceEligibility.findUnique({ where: { tutorId_packageId: { tutorId, packageId: full.packageId } } });
      if (!eligible) back(path, "Tutor ini belum ditetapkan berwenang (Primary/Backup) untuk layanan ini.", "error");
    }
  }
  const title = optStr(form, "title");
  await db.mentoring.update({
    where: { id: m.id },
    data: { tutorId, title, notes: optStr(form, "notes"), status: tutorId ? "ACTIVE" : "WAITING_ASSIGNMENT" },
  });
  if (tutorId !== m.tutorId) {
    await logAudit(actor(user), "TUTOR_ASSIGNED", "Mentoring", m.id, tutorId ? "Tutor ditugaskan/diganti" : "Tutor dilepas", {
      before: { tutorId: m.tutorId },
      after: { tutorId },
    });
  }
  if (tutorId && tutorId !== m.tutorId) {
    await notifyUser(tutorId, { title: "Klien baru ditugaskan", body: title ?? "Lihat detail bimbingan.", link: `/bimbingan/${m.id}`, email: true });
    await notifyUser(m.studentId, { title: "Tutor bimbingan sudah dipilih", link: `/bimbingan/${m.id}`, email: true });
  }
  back(path, "Bimbingan diperbarui.");
}

// Validasi admin: setujui (fee menjadi Payable) atau kembalikan untuk revisi.
export async function validateSessionAction(form: FormData) {
  const { user, m, path } = await load(form);
  if (!hasPermission(user, "admin.validation")) back(path, "Tidak memiliki akses validasi.", "error");
  const session = await db.mentoringSession.findFirst({ where: { id: str(form, "sessionId"), mentoringId: m.id } });
  if (!session) back(path, "Sesi tidak ditemukan.", "error");
  const decision = str(form, "decision");

  if (decision === "UNVALIDATE") {
    if (!session.verifiedAt) back(path, "Sesi belum divalidasi.", "error");
    if (session.payrollId) back(path, "Sesi sudah masuk payroll; void payroll dulu bila perlu.", "error");
    await db.mentoringSession.update({ where: { id: session.id }, data: { verifiedAt: null, verifiedById: null, fee: null } });
    await logAudit(actor(user), "SESSION_REVISION", "MentoringSession", session.id, "Validasi dibatalkan, sesi kembali menunggu validasi", {
      before: { verifiedAt: session.verifiedAt, fee: session.fee },
      after: { verifiedAt: null, fee: null },
    });
    back(path, "Validasi dibatalkan; sesi kembali ke antrean.");
  }

  if (session.verifiedAt) back(path, "Sesi sudah divalidasi.", "error");
  if (session.status !== "DONE") back(path, "Hanya sesi yang ditandai selesai oleh tutor yang dapat divalidasi.", "error");

  if (decision === "REVISION") {
    const note = str(form, "note");
    if (!note) back(path, "Tulis alasan revisi untuk tutor.", "error");
    await db.mentoringSession.update({ where: { id: session.id }, data: { status: "REVISION", revisionNote: note } });
    await logAudit(actor(user), "SESSION_REVISION", "MentoringSession", session.id, `Dikembalikan untuk revisi: ${note}`);
    const mm = await db.mentoring.findUnique({ where: { id: m.id }, select: { tutorId: true } });
    if (mm?.tutorId) await notifyUser(mm.tutorId, { title: "Sesi perlu revisi", body: note.slice(0, 120), link: `/bimbingan/${m.id}` });
    back(path, "Sesi dikembalikan ke tutor untuk revisi.");
  }

  if (decision !== "APPROVE") back(path, "Keputusan tidak valid.", "error");
  if (!session.summary || (!session.proofUrl && !session.proofFileId && !session.recordingUrl)) {
    back(path, "Sesi belum memiliki catatan dan bukti; minta revisi ke tutor.", "error");
  }
  const mentoring = await db.mentoring.findUnique({
    where: { id: m.id },
    select: {
      tutorId: true,
      packageId: true,
      package: { select: { zoomFee: true, zoomQuota: true } },
      order: { select: { addons: { select: { addon: { select: { zoomCredits: true, hpp: true } } } } } },
    },
  });
  if (!mentoring?.tutorId) back(path, "Bimbingan belum memiliki tutor.", "error");
  const profile = await db.tutorProfile.findUnique({ where: { userId: mentoring.tutorId } });
  // Urutan fee: isian admin → fee tutor untuk layanan ini → rate umum tutor.
  const serviceFee = mentoring.packageId
    ? (await db.tutorServiceEligibility.findUnique({ where: { tutorId_packageId: { tutorId: mentoring.tutorId, packageId: mentoring.packageId } } }))?.fee
    : null;
  // Zoom dari kuota paket memakai fee Zoom paket (mis. Rp40.000 Basic/Intermediate, Rp35.000 Pro).
  // Zoom tambahan (di luar kuota paket) dibayar sesuai biaya tutor add-on Zoom (HPP add-on, mis. Rp40.000).
  const extraZoomFee = mentoring.order?.addons.find((a) => (a.addon?.zoomCredits ?? 0) > 0)?.addon?.hpp ?? null;
  const isExtraZoom = session.seq !== null && session.seq > (mentoring.package?.zoomQuota ?? 0);
  const zoomFee = session.seq !== null ? (isExtraZoom ? extraZoomFee ?? mentoring.package?.zoomFee : mentoring.package?.zoomFee) ?? null : null;
  const fee = optInt(form, "fee") ?? zoomFee ?? serviceFee ?? profile?.rate ?? null;
  if (fee === null) back(path, "Rate tutor belum ditetapkan; isi fee sesi atau atur rate di data tutor.", "error");

  // updateMany dengan syarat verifiedAt null mencegah validasi ganda bersamaan.
  const res = await db.mentoringSession.updateMany({
    where: { id: session.id, verifiedAt: null, status: "DONE" },
    data: { verifiedAt: new Date(), verifiedById: user.id, fee },
  });
  if (res.count === 0) back(path, "Sesi sudah divalidasi oleh admin lain.", "error");
  await logAudit(actor(user), "SESSION_VALIDATED", "MentoringSession", session.id, `Sesi divalidasi, fee Rp${fee.toLocaleString("id-ID")} menjadi payable`, {
    after: { fee },
  });
  await notifyUser(mentoring.tutorId, { title: "Sesi divalidasi", body: "Fee sesi kini tercatat sebagai terutang (payable).", link: "/tutor-panel/pencapaian" });
  back(path, "Sesi divalidasi. Fee tutor menjadi payable.");
}

// Penutupan proyek hanya oleh owner/admin, dengan alasan yang ditentukan.
export async function closeProjectAction(form: FormData) {
  const { user, m, path } = await load(form);
  if (!hasPermission(user, "admin.mentoring")) back(path, "Tidak memiliki akses bimbingan.", "error");
  assertOpen(m, path);
  const reason = str(form, "reason");
  if (!(CLOSE_REASONS as readonly string[]).includes(reason)) back(path, "Pilih alasan penutupan.", "error");
  const pending =
    (await db.mentoringSession.count({ where: { mentoringId: m.id, status: "DONE", verifiedAt: null } })) +
    (await db.projectTask.count({ where: { mentoringId: m.id, status: "DONE", validatedAt: null } }));
  if (pending > 0) back(path, `Masih ada ${pending} sesi/task menunggu validasi. Validasi atau minta revisi dulu sebelum menutup.`, "error");

  const note = optStr(form, "note");
  await db.$transaction([
    // Sesi yang belum selesai menjadi batal (tanpa fee). Sesi tervalidasi tetap payable.
    db.mentoringSession.updateMany({ where: { mentoringId: m.id, verifiedAt: null, status: { in: ["SCHEDULED", "REVISION"] } }, data: { status: "CANCELLED" } }),
    db.projectTask.updateMany({ where: { mentoringId: m.id, validatedAt: null, status: { in: ["TODO", "REVISION"] } }, data: { status: "CANCELLED" } }),
    db.mentoring.update({
      where: { id: m.id },
      data: { status: "CLOSED", closeReason: reason, closeNote: note, closedAt: new Date(), closedById: user.id },
    }),
  ]);
  await logAudit(actor(user), "PROJECT_CLOSED", "Mentoring", m.id, `Ditutup: ${CLOSE_REASON_LABEL[reason]}${note ? ` - ${note}` : ""}`, {
    before: { status: m.status },
    after: { status: "CLOSED", reason },
  });
  for (const id of others(m, user.id)) {
    await notifyUser(id, { title: "Proyek bimbingan ditutup", body: CLOSE_REASON_LABEL[reason], link: `/bimbingan/${m.id}` });
  }
  back(path, "Proyek ditutup. Sesi yang belum selesai dibatalkan tanpa fee.");
}

export async function reopenProjectAction(form: FormData) {
  const { user, m, path } = await load(form);
  if (!hasPermission(user, "admin.mentoring")) back(path, "Tidak memiliki akses bimbingan.", "error");
  if (m.status !== "CLOSED") back(path, "Proyek belum ditutup.", "error");
  const full = await db.mentoring.findUnique({ where: { id: m.id }, select: { tutorId: true } });
  await db.mentoring.update({
    where: { id: m.id },
    data: { status: full?.tutorId ? "ACTIVE" : "WAITING_ASSIGNMENT", closeReason: null, closeNote: null, closedAt: null, closedById: null },
  });
  await logAudit(actor(user), "PROJECT_REOPENED", "Mentoring", m.id, "Proyek dibuka kembali");
  back(path, "Proyek dibuka kembali.");
}

// ---------- Checklist task proyek ----------

async function lockedFromFor(mentoringId: string) {
  const m = await db.mentoring.findUnique({
    where: { id: mentoringId },
    select: { order: { select: { installments: { select: { status: true, unlocksStage: true } } } } },
  });
  return lockedFromStage(m?.order?.installments ?? []);
}

async function loadTask(form: FormData, mentoringId: string, path: string) {
  const task = await db.projectTask.findFirst({ where: { id: str(form, "taskId"), mentoringId } });
  if (!task) back(path, "Task tidak ditemukan.", "error");
  return task;
}

// Tutor menandai task selesai → menunggu validasi admin. Tahap yang terkunci cicilan tidak bisa dikerjakan.
export async function markTaskDoneAction(form: FormData) {
  const { user, m, path } = await load(form);
  if (!canManage(user, m)) back(path, "Tidak diizinkan.", "error");
  assertOpen(m, path);
  const task = await loadTask(form, m.id, path);
  if (task.validatedAt) back(path, "Task sudah divalidasi.", "error");
  if (!["TODO", "REVISION"].includes(task.status)) back(path, "Task sudah ditandai selesai dan menunggu validasi.", "error");
  if (isStageLocked(task.stageNumber, await lockedFromFor(m.id))) {
    back(path, `Tahap ${task.stageNumber} masih terkunci menunggu pembayaran cicilan pelanggan.`, "error");
  }
  const note = str(form, "note");
  if (!note) back(path, "Isi catatan hasil pekerjaan sebelum menandai selesai.", "error");
  const evidenceUrl = optStr(form, "evidenceUrl");
  if (evidenceUrl && !/^https?:\/\//.test(evidenceUrl)) back(path, "Link bukti harus diawali http(s)://", "error");
  let evidenceFileId = task.evidenceFileId;
  try {
    const upload = await saveUpload(form.get("evidenceFile") as File | null, user.id, { allowOffice: true });
    if (upload) evidenceFileId = upload.id;
  } catch (e) {
    if (e instanceof UploadError) back(path, e.message, "error");
    throw e;
  }
  if (!evidenceUrl && !evidenceFileId) back(path, "Unggah bukti (screenshot chat grup, PDF, DOCX, XLSX) atau isi link bukti/rekaman.", "error");

  await db.projectTask.update({ where: { id: task.id }, data: { status: "DONE", note, evidenceUrl, evidenceFileId, doneAt: new Date(), revisionNote: null } });
  await logAudit(actor(user), "TASK_MARKED_DONE", "ProjectTask", task.id, `${user.name} menandai selesai: ${task.title}`, {
    before: { status: task.status },
    after: { status: "DONE" },
  });
  await notifyStaff("admin.validation", { title: "Task menunggu validasi", body: `${task.title} - ${user.name}`, link: "/admin/validasi" });
  back(path, "Task ditandai selesai dan masuk antrean validasi admin.");
}

export async function validateTaskAction(form: FormData) {
  const { user, m, path } = await load(form);
  if (!hasPermission(user, "admin.validation")) back(path, "Tidak memiliki akses validasi.", "error");
  const task = await loadTask(form, m.id, path);
  const decision = str(form, "decision");

  if (decision === "UNVALIDATE") {
    if (!task.validatedAt) back(path, "Task belum divalidasi.", "error");
    if (task.payrollId) back(path, "Pencapaian sudah masuk payroll; void payroll dulu bila perlu.", "error");
    await db.projectTask.update({ where: { id: task.id }, data: { validatedAt: null, validatedById: null } });
    await logAudit(actor(user), "TASK_REVISION", "ProjectTask", task.id, `Validasi task dibatalkan: ${task.title}`);
    back(path, "Validasi task dibatalkan.");
  }
  if (task.validatedAt) back(path, "Task sudah divalidasi.", "error");
  if (task.status !== "DONE") back(path, "Hanya task yang ditandai selesai tutor yang dapat divalidasi.", "error");

  if (decision === "REVISION") {
    const note = str(form, "note");
    if (!note) back(path, "Tulis alasan revisi untuk tutor.", "error");
    await db.projectTask.update({ where: { id: task.id }, data: { status: "REVISION", revisionNote: note } });
    await logAudit(actor(user), "TASK_REVISION", "ProjectTask", task.id, `Revisi task "${task.title}": ${note}`);
    const mm = await db.mentoring.findUnique({ where: { id: m.id }, select: { tutorId: true } });
    if (mm?.tutorId) await notifyUser(mm.tutorId, { title: "Task perlu revisi", body: `${task.title}: ${note}`.slice(0, 140), link: `/bimbingan/${m.id}` });
    back(path, "Task dikembalikan untuk revisi.");
  }
  if (decision !== "APPROVE") back(path, "Keputusan tidak valid.", "error");
  const res = await db.projectTask.updateMany({ where: { id: task.id, validatedAt: null, status: "DONE" }, data: { validatedAt: new Date(), validatedById: user.id } });
  if (res.count === 0) back(path, "Task sudah divalidasi admin lain.", "error");
  await logAudit(actor(user), "TASK_VALIDATED", "ProjectTask", task.id, `Task divalidasi: ${task.title}${task.fee ? ` (fee Rp${task.fee.toLocaleString("id-ID")} payable)` : ""}`);
  const tutorOf = await db.mentoring.findUnique({ where: { id: m.id }, select: { tutorId: true } });
  if (tutorOf?.tutorId) await notifyUser(tutorOf.tutorId, { title: "Pencapaian diverifikasi", body: task.fee ? `${task.title}: fee masuk daftar payroll.` : task.title, link: `/bimbingan/${m.id}` });

  // Progres proyek mengikuti persentase task tervalidasi.
  const [total, done] = await Promise.all([
    db.projectTask.count({ where: { mentoringId: m.id, status: { not: "CANCELLED" } } }),
    db.projectTask.count({ where: { mentoringId: m.id, validatedAt: { not: null } } }),
  ]);
  if (total) await db.mentoring.update({ where: { id: m.id }, data: { progress: Math.round((done / total) * 100) } });
  await notifyUser(m.studentId, { title: "Progres bimbingan bertambah", body: task.title, link: `/bimbingan/${m.id}` });
  back(path, "Task divalidasi.");
}

export async function addProjectTaskAction(form: FormData) {
  const { user, m, path } = await load(form);
  if (!hasPermission(user, "admin.mentoring")) back(path, "Tidak memiliki akses bimbingan.", "error");
  assertOpen(m, path);
  const title = str(form, "title");
  if (title.length < 2) back(path, "Nama task minimal 2 karakter.", "error");
  const stageNumber = optInt(form, "stageNumber") ?? 1;
  const sameStage = await db.projectTask.findFirst({ where: { mentoringId: m.id, stageNumber }, select: { stageTitle: true } });
  const t = await db.projectTask.create({
    data: {
      mentoringId: m.id,
      stageNumber,
      stageTitle: sameStage?.stageTitle ?? (str(form, "stageTitle") || `Tahap ${stageNumber}`),
      title,
      order: await db.projectTask.count({ where: { mentoringId: m.id, stageNumber } }),
    },
  });
  await logAudit(actor(user), "TASK_CHANGED", "ProjectTask", t.id, `Task ditambahkan: ${title} (tahap ${stageNumber})`);
  back(path, "Task ditambahkan.");
}

export async function cancelProjectTaskAction(form: FormData) {
  const { user, m, path } = await load(form);
  if (!hasPermission(user, "admin.mentoring")) back(path, "Tidak memiliki akses bimbingan.", "error");
  const task = await loadTask(form, m.id, path);
  if (task.validatedAt) back(path, "Task yang sudah divalidasi tidak dapat dibatalkan.", "error");
  await db.projectTask.update({ where: { id: task.id }, data: { status: "CANCELLED" } });
  await logAudit(actor(user), "TASK_CHANGED", "ProjectTask", task.id, `Task dibatalkan: ${task.title}`);
  back(path, "Task dibatalkan.");
}

// Untuk proyek lama yang dibuat sebelum layanan punya checklist.
export async function applyServiceTemplateAction(form: FormData) {
  const { user, m, path } = await load(form);
  if (!hasPermission(user, "admin.mentoring")) back(path, "Tidak memiliki akses bimbingan.", "error");
  const full = await db.mentoring.findUnique({ where: { id: m.id }, select: { packageId: true, _count: { select: { tasks: true } } } });
  if (!full?.packageId) back(path, "Proyek ini tidak terhubung ke layanan.", "error");
  if (full._count.tasks > 0) back(path, "Proyek sudah memiliki checklist.", "error");
  const n = await db.$transaction((tx) => copyServiceTasks(tx, m.id, full.packageId!));
  if (!n) back(path, "Layanan belum punya tahap & checklist. Atur di halaman layanan.", "error");
  await logAudit(actor(user), "TASK_CHANGED", "Mentoring", m.id, `Checklist layanan diterapkan (${n} task)`);
  back(path, `${n} task dari layanan ditambahkan.`);
}


// ---------- Zoom dari kuota paket ----------

// Murid memilih "Zoom n", tanggal & jam → sesi REQUESTED → diarahkan ke WhatsApp admin dengan rincian.
export async function requestZoomAction(form: FormData) {
  const { user, m, path } = await load(form);
  if (m.studentId !== user.id) back(path, "Hanya murid pemilik bimbingan yang dapat mengajukan jadwal Zoom.", "error");
  const z = await zoomAllowance(m.id);
  if (!z || z.closed) back(path, "Bimbingan sudah ditutup.", "error");
  if (z.expired) back(path, `Masa penggunaan Zoom berakhir ${tanggal(z.serviceEndsAt)}.`, "error");
  const seq = optInt(form, "seq");
  if (!seq || !z.available.includes(seq)) back(path, "Zoom ini sudah diajukan atau di luar kuota paket.", "error");
  const when = parseWibDateTime(str(form, "preferredAt"));
  if (!when) back(path, "Pilih tanggal dan jam Zoom.", "error");
  if (when.getTime() < Date.now() + 60 * 60 * 1000) back(path, "Pilih waktu minimal 1 jam dari sekarang.", "error");
  const note = optStr(form, "note");

  const s = await db.mentoringSession.create({
    data: { mentoringId: m.id, seq, scheduledAt: when, requestedAt: new Date(), status: "REQUESTED", summary: note ? `Permintaan murid: ${note}` : null },
  });
  await logAudit(actor(user), "ZOOM_REQUESTED", "MentoringSession", s.id, `${user.name} mengajukan Zoom ${seq}: ${tanggal(when, true)} WIB`);
  await notifyStaff("admin.mentoring", { title: `Permintaan Zoom ${seq}`, body: `${user.name} memilih ${tanggal(when, true)} WIB.`, link: `/bimbingan/${m.id}` });

  const [settings, detail] = await Promise.all([
    getSettings(),
    db.mentoring.findUnique({ where: { id: m.id }, select: { package: { select: { name: true } }, order: { select: { code: true } }, tutor: { select: { name: true } } } }),
  ]);
  const text = [
    `*Permintaan jadwal Zoom ${seq}*`,
    settings.siteName,
    "",
    `Nama: ${user.name}`,
    `Email: ${user.email}`,
    `Paket: ${detail?.package?.name ?? "-"}`,
    detail?.order ? `Kode order: ${detail.order.code}` : null,
    `Zoom ke-${seq} dari ${z.quota}`,
    `Jadwal yang dipilih: ${tanggal(when, true)} WIB`,
    detail?.tutor ? `Tutor: ${detail.tutor.name}` : null,
    note ? `Catatan: ${note}` : null,
    "",
    "Mohon konfirmasi jadwalnya. Terima kasih.",
  ]
    .filter((x) => x !== null)
    .join("\n");
  const wa = whatsappLink(settings.adminWhatsapp, text);
  revalidatePath(path);
  if (wa) redirect(wa);
  back(path, `Permintaan Zoom ${seq} terkirim ke admin. Nomor WhatsApp admin belum diatur, jadi admin akan menghubungi lewat notifikasi.`);
}

// Admin menetapkan jadwal final yang disetujui murid & tutor (+ tutor bila belum ada) → Zoom terjadwal.
export async function confirmZoomAction(form: FormData) {
  const { user, m, path } = await load(form);
  if (!hasPermission(user, "admin.mentoring")) back(path, "Hanya admin bimbingan yang dapat mengonfirmasi jadwal.", "error");
  assertOpen(m, path);
  const session = await db.mentoringSession.findFirst({ where: { id: str(form, "sessionId"), mentoringId: m.id } });
  if (!session || session.status !== "REQUESTED") back(path, "Permintaan Zoom tidak ditemukan atau sudah dikonfirmasi.", "error");
  const scheduledAt = parseWibDateTime(str(form, "scheduledAt"));
  if (!scheduledAt) back(path, "Isi jadwal final (tanggal & jam).", "error");
  const zoomLink = optStr(form, "zoomLink");
  if (zoomLink && !/^https?:\/\//.test(zoomLink)) back(path, "Link Zoom harus diawali http(s)://", "error");

  let tutorId = m.tutorId;
  const pickTutor = optStr(form, "tutorId");
  if (!tutorId && pickTutor) {
    const t = await db.user.findFirst({ where: { id: pickTutor, role: "TUTOR", active: true } });
    if (!t) back(path, "Tutor tidak valid.", "error");
    tutorId = t.id;
    await db.mentoring.update({ where: { id: m.id }, data: { tutorId, status: "ACTIVE" } });
  }
  if (!tutorId) back(path, "Tugaskan tutor terlebih dahulu (pilih tutor pada form konfirmasi).", "error");

  await db.mentoringSession.update({ where: { id: session.id }, data: { status: "SCHEDULED", scheduledAt, zoomLink } });
  await db.mentoring.update({ where: { id: m.id }, data: { status: "ACTIVE" } });
  await logAudit(actor(user), "ZOOM_CONFIRMED", "MentoringSession", session.id, `Zoom ${session.seq ?? ""} dikonfirmasi: ${tanggal(scheduledAt, true)} WIB`, {
    before: { status: "REQUESTED", scheduledAt: session.scheduledAt },
    after: { status: "SCHEDULED", scheduledAt },
  });
  const body = `Zoom ${session.seq ?? ""} terjadwal ${tanggal(scheduledAt, true)} WIB.`;
  await notifyUser(m.studentId, { title: "Jadwal Zoom dikonfirmasi", body, link: `/bimbingan/${m.id}`, email: true });
  await notifyUser(tutorId, { title: "Zoom baru terjadwal", body, link: `/bimbingan/${m.id}`, email: true });
  back(path, "Jadwal Zoom dikonfirmasi. Murid dan tutor sudah diberi tahu.");
}

// Admin membatalkan permintaan Zoom (mis. jadwal tidak cocok) → kuota Zoom ke-n kembali bisa diajukan murid.
export async function cancelZoomRequestAction(form: FormData) {
  const { user, m, path } = await load(form);
  if (!hasPermission(user, "admin.mentoring")) back(path, "Hanya admin bimbingan yang dapat membatalkan permintaan.", "error");
  const session = await db.mentoringSession.findFirst({ where: { id: str(form, "sessionId"), mentoringId: m.id, status: "REQUESTED" } });
  if (!session) back(path, "Permintaan Zoom tidak ditemukan atau sudah diproses.", "error");
  const reason = str(form, "reason") || "Jadwal belum cocok";
  await db.mentoringSession.update({ where: { id: session.id }, data: { status: "CANCELLED", revisionNote: reason } });
  await logAudit(actor(user), "ZOOM_REQUEST_CANCELLED", "MentoringSession", session.id, `Permintaan Zoom ${session.seq ?? ""} dibatalkan: ${reason}`);
  await notifyUser(m.studentId, { title: `Permintaan Zoom ${session.seq ?? ""} perlu diajukan ulang`, body: reason, link: `/bimbingan/${m.id}` });
  back(path, "Permintaan dibatalkan. Murid dapat mengajukan jadwal baru untuk Zoom ini.");
}
