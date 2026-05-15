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

// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface DashboardSummary {
  candidateName: string;
  race: string;
  constituency: string;
  projectedVoteShare: number;
  projectedVoteShareDelta: number;
  confidenceLevel: number;
  registeredVoters: number;
  targetTurnout: number;
  agentsCoverage: number;
  agentsTotal: number;
  agentsActive: number;
  campaignBudgetSpent: number;
  campaignBudgetTotal: number;
  topIssues: Array<{ name: string; salience: number; delta: number }>;
  keyAlerts: Array<{ id: string; severity: 'high' | 'medium' | 'low'; message: string }>;
}

// ─── Simulator ────────────────────────────────────────────────────────────────

export type TurnoutScenario = 'low' | 'medium' | 'high' | 'custom';
export type YouthMobilization = 'baseline' | 'moderate' | 'strong';

export interface SimulatorBaseline {
  raceId: string;
  raceName: string;
  constituency: string;
  candidates: Array<{
    name: string;
    party: string;
    partyColor: string;
    projectedShare: number;
  }>;
  registeredVoters: number;
  historicalTurnout: number;
  projectedTurnout: number;
  confidence: number;
}

export interface ScenarioParams {
  turnout: TurnoutScenario;
  customTurnout?: number;
  youthMobilization: YouthMobilization;
  incidentRate: number;
  weatherImpact: boolean;
}

export interface ScenarioResult {
  scenarioId: string;
  name: string;
  params: ScenarioParams;
  candidates: Array<{
    name: string;
    party: string;
    partyColor: string;
    projectedShare: number;
    delta: number;
  }>;
  projectedTurnout: number;
  confidence: number;
  createdAt: string;
}

export interface CopilotMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface CopilotResponse {
  message: CopilotMessage;
  scenarioSuggestion?: Partial<ScenarioParams>;
}

// ─── Voter Intel ───────────────────────────────────────────────────────────────

export interface Constituency {
  id: string;
  name: string;
  lga: string;
  state: string;
  registeredVoters: number;
  lpShare: number;
  lpShareDelta: number;
  turnoutRate: number;
  lat: number;
  lng: number;
}

export interface VoterCluster {
  id: string;
  name: string;
  size: number;
  ageRange: string;
  lpAffinity: 'strong' | 'leaning' | 'swing' | 'opposed';
  topIssues: string[];
  description: string;
}

export interface IssueTrend {
  id: string;
  name: string;
  salience: number;
  delta: number;
  trend: 'rising' | 'steady' | 'falling';
  sources: Array<{ name: string; share: number }>;
  weekData: Array<{ week: string; salience: number }>;
}

export interface MessageTemplate {
  id: string;
  cluster: string;
  channel: 'sms' | 'whatsapp' | 'voice';
  content: string;
  estimatedReach: number;
  engagementScore: number;
}

// ─── Agents ────────────────────────────────────────────────────────────────────

export type AgentStatus = 'active' | 'inactive' | 'pending' | 'deployed';

export interface Agent {
  id: string;
  name: string;
  phone: string;
  lga: string;
  ward: string;
  pu: string;
  status: AgentStatus;
  pusCovered: number;
  lastCheckIn: string | null;
}

export interface AgentCoverage {
  lga: string;
  totalPUs: number;
  coveredPUs: number;
  agents: number;
  coverageRate: number;
}

export interface AgentReadiness {
  totalAgents: number;
  trained: number;
  credentialed: number;
  equipped: number;
  deployed: number;
  readinessScore: number;
}

// ─── Finance ───────────────────────────────────────────────────────────────────

export interface FinanceSummary {
  totalBudget: number;
  totalSpent: number;
  totalDonated: number;
  burnRate: number;
  daysToElection: number;
  projectedShortfall: number;
  complianceScore: number;
}

export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  approvedBy: string;
  receipt: boolean;
}

export interface Donor {
  id: string;
  name: string;
  amount: number;
  date: string;
  method: string;
  verified: boolean;
}

// ─── War Room ──────────────────────────────────────────────────────────────────

export interface LiveUpdate {
  id: string;
  type: 'tally' | 'incident' | 'alert' | 'milestone';
  message: string;
  lga?: string;
  pu?: string;
  timestamp: string;
  severity?: 'high' | 'medium' | 'low';
}

export interface TallyEntry {
  puId: string;
  puName: string;
  lga: string;
  lpVotes: number;
  apcVotes: number;
  pdpVotes: number;
  otherVotes: number;
  totalVotes: number;
  accredited: number;
  timestamp: string;
  status: 'pending' | 'submitted' | 'verified' | 'disputed';
}

export interface TallySummary {
  totalPUs: number;
  reportedPUs: number;
  verifiedPUs: number;
  lpTotal: number;
  apcTotal: number;
  pdpTotal: number;
  otherTotal: number;
  projectedWinner: string;
  projectedMargin: number;
  confidence: number;
}
