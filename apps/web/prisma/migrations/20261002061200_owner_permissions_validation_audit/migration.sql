-- AlterTable
ALTER TABLE "Mentoring" ADD COLUMN "closeNote" TEXT;
ALTER TABLE "Mentoring" ADD COLUMN "closeReason" TEXT;
ALTER TABLE "Mentoring" ADD COLUMN "closedAt" DATETIME;
ALTER TABLE "Mentoring" ADD COLUMN "closedById" TEXT;

-- AlterTable
ALTER TABLE "MentoringSession" ADD COLUMN "doneAt" DATETIME;
ALTER TABLE "MentoringSession" ADD COLUMN "recordingUrl" TEXT;
ALTER TABLE "MentoringSession" ADD COLUMN "revisionNote" TEXT;
ALTER TABLE "MentoringSession" ADD COLUMN "verifiedById" TEXT;

-- AlterTable
ALTER TABLE "Payroll" ADD COLUMN "paymentRef" TEXT;
ALTER TABLE "Payroll" ADD COLUMN "voidReason" TEXT;

-- AlterTable
ALTER TABLE "TutorProfile" ADD COLUMN "feeBasis" TEXT;

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT,
    "actorName" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "summary" TEXT NOT NULL,
    "before" TEXT,
    "after" TEXT,
    CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "institution" TEXT,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "permissions" TEXT NOT NULL DEFAULT '[]',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("active", "createdAt", "email", "id", "institution", "name", "passwordHash", "phone", "role", "updatedAt") SELECT "active", "createdAt", "email", "id", "institution", "name", "passwordHash", "phone", "role", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "AuditLog_entity_entityId_idx" ON "AuditLog"("entity", "entityId");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- Data: akun admin awal menjadi Owner (punya semua akses).
UPDATE "User" SET "role" = 'OWNER' WHERE "role" = 'ADMIN';
-- Status bimbingan lama yang tidak dipakai lagi menjadi Ditutup (masa waktu habis).
UPDATE "Mentoring" SET "status" = 'CLOSED', "closeReason" = 'PERIOD_ENDED', "closedAt" = CURRENT_TIMESTAMP
  WHERE "status" IN ('COMPLETED', 'CANCELLED');
