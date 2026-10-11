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
    "hpp" INTEGER,
    "paymentPlan" TEXT NOT NULL DEFAULT 'FULL',
    "leadSource" TEXT,
    "createdById" TEXT,
    "amount" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT NOT NULL DEFAULT 'MANUAL',
    "paymentRef" TEXT,
    "note" TEXT,
    "customerNote" TEXT,
    "invoiceRequestedAt" DATETIME,
    "proofFileId" TEXT,
    "paidAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Order_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_proofFileId_fkey" FOREIGN KEY ("proofFileId") REFERENCES "FileAsset" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("amount", "basePrice", "code", "createdAt", "createdById", "customerNote", "discount", "durationLabel", "durationMonths", "hpp", "id", "invoiceRequestedAt", "leadSource", "note", "packageId", "paidAt", "paymentMethod", "paymentPlan", "paymentRef", "status", "updatedAt", "userId") SELECT "amount", "basePrice", "code", "createdAt", "createdById", "customerNote", "discount", "durationLabel", "durationMonths", "hpp", "id", "invoiceRequestedAt", "leadSource", "note", "packageId", "paidAt", "paymentMethod", "paymentPlan", "paymentRef", "status", "updatedAt", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_code_key" ON "Order"("code");
CREATE TABLE "new_OrderInstallment" (
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
    "proofFileId" TEXT,
    CONSTRAINT "OrderInstallment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrderInstallment_proofFileId_fkey" FOREIGN KEY ("proofFileId") REFERENCES "FileAsset" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_OrderInstallment" ("amount", "id", "label", "orderId", "paidAt", "paymentRef", "percent", "seq", "status", "unlocksStage") SELECT "amount", "id", "label", "orderId", "paidAt", "paymentRef", "percent", "seq", "status", "unlocksStage" FROM "OrderInstallment";
DROP TABLE "OrderInstallment";
ALTER TABLE "new_OrderInstallment" RENAME TO "OrderInstallment";
CREATE UNIQUE INDEX "OrderInstallment_orderId_seq_key" ON "OrderInstallment"("orderId", "seq");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
