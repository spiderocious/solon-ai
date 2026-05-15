import { LivePulse, StatusPill } from '@solon/ui';

const FOREST_300 = '#7AA386';

const PARTY_DATA = [
  { party: 'LP', color: 'var(--forest-700)', pct: 49.8, votes: '40,538', delta: '+2.6 pt', deltaColor: 'var(--forest-700)', barColor: 'var(--forest-600)' },
  { party: 'APC', color: 'var(--ink)', pct: 21.4, votes: '17,406', delta: '–0.7', deltaColor: 'var(--ink-3)', barColor: 'var(--ink)' },
  { party: 'APGA', color: 'var(--ink-3)', pct: 17.2, votes: '13,990', delta: '–1.2', deltaColor: 'var(--ink-3)', barColor: 'var(--ink-3)' },
  { party: 'PDP', color: 'var(--ink-3)', pct: 8.9, votes: '7,239', delta: '–0.9', deltaColor: 'var(--ink-3)', barColor: 'var(--ink-4)' },
  { party: 'Other', color: 'var(--ink-4)', pct: 2.7, votes: '2,196', delta: '+0.2', deltaColor: 'var(--ink-3)', barColor: 'var(--hair)' },
];

const INCIDENTS = [
  {
    sev: 5,
    sevBg: 'var(--crit)',
    sevColor: 'var(--paper)',
    borderColor: 'var(--crit)',
    cardBg: 'var(--crit-bg)',
    title: 'BVAS lockdown across PU cluster',
    time: '2 min',
    location: 'PU 008-05-19, -20, -21 · Idemili N.',
    body: 'All three machines refusing to authenticate. Crowd building.',
    meta: '⚑ AGENT · @CO / 2 CITIZENS / LEGAL DISPATCHED',
  },
  {
    sev: 4,
    sevBg: 'var(--orange)',
    sevColor: 'var(--paper)',
    borderColor: 'var(--orange)',
    cardBg: undefined,
    title: 'Vote-buying allegation',
    time: '14 min',
    location: 'Ogbaru · ward 6 · PU 008-06-04',
    body: 'Cash being distributed in church car park, 200m from PU.',
    meta: '⚑ AGENT / 1 IMAGE / ACKNOWLEDGED',
  },
  {
    sev: 3,
    sevBg: '#FFF3E0',
    sevColor: 'var(--orange)',
    borderColor: '#FFB74D',
    cardBg: undefined,
    title: 'Long queues, slow accreditation',
    time: '28 min',
    location: 'Onitsha North · ward 4 · PU 008-04-09',
    body: 'Voice note describing 90-minute queues.',
    meta: 'CITIZEN / VOICE 0:42 / MONITORING',
  },
  {
    sev: 3,
    sevBg: '#FFF3E0',
    sevColor: 'var(--orange)',
    borderColor: '#FFB74D',
    cardBg: undefined,
    title: 'Agent late to PU',
    time: '41 min',
    location: 'Anambra East · ward 3',
    body: 'Coverage gap; backup agent en route.',
    meta: 'COORDINATOR / REASSIGNED',
  },
  {
    sev: 2,
    sevBg: 'var(--paper-2)',
    sevColor: 'var(--ink-3)',
    borderColor: undefined,
    cardBg: 'var(--paper-2)',
    title: 'Material shortage · ballot books',
    time: '58 min',
    location: 'Aguata · ward 8',
    body: 'PU started with 1 book instead of 2; INEC resupply confirmed.',
    meta: 'AGENT / RESOLVED',
  },
];

