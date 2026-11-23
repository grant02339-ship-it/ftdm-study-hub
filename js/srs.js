// Leitner scheduling. Boxes 0-5; interval in days per box.
export const INTERVALS_DAYS = [0, 1, 2, 4, 8, 16];
const DAY = 86400000, MAX_BOX = INTERVALS_DAYS.length - 1;

// card: {box, due} or undefined for a card never reviewed. Returns the new {box, due}.
export function review(card, grade, now) {
  const box = card ? card.box : 0;
  if (grade === 'again') return { box: 0, due: now + 60000 };
  const next = Math.min(MAX_BOX, box + (grade === 'easy' ? 2 : 1));
  return { box: next, due: now + INTERVALS_DAYS[next] * DAY };
}

// cards: card definitions ({id,...}). Unseen cards are due immediately.
export function dueCards(cards, state, now) {
  return cards.filter(c => {
    const s = state.cards[c.id];
    return !s || s.due <= now;
  });
}
