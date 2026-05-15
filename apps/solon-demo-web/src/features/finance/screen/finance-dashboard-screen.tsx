import { Button, OfficialStamp, SkeletonCard } from '@solon/ui';
import { useFinanceSummary } from '../api/use-finance-summary';

const SUBCAP_ROWS = [
  { label: 'Media · advertising', sub: 'INEC cat. 1', cap: 1_200_000_000, pct: 78, amount: '₦ 936m', warn: true },
  { label: 'Personnel · stipends', sub: 'INEC cat. 2', cap: 600_000_000, pct: 64, amount: '₦ 384m', warn: false },
  { label: 'Transport · logistics', sub: 'INEC cat. 3', cap: 800_000_000, pct: 41, amount: '₦ 328m', warn: false },
  { label: 'Materials · printing', sub: 'INEC cat. 4', cap: 400_000_000, pct: 28, amount: '₦ 112m', warn: false },
  { label: 'Convention · events', sub: 'INEC cat. 5', cap: 500_000_000, pct: 52, amount: '₦ 260m', warn: false },
  { label: 'Misc · other', sub: 'INEC cat. 6', cap: 500_000_000, pct: 10, amount: '₦ 50m', warn: false },
];

const ANOMALIES = [
  { id: 'a1', title: 'Duplicate invoice — vendor #VND-0412', body: 'Two invoices, identical line items, from a vendor with no prior history.', resolved: false },
  { id: 'a2', title: 'Stipend claim diverges from peers', body: 'Coordinator @EMbachu claimed 3.2× the median.', resolved: false },
  { id: 'a3', title: 'Single-use high-value vendor', body: '₦ 4.2m for "logistics services" — investigated and cleared.', resolved: true },
];

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

  const spentPct = (s.totalSpent / s.totalBudget) * 100;

  return (
    <div className="p-5 md:p-8 max-w-[960px]">
      {/* Statement header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 mb-6 border-b gap-3" style={{ borderColor: 'var(--ink)' }}>
        <div>
          <h1 className="font-serif font-bold text-[22px] md:text-[28px]" style={{ color: 'var(--ink)' }}>
            Statement of campaign expenditure
          </h1>
          <p className="font-serif italic text-[12px] mt-1 max-w-[55ch]" style={{ color: 'var(--ink-3)' }}>
            — under INEC notice of election § 88 of the Electoral Act, statutory spending cap applies from 25 February 2026.
          </p>
        </div>
        <div className="font-mono text-[11px] sm:text-right shrink-0" style={{ color: 'var(--ink-3)' }}>
          <div>Anambra Central · Senate</div>
          <div>Filed by: Chinwe Obi (Campaign Manager)</div>
          <div>Period: 25 Feb — 11 May 2026</div>
          <div>Next return due: <span className="font-medium" style={{ color: 'var(--forest-700)' }}>10 Jul 2026</span></div>
        </div>
      </div>

      {/* Top grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* INEC Cap card */}
        <div className="sm:col-span-1 rounded-[6px] p-4 col-span-1" style={{ border: '2px solid var(--ink)' }}>
          <div className="font-mono text-[9px]" style={{ color: 'var(--ink-3)' }}>INEC STATUTORY CAP · SENATE</div>
          <div className="flex items-baseline gap-2 mt-1 flex-wrap">
            <span className="font-serif font-bold text-[26px]" style={{ color: 'var(--forest-700)' }}>
              {formatNaira(s.totalSpent)}
            </span>
            <span className="text-[13px]" style={{ color: 'var(--ink-3)' }}>
              of {formatNaira(s.totalBudget)} · {spentPct.toFixed(0)}%
            </span>
          </div>
          <div className="h-2 rounded mt-2 relative" style={{ background: 'var(--hair)' }}>
            <div className="absolute left-0 top-0 h-full rounded" style={{ width: `${spentPct}%`, background: 'var(--forest-600)' }} />
            <div className="absolute top-0 h-full w-px" style={{ left: '75%', background: 'var(--crit)' }} />
          </div>
          <div className="font-mono text-[10px] mt-2" style={{ color: 'var(--ink-4)' }}>
            Burn rate {formatNaira(s.burnRate)}/day · Headroom {formatNaira(s.totalBudget - s.totalSpent)}
          </div>
        </div>

        {/* Anomalies */}
        <div className="rounded-[6px] p-4" style={{ border: '1px solid var(--orange)', background: '#FFF3E0' }}>
          <div className="font-mono text-[9px] uppercase" style={{ color: 'var(--orange)' }}>Open anomalies</div>
          <div className="font-serif font-bold text-[28px]" style={{ color: 'var(--orange)' }}>
            {ANOMALIES.filter((a) => !a.resolved).length}
          </div>
          <div className="font-sans text-[12px] mt-1" style={{ color: 'var(--ink-3)' }}>
            Two duplicate invoices and one peer-divergent stipend claim.
          </div>
        </div>

        {/* Compliance */}
        <div
          className="rounded-[6px] p-4"
          style={{ border: `1px solid ${s.complianceScore >= 80 ? 'var(--forest-600)' : 'var(--orange)'}`, background: s.complianceScore >= 80 ? 'var(--forest-50)' : '#FFF3E0' }}
        >
          <div className="font-mono text-[9px] uppercase" style={{ color: s.complianceScore >= 80 ? 'var(--forest-700)' : 'var(--orange)' }}>Compliance score</div>
          <div className="font-serif font-bold text-[28px]" style={{ color: s.complianceScore >= 80 ? 'var(--forest-700)' : 'var(--orange)' }}>
            {s.complianceScore}
          </div>
          <div className="font-sans text-[12px] mt-1" style={{ color: 'var(--ink-3)' }}>
            {s.complianceScore >= 80 ? 'All major filings current.' : 'Action required — see compliance tab.'}
          </div>
        </div>
      </div>

      {/* Mid grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Sub-cap usage */}
        <div className="rounded-[6px] p-4" style={{ border: '1px solid var(--hair)' }}>
          <div className="flex items-baseline gap-2 mb-4 flex-wrap">
            <h3 className="font-sans font-medium text-[14px]" style={{ color: 'var(--ink)' }}>Spend by INEC category</h3>
            <span className="font-serif italic text-[12px]" style={{ color: 'var(--ink-3)' }}>— marker at 75% triggers alert.</span>
          </div>
          {SUBCAP_ROWS.map(({ label, sub, pct, amount, warn }) => (
            <div
              key={label}
              className="grid items-center gap-2 py-2 border-b"
              style={{ gridTemplateColumns: '160px 1fr 70px 40px', borderColor: 'var(--hair)' }}
            >
              <div>
                <div className="font-sans text-[12px]" style={{ color: 'var(--ink)' }}>{label}</div>
                <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{sub}</div>
              </div>
              <div className="relative h-1.5 rounded" style={{ background: 'var(--hair)' }}>
                <div
                  className="absolute left-0 top-0 h-full rounded"
                  style={{ width: `${pct}%`, background: warn ? 'var(--orange)' : 'var(--forest-600)' }}
                />
                <div className="absolute top-0 h-full w-px" style={{ left: '75%', background: 'var(--crit)', opacity: 0.4 }} />
              </div>
              <span className="font-mono text-[10px]" style={{ color: 'var(--ink)' }}>{amount}</span>
              <span className="font-mono text-[10px]" style={{ color: warn ? 'var(--orange)' : 'var(--ink)' }}>
                {pct}%{warn ? ' ⚑' : ''}
              </span>
            </div>
          ))}
        </div>

        {/* Anomaly feed */}
        <div className="rounded-[6px] p-4" style={{ border: '1px solid var(--hair)' }}>
          <h3 className="font-sans font-medium text-[14px] mb-3" style={{ color: 'var(--ink)' }}>Anomaly feed</h3>
          <div className="space-y-2">
            {ANOMALIES.map(({ id, title, body, resolved }) => (
              <div
                key={id}
                className="px-3 py-2.5 rounded-[4px]"
                style={{ borderLeft: `2px solid ${resolved ? 'var(--hair)' : 'var(--orange)'}`, background: resolved ? 'var(--paper-2)' : '#FFF3E0' }}
              >
                <div className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>{title}</div>
                <div className="font-sans text-[12px] mt-0.5" style={{ color: 'var(--ink-2)' }}>{body}</div>
                {!resolved && (
                  <div className="flex gap-2 mt-2">
                    <Button variant="quiet" size="sm">Dismiss</Button>
                    <Button variant="warn" size="sm">Action taken</Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Signature block */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 mt-2 border-t gap-4 flex-wrap"
        style={{ borderColor: 'var(--ink)' }}
      >
        <div>
          <div className="font-serif text-[16px]" style={{ color: 'var(--ink)' }}>Chinwe Obi</div>
          <div className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>Campaign Manager · sig. on file</div>
        </div>
        <OfficialStamp variant="verified" meta="2026-05-11" />
        <div>
          <div className="font-serif text-[16px]" style={{ color: 'var(--ink)' }}>Funmi Okeke</div>
          <div className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>Finance Officer · sig. on file</div>
        </div>
        <OfficialStamp variant="simulation" meta="DRAFT" />
      </div>
    </div>
  );
}
