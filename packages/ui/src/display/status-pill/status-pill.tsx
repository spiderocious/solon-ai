import { cn } from '../../utils/cn.js';

export type StatusPillVariant = 'ok' | 'warn' | 'crit' | 'info' | 'ink' | 'quiet';

export interface StatusPillProps {
  variant?: StatusPillVariant;
  label: string;
  className?: string;
}

const PILL_CONFIG: Record<StatusPillVariant, { bg: string; color: string; border: string; dot: string }> = {
  ok:    { bg: 'var(--forest-50)',    color: 'var(--forest-700)', border: 'var(--forest-200)', dot: 'var(--forest-600)' },
  warn:  { bg: '#FFF3E0',             color: 'var(--orange)',     border: '#FFA000',           dot: 'var(--orange)' },
  crit:  { bg: 'var(--crit-bg)',      color: 'var(--crit)',       border: 'var(--crit-edge)',  dot: 'var(--crit)' },
  info:  { bg: 'var(--info-bg, #E3F2FD)', color: 'var(--info, #1565C0)', border: 'var(--info-edge, #90CAF9)', dot: 'var(--info, #1565C0)' },
  ink:   { bg: 'var(--paper-2)',      color: 'var(--ink)',        border: 'var(--hair)',       dot: 'var(--ink)' },
  quiet: { bg: 'var(--paper-2)',      color: 'var(--ink-3)',      border: 'var(--hair)',       dot: 'var(--ink-3)' },
};

export function StatusPill({ variant = 'quiet', label, className }: StatusPillProps) {
  const cfg = PILL_CONFIG[variant];
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-sans text-[12px] border', className)}
      style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.border }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: cfg.dot }} />
      {label}
    </span>
  );
}
