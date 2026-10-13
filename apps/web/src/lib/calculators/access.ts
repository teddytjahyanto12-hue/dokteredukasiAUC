import "server-only";
import { db } from "@/lib/db";
import type { CurrentUser } from "@/lib/auth";
import { activeEntitlementWhere } from "@/lib/access";
import { PREMIUM_PACKAGE_SLUG } from "@/lib/calculators/premium";

// Premium Kalkulator Medis: owner/admin selalu terbuka; murid butuh hak akses aktif paket langganan.
// Masa berlaku mengikuti Entitlement (1 bulan dari pilihan durasi paket), jadi otomatis tertutup saat habis.
export async function hasCalculatorPremium(user: CurrentUser | null): Promise<boolean> {
  if (!user) return false;
  if (user.role === "OWNER" || user.role === "ADMIN") return true;
  const ent = await db.entitlement.findFirst({
    where: { ...activeEntitlementWhere(user.id), package: { slug: PREMIUM_PACKAGE_SLUG } },
    select: { id: true },
  });
  return !!ent;
}

/** Harga bulanan yang tampil di situs, dibaca dari paket agar owner bisa mengubahnya di admin. */
export async function premiumOffer() {
  const pkg = await db.package.findUnique({
    where: { slug: PREMIUM_PACKAGE_SLUG },
    select: { slug: true, active: true, durations: { where: { active: true }, orderBy: { months: "asc" }, select: { label: true, months: true, price: true } } },
  });
  const d = pkg?.durations[0];
  return { href: `/paket/${PREMIUM_PACKAGE_SLUG}`, available: !!pkg?.active, price: d?.price ?? null, label: d?.label ?? "1 bulan" };
}
