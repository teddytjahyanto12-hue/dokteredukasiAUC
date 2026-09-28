import "server-only";
import { db } from "./db";
import type { CurrentUser } from "./auth";

// Bimbingan hanya boleh dilihat murid pemiliknya, tutor yang ditugaskan, dan admin.
export async function findMentoringFor(user: CurrentUser, id: string) {
  const m = await db.mentoring.findUnique({ where: { id }, select: { id: true, studentId: true, tutorId: true } });
  if (!m) return null;
  if (user.role === "ADMIN" || m.studentId === user.id || (user.role === "TUTOR" && m.tutorId === user.id)) return m;
  return null;
}

// Hanya tutor yang ditugaskan dan admin yang boleh mengelola sesi/progres.
export function canManage(user: CurrentUser, m: { tutorId: string | null }) {
  return user.role === "ADMIN" || (user.role === "TUTOR" && m.tutorId === user.id);
}
