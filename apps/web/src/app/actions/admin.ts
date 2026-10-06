"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { hashPassword, requirePermission, requireUser, type CurrentUser } from "@/lib/auth";
import { createOrder, markInstallmentPaid, markOrderPaid } from "@/lib/orders";
import { QuoteError } from "@/lib/services";
import { notifyStaff, notifyUser } from "@/lib/notify";
import { sendReceipt } from "@/lib/receipts";
import { logAudit } from "@/lib/audit";
import { saveUpload, UploadError } from "@/lib/storage";
import { back, bool, optInt, optStr, str } from "@/lib/flash";
import { FEE_BASIS, MENTORING_FIELDS, ROLE_LABEL, SETTING_DEFAULTS, type Role, type SettingKey } from "@/lib/constants";
import { DEFAULT_ADMIN_PERMISSIONS, DEFAULT_TUTOR_PERMISSIONS, hasPermission, sanitizePermissions } from "@/lib/permissions";
import { sendPeriodicReport } from "@/lib/report-email";
import { rupiah } from "@/lib/format";

const actor = (u: CurrentUser) => ({ id: u.id, name: u.name });

// ---------- Order ----------

export async function markOrderPaidAction(form: FormData) {
  const me = await requirePermission("admin.orders");
  const id = str(form, "orderId");
  const path = `/admin/order/${id}`;
  const amount = optInt(form, "amount");
  const note = optStr(form, "note");
  const before = await db.order.findUnique({ where: { id } });
  if (!before) back("/admin/order", "Order tidak ditemukan.", "error");
  if (before.status === "PENDING" && (amount !== null || note !== null)) {
    await db.order.update({ where: { id }, data: { ...(amount !== null ? { amount } : {}), ...(note !== null ? { note } : {}) } });
  }
  let result: Awaited<ReturnType<typeof markOrderPaid>>;
  try {
    result = await markOrderPaid(id, { grantedById: me.id, paymentRef: optStr(form, "paymentRef") ?? undefined });
  } catch (e) {
    back(path, e instanceof Error ? e.message : "Gagal menandai lunas.", "error");
  }
  if (result.alreadyPaid) back(path, "Order sudah lunas sebelumnya.");
  await logAudit(actor(me), "ORDER_PAID", "Order", id, `Order ${before.code} ditandai lunas (${rupiah(result.order.amount)})`, {
    before: { status: before.status, amount: before.amount },
    after: { status: "PAID", amount: result.order.amount, paymentRef: result.order.paymentRef },
  });
  back(path, "Order ditandai lunas. Akses murid aktif.");
}

export async function markInstallmentPaidAction(form: FormData) {
  const me = await requirePermission("admin.orders");
  const id = str(form, "orderId");
  const path = `/admin/order/${id}`;
  const seq = optInt(form, "seq");
  if (!seq) back(path, "Cicilan tidak valid.", "error");
  let result: Awaited<ReturnType<typeof markInstallmentPaid>>;
  try {
    result = await markInstallmentPaid(id, seq, { grantedById: me.id, paymentRef: optStr(form, "paymentRef") });
  } catch (e) {
    back(path, e instanceof Error ? e.message : "Gagal mengonfirmasi cicilan.", "error");
  }
  await logAudit(actor(me), "INSTALLMENT_PAID", "Order", id, `${result.installment.label} order ${result.order.code} lunas (${rupiah(result.installment.amount)})`, {
    after: { seq, orderStatus: result.order.status },
  });
  back(
    path,
    result.isFirst
      ? "Cicilan pertama lunas. Akses murid aktif; tahap berikutnya terbuka setelah cicilan selanjutnya."
      : result.isLast
        ? "Cicilan terakhir lunas. Order lunas penuh."
        : `${result.installment.label} lunas. Tahap ${result.installment.unlocksStage} terbuka.`,
  );
}

