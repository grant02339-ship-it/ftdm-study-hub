// "For you" picks, Today's plan, the readiness log and the greeting. Pure (no DOM, no storage):
// the views own saving. `data` is the event slice from eventData(); `level` is the competition level.
import { areaMastery, strength, isFading } from './progress.js';
import { examEvent } from './event.js';
import { unknownCards } from './deck.js';
import { timeline, snapSpeed } from './player-timeline.js';
import { ymd } from './practice-lib.js';

export const DRILL_N = 10;      // questions in the focus drill
export const CARD_CAP = 20;     // most flashcards Today's plan asks for
export const LOG_DAYS = 60;     // readiness snapshots kept
const PLAN_KEEP_DAYS = 14;      // planDone history kept

const dayNum = s => { const [y, m, d] = s.split('-').map(Number); return Math.round(Date.UTC(y, m - 1, d) / 86400000); };
const weightOf = (data, level, id) => (data.BLUEPRINT[id] ? data.BLUEPRINT[id][level] || 0 : 0);
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

// True once the student has answered any question in this event.
export const hasAnswered = (state, data) => data.QUESTIONS.some(q => state.answers[q.id]);

/* ---------- Focus area ---------- */

// Area ids that have questions, best focus first: weakest mastery (ties: heavier on the exam, then
// blueprint order). Before any answers: heaviest on the exam first. Areas on this level's exam come
// first; the rest are only used when no area with questions is on it (e.g. a no-exam event).
export function rankAreas(state, data, level, now = Date.now()) {
  const pool = data.AREAS.map((a, i) => ({ id: a.id, i, w: weightOf(data, level, a.id) }))
    .filter(a => data.QUESTIONS.some(q => q.area === a.id));
  const onExam = pool.filter(a => a.w > 0);
  const list = onExam.length ? onExam : pool;
  if (!hasAnswered(state, data)) return list.sort((x, y) => y.w - x.w || x.i - y.i).map(a => a.id);
  return list.map(a => ({ ...a, m: areaMastery(state, data.QUESTIONS, a.id, now) }))
    .sort((x, y) => x.m - y.m || y.w - x.w || x.i - y.i).map(a => a.id);
}

// {id, name, mastery, fresh, reason, weight} for the area to work on now, or null when there are no questions.
export function focusArea(state, data, level, now = Date.now()) {
  const [id] = rankAreas(state, data, level, now);
  if (!id) return null;
  const area = data.AREAS.find(a => a.id === id);
  const fresh = !hasAnswered(state, data);
  const mastery = areaMastery(state, data.QUESTIONS, id, now);
  const weight = weightOf(data, level, id);
  let reason;
  if (fresh) {
    const total = data.AREAS.reduce((t, a) => t + weightOf(data, level, a.id), 0);
    reason = weight ? `The biggest part of your exam · ${weight} of ${total} questions` : 'A good place to start';
  } else {
    const mocks = state.exams.filter(e => examEvent(e) === data.EVENT.id);
    const last = mocks[mocks.length - 1];
    const s = last && last.byArea && last.byArea[id];
    reason = s && s.total ? `${s.correct} of ${s.total} on your last mock` : `${Math.round(mastery * 100)}% mastered`;
  }
  return { id, name: area ? area.name : id, mastery, fresh, reason, weight };
}

/* ---------- Watch, read, practice picks ---------- */

// Up to n reels the student hasn't finished: the focus area's first, then the next-weakest areas'.
export function watchPicks(state, data, level, n = 3, now = Date.now()) {
  const watched = state.watched || {};
  const out = [];
  for (const id of rankAreas(state, data, level, now)) {
    for (const v of data.VIDEOS) {
      if (out.length >= n) return out;
      if (v.area === id && !watched[v.id] && Array.isArray(v.scenes) && v.scenes.length) out.push(v);
    }
  }
  return out;
}

