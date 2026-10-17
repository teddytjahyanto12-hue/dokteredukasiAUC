// Tes mesin hitung dan data Dosis Obat Anak. Jalankan: npx tsx src/lib/dosis-obat/dose.test.ts
import assert from "node:assert/strict";
import { bsaMosteller, computeDose, factorVIII, findDoses, findImplicitPerKgDay, fmt, parseNum, parseStrength, toMl } from "./dose";
import data from "./data.json";
import type { DoseData } from "./types";

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 1e-9, `${a} ≠ ${b}`);

// Angka Indonesia
assert.equal(parseNum("0,5"), 0.5);
assert.equal(parseNum("1.5"), 1.5);
assert.equal(parseNum("1.000"), 1000);
assert.equal(parseNum("2.800"), 2800);
assert.equal(parseNum("7,5"), 7.5);

// Parasetamol oral: "20 mg/kg, kemudian 15 mg/kg/kali, po, tiap 4 jam (maks 90 mg/kg/hari)"
{
  const ms = findDoses("20 mg/kg, kemudian 15 mg/kg/kali, po, tiap 4 jam (maks 90 mg/kg/hari)");
  assert.equal(ms.length, 3);
  const loading = computeDose(ms[0], 10)!;
  assert.equal(ms[0].first, true, "20 mg/kg adalah dosis awal");
  assert.deepEqual(loading.first, [200, 200]);
  assert.equal(loading.perDay, undefined);
  assert.equal(ms[1].first, undefined);
  const main = computeDose(ms[1], 10)!;
  assert.deepEqual(main.perDose, [150, 150]);
  assert.deepEqual(main.perDay, [900, 900]);
  assert.equal(ms[1].max, undefined, "batas per kg tidak boleh dipakai sebagai batas absolut");
  assert.deepEqual(computeDose(ms[2], 10)!.perDay, [900, 900]);
}

// Batas maksimal absolut per hari memotong hasil harian
{
  const [m] = findDoses("1–2 mg/kg, 6–8 jam (maks 50 mg/hari)");
  const r = computeDose(m, 20)!;
  assert.deepEqual(r.perDose, [20, 40]);
  assert.deepEqual(r.perDay, [50, 50]);
  assert.equal(r.cappedDay, true);
}

// Batas per dosis
{
  const [m] = findDoses("8 mg/kg (maks 300 mg/dosis), per oral, 12 jam");
  const r = computeDose(m, 50)!;
  assert.deepEqual(r.perDose, [300, 300]);
  assert.equal(r.cappedDose, true);
  assert.deepEqual(r.perDay, [600, 600]);
}

// Batas berupa rentang tidak memotong
{
  const [m] = findDoses("0,5–1 mg/kg (maks 25–50 mg), 12–24 jam");
  assert.equal(m.max, undefined);
}

// mg/kg/hari dibagi n dosis
{
  const [m] = findDoses("100 mg/kg/hari dalam 2 dosis (maksimal 4 g)");
  const r = computeDose(m, 50)!;
  assert.deepEqual(r.perDay, [4000, 4000]);
  assert.equal(r.cappedDay, true);
  assert.deepEqual(r.perDose, [2000, 2000]);
}

// Tabel antimikroba "dosis per kg per hari": angka dalam kurung tidak dihitung
{
  const [m] = findImplicitPerKgDay("50–200 mg dalam 4 dosis (dosis harian dewasa, 2–4 g)");
  assert.equal(m.implicit, true);
  const r = computeDose(m, 10)!;
  assert.deepEqual(r.perDay, [500, 2000]);
  assert.deepEqual(r.perDose, [125, 500]);
  assert.equal(findImplicitPerKgDay("Tidak cocok").length, 0);
}

// Durasi infus bukan interval
{
  const [m] = findDoses("150 mg/kg dalam D5% IV dalam 1 jam");
  assert.equal(m.intervalH, undefined);
  assert.equal(computeDose(m, 10)!.perDay, undefined);
  const [d] = findDoses("15 mcg/kg, 5 mcg/kg setelah 6 jam");
  assert.equal(d.intervalH, undefined);
}

// Interval <4 jam tidak dikonversi ke dosis harian
assert.equal(findDoses("0,02 mg/kg, per oral, 2 jam")[0].intervalH, undefined);

// Interval >24 jam tidak menjadi dosis per hari
{
  const r = computeDose({ raw: "5 mg/kg", dose: [5, 5], unit: "mg", basis: "kg", per: "kali", intervalH: [48, 48] }, 2.5)!;
  assert.deepEqual(r.perDose, [12.5, 12.5]);
  assert.equal(r.perDay, undefined);
}