// Penjualan yang diinput admin (mis. pelanggan dari WhatsApp/Instagram).
export async function createSaleAction(form: FormData) {
  const me = await requirePermission("admin.orders");
  const fail = "/admin/order/baru";
  let userId = str(form, "studentId");
  if (!userId) {
    const parsed = userSchema.safeParse({
      name: str(form, "name"),
      email: str(form, "email").toLowerCase(),
      role: "STUDENT",
      password: String(form.get("password") ?? ""),
    });
    if (!parsed.success) back(fail, `Data pelanggan baru: ${parsed.error.issues[0].message}`, "error");
    if (await db.user.findUnique({ where: { email: parsed.data.email } })) back(fail, "Email pelanggan sudah terdaftar; pilih dari daftar pelanggan.", "error");
    const u = await db.user.create({
      data: { name: parsed.data.name, email: parsed.data.email, role: "STUDENT", phone: optStr(form, "phone"), passwordHash: await hashPassword(parsed.data.password) },
    });
    await logAudit(actor(me), "ACCOUNT_CREATED", "User", u.id, `Akun pelanggan dibuat saat input penjualan: ${u.name}`);
    await notifyStaff(["admin.students", "admin.orders"], {
      title: "Pelanggan baru",
      body: `${u.name} ditambahkan oleh ${me.name} saat input penjualan.`,
      rows: [
        ["Nama", u.name],
        ["Email", u.email],
        ["WhatsApp", u.phone ?? "-"],
      ],
      link: `/admin/pengguna/${u.id}`,
      kind: "NEW_CUSTOMER",
    });
    userId = u.id;
  } else {
    const u = await db.user.findFirst({ where: { id: userId, role: "STUDENT" } });
    if (!u) back(fail, "Pelanggan tidak ditemukan.", "error");
  }

  const discount = hasPermission(me, "admin.finance") ? optInt(form, "discount") : null;
  let orderId: string;
  try {
    const order = await createOrder(userId, str(form, "packageId"), {
      durationId: str(form, "durationId") || null,
      addonIds: form.getAll("addonIds").map(String),
      plan: str(form, "plan") === "INSTALLMENT" ? "INSTALLMENT" : "FULL",
      discount,
      leadSource: str(form, "leadSource") || null,
      note: optStr(form, "note"),
      createdById: me.id,
    });
    orderId = order.id;
    await logAudit(actor(me), "SALE_CREATED", "Order", order.id, `Penjualan ${order.code} diinput admin (${rupiah(order.amount)})`, {
      after: { amount: order.amount, discount, plan: order.paymentPlan, leadSource: order.leadSource },
    });
  } catch (e) {
    if (e instanceof QuoteError) back(fail, e.message, "error");
    throw e;
  }
  redirect(`/admin/order/${orderId}?pesan=${encodeURIComponent("Penjualan dibuat. Konfirmasi pembayaran di bawah bila sudah dibayar.")}`);
}

export async function resendReceiptAction(form: FormData) {
  const me = await requirePermission("admin.orders");
  const id = str(form, "orderId");
  const order = await db.order.findUnique({ where: { id }, include: { installments: { where: { status: "PAID" }, orderBy: { seq: "desc" }, take: 1 } } });
  if (!order || (order.status !== "PAID" && order.status !== "PARTIAL")) back(`/admin/order/${id}`, "Kwitansi hanya untuk order yang sudah dibayar.", "error");
  const ok = await sendReceipt(id, { seq: order.installments[0]?.seq, force: true });
  await logAudit(actor(me), "RECEIPT_SENT", "Order", id, `Kwitansi ${order.code} dikirim ulang (${ok ? "terkirim" : "gagal/SMTP belum diatur"})`);
  back(`/admin/order/${id}`, ok ? "Kwitansi dikirim ke email pelanggan." : "Kwitansi belum terkirim: periksa pengaturan SMTP di menu Email.", ok ? "ok" : "error");
}

export async function cancelOrderAction(form: FormData) {
  const me = await requirePermission("admin.orders");
  const id = str(form, "orderId");
  const order = await db.order.findUnique({ where: { id } });
  if (!order || order.status !== "PENDING") back(`/admin/order/${id}`, "Hanya order yang belum ada pembayaran sama sekali yang bisa dibatalkan.", "error");
  const note = optStr(form, "note");
  await db.order.update({ where: { id }, data: { status: "CANCELLED", note: note ?? order.note } });
  await logAudit(actor(me), "ORDER_CANCELLED", "Order", id, `Order ${order.code} dibatalkan${note ? `: ${note}` : ""}`);
  back(`/admin/order/${id}`, "Order dibatalkan.");
}

