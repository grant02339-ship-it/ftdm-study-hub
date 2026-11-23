// Break-even: fixed cost, price and variable cost -> break-even units and revenue, with a cost/revenue chart.
import { h, fmt, frame, slider, stat, chart, tween, s, legend, niceMax } from './kit.js';

// Units needed to cover fixed costs, or null if each sale doesn't add a positive contribution margin.
export function breakevenUnits(fixed, price, variable) {
  const cm = price - variable;
  return cm > 0 ? fixed / cm : null;
}

export function breakevenRevenue(fixed, price, variable) {
  const u = breakevenUnits(fixed, price, variable);
  return u == null ? null : u * price;
}

export function profitAt(units, fixed, price, variable) {
  return units * (price - variable) - fixed;
}

function draw(svg, st, W, H) {
  const top = 10, bottom = 22, plotH = H - top - bottom;
  const be = breakevenUnits(st.fixed, st.price, st.variable);
  const xMax = niceMax(be == null ? Math.max(1000, st.fixed / Math.max(1, st.price)) * 2 : be * 2);
  const yMax = Math.max(xMax * st.price, st.fixed + xMax * st.variable) * 1.05 || 1;
  const x = u => (u / xMax) * W;
  const y = v => top + plotH - (v / yMax) * plotH;
  const rev = u => u * st.price, cost = u => st.fixed + u * st.variable;

  if (be != null) {
    // Loss wedge before break-even, profit wedge after.
    svg.append(s('path', { class: 'xp-area-bad', d: `M0 ${y(cost(0))}L${x(be)} ${y(rev(be))}L0 ${y(0)}Z` }));
    svg.append(s('path', { class: 'xp-area-good', d: `M${x(be)} ${y(rev(be))}L${W} ${y(rev(xMax))}L${W} ${y(cost(xMax))}Z` }));
    svg.append(s('line', { class: 'xp-guide faint', x1: x(be), x2: x(be), y1: y(rev(be)), y2: top + plotH }));
  }
  svg.append(s('line', { class: 'xp-guide', x1: 0, x2: W, y1: y(st.fixed), y2: y(st.fixed) }));
  svg.append(s('line', { class: 'xp-line muted', x1: 0, y1: y(cost(0)), x2: W, y2: y(cost(xMax)) }));
  svg.append(s('line', { class: 'xp-line', x1: 0, y1: y(0), x2: W, y2: y(rev(xMax)) }));
  if (be != null) svg.append(s('circle', { class: 'xp-dot', cx: x(be), cy: y(rev(be)), r: 6 }));
  svg.append(s('line', { class: 'xp-axis', x1: 0, x2: W, y1: top + plotH, y2: top + plotH }));
  svg.append(s('text', { class: 'xp-label', x: 0, y: H - 4 }, '0 units'));
  svg.append(s('text', { class: 'xp-label', x: W, y: H - 4, 'text-anchor': 'end' }, `${fmt.num(xMax)} units`));
}

export function mount(el) {
  const root = frame(el, { label: 'Break-even explainer' });
  const st = { fixed: 50000, price: 25, variable: 15 };

  const unitsStat = stat('Break-even point', { big: true });
  const revStat = stat('Break-even revenue');
  const why = h('p', { class: 'xp-why' });
  const g = chart({ height: 190, label: '', draw });
  const ease = tween(cur => g.render(cur), st);

  const update = () => {
    const u = breakevenUnits(st.fixed, st.price, st.variable);
    const cm = st.price - st.variable;
    if (u == null) {
      unitsStat.set('Never', 'Price must be above variable cost');
      revStat.set('—');
      why.textContent = 'Each sale loses money or breaks even, so more sales can never cover fixed costs.';
    } else {
      const whole = Math.ceil(u - 1e-9);
      unitsStat.set(`${fmt.num(whole)} units`, `${fmt.money(cm)} contribution margin per unit`);
      revStat.set(fmt.money(whole * st.price, 0));
      why.textContent = `Each unit sold puts ${fmt.money(cm)} toward ${fmt.money(st.fixed, 0)} of fixed costs. Every unit past ${fmt.num(whole)} is profit.`;
    }
    g.setLabel(u == null ? 'Revenue never catches up with total cost.'
      : `Revenue line crosses the total cost line at ${fmt.num(Math.ceil(u - 1e-9))} units.`);
    ease(st);
  };

  root.append(
    h('div', { class: 'xp-stats' }, unitsStat.el, revStat.el),
    g.el,
    legend([['xp-key', 'Revenue'], ['xp-key-muted', 'Total cost'], ['xp-key-guide', 'Fixed cost']]),
    why,
    h('div', { class: 'xp-controls' },
      slider({ label: 'Fixed costs', min: 1000, max: 200000, step: 1000, value: st.fixed, format: v => fmt.money(v, 0),
        onInput: v => { st.fixed = v; update(); } }).el,
      slider({ label: 'Price per unit', min: 1, max: 100, step: 1, value: st.price, format: v => fmt.money(v, 0),
        onInput: v => { st.price = v; update(); } }).el,
      slider({ label: 'Variable cost per unit', min: 0, max: 100, step: 1, value: st.variable, format: v => fmt.money(v, 0),
        onInput: v => { st.variable = v; update(); } }).el,
    ),
  );
  update();
}
