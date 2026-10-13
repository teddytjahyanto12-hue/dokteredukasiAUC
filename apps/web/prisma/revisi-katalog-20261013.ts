import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const specialties = ["Bedah", "Bioetik", "Dermatologi-Venerologi", "Endokrin", "Forensik", "Gastroenterologi-Hepatic", "Ginekologi", "Hematologi Onkologi", "Kardiologi", "Mata", "Tropis", "Nefrologi", "Neurologi", "Obstetrik", "Pediatric", "Psikiatri", "Public Health", "THT"];
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Pembaruan terarah dan idempoten. Tidak menghapus materi, percobaan, atau hak akses.
export async function updateCatalog(client: PrismaClient = db) {
  await client.$transaction(async (tx) => {
    const tracks = [
      ["pre-clinical", "Preclinical", "Fondasi ilmu kedokteran dasar, e-book, dan quiz per blok."],
      ["ukmppd", "UKMPPD", "Persiapan ujian kompetensi dokter melalui 18 bidang kedokteran."],
      ["clinical-practice", "Clinical Practice", "Latihan EKG dan ringkasan praktik klinis."],
      ["medical-research", "Medical Research", "Riset, review, pengolahan data, dan publikasi jurnal."],
    ];
    for (const [order, [slug, title, description]] of tracks.entries()) {
      await tx.track.upsert({ where: { slug }, update: { title, description, order, published: true }, create: { slug, title, description, order } });
    }
    const pre = await tx.track.findUniqueOrThrow({ where: { slug: "pre-clinical" } });
    const clinical = await tx.track.findUniqueOrThrow({ where: { slug: "clinical-practice" } });
    const research = await tx.track.findUniqueOrThrow({ where: { slug: "medical-research" } });
    const uk = await tx.track.findUniqueOrThrow({ where: { slug: "ukmppd" } });
    await tx.category.updateMany({ where: { OR: [{ trackId: pre.id, slug: "daftar-pustaka" }, { trackId: clinical.id, slug: "clinical-guidelines" }] }, data: { published: false } });
    for (const [order, title] of specialties.entries()) {
      await tx.category.upsert({ where: { trackId_slug: { trackId: uk.id, slug: slugify(title) } }, update: { title, order, published: true }, create: { trackId: uk.id, slug: slugify(title), title, order, displayType: "MATERIAL_QUIZ" } });
    }
    const original = await tx.category.findUniqueOrThrow({ where: { trackId_slug: { trackId: research.id, slug: "original-research" } } });
    await tx.category.update({ where: { id: original.id }, data: { showChildrenInCatalog: true, childLabel: "Pilihan" } });
    await tx.category.upsert({ where: { trackId_slug: { trackId: research.id, slug: "original-research-bivariate" } }, update: { parentId: original.id, title: "Bivariat", order: 2, published: true }, create: { trackId: research.id, slug: "original-research-bivariate", title: "Bivariat", parentId: original.id, order: 2 } });
    await tx.category.updateMany({ where: { trackId: research.id, slug: "original-research-univariate" }, data: { order: 1 } });
    await tx.category.updateMany({ where: { trackId: research.id, slug: "original-research-multivariate" }, data: { order: 3 } });
    const publication = await tx.category.upsert({ where: { trackId_slug: { trackId: research.id, slug: "publikasi-jurnal" } }, update: { published: true, showChildrenInCatalog: true }, create: { trackId: research.id, slug: "publikasi-jurnal", title: "Publikasi Jurnal", order: 5, childLabel: "Pilihan", showChildrenInCatalog: true } });
    for (const [order, title] of ["Publikasi Jurnal SINTA", "Publikasi Jurnal Scopus"].entries()) {
      await tx.category.upsert({ where: { trackId_slug: { trackId: research.id, slug: slugify(title) } }, update: { parentId: publication.id, title, order, published: true }, create: { trackId: research.id, slug: slugify(title), title, parentId: publication.id, order } });
    }
    const bms = await tx.category.findUniqueOrThrow({ where: { trackId_slug: { trackId: pre.id, slug: "basic-medical-science" } }, include: { children: { where: { published: true }, orderBy: { order: "asc" } } } });
    const quiz = await tx.category.upsert({ where: { trackId_slug: { trackId: pre.id, slug: "quiz" } }, update: { published: true }, create: { trackId: pre.id, slug: "quiz", title: "Quiz", description: "Latihan soal untuk setiap blok Basic Medical Science.", order: 2, displayType: "MATERIAL_QUIZ", childLabel: "Blok" } });
    for (const block of bms.children) {
      await tx.category.upsert({ where: { trackId_slug: { trackId: pre.id, slug: `quiz-${block.slug}` } }, update: { title: block.title, order: block.order, artKey: block.artKey, parentId: quiz.id, published: true }, create: { trackId: pre.id, slug: `quiz-${block.slug}`, title: block.title, order: block.order, artKey: block.artKey, parentId: quiz.id, displayType: "MATERIAL_QUIZ" } });
    }
    const hero = await tx.setting.findUnique({ where: { key: "heroSubtitle" } });
    if (hero?.value.includes("Pre-Clinical, Clinical Practice, hingga Medical Research")) {
      await tx.setting.update({ where: { key: "heroSubtitle" }, data: { value: hero.value.replace("Pre-Clinical, Clinical Practice, hingga Medical Research", "Preclinical, UKMPPD, Clinical Practice, hingga Medical Research") } });
    }
    // Ringkasan paket lama tidak lagi menyebut kategori yang telah disembunyikan.
    await tx.package.updateMany({ where: { slug: "pre-clinical-lengkap" }, data: { summary: "Basic Medical Science dan Medical E-books." } });
    await tx.package.updateMany({ where: { slug: "clinical-practice-lengkap" }, data: { summary: "ECG Challenges dan Medical Cheatsheet." } });
    console.log(`Katalog diperbarui: ${specialties.length} UKMPPD, ${bms.children.length} blok Quiz, Bivariat, SINTA/Scopus.`);
  }, { timeout: 60000 });
}
if (process.argv[1]?.replaceAll("\\", "/").endsWith("/revisi-katalog-20261013.ts")) {
  updateCatalog().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => db.$disconnect());
}
