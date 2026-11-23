// Learn tab (#/learn): search, the Watch shelf and areas in blueprint order.
// Area page (#/learn/:area): that area's lessons and videos, plus area practice.
import { h, icon } from '../ui.js';
import { areaMastery } from '../progress.js';

export const LEVEL_NAME = { district: 'District', association: 'Association', icdc: 'ICDC' };
const levelOf = state => (LEVEL_NAME[state.settings.level] ? state.settings.level : 'district');
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

export function examLine(items, level) {
  return items > 0 ? `${plural(items, 'item')} on the exam at ${LEVEL_NAME[level]}`
    : `Not on the exam at ${LEVEL_NAME[level]}`;
}

export function videoMinutes(video) {
  const sec = (video.scenes || []).reduce((t, sc) => t + (sc.dur || 0), 0);
  return Math.max(1, Math.round(sec / 60));
}

// The quiz route Task 7 reads: #/quiz?pis=<comma-separated PI codes>&n=<count>
export const quizHref = (pis, n = 10) => `#/quiz?pis=${encodeURIComponent(pis.join(','))}&n=${n}`;

/* ---------- Search ---------- */
const norm = s => String(s || '').toLowerCase();

// Every word of the query must appear somewhere in the lesson (title, key terms, or its PIs' codes and titles).
// Returns [{lesson, pi?, term?, score}] best first. pi = the PI that matched, term = the key term that matched.
export function searchLessons(query, lessons, piByCode) {
  const words = norm(query).trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const out = [];
  lessons.forEach((lesson, order) => {
    const title = norm(lesson.title);
    const pis = lesson.pis.map(code => { const p = piByCode(code); return { code, text: norm(`${code} ${p ? p.title : ''}`), p }; });
    const terms = (lesson.keyTerms || []).map(k => ({ k, term: norm(k.term), def: norm(k.def) }));
    let score = 0, pi = null, term = null;
    for (const w of words) {
      let hit = false;
      if (title.includes(w)) { score += 4; hit = true; }
      const tm = terms.find(t => t.term.includes(w));
      if (tm) { score += 3; hit = true; term = term || tm.k; }
      const pm = pis.find(p => p.text.includes(w));
      if (pm) { score += 2; hit = true; pi = pi || pm.p || { code: pm.code, title: '' }; }
      if (!hit) { const dm = terms.find(t => t.def.includes(w)); if (dm) { score += 1; hit = true; term = term || dm.k; } }
      if (!hit) return;
    }
    out.push({ lesson, pi, term, score, order });
  });
  return out.sort((a, b) => b.score - a.score || a.order - b.order);
}

/* ---------- Pieces ---------- */
function row(href, ico, title, sub, trailing, extraClass = '') {
  return h('a', { class: `row${extraClass ? ' ' + extraClass : ''}`, href },
    ico,
    h('div', { class: 't' }, title, sub ? h('small', null, sub) : null),
    trailing,
    h('span', { class: 'chev', 'aria-hidden': 'true' }, icon('chevron')));
}
const ico = (name, cls = '') => h('div', { class: `ico${cls ? ' ' + cls : ''}` }, icon(name));

function masteryMeter(m) {
  const pct = Math.round(m * 100);
  return h('div', { class: 'meter', role: 'img', 'aria-label': `${pct}% mastered` },
    h('span', { class: 'num' }, `${pct}%`),
    h('div', { class: 'bar' }, h('i', { style: `width:${pct}%` })));
}

export function lessonRow(lesson, sub) {
  const star = !!lesson.caseFrequent;
  const subtitle = sub || (star ? `Often in FTDM cases · ${lesson.minutes} min` : `${lesson.minutes} min · ${plural(lesson.pis.length, 'PI')}`);
  return row(`#/lesson/${encodeURIComponent(lesson.id)}`, ico(star ? 'star' : 'lesson', star ? 'star' : ''),
    star ? h('span', null, h('span', { class: 'sr-only' }, 'Starred: '), lesson.title) : lesson.title, subtitle);
}

function videoCard(video, areaName) {
  return h('a', { class: 'vcard', href: `#/watch/${encodeURIComponent(video.id)}` },
    h('div', { class: 'vposter', 'aria-hidden': 'true' },
      h('span', { class: 'vglyph' }, icon(video.area)),
      h('span', { class: 'vplay' }, icon('play')),
      h('span', { class: 'vdur num' }, `${videoMinutes(video)} min`)),
    h('div', { class: 'vtitle' }, video.title),
    h('div', { class: 'vmeta' }, areaName));
}

/* ---------- Learn home ---------- */
let lastQuery = ''; // survives re-renders (e.g. closing a lesson sheet) within the session

