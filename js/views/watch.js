// Video lessons as a vertical reels feed (#/watch/:id, opened in a sheet).
// Swipe (or wheel / arrow keys) between videos; tap thirds to step scenes; hold to pause.
// Every frame is a pure function of (scene index, seconds into the scene): no CSS animation runs on
// its own clock inside the stage, so scrubbing lands on exactly the frame playback would show.
import { h, icon, reducedMotion } from '../ui.js';
import { quizHref } from './learn.js';
import { markWatched, notePlanProgress } from '../foryou.js';
import { ymd } from '../practice-lib.js';
import {
  timeline, sceneAt, canNarrate, pickVoice, captionChunks, chunkAtChar, TTS_RATE,
  wordSpans, wordTimes, wordIndexAt, wordIndexAtChar, feedOrder, tapZone,
  seg, spring, easeOutCubic, REEL_SPEEDS, snapSpeed,
} from '../player-timeline.js';
import { RM, setReducedMotion, EXIT, ensureStyles, s, sceneLabel, buildScene } from '../reel-scenes.js';

const HOLD_MS = 240;        // press longer than this to pause while holding
const AUTO_NEXT_MS = 2200;  // end card time before the next reel
// A tenth of a second of silence (8 kHz, 8-bit mono WAV) used to unlock the audio element on a tap.
const SILENT_WAV = (() => {
  const n = 800, b = new Uint8Array(44 + n);
  const str = (o, x) => { for (let i = 0; i < x.length; i++) b[o + i] = x.charCodeAt(i); };
  const u32 = (o, v) => { b[o] = v & 255; b[o + 1] = (v >> 8) & 255; b[o + 2] = (v >> 16) & 255; b[o + 3] = (v >>> 24) & 255; };
  str(0, 'RIFF'); u32(4, 36 + n); str(8, 'WAVEfmt '); u32(16, 16); b[20] = 1; b[22] = 1;
  u32(24, 8000); u32(28, 8000); b[32] = 1; b[34] = 8; str(36, 'data'); u32(40, n);
  b.fill(128, 44);
  let bin = ''; for (const x of b) bin += String.fromCharCode(x);
  return 'data:audio/wav;base64,' + btoa(bin);
})();



const GLYPHS = {
  play: '<path d="M8 5.6v12.8a1.2 1.2 0 001.8 1l10.4-6.4a1.2 1.2 0 000-2L9.8 4.6A1.2 1.2 0 008 5.6z" fill="currentColor"/>',
  pause: '<rect x="6" y="5" width="4.2" height="14" rx="1.4" fill="currentColor"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.4" fill="currentColor"/>',
  back: '<path d="M11 4.5A8 8 0 1 1 4 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M11 1.5v6l-4-3z" fill="currentColor"/><text x="12.4" y="15.6" text-anchor="middle" font-size="7.4" font-weight="700" fill="currentColor" font-family="ui-rounded, system-ui">10</text>',
  fwd: '<path d="M13 4.5A8 8 0 1 0 20 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M13 1.5v6l4-3z" fill="currentColor"/><text x="11.6" y="15.6" text-anchor="middle" font-size="7.4" font-weight="700" fill="currentColor" font-family="ui-rounded, system-ui">10</text>',
  cc: '<rect x="2.5" y="5" width="19" height="14" rx="3.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10.5 10.2a2.2 2.2 0 1 0 0 3.6M17 10.2a2.2 2.2 0 1 0 0 3.6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  voice: '<path d="M4 9.5v5h3.2l4.8 4V5.5l-4.8 4z" fill="currentColor"/><path d="M15.5 9a4 4 0 010 6M18 6.5a7.5 7.5 0 010 11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  replay: '<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M5 2.8v4.6h4.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  more: '<circle cx="6" cy="12" r="1.9" fill="currentColor"/><circle cx="12" cy="12" r="1.9" fill="currentColor"/><circle cx="18" cy="12" r="1.9" fill="currentColor"/>',
  mute: '<path d="M4 9.5v5h3.2l4.8 4V5.5l-4.8 4z" fill="currentColor"/><path d="M16 9.5l5 5M21 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  up: '<path d="M6 14.5l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  down: '<path d="M6 9.5l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  practice: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M8 12.2l2.8 2.8L16.2 9.4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
};
// Recorded narration plays faster without turning chipmunk: pitch is preserved, and the default rate
// is set too because loading a new src resets playbackRate to it.
function tuneAudio(a, speed) {
  try {
    a.defaultPlaybackRate = speed;
    a.playbackRate = speed;
    a.preservesPitch = true;
    a.webkitPreservesPitch = true;
    a.mozPreservesPitch = true;
  } catch (e) { /* ignore */ }
}

