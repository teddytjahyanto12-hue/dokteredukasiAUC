"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requirePermission, type CurrentUser } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { logAudit } from "@/lib/audit";
import { deleteStoredFile, saveUpload, UploadError } from "@/lib/storage";
import { back, bool, optInt, optStr, str } from "@/lib/flash";
import { FEE_BASIS } from "@/lib/constants";
import { slugify } from "@/lib/format";
import { ELIGIBILITY_LEVELS } from "@/lib/services";

// Semua isi layanan diinput manual oleh owner/admin dengan akses "Paket & harga".

const actor = (u: CurrentUser) => ({ id: u.id, name: u.name });
const pathOf = (id: string) => `/admin/paket/${id}`;

function refresh(slug?: string) {
  revalidatePath("/paket");
  if (slug) revalidatePath(`/paket/${slug}`);
  revalidatePath("/", "layout");
}

async function ownedService(form: FormData) {
  const id = str(form, "packageId");
  const pkg = await db.package.findUnique({ where: { id } });
  if (!pkg) back("/admin/paket", "Layanan tidak ditemukan.", "error");
  return pkg;
}

// Nilai HPP hanya diubah oleh pengguna dengan akses Angka keuangan; lainnya mempertahankan nilai lama.
function hppFrom(me: CurrentUser, form: FormData, key: string, current: number | null) {
  return hasPermission(me, "admin.finance") ? optInt(form, key) : current;
}

// ---------- Data utama ----------

