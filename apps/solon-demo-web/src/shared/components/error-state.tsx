interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  compact?: boolean;
}

export function ErrorState({ message = 'Something went wrong.', onRetry, compact }: ErrorStateProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-3 px-3 py-2 rounded-[4px]" style={{ background: '#FEF2F2', border: '1px solid var(--crit)' }}>
        <span className="font-sans text-[12px]" style={{ color: 'var(--crit)' }}>{message}</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="font-mono text-[10px] px-2 py-0.5 rounded-[3px] border shrink-0"
            style={{ borderColor: 'var(--crit)', color: 'var(--crit)', background: 'transparent' }}
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12">
      <div
        className="rounded-[6px] px-6 py-5 flex flex-col items-center gap-3 max-w-sm w-full"
        style={{ background: '#FEF2F2', border: '1px solid var(--crit)' }}
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--crit)' }}>
          Error
        </div>
        <p className="font-serif italic text-[13px] text-center" style={{ color: 'var(--ink-2)' }}>
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="font-sans text-[12px] px-4 py-1.5 rounded-[4px] border"
            style={{ borderColor: 'var(--crit)', color: 'var(--crit)', background: 'transparent' }}
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
