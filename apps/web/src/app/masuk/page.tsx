import Link from "next/link";
import { redirect } from "next/navigation";
import { loginAction } from "@/app/actions/auth";
import { Field, Flash } from "@/components/ui";
import { getCurrentUser, homeFor } from "@/lib/auth";
import { readFlash, safeNext, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Masuk" };

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const { pesan, tipe, pick } = await readFlash(searchParams);
  const next = safeNext(pick("next"));
  const user = await getCurrentUser();
  if (user) redirect(next ?? homeFor(user));

  return (
    <div className="container-page grid min-h-[70vh] place-items-center py-10">
      <div className="card w-full max-w-md">
        <h1 className="h1 mb-1">Masuk</h1>
        <p className="muted mb-6">Masuk untuk mengakses materi, bimbingan, atau panel akun.</p>
        <Flash pesan={pesan} tipe={tipe} />
        <form action={loginAction} className="space-y-4">
          {next && <input type="hidden" name="next" value={next} />}
          <Field label="Email">
            <input className="input" type="email" name="email" required autoComplete="email" />
          </Field>
          <Field label="Kata sandi">
            <input className="input" type="password" name="password" required autoComplete="current-password" />
          </Field>
          <button className="btn w-full" type="submit">
            Masuk
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          Belum punya akun?{" "}
          <Link href={next ? `/daftar?next=${encodeURIComponent(next)}` : "/daftar"} className="link">
            Daftar
          </Link>
        </p>
        <p className="mt-2 text-center text-xs text-slate-500">Lupa kata sandi? Hubungi admin melalui WhatsApp.</p>
      </div>
    </div>
  );
}
