import { SkeletonCard } from '@solon/ui';
import { formatPct } from '@shared/helpers/format-pct';
import { useAgentsReadiness } from '../api/use-agents-readiness';
import type { AgentReadiness } from '@shared/types/mock-data.types';

const CHECKLIST: { key: keyof AgentReadiness; label: string; subtitle: string }[] = [
  { key: 'trained', label: 'Training completed', subtitle: 'Solon field agent certification program' },
  { key: 'credentialed', label: 'INEC credentialing', subtitle: 'Official accreditation from electoral commission' },
  { key: 'equipped', label: 'Materials distributed', subtitle: 'Tally sheets, phone + data bundle issued' },
  { key: 'deployed', label: 'Election day deployment', subtitle: 'Active on 20 Feb 2027' },
];

function readinessColor(score: number): string {
  if (score >= 80) return 'var(--forest-600)';
  if (score >= 60) return 'var(--orange)';
  return 'var(--crit)';
}

function barColor(pct: number): string {
  if (pct >= 80) return 'var(--forest-600)';
  if (pct >= 60) return 'var(--orange)';
  return 'var(--crit)';
}

export default function AgentsReadinessScreen() {
  const { data, isLoading } = useAgentsReadiness();
  const r = data;

  if (isLoading && !r) {
    return (
      <div className="p-6 flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!r) return null;

  return (
    <div
      className="flex flex-col md:grid min-h-full"
      style={{ gridTemplateColumns: '260px 1fr' }}
    >
      {/* Left — score card */}
      <div className="border-b md:border-b-0 md:border-r p-5 flex flex-col gap-5" style={{ borderColor: 'var(--hair)' }}>
        <div>
          <h2 className="font-serif font-semibold text-[18px]" style={{ color: 'var(--ink)' }}>Readiness</h2>
          <p className="font-serif italic text-[12px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
            — {r.totalAgents} total agents
          </p>
        </div>

        {/* Big score */}
        <div className="rounded-[6px] p-5 flex flex-col items-center" style={{ background: 'var(--sheet)', border: '1px solid var(--hair)' }}>
          <div className="font-mono text-[9px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>Readiness score</div>
          <div className="font-serif font-bold leading-none" style={{ fontSize: 72, color: readinessColor(r.readinessScore) }}>
            {r.readinessScore}
          </div>
          <div className="font-mono text-[12px]" style={{ color: 'var(--ink-4)' }}>/100</div>
          <div className="w-full h-2 rounded-full overflow-hidden mt-3" style={{ background: 'var(--hair)' }}>
            <div className="h-full rounded-full" style={{ width: `${r.readinessScore}%`, background: readinessColor(r.readinessScore) }} />
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Trained', value: r.trained },
            { label: 'Credentialed', value: r.credentialed },
            { label: 'Equipped', value: r.equipped },
            { label: 'Deployed', value: r.deployed },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-[4px] p-3" style={{ background: 'var(--paper-2)', border: '1px solid var(--hair)' }}>
              <div className="font-mono text-[9px] uppercase" style={{ color: 'var(--ink-4)' }}>{label}</div>
              <div className="font-serif font-semibold text-[20px]" style={{ color: 'var(--ink)' }}>{value}</div>
              <div className="font-mono text-[9px]" style={{ color: 'var(--ink-4)' }}>
                {formatPct((value / r.totalAgents) * 100, 0)}
              </div>
            </div>
          ))}
        </div>

        {r.readinessScore < 80 && (
          <div className="rounded-[4px] px-3 py-2.5" style={{ background: 'var(--orange-soft)', border: '1px solid var(--orange)' }}>
            <p className="font-sans text-[12px]" style={{ color: 'var(--orange)' }}>
              {r.totalAgents - r.credentialed} agents still need INEC credentialing before election day.
            </p>
          </div>
        )}
      </div>

      {/* Right — checklist */}
      <div className="p-5 md:p-6">
        <h3 className="font-sans font-semibold text-[14px] mb-4" style={{ color: 'var(--ink)' }}>Preparation checklist</h3>

        <div className="flex flex-col gap-4">
          {CHECKLIST.map((item) => {
            const count = r[item.key] as number;
            const pct = r.totalAgents > 0 ? (count / r.totalAgents) * 100 : 0;
            const color = barColor(pct);
            const isComplete = pct >= 95;
            return (
              <div
                key={item.key}
                className="rounded-[6px] overflow-hidden"
                style={{ border: `1px solid ${isComplete ? 'var(--forest-600)' : 'var(--hair)'}`, background: 'var(--sheet)' }}
              >
                <div
                  className="px-4 py-2.5 border-b flex items-center justify-between"
                  style={{ background: 'var(--paper-2)', borderColor: isComplete ? 'var(--forest-600)' : 'var(--hair)' }}
                >
                  <div>
                    <div className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>{item.label}</div>
                    <div className="font-serif italic text-[11px]" style={{ color: 'var(--ink-3)' }}>{item.subtitle}</div>
                  </div>
                  <span className="font-mono font-semibold text-[16px]" style={{ color }}>
                    {formatPct(pct, 0)}
                  </span>
                </div>
                <div className="px-4 py-3">
                  <div className="flex justify-between mb-1.5">
                    <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{count} of {r.totalAgents} agents</span>
                    <span className="font-mono text-[10px]" style={{ color }}>
                      {r.totalAgents - count} remaining
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--hair)' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
