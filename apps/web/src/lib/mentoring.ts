import "server-only";
import { db } from "./db";
import type { CurrentUser } from "./auth";
import { hasPermission } from "./permissions";

// Bimbingan hanya boleh dilihat: owner; admin dengan akses bimbingan/validasi;
// tutor yang ditugaskan (dengan akses dashboard klien); murid pemiliknya.
export async function findMentoringFor(user: CurrentUser, id: string) {
  const m = await db.mentoring.findUnique({ where: { id }, select: { id: true, studentId: true, tutorId: true, status: true } });
  if (!m) return null;
  if (isStaffViewer(user)) return m;
  if (m.studentId === user.id) return m;
  if (user.role === "TUTOR" && m.tutorId === user.id && hasPermission(user, "tutor.clients")) return m;
  return null;
}

export function isStaffViewer(user: CurrentUser) {
  return hasPermission(user, "admin.mentoring") || hasPermission(user, "admin.validation");
}

// Mengelola sesi & progres: owner/admin bimbingan, atau tutor yang ditugaskan.
export function canManage(user: CurrentUser, m: { tutorId: string | null }) {
  if (hasPermission(user, "admin.mentoring")) return true;
  return user.role === "TUTOR" && m.tutorId === user.id && hasPermission(user, "tutor.clients");
}
