import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '../../utils/cn.js';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, indeterminate: _indeterminate = false, className, disabled, ...rest },
  ref,
) {
  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer',
        disabled && 'opacity-55 cursor-not-allowed',
        className,
      )}
    >
      <span className="relative shrink-0 w-[16px] h-[16px]">
        <input
          ref={ref}
          type="checkbox"
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-inherit peer"
          {...rest}
        />
        <span
          className={cn(
            'flex items-center justify-center w-[16px] h-[16px] rounded-[2px] border transition-[background,border-color] duration-[120ms]',
            'border-[var(--hair)] bg-[var(--sheet)]',
            'peer-checked:bg-[var(--forest-600)] peer-checked:border-[var(--forest-600)]',
            'peer-focus-visible:shadow-[0_0_0_3px_rgba(27,67,50,0.28)]',
          )}
        >
          <svg
            className="opacity-0 peer-checked:opacity-100 w-[10px] h-[10px]"
            viewBox="0 0 10 10"
            fill="none"
            stroke="white"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1.5 5l2.5 2.5 4.5-5" />
          </svg>
        </span>
      </span>
      {label !== undefined && label !== '' ? (
        <span className="font-sans text-[13px]" style={{ color: 'var(--ink)' }}>{label}</span>
      ) : null}
    </label>
  );
});
