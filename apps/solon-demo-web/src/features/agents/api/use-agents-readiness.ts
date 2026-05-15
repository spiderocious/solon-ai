import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { AgentReadiness } from '@shared/types/mock-data.types';

const MOCK: AgentReadiness = {
  totalAgents: 412,
  trained: 374,
  credentialed: 304,
  equipped: 288,
  deployed: 0,
  readinessScore: 74,
};

export function useAgentsReadiness() {
  const { sessionId } = useDemoSession();
  return useQuery<AgentReadiness>({
    queryKey: ['agents-readiness'],
    queryFn: () => demoClient.get<AgentReadiness>(DEMO_EP.AGENTS_READINESS, sessionId ?? undefined),
    placeholderData: MOCK,
  });
}
