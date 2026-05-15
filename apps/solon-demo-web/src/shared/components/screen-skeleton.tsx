import { Skeleton, SkeletonCard } from '@solon/ui';

interface ScreenSkeletonProps {
  rows?: number;
  cards?: boolean;
}

export function ScreenSkeleton({ rows = 4, cards = false }: ScreenSkeletonProps) {
  if (cards) {
    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.from({ length: rows }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className={`h-8 ${i === 0 ? 'w-48' : i % 2 === 0 ? 'w-full' : 'w-3/4'}`} />
      ))}
    </div>
  );
}
