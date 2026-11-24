// Mastery and readiness math. QUESTIONS/BLUEPRINT are injectable for tests.
import { QUESTIONS, BLUEPRINT, AREAS } from '../data/index.js';

const DAY_MS = 86400000;
export const FADE_DAYS = 21;

// True when a once-solid answer (strength >= 0.85) hasn't been right for more than 21 days.
export function isFading(entry, now = Date.now()) {
  return !!(entry && entry.last && base(entry) >= 0.85 && now - (entry.at || 0) > FADE_DAYS * DAY_MS);
}

// Strength before fading: unseen 0, missed 0.1 (0.05 never right), then 0.4 / 0.7 / 0.85 / 1 by streak and days.
function base(e) {
  if (!e || !e.n) return 0;
  if (!e.last) return e.correct > 0 ? 0.1 : 0.05;
  const streak = Number.isInteger(e.streak) ? e.streak : 1;
  if (streak >= 3) return Array.isArray(e.days) && new Set(e.days).size >= 2 ? 1 : 0.85;
  return streak === 2 ? 0.7 : 0.4;
}

// How well one question is known right now, 0..1. Lasting knowledge needs repeats on different days.
export function strength(entry, now = Date.now()) {
  const b = base(entry);
  return isFading(entry, now) ? 0.75 : b;
}

// Average strength of the area's questions (unseen = 0).
export function areaMastery(state, questions, area, now = Date.now()) {
  const qs = questions.filter(q => q.area === area);
  if (!qs.length) return 0;
  return qs.reduce((t, q) => t + strength(state.answers[q.id], now), 0) / qs.length;
}

// 0..100, blueprint-weighted. An area with zero questions has mastery 0, so it contributes nothing.
export function readiness(state, level, questions = QUESTIONS, blueprint = BLUEPRINT, now = Date.now()) {
  const areas = Object.keys(blueprint);
  const total = areas.reduce((t, a) => t + blueprint[a][level], 0);
  if (!total) return 0;
  const sum = areas.reduce((t, a) => t + blueprint[a][level] * areaMastery(state, questions, a, now), 0);
  return (sum / total) * 100;
}

// Counts of questions by status: mastered (strength 1), fading (needs a refresh), learning (seen, not there yet), notStarted.
export function masteryCounts(state, questions, now = Date.now()) {
  const c = { mastered: 0, learning: 0, fading: 0, notStarted: 0, total: questions.length };
  for (const q of questions) {
    const e = state.answers[q.id];
    if (!e || !e.n) c.notStarted++;
    else if (isFading(e, now)) c.fading++;
    else if (strength(e, now) >= 1) c.mastered++;
    else c.learning++;
  }
  return c;
}

// The n lowest-mastery areas among those that have questions (ties keep AREAS order).
export function weakest(state, n, questions = QUESTIONS, areas = AREAS, now = Date.now()) {
  return areas
    .map((a, i) => ({ id: a.id, i, m: areaMastery(state, questions, a.id, now), has: questions.some(q => q.area === a.id) }))
    .filter(a => a.has)
    .sort((x, y) => x.m - y.m || x.i - y.i)
    .slice(0, n)
    .map(a => a.id);
}

const dayNum = s => { const [y, m, d] = s.split('-').map(Number); return Math.round(Date.UTC(y, m - 1, d) / 86400000); };

// today: 'YYYY-MM-DD' local date. Mutates and returns state.
export function bumpStreak(state, today) {
  const { count, lastDay } = state.streak;
  if (lastDay === today) return state;
  state.streak = { count: lastDay && dayNum(today) - dayNum(lastDay) === 1 ? count + 1 : 1, lastDay: today };
  return state;
}
