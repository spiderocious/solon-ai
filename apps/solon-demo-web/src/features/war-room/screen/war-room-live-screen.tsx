import { useQuery } from '@tanstack/react-query';
import { LivePulse, StatusPill, TallyTicker } from '@solon/ui';
import type { TallySnapshot } from '@solon/ui';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP, MOCK_KEY } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { WarRoomTally, LiveUpdate } from '@shared/types/mock-data.types';
import { ErrorState } from '@shared/components/error-state';
import { ScreenSkeleton } from '@shared/components/screen-skeleton';

const PARTY_COLOURS: Record<string, string> = {
  AFP: '#1D4ED8',
  APC: '#16A34A',
  PDP: '#DC2626',
  LP: '#B45309',
  Others: '#6B7280',
};

function tallyToSnapshots(tally: WarRoomTally): TallySnapshot[] {
  const afp = tally.running_tally.find((p) => p.party === 'AFP');
  const apc = tally.running_tally.find((p) => p.party === 'APC');
  const pdp = tally.running_tally.find((p) => p.party === 'PDP');
  return [
    {
      time: new Date(tally.last_update).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' }),
      lp: afp?.pct ?? 0,
      apc: apc?.pct ?? 0,
      pdp: pdp?.pct ?? 0,
      reported: tally.pus_reporting,
    },
  ];
}

