import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { ConstituencyMap } from '@shared/types/mock-data.types';

const MOCK: ConstituencyMap = {
  states: [
    { name: 'Lagos', zone: 'South-West', registered_voters: 8765432, turnout_2023: 0.21, winner_2023: 'APC', afp_tier: 'Toss-up' },
    { name: 'Kano', zone: 'North-West', registered_voters: 7876543, turnout_2023: 0.41, winner_2023: 'NNPP', afp_tier: 'Toss-up' },
    { name: 'Rivers', zone: 'South-South', registered_voters: 3765432, turnout_2023: 0.30, winner_2023: 'LP', afp_tier: 'Toss-up' },
    { name: 'Oyo', zone: 'South-West', registered_voters: 3543210, turnout_2023: 0.32, winner_2023: 'PDP', afp_tier: 'Toss-up' },
    { name: 'FCT', zone: 'North-Central', registered_voters: 1765432, turnout_2023: 0.27, winner_2023: 'LP', afp_tier: 'Lean Hold' },
  ],
};

export function useVoterConstituencies() {
  const { sessionId } = useDemoSession();
  return useQuery<ConstituencyMap>({
    queryKey: ['voter-constituencies'],
    queryFn: () => demoClient.getMock<ConstituencyMap>(MOCK_KEY.VOTER_INTEL_MAP, sessionId ?? undefined),
    placeholderData: MOCK,
  });
}
