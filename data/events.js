// Competitive events and the career-cluster exam each one is built on.
// Finance reuses areas.js; Marketing carries its own areas + blueprint (research_notes/DECA marketing cluster exam).
import { AREAS, BLUEPRINT } from './areas.js';

export const EVENTS = [
  { id: 'ftdm', name: 'Financial Services Team Decision Making', short: 'Financial Services', cluster: 'finance' },
  { id: 'stdm', name: 'Sports and Entertainment Marketing Team Decision Making', short: 'Sports & Entertainment Marketing', cluster: 'marketing' },
  { id: 'btdm', name: 'Buying and Merchandising Team Decision Making', short: 'Buying & Merchandising', cluster: 'marketing' },
  { id: 'mtdm', name: 'Marketing Management Team Decision Making', short: 'Marketing Management', cluster: 'marketing' },
];
export const DEFAULT_EVENT = 'ftdm';

const MARKETING_NAMES = {
  IM: 'Marketing-information management', PM: 'Product/service management', PR: 'Promotion', SE: 'Selling',
  CM: 'Channel management', MP: 'Market planning', PI: 'Pricing', PD: 'Professional development',
  EI: 'Emotional intelligence', EC: 'Economics', CO: 'Communications', CR: 'Customer relations',
  BL: 'Business law', FI: 'Financial analysis', OP: 'Operations', NF: 'Information management',
  EN: 'Entrepreneurship', HR: 'Human resources management', MK: 'Marketing', SM: 'Strategic management',
};

// areas: ordered ids; names: id -> display name; blueprint: items per level per area (100 each).
export const CLUSTERS = {
  finance: {
    name: 'Finance',
    areas: AREAS.map(a => a.id),
    names: Object.fromEntries(AREAS.map(a => [a.id, a.name])),
    blueprint: BLUEPRINT,
  },
  marketing: {
    name: 'Marketing',
    areas: ['IM', 'PM', 'PR', 'SE', 'CM', 'MP', 'PI', 'PD', 'EI', 'EC', 'CO', 'CR', 'BL', 'FI', 'OP', 'NF', 'EN', 'HR', 'MK', 'SM'],
    names: MARKETING_NAMES,
    blueprint: {
      IM: { district: 11, association: 14, icdc: 16 },
      PM: { district: 11, association: 13, icdc: 15 },
      PR: { district: 9, association: 11, icdc: 13 },
      SE: { district: 6, association: 7, icdc: 8 },
      CM: { district: 5, association: 6, icdc: 7 },
      MP: { district: 4, association: 4, icdc: 5 },
      PI: { district: 3, association: 4, icdc: 4 },
      PD: { district: 6, association: 5, icdc: 5 },
      EI: { district: 9, association: 8, icdc: 6 },
      EC: { district: 6, association: 5, icdc: 4 },
      CO: { district: 5, association: 4, icdc: 3 },
      CR: { district: 2, association: 2, icdc: 1 },
      BL: { district: 2, association: 2, icdc: 1 },
      FI: { district: 6, association: 5, icdc: 4 },
      OP: { district: 6, association: 5, icdc: 4 },
      NF: { district: 5, association: 4, icdc: 3 },
      EN: { district: 1, association: 0, icdc: 0 },
      HR: { district: 1, association: 0, icdc: 0 },
      MK: { district: 1, association: 1, icdc: 1 },
      SM: { district: 1, association: 0, icdc: 0 },
    },
  },
};
