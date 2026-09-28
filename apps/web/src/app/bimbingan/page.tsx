import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";

// Daftar bimbingan murid ada di /belajar, tutor di /tutor-panel, admin di /admin/bimbingan.
export default async function MentoringIndex() {
  const user = await requireUser();
  redirect(user.role === "ADMIN" ? "/admin/bimbingan" : user.role === "TUTOR" ? "/tutor-panel" : "/belajar");
}
