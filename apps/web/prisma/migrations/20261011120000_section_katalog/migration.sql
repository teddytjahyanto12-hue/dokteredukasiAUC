-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT,
    "trackId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "displayType" TEXT NOT NULL DEFAULT 'MATERIAL',
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "level" TEXT,
    "durationText" TEXT,
    "instructor" TEXT,
    "instructorTitle" TEXT,
    "outcomes" TEXT,
    "studentBase" INTEGER NOT NULL DEFAULT 0,
    "parentId" TEXT,
    "artKey" TEXT,
    "childLabel" TEXT,
    "showChildrenInCatalog" BOOLEAN NOT NULL DEFAULT false,
    "posterFileId" TEXT,
    CONSTRAINT "Category_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Category_posterFileId_fkey" FOREIGN KEY ("posterFileId") REFERENCES "FileAsset" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("artKey", "code", "description", "displayType", "durationText", "id", "instructor", "instructorTitle", "level", "order", "outcomes", "parentId", "posterFileId", "published", "slug", "studentBase", "title", "trackId") SELECT "artKey", "code", "description", "displayType", "durationText", "id", "instructor", "instructorTitle", "level", "order", "outcomes", "parentId", "posterFileId", "published", "slug", "studentBase", "title", "trackId" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_code_key" ON "Category"("code");
CREATE UNIQUE INDEX "Category_trackId_slug_key" ON "Category"("trackId", "slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

