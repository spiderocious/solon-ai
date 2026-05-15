import { forwardRef, useRef, useState } from 'react';
import { cn } from '../../utils/cn.js';

export interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  hasError?: boolean;
  className?: string;
}

export const OTPInput = forwardRef<HTMLDivElement, OTPInputProps>(
  function OTPInput({ length = 6, value, onChange, hasError, className }, ref) {
    const [internal, setInternal] = useState(value ?? '');
    const digits = (value ?? internal).split('').slice(0, length);
    while (digits.length < length) digits.push('');

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    function handleChange(i: number, v: string) {
      const char = v.replace(/\D/g, '').slice(-1);
      const next = [...digits];
      next[i] = char;
      const joined = next.join('');
      setInternal(joined);
      onChange?.(joined);
      if (char && i < length - 1) inputRefs.current[i + 1]?.focus();
    }

    function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'Backspace' && !digits[i] && i > 0) {
        inputRefs.current[i - 1]?.focus();
      }
    }

    function handlePaste(e: React.ClipboardEvent) {
      e.preventDefault();
      const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
      setInternal(text);
      onChange?.(text);
      const focusIdx = Math.min(text.length, length - 1);
      inputRefs.current[focusIdx]?.focus();
    }

    return (
      <div ref={ref} className={cn('flex gap-2', className)}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            value={d}
            maxLength={1}
            inputMode="numeric"
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={i === 0 ? handlePaste : undefined}
            className={cn(
              'w-10 h-12 text-center font-mono text-[18px] font-medium rounded-[4px] border outline-none',
              'focus:shadow-[0_0_0_3px_rgba(27,67,50,0.16)]',
              hasError && 'border-[var(--crit)]',
            )}
            style={{
              borderColor: hasError ? undefined : d ? 'var(--forest-400)' : 'var(--hair)',
              background: 'var(--sheet)',
              color: 'var(--ink)',
            }}
          />
        ))}
      </div>
    );
  },
);
