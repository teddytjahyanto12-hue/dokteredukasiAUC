import assert from "node:assert/strict";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const base = process.env.TEST_BASE || "http://127.0.0.1:3007";
const html = async (path) => {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  return (await response.text()).replaceAll("&amp;", "&");
};
try {
  const tracks = await db.track.findMany({ where: { published: true }, orderBy: { order: "asc" } });
  assert.deepEqual(tracks.map((t) => t.title), ["Pre-Clinical", "UKMPPD", "Clinical Practice", "Medical Research"]);
  const categories = await db.category.findMany({ where: { published: true }, include: { track: true }, orderBy: { order: "asc" } });
  const uk = categories.filter((c) => c.track.slug === "ukmppd");
  const parents = uk.filter((c) => !c.parentId);
  assert.deepEqual(parents.map((c) => c.title), ["Materi UKMPPD", "Latihan Soal UKMPPD"]);
  const materials = uk.filter((c) => c.parentId === parents[0].id);
  const exercises = uk.filter((c) => c.parentId === parents[1].id);
  assert.equal(materials.length, 18);
  assert.equal(exercises.length, 18);
  assert.deepEqual(materials.map((c) => c.title), exercises.map((c) => c.title));
  const page = await html("/kelas?program=ukmppd");
  for (const c of uk) assert.ok(page.includes(c.title), c.title);
  const home = await html("/");
  assert.ok(home.includes('program=ukmppd'));
  for (const page of [home, await html("/kelas")]) {
    for (const removed of ["Tes Rekomendasi", "Daftar Pustaka", "Clinical Guidelines", 'href="/rekomendasi"']) assert.ok(!page.includes(removed), removed);
  }
  assert.equal((await fetch(base + "/rekomendasi")).status, 404);
  const research = await html("/kelas?program=medical-research");
  for (const title of ["Bivariate", "Publikasi Jurnal SINTA", "Publikasi Jurnal Scopus"]) assert.ok(research.includes(title), title);
  const original = categories.filter((c) => c.slug.startsWith("original-research-"));
  assert.deepEqual(original.map((c) => c.slug), ["original-research-univariate", "original-research-bivariate", "original-research-multivariate"]);
  const bms = categories.find((c) => c.slug === "basic-medical-science");
  const quiz = categories.find((c) => c.slug === "quiz");
  assert.ok(bms && quiz);
  assert.deepEqual(categories.filter((c) => c.parentId === quiz.id).map((c) => c.title), categories.filter((c) => c.parentId === bms.id).map((c) => c.title));
  const quizPage = await html(`/kelas/${quiz.id}`);
  for (const c of categories.filter((c) => c.parentId === quiz.id)) assert.ok(quizPage.includes(c.title), c.title);
  for (const c of uk) await html(`/kelas/${c.id}`);
  for (const course of exercises) {
    const topics = await db.topic.findMany({ where: { categoryId: course.id }, orderBy: { order: "asc" } });
    assert.deepEqual(topics.map((t) => t.title), ["Latihan Soal 1", "Latihan Soal 2"]);
    const detail = await html(`/kelas/${course.id}`);
    for (const title of ["Latihan Soal 1", "Latihan Soal 2"]) assert.ok(detail.includes(title), `${course.title}: ${title}`);
  }
  const search = await html("/api/cari?q=ukmppd");
  assert.ok(search.includes("UKMPPD"));
  const recommendations = await html("/api/cari?q=rekomendasi");
  assert.ok(!recommendations.includes("/rekomendasi"));
  console.log(`Lulus HTTP ${base}: 4 program, 2 kelompok UKMPPD masing-masing18kelas/2pilihan latihan, ${categories.filter((c) => c.parentId === quiz.id).length} blok Quiz, Bivariate, SINTA/Scopus, rekomendasi404 dan pencarian.`);
} finally { await db.$disconnect(); }