// Up to n lessons in the area as [{lesson, reason, missed}]: lessons with questions missed last time first
// (most missed first), then ones with answers that need a refresh, then unread "often in case studies" ones,
// then unread, then case-frequent, then the rest.
export function readPicks(state, data, areaId, n = 3, now = Date.now()) {
  const read = state.read || {};
  return data.LESSONS.filter(l => l.area === areaId).map((lesson, i) => {
    const qs = data.QUESTIONS.filter(q => lesson.pis.includes(q.pi));
    const missed = qs.filter(q => state.answers[q.id] && state.answers[q.id].last === false).length;
    const fading = qs.filter(q => isFading(state.answers[q.id], now)).length;
    const cf = !!lesson.caseFrequent, unread = !read[lesson.id];
    const tier = missed ? 0 : fading ? 1 : cf && unread ? 2 : unread ? 3 : cf ? 4 : 5;
    const reason = missed ? 'Missed recently' : fading ? 'Needs a refresh' : cf ? 'Often in cases' : unread ? 'Not read yet' : 'Read again';
    return { lesson, reason, missed, tier, i };
  }).sort((a, b) => a.tier - b.tier || b.missed - a.missed || a.i - b.i)
    .slice(0, n).map(({ lesson, reason, missed }) => ({ lesson, reason, missed }));
}

// The area's lowest-strength PI codes (ties: PI order), adding PIs until they hold at least `target` questions.
export function drillPis(state, data, areaId, target = DRILL_N, now = Date.now()) {
  const pis = data.PIS.filter(p => p.area === areaId).map((p, i) => {
    const qs = data.QUESTIONS.filter(q => q.pi === p.code);
    if (!qs.length) return null;
    const m = qs.reduce((t, q) => t + strength(state.answers[q.id], now), 0) / qs.length;
    return { code: p.code, m, n: qs.length, i };
  }).filter(Boolean).sort((a, b) => a.m - b.m || a.i - b.i);
  const out = [];
  let count = 0;
  for (const p of pis) { if (count >= target) break; out.push(p.code); count += p.n; }
  return out;
}

// Same URL contract as Learn's quizHref. plan=drill marks the plan task done when the quiz finishes.
export const drillHref = (pis, n = DRILL_N, plan = false) =>
  `#/quiz?pis=${encodeURIComponent(pis.join(','))}&n=${n}${plan ? '&plan=drill' : ''}`;

// Whole minutes a reel runs at the student's speed (at least 1).
export function videoMinutes(video, speed) {
  return Math.max(1, Math.round(timeline(video.scenes || []).total / snapSpeed(speed) / 60));
}

/* ---------- Today's plan ---------- */

// Up to three tasks for today, built only from the inputs (same state + day = same plan):
// a drill on the focus area, flashcards to learn (at most 20), and one reel (or a lesson when every reel is watched).
export function buildPlan(state, data, level, today) {
  const tasks = [];
  const focus = focusArea(state, data, level);
  if (focus) {
    const pis = drillPis(state, data, focus.id);
    if (pis.length) tasks.push({ id: 'drill', title: `${DRILL_N}-question drill`, sub: focus.name, min: 8, href: drillHref(pis, DRILL_N, true) });
  }
  if (data.CARDS.length) {
    const unknown = unknownCards(data.CARDS, state).length;
    const n = unknown ? Math.min(CARD_CAP, unknown) : Math.min(10, data.CARDS.length);
    tasks.push({
      id: 'cards', title: unknown ? `Learn ${plural(n, 'flashcard')}` : `Review ${plural(n, 'flashcard')}`,
      sub: unknown ? `${unknown} still to learn` : 'You know them all. Keep them fresh',
      min: Math.max(2, Math.round(n / 4)), href: '#/cards', n,
    });
  }
  const [video] = watchPicks(state, data, level, 1);
  if (video) {
    tasks.push({ id: 'reel', title: 'Watch 1 reel', sub: video.title, min: videoMinutes(video, state.settings.reelSpeed),
      href: `#/watch/${encodeURIComponent(video.id)}`, video: video.id });
  } else if (focus) {
    const [pick] = readPicks(state, data, focus.id, 1);
    if (pick) tasks.push({ id: 'read', title: 'Read 1 lesson', sub: pick.lesson.title, min: pick.lesson.minutes || 5,
      href: `#/lesson/${encodeURIComponent(pick.lesson.id)}`, lesson: pick.lesson.id });
  }
  return { date: today, event: data.EVENT.id, tasks: tasks.slice(0, 3) };
}

// Today's plan, kept for the whole day (and event) so it doesn't shift as tasks get done.
// Mutates state.plan when a new day or event needs a fresh plan; the caller saves.
export function ensurePlan(state, data, level, today) {
  const p = state.plan;
  if (p && p.date === today && p.event === data.EVENT.id && p.tasks.length) return p;
  // Switching events mid-day starts a fresh plan, so the old event's checkmarks don't carry over.
  if (p && p.date === today && state.planDone) delete state.planDone[today];
  state.plan = buildPlan(state, data, level, today);
  return state.plan;
}

