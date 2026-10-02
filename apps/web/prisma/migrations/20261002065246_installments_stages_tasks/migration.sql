-- CreateTable
CREATE TABLE "ServiceStage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "packageId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    CONSTRAINT "ServiceStage_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ServiceTaskTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ServiceTaskTemplate_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "ServiceStage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InstallmentRule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "packageId" TEXT NOT NULL,
    "seq" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "percent" INTEGER NOT NULL,
    "unlocksStage" INTEGER NOT NULL,
    CONSTRAINT "InstallmentRule_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderInstallment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "seq" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "percent" INTEGER NOT NULL,
    "amount" INTEGER,
    "unlocksStage" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paidAt" DATETIME,
    "paymentRef" TEXT,
    CONSTRAINT "OrderInstallment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProjectTask" (
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
    "doneAt" DATETIME,
    "revisionNote" TEXT,
    "validatedAt" DATETIME,
    "validatedById" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProjectTask_mentoringId_fkey" FOREIGN KEY ("mentoringId") REFERENCES "Mentoring" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "durationLabel" TEXT,
    "durationMonths" INTEGER,
    "basePrice" INTEGER,
    "discount" INTEGER,
    "paymentPlan" TEXT NOT NULL DEFAULT 'FULL',
    "leadSource" TEXT,
    "createdById" TEXT,
    "amount" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT NOT NULL DEFAULT 'MANUAL',
    "paymentRef" TEXT,
    "note" TEXT,
    "paidAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Order_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("amount", "basePrice", "code", "createdAt", "durationLabel", "durationMonths", "id", "note", "packageId", "paidAt", "paymentMethod", "paymentRef", "status", "updatedAt", "userId") SELECT "amount", "basePrice", "code", "createdAt", "durationLabel", "durationMonths", "id", "note", "packageId", "paidAt", "paymentMethod", "paymentRef", "status", "updatedAt", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_code_key" ON "Order"("code");
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
    "allowInstallment" BOOLEAN NOT NULL DEFAULT false,
    "includesMentoring" BOOLEAN NOT NULL DEFAULT false,
    "mentoringField" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Package_posterFileId_fkey" FOREIGN KEY ("posterFileId") REFERENCES "FileAsset" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Package" ("accessDays", "active", "createdAt", "description", "hpp", "id", "includesMentoring", "mentoringField", "name", "order", "posterFileId", "price", "slug", "sopNote", "sopUrl", "summary", "trackSlug") SELECT "accessDays", "active", "createdAt", "description", "hpp", "id", "includesMentoring", "mentoringField", "name", "order", "posterFileId", "price", "slug", "sopNote", "sopUrl", "summary", "trackSlug" FROM "Package";
DROP TABLE "Package";
ALTER TABLE "new_Package" RENAME TO "Package";
CREATE UNIQUE INDEX "Package_slug_key" ON "Package"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "ServiceStage_packageId_number_key" ON "ServiceStage"("packageId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "InstallmentRule_packageId_seq_key" ON "InstallmentRule"("packageId", "seq");

-- CreateIndex
CREATE UNIQUE INDEX "OrderInstallment_orderId_seq_key" ON "OrderInstallment"("orderId", "seq");
