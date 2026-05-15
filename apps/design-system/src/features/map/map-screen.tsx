import { Button, TierChip } from '@solon/ui';

const TIER_DATA: { tier: 'hold-strong' | 'hold' | 'toss' | 'opp' | 'opp-strong'; pu: string; pct: string }[] = [
  { tier: 'hold-strong', pu: '142 PU', pct: '34.5%' },
  { tier: 'hold', pu: '98 PU', pct: '23.8%' },
  { tier: 'toss', pu: '67 PU', pct: '16.3%' },
  { tier: 'opp', pu: '71 PU', pct: '17.2%' },
  { tier: 'opp-strong', pu: '34 PU', pct: '8.2%' },
];

const PU_DOTS = [
  { cx: 90, cy: 70 }, { cx: 130, cy: 90 }, { cx: 250, cy: 55 }, { cx: 300, cy: 70 },
  { cx: 370, cy: 60 }, { cx: 460, cy: 80 }, { cx: 490, cy: 120 }, { cx: 200, cy: 200 },
  { cx: 280, cy: 220 }, { cx: 350, cy: 240 }, { cx: 100, cy: 300 }, { cx: 450, cy: 220 },
];

const LEGEND_ITEMS = [
  { color: '#14342A', label: 'Strong hold' },
  { color: 'var(--forest-600)', label: 'Lean hold' },
  { color: 'var(--orange)', label: 'Toss-up' },
  { color: 'var(--paper-3, #D8D3C8)', label: 'Lean opp.' },
  { color: '#222', label: 'Strong opp.' },
];

