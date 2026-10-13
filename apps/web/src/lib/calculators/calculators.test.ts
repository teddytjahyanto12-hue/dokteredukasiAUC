// Tes rumus kalkulator. Jalankan: npx tsx src/lib/calculators/calculators.test.ts
// Kasus uji yang sama dicantumkan di dokumen validasi (docs/validasi-kalkulator/).
import assert from "node:assert/strict";
import { computeGcs, gcsCopyText, gcsSeverity } from "./gcs";
import { computeHpl, naegele, termLabel, trimesterOf } from "./hpl";
import { CALCULATORS } from "./registry";
import { CONTENT } from "./content";

// GCS
assert.deepEqual(computeGcs({ eye: 4, verbal: 5, motor: 6 }).total, 15);
assert.equal(computeGcs({ eye: 1, verbal: 1, motor: 1 }).total, 3);
assert.equal(computeGcs({ eye: 3, verbal: 4, motor: 5 }).notation, "E3 V4 M5");
assert.equal(computeGcs({ eye: 3, verbal: 4, motor: 5 }).total, 12);
assert.equal(computeGcs({ eye: 1, verbal: 2, motor: 2 }).severity, "berat");
assert.equal(gcsSeverity(13), "ringan"); assert.equal(gcsSeverity(12), "sedang"); assert.equal(gcsSeverity(9), "sedang"); assert.equal(gcsSeverity(8), "berat");
const nt = computeGcs({ eye: 4, verbal: "NT", motor: 6 });
assert.equal(nt.total, null); assert.equal(nt.notation, "E4 V(NT) M6"); assert.ok(nt.hasNT);
assert.equal(computeGcs({ eye: 4, verbal: null, motor: 6 }).complete, false);
assert.throws(() => computeGcs({ eye: 5, verbal: 5, motor: 6 }));
assert.throws(() => computeGcs({ eye: 4, verbal: 5, motor: 7 }));
assert.equal(gcsCopyText(computeGcs({ eye: 3, verbal: 4, motor: 5 })), "GCS 12 (E3V4M5), derajat sedang (9–12)");

// HPL dari HPHT (kasus di halaman)
const h1 = computeHpl({ method: "hpht", hpht: "2026-01-10", today: "2026-01-10" });
assert.equal(h1.hpl, "2026-10-17"); assert.equal(naegele("2026-01-10"), "2026-10-17"); assert.equal(h1.naegeleDiff, 0); assert.equal(h1.gaDays, 0);
const h2 = computeHpl({ method: "hpht", hpht: "2026-03-01", today: "2026-03-01" });
assert.equal(h2.hpl, "2026-12-06"); assert.equal(h2.naegele, "2026-12-08"); assert.equal(h2.naegeleDiff, 2);
// Lintas tahun dan tahun kabisat
assert.equal(computeHpl({ method: "hpht", hpht: "2026-05-20", today: "2026-10-12" }).hpl, "2027-02-24");
assert.equal(naegele("2026-05-20"), "2027-02-27");
assert.equal(computeHpl({ method: "hpht", hpht: "2027-06-01", today: "2027-06-01" }).hpl, "2028-03-07");
assert.equal(naegele("2027-05-24"), "2028-02-29"); // 31 Mei + 9 bulan, 2028 kabisat
assert.equal(naegele("2026-05-24"), "2027-02-28"); // 31 Mei + 9 bulan dibulatkan ke akhir Februari
// Usia kehamilan
const g = computeHpl({ method: "hpht", hpht: "2026-05-20", today: "2026-10-12" });
assert.equal(g.gaDays, 145); assert.equal(g.gaWeeks, 20); assert.equal(g.gaRemDays, 5); assert.equal(g.trimester, 2); assert.equal(g.daysToHpl, 135);
// USG dan IVF
assert.equal(computeHpl({ method: "usg", usgDate: "2026-06-01", usgWeeks: 10, usgDays: 2, today: "2026-06-01" }).hpl, "2026-12-26");
assert.equal(computeHpl({ method: "embrio", transferDate: "2026-03-01", embryoDay: 5, today: "2026-03-01" }).hpl, "2026-11-17");
assert.equal(computeHpl({ method: "embrio", transferDate: "2026-03-01", embryoDay: 3, today: "2026-03-01" }).hpl, "2026-11-19");
assert.throws(() => computeHpl({ method: "usg", usgDate: "2026-06-01", usgWeeks: 10, usgDays: 7, today: "2026-06-01" }));
assert.throws(() => computeHpl({ method: "hpht", hpht: "2026-02-30", today: "2026-03-01" }));
// Batas trimester dan kategori term
assert.equal(trimesterOf(13 * 7 + 6), 1); assert.equal(trimesterOf(14 * 7), 2); assert.equal(trimesterOf(27 * 7 + 6), 2); assert.equal(trimesterOf(28 * 7), 3);
assert.match(termLabel(36 * 7 + 6), /Preterm/); assert.match(termLabel(37 * 7), /Early term/); assert.match(termLabel(39 * 7), /Full term/);
assert.match(termLabel(41 * 7), /Late term/); assert.match(termLabel(42 * 7), /Postterm/);

// Registry: kalkulator aktif wajib punya konten dan sumber
for (const c of CALCULATORS.filter((x) => x.status !== "soon")) {
  assert.ok(CONTENT[c.slug], `Konten ${c.slug} belum ada`);
  assert.ok(CONTENT[c.slug].sources.length > 0 && CONTENT[c.slug].cases.length > 0);
}
assert.equal(new Set(CALCULATORS.map((c) => c.slug)).size, CALCULATORS.length);
// Aturan akses: tepat 1 kalkulator Gratis per bidang; konten Premium (materi) wajib ada untuk kalkulator aktif.
for (const field of new Set(CALCULATORS.map((c) => c.field))) {
  assert.equal(CALCULATORS.filter((c) => c.field === field && c.access === "free").length, 1, `Bidang ${field} harus punya tepat 1 kalkulator gratis`);
}
for (const c of CALCULATORS.filter((x) => x.status !== "soon")) assert.ok(CONTENT[c.slug].material.length > 0, `Materi ${c.slug} kosong`);

// Setiap sumber wajib bertautan (keputusan pemilik 12 Okt 2026).
for (const [slug, c] of Object.entries(CONTENT)) for (const s of c.sources) assert.ok(s.url, `Sumber ${slug} belum bertautan: ${s.label}`);

console.log("Kalkulator: GCS dan HPL lulus semua kasus uji.");
