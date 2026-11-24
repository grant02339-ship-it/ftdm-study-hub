// Chapter leaderboard (#/leaderboard): most studied this week / most ready, filterable to your event.
// Names come from other students: every one is set with textContent (via h() text nodes), never as markup.
import { h, icon, box } from '../ui.js';
import { fetchBoard, sortRows, filterRows, isMe, timeAgo, eventShort } from '../leaderboard.js';
import { openJoinSheet } from '../lb-join.js';

let mode = 'week';     // 'week' | 'ready', remembered for the session
let scope = 'all';     // 'all' | 'mine'

const MEDAL = ['gold', 'silver', 'bronze'];

function rowEl(r, i, me, sortMode) {
  const medal = i < 3 ? MEDAL[i] : '';
  const name = h('span', { class: 'lb-name' });
  name.textContent = r.name;
  const evName = h('small', { class: 'lb-ev' });
  evName.textContent = eventShort(r.event) || 'DECA';
  const val = sortMode === 'ready' ? `${r.readiness}%` : String(r.weekQuestions);
  const unit = sortMode === 'ready' ? 'ready' : 'this week';
  return h('li', { class: `lb-row${me ? ' me' : ''}${medal ? ` ${medal}` : ''}` },
    h('span', { class: 'lb-rank num', 'aria-label': `Rank ${i + 1}` }, String(i + 1)),
    h('div', { class: 'lb-who' },
      h('div', { class: 'lb-line' }, name, me ? h('span', { class: 'tag hot lb-you' }, 'You') : null),
      evName),
    h('div', { class: 'lb-val' }, h('b', { class: 'num' }, val), h('small', null, unit)));
}

export function render(el, params, ctx) {
  const { state } = ctx;
  const myEvent = state.settings.event;
  let board = { rows: state.leaderboard.cache.rows, at: state.leaderboard.cache.at };
  let phase = board.at ? 'ready' : 'loading';   // loading | ready | error
  let stale = false;                            // showing the saved board because a refresh failed or we're offline
  const live = h('p', { class: 'sr-only', role: 'status', 'aria-live': 'polite' });
  const body = h('div', { class: 'lb-body' });
  const foot = h('p', { class: 'box-note lb-foot' });

  const pick = (name, label, options, value, onPick) => h('div', { class: 'xp-seg lb-seg', role: 'radiogroup', 'aria-label': label },
    options.map(([v, text]) => h('label', null,
      h('input', { type: 'radio', name, value: v, checked: v === value, onchange: () => onPick(v) }),
      h('span', null, text))));
  const modeSeg = pick('lb-mode', 'Rank by', [['week', 'Most studied this week'], ['ready', 'Most ready']], mode, v => { mode = v; paint(); });
  const chips = h('div', { class: 'lb-chips', role: 'radiogroup', 'aria-label': 'Events' },
    [['all', 'All events'], ['mine', 'My event']].map(([v, text]) => h('label', { class: 'lb-chip' },
      h('input', { type: 'radio', name: 'lb-scope', value: v, checked: v === scope, onchange: () => { scope = v; paint(); } }),
      h('span', null, text))));

  function retry() { phase = board.at ? 'ready' : 'loading'; paint(); load(); }

  function paint() {
    foot.textContent = '';
    if (phase === 'loading') {
      body.replaceChildren(h('div', { class: 'lb-state', role: 'status' }, h('span', { class: 'lb-spin', 'aria-hidden': 'true' }), 'Loading the board…'));
      return;
    }
    if (phase === 'error') {
      body.replaceChildren(h('div', { class: 'lb-state' },
        h('div', { class: 'ico lb-state-ico' }, icon('alert')),
        h('p', null, 'Couldn’t load the leaderboard.'),
        h('p', { class: 'lb-sub' }, navigator.onLine === false ? 'You’re offline. Connect and try again.' : 'Check your connection and try again.'),
        h('button', { class: 'cta lb-retry', type: 'button', onclick: retry }, 'Try again')));
      return;
    }
    const all = board.rows;
    const rows = sortRows(filterRows(all, scope === 'mine' ? myEvent : null), mode);
    if (!all.length) {
      body.replaceChildren(h('div', { class: 'lb-state' },
        h('div', { class: 'ico lb-state-ico' }, icon('trophy')),
        h('p', { class: 'lb-big' }, 'No one has joined yet. Be the first!'),
        state.leaderboard.optIn ? null : h('button', { class: 'cta lb-retry', type: 'button', onclick: join }, 'Join the leaderboard')));
    } else if (!rows.length) {
      body.replaceChildren(h('div', { class: 'lb-state' },
        h('div', { class: 'ico lb-state-ico' }, icon('trophy')),
        h('p', { class: 'lb-big' }, 'No one in your event yet.'),
        h('p', { class: 'lb-sub' }, 'Switch to All events to see everyone.')));
    } else {
      body.replaceChildren(h('ol', { class: 'lb-list' }, rows.map((r, i) => rowEl(r, i, isMe(r, state, myEvent), mode))));
    }
    const ago = timeAgo(board.at, Date.now());
    foot.textContent = `Updated ${ago}${stale ? '. Showing saved results while offline or unavailable.' : ''}`;
  }

  async function load() {
    if (navigator.onLine === false) {
      stale = true;
      if (board.at) phase = 'ready'; else phase = 'error';
      paint();
      return;
    }
    // Make sure this student's own latest score is on the board before reading it (never waits long).
    if (state.leaderboard.optIn) { try { await Promise.race([ctx.syncScore(), new Promise(r => setTimeout(r, 1500))]); } catch (e) { /* silent */ } }
    try {
      board = await fetchBoard(ctx);
      stale = false;
      phase = 'ready';
    } catch (e) {
      stale = !!board.at;
      phase = board.at ? 'ready' : 'error';
    }
    if (!el.isConnected) return;
    paint();
    live.textContent = phase === 'ready' ? 'Leaderboard updated.' : 'Couldn’t load the leaderboard.';
  }

  function join() { openJoinSheet(ctx, joined => { if (joined) { phase = board.at ? 'ready' : 'loading'; paint(); load(); } }); }

  const joinRow = state.leaderboard.optIn ? null
    : h('button', { class: 'row', type: 'button', onclick: join },
      h('div', { class: 'ico' }, icon('trophy')),
      h('div', { class: 't' }, 'Join the leaderboard', h('small', null, 'Share your first name or a nickname, and your study stats')),
      h('span', { class: 'chev', 'aria-hidden': 'true' }, icon('chevron')));

  el.append(
    h('h1', { class: 'lt' }, 'Leaderboard'),
    h('p', { class: 'sub' }, 'DECA Study Buddy students everywhere who joined, ranked by what they’ve studied.'),
    box('Rankings', null, [modeSeg, chips, body, foot, live], { class: 'lb-box' }),
    ...(joinRow ? [box(null, null, [h('div', { class: 'group' }, joinRow)], { label: 'Join' })] : []));
  paint();
  load();
}
