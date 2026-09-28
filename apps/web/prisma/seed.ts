// Data awal sesuai framework "Dokter Edukasi Learning" (design/framework-pengguna/).
// Aman dijalankan berulang: data yang sudah ada tidak digandakan.
// Jalankan: npm run db:seed

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

type CategorySeed = { slug: string; title: string; description: string; displayType: string; topics: string[] };
type TrackSeed = { slug: string; title: string; description: string; hasMentoring: boolean; categories: CategorySeed[] };

const TRACKS: TrackSeed[] = [
  {
    slug: "pre-clinical",
    title: "Pre-Clinical",
    description: "Fondasi ilmu kedokteran dasar: materi slide per topik dengan quiz, e-book, dan daftar pustaka.",
    hasMentoring: false,
    categories: [
      {
        slug: "basic-medical-science",
        title: "Basic Medical Science",
        description: "Paparan materi dalam bentuk slide seperti LMS. Setiap topik dilengkapi quiz.",
        displayType: "SLIDES",
        topics: ["Contoh Topik — ubah atau hapus di panel admin"],
      },
      {
        slug: "medical-e-books",
        title: "Medical E-books",
        description: "E-book ditampilkan langsung di website (PDF). Cadangan: tautan Google Drive.",
        displayType: "PDF",
        topics: ["Koleksi E-book"],
      },
      {
        slug: "daftar-pustaka",
        title: "Daftar Pustaka",
        description: "Kumpulan tautan sumber, dibagi per section materi.",
        displayType: "LINKS",
        topics: ["Section: Basic Medical Science"],
      },
    ],
  },
  {
    slug: "clinical-practice",
    title: "Clinical Practice",
    description: "Pegangan praktik klinis: guideline, latihan EKG, dan cheatsheet — tersedia bimbingan tutor spesialis.",
    hasMentoring: true,
    categories: [
      {
        slug: "clinical-guidelines",
        title: "Clinical Guidelines",
        description: "Merujuk langsung ke sumber guideline resmi.",
        displayType: "LINKS",
        topics: ["Daftar Guideline"],
      },
      {
        slug: "ecg-challenges",
        title: "ECG Challenges",
        description: "Pelajari materi EKG, lalu uji pemahaman dengan quiz.",
        displayType: "MATERIAL_QUIZ",
        topics: ["Dasar Membaca EKG"],
      },
      {
        slug: "medical-cheatsheet",
        title: "Medical Cheatsheet",
        description: "Ringkasan praktis dalam PDF. Kolom tanya-jawab AI akan ditambahkan.",
        displayType: "CHEATSHEET",
        topics: ["Koleksi Cheatsheet"],
      },
    ],
  },
  {
    slug: "medical-research",
    title: "Medical Research",
    description: "Dari original research sampai review dan pengolahan data — tersedia bimbingan tutor riset.",
    hasMentoring: true,
    categories: [
      {
        slug: "original-research",
        title: "Original Research",
        description: "Dibagi per jenis analisis.",
        displayType: "MATERIAL",
        topics: ["Univariate", "Multivariate"],
      },
      {
        slug: "review",
        title: "Review",
        description: "Berbagai jenis review artikel ilmiah.",
        displayType: "MATERIAL",
        topics: ["Narrative Literature Review", "Systematic Review", "Meta-analysis", "Scoping Review", "Bibliometric Analysis"],
      },
      {
        slug: "case-report",
        title: "Case Report",
        description: "Menyusun laporan kasus.",
        displayType: "MATERIAL",
        topics: ["Case Report"],
      },
      {
        slug: "pengolahan-data",
        title: "Pengolahan Data",
        description: "Dibagi sesuai aplikasi pengolah data.",
        displayType: "MATERIAL",
        topics: ["RStudio", "SPSS", "STATA"],
      },
    ],
  },
];

// Nama paket disusun dari framework; harga & masa akses sengaja kosong (ditetapkan nanti di panel admin).
type PackageSeed = {
  slug: string;
  name: string;
  trackSlug: string;
  summary: string;
  categories: string[]; // "trackSlug/categorySlug"
  includesMentoring?: boolean;
  mentoringField?: string;
};

