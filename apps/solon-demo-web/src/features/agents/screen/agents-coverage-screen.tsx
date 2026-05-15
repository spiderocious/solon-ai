import { SkeletonCard } from '@solon/ui';
import { formatPct } from '@shared/helpers/format-pct';
import { useAgentsCoverage } from '../api/use-agents-coverage';

function coverageColor(pct: number): string {
  if (pct >= 5) return 'var(--forest-600)';
  if (pct >= 2) return 'var(--orange)';
  return 'var(--crit)';
}

export default function AgentsCoverageScreen() {
  const { data, isLoading } = useAgentsCoverage();

  if (isLoading && !data) {
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!data) return null;

  const coveragePct = data.coverage_pct * 100;

  return (
    <div className="p-5 md:p-8">
      <div className="mb-5">
        <h2 className="font-serif font-semibold text-[20px]" style={{ color: 'var(--ink)' }}>Coverage overview</h2>
        <p className="font-serif italic text-[13px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
          — nationwide · {data.total_agents} agents · {data.total_pus_covered.toLocaleString()} PUs covered
        </p>
      </div>

      {/* Summary strip */}
      <div
        className="flex items-center gap-6 flex-wrap px-5 py-3 rounded-[6px] mb-6"
        style={{ background: 'var(--ink)', border: '1px solid var(--ink)' }}
      >
        {[
          { label: 'Total agents', value: String(data.total_agents), color: 'var(--paper)' },
          { label: 'PUs covered', value: data.total_pus_covered.toLocaleString(), color: 'var(--forest-300)' },
          { label: 'Nationwide PUs', value: data.total_pus_nationwide.toLocaleString(), color: 'var(--paper)' },
          { label: 'Coverage', value: formatPct(coveragePct, 1), color: coverageColor(coveragePct) },
        ].map(({ label, value, color }, i) => (
          <div key={label} className="flex items-center gap-3">
            {i > 0 && <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>}
            <div>
              <div className="font-mono text-[9px]" style={{ color: 'var(--ink-4)' }}>{label}</div>
              <div className="font-mono font-semibold text-[18px]" style={{ color }}>{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Status grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Verified', value: data.verified, color: 'var(--forest-700)', bg: 'var(--forest-50)', border: 'var(--forest-600)' },
          { label: 'Election ready', value: data.election_ready, color: 'var(--forest-700)', bg: 'var(--forest-50)', border: 'var(--forest-600)' },
          { label: 'Pending verification', value: data.pending_verification, color: 'var(--orange)', bg: 'var(--orange-soft)', border: 'var(--orange)' },
          { label: 'Failed verification', value: data.failed_verification, color: 'var(--crit)', bg: '#FEE2E2', border: 'var(--crit)' },
        ].map(({ label, value, color, bg, border }) => (
          <div key={label} className="rounded-[6px] p-4" style={{ background: bg, border: `1px solid ${border}` }}>
            <div className="font-mono text-[9px] uppercase" style={{ color }}>{label}</div>
            <div className="font-serif font-bold text-[28px]" style={{ color }}>{value}</div>
            <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
              {formatPct((value / data.total_agents) * 100, 0)} of total
            </div>
          </div>
        ))}
      </div>

      {/* Coverage bar */}
      <div className="rounded-[6px] p-4" style={{ border: '1px solid var(--hair)' }}>
        <div className="flex justify-between mb-2">
          <span className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>Nationwide PU coverage</span>
          <span className="font-mono font-semibold text-[13px]" style={{ color: coverageColor(coveragePct) }}>
            {formatPct(coveragePct, 2)}
          </span>
        </div>
        <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'var(--hair)' }}>
          <div
            className="h-full rounded-full"
            style={{ width: `${Math.min(coveragePct, 100)}%`, background: coverageColor(coveragePct) }}
          />
        </div>
        <div className="font-mono text-[10px] mt-2" style={{ color: 'var(--ink-4)' }}>
          {data.total_pus_covered.toLocaleString()} of {data.total_pus_nationwide.toLocaleString()} polling units nationwide
        </div>
      </div>

      <p className="font-serif italic text-[12px] mt-4" style={{ color: 'var(--ink-4)' }}>
        Target: 5% PU coverage by election day · Jan 2027 · Solon Intelligence
      </p>
    </div>
  );
}
