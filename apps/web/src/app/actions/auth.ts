"use server";

import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSession, destroySession, hashPassword, homeFor, requireUser, verifyPassword } from "@/lib/auth";
import { parsePermissions } from "@/lib/permissions";
import { notifyStaff } from "@/lib/notify";
import { back, safeNext, str } from "@/lib/flash";

const registerSchema = z
  .object({
    name: z.string().min(2, "Nama minimal 2 karakter."),
    email: z.string().email("Format email tidak valid."),
    phone: z.string().min(8, "Nomor WhatsApp wajib diisi."),
    institution: z.string().min(2, "Instansi / universitas wajib diisi."),
    password: z.string().min(6, "Kata sandi minimal 6 karakter."),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, { message: "Konfirmasi kata sandi tidak sama.", path: ["confirm"] });

export async function registerAction(form: FormData) {
  const next = safeNext(str(form, "next"));
  const nextQs = next ? `?next=${encodeURIComponent(next)}` : "";
  const parsed = registerSchema.safeParse({
    name: str(form, "name"),
    email: str(form, "email").toLowerCase(),
    phone: str(form, "phone"),
    institution: str(form, "institution"),
    password: String(form.get("password") ?? ""),
    confirm: String(form.get("confirm") ?? ""),
  });
  if (!parsed.success) back(`/daftar${nextQs}`, parsed.error.issues[0].message, "error");

  const { name, email, phone, institution, password } = parsed.data;
  if (await db.user.findUnique({ where: { email } })) {
    back(`/daftar${nextQs}`, "Email sudah terdaftar. Silakan masuk.", "error");
  }
  const user = await db.user.create({
    data: { name, email, phone, institution, passwordHash: await hashPassword(password), role: "STUDENT" },
  });
  await createSession(user.id);
  await notifyStaff(["admin.students", "admin.orders"], {
    title: "Pelanggan baru mendaftar",
    body: `${name} baru saja membuat akun di website.`,
    rows: [
      ["Nama", name],
      ["Email", email],
      ["WhatsApp", phone],
      ["Instansi", institution],
    ],
    link: `/admin/pengguna/${user.id}`,
    kind: "NEW_CUSTOMER",
  });
  redirect(next ?? "/belajar", RedirectType.replace);
}

export async function loginAction(form: FormData) {
  const next = safeNext(str(form, "next"));
  const nextQs = next ? `?next=${encodeURIComponent(next)}` : "";
  const email = str(form, "email").toLowerCase();
  const password = String(form.get("password") ?? "");
  const user = email ? await db.user.findUnique({ where: { email } }) : null;
  // Pesan sama untuk email/sandi salah agar tidak membocorkan email terdaftar.
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    back(`/masuk${nextQs}`, "Email atau kata sandi salah.", "error");
  }
  if (!user.active) back(`/masuk${nextQs}`, "Akun dinonaktifkan. Hubungi admin.", "error");
  await createSession(user.id);
  redirect(next ?? homeFor({ role: user.role, permissions: parsePermissions(user.permissions) }), RedirectType.replace);
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}

export async function updateProfileAction(form: FormData) {
  const user = await requireUser();
  const name = str(form, "name");
  if (name.length < 2) back("/akun", "Nama minimal 2 karakter.", "error");
  await db.user.update({
    where: { id: user.id },
    data: { name, phone: str(form, "phone") || null, institution: str(form, "institution") || null },
  });
  back("/akun", "Profil disimpan.");
}

export async function changePasswordAction(form: FormData) {
  const user = await requireUser();
  const current = String(form.get("current") ?? "");
  const password = String(form.get("password") ?? "");
  const confirm = String(form.get("confirm") ?? "");
  const row = await db.user.findUniqueOrThrow({ where: { id: user.id } });
  if (!(await verifyPassword(current, row.passwordHash))) back("/akun", "Kata sandi saat ini salah.", "error");
  if (password.length < 6) back("/akun", "Kata sandi baru minimal 6 karakter.", "error");
  if (password !== confirm) back("/akun", "Konfirmasi kata sandi tidak sama.", "error");
  await db.user.update({ where: { id: user.id }, data: { passwordHash: await hashPassword(password) } });
  back("/akun", "Kata sandi diganti.");
}
