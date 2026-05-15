import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { CopilotPrompt, LivePulse } from '@solon/ui';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { CopilotMessage, CopilotResponse } from '@shared/types/mock-data.types';

const UNAVAILABLE_REPLY = 'War Room Copilot is temporarily unavailable. Please try again in a moment.';

const SUGGESTED_TAGS = [
  'Incident summary',
  'Turnout status',
  'Coverage gaps',
  'LP projection',
  'Reconciliation alerts',
];

export default function WarRoomCopilotScreen() {
  const { sessionId } = useDemoSession();
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      role: 'assistant',
      content: "War Room Copilot active. I'm monitoring nationwide PUs in real-time. Ask about incidents, turnout, coverage, or projections.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (content: string) =>
      demoClient.post<CopilotResponse>(DEMO_EP.WAR_ROOM_COPILOT, { message: content }, sessionId ?? undefined),
    onMutate: (content) => {
      setMessages((prev) => [...prev, { role: 'user', content, timestamp: new Date().toISOString() }]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    },
    onSuccess: (res) => {
      setMessages((prev) => [...prev, res.message]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    },
    onError: () => {
      setMessages((prev) => [...prev, { role: 'assistant', content: UNAVAILABLE_REPLY, timestamp: new Date().toISOString() }]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    },
  });

  function send(text: string) {
    const t = text.trim();
    if (!t || isPending) return;
    mutate(t);
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header strip */}
      <div
        className="flex items-center gap-2 px-5 py-3 border-b shrink-0"
        style={{ borderColor: 'var(--hair)', background: 'var(--paper-2)' }}
      >
        <LivePulse variant="orange" />
        <span className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>War Room Copilot</span>
        <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>— nationwide · election day 16 Jan 2027</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-5">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'user' ? (
              <div
                className="max-w-[80%] px-4 py-2.5 font-sans text-[13px] italic"
                style={{ borderLeft: '2px solid var(--ink)', color: 'var(--ink-2)' }}
              >
                {m.content}
              </div>
            ) : (
              <div
                className="max-w-[85%] rounded-[4px] p-4"
                style={{ borderTop: '3px solid var(--forest-600)', background: 'var(--sheet)', border: '1px solid var(--hair)', borderTopColor: 'var(--forest-600)' }}
              >
                <div className="font-mono text-[9px] uppercase mb-1.5" style={{ color: 'var(--forest-700)' }}>
                  Solon · war room intelligence
                </div>
                <p className="font-serif text-[13px]" style={{ color: 'var(--ink-2)', lineHeight: 1.6 }}>
                  {m.content}
                </p>
                <div className="font-mono text-[10px] mt-2" style={{ color: 'var(--ink-4)' }}>
                  {new Date(m.timestamp).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })} WAT
                </div>
              </div>
            )}
          </div>
        ))}
        {isPending && (
          <div className="flex justify-start">
            <div
              className="rounded-[4px] px-4 py-3 font-serif italic text-[13px]"
              style={{ background: 'var(--sheet)', border: '1px solid var(--hair)', color: 'var(--ink-4)' }}
            >
              Analyzing election data…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested tags */}
      <div className="px-5 pb-2 flex gap-2 flex-wrap shrink-0">
        {SUGGESTED_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => send(tag)}
            disabled={isPending}
            className="font-mono text-[10px] px-2.5 py-1 rounded-[4px] border transition-colors"
            style={{ background: 'var(--paper-2)', color: 'var(--ink-3)', borderColor: 'var(--hair)' }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-5 pb-5 shrink-0">
        <CopilotPrompt
          placeholder="Ask about the election day status…"
          tags={SUGGESTED_TAGS}
          onSubmit={(val) => send(val)}
        />
      </div>
    </div>
  );
}
