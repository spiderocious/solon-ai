import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@solon/ui';
import { IconSend } from '@icons';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { CopilotMessage, CopilotResponse } from '@shared/types/mock-data.types';

const MOCK_REPLY = (q: string) =>
  q.toLowerCase().includes('incident')
    ? 'Two low-severity incidents reported: Ogbaru Ward 2 card reader delay (resolved) and Idemili North Ward 4 accreditation queue (being managed). No critical incidents at this time.'
    : 'LP is on track for a projected 47.2% share with 74% PU coverage. Turnout is tracking at 62%, slightly below the 68% target. Recommend activating backup agents in Ogbaru.';

export default function WarRoomCopilotScreen() {
  const { sessionId } = useDemoSession();
  const [messages, setMessages] = useState<CopilotMessage[]>([
    { role: 'assistant', content: "War Room Copilot active. I'm monitoring all 412 PUs in real-time. What would you like to know?", timestamp: new Date().toISOString() },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (content: string) =>
      demoClient.post<CopilotResponse>(DEMO_EP.WAR_ROOM_COPILOT, { message: content }, sessionId ?? undefined),
    onMutate: (content) => {
      setMessages((prev) => [...prev, { role: 'user', content, timestamp: new Date().toISOString() }]);
      setInput('');
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    },
    onSuccess: (res) => {
      setMessages((prev) => [...prev, res.message]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    },
    onError: (_, content) => {
      setMessages((prev) => [...prev, { role: 'assistant', content: MOCK_REPLY(content), timestamp: new Date().toISOString() }]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    },
  });

  function send() {
    const t = input.trim();
    if (!t || isPending) return;
    mutate(t);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] max-w-[640px]">
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-4 rounded-xl mb-4" style={{ background: 'var(--paper)', border: '1px solid var(--hair)' }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className="max-w-[85%] rounded-xl px-4 py-3 font-sans text-[13px]"
              style={m.role === 'user'
                ? { background: 'var(--forest-600)', color: 'white', borderRadius: '16px 16px 4px 16px' }
                : { background: 'var(--paper-2)', color: 'var(--ink-2)', borderRadius: '16px 16px 16px 4px', border: '1px solid var(--hair)' }
              }
            >
              {m.content}
            </div>
          </div>
        ))}
        {isPending && (
          <div className="flex justify-start">
            <div className="rounded-xl px-4 py-3 font-sans text-[13px]" style={{ background: 'var(--paper-2)', color: 'var(--ink-4)', border: '1px solid var(--hair)' }}>
              Analyzing…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
          placeholder="Ask about the election day status…"
          className="flex-1 rounded-lg px-4 py-2.5 font-sans text-[13px] outline-none border"
          style={{ background: 'var(--paper)', borderColor: 'var(--hair)', color: 'var(--ink)' }}
          disabled={isPending}
        />
        <Button variant="primary" onClick={send} disabled={isPending || !input.trim()}>
          <IconSend size={15} strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  );
}
