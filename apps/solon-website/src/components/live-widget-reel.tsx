'use client';

import { StatusPill, LivePulse, ConfidenceBar } from '@solon/ui';

const VOTE_BARS = [
  { party: 'AFP', pct: 38.4, colour: '#14532d' },
  { party: 'APC', pct: 31.2, colour: '#7c3aed' },
  { party: 'PDP', pct: 22.1, colour: '#dc2626' },
  { party: 'LP',  pct: 8.3,  colour: '#d97706' },
];

const TALLY_ROWS = [
  { label: 'South West', afp: 44, apc: 39, pdp: 17 },
  { label: 'North Central', afp: 37, apc: 28, pdp: 35 },
  { label: 'South South', afp: 52, apc: 19, pdp: 29 },
];

const CLUSTER_ROWS = [
  { name: 'Urban Youth', size: '12.4M', tier: 'SWING' },
  { name: 'Rural North', size: '18.7M', tier: 'HOLD' },
  { name: 'Diaspora-linked', size: '3.1M', tier: 'HOLD' },
];

export function LiveWidgetReel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Vote share card */}
      <WidgetCard
        title="AFP projection"
        badge={<StatusPill variant="ok" label="Live" />}
      >
        <div className="mb-3">
          <span className="font-serif font-bold text-[40px] leading-none" style={{ color: 'var(--forest-700)' }}>38.4%</span>
          <span className="font-mono text-[11px] ml-2" style={{ color: 'var(--ink-4)' }}>±2.1pts</span>
        </div>
        <div className="flex h-5 rounded overflow-hidden gap-px">
          {VOTE_BARS.map((b) => (
            <div
              key={b.party}
              className="flex items-center justify-center font-mono text-[8px] text-white shrink-0"
              style={{ flex: b.pct, background: b.colour }}
            >
              {b.pct > 10 ? b.party : ''}
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-2">
          {VOTE_BARS.map((b) => (
            <div key={b.party} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-sm inline-block" style={{ background: b.colour }} />
              <span className="font-mono text-[9px]" style={{ color: 'var(--ink-4)' }}>{b.party}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: '1px solid var(--hair)' }}>
          <ConfidenceBar level={4} />
          <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>High confidence</span>
        </div>
      </WidgetCard>

      {/* Live tally card */}
      <WidgetCard
        title="Election day tally"
        badge={
          <div className="flex items-center gap-1.5">
            <LivePulse variant="orange" />
            <span className="font-mono text-[9px]" style={{ color: 'var(--ink-3)' }}>84,213 PUs</span>
          </div>
        }
      >
        <div className="space-y-2">
          {TALLY_ROWS.map((row) => (
            <div key={row.label}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-sans text-[11px]" style={{ color: 'var(--ink-3)' }}>{row.label}</span>
                <span className="font-mono text-[10px] font-semibold" style={{ color: 'var(--forest-700)' }}>{row.afp}%</span>
              </div>
              <div className="flex h-2 rounded overflow-hidden gap-px">
                <div className="h-full rounded-l" style={{ flex: row.afp, background: '#14532d' }} />
                <div className="h-full" style={{ flex: row.apc, background: '#7c3aed' }} />
                <div className="h-full rounded-r" style={{ flex: row.pdp, background: '#dc2626' }} />
              </div>
            </div>
          ))}
        </div>
        <div
          className="rounded-[3px] px-2 py-1.5 mt-3 font-mono text-[9px]"
          style={{ background: 'var(--forest-50)', color: 'var(--forest-700)', border: '1px solid var(--forest-200)' }}
        >
          AFP leading in 5 of 6 geo-zones
        </div>
      </WidgetCard>

      {/* Voter clusters card */}
      <WidgetCard
        title="Voter clusters"
        badge={<span className="font-mono text-[9px]" style={{ color: 'var(--ink-4)' }}>93M registered</span>}
      >
        <div className="space-y-2">
          {CLUSTER_ROWS.map((row) => (
            <div
              key={row.name}
              className="flex items-center justify-between px-2 py-2 rounded-[4px]"
              style={{ background: 'var(--paper-2)' }}
            >
              <div>
                <div className="font-sans text-[11px] font-medium" style={{ color: 'var(--ink-2)' }}>{row.name}</div>
                <div className="font-mono text-[9px]" style={{ color: 'var(--ink-4)' }}>{row.size} voters</div>
              </div>
              <span
                className="font-mono text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wide"
                style={{
                  background: row.tier === 'HOLD' ? 'var(--forest-50)' : 'var(--orange-soft)',
                  color: row.tier === 'HOLD' ? 'var(--forest-700)' : 'var(--orange)',
                  border: `1px solid ${row.tier === 'HOLD' ? 'var(--forest-200)' : 'var(--orange-edge)'}`,
                }}
              >
                {row.tier}
              </span>
            </div>
          ))}
        </div>
        <button
          className="w-full mt-3 py-1.5 rounded-[4px] font-mono text-[10px] border transition-colors hover:bg-opacity-80"
          style={{ borderColor: 'var(--hair)', color: 'var(--ink-3)', background: 'var(--paper-2)' }}
        >
          Generate WhatsApp message →
        </button>
      </WidgetCard>
    </div>
  );
}

function WidgetCard({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-[8px] overflow-hidden"
      style={{ background: 'var(--sheet)', border: '1px solid var(--hair)', boxShadow: 'var(--shade-1)' }}
    >
      <div
        className="px-4 py-2.5 flex items-center justify-between border-b"
        style={{ background: 'var(--paper-2)', borderColor: 'var(--hair)' }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: 'var(--ink-3)' }}>{title}</span>
        {badge}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
