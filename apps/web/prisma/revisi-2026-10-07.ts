// Revisi pengguna 7-10-2026: nama Dokter Edukasi Academy, 22 Blok Basic Medical Science,
// paket per Blok & Paket Blok Komplit, add-on bimbingan, dan penghapusan em-dash dari data.
// Aman dijalankan berulang: data yang sudah ada diperbarui, tidak digandakan.
// Jalankan: npm run db:revisi-2026-10-07

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const BLOCKS: [string, string][] = [
  ["Anatomi Tulang", "tulang"],
  ["Anatomi Otot", "otot"],
  ["Anatomi Saraf + Pembuluh Darah", "saraf-pembuluh"],
  ["Fisiologi Dasar", "fisiologi"],
  ["Histologi Dasar", "histologi"],
  ["Biokimia Dasar", "biokimia"],
  ["IKM-IKK", "ikm"],
  ["Siklus Hidup", "siklus-hidup"],
  ["Sistem Hematologi", "hematologi"],
  ["Sistem Imun & Infeksi", "imun"],
  ["Sistem Muskuloskeletal", "muskuloskeletal"],
  ["Sistem Kardiovaskuler", "kardio"],
  ["Sistem Respirasi", "respirasi"],
  ["Sistem Gastrointestinal", "gastro"],
  ["Sistem Hepato Bilier", "hepatobilier"],
  ["Sistem Endokrin & Metabolisme", "endokrin"],
  ["Sistem Urogenital", "urogenital"],
  ["Sistem Reproduksi", "reproduksi"],
  ["Sistem Saraf & Kejiwaan", "saraf-jiwa"],
  ["Sistem Penginderaan", "indera"],
  ["Kegawatdaruratan Medik", "gawat-darurat"],
  ["Etika, Hukum Kedokteran & Kedokteran Forensik", "etika-forensik"],
];

