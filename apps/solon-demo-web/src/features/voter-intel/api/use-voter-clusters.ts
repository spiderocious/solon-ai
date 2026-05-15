import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { VoterCluster } from '@shared/types/mock-data.types';

export function useVoterClusters() {
  const { sessionId } = useDemoSession();
  return useQuery<VoterCluster[]>({
    queryKey: ['voter-clusters'],
    queryFn: () => demoClient.getMock<VoterCluster[]>(MOCK_KEY.VOTER_INTEL_CLUSTERS, sessionId ?? undefined),
    retry: 2,
  });
}
