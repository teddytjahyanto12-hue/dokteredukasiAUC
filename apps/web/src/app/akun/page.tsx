import { requireUser } from "@/lib/auth";
import { changePasswordAction, updateProfileAction } from "@/app/actions/auth";
import { Field, Flash, PageHeader } from "@/components/ui";
import { PasswordInput } from "@/components/password-input";
import { readFlash, type SearchParams } from "@/lib/flash";
import { ROLE_LABEL } from "@/lib/constants";

export const metadata = { title: "Akun" };

export default async function AccountPage({ searchParams }: { searchParams: SearchParams }) {
  const user = await requireUser();
  const { pesan, tipe } = await readFlash(searchParams);
  return (
    <div className="container-page max-w-2xl py-10">
      <PageHeader title="Akun saya" subtitle={`${user.email} · ${ROLE_LABEL[user.role]}`} />
      <Flash pesan={pesan} tipe={tipe} />
      <form action={updateProfileAction} className="card space-y-4">
        <h2 className="h2">Profil</h2>
        <Field label="Nama lengkap">
          <input className="input" name="name" defaultValue={user.name} required />
        </Field>
        <Field label="Nomor WhatsApp">
          <input className="input" name="phone" defaultValue={user.phone ?? ""} />
        </Field>
        <Field label="Instansi / universitas">
          <input className="input" name="institution" defaultValue={user.institution ?? ""} />
        </Field>
        <button className="btn" type="submit">
          Simpan profil
        </button>
      </form>
      <form action={changePasswordAction} className="card mt-6 space-y-4">
        <h2 className="h2">Ganti kata sandi</h2>
        <Field label="Kata sandi saat ini">
          <PasswordInput className="input" name="current" required autoComplete="current-password" />
        </Field>
        <Field label="Kata sandi baru">
          <PasswordInput className="input" name="password" required minLength={6} autoComplete="new-password" />
        </Field>
        <Field label="Ulangi kata sandi baru">
          <PasswordInput className="input" name="confirm" required minLength={6} autoComplete="new-password" />
        </Field>
        <button className="btn" type="submit">
          Ganti kata sandi
        </button>
      </form>
    </div>
  );
}
