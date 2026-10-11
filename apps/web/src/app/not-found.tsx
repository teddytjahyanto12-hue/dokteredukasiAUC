import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[60vh] place-items-center py-10 text-center">
      <div>
        <p className="text-5xl font-bold text-brand">404</p>
        <h1 className="h1 mt-2">Halaman tidak ditemukan</h1>
        <p className="mt-2 text-slate-600">Halaman mungkin sudah dipindahkan atau tidak ada akses ke halaman ini.</p>
        <Link href="/" className="btn mt-6">
          Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}
