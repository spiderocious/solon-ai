import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, ConfidenceBar, Scrubber, SegmentControl } from '@solon/ui';
import type { ConfidenceLevel } from '@solon/ui';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { ScenarioParams, ScenarioResult } from '@shared/types/mock-data.types';

const MOCK_RESULT: ScenarioResult = {
  scenarioId: 'sc-mock-1',
  name: 'High turnout + youth surge',
  params: { turnout: 'high', youthMobilization: 'strong', incidentRate: 0.05, weatherImpact: false },
  candidates: [
    { name: 'LP', party: 'LP', partyColor: 'var(--forest-600)', projectedShare: 53.4, delta: 6.2 },
    { name: 'APC', party: 'APC', partyColor: 'var(--ink)', projectedShare: 19.8, delta: -2.3 },
    { name: 'APGA', party: 'APGA', partyColor: 'var(--paper-3)', projectedShare: 14.7, delta: -3.7 },
    { name: 'PDP', party: 'PDP', partyColor: 'var(--orange-soft)', projectedShare: 9.1, delta: -0.7 },
  ],
  projectedTurnout: 71.8,
  confidence: 3,
  createdAt: new Date().toISOString(),
};

const TURNOUT_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const YOUTH_OPTIONS = [
  { value: 'baseline', label: 'Baseline' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'strong', label: 'Strong' },
];

