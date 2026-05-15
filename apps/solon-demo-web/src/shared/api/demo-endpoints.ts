export const DEMO_EP = {
  // Session
  SESSION_CREATE: '/sessions',
  SESSION_PING: (id: string) => `/sessions/${id}/ping`,

  // Lead
  LEAD_CAPTURE: '/leads',

  // Feedback
  FEEDBACK: '/feedback',

  // Mock data — all resolved via GET /mock/:key
  MOCK: (key: string) => `/mock/${key}`,

  // Dashboard (mock)
  DASHBOARD_SUMMARY: '/mock/candidate.profile',

  // Simulator
  SIMULATOR_RUN: '/simulator/run',
  SIMULATOR_FOLLOWUP: '/simulator/followup',
  SIMULATOR_COPILOT: '/simulator/copilot',
  SIMULATOR_BASELINE: '/mock/simulator.baseline',
  SIMULATOR_SCENARIOS: '/mock/simulator.saved_scenarios',

  // Voter intel (mock + real)
  VOTER_CONSTITUENCIES: '/mock/voter_intelligence.constituency_map',
  VOTER_CLUSTERS: '/mock/voter_intelligence.clusters',
  VOTER_ISSUES: '/mock/voter_intelligence.issue_monitor',
  VOTER_MESSAGE_GENERATE: '/voter-intel/message-generate',

  // Agents (mock)
  AGENTS_ROSTER: '/mock/agents.roster',
  AGENTS_COVERAGE: '/mock/agents.coverage',
  AGENTS_READINESS: '/mock/agents.readiness',

  // Finance (mock)
  FINANCE_SUMMARY: '/mock/finance.dashboard',
  FINANCE_EXPENSES: '/mock/finance.expenses',
  FINANCE_DONORS: '/mock/finance.donors',

  // War Room
  WAR_ROOM_TALLY: '/mock/warroom.tally',
  WAR_ROOM_LIVE: '/war-room/live',
  WAR_ROOM_COPILOT: '/war-room/copilot',
} as const;

// Mock data keys
export const MOCK_KEY = {
  CANDIDATE_PROFILE: 'candidate.profile',
  SIMULATOR_BASELINE: 'simulator.baseline',
  SIMULATOR_SAVED_SCENARIOS: 'simulator.saved_scenarios',
  VOTER_INTEL_MAP: 'voter_intelligence.constituency_map',
  VOTER_INTEL_CLUSTERS: 'voter_intelligence.clusters',
  VOTER_INTEL_MESSAGES: 'voter_intelligence.message_variants',
  VOTER_INTEL_ISSUES: 'voter_intelligence.issue_monitor',
  AGENTS_READINESS: 'agents.readiness',
  AGENTS_ELECTION_DAY: 'agents.election_day',
  AGENTS_INCIDENTS: 'agents.incidents',
  FINANCE_DASHBOARD: 'finance.dashboard',
  FINANCE_EXPENSES: 'finance.expenses',
  FINANCE_DONORS: 'finance.donors',
  WARROOM_TALLY: 'warroom.tally',
  WARROOM_RECONCILIATION: 'warroom.reconciliation',
} as const;
