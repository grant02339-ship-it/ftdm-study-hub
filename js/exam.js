// Exam engine: mock-exam assembly, quizzes, scoring, choice shuffling. Pure functions, no DOM.

// Deterministic RNG (mulberry32) for tests. Returns a function yielding floats in [0,1).
export function seededRng(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Fisher-Yates; returns a new array.
export function shuffle(arr, rng = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const EXAM_SIZE = 100;

function dedupe(questions) {
  const seen = new Set();
  return questions.filter(q => !seen.has(q.id) && seen.add(q.id));
}

/**
 * Build a 100-question mock exam for `level` ('district' | 'association' | 'icdc').
 * Takes blueprint[area][level] questions per area. If an area's pool is short, all of it
 * is used and the remaining slots are filled from other areas' leftover questions,
 * preferring areas with the largest blueprint weight at that level (ties random), never
 * duplicating a question. If the whole pool has fewer than 100 questions, every question
 * is returned (shuffled). The result is always in shuffled order (areas mixed).
 */
export function buildMock(questions, blueprint, level, rng = Math.random) {
  const all = dedupe(questions);
  if (all.length <= EXAM_SIZE) return shuffle(all, rng);

  const byArea = new Map();
  for (const q of shuffle(all, rng)) {
    if (!byArea.has(q.area)) byArea.set(q.area, []);
    byArea.get(q.area).push(q);
  }
  const weight = a => (blueprint[a] && blueprint[a][level]) || 0;

  const picked = [];
  const leftovers = []; // [area, remaining questions]
  for (const [area, qs] of byArea) {
    const want = weight(area);
    picked.push(...qs.slice(0, want));
    if (qs.length > want) leftovers.push([area, qs.slice(want)]);
  }

  let short = EXAM_SIZE - picked.length;
  if (short > 0) {
    // Shuffle area order first so equal weights tie-break randomly (sort is stable).
    const order = shuffle(leftovers, rng).sort((x, y) => weight(y[0]) - weight(x[0]));
    for (const [, qs] of order) {
      if (short <= 0) break;
      const take = qs.slice(0, short);
      picked.push(...take);
      short -= take.length;
    }
  }
  return shuffle(picked, rng);
}

/** Quiz question selection. `ids` (mistake review) keeps the given order; otherwise filter, shuffle, take n. */
export function quizFrom(questions, { area, pi, ids, n } = {}, rng = Math.random) {
  if (ids) {
    const byId = new Map(questions.map(q => [q.id, q]));
    const out = ids.map(id => byId.get(id)).filter(Boolean);
    return n ? out.slice(0, n) : out;
  }
  let pool = questions;
  if (area) pool = pool.filter(q => q.area === area);
  if (pi) pool = pool.filter(q => q.pi === pi);
  const out = shuffle(pool, rng);
  return n ? out.slice(0, n) : out;
}

/**
 * Score responses ({[qid]: chosenIndex}). Unanswered or partial responses count as wrong.
 * score = number correct; percent = rounded 0-100 of total; byArea = {[area]: {correct,total}}.
 */
export function scoreExam(questions, responses = {}) {
  const byArea = {};
  let score = 0;
  for (const q of questions) {
    const slot = byArea[q.area] || (byArea[q.area] = { correct: 0, total: 0 });
    slot.total++;
    if (responses[q.id] === q.answer) { slot.correct++; score++; }
  }
  const total = questions.length;
  return { score, total, percent: total ? Math.round((score / total) * 100) : 0, byArea };
}

/** Shuffle choices for display. Returns {q: copy with permuted choices and remapped answer, map} where map[newIndex] = originalIndex. */
export function shuffleChoices(q, rng = Math.random) {
  const map = shuffle(q.choices.map((_, i) => i), rng);
  return { q: { ...q, choices: map.map(i => q.choices[i]), answer: map.indexOf(q.answer) }, map };
}
