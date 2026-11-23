// Settings (#/settings): level, conference, theme, narration, backup/restore/reset, about.
// Everything the user types is set as a property or text (never parsed as markup).
import { h, icon, openSheet } from '../ui.js';
import { saveState, exportState, importState, defaultState, BAD_BACKUP } from '../store.js';
import { LEVEL_NAME } from './learn.js';
import { levelOf, ymd } from '../practice-lib.js';
import { openEventSheet } from '../picker.js';
import { onOfflineStatus, offlineLabel } from '../offline.js';

let status = null; // {text, kind} shown once after a re-render


function seg(name, label, options, value, onPick) {
  return h('div', { class: 'xp-seg st-seg', role: 'radiogroup', 'aria-label': label },
    options.map(([v, text]) => h('label', null,
      h('input', { type: 'radio', name, value: v, checked: v === value, onchange: () => onPick(v) }),
      h('span', null, text))));
}

function svgIcon(paths) {
  const t = document.createElement('template');
  t.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;
  return t.content.firstElementChild;
}
const ICON = {
  export: () => svgIcon('<path d="M12 15V3M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6"/>'),
  import: () => svgIcon('<path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6"/>'),
  reset: () => svgIcon('<path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.5"/><path d="M4 4v4.5h4.5"/>'),
  info: () => svgIcon('<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6v.1"/>'),
};

