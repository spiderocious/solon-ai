import { useAgentsReadiness } from './use-agents-readiness';
import type { AgentRecord } from '@shared/types/mock-data.types';

export function useAgentsRoster(): { data: AgentRecord[] | undefined; isLoading: boolean } {
  const { data, isLoading } = useAgentsReadiness();
  return { data: data?.agents, isLoading };
}
