// "Join the chapter leaderboard?" sheet. Shown once on Home, and again from the leaderboard screen.
// The nickname is only ever read from the input and shown as text.
import { h, icon, openSheet } from './ui.js';
import { cleanName, ensureLeaderboardId } from './store.js';
import { boardName } from './leaderboard.js';

export const SHARED_TEXT = 'Your first name or a nickname, your event, readiness %, questions this week and study streak. Nothing else. Anyone using the app can see it, so a nickname is a good idea.';

// onDone(joined) runs after the sheet closes: true when the student joined.
export function openJoinSheet(ctx, onDone) {
  let joined = false;
  let close = null;
  const input = h('input', {
    class: 'lbj-input', id: 'lbj-nick', type: 'text', maxlength: '20', autocomplete: 'off', autocapitalize: 'words',
    spellcheck: 'false', enterkeyhint: 'done', placeholder: 'Nickname', 'aria-describedby': 'lbj-shared',
  });
  input.value = boardName(ctx.state);
  const err = h('p', { class: 'lbj-err', role: 'alert', hidden: true }, 'Add a nickname to join.');
  const join = () => {
    const name = cleanName(input.value.replace(/[<>]/g, ''));
    if (!name) { err.hidden = false; input.focus(); return; }
    const lb = ctx.state.leaderboard;
    lb.nickname = name;
    lb.optIn = true;
    lb.asked = true;
    lb.lastSent = 0;
    ensureLeaderboardId(ctx.state);
    ctx.save();
    joined = true;
    close();
    ctx.syncScore({ force: true });
  };
  const content = h('form', { class: 'lbj', novalidate: true, onsubmit: e => { e.preventDefault(); join(); } },
    h('div', { class: 'lbj-ico', 'aria-hidden': 'true' }, icon('trophy')),
    h('h2', { class: 'lt' }, 'Join the worldwide leaderboard?'),
    h('p', { class: 'lbj-lede' }, 'See how you stack up against DECA students everywhere. It’s optional, and you can leave anytime in Settings.'),
    h('div', { class: 'lbj-shared', id: 'lbj-shared' },
      h('b', null, 'What’s shared'),
      h('p', null, SHARED_TEXT)),
    h('label', { class: 'lbj-field', for: 'lbj-nick' }, h('span', null, 'Shown as'), input),
    err,
    h('button', { class: 'cta', type: 'submit' }, 'Join'),
    h('button', { class: 'nm-skip', type: 'button', onclick: () => close() }, 'Not now'));
  close = openSheet(content, { label: 'Join the worldwide leaderboard', onClose: () => { if (onDone) onDone(joined); } });
  return close;
}
