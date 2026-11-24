// Progress state: load/save (never throws), record answers, export/import backups.
import { EVENTS, DEFAULT_EVENT } from '../data/events.js';
export const STORAGE_KEY = 'ftdm.v1';
export const BAD_BACKUP = "That file isn't a DECA Study Buddy backup.";

export function defaultState() {
  return {
    v: 1,
    answers: {},   // qid -> {n, correct, last (bool, latest attempt), at (ms), streak, days (<=5 local dates answered right), wrongAt (ms)}
    cards: {},     // cid -> {known, seen, last (ms)}
    exams: [],     // [{date, level, score, byArea}]
    activeExam: null,
    settings: { event: DEFAULT_EVENT, level: 'district', confDate: null, theme: 'auto', narrate: true, reelSpeed: 1.25, seenEventPrompt: 0, name: '', askedName: 0 },
    streak: { count: 0, lastDay: null },
    watched: {},      // videoId -> ms when the reel was finished (ended or 80% viewed)
    read: {},         // lessonId -> ms the lesson was last opened
    readinessLog: {}, // 'YYYY-MM-DD' -> readiness % that day (last 60 days)
    planDone: {},     // 'YYYY-MM-DD' -> [task ids finished from Today's plan]
    plan: null,       // {date, event, tasks:[{id, title, sub, min, href, n?, video?, lesson?}]} for today
    activity: {},     // 'YYYY-MM-DD' -> questions answered that local day (last 60 days)
    // Chapter leaderboard: opt-in only. id is made on first join (ensureLeaderboardId); cache holds the last board fetched.
    leaderboard: { optIn: false, nickname: '', id: '', asked: false, lastSent: 0, cache: { rows: [], at: 0 } },
  };
}

const isObj = v => v !== null && typeof v === 'object' && !Array.isArray(v);
const fin = v => typeof v === 'number' && Number.isFinite(v);
const nat = v => (Number.isInteger(v) && v >= 0 ? v : 0);
const isDay = v => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v);
const LEVELS = ['district', 'association', 'icdc'];
const THEMES = ['auto', 'dark', 'light'];
const EVENT_IDS = EVENTS.map(e => e.id);

// Copies the object entries `fix` accepts (fix returns a clean value, or null to drop it).
function mapEntries(obj, fix) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (k === '__proto__') continue;
    const clean = fix(v);
    if (clean != null) out[k] = clean;
  }
  return out;
}

const pad2 = n => String(n).padStart(2, '0');
export const localDay = ms => { const d = new Date(ms); return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; };
export const MAX_DAYS = 5;
export const ACTIVITY_DAYS = 60;
const ID_RE = /^[a-zA-Z0-9-]{8,40}$/;

// Old entries had no streak/days: a right last answer counts as a streak of 1 on the day it happened.
const fixAnswer = a => {
  if (!isObj(a)) return null;
  const n = nat(a.n);
  const last = a.last === true;
  const at = fin(a.at) ? a.at : 0;
  const streak = Number.isInteger(a.streak) && a.streak >= 0 ? a.streak : (last ? 1 : 0);
  const days = Array.isArray(a.days)
    ? [...new Set(a.days.filter(isDay))].sort().slice(-MAX_DAYS)
    : (last && at ? [localDay(at)] : []);
  return { n, correct: Math.min(n, nat(a.correct)), last, at, streak: last ? Math.max(streak, 1) : 0, days,
    wrongAt: fin(a.wrongAt) && a.wrongAt >= 0 ? a.wrongAt : 0 };
};
// {known, seen, last}. Old Leitner entries {box, due} migrate: box >= 2 counts as known.
const fixCard = c => {
  if (!isObj(c)) return null;
  const known = typeof c.known === 'boolean' ? c.known : nat(c.box) >= 2;
  return { known, seen: nat(c.seen), last: fin(c.last) && c.last >= 0 ? c.last : 0 };
};
const fixArea = s => (isObj(s) && fin(s.correct) && fin(s.total) ? { correct: s.correct, total: s.total } : null);
const stamps = v => (isObj(v) ? mapEntries(v, t => (fin(t) && t >= 0 ? t : null)) : {});
const PLAN_IDS = ['drill', 'cards', 'reel', 'read'];

// The student's first name: a string of at most 20 characters, control characters removed,
// inner whitespace collapsed and trimmed. Anything else becomes ''. Always rendered as text.
export function cleanName(v) {
  if (typeof v !== 'string') return '';
  // eslint-disable-next-line no-control-regex
  const s = v.replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u2028-\u202E\u2066-\u2069\uFEFF]/g, '').replace(/\s+/g, ' ').trim();
  return [...s].slice(0, 20).join('').trim();
}

