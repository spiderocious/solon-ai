import { cn } from '../../utils/cn.js';

export interface TimelineEvent {
  date: string;
  label: string;
  sublabel?: string;
  isToday?: boolean;
  isPast?: boolean;
}

export interface CampaignTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function CampaignTimeline({ events, className }: CampaignTimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Vertical line */}
      <div
        className="absolute left-[19px] top-0 bottom-0 w-px"
        style={{ background: 'var(--hair)' }}
      />
      <div className="space-y-0">
        {events.map((ev, i) => (
          <div key={i} className="flex gap-4 relative py-3">
            {/* Dot */}
            <div className="relative z-10 flex-shrink-0 flex items-center justify-center" style={{ width: 40 }}>
              {ev.isToday ? (
                <div
                  className="w-4 h-4 rounded-full border-2"
                  style={{ background: 'var(--forest-600)', borderColor: 'var(--forest-600)' }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                </div>
              ) : ev.isPast ? (
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: 'var(--forest-400)' }}
                />
              ) : (
                <div
                  className="w-3 h-3 rounded-full border-2"
                  style={{ borderColor: 'var(--ink-4)', background: 'var(--paper)' }}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3">
                <div
                  className={cn(
                    'font-sans text-[13px]',
                    ev.isToday ? 'font-semibold' : ev.isPast ? 'font-medium' : '',
                  )}
                  style={{ color: ev.isToday ? 'var(--forest-700)' : ev.isPast ? 'var(--ink)' : 'var(--ink-3)' }}
                >
                  {ev.label}
                </div>
                {ev.isToday && (
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-[2px]"
                    style={{ background: 'var(--forest-50)', color: 'var(--forest-700)' }}
                  >
                    Today
                  </span>
                )}
              </div>
              <div className="font-mono text-[11px] mt-0.5" style={{ color: 'var(--ink-4)' }}>
                {ev.date}
                {ev.sublabel && <span className="ml-2">{ev.sublabel}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
