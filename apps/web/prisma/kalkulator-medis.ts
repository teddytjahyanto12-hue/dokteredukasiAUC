// Arahan pengguna 12-10-2026:
// - Kalkulator Medis berdiri sendiri (menu atas), TIDAK dikaitkan dengan Clinical Practice / Medical Cheatsheet.
//   Judul kategori medical-cheatsheet yang sempat diganti dikembalikan (hanya bila masih teks dari skrip ini).
// - Paket langganan "Kalkulator Medis Premium" Rp50.000 per bulan: semua kalkulator + pembahasan & materi.
//   Gratis: 1 kalkulator standar per bidang tanpa pembahasan (diatur di src/lib/calculators/registry.ts).
// Aman dijalankan berulang. Jalankan: npm run db:kalkulator-medis

import { PrismaClient } from "@prisma/client";
import { PREMIUM_BENEFITS, PREMIUM_MONTHLY_PRICE, PREMIUM_PACKAGE_SLUG } from "../src/lib/calculators/premium";

const db = new PrismaClient();

async function main() {
  // 1. Kembalikan kategori Medical Cheatsheet.
  const NEW_TITLE = "Medical Cheatsheet & Calculator";
  const NEW_DESC = "Kalkulator dan skor klinis yang cepat dipakai, lengkap dengan penjelasan belajar, ditambah ringkasan praktis dalam PDF.";
  for (const c of await db.category.findMany({ where: { slug: "medical-cheatsheet" } })) {
    const data: { title?: string; description?: string } = {};
    if (c.title === NEW_TITLE) data.title = "Medical Cheatsheet";
    if (c.description === NEW_DESC) data.description = "Ringkasan praktis dalam PDF. Kolom tanya-jawab AI akan ditambahkan.";
    if (Object.keys(data).length) {
      await db.category.update({ where: { id: c.id }, data });
      console.log("Kategori dikembalikan: Medical Cheatsheet");
    }
  }

  // 2. Paket langganan bulanan. Harga & manfaat yang sudah diubah owner di admin tidak ditimpa.
  const existing = await db.package.findUnique({ where: { slug: PREMIUM_PACKAGE_SLUG }, include: { durations: true, benefits: true } });
  const pkg =
    existing ??
    (await db.package.create({
      data: {
        slug: PREMIUM_PACKAGE_SLUG,
        name: "Kalkulator Medis Premium",
        summary: "Langganan bulanan: semua kalkulator medis terbuka, lengkap dengan pembahasan, materi ringkas, dan latihan kasus di halaman yang sama.",
        trackSlug: null,
        price: PREMIUM_MONTHLY_PRICE,
        accessDays: 30,
        active: true,
        order: 900,
      },
    }));
  if (!existing?.durations.length) {
    await db.packageDuration.create({ data: { packageId: pkg.id, label: "1 bulan", months: 1, price: PREMIUM_MONTHLY_PRICE, order: 0 } });
  }
  if (!existing?.benefits.length) {
    await db.packageBenefit.createMany({ data: PREMIUM_BENEFITS.map((text, order) => ({ packageId: pkg.id, text, order })) });
  }
  const d = await db.packageDuration.findFirst({ where: { packageId: pkg.id, active: true }, orderBy: { months: "asc" } });
  console.log(`Paket ${existing ? "sudah ada" : "dibuat"}: Kalkulator Medis Premium, ${d?.label ?? "-"} Rp${(d?.price ?? 0).toLocaleString("id-ID")}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
