import { cn } from '../../utils/cn.js';

export interface SeveritySliderProps {
  value: 1 | 2 | 3 | 4 | 5;
  onChange?: (value: 1 | 2 | 3 | 4 | 5) => void;
  label?: string;
  className?: string;
}

const LEVELS = [
  { level: 1, label: 'Routine',   color: 'var(--forest-400)' },
  { level: 2, label: 'Notable',   color: 'var(--forest-600)' },
  { level: 3, label: 'Elevated',  color: '#EAB308' },
  { level: 4, label: 'Serious',   color: 'var(--orange)' },
  { level: 5, label: 'Critical',  color: 'var(--crit)' },
] as const;

export function SeveritySlider({ value, onChange, label, className }: SeveritySliderProps) {
  const current = LEVELS.find((l) => l.level === value) ?? LEVELS[0];

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: 'var(--ink-3)' }}>
          {label}
        </div>
      )}
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
          {LEVELS.map((l) => (
            <button
              key={l.level}
              onClick={() => onChange?.(l.level)}
              className="flex flex-col items-center gap-1 group"
            >
              <div
                className="h-6 w-8 rounded-[2px] transition-opacity"
                style={{
                  background: l.color,
                  opacity: l.level <= value ? 1 : 0.2,
                }}
              />
            </button>
          ))}
        </div>
        <div className="ml-2">
          <span className="font-mono text-[11px] font-medium" style={{ color: current.color }}>
            {value} — {current.label}
          </span>
        </div>
      </div>
      <div className="flex gap-1.5">
        {LEVELS.map((l) => (
          <div key={l.level} className="w-8 text-center font-mono text-[9px]" style={{ color: 'var(--ink-4)' }}>
            {l.label.slice(0, 3).toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}
