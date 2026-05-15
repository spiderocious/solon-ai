import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@solon/ui';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';

const RATINGS = [1, 2, 3, 4, 5] as const;

export function FeedbackWidget() {
  const { sessionId } = useDemoSession();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      demoClient.post(
        DEMO_EP.FEEDBACK,
        { sessionId: sessionId ?? undefined, rating: rating ?? undefined, comment: comment.trim() || undefined, page: location.pathname },
        sessionId ?? undefined,
      ),
    onSuccess: () => {
      setSubmitted(true);
      setTimeout(() => {
        setOpen(false);
        setRating(null);
        setComment('');
        setSubmitted(false);
      }, 2000);
    },
    onError: () => {
      // still show success — feedback may have been saved
      setSubmitted(true);
      setTimeout(() => {
        setOpen(false);
        setRating(null);
        setComment('');
        setSubmitted(false);
      }, 2000);
    },
  });

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-1.5 px-3 py-2 rounded-[6px] font-mono text-[10px] uppercase tracking-[0.08em] border shadow-lg transition-colors"
        style={{
          background: open ? 'var(--ink)' : 'var(--sheet)',
          color: open ? 'var(--paper)' : 'var(--ink-3)',
          borderColor: open ? 'var(--ink)' : 'var(--hair)',
        }}
        aria-label="Give feedback"
      >
        <span>{open ? '✕' : '✦'}</span>
        <span>{open ? 'Close' : 'Feedback'}</span>
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-16 right-5 z-40 w-72 rounded-[6px] border shadow-xl"
          style={{ background: 'var(--sheet)', borderColor: 'var(--ink)' }}
        >
          <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--hair)' }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: 'var(--ink-4)' }}>
              Rate this demo
            </span>
          </div>

          {submitted ? (
            <div className="px-4 py-6 text-center">
              <p className="font-serif text-[14px]" style={{ color: 'var(--forest-700)' }}>
                Thank you for your feedback.
              </p>
            </div>
          ) : (
            <div className="px-4 py-4 flex flex-col gap-4">
              {/* Star rating */}
              <div>
                <p className="font-mono text-[10px] mb-2" style={{ color: 'var(--ink-4)' }}>
                  HOW USEFUL WAS THIS?
                </p>
                <div className="flex gap-1.5">
                  {RATINGS.map((r) => (
                    <button
                      key={r}
                      onClick={() => setRating(r)}
                      className="w-9 h-9 rounded-[4px] font-serif font-bold text-[16px] border transition-colors"
                      style={{
                        background: rating === r ? 'var(--ink)' : 'var(--paper-2)',
                        color: rating === r ? 'var(--paper)' : 'var(--ink-3)',
                        borderColor: rating === r ? 'var(--ink)' : 'var(--hair)',
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <p className="font-mono text-[10px] mb-1.5" style={{ color: 'var(--ink-4)' }}>
                  COMMENT (OPTIONAL)
                </p>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  maxLength={500}
                  placeholder="What worked? What didn't?"
                  className="w-full font-sans text-[12px] px-2 py-1.5 rounded-[4px] border outline-none resize-none bg-transparent"
                  style={{ borderColor: 'var(--hair)', color: 'var(--ink)' }}
                />
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => mutate()}
                disabled={isPending || (!rating && !comment.trim())}
                loading={isPending}
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
