import { useQuery } from '@tanstack/react-query';
import { LivePulse, StatusPill, TallyTicker } from '@solon/ui';
import type { TallySnapshot } from '@solon/ui';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { TallySummary, LiveUpdate } from '@shared/types/mock-data.types';


const MOCK_SUMMARY: TallySummary = {
  totalPUs: 412,
  reportedPUs: 263,
  verifiedPUs: 182,
  lpTotal: 40538,
  apcTotal: 17406,
  pdpTotal: 7239,
  otherTotal: 4196,
  projectedWinner: 'LP',
  projectedMargin: 28.4,
  confidence: 4,
};

const MOCK_SNAPSHOTS: TallySnapshot[] = [
  { time: '08:00', lp: 0, apc: 0, pdp: 0, reported: 0 },
  { time: '10:00', lp: 18.2, apc: 21.4, pdp: 9.1, reported: 42 },
  { time: '12:00', lp: 38.4, apc: 22.0, pdp: 8.8, reported: 112 },
  { time: '14:00', lp: 45.6, apc: 21.8, pdp: 9.0, reported: 194 },
  { time: '16:00', lp: 49.8, apc: 21.4, pdp: 8.9, reported: 263 },
];

const PARTY_ROWS = [
  { party: 'LP', pct: 49.8, votes: '40,538', delta: '+2.6 pt', deltaColor: 'var(--forest-300)', barColor: 'var(--forest-600)' },
  { party: 'APC', pct: 21.4, votes: '17,406', delta: '-0.7', deltaColor: 'var(--ink-4)', barColor: 'var(--ink)' },
  { party: 'APGA', pct: 17.2, votes: '13,990', delta: '-1.2', deltaColor: 'var(--ink-4)', barColor: 'var(--ink-3)' },
  { party: 'PDP', pct: 8.9, votes: '7,239', delta: '-0.9', deltaColor: 'var(--ink-4)', barColor: 'var(--ink-4)' },
  { party: 'Other', pct: 2.7, votes: '2,196', delta: '+0.2', deltaColor: 'var(--ink-4)', barColor: 'var(--hair)' },
];

interface IncidentItem {
  sev: number;
  sevBg: string;
  sevColor: string;
  borderColor: string | undefined;
  cardBg: string | undefined;
  title: string;
  time: string;
  location: string;
  body: string;
  meta: string;
}

const INCIDENTS: IncidentItem[] = [
  { sev: 5, sevBg: 'var(--crit)', sevColor: 'var(--paper)', borderColor: 'var(--crit)', cardBg: 'var(--crit-bg)', title: 'BVAS lockdown across PU cluster', time: '2 min', location: 'PU 008-05-19, -20, -21 · Idemili N.', body: 'All three machines refusing to authenticate. Crowd building.', meta: 'AGENT · @CO / 2 CITIZENS / LEGAL DISPATCHED' },
  { sev: 4, sevBg: 'var(--orange)', sevColor: 'var(--paper)', borderColor: 'var(--orange)', cardBg: undefined, title: 'Vote-buying allegation', time: '14 min', location: 'Ogbaru · ward 6 · PU 008-06-04', body: 'Cash being distributed in church car park, 200m from PU.', meta: 'AGENT / 1 IMAGE / ACKNOWLEDGED' },
  { sev: 3, sevBg: 'var(--orange-soft)', sevColor: 'var(--orange)', borderColor: 'var(--orange-edge)', cardBg: undefined, title: 'Long queues, slow accreditation', time: '28 min', location: 'Onitsha North · ward 4 · PU 008-04-09', body: '90-minute queues reported via voice note.', meta: 'CITIZEN / VOICE 0:42 / MONITORING' },
  { sev: 2, sevBg: 'var(--paper-2)', sevColor: 'var(--ink-3)', borderColor: undefined, cardBg: 'var(--paper-2)', title: 'Material shortage · ballot books', time: '58 min', location: 'Aguata · ward 8', body: 'PU started with 1 book instead of 2; INEC resupply confirmed.', meta: 'AGENT / RESOLVED' },
];