export function render(el, params, ctx) {
  const s = ctx.state.settings;
  const rerender = () => { el.replaceChildren(); render(el, params, ctx); };
  const set = (k, v) => { ctx.state.settings[k] = v; ctx.save(); };

  // Event
  const ev = ctx.data.EVENT;
  const eventRow = h('button', { class: 'row st-event-row', type: 'button', onclick: () => openEventSheet(ctx.state, picked => ctx.switchEvent(picked, rerender)) }, h('div', { class: 't' }, 'Competing in', h('small', null, ev.short)), h('span', { class: 'chev', 'aria-hidden': 'true' }, icon('chevron')));

  // Competition
  const levelNote = h('p', { class: 'st-help' }, 'Sets the blueprint for mock exams, readiness and Learn.');
  const levelSeg = seg('st-level', 'Competition level', Object.entries(LEVEL_NAME), levelOf(ctx.state), v => set('level', v));
  const nameInput = h('input', { class: 'st-input', id: 'st-conf', type: 'text', maxlength: '60', autocomplete: 'off', placeholder: 'Add a name', enterkeyhint: 'done' });
  nameInput.value = typeof s.confName === 'string' ? s.confName : '';
  nameInput.addEventListener('input', () => set('confName', nameInput.value.trim() ? nameInput.value : ''));
  const dateInput = h('input', { class: 'st-input', id: 'st-date', type: 'date' });
  dateInput.value = /^\d{4}-\d{2}-\d{2}$/.test(s.confDate || '') ? s.confDate : '';
  dateInput.addEventListener('change', () => set('confDate', dateInput.value || null));

  // Appearance
  const themeSeg = seg('st-theme', 'Theme', [['auto', 'Auto'], ['dark', 'Dark'], ['light', 'Light']],
    ['auto', 'dark', 'light'].includes(s.theme) ? s.theme : 'auto',
    v => { set('theme', v); ctx.applyTheme(v); });

  // Narration
  const narr = h('input', { class: 'st-switch', id: 'st-narrate', type: 'checkbox', role: 'switch' });
  narr.checked = s.narrate !== false;
  narr.addEventListener('change', () => set('narrate', narr.checked));

  // Progress
  const statusEl = h('p', { class: 'st-status', role: 'status', 'aria-live': 'polite', hidden: true });
  const showStatus = (text, kind) => { statusEl.textContent = text; statusEl.className = `st-status ${kind}`; statusEl.hidden = false; };
  if (status) { showStatus(status.text, status.kind); status = null; }

  const exportBtn = h('button', { class: 'row', type: 'button', onclick: () => {
    try {
      const blob = new Blob([exportState(ctx.state)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = h('a', { href: url, download: `deca-study-buddy-progress-${ymd(new Date())}.json`, hidden: true });
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showStatus('Backup saved to your downloads.', 'good');
    } catch (e) {
      showStatus('Couldn’t create the backup file on this device.', 'bad');
    }
  } }, h('div', { class: 'ico' }, ICON.export()), h('div', { class: 't' }, 'Export progress', h('small', null, 'Save a backup file')));

  const file = h('input', { class: 'sr-only', type: 'file', accept: 'application/json,.json', tabindex: '-1', 'aria-hidden': 'true' });
  file.addEventListener('change', async () => {
    const f = file.files && file.files[0];
    file.value = '';
    if (!f) return;
    let next;
    try { next = importState(await f.text()); } catch (e) { showStatus(BAD_BACKUP, 'bad'); return; }
    ctx.state = next;
    saveState(ctx.state);
    ctx.applyTheme(next.settings.theme);
    status = { text: 'Progress imported.', kind: 'good' };
    rerender();
  });
  const importBtn = h('button', { class: 'row', type: 'button', onclick: () => file.click() },
    h('div', { class: 'ico' }, ICON.import()), h('div', { class: 't' }, 'Import progress', h('small', null, 'Restore from a backup file')));

  // Offline readiness, live while Settings is open.
  const offVal = h('span', { class: 'st-value', role: 'status', 'aria-live': 'polite' });
  const unsub = onOfflineStatus(st => {
    if (!offVal.isConnected && offVal.dataset.mounted) { unsub(); return; }
    offVal.textContent = offlineLabel(st);
    offVal.classList.toggle('good', st.state === 'ready');
  });
  requestAnimationFrame(() => { offVal.dataset.mounted = '1'; });

  const resetBtn = h('button', { class: 'row st-danger', type: 'button', onclick: () => confirmReset(ctx, () => {
    status = { text: 'Progress reset.', kind: 'good' };
    rerender();
  }) }, h('div', { class: 'ico' }, ICON.reset()), h('div', { class: 't' }, 'Reset progress', h('small', null, 'Start over on this device')));

  el.append(
    h('h1', { class: 'lt' }, 'Settings'),
    h('h2', { class: 'gh' }, 'Event'),
    h('div', { class: 'group' }, eventRow),
    h('p', { class: 'note' }, 'Lessons, practice and mock exams follow your event. Your answers are kept if you switch.'),
    h('h2', { class: 'gh' }, 'Competition'),
    h('div', { class: 'group st-group' },
      h('div', { class: 'st-row st-stack' }, h('span', { class: 'st-label', id: 'st-level-l' }, 'Competition level'), levelSeg, levelNote),
      h('label', { class: 'st-row', for: 'st-conf' }, h('span', { class: 'st-label' }, 'Conference'), nameInput),
      h('label', { class: 'st-row', for: 'st-date' }, h('span', { class: 'st-label' }, 'Date'), dateInput)),
    h('p', { class: 'note' }, 'Home counts down to your conference date.'),
    h('h2', { class: 'gh' }, 'Appearance'),
    h('div', { class: 'group st-group' }, h('div', { class: 'st-row st-stack' }, h('span', { class: 'st-label' }, 'Theme'), themeSeg)),
    h('p', { class: 'note' }, 'Auto matches your device’s light or dark setting.'),
    h('h2', { class: 'gh' }, 'Video lessons'),
    h('div', { class: 'group st-group' }, h('label', { class: 'st-row', for: 'st-narrate' }, h('span', { class: 'st-label' }, 'Narrate videos'), narr)),
    h('p', { class: 'note' }, 'Plays recorded narration, or your device’s voice when needed. Captions always show.'),
    h('h2', { class: 'gh' }, 'Your progress'),
    h('div', { class: 'group' }, exportBtn, importBtn, resetBtn),
    file, statusEl,
    h('p', { class: 'note' }, 'Progress is saved only on this device. Export a backup to move it to another one.'),
    h('h2', { class: 'gh' }, 'Offline'),
    h('div', { class: 'group st-group' }, h('div', { class: 'st-row' }, h('span', { class: 'st-label' }, 'Offline use'), offVal)),
    h('p', { class: 'note' }, 'After the first download, lessons, video reels and practice work without a connection.'),
    h('h2', { class: 'gh' }, 'About'),
    h('div', { class: 'group' }, h('div', { class: 'row' }, h('div', { class: 'ico' }, ICON.info()),
      h('div', { class: 't' }, 'DECA Study Buddy', h('small', null, 'Version 1.0 · Works offline')))),
    h('p', { class: 'note' }, 'An independent study app for DECA Team Decision Making exams. Not affiliated with or endorsed by DECA Inc. Practice questions are original.'));
}

function confirmReset(ctx, done) {
  let close = null;
  const yes = h('button', { class: 'cta st-reset-yes', type: 'button', onclick: () => {
    const fresh = defaultState();
    fresh.settings = { ...fresh.settings, ...ctx.state.settings };
    ctx.state = fresh;
    saveState(ctx.state);
    close();
    done();
  } }, 'Reset progress');
  const no = h('button', { class: 'btn-2', type: 'button', onclick: () => close() }, 'Cancel');
  const content = h('div', { class: 'st-confirm' },
    h('div', { class: 'st-confirm-ico' }, icon('alert')),
    h('h2', { class: 'lt' }, 'Reset progress?'),
    h('p', null, 'This erases your answers, flashcard schedule, mock exams and streak on this device. Your settings stay. This can’t be undone.'),
    yes, no);
  const onHash = () => close(); // leaving Settings (e.g. browser back) dismisses the sheet too
  close = openSheet(content, { label: 'Reset progress', onClose: () => window.removeEventListener('hashchange', onHash) });
  window.addEventListener('hashchange', onHash);
  setTimeout(() => no.focus({ preventScroll: true }), 50);
}
