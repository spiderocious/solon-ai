import { createPortal } from 'react-dom';
import { useSyncExternalStore } from 'react';
import { DrawerService } from './drawer-service.js';

export function ModalHost() {
  const { modal } = useSyncExternalStore(
    (cb) => DrawerService.getStore().subscribe(cb),
    () => DrawerService.getStore().getState(),
  );

  if (!modal) return null;

  const isCrit = modal.variant === 'crit';

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.32)' }}
      onClick={(e) => { if (e.target === e.currentTarget) DrawerService.dismissModal(); }}
    >
      <div
        className="w-full max-w-[540px] rounded-[6px] overflow-hidden"
        style={{
          background: 'var(--sheet)',
          border: isCrit ? '2px solid var(--crit)' : '1px solid var(--ink)',
          borderTop: isCrit ? '4px solid var(--crit)' : '1px solid var(--ink)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.20)',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="px-6 py-5">
          <div
            id="modal-title"
            className="font-sans font-semibold text-[18px]"
            style={{ color: isCrit ? 'var(--crit)' : 'var(--ink)' }}
          >
            {modal.title}
          </div>
          <p className="font-sans text-[13px] mt-2 leading-relaxed" style={{ color: 'var(--ink-2)' }}>
            {modal.body}
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-6 py-4 border-t"
          style={{ borderColor: isCrit ? 'var(--crit-edge)' : 'var(--hair)', background: isCrit ? 'var(--crit-bg)' : 'var(--paper-2)' }}
        >
          <button
            onClick={() => { modal.onCancel?.(); DrawerService.dismissModal(); }}
            className="font-sans text-[13px] px-3 py-1.5 rounded-[4px]"
            style={{ color: 'var(--ink-2)' }}
          >
            {modal.cancelLabel ?? 'Cancel'}
          </button>
          <button
            onClick={() => { modal.onConfirm?.(); DrawerService.dismissModal(); }}
            className="font-sans text-[13px] px-4 py-1.5 rounded-[4px] font-medium"
            style={{
              background: isCrit ? 'var(--crit)' : 'var(--forest-600)',
              color: 'var(--paper)',
            }}
          >
            {modal.confirmLabel ?? 'Confirm'}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
