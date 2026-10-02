import "server-only";
import { db } from "./db";
import { hasPermission, parsePermissions, type AdminPermission } from "./permissions";
import { appUrl, emailLayout, emailParagraph, emailRows, sendEmail, type EmailKind } from "./email";
import { getSettings } from "./settings";

type Payload = { title: string; body?: string; link?: string; email?: boolean; rows?: [string, string][]; kind?: EmailKind; orderId?: string };

async function emailTo(to: string, p: Payload) {
  const s = await getSettings();
  const body = (p.body ? emailParagraph(p.body) : "") + (p.rows ? emailRows(p.rows) : "");
  const html = emailLayout(s.siteName, p.title, body, p.link ? { label: "Buka di website", url: appUrl(p.link) } : undefined);
  const text = [p.body, ...(p.rows ?? []).map(([k, v]) => `${k}: ${v}`), p.link ? appUrl(p.link) : ""].filter(Boolean).join("\n");
  await sendEmail({ to, subject: `${p.title} — ${s.siteName}`, html, text, kind: p.kind ?? "NOTIFICATION", orderId: p.orderId });
}

// Notifikasi di dalam website (+ email bila diminta).
export async function notifyUser(userId: string, p: Payload) {
  const user = await db.user.findUnique({ where: { id: userId }, select: { email: true } });
  if (!user) return;
  await db.notification.create({ data: { userId, title: p.title, body: p.body, link: p.link } });
  if (p.email) await emailTo(user.email, p);
}

// Kirim ke owner + admin yang memiliki salah satu hak akses terkait, plus email tambahan
// dari Pengaturan situs. Notifikasi staf selalu juga dikirim lewat email.
export async function notifyStaff(permission: AdminPermission | AdminPermission[], p: Payload) {
  const perms = Array.isArray(permission) ? permission : [permission];
  const staff = await db.user.findMany({
    where: { role: { in: ["OWNER", "ADMIN"] }, active: true },
    select: { id: true, email: true, role: true, permissions: true },
  });
  const targets = staff.filter((u) => perms.some((k) => hasPermission({ role: u.role, permissions: parsePermissions(u.permissions) }, k)));
  if (targets.length) {
    await db.notification.createMany({ data: targets.map((a) => ({ userId: a.id, title: p.title, body: p.body, link: p.link })) });
  }
  const s = await getSettings();
  const extra = s.adminEmail
    .split(/[,;\s]+/)
    .map((e) => e.trim().toLowerCase())
    .filter((e) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e));
  const emails = [...new Set([...targets.map((t) => t.email.toLowerCase()), ...extra])];
  for (const e of emails) await emailTo(e, p);
}
