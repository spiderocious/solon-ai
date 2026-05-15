import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

import { cn } from '../../utils/cn.js';

export type ButtonVariant = 'primary' | 'secondary' | 'quiet' | 'warn' | 'crit' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconOnly?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--forest-600)] text-[var(--paper)] border border-[var(--forest-600)] hover:bg-[var(--forest-800)] hover:border-[var(--forest-800)]',
  secondary:
    'bg-[var(--paper)] text-[var(--ink)] border border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]',
  quiet:
    'bg-transparent text-[var(--ink-2)] border border-transparent hover:bg-[rgba(26,23,20,0.05)] hover:text-[var(--ink)]',
  warn:
    'bg-[var(--paper)] text-[var(--orange)] border border-[var(--orange)] hover:bg-[var(--orange-soft)]',
  crit:
    'bg-[var(--crit)] text-[var(--paper)] border border-[var(--crit)] hover:bg-[var(--orange-deep)] hover:border-[var(--orange-deep)]',
  link:
    'bg-transparent text-[var(--forest-600)] border-0 underline underline-offset-[4px] decoration-[1px] decoration-[var(--forest-300)] hover:decoration-[var(--forest-600)] p-0 h-auto',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-[28px] px-[12px] text-[12px]',
  md: 'h-[34px] px-[16px] text-[13px]',
  lg: 'h-[42px] px-[20px] text-[14px]',
};

const ICON_ONLY_SIZE: Record<ButtonSize, string> = {
  sm: 'h-[28px] w-[28px] px-0',
  md: 'h-[34px] w-[34px] px-0',
  lg: 'h-[42px] w-[42px] px-0',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    iconOnly = false,
    leadingIcon,
    trailingIcon,
    children,
    disabled,
    className,
    ...rest
  },
  ref,
) {
  const isLink = variant === 'link';

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-[6px] whitespace-nowrap',
        'font-sans font-medium rounded-[var(--r-card)]',
        'transition-[background,border-color,color]',
        'focus:outline-none focus-visible:shadow-[0_0_0_3px_rgba(27,67,50,0.28)]',
        'disabled:cursor-not-allowed disabled:opacity-55',
        !isLink && SIZE_CLASSES[size],
        iconOnly && !isLink && ICON_ONLY_SIZE[size],
        VARIANT_CLASSES[variant],
        className,
      )}
      {...rest}
    >
      {leadingIcon !== undefined && leadingIcon !== null ? (
        <span className="shrink-0">{leadingIcon}</span>
      ) : null}
      {!iconOnly && <span>{loading ? 'Loading…' : children}</span>}
      {iconOnly && (loading ? '…' : children)}
      {trailingIcon !== undefined && trailingIcon !== null ? (
        <span className="shrink-0">{trailingIcon}</span>
      ) : null}
    </button>
  );
});
