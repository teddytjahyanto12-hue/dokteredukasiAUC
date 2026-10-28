import { requirePermission } from "@/lib/auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { hasPermission } from "@/lib/permissions";
import { db } from "@/lib/db";
import { rupiah, tanggal } from "@/lib/format";
import { FIELD_LABEL, MENTORING_FIELDS, MENTORING_STATUS_LABEL, ORDER_STATUS_LABEL, ROLE_LABEL, type MentoringField } from "@/lib/constants";
import {
  createMentoringAction,
  deleteStudentAction,
  grantEntitlementAction,
  resetPasswordAction,
  revokeEntitlementAction,
  updateUserAction,
} from "@/app/actions/admin";
import { ConfirmButton } from "@/components/confirm-button";
import { Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export default async function AdminUserDetail({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  const me = await requirePermission("admin.students");
  const finance = hasPermission(me, "admin.finance");
  const canMentor = hasPermission(me, "admin.mentoring");
  const { id } = await params;
  const { pesan, tipe } = await readFlash(searchParams);
  const user = await db.user.findUnique({
    where: { id },
    include: {
      entitlements: { orderBy: { startsAt: "desc" }, include: { package: true, order: { select: { code: true } } } },
      orders: { orderBy: { createdAt: "desc" }, include: { package: true } },
      mentoringsAsStudent: { include: { tutor: { select: { name: true } } } },
    },
  });
  if (!user) notFound();
  // Akun admin/tutor dikelola di halaman Tim.
  if (user.role !== "STUDENT") redirect(`/admin/tim/${user.id}`);
  const packages = await db.package.findMany({ orderBy: { order: "asc" } });
  const now = new Date();

  return (
    <>
      <PageHeader title={user.name} subtitle={`${user.email} · ${ROLE_LABEL[user.role as keyof typeof ROLE_LABEL]}`} back={{ href: "/admin/pengguna", label: "Semua murid" }} />
      <Flash pesan={pesan} tipe={tipe} />

      <div className="grid gap-6 xl:grid-cols-2">
        <form action={updateUserAction} className="card space-y-3">
          <input type="hidden" name="userId" value={user.id} />
          <h2 className="h2">Data akun</h2>
          <Field label="Nama">
            <input className="input" name="name" defaultValue={user.name} required />
          </Field>
          <Field label="No. WhatsApp">
            <input className="input" name="phone" defaultValue={user.phone ?? ""} />
          </Field>
          <Field label="Instansi">
            <input className="input" name="institution" defaultValue={user.institution ?? ""} />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="active" defaultChecked={user.active} /> Akun aktif (bisa login)
          </label>
          <button className="btn" type="submit">
            Simpan
          </button>
        </form>

        <form action={resetPasswordAction} className="card space-y-3 self-start">
          <input type="hidden" name="userId" value={user.id} />
          <h2 className="h2">Atur ulang kata sandi</h2>
          <Field label="Kata sandi baru" hint="Minimal 6 karakter.">
            <input className="input" name="password" minLength={6} required autoComplete="new-password" />
          </Field>
          <button className="btn-secondary" type="submit">
            Ganti kata sandi
          </button>
        </form>

        {user.role === "STUDENT" && (
          <>
            <section className="card xl:col-span-2">
              <h2 className="h2 mb-3">Akses paket</h2>
              {user.entitlements.length === 0 ? (
                <p className="muted">Belum ada akses.</p>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Paket</th>
                      <th>Asal</th>
                      <th>Berlaku</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.entitlements.map((e) => {
                      const active = !e.revokedAt && (!e.expiresAt || e.expiresAt > now);
                      return (
                        <tr key={e.id}>
                          <td>{e.package.name}</td>
                          <td className="text-xs">{e.order ? `Order ${e.order.code}` : e.note ?? "Manual"}</td>
                          <td className="text-xs">
                            {tanggal(e.startsAt)} – {e.expiresAt ? tanggal(e.expiresAt) : "tanpa batas"}
                          </td>
                          <td>{e.revokedAt ? <span className="badge">Dicabut</span> : active ? <span className="badge-brand">Aktif</span> : <span className="badge">Berakhir</span>}</td>
                          <td>
                            {!e.revokedAt && (
                              <form action={revokeEntitlementAction}>
                                <input type="hidden" name="entitlementId" value={e.id} />
                                <ConfirmButton message="Cabut akses paket ini?" className="btn-danger btn-sm">
                                  Cabut
                                </ConfirmButton>
                              </form>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
              <form action={grantEntitlementAction} className="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-4 sm:items-end">
                <input type="hidden" name="userId" value={user.id} />
                <Field label="Beri akses manual">
                  <select className="input" name="packageId" required defaultValue="">
                    <option value="" disabled>
                      Pilih paket
                    </option>
                    {packages.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Durasi (hari)" hint="Kosong = ikut paket">
                  <input className="input" name="days" inputMode="numeric" />
                </Field>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="createMentoring" defaultChecked /> Buat bimbingan jika paket termasuk bimbingan
                </label>
                <button className="btn" type="submit">
                  Beri akses
                </button>
              </form>
            </section>

            <section className="card">
              <h2 className="h2 mb-3">Order</h2>
              {user.orders.length === 0 ? (
                <p className="muted">Belum ada order.</p>
              ) : (
                <ul className="space-y-1 text-sm">
                  {user.orders.map((o) => (
                    <li key={o.id}>
                      <Link href={`/admin/order/${o.id}`} className="link">
                        {o.code}
                      </Link>{" "}
                      · {o.package.name}
                      {finance && ` · ${rupiah(o.amount)}`} · {ORDER_STATUS_LABEL[o.status]}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="card">
              <h2 className="h2 mb-3">Bimbingan</h2>
              <ul className="space-y-1 text-sm">
                {user.mentoringsAsStudent.map((m) => (
                  <li key={m.id}>
                    <Link href={`/bimbingan/${m.id}`} className="link">
                      {FIELD_LABEL[m.field as MentoringField]}
                    </Link>{" "}
                    · {m.tutor?.name ?? "belum ada tutor"} · {MENTORING_STATUS_LABEL[m.status]}
                  </li>
                ))}
              </ul>
              {canMentor && (
              <form action={createMentoringAction} className="mt-4 grid gap-2 border-t border-slate-100 pt-4">
                <input type="hidden" name="userId" value={user.id} />
                <p className="label">Buat bimbingan manual</p>
                <select className="input" name="field">
                  {MENTORING_FIELDS.map((f) => (
                    <option key={f} value={f}>
                      {FIELD_LABEL[f]}
                    </option>
                  ))}
                </select>
                <input className="input" name="title" placeholder="Judul / topik (opsional)" />
                <button className="btn-secondary" type="submit">
                  Buat bimbingan
                </button>
              </form>
              )}
            </section>
          </>
        )}
      </div>

      <form action={deleteStudentAction} className="card mt-6 space-y-3 border-red-200">
        <input type="hidden" name="userId" value={user.id} />
        <h2 className="h2 text-red-700">Hapus akun murid</h2>
        <p className="text-sm text-slate-600">
          Menghapus akun secara permanen beserta progres belajar, hasil kuis, catatan, dan order yang belum dibayar. Tidak bisa dibatalkan. Akun dengan order lunas/cicilan tidak bisa dihapus; nonaktifkan saja lewat Data akun.
        </p>
        <ConfirmButton message={`Hapus akun ${user.name} (${user.email}) secara permanen? Tindakan ini tidak bisa dibatalkan.`}>Hapus akun ini</ConfirmButton>
      </form>
    </>
  );
}
