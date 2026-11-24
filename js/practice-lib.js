// Pure helpers for Practice, Quiz, Mock exam and Cards. No DOM, so they run in the headless tests.
import { buildMock, quizFrom, shuffle, shuffleChoices, scoreExam } from './exam.js';
import { recordAnswer } from './store.js';
import { bumpStreak } from './progress.js';

export const EXAM_MS = 60 * 60 * 1000;
export const LEVELS = ['district', 'association', 'icdc'];
const MIN = 60000, HOUR = 60 * MIN, DAY = 24 * HOUR;

const pad = n => String(n).padStart(2, '0');
export const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const levelOf = state => (LEVELS.includes(state.settings.level) ? state.settings.level : 'district');

// Any study action (quiz answer, exam answer, card review) counts toward today's streak.
export function noteStudy(state, now = new Date()) { return bumpStreak(state, ymd(now)); }

// 3599000 -> "59:59"; rounds up so the clock never shows 0:00 while time remains.
export function formatClock(ms) {
  const s = Math.max(0, Math.ceil((Number(ms) || 0) / 1000));
  return `${Math.floor(s / 60)}:${pad(s % 60)}`;
}

// Questions whose latest attempt was wrong, most recently missed first.
export function mistakeIds(state, questions) {
  return questions
    .filter(q => state.answers[q.id] && state.answers[q.id].last === false)
    .sort((a, b) => (state.answers[b.id].at || 0) - (state.answers[a.id].at || 0))
    .map(q => q.id);
}

// n questions, areas drawn in proportion to the level's blueprint weight. No repeats.
export function weightedQuiz(questions, blueprint, level, n, rng = Math.random) {
  const pools = new Map();
  for (const q of shuffle(questions, rng)) {
    const w = blueprint[q.area] ? blueprint[q.area][level] : 0;
    if (!w) continue;
    if (!pools.has(q.area)) pools.set(q.area, { w, qs: [] });
    pools.get(q.area).qs.push(q);
  }
  const out = [];
  while (out.length < n) {
    const live = [...pools.values()].filter(p => p.qs.length);
    if (!live.length) break;
    let r = rng() * live.reduce((t, p) => t + p.w, 0);
    const pick = live.find(p => (r -= p.w) < 0) || live[live.length - 1];
    out.push(pick.qs.pop());
  }
  return out;
}

const clampN = (v, dflt) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? Math.min(n, 100) : dflt;
};

// Reads the quiz URL contract into {title, questions, mode}.
//   pis=<codes>&n=  |  area=<ID>&n=  |  mode=mistakes  |  mode=quick  |  ids=<qids>
export function quizQuestions(params, state, data, rng = Math.random) {
  const { QUESTIONS, BLUEPRINT, AREAS } = data;
  const level = levelOf(state);
  if (params.mode === 'mistakes') {
    const ids = mistakeIds(state, QUESTIONS);
    return { mode: 'mistakes', title: 'Mistake review', questions: quizFrom(QUESTIONS, { ids, n: clampN(params.n, 20) }) };
  }
  if (params.ids) {
    const ids = String(params.ids).split(',').map(s => s.trim()).filter(Boolean);
    return { mode: 'ids', title: 'Practice', questions: quizFrom(QUESTIONS, { ids, n: clampN(params.n, 0) || undefined }) };
  }
  if (params.area) {
    const area = AREAS.find(a => a.id === params.area);
    return { mode: 'area', title: area ? area.name : 'Practice', questions: quizFrom(QUESTIONS, { area: params.area, n: clampN(params.n, 10) }, rng) };
  }
  if (params.pis) {
    const set = new Set(String(params.pis).split(',').map(s => s.trim()).filter(Boolean));
    const pool = QUESTIONS.filter(q => set.has(q.pi));
    return { mode: 'pis', title: 'Lesson practice', questions: shuffle(pool, rng).slice(0, clampN(params.n, 10)) };
  }
  return { mode: 'quick', title: 'Quick 10', questions: weightedQuiz(QUESTIONS, BLUEPRINT, level, clampN(params.n, 10), rng) };
}

// Card rating labels: 60000 -> "1 min", 2 days -> "2 days".
export function formatInterval(ms) {
  if (ms < HOUR) { const m = Math.max(1, Math.round(ms / MIN)); return `${m} min`; }
  if (ms < DAY) { const hr = Math.round(ms / HOUR); return `${hr} hr`; }
  const d = Math.round(ms / DAY);
  return `${d} day${d === 1 ? '' : 's'}`;
}

