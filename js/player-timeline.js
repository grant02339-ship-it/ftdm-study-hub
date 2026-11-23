// Pure helpers for the video lesson player: timing, captions, easing, number formatting,
// chart ticks and diagram layering. No DOM, so it runs under the headless tests.

const DEFAULT_DUR = 3;

// scenes: [{dur}] -> {total, starts[], durs[]} (seconds). A missing or bad dur counts as 3s.
export function timeline(scenes) {
  const durs = (scenes || []).map(s => {
    const d = Number(s && s.dur);
    return Number.isFinite(d) && d > 0 ? d : DEFAULT_DUR;
  });
  const starts = [];
  let total = 0;
  for (const d of durs) { starts.push(total); total += d; }
  return { total, starts, durs };
}

// -> {index, local (seconds into the scene), progress (0..1)}. Times outside 0..total clamp.
export function sceneAt(tl, t) {
  const n = tl.durs.length;
  if (!n) return { index: 0, local: 0, progress: 0 };
  const time = Number.isNaN(t) ? 0 : Math.min(Math.max(t, 0), tl.total);
  if (time >= tl.total) return { index: n - 1, local: tl.durs[n - 1], progress: 1 };
  let lo = 0, hi = n - 1; // last start <= time
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (tl.starts[mid] <= time) lo = mid; else hi = mid - 1;
  }
  const local = time - tl.starts[lo];
  return { index: lo, local, progress: Math.min(1, local / tl.durs[lo]) };
}

// True when the browser exposes speech synthesis. Voices may still load later (or never offline),
// so the player also waits for at least one English voice before showing the narration toggle.
export function canNarrate(win) {
  try {
    return !!(win && win.speechSynthesis && typeof win.speechSynthesis.speak === 'function'
      && typeof win.SpeechSynthesisUtterance === 'function');
  } catch (e) {
    return false;
  }
}

// Default narration rate (multiplied by the playback speed): a touch quicker than the engine default.
export const TTS_RATE = 1.05;

// Natural-sounding voices that ship with Apple, Google and Microsoft platforms.
const NATURAL = [/\b(Ava|Zoe|Samantha|Evan|Nathan|Allison|Susan|Joelle|Noelle)\b/i, /Google US English/i, /Microsoft .*Online \(Natural\)/i];

// Classic clear system voices: the fallback when no natural voice is installed.
const CLASSIC = /\b(Daniel|Karen|Moira|Tessa|Alex|Fiona|Victoria|Rishi|Veena|Serena|Kate|Oliver|Arthur|Martha|Catherine|Gordon|Lee)\b/i;
// macOS novelty and character voices: never used for lessons.
const NOVELTY = /^(Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Wobble|Fred|Good News|Jester|Junior|Organ|Superstar|Ralph|Trinoids|Whisper|Zarvox|Grandma|Grandpa|Rocko|Eddy|Flo|Reed|Sandy|Shelley|Deranged|Hysterical|Pipe Organ)\b/i;

// Best English voice: "Premium" > "Enhanced" > known natural voices > classic voices > other
// English voices; then en-US, on-device and the system default break ties. Novelty voices never.
export function pickVoice(voices) {
  let best = null, bestScore = -1;
  for (const v of voices || []) {
    const lang = String(v && v.lang || '').replace('_', '-').toLowerCase();
    if (!lang.startsWith('en')) continue;
    const name = String(v.name || '');
    if (NOVELTY.test(name.trim())) continue;
    const score = (/premium/i.test(name) ? 40 : /enhanced/i.test(name) ? 30 : NATURAL.some(re => re.test(name)) ? 20 : CLASSIC.test(name) ? 10 : 0)
      + (lang === 'en-us' ? 4 : 0) + (v.localService ? 2 : 0) + (v.default ? 1 : 0);
    if (score > bestScore) { best = v; bestScore = score; }
  }
  return best;
}

export function fmtTime(s) {
  const sec = Math.max(0, Math.floor(Number(s) || 0));
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
}

/* ---------- Captions ---------- */

// Sentence ends: . ! ? followed by space and a capital or digit, not after a lone letter ("U.S. Then").
function sentences(text) {
  const out = [];
  let from = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch !== '.' && ch !== '!' && ch !== '?') continue;
    if (!/\s/.test(text[i + 1] || '')) continue;
    let j = i + 1;
    while (j < text.length && /\s/.test(text[j])) j++;
    if (j < text.length && !/[A-Z0-9"“]/.test(text[j])) continue;
    if (ch === '.' && /(^|[\s.])[A-Za-z]$/.test(text.slice(Math.max(0, i - 2), i))) continue;
    out.push([from, j]);
    from = j;
  }
  if (from < text.length) out.push([from, text.length]);
  return out;
}

