// Mock exam (#/exam): intro, 100 timed questions with flags and a navigator, then results.
// #/exam?result=<index> shows a past exam from history.
import { h, icon, openSheet, reducedMotion } from '../ui.js';
import { LEVEL_NAME } from './learn.js';
import { KEYS, glyph, haptic, scoreRing, areaResultRows, piChip } from './quiz.js';
import {
  EXAM_MS, levelOf, formatClock, startExam, restoreExam, examProgress, finishExam, noteStudy,
} from '../practice-lib.js';

const LOW_MS = 5 * 60000;
const fmtDate = s => {
  const [y, m, d] = String(s || '').split('-').map(Number);
  if (!y) return '';
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
};

export function render(el, params, ctx) {
  const { state, data } = ctx;
  if (params.result != null) {
    const rec = state.exams[Number(params.result)];
    if (rec) { renderResults(el, ctx, rec); return; }
  }
  if (state.activeExam) {
    const restored = restoreExam(state.activeExam, data.QUESTIONS);
    if (restored) { state.activeExam = restored.exam; ctx.save(); runExam(el, ctx, restored.exam, restored.questions); return; }
    state.activeExam = null; // unusable save (e.g. the question bank changed completely)
    ctx.save();
  }
  renderIntro(el, ctx);
}

/* ---------- Intro ---------- */
function infoRow(iconEl, title, sub) {
  return h('div', { class: 'row' }, h('div', { class: 'ico' }, iconEl), h('div', { class: 't' }, title, h('small', null, sub)));
}

function renderIntro(el, ctx) {
  const level = levelOf(ctx.state);
  const start = () => {
    ctx.state.activeExam = { ...startExam(ctx.data.QUESTIONS, ctx.data.BLUEPRINT, level, Date.now()), event: ctx.data.EVENT.id };
    ctx.save();
    haptic(10);
    el.replaceChildren();
    window.scrollTo(0, 0);
    const r = restoreExam(ctx.state.activeExam, ctx.data.QUESTIONS);
    runExam(el, ctx, r.exam, r.questions);
  };
  el.append(
    h('a', { class: 'back', href: '#/practice' }, icon('back'), h('span', null, 'Practice')),
    h('h1', { class: 'lt' }, 'Mock exam'),
    h('p', { class: 'sub' }, `100 questions on the ${LEVEL_NAME[level]} blueprint`),
    h('div', { class: 'group' },
      infoRow(icon('exam'), '100 questions', `Weighted like the ${LEVEL_NAME[level]} exam. Change your level in Settings.`),
      infoRow(glyph('clock'), '60:00 practice timer', 'It pauses whenever you leave the exam.'),
      infoRow(glyph('flag'), 'Answers at the end', 'Flag questions and jump around with the question grid.')),
    h('button', { class: 'cta', type: 'button', onclick: start }, 'Start mock exam'),
    h('p', { class: 'cta-note' }, 'The official time limit for this exam isn’t confirmed, so this timer is for practice.'));
}

