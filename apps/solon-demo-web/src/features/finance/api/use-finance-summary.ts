import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { FinanceSummary } from '@shared/types/mock-data.types';

const MOCK: FinanceSummary = {
  totalBudget: 4_000_000_000,
  totalSpent: 2_070_000_000,
  totalDonated: 2_420_000_000,
  burnRate: 26_000_000,
  daysToElection: 285,
  projectedShortfall: 0,
  complianceScore: 86,
};

export function useFinanceSummary() {
  const { sessionId } = useDemoSession();
  return useQuery<FinanceSummary>({
    queryKey: ['finance-summary'],
    queryFn: () => demoClient.get<FinanceSummary>(DEMO_EP.FINANCE_SUMMARY, sessionId ?? undefined),
    placeholderData: MOCK,
  });
}
