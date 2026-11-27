// Chapter leaderboard: pure helpers (payload, throttle, sorting) and the network calls.
// Sharing is opt-in. Every network failure is silent for syncing and returned as a result for the screen.
import { checkName } from './namefilter.js';
import { LEADERBOARD_URL } from './config.js';
import { cleanName, cleanBoardRow, ensureLeaderboardId, localDay } from './store.js';
import { readiness } from './progress.js';
import { eventById } from './event.js';

export const MIN_GAP_MS = 2 * 60 * 1000;   // at most one score upload per 2 minutes
export const FETCH_TIMEOUT_MS = 8000;
const ID_RE = /^[a-zA-Z0-9-]{8,40}$/;
const LEVELS = ['district', 'association', 'icdc'];

/* ---------- Pure helpers ---------- */

// Questions answered over the last 7 local days, today included.
export function weekQuestions(activity, now) {
  if (!activity || typeof activity !== 'object') return 0;
  let sum = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const n = activity[localDay(d.getTime())];
    if (Number.isInteger(n) && n > 0) sum += n;
  }
  return sum;
}

const dayNum = s => { const [y, m, d] = s.split('-').map(Number); return Math.round(Date.UTC(y, m - 1, d) / 86400000); };
// The study streak counts only if the last study day was today or yesterday.
export function liveStreakAt(streak, now) {
  if (!streak || !streak.lastDay) return 0;
  return dayNum(localDay(now)) - dayNum(streak.lastDay) <= 1 ? streak.count : 0;
}

// The name shown on the board: the nickname, else the student's name. '' when neither is set.
export function boardName(state) {
  const lb = state.leaderboard || {};
  return cleanName(String(lb.nickname || '').replace(/[<>]/g, '')) || cleanName(String((state.settings || {}).name || '').replace(/[<>]/g, ''));
}

// The JSON the server stores, or null when there's nothing valid to send (no name, no id).
export function buildPayload(state, eventId, readinessPct, now) {
  const name = boardName(state);
  const lb = state.leaderboard || {};
  if (!name || !ID_RE.test(lb.id || '') || !checkName(name).ok) return null;
  const pct = Number.isFinite(readinessPct) ? Math.max(0, Math.min(100, Math.round(readinessPct))) : 0;
  let total = 0;
  for (const a of Object.values(state.answers || {})) total += Number.isInteger(a && a.n) ? a.n : 0;
  return {
    id: lb.id, name, event: eventById(eventId) ? eventId : '',
    readiness: pct, weekQuestions: weekQuestions(state.activity, now),
    streak: liveStreakAt(state.streak, now), totalAnswered: Math.min(100000, total),
  };
}

// Upload only when joined, online, and 2 minutes after the last upload (force skips the wait).
export function shouldSend({ optIn, online, lastSent, now, force = false }) {
  if (!optIn || !online) return false;
  if (force) return true;
  return !(lastSent > 0 && now >= lastSent && now - lastSent < MIN_GAP_MS);
}

const ev = id => { const e = eventById(id); return e ? e.short : ''; };
export const eventShort = ev;

// Rows of one tab, best first. mode: 'week' (questions this week) or 'ready' (readiness).
// Ties fall back to the other number, then the name, so the order never jumps around.
export function sortRows(rows, mode) {
  const [a, b] = mode === 'ready' ? ['readiness', 'weekQuestions'] : ['weekQuestions', 'readiness'];
  return rows.slice().sort((x, y) => y[a] - x[a] || y[b] - x[b] || x.name.localeCompare(y.name));
}
// One row per name (case and spacing ignored): the same student can end up with two rows after a
// reinstall or switching between Safari and the installed app. Keeps the most recently updated one.
export function dedupeRows(rows) {
  const best = new Map();
  for (const r of rows) {
    const key = String(r.name || '').toLowerCase().replace(/\s+/g, ' ').trim();
    if (!key) continue;
    const have = best.get(key);
    if (!have || (r.updated || 0) > (have.updated || 0)) best.set(key, r);
  }
  return rows.filter(r => best.get(String(r.name || '').toLowerCase().replace(/\s+/g, ' ').trim()) === r);
}
export const filterRows = (rows, eventId) => (eventId ? rows.filter(r => r.event === eventId) : rows.slice());

// True when a board row is this student's (same shown name and event).
export function isMe(row, state, eventId) {
  const me = boardName(state);
  return !!me && row.name.toLowerCase() === me.toLowerCase() && row.event === eventId;
}

