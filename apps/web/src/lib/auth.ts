import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cache } from "react";
import { db } from "./db";
import type { Role } from "./constants";
import { ADMIN_PAGES, TUTOR_PAGES, hasPermission, parsePermissions, type Permission } from "./permissions";

export const SESSION_COOKIE = "de_session";
const SESSION_DAYS = 30;

function secretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET belum diisi (minimal 32 karakter). Lihat .env.example.");
  }
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: string) {
  const token = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secretKey());
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

// Pengguna yang sedang login (null bila belum login / akun nonaktif).
export const getCurrentUser = cache(async () => {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (!payload.sub) return null;
    const user = await db.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, name: true, email: true, role: true, active: true, phone: true, institution: true, permissions: true },
    });
    if (!user || !user.active) return null;
    return { ...user, role: user.role as Role, permissions: parsePermissions(user.permissions) };
  } catch {
    return null;
  }
});

export type CurrentUser = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>;

// Dipakai di halaman & server action: arahkan ke login bila belum masuk,
// dan tolak bila perannya tidak sesuai.
export async function requireUser(roles?: Role[]) {
  const user = await getCurrentUser();
  if (!user) redirect("/masuk");
  if (roles && !roles.includes(user.role)) redirect("/dashboard?ditolak=1");
  return user;
}

// Wajib memiliki hak akses tertentu (owner selalu lolos).
export async function requirePermission(key: Permission) {
  const user = await requireUser(["OWNER", "ADMIN", "TUTOR"]);
  if (!hasPermission(user, key)) redirect("/dashboard?ditolak=1");
  return user;
}

export async function requireOwner() {
  return requireUser(["OWNER"]);
}

// Halaman awal sesuai peran dan hak akses yang dicentang owner.
export function homeFor(user: { role: string; permissions: string[] }) {
  if (user.role === "OWNER") return "/admin";
  if (user.role === "ADMIN") return ADMIN_PAGES.find((p) => hasPermission(user, p.key))?.href ?? "/akun";
  if (user.role === "TUTOR") return TUTOR_PAGES.find((p) => hasPermission(user, p.key))?.href ?? "/akun";
  return "/belajar";
}
