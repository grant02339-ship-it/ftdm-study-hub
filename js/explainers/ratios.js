// Financial ratios: type in balance-sheet and income-statement lines and watch 8 ratios update.
import { h, fmt, frame } from './kit.js';

// Each returns null when the denominator is zero (the ratio isn't defined).
const div = (a, b) => (b === 0 || !Number.isFinite(a) || !Number.isFinite(b) ? null : a / b);
export const currentRatio = (currentAssets, currentLiabilities) => div(currentAssets, currentLiabilities);
export const quickRatio = (currentAssets, inventory, currentLiabilities) => div(currentAssets - inventory, currentLiabilities);
export const debtRatio = (totalLiabilities, totalAssets) => div(totalLiabilities, totalAssets);
export const debtToEquity = (totalLiabilities, equity) => div(totalLiabilities, equity);
export const grossMargin = (revenue, cogs) => div(revenue - cogs, revenue);
export const netMargin = (netIncome, revenue) => div(netIncome, revenue);
export const roa = (netIncome, totalAssets) => div(netIncome, totalAssets);
export const roe = (netIncome, equity) => div(netIncome, equity);

// lines: {currentAssets, inventory, currentLiabilities, totalAssets, totalLiabilities, revenue, cogs, netIncome}
// Equity is derived (assets − liabilities) so the balance sheet always balances.
export function computeRatios(l) {
  const equity = l.totalAssets - l.totalLiabilities;
  return [
    { id: 'current', kind: 'x', name: 'Current ratio', formula: 'Current assets ÷ Current liabilities',
      value: currentRatio(l.currentAssets, l.currentLiabilities), hint: 'Above 1 means short-term bills are covered.' },
    { id: 'quick', kind: 'x', name: 'Quick ratio', formula: '(Current assets − Inventory) ÷ Current liabilities',
      value: quickRatio(l.currentAssets, l.inventory, l.currentLiabilities), hint: 'A stricter test that leaves out inventory.' },
    { id: 'debt', kind: '%', name: 'Debt ratio', formula: 'Total liabilities ÷ Total assets',
      value: debtRatio(l.totalLiabilities, l.totalAssets), hint: 'Share of assets paid for with borrowed money.' },
    { id: 'de', kind: 'x', name: 'Debt-to-equity', formula: 'Total liabilities ÷ Owners’ equity',
      value: debtToEquity(l.totalLiabilities, equity), hint: 'Higher means more leverage and more risk.' },
    { id: 'gm', kind: '%', name: 'Gross profit margin', formula: '(Revenue − COGS) ÷ Revenue',
      value: grossMargin(l.revenue, l.cogs), hint: 'What’s left of each sales dollar after product costs.' },
    { id: 'nm', kind: '%', name: 'Net profit margin', formula: 'Net income ÷ Revenue',
      value: netMargin(l.netIncome, l.revenue), hint: 'What’s left after every expense.' },
    { id: 'roa', kind: '%', name: 'Return on assets', formula: 'Net income ÷ Total assets',
      value: roa(l.netIncome, l.totalAssets), hint: 'How well assets turn into profit.' },
    { id: 'roe', kind: '%', name: 'Return on equity', formula: 'Net income ÷ Owners’ equity',
      value: roe(l.netIncome, equity), hint: 'Profit earned on the owners’ investment.' },
  ];
}

const FIELDS = {
  'Balance sheet': [
    ['currentAssets', 'Current assets', 50000],
    ['inventory', 'Inventory', 20000],
    ['currentLiabilities', 'Current liabilities', 25000],
    ['totalAssets', 'Total assets', 150000],
    ['totalLiabilities', 'Total liabilities', 60000],
  ],
  'Income statement': [
    ['revenue', 'Revenue', 200000],
    ['cogs', 'Cost of goods sold', 120000],
    ['netIncome', 'Net income', 20000],
  ],
};

const parse = txt => {
  const t = String(txt).replace(/[$,\s]/g, '').replace(/^−/, '-');
  return t === '' || !/^-?\d*\.?\d+$/.test(t) ? NaN : Number(t);
};
const show = r => (r.value == null || !Number.isFinite(r.value)) ? '—'
  : r.kind === '%' ? `${(r.value * 100).toFixed(1)}%` : `${r.value.toFixed(2)}`;

export function mount(el) {
  const root = frame(el, { label: 'Financial ratios explainer' });
  const lines = {};
  const tiles = new Map();
  const equityOut = h('span', { class: 'num xp-derived' });

  const grid = h('div', { class: 'xp-ratios' });
  for (const r of computeRatios({ currentAssets: 0, inventory: 0, currentLiabilities: 0, totalAssets: 0, totalLiabilities: 0, revenue: 0, cogs: 0, netIncome: 0 })) {
    const val = h('b', { class: 'num' });
    tiles.set(r.id, val);
    grid.append(h('div', { class: 'xp-ratio' },
      h('small', null, r.name), val, h('span', { class: 'xp-formula' }, r.formula), h('span', { class: 'xp-hint' }, r.hint)));
  }

  const update = () => {
    const equity = lines.totalAssets - lines.totalLiabilities;
    equityOut.textContent = Number.isFinite(equity) ? fmt.money(equity, 0) : '—';
    // A blank or invalid line makes only the ratios that use it show "—" (div() rejects NaN).
    for (const r of computeRatios(lines)) tiles.get(r.id).textContent = show(r);
  };

  const groups = Object.entries(FIELDS).map(([title, fields]) => {
    const rows = fields.map(([key, label, def]) => {
      lines[key] = def;
      const id = `xp-in-${key}-${Math.random().toString(36).slice(2, 7)}`;
      const input = h('input', { id, class: 'num', type: 'text', inputmode: 'decimal', autocomplete: 'off',
        spellcheck: 'false', value: def.toLocaleString('en-US') });
      input.addEventListener('input', () => {
        lines[key] = parse(input.value);
        input.toggleAttribute('aria-invalid', !Number.isFinite(lines[key]));
        update();
      });
      input.addEventListener('focus', () => input.select());
      return h('div', { class: 'xp-input-row' }, h('label', { for: id }, label), input);
    });
    if (title === 'Balance sheet') {
      rows.push(h('div', { class: 'xp-input-row derived' }, h('span', null, 'Owners’ equity'), equityOut));
    }
    return h('div', { class: 'xp-input-group' }, h('h5', null, `${title} (dollars)`), h('div', { class: 'xp-inputs' }, rows));
  });

  root.append(h('div', { class: 'xp-input-cols' }, groups), grid);
  update();
}
