import assert from "node:assert/strict";
import { PrismaClient } from "@prisma/client";
import { SignJWT } from "jose";

// Run against an isolated/local preview, never against a public deployment.
const base = process.env.SRMA_TEST_URL || "http://localhost:3001";
assert.match(base, /^http:\/\/(localhost|127\.0\.0\.1):\d+$/);
process.loadEnvFile();
const db = new PrismaClient();
let userId: string | undefined;
async function main() {
  const user = await db.user.create({ data: { email: `srma-gate-${Date.now()}@dokteredukasi.test`, name: "Uji gerbang SR-MA", passwordHash: "!test-only!", role: "STUDENT" } });
  userId = user.id;
  const pkg = await db.package.findUniqueOrThrow({ where: { slug: "paket-srma-basic" } });
  const entitlement = await db.entitlement.create({ data: { userId, packageId: pkg.id, note: "Temporary automated gate test" } });
  const token = await new SignJWT({ sub: user.id }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("10m").sign(new TextEncoder().encode(process.env.AUTH_SECRET));
  const headers = { Cookie: `de_session=${token}` };
  const get = (url: string) => fetch(base + url, { headers });
  const quizzes = await db.quiz.findMany({ where: { id: { startsWith: "dea-srma-chapter-quiz-" } }, orderBy: { id: "asc" }, include: { questions: { orderBy: { order: "asc" }, include: { options: true } } } });
  assert.equal(quizzes.length, 8);
  assert(quizzes.every(q => q.passingScore === 80));
  const q1 = quizzes[0], q2 = quizzes[1];
  const file2 = await db.item.findFirstOrThrow({ where: { topicId: q2.topicId, type: "PDF" } });
  const page1 = await (await get(`/quiz/${q1.topicId}`)).text();
  const quizForm = page1.match(/<form\b[^>]*>[\s\S]*?<\/form>/g)?.find(form => form.includes('name="quizId"'));
  const action = quizForm?.match(/name="(\$ACTION_ID_[^"]+)"/)?.[1];
  assert(action, "Server action form must be available");
  async function submit(quiz: typeof q1, correctCount: number) {
    const form = new FormData();
    form.set(action!, "");
    form.set("quizId", quiz.id);
    quiz.questions.forEach((question, i) => form.set(`q_${question.id}`, question.options.find(o => o.isCorrect === (i < correctCount))!.id));
    return fetch(base + `/quiz/${quiz.topicId}`, { method: "POST", headers: { ...headers, Origin: base }, body: form, redirect: "manual" });
  }
  assert.match(await (await get(`/materi/${q2.topicId}`)).text(), /Kelompok ini belum terbuka/);
  assert.match(await (await get(`/quiz/${q2.topicId}`)).text(), /Kelompok ini belum terbuka/);
  assert.equal((await get(`/api/berkas/${file2.fileId}`)).status, 403);
  await submit(q2, 10);
  assert.equal(await db.quizAttempt.count({ where: { userId, quizId: q2.id } }), 0, "Locked quiz POST must not create an attempt");
  const failed = await submit(q1, 7);
  assert.equal(failed.status, 303);
  assert.equal((await db.quizAttempt.findFirstOrThrow({ where: { userId, quizId: q1.id } })).score, 70);
  const failedPage = await (await get(failed.headers.get("location")!)).text();
  assert.match(failedPage, /Kelompok berikutnya masih terkunci/);
  assert.match(await (await get(`/materi/${q2.topicId}`)).text(), /Kelompok ini belum terbuka/);
  const pass = await submit(q1, 8);
  assert.equal(pass.status, 303);
  const passedPage = await (await get(pass.headers.get("location")!)).text();
  assert.match(passedPage, /Kelompok berikutnya sudah terbuka/);
  assert(!/Kelompok ini belum terbuka/.test(await (await get(`/materi/${q2.topicId}`)).text()));
  assert.equal((await get(`/api/berkas/${file2.fileId}`)).status, 200);
  assert.match(await (await get(`/materi/${quizzes[2].topicId}`)).text(), /Kelompok ini belum terbuka/);
  await submit(q1, 0);
  assert.equal((await get(`/api/berkas/${file2.fileId}`)).status, 200, "A failed retry must not erase an earlier pass");
  await db.entitlement.update({ where: { id: entitlement.id }, data: { revokedAt: new Date() } });
  assert.equal((await get(`/api/berkas/${file2.fileId}`)).status, 403, "Passing does not replace paid access");
  assert.equal((await fetch(base + `/api/berkas/${file2.fileId}`)).status, 401);
  console.log("SR-MA HTTP: kuis 70 gagal, ulangi 80 lulus, pembukaan satu kelompok, blok URL/PDF/POST, hak paket dan kelulusan tersimpan lulus.");
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => { if (userId) await db.user.delete({ where: { id: userId } }); await db.$disconnect(); });
