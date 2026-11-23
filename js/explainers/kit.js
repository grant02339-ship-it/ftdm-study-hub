// Shared building blocks for the interactive explainers: controls, readouts, a resizable SVG chart
// and a tween that eases chart state with the app's spring curve.
// Nothing here touches the DOM at module top level, so the explainers' pure math stays importable in tests.
import { h, reducedMotion } from '../ui.js';

export { h };

/* ---------- Formatting ---------- */
const money0 = n => '$' + Math.round(n).toLocaleString('en-US');
export const fmt = {
  money: (n, digits = 2) => {
    if (n == null || !Number.isFinite(n)) return '—';
    const sign = n < 0 ? '−' : '';
    const abs = Math.abs(n);
    return sign + (digits === 0 ? money0(abs)
      : '$' + abs.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits }));
  },
  pct: (r, digits = 2) => `${(r * 100).toFixed(digits).replace(/\.?0+$/, '')}%`,
  num: (n, digits = 0) => (n == null || !Number.isFinite(n)) ? '—'
    : n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits }),
};

let uid = 0;
const nextId = p => `xp-${p}-${++uid}`;

/* ---------- Frame ---------- */
// <div class="xp"> with optional chart slot, readouts and controls. Returns the parts.
export function frame(el, { label }) {
  const root = h('div', { class: 'xp', role: 'group', 'aria-label': label });
  el.replaceChildren(root);
  return root;
}

/* ---------- Controls ---------- */
// A labelled range slider with a live value. onInput(value) fires on every change.
export function slider({ label, min, max, step = 1, value, format = String, onInput }) {
  const id = nextId('r');
  const out = h('output', { class: 'num', for: id });
  const input = h('input', { id, class: 'xp-range', type: 'range', min, max, step, value });
  const paint = () => {
    const v = Number(input.value);
    out.textContent = format(v);
    input.style.setProperty('--p', `${((v - min) / (max - min)) * 100}%`);
    input.setAttribute('aria-valuetext', format(v));
  };
  input.addEventListener('input', () => { paint(); onInput(Number(input.value)); });
  paint();
  const el = h('div', { class: 'xp-field' }, h('div', { class: 'xp-field-top' }, h('label', { for: id }, label), out), input);
  return {
    el,
    get value() { return Number(input.value); },
    set(v) { input.value = v; paint(); },
  };
}

// A segmented control (radio group). options: [[value, label], ...]
export function segmented({ label, options, value, onChange }) {
  const name = nextId('s');
  const seg = h('div', { class: 'xp-seg', role: 'radiogroup', 'aria-label': label });
  for (const [v, text] of options) {
    const input = h('input', { type: 'radio', name, value: v, checked: v === value });
    input.addEventListener('change', () => { if (input.checked) onChange(v); });
    seg.append(h('label', null, input, h('span', null, text)));
  }
  return h('div', { class: 'xp-field' }, h('div', { class: 'xp-field-top' }, h('span', null, label)), seg);
}

/* ---------- Readouts ---------- */
// A stat tile: small label over a big rounded number. set(text, note?)
export function stat(label, { big = false } = {}) {
  const val = h('b', { class: 'num' }, '—');
  const note = h('span', { class: 'xp-stat-note' });
  const el = h('div', { class: `xp-stat${big ? ' big' : ''}` }, h('small', null, label), val, note);
  return {
    el,
    set(text, noteText = '') { val.textContent = text; note.textContent = noteText; note.hidden = !noteText; },
  };
}

/* ---------- SVG chart ---------- */
const SVG_NS = 'http://www.w3.org/2000/svg';
export function s(tag, attrs = {}, text) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) if (v != null) el.setAttribute(k, v);
  if (text != null) el.textContent = text;
  return el;
}

// A chart whose viewBox matches its rendered width (1 unit = 1 CSS px, so text never scales).
// draw(svg, state, W, H) rebuilds the contents. Call render(state) whenever state changes.
export function chart({ height = 200, label, draw }) {
  const svg = s('svg', { class: 'xp-svg', role: 'img', 'aria-label': label, height });
  const el = h('div', { class: 'xp-chart' }, svg);
  let last = null, W = 320, seen = false;
  const paint = () => {
    if (!last) return;
    svg.setAttribute('viewBox', `0 0 ${W} ${height}`);
    svg.replaceChildren();
    draw(svg, last, W, height);
  };
  if (typeof ResizeObserver === 'function') {
    const ro = new ResizeObserver(entries => {
      if (el.isConnected) seen = true;
      else if (seen) { ro.disconnect(); return; } // removed after being shown (the sheet closed)
      const w = Math.round(entries[0].contentRect.width);
      if (w > 0 && w !== W) { W = w; paint(); }
    });
    ro.observe(el);
  }
  return {
    el,
    render(state) {
      last = state;
      // Measure directly too, in case the observer hasn't reported yet.
      const w = el.isConnected ? Math.round(el.clientWidth) : 0;
      if (w > 0) W = w;
      paint();
    },
    setLabel(text) { svg.setAttribute('aria-label', text); },
  };
}

/* ---------- Tween ---------- */
// cubic-bezier(.32,.72,0,1): the app's spring curve, solved for y at time x.
function springEase(x) {
  const x1 = 0.32, y1 = 0.72, x2 = 0, y2 = 1;
  const bx = t => 3 * x1 * t * (1 - t) ** 2 + 3 * x2 * t * t * (1 - t) + t ** 3;
  const by = t => 3 * y1 * t * (1 - t) ** 2 + 3 * y2 * t * t * (1 - t) + t ** 3;
  let lo = 0, hi = 1, t = x;
  for (let i = 0; i < 20; i++) { t = (lo + hi) / 2; if (bx(t) < x) lo = t; else hi = t; }
  return by(t);
}

// Eases every numeric key of a state object toward its target, calling onFrame(current) each frame.
// A new target mid-flight starts from wherever the animation currently is.
export function tween(onFrame, initial, duration = 420) {
  let cur = { ...initial }, from = cur, to = cur, start = 0, raf = 0;
  onFrame(cur);
  const step = now => {
    const p = Math.min((now - start) / duration, 1), e = springEase(p);
    const next = { ...to };
    for (const k of Object.keys(to)) {
      if (typeof to[k] === 'number' && typeof from[k] === 'number') next[k] = from[k] + (to[k] - from[k]) * e;
    }
    cur = next;
    onFrame(cur);
    raf = p < 1 ? requestAnimationFrame(step) : 0;
  };
  return function set(target) {
    to = { ...target };
    if (raf) cancelAnimationFrame(raf);
    if (reducedMotion() || typeof requestAnimationFrame !== 'function') { raf = 0; cur = to; onFrame(cur); return; }
    from = cur; start = performance.now();
    raf = requestAnimationFrame(step);
  };
}

// Evenly spaced, "nice" tick values from 0 to at least max.
export function niceMax(max) {
  if (!(max > 0)) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(max)));
  const m = max / p;
  return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p;
}

export function legend(items) {
  return h('div', { class: 'xp-legend', 'aria-hidden': 'true' },
    items.map(([cls, text]) => h('span', null, h('i', { class: cls }), text)));
}
