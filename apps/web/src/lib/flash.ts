import { redirect } from "next/navigation";

// Redirect dengan pesan singkat yang ditampilkan komponen <Flash>.
export function back(path: string, pesan: string, tipe: "ok" | "error" = "ok"): never {
  const sep = path.includes("?") ? "&" : "?";
  redirect(`${path}${sep}pesan=${encodeURIComponent(pesan)}${tipe === "error" ? "&tipe=error" : ""}`);
}

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function readFlash(searchParams: SearchParams) {
  const sp = await searchParams;
  const pick = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);
  return { pesan: pick("pesan"), tipe: pick("tipe"), sp, pick };
}

export function str(form: FormData, key: string) {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export function optStr(form: FormData, key: string) {
  const v = str(form, key);
  return v === "" ? null : v;
}

export function optInt(form: FormData, key: string) {
  const v = str(form, key).replace(/[^\d-]/g, "");
  if (v === "") return null;
  const n = Number.parseInt(v, 10);
  return Number.isNaN(n) ? null : n;
}

export function bool(form: FormData, key: string) {
  return form.get(key) === "on" || form.get(key) === "true";
}

export function safeNext(next: string | null | undefined) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : null;
}
