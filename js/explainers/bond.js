// Bond pricing: coupon rate, market rate and years -> price, and why it sits at a discount or premium.
import { h, fmt, frame, slider, segmented, stat, chart, tween, s } from './kit.js';

// Present value of the coupons plus the face value. freq = coupon payments per year.
export function bondPrice(face, couponRate, marketRate, years, freq = 1) {
  const n = Math.round(years * freq), c = (face * couponRate) / freq, r = marketRate / freq;
  if (r === 0) return c * n + face;
  const disc = Math.pow(1 + r, -n);
  return (c * (1 - disc)) / r + face * disc;
}

// 'discount' | 'par' | 'premium' (within half a cent counts as par)
export function bondLabel(price, face) {
  const d = price - face;
  if (Math.abs(d) < 0.005) return 'par';
  return d < 0 ? 'discount' : 'premium';
}

const FACE = 1000, R_MAX = 0.12;

function draw(svg, st, W, H) {
  const top = 14, bottom = 24, left = 0, plotH = H - top - bottom;
  const price = r => bondPrice(FACE, st.coupon, r, st.years, st.freq);
  const hi = price(0), lo = price(R_MAX);
  const yMax = Math.max(hi, FACE) * 1.04, yMin = Math.min(lo, FACE) * 0.96;
  const x = r => left + (r / R_MAX) * (W - left);
  const y = v => top + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

  // Par line
  svg.append(s('line', { class: 'xp-guide', x1: 0, x2: W, y1: y(FACE), y2: y(FACE) }));
  svg.append(s('text', { class: 'xp-label', x: W, y: y(FACE) - 6, 'text-anchor': 'end' }, 'Par $1,000'));
  // Price curve
  let d = '';
  for (let i = 0; i <= 48; i++) { const r = (i / 48) * R_MAX; d += `${i ? 'L' : 'M'}${x(r).toFixed(1)} ${y(price(r)).toFixed(1)}`; }
  svg.append(s('path', { class: 'xp-line', d }));
  // Coupon marker: where price = par
  svg.append(s('line', { class: 'xp-guide faint', x1: x(st.coupon), x2: x(st.coupon), y1: top, y2: top + plotH }));
  // Current point
  const p = price(st.market);
  svg.append(s('circle', { class: 'xp-dot', cx: x(st.market), cy: y(p), r: 6 }));
  svg.append(s('line', { class: 'xp-axis', x1: 0, x2: W, y1: top + plotH, y2: top + plotH }));
  svg.append(s('text', { class: 'xp-label', x: 0, y: H - 6 }, 'Market rate 0%'));
  svg.append(s('text', { class: 'xp-label', x: W, y: H - 6, 'text-anchor': 'end' }, '12%'));
}

const WHY = {
  discount: 'Market rate is above the coupon, so the bond sells for less than face value.',
  par: 'Market rate equals the coupon, so the bond sells at face value.',
  premium: 'Coupon beats the market rate, so buyers pay more than face value.',
};

export function mount(el) {
  const root = frame(el, { label: 'Bond price explainer' });
  const st = { coupon: 0.05, market: 0.06, years: 10, freq: 1 };

  const priceStat = stat('Bond price', { big: true });
  const kindStat = stat('Sells at a');
  const why = h('p', { class: 'xp-why' });
  const g = chart({ height: 180, label: '', draw });
  const ease = tween(cur => g.render(cur), st);

  const update = () => {
    const p = bondPrice(FACE, st.coupon, st.market, st.years, st.freq);
    const kind = bondLabel(p, FACE);
    priceStat.set(fmt.money(p), `per ${fmt.money(FACE, 0)} face value`);
    kindStat.set(kind === 'par' ? 'Par' : kind === 'discount' ? 'Discount' : 'Premium',
      kind === 'par' ? 'Price equals face' : `${fmt.money(Math.abs(p - FACE))} ${kind === 'discount' ? 'below' : 'above'} face`);
    why.textContent = WHY[kind];
    g.setLabel(`Bond price falls as the market rate rises. At ${fmt.pct(st.market)} the price is ${fmt.money(p)}.`);
    ease(st);
  };

  root.append(
    h('div', { class: 'xp-stats' }, priceStat.el, kindStat.el),
    g.el,
    why,
    h('div', { class: 'xp-controls' },
      slider({ label: 'Coupon rate', min: 0, max: 12, step: 0.25, value: st.coupon * 100, format: v => `${v}%`,
        onInput: v => { st.coupon = v / 100; update(); } }).el,
      slider({ label: 'Market rate', min: 0, max: 12, step: 0.25, value: st.market * 100, format: v => `${v}%`,
        onInput: v => { st.market = v / 100; update(); } }).el,
      slider({ label: 'Years to maturity', min: 1, max: 30, step: 1, value: st.years, format: v => `${v} ${v === 1 ? 'year' : 'years'}`,
        onInput: v => { st.years = v; update(); } }).el,
      segmented({ label: 'Coupon payments', options: [[1, 'Yearly'], [2, 'Twice a year']], value: st.freq,
        onChange: v => { st.freq = v; update(); } }),
    ),
  );
  update();
}
