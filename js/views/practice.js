// Practice tab (#/practice): Quick 10, mistake review, mock exam, quiz by area, exam history.
import { h, icon, box } from '../ui.js';
import { LEVEL_NAME } from './learn.js';
import { glyph } from './quiz.js';
import { examEvent, NO_EXAM_NOTE } from '../event.js';
import { levelOf, mistakeIds, restoreExam, examProgress, formatClock } from '../practice-lib.js';

let areaSize = 10; // 10 or 20, remembered for the session

// Custom practice test length (1-100), remembered on this device.
const SIZE_KEY = 'dsb-test-size';
function savedSize() {
  try { const n = parseInt(localStorage.getItem(SIZE_KEY), 10); return n >= 1 && n <= 100 ? n : 20; } catch (e) { return 20; }
}

function customTestBox(lvl, max) {
  let size = Math.min(savedSize(), max);
  const input = h('input', { class: 'ct-num num', type: 'number', inputmode: 'numeric', min: '1', max: String(max), value: String(size), 'aria-label': 'Number of questions' });
  const start = h('a', { class: 'cta ct-start' });
  const chips = [10, 20, 30, 50].filter(v => v <= max).map(v => h('button', { class: 'lb-chip ct-chip', type: 'button', onclick: () => set(v) }, h('span', null, String(v))));
  function set(v, fromInput = false) {
    const n = Math.max(1, Math.min(max, Math.round(Number(v)) || 1));
    size = n;
    if (!fromInput || String(n) !== input.value) input.value = String(n);
    start.setAttribute('href', `#/quiz?mode=quick&n=${n}`);
    start.textContent = `Start ${n}-question test`;
    chips.forEach(c => c.classList.toggle('on', Number(c.textContent) === n));
    try { localStorage.setItem(SIZE_KEY, String(n)); } catch (e) { /* private mode */ }
  }
  input.addEventListener('input', () => { if (input.value !== '') set(input.value, true); });
  input.addEventListener('change', () => set(input.value));
  const step = (d, label) => h('button', { class: 'ct-step', type: 'button', 'aria-label': label, onclick: () => set(size + d) }, d < 0 ? '−' : '+');
  set(size);
  return box('Custom practice test', null, [
    h('p', { class: 'box-note ct-note' }, `Pick how many questions you want. They’re mixed like the ${lvl} exam.`),
    h('div', { class: 'ct-row' }, step(-1, 'One fewer question'), input, step(1, 'One more question')),
    h('div', { class: 'lb-chips ct-chips' }, chips),
    start]);
}

const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
const chev = () => h('span', { class: 'chev', 'aria-hidden': 'true' }, icon('chevron'));
const ico = iconEl => h('div', { class: 'ico' }, iconEl);

function row(href, iconEl, title, sub, trailing) {
  return h('a', { class: 'row', href }, ico(iconEl), h('div', { class: 't' }, title, sub ? h('small', null, sub) : null), trailing, chev());
}

function shortDate(s) {
  const [y, m, d] = String(s || '').split('-').map(Number);
  if (!y) return 'Mock exam';
  const date = new Date(y, m - 1, d);
  const sameYear = date.getFullYear() === new Date().getFullYear();
  return date.toLocaleDateString(undefined, sameYear ? { month: 'short', day: 'numeric' } : { month: 'short', day: 'numeric', year: 'numeric' });
}

