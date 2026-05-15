import { cn } from '../../utils/cn.js';

export type TierVariant = 'hold-strong' | 'hold' | 'toss' | 'opp' | 'opp-strong';

export interface TierChipProps {
  tier: TierVariant;
  className?: string;
}

const TIER_CONFIG: Record<TierVariant, { label: string; bg: string; color: string; border?: string }> = {
  'hold-strong': { label: 'Strong hold',  bg: '#14342A', color: 'var(--paper)' },
  'hold':        { label: 'Lean hold',    bg: 'var(--forest-600)', color: 'var(--paper)' },
  'toss':        { label: 'Toss-up',      bg: 'var(--orange)',     color: 'var(--paper)' },
  'opp':         { label: 'Lean opp.',    bg: 'var(--paper-3, #D8D3C8)', color: 'var(--ink-2)', border: '1px solid var(--hair)' },
  'opp-strong':  { label: 'Strong opp.',  bg: 'var(--ink)',        color: 'var(--paper)' },
};

export function TierChip({ tier, className }: TierChipProps) {
  const cfg = TIER_CONFIG[tier];
  return (
    <span
      className={cn('inline-flex items-center px-2 py-0.5 rounded-[3px] font-mono text-[10px] uppercase tracking-[0.08em] whitespace-nowrap', className)}
      style={{ background: cfg.bg, color: cfg.color, border: cfg.border }}
    >
      {cfg.label}
    </span>
  );
}
