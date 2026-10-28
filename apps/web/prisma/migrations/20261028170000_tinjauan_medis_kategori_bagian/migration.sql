-- Tinjauan Medis: kategori dikelola admin, gambar ilustrasi kartu, dan bagian isi bebas.
-- Data lama dipindahkan: rubrik teks -> MedicalReviewCategory, lima kolom bagian tetap -> JSON sections.

-- CreateTable
CREATE TABLE "MedicalReviewCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicalReviewCategory_slug_key" ON "MedicalReviewCategory"("slug");

-- Data: satu kategori untuk setiap rubrik lama yang terisi.
INSERT INTO "MedicalReviewCategory" ("id", "name", "slug", "order", "createdAt", "updatedAt")
SELECT 'mrc-' || lower(hex(randomblob(8))), name, 'kategori-' || lower(hex(randomblob(4))), 0,
       CAST(strftime('%s','now') AS INTEGER) * 1000, CAST(strftime('%s','now') AS INTEGER) * 1000
FROM (SELECT DISTINCT trim("category") AS name FROM "MedicalReview" WHERE "category" IS NOT NULL AND trim("category") <> '');

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MedicalReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "categoryId" TEXT,
    "coverFileId" TEXT,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "abstract" TEXT,
    "sections" TEXT NOT NULL DEFAULT '[]',
    "references" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MedicalReview_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "MedicalReviewCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "MedicalReview_coverFileId_fkey" FOREIGN KEY ("coverFileId") REFERENCES "FileAsset" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MedicalReview" ("id", "slug", "categoryId", "coverFileId", "title", "author", "abstract", "sections", "references", "published", "publishedAt", "createdAt", "updatedAt")
SELECT r."id", r."slug",
       (SELECT c."id" FROM "MedicalReviewCategory" c WHERE c."name" = trim(r."category")),
       NULL, r."title", r."author", r."abstract",
       (SELECT COALESCE(json_group_array(json_object('title', t, 'body', b)), '[]') FROM (
            SELECT 1 AS n, 'Pendahuluan' AS t, r."introduction" AS b UNION ALL
            SELECT 2, 'Patofisiologi / Etiologi', r."pathophysiology" UNION ALL
            SELECT 3, 'Diagnosis & Manifestasi Klinis', r."diagnosis" UNION ALL
            SELECT 4, 'Tata Laksana / Algoritma', r."management" UNION ALL
            SELECT 5, 'Kesimpulan / Pesan Klinis (Clinical Pearls)', r."conclusion"
        ) WHERE b IS NOT NULL AND trim(b) <> '' ORDER BY n),
       r."references", r."published", r."publishedAt", r."createdAt", r."updatedAt"
FROM "MedicalReview" r;
DROP TABLE "MedicalReview";
ALTER TABLE "new_MedicalReview" RENAME TO "MedicalReview";
CREATE UNIQUE INDEX "MedicalReview_slug_key" ON "MedicalReview"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
