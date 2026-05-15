import { VoteShareBar, ConfidenceBar } from '@solon/ui';
import type { ConfidenceLevel } from '@solon/ui';
import { IconTrending, IconTrendingDown, IconSteady } from '@icons';
import { StatCard } from './stat-card';

interface VoteSharePanelProps {
  readonly projectedVoteShare: number;
  readonly projectedVoteShareDelta: number;
  readonly confidenceLevel: number;
}

export function VoteSharePanel({ projectedVoteShare, projectedVoteShareDelta, confidenceLevel }: VoteSharePanelProps) {
  const deltaPositive = projectedVoteShareDelta > 0;
  const deltaNegative = projectedVoteShareDelta < 0;
  const deltaColor = deltaPositive ? 'var(--forest-700)' : deltaNegative ? 'var(--orange)' : 'var(--ink-3)';
  const DeltaIcon = deltaPositive ? IconTrending : deltaNegative ? IconTrendingDown : IconSteady;

  return (
    <StatCard label="Projected vote share">
      {/* Big number */}
      <div className="flex items-baseline gap-3 mb-1">
        <span className="font-serif font-bold text-[48px] leading-none" style={{ color: 'var(--forest-700)' }}>
          {projectedVoteShare.toFixed(1)}%
        </span>
        <div className="flex items-center gap-1 mb-1" style={{ color: deltaColor }}>
          <DeltaIcon size={14} strokeWidth={2} />
          <span className="font-mono text-[11px]">
            {deltaPositive ? '+' : ''}{projectedVoteShareDelta.toFixed(1)} pt
          </span>
        </div>
      </div>

      {/* Stacked bar */}
      <div className="flex h-7 rounded-[3px] overflow-hidden mb-3">
        {[
          { party: 'LP', share: projectedVoteShare, bg: 'var(--forest-600)', color: 'white' },
          { party: 'APC', share: 22.1, bg: 'var(--ink)', color: 'var(--paper)' },
          { party: 'APGA', share: 18.4, bg: 'var(--paper-3)', color: 'var(--ink-2)' },
          { party: 'PDP', share: 9.8, bg: '#FFF3E0', color: 'var(--ink-3)' },
        ].map(({ party, share, bg, color }) => (
          <div
            key={party}
            className="flex items-center px-1.5 font-mono text-[9px] shrink-0"
            style={{ flex: share, background: bg, color }}
          >
            {share > 15 ? `${party} ${share.toFixed(1)}%` : party}
          </div>
        ))}
      </div>

      <VoteShareBar
        entries={[
          { party: 'LP', share: projectedVoteShare },
          { party: 'APC', share: 22.1 },
          { party: 'APGA', share: 18.4 },
          { party: 'PDP', share: 9.8 },
        ]}
        confidence={confidenceLevel as ConfidenceLevel}
      />
    </StatCard>
  );
}