export default function WarRoomLiveScreen() {
  const { sessionId } = useDemoSession();
  const {
    data: tally,
    isLoading: tallyLoading,
    isError: tallyError,
    refetch: refetchTally,
  } = useQuery<WarRoomTally>({
    queryKey: ['war-room-tally'],
    queryFn: () => demoClient.getMock<WarRoomTally>(MOCK_KEY.WARROOM_TALLY, sessionId ?? undefined),
    refetchInterval: 30_000,
    retry: 2,
  });
  const { data: updates, isError: updatesError, refetch: refetchUpdates } = useQuery<LiveUpdate[]>({
    queryKey: ['war-room-live'],
    queryFn: () => demoClient.get<LiveUpdate[]>(DEMO_EP.WAR_ROOM_LIVE, sessionId ?? undefined),
    refetchInterval: 15_000,
    retry: 2,
  });

  if (tallyLoading) return <ScreenSkeleton rows={6} />;
  if (tallyError || !tally) {
    return <ErrorState message="Could not load war room tally." onRetry={refetchTally} />;
  }

  const coveragePct = tally.pus_total > 0 ? (tally.pus_reporting / tally.pus_total) * 100 : 0;
  const leader = tally.running_tally[0];
  const snapshots = tallyToSnapshots(tally);

  return (
    <div className="flex flex-col min-h-full">
      {/* Dark top strip */}
      <div
        className="flex items-center gap-4 md:gap-6 px-4 md:px-6 py-3 flex-wrap"
        style={{ background: 'var(--ink)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
      >
        {[
          { label: 'PU reporting', value: <>{tally.pus_reporting.toLocaleString()}<span style={{ color: 'var(--ink-3)' }}> / {tally.pus_total.toLocaleString()}</span></>, delta: `${coveragePct.toFixed(2)}% coverage`, deltaColor: 'var(--forest-300)' },
          { label: 'Incidents · last hr', value: <span style={{ color: 'var(--orange)' }}>{tally.incidents_last_hour}</span>, delta: `${tally.severity_5_incidents} at sev 5`, deltaColor: 'var(--orange)' },
          { label: 'Anomaly flags', value: <span style={{ color: 'var(--orange)' }}>{tally.anomaly_flags}</span>, delta: 'review required', deltaColor: 'var(--orange)' },
          { label: 'Last update', value: new Date(tally.last_update).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' }), delta: 'WAT', deltaColor: 'var(--forest-300)' },
        ].map(({ label, value, delta, deltaColor }, i) => (
          <div key={label} className="flex items-center gap-2">
            {i > 0 && <span className="hidden md:block" style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>}
            <div>
              <div className="font-mono text-[9px]" style={{ color: 'var(--ink-4)' }}>{label}</div>
              <div className="font-mono font-semibold text-[16px] md:text-[18px]" style={{ color: 'var(--paper)' }}>{value}</div>
              <div className="font-mono text-[9px]" style={{ color: deltaColor }}>{delta}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Three-column body */}
      <div className="flex flex-col md:grid flex-1" style={{ gridTemplateColumns: '260px 1fr 300px' }}>
        {/* Left — live tally */}
        <div className="border-b md:border-b-0 md:border-r p-4" style={{ borderColor: 'var(--hair)' }}>
          <h3 className="font-sans font-semibold text-[14px] mb-3" style={{ color: 'var(--ink)' }}>
            Live tally · {tally.pus_reporting} PU
          </h3>

          {tally.running_tally.map(({ party, candidate, pct, votes }) => (
            <div key={party} className="flex items-center gap-2 py-2 border-b" style={{ borderColor: 'var(--hair)' }}>
              <span className="font-mono text-[10px] w-8 shrink-0" style={{ color: 'var(--ink-2)' }}>{party}</span>
              <div className="flex-1 h-1.5 rounded-full relative" style={{ background: 'var(--hair)' }}>
                <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: `${pct}%`, background: PARTY_COLOURS[party] ?? 'var(--ink-3)' }} />
              </div>
              <div className="text-right">
                <span className="font-mono font-semibold text-[12px]" style={{ color: 'var(--ink)' }}>{pct}%</span>
                <span className="font-mono text-[10px] ml-1" style={{ color: 'var(--ink-3)' }}>· {votes.toLocaleString()}</span>
              </div>
            </div>
          ))}

          {leader && (
            <div className="rounded-[4px] p-3 mt-3" style={{ background: 'var(--forest-50)', border: '1px solid var(--forest-200, #B2D1BB)' }}>
              <span className="font-serif font-bold text-[20px]" style={{ color: PARTY_COLOURS[leader.party] ?? 'var(--ink)' }}>
                {leader.party} leading · {leader.pct}%
              </span>
              <div className="font-sans text-[12px] mt-1" style={{ color: 'var(--ink-3)' }}>
                {leader.candidate}
              </div>
            </div>
          )}

          {tally.anomaly_flags > 0 && (
            <div className="mt-4">
              <h4 className="font-mono text-[10px] uppercase mb-2" style={{ color: 'var(--orange)' }}>Anomaly flags · {tally.anomaly_flags}</h4>
              {tally.live_feed.filter((f) => f.type === 'anomaly').map((f, i) => (
                <div key={i} className="font-sans italic text-[12px] mb-1" style={{ color: 'var(--orange)' }}>
                  {f.message}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Center — chart + feed */}
        <div className="border-b md:border-b-0 p-5 flex flex-col gap-4">
          <div className="rounded-[4px] p-4" style={{ border: '1px solid var(--hair)', background: 'var(--sheet)' }}>
            <TallyTicker snapshots={snapshots} totalPUs={tally.pus_total} />
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase mb-3" style={{ color: 'var(--ink-4)' }}>Live updates</h4>
            {updatesError ? (
              <ErrorState message="Could not load live updates." onRetry={refetchUpdates} compact />
            ) : (updates ?? []).length === 0 ? (
              <p className="font-serif italic text-[12px]" style={{ color: 'var(--ink-4)' }}>No updates yet.</p>
            ) : (
              <div className="space-y-2">
                {(updates ?? []).map((u) => {
                  const borderColor = u.type === 'incident' ? 'var(--crit)' : u.type === 'alert' ? 'var(--orange)' : 'var(--hair)';
                  const bg = u.type === 'alert' ? 'var(--orange-soft)' : 'var(--paper-2)';
                  return (
                    <div
                      key={u.id}
                      className="px-3 py-2 rounded-[3px]"
                      style={{ background: bg, borderLeft: `2px solid ${borderColor}` }}
                    >
                      <p className="font-sans text-[12px]" style={{ color: 'var(--ink-2)' }}>{u.message}</p>
                      <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
                        {new Date(u.timestamp).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })} WAT
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right — state summary feed */}
        <div className="border-t md:border-t-0 md:border-l overflow-y-auto" style={{ borderColor: 'var(--hair)' }}>
          <div className="flex items-center gap-2 px-4 py-3 border-b shrink-0" style={{ borderColor: 'var(--hair)' }}>
            <LivePulse variant="orange" />
            <span className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>State summary</span>
            <StatusPill variant="warn" label={`${tally.severity_5_incidents} sev5`} />
          </div>

          {tally.state_summary.map(({ state, pus_reporting, pus_total, afp_pct, apc_pct, tier }) => {
            const tierColor = tier === 'Lean Hold' || tier === 'Strong Hold' ? 'var(--forest-700)' : tier === 'Toss-up' ? 'var(--orange)' : 'var(--crit)';
            return (
              <div key={state} className="px-4 py-3 border-b" style={{ borderBottomColor: 'var(--hair)' }}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-sans font-semibold text-[13px]" style={{ color: 'var(--ink)' }}>{state}</span>
                    <span className="font-mono text-[10px] ml-2" style={{ color: tierColor }}>{tier}</span>
                  </div>
                  <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
                    {pus_reporting}/{pus_total.toLocaleString()} PU
                  </span>
                </div>
                <div className="flex gap-3 mt-1.5 font-mono text-[11px]">
                  <span style={{ color: '#1D4ED8' }}>AFP {afp_pct}%</span>
                  <span style={{ color: '#16A34A' }}>APC {apc_pct}%</span>
                </div>
              </div>
            );
          })}

          <div className="px-4 py-3">
            <h4 className="font-mono text-[10px] uppercase mb-2" style={{ color: 'var(--ink-4)' }}>Live feed</h4>
            {tally.live_feed.map((item, i) => {
              const color = item.type === 'anomaly' ? 'var(--orange)' : item.type === 'incident' ? 'var(--crit)' : 'var(--ink-3)';
              return (
                <div key={i} className="font-mono text-[10px] mb-1.5" style={{ color }}>
                  <span className="text-[9px]" style={{ color: 'var(--ink-4)' }}>{item.time} </span>
                  {item.message}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
