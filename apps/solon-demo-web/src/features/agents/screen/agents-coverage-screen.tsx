import { SkeletonCard } from '@solon/ui';
import { formatPct } from '@shared/helpers/format-pct';
import { useAgentsCoverage } from '../api/use-agents-coverage';

const TH_CLS = 'font-mono text-[10px] uppercase text-left px-3 py-2 border-b tracking-[0.08em]';
const TD_CLS = 'font-sans text-[13px] px-3 py-3 border-b';

function coverageColor(rate: number): string {
  if (rate >= 80) return 'var(--forest-600)';
  if (rate >= 60) return 'var(--orange)';
  return 'var(--crit)';
}

export default function AgentsCoverageScreen() {
  const { data, isLoading } = useAgentsCoverage();
  const coverage = data ?? [];

  const totalPUs = coverage.reduce((s, c) => s + c.totalPUs, 0);
  const coveredPUs = coverage.reduce((s, c) => s + c.coveredPUs, 0);
  const totalAgents = coverage.reduce((s, c) => s + c.agents, 0);
  const overallRate = totalPUs > 0 ? (coveredPUs / totalPUs) * 100 : 0;

  if (isLoading && !data) {
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8">
      <div className="mb-5">
        <h2 className="font-serif font-semibold text-[20px]" style={{ color: 'var(--ink)' }}>Coverage map</h2>
        <p className="font-serif italic text-[13px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
          — Anambra Central · PU coverage by LGA · {coverage.length} LGAs
        </p>
      </div>

      {/* Summary strip */}
      <div
        className="flex items-center gap-6 flex-wrap px-5 py-3 rounded-[6px] mb-6"
        style={{ background: 'var(--ink)', border: '1px solid var(--ink)' }}
      >
        {[
          { label: 'Total PUs', value: String(totalPUs), color: 'var(--paper)' },
          { label: 'Covered PUs', value: String(coveredPUs), color: 'var(--forest-300)' },
          { label: 'Overall coverage', value: formatPct(overallRate, 1), color: coverageColor(overallRate) },
          { label: 'Agents deployed', value: String(totalAgents), color: 'var(--paper)' },
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

      {/* Table */}
      <div className="rounded-[6px] overflow-hidden border" style={{ borderColor: 'var(--hair)' }}>
        <style>{`.coverage-table tbody tr:hover td { background: var(--paper-2); }`}</style>
        <div className="overflow-x-auto">
          <table className="coverage-table w-full border-collapse">
            <thead>
              <tr style={{ background: 'var(--paper-2)' }}>
                {['LGA', 'Agents', 'PUs covered', 'Total PUs', 'Coverage', 'Progress'].map((h, i) => (
                  <th
                    key={h}
                    className={TH_CLS}
                    style={{ color: 'var(--ink-3)', borderColor: 'var(--hair)', textAlign: i >= 1 && i <= 3 ? 'right' : 'left' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coverage.map((c) => {
                const color = coverageColor(c.coverageRate);
                return (
                  <tr key={c.lga}>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      <span className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>{c.lga}</span>
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)' }}>
                      {c.agents}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-2)' }}>
                      {c.coveredPUs}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)' }}>
                      {c.totalPUs}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      <span className="font-mono font-semibold text-[13px]" style={{ color }}>{formatPct(c.coverageRate, 1)}</span>
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', minWidth: 120 }}>
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--hair)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${c.coverageRate}%`, background: color }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="font-serif italic text-[12px] mt-4" style={{ color: 'var(--ink-4)' }}>
        Target: 90% PU coverage by election day · 20 Feb 2027 · Solon Intelligence
      </p>
    </div>
  );
}
