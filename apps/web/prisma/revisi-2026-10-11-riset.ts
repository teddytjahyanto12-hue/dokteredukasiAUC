// Arahan pengguna 11-10-2026: katalog Medical Research dibagi section.
// Original Research → Univariate, Multivariate; Review → Systematic Review, Narrative Literature Review, Scoping Review, dll;
// Case Report → Case Report; Pengolahan Data → SPSS, RStudio (STATA dipertahankan).
// Setiap topik lama di kelas induk dipindah menjadi kelas pilihan (sub-kelas) dengan materi, kuis, dan progresnya tetap.
// Akses paket ke kelas induk otomatis membuka semua kelas pilihannya (lib/access.ts).
// Aman dijalankan berulang. Jalankan: npm run db:revisi-2026-10-11-riset

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const PARENTS = ["original-research", "review", "case-report", "pengolahan-data"];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, " dan ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function main() {
  const track = await db.track.findUniqueOrThrow({ where: { slug: "medical-research" } });
  let created = 0;
  for (const parentSlug of PARENTS) {
    const parent = await db.category.findUnique({ where: { trackId_slug: { trackId: track.id, slug: parentSlug } }, include: { topics: { orderBy: { order: "asc" } } } });
    if (!parent) continue;
    await db.category.update({ where: { id: parent.id }, data: { childLabel: "Pilihan", showChildrenInCatalog: true } });
    for (const [i, topic] of parent.topics.entries()) {
      if (topic.title.startsWith("Contoh Topik")) continue;
      const slug = `${parentSlug}-${slugify(topic.title)}`;
      const child = await db.category.upsert({
        where: { trackId_slug: { trackId: track.id, slug } },
        update: { parentId: parent.id },
        create: {
          trackId: track.id,
          slug,
          title: topic.title,
          description: topic.description,
          parentId: parent.id,
          displayType: parent.displayType,
          order: i + 1,
          published: topic.published,
        },
      });
      // Topik (beserta materi, kuis, dan progres murid) pindah ke kelas pilihan sebagai Bab 1.
      await db.topic.update({ where: { id: topic.id }, data: { categoryId: child.id, title: "Bab 1", order: 1 } });
      created++;
    }
  }
  // Urutan pilihan mengikuti arahan pengguna.
  const ORDER: Record<string, string[]> = {
    "original-research": ["Univariate", "Bivariate", "Multivariate"],
    // Meta-analysis digabung ke "Systematic Review and Meta-Analysis" (12-10-2026); slug kelas tetap review-systematic-review.
    review: ["Systematic Review", "Narrative Literature Review", "Scoping Review", "Bibliometric Analysis"],
    "pengolahan-data": ["SPSS", "RStudio", "STATA"],
  };
  for (const [parentSlug, titles] of Object.entries(ORDER)) {
    for (const [i, title] of titles.entries()) {
      await db.category.updateMany({ where: { trackId: track.id, slug: `${parentSlug}-${slugify(title)}` }, data: { order: i + 1 } });
    }
  }
  // Basic Medical Science memakai sebutan "Blok" dan tetap tampil sebagai satu kartu di katalog.
  await db.category.updateMany({ where: { slug: "basic-medical-science" }, data: { childLabel: "Blok" } });
  console.log(`Selesai: ${created} topik dipindah menjadi kelas pilihan.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
