import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { VoterCluster } from '@shared/types/mock-data.types';

const MOCK: VoterCluster[] = [
  {
    id: 'vc1',
    name: 'Young urban professionals',
    size: 42_000,
    ageRange: '25-34',
    lpAffinity: 'strong',
    topIssues: ['Cost of living', 'Manufacturing revival'],
    description: "Highly educated, tech-savvy. Active on X and WhatsApp. Strong LP affinity due to Obi's digital-economy narrative.",
  },
  {
    id: 'vc2',
    name: 'Market traders (Onitsha)',
    size: 58_000,
    ageRange: '30-50',
    lpAffinity: 'leaning',
    topIssues: ['Naira reform', 'Insecurity'],
    description: 'Business-minded, economy-focused. Swing toward LP if security messaging is strong. Reachable via Onitsha Main Market networks.',
  },
  {
    id: 'vc3',
    name: 'Rural farmers (Ogbaru)',
    size: 36_000,
    ageRange: '35-60',
    lpAffinity: 'swing',
    topIssues: ['Education funding', 'Insecurity'],
    description: 'Traditionally APC-leaning but softening. Turnout is the key risk — historically underperforms by 12 pts.',
  },
  {
    id: 'vc4',
    name: 'Diaspora returnees',
    size: 12_000,
    ageRange: '28-45',
    lpAffinity: 'strong',
    topIssues: ['Manufacturing revival', 'Soludo–LP alignment'],
    description: 'High-value cluster. Influential in social networks and willing to fund grassroots activities.',
  },
  {
    id: 'vc5',
    name: 'APGA loyalists',
    size: 24_000,
    ageRange: '40-65',
    lpAffinity: 'opposed',
    topIssues: ['Soludo–LP alignment'],
    description: 'Core APGA base. Not a conversion target but important to neutralize through shared governance messaging.',
  },
];

export function useVoterClusters() {
  const { sessionId } = useDemoSession();
  return useQuery<VoterCluster[]>({
    queryKey: ['voter-clusters'],
    queryFn: () => demoClient.get<VoterCluster[]>(DEMO_EP.VOTER_CLUSTERS, sessionId ?? undefined),
    placeholderData: MOCK,
  });
}
