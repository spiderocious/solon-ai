import { OfficialStamp } from '@solon/ui';
import { useFinanceSummary } from '../api/use-finance-summary';
import { ErrorState } from '@shared/components/error-state';
import { ScreenSkeleton } from '@shared/components/screen-skeleton';

const COMPLIANCE_ITEMS = [
  { id: 'c1', title: 'Q1 2026 returns filed', subtitle: 'Submitted 10 Apr 2026 · accepted by INEC', status: 'ok' as const },
  { id: 'c2', title: 'Q2 2026 returns', subtitle: 'Due 10 Jul 2026 · 56 days remaining', status: 'pending' as const },
  { id: 'c3', title: 'Anonymous cash donations declared', subtitle: 'Entry on 02 May 2026 flagged for review', status: 'warn' as const },
  { id: 'c4', title: 'Donor verification (§ 88 schedule 3)', subtitle: 'All transfers verified · 1 cash entry pending', status: 'warn' as const },
  { id: 'c5', title: 'Statutory cap compliance', subtitle: '52% of cap used · on track · headroom ₦ 1.93bn', status: 'ok' as const },
  { id: 'c6', title: 'Subcap category filing', subtitle: 'All 6 categories within limit', status: 'ok' as const },
];

const FILINGS = [
  { label: 'Q1 return', date: '10 Apr 2026', status: 'Filed' as const, stamp: true },
  { label: 'Q2 return', date: '10 Jul 2026', status: 'Pending' as const, stamp: false },
  { label: 'Final return', date: '20 Apr 2027', status: 'Future' as const, stamp: false },
];

const STATUS_STYLE: Record<'ok' | 'pending' | 'warn', { bg: string; border: string; icon: string; color: string }> = {
  ok: { bg: 'var(--forest-50)', border: 'var(--forest-600)', icon: '✓', color: 'var(--forest-700)' },
  pending: { bg: 'var(--paper-2)', border: 'var(--hair)', icon: '○', color: 'var(--ink-3)' },
  warn: { bg: 'var(--orange-soft)', border: 'var(--orange)', icon: '⚑', color: 'var(--orange)' },
};

export default function FinanceComplianceScreen() {
  const { data: s, isLoading, isError, refetch } = useFinanceSummary();

  if (isLoading) return <ScreenSkeleton rows={3} />;
  if (isError || !s) return <ErrorState message="Could not load compliance data." onRetry={() => void refetch()} />;

  const complianceScore = s
    ? Math.round(
        100 -
          (s.alerts.length * 5) -
          (s.total_spent_naira / s.total_cap_naira > 0.75 ? 10 : 0)
      )
    : 82;

  return (
    <div
      className="flex flex-col md:grid min-h-full"
      style={{ gridTemplateColumns: '280px 1fr' }}
    >
      {/* Left — compliance score */}
      <div className="border-b md:border-b-0 md:border-r p-5 flex flex-col gap-5" style={{ borderColor: 'var(--hair)' }}>
        <div>
          <h2 className="font-serif font-semibold text-[18px]" style={{ color: 'var(--ink)' }}>Compliance</h2>
          <p className="font-serif italic text-[12px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
            — Electoral Act § 88 · INEC regulations
          </p>
        </div>

        {/* Score */}
        <div className="rounded-[6px] p-5 flex flex-col items-center" style={{ background: 'var(--sheet)', border: `1px solid ${complianceScore >= 80 ? 'var(--forest-600)' : 'var(--orange)'}` }}>
          <div className="font-mono text-[9px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>Compliance score</div>
          <div
            className="font-serif font-bold leading-none"
            style={{ fontSize: 72, color: complianceScore >= 80 ? 'var(--forest-600)' : 'var(--orange)' }}
          >
            {complianceScore}
          </div>
          <div className="font-mono text-[12px]" style={{ color: 'var(--ink-4)' }}>/100</div>
          <div className="w-full h-2 rounded-full overflow-hidden mt-3" style={{ background: 'var(--hair)' }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${complianceScore}%`, background: complianceScore >= 80 ? 'var(--forest-600)' : 'var(--orange)' }}
            />
          </div>
        </div>

        {/* Filing timeline */}
        <div>
          <h3 className="font-mono text-[9px] uppercase mb-3" style={{ color: 'var(--ink-3)' }}>Filing timeline</h3>
          <div className="space-y-3">
            {FILINGS.map(({ label, date, status, stamp }) => (
              <div key={label} className="flex items-center justify-between">
                <div>
                  <div className="font-sans text-[12px] font-medium" style={{ color: 'var(--ink)' }}>{label}</div>
                  <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{date}</div>
                </div>
                {stamp ? (
                  <OfficialStamp variant="verified" meta={date} />
                ) : (
                  <span
                    className="font-mono text-[9px] px-1.5 py-0.5 rounded-[3px]"
                    style={{ background: status === 'Pending' ? 'var(--orange-soft)' : 'var(--paper-2)', color: status === 'Pending' ? 'var(--orange)' : 'var(--ink-4)', border: `1px solid ${status === 'Pending' ? 'var(--orange)' : 'var(--hair)'}` }}
                  >
                    {status.toUpperCase()}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — checklist */}
      <div className="p-5 md:p-6">
        <h3 className="font-sans font-semibold text-[14px] mb-4" style={{ color: 'var(--ink)' }}>Compliance checklist</h3>

        <div className="space-y-3">
          {COMPLIANCE_ITEMS.map((item) => {
            const style = STATUS_STYLE[item.status];
            return (
              <div
                key={item.id}
                className="rounded-[6px] px-4 py-3 flex items-center gap-3"
                style={{ background: style.bg, border: `1px solid ${style.border}` }}
              >
                <div
                  className="w-6 h-6 rounded-[4px] flex items-center justify-center font-mono text-[12px] shrink-0"
                  style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}
                >
                  {style.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>{item.title}</div>
                  <div className="font-serif italic text-[11px] mt-0.5" style={{ color: 'var(--ink-3)' }}>{item.subtitle}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="rounded-[4px] px-4 py-3 mt-5"
          style={{ background: 'var(--forest-50)', borderTop: '3px solid var(--forest-600)' }}
        >
          <div className="font-mono text-[9px] uppercase mb-1" style={{ color: 'var(--forest-700)' }}>Solon · compliance intelligence</div>
          <p className="font-serif italic text-[12px]" style={{ color: 'var(--ink-2)' }}>
            Q2 return due 10 Jul 2026. Address the anonymous cash entry before filing to avoid INEC query under § 88(3).
          </p>
        </div>
      </div>
    </div>
  );
}
