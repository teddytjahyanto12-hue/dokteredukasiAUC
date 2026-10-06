import { NextResponse } from "next/server";
import { runReportSchedule } from "@/lib/report-email";

// Pemicu cadangan untuk hosting yang tidak menjalankan server terus-menerus (serverless):
// panggil GET /api/cron/laporan dengan header "Authorization: Bearer <CRON_SECRET>".
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return new NextResponse("Tidak diizinkan.", { status: 403 });
  return NextResponse.json({ hasil: await runReportSchedule() });
}
