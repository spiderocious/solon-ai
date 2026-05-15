import { useQuery } from '@tanstack/react-query';
import { SkeletonCard, StatusPill } from '@solon/ui';
import { demoClient } from '@shared/api/demo-client';
import { MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { WarRoomTally } from '@shared/types/mock-data.types';

const TH_CLS = 'font-mono text-[10px] uppercase text-left px-3 py-2 border-b tracking-[0.08em]';
const TD_CLS = 'font-sans text-[13px] px-3 py-3 border-b';

const MOCK_TALLY: WarRoomTally = {
  election_date: '2027-01-16',
  pus_total: 176846,
  pus_reporting: 312,
  coverage_pct: 0.18,
  last_update: '2027-01-16T11:47:00Z',
  running_tally: [
    { party: 'AFP', candidate: 'Emeka Adeyemi Bello', votes: 38241, pct: 33 },
    { party: 'APC', candidate: 'Incumbent', votes: 35912, pct: 31 },
    { party: 'PDP', candidate: 'Candidate TBA', votes: 24318, pct: 21 },
    { party: 'LP', candidate: 'Peter Obi', votes: 15064, pct: 13 },
    { party: 'Others', candidate: 'Various', votes: 2893, pct: 2 },
  ],
  state_summary: [
    { state: 'Kano', pus_reporting: 47, pus_total: 14320, afp_pct: 27, apc_pct: 38, tier: 'Lean Opponent' },
    { state: 'Lagos', pus_reporting: 38, pus_total: 13325, afp_pct: 41, apc_pct: 35, tier: 'Toss-up' },
    { state: 'Rivers', pus_reporting: 29, pus_total: 8420, afp_pct: 35, apc_pct: 22, tier: 'Lean Hold' },
    { state: 'Kaduna', pus_reporting: 22, pus_total: 9812, afp_pct: 30, apc_pct: 42, tier: 'Lean Opponent' },
    { state: 'Anambra', pus_reporting: 18, pus_total: 5930, afp_pct: 52, apc_pct: 18, tier: 'Strong Hold' },
  ],
  incidents_last_hour: 7,
  severity_5_incidents: 2,
  anomaly_flags: 3,
  live_feed: [],
};

const TIER_PILL: Record<string, { variant: 'ok' | 'warn' | 'crit' | 'quiet'; label: string }> = {
  'Strong Hold':     { variant: 'ok',    label: 'Strong Hold' },
  'Lean Hold':       { variant: 'ok',    label: 'Lean Hold' },
  'Toss-up':         { variant: 'warn',  label: 'Toss-up' },
  'Lean Opponent':   { variant: 'crit',  label: 'Lean Opponent' },
  'Strong Opponent': { variant: 'crit',  label: 'Strong Opponent' },
};

export default function WarRoomReconciliationScreen() {
  const { sessionId } = useDemoSession();
  const { data, isLoading } = useQuery<WarRoomTally>({
    queryKey: ['war-room-reconciliation'],
    queryFn: () => demoClient.getMock<WarRoomTally>(MOCK_KEY.WARROOM_TALLY, sessionId ?? undefined),
    placeholderData: MOCK_TALLY,
    refetchInterval: 30_000,
  });

  const tally = data ?? MOCK_TALLY;
  const states = tally.state_summary;
  const tossUpCount = states.filter((s) => s.tier === 'Toss-up').length;
  const leanOpponentCount = states.filter((s) => s.tier === 'Lean Opponent' || s.tier === 'Strong Opponent').length;

  if (isLoading && !data) {
    return (
      <div className="p-6 flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  return (
    <div className="p-5 md:p-6">
      <div className="mb-5 flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-serif font-semibold text-[20px]" style={{ color: 'var(--ink)' }}>State reconciliation</h2>
          <p className="font-serif italic text-[13px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
            — {states.length} states reporting · {tally.pus_reporting.toLocaleString()} of {tally.pus_total.toLocaleString()} PUs
            {tossUpCount > 0 && ` · ${tossUpCount} toss-up`}
          </p>
        </div>
        <div className="flex gap-2">
          {leanOpponentCount > 0 && (
            <div className="px-3 py-1.5 rounded-[4px] font-mono text-[10px]" style={{ background: '#FEE2E2', color: 'var(--crit)', border: '1px solid var(--crit)' }}>
              ⚑ {leanOpponentCount} opponent-leaning
            </div>
          )}
        </div>
      </div>

      {/* Running tally summary */}
      <div className="rounded-[6px] p-4 mb-5" style={{ border: '1px solid var(--hair)', background: 'var(--sheet)' }}>
        <h3 className="font-mono text-[10px] uppercase mb-3" style={{ color: 'var(--ink-4)' }}>National running tally</h3>
        <div className="flex flex-wrap gap-4">
          {tally.running_tally.map(({ party, votes, pct }) => (
            <div key={party} className="flex items-baseline gap-2">
              <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{party}</span>
              <span className="font-mono font-bold text-[18px]" style={{ color: party === 'AFP' ? '#1D4ED8' : 'var(--ink-2)' }}>{pct}%</span>
              <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{votes.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[6px] overflow-hidden border" style={{ borderColor: 'var(--hair)' }}>
        <style>{`.recon-table tbody tr:hover td { background: var(--paper-2); }`}</style>
        <div className="overflow-x-auto">
          <table className="recon-table w-full border-collapse">
            <thead>
              <tr style={{ background: 'var(--paper-2)' }}>
                {['State', 'PUs reporting', 'AFP %', 'APC %', 'Gap', 'Tier'].map((h, i) => (
                  <th
                    key={h}
                    className={TH_CLS}
                    style={{ color: 'var(--ink-3)', borderColor: 'var(--hair)', textAlign: i >= 1 && i <= 4 ? 'right' : 'left' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {states.map((s) => {
                const pill = TIER_PILL[s.tier] ?? { variant: 'quiet' as const, label: s.tier };
                const gap = s.afp_pct - s.apc_pct;
                const isRisk = s.tier === 'Lean Opponent' || s.tier === 'Strong Opponent';
                return (
                  <tr
                    key={s.state}
                    style={{
                      background: isRisk ? '#FEF2F2' : undefined,
                      borderLeft: isRisk ? '3px solid var(--crit)' : undefined,
                    }}
                  >
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      <span className="font-sans font-semibold text-[13px]" style={{ color: 'var(--ink)' }}>{s.state}</span>
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)' }}>
                      {s.pus_reporting.toLocaleString()} / {s.pus_total.toLocaleString()}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 13, color: '#1D4ED8' }}>
                      {s.afp_pct}%
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 13, color: '#16A34A' }}>
                      {s.apc_pct}%
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12, color: gap >= 0 ? 'var(--forest-700)' : 'var(--crit)' }}>
                      {gap >= 0 ? `+${gap}` : gap}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      <StatusPill variant={pill.variant} label={pill.label} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="font-serif italic text-[12px] mt-4" style={{ color: 'var(--ink-4)' }}>
        State-level tally reconciliation · IReV verification · Solon Intelligence · {tally.election_date}
      </p>
    </div>
  );
}
