import { Button, ConfidenceBar, TierChip } from '@solon/ui';
import type { ConfidenceLevel, TierVariant } from '@solon/ui';

type PURow = {
  code: string;
  name: string;
  ward: string;
  registered: string;
  projParty: string;
  projPct: string;
  projColor: string;
  projBand: string;
  confidence: ConfidenceLevel;
  tier: TierVariant;
};

const PU_ROWS: PURow[] = [
  {
    code: 'PU 008-04-02',
    name: "St. Mary's Primary",
    ward: 'Onitsha North · ward 4',
    registered: '1,284',
    projParty: 'LP',
    projPct: '52.1%',
    projColor: 'var(--forest-700)',
    projBand: '± 2.4',
    confidence: 4,
    tier: 'hold-strong',
  },
  {
    code: 'PU 008-04-09',
    name: 'Onitsha Town Hall',
    ward: 'ward 4',
    registered: '2,041',
    projParty: 'LP',
    projPct: '47.2%',
    projColor: 'var(--forest-700)',
    projBand: '± 3.1',
    confidence: 3,
    tier: 'hold',
  },
  {
    code: 'PU 008-04-11',
    name: 'Niger Bridge Head Yard',
    ward: 'ward 4',
    registered: '1,876',
    projParty: 'LP',
    projPct: '44.8%',
    projColor: 'var(--forest-700)',
    projBand: '± 2.9',
    confidence: 3,
    tier: 'hold',
  },
  {
    code: 'PU 008-05-11',
    name: 'Nkpor Civic Centre',
    ward: 'ward 5',
    registered: '896',
    projParty: 'LP',
    projPct: '38.6%',
    projColor: 'var(--orange)',
    projBand: '± 4.0',
    confidence: 2,
    tier: 'toss',
  },
  {
    code: 'PU 008-05-12',
    name: 'Nkpor 2 Square',
    ward: 'ward 5',
    registered: '1,114',
    projParty: 'LP',
    projPct: '36.4%',
    projColor: 'var(--orange)',
    projBand: '± 3.8',
    confidence: 2,
    tier: 'toss',
  },
  {
    code: 'PU 008-06-03',
    name: 'Iyiowa Town Hall',
    ward: 'ward 6',
    registered: '722',
    projParty: 'APC',
    projPct: '41.3%',
    projColor: 'var(--ink)',
    projBand: '± 5.2',
    confidence: 3,
    tier: 'opp',
  },
  {
    code: 'PU 008-06-04',
    name: 'Ogbaru Primary School',
    ward: 'ward 6',
    registered: '1,544',
    projParty: 'APC',
    projPct: '48.7%',
    projColor: 'var(--ink)',
    projBand: '± 3.0',
    confidence: 4,
    tier: 'opp-strong',
  },
  {
    code: 'PU 008-07-01',
    name: 'Awkuzu Court',
    ward: 'ward 7',
    registered: '1,212',
    projParty: 'LP',
    projPct: '49.0%',
    projColor: 'var(--forest-600)',
    projBand: '± 2.6',
    confidence: 4,
    tier: 'hold-strong',
  },
];

const GRID = '110px 1fr 110px 180px 130px 110px';

export function PulistScreen() {
  return (
    <div className="max-w-[900px]">
      {/* Page header */}
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>
          21 / DATA & STATE
        </div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>
          Win-probability list
        </div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>
          — the signature data display.
        </div>
      </div>

      {/* Intro paragraph */}
      <p className="font-serif italic text-[14px] leading-relaxed mb-8 max-w-[70ch]" style={{ color: 'var(--ink-3)' }}>
        If Solon had to be judged on one specimen, it would be this one. The win-probability list is the spine of the
        constituency-intelligence module — every polling unit, its registered count (fact, mono), the model's projection
        (estimate, serif), and the tier chip.
      </p>

      {/* Toolbar */}
      <div
        className="flex items-center justify-between gap-4 mb-1 px-3 py-2 rounded-t-[4px]"
        style={{ background: 'var(--paper-2)', borderBottom: '1px solid var(--hair)' }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: 'var(--ink-3)' }}>
          ANAMBRA CENTRAL · SENATE · 412 polling units
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <TierChip tier="hold-strong" />
          <TierChip tier="hold" />
          <TierChip tier="toss" />
          <TierChip tier="opp" />
          <TierChip tier="opp-strong" />
          <Button variant="quiet" size="sm">Filter</Button>
          <Button variant="secondary" size="sm">Export CSV</Button>
        </div>
      </div>

      {/* List header row */}
      <div
        className="grid items-center px-3 py-2 border-b"
        style={{ gridTemplateColumns: GRID, borderColor: 'var(--hair)' }}
      >
        {['PU code', 'Name · ward', 'Registered', 'Projection · ± band', 'Confidence', 'Tier'].map((h) => (
          <span key={h} className="font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color: 'var(--ink-3)' }}>
            {h}
          </span>
        ))}
      </div>

      {/* PU rows */}
      <style>{`
        .pu-row:hover { background: var(--paper-2); }
      `}</style>
      {PU_ROWS.map((row) => (
        <div
          key={row.code}
          className="pu-row grid items-center px-3 py-3 border-b"
          style={{ gridTemplateColumns: GRID, borderColor: 'var(--hair)' }}
        >
          {/* PU code */}
          <span className="font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
            {row.code}
          </span>

          {/* Name + ward */}
          <div>
            <div className="font-serif font-semibold text-[14px]" style={{ color: 'var(--ink)' }}>
              {row.name}
            </div>
            <div className="font-sans text-[11px]" style={{ color: 'var(--ink-3)' }}>
              {row.ward}
            </div>
          </div>

          {/* Registered */}
          <span className="font-mono text-[12px]" style={{ color: 'var(--ink-2)' }}>
            {row.registered}
          </span>

          {/* Projection */}
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-[14px] font-semibold" style={{ color: row.projColor }}>
              {row.projParty} {row.projPct}
            </span>
            <span className="font-serif italic text-[11px]" style={{ color: 'var(--ink-3)' }}>
              {row.projBand}
            </span>
          </div>

          {/* Confidence */}
          <ConfidenceBar level={row.confidence} />

          {/* Tier */}
          <TierChip tier={row.tier} />
        </div>
      ))}

      {/* Footer */}
      <div
        className="flex items-center justify-between px-3 py-2 mt-1"
        style={{ color: 'var(--ink-4)' }}
      >
        <span className="font-mono text-[10px]">8 of 412 polling units shown · sorted by win-prob descending</span>
        <span className="font-mono text-[10px]">↑ ↓ navigate · ⏎ open</span>
      </div>
    </div>
  );
}