const MOCK_UPDATES: LiveUpdate[] = [
  { id: 'u1', type: 'milestone', message: '304 agents deployed across Anambra Central.', timestamp: '2027-02-20T07:45:00Z' },
  { id: 'u2', type: 'alert', message: 'Ogbaru Ward 2: delayed card reader deployment.', timestamp: '2027-02-20T07:30:00Z', severity: 'medium' },
];

export default function WarRoomLiveScreen() {
  const { sessionId } = useDemoSession();
  const { data: summary } = useQuery<TallySummary>({
    queryKey: ['war-room-tally'],
    queryFn: () => demoClient.get<TallySummary>(DEMO_EP.WAR_ROOM_TALLY, sessionId ?? undefined),
    placeholderData: MOCK_SUMMARY,
    refetchInterval: 30_000,
  });
  const { data: updates } = useQuery<LiveUpdate[]>({
    queryKey: ['war-room-live'],
    queryFn: () => demoClient.get<LiveUpdate[]>(DEMO_EP.WAR_ROOM_LIVE, sessionId ?? undefined),
    placeholderData: MOCK_UPDATES,
    refetchInterval: 15_000,
  });

  const s = summary ?? MOCK_SUMMARY;

  return (
    <div className="flex flex-col min-h-full">
      {/* Dark top strip */}
      <div
        className="flex items-center gap-4 md:gap-6 px-4 md:px-6 py-3 flex-wrap"
        style={{ background: 'var(--ink)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
      >
        {[
          { label: 'PU reporting', value: <>{s.reportedPUs}<span style={{ color: 'var(--ink-3)' }}> / {s.totalPUs}</span></>, delta: '+18 last 60s', deltaColor: 'var(--forest-300)' },
          { label: 'Coverage', value: `${((s.reportedPUs / s.totalPUs) * 100).toFixed(1)}%`, delta: 'target 90% by 18:00', deltaColor: 'var(--forest-300)' },
          { label: 'Reconciled', value: <>{s.verifiedPUs}<span style={{ color: 'var(--ink-3)' }}> / {s.reportedPUs}</span></>, delta: '+6 last 60s', deltaColor: 'var(--forest-300)' },
          { label: 'Accredited (live)', value: '81,402', delta: '+1,148 last 60s', deltaColor: 'var(--forest-300)' },
          { label: 'Incidents · open', value: <span style={{ color: 'var(--orange)' }}>14</span>, delta: '2 at sev 4+', deltaColor: 'var(--orange)' },
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
      <div
        className="flex flex-col md:grid flex-1"
        style={{ gridTemplateColumns: '260px 1fr 300px' }}
      >
        {/* Left — live tally */}
        <div className="border-b md:border-b-0 md:border-r p-4" style={{ borderColor: 'var(--hair)' }}>
          <h3 className="font-sans font-semibold text-[14px] mb-3" style={{ color: 'var(--ink)' }}>
            Live tally · {s.reportedPUs} PU
          </h3>

          {PARTY_ROWS.map(({ party, pct, votes, delta, deltaColor, barColor }) => (
            <div key={party} className="flex items-center gap-2 py-2 border-b" style={{ borderColor: 'var(--hair)' }}>
              <span className="font-mono text-[10px] w-8 shrink-0" style={{ color: 'var(--ink-2)' }}>{party}</span>
              <div className="flex-1 h-1.5 rounded-full relative" style={{ background: 'var(--hair)' }}>
                <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: `${pct}%`, background: barColor }} />
              </div>
              <div className="text-right">
                <span className="font-mono font-semibold text-[12px]" style={{ color: 'var(--ink)' }}>{pct}%</span>
                <span className="font-mono text-[10px] ml-1" style={{ color: 'var(--ink-3)' }}>· {votes}</span>
              </div>
              <span className="font-mono text-[10px] w-10 text-right" style={{ color: deltaColor }}>{delta}</span>
            </div>
          ))}

          {/* Projected card */}
          <div className="rounded-[4px] p-3 mt-3" style={{ background: 'var(--forest-50)', border: '1px solid var(--forest-200, #B2D1BB)' }}>
            <div className="flex items-baseline gap-2">
              <span className="font-serif font-bold text-[22px]" style={{ color: 'var(--forest-700)' }}>
                LP +{s.projectedMargin.toFixed(1)}
              </span>
              <span className="font-serif italic text-[12px]" style={{ color: 'var(--ink-3)' }}>· ± 4.2 pts</span>
            </div>
            <div className="font-sans text-[12px] mt-1" style={{ color: 'var(--ink-3)' }}>
              Solon expects the gap to widen as Ogbaru and Idemili South complete reporting.
            </div>
          </div>

          {/* Anomaly flags */}
          <div className="mt-4">
            <h4 className="font-mono text-[10px] uppercase mb-2" style={{ color: 'var(--orange)' }}>Anomaly flags</h4>
            <ol className="space-y-1.5">
              {[
                'PU 008-06-04 reports LP 71% — divergence +22pt vs model.',
                'PU 008-07-09 totals exceed accredited count.',
                '3 PU in ward 11 marked confirmed by single source.',
              ].map((flag, i) => (
                <li key={i} className="font-sans italic text-[12px]" style={{ color: 'var(--orange)' }}>
                  {i + 1}. {flag}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Center — tally chart */}
        <div className="border-b md:border-b-0 p-5 flex flex-col gap-4">
          <div
            className="rounded-[4px] p-4"
            style={{ border: '1px solid var(--hair)', background: 'var(--sheet)' }}
          >
            <TallyTicker snapshots={MOCK_SNAPSHOTS} totalPUs={s.totalPUs} />
          </div>

          {/* Updates feed */}
          <div>
            <h4 className="font-mono text-[10px] uppercase mb-3" style={{ color: 'var(--ink-4)' }}>Live updates</h4>
            <div className="space-y-2">
              {(updates ?? MOCK_UPDATES).map((u) => {
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
          </div>
        </div>

        {/* Right — incident feed */}
        <div className="border-t md:border-t-0 md:border-l overflow-y-auto" style={{ borderColor: 'var(--hair)' }}>
          <div className="flex items-center gap-2 px-4 py-3 border-b shrink-0" style={{ borderColor: 'var(--hair)' }}>
            <LivePulse variant="orange" />
            <span className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>Incident feed · live</span>
            <StatusPill variant="warn" label="2 unread" />
          </div>

          {INCIDENTS.map(({ sev, sevBg, sevColor, borderColor, cardBg, title, time, location, body, meta }) => (
            <div
              key={title}
              className="px-4 py-3 border-b"
              style={{
                background: cardBg,
                borderLeft: borderColor ? `3px solid ${borderColor}` : undefined,
                borderBottomColor: 'var(--hair)',
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-[10px] font-bold flex items-center justify-center rounded shrink-0"
                    style={{ width: 20, height: 20, background: sevBg, color: sevColor, border: sev === 3 ? `1px solid ${borderColor}` : undefined }}
                  >
                    {sev}
                  </span>
                  <span className="font-sans font-semibold text-[13px]" style={{ color: 'var(--ink)' }}>{title}</span>
                </div>
                <span className="font-mono text-[10px] whitespace-nowrap shrink-0" style={{ color: 'var(--ink-4)' }}>{time}</span>
              </div>
              <div className="font-mono text-[10px] mt-0.5" style={{ color: 'var(--ink-3)' }}>{location}</div>
              <div className="font-sans text-[12px] mt-1" style={{ color: 'var(--ink-2)' }}>{body}</div>
              <div className="font-mono text-[9px] mt-2" style={{ color: 'var(--ink-4)' }}>{meta}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
