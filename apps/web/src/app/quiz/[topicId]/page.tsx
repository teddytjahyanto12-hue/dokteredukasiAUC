import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { canAccessCategory } from "@/lib/access";
import { tanggal } from "@/lib/format";
import { submitQuizAction } from "@/app/actions/student";
import { Empty, Flash } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export default async function QuizPage({ params, searchParams }: { params: Promise<{ topicId: string }>; searchParams: SearchParams }) {
  const user = await requireUser();
  const { topicId } = await params;
  const { pesan, tipe, pick } = await readFlash(searchParams);
  const quiz = await db.quiz.findUnique({
    where: { topicId },
    include: {
      topic: true,
      questions: { orderBy: { order: "asc" }, include: { options: { orderBy: { order: "asc" } } } },
    },
  });
  if (!quiz || !quiz.published) notFound();

  const allowed = quiz.isFree || (await canAccessCategory(user, quiz.topic.categoryId));
  if (!allowed) {
    return (
      <div className="container-page py-10">
        <Empty>
          Quiz ini termasuk paket berbayar.{" "}
          <Link href={`/materi/${topicId}`} className="link">
            Kembali ke materi
          </Link>
        </Empty>
      </div>
    );
  }

  const resultId = pick("hasil");
  const result = resultId
    ? await db.quizAttempt.findFirst({ where: { id: resultId, userId: user.id }, include: { answers: true } })
    : null;
  const history = await db.quizAttempt.findMany({ where: { userId: user.id, quizId: quiz.id }, orderBy: { createdAt: "desc" }, take: 5 });
  const chosen = new Map(result?.answers.map((a) => [a.questionId, a.optionId]) ?? []);

  return (
    <div className="container-page max-w-3xl py-10">
      <Link href={`/materi/${topicId}`} className="text-sm text-slate-500 hover:text-brand">
        ← {quiz.topic.title}
      </Link>
      <h1 className="h1 mt-2">{quiz.title}</h1>
      <p className="muted mt-1">
        {quiz.questions.length} soal · nilai lulus {quiz.passingScore}
      </p>
      <div className="mt-4">
        <Flash pesan={pesan} tipe={tipe} />
      </div>

      {result && (
        <div className={`mt-4 rounded-xl border p-5 ${result.score >= quiz.passingScore ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}>
          <p className="text-sm text-slate-600">Hasil kuis</p>
          <p className="text-3xl font-bold text-slate-900">{result.score}</p>
          <p className="text-sm text-slate-700">
            {result.correct} dari {result.total} benar · {result.score >= quiz.passingScore ? "Lulus 🎉" : "Belum mencapai nilai lulus"}
          </p>
          <Link href={`/quiz/${topicId}`} className="btn-secondary btn-sm mt-3">
            Ulangi quiz
          </Link>
        </div>
      )}

      {quiz.questions.length === 0 ? (
        <div className="mt-6">
          <Empty>Soal quiz sedang disiapkan.</Empty>
        </div>
      ) : (
        <form action={submitQuizAction} className="mt-6 space-y-5">
          <input type="hidden" name="quizId" value={quiz.id} />
          {quiz.questions.map((q, qi) => (
            <fieldset key={q.id} className="card">
              <legend className="sr-only">Soal {qi + 1}</legend>
              <p className="font-medium text-slate-900">
                {qi + 1}. {q.text}
              </p>
              <div className="mt-3 space-y-2">
                {q.options.map((o) => {
                  const picked = chosen.get(q.id) === o.id;
                  const reveal = !!result;
                  const tone = reveal && o.isCorrect ? "border-emerald-400 bg-emerald-50" : reveal && picked ? "border-red-300 bg-red-50" : "border-slate-200";
                  return (
                    <label key={o.id} className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm ${tone}`}>
                      <input type="radio" name={`q_${q.id}`} value={o.id} defaultChecked={picked} disabled={reveal} required={!reveal} />
                      {o.text}
                    </label>
                  );
                })}
              </div>
              {result && q.explanation && <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">Pembahasan: {q.explanation}</p>}
            </fieldset>
          ))}
          {!result && (
            <button className="btn" type="submit">
              Kirim jawaban
            </button>
          )}
        </form>
      )}

      {history.length > 0 && (
        <div className="mt-10">
          <h2 className="h2 mb-2">Riwayat nilai</h2>
          <ul className="text-sm text-slate-600">
            {history.map((h) => (
              <li key={h.id}>
                {tanggal(h.createdAt, true)} - {h.score} ({h.correct}/{h.total})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