// The student's 1-based place on the all-events board for `mode`, or 0 when they aren't on it.
export function myRank(rows, state, eventId, mode = 'week') {
  const i = sortRows(dedupeRows(rows), mode).findIndex(r => isMe(r, state, eventId));
  return i + 1;
}

// "just now", "5 min ago", "2 h ago", "3 days ago"
export function timeAgo(at, now) {
  if (!at) return '';
  const min = Math.floor(Math.max(0, now - at) / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min} min ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} h ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d === 1 ? '' : 's'} ago`;
}

/* ---------- Network ---------- */

const currentLevel = state => (LEVELS.includes(state.settings.level) ? state.settings.level : 'district');

// fetch() with a timeout where AbortController exists.
async function request(fetchFn, url, init, timeoutMs) {
  let timer = null;
  const opts = { ...init };
  if (typeof AbortController === 'function' && typeof setTimeout === 'function') {
    const ctl = new AbortController();
    opts.signal = ctl.signal;
    timer = setTimeout(() => ctl.abort(), timeoutMs);
  }
  try {
    const res = await fetchFn(url, opts);
    if (!res || !res.ok) throw new Error('HTTP error');
    return await res.json();
  } finally { if (timer) clearTimeout(timer); }
}

// text/plain keeps the POST a "simple" request, so the browser sends no CORS preflight.
const post = (fetchFn, body) => request(fetchFn, LEADERBOARD_URL,
  { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(body) }, FETCH_TIMEOUT_MS);

const online = () => typeof navigator === 'undefined' || navigator.onLine !== false;
let sending = false;

/**
 * Uploads the student's score when allowed (see shouldSend). ctx: {state, data, save}.
 * Never throws: resolves true when sent, false when skipped or failed (retried at the next study action or app open).
 * opts: {force, now, fetchFn, isOnline}.
 */
export async function syncScore(ctx, opts = {}) {
  try {
    const { state } = ctx;
    const now = opts.now ?? Date.now();
    const fetchFn = opts.fetchFn || globalThis.fetch;
    const lb = state.leaderboard;
    const isOn = opts.isOnline !== undefined ? opts.isOnline : online();
    if (sending || typeof fetchFn !== 'function') return false;
    if (!shouldSend({ optIn: lb.optIn, online: isOn, lastSent: lb.lastSent, now, force: !!opts.force })) return false;
    const { QUESTIONS, BLUEPRINT } = ctx.data;
    const pct = readiness(state, currentLevel(state), QUESTIONS, BLUEPRINT, now);
    const payload = buildPayload(state, state.settings.event, pct, now);
    if (!payload) return false;
    sending = true;
    try {
      const out = await post(fetchFn, payload);
      if (!out || out.ok !== true) return false;
    } finally { sending = false; }
    state.leaderboard.lastSent = now;
    ctx.save();
    return true;
  } catch (e) { return false; }
}

/**
 * GETs the board, keeps it in state.leaderboard.cache, and returns {rows, at}. Throws on failure
 * (the screen then falls back to the cache). opts: {now, fetchFn, timeoutMs}.
 */
export async function fetchBoard(ctx, opts = {}) {
  const fetchFn = opts.fetchFn || globalThis.fetch;
  const data = await request(fetchFn, LEADERBOARD_URL, { method: 'GET' }, opts.timeoutMs || FETCH_TIMEOUT_MS);
  if (!data || data.ok !== true || !Array.isArray(data.rows)) throw new Error('Bad response');
  const rows = dedupeRows(data.rows.slice(0, 500).map(cleanBoardRow).filter(Boolean));
  const at = opts.now ?? Date.now();
  ctx.state.leaderboard.cache = { rows, at };
  ctx.save();
  return { rows, at };
}

/**
 * Takes the student off the board: tells the server to delete their row, then turns sharing off.
 * Sharing stops locally even if the server can't be reached; returns whether the server confirmed.
 */
export async function optOut(ctx, opts = {}) {
  const lb = ctx.state.leaderboard;
  const fetchFn = opts.fetchFn || globalThis.fetch;
  let removed = false;
  try {
    if (!lb.id) removed = true; // never uploaded anything
    else { const out = await post(fetchFn, { id: ensureLeaderboardId(ctx.state), optOut: true }); removed = !!out && out.ok === true; }
  } catch (e) { removed = false; }
  lb.optIn = false;
  lb.lastSent = 0;
  ctx.save();
  return removed;
}
