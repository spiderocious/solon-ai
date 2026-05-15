import { LivePulse, StatusPill } from '@solon/ui';

const ELECTION_DATE = new Date('2027-02-20T00:00:00Z');

const CHECKLIST_ITEMS = [
  { label: '412 agents briefed and deployed', done: false },
  { label: 'Solon mobile app synced and tested', done: false },
  { label: 'Escalation WhatsApp groups active', done: true },
  { label: 'Legal team on standby', done: true },
  { label: 'War Room commanders in position', done: false },
];

const PHASES = [
  { time: '06:00', label: 'Deployment begins', detail: 'All agents report to assigned PU' },
  { time: '08:00', label: 'Accreditation opens', detail: 'BVAS check-in monitoring starts' },
  { time: '12:00', label: 'Midday tally sync', detail: 'War Room receives first batch rollup' },
  { time: '14:30', label: 'Closing confirmation', detail: 'Final accreditation counts locked' },
  { time: '16:00', label: 'Counting begins', detail: 'Agents to stand at collation stations' },
  { time: '20:00', label: 'Results upload', detail: 'IReV observation and form 8A capture' },
];

export default function AgentsElectionDayScreen() {
  const now = new Date();
  const daysUntil = Math.ceil((ELECTION_DATE.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const isElectionDay = daysUntil <= 0;

  return (
    <div
      className="flex flex-col md:grid min-h-full"
      style={{ gridTemplateColumns: '280px 1fr' }}
    >
      {/* Left — status */}
      <div className="border-b md:border-b-0 md:border-r p-5 flex flex-col gap-5" style={{ borderColor: 'var(--hair)' }}>
        <div className="flex items-center gap-2">
          <h2 className="font-serif font-semibold text-[18px]" style={{ color: 'var(--ink)' }}>Election day</h2>
          <LivePulse variant={isElectionDay ? 'orange' : undefined} />
        </div>

        {/* Countdown card */}
        <div
          className="rounded-[6px] p-5 text-center"
          style={{ background: isElectionDay ? 'var(--crit-bg)' : 'var(--paper-2)', border: `1px solid ${isElectionDay ? 'var(--crit)' : 'var(--hair)'}` }}
        >
          {isElectionDay ? (
            <>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--crit)' }}>LIVE NOW</div>
              <div className="font-serif font-bold text-[40px] leading-none" style={{ color: 'var(--crit)' }}>
                Election Day
              </div>
            </>
          ) : (
            <>
              <div className="font-mono text-[9px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>Days until election</div>
              <div className="font-serif font-bold text-[56px] leading-none" style={{ color: 'var(--forest-600)' }}>
                {daysUntil}
              </div>
              <div className="font-mono text-[10px] mt-1" style={{ color: 'var(--ink-4)' }}>
                20 Feb 2027
              </div>
            </>
          )}
        </div>

        {/* Mode */}
        <div className="flex items-center gap-2">
          <StatusPill variant={isElectionDay ? 'crit' : 'warn'} label={isElectionDay ? 'War Room active' : 'Pre-election mode'} />
        </div>

        {/* Pre-election checklist */}
        <div>
          <h3 className="font-mono text-[9px] uppercase tracking-[0.12em] mb-3" style={{ color: 'var(--ink-3)' }}>Deployment checklist</h3>
          <div className="space-y-2">
            {CHECKLIST_ITEMS.map(({ label, done }) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-[3px] shrink-0 flex items-center justify-center font-mono text-[10px]"
                  style={{
                    background: done ? 'var(--forest-50)' : 'var(--paper-2)',
                    border: `1px solid ${done ? 'var(--forest-600)' : 'var(--hair)'}`,
                    color: done ? 'var(--forest-700)' : 'transparent',
                  }}
                >
                  {done ? '✓' : ''}
                </div>
                <span className="font-sans text-[12px]" style={{ color: done ? 'var(--ink-3)' : 'var(--ink-2)' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — election day timeline */}
      <div className="p-5 md:p-6">
        <h3 className="font-sans font-semibold text-[14px] mb-4" style={{ color: 'var(--ink)' }}>
          Election day schedule · 20 Feb 2027
        </h3>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[39px] top-0 bottom-0 w-px"
            style={{ background: 'var(--hair)' }}
          />

          <div className="space-y-0">
            {PHASES.map(({ time, label, detail }, i) => (
              <div key={time} className="flex items-start gap-4 pb-5">
                <div className="font-mono text-[10px] w-[52px] shrink-0 pt-0.5 text-right" style={{ color: 'var(--ink-4)' }}>
                  {time}
                </div>
                <div
                  className="w-3 h-3 rounded-full border-2 shrink-0 mt-0.5 relative z-10"
                  style={{
                    background: i === 0 ? 'var(--forest-600)' : 'var(--paper)',
                    borderColor: i === 0 ? 'var(--forest-600)' : 'var(--hair)',
                  }}
                />
                <div>
                  <div className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>{label}</div>
                  <div className="font-serif italic text-[12px]" style={{ color: 'var(--ink-3)' }}>{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-[4px] px-4 py-3 mt-2"
          style={{ background: 'var(--forest-50)', borderTop: '3px solid var(--forest-600)' }}
        >
          <div className="font-mono text-[9px] uppercase mb-1" style={{ color: 'var(--forest-700)' }}>Solon · agent command</div>
          <p className="font-serif italic text-[12px]" style={{ color: 'var(--ink-2)' }}>
            Real-time agent check-ins, incident reports, and PU-level tally uploads will appear in the War Room live dashboard once polling opens.
          </p>
        </div>
      </div>
    </div>
  );
}
