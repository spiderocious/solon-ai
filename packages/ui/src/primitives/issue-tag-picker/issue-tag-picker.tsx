import { useState } from 'react';
import { cn } from '../../utils/cn.js';

export interface IssueTagPickerProps {
  options: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
  maxSelect?: number;
  className?: string;
}

export function IssueTagPicker({ options, value, onChange, maxSelect, className }: IssueTagPickerProps) {
  const [internal, setInternal] = useState<string[]>(value ?? []);
  const selected = value ?? internal;

  function toggle(tag: string) {
    const next = selected.includes(tag)
      ? selected.filter((t) => t !== tag)
      : maxSelect && selected.length >= maxSelect
        ? selected
        : [...selected, tag];
    setInternal(next);
    onChange?.(next);
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {options.map((tag) => {
        const active = selected.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => toggle(tag)}
            className={cn(
              'px-3 py-1 rounded-full font-sans text-[12px] border transition-colors',
              active
                ? 'font-medium'
                : 'hover:border-[var(--forest-300)]',
            )}
            style={{
              borderColor: active ? 'var(--forest-600)' : 'var(--hair)',
              background: active ? 'var(--forest-50)' : 'var(--sheet)',
              color: active ? 'var(--forest-700)' : 'var(--ink-2)',
            }}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
