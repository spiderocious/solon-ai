import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { SimulatorBaseline } from '@shared/types/mock-data.types';

const MOCK: SimulatorBaseline = {
  raceId: 'anambra-central-senate-2027',
  raceName: 'Anambra Central Senate',
  constituency: 'Anambra Central',
  candidates: [
    { name: 'Ifeanyi Okonkwo', party: 'LP', partyColor: 'var(--forest-600)', projectedShare: 47.2 },
    { name: 'Uchenna Nwosu', party: 'APC', partyColor: 'var(--ink)', projectedShare: 22.1 },
    { name: 'Emeka Eze', party: 'APGA', partyColor: 'var(--paper-3)', projectedShare: 18.4 },
    { name: 'Adaeze Obi', party: 'PDP', partyColor: '#FFF3E0', projectedShare: 9.8 },
    { name: 'Others', party: 'Other', partyColor: 'var(--paper-2)', projectedShare: 2.5 },
  ],
  registeredVoters: 312_450,
  historicalTurnout: 58.4,
  projectedTurnout: 64.2,
  confidence: 4,
};

export function useSimulatorBaseline() {
  const { sessionId } = useDemoSession();

  return useQuery<SimulatorBaseline>({
    queryKey: ['simulator-baseline'],
    queryFn: () => demoClient.get<SimulatorBaseline>(DEMO_EP.SIMULATOR_BASELINE, sessionId ?? undefined),
    placeholderData: MOCK,
  });
}
