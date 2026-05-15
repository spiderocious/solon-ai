import { createPortal } from 'react-dom';
import { useSyncExternalStore } from 'react';
import { DrawerService } from './drawer-service.js';
import { cn } from '../../utils/cn.js';

export function ToastHost() {
  const { toasts } = useSyncExternalStore(
    (cb) => DrawerService.getStore().subscribe(cb),
    () => DrawerService.getStore().getState(),
  );

  if (toasts.length === 0) return null;

  return createPortal(
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 items-end"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => {
        const borderColor =
          toast.variant === 'crit' ? 'var(--crit)' :
          toast.variant === 'warn' ? 'var(--orange)' :
          'var(--forest-600)';

        return (
          <div
            key={toast.id}
            className={cn('flex flex-col gap-1 px-4 py-3 rounded-[4px] min-w-[340px] max-w-[420px] border-l-[3px]')}
            style={{
              background: 'var(--ink)',
              borderLeftColor: borderColor,
              boxShadow: '0 4px 16px rgba(0,0,0,0.20)',
            }}
            role="status"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="font-sans font-medium text-[13px]" style={{ color: 'var(--paper)' }}>
                {toast.title}
              </div>
              <button
                onClick={() => DrawerService.dismissToast(toast.id)}
                className="font-mono text-[10px] shrink-0 mt-0.5"
                style={{ color: 'rgba(245,239,224,0.5)' }}
                aria-label="Dismiss"
              >
                ×
              </button>
            </div>
            {toast.subtitle && (
              <div className="font-sans italic text-[11px]" style={{ color: 'rgba(245,239,224,0.7)' }}>
                {toast.subtitle}
              </div>
            )}
            {toast.action && (
              <button
                className="font-sans text-[11px] mt-1 text-left underline"
                style={{ color: 'rgba(245,239,224,0.7)' }}
              >
                {toast.action}
              </button>
            )}
          </div>
        );
      })}
    </div>,
    document.body,
  );
}