// "in 5 minutes" | "in 2 hours" | "tomorrow" | "in 4 days" | "now"
export function relativeDue(ms) {
  if (!(ms > 0)) return 'now';
  if (ms < HOUR) { const m = Math.max(1, Math.round(ms / MIN)); return `in ${m} minute${m === 1 ? '' : 's'}`; }
  if (ms < DAY) { const hr = Math.round(ms / HOUR); return hr >= 24 ? 'tomorrow' : `in ${hr} hour${hr === 1 ? '' : 's'}`; }
  const d = Math.round(ms / DAY);
  return d <= 1 ? 'tomorrow' : `in ${d} days`;
}

// Soonest future due time among the given cards (reviewed ones only), or null.
export function nextDue(cards, state, now) {
  let min = null;
  for (const c of cards) {
    const s = state.cards[c.id];
    if (s && s.due > now && (min === null || s.due < min)) min = s.due;
  }
  return min;
}

/* ---------- Mock exam ---------- */

export function startExam(questions, blueprint, level, now, rng = Math.random) {
  const qs = buildMock(questions, blueprint, level, rng);
  const choiceMaps = {};
  for (const q of qs) choiceMaps[q.id] = shuffleChoices(q, rng).map;
  return { level, ids: qs.map(q => q.id), responses: {}, flagged: [], startedAt: now, remainingMs: EXAM_MS, choiceMaps, cur: 0 };
}

const isPerm = (m, n) => Array.isArray(m) && m.length === n && [...m].sort((a, b) => a - b).every((v, i) => v === i);

// Rebuilds a saved exam against the current question bank. Drops ids that no longer exist,
// invalid responses and broken choice orders. Returns {exam, questions} or null if unusable.
export function restoreExam(active, questions, rng = Math.random) {
  if (!active || typeof active !== 'object' || !Array.isArray(active.ids)) return null;
  const byId = new Map(questions.map(q => [q.id, q]));
  const qs = [...new Set(active.ids)].map(id => byId.get(id)).filter(Boolean);
  if (!qs.length) return null;
  const known = new Set(qs.map(q => q.id));
  const responses = {};
  const savedR = active.responses && typeof active.responses === 'object' ? active.responses : {};
  for (const q of qs) {
    const r = savedR[q.id];
    if (Number.isInteger(r) && r >= 0 && r < q.choices.length) responses[q.id] = r;
  }
  const flagged = [...new Set(Array.isArray(active.flagged) ? active.flagged : [])].filter(id => known.has(id));
  const savedM = active.choiceMaps && typeof active.choiceMaps === 'object' ? active.choiceMaps : {};
  const choiceMaps = {};
  for (const q of qs) choiceMaps[q.id] = isPerm(savedM[q.id], q.choices.length) ? savedM[q.id] : shuffleChoices(q, rng).map;
  const rem = Number(active.remainingMs);
  const remainingMs = Number.isFinite(rem) ? Math.min(EXAM_MS, Math.max(0, rem)) : EXAM_MS;
  const firstOpen = qs.findIndex(q => !(q.id in responses));
  const cur = Number.isInteger(active.cur) && active.cur >= 0 && active.cur < qs.length ? active.cur : Math.max(0, firstOpen);
  const level = LEVELS.includes(active.level) ? active.level : 'district';
  const event = typeof active.event === 'string' ? { event: active.event } : {};
  return {
    exam: { ...event, level, ids: qs.map(q => q.id), responses, flagged, startedAt: active.startedAt || 0, remainingMs, choiceMaps, cur },
    questions: qs,
  };
}

export function examProgress(exam) {
  const answered = exam.ids.filter(id => id in exam.responses).length;
  return { answered, left: exam.ids.length - answered, flagged: exam.flagged.length };
}

// Scores the exam, records each answered question toward mastery, files it in history and
// clears activeExam. Mutates state; returns the history record.
export function finishExam(state, exam, questions, now) {
  const result = scoreExam(questions, exam.responses);
  for (const q of questions) {
    if (q.id in exam.responses) recordAnswer(state, q, exam.responses[q.id] === q.answer, now);
  }
  const record = {
    date: ymd(new Date(now)), at: now, level: exam.level,
    score: result.score, total: result.total, percent: result.percent, byArea: result.byArea,
    usedMs: EXAM_MS - exam.remainingMs,
    ...(exam.event ? { event: exam.event } : {}),
    ids: exam.ids.slice(), responses: { ...exam.responses }, flagged: exam.flagged.slice(),
    // The order each question's choices were shown in, so the review uses the same letters.
    ...(exam.choiceMaps ? { choiceMaps: { ...exam.choiceMaps } } : {}),
  };
  state.exams.push(record);
  state.activeExam = null;
  return record;
}
