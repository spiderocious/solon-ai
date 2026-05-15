import { useAgentsReadiness } from './use-agents-readiness';
import type { AgentRecord } from '@shared/types/mock-data.types';

export function useAgentsRoster() {
  const { data, isLoading, isError, refetch } = useAgentsReadiness();
  const agents: AgentRecord[] | undefined = data?.agents;
  return { data: agents, isLoading, isError, refetch };
}
