import { cn } from '../../utils/cn.js';

export type ConfidenceLevel = 1 | 2 | 3 | 4 | 5;

export interface ConfidenceBarProps {
  level: ConfidenceLevel;
  label?: string;
  warn?: boolean;
  className?: string;
}

export function ConfidenceBar({ level, label, warn, className }: ConfidenceBarProps) {
  const color = warn ? 'var(--orange)' : 'var(--forest-600)';
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex gap-0.5">
        {([1, 2, 3, 4, 5] as const).map((i) => (
          <div
            key={i}
            className="w-3 h-[10px] rounded-[1px]"
            style={{
              background: i <= level ? color : 'var(--hair)',
            }}
          />
        ))}
      </div>
      {label && (
        <span className="font-mono text-[10px]" style={{ color: warn ? 'var(--orange)' : 'var(--ink-3)' }}>
          {label}
        </span>
      )}
    </div>
  );
}
