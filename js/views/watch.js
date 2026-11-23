// Video lessons as a vertical reels feed (#/watch/:id, opened in a sheet).
// Swipe (or wheel / arrow keys) between videos; tap thirds to step scenes; hold to pause.
// Every frame is a pure function of (scene index, seconds into the scene): no CSS animation runs on
// its own clock inside the stage, so scrubbing lands on exactly the frame playback would show.
import { h, icon, reducedMotion } from '../ui.js';
import { quizHref } from './learn.js';
import {
  timeline, sceneAt, canNarrate, pickVoice, captionChunks, chunkAtChar, TTS_RATE,
  wordSpans, wordTimes, wordIndexAt, wordIndexAtChar, feedOrder, tapZone,
  unitOf, fmtValue, niceTicks, layers, seg, clamp01, lerp, spring, easeOutBack, easeOutCubic, cubicBezier,
} from '../player-timeline.js';

const EXIT = 0.4;           // seconds of fade-out at the end of each scene
const REVEAL = 0.75;        // seconds one element takes to settle
const HOLD_MS = 240;        // press longer than this to pause while holding
const AUTO_NEXT_MS = 2200;  // end card time before the next reel
const easeInOut = cubicBezier(0.65, 0, 0.35, 1);
const SVGNS = 'http://www.w3.org/2000/svg';
// A tenth of a second of silence (8 kHz, 8-bit mono WAV) used to unlock the audio element on a tap.
const SILENT_WAV = (() => {
  const n = 800, b = new Uint8Array(44 + n);
  const str = (o, x) => { for (let i = 0; i < x.length; i++) b[o + i] = x.charCodeAt(i); };
  const u32 = (o, v) => { b[o] = v & 255; b[o + 1] = (v >> 8) & 255; b[o + 2] = (v >> 16) & 255; b[o + 3] = (v >>> 24) & 255; };
  str(0, 'RIFF'); u32(4, 36 + n); str(8, 'WAVEfmt '); u32(16, 16); b[20] = 1; b[22] = 1;
  u32(24, 8000); u32(28, 8000); b[32] = 1; b[34] = 8; str(36, 'data'); u32(40, n);
  b.fill(128, 44);
  let bin = ''; for (const x of b) bin += String.fromCharCode(x);
  return 'data:audio/wav;base64,' + btoa(bin);
})();
let uid = 0;
let RM = false; // reduced motion, read when a player mounts

/* ---------- Styles ---------- */

const CSS_HREF = new URL('../../css/player.css', import.meta.url).href;
function ensureStyles() {
  const existing = document.querySelector('link[data-player-css]');
  if (existing) return existing.dataset.loaded ? Promise.resolve() : existing._ready;
  const link = h('link', { rel: 'stylesheet', href: CSS_HREF, 'data-player-css': '' });
  link._ready = new Promise(resolve => {
    const done = () => { link.dataset.loaded = '1'; resolve(); };
    link.addEventListener('load', done);
    link.addEventListener('error', done);
    setTimeout(done, 1500);
  });
  document.head.append(link);
  return link._ready;
}

/* ---------- Small helpers ---------- */

function s(tag, attrs, ...kids) {
  const el = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs || {})) if (v != null) el.setAttribute(k, v);
  for (const c of kids.flat()) if (c != null) el.append(c.nodeType ? c : document.createTextNode(String(c)));
  return el;
}

