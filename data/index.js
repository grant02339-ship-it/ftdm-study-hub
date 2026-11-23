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
import g_mkt_promo from './content/mkt-promo.js';
import g_mkt_product from './content/mkt-product.js';
import g_mkt_research from './content/mkt-research.js';
import g_ht_info from './content/ht-info.js';
import g_ht_ops from './content/ht-ops.js';
import g_ht_guest from './content/ht-guest.js';
import g_ht_market from './content/ht-market.js';
import g_ent_start from './content/ent-start.js';
import g_ent_fin from './content/ent-fin.js';
import g_ent_ops from './content/ent-ops.js';
import g_ent_strat from './content/ent-strat.js';
import g_ent_mkt from './content/ent-mkt.js';

// Explicit registry (no filesystem globbing in a no-build app). Each entry: {lessons,questions,cards,videos}.
const MODULES = [g_fi_core, g_fi_cluster, g_pd, g_ei, g_law, g_econ, g_crco, g_ops, g_info, g_mkt_promo, g_mkt_product, g_mkt_research, g_ht_info, g_ht_ops, g_ht_guest, g_ht_market, g_ent_start, g_ent_fin, g_ent_ops, g_ent_strat, g_ent_mkt];

// Flipped to true by Task 8 once every PI has a lesson section.
export const COVERAGE_REQUIRED = true;
// Flip to true once the Marketing tier-2 content (content/mkt-*.js) is registered in MODULES.
export const MARKETING_READY = true;
// Flip to true once the Hospitality and tourism content (content/ht-*.js) is registered in MODULES.
export const HOSPITALITY_READY = true;
// Flip to true once the Entrepreneurship content (content/ent-*.js) is registered in MODULES.
export const ENTREPRENEURSHIP_READY = true;

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
