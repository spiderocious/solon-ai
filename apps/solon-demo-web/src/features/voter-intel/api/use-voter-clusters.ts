import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { VoterCluster } from '@shared/types/mock-data.types';

const MOCK: VoterCluster[] = [
  {
    id: 'cluster_1',
    name: 'Persuadable Urban South-West Youth',
    description: 'Low turnout history, Lagos + Ibadan + Abeokuta concentrated',
    size_millions: 4.2,
    dominant_states: ['Lagos', 'Oyo', 'Ogun'],
    top_issues: ['Cost of living', 'Unemployment', 'Education quality'],
    recommended_channel: 'Instagram/TikTok, street activations, NYSC networks',
    afp_reach_pct: 31,
  },
  {
    id: 'cluster_2',
    name: 'Rural North-West Party-Loyal',
    description: 'High turnout, historically APC/NNPP, mosque network influence',
    size_millions: 8.7,
    dominant_states: ['Kano', 'Kaduna', 'Katsina', 'Zamfara'],
    top_issues: ['Security/banditry', 'Agricultural support', 'Islamic governance'],
    recommended_channel: 'Traditional rulers, radio (Hausa), mosque announcements',
    afp_reach_pct: 18,
  },
  {
    id: 'cluster_3',
    name: 'South-East Mobilised Opposition',
    description: 'LP/ADC cross-voters, IPOB-influenced, historically low presidential turnout',
    size_millions: 3.8,
    dominant_states: ['Anambra', 'Imo', 'Abia', 'Enugu'],
    top_issues: ['Igbo presidency', 'Security (IPOB/ESN)', 'Economic marginalisation'],
    recommended_channel: 'Ohaneze networks, social media, diaspora remittance links',
    afp_reach_pct: 9,
  },
  {
    id: 'cluster_4',
    name: 'Middle Belt Swing',
    description: 'Security-sensitive, PDP legacy stronghold, farmer-herder conflict primary driver',
    size_millions: 5.1,
    dominant_states: ['Benue', 'Plateau', 'Nasarawa', 'Taraba'],
    top_issues: ['Farmer-herder conflict', 'Security', 'Infrastructure'],
    recommended_channel: 'Church networks, community radio, local chieftaincy',
    afp_reach_pct: 28,
  },
  {
    id: 'cluster_5',
    name: 'Urban North-Central Professionals',
    description: 'Economy-first, volatile, Abuja-based civil servants + SME owners',
    size_millions: 2.3,
    dominant_states: ['FCT', 'Niger', 'Kogi', 'Kwara'],
    top_issues: ['Naira stability', 'Business environment', 'Public sector salaries'],
    recommended_channel: 'LinkedIn, professional associations, business clubs',
    afp_reach_pct: 42,
  },
];

export function useVoterClusters() {
  const { sessionId } = useDemoSession();
  return useQuery<VoterCluster[]>({
    queryKey: ['voter-clusters'],
    queryFn: () => demoClient.getMock<VoterCluster[]>(MOCK_KEY.VOTER_INTEL_CLUSTERS, sessionId ?? undefined),
    placeholderData: MOCK,
  });
}
