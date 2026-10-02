import { redirect } from "next/navigation";

// Halaman lama; isinya kini dibagi ke Pencapaian dan Payroll.
export default function OldIncomePage() {
  redirect("/tutor-panel/pencapaian");
}
