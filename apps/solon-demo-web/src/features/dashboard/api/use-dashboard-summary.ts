import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { CandidateProfile } from '@shared/types/mock-data.types';

export function useDashboardSummary() {
  const { sessionId } = useDemoSession();

  return useQuery<CandidateProfile>({
    queryKey: ['dashboard-summary'],
    queryFn: () => demoClient.getMock<CandidateProfile>(MOCK_KEY.CANDIDATE_PROFILE, sessionId ?? undefined),
    retry: 2,
  });
}
