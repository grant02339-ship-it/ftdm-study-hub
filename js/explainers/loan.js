// Loan payment: principal, rate and term -> monthly payment and a year-by-year amortization.
import { h, fmt, frame, slider, stat, chart, tween, s, legend } from './kit.js';

// Monthly payment on a fully amortizing loan. rate is annual (0.06 = 6%).
export function loanPayment(principal, rate, years) {
  const n = Math.round(years * 12), r = rate / 12;
  if (n <= 0) return 0;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

// One row per year: interest and principal paid that year, and the balance left at year end.
export function amortization(principal, rate, years) {
  const pay = loanPayment(principal, rate, years), r = rate / 12, n = Math.round(years * 12);
  const rows = [];
  let bal = principal, yi = 0, yp = 0;
  for (let k = 1; k <= n; k++) {
    const i = bal * r, p = Math.min(pay - i, bal);
    bal -= p; yi += i; yp += p;
    if (k % 12 === 0 || k === n) {
      rows.push({ year: Math.ceil(k / 12), interest: yi, principal: yp, balance: Math.abs(bal) < 0.005 ? 0 : bal });
      yi = 0; yp = 0;
    }
  }
  return rows;
}

function draw(svg, st, W, H) {
  const top = 8, bottom = 22, plotH = H - top - bottom;
  const rows = amortization(st.p, st.rate, Math.max(1, Math.round(st.years)));
  const max = Math.max(...rows.map(r => r.interest + r.principal)) || 1;
  const n = rows.length, gap = n > 25 ? 2 : 3;
  const bw = Math.max(2, (W - gap * (n - 1)) / n);
  const base = top + plotH;
  rows.forEach((r, i) => {
    const x = i * (bw + gap), hp = (r.principal / max) * plotH, hi = (r.interest / max) * plotH;
    const rad = Math.min(3, bw / 2);
    svg.append(s('rect', { class: 'xp-fill', x, width: bw, y: base - hp, height: hp, rx: rad }));
    if (hi > 0.5) svg.append(s('rect', { class: 'xp-fill-dim', x, width: bw, y: base - hp - hi, height: hi + rad, rx: rad }));
  });
  svg.append(s('line', { class: 'xp-axis', x1: 0, x2: W, y1: base, y2: base }));
  svg.append(s('text', { class: 'xp-label', x: 0, y: H - 4 }, 'Year 1'));
  svg.append(s('text', { class: 'xp-label', x: W, y: H - 4, 'text-anchor': 'end' }, `Year ${n}`));
}

function scheduleTable(rows) {
  return h('table', { class: 'xp-table' },
    h('thead', null, h('tr', null, h('th', null, 'Year'), h('th', null, 'Interest'), h('th', null, 'Principal'), h('th', null, 'Balance'))),
    h('tbody', null, rows.map(r => h('tr', null,
      h('td', null, String(r.year)), h('td', null, fmt.money(r.interest, 0)),
      h('td', null, fmt.money(r.principal, 0)), h('td', null, fmt.money(r.balance, 0))))));
}

export function mount(el) {
  const root = frame(el, { label: 'Loan payment explainer' });
  const st = { p: 200000, rate: 0.06, years: 30 };

  const payStat = stat('Monthly payment', { big: true });
  const intStat = stat('Total interest');
  const g = chart({ height: 170, label: '', draw });
  const ease = tween(cur => g.render(cur), st);
  const tableWrap = h('div', { class: 'xp-table-wrap' });
  const details = h('details', { class: 'xp-details' }, h('summary', null, 'Show the yearly schedule'), tableWrap);

  const update = () => {
    const pay = loanPayment(st.p, st.rate, st.years);
    const rows = amortization(st.p, st.rate, st.years);
    const interest = rows.reduce((t, r) => t + r.interest, 0);
    payStat.set(fmt.money(pay), `${st.years * 12} payments`);
    intStat.set(fmt.money(interest, 0), `${fmt.money(st.p + interest, 0)} paid in all`);
    g.setLabel(`Each year's payments split into principal and interest over ${st.years} years`);
    if (details.open) tableWrap.replaceChildren(scheduleTable(rows));
    else tableWrap.replaceChildren();
    ease(st);
  };
  details.addEventListener('toggle', update);

  root.append(
    h('div', { class: 'xp-stats' }, payStat.el, intStat.el),
    g.el,
    legend([['xp-key', 'Principal paid'], ['xp-key-dim', 'Interest paid']]),
    h('div', { class: 'xp-controls' },
      slider({ label: 'Loan amount', min: 5000, max: 500000, step: 5000, value: st.p, format: v => fmt.money(v, 0),
        onInput: v => { st.p = v; update(); } }).el,
      slider({ label: 'Annual rate', min: 0, max: 12, step: 0.125, value: st.rate * 100, format: v => `${v}%`,
        onInput: v => { st.rate = v / 100; update(); } }).el,
      slider({ label: 'Term', min: 1, max: 40, step: 1, value: st.years, format: v => `${v} ${v === 1 ? 'year' : 'years'}`,
        onInput: v => { st.years = v; update(); } }).el,
    ),
    details,
  );
  update();
}
