// Status fee tutor per sesi — satu sesi selalu tepat satu status (tidak bisa
// terhitung ganda):
// - NO_FEE: sesi dibatalkan, atau proyek ditutup sebelum sesi divalidasi.
// - PROJECTED: sesi terjadwal / sedang revisi (fee potensial, belum utang).
// - PENDING_VALIDATION: tutor menandai selesai, menunggu admin (masih bukan utang).
// - PAYABLE: divalidasi admin, belum dibayar (utang ke tutor).
// - PAID: termasuk payroll yang sudah ditandai dibayar.

export type FeeStatus = "NO_FEE" | "PROJECTED" | "PENDING_VALIDATION" | "PAYABLE" | "PAID";

export function sessionFeeStatus(s: {
  status: string;
  verifiedAt: Date | null;
  payroll?: { status: string } | null;
  mentoringStatus?: string;
}): FeeStatus {
  if (s.verifiedAt) return s.payroll?.status === "PAID" ? "PAID" : "PAYABLE";
  if (s.status === "CANCELLED" || s.mentoringStatus === "CLOSED") return "NO_FEE";
  if (s.status === "DONE") return "PENDING_VALIDATION";
  return "PROJECTED";
}

export const FEE_STATUS_TONE: Record<FeeStatus, string> = {
  NO_FEE: "badge",
  PROJECTED: "badge",
  PENDING_VALIDATION: "badge-warn",
  PAYABLE: "badge-warn",
  PAID: "badge-brand",
};