const PACKAGES: PackageSeed[] = [
  { slug: "pre-clinical-basic-medical-science", name: "Pre-Clinical — Basic Medical Science", trackSlug: "pre-clinical", summary: "Slide materi per topik + quiz.", categories: ["pre-clinical/basic-medical-science"] },
  { slug: "pre-clinical-medical-e-books", name: "Pre-Clinical — Medical E-books", trackSlug: "pre-clinical", summary: "Akses koleksi e-book di website.", categories: ["pre-clinical/medical-e-books"] },
  { slug: "pre-clinical-lengkap", name: "Pre-Clinical Lengkap", trackSlug: "pre-clinical", summary: "Basic Medical Science, Medical E-books, dan Daftar Pustaka.", categories: ["pre-clinical/basic-medical-science", "pre-clinical/medical-e-books", "pre-clinical/daftar-pustaka"] },
  { slug: "clinical-ecg-challenges", name: "Clinical Practice — ECG Challenges", trackSlug: "clinical-practice", summary: "Materi EKG dan quiz.", categories: ["clinical-practice/ecg-challenges"] },
  { slug: "clinical-medical-cheatsheet", name: "Clinical Practice — Medical Cheatsheet", trackSlug: "clinical-practice", summary: "Cheatsheet PDF (AI menyusul).", categories: ["clinical-practice/medical-cheatsheet"] },
  { slug: "clinical-practice-lengkap", name: "Clinical Practice Lengkap", trackSlug: "clinical-practice", summary: "Clinical Guidelines, ECG Challenges, dan Medical Cheatsheet.", categories: ["clinical-practice/clinical-guidelines", "clinical-practice/ecg-challenges", "clinical-practice/medical-cheatsheet"] },
  { slug: "bimbingan-clinical-practice", name: "Bimbingan Clinical Practice", trackSlug: "clinical-practice", summary: "Bimbingan dengan tutor spesialis + akses Clinical Practice Lengkap.", categories: ["clinical-practice/clinical-guidelines", "clinical-practice/ecg-challenges", "clinical-practice/medical-cheatsheet"], includesMentoring: true, mentoringField: "CLINICAL" },
  { slug: "medical-research-materi", name: "Medical Research — Materi Lengkap", trackSlug: "medical-research", summary: "Original Research, Review, Case Report, dan Pengolahan Data.", categories: ["medical-research/original-research", "medical-research/review", "medical-research/case-report", "medical-research/pengolahan-data"] },
  { slug: "bimbingan-research-review", name: "Bimbingan Medical Research — Review", trackSlug: "medical-research", summary: "Bimbingan Zoom untuk narrative/systematic review, meta-analysis, scoping, bibliometric + akses materi riset.", categories: ["medical-research/original-research", "medical-research/review", "medical-research/case-report", "medical-research/pengolahan-data"], includesMentoring: true, mentoringField: "RESEARCH_REVIEW" },
  { slug: "bimbingan-research-original", name: "Bimbingan Medical Research — Original Research", trackSlug: "medical-research", summary: "Bimbingan Zoom untuk original research + akses materi riset.", categories: ["medical-research/original-research", "medical-research/review", "medical-research/case-report", "medical-research/pengolahan-data"], includesMentoring: true, mentoringField: "RESEARCH_ORIGINAL" },
];

async function seedContent() {
  const categoryIds = new Map<string, string>();
  for (const [ti, t] of TRACKS.entries()) {
    const track = await db.track.upsert({
      where: { slug: t.slug },
      update: {},
      create: { slug: t.slug, title: t.title, description: t.description, hasMentoring: t.hasMentoring, order: ti },
    });
    for (const [ci, c] of t.categories.entries()) {
      const existing = await db.category.findUnique({ where: { trackId_slug: { trackId: track.id, slug: c.slug } } });
      const category =
        existing ??
        (await db.category.create({
          data: { trackId: track.id, slug: c.slug, title: c.title, description: c.description, displayType: c.displayType, order: ci },
        }));
      categoryIds.set(`${t.slug}/${c.slug}`, category.id);
      if (!existing) {
        for (const [oi, title] of c.topics.entries()) {
          await db.topic.create({ data: { categoryId: category.id, title, order: oi } });
        }
      }
    }
  }
  return categoryIds;
}

