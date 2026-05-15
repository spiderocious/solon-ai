import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { SimulatorBaseline } from '@shared/types/mock-data.types';

export function useSimulatorBaseline() {
  const { sessionId } = useDemoSession();
  return useQuery<SimulatorBaseline>({
    queryKey: ['simulator-baseline'],
    queryFn: () => demoClient.getMock<SimulatorBaseline>(MOCK_KEY.SIMULATOR_BASELINE, sessionId ?? undefined),
    retry: 2,
  });
}