function glyph(name) {
  const t = document.createElement('template');
  t.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${GLYPHS[name]}</svg>`;
  return t.content.firstElementChild;
}



/* ---------- View ---------- */

function closeSheetFrom(el) {
  const btn = el.closest('.sheet') && el.closest('.sheet').querySelector('.sheet-close');
  if (btn) btn.click(); else history.back();
}

export async function render(el, params = {}, ctx = {}) {
  await ensureStyles();
  const data = ctx.data || {};
  const playable = (data.VIDEOS || []).filter(v => v && Array.isArray(v.scenes) && v.scenes.length);
  const { list, index } = feedOrder(playable, params.id);
  if (index < 0) {
    const closeBtn = h('button', { class: 'vp-btn-primary', type: 'button', onclick: () => closeSheetFrom(closeBtn) }, 'Close');
    el.append(
      h('h1', { class: 'lt' }, 'Video lesson'),
      h('div', { class: 'empty vp-missing' },
        h('div', { class: 'ico' }, icon('video')),
        h('p', null, "We couldn't find that video. It may have moved."),
        h('div', { class: 'vp-missing-actions' }, closeBtn, h('a', { class: 'vp-btn-quiet', href: '#/learn' }, 'Browse lessons'))),
    );
    return;
  }
  mountFeed(el, list, index, ctx);
}

/* ---------- One reel: a single video's stage, clock, narration and captions ---------- */

function createReel(video, shared) {
  const data = shared.data;
  const lesson = (data.LESSONS || []).find(l => l.id === video.lesson);
  const area = (data.AREAS || []).find(a => a.id === video.area);
  const env = { areaName: area ? area.name : video.area };
  const scenes = video.scenes;
  const tl = timeline(scenes);
  const words = scenes.map(sc => wordSpans(sc.caption || ''));
  const wtimes = scenes.map((sc, i) => wordTimes(words[i], 0.15, Math.max(0.6, tl.durs[i] - EXIT - 0.35)));
  const chunks = scenes.map(sc => captionChunks(sc.caption || '', 46));
  const practiceHref = lesson && lesson.pis && lesson.pis.length ? quizHref(lesson.pis) : '#/practice';

  let t = 0, playing = false, ended = false, started = false, destroyed = false;
  let curIdx = -1, cur = null, layoutKey = '', last = 0, raf = 0;
  let sp = { index: -1, done: true, tok: 0 }, speechTok = 0, media = null;
  let capKey = null, capWordEls = [], capChunk = -1;
  const reel = { video, el: null, onEnd: null, onState: null };

  /* DOM */
  const layer = h('div', { class: 'vp-layer' });
  const segFills = scenes.map(() => h('i'));
  const segs = h('div', { class: 'rf-segs' }, scenes.map((sc, i) => h('button', {
    class: 'rf-seg', type: 'button', tabindex: '-1', 'aria-label': `Scene ${i + 1}: ${sceneLabel(sc)}`,
    onclick: e => { e.stopPropagation(); jumpTo(i, true); },
  }, h('span', null, segFills[i]))));
  const head = h('div', { class: 'rf-head' },
    h('span', { class: 'rf-chip' }, env.areaName),
    h('div', { class: 'rf-title' }, video.title));
  const capLine = h('div', { class: 'rf-cap-in' });
  const caption = h('div', { class: 'rf-cap', 'aria-hidden': 'true' }, capLine);
  const pauseMark = h('div', { class: 'rf-pausemark', 'aria-hidden': 'true' }, glyph('play'));
  const nextName = h('span', null, '');
  const ring = s('svg', { class: 'rf-ring', viewBox: '0 0 36 36', 'aria-hidden': 'true' },
    s('circle', { cx: 18, cy: 18, r: 16, class: 'bg' }), s('circle', { cx: 18, cy: 18, r: 16, class: 'fg', pathLength: 1 }));
  const upNext = h('div', { class: 'rf-upnext' }, ring, h('span', { class: 'rf-upnext-t' }, 'Up next', h('br'), nextName));
  const replayBtn = h('button', { class: 'vp-btn-quiet', type: 'button' }, glyph('replay'), 'Replay');
  const endCard = h('div', { class: 'vp-end', 'aria-hidden': 'true' },
    h('div', { class: 'vp-end-in' },
      h('div', { class: 'vp-end-k' }, 'Lesson complete'),
      h('div', { class: 'vp-end-t' }, video.title),
      h('div', { class: 'vp-end-a' },
        h('a', { class: 'vp-btn-primary', href: practiceHref }, glyph('practice'), 'Practice this topic'),
        replayBtn),
      upNext));
  endCard.inert = true;
  const stage = h('div', { class: 'vp-stage rf-stage', 'data-state': 'idle' },
    h('div', { class: 'vp-glow', 'aria-hidden': 'true' }), layer, caption, pauseMark,
    h('div', { class: 'rf-top' }, segs, head), endCard);
  reel.el = stage;
  stage.reel = reel; // handy for debugging from the console: $('.rf-stage').reel.seek(12)

  /* Narration: pre-recorded audio when the scene has it, otherwise speech synthesis.
     All reels share one <audio> element (shared.player), so once a tap unlocks it on iOS every
     later clip can play; a second element (shared.preloader) only warms the next clip. */
  const canSpeak = i => !!(shared.narrateOn && (scenes[i].audio || (shared.synth && shared.voice)));
  const clipUrl = i => new URL(scenes[i].audio, document.baseURI).href;
  function stopSpeech() {
    speechTok++;
    sp = { index: -1, done: true, tok: speechTok };
    if (media) {
      if (shared.audioOwner === reel) { try { media.pause(); } catch (e) { /* ignore */ } shared.audioOwner = null; }
      media = null;
    }
    if (shared.owner === reel) {
      shared.owner = null;
      try { if (shared.synth && (shared.synth.speaking || shared.synth.pending)) shared.synth.cancel(); } catch (e) { /* ignore */ }
    }
  }
  function speak(i) {
    stopSpeech();
    if (!canSpeak(i)) return;
    const text = scenes[i].caption || '';
    const tok = ++speechTok;
    const n = Math.max(1, words[i].length);
    sp = { index: i, done: false, tok, t0: performance.now(), ch: -1, maxMs: (n / 2.2 / shared.speed + 5) * 1000, audio: !!scenes[i].audio, len: text.length, started: false };
    const finish = () => { if (sp.tok === tok) sp.done = true; };
    const heard = () => { if (sp.tok === tok) sp.started = true; shared.unlocked = true; shared.setBlocked(false); };
    const blocked = () => { if (sp.tok === tok) { sp.done = true; shared.setBlocked(true); } };
    if (scenes[i].audio) {
      try {
        const a = shared.player;
        const url = clipUrl(i);
        if (a.src !== url) a.src = url;
        else a.currentTime = 0;
        tuneAudio(a, shared.speed);
        a.onended = finish;
        a.onerror = finish;
        a.onplaying = () => { tuneAudio(a, shared.speed); heard(); };
        const setMax = () => { tuneAudio(a, shared.speed); if (sp.tok === tok && isFinite(a.duration)) sp.maxMs = (a.duration / shared.speed) * 1000 + 2500; };
        a.onloadedmetadata = setMax;
        if (a.readyState >= 1) setMax();
        media = a; sp.src = url;
        shared.audioOwner = reel;
        const p = a.play();
        if (p && p.catch) p.catch(err => { if (err && err.name === 'NotAllowedError') blocked(); else finish(); });
        // Warm the next clip: the next scene's, or (on the last scene) the next reel's first, so an auto-advance starts promptly.
        if (i + 1 < scenes.length && scenes[i + 1].audio) shared.preload(clipUrl(i + 1));
        else if (i + 1 >= scenes.length && shared.nextClip) shared.preload(shared.nextClip);
      } catch (e) { finish(); }
      return;
    }
    if (!text.trim()) { finish(); return; }
    try {
      const u = new window.SpeechSynthesisUtterance(text);
      u.voice = shared.voice; u.lang = shared.voice.lang; u.rate = Math.min(2, TTS_RATE * shared.speed);
      u.onstart = heard;
      u.onend = finish;
      u.onerror = e => { if (e && e.error === 'not-allowed') blocked(); else finish(); };
      u.onboundary = e => { if (sp.tok === tok && typeof e.charIndex === 'number') sp.ch = e.charIndex; };
      sp.utter = u; // keep a reference: some engines drop events for collected utterances
      shared.owner = reel;
      shared.synth.speak(u);
    } catch (e) { finish(); }
  }
  // Pausing a recorded clip keeps its place so resuming continues mid-sentence.
  function holdSpeech() {
    if (media && sp.audio && !sp.done && shared.audioOwner === reel) { try { media.pause(); } catch (e) { /* ignore */ } sp.paused = true; return; }
    stopSpeech();
  }
  function resumeSpeech(i) {
    if (media && sp.audio && sp.paused && sp.index === i && !sp.done && shared.narrateOn
      && shared.audioOwner === reel && media.src === sp.src) {
      sp.paused = false;
      sp.t0 = performance.now() - (media.currentTime / shared.speed) * 1000;
      tuneAudio(media, shared.speed);
      const p = media.play();
      if (p && p.catch) p.catch(err => { sp.done = true; if (err && err.name === 'NotAllowedError') shared.setBlocked(true); });
      return;
    }
    speak(i);
  }
  // Character the narrator has reached in the current scene, or -1 if unknown.
  function narratedChar(i) {
    if (sp.index !== i || sp.done) return sp.index === i && sp.done && sp.ch >= 0 ? Infinity : -1;
    if (sp.audio && media && media.src === sp.src && media.duration > 0) return (media.currentTime / media.duration) * sp.len;
    return sp.ch;
  }

  /* Rendering */
  function mountScene(i) {
    curIdx = i;
    cur = buildScene(scenes[i], tl.durs[i], env);
    layer.replaceChildren(cur.el);
    layoutKey = '';
    capKey = null;
  }
  function ensureLayout() {
    if (!cur || !cur.layout) return;
    const b = cur.box || cur.el;
    const w = b.clientWidth, hh = b.clientHeight;
    const key = `${w}x${hh}`;
    if (key !== layoutKey && w > 0 && hh > 0) { layoutKey = key; cur.layout(w, hh); }
  }

  function drawCaption(i, local, idle) {
    const ws = words[i];
    if (idle || !shared.captionsOn || !ws.length || t >= tl.total) {
      if (capKey !== '') { capKey = ''; caption.classList.remove('on'); }
      return;
    }
    const ch = narratedChar(i);
    let wi = ch >= 0 ? (ch === Infinity ? ws.length - 1 : wordIndexAtChar(ws, ch)) : wordIndexAt(wtimes[i], local);
    // Never run behind the clock-based estimate once the narration has finished.
    if (sp.index === i && sp.done) wi = Math.max(wi, wordIndexAt(wtimes[i], local));
    const ci = Math.max(0, chunkAtChar(chunks[i], wi >= 0 ? ws[wi].start : 0));
    const key = `${i}:${ci}`;
    if (key !== capKey) {
      capKey = key;
      capChunk = ci;
      const c = chunks[i][ci];
      capWordEls = [];
      const spans = [];
      ws.forEach((w, k) => {
        if (w.start < c.start || w.start >= c.end) return;
        const el = h('span', { class: 'w' }, w.text);
        el.dataset.k = k;
        capWordEls.push(el);
        spans.push(el, ' ');
      });
      capLine.replaceChildren(...spans);
      caption.classList.add('on');
    }
    for (const el of capWordEls) {
      const k = +el.dataset.k;
      const state = k < wi ? 'said' : k === wi ? 'now' : 'todo';
      if (el.dataset.s !== state) { el.dataset.s = state; el.className = 'w ' + state; }
    }
  }

  function draw() {
    if (destroyed) return;
    const idle = !started && t === 0 && !playing;
    const at = sceneAt(tl, t);
    if (at.index !== curIdx) mountScene(at.index);
    ensureLayout();
    // Before first play the stage shows the title fully revealed, like a poster frame.
    const local = idle ? Math.min(tl.durs[0] - EXIT - 0.01, 2.6) : at.local;
    cur.update(local);
    const dur = tl.durs[at.index];
    const ex = seg(local, dur - EXIT, EXIT);
    layer.style.opacity = String(1 - (RM ? ex : easeOutCubic(ex)));
    layer.style.transform = RM || ex <= 0 ? '' : `translate3d(0,${(-0.5 * spring(ex)).toFixed(3)}em,0) scale(${(1 - 0.02 * ex).toFixed(4)})`;
    if (!RM) stage.style.setProperty('--gx', `${(20 + 60 * (t / tl.total)).toFixed(2)}%`);
    segFills.forEach((f, i) => {
      const v = i < at.index ? 1 : i > at.index ? 0 : idle ? 0 : at.progress;
      f.style.transform = `scaleX(${v.toFixed(4)})`;
    });
    drawCaption(at.index, local, idle);
    const showEnd = t >= tl.total;
    if (endCard.classList.contains('on') !== showEnd) {
      endCard.classList.toggle('on', showEnd);
      endCard.setAttribute('aria-hidden', String(!showEnd));
      endCard.inert = !showEnd;
    }
  }

  function frame(now) {
    raf = 0;
    if (destroyed) return;
    // Real elapsed time keeps playback on schedule when frames are throttled; the cap only
    // guards against a long stall (hiding the page pauses playback anyway).
    const dt = Math.min(0.5, Math.max(0, (now - last) / 1000));
    last = now;
    if (playing) advance(dt, now);
    draw();
    if (playing) raf = requestAnimationFrame(frame);
  }
  function kick() { if (!raf && !destroyed) { last = performance.now(); raf = requestAnimationFrame(frame); } }

  function advance(dt, now) {
    let nt = t + dt * shared.speed;
    const ci = sceneAt(tl, t).index;
    if (sp.index === ci && !sp.done) {
      const elapsed = now - sp.t0;
      let busy = true;
      if (!sp.audio) { try { busy = shared.synth.speaking || shared.synth.pending; } catch (e) { /* ignore */ } }
      if (elapsed > sp.maxMs) sp.done = true;
      else if (elapsed > 1500 && !busy) {
        sp.done = true;
        if (!sp.started) shared.setBlocked(true); // the engine never began: speech needs a tap here
      }
      else {
        // Narration still going: hold the scene at its settled frame until the sentence ends.
        const hold = tl.starts[ci] + tl.durs[ci] - EXIT;
        if (nt > hold) nt = Math.max(t, hold);
      }
    }
    t = Math.min(nt, tl.total);
    // Watching 80% of a reel counts as finishing it (For you and Today's plan stop suggesting it).
    if (!reel.counted && t >= tl.total * 0.8) { reel.counted = true; if (shared.onWatched) shared.onWatched(video.id); }
    const ni = sceneAt(tl, t).index;
    if (ni !== ci && t < tl.total) speak(ni);
    if (t >= tl.total) {
      playing = false; ended = true; stopSpeech(); sync();
      if (reel.onEnd) reel.onEnd(reel);
    }
  }

  function sync() {
    stage.dataset.state = playing ? 'playing' : ended ? 'ended' : started ? 'paused' : 'idle';
    if (reel.onState) reel.onState(reel);
  }

  /* Transport */
  function play() {
    if (destroyed) return;
    if (ended || t >= tl.total) { t = 0; ended = false; }
    started = true; playing = true;
    resumeSpeech(sceneAt(tl, t).index);
    sync(); kick();
  }
  function pause() {
    if (!playing) return;
    playing = false;
    holdSpeech();
    sync(); draw();
  }
  function seek(nt, keepPlaying = playing) {
    t = Math.min(Math.max(0, nt), tl.total);
    started = true;
    ended = t >= tl.total;
    if (ended) {
      const was = playing;
      playing = false; stopSpeech(); sync(); draw();
      if (was || keepPlaying) { if (reel.onEnd) reel.onEnd(reel); }
      return;
    }
    playing = keepPlaying;
    if (playing) { speak(sceneAt(tl, t).index); kick(); } else stopSpeech();
    sync(); draw();
  }
  function jumpTo(i, andPlay) { seek(i >= scenes.length ? tl.total : tl.starts[Math.max(0, i)], andPlay || playing); }

  // Live getters (Object.assign would copy their values once, not the getters).
  Object.defineProperties(reel, {
    playing: { get: () => playing },
    ended: { get: () => ended },
    started: { get: () => started },
  });
  Object.assign(reel, {
    tl,
    play, pause, seek,
    toggle() { if (playing) pause(); else play(); },
    replay() { t = 0; ended = false; play(); },
    nextScene() { jumpTo(sceneAt(tl, t).index + 1, true); },
    prevScene() {
      const at = sceneAt(tl, Math.min(t, tl.total - 1e-6));
      jumpTo(at.local > 1.2 || at.index === 0 ? at.index : at.index - 1, true);
    },
    // Called inside a user gesture after narration was blocked: start this scene's line again.
    retryNarration() { if (playing) speak(sceneAt(tl, t).index); },
    narrationChanged() {
      // A speed change on a recorded clip just retunes it; anything else restarts the scene's line.
      if (playing && shared.narrateOn && media && sp.audio && !sp.done && sp.index === sceneAt(tl, t).index) { tuneAudio(media, shared.speed); return; }
      if (playing) speak(sceneAt(tl, t).index); else stopSpeech();
    },
    captionsChanged() { capKey = null; draw(); },
    setUpNext(title) { nextName.textContent = title || ''; upNext.hidden = !title; },
    armUpNext(on) { stage.classList.toggle('counting', !!on); },
    relayout() { layoutKey = ''; draw(); },
    draw,
    destroy() {
      if (destroyed) return;
      playing = false; stopSpeech(); destroyed = true;
      if (raf) cancelAnimationFrame(raf);
    },
  });
  replayBtn.addEventListener('click', e => { e.stopPropagation(); reel.armUpNext(false); if (shared.cancelAuto) shared.cancelAuto(); reel.replay(); });
  upNext.hidden = true;
  draw();
  return reel;
}

/* ---------- The feed: slots, gestures, chrome, lifecycle ---------- */

function mountFeed(el, list, startIndex, ctx) {
  setReducedMotion(reducedMotion());
  const synth = canNarrate(window) ? window.speechSynthesis : null;
  const settings = (ctx.state && ctx.state.settings) || {};
  const persist = (key, val) => { settings[key] = val; try { if (ctx.save) ctx.save(); } catch (e) { /* ignore */ } };
  const shared = {
    data: ctx.data || {}, synth, voice: null, owner: null, speed: snapSpeed(settings.reelSpeed), captionsOn: true,
    narrateOn: settings.narrate !== false,
    cancelAuto: null, audioOwner: null, blocked: false, unlocked: false, nextClip: '',
    player: new Audio(), preloader: new Audio(),
    setBlocked: () => {},
    onWatched(id) {
      if (!ctx.state || !ctx.state.answers || !markWatched(ctx.state, id)) return;
      notePlanProgress(ctx.state, ymd(new Date()));
      try { if (ctx.save) ctx.save(); } catch (e) { /* ignore */ }
    },
    preload(url) { if (this.preloader.src !== url) { this.preloader.src = url; try { this.preloader.load(); } catch (e) { /* ignore */ } } },
  };
  shared.player.preload = 'auto';
  tuneAudio(shared.player, shared.speed);
  tuneAudio(shared.preloader, 1);
  shared.preloader.preload = 'auto';
  shared.preloader.muted = true;
  const anyAudio = list.some(v => v.scenes.some(sc => sc.audio));
  let index = startIndex;
  let reel = null, prevPoster = null, nextPoster = null;
  let animating = false, destroyed = false, autoTimer = 0;

  /* DOM */
  const track = h('div', { class: 'rf-track' });
  const viewport = h('div', { class: 'rf-viewport', tabindex: '-1' }, track);
  const muteBtn = h('button', { class: 'rf-ib', type: 'button', 'aria-label': 'Narration', 'aria-pressed': String(shared.narrateOn) }, glyph('voice'));
  const ccBtn = h('button', { class: 'rf-ib', type: 'button', 'aria-label': 'Captions', 'aria-pressed': 'true' }, glyph('cc'));
  const moreBtn = h('button', { class: 'rf-ib', type: 'button', 'aria-label': 'More options', 'aria-expanded': 'false' }, glyph('more'));
  const speedBtns = REEL_SPEEDS.map(v => h('button', { class: 'rf-sp num', type: 'button', 'aria-pressed': String(v === shared.speed) }, `${v}×`));
  const menu = h('div', { class: 'rf-menu', hidden: true, role: 'group', 'aria-label': 'Playback speed' },
    h('div', { class: 'rf-menu-h' }, 'Playback speed'), h('div', { class: 'rf-menu-row' }, speedBtns));
  const rail = h('div', { class: 'rf-rail' }, muteBtn, ccBtn, moreBtn, menu);
  const upBtn = h('button', { class: 'rf-nav', type: 'button', 'aria-label': 'Previous video' }, glyph('up'));
  const downBtn = h('button', { class: 'rf-nav', type: 'button', 'aria-label': 'Next video' }, glyph('down'));
  const live = h('div', { class: 'sr-only', 'aria-live': 'polite' });
  const soundPill = h('button', { class: 'rf-sound', type: 'button', hidden: true }, glyph('voice'), 'Tap for sound');
  const frameEl = h('div', { class: 'rf-frame' }, viewport, rail, soundPill);
  const root = h('div', { class: 'rf' }, frameEl, h('div', { class: 'rf-side' }, upBtn, downBtn), live);
  el.append(root);

  /* Sound unlock: browsers (iOS above all) only start audio or speech from a user gesture. The
     reel autoplays, so if narration was refused we show "Tap for sound"; the next tap or key unlocks
     the shared audio element and speech synthesis and restarts the current line, without also
     counting as a pause tap. */
  let unlockedThisGesture = false;
  shared.setBlocked = on => {
    if (shared.blocked === on) return;
    shared.blocked = on;
    // Once sound has played, a later refusal re-arms silently: the next tap re-unlocks, no pill.
    soundPill.hidden = !on || !shared.narrateOn || shared.unlocked;
  };
  function unlockSound() {
    if (!shared.blocked || !shared.narrateOn || destroyed) return false;
    const a = shared.player;
    try {
      a.src = SILENT_WAV;
      const p = a.play();
      if (p && p.catch) p.catch(() => {});
    } catch (e) { /* ignore */ }
    if (synth) {
      try { const u = new window.SpeechSynthesisUtterance(' '); u.volume = 0; synth.speak(u); } catch (e) { /* ignore */ }
    }
    shared.unlocked = true;
    shared.setBlocked(false);
    if (reel) reel.retryNarration(); // same gesture, so the real clip or utterance may start now
    return true;
  }
  root.addEventListener('pointerdown', () => {
    unlockedThisGesture = unlockSound();
    setTimeout(() => { unlockedThisGesture = false; }, 0); // only for this one press
  }, true);
  soundPill.addEventListener('click', e => { e.stopPropagation(); unlockSound(); });

  /* Voices */
  function refreshVoices() {
    if (synth) { try { shared.voice = pickVoice(synth.getVoices()); } catch (e) { shared.voice = null; } }
    muteBtn.hidden = !(shared.voice || anyAudio);
  }
  refreshVoices();
  if (synth && synth.addEventListener) synth.addEventListener('voiceschanged', refreshVoices);

  function syncChrome() {
    muteBtn.replaceChildren(glyph(shared.narrateOn ? 'voice' : 'mute'));
    muteBtn.setAttribute('aria-pressed', String(shared.narrateOn));
    muteBtn.setAttribute('aria-label', shared.narrateOn ? 'Mute narration' : 'Turn on narration');
    ccBtn.setAttribute('aria-pressed', String(shared.captionsOn));
    ccBtn.classList.toggle('off', !shared.captionsOn);
    upBtn.disabled = index <= 0;
    downBtn.disabled = index >= list.length - 1;
  }

  /* Slots: the live reel, plus poster frames of its neighbours for the swipe preview. */
  function place(r, k) { if (r) { r.el.style.transform = k ? `translateY(${k * 100}%)` : ''; r.el.classList.toggle('rf-off', !!k); } }
  function build() {
    [reel, prevPoster, nextPoster].forEach(r => r && r.destroy());
    track.replaceChildren();
    reel = createReel(list[index], shared);
    prevPoster = index > 0 ? createReel(list[index - 1], shared) : null;
    nextPoster = index < list.length - 1 ? createReel(list[index + 1], shared) : null;
    [prevPoster, reel, nextPoster].forEach(r => r && track.append(r.el));
    place(prevPoster, -1); place(reel, 0); place(nextPoster, 1);
    reel.setUpNext(nextPoster ? list[index + 1].title : '');
    reel.onEnd = onReelEnd;
    const nx = nextPoster ? list[index + 1].scenes[0] : null;
    shared.nextClip = nx && nx.audio ? new URL(nx.audio, document.baseURI).href : '';
    live.textContent = `${list[index].title}. Video ${index + 1} of ${list.length}.`;
    syncChrome();
    requestAnimationFrame(() => [reel, prevPoster, nextPoster].forEach(r => r && r.relayout()));
  }

  function cancelAuto() { clearTimeout(autoTimer); autoTimer = 0; if (reel) reel.armUpNext(false); }
  shared.cancelAuto = cancelAuto;
  function onReelEnd(r) {
    if (r !== reel || destroyed) return;
    shared.onWatched(r.video.id);
    cancelAuto();
    if (index >= list.length - 1) return;
    reel.armUpNext(true);
    autoTimer = setTimeout(() => { autoTimer = 0; if (!destroyed && reel === r && r.ended) go(1); }, AUTO_NEXT_MS);
  }

  function setTrack(px, animate) {
    track.style.transition = animate && !RM ? 'transform .55s var(--spring, cubic-bezier(.32,.72,0,1))' : 'none';
    track.style.transform = px ? `translate3d(0,${px}px,0)` : '';
  }
  // dir: +1 next video, -1 previous. Snaps with a spring, then rebuilds the slots around the new index.
  function go(dir) {
    if (animating || destroyed) return;
    const target = index + dir;
    cancelAuto();
    if (target < 0 || target >= list.length) { bounce(dir); return; }
    animating = true;
    reel.pause();
    const hgt = viewport.clientHeight || 1;
    setTrack(-dir * hgt, true);
    let done = false;
    const finish = () => {
      if (done || destroyed) return;
      done = true;
      track.removeEventListener('transitionend', onEnd);
      index = target;
      build();
      setTrack(0, false);
      animating = false;
      reel.play();
    };
    const onEnd = e => { if (e.target === track) finish(); };
    track.addEventListener('transitionend', onEnd);
    setTimeout(finish, RM ? 30 : 650);
  }
  function bounce(dir) {
    if (RM) return;
    setTrack(-dir * 36, true);
    setTimeout(() => { if (!destroyed && !animating) setTrack(0, true); }, 180);
  }

  /* Gestures: tap thirds, hold to pause, vertical drag to change video. */
  let ptr = null;
  const interactive = e => e.target.closest('button, a, .rf-menu, .rf-segs');
  viewport.addEventListener('pointerdown', e => {
    if (animating || (e.button !== undefined && e.button > 0) || interactive(e)) return;
    closeMenu();
    const unlockTap = unlockedThisGesture;
    unlockedThisGesture = false;
    ptr = { unlockTap, id: e.pointerId, x0: e.clientX, y0: e.clientY, t0: performance.now(), y: e.clientY, ty: performance.now(), v: 0, drag: false, hold: false, wasPlaying: reel.playing };
    try { viewport.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    ptr.timer = setTimeout(() => {
      if (!ptr || ptr.drag) return;
      ptr.hold = true;
      if (reel.playing) reel.pause();
      root.classList.add('holding');
    }, HOLD_MS);
  });
  viewport.addEventListener('pointermove', e => {
    if (!ptr || e.pointerId !== ptr.id) return;
    const dx = e.clientX - ptr.x0, dy = e.clientY - ptr.y0;
    if (!ptr.drag && Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
      ptr.drag = true; clearTimeout(ptr.timer);
      if (ptr.hold) { ptr.hold = false; root.classList.remove('holding'); }
      cancelAuto();
    }
    if (!ptr.drag) return;
    const now = performance.now();
    ptr.v = (e.clientY - ptr.y) / Math.max(1, now - ptr.ty);
    ptr.y = e.clientY; ptr.ty = now;
    const edge = (dy > 0 && index === 0) || (dy < 0 && index === list.length - 1);
    setTrack(edge ? dy * 0.3 : dy, false);
  });
  const endPtr = e => {
    if (!ptr || e.pointerId !== ptr.id) return;
    const p = ptr; ptr = null;
    clearTimeout(p.timer);
    if (p.drag) {
      const dy = e.clientY - p.y0, hgt = viewport.clientHeight || 1;
      const dir = dy < 0 ? 1 : -1;
      const ok = index + dir >= 0 && index + dir < list.length;
      if (ok && (Math.abs(dy) > hgt * 0.18 || Math.abs(p.v) > 0.5)) go(dir);
      else { setTrack(0, true); if (p.wasPlaying && !reel.playing) reel.play(); }
      return;
    }
    if (p.hold) {
      root.classList.remove('holding');
      if (p.wasPlaying && e.type !== 'pointercancel') reel.play();
      return;
    }
    if (e.type === 'pointercancel') return;
    if (p.unlockTap) return;  // that tap turned the sound on; it is not a pause tap
    if (reel.ended) return; // the end card has its own buttons
    const r = viewport.getBoundingClientRect();
    const zone = tapZone(e.clientX - r.left, r.width);
    cancelAuto();
    if (zone === 'prev') reel.prevScene();
    else if (zone === 'next') reel.nextScene();
    else reel.toggle();
  };
  viewport.addEventListener('pointerup', endPtr);
  viewport.addEventListener('pointercancel', endPtr);
  // Keep the sheet's own swipe-to-dismiss from seeing our vertical swipes.
  const stopTouch = e => e.stopPropagation();
  root.addEventListener('touchstart', stopTouch, { passive: true });
  root.addEventListener('touchmove', stopTouch, { passive: true });

  // One video per flick: after a move, ignore wheel events (trackpad inertia tails on for a second
  // or two) until they go quiet for WHEEL_QUIET ms, then re-arm.
  const WHEEL_QUIET = 180;
  let wheelAcc = 0, wheelLocked = false, wheelQuiet = 0;
  viewport.addEventListener('wheel', e => {
    e.preventDefault();
    clearTimeout(wheelQuiet);
    wheelQuiet = setTimeout(() => { wheelLocked = false; wheelAcc = 0; }, WHEEL_QUIET);
    if (wheelLocked || animating) return;
    wheelAcc += e.deltaY;
    if (Math.abs(wheelAcc) > 60) { wheelLocked = true; const dir = wheelAcc > 0 ? 1 : -1; wheelAcc = 0; go(dir); }
  }, { passive: false });

  /* Chrome */
  function closeMenu() { if (!menu.hidden) { menu.hidden = true; moreBtn.setAttribute('aria-expanded', 'false'); } }
  muteBtn.addEventListener('click', () => {
    shared.narrateOn = !shared.narrateOn;
    if (!shared.narrateOn) shared.setBlocked(false);
    persist('narrate', shared.narrateOn);
    reel.narrationChanged(); syncChrome();
  });
  ccBtn.addEventListener('click', () => { shared.captionsOn = !shared.captionsOn; [reel, prevPoster, nextPoster].forEach(r => r && r.captionsChanged()); syncChrome(); });
  moreBtn.addEventListener('click', () => { menu.hidden = !menu.hidden; moreBtn.setAttribute('aria-expanded', String(!menu.hidden)); });
  speedBtns.forEach((b, i) => b.addEventListener('click', () => {
    shared.speed = REEL_SPEEDS[i];
    persist('reelSpeed', shared.speed);
    tuneAudio(shared.player, shared.speed);
    speedBtns.forEach((x, j) => x.setAttribute('aria-pressed', String(i === j)));
    reel.narrationChanged();
    closeMenu();
  }));
  upBtn.addEventListener('click', () => go(-1));
  downBtn.addEventListener('click', () => go(1));

  /* Keyboard */
  function topmost() {
    const layers = document.querySelectorAll('.sheet-layer');
    const mine = root.closest('.sheet-layer');
    return !mine || layers[layers.length - 1] === mine;
  }
  function onKey(e) {
    if (destroyed || !root.isConnected || !topmost()) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.target.closest && e.target.closest('input, textarea, select, [contenteditable]')) return;
    const k = e.key;
    if (unlockSound() && (k === ' ' || k === 'k' || k === 'K')) { e.preventDefault(); return; } // that key turned sound on
    // Space on a focused button or link activates it as usual; elsewhere it plays/pauses.
    const onControl = e.target.closest && e.target.closest('button, a[href], input, select, textarea, [role="button"]');
    if ((k === ' ' && !onControl) || k === 'k' || k === 'K') { e.preventDefault(); cancelAuto(); reel.toggle(); }
    else if (k === 'ArrowRight') { e.preventDefault(); cancelAuto(); reel.nextScene(); }
    else if (k === 'ArrowLeft') { e.preventDefault(); cancelAuto(); reel.prevScene(); }
    else if (k === 'ArrowDown' || k === 'PageDown') { e.preventDefault(); go(1); }
    else if (k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); go(-1); }
    else if (k === 'c' || k === 'C') ccBtn.click();
    else if ((k === 'm' || k === 'M') && !muteBtn.hidden) muteBtn.click();
  }
  function onVis() { if (document.hidden) { cancelAuto(); if (reel) reel.pause(); } }
  document.addEventListener('keydown', onKey);
  document.addEventListener('visibilitychange', onVis);
  const ro = typeof ResizeObserver === 'function'
    ? new ResizeObserver(() => [reel, prevPoster, nextPoster].forEach(r => r && r.relayout())) : null;
  if (ro) ro.observe(viewport);

  /* Lifecycle: stop speech and clocks as soon as the sheet starts closing. */
  let layerObs = null, bodyObs = null;
  function destroy() {
    if (destroyed) return;
    destroyed = true;
    cancelAuto();
    [reel, prevPoster, nextPoster].forEach(r => r && r.destroy());
    for (const a of [shared.player, shared.preloader]) { try { a.pause(); a.removeAttribute('src'); a.load(); } catch (e) { /* ignore */ } }
    document.removeEventListener('keydown', onKey);
    document.removeEventListener('visibilitychange', onVis);
    if (synth && synth.removeEventListener) synth.removeEventListener('voiceschanged', refreshVoices);
    if (ro) ro.disconnect();
    if (layerObs) layerObs.disconnect();
    if (bodyObs) bodyObs.disconnect();
  }
  function attach() {
    const sheetLayer = root.closest('.sheet-layer');
    if (sheetLayer) {
      sheetLayer.classList.add('rf-layer');
      layerObs = new MutationObserver(() => { if (!sheetLayer.classList.contains('open')) destroy(); });
      layerObs.observe(sheetLayer, { attributes: true, attributeFilter: ['class'] });
    }
    bodyObs = new MutationObserver(() => { if (!root.isConnected) destroy(); });
    bodyObs.observe(document.body, { childList: true, subtree: !sheetLayer });
    [reel, prevPoster, nextPoster].forEach(r => r && r.relayout());
    reel.play(); // reels start on their own; narration joins if the browser allows it
  }

  build();
  // The router inserts the view into a sheet right after render() resolves. Poll with timers,
  // not rAF, so this also works while the page is in the background.
  let tries = 0;
  (function waitForMount() {
    if (destroyed) return;
    if (root.isConnected) attach();
    else if (tries++ < 200) setTimeout(waitForMount, 16);
  })();
}