function fixLog(v) {
  if (!isObj(v)) return {};
  const out = {};
  for (const [k, pct] of Object.entries(v)) if (isDay(k) && fin(pct)) out[k] = Math.max(0, Math.min(100, Math.round(pct)));
  return out;
}
function fixPlanDone(v) {
  if (!isObj(v)) return {};
  const out = {};
  for (const [k, ids] of Object.entries(v)) {
    if (!isDay(k)) continue;
    const ok = [...new Set(strArr(ids).filter(id => PLAN_IDS.includes(id)))];
    if (ok.length) out[k] = ok;
  }
  return out;
}
const cleanStr = (v, max) => (typeof v === 'string' ? v.slice(0, max) : '');
function fixPlan(p) {
  if (!isObj(p) || !isDay(p.date) || !Array.isArray(p.tasks)) return null;
  const tasks = p.tasks.filter(t => isObj(t) && PLAN_IDS.includes(t.id) && typeof t.href === 'string' && t.href.startsWith('#/'))
    .slice(0, 3).map(t => {
      const out = { id: t.id, title: cleanStr(t.title, 80), sub: cleanStr(t.sub, 120), min: nat(t.min), href: t.href.slice(0, 600) };
      if (Number.isInteger(t.n) && t.n > 0) out.n = t.n;
      if (typeof t.video === 'string') out.video = t.video.slice(0, 80);
      if (typeof t.lesson === 'string') out.lesson = t.lesson.slice(0, 80);
      return out;
    });
  if (!tasks.length) return null;
  return { date: p.date, event: EVENT_IDS.includes(p.event) ? p.event : DEFAULT_EVENT, tasks };
}

const strArr = v => (Array.isArray(v) ? v.filter(x => typeof x === 'string') : []);

// A history record needs a numeric score and total; everything else is coerced to a safe shape.
function fixExam(e) {
  if (!isObj(e) || !fin(e.score) || !fin(e.total)) return null;
  const out = {
    date: isDay(e.date) ? e.date : null,
    at: fin(e.at) ? e.at : 0,
    level: LEVELS.includes(e.level) ? e.level : 'district',
    score: e.score, total: e.total,
    percent: fin(e.percent) ? e.percent : (e.total ? Math.round((e.score / e.total) * 100) : 0),
    byArea: isObj(e.byArea) ? mapEntries(e.byArea, fixArea) : {},
    ids: strArr(e.ids),
    responses: isObj(e.responses) ? mapEntries(e.responses, r => (Number.isInteger(r) ? r : null)) : {},
    flagged: strArr(e.flagged),
  };
  if (fin(e.usedMs)) out.usedMs = e.usedMs;
  if (EVENT_IDS.includes(e.event)) out.event = e.event;
  // Shown choice order per question (array of original indexes), used by the review.
  if (isObj(e.choiceMaps)) {
    out.choiceMaps = mapEntries(e.choiceMaps, m =>
      (Array.isArray(m) && m.every(Number.isInteger) && new Set(m).size === m.length ? m : null));
  }
  return out;
}

// Questions answered per local day: valid dates with positive counts, the newest 60 days.
function fixActivity(v) {
  if (!isObj(v)) return {};
  const days = Object.keys(v).filter(k => isDay(k) && nat(v[k]) > 0).sort().slice(-ACTIVITY_DAYS);
  const out = {};
  for (const k of days) out[k] = v[k];
  return out;
}

// One leaderboard row from the server (or the saved cache). Names come from other people: only ever shown as text.
export function cleanBoardRow(r) {
  if (!isObj(r)) return null;
  const name = cleanName(typeof r.name === 'string' ? r.name.replace(/[<>]/g, '') : '');
  if (!name) return null;
  const num = (v, max) => (fin(v) ? Math.max(0, Math.min(max, Math.round(v))) : 0);
  return {
    name, event: EVENT_IDS.includes(r.event) ? r.event : '',
    readiness: num(r.readiness, 100), weekQuestions: num(r.weekQuestions, 5000),
    streak: num(r.streak, 3650), totalAnswered: num(r.totalAnswered, 100000),
    updated: fin(r.updated) && r.updated >= 0 ? r.updated : 0,
  };
}

function fixLeaderboard(v) {
  const d = defaultState().leaderboard;
  if (!isObj(v)) return d;
  const c = isObj(v.cache) ? v.cache : {};
  return {
    optIn: v.optIn === true,
    nickname: cleanName(v.nickname),
    id: typeof v.id === 'string' && ID_RE.test(v.id) ? v.id : '',
    asked: v.asked === true,
    lastSent: fin(v.lastSent) && v.lastSent >= 0 ? v.lastSent : 0,
    cache: { rows: Array.isArray(c.rows) ? c.rows.slice(0, 500).map(cleanBoardRow).filter(Boolean) : [], at: fin(c.at) && c.at >= 0 ? c.at : 0 },
  };
}

// Makes the random id the first time it's needed (joining the board) and returns it.
export function ensureLeaderboardId(state) {
  const lb = state.leaderboard;
  if (!ID_RE.test(lb.id || '')) {
    let id = '';
    try { id = globalThis.crypto.randomUUID(); } catch (e) { /* older browsers: fall back below */ }
    if (!ID_RE.test(id)) id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.floor(Math.random() * 16); return (c === 'x' ? r : (r & 3) | 8).toString(16); });
    lb.id = id;
  }
  return lb.id;
}

