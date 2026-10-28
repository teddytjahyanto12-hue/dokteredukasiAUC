"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { back, bool, optStr, str } from "@/lib/flash";
import { parseWibDateTime, slugify } from "@/lib/format";

// ---------- Tinjauan Medis: dikelola admin dengan akses "Konten materi & quiz" ----------

const REVIEW = "/admin/tinjauan-medis";
const REVIEW_TEXT = ["category", "author", "abstract", "introduction", "pathophysiology", "diagnosis", "management", "conclusion", "references"] as const;

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
  const published = bool(form, "published");
  const before = id ? await db.medicalReview.findUnique({ where: { id } }) : null;
  const data = {
    title,
    slug,
    ...Object.fromEntries(REVIEW_TEXT.map((k) => [k, optStr(form, k)])),
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
