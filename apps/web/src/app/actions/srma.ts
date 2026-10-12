"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requirePermission, requireUser } from "@/lib/auth";
import { requireToolkit, getSrmaConfig } from "@/lib/srma";
import { TOOL_IDS, type ToolId, type LibraryEntry } from "@/lib/srma-config";
import { back, str, bool } from "@/lib/flash";
import { canAccessCategory } from "@/lib/access";
import { canAccessSrmaTopic } from "@/lib/srma-progression";

export async function saveSrmaConfig(form: FormData) {
  await requirePermission("admin.content");
  const config = await getSrmaConfig();
  config.tools = config.tools.map(t => ({ ...t, title: str(form, `${t.id}.title`).slice(0, 150), description: str(form, `${t.id}.description`).slice(0, 1000), help: str(form, `${t.id}.help`).slice(0, 8000), published: bool(form, `${t.id}.published`) }));
  if (config.tools.some(t => !t.title)) back("/admin/srma", "Judul alat wajib diisi.", "error");
  config.questions = str(form, "questions").split("\n").map(s => s.trim()).filter(Boolean).slice(0, 20);
  if (!config.questions.length) back("/admin/srma", "Isi setidaknya satu pertanyaan Idea Board.", "error");
  for (const key of ["faq", "templates"] as const) {
    try {
      const entries: unknown = JSON.parse(str(form, key));
      if (!Array.isArray(entries) || entries.length > 100 || entries.some(e => !e || typeof e.title !== "string" || typeof e.body !== "string" || typeof e.group !== "string" || typeof e.url !== "string" || (e.url && !/^https:\/\//i.test(e.url)))) throw Error();
      config[key] = entries as LibraryEntry[];
    } catch { back("/admin/srma", `Format ${key} tidak valid. Gunakan daftar JSON dengan title, body, group, url; tautan harus HTTPS.`, "error"); }
  }
  if (JSON.stringify(config).length > 250000) back("/admin/srma", "Konten terlalu besar.", "error");
  await db.setting.upsert({ where: { key: "srma.config" }, create: { key: "srma.config", value: JSON.stringify(config) }, update: { value: JSON.stringify(config) } });
  revalidatePath("/", "layout");
  back("/admin/srma", "Konten Toolkit disimpan.");
}

// Namespace ditentukan server dari sesi, tidak menerima ID pemilik dari browser.
export async function saveResearchProject(input: { id: string; tool: ToolId; title: string; data: string; revision: string | null }) {
  const user = await requireUser();
  await requireToolkit(user);
  if (!TOOL_IDS.includes(input.tool) || !["idea", "screening"].includes(input.tool) || !/^[a-zA-Z0-9-]{1,60}$/.test(input.id) || !input.title.trim() || input.title.length > 150 || input.data.length > 2000000) throw Error("Data proyek tidak valid atau terlalu besar.");
  const config = await getSrmaConfig();
  if (!config.tools.some(t => t.id === input.tool && t.published)) throw Error("Alat ini sedang disembunyikan.");
  JSON.parse(input.data);
  const prefix = `srma.project.${user.id}.${input.tool}.`;
  const key = prefix + input.id;
  const value = JSON.stringify({ id: input.id, tool: input.tool, title: input.title.trim(), data: input.data, updatedAt: new Date().toISOString() });
  await db.$transaction(async tx => {
    if (input.revision === null) {
      if (await tx.setting.count({ where: { key: { startsWith: prefix } } }) >= 5) throw Error("Maksimal lima proyek per alat.");
      await tx.setting.create({ data: { key, value } });
    } else {
      const result = await tx.setting.updateMany({ where: { key, value: input.revision }, data: { value } });
      if (!result.count) throw Error("Proyek berubah di tab lain. Muat ulang sebelum menyimpan.");
    }
  });
  return value;
}

export async function saveLessonNote(itemId: string, body: string) {
  const user = await requireUser();
  const item = await db.item.findUnique({ where: { id: itemId }, include: { topic: { include: { category: { include: { track: true } } } } } });
  if (!item || !item.published || !item.topic.published || !item.topic.category.published || !item.topic.category.track.published || (!item.isFree && !(await canAccessCategory(user, item.topic.categoryId)))) throw Error("Materi tidak dapat diakses.");
  if (body.length > 20000) throw Error("Catatan maksimal 20.000 karakter.");
  if (!(await canAccessSrmaTopic(user, item.topicId, item.topic.categoryId))) throw Error("Lulus kuis kelompok sebelumnya terlebih dahulu.");
  const key = `srma.note.${user.id}.${itemId}`;
  await db.setting.upsert({ where: { key }, create: { key, value: body }, update: { value: body } });
}

export async function reportSrmaLesson(itemId: string, body: string) {
  const user = await requireUser();
  const item = await db.item.findUnique({ where: { id: itemId }, include: { topic: { include: { category: { include: { track: true } } } } } });
  if (!item || !item.published || !item.topic.published || !item.topic.category.published || !item.topic.category.track.published || (!item.isFree && !(await canAccessCategory(user, item.topic.categoryId)))) throw Error("Materi tidak dapat diakses.");
  if (body.trim().length < 5 || body.length > 3000) throw Error("Laporan harus berisi 5 sampai 3.000 karakter.");
  if (!(await canAccessSrmaTopic(user, item.topicId, item.topic.categoryId))) throw Error("Lulus kuis kelompok sebelumnya terlebih dahulu.");
  const day = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const key = `srma.report.${user.id}.${itemId}.${day}`;
  const value = JSON.stringify({ itemId, title: item.title, body: body.trim(), date: day, resolved: false });
  await db.setting.upsert({ where: { key }, create: { key, value }, update: { value } });
  revalidatePath("/admin/srma");
}

export async function resolveSrmaReport(form: FormData) {
  await requirePermission("admin.content");
  const key = str(form, "key");
  if (!key.startsWith("srma.report.")) throw Error("Laporan tidak valid.");
  const row = await db.setting.findUnique({ where: { key } });
  if (row) await db.setting.update({ where: { key }, data: { value: JSON.stringify({ ...JSON.parse(row.value), resolved: true }) } });
  revalidatePath("/admin/srma");
}
