import { resolveEmbed, PROVIDER_LABEL } from "@/lib/embed";
import { Empty } from "@/components/ui";
import { PdfViewer } from "@/components/pdf-viewer";
import { PdfPagesViewer } from "@/components/pdf-pages-viewer";
import { getPdfPages, isSrmaPdf } from "@/lib/pdf-pages";

export type ViewerItem = {
  type: string;
  title: string;
  url: string | null;
  body: string | null;
  fileId: string | null;
  file: { mimeType: string } | null;
  originalFile?: { id: string; originalName: string } | null;
};

// Menampilkan satu materi di dalam halaman: video diputar di tempat,
// slide/PDF ditampilkan dalam penampil, tanpa mengarahkan ke situs lain.
export async function MaterialViewer({ item, showOriginalDownload = false }: { item: ViewerItem; showOriginalDownload?: boolean }) {
  const blocks: React.ReactNode[] = [];

  if (item.fileId && item.file) {
    const src = `/api/berkas/${item.fileId}`;
    const pages = item.file.mimeType === "application/pdf" ? await getPdfPages(item.fileId) : null;
    if (pages) {
      blocks.push(<PdfPagesViewer key={item.fileId} fileId={item.fileId} count={pages.pages.length} title={item.title} />);
    } else if (item.file.mimeType === "application/pdf" && !showOriginalDownload && await isSrmaPdf(item.fileId)) {
      blocks.push(<Empty key="pending">Halaman materi sedang disiapkan oleh pengajar.</Empty>);
    } else {
    blocks.push(
      item.file.mimeType.startsWith("image/") ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img key="file" src={src} alt={item.title} className="w-full rounded-lg border border-slate-200" />
      ) : (
        <div key="file">
          {item.file.mimeType === "application/pdf" ? <PdfViewer src={src} title={item.title} /> : <iframe
            src={`${src}#view=FitH&toolbar=1&navpanes=0`}
            title={item.title}
            className="h-[70vh] min-h-[420px] w-full rounded-lg border border-slate-200 bg-slate-100"
          />}
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
            <a href={src} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
              Layar penuh ↗
            </a>
            {showOriginalDownload && item.originalFile && (
              <a href={`/api/berkas/${item.originalFile.id}`} className="hover:text-brand">
                Unduh PPTX asli ({item.originalFile.originalName})
              </a>
            )}
          </div>
        </div>
      ),
    );
    }
  } else if (item.url && item.type !== "LINK") {
    const embed = resolveEmbed(item.url);
    const isVideo = item.type === "VIDEO";
    if (embed.kind === "video") {
      blocks.push(
        <video key="url" src={embed.src} controls preload="metadata" className="aspect-video w-full rounded-lg bg-black" controlsList="nodownload">
          Browser ini tidak mendukung pemutar video.
        </video>,
      );
    } else if (embed.kind === "iframe") {
      blocks.push(
        <div key="url">
          <div className={isVideo ? "aspect-video w-full" : "h-[70vh] min-h-[420px] w-full"}>
            <iframe
              src={embed.src}
              title={item.title}
              className="h-full w-full rounded-lg border border-slate-200 bg-black/5"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <p className="mt-2 text-xs text-slate-400">Sumber: {PROVIDER_LABEL[embed.provider]}</p>
        </div>,
      );
    } else {
      blocks.push(
        <Empty key="url">
          Tautan ini tidak bisa ditampilkan di dalam website.{" "}
          <a href={embed.src} target="_blank" rel="noopener noreferrer" className="link">
            Buka sumber ↗
          </a>
        </Empty>,
      );
    }
  }

  if (item.body) {
    blocks.push(
      <div key="body" className="whitespace-pre-line leading-relaxed text-slate-700">
        {item.body}
      </div>,
    );
  }

  if (blocks.length === 0) return <Empty>Konten materi ini belum diisi.</Empty>;
  return <div className="space-y-4">{blocks}</div>;
}