export const planMinutes = plan => plan.tasks.reduce((t, k) => t + (k.min || 0), 0);
export const isPlanDone = (state, today, id) => !!(state.planDone && state.planDone[today] && state.planDone[today].includes(id));
export const nextTask = (state, plan, today) => plan.tasks.find(t => !isPlanDone(state, today, t.id)) || null;

// Marks a plan task finished today and drops history older than two weeks. Returns true if it changed.
export function markPlanDone(state, today, id) {
  const done = state.planDone || (state.planDone = {});
  for (const k of Object.keys(done)) if (dayNum(today) - dayNum(k) >= PLAN_KEEP_DAYS) delete done[k];
  const list = done[today] || (done[today] = []);
  if (list.includes(id)) return false;
  list.push(id);
  return true;
}

// Checks today's plan against what the student has done: enough flashcards answered today, the reel
// finished, the lesson opened today. (The drill is marked by the quiz itself.) Returns true if anything changed.
export function notePlanProgress(state, today) {
  const plan = state.plan;
  if (!plan || plan.date !== today) return false;
  const onToday = ms => Number.isFinite(ms) && ms > 0 && ymd(new Date(ms)) === today;
  let changed = false;
  for (const t of plan.tasks) {
    if (isPlanDone(state, today, t.id)) continue;
    let done = false;
    if (t.id === 'cards') done = Object.values(state.cards).filter(c => onToday(c.last)).length >= (t.n || 1);
    else if (t.id === 'reel') done = !!(t.video && state.watched && state.watched[t.video]);
    else if (t.id === 'read') done = !!(t.lesson && state.read && onToday(state.read[t.lesson]));
    if (done) changed = markPlanDone(state, today, t.id) || changed;
  }
  return changed;
}

/* ---------- Watched and read ---------- */

// Records a finished reel (first time only). Returns true if it was new.
export function markWatched(state, id, now = Date.now()) {
  const w = state.watched || (state.watched = {});
  if (w[id]) return false;
  w[id] = now;
  return true;
}

// Records that a lesson was opened (latest time).
export function markRead(state, id, now = Date.now()) {
  (state.read || (state.read = {}))[id] = now;
}

// The most recently opened lesson that is in this event, or null.
export function lastRead(state, data) {
  const read = state.read || {};
  let best = null;
  for (const l of data.LESSONS) if (read[l.id] && (!best || read[l.id] > read[best.id])) best = l;
  return best;
}

/* ---------- Readiness log ---------- */

// Stores today's readiness % and keeps only the last 60 days. Returns true if the log changed.
export function logReadiness(state, today, pct) {
  const log = state.readinessLog || (state.readinessLog = {});
  const v = Math.max(0, Math.min(100, Math.round(pct)));
  let changed = log[today] !== v;
  log[today] = v;
  const t = dayNum(today);
  for (const k of Object.keys(log)) {
    const age = t - dayNum(k);
    if (age >= LOG_DAYS || age < 0) { delete log[k]; changed = true; }
  }
  return changed;
}

// Readiness change versus a week ago: today's snapshot minus the latest one 7 to 13 days old.
// null when either is missing (the "this week" line is hidden then).
export function weeklyDelta(log, today) {
  if (!log || !Number.isFinite(log[today])) return null;
  const t = dayNum(today);
  let base = null, baseDay = -Infinity;
  for (const [k, v] of Object.entries(log)) {
    const age = t - dayNum(k);
    if (age >= 7 && age <= 13 && dayNum(k) > baseDay && Number.isFinite(v)) { base = v; baseDay = dayNum(k); }
  }
  return base == null ? null : log[today] - base;
}

/* ---------- Greeting ---------- */

// "Welcome, Sam" for a brand-new student; "Welcome back, Sam" every time after that.
// No name: the greeting alone. (hour/lastDay/today are accepted for callers but unused.)
export function greeting(name, hour, { fresh = false } = {}) {
  const tail = name ? `, ${name}` : '';
  return (fresh ? 'Welcome' : 'Welcome back') + tail;
}

// A student is new until they've answered a question, reviewed a card or taken a mock exam.
export const isNewStudent = state =>
  !Object.keys(state.answers).length && !Object.keys(state.cards).length && !state.exams.length;
