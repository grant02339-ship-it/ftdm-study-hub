// Lesson sheet (#/lesson/:id): title, PI chips, sections, explainer, key terms, exam traps, video, practice.
import { h, icon, box } from '../ui.js';
import { quizHref, videoLength, reelSpeedOf } from './learn.js';
import { videoThumb } from '../reel-thumb.js';
import { markRead, notePlanProgress } from '../foryou.js';
import { ymd } from '../practice-lib.js';

const LEVELS = { PQ: 'Prerequisite', CS: 'Career-sustaining', SP: 'Specialist', SU: 'Supervisor', MN: 'Manager', ON: 'Owner' };
const EXPLAINERS = {
  tvm: 'Time value of money', ratios: 'Financial ratios', breakeven: 'Break-even point',
  loan: 'Loan payments', bond: 'Bond prices', supplydemand: 'Supply and demand',
};

// Section html is trusted, bundled content limited to the content contract's tags (never user input).
function lessonBody(html) {
  const body = h('div', { class: 'lesson-body' });
  body.innerHTML = html;
  // Wide tables scroll sideways inside a rounded frame instead of stretching the sheet.
  body.querySelectorAll('table').forEach(t => {
    const wrap = h('div', { class: 'table-wrap' });
    t.replaceWith(wrap);
    wrap.append(t);
  });
  return body;
}

function piChips(codes, piByCode) {
  const caption = h('p', { class: 'pi-caption', 'aria-live': 'polite', hidden: true });
  let active = null;
  const chips = codes.map(code => {
    const p = piByCode(code);
    const chip = h('button', { type: 'button', class: 'chip pi-chip', 'aria-pressed': 'false', title: p ? p.title : code },
      h('span', { class: 'num' }, code), p ? h('span', { class: 'chip-lvl' }, p.level) : null);
    chip.addEventListener('click', () => {
      if (active) active.setAttribute('aria-pressed', 'false');
      if (active === chip) { active = null; caption.hidden = true; return; }
      active = chip;
      chip.setAttribute('aria-pressed', 'true');
      caption.replaceChildren(h('strong', null, `${code} · ${p ? LEVELS[p.level] || p.level : ''}`), h('br'), p ? p.title : '');
      caption.hidden = false;
    });
    return chip;
  });
  return { chips, caption };
}

async function mountExplainer(slot, name) {
  try {
    const mod = await import(`../explainers/${name}.js`);
    mod.mount(slot);
  } catch (e) {
    console.warn('Explainer failed to load', name, e);
    slot.replaceChildren(h('p', { class: 'xp-why' }, 'This interactive couldn’t load.'));
  }
}

export function render(el, params, ctx) {
  const { LESSONS, VIDEOS, AREAS, QUESTIONS, piByCode } = ctx.data;
  const lesson = LESSONS.find(l => l.id === params.id);
  if (!lesson) {
    el.append(h('h1', { class: 'lt' }, 'Lesson not found'),
      h('div', { class: 'empty' }, h('div', { class: 'ico' }, icon('lesson')),
        h('p', null, 'This lesson isn’t available. It may have moved.'),
        h('p', null, h('a', { class: 'link', href: '#/learn' }, 'Browse lessons'))));
    return;
  }
  const area = AREAS.find(a => a.id === lesson.area);
  const video = lesson.video ? VIDEOS.find(v => v.id === lesson.video) : null;
  const { chips, caption } = piChips(lesson.pis, piByCode);
  markRead(ctx.state, lesson.id);
  notePlanProgress(ctx.state, ymd(new Date()));
  ctx.save();

  // Progress on this lesson's PIs: share of its questions whose latest answer was right.
  const qs = QUESTIONS.filter(q => lesson.pis.includes(q.pi));
  const right = qs.filter(q => ctx.state.answers[q.id] && ctx.state.answers[q.id].last).length;
  const tried = qs.some(q => ctx.state.answers[q.id]);
  const pct = qs.length ? Math.round((right / qs.length) * 100) : 0;

  const head = h('header', { class: 'box lesson-head' },
    h('div', { class: 'lesson-top' },
      area ? h('a', { class: 'eyebrow', href: `#/learn/${encodeURIComponent(area.id)}` }, area.name) : h('span'),
      h('span', { class: 'box-m' }, `${lesson.minutes} min read`)),
    h('h1', { class: 'lt lesson-title' }, lesson.title),
    qs.length ? h('div', { class: 'lesson-prog' },
      h('div', { class: 'bar', role: 'img', 'aria-label': `${pct}% mastered` }, h('i', { style: `width:${pct}%` })),
      h('span', { class: 'num' }, tried ? `${pct}% mastered` : 'Not practiced yet')) : null,
    h('div', { class: 'lesson-meta' },
      lesson.caseFrequent ? h('span', { class: 'chip chip-case' }, icon('star'), 'Often in case studies') : null,
      chips),
    caption);

  const n = lesson.sections.length;
  const sections = lesson.sections.map((sec, i) => box('The idea', n > 1 ? `${sec.pi} · ${i + 1} of ${n}` : sec.pi, [
    h('h2', { class: 'sec-h' }, sec.heading),
    lessonBody(sec.html)], { class: 'lesson-sec', tag: 'p' }));

  const parts = [head, ...sections];

  if (lesson.explainer && EXPLAINERS[lesson.explainer]) {
    const slot = h('div', { class: 'xp-slot' });
    parts.push(box(`Try it: ${EXPLAINERS[lesson.explainer].toLowerCase()}`, 'Interactive', h('div', { class: 'xp-card' }, slot), { icon: 'spark', class: 'lesson-xp' }));
    mountExplainer(slot, lesson.explainer);
  }

  if (lesson.keyTerms && lesson.keyTerms.length) {
    parts.push(box('Key terms', String(lesson.keyTerms.length),
      h('dl', { class: 'group terms' }, lesson.keyTerms.map(k =>
        h('div', { class: 'term' }, h('dt', null, k.term), h('dd', null, k.def))))));
  }

  if (lesson.traps && lesson.traps.length) {
    parts.push(box('Exam traps', String(lesson.traps.length),
      h('ul', { class: 'traps-list' }, lesson.traps.map(t => h('li', null, t))), { icon: 'alert', class: 'traps' }));
  }

  if (video) {
    parts.push(box('Watch', videoLength(video, ctx.state), h('div', { class: 'group' },
      h('a', { class: 'row row-video', href: `#/watch/${encodeURIComponent(video.id)}` },
        videoThumb(video, { areaName: area ? area.name : '', speed: reelSpeedOf(ctx.state), variant: 'mini' }),
        h('div', { class: 't' }, 'Watch the video lesson', h('small', null, video.title)),
        h('span', { class: 'chev', 'aria-hidden': 'true' }, icon('chevron'))))));
  }

  parts.push(h('div', { class: 'lesson-actions' },
    h('a', { class: 'cta', href: quizHref(lesson.pis, 10) }, 'Practice this lesson'),
    h('p', { class: 'cta-note' }, `10 questions on ${lesson.pis.length === 1 ? 'this lesson’s PI' : 'this lesson’s PIs'}`)));

  el.append(h('article', { class: 'lesson' }, parts));
}
