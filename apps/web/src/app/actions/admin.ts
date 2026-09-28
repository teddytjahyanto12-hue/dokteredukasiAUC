"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { hashPassword, requireUser } from "@/lib/auth";
import { markOrderPaid } from "@/lib/orders";
import { notifyUser } from "@/lib/notify";
import { saveUpload, UploadError } from "@/lib/storage";
import { back, bool, optInt, optStr, str } from "@/lib/flash";
import { MENTORING_FIELDS, ROLES, SETTING_DEFAULTS, type SettingKey } from "@/lib/constants";
import { slugify } from "@/lib/format";

const admin = () => requireUser(["ADMIN"]);

// ---------- Order ----------

export async function markOrderPaidAction(form: FormData) {
  const me = await admin();
  const id = str(form, "orderId");
  const amount = optInt(form, "amount");
  const note = optStr(form, "note");
  if (amount !== null || note !== null) {
    await db.order.update({ where: { id }, data: { ...(amount !== null ? { amount } : {}), ...(note !== null ? { note } : {}) } });
  }
  let result: Awaited<ReturnType<typeof markOrderPaid>>;
  try {
    result = await markOrderPaid(id, { grantedById: me.id, paymentRef: optStr(form, "paymentRef") ?? undefined });
  } catch (e) {
    back(`/admin/order/${id}`, e instanceof Error ? e.message : "Gagal menandai lunas.", "error");
  }
  if (result.alreadyPaid) back(`/admin/order/${id}`, "Order sudah lunas sebelumnya.");
  back(`/admin/order/${id}`, "Order ditandai lunas. Akses murid aktif.");
}

export async function cancelOrderAction(form: FormData) {
  await admin();
  const id = str(form, "orderId");
  const order = await db.order.findUnique({ where: { id } });
  if (!order || order.status !== "PENDING") back(`/admin/order/${id}`, "Hanya order yang menunggu pembayaran yang bisa dibatalkan.", "error");
  await db.order.update({ where: { id }, data: { status: "CANCELLED", note: optStr(form, "note") ?? order.note } });
  back(`/admin/order/${id}`, "Order dibatalkan.");
}

// ---------- Pengguna ----------

const userSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter."),
  email: z.string().email("Email tidak valid."),
  role: z.enum(ROLES),
  password: z.string().min(8, "Kata sandi minimal 8 karakter."),
});

export async function createUserAction(form: FormData) {
  await admin();
  const parsed = userSchema.safeParse({
    name: str(form, "name"),
    email: str(form, "email").toLowerCase(),
    role: str(form, "role"),
    password: String(form.get("password") ?? ""),
  });
  if (!parsed.success) back("/admin/pengguna", parsed.error.issues[0].message, "error");
  const { name, email, role, password } = parsed.data;
  if (await db.user.findUnique({ where: { email } })) back("/admin/pengguna", "Email sudah terdaftar.", "error");
  const user = await db.user.create({
    data: { name, email, role, phone: optStr(form, "phone"), passwordHash: await hashPassword(password) },
  });
  if (role === "TUTOR") {
    const field = str(form, "field");
    await db.tutorProfile.create({
      data: { userId: user.id, field: (MENTORING_FIELDS as readonly string[]).includes(field) ? field : "CLINICAL" },
    });
  }
  redirect(`/admin/pengguna/${user.id}?pesan=${encodeURIComponent("Akun dibuat.")}`);
}

export async function updateUserAction(form: FormData) {
  const me = await admin();
  const id = str(form, "userId");
  const role = str(form, "role");
  if (!(ROLES as readonly string[]).includes(role)) back(`/admin/pengguna/${id}`, "Peran tidak valid.", "error");
  const active = bool(form, "active");
  if (id === me.id && (role !== "ADMIN" || !active)) back(`/admin/pengguna/${id}`, "Anda tidak dapat menurunkan peran atau menonaktifkan akun sendiri.", "error");
  const name = str(form, "name");
  if (name.length < 2) back(`/admin/pengguna/${id}`, "Nama minimal 2 karakter.", "error");

  await db.user.update({
    where: { id },
    data: { name, role, active, phone: optStr(form, "phone"), institution: optStr(form, "institution") },
  });
  if (role === "TUTOR" && !(await db.tutorProfile.findUnique({ where: { userId: id } }))) {
    await db.tutorProfile.create({ data: { userId: id, field: "CLINICAL" } });
  }
  back(`/admin/pengguna/${id}`, "Pengguna disimpan.");
}

