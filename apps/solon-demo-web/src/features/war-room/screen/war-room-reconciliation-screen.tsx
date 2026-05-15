import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@solon/ui';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { TallyEntry } from '@shared/types/mock-data.types';

const MOCK: TallyEntry[] = [
  { puId: 'PU/AN/ONN/03/001', puName: 'St Mary\'s Primary School', lga: 'Onitsha North', lpVotes: 284, apcVotes: 112, pdpVotes: 48, otherVotes: 18, totalVotes: 462, accredited: 498, timestamp: '2027-02-20T15:22:00Z', status: 'verified' },
  { puId: 'PU/AN/ONN/03/002', puName: 'Onitsha Town Hall', lga: 'Onitsha North', lpVotes: 321, apcVotes: 98, pdpVotes: 52, otherVotes: 22, totalVotes: 493, accredited: 512, timestamp: '2027-02-20T15:45:00Z', status: 'submitted' },
  { puId: 'PU/AN/OYI/04/003', puName: 'Oyi Grammar School', lga: 'Oyi', lpVotes: 441, apcVotes: 88, pdpVotes: 31, otherVotes: 12, totalVotes: 572, accredited: 610, timestamp: '2027-02-20T16:10:00Z', status: 'verified' },
  { puId: 'PU/AN/OGB/02/001', puName: 'Ogbaru Town Square', lga: 'Ogbaru', lpVotes: 182, apcVotes: 198, pdpVotes: 88, otherVotes: 34, totalVotes: 502, accredited: 520, timestamp: '2027-02-20T16:30:00Z', status: 'disputed' },
];

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  verified: { bg: 'var(--forest-50)', text: 'var(--forest-700)', label: 'Verified' },
  submitted: { bg: 'var(--paper-2)', text: 'var(--ink-3)', label: 'Submitted' },
  pending: { bg: '#FFF3E0', text: 'var(--orange)', label: 'Pending' },
  disputed: { bg: '#FEE2E2', text: 'var(--crit, #ef4444)', label: 'Disputed' },
};

export default function WarRoomReconciliationScreen() {
  const { sessionId } = useDemoSession();
  const { data, isLoading } = useQuery<TallyEntry[]>({
    queryKey: ['war-room-reconciliation'],
    queryFn: () => demoClient.get<TallyEntry[]>(DEMO_EP.WAR_ROOM_TALLY, sessionId ?? undefined),
    placeholderData: MOCK,
  });

  const entries = data ?? MOCK;

  return (
    <div className="flex flex-col gap-4 max-w-[900px]">
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--hair)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: 'var(--paper-2)' }}>
              {['PU', 'LGA', 'LP', 'APC', 'PDP', 'Total', 'Status'].map((h) => (
                <th key={h} className="font-mono text-[10px] uppercase tracking-[0.08em] text-left px-4 py-3" style={{ color: 'var(--ink-3)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && !data
              ? Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} style={{ borderTop: '1px solid var(--hair)' }}>
                  {Array.from({ length: 7 }).map((__, j) => (
                    <td key={j} className="px-4 py-3"><Skeleton className="h-4" /></td>
                  ))}
                </tr>
              ))
              : entries.map((e) => {
                const s = STATUS_STYLES[e.status] ?? { bg: '#FFF3E0', text: 'var(--orange)', label: 'Pending' };
                return (
                  <tr key={e.puId} style={{ borderTop: '1px solid var(--hair)', background: 'var(--paper)' }}>
                    <td className="px-4 py-3">
                      <div className="font-sans text-[12px]" style={{ color: 'var(--ink-2)' }}>{e.puName}</div>
                      <div className="font-mono text-[9px]" style={{ color: 'var(--ink-4)' }}>{e.puId}</div>
                    </td>
                    <td className="px-4 py-3 font-sans text-[12px]" style={{ color: 'var(--ink-3)' }}>{e.lga}</td>
                    <td className="px-4 py-3 font-mono text-[12px] font-medium" style={{ color: 'var(--forest-600)' }}>{e.lpVotes}</td>
                    <td className="px-4 py-3 font-mono text-[12px]" style={{ color: 'var(--ink-3)' }}>{e.apcVotes}</td>
                    <td className="px-4 py-3 font-mono text-[12px]" style={{ color: 'var(--ink-3)' }}>{e.pdpVotes}</td>
                    <td className="px-4 py-3 font-mono text-[12px]" style={{ color: 'var(--ink-2)' }}>{e.totalVotes}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full font-mono text-[10px]" style={{ background: s.bg, color: s.text }}>{s.label}</span>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
