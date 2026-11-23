// Mastery and readiness math. QUESTIONS/BLUEPRINT are injectable for tests.
import { QUESTIONS, BLUEPRINT, AREAS } from '../data/index.js';

// Fraction of the area's questions whose latest attempt was correct (unseen = 0).
export function areaMastery(state, questions, area) {
  const qs = questions.filter(q => q.area === area);
  if (!qs.length) return 0;
  const right = qs.filter(q => state.answers[q.id] && state.answers[q.id].last).length;
  return right / qs.length;
}

// 0..100, blueprint-weighted. An area with zero questions has mastery 0, so it contributes nothing.
export function readiness(state, level, questions = QUESTIONS, blueprint = BLUEPRINT) {
  const areas = Object.keys(blueprint);
  const total = areas.reduce((t, a) => t + blueprint[a][level], 0);
  if (!total) return 0;
  const sum = areas.reduce((t, a) => t + blueprint[a][level] * areaMastery(state, questions, a), 0);
  return (sum / total) * 100;
}

// The n lowest-mastery areas among those that have questions (ties keep AREAS order).
export function weakest(state, n, questions = QUESTIONS, areas = AREAS) {
  return areas
    .map((a, i) => ({ id: a.id, i, m: areaMastery(state, questions, a.id), has: questions.some(q => q.area === a.id) }))
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