export async function resetPasswordAction(form: FormData) {
  await admin();
  const id = str(form, "userId");
  const password = String(form.get("password") ?? "");
  if (password.length < 8) back(`/admin/pengguna/${id}`, "Kata sandi minimal 8 karakter.", "error");
  await db.user.update({ where: { id }, data: { passwordHash: await hashPassword(password) } });
  back(`/admin/pengguna/${id}`, "Kata sandi diganti. Sampaikan ke pengguna melalui kanal pribadi.");
}

export async function saveTutorProfileAction(form: FormData) {
  await admin();
  const userId = str(form, "userId");
  const path = `/admin/pengguna/${userId}`;
  const field = str(form, "field");
  if (!(MENTORING_FIELDS as readonly string[]).includes(field)) back(path, "Bidang tidak valid.", "error");
  const data = {
    field,
    specialty: optStr(form, "specialty"),
    rate: optInt(form, "rate"),
    rateNote: optStr(form, "rateNote"),
    bankName: optStr(form, "bankName"),
    bankAccount: optStr(form, "bankAccount"),
    bankHolder: optStr(form, "bankHolder"),
    notes: optStr(form, "notes"),
    acceptingClients: bool(form, "acceptingClients"),
  };
  const profile = await db.tutorProfile.upsert({ where: { userId }, update: data, create: { userId, ...data } });
  const trackIds = form.getAll("trackIds").map(String);
  await db.tutorTrackAccess.deleteMany({ where: { tutorProfileId: profile.id, trackId: { notIn: trackIds } } });
  for (const trackId of trackIds) {
    await db.tutorTrackAccess.upsert({
      where: { tutorProfileId_trackId: { tutorProfileId: profile.id, trackId } },
      update: {},
      create: { tutorProfileId: profile.id, trackId },
    });
  }
  back(path, "Profil tutor disimpan.");
}

export async function grantEntitlementAction(form: FormData) {
  const me = await admin();
  const userId = str(form, "userId");
  const path = `/admin/pengguna/${userId}`;
  const pkg = await db.package.findUnique({ where: { id: str(form, "packageId") } });
  if (!pkg) back(path, "Pilih paket.", "error");
  const days = optInt(form, "days") ?? pkg.accessDays;
  const now = new Date();
  await db.entitlement.create({
    data: {
      userId,
      packageId: pkg.id,
      grantedById: me.id,
      startsAt: now,
      expiresAt: days ? new Date(now.getTime() + days * 86400000) : null,
      note: optStr(form, "note") ?? "Diberikan manual oleh admin",
    },
  });
  if (pkg.includesMentoring && pkg.mentoringField && bool(form, "createMentoring")) {
    await db.mentoring.create({ data: { studentId: userId, packageId: pkg.id, field: pkg.mentoringField } });
  }
  await notifyUser(userId, { title: `Akses ${pkg.name} aktif`, link: "/belajar", email: true });
  back(path, "Akses diberikan.");
}

export async function revokeEntitlementAction(form: FormData) {
  await admin();
  const id = str(form, "entitlementId");
  const ent = await db.entitlement.update({ where: { id }, data: { revokedAt: new Date() } });
  back(`/admin/pengguna/${ent.userId}`, "Akses dicabut. Hak akses dari order lain tidak terpengaruh.");
}

export async function createMentoringAction(form: FormData) {
  await admin();
  const studentId = str(form, "userId");
  const field = str(form, "field");
  if (!(MENTORING_FIELDS as readonly string[]).includes(field)) back(`/admin/pengguna/${studentId}`, "Bidang tidak valid.", "error");
  const m = await db.mentoring.create({ data: { studentId, field, title: optStr(form, "title") } });
  redirect(`/bimbingan/${m.id}`);
}

// ---------- Paket ----------

export async function savePackageAction(form: FormData) {
  await admin();
  const id = optStr(form, "id");
  const name = str(form, "name");
  if (name.length < 3) back(id ? `/admin/paket/${id}` : "/admin/paket", "Nama paket minimal 3 karakter.", "error");
  const slug = slugify(str(form, "slug") || name);
  const clash = await db.package.findFirst({ where: { slug, ...(id ? { NOT: { id } } : {}) } });
  if (clash) back(id ? `/admin/paket/${id}` : "/admin/paket", "Slug sudah dipakai paket lain.", "error");
  const includesMentoring = bool(form, "includesMentoring");
  const mentoringField = optStr(form, "mentoringField");
  if (includesMentoring && !mentoringField) back(id ? `/admin/paket/${id}` : "/admin/paket", "Pilih bidang bimbingan.", "error");

  const data = {
    name,
    slug,
    trackSlug: optStr(form, "trackSlug"),
    summary: optStr(form, "summary"),
    description: optStr(form, "description"),
    price: optInt(form, "price"),
    accessDays: optInt(form, "accessDays"),
    includesMentoring,
    mentoringField: includesMentoring ? mentoringField : null,
    active: bool(form, "active"),
    order: optInt(form, "order") ?? 0,
  };
  const pkg = id ? await db.package.update({ where: { id }, data }) : await db.package.create({ data });

  const categoryIds = form.getAll("categoryIds").map(String);
  await db.packageCategory.deleteMany({ where: { packageId: pkg.id, categoryId: { notIn: categoryIds } } });
  for (const categoryId of categoryIds) {
    await db.packageCategory.upsert({
      where: { packageId_categoryId: { packageId: pkg.id, categoryId } },
      update: {},
      create: { packageId: pkg.id, categoryId },
    });
  }
  revalidatePath("/paket");
  back(`/admin/paket/${pkg.id}`, "Paket disimpan.");
}