// ---------- Akun ----------
// Owner membuat & mengatur akun admin/tutor. Admin dengan akses "Akun murid" hanya mengelola murid.

const userSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter."),
  email: z.string().email("Email tidak valid."),
  role: z.enum(["ADMIN", "TUTOR", "STUDENT"]),
  password: z.string().min(8, "Kata sandi minimal 8 karakter."),
});

function canManageAccount(me: CurrentUser, targetRole: string) {
  if (me.role === "OWNER") return targetRole !== "OWNER";
  return targetRole === "STUDENT" && hasPermission(me, "admin.students");
}

export async function createUserAction(form: FormData) {
  const me = await requireUser(["OWNER", "ADMIN"]);
  const backTo = str(form, "back") || "/admin/pengguna";
  const parsed = userSchema.safeParse({
    name: str(form, "name"),
    email: str(form, "email").toLowerCase(),
    role: str(form, "role"),
    password: String(form.get("password") ?? ""),
  });
  if (!parsed.success) back(backTo, parsed.error.issues[0].message, "error");
  const { name, email, role, password } = parsed.data;
  if (!canManageAccount(me, role)) back(backTo, "Hanya owner yang dapat membuat akun admin dan tutor.", "error");
  if (await db.user.findUnique({ where: { email } })) back(backTo, "Email sudah terdaftar.", "error");

  const permissions = role === "ADMIN" ? DEFAULT_ADMIN_PERMISSIONS : role === "TUTOR" ? DEFAULT_TUTOR_PERMISSIONS : [];
  const user = await db.user.create({
    data: { name, email, role, phone: optStr(form, "phone"), passwordHash: await hashPassword(password), permissions: JSON.stringify(permissions) },
  });
  if (role === "TUTOR") {
    const field = str(form, "field");
    await db.tutorProfile.create({
      data: { userId: user.id, field: (MENTORING_FIELDS as readonly string[]).includes(field) ? field : "CLINICAL" },
    });
  }
  await logAudit(actor(me), "ACCOUNT_CREATED", "User", user.id, `Akun ${ROLE_LABEL[role as Role]} dibuat: ${name} (${email})`, {
    after: { role, permissions },
  });
  const next = role === "STUDENT" ? `/admin/pengguna/${user.id}` : `/admin/tim/${user.id}`;
  redirect(`${next}?pesan=${encodeURIComponent("Akun dibuat. Atur hak aksesnya di bawah.")}`);
}

export async function updateUserAction(form: FormData) {
  const me = await requireUser(["OWNER", "ADMIN"]);
  const id = str(form, "userId");
  const backTo = str(form, "back") || `/admin/pengguna/${id}`;
  const target = await db.user.findUnique({ where: { id } });
  if (!target) back("/admin", "Akun tidak ditemukan.", "error");
  if (!canManageAccount(me, target.role)) back(backTo, "Anda tidak berwenang mengubah akun ini.", "error");
  const name = str(form, "name");
  if (name.length < 2) back(backTo, "Nama minimal 2 karakter.", "error");
  const active = bool(form, "active");

  // Peran hanya bisa diganti owner, dan tidak menjadi owner.
  let role = target.role;
  const requested = str(form, "role");
  if (me.role === "OWNER" && requested && requested !== target.role) {
    if (!["ADMIN", "TUTOR", "STUDENT"].includes(requested)) back(backTo, "Peran tidak valid.", "error");
    role = requested;
  }
  const permissions =
    role === target.role ? target.permissions : JSON.stringify(role === "ADMIN" ? DEFAULT_ADMIN_PERMISSIONS : role === "TUTOR" ? DEFAULT_TUTOR_PERMISSIONS : []);

  await db.user.update({
    where: { id },
    data: { name, role, active, permissions, phone: optStr(form, "phone"), institution: optStr(form, "institution") },
  });
  if (role === "TUTOR" && !(await db.tutorProfile.findUnique({ where: { userId: id } }))) {
    await db.tutorProfile.create({ data: { userId: id, field: "CLINICAL" } });
  }
  await logAudit(actor(me), "ACCOUNT_UPDATED", "User", id, `Akun ${name} diubah`, {
    before: { name: target.name, role: target.role, active: target.active },
    after: { name, role, active },
  });
  back(role === "STUDENT" ? `/admin/pengguna/${id}` : `/admin/tim/${id}`, "Akun disimpan.");
}

