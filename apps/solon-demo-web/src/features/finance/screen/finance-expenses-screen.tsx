import { StatusPill } from '@solon/ui';
import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { Expense } from '@shared/types/mock-data.types';
import { ErrorState } from '@shared/components/error-state';
import { ScreenSkeleton } from '@shared/components/screen-skeleton';

const TH_CLS = 'font-mono text-[10px] uppercase text-left px-3 py-2 border-b tracking-[0.08em]';
const TD_CLS = 'font-sans text-[13px] px-3 py-3 border-b';

const STATUS_PILL: Record<string, { variant: 'ok' | 'warn' | 'crit' | 'quiet'; label: string }> = {
  Approved: { variant: 'ok', label: 'Approved' },
  Pending:  { variant: 'warn', label: 'Pending' },
  Flagged:  { variant: 'crit', label: 'Flagged' },
};

function formatNaira(n: number): string {
  if (n >= 1_000_000_000) return `₦ ${(n / 1_000_000_000).toFixed(2)}bn`;
  if (n >= 1_000_000) return `₦ ${(n / 1_000_000).toFixed(1)}m`;
  return `₦ ${n.toLocaleString()}`;
}

export default function FinanceExpensesScreen() {
  const { sessionId } = useDemoSession();
  const { data: expenses, isLoading, isError, refetch } = useQuery<Expense[]>({
    queryKey: ['finance-expenses'],
    queryFn: () => demoClient.getMock<Expense[]>(MOCK_KEY.FINANCE_EXPENSES, sessionId ?? undefined),
    retry: 2,
  });

  if (isLoading) return <ScreenSkeleton rows={4} />;
  if (isError || !expenses) return <ErrorState message="Could not load expenses." onRetry={() => void refetch()} />;

  const totalExpenses = expenses.reduce((s, e) => s + e.amount_naira, 0);
  const flaggedCount = expenses.filter((e) => e.status === 'Flagged').length;

  return (
    <div className="p-5 md:p-8">
      <div className="mb-5 flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-serif font-semibold text-[20px]" style={{ color: 'var(--ink)' }}>Expenses</h2>
          <p className="font-serif italic text-[13px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
            — {expenses.length} records · total {formatNaira(totalExpenses)}
            {flaggedCount > 0 && ` · ${flaggedCount} flagged`}
          </p>
        </div>
        {flaggedCount > 0 && (
          <div className="px-3 py-1.5 rounded-[4px] font-mono text-[10px]" style={{ background: '#FEE2E2', color: 'var(--crit)', border: '1px solid var(--crit)' }}>
            ⚑ {flaggedCount} flagged
          </div>
        )}
      </div>

      <div className="rounded-[6px] overflow-hidden border" style={{ borderColor: 'var(--hair)' }}>
        <style>{`.expenses-table tbody tr:hover td { background: var(--paper-2); }`}</style>
        <div className="overflow-x-auto">
          <table className="expenses-table w-full border-collapse">
            <thead>
              <tr style={{ background: 'var(--paper-2)' }}>
                {['Date', 'Vendor', 'Category', 'LGA', 'Amount', 'Status'].map((h, i) => (
                  <th
                    key={h}
                    className={TH_CLS}
                    style={{ color: 'var(--ink-3)', borderColor: 'var(--hair)', textAlign: i === 4 ? 'right' : 'left' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {expenses.map((e) => {
                const pill = STATUS_PILL[e.status] ?? STATUS_PILL['Pending']!;
                return (
                  <tr key={e.id}>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-4)', whiteSpace: 'nowrap' }}>
                      {e.date}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      <div className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>{e.vendor}</div>
                      {e.note && (
                        <div className="font-serif italic text-[11px] mt-0.5" style={{ color: 'var(--orange)' }}>{e.note}</div>
                      )}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                      {e.category}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-4)', fontSize: 12 }}>
                      {e.lga}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 13, color: 'var(--ink-2)' }}>
                      {formatNaira(e.amount_naira)}
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
        AFP campaign expenditure records · INEC Electoral Act compliance · Solon Intelligence
      </p>
    </div>
  );
}
