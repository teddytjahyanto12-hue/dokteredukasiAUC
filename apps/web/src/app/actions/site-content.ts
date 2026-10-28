"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { saveUpload, UploadError } from "@/lib/storage";
import { back, bool, optInt, optStr, str } from "@/lib/flash";
import { parseWibDateTime, slugify } from "@/lib/format";

// ---------- Tinjauan Medis: dikelola admin dengan akses "Konten materi & quiz" ----------

const REVIEW = "/admin/tinjauan-medis";

export async function saveMedicalReviewAction(form: FormData) {
  const me = await requirePermission("admin.content");
  const id = optStr(form, "id");
  const backTo = id ? `${REVIEW}/${id}` : `${REVIEW}/baru`;
  const title = str(form, "title");
  if (title.length < 5) back(backTo, "Judul minimal 5 karakter.", "error");
  const slug = slugify(str(form, "slug") || title);
  if (!slug) back(backTo, "Slug tidak valid.", "error");
  const clash = await db.medicalReview.findUnique({ where: { slug } });
  if (clash && clash.id !== id) back(backTo, "Slug sudah dipakai artikel lain. Ubah judul atau slug.", "error");
  const categoryId = optStr(form, "categoryId");
  if (categoryId && !(await db.medicalReviewCategory.findUnique({ where: { id: categoryId } }))) back(backTo, "Kategori tidak ditemukan.", "error");

  // Bagian isi: pasangan judul + isi sesuai urutan di formulir; baris kosong dibuang.
  const titles = form.getAll("sectionTitle").map((v) => String(v).trim());
  const bodies = form.getAll("sectionBody").map((v) => String(v).trim());
  const sections = titles.map((t, i) => ({ title: t, body: bodies[i] ?? "" })).filter((s) => s.title || s.body);

  const before = id ? await db.medicalReview.findUnique({ where: { id } }) : null;
  let coverFileId = before?.coverFileId ?? null;
  try {
    const cover = await saveUpload(form.get("cover") as File | null, me.id, { imageOnly: true, isPublic: true });
    if (cover) coverFileId = cover.id;
  } catch (e) {
    back(backTo, e instanceof UploadError ? e.message.replace("Poster", "Gambar ilustrasi") : "Gambar ilustrasi gagal diunggah.", "error");
  }
  if (bool(form, "removeCover")) coverFileId = null;

  const published = bool(form, "published");
  const data = {
    title,
    slug,
    categoryId,
    coverFileId,
    author: optStr(form, "author"),
    abstract: optStr(form, "abstract"),
    sections: JSON.stringify(sections),
    references: optStr(form, "references"),
    published,
    publishedAt: parseWibDateTime(str(form, "publishedAt")) ?? (published ? (before?.publishedAt ?? new Date()) : (before?.publishedAt ?? null)),
  };
  const saved = id ? await db.medicalReview.update({ where: { id }, data }) : await db.medicalReview.create({ data });
  await logAudit({ id: me.id, name: me.name }, id ? "MEDICAL_REVIEW_UPDATED" : "MEDICAL_REVIEW_CREATED", "MedicalReview", saved.id, `Tinjauan Medis "${title}" ${id ? "diubah" : "dibuat"}${published ? " (terbit)" : " (draf)"}`);
  revalidatePath("/tinjauan-medis");
  revalidatePath(`/tinjauan-medis/${saved.slug}`);
  redirect(`${REVIEW}/${saved.id}?pesan=${encodeURIComponent(published ? "Artikel disimpan dan terbit." : "Draf disimpan (belum tampil untuk pengunjung).")}`);
}

export async function deleteMedicalReviewAction(form: FormData) {
  const me = await requirePermission("admin.content");
  const id = str(form, "id");
  const r = await db.medicalReview.findUnique({ where: { id } });
  if (!r) back(REVIEW, "Artikel tidak ditemukan.", "error");
  await db.medicalReview.delete({ where: { id } });
  await logAudit({ id: me.id, name: me.name }, "MEDICAL_REVIEW_DELETED", "MedicalReview", id, `Tinjauan Medis "${r.title}" dihapus`);
  revalidatePath("/tinjauan-medis");
  back(REVIEW, "Artikel dihapus.");
}

// ---------- Kategori Tinjauan Medis (tab filter di atas daftar artikel) ----------

export async function saveMedicalReviewCategoryAction(form: FormData) {
  const me = await requirePermission("admin.content");
  const id = optStr(form, "id");
  const name = str(form, "name");
  if (name.length < 2) back(REVIEW, "Nama kategori minimal 2 karakter.", "error");
  const slug = slugify(name);
  const clash = await db.medicalReviewCategory.findUnique({ where: { slug } });
  if (clash && clash.id !== id) back(REVIEW, `Kategori "${name}" sudah ada.`, "error");
  const order = optInt(form, "order") ?? (await db.medicalReviewCategory.count()) + 1;
  const saved = id
    ? await db.medicalReviewCategory.update({ where: { id }, data: { name, slug, order } })
    : await db.medicalReviewCategory.create({ data: { name, slug, order } });
  await logAudit({ id: me.id, name: me.name }, id ? "MEDICAL_REVIEW_CATEGORY_UPDATED" : "MEDICAL_REVIEW_CATEGORY_CREATED", "MedicalReviewCategory", saved.id, `Kategori Tinjauan Medis "${name}" ${id ? "diubah" : "dibuat"}`);
  revalidatePath("/tinjauan-medis", "layout");
  back(REVIEW, id ? "Kategori disimpan." : "Kategori ditambahkan.");
}

export async function deleteMedicalReviewCategoryAction(form: FormData) {
  const me = await requirePermission("admin.content");
  const id = str(form, "id");
  const c = await db.medicalReviewCategory.findUnique({ where: { id }, include: { _count: { select: { reviews: true } } } });
  if (!c) back(REVIEW, "Kategori tidak ditemukan.", "error");
  await db.medicalReviewCategory.delete({ where: { id } });
  await logAudit({ id: me.id, name: me.name }, "MEDICAL_REVIEW_CATEGORY_DELETED", "MedicalReviewCategory", id, `Kategori Tinjauan Medis "${c.name}" dihapus (${c._count.reviews} artikel menjadi tanpa kategori)`);
  revalidatePath("/tinjauan-medis", "layout");
  back(REVIEW, `Kategori dihapus. ${c._count.reviews} artikel kini tanpa kategori (artikel tidak terhapus).`);
}
