import { cn } from '../../utils/cn.js';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarVariant = 'default' | 'forest' | 'orange' | 'ink';

export interface AvatarProps {
  initials: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  className?: string;
}

const SIZE: Record<AvatarSize, { box: string; text: string }> = {
  sm: { box: 'w-6 h-6',   text: 'text-[10px]' },
  md: { box: 'w-8 h-8',   text: 'text-[12px]' },
  lg: { box: 'w-11 h-11', text: 'text-[14px]' },
  xl: { box: 'w-14 h-14', text: 'text-[18px]' },
};

const VARIANT: Record<AvatarVariant, { bg: string; color: string }> = {
  default: { bg: 'var(--paper-3, #D8D3C8)', color: 'var(--ink-2)' },
  forest:  { bg: 'var(--forest-600)',        color: 'var(--paper)' },
  orange:  { bg: 'var(--orange)',            color: 'var(--paper)' },
  ink:     { bg: 'var(--ink)',               color: 'var(--paper)' },
};

export function Avatar({ initials, size = 'md', variant = 'default', className }: AvatarProps) {
  const s = SIZE[size];
  const v = VARIANT[variant];
  return (
    <div
      className={cn('rounded-full flex items-center justify-center font-mono font-medium shrink-0', s.box, s.text, className)}
      style={{ background: v.bg, color: v.color }}
    >
      {initials.slice(0, 2).toUpperCase()}
    </div>
  );
}
