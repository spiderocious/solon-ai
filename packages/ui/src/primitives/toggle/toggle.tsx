import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '../../utils/cn.js';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  { label, className, disabled, ...rest },
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
      <span className="relative shrink-0 w-[32px] h-[18px]">
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-inherit peer"
          {...rest}
        />
        <span
          className={cn(
            'block w-[32px] h-[18px] rounded-full border transition-[background,border-color] duration-200',
            'bg-[var(--paper-3)] border-[var(--hair)]',
            'peer-checked:bg-[var(--forest-600)] peer-checked:border-[var(--forest-600)]',
            'peer-focus-visible:shadow-[0_0_0_3px_rgba(27,67,50,0.28)]',
          )}
        />
        <span
          className={cn(
            'absolute top-[3px] left-[3px] w-[12px] h-[12px] rounded-full bg-white transition-transform duration-200',
            'peer-checked:translate-x-[14px]',
          )}
        />
      </span>
      {label !== undefined && label !== '' ? (
        <span className="font-sans text-[13px]" style={{ color: 'var(--ink)' }}>{label}</span>
      ) : null}
    </label>
  );
});
