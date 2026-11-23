// Service worker registration, offline-readiness status and the safe update path.
// Status: {state: 'unsupported'|'checking'|'downloading'|'ready'|'retry', done, total}.
const listeners = new Set();
let status = { state: 'checking', done: 0, total: 0 };
let reg = null;
let retryTimer = 0;

function set(next) {
  status = { ...status, ...next };
  listeners.forEach(fn => { try { fn(status); } catch (e) { console.warn('offline listener failed', e); } });
}

export const offlineStatus = () => status;
// Calls fn now and on every change; returns an unsubscribe function.
export function onOfflineStatus(fn) {
  listeners.add(fn);
  fn(status);
  return () => listeners.delete(fn);
}

export function offlineLabel(s = status) {
  switch (s.state) {
    case 'ready': return 'Ready';
    case 'downloading': return s.total ? `Downloading… ${Math.floor((s.done / s.total) * 100)}%` : 'Downloading…';
    case 'retry': return 'Not ready yet. Retrying online.';
    case 'unsupported': return 'Not available in this browser';
    default: return 'Checking…';
  }
}

/* ---------- Updates ---------- */
// A new version installs in the background and waits. It is applied (page reloads) only at a
// safe moment: when the student is on Home with nothing open, never mid-exam, quiz or reel.
let isSafe = () => false;
let reloading = false;
let pendingReload = false;
function reloadIfSafe() {
  if (pendingReload && !reloading && isSafe()) { reloading = true; location.reload(); }
}

function applyUpdateIfSafe() {
  if (reg && reg.waiting && navigator.serviceWorker.controller && isSafe()) {
    reg.waiting.postMessage({ type: 'skip-waiting' });
  }
}
// app.js calls this after each route change.
export function routeChanged() { reloadIfSafe(); applyUpdateIfSafe(); }

// iPhone keeps home-screen apps paused in the background instead of relaunching them,
// so look for a new version whenever the app comes back to the front, and every 30 minutes.
let lastCheck = 0;
export async function checkForUpdate(force = false) {
  if (!reg) return false;
  const now = Date.now();
  if (!force && now - lastCheck < 60000) return !!reg.waiting;
  lastCheck = now;
  try { await reg.update(); } catch (e) { console.warn('Update check failed', e); }
  applyUpdateIfSafe();
  return !!(reg.waiting || reg.installing);
}
// Settings "Update now": apply a downloaded update immediately.
export function updateNow() {
  if (reg && reg.waiting) { reg.waiting.postMessage({ type: 'skip-waiting' }); return true; }
  return false;
}
export const updateWaiting = () => !!(reg && reg.waiting);

function scheduleRetry() {
  clearTimeout(retryTimer);
  set({ state: 'retry' });
  // A failed install clears itself; registering again starts a new attempt that reuses
  // whatever files were already saved. Try when the network comes back, or in a minute.
  retryTimer = setTimeout(register, 60000);
}

function watch(worker) {
  if (!worker) return;
  worker.addEventListener('statechange', () => {
    if (worker.state === 'redundant' && !(reg && reg.active)) scheduleRetry();
    if (worker.state === 'installed' && reg && reg.active) applyUpdateIfSafe();
  });
}

async function register() {
  try {
    reg = await navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' });
  } catch (e) {
    console.warn('Service worker failed to register', e);
    scheduleRetry();
    return;
  }
  if (reg.active) set({ state: 'ready' });
  else if (reg.installing || reg.waiting) set({ state: 'downloading' });
  watch(reg.installing);
  reg.addEventListener('updatefound', () => {
    watch(reg.installing);
    if (!reg.active) set({ state: 'downloading' });
  });
  if (reg.waiting) applyUpdateIfSafe();
}

export function initOffline({ safe, onFirstReady }) {
  if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) {
    set({ state: 'unsupported' });
    return;
  }
  isSafe = safe;
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('message', (e) => {
    const m = e.data || {};
    if (m.type === 'precache-progress' && status.state !== 'ready') set({ state: 'downloading', done: m.done, total: m.total });
    else if (m.type === 'precache-failed' && status.state !== 'ready') scheduleRetry();
  });
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (hadController) {
      // A new version took over: reload into it now, or as soon as the student
      // finishes the exam, quiz or reel they are in.
      pendingReload = true;
      reloadIfSafe();
      return;
    }
    set({ state: 'ready' });
    if (onFirstReady) onFirstReady();
  });
  window.addEventListener('online', () => { if (status.state === 'retry') register(); else checkForUpdate(); });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { reloadIfSafe(); checkForUpdate(); } });
  setInterval(() => checkForUpdate(), 30 * 60 * 1000);
  // Registered after load so it never competes with the first render.
  if (document.readyState === 'complete') register();
  else window.addEventListener('load', register, { once: true });
}
