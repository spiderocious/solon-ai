import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

import { cn } from '../../utils/cn.js';

export type AppButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AppButtonVariant;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

const VARIANT_CLASSES: Record<AppButtonVariant, string> = {
  primary:
    'bg-[var(--forest-600)] text-[var(--paper)] hover:bg-[var(--forest-800)] focus-visible:ring-[var(--forest-500)] disabled:opacity-60',
  secondary:
    'bg-[var(--paper)] text-[var(--ink)] border border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] focus-visible:ring-[var(--ink)] disabled:opacity-60',
  ghost:
    'bg-transparent text-[var(--ink-2)] hover:bg-[var(--ink)]/5 focus-visible:ring-[var(--ink)] disabled:opacity-60',
  danger:
    'bg-[var(--crit)] text-[var(--paper)] hover:bg-[var(--orange-deep)] focus-visible:ring-[var(--orange)] disabled:opacity-60',
};

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(function AppButton(
  { variant = 'primary', className, loading, leadingIcon, trailingIcon, children, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2',
        'text-sm font-medium transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed',
        VARIANT_CLASSES[variant],
        className,
      )}
      {...rest}
    >
      {leadingIcon ? <span className="-ml-0.5">{leadingIcon}</span> : null}
      <span>{loading ? 'Loading…' : children}</span>
      {trailingIcon ? <span className="-mr-0.5">{trailingIcon}</span> : null}
    </button>
  );
});
