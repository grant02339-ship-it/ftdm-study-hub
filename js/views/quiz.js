// Quiz sheet (#/quiz?…): one question per screen, instant feedback, summary with score ring.
// URL contract: pis=<codes>&n= | area=<ID>&n= | mode=mistakes | mode=quick | ids=<qids>
import { h, icon, box, tick, reducedMotion } from '../ui.js';
import { shuffleChoices } from '../exam.js';
import { recordAnswer } from '../store.js';
import { quizQuestions, noteStudy, ymd } from '../practice-lib.js';
import { markPlanDone } from '../foryou.js';

export const KEYS = 'ABCD';
const SVG_NS = 'http://www.w3.org/2000/svg';

// Haptic tick, only during a real tap or key press (Chrome logs an error for vibrate() otherwise).
export function haptic(ms = 10) {
  try {
    const ua = navigator.userActivation;
    if (ua && !ua.isActive) return; // only right after a real tap or key press
  } catch (e) { /* ignore */ }
  tick(ms);
}

// Small trusted, app-authored glyphs used inside choices.
export function glyph(name) {
  const paths = {
    check: '<path d="M5 12.5l4.2 4.2L19 7"/>',
    cross: '<path d="M7 7l10 10M17 7L7 17"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
    grid: '<rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/>',
    dot: '<circle cx="12" cy="12" r="1"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  };
  const t = document.createElement('template');
  t.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name] || ''}</svg>`;
  return t.content.firstElementChild;
}

// Animated score ring (same drawing as Home's readiness ring).
export function scoreRing(pct, caption, label) {
  const R = 58, C = 2 * Math.PI * R;
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 132 132');
  svg.setAttribute('aria-hidden', 'true');
  const mk = cls => {
    const c = document.createElementNS(SVG_NS, 'circle');
    c.setAttribute('class', cls);
    c.setAttribute('cx', '66'); c.setAttribute('cy', '66'); c.setAttribute('r', String(R));
    c.setAttribute('fill', 'none'); c.setAttribute('stroke-width', '14');
    svg.append(c);
    return c;
  };
  mk('track');
  const fill = mk('fill');
  fill.style.strokeDasharray = String(C);
  const num = h('b', null, `${pct}%`);
  const el = h('div', { class: 'ring', role: 'img', 'aria-label': label || `${pct}%` },
    svg, h('div', { class: 'ring-num' }, h('div', null, num, h('span', null, caption))));
  const target = C * (1 - pct / 100);
  if (pct <= 0) { fill.classList.add('zero'); fill.style.strokeDashoffset = String(C); return el; }
  if (reducedMotion()) { fill.style.strokeDashoffset = String(target); return el; }
  fill.style.strokeDashoffset = String(C);
  num.textContent = '0%';
  requestAnimationFrame(() => setTimeout(() => {
    fill.getBoundingClientRect();
    fill.classList.add('anim');
    fill.style.strokeDashoffset = String(target);
    const start = performance.now();
    (function step(now) {
      const p = Math.min((now - start) / 1400, 1), e = 1 - Math.pow(1 - p, 4);
      num.textContent = `${Math.round(pct * e)}%`;
      if (p < 1 && el.isConnected) requestAnimationFrame(step); else num.textContent = `${pct}%`;
    })(start);
  }, 250));
  return el;
}

export function meter(frac) {
  const pct = Math.round(frac * 100);
  return h('div', { class: 'meter', 'aria-hidden': 'true' },
    h('span', { class: 'num' }, `${pct}%`), h('div', { class: 'bar' }, h('i', { style: `width:${pct}%` })));
}

// Rows of {area: {correct,total}} in AREAS order. extra(areaId) adds to the subtitle.
export function areaResultRows(byArea, AREAS, extra) {
  return AREAS.filter(a => byArea[a.id]).map(a => {
    const { correct, total } = byArea[a.id];
    const more = extra ? extra(a.id) : '';
    return h('div', { class: 'row' },
      h('div', { class: 'ico' }, icon(a.id)),
      h('div', { class: 't' }, a.name, h('small', null, `${correct} of ${total} correct${more ? ' · ' + more : ''}`)),
      meter(total ? correct / total : 0));
  });
}

export function piChip(code, piByCode) {
  const p = piByCode(code);
  return h('span', { class: 'qz-pi', title: p ? p.title : code },
    h('b', { class: 'num' }, code), p ? h('span', null, p.title) : null);
}

function closeSheet(el, ctx) {
  const btn = el.closest('.sheet') && el.closest('.sheet').querySelector('.sheet-close');
  if (btn) btn.click(); else ctx.go('#/practice');
}

function scrollTop(el) {
  const sc = el.closest('.sheet-body');
  if (sc) sc.scrollTop = 0; else window.scrollTo(0, 0);
}

const verdict = pct => pct >= 90 ? 'Outstanding' : pct >= 75 ? 'Nice work' : pct >= 50 ? 'Getting there' : 'Keep practicing';

export function render(el, params, ctx) {
  const { title, questions } = quizQuestions(params, ctx.state, ctx.data);
  if (!questions.length) {
    const msg = params.mode === 'mistakes' ? 'No mistakes to review. Every question you’ve missed has since been answered correctly.'
      : 'There are no questions for this yet.';
    el.append(h('h1', { class: 'lt' }, title),
      h('div', { class: 'empty' }, h('div', { class: 'ico' }, icon('practice')), h('p', null, msg),
        h('p', null, h('a', { class: 'link', href: '#/practice' }, 'Go to Practice'))));
    return;
  }
  runQuiz(el, questions, title, ctx, params.plan === 'drill' ? 'drill' : null);
}

function runQuiz(el, questions, title, ctx, planTask = null) {
  const { AREAS, piByCode } = ctx.data;
  const n = questions.length;
  const results = [];
  let i = 0, current = null;

  const bar = h('i');
  const prog = h('div', { class: 'qz-prog', role: 'progressbar', 'aria-label': 'Quiz progress', 'aria-valuemin': '0', 'aria-valuemax': String(n), 'aria-valuenow': '0' }, bar);
  const count = h('span', { class: 'qz-count num' });
  const head = h('div', { class: 'qz-head' }, prog, count);
  const stage = h('div', { class: 'qz-stage' });
  const live = h('p', { class: 'sr-only', 'aria-live': 'polite' });
  el.classList.add('qz');
  el.replaceChildren(h('h1', { class: 'sr-only' }, title), head, stage, live);

  const setProgress = done => {
    bar.style.width = `${(done / n) * 100}%`;
    prog.setAttribute('aria-valuenow', String(done));
  };

  function swap(node) {
    const old = stage.firstElementChild;
    const put = () => { stage.replaceChildren(node); scrollTop(el); node.classList.add('qz-in'); };
    if (!old || reducedMotion()) { put(); return; }
    old.classList.add('qz-out');
    setTimeout(put, 160);
  }

  function showQuestion() {
    const q = questions[i];
    const { q: shown, map } = shuffleChoices(q);
    const area = AREAS.find(a => a.id === q.area);
    count.textContent = `${i + 1} / ${n}`;
    let answered = false;

    const buttons = shown.choices.map((text, k) => h('button', {
      class: 'choice', type: 'button', onclick: () => choose(k),
    }, h('span', { class: 'k', 'aria-hidden': 'true' }, KEYS[k]), h('span', { class: 'ct' }, h('span', { class: 'sr-only' }, `${KEYS[k]}. `), text)));
    const verdictEl = h('b', { class: 'qz-verdict' });
    const why = h('div', { class: 'qz-why', 'aria-hidden': 'true' },
      h('div', { class: 'qz-why-in' }, h('div', { class: 'qz-why-card' }, verdictEl, h('p', null, q.rationale), piChip(q.pi, piByCode))));
    const isLast = i === n - 1;
    const next = h('button', { class: 'cta qz-next', type: 'button', hidden: true, onclick: advance }, isLast ? 'See results' : 'Next question');
    const hint = h('p', { class: 'qz-hint' }, 'Tap an answer');

    function choose(k) {
      if (answered) return;
      answered = true;
      const correct = k === shown.answer;
      recordAnswer(ctx.state, q, correct, Date.now());
      noteStudy(ctx.state);
      ctx.save();
      ctx.syncScore();
      haptic(10);
      results.push({ q, correct, chosen: map[k] });
      buttons.forEach((b, j) => {
        b.setAttribute('aria-disabled', 'true');
        const state = j === shown.answer ? 'right' : j === k ? 'wrong' : 'dim';
        b.classList.add(state);
        if (state === 'right') b.querySelector('.k').replaceChildren(glyph('check'));
        if (state === 'wrong') b.querySelector('.k').replaceChildren(glyph('cross'));
      });
      verdictEl.textContent = correct ? 'Correct' : `Not quite. ${KEYS[shown.answer]} is correct.`;
      verdictEl.classList.add(correct ? 'good' : 'bad');
      why.classList.add('open');
      why.setAttribute('aria-hidden', 'false');
      hint.hidden = true;
      next.hidden = false;
      setProgress(i + 1);
      live.textContent = correct ? 'Correct.' : `Not quite. The answer is ${KEYS[shown.answer]}: ${shown.choices[shown.answer]}`;
      // Let the rationale open, then bring the button into view and give it focus.
      setTimeout(() => {
        if (!next.isConnected) return;
        next.focus({ preventScroll: true });
        next.scrollIntoView({ block: 'nearest', behavior: reducedMotion() ? 'auto' : 'smooth' });
      }, 320);
    }

    current = { choose, answered: () => answered, advance };
    swap(h('div', { class: 'qz-q' },
      h('div', { class: 'box qz-qbox' },
        area ? h('div', { class: 'qz-qtop' }, h('span', { class: 'qz-area' }, area.name)) : null,
        h('h2', { class: 'qz-stem' }, q.stem)),
      h('div', { class: 'qz-choices', role: 'group', 'aria-label': 'Answer choices' }, buttons),
      why, hint, next));
  }

  function advance() {
    i++;
    if (i >= n) showSummary(); else showQuestion();
  }

  function showSummary() {
    current = null;
    const right = results.filter(r => r.correct).length;
    const pct = Math.round((right / n) * 100);
    const byArea = {};
    for (const r of results) {
      const s = byArea[r.q.area] || (byArea[r.q.area] = { correct: 0, total: 0 });
      s.total++; if (r.correct) s.correct++;
    }
    const missed = results.filter(r => !r.correct).map(r => r.q);
    // A drill started from Today's plan checks off its task when it's finished.
    if (planTask && markPlanDone(ctx.state, ymd(new Date()), planTask)) ctx.save();
    head.classList.add('done');
    count.textContent = `${n} / ${n}`;
    live.textContent = `Quiz complete. ${right} of ${n} correct.`;
    const summary = h('div', { class: 'qz-sum' },
      h('section', { class: 'ringwrap qz-ringwrap' },
        scoreRing(pct, 'score', `${pct}% score`),
        h('div', { class: 'ringmeta' },
          h('div', null, h('b', null, verdict(pct)), `${right} of ${n} correct`),
          h('div', null, h('b', null, String(missed.length)), missed.length === 1 ? 'Mistake' : 'Mistakes'))),
      box('Results by area', `${right} of ${n}`, h('div', { class: 'group' }, areaResultRows(byArea, AREAS))),
      missed.length
        ? h('button', { class: 'cta', type: 'button', onclick: () => runQuiz(el, missed, 'Review mistakes', ctx) },
          `Review ${missed.length === 1 ? 'mistake' : 'mistakes'}`)
        : null,
      h('button', { class: missed.length ? 'btn-2' : 'cta', type: 'button', onclick: () => closeSheet(el, ctx) }, 'Done'),
      missed.length ? h('p', { class: 'cta-note' }, 'Try the ones you missed again while they’re fresh.') : null);
    swap(summary);
    setTimeout(() => { const b = summary.querySelector('button'); if (b && b.isConnected) b.focus({ preventScroll: true }); }, 400);
  }

  function onKey(e) {
    if (!el.isConnected) { document.removeEventListener('keydown', onKey); return; }
    if (!current || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    const k = e.key.toLowerCase();
    const idx = 'abcd'.indexOf(k) >= 0 ? 'abcd'.indexOf(k) : '1234'.indexOf(k);
    if (idx >= 0 && idx < 4 && !current.answered()) { e.preventDefault(); current.choose(idx); return; }
    const onButton = document.activeElement && document.activeElement.tagName === 'BUTTON';
    if (current.answered() && (k === 'arrowright' || (k === 'enter' && !onButton))) { e.preventDefault(); current.advance(); }
  }
  if (el._qzKey) document.removeEventListener('keydown', el._qzKey); // a "Review mistakes" round replaces the last one
  el._qzKey = onKey;
  document.addEventListener('keydown', onKey);

  setProgress(0);
  showQuestion();
}
