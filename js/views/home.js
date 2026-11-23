// Home: readiness ring, last mock + streak, conference countdown, study next, cards due, mock exam.
import { h, icon, reducedMotion } from '../ui.js';
import { readiness, weakest, areaMastery } from '../progress.js';
import { dueCards } from '../srs.js';

const LEVEL = {
  district: { exam: 'district', meet: 'Districts' },
  association: { exam: 'state', meet: 'States' },
  icdc: { exam: 'ICDC', meet: 'ICDC' },
};
const R = 58, C = 2 * Math.PI * R;
const RING_KEY = 'ftdm.ringPlayed';
let ringPlayed = false;

const pad = n => String(n).padStart(2, '0');
export const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const dayNum = s => { const [y, m, d] = s.split('-').map(Number); return Math.round(Date.UTC(y, m - 1, d) / 86400000); };
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

// "States in 41 days" | "States is tomorrow" | "States is today" | null (unset/past/invalid)
export function countdown(confDate, level, today) {
  if (!confDate || !/^\d{4}-\d{2}-\d{2}$/.test(confDate)) return null;
  const days = dayNum(confDate) - dayNum(today);
  const meet = (LEVEL[level] || LEVEL.district).meet;
  if (days < 0 || Number.isNaN(days)) return null;
  if (days === 0) return `${meet} is today`;
  if (days === 1) return `${meet} is tomorrow`;
  return `${meet} in ${days} days`;
}

// Streak counts only if the last study day was today or yesterday.
export function liveStreak(streak, today) {
  if (!streak || !streak.lastDay) return 0;
  return dayNum(today) - dayNum(streak.lastDay) <= 1 ? streak.count : 0;
}

// 3 weakest areas once there's data; otherwise the heaviest areas on the blueprint.
export function studyNext(state, level, questions, areas, blueprint) {
  const answered = Object.keys(state.answers).length > 0;
  const ids = answered ? weakest(state, 3, questions, areas) : [];
  const byWeight = areas
    .map((a, i) => ({ id: a.id, i, w: blueprint[a.id] ? blueprint[a.id][level] : 0 }))
    .sort((x, y) => y.w - x.w || x.i - y.i)
    .map(a => a.id);
  for (const id of byWeight) { if (ids.length >= 3) break; if (!ids.includes(id)) ids.push(id); }
  return ids;
}

function playRingOnce() {
  if (ringPlayed) return false;
  ringPlayed = true;
  try {
    if (sessionStorage.getItem(RING_KEY)) return false;
    sessionStorage.setItem(RING_KEY, '1');
  } catch (e) { /* storage unavailable: the module flag still limits it to once */ }
  return !reducedMotion();
}

function ring(pct, examName) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 132 132');
  svg.setAttribute('aria-hidden', 'true');
  const mk = cls => {
    const c = document.createElementNS(svgNS, 'circle');
    c.setAttribute('class', cls);
    c.setAttribute('cx', '66'); c.setAttribute('cy', '66'); c.setAttribute('r', String(R));
    c.setAttribute('fill', 'none'); c.setAttribute('stroke-width', '14');
    svg.append(c);
    return c;
  };
  mk('track');
  const fill = mk('fill');
  fill.style.strokeDasharray = String(C);
  const num = h('b', null, '0%');
  const el = h('div', { class: 'ring', role: 'img', 'aria-label': `${pct}% ready for the ${examName} exam` },
    svg, h('div', { class: 'ring-num' }, h('div', null, num, h('span', null, 'ready'))));

  const target = C * (1 - pct / 100);
  if (pct <= 0) fill.classList.add('zero');
  if (pct > 0 && playRingOnce()) {
    fill.style.strokeDashoffset = String(C);
    requestAnimationFrame(() => setTimeout(() => {
      if (!el.isConnected) { fill.style.strokeDashoffset = String(target); num.textContent = `${pct}%`; return; }
      fill.getBoundingClientRect(); // commit the start position before transitioning
      fill.classList.add('anim');
      fill.style.strokeDashoffset = String(target);
      const start = performance.now();
      (function step(now) {
        const p = Math.min((now - start) / 1600, 1), e = 1 - Math.pow(1 - p, 4);
        num.textContent = `${Math.round(pct * e)}%`;
        if (p < 1 && el.isConnected) requestAnimationFrame(step);
        else num.textContent = `${pct}%`;
      })(start);
    }, 300));
  } else {
    if (pct <= 0) playRingOnce(); // an empty ring still counts as the session's first showing
    fill.style.strokeDashoffset = String(target);
    num.textContent = `${pct}%`;
  }
  return el;
}

