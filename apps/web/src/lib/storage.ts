import "server-only";
import { mkdir, writeFile, readFile, unlink } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { db } from "./db";

// Penyimpanan berkas lokal di folder storage/ (di luar public/, jadi hanya bisa
// dibuka lewat /api/berkas/[id] yang memeriksa hak akses).
// Saat deploy, ganti implementasi ini ke object storage (Supabase Storage / R2 / S3).

const ROOT = process.env.DEA_STORAGE_DIR || path.join(process.cwd(), "storage");

const PPTX = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
const PPT = "application/vnd.ms-powerpoint";
const DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const BY_EXT: Record<string, string> = {
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".pptx": PPTX,
  ".ppt": PPT,
  ".docx": DOCX,
  ".xlsx": XLSX,
};
const DOCUMENT_TYPES = new Set(["application/pdf", "image/png", "image/jpeg", "image/webp"]);

export class UploadError extends Error {}

// Browser kadang mengirim PPTX sebagai type kosong atau application/octet-stream;
// dalam kasus itu tentukan dari ekstensi.
export function detectMime(file: File) {
  const byExt = BY_EXT[path.extname(file.name).toLowerCase()] ?? "";
  if (!file.type || file.type === "application/octet-stream") return byExt;
  return file.type;
}

export function isPresentation(file: File) {
  const mime = detectMime(file);
  return mime === PPTX || mime === PPT;
}

function checkSize(size: number) {
  const maxMb = Number(process.env.MAX_UPLOAD_MB || 50);
  if (size > maxMb * 1024 * 1024) throw new UploadError(`Ukuran berkas melebihi ${maxMb} MB.`);
}

export async function saveBuffer(data: Buffer, originalName: string, mimeType: string, uploadedById: string, isPublic = false) {
  checkSize(data.length);
  const safeName = originalName.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(-80);
  const rel = path.join("uploads", `${randomUUID()}-${safeName}`);
  await mkdir(path.join(ROOT, "uploads"), { recursive: true });
  await writeFile(path.join(ROOT, rel), data);
  return db.fileAsset.create({
    data: { storagePath: rel.replaceAll("\\", "/"), originalName, mimeType, size: data.length, uploadedById, isPublic },
  });
}

// Unggahan dokumen umum: PDF atau gambar (bukti Zoom, bukti transfer, materi PDF).
export async function saveUpload(
  file: File | null,
  uploadedById: string,
  opts: { allowPresentation?: boolean; allowOffice?: boolean; imageOnly?: boolean; isPublic?: boolean } = {},
) {
  if (!file || file.size === 0) return null;
  checkSize(file.size);
  const mime = detectMime(file);
  if (opts.imageOnly) {
    if (!mime.startsWith("image/") || !DOCUMENT_TYPES.has(mime)) throw new UploadError("Poster harus berupa gambar PNG, JPG, atau WEBP.");
    return saveBuffer(Buffer.from(await file.arrayBuffer()), file.name, mime, uploadedById, opts.isPublic);
  }
  const ok = DOCUMENT_TYPES.has(mime) || (opts.allowPresentation && (mime === PPTX || mime === PPT)) || (opts.allowOffice && (mime === DOCX || mime === XLSX));
  if (!ok) {
    throw new UploadError(
      opts.allowPresentation
        ? "Format berkas harus PDF, PPTX/PPT, atau gambar (PNG/JPG/WEBP)."
        : opts.allowOffice
          ? "Format berkas harus gambar (PNG/JPG/WEBP), PDF, DOCX, atau XLSX."
          : "Format berkas harus PDF atau gambar (PNG/JPG/WEBP).",
    );
  }
  return saveBuffer(Buffer.from(await file.arrayBuffer()), file.name, mime, uploadedById, opts.isPublic);
}

export async function readStoredFile(storagePath: string) {
  const full = path.join(ROOT, storagePath);
  if (!full.startsWith(ROOT)) throw new Error("Path tidak valid");
  return readFile(full);
}

export async function deleteStoredFile(storagePath: string) {
  try {
    await unlink(path.join(ROOT, storagePath));
  } catch {
    // berkas sudah tidak ada
  }
}
