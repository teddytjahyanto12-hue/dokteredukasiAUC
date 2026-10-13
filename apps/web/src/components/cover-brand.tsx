import Image from "next/image";

// Aset merek dekoratif, tidak mengubah teks atau perilaku kartu.
export function CoverBrand() {
  return <span className="cover-brand" aria-hidden="true"><span className="brand-emblem"><Image src="/brand/identity.png" alt="" width={1536} height={1024} unoptimized /></span></span>;
}
