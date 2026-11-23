// Flashcard session queue. Pure (no DOM, no storage): the view owns state.cards and saving.
// Unknown cards ("Don't know") return a few cards later; known cards are re-inserted at random
// so they stay fresh; once every card is known, the deck cycles through them at random forever.
export const REINSERT_MIN = 3, REINSERT_MAX = 6; // a missed card is shown again this many cards later
export const KNOWN_RATE = 0.2;                   // chance a pick is a known card while unknown ones remain

export const isKnown = (state, id) => !!(state.cards[id] && state.cards[id].known);
export const unknownCards = (cards, state) => cards.filter(c => !isKnown(state, c.id));

// Records an answer on state.cards[id] = {known, seen, last}. Returns the entry.
export function mark(state, id, known, now = Date.now()) {
  const prev = state.cards[id];
  state.cards[id] = { known: !!known, seen: (prev ? prev.seen : 0) + 1, last: now };
  return state.cards[id];
}

// mulberry32: small seedable RNG for tests.
export function seededRng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// cards: [{id,...}] shuffled by rng into the initial queue. known(id) says which start as known.
export function createSession(cards, known, rng = Math.random) {
  const queue = [], pool = []; // unknown cards waiting (not the current one), known cards (incl. current if known)
  const shuffled = cards.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  for (const c of shuffled) (known(c.id) ? pool : queue).push(c);
  let current = null;

  const randomKnown = avoid => {
    const opts = pool.filter(c => c !== avoid);
    const from = opts.length ? opts : pool;
    return from.length ? from[Math.floor(rng() * from.length)] : null;
  };

  function pick(last) {
    if (queue.length && pool.length && rng() < KNOWN_RATE) { const k = randomKnown(last); if (k !== last) return k; }
    if (queue.length) {
      let i = 0;
      if (queue[0] === last) {
        if (queue.length > 1) i = 1;
        else { const k = randomKnown(last); if (k && k !== last) return k; }
      }
      return queue.splice(i, 1)[0];
    }
    return randomKnown(last); // all known: random review forever
  }

  const s = {
    get current() { return current; },
    get total() { return cards.length; },
    get knownCount() { return pool.length; },
    get allKnown() { return cards.length > 0 && pool.length === cards.length; },
    get pending() { return queue.length; },
    get upcoming() { return queue.slice(); }, // unknown cards in the order they will come up
    // Answers the current card and moves to the next. Returns the new current card.
    answer(know) {
      const done = current;
      if (!done) return null;
      const at = pool.indexOf(done);
      if (know) { if (at < 0) pool.push(done); }
      else {
        if (at >= 0) pool.splice(at, 1);
        const d = REINSERT_MIN + Math.floor(rng() * (REINSERT_MAX - REINSERT_MIN + 1));
        queue.splice(Math.min(d - 1, queue.length), 0, done); // d cards later; end of the queue when the deck is small
      }
      current = pick(done);
      return current;
    },
  };
  current = pick(null);
  return s;
}
