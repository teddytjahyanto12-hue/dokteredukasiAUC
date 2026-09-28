"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { deleteStoredFile, isPresentation, readStoredFile, saveBuffer, saveUpload, UploadError } from "@/lib/storage";
import { convertToPdf } from "@/lib/convert";
import { isSlideEmbeddable, isVideoEmbeddable } from "@/lib/embed";
import { back, bool, optInt, optStr, str } from "@/lib/flash";
import { DISPLAY_TYPES, ITEM_TYPES } from "@/lib/constants";
import { slugify } from "@/lib/format";

const admin = () => requireUser(["ADMIN"]);

function refresh() {
  revalidatePath("/", "layout");
}

async function removeFileIfUnused(file: { id: string; storagePath: string }) {
  if (await db.item.count({ where: { OR: [{ fileId: file.id }, { originalFileId: file.id }] } })) return;
  await db.fileAsset.delete({ where: { id: file.id } });
  await deleteStoredFile(file.storagePath);
}

// ---------- Jalur (Track) ----------

export async function saveTrackAction(form: FormData) {
  await admin();
  const id = str(form, "id");
  const title = str(form, "title");
  if (title.length < 2) back("/admin/konten", "Judul jalur minimal 2 karakter.", "error");
  await db.track.update({
    where: { id },
    data: {
      title,
      description: optStr(form, "description"),
      hasMentoring: bool(form, "hasMentoring"),
      published: bool(form, "published"),
      order: optInt(form, "order") ?? 0,
    },
  });
  refresh();
  back("/admin/konten", "Jalur disimpan.");
}

// ---------- Kategori ----------

export async function saveCategoryAction(form: FormData) {
  await admin();
  const id = optStr(form, "id");
  const trackId = str(form, "trackId");
  const title = str(form, "title");
  const fail = id ? `/admin/konten/kategori/${id}` : "/admin/konten";
  if (title.length < 2) back(fail, "Judul kategori minimal 2 karakter.", "error");
  const displayType = str(form, "displayType");
  if (!(DISPLAY_TYPES as readonly string[]).includes(displayType)) back(fail, "Tipe tampilan tidak valid.", "error");
  const slug = slugify(str(form, "slug") || title);
  const clash = await db.category.findFirst({ where: { trackId, slug, ...(id ? { NOT: { id } } : {}) } });
  if (clash) back(fail, "Slug kategori sudah dipakai di jalur ini.", "error");

  const data = {
    title,
    slug,
    trackId,
    displayType,
    description: optStr(form, "description"),
    published: id ? bool(form, "published") : true,
    order: optInt(form, "order") ?? 0,
  };
  const category = id ? await db.category.update({ where: { id }, data }) : await db.category.create({ data });
  refresh();
  back(`/admin/konten/kategori/${category.id}`, "Kategori disimpan.");
}

export async function deleteCategoryAction(form: FormData) {
  await admin();
  const id = str(form, "id");
  const topics = await db.topic.count({ where: { categoryId: id } });
  if (topics > 0) back(`/admin/konten/kategori/${id}`, "Hapus semua topik di kategori ini terlebih dahulu.", "error");
  await db.category.delete({ where: { id } });
  refresh();
  back("/admin/konten", "Kategori dihapus.");
}

// ---------- Topik ----------

export async function saveTopicAction(form: FormData) {
  await admin();
  const id = optStr(form, "id");
  const categoryId = str(form, "categoryId");
  const title = str(form, "title");
  if (title.length < 2) back(id ? `/admin/konten/topik/${id}` : `/admin/konten/kategori/${categoryId}`, "Judul topik minimal 2 karakter.", "error");
  const data = {
    title,
    categoryId,
    description: optStr(form, "description"),
    published: id ? bool(form, "published") : true,
    order: optInt(form, "order") ?? 0,
  };
  const topic = id ? await db.topic.update({ where: { id }, data }) : await db.topic.create({ data });
  refresh();
  if (id) back(`/admin/konten/topik/${topic.id}`, "Topik disimpan.");
  redirect(`/admin/konten/topik/${topic.id}?pesan=${encodeURIComponent("Topik dibuat. Tambahkan materi di bawah.")}`);
}