const GLYPHS = {
  play: '<path d="M8 5.6v12.8a1.2 1.2 0 001.8 1l10.4-6.4a1.2 1.2 0 000-2L9.8 4.6A1.2 1.2 0 008 5.6z" fill="currentColor"/>',
  pause: '<rect x="6" y="5" width="4.2" height="14" rx="1.4" fill="currentColor"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.4" fill="currentColor"/>',
  back: '<path d="M11 4.5A8 8 0 1 1 4 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M11 1.5v6l-4-3z" fill="currentColor"/><text x="12.4" y="15.6" text-anchor="middle" font-size="7.4" font-weight="700" fill="currentColor" font-family="ui-rounded, system-ui">10</text>',
  fwd: '<path d="M13 4.5A8 8 0 1 0 20 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M13 1.5v6l4-3z" fill="currentColor"/><text x="11.6" y="15.6" text-anchor="middle" font-size="7.4" font-weight="700" fill="currentColor" font-family="ui-rounded, system-ui">10</text>',
  cc: '<rect x="2.5" y="5" width="19" height="14" rx="3.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10.5 10.2a2.2 2.2 0 1 0 0 3.6M17 10.2a2.2 2.2 0 1 0 0 3.6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  voice: '<path d="M4 9.5v5h3.2l4.8 4V5.5l-4.8 4z" fill="currentColor"/><path d="M15.5 9a4 4 0 010 6M18 6.5a7.5 7.5 0 010 11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  replay: '<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M5 2.8v4.6h4.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  more: '<circle cx="6" cy="12" r="1.9" fill="currentColor"/><circle cx="12" cy="12" r="1.9" fill="currentColor"/><circle cx="18" cy="12" r="1.9" fill="currentColor"/>',
  mute: '<path d="M4 9.5v5h3.2l4.8 4V5.5l-4.8 4z" fill="currentColor"/><path d="M16 9.5l5 5M21 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  up: '<path d="M6 14.5l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  down: '<path d="M6 9.5l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  practice: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M8 12.2l2.8 2.8L16.2 9.4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
};
function glyph(name) {
  const t = document.createElement('template');
  t.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${GLYPHS[name]}</svg>`;
  return t.content.firstElementChild;
}

// Start times for n staged reveals, paced across the scene so they follow the narration.
function spread(n, dur, { lead = 0.08, span = 0.72, minGap = 0.16, maxGap = 3 } = {}) {
  if (n <= 0) return [];
  const usable = Math.max(0.6, (dur - EXIT) * span - lead);
  const gap = Math.min(maxGap, Math.max(minGap, n > 1 ? usable / (n - 1) : 0));
  return Array.from({ length: n }, (_, i) => lead + i * gap);
}

// Style an element for reveal progress p (0..1). Offsets are in em so they scale with the stage.
function show(el, p, { x = 0, y = 0.6, scale = 1, back = false } = {}) {
  if (RM) {
    el.style.opacity = p > 0 ? String(Math.min(1, p * 4)) : '0';
    el.style.transform = '';
    return;
  }
  const e = back ? easeOutBack(p, 1.4) : spring(p);
  el.style.opacity = String(clamp01(p * 1.8));
  const sc = lerp(scale, 1, e);
  el.style.transform = p >= 1 ? '' : `translate3d(${(x * (1 - e)).toFixed(3)}em,${(y * (1 - e)).toFixed(3)}em,0)${sc !== 1 ? ` scale(${sc.toFixed(4)})` : ''}`;
}

const instant = p => (RM ? (p > 0 ? 1 : 0) : p);

function sceneLabel(sc) {
  const d = sc.data || {};
  switch (sc.kind) {
    case 'title': return d.title || 'Introduction';
    case 'bullets': return d.heading || 'Key points';
    case 'formula': return d.label || 'Formula';
    case 'chart': return d.title || 'Chart';
    case 'diagram': {
      const n = (d.nodes || []).map(x => x.label);
      return n.length ? `${n[0]} → ${n[n.length - 1]}` : 'Diagram';
    }
    case 'compare': return d.left && d.right ? `${d.left.title} vs. ${d.right.title}` : 'Compare';
    case 'example': return 'Worked example';
    default: return 'Scene';
  }
}

/* ---------- Scenes: build(scene, env) -> {el, update(local), layout?(w,h), box?} ---------- */

function buildTitle(sc, env) {
  const d = sc.data || {};
  const words = String(d.title || '').split(/\s+/).filter(Boolean)
    .map(w => h('span', { class: 'vs-w' }, h('span', null, w)));
  const big = h('h2', { class: 'vs-big' }, words.flatMap((w, i) => (i ? [' ', w] : [w])));
  const kicker = h('div', { class: 'vs-kicker' }, env.areaName || 'Video lesson');
  const rule = h('div', { class: 'vs-rule' });
  const sub = d.subtitle ? h('p', { class: 'vs-subtitle' }, d.subtitle) : null;
  const el = h('div', { class: 'vs vs-title' }, kicker, big, rule, sub);
  const wStart = 0.18, wGap = Math.min(0.11, 0.9 / Math.max(1, words.length));
  const after = wStart + words.length * wGap + 0.2;
  return {
    el,
    update(t) {
      show(kicker, seg(t, 0.05, REVEAL), { y: 0.4 });
      words.forEach((w, i) => {
        const p = seg(t, wStart + i * wGap, 0.9);
        const inner = w.firstChild;
        if (RM) { inner.style.opacity = p > 0 ? '1' : '0'; inner.style.transform = ''; return; }
        const e = spring(p);
        inner.style.opacity = String(clamp01(p * 2.5));
        inner.style.transform = p >= 1 ? '' : `translate3d(0,${(105 * (1 - e)).toFixed(2)}%,0)`;
      });
      if (!RM) big.style.transform = `scale(${lerp(1.045, 1, easeOutCubic(seg(t, 0, 3))).toFixed(4)})`;
      const rp = instant(seg(t, after, 0.9));
      rule.style.transform = `scaleX(${RM ? rp : spring(rp)})`;
      if (sub) show(sub, seg(t, after + 0.15, REVEAL), { y: 0.5 });
    },
  };
}

function buildBullets(sc) {
  const d = sc.data || {};
  const items = (d.items || []).map(txt => {
    const dot = h('span', { class: 'vs-dot', 'aria-hidden': 'true' });
    const text = h('span', { class: 'vs-li-t' }, txt);
    return { li: h('li', null, dot, text), dot, text };
  });
  const head = h('h3', { class: 'vs-h' }, d.heading || '');
  const el = h('div', { class: 'vs vs-bullets' }, head, h('ul', { class: 'vs-ul' }, items.map(i => i.li)));
  const times = spread(items.length, sc._dur, { lead: 0.55, span: 0.8 });
  return {
    el,
    update(t) {
      show(head, seg(t, 0.05, REVEAL), { y: 0.5 });
      items.forEach((it, i) => {
        const p = seg(t, times[i], REVEAL);
        show(it.text, p, { x: -0.7, y: 0 });
        const dp = seg(t, times[i] - 0.05, 0.6);
        it.dot.style.opacity = dp > 0 ? '1' : '0';
        it.dot.style.transform = RM ? '' : `scale(${easeOutBack(dp, 2.2).toFixed(3)})`;
        // the newest item's dot glows briefly, then settles
        const glow = RM ? 0 : (1 - seg(t, times[i] + 0.4, 1.4)) * (dp > 0 ? 1 : 0);
        it.dot.style.boxShadow = glow > 0.01 ? `0 0 0 ${(0.32 * glow).toFixed(3)}em rgba(240,122,52,${(0.28 * glow).toFixed(3)})` : '';
      });
    },
  };
}

const OPS = new Set(['=', '×', '÷', '+', '−', '-', '*', '/', '≈', 'x']);

function buildFormula(sc) {
  const d = sc.data || {};
  const toks = (d.tokens || []).map(tk => h('span', { class: 'vs-tok' + (OPS.has(String(tk).trim()) ? ' op' : '') }, tk));
  const label = d.label ? h('div', { class: 'vs-flabel' }, d.label) : null;
  const result = d.result ? h('div', { class: 'vs-result' }, d.result) : null;
  // With no result line, the defined term (left of "=") lights up instead.
  const eq = toks.findIndex(x => x.textContent.trim() === '=');
  const hero = result ? null : (eq > 0 ? toks[0] : toks[toks.length - 1]);
  const el = h('div', { class: 'vs vs-formula' }, label, h('div', { class: 'vs-toks' }, toks), result);
  const times = spread(toks.length, sc._dur, { lead: 0.45, span: result ? 0.42 : 0.55, minGap: 0.14, maxGap: 0.9 });
  const endTok = (times[times.length - 1] || 0.4) + REVEAL * 0.8;
  const resAt = Math.min(Math.max(endTok + 0.3, sc._dur * 0.5), sc._dur - EXIT - 1);
  return {
    el,
    update(t) {
      if (label) show(label, seg(t, 0.05, REVEAL), { y: 0.4 });
      toks.forEach((tk, i) => show(tk, seg(t, times[i], REVEAL), { x: 0.8, y: 0 }));
      if (result) {
        const p = seg(t, resAt, 0.8);
        show(result, p, { y: 0.3, scale: 0.7, back: true });
        const dim = RM ? (p > 0 ? 1 : 0) : spring(p);
        toks.forEach(tk => { tk.style.color = ''; tk.style.filter = dim ? `opacity(${(1 - 0.35 * dim).toFixed(3)})` : ''; });
      } else if (hero) {
        const p = instant(seg(t, Math.max(endTok, resAt - 0.4), 0.8));
        hero.classList.toggle('hero', p > 0);
        hero.style.setProperty('--hp', RM ? (p > 0 ? 1 : 0) : spring(p));
      }
    },
  };
}

function buildCompare(sc) {
  const d = sc.data || {};
  const col = (side, cls) => {
    const items = (side && side.items || []).map(x => h('li', null, x));
    const title = h('h4', { class: 'vs-ct' }, side && side.title || '');
    return { card: h('div', { class: 'vs-card ' + cls }, title, h('ul', null, items)), title, items };
  };
  const L = col(d.left, 'l'), R = col(d.right, 'r');
  const vs = h('div', { class: 'vs-vs', 'aria-hidden': 'true' }, 'vs');
  const el = h('div', { class: 'vs vs-compare' }, L.card, vs, R.card);
  const half = Math.max(1.4, (sc._dur - EXIT) * 0.45);
  const lt = spread(L.items.length, half + EXIT, { lead: 0.55, span: 0.85, maxGap: 1.6 });
  const rt = spread(R.items.length, half + EXIT, { lead: 0.55, span: 0.85, maxGap: 1.6 }).map(x => x + half);
  return {
    el,
    update(t) {
      show(L.card, seg(t, 0.05, 0.9), { x: -2.2, y: 0 });
      L.items.forEach((li, i) => show(li, seg(t, lt[i], REVEAL), { y: 0.45 }));
      show(vs, seg(t, half - 0.25, 0.7), { scale: 0.4, y: 0, back: true });
      show(R.card, seg(t, half, 0.9), { x: 2.2, y: 0 });
      R.items.forEach((li, i) => show(li, seg(t, rt[i], REVEAL), { y: 0.45 }));
    },
  };
}

function buildExample(sc) {
  const d = sc.data || {};
  const prompt = h('div', { class: 'vs-prompt' }, h('div', { class: 'vs-kicker' }, 'Example'), h('p', null, d.prompt || ''));
  const steps = (d.steps || []).map((x, i) => {
    const n = h('span', { class: 'vs-n' }, String(i + 1));
    return { li: h('li', null, n, h('span', null, x)), n };
  });
  const answer = d.answer ? h('div', { class: 'vs-answer' }, d.answer) : null;
  const el = h('div', { class: 'vs vs-example' }, prompt, h('ol', { class: 'vs-steps' }, steps.map(x => x.li)), answer);
  const dur = sc._dur;
  const ansAt = Math.max(1.6, Math.min(dur * 0.74, dur - EXIT - 1.2));
  const times = spread(steps.length, ansAt + EXIT, { lead: Math.min(1.2, dur * 0.12), span: 0.86, maxGap: 4 });
  return {
    el,
    update(t) {
      show(prompt, seg(t, 0.05, 0.9), { y: 0.6 });
      steps.forEach((st, i) => {
        const p = seg(t, times[i], REVEAL);
        show(st.li, p, { x: -0.6, y: 0 });
        const next = i + 1 < steps.length ? times[i + 1] : (answer ? ansAt : Infinity);
        st.n.classList.toggle('on', p > 0 && t < next); // the step being explained right now
      });
      if (answer) show(answer, seg(t, ansAt, 0.85), { scale: 0.6, y: 0.2, back: true });
    },
  };
}

/* Chart (line: SVG, drawn by stroke-dashoffset; bar: rows that grow from the baseline). */

function buildChart(sc) {
  const d = sc.data || {};
  return d.type === 'bar' ? buildBar(sc) : buildLine(sc);
}

function buildBar(sc) {
  const d = sc.data || {};
  const unit = d.unit === '$' || d.unit === '%' ? d.unit : '';
  const vals = (d.values || []).map(v => Number(v) || 0);
  const max = Math.max(1e-9, ...vals.map(Math.abs));
  const top = vals.indexOf(Math.max(...vals));
  const title = h('h3', { class: 'vs-h vs-ch' }, d.title || '');
  const rows = (d.labels || []).map((lab, i) => {
    const fill = h('span', { class: 'vs-bfill' + (i === top ? ' top' : '') });
    const val = h('span', { class: 'vs-bval num' }, fmtValue(0, unit));
    return { row: h('div', { class: 'vs-brow' }, h('span', { class: 'vs-blab' }, lab), h('span', { class: 'vs-btrack' }, fill, val)), fill, val, v: vals[i] || 0 };
  });
  const el = h('div', { class: 'vs vs-bar' }, title, h('div', { class: 'vs-bars' }, rows.map(r => r.row)));
  const times = spread(rows.length, sc._dur, { lead: 0.5, span: 0.6, minGap: 0.18, maxGap: 1.4 });
  return {
    el,
    update(t) {
      show(title, seg(t, 0.05, REVEAL), { y: 0.4 });
      rows.forEach((r, i) => {
        const p = seg(t, times[i], 1.1);
        show(r.row.firstChild, seg(t, times[i] - 0.15, REVEAL), { y: 0.3 });
        const g = RM ? (p > 0 ? 1 : 0) : easeOutBack(p, 0.9);
        const frac = Math.max(0, r.v) / max;
        r.fill.style.width = `${(Math.max(0, g) * frac * 82).toFixed(3)}%`;
        r.val.style.opacity = String(clamp01(p * 3));
        const shown = RM ? r.v : r.v * easeOutCubic(p);
        r.val.textContent = fmtValue(p >= 1 ? r.v : Number.isInteger(r.v) ? Math.round(shown) : Math.round(shown * 10) / 10, unit, Math.abs(r.v) >= 100000);
      });
    },
  };
}

const SERIES = ['#F07A34', '#F5EFE6', '#FFB37A'];

function buildLine(sc) {
  const d = sc.data || {};
  const series = (d.series || []).slice(0, 3).map(sr => ({ name: sr.name || '', pts: (sr.points || []).filter(p => Array.isArray(p) && p.length >= 2).map(p => [Number(p[0]), Number(p[1])]) }))
    .filter(sr => sr.pts.length >= 2);
  const yUnit = unitOf(d.yLabel), xUnit = unitOf(d.xLabel);
  const title = h('h3', { class: 'vs-h vs-ch' }, d.title || '');
  const legend = series.length > 1
    ? h('div', { class: 'vs-legend' }, series.map((sr, i) => h('span', null, h('i', { style: `background:${SERIES[i]}` }), sr.name)))
    : null;
  const box = h('div', { class: 'vs-plot' });
  const el = h('div', { class: 'vs vs-line' }, h('div', { class: 'vs-chead' }, title, legend), box);
  const id = `vc${++uid}`;
  const dur = sc._dur;
  const drawLen = Math.min(3, Math.max(1.3, (dur - EXIT) * 0.32));
  const sStart = series.map((_, i) => 0.7 + i * drawLen * 0.75);
  let parts = null;

  function layout(w, hgt) {
    box.replaceChildren();
    if (!series.length || w < 40 || hgt < 40) { parts = null; return; }
    const all = series.flatMap(sr => sr.pts);
    const xs = all.map(p => p[0]), ys = all.map(p => p[1]);
    const xMin = Math.min(...xs), xMax = Math.max(...xs);
    const yMinD = Math.min(...ys), yMaxD = Math.max(...ys);
    // Start at zero unless the data sits in a narrow band far from it (bond prices, GDP index).
    const lo = yMinD >= 0 && (yMaxD - yMinD) / Math.max(1e-9, yMaxD) < 0.5 ? yMinD - (yMaxD - yMinD) * 0.25 : Math.min(0, yMinD);
    const yt = niceTicks(lo, yMaxD, hgt < 200 ? 4 : 5);
    const y0 = yt[0], y1 = yt[yt.length - 1];
    const uniq = [...new Set(xs)].sort((a, b) => a - b);
    const xt = uniq.length <= 8 ? uniq : niceTicks(xMin, xMax, 6).filter(v => v >= xMin && v <= xMax);
    const fs = Math.max(10, Math.min(15, w * 0.026));
    const compact = Math.abs(y1) >= 10000;
    const yLabs = yt.map(v => fmtValue(v, yUnit, compact));
    const padL = Math.max(...yLabs.map(l => l.length)) * fs * 0.6 + fs * 0.9 + (d.yLabel ? fs * 1.3 : 0);
    const padR = fs * 4.2, padT = fs * 1.4, padB = fs * (d.xLabel ? 3.4 : 2);
    const pw = Math.max(10, w - padL - padR), ph = Math.max(10, hgt - padT - padB);
    const X = v => padL + (xMax === xMin ? pw / 2 : ((v - xMin) / (xMax - xMin)) * pw);
    const Y = v => padT + ph - ((v - y0) / (y1 - y0 || 1)) * ph;

    const svg = s('svg', { viewBox: `0 0 ${w} ${hgt}`, width: w, height: hgt, class: 'vs-svg', 'font-size': fs });
    const defs = s('defs', null,
      s('linearGradient', { id: `${id}g`, x1: 0, y1: 0, x2: 0, y2: 1 },
        s('stop', { offset: '0', 'stop-color': SERIES[0], 'stop-opacity': '0.34' }),
        s('stop', { offset: '1', 'stop-color': SERIES[0], 'stop-opacity': '0' })),
      s('clipPath', { id: `${id}c` }, s('rect', { x: padL, y: 0, width: 0, height: hgt })));
    svg.append(defs);
    const clipRect = defs.querySelector('rect');
    const grid = s('g', { class: 'vs-grid' });
    yt.forEach((v, i) => {
      grid.append(s('line', { x1: padL, x2: padL + pw, y1: Y(v), y2: Y(v), class: i === 0 ? 'base' : '' }));
      grid.append(s('text', { x: padL - fs * 0.6, y: Y(v), 'text-anchor': 'end', 'dominant-baseline': 'middle', class: 'tick' }, yLabs[i]));
    });
    xt.forEach(v => grid.append(s('text', { x: X(v), y: padT + ph + fs * 1.35, 'text-anchor': 'middle', class: 'tick' }, fmtValue(v, xUnit, Math.abs(v) >= 10000))));
    if (d.xLabel) grid.append(s('text', { x: padL + pw / 2, y: hgt - fs * 0.35, 'text-anchor': 'middle', class: 'axis' }, d.xLabel));
    if (d.yLabel) grid.append(s('text', { x: fs * 0.9, y: padT + ph / 2, 'text-anchor': 'middle', class: 'axis', transform: `rotate(-90 ${fs * 0.9} ${padT + ph / 2})` }, d.yLabel.length > 34 ? d.yLabel.slice(0, 32) + '…' : d.yLabel));
    svg.append(grid);

    const lines = series.map((sr, i) => {
      const P = sr.pts.map(p => [X(p[0]), Y(p[1])]);
      const dStr = P.map((p, j) => `${j ? 'L' : 'M'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join('');
      let len = 0; const cum = [0];
      for (let j = 1; j < P.length; j++) { len += Math.hypot(P[j][0] - P[j - 1][0], P[j][1] - P[j - 1][1]); cum.push(len); }
      const area = i === 0 && series.length <= 2
        ? s('path', { d: `${dStr}L${P[P.length - 1][0]},${padT + ph}L${P[0][0]},${padT + ph}Z`, fill: `url(#${id}g)`, 'clip-path': `url(#${id}c)` }) : null;
      const path = s('path', { d: dStr, class: 'vs-ln', stroke: SERIES[i], pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 });
      const dots = P.map(p => s('circle', { cx: p[0], cy: p[1], r: fs * 0.3, fill: SERIES[i], class: 'vs-pt' }));
      const last = sr.pts[sr.pts.length - 1];
      const txt = fmtValue(last[1], yUnit, Math.abs(last[1]) >= 100000);
      const bw = txt.length * fs * 0.62 + fs * 1.1, bh = fs * 1.7;
      const lx = Math.min(P[P.length - 1][0] + fs * 0.6, w - bw - 2);
      // keep end labels of different series from colliding
      let ly = P[P.length - 1][1] - bh / 2;
      const tag = s('g', { class: 'vs-tag' },
        s('rect', { x: 0, y: 0, width: bw, height: bh, rx: bh / 2, fill: i === 0 ? SERIES[0] : 'rgba(245,239,230,.14)' }),
        s('text', { x: bw / 2, y: bh / 2, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: i === 0 ? '#1A0E06' : '#F5EFE6' }, txt));
      if (area) svg.append(area);
      svg.append(path, ...dots, tag);
      return { path, dots, frac: cum.map(c => (len ? c / len : 0)), tag, lx, ly, bh, area };
    });
    // Nudge overlapping end labels apart.
    for (let a = 0; a < lines.length; a++) for (let b = a + 1; b < lines.length; b++) {
      const A = lines[a], B = lines[b];
      if (Math.abs(A.ly - B.ly) < A.bh + 2) {
        const mid = (A.ly + B.ly) / 2, up = A.ly <= B.ly ? A : B, dn = up === A ? B : A;
        up.ly = mid - A.bh / 2 - 1; dn.ly = mid + A.bh / 2 + 1;
      }
    }
    lines.forEach(L => L.tag.setAttribute('transform', `translate(${L.lx.toFixed(1)} ${L.ly.toFixed(1)})`));
    box.append(svg);
    parts = { grid, lines, clipRect, padL, pw };
  }

  return {
    el, box, layout,
    update(t) {
      show(title, seg(t, 0.05, REVEAL), { y: 0.4 });
      if (legend) show(legend, seg(t, 0.3, REVEAL), { y: 0.3 });
      if (!parts) return;
      parts.grid.style.opacity = String(RM ? (t > 0 ? 1 : 0) : easeOutCubic(seg(t, 0.1, 0.8)));
      parts.lines.forEach((L, i) => {
        const raw = seg(t, sStart[i], drawLen);
        const p = RM ? (raw > 0 ? 1 : 0) : easeInOut(raw);
        L.path.setAttribute('stroke-dashoffset', (1 - p).toFixed(4));
        L.path.style.opacity = raw > 0 || p > 0 ? '1' : '0';
        L.dots.forEach((dot, j) => {
          const on = p >= L.frac[j] - 1e-6 && raw > 0;
          const q = RM ? (on ? 1 : 0) : on ? clamp01((p - L.frac[j]) * 6 + 0.25) : 0;
          dot.style.opacity = String(q);
          dot.style.transform = RM || q >= 1 ? '' : `scale(${easeOutBack(q, 2).toFixed(3)})`;
          dot.style.transformOrigin = `${dot.getAttribute('cx')}px ${dot.getAttribute('cy')}px`;
        });
        if (L.area && i === 0) parts.clipRect.setAttribute('width', (parts.pw * p + 1).toFixed(2));
        const tp = seg(t, sStart[i] + drawLen - 0.1, 0.7);
        L.tag.style.opacity = String(RM ? (tp > 0 ? 1 : 0) : clamp01(tp * 2));
      });
    },
  };
}

