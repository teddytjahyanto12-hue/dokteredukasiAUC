import { NextResponse, type NextRequest } from "next/server";

// Penyaring awal: halaman terlindungi butuh cookie sesi. Pemeriksaan sebenarnya
// (tanda tangan sesi, peran, hak akses) dilakukan di server pada tiap halaman/aksi.
const PROTECTED = ["/belajar", "/materi", "/quiz", "/pembelian", "/bimbingan", "/notifikasi", "/akun", "/tutor-panel", "/admin", "/dashboard", "/checkout"];

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  if (PROTECTED.some((p) => pathname === p || pathname.startsWith(`${p}/`)) && !req.cookies.has("de_session")) {
    const url = req.nextUrl.clone();
    url.pathname = "/masuk";
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next|api|favicon.ico).*)"] };
