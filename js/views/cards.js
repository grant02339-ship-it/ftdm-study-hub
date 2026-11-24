// Cards tab (#/cards): deck picker, 3D flip card, Know / Don't know (buttons, keys, swipe), progress bar.
import { h, icon, box, reducedMotion } from '../ui.js';
import { createSession, isKnown, mark } from '../deck.js';
import { haptic } from './quiz.js';
import { noteStudy, ymd } from '../practice-lib.js';
import { notePlanProgress } from '../foryou.js';

let deck = 'all'; // remembered for the session
const SWIPE_PX = 90, SWIPE_VELOCITY = 0.5; // distance or px/ms that commits a swipe

export function render(el, params, ctx) {
  const { CARDS, AREAS } = ctx.data;
  const decks = [{ id: 'all', name: 'All cards' }, ...AREAS.filter(a => CARDS.some(c => c.area === a.id))];
  if (!decks.some(d => d.id === deck)) deck = 'all';
  const cardsOf = id => (id === 'all' ? CARDS : CARDS.filter(c => c.area === id));
  const knownIn = id => cardsOf(id).filter(c => isKnown(ctx.state, c.id)).length;

  const chips = decks.map(d => h('button', {
    class: 'chip fc-deck', type: 'button', 'aria-pressed': d.id === deck ? 'true' : 'false',
    onclick: () => { if (d.id !== deck) { deck = d.id; start(); } },
  }, h('span', null, d.name), h('span', { class: 'num fc-n' })));
  const paintChips = () => decks.forEach((d, i) => {
    chips[i].setAttribute('aria-pressed', d.id === deck ? 'true' : 'false');
    chips[i].lastChild.textContent = String(cardsOf(d.id).length - knownIn(d.id));
    chips[i].setAttribute('aria-label', `${d.name}, ${cardsOf(d.id).length - knownIn(d.id)} to learn`);
  });

  const note = h('p', { class: 'fc-note', role: 'status', hidden: true });
  const count = h('span', { class: 'fc-count' });
  const fill = h('i');
  const line = h('div', { class: 'fc-line' }, count,
    h('div', { class: 'fc-bar', role: 'progressbar', 'aria-label': 'Cards known', 'aria-valuemin': '0' }, fill));
  const stage = h('div', { class: 'fc-stage' });
  const know = h('button', { class: 'fc-grade know', type: 'button', disabled: true, 'aria-keyshortcuts': 'ArrowRight 2', onclick: () => answer(true) }, 'Know');
  const dont = h('button', { class: 'fc-grade dont', type: 'button', disabled: true, 'aria-keyshortcuts': 'ArrowLeft 1', onclick: () => answer(false) }, 'Don’t know');
  const rate = h('div', { class: 'fc-rate', role: 'group', 'aria-label': 'Did you know it?' }, dont, know);
  const live = h('p', { class: 'sr-only', 'aria-live': 'polite' });

  el.append(h('h1', { class: 'lt' }, 'Cards'),
    box('Decks', `${decks.length - 1} ${decks.length === 2 ? 'area' : 'areas'}`, [
      h('div', { class: 'fc-decks', role: 'toolbar', 'aria-label': 'Decks' }, chips),
      line], { class: 'fc-deckbox' }),
    note, stage, rate, live);

  let session = null, card = null, flipped = false, flipEl = null, busy = false;

  function deckName() { return (decks.find(d => d.id === deck) || decks[0]).name; }

  function start() {
    session = createSession(cardsOf(deck), id => isKnown(ctx.state, id));
    paintChips();
    showCard(true);
    const sel = chips[decks.findIndex(d => d.id === deck)];
    if (sel && sel.scrollIntoView) sel.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reducedMotion() ? 'auto' : 'smooth' });
  }

  function paintProgress() {
    const total = session.total, k = session.knownCount;
    count.textContent = total ? `${k} of ${total} known` : deckName();
    fill.style.width = total ? `${Math.round(k / total * 100)}%` : '0%';
    line.lastChild.setAttribute('aria-valuemax', String(total));
    line.lastChild.setAttribute('aria-valuenow', String(k));
    note.hidden = !session.allKnown;
    note.textContent = session.allKnown ? `You know all ${total} cards. Shuffling them for review.` : '';
  }

  function showCard(first = false) {
    card = session.current;
    flipped = false; busy = false;
    paintProgress();
    rate.querySelectorAll('button').forEach(b => { b.disabled = true; });
    rate.classList.remove('ready');
    if (!card) { stage.replaceChildren(); rate.hidden = true; return; }
    rate.hidden = false;
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
      h('div', { class: 'fc-in' }, front, back), h('div', { class: 'fc-tint', 'aria-hidden': 'true' }));
    const thisCard = flipEl;
    let moved = false;
    thisCard.addEventListener('click', () => { if (moved) { moved = false; return; } flip(); });
    thisCard.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
    attachSwipe(thisCard, () => flipped && !busy, () => { moved = true; setTimeout(() => { moved = false; }, 60); }, answer);
    stage.replaceChildren(thisCard);
    if (!first && !reducedMotion()) thisCard.classList.add('fc-enter');
    if (!first) thisCard.focus({ preventScroll: true });

    function flip() {
      if (busy) return;
      flipped = !flipped;
      thisCard.classList.toggle('flip', flipped);
      thisCard.setAttribute('aria-pressed', flipped ? 'true' : 'false');
      front.setAttribute('aria-hidden', flipped ? 'true' : 'false');
      back.setAttribute('aria-hidden', flipped ? 'false' : 'true');
      thisCard.setAttribute('aria-label', flipped ? `${card.front}: ${card.back}` : `${card.front}. Show the definition`);
      rate.classList.toggle('ready', flipped);
      rate.querySelectorAll('button').forEach(b => { b.disabled = !flipped; });
      haptic(6);
    }
  }

  // Horizontal drag on a flipped card: right = know, left = don't know. `fly` is true when the
  // gesture already animated the card out, so answer() skips its own exit animation.
  function attachSwipe(node, enabled, onDrag, commit) {
    let id = null, x0 = 0, y0 = 0, t0 = 0, dx = 0, drag = false;
    const reset = (spring) => {
      node.style.transition = spring && !reducedMotion() ? 'transform .45s var(--spring)' : 'none';
      node.style.transform = ''; node.style.setProperty('--tint', '0');
      node.classList.remove('tint-know', 'tint-dont', 'dragging');
    };
    node.addEventListener('pointerdown', e => {
      if (!enabled() || (e.pointerType === 'mouse' && e.button !== 0)) return;
      id = e.pointerId; x0 = e.clientX; y0 = e.clientY; t0 = e.timeStamp; dx = 0; drag = false;
    });
    node.addEventListener('pointermove', e => {
      if (e.pointerId !== id) return;
      const mx = e.clientX - x0, my = e.clientY - y0;
      if (!drag) {
        if (Math.abs(mx) < 8 || Math.abs(mx) < Math.abs(my)) return;
        drag = true; onDrag();
        try { node.setPointerCapture(id); } catch (err) { /* synthetic pointer */ }
        node.style.transition = 'none'; node.classList.add('dragging');
      }
      dx = mx;
      node.style.transform = `translateX(${dx}px) rotate(${dx / 24}deg)`;
      node.style.setProperty('--tint', String(Math.min(1, Math.abs(dx) / 140)));
      node.classList.toggle('tint-know', dx > 0); node.classList.toggle('tint-dont', dx < 0);
    });
    const end = e => {
      if (e.pointerId !== id) return;
      id = null;
      if (!drag) return;
      onDrag();
      const v = Math.abs(dx) / Math.max(1, e.timeStamp - t0);
      if (e.type === 'pointerup' && (Math.abs(dx) > SWIPE_PX || (Math.abs(dx) > 30 && v > SWIPE_VELOCITY))) {
        const right = dx > 0;
        busy = true;
        if (reducedMotion()) { commit(right, true); return; }
        node.style.transition = 'transform .38s cubic-bezier(.3,1.25,.5,1), opacity .38s ease';
        node.style.transform = `translateX(${right ? 130 : -130}vw) rotate(${right ? 22 : -22}deg)`;
        node.style.opacity = '0';
        setTimeout(() => commit(right, true), 300);
      } else reset(true);
    };
    node.addEventListener('pointerup', end);
    node.addEventListener('pointercancel', end);
  }

  function answer(knew, fromSwipe = false) {
    if (!card || !flipped || (busy && !fromSwipe)) return;
    busy = true;
    const done = card;
    mark(ctx.state, done.id, knew);
    noteStudy(ctx.state);
    notePlanProgress(ctx.state, ymd(new Date()));
    ctx.save();
    haptic(10);
    live.textContent = knew ? 'Marked as known.' : 'You’ll see it again soon.';
    paintChips();
    const next = () => { session.answer(knew); showCard(); };
    rate.querySelectorAll('button').forEach(b => { b.disabled = true; });
    if (fromSwipe || reducedMotion() || !flipEl) next();
    else { flipEl.classList.add(knew ? 'fc-out-r' : 'fc-out'); setTimeout(next, 220); }
  }

  function onKey(e) {
    if (!el.isConnected) { document.removeEventListener('keydown', onKey); return; }
    if (!card || e.metaKey || e.ctrlKey || e.altKey || document.documentElement.classList.contains('sheet-open')) return;
    if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (e.key === ' ' && e.target === document.body) { e.preventDefault(); flipEl.click(); return; }
    if (!flipped || busy) return;
    if (e.key === 'ArrowLeft' || e.key === '1') { e.preventDefault(); answer(false); }
    else if (e.key === 'ArrowRight' || e.key === '2') { e.preventDefault(); answer(true); }
  }
  document.addEventListener('keydown', onKey);

  start();
  if (!CARDS.length) el.append(h('div', { class: 'empty' }, h('div', { class: 'ico' }, icon('cards')), h('p', null, 'No flashcards yet.')));
}