/* Diagram: layered auto-layout (row on wide stages, column on tall ones), arrows that draw in. */

function bez(p0, p1, p2, p3, t) {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
}

function buildDiagram(sc) {
  const d = sc.data || {};
  const nodes = (d.nodes || []).filter(n => n && n.id != null);
  const ids = nodes.map(n => n.id);
  const edges = (d.edges || []).filter(e => Array.isArray(e) && ids.includes(e[0]) && ids.includes(e[1]) && e[0] !== e[1]);
  const { rank, back } = layers(ids, edges);
  const maxR = Math.max(0, ...ids.map(i => rank[i]));
  const groups = Array.from({ length: maxR + 1 }, (_, r) => ids.map((id, i) => i).filter(i => rank[ids[i]] === r));

  const box = h('div', { class: 'vs-dia' });
  const svg = s('svg', { class: 'vs-dia-svg', 'aria-hidden': 'true' });
  const nodeEls = nodes.map(n => h('div', { class: 'vs-node' }, n.label));
  const edgeEls = edges.map((e, i) => {
    const path = s('path', { class: 'vs-edge' + (back.includes(i) ? ' back' : ''), pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 });
    const head = s('path', { class: 'vs-head' });
    svg.append(path, head);
    return { path, head, label: e[2] ? h('div', { class: 'vs-elabel' }, e[2]) : null };
  });
  box.append(svg, ...nodeEls, ...edgeEls.map(x => x.label).filter(Boolean));
  const el = h('div', { class: 'vs vs-diagram' }, box);

  // Order: edges arriving at a layer draw first, then that layer's nodes pop in at the arrow tips.
  const steps = [];
  groups.forEach((g, r) => {
    const inc = edges.map((e, i) => i).filter(i => !back.includes(i) && rank[edges[i][1]] === r);
    if (inc.length) steps.push({ edges: inc });
    if (g.length) steps.push({ nodes: g });
  });
  if (back.length) steps.push({ edges: back });
  const times = spread(steps.length, sc._dur, { lead: 0.1, span: 0.78, minGap: 0.3, maxGap: 2.2 });
  const nodeAt = [], edgeAt = [];
  steps.forEach((st, k) => {
    (st.nodes || []).forEach((ni, j) => { nodeAt[ni] = times[k] + j * 0.12; });
    (st.edges || []).forEach((ei, j) => { edgeAt[ei] = times[k] + j * 0.1; });
  });
  const sinks = new Set(ids.filter(id => !edges.some((e, i) => !back.includes(i) && e[0] === id)));
  let ready = false;

  function layout(w, hgt) {
    ready = false;
    if (w < 40 || hgt < 40 || !nodes.length) return;
    const horiz = w / hgt >= 1.15;
    const hasLab = edges.some(e => e[2]);
    const backRes = back.length ? 0.22 : 0;
    const rects = [];
    if (horiz) {
      const L = groups.length, slotW = w / L, usableH = hgt * (1 - backRes);
      const nodeW = Math.min(slotW * (L === 1 ? 0.5 : hasLab ? 0.62 : 0.72), w * 0.34, 260);
      groups.forEach((g, r) => g.forEach((ni, k) => { rects[ni] = { cx: slotW * (r + 0.5), cy: (usableH / g.length) * (k + 0.5), w: nodeW }; }));
    } else {
      const L = groups.length, slotH = hgt / L, usableW = w * (1 - backRes);
      groups.forEach((g, r) => {
        const nodeW = Math.min((usableW / g.length) * 0.9, usableW * (hasLab && g.length === 1 ? 0.6 : 0.74), 300);
        g.forEach((ni, k) => { rects[ni] = { cx: (usableW / g.length) * (k + 0.5), cy: slotH * (r + 0.5), w: nodeW }; });
      });
    }
    nodeEls.forEach((n, i) => { n.style.width = `${rects[i].w}px`; n.style.left = '0'; n.style.top = '0'; });
    nodeEls.forEach((n, i) => { rects[i].h = n.offsetHeight; }); // one batched read after all writes
    nodeEls.forEach((n, i) => {
      const r = rects[i];
      n.style.left = `${(r.cx - r.w / 2).toFixed(1)}px`;
      n.style.top = `${(r.cy - r.h / 2).toFixed(1)}px`;
    });
    svg.setAttribute('viewBox', `0 0 ${w} ${hgt}`);
    svg.setAttribute('width', w); svg.setAttribute('height', hgt);
    const gap = 5, ah = Math.max(6, Math.min(9, w * 0.014));
    edges.forEach((e, i) => {
      const A = rects[ids.indexOf(e[0])], B = rects[ids.indexOf(e[1])];
      const E = edgeEls[i];
      let p0, p1, p2, p3, lab;
      if (back.includes(i)) {
        if (horiz) {
          const depth = hgt * backRes * 0.9 + Math.max(A.h, B.h) * 0.1;
          p0 = [A.cx, A.cy + A.h / 2 + gap]; p3 = [B.cx, B.cy + B.h / 2 + gap];
          p1 = [p0[0], p0[1] + depth]; p2 = [p3[0], p3[1] + depth];
          lab = 'below';
        } else {
          const depth = w * backRes * 0.9;
          p0 = [A.cx + A.w / 2 + gap, A.cy]; p3 = [B.cx + B.w / 2 + gap, B.cy];
          p1 = [p0[0] + depth, p0[1]]; p2 = [p3[0] + depth, p3[1]];
          lab = 'right';
        }
      } else if (horiz) {
        p0 = [A.cx + A.w / 2 + gap, A.cy]; p3 = [B.cx - B.w / 2 - gap, B.cy];
        const dx = (p3[0] - p0[0]) * 0.5;
        p1 = [p0[0] + dx, p0[1]]; p2 = [p3[0] - dx, p3[1]];
        lab = 'above';
      } else {
        p0 = [A.cx, A.cy + A.h / 2 + gap]; p3 = [B.cx, B.cy - B.h / 2 - gap];
        const dy = (p3[1] - p0[1]) * 0.5;
        p1 = [p0[0], p0[1] + dy]; p2 = [p3[0], p3[1] - dy];
        lab = 'right';
      }
      E.path.setAttribute('d', `M${p0.map(n => n.toFixed(1))}C${p1.map(n => n.toFixed(1))} ${p2.map(n => n.toFixed(1))} ${p3.map(n => n.toFixed(1))}`);
      // Arrowhead along the end tangent.
      let tx = p3[0] - p2[0], ty = p3[1] - p2[1];
      if (Math.hypot(tx, ty) < 0.01) { tx = p3[0] - p0[0]; ty = p3[1] - p0[1]; }
      const m = Math.hypot(tx, ty) || 1; tx /= m; ty /= m;
      const bx = p3[0] - tx * ah, by = p3[1] - ty * ah, nx = -ty * ah * 0.62, ny = tx * ah * 0.62;
      E.head.setAttribute('d', `M${p3[0].toFixed(1)},${p3[1].toFixed(1)}L${(bx + nx).toFixed(1)},${(by + ny).toFixed(1)}L${(bx - nx).toFixed(1)},${(by - ny).toFixed(1)}Z`);
      E.head.style.transformOrigin = `${p3[0].toFixed(1)}px ${p3[1].toFixed(1)}px`;
      if (E.label) {
        const mid = bez(p0, p1, p2, p3, 0.5);
        const st = E.label.style;
        st.left = `${mid[0].toFixed(1)}px`; st.top = `${mid[1].toFixed(1)}px`;
        E.label.dataset.pos = lab;
        st.maxWidth = lab === 'above' ? `${Math.max(70, Math.abs(p3[0] - p0[0]) + 24)}px` : `${Math.max(80, w - mid[0] - 12)}px`;
      }
    });
    ready = true;
  }

  return {
    el, box, layout,
    update(t) {
      if (!ready) return;
      nodeEls.forEach((n, i) => {
        const p = seg(t, nodeAt[i], 0.8);
        show(n, p, { scale: 0.82, y: 0.2, back: true });
        // freshly arrived nodes glow orange, then settle; end-of-flow nodes keep the accent
        const fresh = RM ? 0 : (p > 0 ? 1 - seg(t, nodeAt[i] + 0.5, 1.3) : 0);
        n.style.setProperty('--glow', fresh.toFixed(3));
        n.classList.toggle('sink', p > 0 && sinks.has(ids[i]) && edges.length > 0);
      });
      edgeEls.forEach((E, i) => {
        const raw = seg(t, edgeAt[i], 0.7);
        const p = RM ? (raw > 0 ? 1 : 0) : easeInOut(raw);
        E.path.setAttribute('stroke-dashoffset', (1 - p).toFixed(4));
        E.path.style.opacity = raw > 0 ? '1' : '0';
        const hp = RM ? (raw > 0 ? 1 : 0) : seg(t, edgeAt[i] + 0.55, 0.35);
        E.head.style.opacity = String(clamp01(hp * 2));
        E.head.style.transform = RM || hp >= 1 ? '' : `scale(${easeOutBack(hp, 2).toFixed(3)})`;
        if (E.label) {
          const lp = seg(t, edgeAt[i] + 0.35, REVEAL);
          E.label.style.opacity = String(RM ? (lp > 0 ? 1 : 0) : spring(lp));
        }
      });
    },
  };
}

