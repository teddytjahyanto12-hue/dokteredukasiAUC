// Paket Systematic Review & Meta-Analisis (dokumen PAKET/SYSTEMATIC REVIEW - META ANALISIS.docx, 11-10-2026).
// Gratis: modul pengenalan (materi bertanda gratis). Basic / Intermediate / Pro: materi seumur hidup, Zoom & bimbingan 6 bulan.
// Modal (HPP) = total fee tutor: Basic 2 x 40.000; Intermediate 3 x 40.000; Pro 12 pencapaian (420.000) + 3 Zoom x 35.000.
// Aman dijalankan berulang. Jalankan: npm run db:paket-srma

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const ADDON = { name: "Zoom tambahan 60 menit", description: "Satu sesi Zoom tambahan bersama tutor (60 menit).", price: 100_000, hpp: 40_000, zoomCredits: 1 };

const MILESTONES: [string, number][] = [
  ["Judul Systematic Review Fix", 50_000],
  ["Registrasi PROSPERO", 35_000],
  ["PRISMA Flowchart", 35_000],
  ["Tabel Karakteristik Studi", 20_000],
  ["Analisis Risiko Bias", 20_000],
  ["Tabel Outcome (SR) atau Forest Plot (Meta-analisis)", 50_000],
  ["Abstract Submission", 35_000],
  ["Persiapan Presentasi PPT/Poster", 30_000],
  ["Manuskrip Full Paper", 20_000],
  ["Submit Full Paper", 50_000],
  ["Revisi Full Paper Selesai", 25_000],
  ["Full Paper Diterima", 50_000],
];

type Tier = {
  slug: string;
  name: string;
  summary: string;
  price: number;
  hpp: number;
  zoomQuota: number;
  zoomFee: number;
  toolkit: boolean;
  benefits: string[];
  milestones?: boolean;
  order: number;
};

const TIERS: Tier[] = [
  {
    slug: "paket-srma-basic",
    name: "Systematic Review & Meta-Analisis: Basic",
    summary: "Belajar menyusun systematic review & meta-analisis lewat video, materi, kuis, dan 2x Zoom bersama tutor.",
    price: 399_000,
    hpp: 80_000,
    zoomQuota: 2,
    zoomFee: 40_000,
    toolkit: false,
    order: 201,
    benefits: ["Video pembelajaran + materi + kuis, berlaku seumur hidup", "2x Zoom bersama tutor (berlaku 6 bulan)", "Jadwal Zoom dipilih sendiri lewat tombol Zoom 1 dan Zoom 2"],
  },
  {
    slug: "paket-srma-intermediate",
    name: "Systematic Review & Meta-Analisis: Intermediate",
    summary: "Video, materi, kuis, template, guideline, dan Prompt AI Professional, ditambah 3x Zoom bersama tutor.",
    price: 599_000,
    hpp: 120_000,
    zoomQuota: 3,
    zoomFee: 40_000,
    toolkit: true,
    order: 202,
    benefits: [
      "Video pembelajaran + materi + kuis, berlaku seumur hidup",
      "Template, guideline, dan Prompt AI Professional, berlaku seumur hidup",
      "3x Zoom bersama tutor (berlaku 6 bulan)",
    ],
  },
  {
    slug: "paket-srma-pro",
    name: "Systematic Review & Meta-Analisis: Pro",
    summary: "Semua isi Intermediate + 3x Zoom + Private 1 on 1 lewat WhatsApp Group sampai full paper diterima.",
    price: 1_199_000,
    hpp: 525_000,
    zoomQuota: 3,
    zoomFee: 35_000,
    toolkit: true,
    milestones: true,
    order: 203,
    benefits: [
      "Video pembelajaran + materi + kuis + template + guideline + Prompt AI, berlaku seumur hidup",
      "3x Zoom bersama tutor (berlaku 6 bulan)",
      "Private 1 on 1 lewat WhatsApp Group (berlaku 6 bulan)",
      "Progres pencapaian dari judul fix sampai full paper diterima",
    ],
  },
];

