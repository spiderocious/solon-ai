import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';

export interface NairaInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  decimalLabel?: string;
  hasError?: boolean;
}

export const NairaInput = forwardRef<HTMLInputElement, NairaInputProps>(
  function NairaInput({ decimalLabel = '.00', hasError, className, style, ...rest }, ref) {
    return (
      <div
        className={cn(
          'flex items-stretch h-[34px] rounded-[4px] border overflow-hidden',
          'focus-within:shadow-[0_0_0_3px_rgba(27,67,50,0.16)]',
          hasError && 'border-[var(--crit)]',
          className,
        )}
        style={{ borderColor: hasError ? undefined : 'var(--hair)', ...style }}
      >
        {/* Currency prefix */}
        <div
          className="flex items-center px-3 font-mono text-[13px] shrink-0 border-r"
          style={{ background: 'var(--paper-2)', borderColor: 'var(--hair)', color: 'var(--ink-3)' }}
        >
          ₦
        </div>
        {/* Amount input */}
        <input
          {...rest}
          ref={ref}
          type="text"
          inputMode="numeric"
          className="flex-1 px-3 font-mono text-[13px] outline-none min-w-0"
          style={{ background: 'var(--sheet)', color: 'var(--ink)' }}
        />
        {/* Decimal suffix */}
        <div
          className="flex items-center px-3 font-mono text-[13px] shrink-0 border-l"
          style={{ background: 'var(--paper-2)', borderColor: 'var(--hair)', color: 'var(--ink-4)' }}
        >
          {decimalLabel}
        </div>
      </div>
    );
  },
);
