// Membuat rencana pengisian formulir (kasus uji pertama tiap kalkulator) untuk cuplikan layar.
import fs from "node:fs";
import { DEFS } from "../../../apps/web/src/lib/calculators/defs";
import { CASES } from "../../../apps/web/src/lib/calculators/cases";
const plan: Record<string, { kind: string; label: string; value?: string }[]> = {};
for (const slug of Object.keys(DEFS)) {
  const c = CASES.find((k) => k.slug === slug);
  if (!c) continue;
  const steps: { kind: string; label: string; value?: string }[] = [];
  for (const f of DEFS[slug].fields) {
    if (f.type === "heading") continue;
    const v = c.input[f.id];
    if (v === undefined || v === false || v === "") continue;
    if (f.type === "check") steps.push({ kind: "check", label: f.label });
    else if (f.type === "select") steps.push({ kind: "select", label: f.label, value: f.options.find((o) => o.value === v)!.label });
    else steps.push({ kind: "fill", label: f.label, value: String(v) });
  }
  plan[slug] = steps;
}
fs.writeFileSync(process.argv[2], JSON.stringify(plan, null, 1));
console.log(Object.keys(plan).length, "kalkulator");
