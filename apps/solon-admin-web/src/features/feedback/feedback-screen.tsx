import { useQuery } from '@tanstack/react-query';
import { adminClient } from '@shared/admin-client';
import { ADMIN_EP } from '@shared/admin-endpoints';

interface FeedbackRow {
  feedbackId: string;
  sessionId?: string;
  rating?: number;
  comment?: string;
  page?: string;
  createdAt: string;
}

const STAR = '★';
const EMPTY = '☆';

function Stars({ rating }: { rating?: number }) {
  if (!rating) return <span style={{ color: 'var(--ink-4)' }}>—</span>;
  return (
    <span style={{ color: 'var(--orange)' }}>
      {Array.from({ length: 5 }, (_, i) => (i < rating ? STAR : EMPTY)).join('')}
    </span>
  );
}

export function FeedbackScreen() {
  const { data, isLoading, isError } = useQuery<FeedbackRow[]>({
    queryKey: ['admin-feedback'],
    queryFn: () => adminClient.get<FeedbackRow[]>(ADMIN_EP.FEEDBACK),
    refetchInterval: 30_000,
  });

  const avgRating = data?.length
    ? data.filter((f) => f.rating !== null && f.rating !== undefined).reduce((sum, f) => sum + (f.rating ?? 0), 0) /
      data.filter((f) => f.rating !== null && f.rating !== undefined).length
    : null;

  return (
    <div className="max-w-[860px]">
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>Feedback</div>
        <div className="font-serif font-bold text-[30px]" style={{ color: 'var(--ink)' }}>Demo feedback</div>
        {avgRating !== null && (
          <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>
            — avg rating {avgRating.toFixed(1)} / 5 across {data?.filter((f) => f.rating !== null && f.rating !== undefined).length} rated items
          </div>
        )}
      </div>

      {isError && (
        <div className="mb-6 px-4 py-3 rounded-[4px] font-sans text-[12px]" style={{ background: 'var(--orange-soft)', color: 'var(--orange)' }}>
          Failed to load feedback.
        </div>
      )}

      {isLoading ? (
        <div className="font-serif italic text-[13px]" style={{ color: 'var(--ink-3)' }}>Loading…</div>
      ) : !data?.length ? (
        <div className="font-serif italic text-[13px]" style={{ color: 'var(--ink-3)' }}>No feedback yet.</div>
      ) : (
        <div className="space-y-3">
          {data.map((f) => (
            <div
              key={f.feedbackId}
              className="rounded-[6px] border px-4 py-3"
              style={{ background: 'var(--sheet)', borderColor: 'var(--hair)' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Stars rating={f.rating} />
                  {f.page && (
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-[3px]" style={{ background: 'var(--paper-2)', color: 'var(--ink-4)' }}>
                      {f.page}
                    </span>
                  )}
                </div>
                <span className="font-mono text-[10px] shrink-0" style={{ color: 'var(--ink-4)' }}>
                  {new Date(f.createdAt).toLocaleString('en-NG', { dateStyle: 'short', timeStyle: 'short' })}
                </span>
              </div>
              {f.comment && (
                <p className="font-serif italic text-[13px] mt-2" style={{ color: 'var(--ink-2)' }}>
                  "{f.comment}"
                </p>
              )}
              {f.sessionId && (
                <div className="font-mono text-[9px] mt-1.5" style={{ color: 'var(--ink-4)' }}>
                  session {f.sessionId.slice(0, 16)}…
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
