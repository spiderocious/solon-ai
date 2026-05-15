import { cn } from '../../utils/cn.js';

export interface LivePulseProps {
  variant?: 'forest' | 'orange';
  className?: string;
}

export function LivePulse({ variant = 'orange', className }: LivePulseProps) {
  const color = variant === 'orange' ? 'var(--orange)' : 'var(--forest-600)';
  return (
    <span className={cn('relative inline-flex h-3 w-3', className)}>
      <span
        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
        style={{ background: color }}
      />
      <span
        className="relative inline-flex rounded-full h-3 w-3"
        style={{ background: color }}
      />
    </span>
  );
}
