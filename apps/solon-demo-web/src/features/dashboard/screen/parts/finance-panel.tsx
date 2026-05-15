import { StatCard } from './stat-card';
import { formatNaira } from '@shared/helpers/format-naira';

interface FinancePanelProps {
  readonly campaignBudgetSpent: number;
  readonly campaignBudgetTotal: number;
}

export function FinancePanel({ campaignBudgetSpent, campaignBudgetTotal }: FinancePanelProps) {
  const pct = (campaignBudgetSpent / campaignBudgetTotal) * 100;
  const barColor = pct >= 75 ? 'var(--orange)' : 'var(--forest-600)';

  return (
    <StatCard label="Campaign finance">
      {/* Spent amount */}
      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-serif font-bold text-[32px] leading-none" style={{ color: 'var(--forest-700)' }}>
          {formatNaira(campaignBudgetSpent, true)}
        </span>
        <span className="font-serif italic text-[13px]" style={{ color: 'var(--ink-3)' }}>
          of {formatNaira(campaignBudgetTotal, true)} cap · {pct.toFixed(0)}%
        </span>
      </div>

      {/* Progress bar with 75% marker */}
      <div className="h-2 rounded relative mt-2 mb-2" style={{ background: 'var(--hair)' }}>
        <div
          className="absolute left-0 top-0 h-full rounded"
          style={{ width: `${pct}%`, background: barColor }}
        />
        {/* 75% threshold marker */}
        <div
          className="absolute top-0 h-full w-px"
          style={{ left: '75%', background: 'var(--crit)', opacity: 0.5 }}
        />
      </div>

      <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
        Burn rate ₦ 26m/day · Projected final {formatNaira(campaignBudgetSpent * 1.74, true)} · marker at 75%
      </div>
    </StatCard>
  );
}
