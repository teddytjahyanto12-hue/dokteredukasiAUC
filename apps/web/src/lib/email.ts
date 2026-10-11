import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { db } from "./db";

// Pengiriman email lewat SMTP (Gmail App Password, email hosting, Zoho, dll).
// Atur di .env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM (opsional SMTP_SECURE).
// Bila belum diatur, email tidak dikirim tetapi tetap dicatat (status SKIPPED) di /admin/email.

let cached: Transporter | null | undefined;

export function smtpConfigured() {
  return !!process.env.SMTP_HOST;
}

function transport() {
  if (cached !== undefined) return cached;
  if (!process.env.SMTP_HOST) return (cached = null);
  const port = Number(process.env.SMTP_PORT || 587);
  cached = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    // Server lokal untuk uji (mis. 127.0.0.1) tidak memakai sertifikat resmi.
    tls: process.env.SMTP_HOST === "127.0.0.1" || process.env.SMTP_HOST === "localhost" ? { rejectUnauthorized: false } : undefined,
  });
  return cached;
}

export function appUrl(path = "") {
  return `${(process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "")}${path}`;
}

export type EmailKind = "RECEIPT" | "NEW_CUSTOMER" | "NEW_ORDER" | "NOTIFICATION" | "REPORT";

export async function sendEmail(p: { to: string; subject: string; html: string; text: string; kind: EmailKind; orderId?: string }) {
  const t = transport();
  if (!t) {
    await db.emailLog.create({ data: { to: p.to, subject: p.subject, kind: p.kind, status: "SKIPPED", orderId: p.orderId, error: "SMTP belum diatur" } });
    return false;
  }
  try {
    await t.sendMail({ from: process.env.MAIL_FROM || process.env.SMTP_USER, to: p.to, subject: p.subject, html: p.html, text: p.text });
    await db.emailLog.create({ data: { to: p.to, subject: p.subject, kind: p.kind, status: "SENT", orderId: p.orderId } });
    return true;
  } catch (e) {
    await db.emailLog.create({
      data: { to: p.to, subject: p.subject, kind: p.kind, status: "FAILED", orderId: p.orderId, error: e instanceof Error ? e.message.slice(0, 500) : "Gagal" },
    });
    return false;
  }
}

const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Kerangka email sederhana yang aman tampil di Gmail/Outlook.
export function emailLayout(siteName: string, title: string, bodyHtml: string, action?: { label: string; url: string }) {
  return `<!doctype html><html><body style="margin:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden">
<tr><td style="background:#141414;color:#ffd20a;padding:18px 24px;font-size:16px;font-weight:bold">${esc(siteName)}</td></tr>
<tr><td style="padding:24px">
<h1 style="margin:0 0 16px;font-size:20px">${esc(title)}</h1>
${bodyHtml}
${action ? `<p style="margin:24px 0 0"><a href="${esc(action.url)}" style="background:#ffd20a;color:#141414;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:bold">${esc(action.label)}</a></p>` : ""}
</td></tr>
<tr><td style="padding:16px 24px;font-size:12px;color:#64748b;border-top:1px solid #e2e8f0">Email ini dikirim otomatis oleh ${esc(siteName)}.</td></tr>
</table></td></tr></table></body></html>`;
}

// Tabel baris label–nilai untuk isi email.
export function emailRows(rows: [string, string][]) {
  return `<table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#64748b;border-bottom:1px solid #f1f5f9;width:45%">${esc(k)}</td><td style="border-bottom:1px solid #f1f5f9;font-weight:bold">${esc(v)}</td></tr>`)
    .join("")}</table>`;
}

export function emailParagraph(text: string) {
  return `<p style="margin:0 0 12px;font-size:14px;line-height:1.6">${esc(text)}</p>`;
}
