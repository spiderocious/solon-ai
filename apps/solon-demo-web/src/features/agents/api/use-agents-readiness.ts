import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { AgentsReadiness } from '@shared/types/mock-data.types';

export function useAgentsReadiness() {
  const { sessionId } = useDemoSession();
  return useQuery<AgentsReadiness>({
    queryKey: ['agents-readiness'],
    queryFn: () => demoClient.getMock<AgentsReadiness>(MOCK_KEY.AGENTS_READINESS, sessionId ?? undefined),
    retry: 2,
  });
}
