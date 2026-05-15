import { cn } from '../../utils/cn.js';

export type StampVariant = 'verified' | 'simulation' | 'void' | 'citizen';

export interface OfficialStampProps {
  variant: StampVariant;
  meta?: string;
  className?: string;
}

const STAMP_CONFIG: Record<StampVariant, { label: string; color: string; border: string }> = {
  verified:   { label: 'VERIFIED',         color: 'var(--forest-700)', border: 'var(--forest-700)' },
  simulation: { label: 'SOLON SIM',        color: 'var(--ink-3)',      border: 'var(--ink-3)' },
  void:       { label: 'VOID',             color: 'var(--crit)',       border: 'var(--crit)' },
  citizen:    { label: 'CITIZEN-SOURCED',  color: 'var(--info, #1565C0)', border: 'var(--info, #1565C0)' },
};

export function OfficialStamp({ variant, meta, className }: OfficialStampProps) {
  const cfg = STAMP_CONFIG[variant];
  return (
    <div
      className={cn(
        'inline-flex flex-col items-center justify-center px-3 py-2 rounded-[3px]',
        'font-mono text-[10px] uppercase tracking-[0.2em]',
        'rotate-[-6deg]',
        className,
      )}
      style={{
        border: `2px solid ${cfg.border}`,
        color: cfg.color,
        opacity: variant === 'void' ? 0.85 : 1,
      }}
    >
      <div className="font-bold tracking-[0.3em]">{cfg.label}</div>
      {meta && (
        <div className="text-[9px] tracking-[0.15em] mt-0.5">{meta}</div>
      )}
    </div>
  );
}
