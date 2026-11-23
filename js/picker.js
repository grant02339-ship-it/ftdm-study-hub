// Event picker: the full-screen "Choose your event" welcome (first launch) and the Settings sheet.
import { h, icon, brandMark, openSheet } from './ui.js';
import { EVENTS, currentEvent } from './event.js';

const BLURB = {
  ftdm: 'Banking, investing, insurance and financial analysis.',
  stdm: 'Promotion, pricing, selling and sports and entertainment cases.',
};
const GLYPH = { ftdm: 'FI', stdm: 'MK' };

function checkMark() {
  const t = document.createElement('template');
  t.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  return t.content.firstElementChild;
}

// One big rounded card per event. selectedId marks the current one (Settings); onPick(event) fires on tap.
function eventCards(selectedId, onPick) {
  return EVENTS.map(ev => {
    const on = ev.id === selectedId;
    return h('button', { class: `ev-card${on ? ' on' : ''}`, type: 'button', 'aria-pressed': on ? 'true' : 'false', onclick: () => onPick(ev) },
      h('span', { class: 'ev-ico' }, icon(GLYPH[ev.id] || 'lesson')),
      h('span', { class: 'ev-txt' },
        h('span', { class: 'ev-name' }, ev.short),
        h('span', { class: 'ev-sub' }, BLURB[ev.id] || ev.name),
        h('span', { class: 'ev-full' }, ev.name)),
      h('span', { class: 'ev-check', 'aria-hidden': 'true' }, on ? checkMark() : icon('chevron')));
  });
}

// Full-screen first-launch picker. Calls onPick(event) once, then removes itself.
export function showEventPicker(onPick) {
  const app = document.querySelector('.app');
  if (app) app.inert = true;
  const layer = h('div', { class: 'ev-welcome', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'ev-title' },
    h('div', { class: 'ev-welcome-in' },
      h('div', { class: 'ev-brand' }, brandMark()),
      h('h1', { id: 'ev-title', class: 'ev-h' }, 'Choose your event'),
      h('p', { class: 'ev-lede' }, 'We’ll tailor lessons, practice and mock exams to it. You can change it anytime in Settings.'),
      h('div', { class: 'ev-list' }, eventCards(null, ev => {
        if (app) app.inert = false;
        layer.classList.add('out');
        setTimeout(() => layer.remove(), 300);
        onPick(ev);
      }))));
  document.body.append(layer);
  requestAnimationFrame(() => layer.classList.add('in'));
  const first = layer.querySelector('.ev-card');
  if (first) first.focus({ preventScroll: true });
}

// Settings sheet listing the events. onPick(event) fires after the sheet starts closing.
export function openEventSheet(state, onPick) {
  let close = null;
  const content = h('div', { class: 'ev-sheet' },
    h('h2', { class: 'lt' }, 'Your event'),
    h('p', { class: 'sub' }, 'Lessons, practice and mock exams follow the event you pick.'),
    h('div', { class: 'ev-list' }, eventCards(currentEvent(state).id, ev => { close(); onPick(ev); })));
  close = openSheet(content, { label: 'Choose your event' });
  return close;
}
