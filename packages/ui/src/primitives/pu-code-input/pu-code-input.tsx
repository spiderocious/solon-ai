import { forwardRef, useRef } from 'react';
import { cn } from '../../utils/cn.js';

export interface PUCodeInputProps {
  value?: string;
  onChange?: (value: string) => void;
  hasError?: boolean;
  className?: string;
}

function segmentsFromValue(value: string): [string, string, string] {
  const clean = value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
  return [
    clean.slice(0, 2),
    clean.slice(2, 4),
    clean.slice(4, 8),
  ];
}

function valueFromSegments(segs: [string, string, string]): string {
  return segs.join('/');
}

export const PUCodeInput = forwardRef<HTMLDivElement, PUCodeInputProps>(
  function PUCodeInput({ value = '', onChange, hasError, className }, ref) {
    const [s1, s2, s3] = segmentsFromValue(value);
    const r1 = useRef<HTMLInputElement>(null);
    const r2 = useRef<HTMLInputElement>(null);
    const r3 = useRef<HTMLInputElement>(null);

    function handleChange(seg: 0 | 1 | 2, v: string, next: React.RefObject<HTMLInputElement | null>) {
      const upper = v.toUpperCase();
      const segs: [string, string, string] = [s1, s2, s3];
      segs[seg] = upper;
      onChange?.(valueFromSegments(segs));
      if (upper.length >= (seg === 2 ? 4 : 2)) next.current?.focus();
    }

    const border = hasError ? 'var(--crit)' : 'var(--hair)';

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-stretch h-[34px] rounded-[4px] border overflow-hidden',
          'focus-within:shadow-[0_0_0_3px_rgba(27,67,50,0.16)]',
          className,
        )}
        style={{ borderColor: border }}
      >
        <input
          ref={r1}
          value={s1}
          maxLength={2}
          onChange={(e) => handleChange(0, e.target.value, r2)}
          placeholder="XX"
          className="w-[44px] text-center font-mono text-[13px] uppercase outline-none"
          style={{ background: 'var(--sheet)', color: 'var(--ink)' }}
        />
        <div className="flex items-center font-mono text-[13px]" style={{ color: 'var(--ink-4)', background: 'var(--paper-2)' }}>/</div>
        <input
          ref={r2}
          value={s2}
          maxLength={2}
          onChange={(e) => handleChange(1, e.target.value, r3)}
          placeholder="XX"
          className="w-[44px] text-center font-mono text-[13px] uppercase outline-none"
          style={{ background: 'var(--sheet)', color: 'var(--ink)' }}
        />
        <div className="flex items-center font-mono text-[13px]" style={{ color: 'var(--ink-4)', background: 'var(--paper-2)' }}>/</div>
        <input
          ref={r3}
          value={s3}
          maxLength={4}
          onChange={(e) => handleChange(2, e.target.value, r3)}
          placeholder="XXXX"
          className="w-[64px] text-center font-mono text-[13px] uppercase outline-none"
          style={{ background: 'var(--sheet)', color: 'var(--ink)' }}
        />
      </div>
    );
  },
);