export async function savePermissionsAction(form: FormData) {
  const me = await requireUser(["OWNER"]);
  const id = str(form, "userId");
  const target = await db.user.findUnique({ where: { id } });
  if (!target || (target.role !== "ADMIN" && target.role !== "TUTOR")) back("/admin/tim", "Akun tidak ditemukan.", "error");
  const keys = sanitizePermissions(target.role, form.getAll("permissions").map(String));
  await db.user.update({ where: { id }, data: { permissions: JSON.stringify(keys) } });
  await logAudit(actor(me), "PERMISSIONS_CHANGED", "User", id, `Hak akses ${target.name} diubah`, {
    before: JSON.parse(target.permissions || "[]"),
    after: keys,
  });
  back(`/admin/tim/${id}`, "Hak akses disimpan. Berlaku saat pengguna membuka halaman berikutnya.");
}

export async function resetPasswordAction(form: FormData) {
  const me = await requireUser(["OWNER", "ADMIN"]);
  const id = str(form, "userId");
  const target = await db.user.findUnique({ where: { id } });
  const backTo = target?.role === "STUDENT" ? `/admin/pengguna/${id}` : `/admin/tim/${id}`;
  if (!target || !canManageAccount(me, target.role)) back(backTo, "Anda tidak berwenang.", "error");
  const password = String(form.get("password") ?? "");
  if (password.length < 8) back(backTo, "Kata sandi minimal 8 karakter.", "error");
  await db.user.update({ where: { id }, data: { passwordHash: await hashPassword(password) } });
  await logAudit(actor(me), "PASSWORD_RESET", "User", id, `Kata sandi ${target.name} diatur ulang`);
  back(backTo, "Kata sandi diganti. Sampaikan ke pengguna melalui kanal pribadi.");
}

