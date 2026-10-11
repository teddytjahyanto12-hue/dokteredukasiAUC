import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { resolveCode } from "@/lib/codes";
import { CatalogSection } from "@/components/catalog-section";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Katalog Kelas" };

export default async function CoursesPage({ searchParams }: { searchParams: SearchParams }) {
  const { pick } = await readFlash(searchParams);
  const q = pick("q")?.trim().slice(0, 80) || undefined;
  // Kode Blok/Bab (mis. BKV-12 atau BKV-12.1) langsung membuka halaman tujuannya.
  const target = await resolveCode(q);
  if (target) redirect(target);
  const user = await getCurrentUser();
  return (
    <div className="container-page py-10">
      <CatalogSection user={user} program={pick("program")} q={q} basePath="/kelas" as="h1" />
    </div>
  );
}
