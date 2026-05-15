// Centralised route table. Apps import from here so route strings have
// exactly one source of truth across web + admin + website surfaces.
export const ROUTES = {
  // Public marketing
  HOME: '/',
  PRICING: '/pricing',
  ABOUT: '/about',

  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // App
  DASHBOARD: '/dashboard',
  SIMULATOR: '/simulator',
  SIMULATOR_RACE: (raceId: string) => `/simulator/${raceId}`,
  CONSTITUENCY: '/constituency',
  WAR_ROOM: '/war-room',

  // Citizen reporter (Module 4)
  CITIZEN: '/citizen',
  CITIZEN_REPORT: '/citizen/report',

  // Admin
  ADMIN_LOGIN: '/admin/login',
  ADMIN_HOME: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_RACES: '/admin/races',
} as const;

// Demo-specific routes (solon-demo-web only)
export const DEMO_ROUTES = {
  LOGIN: '/login',
  LEAD_CAPTURE: '/lead-capture',
  DASHBOARD: '/modules/dashboard',
  SIMULATOR: '/modules/simulator',
  SIMULATOR_BASELINE: '/modules/simulator/baseline',
  SIMULATOR_SCENARIO: '/modules/simulator/scenario',
  SIMULATOR_COPILOT: '/modules/simulator/copilot',
  SIMULATOR_SAVED: '/modules/simulator/saved',
  SIMULATOR_COMPARE: '/modules/simulator/compare',
  VOTER_INTEL: '/modules/voter-intel',
  VOTER_INTEL_MAP: '/modules/voter-intel/map',
  VOTER_INTEL_CLUSTERS: '/modules/voter-intel/clusters',
  VOTER_INTEL_MESSAGES: '/modules/voter-intel/messages',
  VOTER_INTEL_ISSUES: '/modules/voter-intel/issues',
  AGENTS: '/modules/agents',
  AGENTS_ROSTER: '/modules/agents/roster',
  AGENTS_COVERAGE: '/modules/agents/coverage',
  AGENTS_READINESS: '/modules/agents/readiness',
  AGENTS_ELECTION_DAY: '/modules/agents/election-day',
  FINANCE: '/modules/finance',
  FINANCE_DASHBOARD: '/modules/finance/dashboard',
  FINANCE_EXPENSES: '/modules/finance/expenses',
  FINANCE_DONORS: '/modules/finance/donors',
  FINANCE_COMPLIANCE: '/modules/finance/compliance',
  WAR_ROOM: '/modules/war-room',
  WAR_ROOM_LIVE: '/modules/war-room/live',
  WAR_ROOM_COPILOT: '/modules/war-room/copilot',
  WAR_ROOM_RECONCILIATION: '/modules/war-room/reconciliation',
  WAR_ROOM_PUBLIC: '/modules/war-room/public',
} as const;
