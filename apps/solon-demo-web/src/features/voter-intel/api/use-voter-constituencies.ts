import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { Constituency } from '@shared/types/mock-data.types';

const MOCK: Constituency[] = [
  { id: 'c1', name: 'Onitsha North', lga: 'Onitsha North', state: 'Anambra', registeredVoters: 42_100, lpShare: 54.2, lpShareDelta: 12.4, turnoutRate: 68, lat: 6.165, lng: 6.789 },
  { id: 'c2', name: 'Onitsha South', lga: 'Onitsha South', state: 'Anambra', registeredVoters: 38_800, lpShare: 48.7, lpShareDelta: 8.7, turnoutRate: 64, lat: 6.141, lng: 6.787 },
  { id: 'c3', name: 'Idemili North', lga: 'Idemili North', state: 'Anambra', registeredVoters: 51_300, lpShare: 42.5, lpShareDelta: 5.2, turnoutRate: 61, lat: 6.088, lng: 6.927 },
  { id: 'c4', name: 'Idemili South', lga: 'Idemili South', state: 'Anambra', registeredVoters: 44_200, lpShare: 39.1, lpShareDelta: 2.8, turnoutRate: 59, lat: 6.030, lng: 6.895 },
  { id: 'c5', name: 'Ogbaru', lga: 'Ogbaru', state: 'Anambra', registeredVoters: 62_400, lpShare: 31.4, lpShareDelta: -2.1, turnoutRate: 52, lat: 5.952, lng: 6.674 },
  { id: 'c6', name: 'Oyi', lga: 'Oyi', state: 'Anambra', registeredVoters: 35_900, lpShare: 58.3, lpShareDelta: 14.2, turnoutRate: 71, lat: 6.258, lng: 6.837 },
  { id: 'c7', name: 'Ayamelum', lga: 'Ayamelum', state: 'Anambra', registeredVoters: 38_000, lpShare: 44.0, lpShareDelta: 6.1, turnoutRate: 63, lat: 6.458, lng: 6.837 },
];

export function useVoterConstituencies() {
  const { sessionId } = useDemoSession();
  return useQuery<Constituency[]>({
    queryKey: ['voter-constituencies'],
    queryFn: () => demoClient.get<Constituency[]>(DEMO_EP.VOTER_CONSTITUENCIES, sessionId ?? undefined),
    placeholderData: MOCK,
  });
}
