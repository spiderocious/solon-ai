import { formatPct } from '@shared/helpers/format-pct';
import { useAgentsReadiness } from '../api/use-agents-readiness';
import { ErrorState } from '@shared/components/error-state';
import { ScreenSkeleton } from '@shared/components/screen-skeleton';

function readinessColor(pct: number): string {
  if (pct >= 80) return 'var(--forest-600)';
  if (pct >= 60) return 'var(--orange)';
  return 'var(--crit)';
}

export default function AgentsReadinessScreen() {
  const { data: r, isLoading, isError, refetch } = useAgentsReadiness();

  if (isLoading) return <ScreenSkeleton rows={4} />;
  if (isError || !r) return <ErrorState message="Could not load readiness data." onRetry={() => void refetch()} />;

  const verifiedPct = r.total_agents > 0 ? (r.verified / r.total_agents) * 100 : 0;
  const readyPct = r.total_agents > 0 ? (r.election_ready / r.total_agents) * 100 : 0;
  const trainedPct = r.total_agents > 0 ? (r.trained / r.total_agents) * 100 : 0;

  const CHECKLIST = [
    { key: 'trained' as const, label: 'Training completed', subtitle: 'Solon field agent certification program', count: r.trained, pct: trainedPct },
    { key: 'verified' as const, label: 'INEC verified', subtitle: 'Official accreditation from electoral commission', count: r.verified, pct: verifiedPct },
    { key: 'election_ready' as const, label: 'Election day deployment', subtitle: 'Active on 16 Jan 2027', count: r.election_ready, pct: readyPct },
  ];

  return (
    <div className="flex flex-col md:grid min-h-full" style={{ gridTemplateColumns: '260px 1fr' }}>
      <div className="border-b md:border-b-0 md:border-r p-5 flex flex-col gap-5" style={{ borderColor: 'var(--hair)' }}>
        <div>
          <h2 className="font-serif font-semibold text-[18px]" style={{ color: 'var(--ink)' }}>Readiness</h2>
          <p className="font-serif italic text-[12px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
            — {r.total_agents} total agents
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Trained', value: r.trained },
            { label: 'Verified', value: r.verified },
            { label: 'Election ready', value: r.election_ready },
            { label: 'Pending', value: r.pending_verification },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-[4px] p-3" style={{ background: 'var(--paper-2)', border: '1px solid var(--hair)' }}>
              <div className="font-mono text-[9px] uppercase" style={{ color: 'var(--ink-4)' }}>{label}</div>
              <div className="font-serif font-semibold text-[20px]" style={{ color: 'var(--ink)' }}>{value}</div>
              <div className="font-mono text-[9px]" style={{ color: 'var(--ink-4)' }}>
                {formatPct((value / r.total_agents) * 100, 0)}
              </div>
            </div>
          ))}
        </div>

        {r.pending_verification > 0 && (
          <div className="rounded-[4px] px-3 py-2.5" style={{ background: 'var(--orange-soft)', border: '1px solid var(--orange)' }}>
            <p className="font-sans text-[12px]" style={{ color: 'var(--orange)' }}>
              {r.pending_verification} agents pending INEC verification.
            </p>
          </div>
        )}

        {r.failed_verification > 0 && (
          <div className="rounded-[4px] px-3 py-2.5" style={{ background: '#FEE2E2', border: '1px solid var(--crit)' }}>
            <p className="font-sans text-[12px]" style={{ color: 'var(--crit)' }}>
              {r.failed_verification} agents failed verification — action required.
            </p>
          </div>
        )}
      </div>

      <div className="p-5 md:p-6">
        <h3 className="font-sans font-semibold text-[14px] mb-4" style={{ color: 'var(--ink)' }}>Preparation checklist</h3>
        <div className="flex flex-col gap-4">
          {CHECKLIST.map((item) => {
            const color = readinessColor(item.pct);
            const isComplete = item.pct >= 95;
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
                    {formatPct(item.pct, 0)}
                  </span>
                </div>
                <div className="px-4 py-3">
                  <div className="flex justify-between mb-1.5">
                    <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{item.count} of {r.total_agents} agents</span>
                    <span className="font-mono text-[10px]" style={{ color }}>{r.total_agents - item.count} remaining</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--hair)' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${item.pct}%`, background: color }} />
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
