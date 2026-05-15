export function DemoModePill() {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-[0.1em]"
      style={{ background: 'var(--forest-50)', color: 'var(--forest-700)', border: '1px solid var(--forest-200, #bbf7d0)' }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ background: 'var(--forest-600)' }}
      />
      Demo
    </div>
  );
}
