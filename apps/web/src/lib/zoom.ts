import "server-only";
import { db } from "./db";

// Kuota Zoom paket bimbingan (mis. SR-MA Basic 2x, Intermediate 3x, Pro 3x) + add-on Zoom tambahan.
// Murid memilih "Zoom n" → mengajukan jadwal (REQUESTED) → admin konfirmasi (SCHEDULED) →
// tutor mengunggah link rekaman (DONE) → admin validasi → fee = paket.zoomFee menjadi payable.

export async function zoomAllowance(mentoringId: string) {
  const m = await db.mentoring.findUnique({
    where: { id: mentoringId },
    select: {
      serviceEndsAt: true,
      status: true,
      package: { select: { zoomQuota: true, zoomFee: true } },
      order: { select: { addons: { select: { addon: { select: { zoomCredits: true } } } } } },
      sessions: { where: { seq: { not: null }, status: { not: "CANCELLED" } }, select: { seq: true } },
    },
  });
  if (!m) return null;
  const extra = m.order?.addons.reduce((n, a) => n + (a.addon?.zoomCredits ?? 0), 0) ?? 0;
  const quota = (m.package?.zoomQuota ?? 0) + extra;
  const used = new Set(m.sessions.map((s) => s.seq as number));
  const expired = !!m.serviceEndsAt && m.serviceEndsAt <= new Date();
  return {
    quota,
    extra,
    used,
    // Nomor Zoom yang masih bisa diajukan murid.
    available: Array.from({ length: quota }, (_, i) => i + 1).filter((n) => !used.has(n)),
    expired,
    serviceEndsAt: m.serviceEndsAt,
    closed: m.status === "CLOSED",
  };
}
