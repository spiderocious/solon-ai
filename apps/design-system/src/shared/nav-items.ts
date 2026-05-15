import { ROUTES } from './routes.js';

export type NavGroup = 'Foundation' | 'Primitives' | 'Display' | 'Containers' | 'Navigation & Feedback' | 'Domain';

export interface NavItem {
  label: string;
  route: string;
  group: NavGroup;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Palette',         route: ROUTES.PALETTE,       group: 'Foundation' },
  { label: 'Type',            route: ROUTES.TYPE,          group: 'Foundation' },
  { label: 'Geometry',        route: ROUTES.GEOMETRY,      group: 'Foundation' },
  { label: 'Motion',          route: ROUTES.MOTION,        group: 'Foundation' },
  { label: 'Icons',           route: ROUTES.ICONS,         group: 'Foundation' },
  { label: 'Buttons',         route: ROUTES.BUTTONS,       group: 'Primitives' },
  { label: 'Inputs',          route: ROUTES.INPUTS,        group: 'Primitives' },
  { label: 'Selection',       route: ROUTES.SELECTION,     group: 'Primitives' },
  { label: 'Date & Time',     route: ROUTES.DATETIME,      group: 'Primitives' },
  { label: 'Specialized',     route: ROUTES.SPECIALIZED,   group: 'Primitives' },
  { label: 'Tables',          route: ROUTES.TABLES,        group: 'Display' },
  { label: 'PU List',         route: ROUTES.PULIST,        group: 'Display' },
  { label: 'Charts',          route: ROUTES.CHARTS,        group: 'Display' },
  { label: 'Progress',        route: ROUTES.PROGRESS,      group: 'Display' },
  { label: 'Skeletons',       route: ROUTES.SKELETONS,     group: 'Display' },
  { label: 'Avatars & Pills', route: ROUTES.AVATARS_PILLS, group: 'Display' },
  { label: 'Cards',           route: ROUTES.CARDS,         group: 'Containers' },
  { label: 'Tooltips',        route: ROUTES.TOOLTIPS,      group: 'Containers' },
  { label: 'Navigation',      route: ROUTES.NAVIGATION,    group: 'Navigation & Feedback' },
  { label: 'Modals',          route: ROUTES.MODALS,        group: 'Navigation & Feedback' },
  { label: 'Feedback',        route: ROUTES.FEEDBACK,      group: 'Navigation & Feedback' },
  { label: 'Drawer Service',  route: ROUTES.DRAWER,        group: 'Navigation & Feedback' },
  { label: 'Simulator',       route: ROUTES.SIMULATOR,     group: 'Domain' },
  { label: 'Map',             route: ROUTES.MAP,           group: 'Domain' },
  { label: 'War Room',        route: ROUTES.WARROOM,       group: 'Domain' },
  { label: 'Finance',         route: ROUTES.FINANCE,       group: 'Domain' },
  { label: 'Citizen Reporter',route: ROUTES.CITIZEN,       group: 'Domain' },
  { label: 'Export',          route: ROUTES.EXPORT,        group: 'Domain' },
];

export const NAV_GROUPS: NavGroup[] = [
  'Foundation',
  'Primitives',
  'Display',
  'Containers',
  'Navigation & Feedback',
  'Domain',
];
