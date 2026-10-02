import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { tanggal } from "@/lib/format";
import { createUserAction } from "@/app/actions/admin";
import { Empty, Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Murid" };

export default async function AdminStudents({ searchParams }: { searchParams: SearchParams }) {
  const { pesan, tipe, pick } = await readFlash(searchParams);
  // Akun admin & tutor dikelola di /admin/tim.
  if (pick("role") && pick("role") !== "STUDENT") redirect("/admin/tim");
  await requirePermission("admin.students");
  const q = pick("q")?.trim();
  const users = await db.user.findMany({
    where: {
      role: "STUDENT",
      ...(q ? { OR: [{ name: { contains: q } }, { email: { contains: q } }, { phone: { contains: q } }] } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 300,
    include: { _count: { select: { entitlements: true, mentoringsAsStudent: true, orders: true } } },
  });

  return (
    <>
      <PageHeader title="Murid" subtitle="Pelanggan mendaftar sendiri di website. Di sini Anda bisa mencari, mengubah, dan memberi akses paket." />
      <Flash pesan={pesan} tipe={tipe} />

      <details className="card mb-6">
        <summary className="cursor-pointer font-semibold text-brand">+ Buat akun murid manual (mis. pelanggan dari WhatsApp)</summary>
        <form action={createUserAction} className="mt-4 grid gap-3 sm:grid-cols-2">
          <input type="hidden" name="role" value="STUDENT" />
          <Field label="Nama">
            <input className="input" name="name" required />
          </Field>
          <Field label="Email">
            <input className="input" type="email" name="email" required />
          </Field>
          <Field label="No. WhatsApp">
            <input className="input" name="phone" />
          </Field>
          <Field label="Kata sandi awal" hint="Minimal 8 karakter. Sampaikan ke murid secara pribadi.">
            <input className="input" name="password" required minLength={8} autoComplete="new-password" />
          </Field>
          <div>
            <button className="btn" type="submit">
              Buat akun murid
            </button>
          </div>
        </form>
      </details>

      <form className="mb-4 flex flex-wrap gap-2">
        <input className="input max-w-xs" name="q" defaultValue={q} placeholder="Cari nama, email, WA" />
        <button className="btn-secondary" type="submit">
          Cari
        </button>
      </form>

      {users.length === 0 ? (
        <Empty>Tidak ada murid.</Empty>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Kontak</th>
                <th>Ringkasan</th>
                <th>Terdaftar</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className={u.active ? "" : "opacity-50"}>
                  <td>
                    <Link href={`/admin/pengguna/${u.id}`} className="link">
                      {u.name}
                    </Link>
                    {!u.active && <span className="badge ml-2">Nonaktif</span>}
                  </td>
                  <td>
                    {u.email}
                    <p className="text-xs text-slate-500">{u.phone}</p>
                  </td>
                  <td className="text-xs text-slate-600">
                    {u._count.entitlements} akses · {u._count.orders} order · {u._count.mentoringsAsStudent} bimbingan
                  </td>
                  <td>{tanggal(u.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
