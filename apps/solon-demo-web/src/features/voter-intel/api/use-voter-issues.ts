import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { IssueMonitor } from '@shared/types/mock-data.types';

const MOCK: IssueMonitor = {
  week: 'May 12–18, 2026',
  top_issues: [
    {
      rank: 1,
      name: 'Fuel price increase',
      trend: 'rising',
      sentiment_toward_govt: 'negative',
      mentions_this_week: 84320,
      quotes: ['This pump price is killing us o', 'Government promised relief and now price goes up again'],
      source_breakdown: { twitter_x_pct: 67, nairaland_pct: 33 },
      suggested_response: 'Acknowledge pain, cite AFP\'s targeted subsidy plan, contrast with incumbents\' track record',
    },
    {
      rank: 2,
      name: 'Naira depreciation',
      trend: 'rising',
      sentiment_toward_govt: 'negative',
      mentions_this_week: 71240,
      quotes: ['Dollar is now ₦1,800 in the black market', 'FX policy is a mess'],
      source_breakdown: { twitter_x_pct: 72, nairaland_pct: 28 },
      suggested_response: 'Lead with economic competence narrative, Bello\'s economic advisory team credentials',
    },
    {
      rank: 3,
      name: 'Insecurity (North-West banditry)',
      trend: 'steady',
      sentiment_toward_govt: 'negative',
      mentions_this_week: 53180,
      quotes: ['Three more farmers killed in Zamfara', 'State governors are on their own'],
      source_breakdown: { twitter_x_pct: 55, nairaland_pct: 45 },
      suggested_response: 'Bello\'s security compact — community policing + military coordination framework',
    },
  ],
};

export function useVoterIssues() {
  const { sessionId } = useDemoSession();
  return useQuery<IssueMonitor>({
    queryKey: ['voter-issues'],
    queryFn: () => demoClient.getMock<IssueMonitor>(MOCK_KEY.VOTER_INTEL_ISSUES, sessionId ?? undefined),
    placeholderData: MOCK,
  });
}
