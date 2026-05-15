import { DrawerService } from '@solon/ui';

function Scene({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-3 mb-4 pb-2 border-b" style={{ borderColor: 'var(--hair)' }}>
        <span className="font-sans text-[13px]" style={{ color: 'var(--ink-2)' }}>{title}</span>
        {subtitle && <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}

function DemoButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-[4px] font-sans text-[13px] border transition-colors hover:bg-[var(--paper-2)]"
      style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)' }}
    >
      {label}
    </button>
  );
}

export function DrawerScreen() {
  return (
    <div className="max-w-[760px]">
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>SERVICES</div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>DrawerService</div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>— imperative toast & modal API; no prop drilling.</div>
        <div className="font-mono text-[10px] mt-3" style={{ color: 'var(--ink-4)' }}>SOLON · v 0.1</div>
      </div>

      <p className="font-serif italic text-[14px] leading-relaxed mb-8 max-w-[70ch]" style={{ color: 'var(--ink-3)' }}>
        A singleton service callable from anywhere. Toasts and modals are rendered via <code className="font-mono text-[12px] not-italic" style={{ color: 'var(--ink-2)' }}>ModalHost</code> and <code className="font-mono text-[12px] not-italic" style={{ color: 'var(--ink-2)' }}>ToastHost</code>, mounted at the app root. No React context, no prop threading — just <code className="font-mono text-[12px] not-italic">DrawerService.toast(&#123;…&#125;)</code> from a business function.
      </p>

      <Scene title="Scene · toasts" subtitle="DrawerService.toast({ title, subtitle, variant })">
        <div className="flex flex-wrap gap-3">
          <DemoButton
            label="Default toast"
            onClick={() => DrawerService.toast({ title: 'Scenario saved', subtitle: 'Soludo–LP coalition · synced to your team', action: 'Undo · 8s' })}
          />
          <DemoButton
            label="Warn toast"
            onClick={() => DrawerService.toast({ title: 'Donor flagged · ₦ 5m cash', subtitle: 'Acknowledge before this entry is accepted into the books.', action: 'Open', variant: 'warn' })}
          />
          <DemoButton
            label="Crit toast"
            onClick={() => DrawerService.toast({ title: 'Sev-5 incident · PU 008-05-19', subtitle: 'BVAS lockdown. Legal team paged.', action: 'War Room', variant: 'crit', durationMs: 0 })}
          />
        </div>
        <div className="mt-3 font-mono text-[11px]" style={{ color: 'var(--ink-4)' }}>
          Default auto-dismisses after 4 seconds. Pass durationMs: 0 for persistent.
        </div>
      </Scene>

      <Scene title="Scene · confirmation modal" subtitle="DrawerService.showConfirmation(title, body, onConfirm)">
        <div className="flex flex-wrap gap-3">
          <DemoButton
            label="Show confirmation"
            onClick={() => DrawerService.showConfirmation(
              'Save this scenario',
              'Saved scenarios appear in the left rail and can be compared four at a time. Anyone on your strategist team can open them.',
              () => DrawerService.toast({ title: 'Scenario saved' }),
            )}
          />
          <DemoButton
            label="Custom labels"
            onClick={() => DrawerService.showConfirmation(
              'Begin verification',
              'You\'ll gain access to polling-unit-level voter data, the Module 2 agent roster, and the Module 4 War Room.',
              () => DrawerService.toast({ title: 'Verification started', subtitle: 'INEC receipt or NIN required to complete.' }),
              undefined,
              'Begin verification',
              'Not yet',
            )}
          />
        </div>
      </Scene>

      <Scene title="Scene · critical modal" subtitle="DrawerService.showModal({ variant: 'crit' })">
        <DemoButton
          label="Crit — void PU result"
          onClick={() => DrawerService.showModal({
            title: 'Void result · PU 008-04-09',
            body: 'Voiding a polling-unit submission removes it from the live War Room tally and writes an audit entry signed by your account. This action is reported in the public export.',
            variant: 'crit',
            confirmLabel: 'Void result',
            cancelLabel: 'Cancel',
            onConfirm: () => DrawerService.toast({ title: 'PU 008-04-09 voided', subtitle: 'Audit entry written.', variant: 'crit' }),
          })}
        />
      </Scene>

      <Scene title="Architecture" subtitle="backing store + singleton + portal hosts">
        <div
          className="rounded-[4px] border p-5 font-mono text-[12px] leading-[1.8]"
          style={{ borderColor: 'var(--hair)', background: 'var(--paper-2)', color: 'var(--ink-3)' }}
        >
          <div style={{ color: 'var(--ink-2)' }}>DrawerStore&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--ink-4)' }}>// plain class — subscribe + getState + mutations</span></div>
          <div style={{ color: 'var(--ink-2)' }}>DrawerService&nbsp;&nbsp;<span style={{ color: 'var(--ink-4)' }}>// singleton — toast() / showModal() / dismiss*()</span></div>
          <div style={{ color: 'var(--ink-2)' }}>ModalHost&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--ink-4)' }}>// useSyncExternalStore + createPortal(…, document.body)</span></div>
          <div style={{ color: 'var(--ink-2)' }}>ToastHost&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--ink-4)' }}>// useSyncExternalStore + createPortal(…, document.body)</span></div>
          <br />
          <div style={{ color: 'var(--forest-600)' }}>{'// Mount once at app root:'}</div>
          <div>{'<App>'}</div>
          <div>{'  <AppRoutes />'}</div>
          <div>{'  <ModalHost />'}</div>
          <div>{'  <ToastHost />'}</div>
          <div>{'</App>'}</div>
          <br />
          <div style={{ color: 'var(--forest-600)' }}>{'// Call from anywhere (no imports needed from React):'}</div>
          <div>{"DrawerService.toast({ title: 'Scenario saved' });"}</div>
          <div>{"DrawerService.showConfirmation('Save?', body, onConfirm);"}</div>
        </div>
      </Scene>
    </div>
  );
}
