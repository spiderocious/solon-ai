import { cn } from '../../utils/cn.js';

export interface SkeletonProps {
  width?: string;
  height?: number;
  className?: string;
}

export function Skeleton({ width = '100%', height = 12, className }: SkeletonProps) {
  return (
    <div
      className={cn('rounded-[2px] animate-pulse', className)}
      style={{ width, height, background: 'var(--paper-3, #D8D3C8)' }}
    />
  );
}

export interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      className={cn('flex flex-col gap-3 p-4 rounded-[6px] border', className)}
      style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}
    >
      <Skeleton width="40%" height={10} />
      <Skeleton width="70%" height={22} />
      <Skeleton width="100%" />
      <Skeleton width="92%" />
      <Skeleton width="60%" />
      <div className="flex gap-2 mt-1">
        <Skeleton width="80px" height={28} />
        <Skeleton width="120px" height={28} />
      </div>
    </div>
  );
}
