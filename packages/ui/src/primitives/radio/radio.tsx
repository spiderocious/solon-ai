import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '../../utils/cn.js';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
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
      <span className="relative shrink-0 w-[16px] h-[16px]">
        <input
          ref={ref}
          type="radio"
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-inherit peer"
          {...rest}
        />
        <span
          className={cn(
            'flex items-center justify-center w-[16px] h-[16px] rounded-full border transition-[background,border-color] duration-[120ms]',
            'border-[var(--hair)] bg-[var(--sheet)]',
            'peer-checked:border-[var(--forest-600)]',
            'peer-focus-visible:shadow-[0_0_0_3px_rgba(27,67,50,0.28)]',
          )}
        >
          <span
            className="w-[8px] h-[8px] rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-[120ms]"
            style={{ background: 'var(--forest-600)' }}
          />
        </span>
      </span>
      {label !== undefined && label !== '' ? (
        <span className="font-sans text-[13px]" style={{ color: 'var(--ink)' }}>{label}</span>
      ) : null}
    </label>
  );
});

export interface RadioCardProps {
  value: string;
  label: string;
  sublabel?: string;
  meta?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
}

export function RadioCard({ value, label, sublabel, meta, checked = false, onChange }: RadioCardProps) {
  return (
    <label
      className={cn(
        'flex flex-col p-4 rounded-[var(--r-card)] border cursor-pointer transition-[border-color,box-shadow] duration-[120ms]',
        checked
          ? 'border-[var(--forest-600)] shadow-[0_0_0_2px_rgba(27,67,50,0.16)]'
          : 'border-[var(--hair)] hover:border-[var(--forest-300)]',
      )}
    >
      <input
        type="radio"
        className="sr-only"
        value={value}
        checked={checked}
        onChange={() => onChange?.(value)}
      />
      {checked && (
        <span
          className="self-end w-[16px] h-[16px] rounded-full flex items-center justify-center mb-2"
          style={{ background: 'var(--forest-600)' }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M1.5 5l2.5 2.5 4.5-5" />
          </svg>
        </span>
      )}
      <span className="font-mono font-medium text-[16px]" style={{ color: checked ? 'var(--forest-600)' : 'var(--ink)' }}>{label}</span>
      {sublabel !== undefined && sublabel !== '' ? (
        <span className="font-sans text-[11px] mt-0.5" style={{ color: 'var(--ink-3)' }}>{sublabel}</span>
      ) : null}
      {meta !== undefined && meta !== '' ? (
        <span className="font-mono text-[10.5px] mt-1" style={{ color: 'var(--ink-4)' }}>{meta}</span>
      ) : null}
    </label>
  );
}
