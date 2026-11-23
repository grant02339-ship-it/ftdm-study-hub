// Cards tab (#/cards): deck picker, 3D flip card, Again/Good/Easy with the next interval.
import { h, icon, reducedMotion } from '../ui.js';
import { review, dueCards } from '../srs.js';
import { glyph, haptic } from './quiz.js';
import { noteStudy, formatInterval, relativeDue, nextDue } from '../practice-lib.js';

let deck = 'all'; // remembered for the session

const GRADES = [['again', 'Again'], ['good', 'Good'], ['easy', 'Easy']];

export function render(el, params, ctx) {
  const { CARDS, AREAS } = ctx.data;
  const decks = [{ id: 'all', name: 'All due' }, ...AREAS.filter(a => CARDS.some(c => c.area === a.id))];
  if (!decks.some(d => d.id === deck)) deck = 'all';
  const cardsOf = id => (id === 'all' ? CARDS : CARDS.filter(c => c.area === id));
  const dueIn = id => dueCards(cardsOf(id), ctx.state, Date.now()).length;

  const chips = decks.map(d => h('button', {
    class: 'chip fc-deck', type: 'button', 'aria-pressed': d.id === deck ? 'true' : 'false',
    onclick: () => { if (d.id !== deck) { deck = d.id; start(); } },
  }, h('span', null, d.name), h('span', { class: 'num fc-n' })));
  const paintChips = () => decks.forEach((d, i) => {
    chips[i].setAttribute('aria-pressed', d.id === deck ? 'true' : 'false');
    chips[i].lastChild.textContent = String(dueIn(d.id));
  });

  const line = h('p', { class: 'fc-line', 'aria-live': 'polite' });
  const stage = h('div', { class: 'fc-stage' });
  const rate = h('div', { class: 'fc-rate', role: 'group', 'aria-label': 'How well did you know it?' });
  const live = h('p', { class: 'sr-only', 'aria-live': 'polite' });

  el.append(h('h1', { class: 'lt' }, 'Cards'),
    h('div', { class: 'fc-decks', role: 'toolbar', 'aria-label': 'Decks' }, chips),
    line, stage, rate, live);

  let queue = [], card = null, flipped = false, flipEl = null;

  function deckName() { return (decks.find(d => d.id === deck) || decks[0]).name; }

  function start() {
    queue = dueCards(cardsOf(deck), ctx.state, Date.now());
    paintChips();
    showCard(true);
    const sel = chips[decks.findIndex(d => d.id === deck)];
    if (sel && sel.scrollIntoView) sel.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reducedMotion() ? 'auto' : 'smooth' });
  }

  function showCard(first = false) {
    card = queue[0] || null;
    flipped = false;
    if (!card) { finished(); return; }
    const name = deck === 'all' ? 'All due' : deckName();
    line.textContent = `${name} · ${queue.length} to go`;
    const area = AREAS.find(a => a.id === card.area);
    const front = h('div', { class: 'fc-face fc-front' },
      h('small', null, area ? area.name : 'Term'),
      h('h2', null, card.front),
      h('span', { class: 'fc-tap' }, 'Tap to flip'));
    const back = h('div', { class: 'fc-face fc-back', 'aria-hidden': 'true' },
      h('small', null, 'Definition'),
      h('h2', null, card.front),
      h('p', null, card.back),
      card.formula ? h('div', { class: 'fc-formula' }, card.formula) : null);
    flipEl = h('div', { class: 'fc-card', role: 'button', tabindex: '0', 'aria-label': `${card.front}. Show the definition`, 'aria-pressed': 'false' },
      h('div', { class: 'fc-in' }, front, back));
    flipEl.addEventListener('click', flip);
    flipEl.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
    stage.replaceChildren(flipEl);
    if (!first && !reducedMotion()) flipEl.classList.add('fc-enter');
    paintRate();
    if (!first) flipEl.focus({ preventScroll: true });

    function flip() {
      flipped = !flipped;
      flipEl.classList.toggle('flip', flipped);
      flipEl.setAttribute('aria-pressed', flipped ? 'true' : 'false');
      front.setAttribute('aria-hidden', flipped ? 'true' : 'false');
      back.setAttribute('aria-hidden', flipped ? 'false' : 'true');
      flipEl.setAttribute('aria-label', flipped ? `${card.front}: ${card.back}` : `${card.front}. Show the definition`);
      rate.classList.toggle('ready', flipped);
      rate.querySelectorAll('button').forEach(b => { b.disabled = !flipped; });
      haptic(6);
    }
  }

  function paintRate() {
    const now = Date.now();
    const s = ctx.state.cards[card.id];
    rate.classList.remove('ready');
    rate.replaceChildren(...GRADES.map(([g, label], i) => {
      const next = review(s, g, now);
      return h('button', { class: `fc-grade ${g}`, type: 'button', disabled: true, onclick: () => grade(g),
        'aria-label': `${label}, see it again in ${formatInterval(next.due - now)}`, 'aria-keyshortcuts': String(i + 1) },
      label, h('span', null, formatInterval(next.due - now)));
    }));
    rate.hidden = false;
  }

  function grade(g) {
    if (!card || !flipped) return;
    const now = Date.now();
    ctx.state.cards[card.id] = review(ctx.state.cards[card.id], g, now);
    noteStudy(ctx.state);
    ctx.save();
    haptic(10);
    const done = queue.shift();
    if (g === 'again') queue.push(done); // comes back at the end of this session
    live.textContent = g === 'again' ? 'You’ll see it again soon.' : `Next review in ${formatInterval(ctx.state.cards[done.id].due - now)}.`;
    paintChips();
    const old = flipEl;
    if (old && !reducedMotion()) {
      old.classList.add(g === 'again' ? 'fc-out-down' : 'fc-out');
      rate.querySelectorAll('button').forEach(b => { b.disabled = true; });
      setTimeout(() => showCard(), 220);
    } else showCard();
  }

  function finished() {
    rate.hidden = true;
    rate.replaceChildren();
    const total = cardsOf(deck).length;
    const nd = nextDue(cardsOf(deck), ctx.state, Date.now());
    line.textContent = deck === 'all' ? 'All decks' : deckName();
    const msg = !total ? 'No cards in this deck yet.'
      : nd ? `Next cards due ${relativeDue(nd - Date.now())}.` : 'Nothing is scheduled yet.';
    stage.replaceChildren(h('div', { class: 'fc-done' + (reducedMotion() ? '' : ' fc-enter') },
      h('div', { class: 'fc-done-ico' }, glyph('check')),
      h('h2', null, 'All caught up.'),
      h('p', null, msg),
      deck !== 'all' && dueIn('all') ? h('button', { class: 'btn-2', type: 'button', onclick: () => { deck = 'all'; start(); } }, `Review all due cards (${dueIn('all')})`) : null,
      h('a', { class: 'link', href: '#/practice' }, 'Practice questions instead')));
  }

  function onKey(e) {
    if (!el.isConnected) { document.removeEventListener('keydown', onKey); return; }
    if (!card || e.metaKey || e.ctrlKey || e.altKey || document.documentElement.classList.contains('sheet-open')) return;
    if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    const i = ['1', '2', '3'].indexOf(e.key);
    if (i >= 0 && flipped) { e.preventDefault(); grade(GRADES[i][0]); }
    else if (e.key === ' ' && e.target === document.body) { e.preventDefault(); flipEl.click(); }
  }
  document.addEventListener('keydown', onKey);

  start();
  if (!CARDS.length) el.append(h('div', { class: 'empty' }, h('div', { class: 'ico' }, icon('cards')), h('p', null, 'No flashcards yet.')));
}
