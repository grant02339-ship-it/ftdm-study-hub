// Customer Relations (CR) and Communications (CO) content group
import crLessonsA from './crco-cr-lessons-a.js';
import crLessonsB from './crco-cr-lessons-b.js';
import coLessonsA from './crco-co-lessons-a.js';
import coLessonsB from './crco-co-lessons-b.js';
import coLessonsC from './crco-co-lessons-c.js';
import questions from './crco-questions.js';
import cards from './crco-cards.js';
import videos from './crco-videos.js';

export default {
  lessons: [...crLessonsA, ...crLessonsB, ...coLessonsA, ...coLessonsB, ...coLessonsC],
  questions,
  cards,
  videos
};
