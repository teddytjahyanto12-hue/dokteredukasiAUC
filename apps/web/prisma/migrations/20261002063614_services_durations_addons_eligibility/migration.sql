-- AlterTable
ALTER TABLE "Order" ADD COLUMN "basePrice" INTEGER;
ALTER TABLE "Order" ADD COLUMN "durationLabel" TEXT;
ALTER TABLE "Order" ADD COLUMN "durationMonths" INTEGER;

-- CreateTable
CREATE TABLE "PackageBenefit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "packageId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "PackageBenefit_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PackageDuration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "packageId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "months" INTEGER NOT NULL,
    "price" INTEGER,
    "hpp" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "PackageDuration_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PackageAddon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "packageId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER,
    "hpp" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "PackageAddon_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TutorServiceEligibility" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tutorId" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "fee" INTEGER,
    "feeBasis" TEXT,
    "note" TEXT,
    CONSTRAINT "TutorServiceEligibility_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TutorServiceEligibility_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderAddon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "addonId" TEXT,
    "name" TEXT NOT NULL,
    "price" INTEGER,
    CONSTRAINT "OrderAddon_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrderAddon_addonId_fkey" FOREIGN KEY ("addonId") REFERENCES "PackageAddon" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FileAsset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "storagePath" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "uploadedById" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FileAsset_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_FileAsset" ("createdAt", "id", "mimeType", "originalName", "size", "storagePath", "uploadedById") SELECT "createdAt", "id", "mimeType", "originalName", "size", "storagePath", "uploadedById" FROM "FileAsset";
DROP TABLE "FileAsset";
ALTER TABLE "new_FileAsset" RENAME TO "FileAsset";
CREATE TABLE "new_Package" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "trackSlug" TEXT,
    "summary" TEXT,
    "description" TEXT,
    "posterFileId" TEXT,
    "price" INTEGER,
    "accessDays" INTEGER,
    "hpp" INTEGER,
    "sopUrl" TEXT,
    "sopNote" TEXT,
    "includesMentoring" BOOLEAN NOT NULL DEFAULT false,
    "mentoringField" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Package_posterFileId_fkey" FOREIGN KEY ("posterFileId") REFERENCES "FileAsset" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Package" ("accessDays", "active", "createdAt", "description", "id", "includesMentoring", "mentoringField", "name", "order", "price", "slug", "summary", "trackSlug") SELECT "accessDays", "active", "createdAt", "description", "id", "includesMentoring", "mentoringField", "name", "order", "price", "slug", "summary", "trackSlug" FROM "Package";
DROP TABLE "Package";
ALTER TABLE "new_Package" RENAME TO "Package";
CREATE UNIQUE INDEX "Package_slug_key" ON "Package"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "TutorServiceEligibility_tutorId_packageId_key" ON "TutorServiceEligibility"("tutorId", "packageId");

-- Data: setiap layanan yang sudah ada mendapat pilihan masa belajar 3 dan 6 bulan
-- (harga dikosongkan, diisi owner di panel admin).
INSERT INTO "PackageDuration" ("id", "packageId", "label", "months", "price", "active", "order")
  SELECT lower(hex(randomblob(12))), "id", '3 bulan', 3, NULL, true, 0 FROM "Package";
INSERT INTO "PackageDuration" ("id", "packageId", "label", "months", "price", "active", "order")
  SELECT lower(hex(randomblob(12))), "id", '6 bulan', 6, NULL, true, 1 FROM "Package";
