import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { AgentsReadiness } from '@shared/types/mock-data.types';

const MOCK: AgentsReadiness = {
  total_agents: 30,
  verified: 16,
  election_ready: 20,
  trained: 20,
  pending_verification: 8,
  failed_verification: 6,
  total_pus_covered: 1240,
  total_pus_nationwide: 176846,
  coverage_pct: 0.7,
  agents: [
    { id: 'ag_001', name: 'Aminu Suleiman', phone: '+2348012345671', lga: 'Kano Municipal', pu: 'KN001/005/001', verified: true, election_ready: true },
    { id: 'ag_002', name: 'Chidinma Okafor', phone: '+2348012345672', lga: 'Surulere', pu: 'LA001/012/003', verified: true, election_ready: true },
    { id: 'ag_003', name: 'Rasheed Adeyemi', phone: '+2348012345673', lga: 'Ibadan North', pu: 'OY001/007/002', verified: true, election_ready: true },
    { id: 'ag_004', name: 'Grace Nwosu', phone: '+2348012345674', lga: 'Port Harcourt', pu: 'RV001/003/005', verified: true, election_ready: true },
    { id: 'ag_005', name: 'Musa Abubakar', phone: '+2348012345675', lga: 'Kaduna South', pu: 'KD001/009/001', verified: false, election_ready: false },
  ],
};

export function useAgentsReadiness() {
  const { sessionId } = useDemoSession();
  return useQuery<AgentsReadiness>({
    queryKey: ['agents-readiness'],
    queryFn: () => demoClient.getMock<AgentsReadiness>(MOCK_KEY.AGENTS_READINESS, sessionId ?? undefined),
    placeholderData: MOCK,
  });
}
