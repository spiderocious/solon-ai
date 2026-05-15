import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { DashboardSummary } from '@shared/types/mock-data.types';

const MOCK: DashboardSummary = {
  candidateName: 'Ifeanyi Okonkwo',
  race: 'Senate',
  constituency: 'Anambra Central',
  projectedVoteShare: 47.2,
  projectedVoteShareDelta: 2.1,
  confidenceLevel: 4,
  registeredVoters: 312_450,
  targetTurnout: 68,
  agentsCoverage: 74,
  agentsTotal: 412,
  agentsActive: 304,
  campaignBudgetSpent: 2_140_000_000,
  campaignBudgetTotal: 5_000_000_000,
  topIssues: [
    { name: 'Cost of living', salience: 92, delta: 14 },
    { name: 'Insecurity · Onitsha', salience: 71, delta: 22 },
    { name: 'Manufacturing revival', salience: 58, delta: 0 },
    { name: 'Soludo-LP alignment', salience: 42, delta: 38 },
    { name: 'Education funding', salience: 36, delta: -8 },
  ],
  keyAlerts: [
    { id: '1', severity: 'high', message: 'Turnout projection below target in Ogbaru LGA (-12 pts)' },
    { id: '2', severity: 'medium', message: 'Agent credentialing overdue - 28 agents pending INEC verification' },
    { id: '3', severity: 'low', message: 'Media sentiment positive following Onitsha town hall' },
  ],
};

export function useDashboardSummary() {
  const { sessionId } = useDemoSession();

  return useQuery<DashboardSummary>({
    queryKey: ['dashboard-summary'],
    queryFn: () =>
      demoClient
        .getMock<DashboardSummary>(MOCK_KEY.CANDIDATE_PROFILE, sessionId ?? undefined)
        .catch(() => MOCK),
    initialData: MOCK,
  });
}
