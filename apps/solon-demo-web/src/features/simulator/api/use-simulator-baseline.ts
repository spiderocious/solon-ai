import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { SimulatorBaseline } from '@shared/types/mock-data.types';

const MOCK: SimulatorBaseline = {
  bello_share: 29,
  opposition_share: 32,
  undecided_share: 24,
  turnout_rate: 38.5,
  swing_states: ['Kano', 'Rivers', 'Oyo', 'Borno', 'Delta'],
  candidates: [
    { id: 'bello_afp', name: 'Emeka Adeyemi Bello', party: 'AFP', party_colour: '#1D4ED8', share: 29, margin_of_error: 4, confidence: 'Medium' },
    { id: 'apc_incumbent', name: 'Incumbent (APC)', party: 'APC', party_colour: '#16A34A', share: 32, margin_of_error: 3, confidence: 'High' },
    { id: 'pdp_candidate', name: 'Candidate TBA (PDP)', party: 'PDP', party_colour: '#DC2626', share: 26, margin_of_error: 5, confidence: 'Low' },
    { id: 'lp_obi', name: 'Peter Obi (LP)', party: 'LP', party_colour: '#B45309', share: 10, margin_of_error: 3, confidence: 'Medium' },
    { id: 'others', name: 'Others', party: 'Others', party_colour: '#6B7280', share: 3, margin_of_error: 2, confidence: 'Low' },
  ],
  top_variables: [
    { rank: 1, name: 'Incumbent advantage (APC)', impact: '−3.8pts for challengers', direction: 'negative' },
    { rank: 2, name: 'South-West sentiment shift', impact: '+2.1pts AFP in Lagos/Ogun', direction: 'positive' },
    { rank: 3, name: 'Youth turnout trajectory', impact: '±3.5pts if 18-35 turnout swings', direction: 'neutral' },
  ],
};

export function useSimulatorBaseline() {
  const { sessionId } = useDemoSession();

  return useQuery<SimulatorBaseline>({
    queryKey: ['simulator-baseline'],
    queryFn: () => demoClient.getMock<SimulatorBaseline>(MOCK_KEY.SIMULATOR_BASELINE, sessionId ?? undefined),
    placeholderData: MOCK,
  });
}
