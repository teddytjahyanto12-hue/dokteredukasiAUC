import "server-only";
import { db } from "./db";
import { hasPermission, parsePermissions, type AdminPermission } from "./permissions";

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

// Kirim ke owner dan admin yang memiliki hak akses terkait.
export async function notifyStaff(permission: AdminPermission, p: Payload) {
  const staff = await db.user.findMany({
    where: { role: { in: ["OWNER", "ADMIN"] }, active: true },
    select: { id: true, email: true, role: true, permissions: true },
  });
  const targets = staff.filter((u) => hasPermission({ role: u.role, permissions: parsePermissions(u.permissions) }, permission));
  if (!targets.length) return;
  await db.notification.createMany({
    data: targets.map((a) => ({ userId: a.id, title: p.title, body: p.body, link: p.link })),
  });
  for (const a of targets) await sendEmailStub(a.email, p.title, p.body);
}
