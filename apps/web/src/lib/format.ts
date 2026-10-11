export function rupiah(value: number | null | undefined) {
  if (value === null || value === undefined) return "Harga segera diumumkan";
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

export function tanggal(value: Date | null | undefined, withTime = false) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    ...(withTime ? { timeStyle: "short" } : {}),
    timeZone: "Asia/Jakarta",
  }).format(value);
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

// Nilai <input type="datetime-local"> diinterpretasikan sebagai WIB (UTC+7).
export function parseWibDateTime(value: string) {
  if (!value) return null;
  const d = new Date(`${value}:00+07:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function toWibInput(value: Date) {
  const wib = new Date(value.getTime() + 7 * 60 * 60 * 1000);
  return wib.toISOString().slice(0, 16);
}
