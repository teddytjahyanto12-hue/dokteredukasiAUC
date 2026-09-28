import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { canAccessFile } from "@/lib/access";
import { readStoredFile } from "@/lib/storage";

// Menyajikan berkas unggahan hanya kepada pengguna yang berhak.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) return new NextResponse("Silakan masuk terlebih dahulu.", { status: 401 });
  if (!(await canAccessFile(user, id))) return new NextResponse("Anda tidak memiliki akses ke berkas ini.", { status: 403 });

  const file = await db.fileAsset.findUnique({ where: { id } });
  if (!file) return new NextResponse("Berkas tidak ditemukan.", { status: 404 });
  try {
    const data = await readStoredFile(file.storagePath);
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": file.mimeType,
        "Content-Disposition": `inline; filename*=UTF-8''${encodeURIComponent(file.originalName)}`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new NextResponse("Berkas tidak ditemukan di penyimpanan.", { status: 404 });
  }
}
