import { Button, SkeletonCard } from '@solon/ui';
import { formatNumber } from '@shared/helpers/format-number';
import { useVoterConstituencies } from '../api/use-voter-constituencies';

const TIER_CONFIG: Record<string, { bg: string; border: string; text: string; label: string }> = {
  'Lean Hold':       { bg: 'var(--forest-50)',   border: 'var(--forest-600)', text: 'var(--forest-700)', label: 'Lean Hold' },
  'Strong Hold':     { bg: '#0F2E22',             border: '#14342A',           text: 'var(--paper)',      label: 'Strong Hold' },
  'Toss-up':         { bg: 'var(--orange-soft)',  border: 'var(--orange)',     text: 'var(--orange)',     label: 'Toss-up' },
  'Lean Opponent':   { bg: '#FEE2E2',             border: 'var(--crit)',       text: 'var(--crit)',       label: 'Lean Opp.' },
  'Strong Opponent': { bg: '#FEE2E2',             border: 'var(--crit)',       text: 'var(--crit)',       label: 'Strong Opp.' },
};

function tierStyle(tier: string) {
  return TIER_CONFIG[tier] ?? TIER_CONFIG['Toss-up']!;
}

export default function VoterIntelMapScreen() {
  const { data, isLoading } = useVoterConstituencies();
  const states = data?.states ?? [];

  const totalRegistered = states.reduce((s, c) => s + c.registered_voters, 0);
  const holdStates = states.filter((s) => s.afp_tier === 'Lean Hold' || s.afp_tier === 'Strong Hold').length;
  const tossupStates = states.filter((s) => s.afp_tier === 'Toss-up').length;

  return (
    <div className="flex flex-col md:grid min-h-full" style={{ gridTemplateColumns: '240px 1fr' }}>
      {/* Left panel */}
      <div className="border-b md:border-b-0 md:border-r p-5" style={{ borderColor: 'var(--hair)' }}>
        <h2 className="font-serif font-semibold text-[18px]" style={{ color: 'var(--ink)' }}>Nationwide</h2>
        <p className="font-serif italic text-[12px] mt-1" style={{ color: 'var(--ink-3)' }}>
          — {states.length} states · presidential · 2027 cycle.
        </p>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {[
            { label: 'Registered', value: formatNumber(totalRegistered, true) },
            { label: 'States tracked', value: String(states.length) },
            { label: 'Lean Hold', value: String(holdStates), serif: true, highlight: true },
            { label: 'Toss-up', value: String(tossupStates), serif: true },
          ].map(({ label, value, serif, highlight }) => (
            <div key={label}>
              <div className="font-mono text-[9px] uppercase" style={{ color: 'var(--ink-4)' }}>{label}</div>
              <div
                className={serif ? 'font-serif text-[15px]' : 'font-mono font-semibold text-[15px]'}
                style={{ color: highlight ? 'var(--forest-700)' : 'var(--ink)' }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        <div className="h-px my-4" style={{ background: 'var(--hair)' }} />

        <h3 className="font-mono text-[9px] uppercase mb-3" style={{ color: 'var(--ink-3)' }}>TIER LEGEND</h3>
        <div className="space-y-2">
          {Object.entries(TIER_CONFIG).map(([tier, cfg]) => (
            <div key={tier} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }} />
              <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{cfg.label}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-4 flex-wrap">
          <Button variant="quiet" size="sm">Export map</Button>
          <Button variant="secondary" size="sm">Open scenarios</Button>
        </div>
      </div>

      {/* Right — state grid */}
      <div className="p-5 md:p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="font-sans font-semibold text-[14px]" style={{ color: 'var(--ink)' }}>
            State heat map · AFP competitiveness
          </h3>
          <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
            {states.length} states
          </span>
        </div>

        {isLoading && !data ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {states.map((s) => {
              const cfg = tierStyle(s.afp_tier);
              return (
                <div
                  key={s.name}
                  className="rounded-[6px] overflow-hidden"
                  style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                >
                  <div className="px-3 py-2 border-b" style={{ borderColor: cfg.border, background: 'rgba(0,0,0,0.06)' }}>
                    <div className="font-sans text-[12px] font-medium" style={{ color: 'var(--ink-2)' }}>
                      {s.name}
                    </div>
                    <div className="font-mono text-[9px] uppercase mt-0.5" style={{ color: cfg.text }}>{cfg.label}</div>
                  </div>
                  <div className="px-3 py-3">
                    <div className="font-mono text-[10px]" style={{ color: cfg.text }}>
                      {s.zone}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
                        {formatNumber(s.registered_voters, true)}
                      </span>
                      <span className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>
                        {(s.turnout_2023 * 100).toFixed(0)}% '23
                      </span>
                    </div>
                    <div className="font-mono text-[9px] mt-1" style={{ color: 'var(--ink-4)' }}>
                      Won: {s.winner_2023}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p className="font-serif italic text-[12px] mt-4" style={{ color: 'var(--ink-4)' }}>
          AFP competitiveness tier by state · 2023 baseline · Solon Intelligence
        </p>
      </div>
    </div>
  );
}
