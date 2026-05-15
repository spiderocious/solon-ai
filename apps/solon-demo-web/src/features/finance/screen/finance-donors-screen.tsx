import { Avatar, Button, SkeletonCard } from '@solon/ui';
import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { Donor } from '@shared/types/mock-data.types';

const TH_CLS = 'font-mono text-[10px] uppercase text-left px-3 py-2 border-b tracking-[0.08em]';
const TD_CLS = 'font-sans text-[13px] px-3 py-3 border-b';

const MOCK: Donor[] = [
  { id: 'd1', name: 'Okafor & Associates Ltd.', amount: 25_000_000, date: '2026-04-14', method: 'Transfer', verified: true },
  { id: 'd2', name: 'Anonymous trust', amount: 4_800_000, date: '2026-05-02', method: 'Cash', verified: false },
  { id: 'd3', name: 'Chukwu Investments', amount: 50_000_000, date: '2026-03-20', method: 'Transfer', verified: true },
  { id: 'd4', name: 'Adaeze Okonkwo', amount: 2_000_000, date: '2026-05-08', method: 'Transfer', verified: true },
  { id: 'd5', name: 'Nwosu Holdings', amount: 15_000_000, date: '2026-04-01', method: 'Cheque', verified: true },
];

function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

function formatNaira(n: number): string {
  if (n >= 1_000_000_000) return `₦ ${(n / 1_000_000_000).toFixed(2)}bn`;
  if (n >= 1_000_000) return `₦ ${(n / 1_000_000).toFixed(0)}m`;
  return `₦ ${n.toLocaleString()}`;
}

export default function FinanceDonorsScreen() {
  const { sessionId } = useDemoSession();
  const { data, isLoading } = useQuery<Donor[]>({
    queryKey: ['finance-donors'],
    queryFn: () => demoClient.getMock<Donor[]>(MOCK_KEY.FINANCE_DONORS, sessionId ?? undefined),
    placeholderData: MOCK,
  });
  const donors = data ?? MOCK;

  const totalDonated = donors.reduce((s, d) => s + d.amount, 0);
  const flaggedCount = donors.filter((d) => !d.verified).length;

  if (isLoading && !data) {
    return (
      <div className="p-6 flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8">
      <div className="mb-5 flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-serif font-semibold text-[20px]" style={{ color: 'var(--ink)' }}>Donor register</h2>
          <p className="font-serif italic text-[13px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
            — {donors.length} donors · total {formatNaira(totalDonated)}
          </p>
        </div>
        {flaggedCount > 0 && (
          <div className="px-3 py-1.5 rounded-[4px] font-mono text-[10px]" style={{ background: 'var(--orange-soft)', color: 'var(--orange)', border: '1px solid var(--orange)' }}>
            ⚑ {flaggedCount} high-risk {flaggedCount === 1 ? 'entry' : 'entries'}
          </div>
        )}
      </div>

      <div className="rounded-[6px] overflow-hidden border" style={{ borderColor: 'var(--hair)' }}>
        <style>{`.donors-table tbody tr:hover td { background: var(--paper-2); }`}</style>
        <div className="overflow-x-auto">
          <table className="donors-table w-full border-collapse">
            <thead>
              <tr style={{ background: 'var(--paper-2)' }}>
                {['Donor', 'Method', 'Date', 'Amount', 'Risk', ''].map((h, i) => (
                  <th
                    key={`${h}-${i}`}
                    className={TH_CLS}
                    style={{ color: 'var(--ink-3)', borderColor: 'var(--hair)', textAlign: i === 3 ? 'right' : 'left' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => {
                const flagged = !donor.verified;
                return (
                  <tr
                    key={donor.id}
                    style={{
                      background: flagged ? 'var(--orange-soft)' : undefined,
                      borderLeft: flagged ? '3px solid var(--orange)' : undefined,
                    }}
                  >
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      <div className="flex items-center gap-2">
                        <Avatar initials={getInitials(donor.name)} size="sm" variant={flagged ? 'orange' : undefined} />
                        <span className="font-sans text-[13px]" style={{ color: 'var(--ink)' }}>{donor.name}</span>
                      </div>
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)' }}>
                      {donor.method}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)' }}>
                      {new Date(donor.date).toLocaleDateString('en-NG', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 12, color: flagged ? 'var(--orange)' : 'var(--ink)' }}>
                      {formatNaira(donor.amount)}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      {flagged ? (
                        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-[3px]" style={{ background: 'var(--orange)', color: 'white' }}>
                          HIGH RISK
                        </span>
                      ) : (
                        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-[3px]" style={{ background: 'var(--forest-50)', color: 'var(--forest-700)' }}>
                          VERIFIED
                        </span>
                      )}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      {flagged && <Button variant="warn" size="sm">Review</Button>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
