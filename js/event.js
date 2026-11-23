// Event selection and the per-event view of the content. Everything a screen shows (areas,
// blueprint, lessons, questions, cards, videos) comes through eventData(), so one place decides
// what belongs to the student's chosen event. Mastery and answers stay shared across events.
import * as ALL from '../data/index.js';
import { EVENTS, CLUSTERS, DEFAULT_EVENT } from '../data/events.js';

export { EVENTS, CLUSTERS, DEFAULT_EVENT };

export const eventById = id => EVENTS.find(e => e.id === id) || null;

// The event chosen in settings; unknown or missing ids fall back to the default event.
export function currentEvent(state) {
  const id = state && state.settings && state.settings.event;
  return eventById(id) || eventById(DEFAULT_EVENT);
}

// Set of PI codes on the event's exam (tier-1 core plus the cluster's tier-2 PIs).
export function eventPis(event, pis = ALL.PIS) {
  const cluster = typeof event === 'string' ? (eventById(event) || {}).cluster : event.cluster;
  // The Principles exam ('core') draws only on the tier-1 Business Administration Core.
  if (cluster === 'core') return new Set(pis.filter(p => p.tier === 1).map(p => p.code));
  return new Set(pis.filter(p => !p.clusters || p.clusters.includes(cluster)).map(p => p.code));
}

// Which event an exam record or in-progress exam belongs to (older saves predate events: Finance).
export const examEvent = e => (e && eventById(e.event) ? e.event : DEFAULT_EVENT);

const cache = new Map();

/**
 * The event's slice of `all` (defaults to the real content): {EVENT, CLUSTER, PI_SET, PIS, AREAS,
 * BLUEPRINT, LESSONS, QUESTIONS, CARDS, VIDEOS, piByCode}. An item belongs when its PI is on the event's
 * exam; a lesson belongs when any of its PIs is, and keeps only the sections for those PIs.
 * A video belongs when its lesson does. Results for the real content are cached per event.
 */
export function eventData(event, all = ALL) {
  const useCache = all === ALL;
  if (useCache && cache.has(event.id)) return cache.get(event.id);
  const cluster = CLUSTERS[event.cluster];
  const set = eventPis(event, all.PIS);
  const lessons = [];
  for (const l of all.LESSONS) {
    if (!(l.pis || []).some(c => set.has(c))) continue;
    const sections = l.sections.filter(s => set.has(s.pi));
    lessons.push(sections.length === l.sections.length ? l : { ...l, pis: l.pis.filter(c => set.has(c)), sections });
  }
  const lessonIds = new Set(lessons.map(l => l.id));
  const out = {
    EVENT: event,
    CLUSTER: cluster,
    PI_SET: set,
    PIS: all.PIS.filter(p => set.has(p.code)),
    AREAS: cluster.areas.map(id => ({ id, name: cluster.names[id] })),
    BLUEPRINT: cluster.blueprint,
    LESSONS: lessons,
    QUESTIONS: all.QUESTIONS.filter(q => set.has(q.pi)),
    CARDS: all.CARDS.filter(c => set.has(c.pi)),
    VIDEOS: all.VIDEOS.filter(v => lessonIds.has(v.lesson)),
    piByCode: all.piByCode,
  };
  if (useCache) cache.set(event.id, out);
  return out;
}

// Switches the student's event. A mock exam in progress belongs to the old event, so it is dropped.
export function setEvent(state, id) {
  const ev = eventById(id) || eventById(DEFAULT_EVENT);
  state.settings.event = ev.id;
  if (state.activeExam && examEvent(state.activeExam) !== ev.id) state.activeExam = null;
  return ev;
}
