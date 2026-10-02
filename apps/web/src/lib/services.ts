// Perhitungan harga layanan. Harga selalu dihitung ulang di server dari data
// layanan, bukan dari angka yang dikirim browser.

type Duration = { id: string; label: string; months: number; price: number | null; hpp?: number | null; active: boolean };
type Addon = { id: string; name: string; price: number | null; hpp?: number | null; active: boolean };
type Service = { price: number | null; durations: Duration[]; addons: Addon[] };

export function activeDurations<T extends { active: boolean }>(list: T[]) {
  return list.filter((d) => d.active);
}

// Harga terendah untuk label "mulai dari".
export function startingPrice(s: Service): number | null {
  const prices = activeDurations(s.durations)
    .map((d) => d.price)
    .filter((p): p is number => p !== null);
  if (prices.length) return Math.min(...prices);
  return s.price;
}

export type Quote = {
  duration: Duration | null;
  addons: Addon[];
  basePrice: number | null;
  total: number | null; // null bila ada komponen yang harganya belum ditetapkan
};

export class QuoteError extends Error {}

export function quote(s: Service, durationId: string | null, addonIds: string[]): Quote {
  const durations = activeDurations(s.durations);
  let duration: Duration | null = null;
  if (durations.length) {
    duration = durations.find((d) => d.id === durationId) ?? null;
    if (!duration) throw new QuoteError("Pilih masa waktu belajar.");
  }
  const addons = activeDurations(s.addons).filter((a) => addonIds.includes(a.id));
  if (addons.length !== new Set(addonIds).size) throw new QuoteError("Add-on tidak valid.");

  const basePrice = duration ? duration.price : s.price;
  const parts = [basePrice, ...addons.map((a) => a.price)];
  const total = parts.some((p) => p === null) ? null : parts.reduce<number>((sum, p) => sum + (p as number), 0);
  return { duration, addons, basePrice, total };
}

export function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export const ELIGIBILITY_LEVELS = ["PRIMARY", "BACKUP"] as const;
export const ELIGIBILITY_LABEL: Record<string, string> = {
  PRIMARY: "Primary",
  BACKUP: "Backup",
  NONE: "Tidak berwenang",
};
