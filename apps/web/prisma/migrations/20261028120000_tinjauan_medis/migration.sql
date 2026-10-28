-- CreateTable
CREATE TABLE "MedicalReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "category" TEXT,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "abstract" TEXT,
    "introduction" TEXT,
    "pathophysiology" TEXT,
    "diagnosis" TEXT,
    "management" TEXT,
    "conclusion" TEXT,
    "references" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicalReview_slug_key" ON "MedicalReview"("slug");

-- Data: broadcast beranda diganti sesuai arahan pengguna 28 Okt 2026.
-- Pengumuman uji lama dinonaktifkan (tidak dihapus), lalu pengumuman ajakan daftar dibuat.
UPDATE "Announcement" SET "active" = false WHERE "title" LIKE 'Uji pengumuman:%';
INSERT INTO "Announcement" ("id", "title", "body", "linkUrl", "linkLabel", "tone", "active", "createdAt", "updatedAt")
VALUES ('pengumuman-daftar-gratis-20261028', 'Free Semua Pembelajaran dengan Daftar Akun!', 'Daftar Gratis Sekarang!', '/daftar', 'Daftar Sekarang', 'PENTING', true, CAST(strftime('%s','now') AS INTEGER) * 1000, CAST(strftime('%s','now') AS INTEGER) * 1000);
