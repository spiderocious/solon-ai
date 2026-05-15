import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '../../utils/cn.js';

export interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(function SearchBar(
  { prefix, className, disabled, ...rest },
  ref,
) {
  return (
    <div
      className={cn(
        'flex h-[34px] rounded-[var(--r-card)] border overflow-hidden',
        'transition-[border-color,box-shadow] duration-[120ms]',
        'focus-within:border-[var(--forest-600)] focus-within:shadow-[0_0_0_3px_rgba(27,67,50,0.16)]',
        'border-[var(--hair)]',
        className,
      )}
    >
      <div
        className="flex items-center pl-3 pr-2 shrink-0"
        style={{ background: 'var(--sheet)' }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--ink-4)' }}
        >
          <circle cx="11" cy="11" r="6" />
          <path d="M16 16l4 4" />
        </svg>
      </div>
      {prefix !== undefined && prefix !== '' ? (
        <div
          className="flex items-center pr-2 shrink-0 font-mono text-[11px]"
          style={{ background: 'var(--sheet)', color: 'var(--ink-3)' }}
        >
          {prefix}
        </div>
      ) : null}
      <input
        ref={ref}
        type="search"
        disabled={disabled}
        className="flex-1 pr-3 font-sans text-[13px] bg-[var(--sheet)] text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none disabled:opacity-55 disabled:cursor-not-allowed"
        {...rest}
      />
    </div>
  );
});