export async function deletePackageAction(form: FormData) {
  await admin();
  const id = str(form, "id");
  const used = await db.order.count({ where: { packageId: id } });
  if (used > 0) {
    await db.package.update({ where: { id }, data: { active: false } });
    back("/admin/paket", "Paket sudah punya order, jadi hanya dinonaktifkan (tidak dihapus).");
  }
  await db.package.delete({ where: { id } });
  back("/admin/paket", "Paket dihapus.");
}

// ---------- Payroll ----------

export async function createPayrollAction(form: FormData) {
  await admin();
  const tutorId = str(form, "tutorId");
  const periodLabel = str(form, "periodLabel");
  if (!periodLabel) back("/admin/payroll", "Isi label periode (mis. Oktober 2026).", "error");
  const sessions = await db.mentoringSession.findMany({
    where: { mentoring: { tutorId }, verifiedAt: { not: null }, payrollId: null },
  });
  if (sessions.length === 0) back("/admin/payroll", "Tidak ada sesi terverifikasi yang belum dibayar untuk tutor ini.", "error");
  const amount = sessions.reduce((sum, s) => sum + (s.fee ?? 0), 0);
  await db.$transaction(async (tx) => {
    const payroll = await tx.payroll.create({ data: { tutorId, periodLabel, amount, notes: optStr(form, "notes") } });
    await tx.mentoringSession.updateMany({ where: { id: { in: sessions.map((s) => s.id) } }, data: { payrollId: payroll.id } });
  });
  await notifyUser(tutorId, { title: `Payroll ${periodLabel} dibuat`, body: `${sessions.length} sesi.`, link: "/tutor-panel/pendapatan" });
  back("/admin/payroll", `Payroll dibuat untuk ${sessions.length} sesi.`);
}

export async function markPayrollPaidAction(form: FormData) {
  const me = await admin();
  const id = str(form, "payrollId");
  const payroll = await db.payroll.findUnique({ where: { id } });
  if (!payroll) back("/admin/payroll", "Payroll tidak ditemukan.", "error");
  let proofFileId = payroll.proofFileId;
  try {
    const upload = await saveUpload(form.get("proofFile") as File | null, me.id);
    if (upload) proofFileId = upload.id;
  } catch (e) {
    if (e instanceof UploadError) back("/admin/payroll", e.message, "error");
    throw e;
  }
  const paid = str(form, "status") === "PAID";
  await db.payroll.update({
    where: { id },
    data: { proofFileId, status: paid ? "PAID" : "UNPAID", paidAt: paid ? payroll.paidAt ?? new Date() : null },
  });
  if (paid && payroll.status !== "PAID") {
    await notifyUser(payroll.tutorId, { title: `Payroll ${payroll.periodLabel} sudah dibayar`, link: "/tutor-panel/pendapatan", email: true });
  }
  back("/admin/payroll", "Payroll diperbarui.");
}

export async function deletePayrollAction(form: FormData) {
  await admin();
  const id = str(form, "payrollId");
  const payroll = await db.payroll.findUnique({ where: { id } });
  if (!payroll || payroll.status === "PAID") back("/admin/payroll", "Payroll yang sudah dibayar tidak dapat dihapus.", "error");
  await db.$transaction([
    db.mentoringSession.updateMany({ where: { payrollId: id }, data: { payrollId: null } }),
    db.payroll.delete({ where: { id } }),
  ]);
  back("/admin/payroll", "Payroll dihapus; sesinya kembali ke daftar belum dibayar.");
}

// ---------- Pengaturan ----------

export async function saveSettingsAction(form: FormData) {
  await admin();
  for (const key of Object.keys(SETTING_DEFAULTS) as SettingKey[]) {
    const value = str(form, key);
    await db.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }
  revalidatePath("/", "layout");
  back("/admin/pengaturan", "Pengaturan disimpan.");
}
