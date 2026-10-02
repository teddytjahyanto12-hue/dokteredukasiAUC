import { redirect } from "next/navigation";
import { homeFor, requireUser } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";

// Daftar bimbingan murid ada di /belajar, tutor di /tutor-panel, owner/admin di /admin/bimbingan.
export default async function MentoringIndex() {
  const user = await requireUser();
  redirect(hasPermission(user, "admin.mentoring") ? "/admin/bimbingan" : homeFor(user));
}
