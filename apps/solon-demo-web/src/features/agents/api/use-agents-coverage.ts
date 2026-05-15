import { useAgentsReadiness } from './use-agents-readiness';
import type { AgentsReadiness } from '@shared/types/mock-data.types';

export function useAgentsCoverage(): { data: AgentsReadiness | undefined; isLoading: boolean } {
  return useAgentsReadiness();
}
