import { useQuery } from '@tanstack/react-query';
import { Button, ConfidenceBar, OfficialStamp, SkeletonCard } from '@solon/ui';
import type { ConfidenceLevel } from '@solon/ui';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { ScenarioResult } from '@shared/types/mock-data.types';

const MOCK_SCENARIOS: ScenarioResult[] = [
  {
    scenarioId: 'sc-1',
    name: 'High turnout + youth surge',
    params: { turnout: 'high', youthMobilization: 'strong', incidentRate: 0.05, weatherImpact: false },
    candidates: [
      { name: 'LP', party: 'LP', partyColor: 'var(--forest-600)', projectedShare: 52.4, delta: 5.2 },
      { name: 'APC', party: 'APC', partyColor: 'var(--ink)', projectedShare: 20.1, delta: -2.0 },
      { name: 'APGA', party: 'APGA', partyColor: 'var(--paper-3)', projectedShare: 16.2, delta: -2.2 },
      { name: 'PDP', party: 'PDP', partyColor: '#FFF3E0', projectedShare: 8.8, delta: -1.0 },
    ],
    projectedTurnout: 71.8,
    confidence: 3,
    createdAt: '2026-05-11T10:00:00Z',
  },
  {
    scenarioId: 'baseline',
    name: 'Baseline',
    params: { turnout: 'medium', youthMobilization: 'baseline', incidentRate: 0, weatherImpact: false },
    candidates: [
      { name: 'LP', party: 'LP', partyColor: 'var(--forest-600)', projectedShare: 47.2, delta: 0 },
      { name: 'APC', party: 'APC', partyColor: 'var(--ink)', projectedShare: 22.1, delta: 0 },
      { name: 'APGA', party: 'APGA', partyColor: 'var(--paper-3)', projectedShare: 18.4, delta: 0 },
      { name: 'PDP', party: 'PDP', partyColor: '#FFF3E0', projectedShare: 9.8, delta: 0 },
    ],
    projectedTurnout: 64.2,
    confidence: 4,
    createdAt: '2026-05-11T08:00:00Z',
  },
  {
    scenarioId: 'sc-3',
    name: 'Security incident · Onitsha · sev 4',
    params: { turnout: 'low', youthMobilization: 'baseline', incidentRate: 0.14, weatherImpact: true },
    candidates: [
      { name: 'LP', party: 'LP', partyColor: 'var(--forest-600)', projectedShare: 42.1, delta: -5.1 },
      { name: 'APC', party: 'APC', partyColor: 'var(--ink)', projectedShare: 25.6, delta: 3.5 },
      { name: 'APGA', party: 'APGA', partyColor: 'var(--paper-3)', projectedShare: 19.8, delta: 1.4 },
      { name: 'PDP', party: 'PDP', partyColor: '#FFF3E0', projectedShare: 10.3, delta: 0.5 },
    ],
    projectedTurnout: 48.6,
    confidence: 2,
    createdAt: '2026-05-10T14:30:00Z',
  },
];

const CONF_LABEL: Record<number, string> = { 1: 'LOW CONF.', 2: 'LOW CONF.', 3: 'MED CONF.', 4: 'HIGH CONF.', 5: 'HIGH CONF.' };
const CONF_COLOR: Record<number, string> = { 1: 'var(--crit)', 2: 'var(--orange)', 3: 'var(--ink-3)', 4: 'var(--forest-700)', 5: 'var(--forest-700)' };

export default function SimulatorSavedScreen() {
  const { sessionId } = useDemoSession();
  const { data, isLoading } = useQuery<ScenarioResult[]>({
    queryKey: ['simulator-scenarios'],
    queryFn: () => demoClient.get<ScenarioResult[]>(DEMO_EP.SIMULATOR_SCENARIOS, sessionId ?? undefined),
    placeholderData: MOCK_SCENARIOS,
  });

  const scenarios = data ?? MOCK_SCENARIOS;

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
          — Anambra Central · senate · 2027
        </p>
      </div>

      {/* DS cards-screen 3-up grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {scenarios.map((sc) => {
          const lp = sc.candidates.find((c) => c.party === 'LP');
          const confLabel = CONF_LABEL[sc.confidence] ?? 'MED CONF.';
          const confColor = CONF_COLOR[sc.confidence] ?? 'var(--ink-3)';
          const isBaseline = sc.scenarioId === 'baseline';

          return (
            <div
              key={sc.scenarioId}
              className="rounded-[6px] overflow-hidden"
              style={{ border: `1px solid ${isBaseline ? 'var(--forest-600)' : 'var(--hair)'}`, background: 'var(--sheet)' }}
            >
              {/* Card header */}
              <div
                className="px-4 py-2 flex justify-between border-b"
                style={{ background: 'var(--paper-2)', borderColor: isBaseline ? 'var(--forest-600)' : 'var(--hair)' }}
              >
                <span className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>
                  SAVED · {new Date(sc.createdAt).toLocaleDateString('en-NG', { day: '2-digit', month: 'short' }).toUpperCase()}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px]" style={{ color: confColor }}>{confLabel}</span>
                  {isBaseline && <OfficialStamp variant="simulation" meta="BASELINE" />}
                </div>
              </div>

              {/* Card body */}
              <div className="p-4">
                <h3 className="font-sans font-semibold text-[14px]" style={{ color: 'var(--ink)' }}>{sc.name}</h3>
                <p className="font-serif italic text-[11px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
                  — Anambra Central · senate
                </p>
                <p className="font-sans text-[12px] mt-2 leading-relaxed" style={{ color: 'var(--ink-3)' }}>
                  Turnout: {sc.params.turnout} · Youth: {sc.params.youthMobilization}
                  {sc.params.weatherImpact ? ' · weather applied' : ''}
                  {sc.params.incidentRate > 0 ? ` · ${(sc.params.incidentRate * 100).toFixed(0)}% incident rate` : ''}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <ConfidenceBar level={sc.confidence as ConfidenceLevel} />
                </div>
              </div>

              {/* Card footer */}
              <div
                className="border-t px-4 py-3 flex justify-between items-baseline"
                style={{ borderColor: 'var(--hair)' }}
              >
                <span className="font-sans text-[11px]" style={{ color: 'var(--ink-3)' }}>LP projection</span>
                <span className="font-serif font-bold text-[22px]" style={{ color: lp && lp.projectedShare > 47 ? 'var(--forest-700)' : 'var(--orange)' }}>
                  {lp?.projectedShare.toFixed(1)}%
                </span>
                <span className="font-serif italic text-[11px]" style={{ color: lp && lp.delta >= 0 ? 'var(--forest-700)' : 'var(--orange)' }}>
                  {lp && lp.delta !== 0 ? (lp.delta >= 0 ? `+${lp.delta.toFixed(1)}` : lp.delta.toFixed(1)) : 'baseline'}
                </span>
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
