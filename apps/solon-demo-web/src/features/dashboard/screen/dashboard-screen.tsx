import { LivePulse, SkeletonCard } from '@solon/ui';
import { useDashboardSummary } from '../api/use-dashboard-summary';
import { useAgentsReadiness } from '../../agents/api/use-agents-readiness';
import { useFinanceSummary } from '../../finance/api/use-finance-summary';
import { useSimulatorBaseline } from '../../simulator/api/use-simulator-baseline';
import { useVoterIssues } from '../../voter-intel/api/use-voter-issues';
import { StatCard } from './parts/stat-card';
import { formatNaira } from '@shared/helpers/format-naira';

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr).getTime();
  const now = Date.now();
  return Math.max(0, Math.round((target - now) / (1000 * 60 * 60 * 24)));
}

export default function DashboardScreen() {
  const { data: profile } = useDashboardSummary();
  const { data: readiness } = useAgentsReadiness();
  const { data: finance } = useFinanceSummary();
  const { data: baseline } = useSimulatorBaseline();
  const { data: issues } = useVoterIssues();

  if (!profile) {
    return (
      <div className="p-6 md:p-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  const afpCandidate = baseline?.candidates.find((c) => c.party === 'AFP');
  const spentPct = finance ? (finance.total_spent_naira / finance.total_cap_naira) * 100 : 0;
  const daysLeft = daysUntil(profile.election_date);
  const topIssues = issues?.top_issues.slice(0, 5) ?? [];

  return (
    <div className="px-6 md:px-8 py-6 md:py-8">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6 pb-5 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.14em] mb-0.5" style={{ color: 'var(--ink-4)' }}>
            {profile.party_full} · {profile.office}
          </div>
          <h1 className="font-serif font-semibold text-[28px] leading-tight" style={{ color: 'var(--ink)' }}>
            {profile.full_name}
          </h1>
          <p className="font-serif italic text-[13px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
            — {profile.slogan}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <LivePulse />
            <span className="font-mono text-[10px]" style={{ color: 'var(--forest-600)' }}>Live</span>
          </div>
          <div className="font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
            {daysLeft}d to election
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {/* Vote share */}
        <StatCard label="AFP baseline projection">
          {afpCandidate ? (
            <>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-serif font-bold text-[48px] leading-none" style={{ color: profile.party_colour }}>
                  {afpCandidate.share.toFixed(1)}%
                </span>
                <div className="font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
                  ± {afpCandidate.margin_of_error}pts
                </div>
              </div>
              {baseline && (
                <div className="flex h-6 rounded overflow-hidden">
                  {baseline.candidates.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center px-1 font-mono text-[8px] text-white shrink-0 overflow-hidden"
                      style={{ flex: c.share, background: c.party_colour }}
                    >
                      {c.share > 8 ? c.party : ''}
                    </div>
                  ))}
                </div>
              )}
              <div className="font-mono text-[10px] mt-2" style={{ color: 'var(--ink-4)' }}>
                {afpCandidate.confidence} confidence · no-shock model
              </div>
            </>
          ) : (
            <div className="font-serif italic text-[13px]" style={{ color: 'var(--ink-3)' }}>Loading…</div>
          )}
        </StatCard>

        {/* Agent readiness */}
        <StatCard label="Agent network">
          {readiness ? (
            <>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-serif font-bold text-[40px] leading-none" style={{ color: 'var(--forest-700)' }}>
                  {readiness.election_ready}
                </span>
                <span className="font-sans text-[12px]" style={{ color: 'var(--ink-3)' }}>election ready</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden mb-3" style={{ background: 'var(--hair)' }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(readiness.election_ready / readiness.total_agents) * 100}%`, background: 'var(--forest-600)' }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Total', value: readiness.total_agents },
                  { label: 'Verified', value: readiness.verified },
                  { label: 'Pending', value: readiness.pending_verification },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <div className="font-serif font-semibold text-[20px]" style={{ color: 'var(--ink-2)' }}>{value}</div>
                    <div className="font-mono text-[9px] uppercase" style={{ color: 'var(--ink-4)' }}>{label}</div>
                  </div>
                ))}
              </div>
            </>
          ) : <div className="font-serif italic text-[13px]" style={{ color: 'var(--ink-3)' }}>Loading…</div>}
        </StatCard>

        {/* Finance */}
        <StatCard label="Campaign finance">
          {finance ? (
            <>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-serif font-bold text-[32px] leading-none" style={{ color: 'var(--forest-700)' }}>
                  {formatNaira(finance.total_spent_naira, true)}
                </span>
                <span className="font-serif italic text-[13px]" style={{ color: 'var(--ink-3)' }}>
                  of {formatNaira(finance.total_cap_naira, true)} · {spentPct.toFixed(0)}%
                </span>
              </div>
              <div className="h-2 rounded relative mt-2 mb-2" style={{ background: 'var(--hair)' }}>
                <div className="absolute left-0 top-0 h-full rounded" style={{ width: `${spentPct}%`, background: spentPct >= 75 ? 'var(--orange)' : 'var(--forest-600)' }} />
                <div className="absolute top-0 h-full w-px" style={{ left: '75%', background: 'var(--crit)', opacity: 0.5 }} />
              </div>
              <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
                Next deadline in {finance.days_to_next_inec_deadline}d · {finance.next_deadline_label}
              </div>
            </>
          ) : <div className="font-serif italic text-[13px]" style={{ color: 'var(--ink-3)' }}>Loading…</div>}
        </StatCard>

        {/* Issues */}
        <div className="md:col-span-2 xl:col-span-2">
          <StatCard label="Top issues this week">
            {topIssues.length > 0 ? (
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
            ) : <div className="font-serif italic text-[13px]" style={{ color: 'var(--ink-3)' }}>Loading…</div>}
          </StatCard>
        </div>

        {/* Candidate summary */}
        <StatCard label="Campaign details">
          <div className="space-y-2">
            {[
              { label: 'Running mate', value: profile.running_mate_label },
              { label: 'Campaign manager', value: profile.campaign_manager },
              { label: 'Election date', value: profile.election_date },
              { label: 'Days remaining', value: String(daysLeft) },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center border-b pb-1.5" style={{ borderColor: 'var(--hair)' }}>
                <span className="font-sans text-[12px]" style={{ color: 'var(--ink-3)' }}>{label}</span>
                <span className="font-mono text-[11px]" style={{ color: 'var(--ink-2)' }}>{value}</span>
              </div>
            ))}
          </div>
        </StatCard>
      </div>
    </div>
  );
}
