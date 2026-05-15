import { SkeletonCard, StatusPill } from '@solon/ui';
import { useVoterIssues } from '../api/use-voter-issues';

const TH_CLS = 'font-mono text-[10px] uppercase text-left px-3 py-2 border-b tracking-[0.08em]';
const TD_CLS = 'font-sans text-[13px] px-3 py-3 border-b';

const TREND_CONFIG: Record<string, { label: string; variant: 'ok' | 'warn' | 'crit'; arrow: string; color: string }> = {
  rising: { label: 'Rising', variant: 'crit', arrow: '↑', color: 'var(--crit)' },
  steady: { label: 'Steady', variant: 'ok', arrow: '→', color: 'var(--ink-3)' },
  falling: { label: 'Falling', variant: 'warn', arrow: '↓', color: 'var(--orange)' },
};

export default function VoterIntelIssuesScreen() {
  const { data, isLoading } = useVoterIssues();
  const issues = data ?? [];

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
            — Anambra Central · salience by source · week of May 5–11
          </p>
        </div>
        <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
          {issues.length} issues tracked
        </span>
      </div>

      {/* Table */}
      <div className="rounded-[6px] overflow-hidden border mb-6" style={{ borderColor: 'var(--hair)' }}>
        <style>{`.issues-table tbody tr:hover td { background: var(--paper-2); }`}</style>
        <div className="overflow-x-auto">
          <table className="issues-table w-full border-collapse">
            <thead>
              <tr style={{ background: 'var(--paper-2)' }}>
                {['#', 'Issue', 'Salience', 'Week delta', 'Trend', 'Sources'].map((h, i) => (
                  <th
                    key={h}
                    className={TH_CLS}
                    style={{ color: 'var(--ink-3)', borderColor: 'var(--hair)', textAlign: i === 2 || i === 3 ? 'right' : 'left' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, idx) => {
                const tc = (TREND_CONFIG[issue.trend] ?? TREND_CONFIG['steady'])!;
                return (
                  <tr key={issue.id}>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--forest-600)', fontFamily: 'var(--font-mono)', fontSize: 12, width: 32 }}>
                      {String(idx + 1).padStart(2, '0')}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      <div className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>{issue.name}</div>
                      {/* Mini sparkline */}
                      <div className="flex items-end gap-0.5 mt-1.5" style={{ height: 16 }}>
                        {issue.weekData.map((w, wi) => {
                          const maxSalience = Math.max(...issue.weekData.map((d) => d.salience));
                          const barH = Math.max(2, Math.round((w.salience / maxSalience) * 14));
                          return (
                            <div
                              key={wi}
                              style={{
                                width: 6,
                                height: barH,
                                background: wi === issue.weekData.length - 1 ? 'var(--forest-600)' : 'var(--hair)',
                                borderRadius: 1,
                              }}
                            />
                          );
                        })}
                      </div>
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right' }}>
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-serif font-bold text-[18px]" style={{ color: 'var(--ink)' }}>
                          {issue.salience}%
                        </span>
                        <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--hair)' }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${issue.salience}%`, background: 'var(--forest-600)' }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right' }}>
                      <span
                        className="font-mono text-[12px] font-semibold"
                        style={{ color: issue.delta > 0 ? 'var(--forest-700)' : issue.delta < 0 ? 'var(--orange)' : 'var(--ink-3)' }}
                      >
                        {issue.delta > 0 ? '+' : ''}{issue.delta}%
                      </span>
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[14px]" style={{ color: tc.color }}>{tc.arrow}</span>
                        <StatusPill variant={tc.variant} label={tc.label} />
                      </div>
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      <div className="flex flex-wrap gap-1">
                        {issue.sources.map((s) => (
                          <div key={s.name} className="flex items-center gap-1">
                            <span
                              className="px-1.5 py-0.5 font-mono text-[10px] rounded-[3px]"
                              style={{ background: 'var(--paper-2)', color: 'var(--ink-3)', border: '1px solid var(--hair)' }}
                            >
                              {s.name} {s.share}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="font-serif italic text-[12px]" style={{ color: 'var(--ink-4)' }}>
        Sources — radio call-in, Nairaland, public X, public WhatsApp · Anambra Central · Solon Intelligence
      </p>
    </div>
  );
}
