// Cache-first service worker. The precache list is generated: run
// `python3 scripts/build_precache.py` after changing any file under app/.
/*PRECACHE_START*/
const VERSION = "90e070106130";
const PRECACHE = [
  "./index.html",
  "./css/app.css",
  "./css/player.css",
  "./css/practice.css",
  "./data/areas.js",
  "./data/content/crco-cards.js",
  "./data/content/crco-co-lessons-a.js",
  "./data/content/crco-co-lessons-b.js",
  "./data/content/crco-co-lessons-c.js",
  "./data/content/crco-cr-lessons-a.js",
  "./data/content/crco-cr-lessons-b.js",
  "./data/content/crco-questions.js",
  "./data/content/crco-videos.js",
  "./data/content/crco.js",
  "./data/content/econ-cards.js",
  "./data/content/econ-lessons.js",
  "./data/content/econ-questions.js",
  "./data/content/econ-videos.js",
  "./data/content/econ.js",
  "./data/content/ei-cards.js",
  "./data/content/ei-lessons-a.js",
  "./data/content/ei-lessons-b.js",
  "./data/content/ei-lessons-c.js",
  "./data/content/ei-questions.js",
  "./data/content/ei-videos.js",
  "./data/content/ei.js",
  "./data/content/fi-cluster-cards.js",
  "./data/content/fi-cluster-lessons.js",
  "./data/content/fi-cluster-questions.js",
  "./data/content/fi-cluster-videos.js",
  "./data/content/fi-cluster.js",
  "./data/content/fi-core-cards.js",
  "./data/content/fi-core-lessons.js",
  "./data/content/fi-core-questions.js",
  "./data/content/fi-core-videos.js",
  "./data/content/fi-core.js",
  "./data/content/info-cards.js",
  "./data/content/info-lessons-a.js",
  "./data/content/info-lessons-b.js",
  "./data/content/info-lessons-c.js",
  "./data/content/info-questions.js",
  "./data/content/info-videos.js",
  "./data/content/info.js",
  "./data/content/law-cards.js",
  "./data/content/law-lessons.js",
  "./data/content/law-questions.js",
  "./data/content/law-videos.js",
  "./data/content/law.js",
  "./data/content/narration.js",
  "./data/content/ops-cards.js",
  "./data/content/ops-lessons-a.js",
  "./data/content/ops-lessons-b.js",
  "./data/content/ops-lessons-c.js",
  "./data/content/ops-questions.js",
  "./data/content/ops-videos.js",
  "./data/content/ops.js",
  "./data/content/pd-cards.js",
  "./data/content/pd-lessons-a.js",
  "./data/content/pd-lessons-b.js",
  "./data/content/pd-questions.js",
  "./data/content/pd-videos.js",
  "./data/content/pd.js",
  "./data/index.js",
  "./data/pis.js",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/icon.svg",
  "./js/app.js",
  "./js/exam.js",
  "./js/explainers/bond.js",
  "./js/explainers/breakeven.js",
  "./js/explainers/kit.js",
  "./js/explainers/loan.js",
  "./js/explainers/ratios.js",
  "./js/explainers/supplydemand.js",
  "./js/explainers/tvm.js",
  "./js/offline.js",
  "./js/player-timeline.js",
  "./js/practice-lib.js",
  "./js/progress.js",
  "./js/srs.js",
  "./js/store.js",
  "./js/ui.js",
  "./js/views/cards.js",
  "./js/views/exam.js",
  "./js/views/home.js",
  "./js/views/learn.js",
  "./js/views/lesson.js",
  "./js/views/practice.js",
  "./js/views/quiz.js",
  "./js/views/settings.js",
  "./js/views/watch.js",
  "./manifest.webmanifest",
  "./media/v-bl-contracts-0.m4a",
  "./media/v-bl-contracts-1.m4a",
  "./media/v-bl-contracts-2.m4a",
  "./media/v-bl-contracts-3.m4a",
  "./media/v-bl-contracts-4.m4a",
  "./media/v-bl-contracts-5.m4a",
  "./media/v-bl-contracts-6.m4a",
  "./media/v-bl-contracts-7.m4a",
  "./media/v-bl-ownership-0.m4a",
  "./media/v-bl-ownership-1.m4a",
  "./media/v-bl-ownership-2.m4a",
  "./media/v-bl-ownership-3.m4a",
  "./media/v-bl-ownership-4.m4a",
  "./media/v-bl-ownership-5.m4a",
  "./media/v-bl-ownership-6.m4a",
  "./media/v-bl-regulation-0.m4a",
  "./media/v-bl-regulation-1.m4a",
  "./media/v-bl-regulation-2.m4a",
  "./media/v-bl-regulation-3.m4a",
  "./media/v-bl-regulation-4.m4a",
  "./media/v-bl-regulation-5.m4a",
  "./media/v-bl-regulation-6.m4a",
  "./media/v-bl-regulation-7.m4a",
  "./media/v-crco-communication-0.m4a",
  "./media/v-crco-communication-1.m4a",
  "./media/v-crco-communication-2.m4a",
  "./media/v-crco-communication-3.m4a",
  "./media/v-crco-communication-4.m4a",
  "./media/v-crco-communication-5.m4a",
  "./media/v-crco-communication-6.m4a",
  "./media/v-crco-communication-7.m4a",
  "./media/v-crco-complaints-0.m4a",
  "./media/v-crco-complaints-1.m4a",
  "./media/v-crco-complaints-2.m4a",
  "./media/v-crco-complaints-3.m4a",
  "./media/v-crco-complaints-4.m4a",
  "./media/v-crco-complaints-5.m4a",
  "./media/v-crco-complaints-6.m4a",
  "./media/v-crco-complaints-7.m4a",
  "./media/v-ec-fed-0.m4a",
  "./media/v-ec-fed-1.m4a",
  "./media/v-ec-fed-2.m4a",
  "./media/v-ec-fed-3.m4a",
  "./media/v-ec-fed-4.m4a",
  "./media/v-ec-fed-5.m4a",
  "./media/v-ec-fed-6.m4a",
  "./media/v-ec-fed-7.m4a",
  "./media/v-ec-macro-0.m4a",
  "./media/v-ec-macro-1.m4a",
  "./media/v-ec-macro-2.m4a",
  "./media/v-ec-macro-3.m4a",
  "./media/v-ec-macro-4.m4a",
  "./media/v-ec-macro-5.m4a",
  "./media/v-ec-macro-6.m4a",
  "./media/v-ec-macro-7.m4a",
  "./media/v-ec-macro-8.m4a",
  "./media/v-ec-markets-0.m4a",
  "./media/v-ec-markets-1.m4a",
  "./media/v-ec-markets-2.m4a",
  "./media/v-ec-markets-3.m4a",
  "./media/v-ec-markets-4.m4a",
  "./media/v-ec-markets-5.m4a",
  "./media/v-ec-markets-6.m4a",
  "./media/v-ec-markets-7.m4a",
  "./media/v-ec-scarcity-0.m4a",
  "./media/v-ec-scarcity-1.m4a",
  "./media/v-ec-scarcity-2.m4a",
  "./media/v-ec-scarcity-3.m4a",
  "./media/v-ec-scarcity-4.m4a",
  "./media/v-ec-scarcity-5.m4a",
  "./media/v-ec-scarcity-6.m4a",
  "./media/v-ec-scarcity-7.m4a",
  "./media/v-ec-supply-demand-0.m4a",
  "./media/v-ec-supply-demand-1.m4a",
  "./media/v-ec-supply-demand-2.m4a",
  "./media/v-ec-supply-demand-3.m4a",
  "./media/v-ec-supply-demand-4.m4a",
  "./media/v-ec-supply-demand-5.m4a",
  "./media/v-ec-supply-demand-6.m4a",
  "./media/v-ec-supply-demand-7.m4a",
  "./media/v-ec-trade-0.m4a",
  "./media/v-ec-trade-1.m4a",
  "./media/v-ec-trade-2.m4a",
  "./media/v-ec-trade-3.m4a",
  "./media/v-ec-trade-4.m4a",
  "./media/v-ec-trade-5.m4a",
  "./media/v-ec-trade-6.m4a",
  "./media/v-ec-trade-7.m4a",
  "./media/v-ei-conflict-change-0.m4a",
  "./media/v-ei-conflict-change-1.m4a",
  "./media/v-ei-conflict-change-2.m4a",
  "./media/v-ei-conflict-change-3.m4a",
  "./media/v-ei-conflict-change-4.m4a",
  "./media/v-ei-conflict-change-5.m4a",
  "./media/v-ei-conflict-change-6.m4a",
  "./media/v-ei-conflict-change-7.m4a",
  "./media/v-ei-five-components-0.m4a",
  "./media/v-ei-five-components-1.m4a",
  "./media/v-ei-five-components-2.m4a",
  "./media/v-ei-five-components-3.m4a",
  "./media/v-ei-five-components-4.m4a",
  "./media/v-ei-five-components-5.m4a",
  "./media/v-ei-five-components-6.m4a",
  "./media/v-ei-five-components-7.m4a",
  "./media/v-fi-budget-0.m4a",
  "./media/v-fi-budget-1.m4a",
  "./media/v-fi-budget-2.m4a",
  "./media/v-fi-budget-3.m4a",
  "./media/v-fi-budget-4.m4a",
  "./media/v-fi-budget-5.m4a",
  "./media/v-fi-budget-6.m4a",
  "./media/v-fi-budget-7.m4a",
  "./media/v-fi-credit-0.m4a",
  "./media/v-fi-credit-1.m4a",
  "./media/v-fi-credit-2.m4a",
  "./media/v-fi-credit-3.m4a",
  "./media/v-fi-credit-4.m4a",
  "./media/v-fi-credit-5.m4a",
  "./media/v-fi-credit-6.m4a",
  "./media/v-fi-credit-7.m4a",
  "./media/v-fi-ratios-0.m4a",
  "./media/v-fi-ratios-1.m4a",
  "./media/v-fi-ratios-2.m4a",
  "./media/v-fi-ratios-3.m4a",
  "./media/v-fi-ratios-4.m4a",
  "./media/v-fi-ratios-5.m4a",
  "./media/v-fi-ratios-6.m4a",
  "./media/v-fi-ratios-7.m4a",
  "./media/v-fi-statements-0.m4a",
  "./media/v-fi-statements-1.m4a",
  "./media/v-fi-statements-2.m4a",
  "./media/v-fi-statements-3.m4a",
  "./media/v-fi-statements-4.m4a",
  "./media/v-fi-statements-5.m4a",
  "./media/v-fi-statements-6.m4a",
  "./media/v-fi-statements-7.m4a",
  "./media/v-fi-taxes-0.m4a",
  "./media/v-fi-taxes-1.m4a",
  "./media/v-fi-taxes-2.m4a",
  "./media/v-fi-taxes-3.m4a",
  "./media/v-fi-taxes-4.m4a",
  "./media/v-fi-taxes-5.m4a",
  "./media/v-fi-taxes-6.m4a",
  "./media/v-fi-taxes-7.m4a",
  "./media/v-fi-tvm-0.m4a",
  "./media/v-fi-tvm-1.m4a",
  "./media/v-fi-tvm-10.m4a",
  "./media/v-fi-tvm-2.m4a",
  "./media/v-fi-tvm-3.m4a",
  "./media/v-fi-tvm-4.m4a",
  "./media/v-fi-tvm-5.m4a",
  "./media/v-fi-tvm-6.m4a",
  "./media/v-fi-tvm-7.m4a",
  "./media/v-fi-tvm-8.m4a",
  "./media/v-fi-tvm-9.m4a",
  "./media/v-fic-fed-banks-0.m4a",
  "./media/v-fic-fed-banks-1.m4a",
  "./media/v-fic-fed-banks-2.m4a",
  "./media/v-fic-fed-banks-3.m4a",
  "./media/v-fic-fed-banks-4.m4a",
  "./media/v-fic-fed-banks-5.m4a",
  "./media/v-fic-fed-banks-6.m4a",
  "./media/v-fic-fed-banks-7.m4a",
  "./media/v-fic-fim-0.m4a",
  "./media/v-fic-fim-1.m4a",
  "./media/v-fic-fim-2.m4a",
  "./media/v-fic-fim-3.m4a",
  "./media/v-fic-fim-4.m4a",
  "./media/v-fic-fim-5.m4a",
  "./media/v-fic-fim-6.m4a",
  "./media/v-fic-fim-7.m4a",
  "./media/v-fic-investments-0.m4a",
  "./media/v-fic-investments-1.m4a",
  "./media/v-fic-investments-2.m4a",
  "./media/v-fic-investments-3.m4a",
  "./media/v-fic-investments-4.m4a",
  "./media/v-fic-investments-5.m4a",
  "./media/v-fic-investments-6.m4a",
  "./media/v-fic-investments-7.m4a",
  "./media/v-fic-markets-0.m4a",
  "./media/v-fic-markets-1.m4a",
  "./media/v-fic-markets-2.m4a",
  "./media/v-fic-markets-3.m4a",
  "./media/v-fic-markets-4.m4a",
  "./media/v-fic-markets-5.m4a",
  "./media/v-fic-markets-6.m4a",
  "./media/v-fic-markets-7.m4a",
  "./media/v-fic-risk-0.m4a",
  "./media/v-fic-risk-1.m4a",
  "./media/v-fic-risk-2.m4a",
  "./media/v-fic-risk-3.m4a",
  "./media/v-fic-risk-4.m4a",
  "./media/v-fic-risk-5.m4a",
  "./media/v-fic-risk-6.m4a",
  "./media/v-fic-risk-7.m4a",
  "./media/v-nf-decisions-0.m4a",
  "./media/v-nf-decisions-1.m4a",
  "./media/v-nf-decisions-2.m4a",
  "./media/v-nf-decisions-3.m4a",
  "./media/v-nf-decisions-4.m4a",
  "./media/v-nf-decisions-5.m4a",
  "./media/v-nf-decisions-6.m4a",
  "./media/v-nf-decisions-7.m4a",
  "./media/v-nf-protect-0.m4a",
  "./media/v-nf-protect-1.m4a",
  "./media/v-nf-protect-2.m4a",
  "./media/v-nf-protect-3.m4a",
  "./media/v-nf-protect-4.m4a",
  "./media/v-nf-protect-5.m4a",
  "./media/v-nf-protect-6.m4a",
  "./media/v-nf-protect-7.m4a",
  "./media/v-ops-pm-0.m4a",
  "./media/v-ops-pm-1.m4a",
  "./media/v-ops-pm-2.m4a",
  "./media/v-ops-pm-3.m4a",
  "./media/v-ops-pm-4.m4a",
  "./media/v-ops-pm-5.m4a",
  "./media/v-ops-pm-6.m4a",
  "./media/v-ops-pm-7.m4a",
  "./media/v-ops-quality-0.m4a",
  "./media/v-ops-quality-1.m4a",
  "./media/v-ops-quality-2.m4a",
  "./media/v-ops-quality-3.m4a",
  "./media/v-ops-quality-4.m4a",
  "./media/v-ops-quality-5.m4a",
  "./media/v-ops-quality-6.m4a",
  "./media/v-ops-quality-7.m4a",
  "./media/v-pd-careers-0.m4a",
  "./media/v-pd-careers-1.m4a",
  "./media/v-pd-careers-2.m4a",
  "./media/v-pd-careers-3.m4a",
  "./media/v-pd-careers-4.m4a",
  "./media/v-pd-careers-5.m4a",
  "./media/v-pd-careers-6.m4a",
  "./media/v-pd-careers-7.m4a",
  "./media/v-pd-professionalism-0.m4a",
  "./media/v-pd-professionalism-1.m4a",
  "./media/v-pd-professionalism-2.m4a",
  "./media/v-pd-professionalism-3.m4a",
  "./media/v-pd-professionalism-4.m4a",
  "./media/v-pd-professionalism-5.m4a",
  "./media/v-pd-professionalism-6.m4a",
  "./media/v-pd-professionalism-7.m4a",
  "./precache.js",
  "./"
];
/*PRECACHE_END*/

