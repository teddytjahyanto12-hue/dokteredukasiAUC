-- AlterTable
ALTER TABLE "Mentoring" ADD COLUMN "serviceEndsAt" DATETIME;

-- AlterTable
ALTER TABLE "MentoringSession" ADD COLUMN "requestedAt" DATETIME;
ALTER TABLE "MentoringSession" ADD COLUMN "seq" INTEGER;

-- AlterTable
ALTER TABLE "Package" ADD COLUMN "serviceMonths" INTEGER;
ALTER TABLE "Package" ADD COLUMN "zoomFee" INTEGER;
ALTER TABLE "Package" ADD COLUMN "zoomQuota" INTEGER;

-- AlterTable
ALTER TABLE "ServiceTaskTemplate" ADD COLUMN "fee" INTEGER;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PackageAddon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "packageId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER,
    "hpp" INTEGER,
    "zoomCredits" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "PackageAddon_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PackageAddon" ("active", "description", "hpp", "id", "name", "order", "packageId", "price") SELECT "active", "description", "hpp", "id", "name", "order", "packageId", "price" FROM "PackageAddon";
DROP TABLE "PackageAddon";
ALTER TABLE "new_PackageAddon" RENAME TO "PackageAddon";
CREATE TABLE "new_ProjectTask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mentoringId" TEXT NOT NULL,
    "stageNumber" INTEGER NOT NULL,
    "stageTitle" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "dueDate" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'TODO',
    "note" TEXT,
    "evidenceUrl" TEXT,
    "evidenceFileId" TEXT,
    "fee" INTEGER,
    "payrollId" TEXT,
    "doneAt" DATETIME,
    "revisionNote" TEXT,
    "validatedAt" DATETIME,
    "validatedById" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProjectTask_mentoringId_fkey" FOREIGN KEY ("mentoringId") REFERENCES "Mentoring" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProjectTask_evidenceFileId_fkey" FOREIGN KEY ("evidenceFileId") REFERENCES "FileAsset" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ProjectTask_payrollId_fkey" FOREIGN KEY ("payrollId") REFERENCES "Payroll" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProjectTask" ("createdAt", "description", "doneAt", "dueDate", "evidenceUrl", "id", "mentoringId", "note", "order", "revisionNote", "stageNumber", "stageTitle", "status", "title", "validatedAt", "validatedById") SELECT "createdAt", "description", "doneAt", "dueDate", "evidenceUrl", "id", "mentoringId", "note", "order", "revisionNote", "stageNumber", "stageTitle", "status", "title", "validatedAt", "validatedById" FROM "ProjectTask";
DROP TABLE "ProjectTask";
ALTER TABLE "new_ProjectTask" RENAME TO "ProjectTask";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

