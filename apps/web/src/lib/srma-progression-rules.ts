export const SRMA_PASSING_SCORE = 80;
export type ProgressTopic = { id: string; title: string; quiz: { id: string; title: string; published: boolean } | null };

// All earlier quizzes must have at least one passing attempt. A later failed
// retry does not erase an earlier pass, and old scores below 80 do not unlock.
export function srmaProgression(topics: ProgressTopic[], scores: Map<string, number>) {
  const locked = new Map<string, ProgressTopic>();
  const passed = new Set<string>();
  let prerequisite: ProgressTopic | null = null;
  for (const topic of topics) {
    if (prerequisite) locked.set(topic.id, prerequisite);
    const pass = !!topic.quiz?.published && (scores.get(topic.quiz.id) ?? -1) >= SRMA_PASSING_SCORE;
    if (pass && !prerequisite) passed.add(topic.id);
    if (!pass && !prerequisite) prerequisite = topic;
  }
  return { topics, locked, passed };
}