async function seedExampleQuiz() {
  const topic = await db.topic.findFirst({
    where: { title: { startsWith: "Contoh Topik" }, category: { slug: "basic-medical-science" } },
    include: { quiz: true },
  });
  if (!topic || topic.quiz) return;
  await db.item.create({
    data: {
      topicId: topic.id,
      type: "TEXT",
      title: "Cara mengisi topik ini",
      body: "Ini contoh isi. Di panel admin (Konten → Basic Medical Science), unggah PDF hasil ekspor PPTX sebagai item bertipe Slide, lalu ubah atau hapus contoh ini.",
      isFree: true,
    },
  });
  await db.quiz.create({
    data: {
      topicId: topic.id,
      title: "Quiz contoh",
      questions: {
        create: [
          {
            text: "Contoh soal: bilik jantung yang memompa darah ke aorta adalah…",
            explanation: "Ventrikel kiri memompa darah kaya oksigen ke aorta.",
            order: 0,
            options: {
              create: [
                { text: "Atrium kanan", order: 0 },
                { text: "Ventrikel kanan", order: 1 },
                { text: "Ventrikel kiri", isCorrect: true, order: 2 },
                { text: "Atrium kiri", order: 3 },
              ],
            },
          },
        ],
      },
    },
  });
}

async function seedPackages(categoryIds: Map<string, string>) {
  for (const [i, p] of PACKAGES.entries()) {
    const exists = await db.package.findUnique({ where: { slug: p.slug } });
    if (exists) continue;
    await db.package.create({
      data: {
        slug: p.slug,
        name: p.name,
        trackSlug: p.trackSlug,
        summary: p.summary,
        includesMentoring: p.includesMentoring ?? false,
        mentoringField: p.mentoringField,
        order: i,
        categories: {
          create: p.categories.map((key) => {
            const categoryId = categoryIds.get(key);
            if (!categoryId) throw new Error(`Kategori ${key} tidak ditemukan`);
            return { categoryId };
          }),
        },
      },
    });
  }
}

async function upsertUser(email: string, name: string, role: string, password: string) {
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) return existing;
  return db.user.create({ data: { email, name, role, passwordHash: await bcrypt.hash(password, 10) } });
}

async function seedUsers() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) throw new Error("Isi SEED_ADMIN_EMAIL dan SEED_ADMIN_PASSWORD di .env");
  await upsertUser(adminEmail, "Admin Master", "ADMIN", adminPassword);

  if (process.env.SEED_DEMO !== "true") return;
  const demoPassword = process.env.SEED_DEMO_PASSWORD || adminPassword;
  const tutor = await upsertUser("tutor@dokteredukasi.test", "Tutor Demo (Research Review)", "TUTOR", demoPassword);
  await upsertUser("murid@dokteredukasi.test", "Murid Demo", "STUDENT", demoPassword);

  const profile = await db.tutorProfile.upsert({
    where: { userId: tutor.id },
    update: {},
    create: { userId: tutor.id, field: "RESEARCH_REVIEW", rateNote: "Rate bimbingan Zoom — belum ditetapkan" },
  });
  const research = await db.track.findUnique({ where: { slug: "medical-research" } });
  if (research) {
    await db.tutorTrackAccess.upsert({
      where: { tutorProfileId_trackId: { tutorProfileId: profile.id, trackId: research.id } },
      update: {},
      create: { tutorProfileId: profile.id, trackId: research.id },
    });
  }
}

async function main() {
  const categoryIds = await seedContent();
  await seedExampleQuiz();
  await seedPackages(categoryIds);
  await seedUsers();
  const counts = await Promise.all([db.track.count(), db.category.count(), db.topic.count(), db.package.count(), db.user.count()]);
  console.log(`Seed selesai: ${counts[0]} jalur, ${counts[1]} kategori, ${counts[2]} topik, ${counts[3]} paket, ${counts[4]} pengguna.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
