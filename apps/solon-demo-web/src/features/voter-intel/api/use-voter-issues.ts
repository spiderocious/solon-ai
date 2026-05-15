import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { IssueMonitor } from '@shared/types/mock-data.types';

export function useVoterIssues() {
  const { sessionId } = useDemoSession();
  return useQuery<IssueMonitor>({
    queryKey: ['voter-issues'],
    queryFn: () => demoClient.getMock<IssueMonitor>(MOCK_KEY.VOTER_INTEL_ISSUES, sessionId ?? undefined),
    retry: 2,
  });
}
