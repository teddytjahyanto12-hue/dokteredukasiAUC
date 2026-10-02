import { getCurrentUser } from "@/lib/auth";
import { getSettings, whatsappLink } from "@/lib/settings";

// Tombol mengambang "Chat Admin" ke WhatsApp. Nomor diatur di Admin → Pengaturan situs.
// Tidak tampil untuk owner/admin (mereka adalah admin itu sendiri) atau bila nomor belum diisi.
export async function WhatsAppButton() {
  const [s, user] = await Promise.all([getSettings(), getCurrentUser()]);
  if (user && (user.role === "OWNER" || user.role === "ADMIN")) return null;
  const text = user ? `Halo admin ${s.siteName}, saya ${user.name} (${user.email}). Saya ingin bertanya…` : `Halo admin ${s.siteName}, saya ingin bertanya tentang layanan…`;
  const href = whatsappLink(s.adminWhatsapp, text);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-[#1ebe5b]"
      aria-label="Chat admin lewat WhatsApp"
    >
      <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current" aria-hidden>
        <path d="M16.004 3C9.38 3 4 8.38 4 15.004c0 2.117.553 4.183 1.604 6.004L4 29l8.2-1.57a11.94 11.94 0 0 0 3.804.62h.004C22.624 28.05 28 22.67 28 16.046 28 9.42 22.628 3 16.004 3Zm0 22.86h-.003a9.86 9.86 0 0 1-5.03-1.378l-.36-.214-4.867.932.95-4.74-.235-.375a9.83 9.83 0 0 1-1.513-5.24c0-5.44 4.43-9.87 9.873-9.87 5.44 0 9.866 4.43 9.866 9.87 0 5.443-4.428 9.016-9.68 9.016Zm5.41-7.39c-.296-.148-1.754-.866-2.026-.965-.272-.1-.47-.148-.667.148-.198.297-.766.966-.94 1.164-.173.198-.346.223-.643.075-.296-.149-1.252-.462-2.385-1.472-.882-.786-1.477-1.757-1.65-2.054-.173-.297-.018-.457.13-.605.134-.133.297-.347.445-.52.149-.174.198-.298.297-.496.1-.198.05-.372-.024-.52-.075-.149-.667-1.61-.915-2.204-.24-.578-.485-.5-.667-.51l-.568-.01a1.09 1.09 0 0 0-.79.371c-.272.298-1.038 1.016-1.038 2.476 0 1.46 1.063 2.873 1.211 3.071.149.198 2.092 3.195 5.07 4.48.708.306 1.261.488 1.692.625.711.226 1.358.194 1.87.118.57-.085 1.754-.717 2.002-1.41.247-.693.247-1.287.173-1.41-.074-.124-.272-.198-.568-.347Z" />
      </svg>
      Chat Admin
    </a>
  );
}
