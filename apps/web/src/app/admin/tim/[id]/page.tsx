import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { FEE_BASIS, FEE_BASIS_LABEL, FIELD_LABEL, MENTORING_FIELDS, MENTORING_STATUS_LABEL, ROLE_LABEL, type Role } from "@/lib/constants";
import { ADMIN_PERMISSIONS, TUTOR_PERMISSIONS, hasPermission, parsePermissions } from "@/lib/permissions";
import { resetPasswordAction, savePermissionsAction, saveTutorProfileAction, updateUserAction } from "@/app/actions/admin";
import { Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export default async function TeamMemberPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  const me = await requireUser(["OWNER", "ADMIN"]);
  const isOwner = me.role === "OWNER";
  const canTutors = hasPermission(me, "admin.tutors");
  if (!isOwner && !canTutors) redirect("/dashboard?ditolak=1");
  const { id } = await params;
  const { pesan, tipe } = await readFlash(searchParams);

  const user = await db.user.findUnique({
    where: { id },
    include: {
      tutorProfile: { include: { trackAccess: true } },
      mentoringsAsTutor: { orderBy: { createdAt: "desc" }, include: { student: { select: { name: true } } } },
    },
  });
  if (!user) notFound();
  if (user.role === "STUDENT") redirect(`/admin/pengguna/${user.id}`);
  if (user.role === "OWNER") redirect("/admin/tim");
  if (!isOwner && user.role !== "TUTOR") redirect("/admin/tim");

  const tracks = await db.track.findMany({ orderBy: { order: "asc" } });
  const perms = new Set(parsePermissions(user.permissions));
  const list = user.role === "ADMIN" ? ADMIN_PERMISSIONS : TUTOR_PERMISSIONS;
  const access = new Set(user.tutorProfile?.trackAccess.map((a) => a.trackId));

  return (
    <>
      <PageHeader title={user.name} subtitle={`${user.email} · ${ROLE_LABEL[user.role as Role]}`} back={{ href: "/admin/tim", label: isOwner ? "Tim & hak akses" : "Data tutor" }} />
      <Flash pesan={pesan} tipe={tipe} />

      <div className="grid gap-6 xl:grid-cols-2">
        {isOwner && (
          <form action={savePermissionsAction} className="card space-y-3 xl:col-span-2">
            <input type="hidden" name="userId" value={user.id} />
            <h2 className="h2">Hak akses {user.role === "ADMIN" ? "admin" : "tutor"}</h2>
            <p className="text-sm text-slate-600">
              Centang fitur yang boleh dibuka akun ini.
              {user.role === "TUTOR" && " Tutor hanya melihat data miliknya sendiri (klien yang ditugaskan, payroll, dan fee-nya)."}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {list.map((p) => (
                <label key={p.key} className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 text-sm hover:bg-slate-50">
                  <input type="checkbox" name="permissions" value={p.key} defaultChecked={perms.has(p.key)} className="mt-1" />
                  <span>
                    <span className="font-medium text-slate-900">{p.label}</span>
                    <span className="block text-xs text-slate-500">{p.hint}</span>
                  </span>
                </label>
              ))}
            </div>
            <button className="btn" type="submit">
              Simpan hak akses
            </button>
          </form>
        )}

        {isOwner && (
          <form action={updateUserAction} className="card space-y-3">
            <input type="hidden" name="userId" value={user.id} />
            <h2 className="h2">Data akun</h2>
            <Field label="Nama">
              <input className="input" name="name" defaultValue={user.name} required />
            </Field>
            <Field label="No. WhatsApp">
              <input className="input" name="phone" defaultValue={user.phone ?? ""} />
            </Field>
            <Field label="Peran" hint="Mengganti peran mengatur ulang hak akses ke bawaan peran baru.">
              <select className="input" name="role" defaultValue={user.role}>
                <option value="ADMIN">Admin</option>
                <option value="TUTOR">Tutor</option>
              </select>
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="active" defaultChecked={user.active} /> Akun aktif (bisa login)
            </label>
            <button className="btn" type="submit">
              Simpan akun
            </button>
          </form>
        )}

        {isOwner && (
          <form action={resetPasswordAction} className="card space-y-3 self-start">
            <input type="hidden" name="userId" value={user.id} />
            <h2 className="h2">Atur ulang kata sandi</h2>
            <Field label="Kata sandi baru" hint="Minimal 8 karakter.">
              <input className="input" name="password" minLength={8} required autoComplete="new-password" />
            </Field>
            <button className="btn-secondary" type="submit">
              Ganti kata sandi
            </button>
          </form>
        )}

        {user.role === "TUTOR" && (isOwner || canTutors) && (
          <form action={saveTutorProfileAction} className="card space-y-3 xl:col-span-2">
            <input type="hidden" name="userId" value={user.id} />
            <h2 className="h2">Profil & fee tutor</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Bidang">
                <select className="input" name="field" defaultValue={user.tutorProfile?.field ?? "CLINICAL"}>
                  {MENTORING_FIELDS.map((f) => (
                    <option key={f} value={f}>
                      {FIELD_LABEL[f]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Spesialisasi / keahlian">
                <input className="input" name="specialty" defaultValue={user.tutorProfile?.specialty ?? ""} />
              </Field>
              <Field label="Jenis fee" hint="Ditampilkan ke tutor di halaman Pencapaian.">
                <select className="input" name="feeBasis" defaultValue={user.tutorProfile?.feeBasis ?? ""}>
                  <option value="">— Belum ditetapkan —</option>
                  {FEE_BASIS.map((f) => (
                    <option key={f} value={f}>
                      {FEE_BASIS_LABEL[f]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Nominal fee (Rp)" hint="Dikunci ke sesi saat admin memvalidasi.">
                <input className="input" name="rate" inputMode="numeric" defaultValue={user.tutorProfile?.rate ?? ""} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Keterangan fee untuk tutor">
                  <input className="input" name="rateNote" defaultValue={user.tutorProfile?.rateNote ?? ""} placeholder="Mis. Fee dibayar setiap akhir bulan setelah validasi" />
                </Field>
              </div>
              <Field label="Bank">
                <input className="input" name="bankName" defaultValue={user.tutorProfile?.bankName ?? ""} />
              </Field>
              <Field label="No. rekening">
                <input className="input" name="bankAccount" defaultValue={user.tutorProfile?.bankAccount ?? ""} />
              </Field>
              <Field label="Atas nama">
                <input className="input" name="bankHolder" defaultValue={user.tutorProfile?.bankHolder ?? ""} />
              </Field>
              <Field label="Catatan seleksi (interview, offering letter)">
                <input className="input" name="notes" defaultValue={user.tutorProfile?.notes ?? ""} />
              </Field>
            </div>
            <fieldset>
              <legend className="label">Akses materi</legend>
              <div className="flex flex-wrap gap-4">
                {tracks.map((t) => (
                  <label key={t.id} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="trackIds" value={t.id} defaultChecked={access.has(t.id)} /> {t.title}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="acceptingClients" defaultChecked={user.tutorProfile?.acceptingClients ?? true} /> Menerima klien baru
            </label>
            <button className="btn" type="submit">
              Simpan profil tutor
            </button>
            {user.mentoringsAsTutor.length > 0 && (
              <div className="pt-3">
                <p className="label">Klien</p>
                <ul className="text-sm">
                  {user.mentoringsAsTutor.map((m) => (
                    <li key={m.id}>
                      <Link href={`/bimbingan/${m.id}`} className="link">
                        {m.student.name}
                      </Link>{" "}
                      · {MENTORING_STATUS_LABEL[m.status]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        )}
      </div>
    </>
  );
}
