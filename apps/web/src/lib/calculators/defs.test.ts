// Tes kalkulator generik. Jalankan: npx tsx src/lib/calculators/defs.test.ts
// Setiap kasus latihan di content*.ts dihitung ulang di sini agar jawaban materi = hasil kalkulator.
import assert from "node:assert/strict";
import { DEFS } from "./defs";
import { CALCULATORS } from "./registry";
import { CONTENT } from "./content";
import type { Values } from "./engine";
import { CASES } from "./cases";

function run(slug: string, v: Values) {
  const r = DEFS[slug].compute(v);
  if (r.status !== "ok") throw new Error(`${slug}: ${r.status} ${r.message}`);
  return r;
}
const ok = (slug: string, v: Values, value: string, labelPart?: string) => {
  const r = run(slug, v);
  assert.equal(r.value, value, `${slug} nilai`);
  if (labelPart) assert.ok(r.label.includes(labelPart) || (r.lines ?? []).some((l) => l.includes(labelPart)), `${slug} label "${r.label}" tidak memuat "${labelPart}"`);
  assert.ok(r.copy.length > 0 && r.steps.length > 0);
  return r;
};

// Kasus bersama (juga tampil di dokumen validasi)
for (const c of CASES) ok(c.slug, c.input, c.value, c.label);
// Validasi input dan butir tambahan
assert.equal(DEFS.imt.compute({ bb: "70", tb: "16" }).status, "error");
assert.equal(DEFS.map.compute({ sbp: "80", dbp: "90" }).status, "error");
assert.equal(DEFS["berlin-ards"].compute({ timing: true, imaging: true, origin: true, peep: true, pao2: "70", fio2: "50" }).status, "error");
let r = run("agd", { ph: "7.20", pco2: "25", hco3: "10", na: "135", cl: "100" });
assert.ok(r.lines!.some((l) => l.includes("Anion gap 25")) && r.lines!.some((l) => l.includes("0,93")) && r.copy.includes("kompensasi respiratorik sesuai"));
r = run("agd", { ph: "7.33", pco2: "60", hco3: "31" });
assert.ok(r.lines!.some((l) => l.includes("kronik")));
assert.ok(run("egfr", { sex: "L", age: "60", unit: "mg", scr: "1.5", acr: "50" }).lines!.some((l) => l.includes("G3aA2: risiko tinggi")));
r = run("holliday-segar", { bb: "8", set: "60" });
assert.ok(r.lines!.some((l) => l.startsWith("32 tetes/menit")));
for (const slug of Object.keys(DEFS)) assert.ok(CASES.filter((c) => c.slug === slug).length >= 2, `Kasus uji ${slug} kurang dari 2`);

// Registry: setiap kalkulator aktif punya definisi/komponen, konten lengkap, dan tepat 1 gratis per bidang
const custom = new Set(["gcs", "hpl"]);
for (const c of CALCULATORS.filter((x) => x.status !== "soon")) {
  assert.ok(custom.has(c.slug) || DEFS[c.slug], `Definisi ${c.slug} belum ada`);
  const k = CONTENT[c.slug];
  assert.ok(k, `Konten ${c.slug} belum ada`);
  assert.ok(k.interpretation.length >= 2 && k.material.length >= 3 && k.pitfalls.length >= 3 && k.cases.length >= 2 && k.sources.length >= 1, `Konten ${c.slug} belum lengkap`);
}
for (const field of new Set(CALCULATORS.map((c) => c.field))) {
  assert.equal(CALCULATORS.filter((c) => c.field === field && c.access === "free").length, 1, `Bidang ${field} harus punya tepat 1 kalkulator gratis`);
}
for (const d of Object.keys(DEFS)) assert.ok(CALCULATORS.some((c) => c.slug === d && c.status !== "soon"), `Definisi ${d} tidak terdaftar aktif`);

console.log(`Kalkulator generik: ${Object.keys(DEFS).length} definisi lulus semua kasus uji.`);
