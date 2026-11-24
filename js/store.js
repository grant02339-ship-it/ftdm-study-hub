// Progress state: load/save (never throws), record answers, export/import backups.
import { EVENTS, DEFAULT_EVENT } from '../data/events.js';
export const STORAGE_KEY = 'ftdm.v1';
export const BAD_BACKUP = "That file isn't a DECA Study Buddy backup.";

export function defaultState() {
  return {
    v: 1,
    answers: {},   // qid -> {n, correct, last (bool, latest attempt), at (ms)}
    cards: {},     // cid -> {known, seen, last (ms)}
    exams: [],     // [{date, level, score, byArea}]
    activeExam: null,
    settings: { event: DEFAULT_EVENT, level: 'district', confDate: null, theme: 'auto', narrate: true, reelSpeed: 1.25, seenEventPrompt: 0 },
    streak: { count: 0, lastDay: null },
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

const fixAnswer = a => {
  if (!isObj(a)) return null;
  const n = nat(a.n);
  return { n, correct: Math.min(n, nat(a.correct)), last: a.last === true, at: fin(a.at) ? a.at : 0 };
};
// {known, seen, last}. Old Leitner entries {box, due} migrate: box >= 2 counts as known.
const fixCard = c => {
  if (!isObj(c)) return null;
  const known = typeof c.known === 'boolean' ? c.known : nat(c.box) >= 2;
  return { known, seen: nat(c.seen), last: fin(c.last) && c.last >= 0 ? c.last : 0 };
};
const fixArea = s => (isObj(s) && fin(s.correct) && fin(s.total) ? { correct: s.correct, total: s.total } : null);
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
  const prev = state.answers[q.id] || { n: 0, correct: 0 };
  state.answers[q.id] = { n: prev.n + 1, correct: prev.correct + (correct ? 1 : 0), last: !!correct, at: now };
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