export function MapScreen() {
  return (
    <div style={{ maxWidth: 'none' }}>
      {/* Page header */}
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>
          31 / SCREENS
        </div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>
          Constituency map
        </div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>
          — ward polygons, PU dots, callout, tier legend.
        </div>
      </div>

      {/* Three-column grid */}
      <div
        className="grid border-t"
        style={{ gridTemplateColumns: '220px 1fr 240px', borderColor: 'var(--hair)' }}
      >
        {/* Left panel */}
        <div className="border-r p-4" style={{ borderColor: 'var(--hair)' }}>
          <h2 className="font-serif font-semibold text-[20px]" style={{ color: 'var(--ink)' }}>
            Anambra Central
          </h2>
          <div className="font-serif italic text-[12px] mt-1" style={{ color: 'var(--ink-3)' }}>
            — 412 polling units across 5 LGAs · senate, 2027 cycle.
          </div>

          {/* Stat grid */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[
              { label: 'Registered', value: '186,492', mono: true },
              { label: '2023 turnout', value: '41.3%', mono: true },
              { label: 'Projection', value: '47.2%', serif: true },
              { label: 'Margin · 2nd', value: '+25.1 pt', serif: true, highlight: true },
            ].map(({ label, value, mono, serif, highlight }) => (
              <div key={label}>
                <div className="font-mono text-[9px] uppercase" style={{ color: 'var(--ink-4)' }}>{label}</div>
                <div
                  className={mono ? 'font-mono font-semibold text-[15px]' : 'font-serif text-[15px]'}
                  style={{ color: highlight || serif ? 'var(--forest-700)' : 'var(--ink)' }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div className="h-px my-4" style={{ background: 'var(--hair)' }} />
          <h3 className="font-mono text-[9px] uppercase" style={{ color: 'var(--ink-3)' }}>TIER BREAKDOWN</h3>

          {TIER_DATA.map(({ tier, pu, pct }) => (
            <div
              key={tier}
              className="flex justify-between items-center py-1.5 border-b"
              style={{ borderColor: 'var(--hair)' }}
            >
              <TierChip tier={tier} />
              <span className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>{pu}</span>
              <span className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>{pct}</span>
            </div>
          ))}
        </div>

        {/* Center map area */}
        <div>
          {/* Map toolbar */}
          <div
            className="flex items-center gap-2 px-4 py-2 border-b"
            style={{ borderColor: 'var(--hair)' }}
          >
            {['Win-probability', '2023 result', 'Turnout'].map((label, i) => (
              <button
                key={label}
                className="font-mono text-[10px] px-2 py-1 rounded"
                style={{
                  background: i === 0 ? 'var(--ink)' : 'transparent',
                  color: i === 0 ? 'var(--paper)' : 'var(--ink-3)',
                }}
              >
                {label}
              </button>
            ))}
            <div className="w-px h-4 mx-1" style={{ background: 'var(--hair)' }} />
            {['All cycles', '2023', '2019'].map((label, i) => (
              <button
                key={label}
                className="font-mono text-[10px] px-2 py-1 rounded"
                style={{
                  background: i === 0 ? 'var(--ink)' : 'transparent',
                  color: i === 0 ? 'var(--paper)' : 'var(--ink-3)',
                }}
              >
                {label}
              </button>
            ))}
            <div className="flex-1" />
            <span
              className="font-mono text-[10px] px-2 py-1 rounded"
              style={{ color: 'var(--forest-700)' }}
            >
              412 / 412 PU loaded
            </span>
          </div>

          {/* SVG map */}
          <svg viewBox="0 0 700 500" width="100%" preserveAspectRatio="xMidYMid meet">
            {/* Ward polygons */}
            <polygon points="50,50 180,30 220,120 150,160 60,130" fill="#14342A" opacity={0.9} />
            <polygon points="180,30 310,20 340,100 220,120" fill="var(--forest-600)" />
            <polygon points="310,20 440,40 420,150 340,100" fill="var(--orange)" opacity={0.85} />
            <polygon points="440,40 560,60 530,180 420,150" fill="var(--paper-3, #D8D3C8)" />
            <polygon points="50,130 150,160 130,260 40,240" fill="#14342A" />
            <polygon points="150,160 270,170 250,280 130,260" fill="var(--forest-600)" />
            <polygon points="270,170 420,150 400,280 250,280" fill="var(--orange)" />
            <polygon points="420,150 530,180 520,300 400,280" fill="#222" />
            <polygon points="50,240 130,260 120,370 50,350" fill="var(--forest-600)" />

            {/* PU dots */}
            {PU_DOTS.map(({ cx, cy }, i) => (
              <circle key={i} cx={cx} cy={cy} r={3} fill="white" opacity={0.7} />
            ))}

            {/* Selected PU callout */}
            <circle cx={120} cy={80} r={8} stroke="var(--forest-600)" strokeWidth={2} fill="none" />
            <circle cx={120} cy={80} r={10} stroke="var(--forest-600)" strokeWidth={1} strokeDasharray="3 3" fill="none" />
            <line x1={120} y1={80} x2={40} y2={36} stroke="var(--ink)" strokeWidth={1} />
            <rect x={10} y={20} width={120} height={30} fill="var(--ink)" rx={2} />
            <text x={15} y={31} fill="var(--paper)" fontFamily="monospace" fontSize={9}>PU 008-04-02</text>
            <text x={15} y={44} fill="var(--paper)" fontFamily="serif" fontSize={9} fontStyle="italic">
              St. Mary's · Strong hold
            </text>

            {/* Legend */}
            <foreignObject x={500} y={380} width={190} height={120}>
              <div
                style={{
                  background: 'var(--sheet)',
                  border: '1px solid var(--hair)',
                  borderRadius: 4,
                  padding: 8,
                }}
              >
                {LEGEND_ITEMS.map(({ color, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: color, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--ink-2)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </foreignObject>
          </svg>
        </div>

        {/* Right panel */}
        <div className="border-l p-4" style={{ borderColor: 'var(--hair)' }}>
          <h4 className="font-sans font-semibold text-[14px]" style={{ color: 'var(--ink)' }}>
            St. Mary's Primary
          </h4>
          <div className="font-mono text-[10px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
            Onitsha North · ward 4 / PU 008-04-02 · LGA-008
          </div>

          {/* KV pairs */}
          <div className="space-y-1.5 mt-3">
            {[
              { label: 'Registered', value: '1,284', serif: false },
              { label: '2023 result', value: 'LP · 51.3%', serif: false },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>{label}</span>
                <span className="font-sans text-[12px]" style={{ color: 'var(--ink)' }}>{value}</span>
              </div>
            ))}
            <div className="flex justify-between">
              <span className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>Projected 2027</span>
              <span className="font-serif text-[13px]" style={{ color: 'var(--forest-700)' }}>LP 52.1% ± 2.4</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>Tier</span>
              <TierChip tier="hold-strong" />
            </div>
          </div>

          {/* Drivers */}
          <div className="mt-4">
            <h5 className="font-mono text-[10px] uppercase" style={{ color: 'var(--ink-3)' }}>KEY DRIVERS</h5>
            <ol className="mt-2 space-y-1">
              {[
                'High incumbent loyalty in ward 4 micro-cluster',
                'Youth turnout above constituency median (+4.2 pt)',
                'No active opposition ground presence logged',
              ].map((driver, i) => (
                <li key={i} className="font-sans text-[12px]" style={{ color: 'var(--ink-2)' }}>
                  {i + 1}. {driver}
                </li>
              ))}
            </ol>
          </div>

          {/* Suggested outreach */}
          <div
            className="rounded p-3 mt-4 font-serif italic text-[12px]"
            style={{ background: 'var(--forest-50)', color: 'var(--ink)' }}
          >
            Maintain current outreach. Persuadable share is small (~4.1%). Allocate ground-staff hours to the toss-up wards south of here.
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-4 flex-wrap">
            <Button variant="quiet" size="sm">Watchlist</Button>
            <Button variant="quiet" size="sm">Brief</Button>
            <Button variant="secondary" size="sm">Open scenarios</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