const CACHE = 'ftdm-' + VERSION;

// Tell every open page how the offline download is going (drives the Settings row and toast).
async function tell(msg) {
  const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  for (const c of all) c.postMessage(msg);
}

async function fetchInto(cache, url) {
  const res = await fetch(new Request(url, { cache: 'reload' }));
  if (!res.ok) throw new Error('HTTP ' + res.status);
  await cache.put(url, res);
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const failed = [];
    let done = 0;
    // Batches keep the request count modest; failures are collected, not swallowed.
    for (let i = 0; i < PRECACHE.length; i += 8) {
      await Promise.all(PRECACHE.slice(i, i + 8).map(async (url) => {
        // A file kept from an earlier, interrupted attempt at this same VERSION is reused,
        // so a retry only downloads what is still missing.
        if (await cache.match(url)) { done++; return; }
        try {
          await fetchInto(cache, url);
        } catch (e) {
          try { await fetchInto(cache, url); } // one retry for flaky networks
          catch (e2) { failed.push(url); console.error('[sw] precache failed:', url, e2); return; }
        }
        done++;
      }));
      tell({ type: 'precache-progress', done, total: PRECACHE.length });
    }
    // Abort install if anything is missing, so a half-cached version never activates.
    // The page re-registers later (online / next visit) and the retry resumes from here.
    if (failed.length) {
      await tell({ type: 'precache-failed', failed: failed.length, total: PRECACHE.length });
      throw new Error('[sw] precache incomplete: ' + failed.length + ' file(s) failed');
    }
    await tell({ type: 'precache-done', total: PRECACHE.length });
    // First install takes over at once. An update waits until the page says it's safe
    // (app.js sends 'skip-waiting' on Home), so a running page never mixes versions.
    if (!self.registration.active) await self.skipWaiting();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'skip-waiting') self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('ftdm-') && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

