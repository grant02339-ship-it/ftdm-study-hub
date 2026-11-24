// Tiny DOM helpers: h(), icons, sheets, theme, placeholders. No dependencies.

// h('a', {class:'row', href:'#/x', onclick: fn}, child, 'text', [more]) -> Element
export function h(tag, props, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'style') el.style.cssText = v;
    else if (k === 'dataset') Object.assign(el.dataset, v);
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of kids.flat(Infinity)) {
    if (c == null || c === false) continue;
    el.append(c.nodeType ? c : String(c));
  }
  return el;
}

// Parses trusted, app-authored markup (icons only) into an element.
function fromMarkup(markup) {
  const t = document.createElement('template');
  t.innerHTML = markup.trim();
  return t.content.firstElementChild;
}

const STROKE = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

// 24x24 stroke icons. Area ids double as icon names so Learn can reuse them.
const ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l9 8h-3v9h-4v-6h-4v6H6v-9H3z"/></svg>',
  learn: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 21V5"/></svg>`,
  practice: `<svg viewBox="0 0 24 24" ${STROKE}><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>`,
  cards: `<svg viewBox="0 0 24 24" ${STROKE}><rect x="3" y="6" width="14" height="14" rx="3"/><path d="M7 3h11a3 3 0 013 3v11"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" ${STROKE}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  exam: `<svg viewBox="0 0 24 24" ${STROKE}><rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M9 3.5V5h6V3.5M9 11l2 2 4-4M9 17h6"/></svg>`,
  video: `<svg viewBox="0 0 24 24" ${STROKE}><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/></svg>`,
  lesson: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M12 6c-2-1.5-5-2-8-1.5v14c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-14c-3-.5-6 0-8 1.5zM12 6v14"/></svg>`,
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.2l2.6 5.5 6 .8-4.4 4.1 1.1 5.9L12 16.6l-5.3 2.9 1.1-5.9-4.4-4.1 6-.8z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>',
  search: `<svg viewBox="0 0 24 24" ${STROKE}><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17.2v.1"/></svg>`,
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 001.5.86l10.4-6.5a1 1 0 000-1.72L9.5 4.64A1 1 0 008 5.5z"/></svg>',
  spark: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M4 18l5-6 4 3 7-9"/><circle cx="20" cy="6" r="1.2" fill="currentColor"/></svg>`,
  back: '<svg viewBox="0 0 10 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2L2 8l6 6"/></svg>',
  chevron: '<svg viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 1.5L6.5 7l-5 5.5"/></svg>',
  close: '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M2 2l10 10M12 2L2 12"/></svg>',
  // Instructional areas
  FI: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>`,
  PD: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M12 4l10 5-10 5L2 9z"/><path d="M6.5 11.5V16c0 1.6 2.5 3 5.5 3s5.5-1.4 5.5-3v-4.5"/></svg>`,
  FM: `<svg viewBox="0 0 24 24" ${STROKE}><rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>`,
  EI: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0112 7.2a4.3 4.3 0 017.5 2.6C19.5 15.4 12 20 12 20z"/></svg>`,
  BL: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M12 4v16M8 20h8M5 7h14"/><path d="M5 7l-2.5 6a2.5 2.5 0 005 0zM19 7l-2.5 6a2.5 2.5 0 005 0z"/></svg>`,
  RM: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></svg>`,
  OP: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M3 7.5l9-4.5 9 4.5v9L12 21l-9-4.5z"/><path d="M3 7.5l9 4.5 9-4.5M12 12v9"/></svg>`,
  NF: `<svg viewBox="0 0 24 24" ${STROKE}><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/></svg>`,
  EC: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M5 20v-8M10 20V5M15 20v-6M20 20V9"/></svg>`,
  CR: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M20.5 11.5a8 8 0 01-11.7 7.1L4 20l1.3-4.4a8 8 0 1115.2-4.1z"/></svg>`,
  CO: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M4 10v4h3.5l6 4.5v-13l-6 4.5z"/><path d="M17 9a4 4 0 010 6M19.5 6.5a7.5 7.5 0 010 11"/></svg>`,
  EN: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M9.5 18h5M10.5 21h3"/><path d="M12 3a6 6 0 00-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0012 3z"/></svg>`,
  HR: `<svg viewBox="0 0 24 24" ${STROKE}><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.4 3.3-5.5 6.5-5.5s5.7 2.1 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 010 7M18 14.8c1.8.8 3 2.6 3.5 5.2"/></svg>`,
  MK: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M3 12V4a1 1 0 011-1h8l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.3" fill="currentColor"/></svg>`,
  SM: `<svg viewBox="0 0 24 24" ${STROKE}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>`,
  // Marketing cluster areas
  IM: `<svg viewBox="0 0 24 24" ${STROKE}><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2M8.5 12.5v-2M11 12.5v-4M13.5 12.5v-3"/></svg>`,
  PM: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>`,
  PR: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M4 10v4h3.5l6 4.5v-13l-6 4.5z"/><path d="M17 9.5a3.5 3.5 0 010 5"/></svg>`,
  SE: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M3 12l5-1 4-4 5 2 4 4-5 5-3-1-4 1z"/><path d="M8 11l4 4"/></svg>`,
  CM: `<svg viewBox="0 0 24 24" ${STROKE}><rect x="9" y="3" width="6" height="5" rx="1.2"/><rect x="3" y="16" width="6" height="5" rx="1.2"/><rect x="15" y="16" width="6" height="5" rx="1.2"/><path d="M12 8v4M6 16v-4h12v4"/></svg>`,
  MP: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/></svg>`,
  PI: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M3 12V4a1 1 0 011-1h8l9 9-9 9z"/><path d="M8.5 9.5h3M10 8v5"/></svg>`,
  // Hospitality cluster areas (KM, QM are new; the rest reuse existing ids). PJ is new with Business management.
  KM: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z"/><path d="M12 6.5v13"/></svg>`,
  QM: `<svg viewBox="0 0 24 24" ${STROKE}><circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/></svg>`,
  PJ: `<svg viewBox="0 0 24 24" ${STROKE}><rect x="3" y="4" width="10" height="4" rx="1"/><rect x="8" y="10" width="13" height="4" rx="1"/><rect x="5" y="16" width="9" height="4" rx="1"/></svg>`,
};

