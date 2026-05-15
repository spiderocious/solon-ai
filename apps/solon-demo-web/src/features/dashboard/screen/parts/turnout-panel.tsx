import { ConfidenceBar, TurnoutGauge } from '@solon/ui';
import type { ConfidenceLevel } from '@solon/ui';
import { StatCard } from './stat-card';
import { formatNumber } from '@shared/helpers/format-number';

interface TurnoutPanelProps {
  readonly targetTurnout: number;
  readonly registeredVoters: number;
  readonly confidenceLevel: number;
}

export function TurnoutPanel({ targetTurnout, registeredVoters, confidenceLevel }: TurnoutPanelProps) {
  const expectedVoters = Math.round(registeredVoters * targetTurnout / 100);

  return (
    <StatCard label="Turnout forecast">
      <TurnoutGauge projected={targetTurnout} target={72} historical={58} />

      <div className="mt-3 space-y-2">
        <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: 'var(--hair)' }}>
          <span className="font-sans text-[12px]" style={{ color: 'var(--ink-3)' }}>Registered voters</span>
          <span className="font-mono text-[12px]" style={{ color: 'var(--ink-2)' }}>{formatNumber(registeredVoters, true)}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: 'var(--hair)' }}>
          <span className="font-sans text-[12px]" style={{ color: 'var(--ink-3)' }}>Expected voters</span>
          <span className="font-mono text-[12px]" style={{ color: 'var(--ink-2)' }}>{formatNumber(expectedVoters, true)}</span>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <span className="font-sans text-[11px]" style={{ color: 'var(--ink-4)' }}>Confidence:</span>
          <ConfidenceBar level={confidenceLevel as ConfidenceLevel} />
        </div>
      </div>
    </StatCard>
  );
}
