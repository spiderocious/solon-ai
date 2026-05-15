import { SkeletonCard, StatusPill } from '@solon/ui';
import { useVoterIssues } from '../api/use-voter-issues';

const TH_CLS = 'font-mono text-[10px] uppercase text-left px-3 py-2 border-b tracking-[0.08em]';
const TD_CLS = 'font-sans text-[13px] px-3 py-3 border-b';

const TREND_CONFIG: Record<string, { label: string; variant: 'ok' | 'warn' | 'crit'; arrow: string; color: string }> = {
  rising:  { label: 'Rising',  variant: 'crit', arrow: '↑', color: 'var(--crit)' },
  steady:  { label: 'Steady',  variant: 'ok',   arrow: '→', color: 'var(--ink-3)' },
  falling: { label: 'Falling', variant: 'warn', arrow: '↓', color: 'var(--orange)' },
};

function formatMentions(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return String(n);
}

export default function VoterIntelIssuesScreen() {
  const { data, isLoading } = useVoterIssues();
  const issues = data?.top_issues ?? [];
  const week = data?.week ?? '';

  if (isLoading && !data) {
    return (
      <div className="p-6 grid grid-cols-1 gap-4">
        {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8">
      <div className="mb-5 flex items-start justify-between flex-wrap gap-2">
        <div>
          <h2 className="font-serif font-semibold text-[20px]" style={{ color: 'var(--ink)' }}>Issue monitor</h2>
          <p className="font-serif italic text-[13px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
            — nationwide · week of {week}
          </p>
        </div>
        <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
          {issues.length} issues tracked
        </span>
      </div>

      <div className="rounded-[6px] overflow-hidden border mb-6" style={{ borderColor: 'var(--hair)' }}>
        <style>{`.issues-table tbody tr:hover td { background: var(--paper-2); }`}</style>
        <div className="overflow-x-auto">
          <table className="issues-table w-full border-collapse">
            <thead>
              <tr style={{ background: 'var(--paper-2)' }}>
                {['#', 'Issue', 'Mentions', 'Trend', 'Sentiment', 'Sources', 'Suggested response'].map((h, i) => (
                  <th
                    key={h}
                    className={TH_CLS}
                    style={{ color: 'var(--ink-3)', borderColor: 'var(--hair)', textAlign: i === 2 ? 'right' : 'left' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => {
                const tc = TREND_CONFIG[issue.trend] ?? TREND_CONFIG['steady']!;
                const sentimentColor = issue.sentiment_toward_govt === 'negative'
                  ? 'var(--crit)'
                  : issue.sentiment_toward_govt === 'positive'
                    ? 'var(--forest-700)'
                    : 'var(--ink-3)';
                return (
                  <tr key={issue.rank}>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--forest-600)', fontFamily: 'var(--font-mono)', fontSize: 12, width: 32 }}>
                      {String(issue.rank).padStart(2, '0')}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      <div className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>{issue.name}</div>
                      {issue.quotes[0] && (
                        <div className="font-serif italic text-[11px] mt-0.5" style={{ color: 'var(--ink-4)' }}>
                          "{issue.quotes[0]}"
                        </div>
                      )}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right' }}>
                      <span className="font-mono font-semibold text-[14px]" style={{ color: 'var(--ink)' }}>
                        {formatMentions(issue.mentions_this_week)}
                      </span>
                      <div className="font-mono text-[9px]" style={{ color: 'var(--ink-4)' }}>this week</div>
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[14px]" style={{ color: tc.color }}>{tc.arrow}</span>
                        <StatusPill variant={tc.variant} label={tc.label} />
                      </div>
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      <span className="font-mono text-[11px] font-semibold capitalize" style={{ color: sentimentColor }}>
                        {issue.sentiment_toward_govt}
                      </span>
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1">
                          <span className="px-1.5 py-0.5 font-mono text-[10px] rounded-[3px]" style={{ background: 'var(--paper-2)', color: 'var(--ink-3)', border: '1px solid var(--hair)' }}>
                            X/Twitter {issue.source_breakdown.twitter_x_pct}%
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="px-1.5 py-0.5 font-mono text-[10px] rounded-[3px]" style={{ background: 'var(--paper-2)', color: 'var(--ink-3)', border: '1px solid var(--hair)' }}>
                            Nairaland {issue.source_breakdown.nairaland_pct}%
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', maxWidth: 220 }}>
                      <span className="font-sans text-[11px]" style={{ color: 'var(--ink-3)' }}>{issue.suggested_response}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="font-serif italic text-[12px]" style={{ color: 'var(--ink-4)' }}>
        Sources — X/Twitter, Nairaland · Nigeria nationwide · Solon Intelligence
      </p>
    </div>
  );
}