export async function saveServiceAction(form: FormData) {
  const me = await requirePermission("admin.packages");
  const id = optStr(form, "id");
  const name = str(form, "name");
  const fail = id ? pathOf(id) : "/admin/paket/baru";
  if (name.length < 3) back(fail, "Nama layanan minimal 3 karakter.", "error");
  const slug = slugify(str(form, "slug") || name);
  if (!slug) back(fail, "Slug tidak valid.", "error");
  const clash = await db.package.findFirst({ where: { slug, ...(id ? { NOT: { id } } : {}) } });
  if (clash) back(fail, "Alamat (slug) sudah dipakai layanan lain.", "error");
  const includesMentoring = bool(form, "includesMentoring");
  const mentoringField = optStr(form, "mentoringField");
  if (includesMentoring && !mentoringField) back(fail, "Pilih bidang bimbingan.", "error");
  const sopUrl = optStr(form, "sopUrl");
  if (sopUrl && !/^https?:\/\//.test(sopUrl)) back(fail, "Link SOP harus diawali http(s)://", "error");

  const before = id ? await db.package.findUnique({ where: { id } }) : null;
  let posterFileId = before?.posterFileId ?? null;
  try {
    const poster = await saveUpload(form.get("poster") as File | null, me.id, { imageOnly: true, isPublic: true });
    if (poster) posterFileId = poster.id;
  } catch (e) {
    if (e instanceof UploadError) back(fail, e.message, "error");
    throw e;
  }
  if (bool(form, "removePoster")) posterFileId = null;

  const data = {
    name,
    slug,
    trackSlug: optStr(form, "trackSlug"),
    summary: optStr(form, "summary"),
    description: optStr(form, "description"),
    price: optInt(form, "price"),
    accessDays: optInt(form, "accessDays"),
    hpp: hppFrom(me, form, "hpp", before?.hpp ?? null),
    sopUrl,
    sopNote: optStr(form, "sopNote"),
    posterFileId,
    includesMentoring,
    mentoringField: includesMentoring ? mentoringField : null,
    active: bool(form, "active"),
    order: optInt(form, "order") ?? 0,
  };
  const pkg = id ? await db.package.update({ where: { id }, data }) : await db.package.create({ data });

  // Layanan baru langsung mendapat pilihan masa belajar bawaan 3 & 6 bulan (bisa dihapus/diubah).
  if (!id) {
    await db.packageDuration.createMany({
      data: [
        { packageId: pkg.id, label: "3 bulan", months: 3, order: 0 },
        { packageId: pkg.id, label: "6 bulan", months: 6, order: 1 },
      ],
    });
  }

  const categoryIds = form.getAll("categoryIds").map(String);
  await db.packageCategory.deleteMany({ where: { packageId: pkg.id, categoryId: { notIn: categoryIds } } });
  for (const categoryId of categoryIds) {
    await db.packageCategory.upsert({
      where: { packageId_categoryId: { packageId: pkg.id, categoryId } },
      update: {},
      create: { packageId: pkg.id, categoryId },
    });
  }

  if (before?.posterFileId && before.posterFileId !== posterFileId) {
    const old = await db.fileAsset.findUnique({ where: { id: before.posterFileId } });
    if (old && !(await db.package.count({ where: { posterFileId: old.id } }))) {
      await db.fileAsset.delete({ where: { id: old.id } });
      await deleteStoredFile(old.storagePath);
    }
  }

  await logAudit(actor(me), "PACKAGE_SAVED", "Package", pkg.id, `Layanan ${name} ${id ? "diubah" : "dibuat"}`, {
    before: before ? { price: before.price, hpp: before.hpp, active: before.active } : undefined,
    after: { price: data.price, hpp: data.hpp, active: data.active },
  });
  refresh(pkg.slug);
  back(pathOf(pkg.id), id ? "Layanan disimpan." : "Layanan dibuat. Lengkapi benefit, masa belajar, dan add-on di bawah.");
}

// ---------- Benefit ----------

export async function addBenefitAction(form: FormData) {
  await requirePermission("admin.packages");
  const pkg = await ownedService(form);
  const lines = str(form, "text")
    .split("\n")
    .map((l) => l.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
  if (!lines.length) back(pathOf(pkg.id), "Tulis benefit terlebih dahulu.", "error");
  const last = await db.packageBenefit.count({ where: { packageId: pkg.id } });
  await db.packageBenefit.createMany({ data: lines.map((text, i) => ({ packageId: pkg.id, text, order: last + i })) });
  refresh(pkg.slug);
  back(pathOf(pkg.id), `${lines.length} benefit ditambahkan.`);
}

export async function updateBenefitAction(form: FormData) {
  await requirePermission("admin.packages");
  const pkg = await ownedService(form);
  const text = str(form, "text");
  if (!text) back(pathOf(pkg.id), "Benefit tidak boleh kosong.", "error");
  await db.packageBenefit.updateMany({ where: { id: str(form, "id"), packageId: pkg.id }, data: { text, order: optInt(form, "order") ?? 0 } });
  refresh(pkg.slug);
  back(pathOf(pkg.id), "Benefit disimpan.");
}

export async function deleteBenefitAction(form: FormData) {
  await requirePermission("admin.packages");
  const pkg = await ownedService(form);
  await db.packageBenefit.deleteMany({ where: { id: str(form, "id"), packageId: pkg.id } });
  refresh(pkg.slug);
  back(pathOf(pkg.id), "Benefit dihapus.");
}

// ---------- Masa waktu belajar ----------

function durationData(me: CurrentUser, form: FormData, currentHpp: number | null) {
  const months = optInt(form, "months");
  const label = str(form, "label") || (months ? `${months} bulan` : "");
  return { label, months, price: optInt(form, "price"), hpp: hppFrom(me, form, "hpp", currentHpp), active: bool(form, "active"), order: optInt(form, "order") ?? 0 };
}

export async function addDurationAction(form: FormData) {
  const me = await requirePermission("admin.packages");
  const pkg = await ownedService(form);
  const d = durationData(me, form, null);
  if (!d.months || d.months < 1 || d.months > 60) back(pathOf(pkg.id), "Isi lama belajar dalam bulan (1–60).", "error");
  const order = optInt(form, "order") ?? (await db.packageDuration.count({ where: { packageId: pkg.id } }));
  await db.packageDuration.create({ data: { ...d, order, months: d.months, packageId: pkg.id, active: true } });
  await logAudit(actor(me), "PACKAGE_SAVED", "Package", pkg.id, `Masa belajar "${d.label}" ditambahkan ke ${pkg.name}`, { after: { price: d.price } });
  refresh(pkg.slug);
  back(pathOf(pkg.id), "Pilihan masa belajar ditambahkan.");
}

export async function updateDurationAction(form: FormData) {
  const me = await requirePermission("admin.packages");
  const pkg = await ownedService(form);
  const row = await db.packageDuration.findFirst({ where: { id: str(form, "id"), packageId: pkg.id } });
  if (!row) back(pathOf(pkg.id), "Pilihan tidak ditemukan.", "error");
  const d = durationData(me, form, row.hpp);
  if (!d.months || d.months < 1 || d.months > 60) back(pathOf(pkg.id), "Isi lama belajar dalam bulan (1–60).", "error");
  await db.packageDuration.update({ where: { id: row.id }, data: { ...d, months: d.months } });
  if (row.price !== d.price) {
    await logAudit(actor(me), "PACKAGE_SAVED", "Package", pkg.id, `Harga "${d.label}" ${pkg.name} diubah`, { before: { price: row.price }, after: { price: d.price } });
  }
  refresh(pkg.slug);
  back(pathOf(pkg.id), "Pilihan masa belajar disimpan.");
}

export async function deleteDurationAction(form: FormData) {
  const me = await requirePermission("admin.packages");
  const pkg = await ownedService(form);
  const row = await db.packageDuration.findFirst({ where: { id: str(form, "id"), packageId: pkg.id } });
  if (!row) back(pathOf(pkg.id), "Pilihan tidak ditemukan.", "error");
  // Order lama menyimpan salinan label & harga, jadi aman dihapus.
  await db.packageDuration.delete({ where: { id: row.id } });
  await logAudit(actor(me), "PACKAGE_SAVED", "Package", pkg.id, `Masa belajar "${row.label}" dihapus dari ${pkg.name}`);
  refresh(pkg.slug);
  back(pathOf(pkg.id), "Pilihan masa belajar dihapus.");
}

// ---------- Add-on ----------

function addonData(me: CurrentUser, form: FormData, currentHpp: number | null) {
  return {
    name: str(form, "name"),
    description: optStr(form, "description"),
    price: optInt(form, "price"),
    hpp: hppFrom(me, form, "hpp", currentHpp),
    active: bool(form, "active"),
    order: optInt(form, "order") ?? 0,
  };
}

export async function addAddonAction(form: FormData) {
  const me = await requirePermission("admin.packages");
  const pkg = await ownedService(form);
  const a = addonData(me, form, null);
  if (a.name.length < 2) back(pathOf(pkg.id), "Nama add-on minimal 2 karakter.", "error");
  const order = optInt(form, "order") ?? (await db.packageAddon.count({ where: { packageId: pkg.id } }));
  await db.packageAddon.create({ data: { ...a, order, packageId: pkg.id, active: true } });
  await logAudit(actor(me), "PACKAGE_SAVED", "Package", pkg.id, `Add-on "${a.name}" ditambahkan ke ${pkg.name}`, { after: { price: a.price } });
  refresh(pkg.slug);
  back(pathOf(pkg.id), "Add-on ditambahkan.");
}

export async function updateAddonAction(form: FormData) {
  const me = await requirePermission("admin.packages");
  const pkg = await ownedService(form);
  const row = await db.packageAddon.findFirst({ where: { id: str(form, "id"), packageId: pkg.id } });
  if (!row) back(pathOf(pkg.id), "Add-on tidak ditemukan.", "error");
  const a = addonData(me, form, row.hpp);
  if (a.name.length < 2) back(pathOf(pkg.id), "Nama add-on minimal 2 karakter.", "error");
  await db.packageAddon.update({ where: { id: row.id }, data: a });
  if (row.price !== a.price) {
    await logAudit(actor(me), "PACKAGE_SAVED", "Package", pkg.id, `Harga add-on "${a.name}" diubah`, { before: { price: row.price }, after: { price: a.price } });
  }
  refresh(pkg.slug);
  back(pathOf(pkg.id), "Add-on disimpan.");
}

export async function deleteAddonAction(form: FormData) {
  const me = await requirePermission("admin.packages");
  const pkg = await ownedService(form);
  const row = await db.packageAddon.findFirst({ where: { id: str(form, "id"), packageId: pkg.id } });
  if (!row) back(pathOf(pkg.id), "Add-on tidak ditemukan.", "error");
  await db.packageAddon.delete({ where: { id: row.id } });
  await logAudit(actor(me), "PACKAGE_SAVED", "Package", pkg.id, `Add-on "${row.name}" dihapus dari ${pkg.name}`);
  refresh(pkg.slug);
  back(pathOf(pkg.id), "Add-on dihapus.");
}

// ---------- Kelayakan & fee tutor per layanan ----------

export async function saveEligibilityAction(form: FormData) {
  const me = await requirePermission("admin.tutors");
  const pkg = await ownedService(form);
  const tutors = await db.user.findMany({ where: { role: "TUTOR" }, select: { id: true } });
  const changes: string[] = [];
  for (const t of tutors) {
    const level = str(form, `level_${t.id}`);
    const existing = await db.tutorServiceEligibility.findUnique({ where: { tutorId_packageId: { tutorId: t.id, packageId: pkg.id } } });
    if (!(ELIGIBILITY_LEVELS as readonly string[]).includes(level)) {
      if (existing) {
        await db.tutorServiceEligibility.delete({ where: { id: existing.id } });
        changes.push(`${t.id}: tidak berwenang`);
      }
      continue;
    }
    const feeBasis = optStr(form, `basis_${t.id}`);
    const data = {
      level,
      fee: optInt(form, `fee_${t.id}`),
      feeBasis: feeBasis && (FEE_BASIS as readonly string[]).includes(feeBasis) ? feeBasis : null,
    };
    if (!existing || existing.level !== data.level || existing.fee !== data.fee || existing.feeBasis !== data.feeBasis) {
      changes.push(`${t.id}: ${level} fee ${data.fee ?? "-"}`);
    }
    await db.tutorServiceEligibility.upsert({
      where: { tutorId_packageId: { tutorId: t.id, packageId: pkg.id } },
      update: data,
      create: { tutorId: t.id, packageId: pkg.id, ...data },
    });
  }
  if (changes.length) {
    await logAudit(actor(me), "TUTOR_PROFILE_UPDATED", "Package", pkg.id, `Kelayakan & fee tutor untuk ${pkg.name} diubah`, { after: changes });
  }
  back(pathOf(pkg.id), "Kelayakan tutor disimpan.");
}
