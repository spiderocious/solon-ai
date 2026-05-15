export const DEMO_EP = {
  // Session
  SESSION_START: '/session/start',
  SESSION_VALIDATE: (id: string) => `/session/${id}`,

  // Lead
  LEAD_CAPTURE: '/leads',

  // Dashboard
  DASHBOARD_SUMMARY: '/dashboard/summary',

  // Simulator
  SIMULATOR_BASELINE: '/simulator/baseline',
  SIMULATOR_SCENARIOS: '/simulator/scenarios',
  SIMULATOR_SCENARIO: (id: string) => `/simulator/scenarios/${id}`,
  SIMULATOR_RUN: '/simulator/run',
  SIMULATOR_COMPARE: '/simulator/compare',
  SIMULATOR_COPILOT: '/simulator/copilot',

  // Voter Intelligence
  VOTER_CONSTITUENCIES: '/voter-intel/constituencies',
  VOTER_CONSTITUENCY: (id: string) => `/voter-intel/constituencies/${id}`,
  VOTER_CLUSTERS: '/voter-intel/clusters',
  VOTER_ISSUES: '/voter-intel/issues',
  VOTER_MESSAGE_GENERATE: '/voter-intel/messages/generate',

  // Agents
  AGENTS_ROSTER: '/agents/roster',
  AGENTS_COVERAGE: '/agents/coverage',
  AGENTS_READINESS: '/agents/readiness',
  AGENTS_ELECTION_DAY: '/agents/election-day',

  // Finance
  FINANCE_SUMMARY: '/finance/summary',
  FINANCE_EXPENSES: '/finance/expenses',
  FINANCE_DONORS: '/finance/donors',
  FINANCE_COMPLIANCE: '/finance/compliance',

  // War Room
  WAR_ROOM_LIVE: '/war-room/live',
  WAR_ROOM_TALLY: '/war-room/tally',
  WAR_ROOM_COPILOT: '/war-room/copilot',
  WAR_ROOM_PUBLIC: '/war-room/public',
} as const;
