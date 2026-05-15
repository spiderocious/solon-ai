import { useQuery } from '@tanstack/react-query';
import { SkeletonCard, StatusPill } from '@solon/ui';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { TallyEntry } from '@shared/types/mock-data.types';

const TH_CLS = 'font-mono text-[10px] uppercase text-left px-3 py-2 border-b tracking-[0.08em]';
const TD_CLS = 'font-sans text-[13px] px-3 py-3 border-b';

const MOCK: TallyEntry[] = [
  { puId: 'PU/AN/ONN/03/001', puName: "St Mary's Primary School", lga: 'Onitsha North', lpVotes: 284, apcVotes: 112, pdpVotes: 48, otherVotes: 18, totalVotes: 462, accredited: 498, timestamp: '2027-02-20T15:22:00Z', status: 'verified' },
  { puId: 'PU/AN/ONN/03/002', puName: 'Onitsha Town Hall', lga: 'Onitsha North', lpVotes: 321, apcVotes: 98, pdpVotes: 52, otherVotes: 22, totalVotes: 493, accredited: 512, timestamp: '2027-02-20T15:45:00Z', status: 'submitted' },
  { puId: 'PU/AN/OYI/04/003', puName: 'Oyi Grammar School', lga: 'Oyi', lpVotes: 441, apcVotes: 88, pdpVotes: 31, otherVotes: 12, totalVotes: 572, accredited: 610, timestamp: '2027-02-20T16:10:00Z', status: 'verified' },
  { puId: 'PU/AN/OGB/02/001', puName: 'Ogbaru Town Square', lga: 'Ogbaru', lpVotes: 182, apcVotes: 198, pdpVotes: 88, otherVotes: 34, totalVotes: 502, accredited: 520, timestamp: '2027-02-20T16:30:00Z', status: 'disputed' },
];

const STATUS_PILL: Record<string, { variant: 'ok' | 'warn' | 'crit' | 'quiet'; label: string }> = {
  verified: { variant: 'ok', label: 'Verified' },
  submitted: { variant: 'quiet', label: 'Submitted' },
  pending: { variant: 'warn', label: 'Pending' },
  disputed: { variant: 'crit', label: 'Disputed' },
};

export default function WarRoomReconciliationScreen() {
  const { sessionId } = useDemoSession();
  const { data, isLoading } = useQuery<TallyEntry[]>({
    queryKey: ['war-room-reconciliation'],
    queryFn: () => demoClient.get<TallyEntry[]>(DEMO_EP.WAR_ROOM_TALLY, sessionId ?? undefined),
    placeholderData: MOCK,
  });

  const entries = data ?? MOCK;
  const verifiedCount = entries.filter((e) => e.status === 'verified').length;
  const disputedCount = entries.filter((e) => e.status === 'disputed').length;

  if (isLoading && !data) {
    return (
      <div className="p-6 flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  return (
    <div className="p-5 md:p-6">
      <div className="mb-5 flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-serif font-semibold text-[20px]" style={{ color: 'var(--ink)' }}>Reconciliation</h2>
          <p className="font-serif italic text-[13px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
            — {entries.length} PUs · {verifiedCount} verified
            {disputedCount > 0 && ` · ${disputedCount} disputed`}
          </p>
        </div>
        <div className="flex gap-2">
          {disputedCount > 0 && (
            <div className="px-3 py-1.5 rounded-[4px] font-mono text-[10px]" style={{ background: '#FEE2E2', color: 'var(--crit)', border: '1px solid var(--crit)' }}>
              ⚑ {disputedCount} disputed
            </div>
          )}
        </div>
      </div>

      <div className="rounded-[6px] overflow-hidden border" style={{ borderColor: 'var(--hair)' }}>
        <style>{`.recon-table tbody tr:hover td { background: var(--paper-2); }`}</style>
        <div className="overflow-x-auto">
          <table className="recon-table w-full border-collapse">
            <thead>
              <tr style={{ background: 'var(--paper-2)' }}>
                {['Polling unit', 'LGA', 'LP', 'APC', 'PDP', 'Total / Accredited', 'Time', 'Status'].map((h, i) => (
                  <th
                    key={h}
                    className={TH_CLS}
                    style={{ color: 'var(--ink-3)', borderColor: 'var(--hair)', textAlign: i >= 2 && i <= 5 ? 'right' : 'left' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => {
                const pill = (STATUS_PILL[e.status] ?? STATUS_PILL['pending'])!;
                const isDisputed = e.status === 'disputed';
                return (
                  <tr
                    key={e.puId}
                    style={{
                      background: isDisputed ? '#FEF2F2' : undefined,
                      borderLeft: isDisputed ? '3px solid var(--crit)' : undefined,
                    }}
                  >
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      <div className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>{e.puName}</div>
                      <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{e.puId}</div>
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-3)' }}>
                      {e.lga}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 12, color: 'var(--forest-600)' }}>
                      {e.lpVotes}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)' }}>
                      {e.apcVotes}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)' }}>
                      {e.pdpVotes}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right' }}>
                      <span className="font-mono font-semibold text-[12px]" style={{ color: 'var(--ink-2)' }}>{e.totalVotes}</span>
                      <span className="font-mono text-[10px] ml-1" style={{ color: 'var(--ink-4)' }}>/ {e.accredited}</span>
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-4)', whiteSpace: 'nowrap' }}>
                      {new Date(e.timestamp).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      <StatusPill variant={pill.variant} label={pill.label} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="font-serif italic text-[12px] mt-4" style={{ color: 'var(--ink-4)' }}>
        Form 8A data · IReV upload verification · Solon Intelligence · 20 Feb 2027
      </p>
    </div>
  );
}
