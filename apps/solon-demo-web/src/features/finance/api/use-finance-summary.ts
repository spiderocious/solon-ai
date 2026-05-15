import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { FinanceDashboard } from '@shared/types/mock-data.types';

export function useFinanceSummary() {
  const { sessionId } = useDemoSession();
  return useQuery<FinanceDashboard>({
    queryKey: ['finance-summary'],
    queryFn: () => demoClient.getMock<FinanceDashboard>(MOCK_KEY.FINANCE_DASHBOARD, sessionId ?? undefined),
    retry: 2,
  });
}
