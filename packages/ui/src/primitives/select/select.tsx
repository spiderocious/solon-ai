import { forwardRef, type SelectHTMLAttributes } from 'react';

import { cn } from '../../utils/cn.js';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { hasError = false, className, disabled, children, ...rest },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        disabled={disabled}
        className={cn(
          'h-[34px] w-full pl-3 pr-8 rounded-[var(--r-card)] font-sans text-[13px] appearance-none',
          'border bg-[var(--sheet)] text-[var(--ink)]',
          'transition-[border-color,box-shadow] duration-[120ms]',
          'focus:outline-none focus:border-[var(--forest-600)] focus:shadow-[0_0_0_3px_rgba(27,67,50,0.16)]',
          'disabled:opacity-55 disabled:cursor-not-allowed',
          hasError
            ? 'border-[var(--crit)] focus:border-[var(--crit)] focus:shadow-[0_0_0_3px_rgba(139,26,26,0.16)]'
            : 'border-[var(--hair)]',
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <span
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
        style={{ color: 'var(--ink-3)' }}
      >
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
          <path d="M1 1l4 4 4-4" />
        </svg>
      </span>
    </div>
  );
});