const BUILDERS = { title: buildTitle, bullets: buildBullets, formula: buildFormula, chart: buildChart, diagram: buildDiagram, compare: buildCompare, example: buildExample };

function buildScene(sc, dur, env) {
  const scene = { ...sc, _dur: dur };
  const make = BUILDERS[sc.kind];
  try {
    if (make) return make(scene, env);
  } catch (e) {
    console.warn('Video scene failed to build', sc.kind, e);
  }
  // Unknown or broken scene: show its caption as a quiet card rather than nothing.
  const p = h('p', { class: 'vs-fallback' }, sc.caption || '');
  return { el: h('div', { class: 'vs' }, p), update(t) { show(p, seg(t, 0.05, REVEAL)); } };
}

/* ---------- View ---------- */

function closeSheetFrom(el) {
  const btn = el.closest('.sheet') && el.closest('.sheet').querySelector('.sheet-close');
  if (btn) btn.click(); else history.back();
}

export async function render(el, params = {}, ctx = {}) {
  await ensureStyles();
  const data = ctx.data || {};
  const playable = (data.VIDEOS || []).filter(v => v && Array.isArray(v.scenes) && v.scenes.length);
  const { list, index } = feedOrder(playable, params.id);
  if (index < 0) {
    const closeBtn = h('button', { class: 'vp-btn-primary', type: 'button', onclick: () => closeSheetFrom(closeBtn) }, 'Close');
    el.append(
      h('h1', { class: 'lt' }, 'Video lesson'),
      h('div', { class: 'empty vp-missing' },
        h('div', { class: 'ico' }, icon('video')),
        h('p', null, "We couldn't find that video. It may have moved."),
        h('div', { class: 'vp-missing-actions' }, closeBtn, h('a', { class: 'vp-btn-quiet', href: '#/learn' }, 'Browse lessons'))),
    );
    return;
  }
  mountFeed(el, list, index, ctx);
}

