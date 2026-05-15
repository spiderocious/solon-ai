import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { CopilotPrompt, ConfidenceBar } from '@solon/ui';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { CopilotMessage, CopilotResponse } from '@shared/types/mock-data.types';

const COPILOT_TAGS = [
  'AFP path to 50%+1',
  'Project youth turnout +5%',
  'Apply BVAS-failure scenario',
  'Compare 2023 baseline',
];

export default function SimulatorCopilotScreen() {
  const { sessionId } = useDemoSession();
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      role: 'assistant',
      content: "I'm your Solon AI Copilot. Ask me anything about the AFP presidential campaign — scenarios, risks, opportunities, or voter patterns.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: (content: string) =>
      demoClient.post<CopilotResponse>(DEMO_EP.SIMULATOR_COPILOT, { message: content }, sessionId ?? undefined),
    onMutate: (content) => {
      setMessages((prev) => [...prev, { role: 'user', content, timestamp: new Date().toISOString() }]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    },
    onSuccess: (res) => {
      setMessages((prev) => [...prev, res.message]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    },
    onError: () => {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Solon Copilot is temporarily unavailable. Please try again in a moment.', timestamp: new Date().toISOString() }]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    },
  });

  return (
    <div className="flex flex-col h-full" style={{ minHeight: 0 }}>
      {/* Chat header */}
      <div className="flex items-center gap-2 px-6 py-3 border-b shrink-0" style={{ borderColor: 'var(--hair)' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--forest-600)" strokeWidth="1.4">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: 'var(--forest-700)' }}>
          Solon analyst
        </span>
        <span
          className="font-mono text-[9px] px-2 rounded-full"
          style={{ background: 'var(--forest-50)', color: 'var(--forest-700)' }}
        >
          NEUTRAL
        </span>
      </div>

      {/* Message thread */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3" style={{ minHeight: 0 }}>
        {messages.map((msg, i) => (
          msg.role === 'user' ? (
            <div key={i} className="flex justify-end">
              <div
                className="max-w-[80%] px-3 py-2 font-sans italic text-[12px]"
                style={{ background: 'var(--paper-2)', borderLeft: '2px solid var(--ink)', color: 'var(--ink-2)' }}
              >
                {msg.content}
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-start">
              <div
                className="max-w-[90%] border rounded-[4px] p-4"
                style={{ borderColor: 'var(--ink)', borderTop: '3px solid var(--forest-600)', background: 'var(--sheet)' }}
              >
                <p className="font-serif text-[13px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                  {msg.content}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <ConfidenceBar level={4} />
                  <span className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>
                    {new Date(msg.timestamp).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })} WAT
                  </span>
                </div>
              </div>
            </div>
          )
        ))}
        {isPending && (
          <div className="flex justify-start">
            <div
              className="border rounded-[4px] px-4 py-3 font-serif italic text-[13px]"
              style={{ borderColor: 'var(--hair)', color: 'var(--ink-4)', background: 'var(--sheet)' }}
            >
              Solon is thinking…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* CopilotPrompt input */}
      <div className="px-6 pb-6 pt-3 shrink-0 border-t" style={{ borderColor: 'var(--hair)' }}>
        <CopilotPrompt
          placeholder="Ask a follow-up about the race, scenarios, or voter patterns…"
          tags={COPILOT_TAGS}
          onSubmit={(value) => {
            if (value.trim() && !isPending) sendMessage(value.trim());
          }}
        />
      </div>
    </div>
  );
}