export async function deleteTopicAction(form: FormData) {
  await admin();
  const id = str(form, "id");
  const topic = await db.topic.findUnique({ where: { id }, include: { items: { include: { file: true, originalFile: true } } } });
  if (!topic) back("/admin/konten", "Topik tidak ditemukan.", "error");
  await db.topic.delete({ where: { id } });
  for (const item of topic.items) {
    if (item.file) await removeFileIfUnused(item.file);
    if (item.originalFile) await removeFileIfUnused(item.originalFile);
  }
  refresh();
  back(`/admin/konten/kategori/${topic.categoryId}`, "Topik dan seluruh materinya dihapus.");
}

// ---------- Item materi ----------

export async function saveItemAction(form: FormData) {
  const me = await admin();
  const id = optStr(form, "id");
  const topicId = str(form, "topicId");
  const path = `/admin/konten/topik/${topicId}`;
  const type = str(form, "type");
  const title = str(form, "title");
  if (!(ITEM_TYPES as readonly string[]).includes(type)) back(path, "Tipe materi tidak valid.", "error");
  if (title.length < 2) back(path, "Judul materi minimal 2 karakter.", "error");
  const url = optStr(form, "url");
  if (url && !/^https?:\/\//.test(url)) back(path, "Tautan harus diawali http(s)://", "error");

  const existing = id ? await db.item.findUnique({ where: { id }, include: { file: true, originalFile: true } }) : null;
  const incoming = form.get("file");
  const upload = incoming instanceof File && incoming.size > 0 ? incoming : null;
  const keepsOldFile = !!existing?.fileId && !bool(form, "removeFile");

  if (type === "LINK" && !url) back(path, "Materi bertipe tautan wajib diisi URL-nya.", "error");
  if (type === "VIDEO") {
    if (!url) back(path, "Isi tautan video (YouTube, Google Drive, Vimeo, atau Bunny Stream).", "error");
    if (!isVideoEmbeddable(url)) {
      back(path, "Tautan video tidak dikenali. Pakai tautan YouTube, Google Drive (file/d/…), Vimeo, Bunny Stream, atau file .mp4.", "error");
    }
  }
  if ((type === "SLIDES" || type === "PDF") && !upload && !keepsOldFile && !url) {
    back(path, "Unggah PPTX/PDF atau isi tautan Google Slides / Google Drive.", "error");
  }
  if ((type === "SLIDES" || type === "PDF") && url && !upload && !keepsOldFile && !isSlideEmbeddable(url)) {
    back(path, "Tautan belum bisa ditampilkan di website. Pakai tautan Google Slides, Google Drive (file/d/…), OneDrive, atau file .pdf.", "error");
  }
  if (type === "TEXT" && !optStr(form, "body")) back(path, "Isi teks materi.", "error");
  if (upload && isPresentation(upload) && type !== "SLIDES" && type !== "PDF") {
    back(path, "File PowerPoint hanya untuk tipe Slide atau PDF.", "error");
  }

  let fileId = keepsOldFile ? existing!.fileId : null;
  let originalFileId = keepsOldFile ? existing!.originalFileId : null;
  try {
    if (upload && isPresentation(upload)) {
      // PPTX disimpan apa adanya, lalu dikonversi ke PDF agar tampil di browser.
      const original = await saveUpload(upload, me.id, { allowPresentation: true });
      let pdf: Buffer;
      try {
        pdf = await convertToPdf(await readStoredFile(original!.storagePath), upload.name);
      } catch (e) {
        await removeFileIfUnused(original!);
        const missing = e instanceof Error && e.message === "LIBREOFFICE_MISSING";
        back(
          path,
          missing
            ? "Server belum bisa mengubah PPTX ke tampilan slide (LibreOffice belum terpasang). Sementara unggah PDF (PowerPoint → Save As → PDF) atau tempel tautan Google Slides/Drive."
            : "Gagal mengonversi PPTX. Coba simpan ulang file di PowerPoint atau unggah versi PDF.",
          "error",
        );
      }
      const converted = await saveBuffer(pdf, upload.name.replace(/\.pptx?$/i, "") + ".pdf", "application/pdf", me.id);
      fileId = converted.id;
      originalFileId = original!.id;
    } else if (upload) {
      const saved = await saveUpload(upload, me.id);
      fileId = saved!.id;
      originalFileId = null;
    }
  } catch (e) {
    if (e instanceof UploadError) back(path, e.message, "error");
    throw e;
  }

  const data = {
    topicId,
    type,
    title,
    url,
    fileId,
    originalFileId,
    description: optStr(form, "description"),
    body: optStr(form, "body"),
    sourceNote: optStr(form, "sourceNote"),
    isFree: bool(form, "isFree"),
    published: bool(form, "published"),
    order: optInt(form, "order") ?? 0,
  };
  if (existing) await db.item.update({ where: { id: existing.id }, data });
  else await db.item.create({ data });
  if (existing?.file && existing.file.id !== fileId) await removeFileIfUnused(existing.file);
  if (existing?.originalFile && existing.originalFile.id !== originalFileId) await removeFileIfUnused(existing.originalFile);
  refresh();
  back(path, existing ? "Materi diperbarui." : "Materi ditambahkan.");
}

export async function deleteItemAction(form: FormData) {
  await admin();
  const id = str(form, "id");
  const item = await db.item.findUnique({ where: { id }, include: { file: true, originalFile: true } });
  if (!item) back("/admin/konten", "Materi tidak ditemukan.", "error");
  await db.item.delete({ where: { id } });
  if (item.file) await removeFileIfUnused(item.file);
  if (item.originalFile) await removeFileIfUnused(item.originalFile);
  refresh();
  back(`/admin/konten/topik/${item.topicId}`, "Materi dihapus.");
}

// ---------- Quiz ----------

export async function saveQuizAction(form: FormData) {
  await admin();
  const topicId = str(form, "topicId");
  const path = `/admin/konten/topik/${topicId}`;
  const title = str(form, "title") || "Quiz";
  const passingScore = optInt(form, "passingScore") ?? 70;
  if (passingScore < 0 || passingScore > 100) back(path, "Nilai lulus harus 0–100.", "error");
  await db.quiz.upsert({
    where: { topicId },
    update: { title, passingScore, published: bool(form, "published") },
    create: { topicId, title, passingScore, published: true },
  });
  back(path, "Quiz disimpan.");
}

export async function deleteQuizAction(form: FormData) {
  await admin();
  const topicId = str(form, "topicId");
  await db.quiz.deleteMany({ where: { topicId } });
  back(`/admin/konten/topik/${topicId}`, "Quiz dihapus.");
}

export async function saveQuestionAction(form: FormData) {
  await admin();
  const topicId = str(form, "topicId");
  const path = `/admin/konten/topik/${topicId}`;
  const quiz = await db.quiz.findUnique({ where: { topicId } });
  if (!quiz) back(path, "Buat quiz terlebih dahulu.", "error");
  const text = str(form, "text");
  if (!text) back(path, "Teks soal wajib diisi.", "error");
  const options = [0, 1, 2, 3, 4]
    .map((i) => ({ text: str(form, `option_${i}`), isCorrect: str(form, "correct") === String(i), order: i }))
    .filter((o) => o.text);
  if (options.length < 2) back(path, "Minimal 2 pilihan jawaban.", "error");
  if (!options.some((o) => o.isCorrect)) back(path, "Tandai satu jawaban benar (yang terisi).", "error");

  const questionId = optStr(form, "questionId");
  const data = { text, explanation: optStr(form, "explanation"), order: optInt(form, "order") ?? 0 };
  if (questionId) {
    const q = await db.question.findFirst({ where: { id: questionId, quizId: quiz.id } });
    if (!q) back(path, "Soal tidak ditemukan.", "error");
    // Jawaban lama tetap menunjuk opsi lama; opsi diganti agar kunci jawaban baru berlaku.
    await db.$transaction([
      db.question.update({ where: { id: q.id }, data }),
      db.questionOption.deleteMany({ where: { questionId: q.id } }),
      db.questionOption.createMany({ data: options.map((o) => ({ ...o, questionId: q.id })) }),
    ]);
  } else {
    await db.question.create({ data: { ...data, quizId: quiz.id, options: { create: options } } });
  }
  back(path, questionId ? "Soal diperbarui." : "Soal ditambahkan.");
}

export async function deleteQuestionAction(form: FormData) {
  await admin();
  const topicId = str(form, "topicId");
  await db.question.deleteMany({ where: { id: str(form, "questionId"), quiz: { topicId } } });
  back(`/admin/konten/topik/${topicId}`, "Soal dihapus.");
}
