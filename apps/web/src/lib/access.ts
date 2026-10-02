import "server-only";
import { db } from "./db";
import type { CurrentUser } from "./auth";
import { hasPermission } from "./permissions";

// Aturan akses materi (diperiksa di server untuk setiap halaman/berkas):
// - Owner & admin: semua materi.
// - Tutor: materi pada jalur (Track) yang diberikan di profil tutornya.
// - Murid: item gratis, atau kategori yang termasuk paket dengan hak akses aktif.

export function activeEntitlementWhere(userId: string) {
  const now = new Date();
  return {
    userId,
    revokedAt: null,
    startsAt: { lte: now },
    OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
  };
}

// Kumpulan categoryId yang terbuka untuk pengguna (null = semua terbuka).
export async function accessibleCategoryIds(user: CurrentUser | null): Promise<Set<string> | null> {
  if (!user) return new Set();
  if (user.role === "OWNER" || user.role === "ADMIN") return null;
  if (user.role === "TUTOR") {
    const profile = await db.tutorProfile.findUnique({
      where: { userId: user.id },
      select: { trackAccess: { select: { track: { select: { categories: { select: { id: true } } } } } } },
    });
    const ids = profile?.trackAccess.flatMap((a) => a.track.categories.map((c) => c.id)) ?? [];
    return new Set(ids);
  }
  const ents = await db.entitlement.findMany({
    where: activeEntitlementWhere(user.id),
    select: { package: { select: { categories: { select: { categoryId: true } } } } },
  });
  return new Set(ents.flatMap((e) => e.package.categories.map((c) => c.categoryId)));
}

export function canOpen(allowed: Set<string> | null, categoryId: string, isFree = false) {
  return isFree || allowed === null || allowed.has(categoryId);
}

export async function canAccessCategory(user: CurrentUser | null, categoryId: string) {
  return canOpen(await accessibleCategoryIds(user), categoryId);
}

// Akses berkas unggahan: dipakai oleh /api/berkas/[id].
export async function canAccessFile(user: CurrentUser | null, fileId: string) {
  if (!user) return false; // semua berkas wajib login, termasuk materi gratis
  if (user.role === "OWNER") return true;
  const file = await db.fileAsset.findUnique({
    where: { id: fileId },
    select: {
      items: { select: { isFree: true, published: true, topic: { select: { categoryId: true } } } },
      sessionProofs: { select: { mentoring: { select: { studentId: true, tutorId: true } } } },
      payrollProofs: { select: { tutorId: true } },
    },
  });
  if (!file) return false;
  if (user.role === "ADMIN") {
    // Bukti transfer payroll berisi data rekening tutor: hanya admin dengan akses payroll.
    if (file.payrollProofs.length && !file.items.length && !file.sessionProofs.length) return hasPermission(user, "admin.payroll");
    return true;
  }
  if (file.sessionProofs.some((s) => s.mentoring.studentId === user.id || s.mentoring.tutorId === user.id)) return true;
  if (file.payrollProofs.some((p) => p.tutorId === user.id)) return true;
  if (file.items.length) {
    const allowed = await accessibleCategoryIds(user);
    return file.items.some((i) => i.published && canOpen(allowed, i.topic.categoryId, i.isFree));
  }
  return false;
}