/* ---------- One reel: a single video's stage, clock, narration and captions ---------- */

function createReel(video, shared) {
  const data = shared.data;
  const lesson = (data.LESSONS || []).find(l => l.id === video.lesson);
  const area = (data.AREAS || []).find(a => a.id === video.area);
  const env = { areaName: area ? area.name : video.area };
  const scenes = video.scenes;
  const tl = timeline(scenes);
  const words = scenes.map(sc => wordSpans(sc.caption || ''));
  const wtimes = scenes.map((sc, i) => wordTimes(words[i], 0.15, Math.max(0.6, tl.durs[i] - EXIT - 0.35)));
  const chunks = scenes.map(sc => captionChunks(sc.caption || '', 46));
  const practiceHref = lesson && lesson.pis && lesson.pis.length ? quizHref(lesson.pis) : '#/practice';

  let t = 0, playing = false, ended = false, started = false, destroyed = false;
  let curIdx = -1, cur = null, layoutKey = '', last = 0, raf = 0;
  let sp = { index: -1, done: true, tok: 0 }, speechTok = 0, media = null;
  let capKey = null, capWordEls = [], capChunk = -1;
  const reel = { video, el: null, onEnd: null, onState: null };

  /* DOM */
  const layer = h('div', { class: 'vp-layer' });
  const segFills = scenes.map(() => h('i'));
  const segs = h('div', { class: 'rf-segs' }, scenes.map((sc, i) => h('button', {
    class: 'rf-seg', type: 'button', tabindex: '-1', 'aria-label': `Scene ${i + 1}: ${sceneLabel(sc)}`,
    onclick: e => { e.stopPropagation(); jumpTo(i, true); },
  }, h('span', null, segFills[i]))));
  const head = h('div', { class: 'rf-head' },
    h('span', { class: 'rf-chip' }, env.areaName),
    h('div', { class: 'rf-title' }, video.title));
  const capLine = h('div', { class: 'rf-cap-in' });
  const caption = h('div', { class: 'rf-cap', 'aria-hidden': 'true' }, capLine);
  const pauseMark = h('div', { class: 'rf-pausemark', 'aria-hidden': 'true' }, glyph('play'));
  const nextName = h('span', null, '');
  const ring = s('svg', { class: 'rf-ring', viewBox: '0 0 36 36', 'aria-hidden': 'true' },
    s('circle', { cx: 18, cy: 18, r: 16, class: 'bg' }), s('circle', { cx: 18, cy: 18, r: 16, class: 'fg', pathLength: 1 }));
  const upNext = h('div', { class: 'rf-upnext' }, ring, h('span', { class: 'rf-upnext-t' }, 'Up next', h('br'), nextName));
  const replayBtn = h('button', { class: 'vp-btn-quiet', type: 'button' }, glyph('replay'), 'Replay');
  const endCard = h('div', { class: 'vp-end', 'aria-hidden': 'true' },
    h('div', { class: 'vp-end-in' },
      h('div', { class: 'vp-end-k' }, 'Lesson complete'),
      h('div', { class: 'vp-end-t' }, video.title),
      h('div', { class: 'vp-end-a' },
        h('a', { class: 'vp-btn-primary', href: practiceHref }, glyph('practice'), 'Practice this topic'),
        replayBtn),
      upNext));
  endCard.inert = true;
  const stage = h('div', { class: 'vp-stage rf-stage', 'data-state': 'idle' },
    h('div', { class: 'vp-glow', 'aria-hidden': 'true' }), layer, caption, pauseMark,
    h('div', { class: 'rf-top' }, segs, head), endCard);
  reel.el = stage;
  stage.reel = reel; // handy for debugging from the console: $('.rf-stage').reel.seek(12)

  /* Narration: pre-recorded audio when the scene has it, otherwise speech synthesis.
     All reels share one <audio> element (shared.player), so once a tap unlocks it on iOS every
     later clip can play; a second element (shared.preloader) only warms the next clip. */
  const canSpeak = i => !!(shared.narrateOn && (scenes[i].audio || (shared.synth && shared.voice)));
  const clipUrl = i => new URL(scenes[i].audio, document.baseURI).href;
  function stopSpeech() {
    speechTok++;
    sp = { index: -1, done: true, tok: speechTok };
    if (media) {
      if (shared.audioOwner === reel) { try { media.pause(); } catch (e) { /* ignore */ } shared.audioOwner = null; }
      media = null;
    }
    if (shared.owner === reel) {
      shared.owner = null;
      try { if (shared.synth && (shared.synth.speaking || shared.synth.pending)) shared.synth.cancel(); } catch (e) { /* ignore */ }
    }
  }
  function speak(i) {
    stopSpeech();
    if (!canSpeak(i)) return;
    const text = scenes[i].caption || '';
    const tok = ++speechTok;
    const n = Math.max(1, words[i].length);
    sp = { index: i, done: false, tok, t0: performance.now(), ch: -1, maxMs: (n / 2.2 / shared.speed + 5) * 1000, audio: !!scenes[i].audio, len: text.length, started: false };
    const finish = () => { if (sp.tok === tok) sp.done = true; };
    const heard = () => { if (sp.tok === tok) sp.started = true; shared.setBlocked(false); };
    const blocked = () => { if (sp.tok === tok) { sp.done = true; shared.setBlocked(true); } };
    if (scenes[i].audio) {
      try {
        const a = shared.player;
        const url = clipUrl(i);
        if (a.src !== url) a.src = url;
        else a.currentTime = 0;
        a.playbackRate = shared.speed;
        a.onended = finish;
        a.onerror = finish;
        a.onplaying = heard;
        const setMax = () => { if (sp.tok === tok && isFinite(a.duration)) sp.maxMs = (a.duration / shared.speed) * 1000 + 2500; };
        a.onloadedmetadata = setMax;
        if (a.readyState >= 1) setMax();
        media = a; sp.src = url;
        shared.audioOwner = reel;
        const p = a.play();
        if (p && p.catch) p.catch(err => { if (err && err.name === 'NotAllowedError') blocked(); else finish(); });
        if (i + 1 < scenes.length && scenes[i + 1].audio) shared.preload(clipUrl(i + 1));
      } catch (e) { finish(); }
      return;
    }
    if (!text.trim()) { finish(); return; }
    try {
      const u = new window.SpeechSynthesisUtterance(text);
      u.voice = shared.voice; u.lang = shared.voice.lang; u.rate = TTS_RATE * shared.speed;
      u.onstart = heard;
      u.onend = finish;
      u.onerror = e => { if (e && e.error === 'not-allowed') blocked(); else finish(); };
      u.onboundary = e => { if (sp.tok === tok && typeof e.charIndex === 'number') sp.ch = e.charIndex; };
      sp.utter = u; // keep a reference: some engines drop events for collected utterances
      shared.owner = reel;
      shared.synth.speak(u);
    } catch (e) { finish(); }
  }
  // Pausing a recorded clip keeps its place so resuming continues mid-sentence.
  function holdSpeech() {
    if (media && sp.audio && !sp.done && shared.audioOwner === reel) { try { media.pause(); } catch (e) { /* ignore */ } sp.paused = true; return; }
    stopSpeech();
  }
  function resumeSpeech(i) {
    if (media && sp.audio && sp.paused && sp.index === i && !sp.done && shared.narrateOn
      && shared.audioOwner === reel && media.src === sp.src) {
      sp.paused = false;
      sp.t0 = performance.now() - (media.currentTime / shared.speed) * 1000;
      media.playbackRate = shared.speed;
      const p = media.play();
      if (p && p.catch) p.catch(err => { sp.done = true; if (err && err.name === 'NotAllowedError') shared.setBlocked(true); });
      return;
    }
    speak(i);
  }
  // Character the narrator has reached in the current scene, or -1 if unknown.
  function narratedChar(i) {
    if (sp.index !== i || sp.done) return sp.index === i && sp.done && sp.ch >= 0 ? Infinity : -1;
    if (sp.audio && media && media.src === sp.src && media.duration > 0) return (media.currentTime / media.duration) * sp.len;
    return sp.ch;
  }

  /* Rendering */
  function mountScene(i) {
    curIdx = i;
    cur = buildScene(scenes[i], tl.durs[i], env);
    layer.replaceChildren(cur.el);
    layoutKey = '';
    capKey = null;
  }
  function ensureLayout() {
    if (!cur || !cur.layout) return;
    const b = cur.box || cur.el;
    const w = b.clientWidth, hh = b.clientHeight;
    const key = `${w}x${hh}`;
    if (key !== layoutKey && w > 0 && hh > 0) { layoutKey = key; cur.layout(w, hh); }
  }

  function drawCaption(i, local, idle) {
    const ws = words[i];
    if (idle || !shared.captionsOn || !ws.length || t >= tl.total) {
      if (capKey !== '') { capKey = ''; caption.classList.remove('on'); }
      return;
    }
    const ch = narratedChar(i);
    let wi = ch >= 0 ? (ch === Infinity ? ws.length - 1 : wordIndexAtChar(ws, ch)) : wordIndexAt(wtimes[i], local);
    // Never run behind the clock-based estimate once the narration has finished.
    if (sp.index === i && sp.done) wi = Math.max(wi, wordIndexAt(wtimes[i], local));
    const ci = Math.max(0, chunkAtChar(chunks[i], wi >= 0 ? ws[wi].start : 0));
    const key = `${i}:${ci}`;
    if (key !== capKey) {
      capKey = key;
      capChunk = ci;
      const c = chunks[i][ci];
      capWordEls = [];
      const spans = [];
      ws.forEach((w, k) => {
        if (w.start < c.start || w.start >= c.end) return;
        const el = h('span', { class: 'w' }, w.text);
        el.dataset.k = k;
        capWordEls.push(el);
        spans.push(el, ' ');
      });
      capLine.replaceChildren(...spans);
      caption.classList.add('on');
    }
    for (const el of capWordEls) {
      const k = +el.dataset.k;
      const state = k < wi ? 'said' : k === wi ? 'now' : 'todo';
      if (el.dataset.s !== state) { el.dataset.s = state; el.className = 'w ' + state; }
    }
  }

  function draw() {
    if (destroyed) return;
    const idle = !started && t === 0 && !playing;
    const at = sceneAt(tl, t);
    if (at.index !== curIdx) mountScene(at.index);
    ensureLayout();
    // Before first play the stage shows the title fully revealed, like a poster frame.
    const local = idle ? Math.min(tl.durs[0] - EXIT - 0.01, 2.6) : at.local;
    cur.update(local);
    const dur = tl.durs[at.index];
    const ex = seg(local, dur - EXIT, EXIT);
    layer.style.opacity = String(1 - (RM ? ex : easeOutCubic(ex)));
    layer.style.transform = RM || ex <= 0 ? '' : `translate3d(0,${(-0.5 * spring(ex)).toFixed(3)}em,0) scale(${(1 - 0.02 * ex).toFixed(4)})`;
    if (!RM) stage.style.setProperty('--gx', `${(20 + 60 * (t / tl.total)).toFixed(2)}%`);
    segFills.forEach((f, i) => {
      const v = i < at.index ? 1 : i > at.index ? 0 : idle ? 0 : at.progress;
      f.style.transform = `scaleX(${v.toFixed(4)})`;
    });
    drawCaption(at.index, local, idle);
    const showEnd = t >= tl.total;
    if (endCard.classList.contains('on') !== showEnd) {
      endCard.classList.toggle('on', showEnd);
      endCard.setAttribute('aria-hidden', String(!showEnd));
      endCard.inert = !showEnd;
    }
  }

  function frame(now) {
    raf = 0;
    if (destroyed) return;
    // Real elapsed time keeps playback on schedule when frames are throttled; the cap only
    // guards against a long stall (hiding the page pauses playback anyway).
    const dt = Math.min(0.5, Math.max(0, (now - last) / 1000));
    last = now;
    if (playing) advance(dt, now);
    draw();
    if (playing) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf && !destroyed) { last = performance.now(); raf = requestAnimationFrame(frame); } }

  function advance(dt, now) {
    let nt = t + dt * shared.speed;
    const ci = sceneAt(tl, t).index;
    if (sp.index === ci && !sp.done) {
      const elapsed = now - sp.t0;
      let busy = true;
      if (!sp.audio) { try { busy = shared.synth.speaking || shared.synth.pending; } catch (e) { /* ignore */ } }
      if (elapsed > sp.maxMs) sp.done = true;
      else if (elapsed > 1500 && !busy) {
        sp.done = true;
        if (!sp.started) shared.setBlocked(true); // the engine never began: speech needs a tap here
      }
      else {
        // Narration still going: hold the scene at its settled frame until the sentence ends.
        const hold = tl.starts[ci] + tl.durs[ci] - EXIT;
        if (nt > hold) nt = Math.max(t, hold);
      }
    }
    t = Math.min(nt, tl.total);
    const ni = sceneAt(tl, t).index;
    if (ni !== ci && t < tl.total) speak(ni);
    if (t >= tl.total) {
      playing = false; ended = true; stopSpeech(); sync();
      if (reel.onEnd) reel.onEnd(reel);
    }
  }

  function sync() {
    stage.dataset.state = playing ? 'playing' : ended ? 'ended' : started ? 'paused' : 'idle';
    if (reel.onState) reel.onState(reel);
  }

  /* Transport */
  function play() {
    if (destroyed) return;
    if (ended || t >= tl.total) { t = 0; ended = false; }
    started = true; playing = true;
    resumeSpeech(sceneAt(tl, t).index);
    sync(); kick();
  }
  function pause() {
    if (!playing) return;
    playing = false;
    holdSpeech();
    sync(); draw();
  }
  function seek(nt, keepPlaying = playing) {
    t = Math.min(Math.max(0, nt), tl.total);
    started = true;
    ended = t >= tl.total;
    if (ended) {
      const was = playing;
      playing = false; stopSpeech(); sync(); draw();
      if (was || keepPlaying) { if (reel.onEnd) reel.onEnd(reel); }
      return;
    }
    playing = keepPlaying;
    if (playing) { speak(sceneAt(tl, t).index); kick(); } else stopSpeech();
    sync(); draw();
  }
  function jumpTo(i, andPlay) { seek(i >= scenes.length ? tl.total : tl.starts[Math.max(0, i)], andPlay || playing); }

  // Live getters (Object.assign would copy their values once, not the getters).
  Object.defineProperties(reel, {
    playing: { get: () => playing },
    ended: { get: () => ended },
    started: { get: () => started },
  });
  Object.assign(reel, {
    tl,
    play, pause, seek,
    toggle() { if (playing) pause(); else play(); },
    replay() { t = 0; ended = false; play(); },
    nextScene() { jumpTo(sceneAt(tl, t).index + 1, true); },
    prevScene() {
      const at = sceneAt(tl, Math.min(t, tl.total - 1e-6));
      jumpTo(at.local > 1.2 || at.index === 0 ? at.index : at.index - 1, true);
    },
    // Called inside a user gesture after narration was blocked: start this scene's line again.
    retryNarration() { if (playing) speak(sceneAt(tl, t).index); },
    narrationChanged() {
      // A speed change on a recorded clip just retunes it; anything else restarts the scene's line.
      if (playing && shared.narrateOn && media && sp.audio && !sp.done && sp.index === sceneAt(tl, t).index) { media.playbackRate = shared.speed; return; }
      if (playing) speak(sceneAt(tl, t).index); else stopSpeech();
    },
    captionsChanged() { capKey = null; draw(); },
    setUpNext(title) { nextName.textContent = title || ''; upNext.hidden = !title; },
    armUpNext(on) { stage.classList.toggle('counting', !!on); },
    relayout() { layoutKey = ''; draw(); },
    draw,
    destroy() {
      if (destroyed) return;
      playing = false; stopSpeech(); destroyed = true;
      if (raf) cancelAnimationFrame(raf);
    },
  });
  replayBtn.addEventListener('click', e => { e.stopPropagation(); reel.armUpNext(false); if (shared.cancelAuto) shared.cancelAuto(); reel.replay(); });
  upNext.hidden = true;
  draw();
  return reel;
}

