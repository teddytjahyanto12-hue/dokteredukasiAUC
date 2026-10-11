import Link from "next/link";
import { redirect } from "next/navigation";
import { registerAction } from "@/app/actions/auth";
import { Field, Flash } from "@/components/ui";
import { getCurrentUser, homeFor } from "@/lib/auth";
import { readFlash, safeNext, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Daftar" };

export default async function RegisterPage({ searchParams }: { searchParams: SearchParams }) {
  const { pesan, tipe, pick } = await readFlash(searchParams);
  const next = safeNext(pick("next"));
  const user = await getCurrentUser();
  if (user) redirect(next ?? homeFor(user));

  return (
    <div className="container-page grid min-h-[70vh] place-items-center py-10">
      <div className="card w-full max-w-md">
        <h1 className="h1 mb-1">Daftar akun murid</h1>
        <p className="muted mb-6">Buat akun untuk memilih paket dan mulai belajar.</p>
        <Flash pesan={pesan} tipe={tipe} />
        <form action={registerAction} className="space-y-4">
          {next && <input type="hidden" name="next" value={next} />}
          <Field label="Nama lengkap">
            <input className="input" name="name" required autoComplete="name" />
          </Field>
          <Field label="Nomor WhatsApp" hint="Dipakai admin untuk konfirmasi pembayaran dan jadwal bimbingan.">
            <input className="input" name="phone" required inputMode="tel" autoComplete="tel" placeholder="0812…" />
          </Field>
          <Field label="Instansi / universitas">
            <input className="input" name="institution" required autoComplete="organization" />
          </Field>
          <Field label="Email">
            <input className="input" type="email" name="email" required autoComplete="email" />
          </Field>
          <Field label="Kata sandi" hint="Minimal 6 karakter.">
            <input className="input" type="password" name="password" required minLength={6} autoComplete="new-password" />
          </Field>
          <Field label="Ulangi kata sandi">
            <input className="input" type="password" name="confirm" required minLength={6} autoComplete="new-password" />
          </Field>
          <button className="btn w-full" type="submit">
            Daftar
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          Sudah punya akun?{" "}
          <Link href={next ? `/masuk?next=${encodeURIComponent(next)}` : "/masuk"} className="link">
            Masuk
          </Link>
        </p>
        <p className="mt-2 text-center text-xs text-slate-500">
          Ingin menjadi tutor? Lihat <Link href="/gabung-tutor" className="link">alur seleksi tutor</Link>.
        </p>
      </div>
    </div>
  );
}
