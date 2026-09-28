// Mengubah tautan video/slide/dokumen menjadi sumber yang bisa diputar langsung
// di dalam website (tanpa pindah halaman).

export type Embed =
  | { kind: "iframe"; src: string; provider: Provider }
  | { kind: "video"; src: string; provider: "file" }
  | { kind: "link"; src: string; provider: "unknown" };

export type Provider = "youtube" | "gdrive" | "gslides" | "vimeo" | "bunny" | "onedrive" | "pdf";

export const PROVIDER_LABEL: Record<Provider | "file" | "unknown", string> = {
  youtube: "YouTube",
  gdrive: "Google Drive",
  gslides: "Google Slides",
  vimeo: "Vimeo",
  bunny: "Bunny Stream",
  onedrive: "OneDrive / PowerPoint Online",
  pdf: "PDF",
  file: "File video langsung",
  unknown: "Tidak dikenali",
};

function youtubeId(u: URL) {
  const host = u.hostname.replace(/^www\.|^m\./, "");
  if (host === "youtu.be") return u.pathname.slice(1).split("/")[0];
  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    if (u.pathname === "/watch") return u.searchParams.get("v");
    const m = u.pathname.match(/^\/(embed|shorts|live|v)\/([\w-]{6,})/);
    if (m) return m[2];
  }
  return null;
}

function youtubeStart(u: URL) {
  const t = u.searchParams.get("t") ?? u.searchParams.get("start");
  if (!t) return 0;
  if (/^\d+$/.test(t)) return Number(t);
  const m = t.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
  return m ? Number(m[1] ?? 0) * 3600 + Number(m[2] ?? 0) * 60 + Number(m[3] ?? 0) : 0;
}

function driveId(u: URL) {
  const m = u.pathname.match(/\/file\/d\/([\w-]{10,})/);
  if (m) return m[1];
  if (u.pathname === "/open" || u.pathname === "/uc") return u.searchParams.get("id");
  return null;
}

export function resolveEmbed(raw: string): Embed {
  let u: URL;
  try {
    u = new URL(raw.trim());
  } catch {
    return { kind: "link", src: raw, provider: "unknown" };
  }
  const host = u.hostname.replace(/^www\./, "");

  const yt = youtubeId(u);
  if (yt) {
    const start = youtubeStart(u);
    // youtube-nocookie: tanpa cookie pelacak; rel=0: video saran dari channel yang sama saja.
    return {
      kind: "iframe",
      provider: "youtube",
      src: `https://www.youtube-nocookie.com/embed/${yt}?rel=0&modestbranding=1${start ? `&start=${start}` : ""}`,
    };
  }

  if (host === "docs.google.com") {
    const slides = u.pathname.match(/\/presentation\/d\/(e\/)?([\w-]{10,})/);
    if (slides) {
      const id = slides[1] ? `e/${slides[2]}` : slides[2];
      return { kind: "iframe", provider: "gslides", src: `https://docs.google.com/presentation/d/${id}/embed?start=false&loop=false` };
    }
    const doc = u.pathname.match(/\/(document|spreadsheets)\/d\/([\w-]{10,})/);
    if (doc) return { kind: "iframe", provider: "gdrive", src: `https://docs.google.com/${doc[1]}/d/${doc[2]}/preview` };
  }

  if (host === "drive.google.com") {
    const id = driveId(u);
    // Pratinjau Drive bisa memutar video serta menampilkan PDF & PPTX.
    if (id) return { kind: "iframe", provider: "gdrive", src: `https://drive.google.com/file/d/${id}/preview` };
  }

  if (host === "vimeo.com") {
    const m = u.pathname.match(/^\/(\d+)(?:\/([\w]+))?/);
    if (m) return { kind: "iframe", provider: "vimeo", src: `https://player.vimeo.com/video/${m[1]}${m[2] ? `?h=${m[2]}` : ""}` };
  }
  if (host === "player.vimeo.com") return { kind: "iframe", provider: "vimeo", src: u.toString() };

  if (host === "iframe.mediadelivery.net" || host.endsWith(".b-cdn.net") || host === "player.mediadelivery.net") {
    return { kind: "iframe", provider: "bunny", src: u.toString().replace("/play/", "/embed/") };
  }

  if (host.endsWith("onedrive.live.com") || host === "1drv.ms" || host.endsWith("sharepoint.com") || host === "view.officeapps.live.com") {
    return { kind: "iframe", provider: "onedrive", src: u.toString() };
  }

  if (/\.(mp4|webm|m4v|mov)$/i.test(u.pathname)) return { kind: "video", provider: "file", src: u.toString() };
  if (/\.pdf$/i.test(u.pathname)) return { kind: "iframe", provider: "pdf", src: u.toString() };

  return { kind: "link", src: u.toString(), provider: "unknown" };
}

export function isVideoEmbeddable(url: string) {
  const e = resolveEmbed(url);
  return e.kind === "video" || (e.kind === "iframe" && ["youtube", "gdrive", "vimeo", "bunny"].includes(e.provider));
}

export function isSlideEmbeddable(url: string) {
  const e = resolveEmbed(url);
  return e.kind === "iframe" && ["gslides", "gdrive", "onedrive", "pdf"].includes(e.provider);
}
