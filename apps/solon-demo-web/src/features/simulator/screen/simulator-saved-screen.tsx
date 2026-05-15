import { useQuery } from '@tanstack/react-query';
import { Button, OfficialStamp, SkeletonCard } from '@solon/ui';
import { demoClient } from '@shared/api/demo-client';
import { MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { SavedScenario } from '@shared/types/mock-data.types';

const MOCK_SCENARIOS: SavedScenario[] = [
  {
    id: 'sc-baseline',
    name: 'Baseline — no-shock model',
    created_at: '2026-05-11T08:00:00Z',
    summary: { bello_share: 47.2, apc_share: 22.1, pdp_share: 9.8, lp_share: 13.4 },
  },
  {
    id: 'sc-1',
    name: 'High turnout + youth surge',
    created_at: '2026-05-11T10:00:00Z',
    summary: { bello_share: 52.4, apc_share: 20.1, pdp_share: 8.8, lp_share: 11.2 },
  },
  {
    id: 'sc-3',
    name: 'Security incident · North · sev 4',
    created_at: '2026-05-10T14:30:00Z',
    summary: { bello_share: 42.1, apc_share: 25.6, pdp_share: 10.3, lp_share: 14.8 },
  },
];

export default function SimulatorSavedScreen() {
  const { sessionId } = useDemoSession();
  const { data, isLoading } = useQuery<SavedScenario[]>({
    queryKey: ['simulator-scenarios'],
    queryFn: () => demoClient.getMock<SavedScenario[]>(MOCK_KEY.SIMULATOR_SAVED_SCENARIOS, sessionId ?? undefined),
    placeholderData: MOCK_SCENARIOS,
  });

  const rawScenarios = data ?? MOCK_SCENARIOS;
  const scenarios = rawScenarios.filter((sc) => sc.summary != null);
  const displayScenarios = scenarios.length > 0 ? scenarios : MOCK_SCENARIOS;

  if (isLoading && !data) {
    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-5">
        <h2 className="font-serif font-semibold text-[20px]" style={{ color: 'var(--ink)' }}>Saved scenarios</h2>
        <p className="font-serif italic text-[13px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
          — AFP · Presidency · 2027
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {displayScenarios.map((sc) => {
          const isBaseline = sc.id === 'sc-baseline' || sc.name.toLowerCase().includes('baseline');
          const afpShare = sc.summary.bello_share;
          const baseline = displayScenarios.find((s) => s.id === 'sc-baseline' || s.name.toLowerCase().includes('baseline'));
          const afpDelta = isBaseline ? null : afpShare - (baseline?.summary.bello_share ?? afpShare);

          return (
            <div
              key={sc.id}
              className="rounded-[6px] overflow-hidden"
              style={{ border: `1px solid ${isBaseline ? 'var(--forest-600)' : 'var(--hair)'}`, background: 'var(--sheet)' }}
            >
              {/* Card header */}
              <div
                className="px-4 py-2 flex justify-between border-b"
                style={{ background: 'var(--paper-2)', borderColor: isBaseline ? 'var(--forest-600)' : 'var(--hair)' }}
              >
                <span className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>
                  SAVED · {new Date(sc.created_at).toLocaleDateString('en-NG', { day: '2-digit', month: 'short' }).toUpperCase()}
                </span>
                {isBaseline && <OfficialStamp variant="simulation" meta="BASELINE" />}
              </div>

              {/* Card body */}
              <div className="p-4">
                <h3 className="font-sans font-semibold text-[14px]" style={{ color: 'var(--ink)' }}>{sc.name}</h3>
                <p className="font-serif italic text-[11px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
                  — AFP presidential campaign
                </p>

                {/* Party breakdown bars */}
                <div className="mt-3 space-y-1.5">
                  {[
                    { label: 'AFP', share: sc.summary.bello_share, color: '#1D4ED8' },
                    { label: 'APC', share: sc.summary.apc_share, color: '#16A34A' },
                    { label: 'PDP', share: sc.summary.pdp_share, color: '#DC2626' },
                    { label: 'LP',  share: sc.summary.lp_share,  color: '#B45309' },
                  ].map(({ label, share, color }) => (
                    <div key={label} className="flex items-center gap-2">
                      <span className="font-mono text-[9px] w-6 shrink-0" style={{ color: 'var(--ink-4)' }}>{label}</span>
                      <div className="flex-1 h-1 rounded-full" style={{ background: 'var(--hair)' }}>
                        <div className="h-full rounded-full" style={{ width: `${share}%`, background: color }} />
                      </div>
                      <span className="font-mono text-[10px] w-8 text-right" style={{ color: 'var(--ink-3)' }}>{share.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card footer */}
              <div
                className="border-t px-4 py-3 flex justify-between items-baseline"
                style={{ borderColor: 'var(--hair)' }}
              >
                <span className="font-sans text-[11px]" style={{ color: 'var(--ink-3)' }}>AFP projection</span>
                <span className="font-serif font-bold text-[22px]" style={{ color: afpShare >= 50 ? 'var(--forest-700)' : afpShare >= 45 ? 'var(--orange)' : 'var(--crit)' }}>
                  {afpShare.toFixed(1)}%
                </span>
                {afpDelta !== null && (
                  <span className="font-serif italic text-[11px]" style={{ color: afpDelta >= 0 ? 'var(--forest-700)' : 'var(--orange)' }}>
                    {afpDelta >= 0 ? `+${afpDelta.toFixed(1)}` : afpDelta.toFixed(1)}
                  </span>
                )}
                {afpDelta === null && (
                  <span className="font-serif italic text-[11px]" style={{ color: 'var(--ink-4)' }}>baseline</span>
                )}
              </div>

              {/* Actions */}
              <div className="border-t px-4 py-2 flex gap-2" style={{ borderColor: 'var(--hair)' }}>
                <Button variant="quiet" size="sm">Load</Button>
                <Button variant="quiet" size="sm">Compare</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