// Split [a,b) of text near its middle, preferring ", " then a space. Returns [[a,m],[m,b]].
function halve(text, a, b) {
  const mid = (a + b) / 2;
  let cut = -1, best = Infinity;
  for (const re of [/, /g, / /g]) {
    re.lastIndex = 0;
    const seg = text.slice(a, b);
    let m;
    while ((m = re.exec(seg))) {
      const at = a + m.index + m[0].length;
      if (at <= a || at >= b) continue;
      const d = Math.abs(at - mid);
      if (d < best) { best = d; cut = at; }
    }
    if (cut > 0 && best < (b - a) * 0.3) break; // a comma close enough to the middle wins
  }
  return cut > 0 ? [[a, cut], [cut, b]] : [[a, b]];
}

// Caption -> [{text, start, end}] pieces of at most `max` characters (start/end are offsets
// into the caption, contiguous, so speech boundary events can pick the matching piece).
export function captionChunks(text, max = 84) {
  const src = String(text || '');
  if (!src.trim()) return [];
  let spans = [];
  for (const s of sentences(src)) {
    const stack = [s];
    while (stack.length) {
      const [a, b] = stack.shift();
      if (src.slice(a, b).trim().length <= max) { spans.push([a, b]); continue; }
      const parts = halve(src, a, b);
      if (parts.length === 1) { spans.push(parts[0]); continue; }
      stack.unshift(...parts);
    }
  }
  // Merge very short neighbours so captions don't flash.
  const merged = [];
  for (const sp of spans) {
    const prev = merged[merged.length - 1];
    if (prev && (src.slice(prev[0], prev[1]).trim().length < 24 || src.slice(sp[0], sp[1]).trim().length < 16)
      && src.slice(prev[0], sp[1]).trim().length <= max) prev[1] = sp[1];
    else merged.push([sp[0], sp[1]]);
  }
  spans = merged;
  spans[0][0] = 0;
  spans[spans.length - 1][1] = src.length;
  return spans.map(([a, b]) => ({ text: src.slice(a, b).trim().replace(/\s+/g, ' '), start: a, end: b }));
}

// Index of the chunk that holds the given fraction (0..1) of the caption's characters.
export function chunkAt(chunks, frac) {
  if (!chunks.length) return -1;
  const total = chunks[chunks.length - 1].end;
  return chunkAtChar(chunks, Math.min(Math.max(frac, 0), 1) * total);
}

export function chunkAtChar(chunks, ch) {
  if (!chunks.length) return -1;
  for (let i = 0; i < chunks.length; i++) if (ch < chunks[i].end) return i;
  return chunks.length - 1;
}

// Words with their character offsets in the caption: [{text, start, end}].
export function wordSpans(text) {
  const out = [];
  const re = /\S+/g;
  let m;
  const src = String(text || '');
  while ((m = re.exec(src))) out.push({ text: m[0], start: m.index, end: m.index + m[0].length });
  return out;
}

// Estimated start time of each word between t0 and t1, weighted by length plus a beat after punctuation.
export function wordTimes(words, t0, t1) {
  const w = words.map(x => x.text.length + 2 + (/[.,!?;:]$/.test(x.text) ? 3 : 0));
  const total = w.reduce((a, b) => a + b, 0) || 1;
  const out = [];
  let acc = 0;
  for (const x of w) { out.push(t0 + ((t1 - t0) * acc) / total); acc += x; }
  return out;
}

// Index of the last word that has started at time t (-1 before the first).
export function wordIndexAt(times, t) {
  let idx = -1;
  for (let i = 0; i < times.length; i++) { if (times[i] <= t) idx = i; else break; }
  return idx;
}

// Index of the word that contains (or last started before) character ch.
export function wordIndexAtChar(words, ch) {
  let idx = -1;
  for (let i = 0; i < words.length; i++) { if (words[i].start <= ch) idx = i; else break; }
  return idx;
}

/* ---------- Feed and gestures ---------- */

// Reels feed: videos of the opened video's area (in VIDEOS order), then everything else.
export function feedOrder(videos, id) {
  const all = videos || [];
  const open = all.find(v => v.id === id);
  const list = open ? [...all.filter(v => v.area === open.area), ...all.filter(v => v.area !== open.area)] : all.slice();
  return { list, index: open ? list.indexOf(open) : -1 };
}

// Stories-style tap zones: left third = previous scene, right third = next, middle = play/pause.
export function tapZone(x, width) {
  if (!(width > 0)) return 'center';
  if (x < width / 3) return 'prev';
  if (x > (width * 2) / 3) return 'next';
  return 'center';
}

/* ---------- Easing ---------- */

export const clamp01 = x => (x < 0 ? 0 : x > 1 ? 1 : x);
// Progress of a step that starts at `start` and lasts `len` seconds, at time `t`.
export const seg = (t, start, len) => clamp01((t - start) / (len || 1e-6));
export const lerp = (a, b, p) => a + (b - a) * p;

