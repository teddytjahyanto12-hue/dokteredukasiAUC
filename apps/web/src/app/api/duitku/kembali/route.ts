import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { syncOrderPayments } from "@/lib/duitku";
import { appUrl } from "@/lib/email";

// Customer kembali dari halaman bayar Duitku. Parameter URL tidak dipercaya:
// status ditanyakan langsung ke Duitku, lalu customer diarahkan ke halaman pesanannya.
export async function GET(req: Request) {
  const orderId = new URL(req.url).searchParams.get("order") ?? "";
  const user = await getCurrentUser();
  if (!user) return NextResponse.redirect(appUrl("/masuk"));
  const order = await db.order.findFirst({ where: { id: orderId, userId: user.id }, select: { id: true } });
  if (!order) return NextResponse.redirect(appUrl("/pembelian"));
  await syncOrderPayments(order.id);
  return NextResponse.redirect(appUrl(`/pembelian/${order.id}?bayar=cek`));
}
