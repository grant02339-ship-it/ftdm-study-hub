// Time value of money: present value, rate, years and compounding -> future value with a growth chart.
import { h, fmt, frame, slider, segmented, stat, chart, tween, s, legend } from './kit.js';

// Future value of a lump sum. rate is annual (0.06 = 6%); m = compounding periods per year.
export function fv(pv, rate, years, m = 1) {
  return pv * Math.pow(1 + rate / m, m * years);
}

// Value at the end of each year 0..years (whole years).
export function growthSeries(pv, rate, years, m = 1) {
  return Array.from({ length: Math.round(years) + 1 }, (_, y) => fv(pv, rate, y, m));
}

const COMPOUND = [[1, 'Yearly'], [4, 'Quarterly'], [12, 'Monthly'], [365, 'Daily']];

function draw(svg, st, W, H) {
  const top = 22, bottom = 22, plotH = H - top - bottom;
  const years = Math.max(1, Math.round(st.years));
  const series = growthSeries(st.pv, st.rate, years, st.m);
  const max = Math.max(fv(st.pv, st.rate, st.years, st.m), st.pv) || 1;
  const n = series.length, gap = n > 25 ? 2 : 4;
  const bw = Math.max(2, (W - gap * (n - 1)) / n);
  const y = v => top + plotH - (v / max) * plotH;

  svg.append(s('line', { class: 'xp-grid', x1: 0, x2: W, y1: y(max), y2: y(max) }));
  svg.append(s('text', { class: 'xp-label', x: W, y: top - 8, 'text-anchor': 'end' }, fmt.money(series[n - 1], 0)));
  series.forEach((v, i) => {
    const x = i * (bw + gap), base = Math.min(st.pv, v);
    const r = Math.min(4, bw / 2);
    svg.append(s('rect', { class: 'xp-fill-dim', x, width: bw, y: y(base), height: Math.max(0, top + plotH - y(base)), rx: r }));
    if (v > base) {
      svg.append(s('rect', { class: 'xp-fill', x, width: bw, y: y(v), height: Math.max(0, y(base) - y(v) + r), rx: r }));
    }
  });
  svg.append(s('line', { class: 'xp-axis', x1: 0, x2: W, y1: top + plotH, y2: top + plotH }));
  svg.append(s('text', { class: 'xp-label', x: 0, y: H - 4 }, 'Today'));
  svg.append(s('text', { class: 'xp-label', x: W, y: H - 4, 'text-anchor': 'end' }, `Year ${years}`));
}

export function mount(el) {
  const root = frame(el, { label: 'Time value of money explainer' });
  const st = { pv: 1000, rate: 0.06, years: 10, m: 1 };

  const fvStat = stat('Future value', { big: true });
  const intStat = stat('Interest earned');
  const g = chart({ height: 190, label: '', draw });
  const ease = tween(cur => g.render(cur), st);

  const update = () => {
    const v = fv(st.pv, st.rate, st.years, st.m);
    fvStat.set(fmt.money(v));
    intStat.set(fmt.money(v - st.pv), st.pv > 0 ? `${fmt.num((v / st.pv - 1) * 100, 0)}% growth` : '');
    g.setLabel(`Growth of ${fmt.money(st.pv, 0)} to ${fmt.money(v)} over ${st.years} years`);
    ease(st);
  };

  root.append(
    h('div', { class: 'xp-stats' }, fvStat.el, intStat.el),
    g.el,
    legend([['xp-key-dim', 'What you put in'], ['xp-key', 'Interest earned']]),
    h('div', { class: 'xp-controls' },
      slider({ label: 'Present value', min: 100, max: 20000, step: 100, value: st.pv, format: v => fmt.money(v, 0),
        onInput: v => { st.pv = v; update(); } }).el,
      slider({ label: 'Annual rate', min: 0, max: 15, step: 0.25, value: st.rate * 100, format: v => `${v}%`,
        onInput: v => { st.rate = v / 100; update(); } }).el,
      slider({ label: 'Years', min: 1, max: 40, step: 1, value: st.years, format: v => `${v} ${v === 1 ? 'year' : 'years'}`,
        onInput: v => { st.years = v; update(); } }).el,
      segmented({ label: 'Compounding', options: COMPOUND, value: st.m, onChange: v => { st.m = v; update(); } }),
    ),
  );
  update();
}
