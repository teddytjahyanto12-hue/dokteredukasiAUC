import Link from "next/link";
import { db } from "@/lib/db";
import { tanggal } from "@/lib/format";
import { FIELD_LABEL, MENTORING_FIELDS, ROLE_LABEL, ROLES, type MentoringField, type Role } from "@/lib/constants";
import { createUserAction } from "@/app/actions/admin";
import { Empty, Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Pengguna" };

export default async function AdminUsers({ searchParams }: { searchParams: SearchParams }) {
  const { pesan, tipe, pick } = await readFlash(searchParams);
  const role = pick("role");
  const q = pick("q")?.trim();
  const users = await db.user.findMany({
    where: {
      ...(role ? { role } : {}),
      ...(q ? { OR: [{ name: { contains: q } }, { email: { contains: q } }, { phone: { contains: q } }] } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 300,
    include: { tutorProfile: { select: { field: true } }, _count: { select: { entitlements: true, mentoringsAsTutor: true } } },
  });

  return (
    <>
      <PageHeader title="Pengguna & tutor" subtitle="Buat akun, atur peran, profil tutor, dan akses paket." />
      <Flash pesan={pesan} tipe={tipe} />

      <details className="card mb-6">
        <summary className="cursor-pointer font-semibold text-brand">+ Buat akun baru (murid / tutor / admin)</summary>
        <form action={createUserAction} className="mt-4 grid gap-3 sm:grid-cols-2">
          <Field label="Nama">
            <input className="input" name="name" required />
          </Field>
          <Field label="Email">
            <input className="input" type="email" name="email" required />
          </Field>
          <Field label="No. WhatsApp">
            <input className="input" name="phone" />
          </Field>
          <Field label="Kata sandi awal" hint="Minimal 8 karakter. Sampaikan ke pengguna secara pribadi.">
            <input className="input" name="password" required minLength={8} autoComplete="new-password" />
          </Field>
          <Field label="Peran">
            <select className="input" name="role" defaultValue="STUDENT">
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {ROLE_LABEL[r]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Bidang tutor (jika peran Tutor)">
            <select className="input" name="field" defaultValue="CLINICAL">
              {MENTORING_FIELDS.map((f) => (
                <option key={f} value={f}>
                  {FIELD_LABEL[f]}
                </option>
              ))}
            </select>
          </Field>
          <div>
            <button className="btn" type="submit">
              Buat akun
            </button>
          </div>
        </form>
      </details>

      <form className="mb-4 flex flex-wrap gap-2">
        <input className="input max-w-xs" name="q" defaultValue={q} placeholder="Cari nama, email, WA" />
        <select className="input max-w-[180px]" name="role" defaultValue={role ?? ""}>
          <option value="">Semua peran</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {ROLE_LABEL[r]}
            </option>
          ))}
        </select>
        <button className="btn-secondary" type="submit">
          Filter
        </button>
      </form>

      {users.length === 0 ? (
        <Empty>Tidak ada pengguna.</Empty>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Peran</th>
                <th>Kontak</th>
                <th>Info</th>
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
                  <td>{ROLE_LABEL[u.role as Role]}</td>
                  <td>
                    {u.email}
                    <p className="text-xs text-slate-500">{u.phone}</p>
                  </td>
                  <td className="text-xs text-slate-600">
                    {u.role === "TUTOR"
                      ? `${FIELD_LABEL[u.tutorProfile?.field as MentoringField] ?? "-"} · ${u._count.mentoringsAsTutor} klien`
                      : u.role === "STUDENT"
                        ? `${u._count.entitlements} akses paket`
                        : ""}
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
