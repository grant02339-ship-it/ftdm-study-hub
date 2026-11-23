// Video thumbnails for the Learn shelf and lesson rows. A thumbnail is the video's most visual scene
// (see pickThumbScene) drawn by the player's own scene renderer at its fully settled frame, on a
// 360x640 stage that CSS scales down to the card. Drawing is lazy: a card only renders once it nears
// the viewport, so the Learn tab opens instantly even with every video on the shelf.
import { h, icon } from './ui.js';
import { timeline, pickThumbScene, videoClock, DEFAULT_REEL_SPEED } from './player-timeline.js';
import { ensureStyles, buildScene, settledAt } from './reel-scenes.js';

const STAGE_W = 360, STAGE_H = 640; // the virtual 9:16 stage scenes are laid out on

// Draws one thumbnail's scene into `box`. Safe to call once; failures leave the poster placeholder.
async function draw(box, video, areaName) {
  const i = pickThumbScene(video.scenes);
  if (i < 0 || !box.isConnected) return;
  await ensureStyles();
  if (!box.isConnected) return;
  const sc = video.scenes[i];
  const dur = timeline([sc]).durs[0];
  const built = buildScene(sc, dur, { areaName });
  const layer = h('div', { class: 'vp-layer' }, built.el);
  const stage = h('div', { class: 'vp-stage rt-stage', 'aria-hidden': 'true' }, h('div', { class: 'vp-glow' }), layer);
  box.prepend(stage);
  fit(box);
  if (built.layout) {
    const b = built.box || built.el;
    const w = b.clientWidth, hh = b.clientHeight;
    if (w > 0 && hh > 0) built.layout(w, hh);
  }
  built.update(settledAt(dur));
  box.classList.add('ready');
  if (resizer) resizer.observe(box);
}

function fit(box) {
  const w = box.clientWidth;
  if (w > 0) box.style.setProperty('--k', (w / STAGE_W).toFixed(4));
}

const resizer = typeof ResizeObserver === 'function'
  ? new ResizeObserver(entries => entries.forEach(e => fit(e.target))) : null;

// One shared observer; drawing is queued so only one thumbnail renders per frame.
const jobs = new Map();
const queue = [];
let pumping = false;
function pump() {
  if (pumping) return;
  pumping = true;
  const step = () => {
    const job = queue.shift();
    if (!job) { pumping = false; return; }
    draw(job.box, job.video, job.areaName).catch(() => { /* keep the placeholder */ }).finally(() => requestAnimationFrame(step));
  };
  requestAnimationFrame(step);
}
function enqueue(job) { queue.push(job); pump(); }

const io = typeof IntersectionObserver === 'function'
  ? new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      const job = jobs.get(e.target);
      jobs.delete(e.target);
      if (job) enqueue(job);
    }
  }, { rootMargin: '240px 160px' })
  : null;

// variant 'card': 9:16 poster with area chip, duration, title over a dark gradient and a play glyph.
// variant 'mini': small 9:16 poster with just the play glyph (lesson rows).
export function videoThumb(video, { areaName = '', speed = DEFAULT_REEL_SPEED, variant = 'card' } = {}) {
  const box = h('div', { class: `rt rt-${variant}`, 'aria-hidden': 'true' },
    h('div', { class: 'rt-art' }, icon(video.area)));
  if (variant === 'card') {
    box.append(
      h('div', { class: 'rt-shade' }),
      h('div', { class: 'rt-top' },
        h('span', { class: 'rt-chip' }, areaName),
        h('span', { class: 'rt-dur num' }, videoClock(video.scenes, speed))),
      h('div', { class: 'rt-title' }, video.title),
      h('span', { class: 'rt-play' }, icon('play')));
  } else {
    box.append(h('span', { class: 'rt-play' }, icon('play')));
  }
  const job = { box, video, areaName };
  if (io) { jobs.set(box, job); io.observe(box); }
  else setTimeout(() => enqueue(job), 0);
  return box;
}
