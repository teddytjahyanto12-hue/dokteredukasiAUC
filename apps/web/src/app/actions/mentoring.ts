"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { canManage, findMentoringFor } from "@/lib/mentoring";
import { notifyUser } from "@/lib/notify";
import { saveUpload, UploadError } from "@/lib/storage";
import { back, optInt, optStr, str } from "@/lib/flash";
import { parseWibDateTime, tanggal } from "@/lib/format";
import { MENTORING_STATUS } from "@/lib/constants";

async function load(form: FormData) {
  const user = await requireUser();
  const id = str(form, "mentoringId");
  const m = await findMentoringFor(user, id);
  if (!m) back("/dashboard", "Bimbingan tidak ditemukan.", "error");
  return { user, m, path: `/bimbingan/${m.id}` };
}

// Pihak lain dalam bimbingan yang perlu diberi tahu (selain pengirim).
function others(m: { studentId: string; tutorId: string | null }, senderId: string) {
  return [m.studentId, m.tutorId].filter((id): id is string => !!id && id !== senderId);
}

export async function sendMessageAction(form: FormData) {
  const { user, m, path } = await load(form);
  const body = str(form, "body");
  if (!body) back(path, "Pesan kosong.", "error");
  if (body.length > 4000) back(path, "Pesan terlalu panjang (maks. 4000 karakter).", "error");
  await db.message.create({ data: { mentoringId: m.id, senderId: user.id, body } });
  for (const id of others(m, user.id)) {
    await notifyUser(id, { title: `Pesan baru dari ${user.name}`, body: body.slice(0, 120), link: path });
  }
  revalidatePath(path);
}

