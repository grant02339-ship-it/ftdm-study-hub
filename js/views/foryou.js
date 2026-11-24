// For you (#/foryou): the focus area and what to watch, read and practice for it (picks in js/foryou.js).
import { h, icon, box } from '../ui.js';
import { levelOf } from '../practice-lib.js';
import { videoThumb } from '../reel-thumb.js';
import { lessonRow, videoLength, reelSpeedOf } from './learn.js';
import { eventChip } from '../picker.js';
import { focusArea, watchPicks, readPicks, drillPis, drillHref, DRILL_N } from '../foryou.js';

const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

export function render(el, params, ctx) {
  const { state, data } = ctx;
  const { AREAS, QUESTIONS } = data;
  const level = levelOf(state);
  const rerender = () => { el.replaceChildren(); render(el, params, ctx); };
  const areaName = id => (AREAS.find(a => a.id === id) || { name: id }).name;

  el.append(h('h1', { class: 'lt' }, 'For you'),
    h('div', { class: 'sub-chip' }, eventChip(ctx, rerender)));

  const focus = focusArea(state, data, level);
  if (!focus) {
    el.append(h('div', { class: 'empty' }, h('div', { class: 'ico' }, icon('foryou')),
      h('p', null, 'Picks will show up once this event has practice questions.')));
    return;
  }

  // Focus
  const pct = Math.round(focus.mastery * 100);
  el.append(box(focus.fresh ? 'Start here' : 'Your focus', focus.fresh ? 'New' : `${pct}% mastered`, [
    h('a', { class: 'fy-focus', href: `#/learn/${encodeURIComponent(focus.id)}` },
      h('span', { class: 'fy-ico', 'aria-hidden': 'true' }, icon(focus.id)),
      h('span', { class: 'fy-txt' }, h('b', null, focus.name), h('small', null, focus.reason)),
      h('span', { class: 'chev', 'aria-hidden': 'true' }, icon('chevron'))),
    focus.fresh ? null : h('div', { class: 'fy-bar', role: 'img', 'aria-label': `${pct}% mastered` }, h('i', { style: `width:${pct}%` })),
  ], { class: 'accent fy-focusbox', icon: 'foryou' }));

  // Watch
  const reels = watchPicks(state, data, level, 3);
  const totalReels = data.VIDEOS.length;
  if (totalReels) {
    el.append(box('Watch', reels.length ? plural(reels.length, 'reel') : 'All caught up',
      reels.length
        ? h('div', { class: 'fy-reels', role: 'list' }, reels.map(v => h('a', {
          class: 'vcard', role: 'listitem', href: `#/watch/${encodeURIComponent(v.id)}`,
          'aria-label': `${v.title}, ${areaName(v.area)}, ${videoLength(v, state)}`,
        }, videoThumb(v, { areaName: areaName(v.area), speed: reelSpeedOf(state) }))))
        : h('p', { class: 'box-note fy-none' }, 'You’ve watched every reel for your weakest areas. Rewatch any from Learn.'),
    ));
  }

  // Read
  const reads = readPicks(state, data, focus.id, 3);
  if (reads.length) {
    el.append(box('Read', areaName(focus.id), h('div', { class: 'group' }, reads.map(({ lesson, reason }) =>
      lessonRow(lesson, `${reason} · ${lesson.minutes} min`)))));
  } else {
    el.append(box('Read', null, h('p', { class: 'box-note fy-none' }, 'Lessons for this area are on the way.')));
  }

  // Practice
  const pis = drillPis(state, data, focus.id);
  if (pis.length) {
    const n = Math.min(DRILL_N, QUESTIONS.filter(q => pis.includes(q.pi)).length);
    el.append(box('Practice', `${n} questions`, [
      h('div', { class: 'group' }, h('div', { class: 'row fy-drill' },
        h('div', { class: 'ico' }, icon('practice')),
        h('div', { class: 't' }, `${n}-question drill`, h('small', null, `${focus.fresh ? 'Covers' : 'Your weakest'} ${pis.length === 1 ? 'PI' : 'PIs'}: ${pis.join(', ')}`)))),
      h('a', { class: 'cta', href: drillHref(pis, n) }, 'Start drill'),
    ]));
  }
}
