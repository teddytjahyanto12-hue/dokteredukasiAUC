import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { tanggal } from "@/lib/format";
import { FIELD_LABEL, MENTORING_FIELDS, ROLE_LABEL, type MentoringField, type Role } from "@/lib/constants";
import { ADMIN_PERMISSIONS, TUTOR_PERMISSIONS, hasPermission, parsePermissions } from "@/lib/permissions";
import { createUserAction } from "@/app/actions/admin";
import { Empty, Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Tim & hak akses" };

export default async function TeamPage({ searchParams }: { searchParams: SearchParams }) {
  const me = await requireUser(["OWNER", "ADMIN"]);
  const isOwner = me.role === "OWNER";
  if (!isOwner && !hasPermission(me, "admin.tutors")) redirect("/dashboard?ditolak=1");
  const { pesan, tipe } = await readFlash(searchParams);

  const members = await db.user.findMany({
    where: { role: { in: isOwner ? ["OWNER", "ADMIN", "TUTOR"] : ["TUTOR"] } },
    orderBy: [{ role: "asc" }, { name: "asc" }],
    include: { tutorProfile: { select: { field: true } }, _count: { select: { mentoringsAsTutor: true } } },
  });
  const labelOf = new Map<string, string>([...ADMIN_PERMISSIONS, ...TUTOR_PERMISSIONS].map((p) => [p.key, p.label]));

  return (
    <>
      <PageHeader
        title={isOwner ? "Tim & hak akses" : "Data tutor"}
        subtitle={isOwner ? "Owner membuat akun admin dan tutor, lalu mencentang fitur yang boleh mereka akses." : "Ubah profil, rate, jenis fee, dan akses materi tutor."}
      />
      <Flash pesan={pesan} tipe={tipe} />

      {isOwner && (
        <details className="card mb-6" open={members.length <= 1}>
          <summary className="cursor-pointer font-semibold text-brand">+ Buat akun admin atau tutor</summary>
          <form action={createUserAction} className="mt-4 grid gap-3 sm:grid-cols-2">
            <input type="hidden" name="back" value="/admin/tim" />
            <Field label="Peran">
              <select className="input" name="role" defaultValue="TUTOR">
                <option value="ADMIN">Admin</option>
                <option value="TUTOR">Tutor</option>
              </select>
            </Field>
            <Field label="Bidang (khusus tutor)">
              <select className="input" name="field" defaultValue="CLINICAL">
                {MENTORING_FIELDS.map((f) => (
                  <option key={f} value={f}>
                    {FIELD_LABEL[f]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Nama">
              <input className="input" name="name" required />
            </Field>
            <Field label="Email (untuk login)">
              <input className="input" type="email" name="email" required />
            </Field>
            <Field label="No. WhatsApp">
              <input className="input" name="phone" />
            </Field>
            <Field label="Kata sandi awal" hint="Minimal 8 karakter. Sampaikan secara pribadi; pengguna bisa menggantinya di menu Akun.">
              <input className="input" name="password" required minLength={8} autoComplete="new-password" />
            </Field>
            <p className="text-xs text-slate-500 sm:col-span-2">
              Akses awal: admin hanya Ringkasan; tutor mendapat Dashboard klien, Payroll, dan Pencapaian. Ubah centangnya setelah akun dibuat.
            </p>
            <div>
              <button className="btn" type="submit">
                Buat akun
              </button>
            </div>
          </form>
        </details>
      )}

      {members.length === 0 ? (
        <Empty>Belum ada akun.</Empty>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Peran</th>
                <th>Hak akses</th>
                <th>Info</th>
                <th>Dibuat</th>
              </tr>
            </thead>
            <tbody>
              {members.map((u) => {
                const perms = parsePermissions(u.permissions);
                return (
                  <tr key={u.id} className={u.active ? "" : "opacity-50"}>
                    <td>
                      {u.role === "OWNER" ? (
                        <span className="font-medium">{u.name}</span>
                      ) : (
                        <Link href={`/admin/tim/${u.id}`} className="link">
                          {u.name}
                        </Link>
                      )}
                      <p className="text-xs text-slate-500">{u.email}</p>
                      {!u.active && <span className="badge">Nonaktif</span>}
                    </td>
                    <td>{ROLE_LABEL[u.role as Role]}</td>
                    <td className="max-w-md text-xs text-slate-600">
                      {u.role === "OWNER" ? "Semua akses" : perms.length ? perms.map((k) => labelOf.get(k) ?? k).join(", ") : <span className="text-amber-700">Belum ada</span>}
                    </td>
                    <td className="text-xs text-slate-600">
                      {u.role === "TUTOR" ? `${FIELD_LABEL[u.tutorProfile?.field as MentoringField] ?? "-"} · ${u._count.mentoringsAsTutor} klien` : ""}
                    </td>
                    <td>{tanggal(u.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
