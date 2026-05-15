import { StatusPill } from '@solon/ui';
import { StatCard } from './stat-card';
import type { DashboardSummary } from '@shared/types/mock-data.types';

interface IssuesAlertsPanelProps {
  topIssues: DashboardSummary['topIssues'];
  keyAlerts: DashboardSummary['keyAlerts'];
}

export function IssuesAlertsPanel({ topIssues, keyAlerts }: Readonly<IssuesAlertsPanelProps>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Issue salience */}
      <StatCard label="Issue salience">
        <div className="space-y-3">
          {topIssues.map((issue) => {
            const deltaColor = issue.delta > 0
              ? 'var(--forest-700)'
              : issue.delta < 0
                ? 'var(--orange)'
                : 'var(--ink-3)';
            const arrow = issue.delta > 0 ? '+' : '';
            return (
              <div key={issue.name} className="grid items-center gap-3" style={{ gridTemplateColumns: '1fr auto auto' }}>
                <span className="font-sans text-[12px]" style={{ color: 'var(--ink-2)' }}>{issue.name}</span>
                <div className="w-24 h-1.5 rounded overflow-hidden" style={{ background: 'var(--hair)' }}>
                  <div
                    className="h-full rounded"
                    style={{ width: `${issue.salience}%`, background: 'var(--forest-600)' }}
                  />
                </div>
                <span className="font-mono text-[10px] w-10 text-right" style={{ color: deltaColor }}>
                  {arrow}{issue.delta}%
                </span>
              </div>
            );
          })}
        </div>
      </StatCard>

      {/* Key alerts */}
      <StatCard label="Key alerts">
        <div className="space-y-2">
          {keyAlerts.map((alert) => {
            const pillVariant = alert.severity === 'high'
              ? 'warn' as const
              : alert.severity === 'medium'
                ? 'info' as const
                : 'quiet' as const;
            const borderColor = alert.severity === 'high'
              ? 'var(--orange)'
              : alert.severity === 'medium'
                ? 'var(--info-edge, #B7C7DC)'
                : 'var(--hair)';
            const bg = alert.severity === 'high'
              ? 'var(--orange-soft)'
              : 'var(--paper-2)';

            return (
              <div
                key={alert.id}
                className="rounded-[3px] px-3 py-2"
                style={{ background: bg, borderLeft: `2px solid ${borderColor}` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <StatusPill variant={pillVariant} label={alert.severity.toUpperCase()} />
                </div>
                <p className="font-sans text-[12px]" style={{ color: 'var(--ink-2)' }}>{alert.message}</p>
              </div>
            );
          })}
        </div>
      </StatCard>
    </div>
  );
}