function row(href, iconName, title, sub, trailing) {
  return h('a', { class: 'row', href },
    h('div', { class: 'ico' }, icon(iconName)),
    h('div', { class: 't' }, title, sub ? h('small', null, sub) : null),
    trailing,
    h('span', { class: 'chev', 'aria-hidden': 'true' }, icon('chevron')));
}

export function render(el, params, ctx) {
  const { state, data } = ctx;
  const { AREAS, BLUEPRINT, QUESTIONS, CARDS } = data;
  const level = LEVEL[state.settings.level] ? state.settings.level : 'district';
  const examName = LEVEL[level].exam;
  const today = ymd(new Date());

  // Title row with the phone-only settings gear.
  const titleRow = h('div', { class: 'lt-row' },
    h('h1', { class: 'lt' }, 'Today'),
    h('a', { class: 'icon-btn only-phone', href: '#/settings', 'aria-label': 'Settings' }, icon('settings')));

  const cd = countdown(state.settings.confDate, level, today);
  const sub = h('p', { class: 'sub' }, cd || h('a', { href: '#/settings' }, 'Set your conference date'));

  // Ring + stats
  const pct = Math.round(readiness(state, level, QUESTIONS, BLUEPRINT));
  const last = state.exams.length ? state.exams[state.exams.length - 1] : null;
  const lastVal = last ? (last.percent ?? last.score) : null;
  const streak = liveStreak(state.streak, today);
  const ringCard = h('section', { class: 'ringwrap', 'aria-label': 'Readiness' },
    ring(pct, examName),
    h('div', { class: 'ringmeta' },
      h('div', null, h('b', null, lastVal == null ? '—' : `${Math.round(lastVal)}%`), 'Last mock exam'),
      h('div', null, h('b', null, plural(streak, 'day')), 'Study streak')));
  const answered = Object.keys(state.answers).length > 0;
  const note = answered ? null : h('p', { class: 'note' }, 'Your ring fills as you answer practice questions.');

  // Study next
  const ids = studyNext(state, level, QUESTIONS, AREAS, BLUEPRINT);
  const nameOf = id => (AREAS.find(a => a.id === id) || { name: id }).name;
  const studyRows = ids.map(id => {
    const has = QUESTIONS.some(q => q.area === id);
    const m = has ? areaMastery(state, QUESTIONS, id) : 0;
    const items = BLUEPRINT[id] ? BLUEPRINT[id][level] : 0;
    const scored = has && answered;
    const sub = scored ? `${Math.round(m * 100)}% mastered` : `${plural(items, 'question')} on the ${examName} exam`;
    // The bar only appears once there's mastery to show; before that the row keeps its width for text.
    const bar = scored ? h('div', { class: 'bar', 'aria-hidden': 'true' }, h('i', { style: `width:${Math.round(m * 100)}%` })) : null;
    return row(`#/learn/${encodeURIComponent(id)}`, id, nameOf(id), sub, bar);
  });

  // Cards due
  const due = dueCards(CARDS, state, Date.now()).length;
  const cardSub = !CARDS.length ? 'No flashcards yet'
    : due ? 'Review them to keep them fresh' : 'You’re all caught up';
  const cardsRow = row('#/cards', 'cards', 'Cards due', cardSub,
    h('span', { class: `val${due ? ' hot' : ''}` }, String(due)));

  // Mock exam
  const resume = !!state.activeExam;
  const cta = h('a', { class: 'cta', href: '#/exam' }, resume ? 'Resume mock exam' : 'Start mock exam');
  const ctaNote = h('p', { class: 'cta-note' },
    resume ? 'Pick up where you left off.' : `100 questions, ${examName} blueprint`);

  el.append(...[
    titleRow, sub, ringCard, note,
    h('h2', { class: 'gh' }, 'Study next'), h('div', { class: 'group' }, studyRows),
    h('h2', { class: 'gh' }, 'Flashcards'), h('div', { class: 'group' }, cardsRow),
    cta, ctaNote,
  ].filter(Boolean));
}
