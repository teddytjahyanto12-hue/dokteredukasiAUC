import "server-only";
import { db } from "./db";

// Streak belajar dihitung dari aktivitas nyata: materi yang ditandai selesai dan quiz yang dikerjakan.
// Satu hari dihitung menurut tanggal WIB.

const WIB = 7 * 3600 * 1000;
const DAY = 86400000;
const dayKey = (d: Date) => Math.floor((d.getTime() + WIB) / DAY);

export async function learningStreak(userId: string) {
  const since = new Date(Date.now() - 120 * DAY);
  const [items, quizzes] = await Promise.all([
    db.itemProgress.findMany({ where: { userId, completedAt: { gte: since } }, select: { completedAt: true } }),
    db.quizAttempt.findMany({ where: { userId, createdAt: { gte: since } }, select: { createdAt: true } }),
  ]);
  const active = new Set([...items.map((i) => dayKey(i.completedAt)), ...quizzes.map((q) => dayKey(q.createdAt))]);
  const today = dayKey(new Date());
  // Streak tetap hidup bila terakhir belajar kemarin (hari ini belum belajar).
  let cursor = active.has(today) ? today : today - 1;
  let days = 0;
  while (active.has(cursor)) {
    days++;
    cursor--;
  }
  // Pekan berjalan Senin–Minggu. Hari ke-0 epoch (1 Jan 1970) adalah Kamis.
  const monday = today - ((today + 3) % 7);
  const week = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((label, i) => ({ label, done: active.has(monday + i), future: monday + i > today }));
  return { days, week, activeToday: active.has(today) };
}
