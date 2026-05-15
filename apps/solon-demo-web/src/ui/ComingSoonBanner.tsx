export function ComingSoonBanner({ eta = 'Q3 2027' }: { eta?: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 rounded-xl py-16 px-8 text-center"
      style={{ background: 'var(--paper)', border: '1px solid var(--hair)' }}
    >
      <div
        className="font-mono text-[10px] uppercase tracking-[0.14em]"
        style={{ color: 'var(--forest-600)' }}
      >
        Coming {eta}
      </div>
      <h2 className="font-serif font-semibold text-[22px]" style={{ color: 'var(--ink)' }}>
        This module is under construction
      </h2>
      <p className="font-sans text-[14px] max-w-[360px]" style={{ color: 'var(--ink-3)' }}>
        Full functionality will be available in the production release. The demo showcases our core
        intelligence modules in the meantime.
      </p>
    </div>
  );
}
