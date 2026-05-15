import { cn } from '../../utils/cn.js';

export interface SegmentOption {
  value: string;
  label: string;
}

export interface SegmentControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SegmentControl({ options, value, onChange, className }: SegmentControlProps) {
  return (
    <div
      className={cn(
        'inline-flex rounded-[var(--r-card)] border overflow-hidden',
        className,
      )}
      style={{ borderColor: 'var(--hair)' }}
    >
      {options.map((opt, i) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            'h-[30px] px-3 font-sans text-[12px] transition-colors duration-[120ms] whitespace-nowrap',
            i > 0 && 'border-l',
            opt.value === value
              ? 'font-medium'
              : 'hover:bg-[rgba(26,23,20,0.04)]',
          )}
          style={{
            borderColor: 'var(--hair)',
            background: opt.value === value ? 'var(--forest-50)' : 'var(--sheet)',
            color: opt.value === value ? 'var(--forest-600)' : 'var(--ink-2)',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
