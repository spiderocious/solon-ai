import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { IssueTrend } from '@shared/types/mock-data.types';

const MOCK: IssueTrend[] = [
  {
    id: 'i1',
    name: 'Cost of living',
    salience: 92,
    delta: 14,
    trend: 'rising',
    sources: [{ name: 'Radio call-in', share: 52 }, { name: 'Nairaland', share: 24 }, { name: 'X', share: 18 }, { name: 'WhatsApp', share: 6 }],
    weekData: [{ week: 'Apr 7', salience: 78 }, { week: 'Apr 14', salience: 81 }, { week: 'Apr 21', salience: 85 }, { week: 'Apr 28', salience: 88 }, { week: 'May 5', salience: 92 }],
  },
  {
    id: 'i2',
    name: 'Insecurity · Onitsha',
    salience: 71,
    delta: 22,
    trend: 'rising',
    sources: [{ name: 'Radio call-in', share: 44 }, { name: 'X', share: 32 }, { name: 'Nairaland', share: 16 }, { name: 'WhatsApp', share: 8 }],
    weekData: [{ week: 'Apr 7', salience: 49 }, { week: 'Apr 14', salience: 55 }, { week: 'Apr 21', salience: 62 }, { week: 'Apr 28', salience: 68 }, { week: 'May 5', salience: 71 }],
  },
  {
    id: 'i3',
    name: 'Manufacturing revival',
    salience: 58,
    delta: 0,
    trend: 'steady',
    sources: [{ name: 'Nairaland', share: 41 }, { name: 'Radio call-in', share: 34 }, { name: 'X', share: 25 }],
    weekData: [{ week: 'Apr 7', salience: 57 }, { week: 'Apr 14', salience: 58 }, { week: 'Apr 21', salience: 57 }, { week: 'Apr 28', salience: 58 }, { week: 'May 5', salience: 58 }],
  },
  {
    id: 'i4',
    name: 'Soludo–LP alignment',
    salience: 42,
    delta: 38,
    trend: 'rising',
    sources: [{ name: 'X', share: 58 }, { name: 'Nairaland', share: 28 }, { name: 'Radio call-in', share: 14 }],
    weekData: [{ week: 'Apr 7', salience: 4 }, { week: 'Apr 14', salience: 12 }, { week: 'Apr 21', salience: 24 }, { week: 'Apr 28', salience: 36 }, { week: 'May 5', salience: 42 }],
  },
  {
    id: 'i5',
    name: 'Education funding',
    salience: 36,
    delta: -8,
    trend: 'falling',
    sources: [{ name: 'Radio call-in', share: 48 }, { name: 'Nairaland', share: 32 }, { name: 'X', share: 20 }],
    weekData: [{ week: 'Apr 7', salience: 44 }, { week: 'Apr 14', salience: 42 }, { week: 'Apr 21', salience: 40 }, { week: 'Apr 28', salience: 38 }, { week: 'May 5', salience: 36 }],
  },
];

export function useVoterIssues() {
  const { sessionId } = useDemoSession();
  return useQuery<IssueTrend[]>({
    queryKey: ['voter-issues'],
    queryFn: () => demoClient.get<IssueTrend[]>(DEMO_EP.VOTER_ISSUES, sessionId ?? undefined),
    placeholderData: MOCK,
  });
}