// Dosis awal dari kata "loading"; dosis setelahnya bukan dosis awal
{
  const ms = findDoses("*Loading dose* 6–8 mg/kg (maksimal 500 mg) IV diencerkan dalam 20 ml NaCl 0,9% diberikan selama 30 menit; rumatan: 0,5 mg/kg/jam");
  assert.equal(ms[0].first, true);
  assert.deepEqual(computeDose(ms[0], 100)!.first, [500, 500]);
  assert.equal(ms[1].first, undefined);
  const dg = findDoses("15 mcg/kg, 5 mcg/kg setelah 6 jam, kemudian 3–5 mcg/kg (maks dosis 200 mcg IV atau 250 mcg oral), 12 jam");
  assert.equal(dg[0].first, undefined, "tanpa 'kemudian' langsung setelahnya bukan dosis awal");
  assert.equal(dg[1].first, undefined, "hanya dosis pertama yang bisa menjadi dosis awal");
}

// "kemudian" setelah dosis yang diulang bukan dosis awal; "dosis inisial" bukan dosis awal
assert.equal(findDoses("25 mg/kg (maks 2 gram), per oral, 6 jam selama 3 hari, kemudian 15–20 mg/kg, per oral, 6 jam")[0].first, undefined);
assert.equal(findDoses("0,05 mg/kg (maks 2,5 mg) tiap 5 mnt bila perlu (maks 4 dosis), kemudian 0,1–0,2 mg/kg")[0].first, undefined);
assert.equal(findDoses("0,5–1 mg/kg, 6 jam, oral, IV, atau IM hari pertama, 12 jam hari kedua, kemudian 1 mg/kg/hari")[0].first, undefined);
assert.equal(findDoses("0,5 mg/kg/dosis sekali sehari, dosis bisa ditingkatkan 0,25 mg/kg")[0].first, undefined);
assert.equal(findDoses("150 mg/kg dalam D5% IV dalam 1 jam, dilanjutkan 10 mg/kg/jam selama 20 jam")[0].first, true);
assert.equal(findDoses("0,02 mg/kg (maks 0,6 mg), kemudian 0,01 mg/kg, 4–6 jam")[0].first, true);

// Laju infus
{
  const [m] = findDoses("5–15 mcg/kg/mnt");
  const r = computeDose(m, 10)!;
  assert.deepEqual(r.rate, { value: [50, 150], per: "menit" });
}

// Dosis per m² memakai LPT Mosteller
{
  const bsa = bsaMosteller(20, 110)!;
  near(bsa, Math.sqrt((20 * 110) / 3600));
  const [m] = findDoses("1,5 mg/m2 IV dalam 1 menit, setiap minggu");
  assert.equal(m.basis, "m2");
  assert.equal(computeDose(m, 20), null, "tanpa LPT tidak dihitung");
  near(computeDose(m, 20, bsa)!.plain![0], 1.5 * bsa);
}

// Kekuatan sediaan dan konversi mL
{
  const s = parseStrength("Sirup 120 mg/5 mL")!;
  assert.equal(s.perMl, 24);
  assert.equal(toMl(240, "mg", s), 10);
  assert.equal(toMl(0.24, "g", s), 10);
  assert.equal(toMl(240, "IU", s), null);
  assert.equal(parseStrength("Tablet 500 mg"), null);
  assert.equal(parseStrength("Injeksi 1 mg/mL")!.perMl, 1);
}

// Faktor VIII (FORNAS): unit = BB × (target − kadar) × 0,5
assert.equal(factorVIII(20, 80, 0), 800);
assert.equal(factorVIII(20, 30, 50), null);

// Format tampilan
assert.equal(fmt(1500), "1.500");
assert.equal(fmt(0.75), "0,75");

// Data hasil pembangkit
{
  const d = data as DoseData;
  assert.equal(d.drugs.length, 134);
  assert.equal(new Set(d.drugs.map((x) => x.slug)).size, 134);
  for (const x of d.drugs) {
    assert.ok(x.blocks.some((b) => b.kind === "pustaka"), `${x.name}: tanpa daftar pustaka`);
    assert.ok(x.blocks.some((b) => b.kind === "sediaan"), `${x.name}: tanpa sediaan`);
  }
  assert.equal(d.drugs.find((x) => x.special === "faktor-viii")?.name, "Faktor VIII (Konsentrat)");
}

console.log("Tes Dosis Obat Anak lulus");