export function icon(name) {
  const svg = fromMarkup(ICONS[name] || ICONS.lesson);
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  return svg;
}

// Brand mark: the Study Buddy mascot (icons/icon.svg), rounded like an app icon.
export function brandMark() {
  const img = document.createElement('img');
  img.src = 'icons/icon.svg';
  img.alt = '';
  img.setAttribute('aria-hidden', 'true');
  img.style.display = 'block';
  return img;
}

export const reducedMotion = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

// theme: 'auto' | 'light' | 'dark'. 'auto' follows prefers-color-scheme via CSS.
export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'light' || theme === 'dark') root.dataset.theme = theme;
  else delete root.dataset.theme;
  const forced = theme === 'light' ? '#FAF7F2' : theme === 'dark' ? '#000000' : null;
  document.querySelectorAll('meta[name="theme-color"]').forEach(m => {
    m.setAttribute('content', forced || (m.media.includes('light') ? '#FAF7F2' : '#000000'));
  });
}

// Light "haptic-ish" feedback where the platform supports it.
export function tick(ms = 8) {
  try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) { /* unsupported */ }
}

// Placeholder view for screens that later tasks build out.
// title: string | (params, ctx) => string; line: same.
export function placeholder(title, line, iconName = 'lesson') {
  return function render(el, params = {}, ctx) {
    const t = typeof title === 'function' ? title(params, ctx) : title;
    const l = typeof line === 'function' ? line(params, ctx) : line;
    el.append(
      h('h1', { class: 'lt' }, t),
      h('div', { class: 'empty' }, h('div', { class: 'ico' }, icon(iconName)), h('p', null, l)),
    );
  };
}

/* ---------- Sheets ---------- */

const desktopMQ = () => typeof matchMedia === 'function' && matchMedia('(min-width: 768px)').matches;
const openSheets = [];
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

