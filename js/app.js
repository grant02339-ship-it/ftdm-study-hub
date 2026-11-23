// Boot, hash router, theme, nav state, large-title collapse.
// Adding a screen = creating js/views/<name>.js that exports render(el, params, ctx).
import * as data from '../data/index.js';
import { loadState, saveState, isFirstLaunch, needsEventPrompt } from './store.js';
import { currentEvent, eventData, setEvent } from './event.js';
import { showEventPicker, openEventAnnouncement, switchEvent } from './picker.js';
import { h, icon, brandMark, applyTheme, openSheet, placeholder } from './ui.js';
import { initOffline, routeChanged } from './offline.js';

// tab: which nav item lights up. param: name of the first path segment after the route.
// sheet: rendered in a sheet over the current page instead of replacing it.
export const ROUTES = {
  home:     { title: 'Today', tab: 'home' },
  learn:    { title: 'Learn', tab: 'learn', param: 'area' },
  lesson:   { title: 'Lesson', tab: 'learn', param: 'id', sheet: true },
  watch:    { title: 'Video lesson', tab: 'learn', param: 'id', sheet: true },
  practice: { title: 'Practice', tab: 'practice' },
  quiz:     { title: 'Quiz', tab: 'practice', sheet: true },
  exam:     { title: 'Mock exam', tab: 'practice' },
  cards:    { title: 'Cards', tab: 'cards' },
  settings: { title: 'Settings', tab: 'settings' },
};
const NAV = [
  ['home', 'Home'], ['learn', 'Learn'], ['practice', 'Practice'], ['cards', 'Cards'],
];

