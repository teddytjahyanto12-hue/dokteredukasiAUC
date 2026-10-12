import assert from "node:assert/strict";
import { srmaProgression } from "../src/lib/srma-progression-rules";

const topics = Array.from({ length: 8 }, (_, i) => ({ id: `t${i + 1}`, title: `Kelompok ${i + 1}`, quiz: { id: `q${i + 1}`, title: `Kuis ${i + 1}`, published: true } }));
assert.equal(srmaProgression(topics, new Map()).locked.size, 7);
assert.equal(srmaProgression(topics, new Map([["q1", 70]])).locked.get("t2")?.id, "t1");
assert.equal(srmaProgression(topics, new Map([["q1", 79]])).locked.size, 7);
const boundary = srmaProgression(topics, new Map([["q1", 80]]));
assert.equal(boundary.locked.has("t2"), false);
assert.equal(boundary.locked.get("t3")?.id, "t2");
assert.equal(boundary.passed.has("t1"), true);
const skipped = srmaProgression(topics, new Map([["q1", 80], ["q3", 100]]));
assert.equal(skipped.locked.has("t4"), true);
assert.equal(skipped.passed.has("t3"), false);
assert.equal(srmaProgression(topics, new Map(topics.map(t => [t.quiz.id, 80]))).locked.size, 0);
assert.equal(srmaProgression([{ ...topics[0], quiz: null }, topics[1]], new Map()).locked.size, 1);
assert.equal(srmaProgression([{ ...topics[0], quiz: { ...topics[0].quiz, published: false } }, topics[1]], new Map([["q1", 100]])).locked.size, 1);
console.log("SR-MA: batas 79/80, urutan seluruh kelompok, larangan melompati kuis, dan kuis tidak tersedia lulus.");
