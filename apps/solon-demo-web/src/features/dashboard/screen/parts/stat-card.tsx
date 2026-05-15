import React from 'react';

interface StatCardProps {
  readonly label: string;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly action?: React.ReactNode;
}

export function StatCard({ label, children, className, action }: StatCardProps) {
  return (
    <div
      className={`rounded-[6px] overflow-hidden ${className ?? ''}`}
      style={{ border: '1px solid var(--hair)', background: 'var(--sheet)' }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ background: 'var(--paper-2)', borderColor: 'var(--hair)' }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: 'var(--ink-3)' }}>
          {label}
        </span>
        {action}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
