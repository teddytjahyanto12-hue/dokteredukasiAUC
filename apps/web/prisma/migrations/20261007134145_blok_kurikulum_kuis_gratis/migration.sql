-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    "outcomes" TEXT,
    "studentBase" INTEGER NOT NULL DEFAULT 0,
    "parentId" TEXT,
    "artKey" TEXT,
    "posterFileId" TEXT,
    CONSTRAINT "Category_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Category_posterFileId_fkey" FOREIGN KEY ("posterFileId") REFERENCES "FileAsset" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("description", "displayType", "durationText", "id", "instructor", "level", "order", "outcomes", "posterFileId", "published", "slug", "studentBase", "title", "trackId") SELECT "description", "displayType", "durationText", "id", "instructor", "level", "order", "outcomes", "posterFileId", "published", "slug", "studentBase", "title", "trackId" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_trackId_slug_key" ON "Category"("trackId", "slug");
CREATE TABLE "new_Quiz" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "topicId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "passingScore" INTEGER NOT NULL DEFAULT 70,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Quiz_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Quiz" ("id", "passingScore", "published", "title", "topicId") SELECT "id", "passingScore", "published", "title", "topicId" FROM "Quiz";
DROP TABLE "Quiz";
ALTER TABLE "new_Quiz" RENAME TO "Quiz";
CREATE UNIQUE INDEX "Quiz_topicId_key" ON "Quiz"("topicId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
