import { type LabelHTMLAttributes, type ReactNode } from 'react';

import { cn } from '../../utils/cn.js';

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  hint?: string;
  required?: boolean;
  children?: ReactNode;
}

export function FieldLabel({ label, hint, required = false, children, className, ...rest }: FieldLabelProps) {
  return (
    <div className={cn('flex flex-col gap-[6px]', className)}>
      <label
        className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em]"
        style={{ color: 'var(--ink-3)' }}
        {...rest}
      >
        {label}
        {required && <span style={{ color: 'var(--crit)' }}>*</span>}
        {hint !== undefined && hint !== '' ? (
          <span className="ml-1 normal-case tracking-normal text-[10px]" style={{ color: 'var(--ink-4)' }}>
            ({hint})
          </span>
        ) : null}
      </label>
      {children}
    </div>
  );
}
