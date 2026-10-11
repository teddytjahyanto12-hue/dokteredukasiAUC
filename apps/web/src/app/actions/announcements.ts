"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { back, bool, optStr, str } from "@/lib/flash";
import { parseWibDateTime } from "@/lib/format";

// Pengumuman banner beranda: dikelola owner dan admin dengan akses "Pengaturan situs".
const PATH = "/admin/pengumuman";

export async function saveAnnouncementAction(form: FormData) {
  const me = await requirePermission("admin.settings");
  const id = optStr(form, "id");
  const title = str(form, "title");
  if (title.length < 3) back(PATH, "Judul pengumuman minimal 3 karakter.", "error");
  const linkUrl = optStr(form, "linkUrl");
  if (linkUrl && !/^(https?:\/\/|\/)/.test(linkUrl)) back(PATH, "Tautan harus diawali https:// atau / (halaman di website ini).", "error");
  const startsAt = parseWibDateTime(str(form, "startsAt"));
  const endsAt = parseWibDateTime(str(form, "endsAt"));
  if (startsAt && endsAt && endsAt <= startsAt) back(PATH, "Waktu berakhir harus setelah waktu mulai.", "error");

  const data = {
    title,
    body: optStr(form, "body"),
    linkUrl,
    linkLabel: optStr(form, "linkLabel"),
    tone: str(form, "tone") === "PENTING" ? "PENTING" : "INFO",
    active: bool(form, "active"),
    startsAt,
    endsAt,
  };
  const saved = id ? await db.announcement.update({ where: { id }, data }) : await db.announcement.create({ data: { ...data, createdById: me.id } });
  await logAudit({ id: me.id, name: me.name }, id ? "ANNOUNCEMENT_UPDATED" : "ANNOUNCEMENT_CREATED", "Announcement", saved.id, `Pengumuman "${title}" ${id ? "diubah" : "dibuat"}`);
  revalidatePath("/");
  back(PATH, id ? "Pengumuman disimpan." : "Pengumuman dibuat dan tampil di beranda sesuai jadwal.");
}

export async function deleteAnnouncementAction(form: FormData) {
  const me = await requirePermission("admin.settings");
  const id = str(form, "id");
  const a = await db.announcement.findUnique({ where: { id } });
  if (!a) back(PATH, "Pengumuman tidak ditemukan.", "error");
  await db.announcement.delete({ where: { id } });
  await logAudit({ id: me.id, name: me.name }, "ANNOUNCEMENT_DELETED", "Announcement", id, `Pengumuman "${a.title}" dihapus`);
  revalidatePath("/");
  back(PATH, "Pengumuman dihapus.");
}
