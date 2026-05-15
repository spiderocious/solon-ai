import { SkeletonCard, LivePulse } from '@solon/ui';
import { useDashboardSummary } from '../api/use-dashboard-summary';
import { VoteSharePanel } from './parts/vote-share-panel';
import { TurnoutPanel } from './parts/turnout-panel';
import { AgentsPanel } from './parts/agents-panel';
import { FinancePanel } from './parts/finance-panel';
import { IssuesAlertsPanel } from './parts/issues-alerts-panel';

export default function DashboardScreen() {
  const { data } = useDashboardSummary();

  if (!data) {
    return (
      <div className="p-6 md:p-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  const d = data;

  return (
    <div className="px-6 md:px-8 py-6 md:py-8">
      {/* Page header — DS masthead style */}
      <div className="flex items-center justify-between mb-6 pb-5 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.14em] mb-0.5" style={{ color: 'var(--ink-4)' }}>
            {d.race} · {d.constituency}
          </div>
          <h1 className="font-serif font-semibold text-[28px] leading-tight" style={{ color: 'var(--ink)' }}>
            {d.candidateName}
          </h1>
          <p className="font-serif italic text-[13px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
            — campaign intelligence · live
          </p>
        </div>
        <div className="flex items-center gap-2">
          <LivePulse />
          <span className="font-mono text-[10px]" style={{ color: 'var(--forest-600)' }}>Live</span>
        </div>
      </div>

      {/* Grid — responsive */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <VoteSharePanel
          projectedVoteShare={d.projectedVoteShare}
          projectedVoteShareDelta={d.projectedVoteShareDelta}
          confidenceLevel={d.confidenceLevel}
        />

        <TurnoutPanel
          targetTurnout={d.targetTurnout}
          registeredVoters={d.registeredVoters}
          confidenceLevel={d.confidenceLevel}
        />

        <AgentsPanel
          agentsCoverage={d.agentsCoverage}
          agentsTotal={d.agentsTotal}
          agentsActive={d.agentsActive}
        />

        <FinancePanel
          campaignBudgetSpent={d.campaignBudgetSpent}
          campaignBudgetTotal={d.campaignBudgetTotal}
        />

        <div className="md:col-span-2">
          <IssuesAlertsPanel
            topIssues={d.topIssues}
            keyAlerts={d.keyAlerts}
          />
        </div>
      </div>
    </div>
  );
}
