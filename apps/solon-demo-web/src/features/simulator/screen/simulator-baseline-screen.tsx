import { ConfidenceBar, SkeletonCard } from '@solon/ui';
import { useSimulatorBaseline } from '../api/use-simulator-baseline';

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
    <div className="grid min-h-0" style={{ gridTemplateColumns: '1fr', gap: 0 }}>
      <div className="flex flex-col md:grid" style={{ gridTemplateColumns: '260px 1fr 300px' }}>

        {/* Left — Race context + Candidates */}
        <div className="border-b md:border-b-0 md:border-r p-4 space-y-3" style={{ borderColor: 'var(--hair)' }}>
          <h3 className="font-mono text-[10px] uppercase" style={{ color: 'var(--ink-3)' }}>Race</h3>

          {[
            { label: 'Office', value: 'President · Federal Republic of Nigeria' },
            { label: 'Cycle', value: '2027 general election' },
            { label: 'Turnout (baseline)', value: `${d.turnout_rate.toFixed(1)}%` },
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

          {d.candidates.filter((c) => c.party !== 'Others').map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-2 py-2 border-b"
              style={{ borderColor: 'var(--hair)' }}
            >
              <div
                className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center font-mono text-[9px] text-white font-bold"
                style={{ background: c.party_colour }}
              >
                {c.party}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-sans font-medium text-[13px] truncate" style={{ color: 'var(--ink)' }}>
                  {c.name}
                </div>
                <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
                  Baseline: {c.share.toFixed(1)}% ± {c.margin_of_error}pts
                </div>
              </div>
            </div>
          ))}

          <div className="pt-2 space-y-1.5">
            {[
              { label: 'AFP share', value: `${d.bello_share}%` },
              { label: 'Opposition share', value: `${d.opposition_share}%` },
              { label: 'Undecided', value: `${d.undecided_share}%` },
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
            2027 Presidential Election · Baseline
          </h1>
          <p className="font-serif italic text-[13px] mt-0.5 mb-4" style={{ color: 'var(--ink-3)' }}>
            — no-shock model · 2023 turnout basis.
          </p>

          {/* Output card */}
          <div
            className="border rounded-[4px] p-4"
            style={{ borderColor: 'var(--ink)', background: 'var(--sheet)' }}
          >
            <div className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>
              Projected vote share · presidential · Nigeria
            </div>
            <div className="flex items-baseline gap-2 mt-1 mb-3">
              <span className="font-serif font-bold text-[48px] leading-none" style={{ color: '#1D4ED8' }}>
                {lead ? `${lead.share.toFixed(1)}%` : '—'}
              </span>
              <sup className="font-serif text-[14px]" style={{ color: 'var(--ink-3)' }}>
                AFP · Bello · ± {lead?.margin_of_error ?? 0}pts
              </sup>
            </div>

            {/* Stacked bar */}
            <div className="flex h-8 rounded-[3px] overflow-hidden">
              {d.candidates.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center px-1.5 font-mono text-[9px] shrink-0 overflow-hidden"
                  style={{ flex: c.share, background: c.party_colour, color: 'white' }}
                >
                  {c.share > 8 ? `${c.party} ${c.share.toFixed(0)}%` : c.party}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-3 font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>
              <ConfidenceBar level={3} />
              <span>Medium confidence · no-shock model</span>
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
                key={c.id}
                className="grid items-center gap-3 py-2 border-b"
                style={{ gridTemplateColumns: '160px 1fr 60px', borderColor: 'var(--hair)' }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: c.party_colour }}
                  />
                  <span className="font-sans text-[12px] truncate" style={{ color: 'var(--ink-2)' }}>{c.name}</span>
                </div>
                <div className="relative h-1.5 rounded-full" style={{ background: 'var(--hair)' }}>
                  <div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ width: `${c.share}%`, background: c.party_colour }}
                  />
                </div>
                <span className="font-mono text-[11px] text-right" style={{ color: 'var(--ink-2)' }}>
                  {c.share.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Key variables */}
        <div className="border-t md:border-t-0 md:border-l p-4 flex flex-col gap-3" style={{ borderColor: 'var(--hair)' }}>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--forest-600)" strokeWidth="1.4">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="font-mono text-[10px]" style={{ color: 'var(--forest-700)' }}>Key variables</span>
          </div>

          <div className="space-y-2 mt-1">
            {d.top_variables.map((v) => {
              const borderColor = v.direction === 'positive' ? 'var(--forest-600)' : v.direction === 'negative' ? 'var(--orange)' : 'var(--hair)';
              const bg = v.direction === 'positive' ? 'var(--forest-50)' : v.direction === 'negative' ? 'var(--orange-soft)' : 'var(--paper-2)';
              return (
                <div
                  key={v.rank}
                  className="border rounded-[4px] p-3"
                  style={{ borderColor, background: bg }}
                >
                  <div className="font-sans font-medium text-[12px]" style={{ color: 'var(--ink)' }}>
                    {v.rank}. {v.name}
                  </div>
                  <div className="font-mono text-[10px] mt-0.5" style={{ color: 'var(--ink-3)' }}>{v.impact}</div>
                </div>
              );
            })}
          </div>

          <div className="font-mono text-[10px] mt-2" style={{ color: 'var(--ink-3)' }}>
            Swing states: {d.swing_states.join(' · ')}
          </div>

          <div
            className="rounded border p-3 font-mono text-[10px] mt-auto"
            style={{ background: 'var(--paper-2)', borderColor: 'var(--hair)', color: 'var(--ink-3)' }}
          >
            Solon refuses any lever combination that would model voter suppression.
          </div>
        </div>
      </div>
    </div>
  );
}
