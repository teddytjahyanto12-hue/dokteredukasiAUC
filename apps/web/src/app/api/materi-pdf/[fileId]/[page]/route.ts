import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { canAccessFile } from "@/lib/access";
import { getPdfPages } from "@/lib/pdf-pages";
import { readStoredFile } from "@/lib/storage";

export async function GET(_request: Request, { params }: { params: Promise<{ fileId: string; page: string }> }) {
  const { fileId, page } = await params;
  const user = await getCurrentUser();
  if (!user) return new NextResponse("Silakan masuk.", { status: 401 });
  if (!(await canAccessFile(user, fileId))) return new NextResponse("Materi belum dapat diakses.", { status: 403 });
  if (!/^[1-9]\d{0,2}$/.test(page)) return new NextResponse("Halaman tidak ditemukan.", { status: 404 });
  const data = await getPdfPages(fileId);
  const storagePath = data?.pages[Number(page) - 1];
  if (!storagePath) return new NextResponse("Halaman tidak ditemukan.", { status: 404 });
  try {
    const bytes = await readStoredFile(storagePath);
    return new NextResponse(new Uint8Array(bytes), { headers: { "Content-Type": "image/png", "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
  } catch { return new NextResponse("Halaman belum tersedia.", { status: 404 }); }
}
