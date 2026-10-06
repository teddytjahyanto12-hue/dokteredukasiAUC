"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { back, bool, optInt, optStr, str } from "@/lib/flash";
import { slugify } from "@/lib/format";

// Jalur belajar, testimoni, dan FAQ halaman penawaran — dikelola admin dengan akses Konten materi.
const admin = () => requirePermission("admin.content");
const refresh = () => revalidatePath("/", "layout");

// ---------- Jalur belajar ----------

export async function savePathAction(form: FormData) {
  await admin();
  const id = optStr(form, "id");
  const fail = id ? `/admin/jalur/${id}` : "/admin/jalur";
  const title = str(form, "title");
  if (title.length < 3) back(fail, "Judul jalur minimal 3 karakter.", "error");
  const slug = slugify(str(form, "slug") || title);
  if (await db.learningPath.findFirst({ where: { slug, ...(id ? { NOT: { id } } : {}) } })) back(fail, "Alamat (slug) sudah dipakai jalur lain.", "error");
  const data = {
    title,
    slug,
    summary: optStr(form, "summary"),
    description: optStr(form, "description"),
    order: optInt(form, "order") ?? 0,
    published: id ? bool(form, "published") : false,
  };
  const path = id ? await db.learningPath.update({ where: { id }, data }) : await db.learningPath.create({ data });
  refresh();
  back(`/admin/jalur/${path.id}`, id ? "Jalur disimpan." : "Jalur dibuat. Tambahkan kelas, lalu centang “Tampilkan di website”.");
}

export async function deletePathAction(form: FormData) {
  await admin();
  await db.learningPath.delete({ where: { id: str(form, "id") } });
  refresh();
  back("/admin/jalur", "Jalur dihapus.");
}

export async function addPathStepAction(form: FormData) {
  await admin();
  const pathId = str(form, "pathId");
  const categoryId = str(form, "categoryId");
  if (!categoryId) back(`/admin/jalur/${pathId}`, "Pilih kelas.", "error");
  if (await db.learningPathStep.findUnique({ where: { pathId_categoryId: { pathId, categoryId } } })) back(`/admin/jalur/${pathId}`, "Kelas itu sudah ada di jalur ini.", "error");
  const count = await db.learningPathStep.count({ where: { pathId } });
  await db.learningPathStep.create({ data: { pathId, categoryId, order: count + 1, note: optStr(form, "note") } });
  refresh();
  back(`/admin/jalur/${pathId}`, "Kelas ditambahkan ke jalur.");
}

export async function savePathStepAction(form: FormData) {
  await admin();
  const step = await db.learningPathStep.update({
    where: { id: str(form, "id") },
    data: { order: optInt(form, "order") ?? 0, note: optStr(form, "note") },
  });
  refresh();
  back(`/admin/jalur/${step.pathId}`, "Urutan disimpan.");
}

export async function deletePathStepAction(form: FormData) {
  await admin();
  const step = await db.learningPathStep.delete({ where: { id: str(form, "id") } });
  refresh();
  back(`/admin/jalur/${step.pathId}`, "Kelas dikeluarkan dari jalur.");
}

// ---------- Testimoni ----------

export async function saveTestimonialAction(form: FormData) {
  await admin();
  const id = optStr(form, "id");
  const name = str(form, "name");
  const quote = str(form, "quote");
  if (!name || quote.length < 10) back("/admin/penawaran", "Isi nama dan testimoni (minimal 10 karakter).", "error");
  const count = await db.testimonial.count();
  const data = { name, quote, role: optStr(form, "role"), order: optInt(form, "order") ?? count + 1, published: id ? bool(form, "published") : true };
  if (id) await db.testimonial.update({ where: { id }, data });
  else await db.testimonial.create({ data });
  refresh();
  back("/admin/penawaran", "Testimoni disimpan.");
}

export async function deleteTestimonialAction(form: FormData) {
  await admin();
  await db.testimonial.delete({ where: { id: str(form, "id") } });
  refresh();
  back("/admin/penawaran", "Testimoni dihapus.");
}

// ---------- FAQ ----------

export async function saveFaqAction(form: FormData) {
  await admin();
  const id = optStr(form, "id");
  const question = str(form, "question");
  const answer = str(form, "answer");
  if (question.length < 5 || answer.length < 5) back("/admin/penawaran", "Isi pertanyaan dan jawaban.", "error");
  const count = await db.faq.count();
  const data = { question, answer, order: optInt(form, "order") ?? count + 1, published: id ? bool(form, "published") : true };
  if (id) await db.faq.update({ where: { id }, data });
  else await db.faq.create({ data });
  refresh();
  back("/admin/penawaran", "Pertanyaan disimpan.");
}

export async function deleteFaqAction(form: FormData) {
  await admin();
  await db.faq.delete({ where: { id: str(form, "id") } });
  refresh();
  back("/admin/penawaran", "Pertanyaan dihapus.");
}
