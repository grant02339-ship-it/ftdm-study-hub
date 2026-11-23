// Reel scene renderer: the pure scene-drawing shared by the reels player (views/watch.js) and the
// Learn-tab thumbnails (reel-thumb.js). build(scene, dur, env) -> {el, update(local seconds), layout?(w,h), box?}.
// Every frame is a pure function of (scene, seconds into the scene), so a thumbnail is just
// update(settledTime) on a stage the player's own CSS (css/player.css) styles.
import { h } from './ui.js';
import {
  unitOf, fmtValue, niceTicks, layers, seg, clamp01, lerp, spring, easeOutBack, easeOutCubic, cubicBezier,
} from './player-timeline.js';

const EXIT = 0.4;           // seconds of fade-out at the end of each scene
const REVEAL = 0.75;        // seconds one element takes to settle
const easeInOut = cubicBezier(0.65, 0, 0.35, 1);
const SVGNS = 'http://www.w3.org/2000/svg';
let uid = 0;
export let RM = false; // reduced motion, set when a player mounts
export function setReducedMotion(v) { RM = !!v; }

export { EXIT, REVEAL };

/* ---------- Styles ---------- */

export function ensureStyles() {
  const existing = document.querySelector('link[data-player-css]');
  if (existing) return existing.dataset.loaded ? Promise.resolve() : existing._ready;
  const link = h('link', { rel: 'stylesheet', href: new URL('../css/player.css', import.meta.url).href, 'data-player-css': '' });
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

export function s(tag, attrs, ...kids) {
  const el = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs || {})) if (v != null) el.setAttribute(k, v);
  for (const c of kids.flat()) if (c != null) el.append(c.nodeType ? c : document.createTextNode(String(c)));
  return el;
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

export function sceneLabel(sc) {
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

export function buildScene(sc, dur, env) {
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

// Seconds into a scene at which every element has settled, just before the exit fade.
export const settledAt = dur => Math.max(0, dur - EXIT - 0.01);
