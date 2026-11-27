// Built-in calculator for questions with math in them (quizzes and mock exams).
// evaluate() is a small parser (no eval): + − × ÷, parentheses, decimals, and % (as /100).
import { h, icon } from './ui.js';

/* ---------- Pure helpers ---------- */

// Returns a finite number, or null when the expression is incomplete or invalid.
export function evaluate(expr) {
  const src = String(expr || '').replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').replace(/,/g, '').replace(/\s+/g, '');
  if (!src || src.length > 200 || /[^0-9.+\-*/()%]/.test(src)) return null;
  let i = 0;
  const peek = () => src[i];
  function number() {
    const m = /^\d*\.?\d+|^\d+\./.exec(src.slice(i));
    if (!m) throw 0;
    i += m[0].length;
    return parseFloat(m[0]);
  }
  function factor() {
    let v;
    if (peek() === '-') { i++; return -factor(); }
    if (peek() === '+') { i++; return factor(); }
    if (peek() === '(') {
      i++;
      v = expr2();
      if (peek() === ')') i++; // a missing ")" at the end is forgiven
    } else v = number();
    while (peek() === '%') { i++; v /= 100; }
    return v;
  }
  function term() {
    let v = factor();
    while (peek() === '*' || peek() === '/' || peek() === '(') {
      const op = peek() === '(' ? '*' : src[i++];
      const r = factor();
      v = op === '*' ? v * r : v / r;
    }
    return v;
  }
  function expr2() {
    let v = term();
    while (peek() === '+' || peek() === '-') { const op = src[i++]; const r = term(); v = op === '+' ? v + r : v - r; }
    return v;
  }
  try {
    const v = expr2();
    if (i !== src.length || !Number.isFinite(v)) return null;
    return v;
  } catch (e) { return null; }
}

// 1234.5 -> "1,234.5"; rounds away floating-point noise (0.1 + 0.2 -> 0.3).
export function formatNumber(v) {
  if (!Number.isFinite(v)) return 'Error';
  const r = Math.round(v * 1e10) / 1e10;
  if (Math.abs(r) >= 1e15) return r.toExponential(6);
  return r.toLocaleString('en-US', { maximumFractionDigits: 10 });
}

const CALC_WORDS = /\b(calculat|comput|how much|how many dollars|total|sum|average|percent|percentage|ratio|rate|interest|margin|markup|mark-up|profit|loss|break[- ]even|return on|roi|cost of goods|net income|gross|revenue|depreciat|discount|tax|commission|wage|salary|payment|balance|equity|value|price|per unit|units)\b/i;
const NUMBER = /\d/;
const MONEYISH = /\$\s?\d|\d\s?%|\d[\d,]*\.\d|\b\d{3,}\b|\d,\d{3}/;

// True when a question looks like it needs arithmetic: numbers in the stem plus money/percent/large
// figures, together with a math word, or answer choices that are mostly numbers.
export function needsCalculator(q) {
  if (!q || !NUMBER.test(q.stem || '')) return false;
  const choices = Array.isArray(q.choices) ? q.choices : [];
  const numericChoices = choices.filter(c => /^[\s$€£(−-]*[\d,.]+\s*%?\)?\s*(\w+)?\s*$/.test(String(c))).length;
  if (choices.length && numericChoices >= Math.ceil(choices.length / 2)) return true;
  return MONEYISH.test(q.stem) && CALC_WORDS.test(q.stem);
}

/* ---------- UI ---------- */

let openPanel = null;

export function calcButton() {
  const svg = h('span', { 'aria-hidden': 'true' });
  svg.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="3"/><path d="M8.5 7h7M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h.01M15.5 18h.01"/></svg>';
  return h('button', { class: 'qz-calc-btn', type: 'button', 'aria-haspopup': 'dialog', onclick: e => { e.stopPropagation(); toggleCalculator(); } },
    svg.firstChild, h('span', null, 'Calculator'));
}

export function closeCalculator() {
  if (openPanel) { openPanel.remove(); openPanel = null; }
}

export function toggleCalculator() {
  if (openPanel) { closeCalculator(); return; }
  let exprText = '';
  let justSolved = false;
  const exprEl = h('div', { class: 'calc-expr', 'aria-hidden': 'true' });
  const outEl = h('div', { class: 'calc-out num', role: 'status', 'aria-live': 'polite' }, '0');
  const show = () => {
    exprEl.textContent = exprText;
    const v = evaluate(exprText);
    outEl.textContent = exprText === '' ? '0' : v === null ? outEl.textContent : formatNumber(v);
  };
  const press = k => {
    if (k === 'C') { exprText = ''; justSolved = false; outEl.textContent = '0'; exprEl.textContent = ''; return; }
    if (k === '⌫') { exprText = exprText.slice(0, -1); justSolved = false; show(); return; }
    if (k === '=') {
      const v = evaluate(exprText);
      if (v === null) { outEl.textContent = exprText ? 'Error' : '0'; return; }
      exprEl.textContent = `${exprText} =`;
      exprText = String(Math.round(v * 1e10) / 1e10);
      outEl.textContent = formatNumber(v);
      justSolved = true;
      return;
    }
    const isOp = '+−×÷%'.includes(k);
    if (justSolved && !isOp) exprText = '';
    justSolved = false;
    exprText += k;
    show();
  };
  const KEYS = [['C', 'fn'], ['(', 'fn'], [')', 'fn'], ['÷', 'op'], ['7'], ['8'], ['9'], ['×', 'op'], ['4'], ['5'], ['6'], ['−', 'op'],
    ['1'], ['2'], ['3'], ['+', 'op'], ['%', 'fn'], ['0'], ['.'], ['=', 'eq']];
  const keyLabel = { '⌫': 'Delete', C: 'Clear', '÷': 'Divide', '×': 'Times', '−': 'Minus', '+': 'Plus', '%': 'Percent', '=': 'Equals' };
  const keys = KEYS.map(([k, cls]) => h('button', { type: 'button', class: cls || '', 'aria-label': keyLabel[k] || k, onclick: () => press(k) }, k));
  const close = h('button', { class: 'calc-x', type: 'button', 'aria-label': 'Close calculator', onclick: closeCalculator }, icon('close'));
  const back = h('button', { class: 'calc-x', type: 'button', 'aria-label': 'Delete', onclick: () => press('⌫') }, '⌫');
  const panel = h('div', { class: 'calc', role: 'dialog', 'aria-label': 'Calculator' },
    h('div', { class: 'calc-top' }, h('b', null, 'Calculator'), h('div', { style: 'display:flex;gap:6px' }, back, close)),
    h('div', { class: 'calc-screen' }, exprEl, outEl),
    h('div', { class: 'calc-keys' }, keys));
  // Typing on a keyboard works too.
  panel.addEventListener('keydown', e => {
    const map = { '*': '×', '/': '÷', '-': '−', Enter: '=', Backspace: '⌫', Escape: null };
    if (e.key === 'Escape') { closeCalculator(); return; }
    const k = e.key in map ? map[e.key] : e.key;
    if (k && /^[0-9.+()%×÷−=⌫]$/.test(k)) { e.preventDefault(); press(k); }
  });
  document.body.append(panel);
  openPanel = panel;
  keys[keys.length - 1].focus({ preventScroll: true });
}

// The calculator closes when you leave the question screen.
if (typeof window !== 'undefined') window.addEventListener('hashchange', closeCalculator);
