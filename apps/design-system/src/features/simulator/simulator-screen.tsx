import { Avatar, Button, ConfidenceBar } from '@solon/ui';

export function SimulatorScreen() {
  return (
    <div style={{ maxWidth: 'none' }}>
      {/* Page header */}
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>
          30 / SCREENS
        </div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>
          Simulator
        </div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>
          — masthead, race panel, output card, levers, AI copilot.
        </div>
      </div>

      {/* Masthead bar */}
      <div
        className="flex items-center px-6 py-3 gap-4 border-b"
        style={{ borderBottom: '1px solid var(--ink)', background: 'var(--sheet)' }}
      >
        <div>
          <span className="font-serif text-[22px]" style={{ color: 'var(--ink)' }}>Solon</span>
          <span className="font-serif italic text-[12px] ml-2" style={{ color: 'var(--ink-3)' }}>
            — Election Simulator · a parliamentary order paper
          </span>
        </div>
        <div className="flex-1" />
        <span className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>
          SIMULATOR / ANAMBRA CENTRAL / SENATE / SOLUDO–LP SCENARIO
        </span>
        <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
          11 May 2026 · 14:08 WAT / cycle: 2027 general
        </span>
        <Button variant="quiet" size="sm">Compare</Button>
        <Button variant="secondary" size="sm">Save</Button>
        <Button variant="primary" size="sm">Re-run</Button>
      </div>

      {/* Three-column body */}
      <div
        className="grid border-t"
        style={{ gridTemplateColumns: '280px 1fr 320px', gap: 0, borderColor: 'var(--hair)' }}
      >
        {/* Left panel */}
        <div className="border-r p-4 space-y-4" style={{ borderColor: 'var(--hair)' }}>
          <h3 className="font-mono text-[10px] uppercase" style={{ color: 'var(--ink-3)' }}>RACE</h3>

          {/* Field rows */}
          {[
            { label: 'Constituency', value: 'Anambra Central' },
            { label: 'Office', value: 'Senate ▾' },
            { label: 'Cycle', value: '2027 general' },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="font-mono text-[10px] mb-1" style={{ color: 'var(--ink-3)' }}>{label}</div>
              <div
                className="border rounded px-2 py-1.5 font-sans text-[13px]"
                style={{ borderColor: 'var(--hair)', color: 'var(--ink)' }}
              >
                {value}
              </div>
            </div>
          ))}

          <h3 className="font-mono text-[10px] uppercase mt-4 pt-2" style={{ color: 'var(--ink-3)' }}>CANDIDATES</h3>

          {[
            { initials: 'SO', variant: 'forest' as const, name: 'Soludo, Charles · LP', note: 'incumbent gov · coalition signal' },
            { initials: 'UE', variant: undefined, name: 'Umeh, Victor · APGA', note: 'two-term sitting senator' },
            { initials: 'AC', variant: undefined, name: 'Achonu, Athan · APC', note: 'running mate · governorship \'23' },
            { initials: 'NO', variant: undefined, name: 'Nwoye, Tony · PDP', note: 'prior senate aspirant' },
          ].map(({ initials, variant, name, note }) => (
            <div
              key={initials}
              className="flex items-center gap-2 py-2 border-b"
              style={{ borderColor: 'var(--hair)' }}
            >
              <Avatar initials={initials} size="sm" variant={variant} />
              <div>
                <div className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>{name}</div>
                <div className="font-serif italic text-[11px]" style={{ color: 'var(--ink-3)' }}>{note}</div>
              </div>
            </div>
          ))}

          <button className="font-mono text-[10px]" style={{ color: 'var(--forest-600)' }}>
            + add hypothetical profile
          </button>

          <h3 className="font-mono text-[10px] uppercase mt-4 pt-2" style={{ color: 'var(--ink-3)' }}>SAVED SCENARIOS</h3>

          {[
            { name: 'Baseline', pct: '47.2%', color: 'var(--forest-700)', active: false },
            { name: 'Soludo–LP coalition', pct: '53.4%', color: 'var(--forest-700)', active: true },
            { name: 'Security shock · sev 4', pct: '42.1%', color: 'var(--orange)', active: false },
            { name: 'BVAS failure 12%', pct: '45.6%', color: 'var(--ink-2)', active: false },
          ].map(({ name, pct, color, active }) => (
            <div
              key={name}
              className="flex justify-between items-center py-2 border-b"
              style={{
                borderColor: 'var(--hair)',
                background: active ? 'var(--paper-2)' : undefined,
                fontWeight: active ? 500 : undefined,
                borderRadius: active ? 3 : undefined,
                padding: active ? '4px 6px' : undefined,
              }}
            >
              <span className="font-sans text-[13px]" style={{ color: 'var(--ink)' }}>{name}</span>
              <span className="font-serif text-[14px]" style={{ color }}>{pct}</span>
            </div>
          ))}
        </div>

        {/* Center panel */}
        <div className="p-6">
          <h1 className="font-serif font-semibold text-[24px]" style={{ color: 'var(--ink)' }}>
            Soludo backs LP, with youth lift
          </h1>
          <div className="font-serif italic text-[13px] mt-1" style={{ color: 'var(--ink-3)' }}>
            — a parliamentary brief produced 2026-05-11, 14:08 WAT.
          </div>

          {/* Output card */}
          <div
            className="border rounded-[4px] p-4 mt-4"
            style={{ borderColor: 'var(--ink)', background: 'var(--sheet)' }}
          >
            <div className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>
              Projected vote share · senate · Anambra Central
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif font-bold text-[48px] leading-none" style={{ color: 'var(--forest-700)' }}>
                53.4%
              </span>
              <sup className="font-serif text-[16px]" style={{ color: 'var(--ink-3)' }}>
                to Labour Party ± 3.8 pts
              </sup>
            </div>

            {/* Stacked bar */}
            <div className="flex h-8 rounded overflow-hidden mt-3">
              <div
                className="flex items-center px-2 font-mono text-[10px]"
                style={{ flex: '53.4', background: 'var(--forest-600)', color: 'white' }}
              >
                LP 53.4%
              </div>
              <div
                className="flex items-center px-2 font-mono text-[10px]"
                style={{ flex: '19.8', background: 'var(--ink)', color: 'var(--paper)' }}
              >
                APC
              </div>
              <div
                className="flex items-center px-2 font-mono text-[10px]"
                style={{ flex: '14.7', background: 'var(--paper-3, #D8D3C8)', color: 'var(--ink-2)' }}
              >
                APGA
              </div>
              <div
                className="flex items-center px-2 font-mono text-[10px]"
                style={{ flex: '9.1', background: '#FFF3E0', color: 'var(--ink-3)' }}
              >
                PDP
              </div>
              <div style={{ flex: '3', background: 'var(--paper-2)' }} />
            </div>

            {/* Footer */}
            <div className="flex items-center gap-2 mt-2 font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>
              <ConfidenceBar level={4} />
              <span>
                Medium-high · Delta vs baseline{' '}
                <span style={{ color: 'var(--forest-700)' }}>+6.2 pt</span>{' '}
                · n=412 PU
              </span>
            </div>
          </div>

          {/* Levers */}
          <div className="mt-6">
            <div className="flex items-baseline gap-2">
              <h3 className="font-serif font-semibold text-[16px]" style={{ color: 'var(--ink)' }}>Levers</h3>
              <span className="font-serif italic text-[12px]" style={{ color: 'var(--ink-3)' }}>— scrub to re-run</span>
            </div>

            {[
              { label: 'Soludo–LP alignment', pct: 60, value: 'Strong', color: 'var(--forest-600)', valueColor: 'var(--forest-700)', warn: false },
              { label: 'Overall turnout', pct: 60, value: '+5.4', color: 'var(--forest-600)', valueColor: 'var(--forest-700)', warn: false },
              { label: 'Youth turnout · 18–34', pct: 65, value: '+8.0', color: 'var(--forest-600)', valueColor: 'var(--forest-700)', warn: false },
              { label: 'APGA candidate strength', pct: 30, value: 'weak', color: 'var(--orange)', valueColor: 'var(--orange)', warn: true },
              { label: 'BVAS failure', pct: 20, value: '3.6%', color: 'var(--orange)', valueColor: 'var(--orange)', warn: true },
              { label: 'Issue shock · cost of living', pct: 25, value: 'sev 3', color: 'var(--orange)', valueColor: 'var(--orange)', warn: true },
            ].map(({ label, pct, value, color, valueColor }) => (
              <div
                key={label}
                className="grid items-center gap-3 py-2 border-b"
                style={{ gridTemplateColumns: '200px 1fr 70px', borderColor: 'var(--hair)' }}
              >
                <span className="font-sans text-[12px]" style={{ color: 'var(--ink-2)' }}>{label}</span>
                <div className="relative h-1.5 rounded" style={{ background: 'var(--hair)' }}>
                  <div
                    className="absolute left-0 top-0 h-full rounded"
                    style={{ width: `${pct}%`, background: color }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2"
                    style={{ left: `${pct}%`, transform: 'translate(-50%, -50%)', background: 'var(--sheet)', borderColor: color }}
                  />
                </div>
                <span className="font-mono text-[11px] text-right" style={{ color: valueColor }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Ethical note */}
          <div
            className="rounded border p-3 font-mono text-[10px] mt-4"
            style={{ background: 'var(--paper-2)', borderColor: 'var(--hair)', color: 'var(--ink-3)' }}
          >
            Solon refuses any lever combination that would model voter suppression in opposition wards.
          </div>
        </div>

        {/* Right panel — AI Copilot */}
        <div className="border-l p-4 flex flex-col gap-3" style={{ borderColor: 'var(--hair)' }}>
          {/* Header */}
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--forest-600)" strokeWidth="1.4">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="font-mono text-[10px]" style={{ color: 'var(--forest-700)' }}>Solon analyst</span>
            <span
              className="font-mono text-[9px] px-2 rounded-full"
              style={{ background: 'var(--forest-50)', color: 'var(--forest-700)' }}
            >
              NEUTRAL
            </span>
          </div>

          {/* User question */}
          <div
            className="px-3 py-2 font-sans italic text-[12px]"
            style={{
              background: 'var(--paper-2)',
              borderLeft: '2px solid var(--ink)',
              color: 'var(--ink-2)',
            }}
          >
            What happens in Anambra Central if Soludo backs the LP candidate and APGA fields a weak alternative?
          </div>

          {/* AI answer */}
          <div
            className="border rounded-[4px] p-4"
            style={{
              borderColor: 'var(--ink)',
              borderTop: '3px solid var(--forest-600)',
            }}
          >
            <p className="font-serif text-[13px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
              The model attributes Labour Party's 6.2-point lift in Anambra Central — from the 47.2% baseline to 53.4% — to two reinforcing forces. First, a turnout rebound in the 18–34 cohort. Second, a weakening of APGA's ground operation following the Soludo–Obi alignment signal. [1][2][3]
            </p>
            <div className="flex items-center gap-2 mt-2">
              <ConfidenceBar level={4} />
              <span className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>Medium-high · n=412 PU</span>
            </div>
            <p className="font-serif italic text-[11px] mt-2" style={{ color: 'var(--ink-3)' }}>
              Sources [1] Anambra Central PU-level turnout. [2] Coalition-carry model. [3] BVAS audit log.
            </p>
          </div>

          {/* Composer */}
          <div className="border rounded p-3 mt-auto" style={{ borderColor: 'var(--hair)' }}>
            <textarea
              rows={2}
              placeholder="Ask a follow-up…"
              className="font-sans text-[12px] bg-transparent outline-none w-full resize-none"
              style={{ color: 'var(--ink)' }}
            />
            <div className="flex justify-end mt-2">
              <Button variant="primary" size="sm">Ask</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
