import "server-only";
import { db } from "./db";

type Payload = { title: string; body?: string; link?: string; email?: boolean };

// Notifikasi di dalam website. Pengiriman email belum tersambung ke layanan
// email (mis. Resend); sementara hanya dicatat di log server.
async function sendEmailStub(to: string, subject: string, body?: string) {
  console.info(`[email belum aktif] ke=${to} subjek="${subject}" isi="${body ?? ""}"`);
}

export async function notifyUser(userId: string, p: Payload) {
  const user = await db.user.findUnique({ where: { id: userId }, select: { email: true } });
  if (!user) return;
  await db.notification.create({ data: { userId, title: p.title, body: p.body, link: p.link } });
  if (p.email) await sendEmailStub(user.email, p.title, p.body);
}

export async function notifyAdmins(p: Payload) {
  const admins = await db.user.findMany({ where: { role: "ADMIN", active: true }, select: { id: true, email: true } });
  if (!admins.length) return;
  await db.notification.createMany({
    data: admins.map((a) => ({ userId: a.id, title: p.title, body: p.body, link: p.link })),
  });
  for (const a of admins) await sendEmailStub(a.email, p.title, p.body);
}
