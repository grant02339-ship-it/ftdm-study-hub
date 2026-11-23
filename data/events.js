// Competitive events and the career-cluster exam each one is built on.
// Finance reuses areas.js; Marketing and Hospitality carry their own areas + blueprint (research_notes/DECA <cluster> cluster exam).
import { AREAS, BLUEPRINT } from './areas.js';

export const EVENTS = [
  { id: 'ftdm', name: 'Financial Services Team Decision Making', short: 'Financial Services', cluster: 'finance' },
  { id: 'stdm', name: 'Sports and Entertainment Marketing Team Decision Making', short: 'Sports & Entertainment Marketing', cluster: 'marketing' },
  { id: 'btdm', name: 'Buying and Merchandising Team Decision Making', short: 'Buying & Merchandising', cluster: 'marketing' },
  { id: 'mtdm', name: 'Marketing Management Team Decision Making', short: 'Marketing Management', cluster: 'marketing' },
  { id: 'htdm', name: 'Hospitality Services Team Decision Making', short: 'Hospitality Services', cluster: 'hospitality' },
  { id: 'ttdm', name: 'Travel and Tourism Team Decision Making', short: 'Travel & Tourism', cluster: 'hospitality' },
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
  hospitality: {
    name: 'Hospitality and tourism',
    areas: ['NF', 'OP', 'EI', 'CR', 'FI', 'PD', 'SE', 'PM', 'EC', 'CO', 'BL', 'SM', 'PR', 'HR', 'MP', 'MK', 'RM', 'PI', 'QM', 'EN', 'KM'],
    names: { NF: 'Information management', OP: 'Operations', EI: 'Emotional intelligence', CR: 'Customer relations', FI: 'Financial analysis', PD: 'Professional development', SE: 'Selling', PM: 'Product/service management', EC: 'Economics', CO: 'Communications', BL: 'Business law', SM: 'Strategic management', PR: 'Promotion', HR: 'Human resources management', MP: 'Market planning', MK: 'Marketing', RM: 'Risk management', PI: 'Pricing', QM: 'Quality management', EN: 'Entrepreneurship', KM: 'Knowledge management' },
    blueprint: {
      NF: { district: 14, association: 15, icdc: 15 },
      OP: { district: 13, association: 13, icdc: 13 },
      EI: { district: 9, association: 9, icdc: 7 },
      CR: { district: 8, association: 9, icdc: 9 },
      FI: { district: 8, association: 7, icdc: 7 },
      PD: { district: 8, association: 7, icdc: 6 },
      SE: { district: 7, association: 8, icdc: 9 },
      PM: { district: 6, association: 7, icdc: 9 },
      EC: { district: 6, association: 6, icdc: 5 },
      CO: { district: 5, association: 4, icdc: 3 },
      BL: { district: 3, association: 3, icdc: 2 },
      SM: { district: 3, association: 2, icdc: 2 },
      PR: { district: 2, association: 3, icdc: 3 },
      HR: { district: 2, association: 1, icdc: 1 },
      MP: { district: 1, association: 1, icdc: 2 },
      MK: { district: 1, association: 1, icdc: 2 },
      RM: { district: 1, association: 1, icdc: 2 },
      PI: { district: 1, association: 1, icdc: 1 },
      QM: { district: 1, association: 1, icdc: 1 },
      EN: { district: 1, association: 0, icdc: 0 },
      KM: { district: 0, association: 1, icdc: 1 },
    },
  },
};
