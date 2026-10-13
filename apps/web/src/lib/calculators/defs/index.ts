// Daftar definisi kalkulator generik per slug (aman untuk browser).
import type { CalcDef } from "../engine";
import { imt, map } from "./umum";
import { qsofa, sirs, agd, egfr } from "./penyakit-dalam";
import { curb65, berlin, light, pfRatio } from "./paru";
import { chadsvasc, hfStages, killip, nyha, hipertensi } from "./kardio";
import { centor, nose, rsi, paradise, stopbang } from "./tht";
import { siriraj, nihss, abcd2, fourScore } from "./neuro";
import { vbac, lukaBakar } from "./obsgyn-bedah";
import { antropometri } from "./antropometri";
import { giziBuruk } from "./gizi-buruk";
import { tdAnak } from "./td-anak";
import { ikterus } from "./ikterus";
import { natrium, kalium } from "./elektrolit";
import { ekg } from "./ekg";
import { asma, asmaKontrol, aria } from "./asma-aria";
import { kpsp } from "./kpsp";
import { imunisasi } from "./imunisasi";
import { tfu } from "./tfu";
import { bishop, cairanDewasa, alvarado, dehidrasi, kalori, gangguanDengar } from "./tambahan";
import { midParental, pat, ballard, downes, gir, hollidaySegar, skorTbAnak } from "./anak";

const ALL: CalcDef[] = [
  imt, map,
  qsofa, sirs, agd, egfr,
  curb65, berlin, light, pfRatio,
  chadsvasc, hfStages, killip, nyha, hipertensi,
  centor, nose, rsi, paradise, stopbang,
  siriraj, nihss, abcd2, fourScore,
  vbac, lukaBakar,
  midParental, pat, ballard, downes, gir, hollidaySegar, skorTbAnak,
  bishop, cairanDewasa, alvarado, dehidrasi, kalori, gangguanDengar,
  antropometri, giziBuruk, tdAnak, ikterus,
  natrium, kalium, ekg,
  asma, asmaKontrol, aria, kpsp, imunisasi, tfu,
];

export const DEFS: Record<string, CalcDef> = Object.fromEntries(ALL.map((d) => [d.slug, d]));