// Safari asks for audio with Range headers; answer from the cached full body.
async function rangeResponse(request, res) {
  const m = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get('range') || '');
  if (!m || res.status !== 200) return res;
  const buf = await res.arrayBuffer();
  const size = buf.byteLength;
  let start, end;
  if (m[1] === '') { start = Math.max(0, size - Number(m[2])); end = size - 1; }
  else { start = Number(m[1]); end = m[2] === '' ? size - 1 : Math.min(Number(m[2]), size - 1); }
  if (!(start <= end) || start >= size) {
    return new Response(null, { status: 416, headers: { 'Content-Range': 'bytes */' + size } });
  }
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    statusText: 'Partial Content',
    headers: {
      'Content-Type': res.headers.get('Content-Type') || 'audio/mp4',
      'Content-Length': String(end - start + 1),
      'Content-Range': 'bytes ' + start + '-' + end + '/' + size,
      'Accept-Ranges': 'bytes',
    },
  });
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    // Ignore the query string and hash so '/?x=1' still finds the cached shell.
    let res = await cache.match(req, { ignoreSearch: true });
    if (!res && req.mode === 'navigate') res = await cache.match('./index.html');
    if (!res) {
      try { res = await fetch(req); }
      catch (e) { return new Response('Offline', { status: 503, statusText: 'Offline' }); }
      return res;
    }
    return req.headers.has('range') ? rangeResponse(req, res) : res;
  })());
});