export function WarroomScreen() {
  return (
    <div style={{ maxWidth: 'none' }}>
      {/* Page header */}
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>
          32 / SCREENS
        </div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>
          War room
        </div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>
          — live tally, anomaly feed, incident log.
        </div>
      </div>

      {/* Top strip */}
      <div
        className="flex items-center gap-6 px-6 py-3"
        style={{
          background: 'var(--ink)',
          color: 'var(--paper)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {[
          { label: 'PU reporting', value: <>263<span style={{ color: 'var(--ink-3)' }}> / 412</span></>, delta: '+18 last 60s', deltaColor: FOREST_300 },
          { label: 'Coverage', value: '63.8%', delta: 'target 90% by 18:00', deltaColor: FOREST_300 },
          { label: 'Reconciled', value: <>182<span style={{ color: 'var(--ink-3)' }}> / 263</span></>, delta: '+6 last 60s', deltaColor: FOREST_300 },
          { label: 'Accredited (live)', value: '81,402', delta: '+1,148 last 60s', deltaColor: FOREST_300 },
          { label: 'Incidents · open', value: <span style={{ color: 'var(--orange)' }}>14</span>, delta: '2 at sev 4+', deltaColor: 'var(--orange)' },
          { label: 'Anomaly flags', value: <span style={{ color: 'var(--orange)' }}>3</span>, delta: 'divergence from model', deltaColor: 'var(--orange)' },
        ].map(({ label, value, delta, deltaColor }, i) => (
          <>
            {i > 0 && (
              <span key={`div-${i}`} style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            )}
            <div key={label} className="flex items-center gap-2">
              <div>
                <div className="font-mono text-[9px]" style={{ color: 'var(--ink-4)' }}>{label}</div>
                <div className="font-mono font-semibold text-[18px]" style={{ color: 'var(--paper)' }}>{value}</div>
                <div className="font-mono text-[9px]" style={{ color: deltaColor }}>{delta}</div>
              </div>
            </div>
          </>
        ))}
      </div>

      {/* Three-column body */}
      <div
        className="grid"
        style={{ gridTemplateColumns: '260px 1fr 300px' }}
      >
        {/* Left panel */}
        <div className="border-r p-4" style={{ borderColor: 'var(--hair)' }}>
          <h3 className="font-sans font-semibold text-[14px]" style={{ color: 'var(--ink)' }}>
            Live tally · 263 PU
          </h3>

          {PARTY_DATA.map(({ party, color, pct, votes, delta, deltaColor, barColor }) => (
            <div
              key={party}
              className="flex items-center gap-3 py-2 border-b"
              style={{ borderColor: 'var(--hair)' }}
            >
              <span className="font-mono text-[10px] w-8" style={{ color }}>{party}</span>
              <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--hair)', position: 'relative' }}>
                <div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{ width: `${pct}%`, background: barColor }}
                />
              </div>
              <div className="text-right">
                <span className="font-mono font-semibold text-[13px]" style={{ color: 'var(--ink)' }}>{pct}%</span>
                <span className="font-mono text-[10px] ml-1" style={{ color: 'var(--ink-3)' }}>· {votes}</span>
              </div>
              <span className="font-mono text-[10px]" style={{ color: deltaColor, minWidth: 50 }}>{delta}</span>
            </div>
          ))}

          {/* Projected final card */}
          <div
            className="rounded p-3 mt-3"
            style={{ background: 'var(--forest-50)', border: '1px solid var(--forest-200)' }}
          >
            <div className="flex items-baseline gap-2">
              <span className="font-serif font-bold text-[22px]" style={{ color: 'var(--forest-700)' }}>LP +28.4</span>
              <span className="font-serif italic text-[13px]" style={{ color: 'var(--ink-3)' }}>· ± 4.2 pts</span>
            </div>
            <div className="font-sans text-[12px] mt-1" style={{ color: 'var(--ink-3)' }}>
              Solon expects the gap to widen as Ogbaru and Idemili South complete reporting.
            </div>
          </div>

          {/* Anomaly flags */}
          <div className="mt-4">
            <h4 className="font-mono text-[10px] uppercase" style={{ color: 'var(--orange)' }}>ANOMALY FLAGS</h4>
            <ol className="mt-2 space-y-1.5">
              {[
                'PU 008-06-04 reports LP 71% — divergence +22pt vs model.',
                'PU 008-07-09 totals exceed accredited count.',
                '3 PU in ward 11 marked \'Confirmed\' by a single source.',
              ].map((flag, i) => (
                <li key={i} className="font-sans italic text-[12px]" style={{ color: 'var(--orange)' }}>
                  {i + 1}. {flag}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Center — map area */}
        <div>
          {/* Toolbar */}
          <div
            className="flex items-center gap-2 px-4 py-2 border-b"
            style={{ borderColor: 'var(--hair)' }}
          >
            {['Reporting status', 'Live margin', 'Incident heat'].map((label, i) => (
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
            {['Agents + citizens', 'Agents only'].map((label, i) => (
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
          </div>

          {/* SVG map */}
          <svg viewBox="0 0 700 500" width="100%">
            {/* Ward outlines */}
            {[
              'M50,50 L180,30 L220,120 L150,160 L60,130Z',
              'M180,30 L310,20 L340,100 L220,120Z',
              'M310,20 L440,40 L420,150 L340,100Z',
              'M440,40 L560,60 L530,180 L420,150Z',
              'M50,130 L150,160 L130,260 L40,240Z',
              'M150,160 L270,170 L250,280 L130,260Z',
              'M270,170 L420,150 L400,280 L250,280Z',
              'M420,150 L530,180 L520,300 L400,280Z',
              'M50,240 L130,260 L120,370 L50,350Z',
            ].map((d, i) => (
              <path key={i} d={d} fill="var(--paper)" stroke="var(--hair)" strokeWidth={1} />
            ))}

            {/* Reported PU dots — forest */}
            {[
              [80, 80], [110, 60], [140, 100], [200, 55], [240, 70], [270, 55],
              [330, 40], [360, 70], [390, 55], [470, 70], [500, 110], [210, 190],
              [260, 210], [300, 195], [320, 240], [460, 200], [80, 160], [90, 290],
              [110, 310], [100, 350],
            ].map(([cx, cy], i) => (
              <circle key={`r-${i}`} cx={cx} cy={cy} r={3} fill="var(--forest-600)" />
            ))}

            {/* Flagged PU dots — orange */}
            <circle cx={200} cy={220} r={5} fill="var(--orange)" />
            <circle cx={350} cy={300} r={5} fill="var(--orange)" />
            <circle cx={480} cy={350} r={5} fill="var(--orange)" />

            {/* Crit PU */}
            <circle cx={380} cy={200} r={7} fill="var(--crit)" />

            {/* Outstanding hollow circles */}
            {[[540, 90], [560, 150], [540, 240], [520, 310], [400, 350], [340, 370], [280, 340], [150, 350]].map(([cx, cy], i) => (
              <circle key={`o-${i}`} cx={cx} cy={cy} r={4} stroke="var(--ink)" strokeWidth={1} fill="none" />
            ))}

            {/* Crit callout */}
            <line x1={380} y1={200} x2={440} y2={160} stroke="var(--crit)" strokeWidth={1} />
            <rect x={440} y={140} width={120} height={40} fill="var(--crit)" rx={2} />
            <text x={448} y={156} fill="var(--paper)" fontFamily="monospace" fontSize={9}>SEV 5 · 11:38</text>
            <text x={448} y={170} fill="var(--paper)" fontFamily="monospace" fontSize={9}>BVAS lockdown</text>
          </svg>
        </div>

        {/* Right panel — Incident feed */}
        <div className="border-l overflow-y-auto" style={{ borderColor: 'var(--hair)' }}>
          {/* Header */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b"
            style={{ borderColor: 'var(--hair)' }}
          >
            <LivePulse variant="orange" />
            <span className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>
              Incident feed · live
            </span>
            <StatusPill variant="warn" label="2 unread" />
          </div>

          {/* Incident cards */}
          {INCIDENTS.map(({ sev, sevBg, sevColor, borderColor, cardBg, title, time, location, body, meta }) => (
            <div
              key={sev + title}
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
                    className="font-mono text-[10px] font-bold flex items-center justify-center rounded"
                    style={{
                      width: 20, height: 20,
                      background: sevBg,
                      color: sevColor,
                      border: sev === 3 ? `1px solid ${borderColor}` : undefined,
                      flexShrink: 0,
                    }}
                  >
                    {sev}
                  </span>
                  <span className="font-sans font-semibold text-[13px]" style={{ color: 'var(--ink)' }}>{title}</span>
                </div>
                <span className="font-mono text-[10px] whitespace-nowrap" style={{ color: 'var(--ink-4)' }}>{time}</span>
              </div>
              {location && (
                <div className="font-mono text-[10px] mt-0.5" style={{ color: 'var(--ink-3)' }}>{location}</div>
              )}
              <div className="font-sans text-[12px] mt-1" style={{ color: 'var(--ink-2)' }}>{body}</div>
              <div className="font-mono text-[9px] mt-2" style={{ color: 'var(--ink-4)' }}>{meta}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
