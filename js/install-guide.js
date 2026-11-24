// First-open "Add to Home Screen" popup: the 30-second install video, looping until it's closed.
// Shown once, only on iPhone/iPad in the browser (never inside the installed app).
import { h, openSheet } from './ui.js';

const SEEN_KEY = 'dsb-install-guide-seen';

export function isStandalone() {
  return window.navigator.standalone === true ||
    (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
}

export function isIOS() {
  const ua = navigator.userAgent || '';
  return /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
}

function seen() {
  try { return localStorage.getItem(SEEN_KEY) === '1'; } catch (e) { return false; }
}

export function shouldShowInstallGuide() {
  if (/[?&]install\b/.test(location.search)) return true; // preview: add ?install to the address
  return isIOS() && !isStandalone() && !seen();
}

// onDone runs once the popup is closed.
export function openInstallGuide(onDone) {
  try { localStorage.setItem(SEEN_KEY, '1'); } catch (e) { /* private mode: it may show again */ }
  const video = h('video', {
    class: 'ig-video', src: 'media/install.mp4', autoplay: true, loop: true, muted: true,
    playsinline: true, 'webkit-playsinline': true, preload: 'auto', 'aria-label': 'How to add the app to your Home Screen',
  });
  video.muted = true; // the attribute alone is not enough for autoplay in Safari
  const sound = h('button', { class: 'ig-sound', type: 'button' }, 'Tap for sound');
  const toggle = () => {
    video.muted = !video.muted;
    sound.textContent = video.muted ? 'Tap for sound' : 'Sound on';
    if (video.paused) video.play().catch(() => {});
  };
  video.addEventListener('click', toggle);
  sound.addEventListener('click', toggle);
  let close = null;
  const content = h('div', { class: 'ig' },
    h('h2', { class: 'lt' }, 'Add it to your Home Screen'),
    h('p', { class: 'ig-lede' }, 'It works like a real app, even offline. Takes 20 seconds.'),
    h('div', { class: 'ig-frame' }, video, sound),
    h('ol', { class: 'ig-steps' },
      h('li', null, 'Tap the ', h('b', null, 'Share'), ' button in Safari.'),
      h('li', null, 'Choose ', h('b', null, 'Add to Home Screen'), '.'),
      h('li', null, 'Open DECA Study Buddy from your Home Screen.')),
    h('button', { class: 'cta', type: 'button', onclick: () => close() }, 'Got it'));
  close = openSheet(content, { label: 'How to install the app', onClose: () => { video.pause(); if (onDone) onDone(); } });
  video.play().catch(() => {});
  return close;
}