// '#/learn/FI?x=1' -> {name:'learn', params:{area:'FI', x:'1'}, key:'learn/FI?x=1'}
export function parseHash(hash) {
  const raw = String(hash || '').replace(/^#\/?/, '');
  const [path, query = ''] = raw.split('?');
  const parts = path.split('/').filter(Boolean);
  const valid = !parts[0] || Object.hasOwn(ROUTES, parts[0]);
  const name = valid ? parts[0] || 'home' : 'home';
  const params = Object.fromEntries(new URLSearchParams(query));
  const def = ROUTES[name];
  if (def.param && parts[1]) {
    try { params[def.param] = decodeURIComponent(parts[1]); } catch (e) { params[def.param] = parts[1]; }
  }
  return { name, def, params, key: valid && raw ? raw : 'home', valid };
}

/* ---------- Context shared with views ---------- */
const firstLaunch = isFirstLaunch();
const prompt = needsEventPrompt(loadState());
const ctx = {
  state: loadState(),
  // The content slice for the student's chosen event (areas, blueprint, lessons, questions, cards, videos).
  get data() { return eventData(currentEvent(ctx.state)); },
  allData: data,
  setEvent(id) { setEvent(ctx.state, id); return ctx.save(); },
  // Event switch with the mock-exam confirmation; done() runs after the event actually changes.
  switchEvent(picked, done) { switchEvent(ctx, picked, done); },
  save() { return saveState(ctx.state); },
  go(hash) { location.hash = hash; },
  applyTheme,
};

/* ---------- Shell ---------- */
const view = document.getElementById('view');
const topTitle = document.querySelector('.topbar-title');
const tabbar = document.querySelector('.tabbar');
const sidebar = document.querySelector('.sidebar');

function buildNav() {
  tabbar.append(h('span', { class: 'tab-ind', 'aria-hidden': 'true' }));
  for (const [id, label] of NAV) {
    tabbar.append(h('a', { class: 'tab', href: `#/${id}`, dataset: { tab: id } }, icon(id), h('span', null, label)));
  }
  sidebar.append(
    h('div', { class: 'brand' }, brandMark(), h('span', null, 'DECA Study Buddy')),
    ...NAV.map(([id, label]) => h('a', { class: 'side-link', href: `#/${id}`, dataset: { tab: id } }, icon(id), h('span', null, label))),
    h('div', { class: 'side-sep', role: 'separator' }),
    h('a', { class: 'side-link', href: '#/settings', dataset: { tab: 'settings' } }, icon('settings'), h('span', null, 'Settings')),
  );
}

function setActiveNav(tab) {
  document.querySelectorAll('[data-tab]').forEach(a => {
    if (a.dataset.tab === tab) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  const i = NAV.findIndex(([id]) => id === tab);
  if (i >= 0) { tabbar.dataset.i = i; tabbar.style.setProperty('--i', i); }
  else delete tabbar.dataset.i;
}

let scrollQueued = false;
function syncScrolled() {
  scrollQueued = false;
  document.documentElement.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', () => {
  if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(syncScrolled); }
}, { passive: true });

/* ---------- Views ---------- */
const cache = new Map();
// A failed import is logged and not cached, so the next visit to the screen tries again.
async function loadView(name) {
  if (cache.has(name)) return cache.get(name);
  try {
    const mod = await import(`./views/${name}.js`);
    cache.set(name, mod);
    return mod;
  } catch (e) {
    console.error('Screen failed to load', name, e);
    return { render: placeholder(ROUTES[name].title, 'This screen couldn’t load. Close the app and open it again to retry.', 'alert') };
  }
}

let navToken = 0;
let base = null;    // {key, name} of the page under any sheet
let sheet = null;   // {key, close, fromBase}
let first = true;
let prevWasSheet = false;

async function renderPage(r, { keepScroll = false } = {}) {
  const token = navToken;
  const mod = await loadView(r.name);
  if (token !== navToken) return false;
  const y = window.scrollY;
  const page = h('div', { class: 'page' });
  try {
    await mod.render(page, r.params, ctx);
  } catch (e) {
    console.warn('View failed to render', r.name, e);
    page.replaceChildren();
    placeholder(r.def.title, 'Something went wrong showing this screen.')(page, r.params, ctx);
  }
  if (token !== navToken) return false;
  if (!keepScroll && !first) page.classList.add('enter');
  // Remember which link had focus (e.g. the one that opened a sheet) so a re-render can restore it.
  const active = document.activeElement;
  const focusHref = keepScroll && active && view.contains(active) && active.closest('a[href]')
    ? active.closest('a[href]').getAttribute('href') : null;
  view.replaceChildren(page);
  base = { key: r.key, name: r.name };
  const title = (page.querySelector('.lt') || {}).textContent || r.def.title;
  topTitle.textContent = title;
  document.title = r.name === 'home' ? 'DECA Study Buddy' : `${title} · DECA Study Buddy`;
  setActiveNav(r.def.tab);
  window.scrollTo(0, keepScroll ? y : 0);
  syncScrolled();
  if (keepScroll) {
    const match = focusHref && [...page.querySelectorAll('a[href]')].find(a => a.getAttribute('href') === focusHref);
    (match || view).focus({ preventScroll: true });
  } else if (!first) view.focus({ preventScroll: true });
  return true;
}

async function renderSheet(r, fromBase) {
  const token = navToken;
  const mod = await loadView(r.name);
  const content = h('div', { class: 'page' });
  try {
    await mod.render(content, r.params, ctx);
  } catch (e) {
    console.warn('Sheet failed to render', r.name, e);
    content.replaceChildren();
    placeholder(r.def.title, 'Something went wrong showing this screen.')(content, r.params, ctx);
  }
  if (token !== navToken) return;
  if (sheet) sheet.close({ silent: true });
  const entry = { key: r.key, fromBase };
  entry.close = openSheet(content, {
    label: r.def.title,
    onClose() {
      if (sheet === entry) sheet = null;
      if (parseHash(location.hash).key !== entry.key) return;
      // Return to the page underneath: pop history if we pushed it, otherwise replace.
      if (entry.fromBase) history.back();
      else location.replace(`#/${base ? base.key : 'home'}`);
    },
  });
  sheet = entry;
  setActiveNav(r.def.tab);
}

async function route() {
  const r = parseHash(location.hash);
  if (!r.valid) history.replaceState(null, '', '#/home');
  const token = ++navToken;
  const cameFromSheet = prevWasSheet;
  prevWasSheet = !!r.def.sheet;
  if (r.def.sheet) {
    const fromBase = !!base;
    if (!base) await renderPage(parseHash('#/home'));
    if (token !== navToken) return;
    await renderSheet(r, fromBase);
  } else {
    const returning = cameFromSheet && !!base && base.key === r.key;
    if (sheet) { sheet.close({ silent: true }); sheet = null; }
    // Coming back from a sheet re-renders the page in place so fresh progress shows.
    await renderPage(r, { keepScroll: returning });
  }
  first = false;
  if (token === navToken) routeChanged();
}

/* ---------- Boot ---------- */
applyTheme(ctx.state.settings.theme);
buildNav();
if (!location.hash || location.hash === '#' || location.hash === '#/') history.replaceState(null, '', '#/home');
window.addEventListener('hashchange', route);
// A brand-new student picks their event before seeing Home.
if (firstLaunch) showEventPicker(ev => { ctx.state.settings.seenEventPrompt = 1; ctx.setEvent(ev.id); route(); });
else {
  route().then(() => {
    // Existing students see the event sheet once, after Home has drawn.
    if (prompt) openEventAnnouncement(ctx, () => route());
  });
}

/* ---------- Offline support ---------- */
// One-time, unobtrusive confirmation that everything is saved for offline use.
function toast(text) {
  const t = h('div', { class: 'toast', role: 'status' }, icon('practice'), h('span', null, text));
  document.body.append(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3200);
}
initOffline({
  // Updates apply only on Home with no sheet open (never mid-exam, quiz or reel).
  safe: () => !sheet && !!base && base.name === 'home' && parseHash(location.hash).name === 'home',
  onFirstReady: () => toast('Ready to use offline'),
});