function renderHome(el, ctx) {
  const { state, data } = ctx;
  const { AREAS, BLUEPRINT, LESSONS, VIDEOS, QUESTIONS, piByCode } = data;
  const level = levelOf(state);
  const areaName = id => (AREAS.find(a => a.id === id) || { name: id }).name;

  const input = h('input', {
    class: 'search-input', type: 'search', placeholder: 'Search lessons, terms and PIs', 'aria-label': 'Search lessons',
    autocomplete: 'off', autocorrect: 'off', spellcheck: 'false', enterkeyhint: 'search', value: lastQuery,
  });
  const clear = h('button', { class: 'search-clear', type: 'button', 'aria-label': 'Clear search' }, icon('close'));
  const search = h('div', { class: 'search', role: 'search' }, h('span', { class: 'search-ico', 'aria-hidden': 'true' }, icon('search')), input, clear);
  const results = h('div', { class: 'search-results', 'aria-live': 'polite' });

  // Watch shelf, videos in blueprint area order.
  const areaIdx = id => { const i = AREAS.findIndex(a => a.id === id); return i < 0 ? 99 : i; };
  const vids = [...VIDEOS].sort((a, b) => areaIdx(a.area) - areaIdx(b.area));
  const shelf = vids.length ? [
    h('h2', { class: 'gh' }, 'Watch'),
    h('div', { class: 'shelf', role: 'list' }, vids.map(v => { const c = videoCard(v, areaName(v.area)); c.setAttribute('role', 'listitem'); return c; })),
  ] : [];

  const areaRows = AREAS.map(a => {
    const items = BLUEPRINT[a.id] ? BLUEPRINT[a.id][level] : 0;
    const has = QUESTIONS.some(q => q.area === a.id);
    const n = LESSONS.filter(l => l.area === a.id).length;
    return row(`#/learn/${encodeURIComponent(a.id)}`, ico(a.id), a.name,
      examLine(items, level) + (n ? '' : ' · Lessons coming soon'),
      masteryMeter(has ? areaMastery(state, QUESTIONS, a.id) : 0), items ? '' : 'off');
  });
  const browse = h('div', { class: 'browse' }, ...shelf, h('h2', { class: 'gh' }, 'Areas'), h('div', { class: 'group' }, areaRows));

  const paint = () => {
    const q = input.value.trim();
    lastQuery = input.value;
    search.classList.toggle('has-q', !!input.value);
    browse.hidden = !!q;
    results.replaceChildren();
    if (!q) return;
    const hits = searchLessons(q, LESSONS, piByCode).slice(0, 40);
    if (!hits.length) {
      results.append(h('div', { class: 'empty' }, h('div', { class: 'ico' }, icon('search')),
        h('p', null, `No lessons match “${q}”.`), h('p', { class: 'empty-hint' }, 'Try a key term like “liquidity” or a PI code like FI:062.')));
      return;
    }
    results.append(
      h('h2', { class: 'gh' }, plural(hits.length, 'lesson')),
      h('div', { class: 'group' }, hits.map(({ lesson, pi, term }) => {
        const sub = pi ? `${pi.code} · ${pi.title}` : term ? `Key term: ${term.term}` : `${areaName(lesson.area)} · ${lesson.minutes} min`;
        return lessonRow(lesson, sub);
      })));
  };
  input.addEventListener('input', paint);
  input.addEventListener('keydown', e => { if (e.key === 'Escape' && input.value) { e.stopPropagation(); input.value = ''; paint(); } });
  clear.addEventListener('click', () => { input.value = ''; paint(); input.focus(); });

  el.append(h('h1', { class: 'lt' }, 'Learn'), search, results, browse);
  paint();
}

/* ---------- Area page ---------- */
function renderArea(el, ctx, areaId) {
  const { state, data } = ctx;
  const { AREAS, BLUEPRINT, LESSONS, VIDEOS, QUESTIONS, PIS } = data;
  const area = AREAS.find(a => a.id === areaId);
  const back = h('a', { class: 'back', href: '#/learn' }, icon('back'), h('span', null, 'Learn'));
  if (!area) {
    el.append(back, h('h1', { class: 'lt' }, 'Area not found'),
      h('div', { class: 'empty' }, h('div', { class: 'ico' }, icon('learn')), h('p', null, 'That area doesn’t exist. Pick one from Learn.')));
    return;
  }
  const level = levelOf(state);
  const items = BLUEPRINT[area.id] ? BLUEPRINT[area.id][level] : 0;
  const has = QUESTIONS.some(q => q.area === area.id);
  const answered = has && QUESTIONS.some(q => q.area === area.id && state.answers[q.id]);
  const m = has ? areaMastery(state, QUESTIONS, area.id) : 0;
  const lessons = LESSONS.filter(l => l.area === area.id);
  const videos = VIDEOS.filter(v => v.area === area.id);

  el.append(back, h('h1', { class: 'lt' }, area.name),
    h('p', { class: 'sub' }, examLine(items, level) + (answered ? ` · ${Math.round(m * 100)}% mastered` : '')));

  if (!lessons.length) {
    el.append(h('div', { class: 'empty' }, h('div', { class: 'ico' }, icon(area.id)), h('p', null, 'Lessons for this area are on the way.')));
  } else {
    el.append(h('h2', { class: 'gh' }, plural(lessons.length, 'lesson')), h('div', { class: 'group' }, lessons.map(l => lessonRow(l))));
  }
  if (videos.length) {
    el.append(h('h2', { class: 'gh' }, 'Video lessons'), h('div', { class: 'group' }, videos.map(v =>
      row(`#/watch/${encodeURIComponent(v.id)}`, ico('video'), v.title, `${videoMinutes(v)} min`))));
  }
  const pis = PIS.filter(p => p.area === area.id && QUESTIONS.some(q => q.pi === p.code)).map(p => p.code);
  if (pis.length) {
    el.append(h('a', { class: 'cta', href: quizHref(pis) }, `Practice ${area.name.toLowerCase()}`),
      h('p', { class: 'cta-note' }, '10 questions from across this area'));
  }
}

export function render(el, params, ctx) {
  if (params.area) renderArea(el, ctx, params.area);
  else renderHome(el, ctx);
}