// CSS-style cubic-bezier timing function (x1,y1,x2,y2) -> f(t).
export function cubicBezier(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sx = u => ((ax * u + bx) * u + cx) * u;
  const sy = u => ((ay * u + by) * u + cy) * u;
  const dx = u => (3 * ax * u + 2 * bx) * u + cx;
  return function (t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    let u = t;
    for (let i = 0; i < 8; i++) {
      const err = sx(u) - t;
      if (Math.abs(err) < 1e-6) return sy(u);
      const d = dx(u);
      if (Math.abs(d) < 1e-6) break;
      u -= err / d;
    }
    let lo = 0, hi = 1; u = t; // bisection fallback
    for (let i = 0; i < 30; i++) {
      const x = sx(u);
      if (Math.abs(x - t) < 1e-6) break;
      if (x < t) lo = u; else hi = u;
      u = (lo + hi) / 2;
    }
    return sy(u);
  };
}

// The app's spring curve (matches --spring in app.css).
export const spring = cubicBezier(0.32, 0.72, 0, 1);
export const easeOutCubic = t => 1 - Math.pow(1 - clamp01(t), 3);
export function easeOutBack(t, s = 1.70158) {
  const x = clamp01(t) - 1;
  return 1 + (s + 1) * x * x * x + s * x * x;
}

/* ---------- Numbers ---------- */

// Unit from an axis label: a trailing "(...)" wins, else the word "percent".
export function unitOf(label) {
  const s = String(label || '');
  const m = s.match(/\(([^()]*)\)\s*$/);
  if (m) {
    if (m[1].includes('$')) return '$';
    if (m[1].includes('%')) return '%';
  }
  if (/percent/i.test(s)) return '%';
  return '';
}

function trimNum(n, maxFrac) {
  return n.toLocaleString('en-US', { maximumFractionDigits: maxFrac });
}

// 1234,'$' -> $1,234 · 12,'%' -> 12% · compact: 500000,'$' -> $500K
export function fmtValue(v, unit = '', compact = false) {
  const n = Number(v) || 0;
  const neg = n < 0 ? '-' : '';
  const a = Math.abs(n);
  let body;
  if (compact && a >= 10000) {
    body = a >= 1e9 ? trimNum(a / 1e9, 1) + 'B' : a >= 1e6 ? trimNum(a / 1e6, 1) + 'M' : trimNum(a / 1e3, 1) + 'K';
  } else if (unit === '$') {
    body = trimNum(a, a >= 100 ? 0 : 2);
  } else {
    body = trimNum(a, a >= 100 ? 0 : 2);
  }
  if (unit === '$') return `${neg}$${body}`;
  if (unit === '%') return `${neg}${body}%`;
  return neg + body;
}

// Round axis ticks from lo to at least hi, about `count` of them.
export function niceTicks(lo, hi, count = 5) {
  if (!(hi > lo)) hi = lo + 1;
  const raw = (hi - lo) / Math.max(1, count - 1);
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= raw) || 10 * mag;
  const start = Math.floor(lo / step) * step;
  const ticks = [];
  for (let v = start; v < hi + step * 0.999; v += step) ticks.push(Math.round(v / step) * step);
  if (ticks[ticks.length - 1] < hi) ticks.push(ticks[ticks.length - 1] + step);
  return ticks;
}

/* ---------- Diagram layering ---------- */

// ids: node ids in authored order. edges: [[from, to, label?]].
// -> {rank: {id: layer}, back: [edge indexes that close a cycle]}.
// Back edges are ignored for ranking (drawn as return arcs). Sources sit just before their first target.
export function layers(ids, edges) {
  const known = new Set(ids);
  const valid = (edges || []).map((e, i) => ({ i, a: e[0], b: e[1] }))
    .filter(e => known.has(e.a) && known.has(e.b) && e.a !== e.b);
  const rank = {};
  if (!valid.length) { ids.forEach((id, i) => { rank[id] = i; }); return { rank, back: [] }; }

  const out = new Map(ids.map(id => [id, []]));
  for (const e of valid) out.get(e.a).push(e);
  const back = [];
  const state = new Map(); // 1 = on stack, 2 = done
  const visit = id => {
    state.set(id, 1);
    for (const e of out.get(id)) {
      const s = state.get(e.b);
      if (s === 1) back.push(e.i);
      else if (!s) visit(e.b);
    }
    state.set(id, 2);
  };
  for (const id of ids) if (!state.get(id)) visit(id);

  const fwd = valid.filter(e => !back.includes(e.i));
  for (const id of ids) rank[id] = 0;
  for (let pass = 0; pass < ids.length; pass++) { // longest path from sources
    let changed = false;
    for (const e of fwd) if (rank[e.b] < rank[e.a] + 1) { rank[e.b] = rank[e.a] + 1; changed = true; }
    if (!changed) break;
  }
  const hasIn = new Set(fwd.map(e => e.b));
  for (const id of ids) {
    if (hasIn.has(id)) continue;
    const targets = fwd.filter(e => e.a === id).map(e => rank[e.b]);
    if (targets.length) rank[id] = Math.max(0, Math.min(...targets) - 1);
  }
  back.sort((x, y) => x - y);
  return { rank, back };
}
