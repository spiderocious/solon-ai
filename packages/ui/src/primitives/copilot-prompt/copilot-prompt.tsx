import { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn.js';

export interface CopilotPromptProps {
  placeholder?: string;
  tags?: string[];
  onSubmit?: (value: string) => void;
  className?: string;
}

const DEFAULT_TAGS = [
  'Simulate Soludo backing LP',
  'Project youth turnout +5%',
  'Apply BVAS-failure scenario',
  'Compare 2023 baseline',
];

export const CopilotPrompt = forwardRef<HTMLDivElement, CopilotPromptProps>(
  function CopilotPrompt({ placeholder, tags = DEFAULT_TAGS, onSubmit, className }, ref) {
    const [value, setValue] = useState('');

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (value.trim()) {
          onSubmit?.(value.trim());
          setValue('');
        }
      }
    }

    function insertTag(tag: string) {
      setValue((v) => (v ? `${v} ${tag}` : tag));
    }

    return (
      <div ref={ref} className={cn('flex flex-col gap-2', className)}>
        {/* Tag suggestions */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => insertTag(tag)}
              className="px-2.5 py-1 rounded-full font-mono text-[10px] border transition-colors hover:border-[var(--forest-400)]"
              style={{ borderColor: 'var(--hair)', background: 'var(--paper-2)', color: 'var(--ink-3)' }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Prompt input */}
        <div
          className="flex items-end gap-2 rounded-[6px] border p-3"
          style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}
        >
          {/* AI icon */}
          <div className="shrink-0 mb-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--forest-600)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder ?? 'Ask the AI analyst — or describe a scenario to simulate…'}
            rows={2}
            className="flex-1 font-sans text-[13px] resize-none outline-none"
            style={{ background: 'transparent', color: 'var(--ink)' }}
          />
          <button
            onClick={() => { if (value.trim()) { onSubmit?.(value.trim()); setValue(''); } }}
            disabled={!value.trim()}
            className="shrink-0 h-7 px-3 rounded-[3px] font-sans text-[12px] transition-opacity disabled:opacity-40"
            style={{ background: 'var(--forest-600)', color: 'white' }}
          >
            Run
          </button>
        </div>
        <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
          ↵ to run · Shift+↵ for new line
        </div>
      </div>
    );
  },
);
