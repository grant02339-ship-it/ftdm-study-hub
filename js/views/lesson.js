// Lesson sheet (#/lesson/:id): title, PI chips, sections, explainer, key terms, exam traps, video, practice.
import { h, icon } from '../ui.js';
import { quizHref, videoLength, reelSpeedOf } from './learn.js';
import { videoThumb } from '../reel-thumb.js';

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
  const { LESSONS, VIDEOS, AREAS, piByCode } = ctx.data;
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

  const head = h('header', { class: 'lesson-head' },
    area ? h('a', { class: 'eyebrow', href: `#/learn/${encodeURIComponent(area.id)}` }, area.name) : null,
    h('h1', { class: 'lt lesson-title' }, lesson.title),
    lesson.caseFrequent ? h('p', { class: 'badge-case' }, icon('star'), 'Often in case studies') : null,
    h('div', { class: 'lesson-meta' },
      h('span', { class: 'chip quiet' }, h('span', { class: 'num' }, String(lesson.minutes)), 'min read'),
      chips),
    caption);

  const sections = lesson.sections.map(sec => h('section', { class: 'lesson-sec' },
    h('h2', { class: 'sec-h' }, sec.heading),
    lessonBody(sec.html)));

  const parts = [head, h('div', { class: 'lesson-sections' }, sections)];

  if (lesson.explainer && EXPLAINERS[lesson.explainer]) {
    const slot = h('div', { class: 'xp-slot' });
    parts.push(h('section', { class: 'lesson-block' },
      h('h2', { class: 'block-h' }, icon('spark'), `Try it: ${EXPLAINERS[lesson.explainer].toLowerCase()}`),
      h('div', { class: 'xp-card' }, slot)));
    mountExplainer(slot, lesson.explainer);
  }

  if (lesson.keyTerms && lesson.keyTerms.length) {
    parts.push(h('section', { class: 'lesson-block' },
      h('h2', { class: 'block-h' }, 'Key terms'),
      h('dl', { class: 'group terms' }, lesson.keyTerms.map(k =>
        h('div', { class: 'term' }, h('dt', null, k.term), h('dd', null, k.def))))));
  }

  if (lesson.traps && lesson.traps.length) {
    parts.push(h('section', { class: 'traps', 'aria-labelledby': `traps-${lesson.id}` },
      h('h2', { id: `traps-${lesson.id}` }, icon('alert'), 'Exam traps'),
      h('ul', null, lesson.traps.map(t => h('li', null, t)))));
  }

  if (video) {
    parts.push(h('div', { class: 'group lesson-video' },
      h('a', { class: 'row row-video', href: `#/watch/${encodeURIComponent(video.id)}` },
        videoThumb(video, { areaName: area ? area.name : '', speed: reelSpeedOf(ctx.state), variant: 'mini' }),
        h('div', { class: 't' }, 'Watch the video lesson', h('small', null, `${video.title} · ${videoLength(video, ctx.state)}`)),
        h('span', { class: 'chev', 'aria-hidden': 'true' }, icon('chevron')))));
  }

  parts.push(
    h('a', { class: 'cta', href: quizHref(lesson.pis, 10) }, 'Practice this lesson'),
    h('p', { class: 'cta-note' }, `10 questions on ${lesson.pis.length === 1 ? 'this lesson’s PI' : 'this lesson’s PIs'}`));

  el.append(h('article', { class: 'lesson' }, parts));
}
