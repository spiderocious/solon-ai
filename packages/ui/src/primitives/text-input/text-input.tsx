import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

import { cn } from '../../utils/cn.js';

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  prefix?: ReactNode;
  suffix?: ReactNode;
  hasError?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { prefix, suffix, hasError = false, className, disabled, ...rest },
  ref,
) {
  const hasParts = prefix !== undefined || suffix !== undefined;

  if (!hasParts) {
    return (
      <input
        ref={ref}
        disabled={disabled}
        className={cn(
          'h-[34px] w-full px-3 rounded-[var(--r-card)] font-sans text-[13px]',
          'border bg-[var(--sheet)] text-[var(--ink)] placeholder:text-[var(--ink-4)]',
          'transition-[border-color,box-shadow] duration-[120ms]',
          'focus:outline-none focus:border-[var(--forest-600)] focus:shadow-[0_0_0_3px_rgba(27,67,50,0.16)]',
          'disabled:opacity-55 disabled:cursor-not-allowed',
          hasError
            ? 'border-[var(--crit)] focus:border-[var(--crit)] focus:shadow-[0_0_0_3px_rgba(139,26,26,0.16)]'
            : 'border-[var(--hair)]',
          className,
        )}
        {...rest}
      />
    );
  }

  return (
    <div
      className={cn(
        'flex h-[34px] rounded-[var(--r-card)] border overflow-hidden',
        'transition-[border-color,box-shadow] duration-[120ms]',
        'focus-within:border-[var(--forest-600)] focus-within:shadow-[0_0_0_3px_rgba(27,67,50,0.16)]',
        hasError
          ? 'border-[var(--crit)] focus-within:border-[var(--crit)] focus-within:shadow-[0_0_0_3px_rgba(139,26,26,0.16)]'
          : 'border-[var(--hair)]',
      )}
    >
      {prefix !== undefined && prefix !== null ? (
        <div
          className="flex items-center px-3 shrink-0 border-r font-mono text-[11px]"
          style={{ borderColor: 'var(--hair)', background: 'var(--paper-2)', color: 'var(--ink-3)' }}
        >
          {prefix}
        </div>
      ) : null}
      <input
        ref={ref}
        disabled={disabled}
        className={cn(
          'flex-1 px-3 font-sans text-[13px] bg-[var(--sheet)] text-[var(--ink)] placeholder:text-[var(--ink-4)]',
          'focus:outline-none disabled:opacity-55 disabled:cursor-not-allowed',
          className,
        )}
        {...rest}
      />
      {suffix !== undefined && suffix !== null ? (
        <div
          className="flex items-center px-3 shrink-0 border-l font-mono text-[11px]"
          style={{ borderColor: 'var(--hair)', background: 'var(--paper-2)', color: 'var(--ink-3)' }}
        >
          {suffix}
        </div>
      ) : null}
    </div>
  );
});
