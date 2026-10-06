import { getCurrentUser } from "@/lib/auth";
import { CatalogSection } from "@/components/catalog-section";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Katalog Kelas" };

export default async function CoursesPage({ searchParams }: { searchParams: SearchParams }) {
  const { pick } = await readFlash(searchParams);
  const user = await getCurrentUser();
  return (
    <div className="container-page py-10">
      <CatalogSection user={user} program={pick("program")} q={pick("q")?.trim().slice(0, 80) || undefined} basePath="/kelas" as="h1" />
    </div>
  );
}
