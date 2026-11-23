// Aggregates PIs, areas, blueprint and per-area content modules.
// Later tasks add `import x from './content/<area>.js'` and append to MODULES.
import { PIS } from './pis.js';
import { AREAS, BLUEPRINT } from './areas.js';
import NARRATION from './content/narration.js';
import g_fi_core from './content/fi-core.js';
import g_fi_cluster from './content/fi-cluster.js';
import g_pd from './content/pd.js';
import g_ei from './content/ei.js';
import g_law from './content/law.js';
import g_econ from './content/econ.js';
import g_crco from './content/crco.js';
import g_ops from './content/ops.js';
import g_info from './content/info.js';

// Explicit registry (no filesystem globbing in a no-build app). Each entry: {lessons,questions,cards,videos}.
const MODULES = [g_fi_core, g_fi_cluster, g_pd, g_ei, g_law, g_econ, g_crco, g_ops, g_info];

// Flipped to true by Task 8 once every PI has a lesson section.
export const COVERAGE_REQUIRED = true;

export { PIS, AREAS, BLUEPRINT };
export const LESSONS = MODULES.flatMap(m => m.lessons || []);
export const QUESTIONS = MODULES.flatMap(m => m.questions || []);
export const CARDS = MODULES.flatMap(m => m.cards || []);
// Recorded narration (content/narration.js) supplies per-scene audio + duration for videos without their own.
export const VIDEOS = MODULES.flatMap(m => m.videos || []).map(v => {
  const n = NARRATION[v.id];
  if (!n || n.length !== v.scenes.length) return v;
  return { ...v, scenes: v.scenes.map((s, i) => s.audio ? s : { ...s, audio: n[i].audio, dur: n[i].dur }) };
});

const BY_CODE = new Map(PIS.map(p => [p.code, p]));
export function piByCode(code) { return BY_CODE.get(code); }
