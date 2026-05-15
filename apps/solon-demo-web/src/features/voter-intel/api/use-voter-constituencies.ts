import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { ConstituencyMap } from '@shared/types/mock-data.types';

export function useVoterConstituencies() {
  const { sessionId } = useDemoSession();
  return useQuery<ConstituencyMap>({
    queryKey: ['voter-constituencies'],
    queryFn: () => demoClient.getMock<ConstituencyMap>(MOCK_KEY.VOTER_INTEL_MAP, sessionId ?? undefined),
    retry: 2,
  });
}
