import { StatusPill } from '@solon/ui';
import { StatCard } from './stat-card';
import type { IssueItem } from '@shared/types/mock-data.types';

interface Alert {
  id: string;
  message: string;
  type: string;
}

interface IssuesAlertsPanelProps {
  topIssues: IssueItem[];
  keyAlerts: Alert[];
}

export function IssuesAlertsPanel({ topIssues, keyAlerts }: Readonly<IssuesAlertsPanelProps>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <StatCard label="Issue salience">
        <div className="space-y-3">
          {topIssues.map((issue) => {
            const trendColor = issue.trend === 'rising' ? 'var(--crit)' : issue.trend === 'falling' ? 'var(--orange)' : 'var(--ink-3)';
            const arrow = issue.trend === 'rising' ? '↑' : issue.trend === 'falling' ? '↓' : '→';
            const barWidth = Math.min(100, (issue.mentions_this_week / 100000) * 100);
            return (
              <div key={issue.rank} className="grid items-center gap-3" style={{ gridTemplateColumns: '1fr 80px auto' }}>
                <span className="font-sans text-[12px]" style={{ color: 'var(--ink-2)' }}>{issue.name}</span>
                <div className="w-full h-1.5 rounded overflow-hidden" style={{ background: 'var(--hair)' }}>
                  <div className="h-full rounded" style={{ width: `${barWidth}%`, background: 'var(--forest-600)' }} />
                </div>
                <span className="font-mono text-[11px]" style={{ color: trendColor }}>{arrow}</span>
              </div>
            );
          })}
        </div>
      </StatCard>

      <StatCard label="Key alerts">
        <div className="space-y-2">
          {keyAlerts.map((alert) => (
            <div
              key={alert.id}
              className="rounded-[3px] px-3 py-2"
              style={{ background: 'var(--paper-2)', borderLeft: '2px solid var(--hair)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <StatusPill variant="quiet" label={alert.type.toUpperCase()} />
              </div>
              <p className="font-sans text-[12px]" style={{ color: 'var(--ink-2)' }}>{alert.message}</p>
            </div>
          ))}
        </div>
      </StatCard>
    </div>
  );
}
