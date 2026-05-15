import { Avatar, ConfidenceBar, SkeletonCard } from '@solon/ui';
import type { ConfidenceLevel } from '@solon/ui';
import { useSimulatorBaseline } from '../api/use-simulator-baseline';

const CANDIDATE_INITIALS: Record<string, string> = {
  LP: 'IO', APC: 'UN', APGA: 'EE', PDP: 'AO', Other: 'OT',
};
const CANDIDATE_VARIANTS: Record<string, 'forest' | 'ink' | undefined> = {
  LP: 'forest', APC: 'ink',
};

export default function SimulatorBaselineScreen() {
  const { data, isLoading } = useSimulatorBaseline();

  if (isLoading && !data) {
    return (
      <div className="p-6">
        <SkeletonCard />
      </div>
    );
  }

  const d = data!;
  const lead = d.candidates[0];

  return (
    <div
      className="grid min-h-0"
      style={{ gridTemplateColumns: '1fr', gap: 0 }}
    >
      {/* On md+ show three-col like DS simulator */}
      <div
        className="flex flex-col md:grid"
        style={{ gridTemplateColumns: '260px 1fr 300px' }}
      >
        {/* Left — Race + Candidates */}
        <div className="border-b md:border-b-0 md:border-r p-4 space-y-3" style={{ borderColor: 'var(--hair)' }}>
          <h3 className="font-mono text-[10px] uppercase" style={{ color: 'var(--ink-3)' }}>Race</h3>

          {[
            { label: 'Constituency', value: d.constituency },
            { label: 'Office', value: 'Senate' },
            { label: 'Cycle', value: '2027 general' },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="font-mono text-[10px] mb-1" style={{ color: 'var(--ink-3)' }}>{label}</div>
              <div
                className="border px-2 py-1.5 font-sans text-[13px] rounded-[3px]"
                style={{ borderColor: 'var(--hair)', color: 'var(--ink)', background: 'var(--sheet)' }}
              >
                {value}
              </div>
            </div>
          ))}

          <h3 className="font-mono text-[10px] uppercase pt-2" style={{ color: 'var(--ink-3)' }}>Candidates</h3>

          {d.candidates.filter((c) => c.party !== 'Other').map((c) => (
            <div
              key={c.party}
              className="flex items-center gap-2 py-2 border-b"
              style={{ borderColor: 'var(--hair)' }}
            >
              <Avatar
                initials={CANDIDATE_INITIALS[c.party] ?? c.party.slice(0, 2)}
                size="sm"
                variant={CANDIDATE_VARIANTS[c.party]}
              />
              <div className="flex-1 min-w-0">
                <div className="font-sans font-medium text-[13px] truncate" style={{ color: 'var(--ink)' }}>
                  {c.name} · {c.party}
                </div>
                <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
                  Baseline: {c.projectedShare.toFixed(1)}%
                </div>
              </div>
            </div>
          ))}

          <div className="pt-2 space-y-1.5">
            {[
              { label: 'Registered voters', value: d.registeredVoters.toLocaleString() },
              { label: 'Historical turnout', value: `${d.historicalTurnout.toFixed(1)}%` },
              { label: 'Projected turnout', value: `${d.projectedTurnout.toFixed(1)}%` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center">
                <span className="font-sans text-[12px]" style={{ color: 'var(--ink-3)' }}>{label}</span>
                <span className="font-mono text-[12px]" style={{ color: 'var(--ink-2)' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center — Output card */}
        <div className="p-6">
          <h1 className="font-serif font-semibold text-[22px]" style={{ color: 'var(--ink)' }}>
            {d.raceName}
          </h1>
          <p className="font-serif italic text-[13px] mt-0.5 mb-4" style={{ color: 'var(--ink-3)' }}>
            — baseline projection · no-shock · 2023 turnout basis.
          </p>

          {/* Output card */}
          <div
            className="border rounded-[4px] p-4"
            style={{ borderColor: 'var(--ink)', background: 'var(--sheet)' }}
          >
            <div className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>
              Projected vote share · senate · {d.constituency}
            </div>
            <div className="flex items-baseline gap-2 mt-1 mb-3">
              <span className="font-serif font-bold text-[48px] leading-none" style={{ color: 'var(--forest-700)' }}>
                {lead ? `${lead.projectedShare.toFixed(1)}%` : '—'}
              </span>
              <sup className="font-serif text-[14px]" style={{ color: 'var(--ink-3)' }}>
                to Labour Party · ± 3.1 pts
              </sup>
            </div>

            {/* Stacked bar */}
            <div className="flex h-8 rounded-[3px] overflow-hidden">
              {d.candidates.map((c) => (
                <div
                  key={c.party}
                  className="flex items-center px-1.5 font-mono text-[9px] shrink-0 overflow-hidden"
                  style={{ flex: c.projectedShare, background: c.partyColor, color: c.party === 'LP' ? 'white' : c.party === 'APC' ? 'var(--paper)' : 'var(--ink-2)' }}
                >
                  {c.projectedShare > 10 ? `${c.party} ${c.projectedShare.toFixed(1)}%` : c.party}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-3 font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>
              <ConfidenceBar level={d.confidence as ConfidenceLevel} />
              <span>
                {d.confidence >= 4 ? 'Medium-high' : d.confidence >= 3 ? 'Medium' : 'Low'} confidence · n=412 PU
              </span>
            </div>
          </div>

          {/* Candidate breakdown */}
          <div className="mt-6">
            <div className="flex items-baseline gap-2 mb-3">
              <h3 className="font-serif font-semibold text-[15px]" style={{ color: 'var(--ink)' }}>Candidate breakdown</h3>
              <span className="font-serif italic text-[12px]" style={{ color: 'var(--ink-3)' }}>— no-shock model</span>
            </div>
            {d.candidates.map((c) => (
              <div
                key={c.party}
                className="grid items-center gap-3 py-2 border-b"
                style={{ gridTemplateColumns: '140px 1fr 60px', borderColor: 'var(--hair)' }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: c.partyColor, border: '1px solid var(--hair)' }}
                  />
                  <span className="font-sans text-[12px] truncate" style={{ color: 'var(--ink-2)' }}>{c.name}</span>
                </div>
                <div className="relative h-1.5 rounded-full" style={{ background: 'var(--hair)' }}>
                  <div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ width: `${c.projectedShare}%`, background: c.partyColor }}
                  />
                </div>
                <span className="font-mono text-[11px] text-right" style={{ color: 'var(--ink-2)' }}>
                  {c.projectedShare.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Notes */}
        <div className="border-t md:border-t-0 md:border-l p-4 flex flex-col gap-3" style={{ borderColor: 'var(--hair)' }}>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--forest-600)" strokeWidth="1.4">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="font-mono text-[10px]" style={{ color: 'var(--forest-700)' }}>Solon analyst</span>
          </div>

          <div
            className="border rounded-[4px] p-4 mt-1"
            style={{ borderColor: 'var(--ink)', borderTop: '3px solid var(--forest-600)', background: 'var(--sheet)' }}
          >
            <p className="font-serif text-[13px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
              <span className="float-left mr-1 leading-none font-serif" style={{ fontSize: '28px', color: 'var(--forest-600)', lineHeight: 1 }}>
                T
              </span>
              he baseline projection holds Labour Party at a strong plurality with 47.2%. This reflects the 2023 structural advantage in Onitsha North and Idemili wards, combined with the Soludo incumbency halo. [1][2]
            </p>
            <div className="flex items-center gap-2 mt-2">
              <ConfidenceBar level={d.confidence as ConfidenceLevel} />
              <span className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>Medium-high · n=412 PU</span>
            </div>
            <p className="font-serif italic text-[11px] mt-2" style={{ color: 'var(--ink-3)' }}>
              Sources [1] INEC 2023 result tables. [2] PU-level turnout model.
            </p>
          </div>

          <div
            className="rounded border p-3 font-mono text-[10px] mt-auto"
            style={{ background: 'var(--paper-2)', borderColor: 'var(--hair)', color: 'var(--ink-3)' }}
          >
            Solon refuses any lever combination that would model voter suppression in opposition wards.
          </div>
        </div>
      </div>
    </div>
  );
}
