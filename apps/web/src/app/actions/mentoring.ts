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
  const mentoring = await db.mentoring.findUnique({ where: { id: m.id }, select: { tutorId: true, packageId: true } });
  if (!mentoring?.tutorId) back(path, "Bimbingan belum memiliki tutor.", "error");
  const profile = await db.tutorProfile.findUnique({ where: { userId: mentoring.tutorId } });
  // Urutan fee: isian admin → fee tutor untuk layanan ini → rate umum tutor.
  const serviceFee = mentoring.packageId
    ? (await db.tutorServiceEligibility.findUnique({ where: { tutorId_packageId: { tutorId: mentoring.tutorId, packageId: mentoring.packageId } } }))?.fee
    : null;
  const fee = optInt(form, "fee") ?? serviceFee ?? profile?.rate ?? null;
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
  const pending = await db.mentoringSession.count({ where: { mentoringId: m.id, status: "DONE", verifiedAt: null } });
  if (pending > 0) back(path, `Masih ada ${pending} sesi menunggu validasi. Validasi atau minta revisi dulu sebelum menutup.`, "error");

  const note = optStr(form, "note");
  await db.$transaction([
    // Sesi yang belum selesai menjadi batal (tanpa fee). Sesi tervalidasi tetap payable.
    db.mentoringSession.updateMany({ where: { mentoringId: m.id, verifiedAt: null, status: { in: ["SCHEDULED", "REVISION"] } }, data: { status: "CANCELLED" } }),
    db.mentoring.update({
      where: { id: m.id },
      data: { status: "CLOSED", closeReason: reason, closeNote: note, closedAt: new Date(), closedById: user.id },
    }),
  ]);
  await logAudit(actor(user), "PROJECT_CLOSED", "Mentoring", m.id, `Ditutup: ${CLOSE_REASON_LABEL[reason]}${note ? ` — ${note}` : ""}`, {
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