/* ---------- Running exam ---------- */
function runExam(el, ctx, exam, questions) {
  const n = questions.length;
  let remaining = exam.remainingMs;
  let last = performance.now(), lastSave = last;
  let finished = false, timer = 0, navClose = null;

  const persist = () => {
    if (finished) return;
    exam.remainingMs = Math.max(0, Math.round(remaining));
    ctx.state.activeExam = exam;
    ctx.save();
  };

  // Header: leave, timer pill, navigator.
  const clock = h('b', { class: 'num' }, formatClock(remaining));
  const pill = h('div', { class: 'ex-timer', role: 'timer', 'aria-label': 'Practice timer' }, h('span', null, 'Practice timer'), clock);
  const leave = h('a', { class: 'icon-btn', href: '#/practice', 'aria-label': 'Pause and leave the exam' }, icon('close'));
  const navBtn = h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Question grid', onclick: openNavigator }, glyph('grid'));
  const bar = h('i');
  const prog = h('div', { class: 'qz-prog', role: 'progressbar', 'aria-label': 'Questions answered', 'aria-valuemin': '0', 'aria-valuemax': String(n) }, bar);
  const count = h('span', { class: 'qz-count num' });
  const stage = h('div', { class: 'qz-stage' });
  const live = h('p', { class: 'sr-only', 'aria-live': 'polite' });
  el.classList.add('ex');
  el.append(
    h('h1', { class: 'lt sr-only' }, 'Mock exam'),
    h('div', { class: 'ex-top' }, leave, pill, navBtn),
    h('div', { class: 'qz-head ex-head' }, prog, count),
    stage, live);

  const updateProgress = () => {
    const { answered } = examProgress(exam);
    bar.style.width = `${(answered / n) * 100}%`;
    prog.setAttribute('aria-valuenow', String(answered));
  };

  function paintClock() {
    clock.textContent = formatClock(remaining);
    pill.classList.toggle('low', remaining <= LOW_MS);
  }

  function step() {
    if (!el.isConnected) { stop(); return; }
    const now = performance.now();
    if (!document.hidden) remaining -= now - last;
    last = now;
    paintClock();
    if (remaining <= 0) { remaining = 0; submit(true); return; }
    if (now - lastSave > 5000) { lastSave = now; persist(); }
  }
  const onVisibility = () => { last = performance.now(); persist(); };
  const onHash = () => { if (!/^#\/exam(\?|$)/.test(location.hash)) stop(); };

  function stop() {
    if (timer) { clearInterval(timer); timer = 0; }
    if (navClose) navClose();
    persist();
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('hashchange', onHash);
    window.removeEventListener('pagehide', persist);
    document.removeEventListener('keydown', onKey);
  }

  function show(idx, dir = 1) {
    exam.cur = Math.max(0, Math.min(n - 1, idx));
    const q = questions[exam.cur];
    const map = exam.choiceMaps[q.id];
    const area = ctx.data.AREAS.find(a => a.id === q.area);
    count.textContent = `${exam.cur + 1} / ${n}`;
    const flagged = exam.flagged.includes(q.id);

    const buttons = map.map((orig, k) => {
      const sel = exam.responses[q.id] === orig;
      return h('button', {
        class: `choice${sel ? ' sel' : ''}`, type: 'button', 'aria-pressed': sel ? 'true' : 'false',
        onclick: () => pick(q, orig, buttons, k),
      }, h('span', { class: 'k', 'aria-hidden': 'true' }, KEYS[k]), h('span', { class: 'ct' }, h('span', { class: 'sr-only' }, `${KEYS[k]}. `), q.choices[orig]));
    });

    const flagBtn = h('button', {
      class: `ex-flag${flagged ? ' on' : ''}`, type: 'button', 'aria-pressed': flagged ? 'true' : 'false',
      onclick: () => {
        const on = !exam.flagged.includes(q.id);
        exam.flagged = on ? [...exam.flagged, q.id] : exam.flagged.filter(id => id !== q.id);
        flagBtn.classList.toggle('on', on);
        flagBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
        flagBtn.lastChild.textContent = on ? 'Flagged' : 'Flag';
        persist();
        haptic(6);
      },
    }, glyph('flag'), h('span', null, flagged ? 'Flagged' : 'Flag'));
    const isLast = exam.cur === n - 1;
    const prev = h('button', { class: 'ex-nav', type: 'button', disabled: exam.cur === 0, onclick: () => show(exam.cur - 1, -1) }, 'Previous');
    const next = h('button', { class: 'ex-nav primary', type: 'button', onclick: () => (isLast ? openNavigator() : show(exam.cur + 1, 1)) },
      isLast ? 'Review and submit' : 'Next');

    const node = h('div', { class: 'qz-q' },
      area ? h('span', { class: 'qz-area' }, area.name) : null,
      h('h2', { class: 'qz-stem' }, q.stem),
      h('div', { class: 'qz-choices', role: 'group', 'aria-label': 'Answer choices' }, buttons),
      h('div', { class: 'ex-actions' }, prev, flagBtn, next));
    const old = stage.firstElementChild;
    stage.replaceChildren(node);
    if (old && !reducedMotion()) node.classList.add(dir < 0 ? 'qz-in-back' : 'qz-in');
    if (old) window.scrollTo(0, 0);
    persist();
  }

  function pick(q, orig, buttons, k) {
    exam.responses[q.id] = orig;
    buttons.forEach((b, j) => {
      b.classList.toggle('sel', j === k);
      b.setAttribute('aria-pressed', j === k ? 'true' : 'false');
    });
    noteStudy(ctx.state);
    persist();
    haptic(10);
    updateProgress();
    live.textContent = `Answer ${KEYS[k]} saved.`;
  }

  function openNavigator() {
    if (navClose) return;
    const { answered, left, flagged } = examProgress(exam);
    const cells = questions.map((q, i) => {
      const cls = ['ex-cell', q.id in exam.responses ? 'ans' : '', exam.flagged.includes(q.id) ? 'flag' : '', i === exam.cur ? 'cur' : ''].filter(Boolean).join(' ');
      const status = [q.id in exam.responses ? 'answered' : 'unanswered', exam.flagged.includes(q.id) ? 'flagged' : ''].filter(Boolean).join(', ');
      return h('button', { class: cls, type: 'button', 'aria-label': `Question ${i + 1}, ${status}`, onclick: () => { close(); show(i, i < exam.cur ? -1 : 1); } },
        h('span', { class: 'num' }, String(i + 1)));
    });
    const warn = h('p', { class: 'ex-warn', hidden: true });
    const submitBtn = h('button', { class: 'cta', type: 'button' }, 'Submit exam');
    let armed = !left;
    submitBtn.addEventListener('click', () => {
      if (!armed) {
        armed = true;
        warn.textContent = `${left} ${left === 1 ? 'question is' : 'questions are'} unanswered and will count as wrong.`;
        warn.hidden = false;
        submitBtn.textContent = 'Submit anyway';
        return;
      }
      close();
      submit(false);
    });
    const discard = h('button', { class: 'btn-2 danger', type: 'button' }, 'Discard this exam');
    let discardArmed = false;
    discard.addEventListener('click', () => {
      if (!discardArmed) { discardArmed = true; discard.textContent = 'Tap again to discard. This can’t be undone.'; return; }
      finished = true;
      stop();
      ctx.state.activeExam = null;
      ctx.save();
      close();
      ctx.go('#/practice');
    });
    const content = h('div', { class: 'ex-navsheet' },
      h('h2', { class: 'lt' }, 'Questions'),
      h('p', { class: 'sub' }, `${answered} answered · ${left} left · ${flagged} flagged`),
      h('div', { class: 'ex-legend', 'aria-hidden': 'true' },
        h('span', null, h('i', { class: 'ex-cell ans' }), 'Answered'),
        h('span', null, h('i', { class: 'ex-cell' }), 'Unanswered'),
        h('span', null, h('i', { class: 'ex-cell flag' }), 'Flagged')),
      h('div', { class: 'ex-grid' }, cells),
      discard,
      h('div', { class: 'ex-submit' }, warn, submitBtn));
    const closeFn = openSheet(content, { label: 'Question grid', onClose: () => { navClose = null; } });
    function close() { navClose = null; closeFn({ silent: true }); }
    navClose = close;
    setTimeout(() => { const c = content.querySelector('.ex-cell.cur'); if (c) c.focus({ preventScroll: true }); }, 60);
  }

  function submit(timeUp) {
    if (finished) return;
    if (navClose) navClose();
    exam.remainingMs = Math.max(0, Math.round(remaining));
    stop();
    finished = true;
    const rec = finishExam(ctx.state, exam, questions, Date.now());
    noteStudy(ctx.state);
    ctx.save();
    if (!timeUp) haptic(20);
    // Keep the URL pointing at this result so a reload shows it, without re-routing.
    try { history.replaceState(null, '', `#/exam?result=${ctx.state.exams.length - 1}`); } catch (e) { /* ignore */ }
    el.replaceChildren();
    el.classList.remove('ex');
    window.scrollTo(0, 0);
    renderResults(el, ctx, rec, timeUp);
  }

  function onKey(e) {
    if (!el.isConnected) { stop(); return; }
    if (navClose || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    const k = e.key.toLowerCase();
    const idx = 'abcd'.indexOf(k) >= 0 ? 'abcd'.indexOf(k) : '1234'.indexOf(k);
    if (idx >= 0 && idx < 4) {
      const b = stage.querySelectorAll('.choice')[idx];
      if (b) { e.preventDefault(); b.click(); }
    } else if (k === 'arrowright' && exam.cur < n - 1) { e.preventDefault(); show(exam.cur + 1, 1); }
    else if (k === 'arrowleft' && exam.cur > 0) { e.preventDefault(); show(exam.cur - 1, -1); }
    else if (k === 'f') { const f = stage.querySelector('.ex-flag'); if (f) { e.preventDefault(); f.click(); } }
  }

  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('hashchange', onHash);
  window.addEventListener('pagehide', persist);
  document.addEventListener('keydown', onKey);
  timer = setInterval(step, 250);
  paintClock();
  updateProgress();
  show(exam.cur || 0);
}

/* ---------- Results ---------- */
function renderResults(el, ctx, rec, timeUp = false) {
  const { AREAS, BLUEPRINT, QUESTIONS, piByCode } = ctx.data;
  const level = LEVEL_NAME[rec.level] ? rec.level : 'district';
  const pct = Math.round(rec.percent ?? (rec.total ? (rec.score / rec.total) * 100 : 0));
  const meta = [h('div', null, h('b', null, `${rec.score} of ${rec.total}`), 'Correct')];
  if (Number.isFinite(rec.usedMs)) meta.push(h('div', null, h('b', null, formatClock(Math.min(EXAM_MS, rec.usedMs))), 'Time used'));

  const put = (...nodes) => el.append(...nodes.filter(Boolean));
  put(
    h('a', { class: 'back', href: '#/practice' }, icon('back'), h('span', null, 'Practice')),
    h('h1', { class: 'lt' }, 'Mock exam results'),
    h('p', { class: 'sub' }, [fmtDate(rec.date), `${LEVEL_NAME[level]} blueprint`].filter(Boolean).join(' · ')),
    timeUp ? h('p', { class: 'ex-timeup', role: 'status' }, 'Time’s up. Your exam was submitted automatically.') : null,
    h('section', { class: 'ringwrap' }, scoreRing(pct, 'score', `${pct}% on this mock exam`), h('div', { class: 'ringmeta' }, meta)),
    h('h2', { class: 'gh' }, 'Results by area'),
    h('div', { class: 'group' }, areaResultRows(rec.byArea || {}, AREAS, id => {
      const bp = BLUEPRINT[id] ? BLUEPRINT[id][level] : 0;
      return bp ? `blueprint ${bp}` : 'not on the blueprint';
    })));

  // Question review (records saved before ids were stored skip this).
  const byId = new Map(QUESTIONS.map(q => [q.id, q]));
  const qs = (rec.ids || []).map(id => byId.get(id)).filter(Boolean);
  if (qs.length) {
    const responses = rec.responses || {};
    const flagged = new Set(rec.flagged || []);
    const status = q => !(q.id in responses) ? 'skip' : responses[q.id] === q.answer ? 'right' : 'wrong';
    const items = qs.map((q, i) => {
      const st = status(q);
      const label = st === 'right' ? 'Correct' : st === 'wrong' ? 'Incorrect' : 'Unanswered';
      const choices = q.choices.map((c, k) => {
        const cls = k === q.answer ? 'right' : k === responses[q.id] ? 'wrong' : '';
        const tag = k === q.answer ? (k === responses[q.id] ? 'Your answer · correct' : 'Correct answer') : k === responses[q.id] ? 'Your answer' : '';
        return h('li', { class: `ex-rc ${cls}` }, h('span', { class: 'k', 'aria-hidden': 'true' }, KEYS[k]),
          h('span', null, c, tag ? h('small', null, tag) : null));
      });
      return h('details', { class: `ex-rev ${st}`, dataset: { st, flag: flagged.has(q.id) ? '1' : '' } },
        h('summary', null,
          h('span', { class: `ex-dot ${st}`, 'aria-hidden': 'true' }, glyph(st === 'right' ? 'check' : st === 'wrong' ? 'cross' : 'dot')),
          h('span', { class: 'ex-rev-t' }, h('span', { class: 'sr-only' }, `${label}. `), h('b', { class: 'num' }, `${i + 1}.`), ' ', q.stem),
          flagged.has(q.id) ? h('span', { class: 'ex-rev-flag', title: 'Flagged' }, glyph('flag')) : null),
        h('div', { class: 'ex-rev-body' },
          h('ol', { class: 'ex-rcs' }, choices),
          h('p', { class: 'ex-rat' }, q.rationale),
          piChip(q.pi, piByCode)));
    });
    const list = h('div', { class: 'ex-revlist' }, items);
    const counts = { all: qs.length, wrong: qs.filter(q => status(q) !== 'right').length, flag: qs.filter(q => flagged.has(q.id)).length };
    const filter = which => items.forEach(it => {
      it.hidden = which === 'wrong' ? it.dataset.st === 'right' : which === 'flag' ? !it.dataset.flag : false;
    });
    const seg = h('div', { class: 'xp-seg ex-seg', role: 'radiogroup', 'aria-label': 'Show questions' },
      [['all', `All ${counts.all}`], ['wrong', `Missed ${counts.wrong}`], ['flag', `Flagged ${counts.flag}`]].map(([v, t], i) =>
        h('label', null, h('input', { type: 'radio', name: 'ex-filter', value: v, checked: i === 0, onchange: () => filter(v) }), h('span', null, t))));
    put(h('h2', { class: 'gh' }, 'Review every question'), seg, list);
  }

  const resp = rec.responses || {};
  put(
    qs.some(q => q.id in resp && resp[q.id] !== q.answer)
      ? h('a', { class: 'cta', href: '#/quiz?mode=mistakes' }, 'Practice your mistakes') : null,
    h('a', { class: qs.length ? 'btn-2' : 'cta', href: '#/practice' }, 'Done'));
}
