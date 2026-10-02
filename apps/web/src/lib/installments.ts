// Cicilan & kunci tahap.
// Aturan layanan: cicilan ke-n (persen dari total) membuka tahap tertentu.
// Tahap N terkunci selama masih ada cicilan belum lunas yang membuka tahap ≤ N.

export type RuleLike = { seq: number; label: string; percent: number; unlocksStage: number };

export function rulesValid(rules: RuleLike[]) {
  if (rules.length < 2 || rules.length > 3) return "Cicilan harus 2 atau 3 kali.";
  if (rules.reduce((s, r) => s + r.percent, 0) !== 100) return "Total persentase cicilan harus 100%.";
  if (rules.some((r) => r.percent <= 0)) return "Setiap cicilan harus lebih dari 0%.";
  const sorted = [...rules].sort((a, b) => a.seq - b.seq);
  if (sorted[0].unlocksStage !== 1) return "Cicilan pertama harus membuka tahap 1.";
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].unlocksStage <= sorted[i - 1].unlocksStage) return "Cicilan berikutnya harus membuka tahap yang lebih tinggi.";
  }
  return null;
}

// Membagi total ke jadwal cicilan; sisa pembulatan masuk ke cicilan terakhir.
export function splitInstallments(total: number | null, rules: RuleLike[]) {
  const sorted = [...rules].sort((a, b) => a.seq - b.seq);
  if (total === null) return sorted.map((r) => ({ ...r, amount: null as number | null }));
  let used = 0;
  return sorted.map((r, i) => {
    const amount = i === sorted.length - 1 ? total - used : Math.round((total * r.percent) / 100);
    used += amount;
    return { ...r, amount: amount as number | null };
  });
}

// Tahap terendah yang masih terkunci (null = tidak ada yang terkunci).
export function lockedFromStage(installments: { status: string; unlocksStage: number }[]) {
  const unpaid = installments.filter((i) => i.status !== "PAID").map((i) => i.unlocksStage);
  return unpaid.length ? Math.min(...unpaid) : null;
}

export function isStageLocked(stage: number, lockedFrom: number | null) {
  return lockedFrom !== null && stage >= lockedFrom;
}

export const LEAD_SOURCES = ["INSTAGRAM", "FACEBOOK", "LINKEDIN", "WHATSAPP", "REFERRAL", "TUTOR", "ADS", "REPEAT", "OTHER"] as const;
export const LEAD_SOURCE_LABEL: Record<string, string> = {
  INSTAGRAM: "Instagram",
  FACEBOOK: "Facebook",
  LINKEDIN: "LinkedIn",
  WHATSAPP: "WhatsApp",
  REFERRAL: "Rekomendasi teman",
  TUTOR: "Dari tutor",
  ADS: "Iklan",
  REPEAT: "Pelanggan lama",
  OTHER: "Lainnya",
};

export const TASK_STATUS_LABEL: Record<string, string> = {
  TODO: "Belum dikerjakan",
  DONE: "Ditandai selesai tutor",
  REVISION: "Perlu revisi",
  CANCELLED: "Dibatalkan",
};
