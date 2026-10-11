// Arahan pengguna 12-10-2026:
// - Nomor WhatsApp admin (Admin 1) untuk tombol Chat Admin, invoice manual, dan permintaan Zoom.
// - Paket lama yang sudah punya pengganti dihapus. Paket yang sudah punya order hanya dinonaktifkan
//   (aturan sistem: riwayat order, hak akses, dan bimbingan lama tidak boleh rusak).
// Aman dijalankan berulang. Jalankan: npm run db:revisi-2026-10-12

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const ADMIN_WHATSAPP = "085174121270";

// slug paket lama → paket penggantinya
const REPLACED: Record<string, string> = {
  "pre-clinical-basic-medical-science": "Paket 1 Blok / Paket Blok Komplit (22 Blok)",
  "bimbingan-research-review": "Systematic Review & Meta-Analisis: Basic / Intermediate / Pro",
};

async function main() {
  const wa = await db.setting.findUnique({ where: { key: "adminWhatsapp" } });
  if (!wa?.value) await db.setting.upsert({ where: { key: "adminWhatsapp" }, update: { value: ADMIN_WHATSAPP }, create: { key: "adminWhatsapp", value: ADMIN_WHATSAPP } });

  for (const [slug, replacement] of Object.entries(REPLACED)) {
    const pkg = await db.package.findUnique({ where: { slug }, include: { _count: { select: { orders: true } } } });
    if (!pkg) continue;
    if (pkg._count.orders === 0) {
      await db.package.delete({ where: { id: pkg.id } });
      console.log(`Dihapus: ${pkg.name} (diganti ${replacement}).`);
    } else {
      await db.package.update({ where: { id: pkg.id }, data: { active: false } });
      console.log(`Dinonaktifkan: ${pkg.name} (${pkg._count.orders} order lama dipertahankan; diganti ${replacement}).`);
    }
  }
  console.log(`WhatsApp admin: ${(await db.setting.findUnique({ where: { key: "adminWhatsapp" } }))?.value}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