export default function SimulatorScenarioScreen() {
  const { sessionId } = useDemoSession();
  const [params, setParams] = useState<ScenarioParams>({
    turnout: 'medium',
    youthMobilization: 'baseline',
    incidentRate: 0.05,
    weatherImpact: false,
  });
  const [result, setResult] = useState<ScenarioResult | null>(null);

  const { mutate: runScenario, isPending } = useMutation({
    mutationFn: () => demoClient.post<ScenarioResult>(DEMO_EP.SIMULATOR_RUN, params, sessionId ?? undefined),
    onSuccess: (res) => setResult(res),
    onError: () => setResult(MOCK_RESULT),
  });

  return (
    <div
      className="flex flex-col md:grid"
      style={{ gridTemplateColumns: '300px 1fr', minHeight: '100%' }}
    >
      {/* Left — Levers */}
      <div className="border-b md:border-b-0 md:border-r p-5 space-y-5" style={{ borderColor: 'var(--hair)' }}>
        <div>
          <h2 className="font-serif font-semibold text-[18px]" style={{ color: 'var(--ink)' }}>
            Build scenario
          </h2>
          <p className="font-serif italic text-[12px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
            — scrub levers to re-run
          </p>
        </div>

        <div className="space-y-4">
          <LeverGroup label="Turnout scenario">
            <SegmentControl
              options={TURNOUT_OPTIONS}
              value={params.turnout}
              onChange={(v) => setParams((p) => ({ ...p, turnout: v as ScenarioParams['turnout'] }))}
            />
          </LeverGroup>

          <LeverGroup label="Youth mobilization">
            <SegmentControl
              options={YOUTH_OPTIONS}
              value={params.youthMobilization}
              onChange={(v) => setParams((p) => ({ ...p, youthMobilization: v as ScenarioParams['youthMobilization'] }))}
            />
          </LeverGroup>

          <LeverGroup label="BVAS incident rate">
            <Scrubber
              label="Incident rate"
              min={0}
              max={30}
              step={1}
              value={Math.round(params.incidentRate * 100)}
              onChange={(e) => setParams((p) => ({ ...p, incidentRate: parseInt(e.target.value) / 100 }))}
              valueLabel={`${(params.incidentRate * 100).toFixed(0)}%`}
            />
          </LeverGroup>

          <LeverGroup label="Modifiers">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={params.weatherImpact}
                onChange={(e) => setParams((p) => ({ ...p, weatherImpact: e.target.checked }))}
                className="w-4 h-4 rounded-[2px]"
                style={{ accentColor: 'var(--forest-600)' }}
              />
              <span className="font-sans text-[13px]" style={{ color: 'var(--ink-2)' }}>
                Apply weather impact on turnout
              </span>
            </label>
          </LeverGroup>
        </div>

        <div className="pt-2 flex gap-2">
          <Button variant="primary" size="md" onClick={() => runScenario()} loading={isPending} className="flex-1">
            Run scenario
          </Button>
          {result && (
            <Button variant="quiet" size="md" onClick={() => setResult(null)}>
              Clear
            </Button>
          )}
        </div>

        <div
          className="rounded border p-3 font-mono text-[10px]"
          style={{ background: 'var(--paper-2)', borderColor: 'var(--hair)', color: 'var(--ink-3)' }}
        >
          Solon refuses any lever combination that would model voter suppression in opposition wards.
        </div>
      </div>

      {/* Right — Result */}
      <div className="p-6">
        {result ? (
          <div className="max-w-[520px]">
            <h1 className="font-serif font-semibold text-[22px]" style={{ color: 'var(--ink)' }}>
              {result.name}
            </h1>
            <p className="font-serif italic text-[13px] mt-0.5 mb-4" style={{ color: 'var(--ink-3)' }}>
              — scenario output · {new Date(result.createdAt).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })} WAT
            </p>

            {/* Output card */}
            <div
              className="border rounded-[4px] p-4 mb-5"
              style={{ borderColor: 'var(--ink)', background: 'var(--sheet)' }}
            >
              <div className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>
                Projected vote share · scenario
              </div>
              <div className="flex items-baseline gap-2 mt-1 mb-3">
                <span className="font-serif font-bold text-[48px] leading-none" style={{ color: 'var(--forest-700)' }}>
                  {result.candidates[0]?.projectedShare.toFixed(1)}%
                </span>
                <sup className="font-serif text-[15px]" style={{ color: 'var(--forest-700)' }}>
                  +{result.candidates[0]?.delta.toFixed(1)} pt vs baseline
                </sup>
              </div>

              {/* Stacked bar */}
              <div className="flex h-8 rounded-[3px] overflow-hidden mb-3">
                {result.candidates.map((c) => (
                  <div
                    key={c.party}
                    className="flex items-center px-1.5 font-mono text-[9px] shrink-0 overflow-hidden"
                    style={{ flex: c.projectedShare, background: c.partyColor, color: c.party === 'LP' ? 'white' : c.party === 'APC' ? 'var(--paper)' : 'var(--ink-2)' }}
                  >
                    {c.projectedShare > 12 ? `${c.party} ${c.projectedShare.toFixed(1)}%` : c.party}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>
                <ConfidenceBar level={result.confidence as ConfidenceLevel} />
                <span>{result.confidence >= 4 ? 'Medium-high' : 'Medium'} confidence · n=412 PU</span>
              </div>
            </div>

            {/* Deltas */}
            <div className="space-y-2">
              <div className="font-serif italic text-[13px] mb-3" style={{ color: 'var(--ink-3)' }}>
                Delta vs baseline
              </div>
              {result.candidates.map((c) => (
                <div
                  key={c.party}
                  className="grid items-center gap-3 py-2 border-b"
                  style={{ gridTemplateColumns: '120px 1fr 70px 60px', borderColor: 'var(--hair)' }}
                >
                  <span className="font-sans text-[12px]" style={{ color: 'var(--ink-2)' }}>{c.party}</span>
                  <div className="relative h-1.5 rounded-full" style={{ background: 'var(--hair)' }}>
                    <div
                      className="absolute left-0 top-0 h-full rounded-full"
                      style={{ width: `${c.projectedShare}%`, background: c.partyColor }}
                    />
                  </div>
                  <span className="font-mono text-[12px] text-right" style={{ color: 'var(--ink-2)' }}>
                    {c.projectedShare.toFixed(1)}%
                  </span>
                  <span
                    className="font-mono text-[11px] text-right"
                    style={{ color: c.delta >= 0 ? 'var(--forest-700)' : 'var(--orange)' }}
                  >
                    {c.delta >= 0 ? '+' : ''}{c.delta.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="h-full min-h-[300px] flex flex-col items-center justify-center rounded-[4px] border"
            style={{ borderStyle: 'dashed', borderColor: 'var(--hair)', background: 'var(--paper-2)' }}
          >
            <p className="font-serif italic text-[14px] text-center" style={{ color: 'var(--ink-4)' }}>
              Configure levers and run a scenario
            </p>
            <p className="font-mono text-[10px] mt-1 text-center" style={{ color: 'var(--ink-4)' }}>
              to see projected outcome here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface LeverGroupProps {
  label: string;
  children: React.ReactNode;
}

function LeverGroup({ label, children }: Readonly<LeverGroupProps>) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.1em] mb-2" style={{ color: 'var(--ink-4)' }}>
        {label}
      </div>
      {children}
    </div>
  );
}