/* ---------- The feed: slots, gestures, chrome, lifecycle ---------- */

function mountFeed(el, list, startIndex, ctx) {
  RM = reducedMotion();
  const synth = canNarrate(window) ? window.speechSynthesis : null;
  const shared = {
    data: ctx.data || {}, synth, voice: null, owner: null, speed: 1, captionsOn: true,
    narrateOn: !(ctx.state && ctx.state.settings && ctx.state.settings.narrate === false),
    cancelAuto: null, audioOwner: null, blocked: false,
    player: new Audio(), preloader: new Audio(),
    setBlocked: () => {},
    preload(url) { if (this.preloader.src !== url) { this.preloader.src = url; try { this.preloader.load(); } catch (e) { /* ignore */ } } },
  };
  shared.player.preload = 'auto';
  shared.player.preservesPitch = true;
  shared.preloader.preload = 'auto';
  shared.preloader.muted = true;
  const anyAudio = list.some(v => v.scenes.some(sc => sc.audio));
  let index = startIndex;
  let reel = null, prevPoster = null, nextPoster = null;
  let animating = false, destroyed = false, autoTimer = 0;

  /* DOM */
  const track = h('div', { class: 'rf-track' });
  const viewport = h('div', { class: 'rf-viewport', tabindex: '-1' }, track);
  const muteBtn = h('button', { class: 'rf-ib', type: 'button', 'aria-label': 'Narration', 'aria-pressed': String(shared.narrateOn) }, glyph('voice'));
  const ccBtn = h('button', { class: 'rf-ib', type: 'button', 'aria-label': 'Captions', 'aria-pressed': 'true' }, glyph('cc'));
  const moreBtn = h('button', { class: 'rf-ib', type: 'button', 'aria-label': 'More options', 'aria-expanded': 'false' }, glyph('more'));
  const speedBtns = [1, 1.25, 1.5].map(v => h('button', { class: 'rf-sp num', type: 'button', 'aria-pressed': String(v === 1) }, `${v}×`));
  const menu = h('div', { class: 'rf-menu', hidden: true, role: 'group', 'aria-label': 'Playback speed' },
    h('div', { class: 'rf-menu-h' }, 'Playback speed'), h('div', { class: 'rf-menu-row' }, speedBtns));
  const rail = h('div', { class: 'rf-rail' }, muteBtn, ccBtn, moreBtn, menu);
  const upBtn = h('button', { class: 'rf-nav', type: 'button', 'aria-label': 'Previous video' }, glyph('up'));
  const downBtn = h('button', { class: 'rf-nav', type: 'button', 'aria-label': 'Next video' }, glyph('down'));
  const live = h('div', { class: 'sr-only', 'aria-live': 'polite' });
  const soundPill = h('button', { class: 'rf-sound', type: 'button', hidden: true }, glyph('voice'), 'Tap for sound');
  const frameEl = h('div', { class: 'rf-frame' }, viewport, rail, soundPill);
  const root = h('div', { class: 'rf' }, frameEl, h('div', { class: 'rf-side' }, upBtn, downBtn), live);
  el.append(root);

  /* Sound unlock: browsers (iOS above all) only start audio or speech from a user gesture. The
     reel autoplays, so if narration was refused we show "Tap for sound"; the next tap or key unlocks
     the shared audio element and speech synthesis and restarts the current line, without also
     counting as a pause tap. */
  let unlockedThisGesture = false;
  shared.setBlocked = on => {
    if (shared.blocked === on) return;
    shared.blocked = on;
    soundPill.hidden = !on || !shared.narrateOn;
  };
  function unlockSound() {
    if (!shared.blocked || !shared.narrateOn || destroyed) return false;
    const a = shared.player;
    try {
      a.src = SILENT_WAV;
      const p = a.play();
      if (p && p.catch) p.catch(() => {});
    } catch (e) { /* ignore */ }
    if (synth) {
      try { const u = new window.SpeechSynthesisUtterance(' '); u.volume = 0; synth.speak(u); } catch (e) { /* ignore */ }
    }
    shared.setBlocked(false);
    if (reel) reel.retryNarration(); // same gesture, so the real clip or utterance may start now
    return true;
  }
  root.addEventListener('pointerdown', () => {
    unlockedThisGesture = unlockSound();
    setTimeout(() => { unlockedThisGesture = false; }, 0); // only for this one press
  }, true);
  soundPill.addEventListener('click', e => { e.stopPropagation(); unlockSound(); });

  /* Voices */
  function refreshVoices() {
    if (synth) { try { shared.voice = pickVoice(synth.getVoices()); } catch (e) { shared.voice = null; } }
    muteBtn.hidden = !(shared.voice || anyAudio);
  }
  refreshVoices();
  if (synth && synth.addEventListener) synth.addEventListener('voiceschanged', refreshVoices);

  function syncChrome() {
    muteBtn.replaceChildren(glyph(shared.narrateOn ? 'voice' : 'mute'));
    muteBtn.setAttribute('aria-pressed', String(shared.narrateOn));
    muteBtn.setAttribute('aria-label', shared.narrateOn ? 'Mute narration' : 'Turn on narration');
    ccBtn.setAttribute('aria-pressed', String(shared.captionsOn));
    ccBtn.classList.toggle('off', !shared.captionsOn);
    upBtn.disabled = index <= 0;
    downBtn.disabled = index >= list.length - 1;
  }

  /* Slots: the live reel, plus poster frames of its neighbours for the swipe preview. */
  function place(r, k) { if (r) { r.el.style.transform = k ? `translateY(${k * 100}%)` : ''; r.el.classList.toggle('rf-off', !!k); } }
  function build() {
    [reel, prevPoster, nextPoster].forEach(r => r && r.destroy());
    track.replaceChildren();
    reel = createReel(list[index], shared);
    prevPoster = index > 0 ? createReel(list[index - 1], shared) : null;
    nextPoster = index < list.length - 1 ? createReel(list[index + 1], shared) : null;
    [prevPoster, reel, nextPoster].forEach(r => r && track.append(r.el));
    place(prevPoster, -1); place(reel, 0); place(nextPoster, 1);
    reel.setUpNext(nextPoster ? list[index + 1].title : '');
    reel.onEnd = onReelEnd;
    live.textContent = `${list[index].title}. Video ${index + 1} of ${list.length}.`;
    syncChrome();
    requestAnimationFrame(() => [reel, prevPoster, nextPoster].forEach(r => r && r.relayout()));
  }

  function cancelAuto() { clearTimeout(autoTimer); autoTimer = 0; if (reel) reel.armUpNext(false); }
  shared.cancelAuto = cancelAuto;
  function onReelEnd(r) {
    if (r !== reel || destroyed) return;
    cancelAuto();
    if (index >= list.length - 1) return;
    reel.armUpNext(true);
    autoTimer = setTimeout(() => { autoTimer = 0; if (!destroyed && reel === r && r.ended) go(1); }, AUTO_NEXT_MS);
  }

  function setTrack(px, animate) {
    track.style.transition = animate && !RM ? 'transform .55s var(--spring, cubic-bezier(.32,.72,0,1))' : 'none';
    track.style.transform = px ? `translate3d(0,${px}px,0)` : '';
  }
  // dir: +1 next video, -1 previous. Snaps with a spring, then rebuilds the slots around the new index.
  function go(dir) {
    if (animating || destroyed) return;
    const target = index + dir;
    cancelAuto();
    if (target < 0 || target >= list.length) { bounce(dir); return; }
    animating = true;
    reel.pause();
    const hgt = viewport.clientHeight || 1;
    setTrack(-dir * hgt, true);
    let done = false;
    const finish = () => {
      if (done || destroyed) return;
      done = true;
      track.removeEventListener('transitionend', onEnd);
      index = target;
      build();
      setTrack(0, false);
      animating = false;
      reel.play();
    };
    const onEnd = e => { if (e.target === track) finish(); };
    track.addEventListener('transitionend', onEnd);
    setTimeout(finish, RM ? 30 : 650);
  }
  function bounce(dir) {
    if (RM) return;
    setTrack(-dir * 36, true);
    setTimeout(() => { if (!destroyed && !animating) setTrack(0, true); }, 180);
  }

  /* Gestures: tap thirds, hold to pause, vertical drag to change video. */
  let ptr = null;
  const interactive = e => e.target.closest('button, a, .rf-menu, .rf-segs');
  viewport.addEventListener('pointerdown', e => {
    if (animating || (e.button !== undefined && e.button > 0) || interactive(e)) return;
    closeMenu();
    const unlockTap = unlockedThisGesture;
    unlockedThisGesture = false;
    ptr = { unlockTap, id: e.pointerId, x0: e.clientX, y0: e.clientY, t0: performance.now(), y: e.clientY, ty: performance.now(), v: 0, drag: false, hold: false, wasPlaying: reel.playing };
    try { viewport.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    ptr.timer = setTimeout(() => {
      if (!ptr || ptr.drag) return;
      ptr.hold = true;
      if (reel.playing) reel.pause();
      root.classList.add('holding');
    }, HOLD_MS);
  });
  viewport.addEventListener('pointermove', e => {
    if (!ptr || e.pointerId !== ptr.id) return;
    const dx = e.clientX - ptr.x0, dy = e.clientY - ptr.y0;
    if (!ptr.drag && Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
      ptr.drag = true; clearTimeout(ptr.timer);
      if (ptr.hold) { ptr.hold = false; root.classList.remove('holding'); }
      cancelAuto();
    }
    if (!ptr.drag) return;
    const now = performance.now();
    ptr.v = (e.clientY - ptr.y) / Math.max(1, now - ptr.ty);
    ptr.y = e.clientY; ptr.ty = now;
    const edge = (dy > 0 && index === 0) || (dy < 0 && index === list.length - 1);
    setTrack(edge ? dy * 0.3 : dy, false);
  });
  const endPtr = e => {
    if (!ptr || e.pointerId !== ptr.id) return;
    const p = ptr; ptr = null;
    clearTimeout(p.timer);
    if (p.drag) {
      const dy = e.clientY - p.y0, hgt = viewport.clientHeight || 1;
      const dir = dy < 0 ? 1 : -1;
      const ok = index + dir >= 0 && index + dir < list.length;
      if (ok && (Math.abs(dy) > hgt * 0.18 || Math.abs(p.v) > 0.5)) go(dir);
      else { setTrack(0, true); if (p.wasPlaying && !reel.playing) reel.play(); }
      return;
    }
    if (p.hold) {
      root.classList.remove('holding');
      if (p.wasPlaying && e.type !== 'pointercancel') reel.play();
      return;
    }
    if (e.type === 'pointercancel') return;
    if (p.unlockTap) return;  // that tap turned the sound on; it is not a pause tap
    if (reel.ended) return; // the end card has its own buttons
    const r = viewport.getBoundingClientRect();
    const zone = tapZone(e.clientX - r.left, r.width);
    cancelAuto();
    if (zone === 'prev') reel.prevScene();
    else if (zone === 'next') reel.nextScene();
    else reel.toggle();
  };
  viewport.addEventListener('pointerup', endPtr);
  viewport.addEventListener('pointercancel', endPtr);
  // Keep the sheet's own swipe-to-dismiss from seeing our vertical swipes.
  const stopTouch = e => e.stopPropagation();
  root.addEventListener('touchstart', stopTouch, { passive: true });
  root.addEventListener('touchmove', stopTouch, { passive: true });

  // One video per flick: after a move, ignore wheel events (trackpad inertia tails on for a second
  // or two) until they go quiet for WHEEL_QUIET ms, then re-arm.
  const WHEEL_QUIET = 180;
  let wheelAcc = 0, wheelLocked = false, wheelQuiet = 0;
  viewport.addEventListener('wheel', e => {
    e.preventDefault();
    clearTimeout(wheelQuiet);
    wheelQuiet = setTimeout(() => { wheelLocked = false; wheelAcc = 0; }, WHEEL_QUIET);
    if (wheelLocked || animating) return;
    wheelAcc += e.deltaY;
    if (Math.abs(wheelAcc) > 60) { wheelLocked = true; const dir = wheelAcc > 0 ? 1 : -1; wheelAcc = 0; go(dir); }
  }, { passive: false });

  /* Chrome */
  function closeMenu() { if (!menu.hidden) { menu.hidden = true; moreBtn.setAttribute('aria-expanded', 'false'); } }
  muteBtn.addEventListener('click', () => {
    shared.narrateOn = !shared.narrateOn;
    if (!shared.narrateOn) shared.setBlocked(false);
    reel.narrationChanged(); syncChrome();
  });
  ccBtn.addEventListener('click', () => { shared.captionsOn = !shared.captionsOn; [reel, prevPoster, nextPoster].forEach(r => r && r.captionsChanged()); syncChrome(); });
  moreBtn.addEventListener('click', () => { menu.hidden = !menu.hidden; moreBtn.setAttribute('aria-expanded', String(!menu.hidden)); });
  speedBtns.forEach((b, i) => b.addEventListener('click', () => {
    shared.speed = [1, 1.25, 1.5][i];
    speedBtns.forEach((x, j) => x.setAttribute('aria-pressed', String(i === j)));
    reel.narrationChanged();
    closeMenu();
  }));
  upBtn.addEventListener('click', () => go(-1));
  downBtn.addEventListener('click', () => go(1));

  /* Keyboard */
  function topmost() {
    const layers = document.querySelectorAll('.sheet-layer');
    const mine = root.closest('.sheet-layer');
    return !mine || layers[layers.length - 1] === mine;
  }
  function onKey(e) {
    if (destroyed || !root.isConnected || !topmost()) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.target.closest && e.target.closest('input, textarea, select, [contenteditable]')) return;
    const k = e.key;
    if (unlockSound() && (k === ' ' || k === 'k' || k === 'K')) { e.preventDefault(); return; } // that key turned sound on
    // Space on a focused button or link activates it as usual; elsewhere it plays/pauses.
    const onControl = e.target.closest && e.target.closest('button, a[href], input, select, textarea, [role="button"]');
    if ((k === ' ' && !onControl) || k === 'k' || k === 'K') { e.preventDefault(); cancelAuto(); reel.toggle(); }
    else if (k === 'ArrowRight') { e.preventDefault(); cancelAuto(); reel.nextScene(); }
    else if (k === 'ArrowLeft') { e.preventDefault(); cancelAuto(); reel.prevScene(); }
    else if (k === 'ArrowDown' || k === 'PageDown') { e.preventDefault(); go(1); }
    else if (k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); go(-1); }
    else if (k === 'c' || k === 'C') ccBtn.click();
    else if ((k === 'm' || k === 'M') && !muteBtn.hidden) muteBtn.click();
  }
  function onVis() { if (document.hidden) { cancelAuto(); if (reel) reel.pause(); } }
  document.addEventListener('keydown', onKey);
  document.addEventListener('visibilitychange', onVis);
  const ro = typeof ResizeObserver === 'function'
    ? new ResizeObserver(() => [reel, prevPoster, nextPoster].forEach(r => r && r.relayout())) : null;
  if (ro) ro.observe(viewport);

  /* Lifecycle: stop speech and clocks as soon as the sheet starts closing. */
  let layerObs = null, bodyObs = null;
  function destroy() {
    if (destroyed) return;
    destroyed = true;
    cancelAuto();
    [reel, prevPoster, nextPoster].forEach(r => r && r.destroy());
    for (const a of [shared.player, shared.preloader]) { try { a.pause(); a.removeAttribute('src'); a.load(); } catch (e) { /* ignore */ } }
    document.removeEventListener('keydown', onKey);
    document.removeEventListener('visibilitychange', onVis);
    if (synth && synth.removeEventListener) synth.removeEventListener('voiceschanged', refreshVoices);
    if (ro) ro.disconnect();
    if (layerObs) layerObs.disconnect();
    if (bodyObs) bodyObs.disconnect();
  }
  function attach() {
    const sheetLayer = root.closest('.sheet-layer');
    if (sheetLayer) {
      sheetLayer.classList.add('rf-layer');
      layerObs = new MutationObserver(() => { if (!sheetLayer.classList.contains('open')) destroy(); });
      layerObs.observe(sheetLayer, { attributes: true, attributeFilter: ['class'] });
    }
    bodyObs = new MutationObserver(() => { if (!root.isConnected) destroy(); });
    bodyObs.observe(document.body, { childList: true, subtree: !sheetLayer });
    [reel, prevPoster, nextPoster].forEach(r => r && r.relayout());
    reel.play(); // reels start on their own; narration joins if the browser allows it
  }

  build();
  // The router inserts the view into a sheet right after render() resolves. Poll with timers,
  // not rAF, so this also works while the page is in the background.
  let tries = 0;
  (function waitForMount() {
    if (destroyed) return;
    if (root.isConnected) attach();
    else if (tries++ < 200) setTimeout(waitForMount, 16);
  })();
}
