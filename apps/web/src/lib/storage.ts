import "server-only";
import { mkdir, writeFile, readFile, unlink } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { db } from "./db";

// Penyimpanan berkas lokal di folder storage/ (di luar public/, jadi hanya bisa
// dibuka lewat /api/berkas/[id] yang memeriksa hak akses).
// Saat deploy, ganti implementasi ini ke object storage (Supabase Storage / R2 / S3).

const ROOT = path.join(process.cwd(), "storage");
const ALLOWED = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
]);

export class UploadError extends Error {}

export async function saveUpload(file: File | null, uploadedById: string) {
  if (!file || file.size === 0) return null;
  const maxMb = Number(process.env.MAX_UPLOAD_MB || 50);
  if (file.size > maxMb * 1024 * 1024) throw new UploadError(`Ukuran berkas melebihi ${maxMb} MB.`);
  if (!ALLOWED.has(file.type)) throw new UploadError("Format berkas harus PDF atau gambar (PNG/JPG/WEBP).");

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(-80);
  const rel = path.join("uploads", `${randomUUID()}-${safeName}`);
  await mkdir(path.join(ROOT, "uploads"), { recursive: true });
  await writeFile(path.join(ROOT, rel), Buffer.from(await file.arrayBuffer()));

  return db.fileAsset.create({
    data: {
      storagePath: rel.replaceAll("\\", "/"),
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      uploadedById,
    },
  });
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
