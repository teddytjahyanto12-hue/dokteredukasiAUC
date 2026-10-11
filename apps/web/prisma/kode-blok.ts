// Kode awal 22 Blok Basic Medical Science (arahan pengguna 11-10-2026: Blok 12 Kardiovaskuler = BKV-12, Bab 1 = BKV-12.1).
// Pola: "B" + dua huruf singkatan Blok + "-" + nomor Blok. Kode Bab dihitung otomatis dari kode Blok + nomor Bab.
// Hanya mengisi Blok yang kodenya masih kosong, sehingga kode yang sudah diubah admin tidak ditimpa.
// Jalankan: npm run db:kode-blok

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const CODES: Record<string, string> = {
  tulang: "BAT",
  otot: "BAO",
  "saraf-pembuluh": "BAS",
  fisiologi: "BFD",
  histologi: "BHD",
  biokimia: "BBD",
  ikm: "BIK",
  "siklus-hidup": "BSH",
  hematologi: "BHM",
  imun: "BII",
  muskuloskeletal: "BMK",
  kardio: "BKV",
  respirasi: "BRS",
  gastro: "BGI",
  hepatobilier: "BHB",
  endokrin: "BEM",
  urogenital: "BUG",
  reproduksi: "BRP",
  "saraf-jiwa": "BSJ",
  indera: "BPI",
  "gawat-darurat": "BKM",
  "etika-forensik": "BEH",
};

async function main() {
  const blocks = await db.category.findMany({ where: { parentId: { not: null }, artKey: { not: null } }, orderBy: { order: "asc" } });
  let set = 0;
  for (const b of blocks) {
    const prefix = CODES[b.artKey ?? ""];
    if (!prefix || b.code) continue;
    await db.category.update({ where: { id: b.id }, data: { code: `${prefix}-${b.order}` } });
    set++;
  }
  console.log(`Kode Blok diisi: ${set} (dari ${blocks.length} Blok).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
