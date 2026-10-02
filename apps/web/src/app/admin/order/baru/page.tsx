import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { LEAD_SOURCES, LEAD_SOURCE_LABEL, rulesValid } from "@/lib/installments";
import { createSaleAction } from "@/app/actions/admin";
import { SaleForm } from "@/components/sale-form";
import { Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Input penjualan" };

export default async function NewSalePage({ searchParams }: { searchParams: SearchParams }) {
  const me = await requirePermission("admin.orders");
  const { pesan, tipe } = await readFlash(searchParams);
  const [services, students] = await Promise.all([
    db.package.findMany({
      orderBy: [{ active: "desc" }, { order: "asc" }],
      include: {
        durations: { where: { active: true }, orderBy: [{ order: "asc" }, { months: "asc" }] },
        addons: { where: { active: true }, orderBy: { order: "asc" } },
        installmentRules: { orderBy: { seq: "asc" } },
      },
    }),
    db.user.findMany({ where: { role: "STUDENT", active: true }, orderBy: { name: "asc" }, select: { id: true, name: true, email: true, phone: true }, take: 1000 }),
  ]);

  return (
    <>
      <PageHeader
        title="Input penjualan"
        subtitle="Untuk pelanggan yang memesan lewat WhatsApp, Instagram, atau langsung. Setelah dibuat, konfirmasi pembayarannya di halaman order."
        back={{ href: "/admin/order", label: "Semua order" }}
      />
      <Flash pesan={pesan} tipe={tipe} />
      <SaleForm
        action={createSaleAction}
        canDiscount={hasPermission(me, "admin.finance")}
        students={students.map((s) => ({ id: s.id, label: `${s.name} · ${s.email}${s.phone ? ` · ${s.phone}` : ""}` }))}
        leadSources={LEAD_SOURCES.map((l) => ({ value: l, label: LEAD_SOURCE_LABEL[l] }))}
        services={services.map((s) => ({
          id: s.id,
          name: s.active ? s.name : `${s.name} (disembunyikan)`,
          price: s.price,
          durations: s.durations.map((d) => ({ id: d.id, label: d.label, price: d.price })),
          addons: s.addons.map((a) => ({ id: a.id, label: a.name, price: a.price })),
          installments: s.allowInstallment && !rulesValid(s.installmentRules) ? s.installmentRules : [],
        }))}
      />
    </>
  );
}
