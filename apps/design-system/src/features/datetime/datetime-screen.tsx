import { useState } from 'react';

import { CampaignTimeline, Countdown, DateRangePicker } from '@solon/ui';
import type { DateRange, TimelineEvent } from '@solon/ui';

function Scene({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-3 mb-4 pb-2 border-b" style={{ borderColor: 'var(--hair)' }}>
        <span className="font-sans text-[13px]" style={{ color: 'var(--ink-2)' }}>{title}</span>
        {subtitle && <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}

const ELECTION_DATE = new Date('2027-02-20T08:00:00');

const TIMELINE_EVENTS: TimelineEvent[] = [
  { date: '12 Jan 2026', label: 'INEC notice of election published',          isPast: true },
  { date: '28 Feb 2026', label: 'Candidate submission deadline',              isPast: true },
  { date: '15 Mar 2026', label: 'Preliminary list published',                 isPast: true },
  { date: '30 Apr 2026', label: 'Final candidate list published',             isPast: true },
  { date: '15 May 2026', label: 'Campaign period begins',                     isToday: true },
  { date: '10 Jan 2027', label: 'Campaign spending return deadline',          isPast: false },
  { date: '14 Jan 2027', label: 'Campaign silence period',                   isPast: false, sublabel: '48 h before election' },
  { date: '20 Feb 2027', label: 'Election day',                              isPast: false },
  { date: '24 Feb 2027', label: 'Collation and declaration deadline',        isPast: false },
];

export function DatetimeScreen() {
  const [range, setRange] = useState<DateRange>({ start: null, end: null });

  return (
    <div className="max-w-[760px]">
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>13 / PRIMITIVES</div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>Date &amp; time</div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>— date range picker, countdown, campaign timeline.</div>
        <div className="font-mono text-[10px] mt-3" style={{ color: 'var(--ink-4)' }}>SOLON · v 0.1</div>
      </div>

      <Scene title="Scene · analytics date filter" subtitle="date range picker with preset list + calendar">
        <DateRangePicker value={range} onChange={setRange} />
        {range.start && range.end && (
          <div className="mt-3 font-mono text-[11px]" style={{ color: 'var(--ink-4)' }}>
            Selected: {range.start.toLocaleDateString('en-NG')} → {range.end.toLocaleDateString('en-NG')}
          </div>
        )}
      </Scene>

      <Scene title="Scene · election countdown" subtitle="dark card, large mono digits, live ticking">
        <Countdown
          target={ELECTION_DATE}
          label="2027 General Election · Anambra Central Senate"
        />
      </Scene>

      <Scene title="Scene · campaign timeline" subtitle="event log with filled past / today / hollow future dots">
        <div className="max-w-[480px]">
          <CampaignTimeline events={TIMELINE_EVENTS} />
        </div>
      </Scene>
    </div>
  );
}
