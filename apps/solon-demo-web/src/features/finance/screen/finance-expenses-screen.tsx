import { SkeletonCard, StatusPill } from '@solon/ui';
import { useQuery } from '@tanstack/react-query';
import { demoClient } from '@shared/api/demo-client';
import { MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { Expense } from '@shared/types/mock-data.types';

const TH_CLS = 'font-mono text-[10px] uppercase text-left px-3 py-2 border-b tracking-[0.08em]';
const TD_CLS = 'font-sans text-[13px] px-3 py-3 border-b';

const MOCK: Expense[] = [
  { id: 'e1', category: 'Media · advertising', description: 'Radio spots — Onitsha FM Apr 2026', amount: 4_200_000, date: '2026-04-30', approvedBy: 'Chinwe Obi', receipt: true },
  { id: 'e2', category: 'Personnel · stipends', description: 'Field coordinator stipends — April', amount: 8_400_000, date: '2026-05-01', approvedBy: 'Chinwe Obi', receipt: true },
  { id: 'e3', category: 'Transport · logistics', description: 'Vehicles for ward canvassing', amount: 2_100_000, date: '2026-04-25', approvedBy: 'Funmi Okeke', receipt: false },
  { id: 'e4', category: 'Materials · printing', description: 'Flyers and posters — batch 3', amount: 1_800_000, date: '2026-05-03', approvedBy: 'Funmi Okeke', receipt: true },
  { id: 'e5', category: 'Convention · events', description: 'Ward 4 town hall logistics', amount: 3_500_000, date: '2026-05-08', approvedBy: 'Chinwe Obi', receipt: true },
];

function formatNaira(n: number): string {
  if (n >= 1_000_000_000) return `₦ ${(n / 1_000_000_000).toFixed(2)}bn`;
  if (n >= 1_000_000) return `₦ ${(n / 1_000_000).toFixed(1)}m`;
  return `₦ ${n.toLocaleString()}`;
}

export default function FinanceExpensesScreen() {
  const { sessionId } = useDemoSession();
  const { data, isLoading } = useQuery<Expense[]>({
    queryKey: ['finance-expenses'],
    queryFn: () => demoClient.getMock<Expense[]>(MOCK_KEY.FINANCE_EXPENSES, sessionId ?? undefined),
    placeholderData: MOCK,
  });
  const expenses = data ?? MOCK;

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const missingReceipts = expenses.filter((e) => !e.receipt).length;

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
          <h2 className="font-serif font-semibold text-[20px]" style={{ color: 'var(--ink)' }}>Expenses</h2>
          <p className="font-serif italic text-[13px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
            — {expenses.length} entries · total {formatNaira(totalExpenses)}
          </p>
        </div>
        {missingReceipts > 0 && (
          <div className="px-3 py-1.5 rounded-[4px] font-mono text-[10px]" style={{ background: 'var(--orange-soft)', color: 'var(--orange)', border: '1px solid var(--orange)' }}>
            ⚑ {missingReceipts} missing receipt{missingReceipts > 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div className="rounded-[6px] overflow-hidden border" style={{ borderColor: 'var(--hair)' }}>
        <style>{`.expenses-table tbody tr:hover td { background: var(--paper-2); }`}</style>
        <div className="overflow-x-auto">
          <table className="expenses-table w-full border-collapse">
            <thead>
              <tr style={{ background: 'var(--paper-2)' }}>
                {['Category', 'Description', 'Approved by', 'Date', 'Amount', 'Receipt'].map((h, i) => (
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
              {expenses.map((expense) => (
                <tr key={expense.id} style={{ background: !expense.receipt ? 'var(--orange-soft)' : undefined }}>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                    <span
                      className="font-mono text-[10px] px-1.5 py-0.5 rounded-[3px]"
                      style={{ background: 'var(--paper-2)', color: 'var(--ink-3)', border: '1px solid var(--hair)' }}
                    >
                      {expense.category}
                    </span>
                  </td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)' }}>
                    {expense.description}
                  </td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)' }}>
                    {expense.approvedBy}
                  </td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>
                    {new Date(expense.date).toLocaleDateString('en-NG', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 12, color: 'var(--ink)' }}>
                    {formatNaira(expense.amount)}
                  </td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                    <StatusPill variant={expense.receipt ? 'ok' : 'warn'} label={expense.receipt ? 'Filed' : 'Missing'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
