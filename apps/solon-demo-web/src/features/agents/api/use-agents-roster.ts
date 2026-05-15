import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { Agent } from '@shared/types/mock-data.types';

const MOCK: Agent[] = [
  { id: 'a1', name: 'Chukwudi Okafor', phone: '08012345678', lga: 'Onitsha North', ward: 'Ward 3', pu: 'PU/AN/ONN/03/001', status: 'active', pusCovered: 4, lastCheckIn: '2026-05-14T18:30:00Z' },
  { id: 'a2', name: 'Amaka Nwachukwu', phone: '08023456789', lga: 'Onitsha South', ward: 'Ward 1', pu: 'PU/AN/ONS/01/002', status: 'active', pusCovered: 3, lastCheckIn: '2026-05-14T17:45:00Z' },
  { id: 'a3', name: 'Emeka Obi', phone: '08034567890', lga: 'Idemili North', ward: 'Ward 6', pu: 'PU/AN/IDN/06/004', status: 'pending', pusCovered: 0, lastCheckIn: null },
  { id: 'a4', name: 'Ngozi Eze', phone: '08045678901', lga: 'Ogbaru', ward: 'Ward 2', pu: 'PU/AN/OGB/02/001', status: 'inactive', pusCovered: 2, lastCheckIn: '2026-05-10T09:00:00Z' },
  { id: 'a5', name: 'Ifeanyi Nnadi', phone: '08056789012', lga: 'Oyi', ward: 'Ward 4', pu: 'PU/AN/OYI/04/003', status: 'active', pusCovered: 5, lastCheckIn: '2026-05-14T19:00:00Z' },
  { id: 'a6', name: 'Chioma Okonkwo', phone: '08067890123', lga: 'Idemili South', ward: 'Ward 5', pu: 'PU/AN/IDS/05/002', status: 'deployed', pusCovered: 3, lastCheckIn: '2026-05-14T16:20:00Z' },
];

export function useAgentsRoster() {
  const { sessionId } = useDemoSession();
  return useQuery<Agent[]>({
    queryKey: ['agents-roster'],
    queryFn: () => demoClient.get<Agent[]>(DEMO_EP.AGENTS_ROSTER, sessionId ?? undefined),
    placeholderData: MOCK,
  });
}
