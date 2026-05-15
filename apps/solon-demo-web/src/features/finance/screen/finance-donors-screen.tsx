import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { Donor } from '@shared/types/mock-data.types';
import { ErrorState } from '@shared/components/error-state';
import { ScreenSkeleton } from '@shared/components/screen-skeleton';

const TH_CLS = 'font-mono text-[10px] uppercase text-left px-3 py-2 border-b tracking-[0.08em]';
const TD_CLS = 'font-sans text-[13px] px-3 py-3 border-b';

function formatNaira(n: number): string {
  if (n >= 1_000_000_000) return `₦ ${(n / 1_000_000_000).toFixed(2)}bn`;
  if (n >= 1_000_000) return `₦ ${(n / 1_000_000).toFixed(0)}m`;
  return `₦ ${n.toLocaleString()}`;
}

function riskColor(score: Donor['risk_score']): { color: string; bg: string; border: string } {
  if (score === 'High') return { color: 'var(--crit)', bg: '#FEE2E2', border: 'var(--crit)' };
  if (score === 'Medium') return { color: 'var(--orange)', bg: 'var(--orange-soft)', border: 'var(--orange)' };
  return { color: 'var(--forest-700)', bg: 'var(--forest-50)', border: 'var(--forest-600)' };
}

export default function FinanceDonorsScreen() {
  const { sessionId } = useDemoSession();
  const { data: donors, isLoading, isError, refetch } = useQuery<Donor[]>({
    queryKey: ['finance-donors'],
    queryFn: () => demoClient.getMock<Donor[]>(MOCK_KEY.FINANCE_DONORS, sessionId ?? undefined),
    retry: 2,
  });

  if (isLoading) return <ScreenSkeleton rows={4} />;
  if (isError || !donors) return <ErrorState message="Could not load donor records." onRetry={() => void refetch()} />;

  const totalDonated = donors.reduce((s, d) => s + d.amount_naira, 0);
  const flaggedCount = donors.filter((d) => d.flagged).length;
  const highRiskCount = donors.filter((d) => d.risk_score === 'High').length;

  return (
    <div className="p-5 md:p-8">
      <div className="mb-5 flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-serif font-semibold text-[20px]" style={{ color: 'var(--ink)' }}>Donors</h2>
          <p className="font-serif italic text-[13px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
            — {donors.length} records · total {formatNaira(totalDonated)}
            {flaggedCount > 0 && ` · ${flaggedCount} flagged`}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {highRiskCount > 0 && (
            <div className="px-3 py-1.5 rounded-[4px] font-mono text-[10px]" style={{ background: '#FEE2E2', color: 'var(--crit)', border: '1px solid var(--crit)' }}>
              ⚑ {highRiskCount} high risk
            </div>
          )}
        </div>
      </div>

      <div className="rounded-[6px] overflow-hidden border" style={{ borderColor: 'var(--hair)' }}>
        <style>{`.donors-table tbody tr:hover td { background: var(--paper-2); }`}</style>
        <div className="overflow-x-auto">
          <table className="donors-table w-full border-collapse">
            <thead>
              <tr style={{ background: 'var(--paper-2)' }}>
                {['Donor', 'Date', 'Amount', 'Risk', 'Source'].map((h, i) => (
                  <th
                    key={h}
                    className={TH_CLS}
                    style={{ color: 'var(--ink-3)', borderColor: 'var(--hair)', textAlign: i === 2 ? 'right' : 'left' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {donors.map((d) => {
                const risk = riskColor(d.risk_score);
                return (
                  <tr
                    key={d.id}
                    style={{ background: d.flagged ? '#FEF2F2' : undefined, borderLeft: d.flagged ? '3px solid var(--crit)' : undefined }}
                  >
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      <div className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>{d.name}</div>
                      {d.flag_reason && (
                        <div className="font-serif italic text-[11px] mt-0.5" style={{ color: 'var(--crit)' }}>
                          ⚑ {d.flag_reason}
                        </div>
                      )}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-4)', whiteSpace: 'nowrap' }}>
                      {d.date}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 13, color: 'var(--ink-2)' }}>
                      {formatNaira(d.amount_naira)}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      <span
                        className="px-2 py-0.5 font-mono text-[10px] rounded-[3px]"
                        style={{ background: risk.bg, color: risk.color, border: `1px solid ${risk.border}` }}
                      >
                        {d.risk_score}
                      </span>
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', maxWidth: 200 }}>
                      <span className="font-sans text-[12px]" style={{ color: 'var(--ink-3)' }}>{d.source}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="font-serif italic text-[12px] mt-4" style={{ color: 'var(--ink-4)' }}>
        AFP donor KYC records · AML compliance · Solon Intelligence
      </p>
    </div>
  );
}
