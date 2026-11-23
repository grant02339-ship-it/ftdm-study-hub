// Supply and demand: shift either curve and watch the equilibrium price and quantity move.
import { h, fmt, frame, slider, stat, chart, tween, s } from './kit.js';

// Linear market: demand Qd = a + dShift − b·P, supply Qs = c + sShift + d·P.
export const DEFAULT_MARKET = { a: 120, b: 6, c: -20, d: 8 };
const P_MAX = 20, Q_MAX = 140;

// Equilibrium where Qd = Qs. Shifts are in units of quantity (positive = curve moves right).
export function equilibrium(m, dShift = 0, sShift = 0) {
  const p = (m.a + dShift - m.c - sShift) / (m.b + m.d);
  return { p, q: m.a + dShift - m.b * p };
}

function draw(svg, st, W, H) {
  const m = DEFAULT_MARKET;
  const left = 4, top = 16, bottom = 22, plotW = W - left, plotH = H - top - bottom;
  const x = q => left + (q / Q_MAX) * plotW;
  const y = p => top + plotH - (p / P_MAX) * plotH;
  // A curve as a line between P = 0 and P = P_MAX, drawn in (Q, P) space; the SVG clip keeps it in the plot.
  const curve = (cls, qAt, label) => {
    svg.append(s('line', { class: cls, x1: x(qAt(0)), y1: y(0), x2: x(qAt(P_MAX)), y2: y(P_MAX), 'clip-path': `url(#${clipId})` }));
    if (label) {
      const pl = label === 'D' ? P_MAX * 0.88 : P_MAX * 0.92;
      const qx = Math.min(Q_MAX - 4, Math.max(4, qAt(pl)));
      svg.append(s('text', { class: 'xp-label strong', x: x(qx) + 8, y: y(pl) + 4 }, label));
    }
  };
  const clipId = `sdclip-${W}`;
  const defs = s('defs');
  const cp = s('clipPath', { id: clipId });
  cp.append(s('rect', { x: left, y: top, width: plotW, height: plotH }));
  defs.append(cp);
  svg.append(defs);

  const shifted = Math.abs(st.ds) > 0.5 || Math.abs(st.ss) > 0.5;
  if (shifted) {
    curve('xp-line ghost', P => m.a - m.b * P);
    curve('xp-line ghost muted', P => m.c + m.d * P);
  }
  curve('xp-line', P => m.a + st.ds - m.b * P, 'D');
  curve('xp-line muted', P => m.c + st.ss + m.d * P, 'S');

  const e = equilibrium(m, st.ds, st.ss);
  svg.append(s('line', { class: 'xp-guide faint', x1: left, x2: x(e.q), y1: y(e.p), y2: y(e.p) }));
  svg.append(s('line', { class: 'xp-guide faint', x1: x(e.q), x2: x(e.q), y1: y(e.p), y2: top + plotH }));
  svg.append(s('circle', { class: 'xp-dot', cx: x(e.q), cy: y(e.p), r: 6 }));
  svg.append(s('line', { class: 'xp-axis', x1: left, x2: W, y1: top + plotH, y2: top + plotH }));
  svg.append(s('line', { class: 'xp-axis', x1: left, x2: left, y1: top, y2: top + plotH }));
  svg.append(s('text', { class: 'xp-label', x: left + 6, y: top - 4 }, 'Price'));
  svg.append(s('text', { class: 'xp-label', x: W, y: H - 4, 'text-anchor': 'end' }, 'Quantity'));
}

function story(ds, ss) {
  const d = Math.sign(Math.round(ds)), s2 = Math.sign(Math.round(ss));
  if (!d && !s2) return 'Drag a slider to shift demand or supply.';
  if (d && !s2) return d > 0 ? 'Demand rose: price and quantity both go up.' : 'Demand fell: price and quantity both go down.';
  if (!d && s2) return s2 > 0 ? 'Supply rose: price falls and quantity goes up.' : 'Supply fell: price rises and quantity goes down.';
  if (d === s2) return d > 0 ? 'Both rose: quantity goes up; price depends on which shift is bigger.'
    : 'Both fell: quantity goes down; price depends on which shift is bigger.';
  return d > 0 ? 'Demand up, supply down: price goes up; quantity depends on which shift is bigger.'
    : 'Demand down, supply up: price goes down; quantity depends on which shift is bigger.';
}

export function mount(el) {
  const root = frame(el, { label: 'Supply and demand explainer' });
  const st = { ds: 0, ss: 0 };
  const e0 = equilibrium(DEFAULT_MARKET);

  const pStat = stat('Equilibrium price', { big: true });
  const qStat = stat('Quantity');
  const why = h('p', { class: 'xp-why', 'aria-live': 'polite' });
  const g = chart({ height: 210, label: '', draw });
  const ease = tween(cur => g.render(cur), st);
  const delta = (v, base, f) => {
    const d = v - base;
    return Math.abs(d) < 0.005 ? 'No change' : `${d > 0 ? 'Up' : 'Down'} ${f(Math.abs(d))}`;
  };

  const update = () => {
    const e = equilibrium(DEFAULT_MARKET, st.ds, st.ss);
    pStat.set(fmt.money(e.p), delta(e.p, e0.p, v => fmt.money(v)));
    qStat.set(`${fmt.num(e.q)} units`, delta(e.q, e0.q, v => `${fmt.num(v)} units`));
    why.textContent = story(st.ds, st.ss);
    g.setLabel(`Equilibrium at ${fmt.money(e.p)} and ${fmt.num(e.q)} units.`);
    ease(st);
  };
  const shiftText = v => (v === 0 ? 'No shift' : v > 0 ? `Increase ${v}` : `Decrease ${-v}`);
  const dS = slider({ label: 'Demand', min: -40, max: 40, step: 1, value: 0, format: shiftText, onInput: v => { st.ds = v; update(); } });
  const sS = slider({ label: 'Supply', min: -40, max: 40, step: 1, value: 0, format: shiftText, onInput: v => { st.ss = v; update(); } });
  const reset = h('button', { type: 'button', class: 'xp-reset' }, 'Reset curves');
  reset.addEventListener('click', () => { st.ds = 0; st.ss = 0; dS.set(0); sS.set(0); update(); });

  root.append(
    h('div', { class: 'xp-stats' }, pStat.el, qStat.el),
    g.el,
    why,
    h('div', { class: 'xp-controls' }, dS.el, sS.el, reset),
  );
  update();
}
