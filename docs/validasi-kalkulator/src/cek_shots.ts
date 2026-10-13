import fs from "node:fs";
import { CASES } from "../../../apps/web/src/lib/calculators/cases";
const res = JSON.parse(fs.readFileSync("shots/semua/hasil.json", "utf8"));
let bad = 0;
for (const slug of Object.keys(res)) {
  const c = CASES.find((k) => k.slug === slug); if (!c) continue;
  const t = res[slug].replace(/\s+/g, " ");
  if (!t.includes(c.value)) { bad++; console.log("BEDA", slug, "harap", c.value, "|", t.slice(0, 120)); }
}
console.log("diperiksa", Object.keys(res).length, "beda", bad);
