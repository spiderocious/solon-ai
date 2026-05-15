import { Button, SkeletonCard, TierChip } from '@solon/ui';
import type { TierVariant } from '@solon/ui';
import { formatNumber } from '@shared/helpers/format-number';
import { formatPct } from '@shared/helpers/format-pct';
import { useVoterConstituencies } from '../api/use-voter-constituencies';

const TIER_LEGEND = [
  { tier: 'hold-strong' as TierVariant, label: '≥55% — Strong hold', color: '#14342A', border: '#14342A' },
  { tier: 'hold' as TierVariant, label: '45–55% — Lean hold', color: 'var(--forest-600)', border: 'var(--forest-600)' },
  { tier: 'toss' as TierVariant, label: '35–45% — Toss-up', color: 'var(--orange)', border: 'var(--orange)' },
  { tier: 'opp' as TierVariant, label: '<35% — At risk', color: 'var(--paper-3)', border: 'var(--hair)' },
];

function lpTier(share: number): TierVariant {
  if (share >= 55) return 'hold-strong';
  if (share >= 45) return 'hold';
  if (share >= 35) return 'toss';
  return 'opp';
}

function heatStyle(share: number): { bg: string; border: string; text: string } {
  if (share >= 55) return { bg: '#0F2E22', border: '#14342A', text: 'var(--paper)' };
  if (share >= 45) return { bg: 'var(--forest-50)', border: 'var(--forest-600)', text: 'var(--forest-700)' };
  if (share >= 35) return { bg: '#FFF3E0', border: 'var(--orange)', text: 'var(--orange)' };
  return { bg: '#FEE2E2', border: 'var(--crit)', text: 'var(--crit)' };
}

export default function VoterIntelMapScreen() {
  const { data, isLoading } = useVoterConstituencies();
  const constituencies = data ?? [];

  const totalRegistered = constituencies.reduce((s, c) => s + c.registeredVoters, 0);
  const avgLp = constituencies.length > 0
    ? constituencies.reduce((s, c) => s + c.lpShare, 0) / constituencies.length
    : 0;

  return (
    <div className="flex flex-col md:grid min-h-full" style={{ gridTemplateColumns: '240px 1fr' }}>
      {/* Left panel */}
      <div className="border-b md:border-b-0 md:border-r p-5" style={{ borderColor: 'var(--hair)' }}>
        <h2 className="font-serif font-semibold text-[18px]" style={{ color: 'var(--ink)' }}>Anambra Central</h2>
        <p className="font-serif italic text-[12px] mt-1" style={{ color: 'var(--ink-3)' }}>
          — {constituencies.length} LGAs · senate · 2027 cycle.
        </p>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {[
            { label: 'Registered', value: formatNumber(totalRegistered, true) },
            { label: 'LGAs tracked', value: String(constituencies.length) },
            { label: 'Avg LP share', value: formatPct(avgLp, 1), serif: true, highlight: true },
            { label: 'Toss-up LGAs', value: String(constituencies.filter((c) => lpTier(c.lpShare) === 'toss').length), serif: true },
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
          {TIER_LEGEND.map(({ tier, label }) => (
            <div key={tier} className="flex items-center gap-2">
              <TierChip tier={tier} />
              <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{label}</span>
            </div>
          ))}
        </div>

        <div className="h-px my-4" style={{ background: 'var(--hair)' }} />

        <div
          className="rounded p-3 font-serif italic text-[12px]"
          style={{ background: 'var(--forest-50)', color: 'var(--ink)' }}
        >
          Oyi leads LP share at 58.3% — focus ground operations on toss-up Ogbaru and Idemili South.
        </div>

        <div className="flex gap-2 mt-4 flex-wrap">
          <Button variant="quiet" size="sm">Export map</Button>
          <Button variant="secondary" size="sm">Open scenarios</Button>
        </div>
      </div>

      {/* Right — constituency grid */}
      <div className="p-5 md:p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="font-sans font-semibold text-[14px]" style={{ color: 'var(--ink)' }}>
            LGA heat map · LP vote share
          </h3>
          <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
            vs 2023 baseline · {constituencies.length} LGAs
          </span>
        </div>

        {isLoading && !data ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {Array.from({ length: 7 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {constituencies.map((c) => {
              const heat = heatStyle(c.lpShare);
              return (
                <div
                  key={c.id}
                  className="rounded-[6px] overflow-hidden"
                  style={{ background: heat.bg, border: `1px solid ${heat.border}` }}
                >
                  <div className="px-3 py-2 border-b" style={{ borderColor: heat.border, background: 'rgba(0,0,0,0.08)' }}>
                    <div className="font-sans text-[12px] font-medium" style={{ color: c.lpShare >= 55 ? 'var(--paper)' : 'var(--ink-2)' }}>
                      {c.name}
                    </div>
                    <TierChip tier={lpTier(c.lpShare)} />
                  </div>
                  <div className="px-3 py-3">
                    <div className="font-serif font-semibold text-[26px]" style={{ color: heat.text }}>
                      {formatPct(c.lpShare, 1)}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-[10px]" style={{ color: c.lpShare >= 55 ? 'rgba(255,255,255,0.5)' : 'var(--ink-4)' }}>
                        {formatNumber(c.registeredVoters, true)}
                      </span>
                      <span className="font-mono text-[10px]" style={{ color: c.lpShareDelta >= 0 ? '#7AA386' : 'var(--orange)' }}>
                        {c.lpShareDelta >= 0 ? '+' : ''}{formatPct(c.lpShareDelta, 1)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                      <span className="font-mono text-[9px]" style={{ color: c.lpShare >= 55 ? 'rgba(255,255,255,0.5)' : 'var(--ink-4)' }}>
                        Turnout {c.turnoutRate}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p className="font-serif italic text-[12px] mt-4" style={{ color: 'var(--ink-4)' }}>
          LP vote share vs 2023 · delta in percentage points · {constituencies.length} LGAs
        </p>
      </div>
    </div>
  );
}
