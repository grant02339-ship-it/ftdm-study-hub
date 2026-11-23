// mkt-promo: Marketing Tier 2 Promotion (PR) and Selling (SE) content group.
import prLessons from './mkt-promo-lessons-a.js';
import seLessons from './mkt-promo-lessons-b.js';
import questions from './mkt-promo-questions.js';
import cards from './mkt-promo-cards.js';
import videos from './mkt-promo-videos.js';

const lessons = [...prLessons, ...seLessons];

export default { lessons, questions, cards, videos };
