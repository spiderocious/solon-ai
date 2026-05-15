import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '../../utils/cn.js';

export interface ScrubberProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  valueLabel?: string;
}

export const Scrubber = forwardRef<HTMLInputElement, ScrubberProps>(function Scrubber(
  { label, valueLabel, className, disabled, ...rest },
  ref,
) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="font-sans text-[13px] shrink-0 w-[100px]" style={{ color: 'var(--ink-2)' }}>{label}</span>
      <input
        ref={ref}
        type="range"
        disabled={disabled}
        className="flex-1 h-[4px] rounded-full appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-55"
        style={{ accentColor: 'var(--forest-600)' }}
        {...rest}
      />
      {valueLabel !== undefined && valueLabel !== '' ? (
        <span
          className="font-mono text-[13px] w-[64px] text-right shrink-0"
          style={{ color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}
        >
          {valueLabel}
        </span>
      ) : null}
    </div>
  );
});
