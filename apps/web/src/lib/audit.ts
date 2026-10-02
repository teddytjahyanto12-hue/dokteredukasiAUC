import "server-only";
import { db } from "./db";

type Actor = { id: string; name: string } | null;

// Mencatat aktivitas penting (siapa, kapan, apa, nilai lama → baru).
// Catatan tidak pernah dihapus dari aplikasi.
export async function logAudit(
  actor: Actor,
  action: string,
  entity: string,
  entityId: string | null,
  summary: string,
  change?: { before?: unknown; after?: unknown },
) {
  await db.auditLog.create({
    data: {
      actorId: actor?.id ?? null,
      actorName: actor?.name ?? "Sistem",
      action,
      entity,
      entityId,
      summary,
      before: change?.before === undefined ? null : JSON.stringify(change.before),
      after: change?.after === undefined ? null : JSON.stringify(change.after),
    },
  });
}

export const AUDIT_ACTION_LABEL: Record<string, string> = {
  ORDER_PAID: "Order ditandai lunas",
  ORDER_CANCELLED: "Order dibatalkan",
  SALE_CREATED: "Penjualan diinput admin",
  RECEIPT_SENT: "Kwitansi dikirim ulang",
  INSTALLMENT_PAID: "Cicilan dikonfirmasi lunas",
  TASK_MARKED_DONE: "Tutor menandai task selesai",
  TASK_VALIDATED: "Task divalidasi",
  TASK_REVISION: "Task dikembalikan untuk revisi",
  TASK_CHANGED: "Checklist task diubah",
  ENTITLEMENT_GRANTED: "Akses paket diberikan",
  ENTITLEMENT_REVOKED: "Akses paket dicabut",
  ACCOUNT_CREATED: "Akun dibuat",
  ACCOUNT_UPDATED: "Akun diubah",
  PASSWORD_RESET: "Kata sandi diatur ulang",
  PERMISSIONS_CHANGED: "Hak akses diubah",
  TUTOR_PROFILE_UPDATED: "Profil/fee tutor diubah",
  TUTOR_ASSIGNED: "Tutor ditugaskan",
  SESSION_CREATED: "Sesi dijadwalkan",
  SESSION_UPDATED: "Sesi diubah",
  SESSION_MARKED_DONE: "Tutor menandai sesi selesai",
  SESSION_VALIDATED: "Sesi divalidasi (fee payable)",
  SESSION_REVISION: "Sesi dikembalikan untuk revisi",
  SESSION_CANCELLED: "Sesi dibatalkan",
  PROJECT_CLOSED: "Proyek ditutup",
  PROJECT_REOPENED: "Proyek dibuka kembali",
  PAYROLL_CREATED: "Payroll dibuat",
  PAYROLL_PAID: "Payroll ditandai dibayar",
  PAYROLL_UNPAID: "Payroll dikembalikan ke belum dibayar",
  PAYROLL_VOIDED: "Payroll dibatalkan (void)",
  PACKAGE_SAVED: "Paket disimpan",
  PACKAGE_DEACTIVATED: "Paket dinonaktifkan",
  PACKAGE_DELETED: "Paket dihapus",
  SETTINGS_SAVED: "Pengaturan situs diubah",
};