export async function saveTutorProfileAction(form: FormData) {
  const me = await requirePermission("admin.tutors");
  const userId = str(form, "userId");
  const path = `/admin/tim/${userId}`;
  const field = str(form, "field");
  if (!(MENTORING_FIELDS as readonly string[]).includes(field)) back(path, "Bidang tidak valid.", "error");
  const feeBasis = optStr(form, "feeBasis");
  if (feeBasis && !(FEE_BASIS as readonly string[]).includes(feeBasis)) back(path, "Jenis fee tidak valid.", "error");
  const before = await db.tutorProfile.findUnique({ where: { userId } });
  const data = {
    field,
    feeBasis,
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
  await logAudit(actor(me), "TUTOR_PROFILE_UPDATED", "TutorProfile", profile.id, "Profil/fee tutor diubah", {
    before: before ? { field: before.field, rate: before.rate, feeBasis: before.feeBasis, bankAccount: before.bankAccount } : null,
    after: { field, rate: data.rate, feeBasis, bankAccount: data.bankAccount },
  });
  back(path, "Profil tutor disimpan.");
}

export async function grantEntitlementAction(form: FormData) {
  const me = await requirePermission("admin.students");
  const userId = str(form, "userId");
  const path = `/admin/pengguna/${userId}`;
  const pkg = await db.package.findUnique({ where: { id: str(form, "packageId") } });
  if (!pkg) back(path, "Pilih paket.", "error");
  const days = optInt(form, "days") ?? pkg.accessDays;
  const now = new Date();
  const ent = await db.entitlement.create({
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
  await logAudit(actor(me), "ENTITLEMENT_GRANTED", "Entitlement", ent.id, `Akses ${pkg.name} diberikan manual`);
  await notifyUser(userId, { title: `Akses ${pkg.name} aktif`, link: "/belajar", email: true });
  back(path, "Akses diberikan.");
}

export async function revokeEntitlementAction(form: FormData) {
  const me = await requirePermission("admin.students");
  const id = str(form, "entitlementId");
  const ent = await db.entitlement.update({ where: { id }, data: { revokedAt: new Date() }, include: { package: true } });
  await logAudit(actor(me), "ENTITLEMENT_REVOKED", "Entitlement", id, `Akses ${ent.package.name} dicabut`);
  back(`/admin/pengguna/${ent.userId}`, "Akses dicabut. Hak akses dari order lain tidak terpengaruh.");
}

export async function createMentoringAction(form: FormData) {
  await requirePermission("admin.mentoring");
  const studentId = str(form, "userId");
  const field = str(form, "field");
  if (!(MENTORING_FIELDS as readonly string[]).includes(field)) back(`/admin/pengguna/${studentId}`, "Bidang tidak valid.", "error");
  const m = await db.mentoring.create({ data: { studentId, field, title: optStr(form, "title") } });
  redirect(`/bimbingan/${m.id}`);
}

// ---------- Paket ----------

export async function deletePackageAction(form: FormData) {
  const me = await requirePermission("admin.packages");
  const id = str(form, "id");
  const pkg = await db.package.findUnique({ where: { id } });
  if (!pkg) back("/admin/paket", "Paket tidak ditemukan.", "error");
  const used = await db.order.count({ where: { packageId: id } });
  if (used > 0) {
    await db.package.update({ where: { id }, data: { active: false } });
    await logAudit(actor(me), "PACKAGE_DEACTIVATED", "Package", id, `Paket ${pkg.name} dinonaktifkan (sudah punya order)`);
    back("/admin/paket", "Paket sudah punya order, jadi hanya dinonaktifkan (tidak dihapus).");
  }
  await db.package.delete({ where: { id } });
  await logAudit(actor(me), "PACKAGE_DELETED", "Package", id, `Paket ${pkg.name} dihapus (belum pernah dipesan)`);
  back("/admin/paket", "Paket dihapus.");
}

// ---------- Payroll ----------
// Satu sesi hanya bisa masuk satu payroll aktif, sehingga tidak bisa dibayar dua kali.

export async function createPayrollAction(form: FormData) {
  const me = await requirePermission("admin.payroll");
  const tutorId = str(form, "tutorId");
  const periodLabel = str(form, "periodLabel");
  if (!periodLabel) back("/admin/payroll", "Isi label periode (mis. Oktober 2026).", "error");
  const sessions = await db.mentoringSession.findMany({
    where: { mentoring: { tutorId }, verifiedAt: { not: null }, payrollId: null },
  });
  if (sessions.length === 0) back("/admin/payroll", "Tidak ada sesi tervalidasi yang belum dibayar untuk tutor ini.", "error");
  const amount = sessions.reduce((sum, s) => sum + (s.fee ?? 0), 0);
  const payroll = await db.$transaction(async (tx) => {
    const p = await tx.payroll.create({ data: { tutorId, periodLabel, amount, notes: optStr(form, "notes") } });
    // Syarat payrollId null mencegah sesi yang sama masuk dua payroll bila diproses bersamaan.
    const res = await tx.mentoringSession.updateMany({ where: { id: { in: sessions.map((s) => s.id) }, payrollId: null }, data: { payrollId: p.id } });
    if (res.count !== sessions.length) throw new Error("Sebagian sesi sudah masuk payroll lain. Muat ulang halaman.");
    return p;
  });
  await logAudit(actor(me), "PAYROLL_CREATED", "Payroll", payroll.id, `Payroll ${periodLabel}: ${sessions.length} sesi, ${rupiah(amount)}`, {
    after: { sessionIds: sessions.map((s) => s.id), amount },
  });
  await notifyUser(tutorId, { title: `Payroll ${periodLabel} dibuat`, body: `${sessions.length} sesi.`, link: "/tutor-panel/payroll" });
  back("/admin/payroll", `Payroll dibuat untuk ${sessions.length} sesi.`);
}

export async function markPayrollPaidAction(form: FormData) {
  const me = await requirePermission("admin.payroll");
  const id = str(form, "payrollId");
  const payroll = await db.payroll.findUnique({ where: { id } });
  if (!payroll || payroll.status === "VOID") back("/admin/payroll", "Payroll tidak ditemukan atau sudah dibatalkan.", "error");
  const paid = str(form, "status") === "PAID";
  const paymentRef = optStr(form, "paymentRef") ?? payroll.paymentRef;
  if (paid && !paymentRef) back("/admin/payroll", "Isi referensi transfer sebelum menandai dibayar.", "error");

  let proofFileId = payroll.proofFileId;
  try {
    const upload = await saveUpload(form.get("proofFile") as File | null, me.id);
    if (upload) proofFileId = upload.id;
  } catch (e) {
    if (e instanceof UploadError) back("/admin/payroll", e.message, "error");
    throw e;
  }
  await db.payroll.update({
    where: { id },
    data: { proofFileId, paymentRef, status: paid ? "PAID" : "UNPAID", paidAt: paid ? payroll.paidAt ?? new Date() : null },
  });
  if (paid !== (payroll.status === "PAID")) {
    await logAudit(actor(me), paid ? "PAYROLL_PAID" : "PAYROLL_UNPAID", "Payroll", id, `Payroll ${payroll.periodLabel} ${paid ? "dibayar" : "dikembalikan ke belum dibayar"}`, {
      before: { status: payroll.status },
      after: { status: paid ? "PAID" : "UNPAID", paymentRef },
    });
  }
  if (paid && payroll.status !== "PAID") {
    await notifyUser(payroll.tutorId, { title: `Payroll ${payroll.periodLabel} sudah dibayar`, link: "/tutor-panel/payroll", email: true });
  }
  back("/admin/payroll", "Payroll diperbarui.");
}

// Payroll tidak dihapus permanen: dibatalkan (void) dengan alasan; sesinya kembali payable.
export async function voidPayrollAction(form: FormData) {
  const me = await requirePermission("admin.payroll");
  const id = str(form, "payrollId");
  const payroll = await db.payroll.findUnique({ where: { id } });
  if (!payroll || payroll.status !== "UNPAID") back("/admin/payroll", "Hanya payroll yang belum dibayar yang dapat dibatalkan.", "error");
  const reason = str(form, "reason");
  if (!reason) back("/admin/payroll", "Isi alasan pembatalan payroll.", "error");
  await db.$transaction([
    db.mentoringSession.updateMany({ where: { payrollId: id }, data: { payrollId: null } }),
    db.payroll.update({ where: { id }, data: { status: "VOID", voidReason: reason } }),
  ]);
  await logAudit(actor(me), "PAYROLL_VOIDED", "Payroll", id, `Payroll ${payroll.periodLabel} dibatalkan: ${reason}`);
  back("/admin/payroll", "Payroll dibatalkan; sesinya kembali ke daftar payable.");
}

// ---------- Pengaturan ----------

export async function saveSettingsAction(form: FormData) {
  const me = await requirePermission("admin.settings");
  for (const key of Object.keys(SETTING_DEFAULTS) as SettingKey[]) {
    const value = str(form, key);
    await db.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }
  await logAudit(actor(me), "SETTINGS_SAVED", "Setting", null, "Pengaturan situs diubah");
  revalidatePath("/", "layout");
  back("/admin/pengaturan", "Pengaturan disimpan.");
}

// ---------- Laporan berkala ----------

export async function sendReportNowAction(kind: "weekly" | "monthly") {
  const me = await requirePermission("admin.reports");
  if (!hasPermission(me, "admin.finance")) back("/admin/laporan", "Butuh akses Angka keuangan.", "error");
  const r = await sendPeriodicReport(kind, { force: true });
  await logAudit(actor(me), "REPORT_EMAIL_SENT", "Setting", null, `Laporan ${kind === "weekly" ? "mingguan" : "bulanan"} dikirim manual`);
  if ("skipped" in r) back("/admin/laporan", r.skipped ?? "Tidak dikirim.", "error");
  if (!r.sent) back("/admin/laporan", `Laporan ${r.label} tidak terkirim (${r.total} penerima). Periksa menu Email — kemungkinan SMTP belum diatur.`, "error");
  back("/admin/laporan", `Laporan ${r.label} terkirim ke ${r.sent} dari ${r.total} penerima.`);
}
