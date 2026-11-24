// Event picker: the full-screen "Choose your event" welcome (first launch) and the Settings sheet.
import { h, icon, brandMark, openSheet } from './ui.js';
import { EVENTS, currentEvent, examEvent } from './event.js';

const BLURB = {
  ftdm: 'Banking, investing, insurance and financial analysis.',
  stdm: 'Promotion, pricing, selling and sports and entertainment cases.',
  btdm: 'Retail buying, merchandising, pricing and product mix.',
  mtdm: 'Market planning, research, branding and promotion strategy.',
  htdm: 'Hotels, restaurants, guest service and selling.',
  ttdm: 'Destinations, travel products, promotion and planning.',
  bltdm: 'Law, ethics, operations and management decisions.',
  pbm: 'Business core: management, operations and communication.',
  pen: 'Business core with a start-up and small business lens.',
  pfn: 'Business core: money, financial analysis and economics.',
  pht: 'Business core for hotels, restaurants and travel.',
  pmk: 'Business core: customers, communication and marketing basics.',
  etdm: 'Start-ups, small business strategy, finance and promotion.',
  ent: 'Owning and running a small business.',
  rms: 'Retail operations, merchandising, selling and customer service.',
  sem: 'Marketing for sports, entertainment and events.',
  bsm: 'Marketing and selling business-to-business services.',
  aam: 'Fashion retail, merchandising and apparel promotion.',
  fce: 'Advising clients on banking, investing and financial planning.',
  bfs: 'Business finance, accounting basics and financial analysis.',
  imce: 'Campaign planning, promotion and media — no exam.',
};
const GLYPH = { ftdm: 'FI', stdm: 'MK', btdm: 'PM', mtdm: 'MP', htdm: 'CR', ttdm: 'MP', pbm: 'OP', pen: 'EN', pfn: 'FI', pht: 'CR', pmk: 'MK', etdm: 'EN', bltdm: 'BL', ent: 'EN', rms: 'PM', sem: 'MK', bsm: 'SE', aam: 'PM', fce: 'CR', bfs: 'FI', imce: 'PR' };

function checkMark() {
  const t = document.createElement('template');
  t.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  return t.content.firstElementChild;
}

// One big rounded card per event. selectedId marks the current one (Settings); onPick(event) fires on tap.
const GROUP_LABEL = { tdm: 'Team decision making', principles: 'Principles (first-year members)', series: 'Individual series', projects: 'Projects (no exam)' };

function eventCards(selectedId, onPick) {
  let lastGroup = null;
  return EVENTS.flatMap(ev => {
    const on = ev.id === selectedId;
    const group = ev.group || 'tdm';
    const header = group !== lastGroup ? [h('h2', { class: 'gh ev-group' }, GROUP_LABEL[group] || '')] : [];
    lastGroup = group;
    return [...header, h('button', { class: `ev-card${on ? ' on' : ''}`, type: 'button', 'aria-pressed': on ? 'true' : 'false', onclick: () => onPick(ev) },
      h('span', { class: 'ev-ico' }, icon(GLYPH[ev.id] || 'lesson')),
      h('span', { class: 'ev-txt' },
        h('span', { class: 'ev-name' }, ev.short),
        h('span', { class: 'ev-sub' }, BLURB[ev.id] || ev.name),
        h('span', { class: 'ev-full' }, ev.name)),
      h('span', { class: 'ev-check', 'aria-hidden': 'true' }, on ? checkMark() : icon('chevron')))];
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

// Confirmation before a switch would end a mock exam in progress.
function confirmSwitch(done) {
  let close = null;
  const yes = h('button', { class: 'cta st-reset-yes', type: 'button', onclick: () => { close(); done(); } }, 'Switch event');
  const no = h('button', { class: 'btn-2', type: 'button', onclick: () => close() }, 'Keep my exam');
  const content = h('div', { class: 'st-confirm' },
    h('div', { class: 'st-confirm-ico' }, icon('alert')),
    h('h2', { class: 'lt' }, 'Switch events?'),
    h('p', null, 'Switching events ends your mock exam in progress. Your answers and flashcards are kept.'),
    yes, no);
  const onHash = () => close();
  close = openSheet(content, { label: 'Switch events', onClose: () => window.removeEventListener('hashchange', onHash) });
  window.addEventListener('hashchange', onHash);
  setTimeout(() => no.focus({ preventScroll: true }), 50);
}

// Applies a picked event (Settings, Home and Learn chips, the announcement). Asks first when a mock exam
// in progress would be dropped. done() runs after the choice is settled, changed or not.
export function switchEvent(ctx, picked, done) {
  const cur = currentEvent(ctx.state);
  if (picked.id === cur.id) { if (done) done(); return; }
  const apply = () => { ctx.setEvent(picked.id); if (done) done(); };
  if (ctx.state.activeExam && examEvent(ctx.state.activeExam) !== picked.id) confirmSwitch(apply);
  else apply();
}

// One-time "New: choose your event" sheet for existing students. Marks it seen as soon as it opens.
export function openEventAnnouncement(ctx, onDone) {
  ctx.state.settings.seenEventPrompt = 1;
  ctx.save();
  let chosen = currentEvent(ctx.state).id;
  let close = null;
  const list = h('div', { class: 'ev-list' });
  const paint = () => list.replaceChildren(...eventCards(chosen, ev => { chosen = ev.id; paint(); }));
  paint();
  const go = h('button', { class: 'cta', type: 'button', onclick: () => {
    const picked = EVENTS.find(e => e.id === chosen);
    close();
    switchEvent(ctx, picked, onDone);
  } }, 'Continue');
  const content = h('div', { class: 'ev-sheet ev-new' },
    h('p', { class: 'ev-eyebrow' }, 'New'),
    h('h2', { class: 'lt' }, 'New: choose your event'),
    h('p', { class: 'sub' }, 'Lessons, practice and mock exams now follow your event. Your answers are kept if you switch. You can change it anytime from Home, Learn or Settings.'),
    list, go);
  close = openSheet(content, { label: 'New: choose your event' });
  return close;
}

// Small tappable chip with the event name and a chevron; opens the event sheet.
export function eventChip(ctx, onChanged) {
  return h('button', { class: 'ev-chip', type: 'button', 'aria-haspopup': 'dialog',
    'aria-label': `Event: ${currentEvent(ctx.state).short}. Change event`,
    onclick: () => openEventSheet(ctx.state, picked => switchEvent(ctx, picked, onChanged)) },
  h('span', null, currentEvent(ctx.state).short), h('span', { class: 'ev-chip-chev', 'aria-hidden': 'true' }, icon('chevron')));
}
