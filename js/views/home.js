// Home: greeting + event, readiness ring with weekly change and countdown, Today's plan, streak and last mock.
import { h, icon, box, reducedMotion } from '../ui.js';
import { readiness, masteryCounts } from '../progress.js';
import { examEvent, NO_EXAM_NOTE } from '../event.js';
import { eventChip } from '../picker.js';
import { myRank } from '../leaderboard.js';
import { restoreExam, examProgress, formatClock } from '../practice-lib.js';
import {
  greeting, isNewStudent, ensurePlan, notePlanProgress, isPlanDone, nextTask, planMinutes, logReadiness, weeklyDelta,
} from '../foryou.js';

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

function playRingOnce() {
  if (ringPlayed) return false;
  ringPlayed = true;
  try {
    if (sessionStorage.getItem(RING_KEY)) return false;
    sessionStorage.setItem(RING_KEY, '1');
  } catch (e) { /* storage unavailable: the module flag still limits it to once */ }
  return !reducedMotion();
}

function ring(pct, label) {
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
  const el = h('div', { class: 'ring', role: 'img', 'aria-label': label },
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

const chev = () => h('span', { class: 'chev', 'aria-hidden': 'true' }, icon('chevron'));

function tile(href, iconName, value, label, extra = '') {
  const kids = [h('span', { class: 'tile-ico', 'aria-hidden': 'true' }, icon(iconName)),
    h('b', { class: 'tile-v num' }, value), h('span', { class: 'tile-l' }, label)];
  return href ? h('a', { class: `box tile${extra}`, href }, kids) : h('div', { class: `box tile${extra}` }, kids);
}

// Slim stacked bar (mastered / learning / not started) with counts and the one-line rule.
function masteryBar(c) {
  if (!c.total) return null;
  const learning = c.learning + c.fading;
  const seg = (cls, n) => (n ? h('i', { class: cls, style: `flex:${n}` }) : null);
  return h('div', { class: 'hm-mastery' },
    h('div', { class: 'hm-mbar', role: 'img', 'aria-label': `${c.mastered} mastered, ${learning} learning, ${c.notStarted} not started` },
      seg('m', c.mastered), seg('l', learning), seg('n', c.notStarted)),
    h('p', { class: 'hm-mleg' },
      h('span', { class: 'm' }, `${c.mastered} mastered`), ' · ', h('span', { class: 'l' }, `${learning} learning`), ' · ',
      h('span', { class: 'n' }, `${c.notStarted} to go`)),
    h('p', { class: 'hm-mnote' }, 'Mastered = right 3 times in a row, on 2 different days.'));
}

export function render(el, params, ctx) {
  const { state, data } = ctx;
  const { QUESTIONS, BLUEPRINT, CARDS } = data;
  const level = LEVEL[state.settings.level] ? state.settings.level : 'district';
  const examName = LEVEL[level].exam;
  const now = new Date();
  const today = ymd(now);
  const noExam = !!data.EVENT.noExam;
  const rerender = () => { el.replaceChildren(); render(el, params, ctx); };
  let dirty = false;

  // Header: greeting, event chip, settings.
  const hi = greeting(state.settings.name, now.getHours(), { fresh: isNewStudent(state), lastDay: state.streak.lastDay, today });
  const head = h('section', { class: 'box hm-head', 'aria-label': 'Welcome' },
    h('div', { class: 'hm-hi' },
      h('h1', { class: 'lt hm-title' }, hi),
      h('div', { class: 'hm-chip' }, eventChip(ctx, rerender))),
    h('a', { class: 'icon-btn', href: '#/settings', 'aria-label': 'Settings' }, icon('settings')));

  // Mock exam in progress.
  let resume = null;
  const restored = !noExam && state.activeExam ? restoreExam(state.activeExam, QUESTIONS) : null;
  if (restored) {
    const { answered } = examProgress(restored.exam);
    resume = h('a', { class: 'box accent hm-resume', href: '#/exam' },
      h('div', { class: 'ico' }, icon('exam')),
      h('div', { class: 't' }, 'Resume mock exam',
        h('small', null, `${answered} of ${restored.questions.length} answered · ${formatClock(restored.exam.remainingMs)} left`)),
      h('span', { class: 'pr-live', 'aria-hidden': 'true' }), chev());
  }

  // Readiness: ring, change this week, countdown.
  const pct = Math.round(readiness(state, level, QUESTIONS, BLUEPRINT));
  if (logReadiness(state, today, pct)) dirty = true;
  const delta = weeklyDelta(state.readinessLog, today);
  const cd = countdown(state.settings.confDate, level, today);
  const answered = QUESTIONS.some(q => state.answers[q.id]);
  const deltaEl = delta == null ? null
    : h('p', { class: `hm-delta${delta > 0 ? ' up' : delta < 0 ? ' down' : ''}` },
      delta === 0 ? 'Same as last week' : `${delta > 0 ? '+' : '−'}${Math.abs(delta)}% this week`);
  const readyBox = box('Readiness', cd || h('a', { href: '#/settings' }, 'Set conference date'),
    [h('div', { class: 'hm-ready' },
      ring(pct, `${pct}% ready for the ${examName} exam`),
      h('div', { class: 'hm-rmeta' },
        deltaEl,
        h('p', { class: 'hm-rl' }, noExam ? 'Mastery across your event’s practice questions' : `Ready for the ${examName} exam`),
        answered ? null : h('p', { class: 'hm-rhint' }, 'Your ring fills as you answer practice questions.'))),
    masteryBar(masteryCounts(state, QUESTIONS, Date.now())),
    noExam ? h('p', { class: 'box-note' }, NO_EXAM_NOTE) : null], { class: 'hm-readybox' });

  // Today's plan: three tasks fixed for the day, checked off as they're done.
  const plan = ensurePlan(state, data, level, today);
  if (notePlanProgress(state, today)) dirty = true;
  let planBox = null;
  if (plan.tasks.length) {
    const rows = plan.tasks.map(t => {
      const done = isPlanDone(state, today, t.id);
      return h('a', { class: `row plan-row${done ? ' done' : ''}`, href: t.href },
        h('span', { class: 'pcheck', 'aria-hidden': 'true' }, icon('check')),
        h('div', { class: 't' }, done ? h('span', { class: 'sr-only' }, 'Done: ') : null, t.title, t.sub ? h('small', null, t.sub) : null),
        h('span', { class: 'tag' }, `${t.min} min`), chev());
    });
    const left = plan.tasks.filter(t => !isPlanDone(state, today, t.id));
    const next = nextTask(state, plan, today);
    const total = planMinutes(plan);
    const meta = !left.length ? 'All done' : left.length === plan.tasks.length ? `${total} min`
      : `${left.reduce((t, k) => t + k.min, 0)} min left`;
    planBox = box('Today’s plan', meta, [
      h('div', { class: 'group' }, rows),
      next ? h('a', { class: 'cta', href: next.href }, 'Continue plan')
        : h('p', { class: 'plan-done' }, h('span', { 'aria-hidden': 'true' }, icon('check')), 'Plan done for today. Nice work!'),
    ], { class: 'hm-plan' });
  }

  // Tiles: streak and last mock (cards known for an event with no exam).
  const streak = liveStreak(state.streak, today);
  let second;
  if (noExam) {
    const known = CARDS.filter(c => state.cards[c.id] && state.cards[c.id].known).length;
    second = tile('#/cards', 'cards', `${known}/${CARDS.length}`, 'Cards known');
  } else {
    const mine = state.exams.filter(e => examEvent(e) === data.EVENT.id);
    const last = mine.length ? mine[mine.length - 1] : null;
    const lastVal = last ? Math.round(last.percent ?? last.score) : null;
    second = tile(last ? `#/exam?result=${state.exams.lastIndexOf(last)}` : '#/exam', 'exam',
      lastVal == null ? '—' : `${lastVal}%`, lastVal == null ? 'No mock yet' : 'Last mock');
  }
  // Leaderboard tile: your place from the last board this device saw, or an invitation to join.
  const lb = state.leaderboard;
  const rank = lb.optIn ? myRank(lb.cache.rows, state, state.settings.event, 'week') : 0;
  const lbTile = tile('#/leaderboard', 'trophy', rank ? `#${rank}` : lb.optIn ? '—' : 'Join', 'Leaderboard', rank ? ' hot' : '');
  const tiles = h('div', { class: 'hm-tiles three' },
    tile(null, 'flame', String(streak), 'Day streak', streak ? ' hot' : ''), second, lbTile);

  el.append(...[head, resume, readyBox, planBox, tiles].filter(Boolean));
  if (dirty) ctx.save();
}
