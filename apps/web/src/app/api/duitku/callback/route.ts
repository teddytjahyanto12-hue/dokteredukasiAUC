import { NextResponse } from "next/server";
import { handleDuitkuCallback } from "@/lib/duitku";

// Callback pembayaran dari server Duitku. Keabsahan diperiksa lewat tanda tangan di handleDuitkuCallback.
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  if (!form) return new NextResponse("Bad request", { status: 400 });
  const params: Record<string, string> = {};
  for (const [k, v] of form.entries()) if (typeof v === "string") params[k] = v;
  const r = await handleDuitkuCallback(params);
  return new NextResponse(r.message, { status: r.status });
}