async function main() {
  const track = await db.track.findUniqueOrThrow({ where: { slug: "medical-research" } });
  const review = await db.category.findUniqueOrThrow({ where: { trackId_slug: { trackId: track.id, slug: "review" } } });
  // Arahan pengguna 12-10-2026: Systematic Review digabung menjadi "Systematic Review and Meta-Analysis";
  // kelas Meta-analysis terpisah dihapus (hanya bila masih kosong: tanpa materi, kuis, dan progres murid).
  const sr = await db.category.update({
    where: { trackId_slug: { trackId: track.id, slug: "review-systematic-review" } },
    data: { title: "Systematic Review and Meta-Analysis" },
  });
  const ma = await db.category.findUnique({
    where: { trackId_slug: { trackId: track.id, slug: "review-meta-analysis" } },
    include: { topics: { include: { quiz: { select: { id: true } }, items: { select: { id: true, _count: { select: { progress: true } } } } } } },
  });
  if (ma) {
    const hasContent = ma.topics.some((t) => t.quiz || t.items.length > 0);
    if (hasContent) console.warn("Kelas Meta-analysis masih berisi materi/kuis; tidak dihapus. Pindahkan isinya dulu.");
    else await db.category.delete({ where: { id: ma.id } });
  }

  // Kelas pilihan untuk template, guideline, dan Prompt AI (hanya terbuka di Intermediate & Pro).
  const toolkit = await db.category.upsert({
    where: { trackId_slug: { trackId: track.id, slug: "review-toolkit-srma" } },
    update: { parentId: review.id },
    create: {
      trackId: track.id,
      slug: "review-toolkit-srma",
      title: "Toolkit SR-MA: Template, Guideline & Prompt AI",
      description: "Template, guideline, dan Prompt AI Professional untuk systematic review & meta-analisis.",
      parentId: review.id,
      displayType: review.displayType,
      order: 6,
    },
  });

  // Gratis: modul pengenalan systematic review dapat dibuka tanpa membeli.
  const intro = await db.item.findFirst({ where: { topic: { categoryId: sr.id }, title: { contains: "Pengantar" } }, orderBy: { order: "asc" } });
  if (intro && !intro.isFree) await db.item.update({ where: { id: intro.id }, data: { isFree: true } });

  for (const t of TIERS) {
    const categoryIds = [sr.id, ...(t.toolkit ? [toolkit.id] : [])];
    const data = {
      name: t.name,
      trackSlug: "medical-research",
      summary: t.summary,
      price: t.price,
      accessDays: null,
      hpp: t.hpp,
      includesMentoring: true,
      mentoringField: "RESEARCH_REVIEW",
      zoomQuota: t.zoomQuota,
      zoomFee: t.zoomFee,
      serviceMonths: 6,
      active: true,
      order: t.order,
    };
    const pkg = await db.package.upsert({ where: { slug: t.slug }, update: data, create: { slug: t.slug, ...data } });
    for (const categoryId of categoryIds) {
      await db.packageCategory.upsert({ where: { packageId_categoryId: { packageId: pkg.id, categoryId } }, update: {}, create: { packageId: pkg.id, categoryId } });
    }
    if ((await db.packageBenefit.count({ where: { packageId: pkg.id } })) === 0) {
      await db.packageBenefit.createMany({ data: t.benefits.map((text, order) => ({ packageId: pkg.id, text, order })) });
    }
    const addon = await db.packageAddon.findFirst({ where: { packageId: pkg.id, name: ADDON.name } });
    if (addon) await db.packageAddon.update({ where: { id: addon.id }, data: { ...ADDON, active: true } });
    else await db.packageAddon.create({ data: { packageId: pkg.id, ...ADDON, order: 1 } });

    if (t.milestones) {
      const stage = await db.serviceStage.upsert({
        where: { packageId_number: { packageId: pkg.id, number: 1 } },
        update: {},
        create: { packageId: pkg.id, number: 1, title: "Pencapaian Private 1 on 1 (WhatsApp Group)", description: "Tutor mengunggah bukti setiap pencapaian; fee masuk payroll setelah diverifikasi admin." },
      });
      for (const [i, [title, fee]] of MILESTONES.entries()) {
        const row = await db.serviceTaskTemplate.findFirst({ where: { stageId: stage.id, title } });
        if (row) await db.serviceTaskTemplate.update({ where: { id: row.id }, data: { fee, order: i } });
        else await db.serviceTaskTemplate.create({ data: { stageId: stage.id, title, fee, order: i } });
      }
    }
  }
  const proFees = MILESTONES.reduce((n, [, f]) => n + f, 0) + 3 * 35_000;
  console.log(`Paket SR-MA siap (Basic, Intermediate, Pro). Cek modal Pro: ${proFees.toLocaleString("id-ID")} (dokumen: 525.000).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
