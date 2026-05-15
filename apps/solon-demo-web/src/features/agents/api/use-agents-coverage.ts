import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { AgentCoverage } from '@shared/types/mock-data.types';

const MOCK: AgentCoverage[] = [
  { lga: 'Onitsha North', totalPUs: 48, coveredPUs: 44, agents: 12, coverageRate: 91.7 },
  { lga: 'Onitsha South', totalPUs: 42, coveredPUs: 39, agents: 10, coverageRate: 92.9 },
  { lga: 'Idemili North', totalPUs: 61, coveredPUs: 50, agents: 14, coverageRate: 82.0 },
  { lga: 'Idemili South', totalPUs: 54, coveredPUs: 41, agents: 11, coverageRate: 75.9 },
  { lga: 'Ogbaru', totalPUs: 78, coveredPUs: 42, agents: 12, coverageRate: 53.8 },
  { lga: 'Oyi', totalPUs: 44, coveredPUs: 40, agents: 11, coverageRate: 90.9 },
  { lga: 'Ayamelum', totalPUs: 52, coveredPUs: 36, agents: 9, coverageRate: 69.2 },
  { lga: 'Nnewi North', totalPUs: 38, coveredPUs: 12, agents: 4, coverageRate: 31.6 },
];

export function useAgentsCoverage() {
  const { sessionId } = useDemoSession();
  return useQuery<AgentCoverage[]>({
    queryKey: ['agents-coverage'],
    queryFn: () => demoClient.get<AgentCoverage[]>(DEMO_EP.AGENTS_COVERAGE, sessionId ?? undefined),
    placeholderData: MOCK,
  });
}
