import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { FinanceDashboard } from '@shared/types/mock-data.types';

const MOCK: FinanceDashboard = {
  total_cap_naira: 5_000_000_000,
  total_spent_naira: 1_200_000_000,
  projected_final_naira: 4_100_000_000,
  days_to_next_inec_deadline: 47,
  next_deadline_label: 'Q2 2026 Interim Expenditure Return',
  spending_by_category: [
    { category: 'Media', amount_naira: 480_000_000, sub_cap_naira: 1_500_000_000, pct_of_sub_cap: 32 },
    { category: 'Transport', amount_naira: 280_000_000, sub_cap_naira: 500_000_000, pct_of_sub_cap: 56 },
    { category: 'Logistics', amount_naira: 195_000_000, sub_cap_naira: 400_000_000, pct_of_sub_cap: 49 },
    { category: 'Personnel', amount_naira: 160_000_000, sub_cap_naira: 600_000_000, pct_of_sub_cap: 27 },
    { category: 'Materials', amount_naira: 85_000_000, sub_cap_naira: 300_000_000, pct_of_sub_cap: 28 },
  ],
  alerts: [
    { type: 'warning', message: 'Media spend at 32% of sub-cap with 20 months to election — at current burn rate, will breach sub-cap by Q3 2026' },
  ],
};

export function useFinanceSummary() {
  const { sessionId } = useDemoSession();
  return useQuery<FinanceDashboard>({
    queryKey: ['finance-summary'],
    queryFn: () => demoClient.getMock<FinanceDashboard>(MOCK_KEY.FINANCE_DASHBOARD, sessionId ?? undefined),
    placeholderData: MOCK,
  });
}