export async function addSessionAction(form: FormData) {
  const { user, m, path } = await load(form);
  if (!canManage(user, m)) back(path, "Hanya tutor yang ditugaskan atau admin yang dapat menambah sesi.", "error");
  const scheduledAt = parseWibDateTime(str(form, "scheduledAt"));
  if (!scheduledAt) back(path, "Tanggal & jam sesi wajib diisi.", "error");
  const zoomLink = optStr(form, "zoomLink");
  if (zoomLink && !/^https?:\/\//.test(zoomLink)) back(path, "Link Zoom harus diawali http(s)://", "error");

  await db.mentoringSession.create({ data: { mentoringId: m.id, scheduledAt, zoomLink, summary: optStr(form, "summary") } });
  await db.mentoring.update({ where: { id: m.id }, data: { status: "ACTIVE" } });
  await notifyUser(m.studentId, { title: "Sesi bimbingan dijadwalkan", body: `${tanggal(scheduledAt, true)} WIB`, link: path, email: true });
  back(path, "Sesi ditambahkan.");
}

export async function updateSessionAction(form: FormData) {
  const { user, m, path } = await load(form);
  if (!canManage(user, m)) back(path, "Tidak diizinkan.", "error");
  const sessionId = str(form, "sessionId");
  const session = await db.mentoringSession.findFirst({ where: { id: sessionId, mentoringId: m.id } });
  if (!session) back(path, "Sesi tidak ditemukan.", "error");
  if (session.verifiedAt && user.role !== "ADMIN") back(path, "Sesi sudah diverifikasi admin dan tidak dapat diubah.", "error");

  const status = str(form, "status");
  if (!["SCHEDULED", "DONE", "CANCELLED"].includes(status)) back(path, "Status tidak valid.", "error");
  const proofUrl = optStr(form, "proofUrl");
  if (proofUrl && !/^https?:\/\//.test(proofUrl)) back(path, "Link bukti harus diawali http(s)://", "error");

  let proofFileId = session.proofFileId;
  try {
    const upload = await saveUpload(form.get("proofFile") as File | null, user.id);
    if (upload) proofFileId = upload.id;
  } catch (e) {
    if (e instanceof UploadError) back(path, e.message, "error");
    throw e;
  }

  await db.mentoringSession.update({
    where: { id: session.id },
    data: {
      status,
      summary: optStr(form, "summary"),
      zoomLink: optStr(form, "zoomLink"),
      proofUrl,
      proofFileId,
      scheduledAt: parseWibDateTime(str(form, "scheduledAt")) ?? session.scheduledAt,
    },
  });
  back(path, "Sesi diperbarui.");
}

export async function postProgressAction(form: FormData) {
  const { user, m, path } = await load(form);
  if (!canManage(user, m)) back(path, "Tidak diizinkan.", "error");
  const text = str(form, "text");
  const progress = optInt(form, "progress");
  if (!text) back(path, "Catatan progres wajib diisi.", "error");
  if (progress !== null && (progress < 0 || progress > 100)) back(path, "Progres harus 0–100.", "error");

  await db.progressUpdate.create({ data: { mentoringId: m.id, authorName: user.name, text, progress } });
  if (progress !== null) await db.mentoring.update({ where: { id: m.id }, data: { progress } });
  await notifyUser(m.studentId, { title: "Progres bimbingan diperbarui", body: text.slice(0, 120), link: path });
  back(path, "Progres dicatat.");
}

// ----- khusus admin -----

export async function assignTutorAction(form: FormData) {
  const { user, m, path } = await load(form);
  if (user.role !== "ADMIN") back(path, "Hanya admin.", "error");
  const tutorId = optStr(form, "tutorId");
  if (tutorId) {
    const tutor = await db.user.findFirst({ where: { id: tutorId, role: "TUTOR", active: true } });
    if (!tutor) back(path, "Tutor tidak valid.", "error");
  }
  let status = str(form, "status");
  if (!(MENTORING_STATUS as readonly string[]).includes(status)) status = "WAITING_ASSIGNMENT";
  // Memilih tutor otomatis memulai bimbingan; menghapus tutor mengembalikannya ke antrean.
  if (tutorId && status === "WAITING_ASSIGNMENT") status = "ACTIVE";
  if (!tutorId && status === "ACTIVE") status = "WAITING_ASSIGNMENT";
  const title = optStr(form, "title");
  await db.mentoring.update({
    where: { id: m.id },
    data: { tutorId, title, notes: optStr(form, "notes"), status },
  });
  if (tutorId && tutorId !== m.tutorId) {
    await notifyUser(tutorId, { title: "Klien baru ditugaskan", body: title ?? "Lihat detail bimbingan.", link: path, email: true });
    await notifyUser(m.studentId, { title: "Tutor bimbingan sudah dipilih", link: path, email: true });
  }
  back(path, "Bimbingan diperbarui.");
}

export async function verifySessionAction(form: FormData) {
  const { user, m, path } = await load(form);
  if (user.role !== "ADMIN") back(path, "Hanya admin.", "error");
  const session = await db.mentoringSession.findFirst({ where: { id: str(form, "sessionId"), mentoringId: m.id } });
  if (!session) back(path, "Sesi tidak ditemukan.", "error");
  if (session.payrollId) back(path, "Sesi sudah masuk payroll; tidak dapat diubah.", "error");

  if (session.verifiedAt) {
    await db.mentoringSession.update({ where: { id: session.id }, data: { verifiedAt: null, fee: null } });
    back(path, "Verifikasi dibatalkan.");
  }
  if (session.status !== "DONE") back(path, "Hanya sesi berstatus Selesai yang dapat diverifikasi.", "error");
  if (!m.tutorId) back(path, "Bimbingan belum memiliki tutor.", "error");
  const profile = await db.tutorProfile.findUnique({ where: { userId: m.tutorId } });
  const fee = optInt(form, "fee") ?? profile?.rate ?? null;
  if (fee === null) back(path, "Isi fee sesi atau tetapkan rate di profil tutor.", "error");
  await db.mentoringSession.update({ where: { id: session.id }, data: { verifiedAt: new Date(), fee } });
  back(path, "Sesi diverifikasi dan masuk hitungan pendapatan tutor.");
}
