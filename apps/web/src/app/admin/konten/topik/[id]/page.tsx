import { requirePermission } from "@/lib/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ITEM_TYPE_LABEL, type ItemType } from "@/lib/constants";
import { findSoffice } from "@/lib/convert";
import { MaterialViewer } from "@/components/material-viewer";
import {
  deleteItemAction,
  deleteQuestionAction,
  deleteQuizAction,
  deleteTopicAction,
  saveItemAction,
  saveQuestionAction,
  saveQuizAction,
  saveTopicAction,
} from "@/app/actions/admin-content";
import { ConfirmButton } from "@/components/confirm-button";
import { Empty, Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

type ItemRow = {
  id: string;
  type: string;
  title: string;
  description: string | null;
  url: string | null;
  body: string | null;
  sourceNote: string | null;
  isFree: boolean;
  published: boolean;
  order: number;
  fileId: string | null;
  file: { id: string; originalName: string; mimeType: string } | null;
  originalFile: { id: string; originalName: string } | null;
};

export default async function AdminTopic({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  await requirePermission("admin.content");
  const { id } = await params;
  const { pesan, tipe } = await readFlash(searchParams);
  const topic = await db.topic.findUnique({
    where: { id },
    include: {
      category: { include: { track: true } },
      items: {
        orderBy: { order: "asc" },
        include: {
          file: { select: { id: true, originalName: true, mimeType: true } },
          originalFile: { select: { id: true, originalName: true } },
        },
      },
      quiz: { include: { questions: { orderBy: { order: "asc" }, include: { options: { orderBy: { order: "asc" } } } } } },
    },
  });
  if (!topic) notFound();
  const soffice = !!findSoffice();

  return (
    <>
      <PageHeader
        title={topic.title}
        subtitle={`${topic.category.track.title} / ${topic.category.title}`}
        back={{ href: `/admin/konten/kategori/${topic.categoryId}`, label: topic.category.title }}
        actions={
          <Link href={`/materi/${topic.id}`} className="btn-secondary btn-sm" target="_blank">
            Lihat sebagai murid ↗
          </Link>
        }
      />
      <Flash pesan={pesan} tipe={tipe} />

      <section className="card mb-6">
        <h2 className="h2 mb-3">Materi ({topic.items.length})</h2>
        {topic.items.length === 0 ? (
          <Empty>Belum ada materi. Tambahkan di bawah.</Empty>
        ) : (
          <ul className="space-y-3">
            {topic.items.map((item) => (
              <li key={item.id} className="rounded-lg border border-slate-200">
                <details>
                  <summary className="flex cursor-pointer flex-wrap items-center gap-2 px-4 py-3">
                    <span className="font-medium">
                      {item.order}. {item.title}
                    </span>
                    <span className="badge">{ITEM_TYPE_LABEL[item.type as ItemType]}</span>
                    {item.isFree && <span className="badge-brand">Gratis</span>}
                    {!item.published && <span className="badge">Disembunyikan</span>}
                  </summary>
                  <div className="grid gap-6 border-t border-slate-100 p-4 xl:grid-cols-2">
                    <div>
                      <p className="label">Pratinjau (tampilan murid)</p>
                      <MaterialViewer item={item} showOriginalDownload />
                    </div>
                    <div>
                      <ItemForm topicId={topic.id} type={item.type as ItemType} item={item} soffice={soffice} />
                      <form action={deleteItemAction} className="mt-3">
                        <input type="hidden" name="id" value={item.id} />
                        <ConfirmButton message="Hapus materi ini?" className="btn-danger btn-sm">
                          Hapus materi
                        </ConfirmButton>
                      </form>
                    </div>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        )}

        <p className="label mt-6">Tambah materi ke topik ini</p>
        <div className="space-y-2">
          {ADD_TYPES.map((t) => (
            <details key={t.type} className="rounded-lg border border-dashed border-brand/50">
              <summary className="cursor-pointer px-4 py-2 font-semibold text-brand">
                + {t.label} <span className="text-xs font-normal text-slate-500">— {t.hint}</span>
              </summary>
              <div className="border-t border-dashed border-brand/30 p-4">
                <ItemForm topicId={topic.id} type={t.type} nextOrder={topic.items.length} soffice={soffice} />
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="card mb-6">
        <h2 className="h2 mb-3">Quiz topik</h2>
        <form action={saveQuizAction} className="grid gap-3 sm:grid-cols-[1fr_140px_auto_auto] sm:items-end">
          <input type="hidden" name="topicId" value={topic.id} />
          <Field label="Judul quiz">
            <input className="input" name="title" defaultValue={topic.quiz?.title ?? `Quiz ${topic.title}`} />
          </Field>
          <Field label="Nilai lulus">
            <input className="input" name="passingScore" inputMode="numeric" defaultValue={topic.quiz?.passingScore ?? 70} />
          </Field>
          {topic.quiz && (
            <label className="flex items-center gap-2 pb-2 text-sm">
              <input type="checkbox" name="published" defaultChecked={topic.quiz.published} /> Tampilkan
            </label>
          )}
          <button className="btn" type="submit">
            {topic.quiz ? "Simpan quiz" : "Buat quiz"}
          </button>
        </form>

        {topic.quiz && (
          <>
            <ol className="mt-6 space-y-3">
              {topic.quiz.questions.map((q, i) => (
                <li key={q.id} className="rounded-lg border border-slate-200">
                  <details>
                    <summary className="cursor-pointer px-4 py-3 text-sm">
                      <span className="font-medium">
                        {i + 1}. {q.text}
                      </span>
                      <span className="ml-2 text-xs text-slate-500">({q.options.length} pilihan)</span>
                    </summary>
                    <div className="border-t border-slate-100 p-4">
                      <QuestionForm topicId={topic.id} question={q} />
                      <form action={deleteQuestionAction} className="mt-3">
                        <input type="hidden" name="topicId" value={topic.id} />
                        <input type="hidden" name="questionId" value={q.id} />
                        <ConfirmButton message="Hapus soal ini?" className="btn-danger btn-sm">
                          Hapus soal
                        </ConfirmButton>
                      </form>
                    </div>
                  </details>
                </li>
              ))}
            </ol>
            <details className="mt-4 rounded-lg border border-dashed border-brand/50 p-4" open={topic.quiz.questions.length === 0}>
              <summary className="cursor-pointer font-semibold text-brand">+ Tambah soal</summary>
              <div className="mt-3">
                <QuestionForm topicId={topic.id} nextOrder={topic.quiz.questions.length} />
              </div>
            </details>
            <form action={deleteQuizAction} className="mt-4">
              <input type="hidden" name="topicId" value={topic.id} />
              <ConfirmButton message="Hapus quiz beserta semua soal dan riwayat nilai?" className="btn-danger btn-sm">
                Hapus quiz
              </ConfirmButton>
            </form>
          </>
        )}
      </section>

      <form action={saveTopicAction} className="card grid gap-3 sm:grid-cols-2">
        <input type="hidden" name="id" value={topic.id} />
        <input type="hidden" name="categoryId" value={topic.categoryId} />
        <h2 className="h2 sm:col-span-2">Pengaturan topik</h2>
        <Field label="Judul">
          <input className="input" name="title" defaultValue={topic.title} required />
        </Field>
        <Field label="Urutan">
          <input className="input" name="order" inputMode="numeric" defaultValue={topic.order} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Deskripsi">
            <textarea className="input" name="description" rows={2} defaultValue={topic.description ?? ""} />
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked={topic.published} /> Tampilkan di website
        </label>
        <div>
          <button className="btn" type="submit">
            Simpan topik
          </button>
        </div>
      </form>
      <form action={deleteTopicAction} className="mt-6">
        <input type="hidden" name="id" value={topic.id} />
        <ConfirmButton message="Hapus topik beserta semua materi dan quiz-nya?">Hapus topik</ConfirmButton>
      </form>
    </>
  );
}

const ADD_TYPES: { type: ItemType; label: string; hint: string }[] = [
  { type: "VIDEO", label: "Video", hint: "tempel link YouTube (disarankan) atau Google Drive" },
  { type: "SLIDES", label: "Slide PPTX / PDF", hint: "unggah file PowerPoint atau PDF, atau link Google Slides" },
  { type: "PDF", label: "PDF / e-book", hint: "unggah PDF atau link Google Drive" },
  { type: "LINK", label: "Tautan sumber", hint: "daftar pustaka / guideline" },
  { type: "TEXT", label: "Teks", hint: "ringkasan atau catatan" },
];

function ItemForm({
  topicId,
  type,
  item,
  nextOrder = 0,
  soffice,
}: {
  topicId: string;
  type: ItemType;
  item?: ItemRow;
  nextOrder?: number;
  soffice: boolean;
}) {
  const needsFile = type === "SLIDES" || type === "PDF";
  return (
    <form action={saveItemAction} className="grid gap-3 sm:grid-cols-2">
      <input type="hidden" name="topicId" value={topicId} />
      <input type="hidden" name="type" value={type} />
      {item && <input type="hidden" name="id" value={item.id} />}
      <div className="sm:col-span-2">
        <Field label="Judul">
          <input className="input" name="title" defaultValue={item?.title} required />
        </Field>
      </div>

      {type === "VIDEO" && (
        <div className="sm:col-span-2">
          <Field
            label="Link video"
            hint="YouTube: unggah sebagai Unlisted lalu salin link Share. Google Drive: bagikan 'Siapa saja yang memiliki link', lalu salin link. Video diputar langsung di halaman materi."
          >
            <input className="input" name="url" defaultValue={item?.url ?? ""} placeholder="https://youtu.be/... atau https://drive.google.com/file/d/..." required />
          </Field>
        </div>
      )}

      {needsFile && (
        <>
          <Field
            label={type === "SLIDES" ? "Unggah PPTX atau PDF" : "Unggah PDF"}
            hint={
              type === "SLIDES"
                ? soffice
                  ? "PPTX otomatis diubah menjadi tampilan slide."
                  : "PPTX butuh LibreOffice di server (belum terpasang). Sementara unggah PDF, atau pakai link Google Slides/Drive."
                : "PDF ditampilkan langsung di halaman materi."
            }
          >
            <input
              className="input"
              type="file"
              name="file"
              accept={
                type === "SLIDES"
                  ? ".pptx,.ppt,.pdf,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint"
                  : ".pdf,application/pdf,image/*"
              }
            />
          </Field>
          <Field label="...atau link Google Slides / Google Drive / OneDrive" hint="Dipakai bila tidak mengunggah file.">
            <input className="input" name="url" defaultValue={item?.url ?? ""} placeholder="https://docs.google.com/presentation/d/..." />
          </Field>
          {item?.file && (
            <div className="text-sm sm:col-span-2">
              Berkas saat ini:{" "}
              <a href={`/api/berkas/${item.file.id}`} target="_blank" rel="noopener noreferrer" className="link">
                {item.originalFile?.originalName ?? item.file.originalName}
              </a>
              <label className="ml-4 inline-flex items-center gap-2">
                <input type="checkbox" name="removeFile" /> Hapus berkas
              </label>
            </div>
          )}
        </>
      )}

      {type === "LINK" && (
        <div className="sm:col-span-2">
          <Field label="URL sumber">
            <input className="input" name="url" defaultValue={item?.url ?? ""} placeholder="https://" required />
          </Field>
        </div>
      )}

      <div className="sm:col-span-2">
        <Field label="Deskripsi singkat (opsional)">
          <input className="input" name="description" defaultValue={item?.description ?? ""} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field label={type === "TEXT" ? "Isi teks" : "Catatan di bawah materi (opsional)"}>
          <textarea className="input" name="body" rows={type === "TEXT" ? 6 : 2} defaultValue={item?.body ?? ""} required={type === "TEXT"} />
        </Field>
      </div>
      <Field label="Sumber & izin penggunaan" hint="Mis. milik sendiri / izin penerbit / tautan resmi.">
        <input className="input" name="sourceNote" defaultValue={item?.sourceNote ?? ""} />
      </Field>
      <Field label="Urutan">
        <input className="input" name="order" inputMode="numeric" defaultValue={item?.order ?? nextOrder} />
      </Field>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="isFree" defaultChecked={item?.isFree ?? false} /> Gratis (tanpa paket, tetap wajib login)
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={item?.published ?? true} /> Tampilkan
      </label>
      <div>
        <button className="btn" type="submit">
          {item ? "Simpan materi" : "Tambah materi"}
        </button>
      </div>
    </form>
  );
}

function QuestionForm({
  topicId,
  question,
  nextOrder = 0,
}: {
  topicId: string;
  question?: { id: string; text: string; explanation: string | null; order: number; options: { text: string; isCorrect: boolean }[] };
  nextOrder?: number;
}) {
  const correctIndex = question?.options.findIndex((o) => o.isCorrect) ?? 0;
  return (
    <form action={saveQuestionAction} className="grid gap-3">
      <input type="hidden" name="topicId" value={topicId} />
      {question && <input type="hidden" name="questionId" value={question.id} />}
      <Field label="Soal">
        <textarea className="input" name="text" rows={2} defaultValue={question?.text} required />
      </Field>
      <fieldset className="space-y-2">
        <legend className="label">Pilihan jawaban (pilih bulatan untuk jawaban benar)</legend>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <input type="radio" name="correct" value={i} defaultChecked={i === Math.max(correctIndex, 0)} aria-label={`Jawaban benar ${String.fromCharCode(65 + i)}`} />
            <span className="w-5 text-sm font-semibold">{String.fromCharCode(65 + i)}</span>
            <input className="input" name={`option_${i}`} defaultValue={question?.options[i]?.text ?? ""} placeholder={i < 2 ? "Wajib" : "Opsional"} />
          </div>
        ))}
      </fieldset>
      <Field label="Pembahasan (ditampilkan setelah menjawab)">
        <textarea className="input" name="explanation" rows={2} defaultValue={question?.explanation ?? ""} />
      </Field>
      <Field label="Urutan">
        <input className="input max-w-[120px]" name="order" inputMode="numeric" defaultValue={question?.order ?? nextOrder} />
      </Field>
      <div>
        <button className="btn" type="submit">
          {question ? "Simpan soal" : "Tambah soal"}
        </button>
      </div>
    </form>
  );
}