// Opens contentEl in a sheet (phone: slides up; computer: centered panel).
// Closes on ✕, backdrop tap, Escape, or swiping down >120px.
// Returns close(opts). close({silent:true}) skips onClose (used by the router).
export function openSheet(contentEl, { onClose, label = 'Details' } = {}) {
  const prevFocus = document.activeElement;
  const body = h('div', { class: 'sheet-body' }, contentEl);
  const closeBtn = h('button', { class: 'sheet-close', type: 'button', 'aria-label': 'Close' }, icon('close'));
  const grab = h('div', { class: 'sheet-grab', 'aria-hidden': 'true' });
  const sheet = h('div', { class: 'sheet', role: 'dialog', 'aria-modal': 'true', 'aria-label': label, tabindex: '-1' }, grab, closeBtn, body);
  const backdrop = h('div', { class: 'sheet-backdrop' });
  const layer = h('div', { class: 'sheet-layer' }, backdrop, sheet);

  let closed = false;
  const entry = { layer };
  openSheets.push(entry);
  document.body.append(layer);
  document.documentElement.classList.add('sheet-open');
  const app = document.querySelector('.app');
  if (app) app.inert = true;

  void sheet.offsetHeight; // commit the closed position so the open state transitions
  layer.classList.add('open');
  sheet.focus({ preventScroll: true });

  function close({ silent = false } = {}) {
    if (closed) return;
    closed = true;
    document.removeEventListener('keydown', onKey, true);
    layer.classList.remove('open');
    sheet.classList.remove('dragging');
    sheet.style.transform = '';
    backdrop.style.opacity = '';
    const idx = openSheets.indexOf(entry);
    if (idx >= 0) openSheets.splice(idx, 1);
    if (!openSheets.length) {
      document.documentElement.classList.remove('sheet-open');
      if (app) app.inert = false;
    }
    let removed = false;
    const remove = () => { if (!removed) { removed = true; layer.remove(); } };
    sheet.addEventListener('transitionend', e => { if (e.target === sheet) remove(); });
    setTimeout(remove, reducedMotion() ? 0 : 600);
    if (prevFocus && prevFocus.isConnected && typeof prevFocus.focus === 'function') prevFocus.focus({ preventScroll: true });
    if (!silent && onClose) onClose();
  }

  function onKey(e) {
    if (openSheets[openSheets.length - 1] !== entry) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'Tab') { // keep focus inside the sheet
      const f = [...sheet.querySelectorAll(FOCUSABLE)].filter(n => n.offsetParent !== null);
      if (!f.length) { e.preventDefault(); return; }
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === sheet)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
  document.addEventListener('keydown', onKey, true);
  closeBtn.addEventListener('click', () => close());
  backdrop.addEventListener('click', () => close());

  // Swipe down to dismiss (phone layout). Starts only when the content is scrolled to the top.
  let startY = 0, lastY = 0, lastT = 0, vel = 0, dy = 0, dragging = false, tracking = false;
  const begin = y => { tracking = body.scrollTop <= 0; dragging = false; startY = lastY = y; lastT = performance.now(); vel = 0; dy = 0; };
  const move = (y, e) => {
    if (!tracking) return;
    const now = performance.now();
    if (!dragging) {
      if (y - startY > 4 && body.scrollTop <= 0) { dragging = true; startY = y; sheet.classList.add('dragging'); }
      else if (y < startY - 4 || body.scrollTop > 0) { tracking = false; return; } // user is scrolling content
      else return;
    }
    if (e && e.cancelable) e.preventDefault();
    dy = Math.max(0, y - startY);
    vel = (y - lastY) / Math.max(1, now - lastT);
    lastY = y; lastT = now;
    sheet.style.transform = `translateY(${dy}px)`;
    backdrop.style.opacity = String(Math.max(0, 1 - dy / (sheet.offsetHeight || 1)));
  };
  const end = () => {
    if (!tracking) return;
    tracking = false;
    if (!dragging) return;
    dragging = false;
    sheet.classList.remove('dragging');
    if (dy > 120 || (vel > 0.6 && dy > 40)) { close(); return; }
    sheet.style.transform = '';
    backdrop.style.opacity = '';
  };
  sheet.addEventListener('touchstart', e => { if (!desktopMQ() && e.touches.length === 1) begin(e.touches[0].clientY); }, { passive: true });
  sheet.addEventListener('touchmove', e => move(e.touches[0].clientY, e), { passive: false });
  sheet.addEventListener('touchend', end);
  sheet.addEventListener('touchcancel', end);
  // Mouse/pen drag on the grabber, so the gesture also works with a pointer.
  grab.addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch' || desktopMQ()) return;
    grab.setPointerCapture(e.pointerId);
    begin(e.clientY);
  });
  grab.addEventListener('pointermove', e => { if (e.pointerType !== 'touch') move(e.clientY, e); });
  grab.addEventListener('pointerup', e => { if (e.pointerType !== 'touch') end(); });
  grab.addEventListener('pointercancel', e => { if (e.pointerType !== 'touch') end(); });

  return close;
}
