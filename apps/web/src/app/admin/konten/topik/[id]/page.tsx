import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ITEM_TYPE_LABEL, ITEM_TYPES, type ItemType } from "@/lib/constants";
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
  file: { id: string; originalName: string } | null;
};

export default async function AdminTopic({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  const { id } = await params;
  const { pesan, tipe } = await readFlash(searchParams);
  const topic = await db.topic.findUnique({
    where: { id },
    include: {
      category: { include: { track: true } },
      items: { orderBy: { order: "asc" }, include: { file: { select: { id: true, originalName: true } } } },
      quiz: { include: { questions: { orderBy: { order: "asc" }, include: { options: { orderBy: { order: "asc" } } } } } },
    },
  });
  if (!topic) notFound();
  const defaultType = topic.category.displayType === "LINKS" ? "LINK" : topic.category.displayType === "SLIDES" ? "SLIDES" : "PDF";

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
                  <div className="border-t border-slate-100 p-4">
                    <ItemForm topicId={topic.id} item={item} />
                    <form action={deleteItemAction} className="mt-3">
                      <input type="hidden" name="id" value={item.id} />
                      <ConfirmButton message="Hapus materi ini?" className="btn-danger btn-sm">
                        Hapus materi
                      </ConfirmButton>
                    </form>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        )}
        <details className="mt-4 rounded-lg border border-dashed border-brand/50 p-4" open={topic.items.length === 0}>
          <summary className="cursor-pointer font-semibold text-brand">+ Tambah materi</summary>
          <div className="mt-3">
            <ItemForm topicId={topic.id} defaultType={defaultType} nextOrder={topic.items.length} />
          </div>
        </details>
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

function ItemForm({ topicId, item, defaultType = "PDF", nextOrder = 0 }: { topicId: string; item?: ItemRow; defaultType?: string; nextOrder?: number }) {
  return (
    <form action={saveItemAction} className="grid gap-3 sm:grid-cols-2">
      <input type="hidden" name="topicId" value={topicId} />
      {item && <input type="hidden" name="id" value={item.id} />}
      <Field label="Judul materi">
        <input className="input" name="title" defaultValue={item?.title} required />
      </Field>
      <Field label="Tipe">
        <select className="input" name="type" defaultValue={item?.type ?? defaultType}>
          {ITEM_TYPES.map((t) => (
            <option key={t} value={t}>
              {ITEM_TYPE_LABEL[t]}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Unggah berkas (PDF/gambar)" hint="Slide: ekspor PPTX ke PDF dulu (File → Save As → PDF).">
        <input className="input" type="file" name="file" accept="application/pdf,image/*" />
      </Field>
      <Field label="Tautan (video / Google Drive / sumber)" hint="Wajib untuk tipe Video & Tautan. Untuk PDF: cadangan bila tidak mengunggah.">
        <input className="input" name="url" defaultValue={item?.url ?? ""} placeholder="https://" />
      </Field>
      {item?.file && (
        <div className="text-sm sm:col-span-2">
          Berkas saat ini:{" "}
          <a href={`/api/berkas/${item.file.id}`} target="_blank" rel="noopener noreferrer" className="link">
            {item.file.originalName}
          </a>
          <label className="ml-4 inline-flex items-center gap-2">
            <input type="checkbox" name="removeFile" /> Hapus berkas
          </label>
        </div>
      )}
      <div className="sm:col-span-2">
        <Field label="Deskripsi singkat">
          <input className="input" name="description" defaultValue={item?.description ?? ""} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field label="Teks materi (untuk tipe Teks)">
          <textarea className="input" name="body" rows={4} defaultValue={item?.body ?? ""} />
        </Field>
      </div>
      <Field label="Sumber & izin penggunaan" hint="Mis. milik sendiri / izin penerbit / tautan resmi.">
        <input className="input" name="sourceNote" defaultValue={item?.sourceNote ?? ""} />
      </Field>
      <Field label="Urutan">
        <input className="input" name="order" inputMode="numeric" defaultValue={item?.order ?? nextOrder} />
      </Field>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="isFree" defaultChecked={item?.isFree ?? false} /> Gratis (bisa dibuka tanpa paket, tetap wajib login)
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