const PRICE_BLOCK = 150_000;
const PRICE_COMPLETE = 2_200_000;
const ADDON = {
  name: "Bimbingan dengan Pengajar (Dokter Umum Professional) 60 Menit",
  description: "Bimbingan dilakukan melalui Zoom.",
  price: 150_000,
};
const PLACEHOLDER = "Materi sedang disiapkan oleh tim pengajar. Konten akan diisi melalui panel admin.";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, " dan ")
    .replace(/\+/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const SETTINGS: Record<string, string> = {
  siteName: "Dokter Edukasi Academy",
  siteTagline: "Pusat Pembelajaran & Riset Medis",
  heroTitle: "Kuasai Ilmu Kedokteran & Riset Ilmiah dalam Satu Platform",
  heroSubtitle:
    "Panduan Belajar Terstruktur mulai dari jenjang Pre-Clinical, Clinical Practice, hingga Medical Research.\nDilengkapi Kuis, Catatan, Video Pembelajaran, dan Mentor Professional",
  catalogTitle: "Temukan Kelas",
  catalogSubtitle: "Pilih program, lihat kurikulum dan temukan materi yang ingin dipelajari.",
  footerNote: "© Dokter Edukasi Academy",
};

async function ensureAddon(packageId: string) {
  const existing = await db.packageAddon.findFirst({ where: { packageId, name: ADDON.name } });
  if (existing) await db.packageAddon.update({ where: { id: existing.id }, data: { description: ADDON.description, price: ADDON.price, active: true } });
  else await db.packageAddon.create({ data: { packageId, ...ADDON, order: 1 } });
}

async function ensureBenefits(packageId: string, texts: string[]) {
  const count = await db.packageBenefit.count({ where: { packageId } });
  if (count === 0) await db.packageBenefit.createMany({ data: texts.map((text, order) => ({ packageId, text, order })) });
}

async function main() {
  // 1. Teks situs
  for (const [key, value] of Object.entries(SETTINGS)) {
    await db.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }

  // 2. Kelas induk Basic Medical Science
  const track = await db.track.findUniqueOrThrow({ where: { slug: "pre-clinical" } });
  const parent = await db.category.findUniqueOrThrow({ where: { trackId_slug: { trackId: track.id, slug: "basic-medical-science" } } });
  await db.category.update({
    where: { id: parent.id },
    data: {
      description: "Materi Kedokteran sesuai Blok Kurikulum Kedokteran Indonesia. Pembelajaran dalam bentuk Materi, Kuis, dan Bimbingan.",
      displayType: "MATERIAL_QUIZ",
    },
  });

  // 3. 22 Blok, masing-masing dengan Bab 1 (1.1 gratis, 1.2 terkunci) dan Kuis Bab 1 gratis
  const blockIds: string[] = [];
  for (const [i, [title, artKey]] of BLOCKS.entries()) {
    const n = i + 1;
    const slug = `blok-${String(n).padStart(2, "0")}-${slugify(title)}`;
    const block = await db.category.upsert({
      where: { trackId_slug: { trackId: track.id, slug } },
      update: { title, parentId: parent.id, artKey, order: n },
      create: {
        trackId: track.id,
        slug,
        title,
        parentId: parent.id,
        artKey,
        order: n,
        displayType: "MATERIAL_QUIZ",
        description: `Blok ${n} tahap akademik (preklinik). Materi dibagi per Bab, setiap Bab diakhiri kuis.`,
      },
    });
    blockIds.push(block.id);

    let bab1 = await db.topic.findFirst({ where: { categoryId: block.id, order: 1 } });
    if (!bab1) {
      bab1 = await db.topic.create({ data: { categoryId: block.id, title: "Bab 1", description: "Bab pembuka. Materi 1.1 dan kuis Bab 1 dapat dicoba gratis.", order: 1 } });
      await db.item.createMany({
        data: [
          { topicId: bab1.id, type: "TEXT", title: "1.1 Materi pembuka", body: PLACEHOLDER, isFree: true, order: 1, sourceNote: "Placeholder, ganti dengan materi milik Dokter Edukasi" },
          { topicId: bab1.id, type: "TEXT", title: "1.2 Materi lanjutan", body: PLACEHOLDER, isFree: false, order: 2, sourceNote: "Placeholder, ganti dengan materi milik Dokter Edukasi" },
        ],
      });
    }
    await db.quiz.upsert({
      where: { topicId: bab1.id },
      update: { isFree: true },
      create: { topicId: bab1.id, title: "Kuis Bab 1", isFree: true, passingScore: 70 },
    });

    // 4. Paket 1 Blok
    const pkgSlug = `paket-${slug}`;
    const pkg = await db.package.upsert({
      where: { slug: pkgSlug },
      update: { name: `Paket 1 Blok: ${title}`, price: PRICE_BLOCK, accessDays: null, active: true },
      create: {
        slug: pkgSlug,
        name: `Paket 1 Blok: ${title}`,
        trackSlug: "pre-clinical",
        summary: `Menguasai Blok ${title} lewat materi per Bab dan kuis di setiap Bab.`,
        price: PRICE_BLOCK,
        accessDays: null,
        order: 100 + n,
        categories: { create: { categoryId: block.id } },
      },
    });
    await ensureBenefits(pkg.id, ["Akses Blok ini seumur hidup", "Materi per Bab dan kuis di setiap Bab", "Bisa ditambah bimbingan Zoom 60 menit dengan dokter umum"]);
    await ensureAddon(pkg.id);
  }

  // 5. Paket Blok Komplit: akses kelas induk = semua Blok
  const complete = await db.package.upsert({
    where: { slug: "paket-blok-komplit" },
    update: { name: "Paket Blok Komplit (22 Blok)", price: PRICE_COMPLETE, accessDays: null, active: true },
    create: {
      slug: "paket-blok-komplit",
      name: "Paket Blok Komplit (22 Blok)",
      trackSlug: "pre-clinical",
      summary: "Menguasai seluruh 22 Blok Basic Medical Science dalam satu paket.",
      price: PRICE_COMPLETE,
      accessDays: null,
      order: 99,
      categories: { create: { categoryId: parent.id } },
    },
  });
  await ensureBenefits(complete.id, ["Semua 22 Blok bisa diakses", "Akses seumur hidup", "Materi per Bab dan kuis di setiap Bab", "Bisa ditambah bimbingan Zoom 60 menit dengan dokter umum"]);
  await ensureAddon(complete.id);

  // 6. Paket lama Basic Medical Science digantikan paket Blok (data & order lama tetap ada)
  await db.package.updateMany({ where: { slug: "pre-clinical-basic-medical-science" }, data: { active: false } });

  // 7. Hapus em-dash dari data yang tampil
  const fix = (s: string | null) => (s && s.includes("—") ? s.replace(/\s—\s/g, ": ").replace(/—/g, "-") : null);
  const sweep = async <T extends { id: string }>(rows: T[], fields: (keyof T)[], update: (id: string, data: Record<string, string>) => Promise<unknown>) => {
    let n = 0;
    for (const r of rows) {
      const data: Record<string, string> = {};
      for (const f of fields) {
        const v = fix(r[f] as unknown as string | null);
        if (v !== null) data[f as string] = v;
      }
      if (Object.keys(data).length) {
        await update(r.id, data);
        n++;
      }
    }
    return n;
  };
  let changed = 0;
  changed += await sweep(await db.track.findMany(), ["title", "description"], (id, data) => db.track.update({ where: { id }, data }));
  changed += await sweep(await db.category.findMany(), ["title", "description", "durationText", "instructor", "outcomes"], (id, data) => db.category.update({ where: { id }, data }));
  changed += await sweep(await db.topic.findMany(), ["title", "description"], (id, data) => db.topic.update({ where: { id }, data }));
  changed += await sweep(await db.item.findMany(), ["title", "description", "body", "sourceNote"], (id, data) => db.item.update({ where: { id }, data }));
  changed += await sweep(await db.quiz.findMany(), ["title"], (id, data) => db.quiz.update({ where: { id }, data }));
  changed += await sweep(await db.package.findMany(), ["name", "summary", "description", "sopNote"], (id, data) => db.package.update({ where: { id }, data }));
  changed += await sweep(await db.packageBenefit.findMany(), ["text"], (id, data) => db.packageBenefit.update({ where: { id }, data }));
  changed += await sweep(await db.packageAddon.findMany(), ["name", "description"], (id, data) => db.packageAddon.update({ where: { id }, data }));
  changed += await sweep(await db.serviceStage.findMany(), ["title", "description"], (id, data) => db.serviceStage.update({ where: { id }, data }));
  changed += await sweep(await db.learningPath.findMany(), ["title", "summary", "description"], (id, data) => db.learningPath.update({ where: { id }, data }));
  changed += await sweep(await db.faq.findMany(), ["question", "answer"], (id, data) => db.faq.update({ where: { id }, data }));
  changed += await sweep(await db.testimonial.findMany(), ["name", "role", "quote"], (id, data) => db.testimonial.update({ where: { id }, data }));
  changed += await sweep(await db.tutorProfile.findMany(), ["rateNote", "notes"], (id, data) => db.tutorProfile.update({ where: { id }, data }));
  // Arahan pengguna: kata "Anda" tidak dipakai di website.
  for (const s of await db.setting.findMany({ where: { value: { contains: "akses Anda" } } })) {
    await db.setting.update({ where: { key: s.key }, data: { value: s.value.replace(/akses Anda/g, "akses") } });
    changed++;
  }
  for (const s of await db.setting.findMany()) {
    const v = fix(s.value);
    if (v !== null) {
      await db.setting.update({ where: { key: s.key }, data: { value: v } });
      changed++;
    }
  }

  console.log(`Selesai: ${BLOCKS.length} Blok, ${BLOCKS.length + 1} paket Blok, ${changed} baris em-dash dibersihkan.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
