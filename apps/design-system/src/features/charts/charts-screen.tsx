import { ConfidenceBar, VoteShareBar, TurnoutGauge, SpendingBreakdown, TallyTicker } from '@solon/ui';
import type { TallySnapshot } from '@solon/ui';

function Scene({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <div className="flex items-baseline gap-3 mb-4 pb-2 border-b" style={{ borderColor: 'var(--hair)' }}>
        <span className="font-sans text-[13px]" style={{ color: 'var(--ink-2)' }}>{title}</span>
        {subtitle && <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}

export function ChartsScreen() {
  return (
    <div className="max-w-[760px]">
      {/* Page header */}
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>
          22 / DATA & STATE
        </div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>
          Charts
        </div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>
          — vote share, scenario lines, crosstab, issue salience.
        </div>
      </div>

      {/* Scene 1 — vote share stacked bar */}
      <Scene title="Scene · vote share stacked bar" subtitle="baseline projection · Anambra Central senate">
        <div className="mb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: 'var(--ink-4)' }}>
            Vote share · baseline · Anambra Central
          </span>
        </div>
        <h3 className="font-serif italic text-[18px] mb-4" style={{ color: 'var(--ink)' }}>
          Projected outcome{' '}
          <span className="font-serif not-italic text-[14px]" style={{ color: 'var(--ink-3)' }}>
            — senate, 2027
          </span>
        </h3>

        {/* Stacked bar */}
        <div className="flex rounded overflow-hidden mb-3" style={{ height: '36px' }}>
          <div
            className="flex items-center font-mono text-[11px] px-2 shrink-0"
            style={{ flex: 47.2, background: 'var(--forest-600)', color: 'white' }}
          >
            LP · 47.2%
          </div>
          <div
            className="flex items-center font-mono text-[11px] px-2 shrink-0"
            style={{ flex: 22.1, background: 'var(--ink)', color: 'white' }}
          >
            APC · 22.1%
          </div>
          <div
            className="flex items-center font-mono text-[11px] px-2 shrink-0"
            style={{ flex: 18.4, background: 'var(--paper-3, #D8D3C8)', color: 'var(--ink-2)' }}
          >
            APGA · 18.4%
          </div>
          <div
            className="flex items-center font-mono text-[11px] px-2 shrink-0"
            style={{ flex: 9.8, background: '#FFF3E0', color: 'var(--ink-2)' }}
          >
            PDP · 9.8%
          </div>
          <div
            className="flex items-center font-mono text-[11px] px-2 shrink-0"
            style={{ flex: 2.5, background: 'var(--paper-2)', color: 'var(--ink-4)' }}
          >
            ·
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-4">
          {[
            { color: 'var(--forest-600)', label: 'LP' },
            { color: 'var(--ink)', label: 'APC' },
            { color: 'var(--paper-3, #D8D3C8)', label: 'APGA', border: '1px solid var(--hair)' },
            { color: '#FFF3E0', label: 'PDP', border: '1px solid var(--hair)' },
          ].map(({ color, label, border }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-[2px]" style={{ background: color, border }} />
              <span className="font-sans text-[11px]" style={{ color: 'var(--ink-3)' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-sans text-[11px]" style={{ color: 'var(--ink-4)' }}>Confidence:</span>
          <ConfidenceBar level={4} />
          <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>± 3.1 pts · baseline as of 2026-05-11</span>
        </div>
      </Scene>

      {/* Scene 2 — scenario area chart */}
      <Scene title="Scene · scenario area chart" subtitle="LP vote share · turnout sensitivity">
        <svg viewBox="0 0 600 200" width="100%" height={200} style={{ display: 'block' }}>
          {/* Y-axis labels */}
          {[
            { label: '55%', y: 20 },
            { label: '45%', y: 70 },
            { label: '35%', y: 120 },
            { label: '25%', y: 170 },
          ].map(({ label, y }) => (
            <g key={label}>
              <text x={0} y={y + 4} fontFamily="monospace" fontSize={9} fill="var(--ink-4)">{label}</text>
              <line x1={32} y1={y} x2={600} y2={y} stroke="var(--hair)" strokeWidth={1} strokeDasharray="3 3" />
            </g>
          ))}

          {/* Confidence band */}
          <polygon
            points="0,60 600,50 600,98 0,140"
            fill="var(--forest-100, #DCFCE7)"
            opacity={0.5}
          />

          {/* LP baseline */}
          <polyline
            points="0,100 180,95 320,100 480,85 600,74"
            stroke="var(--forest-600)"
            strokeWidth={2}
            fill="none"
          />

          {/* APC dashed */}
          <polyline
            points="0,130 180,128 320,120 480,115 600,108"
            stroke="var(--ink)"
            strokeWidth={1.4}
            strokeDasharray="4 3"
            fill="none"
          />

          {/* Baseline label dot */}
          <circle cx={320} cy={100} r={4} fill="var(--forest-600)" />
          <text x={330} y={98} fontFamily="monospace" fontSize={9} fill="var(--forest-700)">baseline · 47.2%</text>

          {/* X-axis labels */}
          {[
            { label: '2019', x: 0 },
            { label: '2023', x: 180 },
            { label: 'baseline', x: 320 },
            { label: '+youth', x: 520 },
          ].map(({ label, x }) => (
            <text key={label} x={x} y={196} fontFamily="monospace" fontSize={9} fill="var(--ink-4)">{label}</text>
          ))}
        </svg>

        {/* Legend footer */}
        <div className="mt-2 font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
          LP —— forest · APC - - - ink · Band ± 3.1 pts
        </div>
      </Scene>

      {/* Scene 3 — crosstab heat grid */}
      <Scene title="Scene · crosstab heat grid" subtitle="vote share × age cohort × LGA">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {['LGA', '18–34', '35–54', '55+', 'All'].map((h) => (
                  <th
                    key={h}
                    className="font-mono text-[10px] uppercase text-left px-3 py-2 border-b tracking-[0.08em]"
                    style={{ color: 'var(--ink-3)', borderColor: 'var(--hair)' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  lga: 'Onitsha North',
                  cells: [
                    { val: '+12.4', heat: 'h' },
                    { val: '+4.1', heat: 'm' },
                    { val: '–1.2', heat: 'l' },
                    { val: '+6.4', heat: 'h' },
                  ],
                },
                {
                  lga: 'Onitsha South',
                  cells: [
                    { val: '+8.7', heat: 'h' },
                    { val: '+2.0', heat: 'm' },
                    { val: '–3.6', heat: 'l' },
                    { val: '+3.1', heat: 'm' },
                  ],
                },
                {
                  lga: 'Idemili North',
                  cells: [
                    { val: '+5.2', heat: 'm' },
                    { val: '–0.4', heat: 'l' },
                    { val: '–4.8', heat: 'l' },
                    { val: '+0.8', heat: 'm' },
                  ],
                },
                {
                  lga: 'Ogbaru',
                  cells: [
                    { val: '–2.1', heat: 'l' },
                    { val: '–6.4', heat: 'l' },
                    { val: '–8.2', heat: 'l' },
                    { val: '–5.7', heat: 'l' },
                  ],
                },
                {
                  lga: 'Oyi',
                  cells: [
                    { val: '+14.2', heat: 'h' },
                    { val: '+7.8', heat: 'h' },
                    { val: '+1.4', heat: 'm' },
                    { val: '+8.0', heat: 'h' },
                  ],
                },
              ].map((row) => (
                <tr key={row.lga}>
                  <td className="font-sans text-[12px] px-3 py-2 border-b" style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)' }}>
                    {row.lga}
                  </td>
                  {row.cells.map((cell, i) => {
                    const styles =
                      cell.heat === 'h'
                        ? { background: 'var(--forest-50)', color: 'var(--forest-700)' }
                        : cell.heat === 'm'
                        ? { background: 'var(--paper-2)', color: 'var(--ink-2)' }
                        : { background: '#FFF3E0', color: 'var(--orange)' };
                    return (
                      <td
                        key={i}
                        className="font-mono text-[12px] px-3 py-2 border-b text-right"
                        style={{ borderColor: 'var(--hair)', ...styles }}
                      >
                        {cell.val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-2 font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
          Reading = LP gain (+) or loss (–) vs 2023 actual, in percentage points · n=412 PU
        </div>
      </Scene>

      {/* Scene 4 — issue salience */}
      <Scene title="Scene · issue salience" subtitle="top 6 issues · Anambra Central · week of May 5–11">
        <div className="flex flex-col gap-2">
          {[
            { rank: '01', name: 'Cost of living', pct: 92, delta: '↑ 14%', deltaColor: 'var(--forest-700)' },
            { rank: '02', name: 'Insecurity · Onitsha', pct: 71, delta: '↑ 22%', deltaColor: 'var(--forest-700)' },
            { rank: '03', name: 'Manufacturing revival', pct: 58, delta: '→ 0%', deltaColor: 'var(--ink-3)' },
            { rank: '04', name: 'Soludo–LP alignment', pct: 42, delta: '↑ 38%', deltaColor: 'var(--forest-700)' },
            { rank: '05', name: 'Education funding', pct: 36, delta: '↓ 8%', deltaColor: 'var(--orange)' },
            { rank: '06', name: 'Naira reform', pct: 28, delta: '↓ 12%', deltaColor: 'var(--orange)' },
          ].map((issue) => (
            <div key={issue.rank} className="flex items-center gap-3">
              <span
                className="font-mono text-[13px] font-semibold shrink-0"
                style={{ color: 'var(--forest-600)', width: '32px' }}
              >
                {issue.rank}
              </span>
              <span className="font-sans text-[13px] shrink-0" style={{ color: 'var(--ink-2)', width: '200px' }}>
                {issue.name}
              </span>
              <div className="flex-1" style={{ background: 'var(--hair)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{ height: '8px', borderRadius: '4px', background: 'var(--forest-600)', width: `${issue.pct}%` }}
                />
              </div>
              <span className="font-mono text-[11px] shrink-0" style={{ color: issue.deltaColor, width: '52px', textAlign: 'right' }}>
                {issue.delta}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 font-serif italic text-[12px]" style={{ color: 'var(--ink-3)' }}>
          Sources — radio call-in (52%), Nairaland (24%), public X (18%), public WhatsApp (6%)
        </div>
      </Scene>

      {/* Scene 5 — VoteShareBar (recharts) */}
      <Scene title="Scene · VoteShareBar" subtitle="horizontal bar — party vote share · recharts">
        <VoteShareBar
          title="Projected outcome"
          subtitle="senate, 2027"
          confidence={4}
          entries={[
            { party: 'LP', share: 47.2 },
            { party: 'APC', share: 22.1 },
            { party: 'APGA', share: 18.4 },
            { party: 'PDP', share: 9.8 },
          ]}
        />
      </Scene>

      {/* Scene 6 — TurnoutGauge (recharts) */}
      <Scene title="Scene · TurnoutGauge" subtitle="radial gauge — projected vs target turnout · recharts">
        <div className="flex gap-10 flex-wrap">
          <TurnoutGauge projected={62} target={70} historical={58} label="Anambra Central" />
          <TurnoutGauge projected={71} target={70} historical={66} label="Onitsha North" />
          <TurnoutGauge projected={44} target={60} historical={52} label="Ogbaru" />
        </div>
      </Scene>

      {/* Scene 7 — SpendingBreakdown (recharts) */}
      <Scene title="Scene · SpendingBreakdown" subtitle="donut chart — campaign spending by category · recharts">
        <div className="max-w-[380px]">
          <SpendingBreakdown
            totalBudget={5_000_000_000}
            categories={[
              { name: 'Logistics', amount: 1_200_000_000 },
              { name: 'Media / comms', amount: 950_000_000 },
              { name: 'Agent stipends', amount: 720_000_000 },
              { name: 'Events', amount: 580_000_000 },
              { name: 'Ops', amount: 410_000_000 },
            ]}
          />
        </div>
      </Scene>

      {/* Scene 8 — TallyTicker (recharts) */}
      <Scene title="Scene · TallyTicker" subtitle="area chart — live tally progression · recharts">
        <TallyTicker
          totalPUs={412}
          snapshots={[
            { time: '14:00', lp: 44.2, apc: 24.1, pdp: 11.3, reported: 12 },
            { time: '15:00', lp: 45.8, apc: 23.6, pdp: 11.1, reported: 58 },
            { time: '16:00', lp: 46.4, apc: 22.9, pdp: 10.8, reported: 134 },
            { time: '17:00', lp: 47.0, apc: 22.3, pdp: 10.6, reported: 220 },
            { time: '18:00', lp: 47.2, apc: 22.1, pdp: 10.4, reported: 312 },
            { time: '19:00', lp: 47.5, apc: 21.8, pdp: 10.2, reported: 389 },
          ] satisfies TallySnapshot[]}
        />
      </Scene>
    </div>
  );
}