export function render(el, params, ctx) {
  const { state, data } = ctx;
  const { QUESTIONS, AREAS, BLUEPRINT } = data;
  const level = levelOf(state);
  const lvl = LEVEL_NAME[level];

  // Quick start
  const mistakes = mistakeIds(state, QUESTIONS).length;
  const mistakeRow = mistakes
    ? row('#/quiz?mode=mistakes', icon('alert'), 'Mistake review', 'Questions you got wrong last time',
      h('span', { class: 'val hot' }, String(mistakes)))
    : h('div', { class: 'row off', 'aria-disabled': 'true' }, ico(icon('alert')),
      h('div', { class: 't' }, 'Mistake review', h('small', null, 'Nothing to review yet')), h('span', { class: 'val' }, '0'));

  let examSub = `100 questions on the ${lvl} blueprint · 60:00`;
  let examTitle = 'Full mock exam';
  const restored = state.activeExam ? restoreExam(state.activeExam, QUESTIONS) : null;
  if (restored) {
    const { answered } = examProgress(restored.exam);
    examTitle = 'Resume mock exam';
    examSub = `${answered} of ${restored.questions.length} answered · ${formatClock(restored.exam.remainingMs)} left`;
  }

  const quick = box('Quick start', null, [h('div', { class: 'group' },
    row('#/quiz?mode=quick&n=10', icon('practice'), 'Quick 10', `Mixed questions, weighted like the ${lvl} exam`),
    mistakeRow,
    ...(data.EVENT.noExam ? [] : [row('#/exam', icon('exam'), examTitle, examSub, restored ? h('span', { class: 'pr-live', 'aria-hidden': 'true' }) : null)])),
    data.EVENT.noExam ? h('p', { class: 'box-note' }, NO_EXAM_NOTE) : null]);

  // Quiz by area
  const counts = {};
  for (const q of QUESTIONS) counts[q.area] = (counts[q.area] || 0) + 1;
  const areaLinks = [];
  // Areas on the exam with no questions yet (e.g. new event content) are listed as empty.
  const soon = AREAS.filter(a => !counts[a.id] && BLUEPRINT[a.id] && BLUEPRINT[a.id][level])
    .map(a => h('div', { class: 'row off', 'aria-disabled': 'true' }, ico(icon(a.id)),
      h('div', { class: 't' }, a.name, h('small', null, 'No questions in this area yet.'))));
  const areaRows = AREAS.filter(a => counts[a.id]).map(a => {
    const items = BLUEPRINT[a.id] ? BLUEPRINT[a.id][level] : 0;
    const link = row('', icon(a.id), a.name, `${plural(counts[a.id], 'question')}${items ? '' : ` · not on the ${lvl} exam`}`);
    if (!items) link.classList.add('quiet');
    areaLinks.push([link, a.id, counts[a.id]]);
    return link;
  });
  const setHrefs = () => areaLinks.forEach(([a, id, max]) => a.setAttribute('href', `#/quiz?area=${encodeURIComponent(id)}&n=${Math.min(areaSize, max)}`));
  setHrefs();
  const seg = h('div', { class: 'xp-seg pr-seg', role: 'radiogroup', 'aria-label': 'Questions per quiz' },
    [10, 20].map(v => h('label', null,
      h('input', { type: 'radio', name: 'pr-size', value: String(v), checked: areaSize === v, onchange: () => { areaSize = v; setHrefs(); } }),
      h('span', null, `${v} questions`))));

  // History, newest first
  const history = state.exams.map((e, i) => ({ e, i })).filter(({ e }) => examEvent(e) === data.EVENT.id).reverse();
  const historyBody = history.length
    ? h('div', { class: 'group' }, history.map(({ e, i }) => {
      const pct = Math.round(e.percent ?? (e.total ? (e.score / e.total) * 100 : 0));
      const lv = LEVEL_NAME[e.level] || 'District';
      return row(`#/exam?result=${i}`, glyph('check'), shortDate(e.date), `${lv} · ${e.score ?? '—'} of ${e.total ?? 100} correct`,
        h('span', { class: `val${pct >= 70 ? ' hot' : ''}` }, `${pct}%`));
    }))
    : h('p', { class: 'box-note pr-empty' }, 'Your mock exam scores will show up here.');

  el.append(
    h('h1', { class: 'lt' }, 'Practice'),
    h('p', { class: 'sub' }, `${QUESTIONS.length} questions across ${Object.keys(counts).length} areas`),
    quick,
    data.EVENT.noExam ? null : customTestBox(lvl, Math.min(100, QUESTIONS.filter(q => BLUEPRINT[q.area] && BLUEPRINT[q.area][level]).length || QUESTIONS.length)),
    box('Leaderboard', null, [h('div', { class: 'group' },
      row('#/leaderboard', icon('trophy'), 'Worldwide leaderboard', state.leaderboard.optIn ? 'See where you rank this week' : 'See who’s studying the most this week'))]),
    box('Quiz by area', seg, h('div', { class: 'group' }, [...areaRows, ...soon]), { class: 'pr-areas' }),
    box('Mock exam history', history.length ? `${history.length} taken` : null, historyBody));
}
