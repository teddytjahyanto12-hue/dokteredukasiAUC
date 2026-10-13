import { NextResponse } from "next/server";
import { searchSite } from "@/lib/search";

// Saran pencarian langsung (dipanggil komponen SiteSearch saat pengguna mengetik).
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") ?? "";
  const groups = await searchSite(q, 5);
  return NextResponse.json({ q, groups }, { headers: { "Cache-Control": "no-store" } });
}
