import { Button, OfficialStamp, SkeletonCard } from '@solon/ui';
import { useFinanceSummary } from '../api/use-finance-summary';

function formatNaira(n: number): string {
  if (n >= 1_000_000_000) return `₦ ${(n / 1_000_000_000).toFixed(2)}bn`;
  if (n >= 1_000_000) return `₦ ${(n / 1_000_000).toFixed(0)}m`;
  return `₦ ${n.toLocaleString()}`;
}

export default function FinanceDashboardScreen() {
  const { data, isLoading } = useFinanceSummary();
  const s = data;

  if (isLoading && !s) {
    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!s) return null;

  const spentPct = (s.total_spent_naira / s.total_cap_naira) * 100;
  const hasWarnings = s.alerts.filter((a) => a.type === 'warning').length;

  return (
    <div className="p-5 md:p-8 max-w-[960px]">
      {/* Statement header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 mb-6 border-b gap-3" style={{ borderColor: 'var(--ink)' }}>
        <div>
          <h1 className="font-serif font-bold text-[22px] md:text-[28px]" style={{ color: 'var(--ink)' }}>
            Statement of campaign expenditure
          </h1>
          <p className="font-serif italic text-[12px] mt-1 max-w-[55ch]" style={{ color: 'var(--ink-3)' }}>
            — under INEC Electoral Act statutory spending cap · 2027 presidential election.
          </p>
        </div>
        <div className="font-mono text-[11px] sm:text-right shrink-0" style={{ color: 'var(--ink-3)' }}>
          <div>AFP · Presidential</div>
          <div>Campaign Manager: {/* from candidate profile */} Ngozi Eze</div>
          <div>Next return due: <span className="font-medium" style={{ color: 'var(--forest-700)' }}>{s.next_deadline_label}</span></div>
          <div>In <span className="font-medium" style={{ color: 'var(--orange)' }}>{s.days_to_next_inec_deadline} days</span></div>
        </div>
      </div>

      {/* Top grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* INEC Cap card */}
        <div className="sm:col-span-1 rounded-[6px] p-4" style={{ border: '2px solid var(--ink)' }}>
          <div className="font-mono text-[9px]" style={{ color: 'var(--ink-3)' }}>INEC STATUTORY CAP · PRESIDENTIAL</div>
          <div className="flex items-baseline gap-2 mt-1 flex-wrap">
            <span className="font-serif font-bold text-[26px]" style={{ color: 'var(--forest-700)' }}>
              {formatNaira(s.total_spent_naira)}
            </span>
            <span className="text-[13px]" style={{ color: 'var(--ink-3)' }}>
              of {formatNaira(s.total_cap_naira)} · {spentPct.toFixed(0)}%
            </span>
          </div>
          <div className="h-2 rounded mt-2 relative" style={{ background: 'var(--hair)' }}>
            <div className="absolute left-0 top-0 h-full rounded" style={{ width: `${spentPct}%`, background: 'var(--forest-600)' }} />
            <div className="absolute top-0 h-full w-px" style={{ left: '75%', background: 'var(--crit)' }} />
          </div>
          <div className="font-mono text-[10px] mt-2" style={{ color: 'var(--ink-4)' }}>
            Headroom: {formatNaira(s.total_cap_naira - s.total_spent_naira)}
          </div>
        </div>

        {/* Alerts */}
        <div className="rounded-[6px] p-4" style={{ border: `1px solid ${hasWarnings ? 'var(--orange)' : 'var(--hair)'}`, background: hasWarnings ? 'var(--orange-soft)' : 'var(--sheet)' }}>
          <div className="font-mono text-[9px] uppercase" style={{ color: hasWarnings ? 'var(--orange)' : 'var(--ink-3)' }}>Open alerts</div>
          <div className="font-serif font-bold text-[28px]" style={{ color: hasWarnings ? 'var(--orange)' : 'var(--forest-700)' }}>
            {s.alerts.length}
          </div>
          {s.alerts[0] && (
            <div className="font-sans text-[12px] mt-1" style={{ color: 'var(--ink-3)' }}>
              {s.alerts[0].message}
            </div>
          )}
        </div>

        {/* Projected final */}
        <div className="rounded-[6px] p-4" style={{ border: '1px solid var(--hair)' }}>
          <div className="font-mono text-[9px] uppercase" style={{ color: 'var(--ink-3)' }}>Projected final spend</div>
          <div className="font-serif font-bold text-[28px]" style={{ color: s.projected_final_naira > s.total_cap_naira ? 'var(--crit)' : 'var(--ink)' }}>
            {formatNaira(s.projected_final_naira)}
          </div>
          <div className="font-sans text-[12px] mt-1" style={{ color: 'var(--ink-3)' }}>
            {s.projected_final_naira > s.total_cap_naira
              ? `⚑ Exceeds cap by ${formatNaira(s.projected_final_naira - s.total_cap_naira)}`
              : `Under cap — ${formatNaira(s.total_cap_naira - s.projected_final_naira)} headroom`}
          </div>
        </div>
      </div>

      {/* Sub-cap usage */}
      <div className="rounded-[6px] p-4 mb-6" style={{ border: '1px solid var(--hair)' }}>
        <div className="flex items-baseline gap-2 mb-4 flex-wrap">
          <h3 className="font-sans font-medium text-[14px]" style={{ color: 'var(--ink)' }}>Spend by category</h3>
          <span className="font-serif italic text-[12px]" style={{ color: 'var(--ink-3)' }}>— marker at 75% triggers alert.</span>
        </div>
        {s.spending_by_category.map(({ category, amount_naira, sub_cap_naira, pct_of_sub_cap }) => {
          const warn = pct_of_sub_cap >= 50;
          return (
            <div
              key={category}
              className="grid items-center gap-2 py-2 border-b"
              style={{ gridTemplateColumns: '140px 1fr 80px 40px', borderColor: 'var(--hair)' }}
            >
              <div>
                <div className="font-sans text-[12px]" style={{ color: 'var(--ink)' }}>{category}</div>
                <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>cap {formatNaira(sub_cap_naira)}</div>
              </div>
              <div className="relative h-1.5 rounded" style={{ background: 'var(--hair)' }}>
                <div
                  className="absolute left-0 top-0 h-full rounded"
                  style={{ width: `${pct_of_sub_cap}%`, background: warn ? 'var(--orange)' : 'var(--forest-600)' }}
                />
                <div className="absolute top-0 h-full w-px" style={{ left: '75%', background: 'var(--crit)', opacity: 0.4 }} />
              </div>
              <span className="font-mono text-[10px]" style={{ color: 'var(--ink)' }}>{formatNaira(amount_naira)}</span>
              <span className="font-mono text-[10px]" style={{ color: warn ? 'var(--orange)' : 'var(--ink)' }}>
                {pct_of_sub_cap}%{warn ? ' ⚑' : ''}
              </span>
            </div>
          );
        })}
      </div>

      {/* Signature block */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 mt-2 border-t gap-4 flex-wrap"
        style={{ borderColor: 'var(--ink)' }}
      >
        <div>
          <div className="font-serif text-[16px]" style={{ color: 'var(--ink)' }}>Ngozi Eze</div>
          <div className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>Campaign Manager · sig. on file</div>
        </div>
        <OfficialStamp variant="verified" meta="2026-05-15" />
        <OfficialStamp variant="simulation" meta="DRAFT" />
        <Button variant="quiet" size="sm">Export PDF</Button>
      </div>
    </div>
  );
}
