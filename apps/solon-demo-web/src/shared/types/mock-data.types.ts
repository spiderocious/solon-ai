// ─── Session ──────────────────────────────────────────────────────────────────

export interface DemoSession {
  sessionId: string;
  leadId: string | null;
  expiresAt: string;
}

// ─── Lead ─────────────────────────────────────────────────────────────────────

export interface LeadCapturePayload {
  name: string;
  email: string;
  phone?: string;
  role: string;
  party?: string;
  state: string;
}

export interface LeadCaptureResponse {
  leadId: string;
  sessionId: string;
}

// ─── Dashboard (candidate.profile) ────────────────────────────────────────────

export interface CandidateProfile {
  full_name: string;
  preferred_name: string;
  party: string;
  party_full: string;
  party_colour: string;
  office: string;
  election_year: number;
  running_mate: string | null;
  running_mate_label: string;
  campaign_manager: string;
  login_email: string;
  election_date: string;
  slogan: string;
  headshot_url: string;
}

// ─── Simulator (simulator.baseline) ───────────────────────────────────────────

export interface SimulatorCandidate {
  id: string;
  name: string;
  party: string;
  party_colour: string;
  share: number;
  margin_of_error: number;
  confidence: string;
}

export interface SimulatorTopVariable {
  rank: number;
  name: string;
  impact: string;
  direction: 'positive' | 'negative' | 'neutral';
}

export interface SimulatorBaseline {
  bello_share: number;
  opposition_share: number;
  undecided_share: number;
  turnout_rate: number;
  swing_states: string[];
  candidates: SimulatorCandidate[];
  top_variables: SimulatorTopVariable[];
}

// ─── Simulator (simulator.saved_scenarios) ────────────────────────────────────

export interface SavedScenario {
  id: string;
  name: string;
  created_at: string;
  summary: {
    bello_share: number;
    apc_share: number;
    pdp_share: number;
    lp_share: number;
  };
}

// ─── Voter Intel (voter_intelligence.constituency_map) ────────────────────────

export interface ConstituencyState {
  name: string;
  zone: string;
  registered_voters: number;
  turnout_2023: number;
  winner_2023: string;
  afp_tier: string;
}

export interface ConstituencyMap {
  states: ConstituencyState[];
}

// ─── Voter Intel (voter_intelligence.clusters) ────────────────────────────────

export interface VoterCluster {
  id: string;
  name: string;
  description: string;
  size_millions: number;
  dominant_states: string[];
  top_issues: string[];
  recommended_channel: string;
  afp_reach_pct: number;
}

// ─── Voter Intel (voter_intelligence.issue_monitor) ───────────────────────────

export interface IssueItem {
  rank: number;
  name: string;
  trend: 'rising' | 'steady' | 'falling';
  sentiment_toward_govt: 'negative' | 'positive' | 'mixed';
  mentions_this_week: number;
  quotes: string[];
  source_breakdown: {
    twitter_x_pct: number;
    nairaland_pct: number;
  };
  suggested_response: string;
}

export interface IssueMonitor {
  week: string;
  top_issues: IssueItem[];
}

// ─── Agents (agents.readiness) ────────────────────────────────────────────────

export interface AgentRecord {
  id: string;
  name: string;
  phone: string;
  lga: string;
  pu: string;
  verified: boolean;
  election_ready: boolean;
}

export interface AgentsReadiness {
  total_agents: number;
  verified: number;
  election_ready: number;
  trained: number;
  pending_verification: number;
  failed_verification: number;
  total_pus_covered: number;
  total_pus_nationwide: number;
  coverage_pct: number;
  agents: AgentRecord[];
}

// ─── Finance (finance.dashboard) ──────────────────────────────────────────────

export interface SpendCategory {
  category: string;
  amount_naira: number;
  sub_cap_naira: number;
  pct_of_sub_cap: number;
}

export interface FinanceDashboard {
  total_cap_naira: number;
  total_spent_naira: number;
  projected_final_naira: number;
  days_to_next_inec_deadline: number;
  next_deadline_label: string;
  spending_by_category: SpendCategory[];
  alerts: Array<{ type: string; message: string }>;
}

// ─── Finance (finance.expenses) ───────────────────────────────────────────────

export interface Expense {
  id: string;
  date: string;
  vendor: string;
  category: string;
  lga: string;
  amount_naira: number;
  status: string;
  note?: string;
}

// ─── Finance (finance.donors) ─────────────────────────────────────────────────

export interface Donor {
  id: string;
  name: string;
  amount_naira: number;
  date: string;
  risk_score: 'Low' | 'Medium' | 'High';
  source: string;
  flagged?: boolean;
  flag_reason?: string;
}

// ─── War Room (warroom.tally) ─────────────────────────────────────────────────

export interface TallyParty {
  party: string;
  candidate: string;
  votes: number;
  pct: number;
}

export interface StateSummary {
  state: string;
  pus_reporting: number;
  pus_total: number;
  afp_pct: number;
  apc_pct: number;
  tier: string;
}

export interface LiveFeedItem {
  time: string;
  type: 'result' | 'incident' | 'anomaly';
  message: string;
  severity?: number;
}

export interface WarRoomTally {
  election_date: string;
  pus_total: number;
  pus_reporting: number;
  coverage_pct: number;
  last_update: string;
  running_tally: TallyParty[];
  state_summary: StateSummary[];
  incidents_last_hour: number;
  severity_5_incidents: number;
  anomaly_flags: number;
  live_feed: LiveFeedItem[];
}

// ─── War Room (war-room/live) ─────────────────────────────────────────────────

export interface LiveUpdate {
  id: string;
  type: 'tally' | 'incident' | 'alert' | 'milestone';
  message: string;
  lga?: string;
  pu?: string;
  timestamp: string;
  severity?: 'high' | 'medium' | 'low';
}

// ─── Simulator (interactive scenario) ────────────────────────────────────────

export interface ScenarioParams {
  turnout: 'low' | 'medium' | 'high';
  youthMobilization: 'baseline' | 'moderate' | 'strong';
  incidentRate: number;
  weatherImpact: boolean;
}

export interface ScenarioCandidate {
  name: string;
  party: string;
  partyColor: string;
  projectedShare: number;
  delta: number;
}

export interface ScenarioResult {
  scenarioId: string;
  name: string;
  params: ScenarioParams;
  candidates: ScenarioCandidate[];
  projectedTurnout: number;
  confidence: number;
  createdAt: string;
}

// ─── Voter Intel (message generator) ─────────────────────────────────────────

export interface MessageTemplate {
  id: string;
  cluster: string;
  channel: 'whatsapp' | 'sms' | 'voice';
  content: string;
  estimatedReach: number;
  engagementScore: number;
}

// ─── Copilot ──────────────────────────────────────────────────────────────────

export interface CopilotMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface CopilotResponse {
  message: CopilotMessage;
}
