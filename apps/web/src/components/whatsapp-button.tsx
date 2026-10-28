import { getSettings, whatsappLink } from "@/lib/settings";
import { db } from "@/lib/db";
import { TestimonialCarousel } from "@/components/testimonial-carousel";

// Tombol mengambang WhatsApp (konsultasi dengan admin) di kanan bawah semua halaman, dengan kartu testimoni di atasnya.
// Nomor, kalimat pembuka, dan teks tombol diatur di Admin → Pengaturan situs; testimoni di Admin → Penawaran & testimoni.
export async function WhatsAppButton() {
  const [s, testimonials] = await Promise.all([
    getSettings(),
    db.testimonial.findMany({ where: { published: true }, orderBy: { order: "asc" }, take: 12, select: { id: true, name: true, role: true, quote: true } }),
  ]);
  const href = whatsappLink(s.adminWhatsapp, s.adminWhatsappMessage || undefined);
  if (!href && testimonials.length === 0) return null;
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 print:hidden sm:bottom-5 sm:right-5">
      {testimonials.length > 0 && <TestimonialCarousel items={testimonials} />}
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 rounded-full bg-[#25D366] py-2 pl-2 pr-4 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-[#1ebe5b]"
          aria-label={`${s.adminWhatsappLabel || "Konsultasi dengan admin"} lewat WhatsApp`}
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-white/20">
            <svg viewBox="0 0 32 32" className="h-6 w-6 fill-current" aria-hidden>
        <path d="M16.004 3C9.38 3 4 8.38 4 15.004c0 2.117.553 4.183 1.604 6.004L4 29l8.2-1.57a11.94 11.94 0 0 0 3.804.62h.004C22.624 28.05 28 22.67 28 16.046 28 9.42 22.628 3 16.004 3Zm0 22.86h-.003a9.86 9.86 0 0 1-5.03-1.378l-.36-.214-4.867.932.95-4.74-.235-.375a9.83 9.83 0 0 1-1.513-5.24c0-5.44 4.43-9.87 9.873-9.87 5.44 0 9.866 4.43 9.866 9.87 0 5.443-4.428 9.016-9.68 9.016Zm5.41-7.39c-.296-.148-1.754-.866-2.026-.965-.272-.1-.47-.148-.667.148-.198.297-.766.966-.94 1.164-.173.198-.346.223-.643.075-.296-.149-1.252-.462-2.385-1.472-.882-.786-1.477-1.757-1.65-2.054-.173-.297-.018-.457.13-.605.134-.133.297-.347.445-.52.149-.174.198-.298.297-.496.1-.198.05-.372-.024-.52-.075-.149-.667-1.61-.915-2.204-.24-.578-.485-.5-.667-.51l-.568-.01a1.09 1.09 0 0 0-.79.371c-.272.298-1.038 1.016-1.038 2.476 0 1.46 1.063 2.873 1.211 3.071.149.198 2.092 3.195 5.07 4.48.708.306 1.261.488 1.692.625.711.226 1.358.194 1.87.118.57-.085 1.754-.717 2.002-1.41.247-.693.247-1.287.173-1.41-.074-.124-.272-.198-.568-.347Z" />
      </svg>
            <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">1</span>
            <span className="absolute -right-1 -top-1 h-4 w-4 animate-ping rounded-full bg-red-500/60" aria-hidden />
          </span>
          <span className="hidden sm:inline">{s.adminWhatsappLabel || "Konsultasi dengan Admin"}</span>
          <span className="sm:hidden">Konsultasi</span>
        </a>
      )}
    </div>
  );
}