function fixSettings(s) {
  const d = defaultState().settings;
  if (!isObj(s)) return d;
  const out = {
    event: EVENT_IDS.includes(s.event) ? s.event : d.event,
    level: LEVELS.includes(s.level) ? s.level : d.level,
    confDate: isDay(s.confDate) ? s.confDate : null,
    theme: THEMES.includes(s.theme) ? s.theme : d.theme,
    narrate: typeof s.narrate === 'boolean' ? s.narrate : d.narrate,
    reelSpeed: fin(s.reelSpeed) && s.reelSpeed >= 0.75 && s.reelSpeed <= 2 ? s.reelSpeed : d.reelSpeed,
    seenEventPrompt: s.seenEventPrompt === 1 || s.seenEventPrompt === true ? 1 : 0,
    name: cleanName(s.name),
    askedName: s.askedName === 1 || s.askedName === true ? 1 : 0,
  };
  if (typeof s.confName === 'string') out.confName = s.confName.slice(0, 60);
  return out;
}

// Returns a normalized State, or null if `raw` isn't a v1 backup/state. Inner values from a
// hand-edited or corrupt file are coerced or dropped so no screen ever sees a malformed entry.
function normalize(raw) {
  if (!isObj(raw) || raw.v !== 1) return null;
  if (!isObj(raw.answers) || !isObj(raw.cards) || !Array.isArray(raw.exams)) return null;
  const st = isObj(raw.streak) ? raw.streak : {};
  const lastDay = isDay(st.lastDay) ? st.lastDay : null;
  return {
    v: 1,
    answers: mapEntries(raw.answers, fixAnswer),
    cards: mapEntries(raw.cards, fixCard),
    exams: raw.exams.map(fixExam).filter(Boolean),
    activeExam: isObj(raw.activeExam) ? raw.activeExam : null,
    settings: fixSettings(raw.settings),
    streak: { count: lastDay ? nat(st.count) : 0, lastDay },
    watched: stamps(raw.watched),
    read: stamps(raw.read),
    readinessLog: fixLog(raw.readinessLog),
    planDone: fixPlanDone(raw.planDone),
    plan: fixPlan(raw.plan),
    activity: fixActivity(raw.activity),
    leaderboard: fixLeaderboard(raw.leaderboard),
  };
}

// True only when storage is readable and holds no saved state: a brand-new student who still has to pick an event.
export function isFirstLaunch(storage) {
  try { return (storage ?? globalThis.localStorage).getItem(STORAGE_KEY) == null; }
  catch (e) { return false; }
}

// True when saved state exists but the student has not yet seen the "choose your event" sheet.
export function needsEventPrompt(state, storage) {
  if (isFirstLaunch(storage)) return false;
  return !(state && state.settings && state.settings.seenEventPrompt === 1);
}

export function loadState(storage) {
  try {
    // Resolved inside try: merely reading window.localStorage can throw SecurityError.
    const txt = (storage ?? globalThis.localStorage).getItem(STORAGE_KEY);
    if (txt == null) return defaultState();
    return normalize(JSON.parse(txt)) || defaultState();
  } catch (e) {
    return defaultState();
  }
}

// Returns true on success; false if storage is unavailable or full.
export function saveState(state, storage) {
  try { (storage ?? globalThis.localStorage).setItem(STORAGE_KEY, JSON.stringify(state)); return true; }
  catch (e) { return false; }
}

// Records one attempt. Mutates and returns state. Streaks are updated separately (progress.bumpStreak).
export function recordAnswer(state, q, correct, now) {
  const prev = state.answers[q.id] || { n: 0, correct: 0, streak: 0, days: [], wrongAt: 0 };
  // Correct days since the last miss: a miss clears them, so mastery needs two days after it.
  const days = correct && Array.isArray(prev.days) ? prev.days.slice() : [];
  const day = localDay(now);
  if (correct && !days.includes(day)) days.push(day);
  state.answers[q.id] = {
    n: prev.n + 1, correct: prev.correct + (correct ? 1 : 0), last: !!correct, at: now,
    streak: correct ? (prev.streak || 0) + 1 : 0,
    days: days.sort().slice(-MAX_DAYS),
    wrongAt: correct ? (prev.wrongAt || 0) : now,
  };
  // Questions answered today (any answer), for the leaderboard's weekly count.
  if (!isObj(state.activity)) state.activity = {};
  state.activity[day] = nat(state.activity[day]) + 1;
  const oldest = localDay(now - ACTIVITY_DAYS * 86400000);
  for (const k of Object.keys(state.activity)) if (k < oldest) delete state.activity[k];
  return state;
}

export function exportState(state) { return JSON.stringify(state, null, 2); }

// Returns a new State; throws on anything that isn't a backup. Never touches existing state.
export function importState(str) {
  let parsed;
  try { parsed = JSON.parse(str); } catch (e) { throw new Error(BAD_BACKUP); }
  const s = normalize(parsed);
  if (!s) throw new Error(BAD_BACKUP);
  return s;
}
