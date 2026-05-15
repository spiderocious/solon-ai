import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, FieldLabel, Select, StatusPill } from '@solon/ui';
import { IconCopy, IconCheck } from '@icons';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import type { MessageTemplate } from '@shared/types/mock-data.types';

const CLUSTERS = [
  'Young urban professionals',
  'Market traders (Onitsha)',
  'Rural farmers (Ogbaru)',
  'Diaspora returnees',
];

const CHANNELS = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'sms', label: 'SMS' },
  { value: 'voice', label: 'Voice script' },
] as const;

const MOCK_MESSAGES: Record<string, MessageTemplate> = {
  'Young urban professionals-whatsapp': {
    id: 'm1', cluster: 'Young urban professionals', channel: 'whatsapp',
    content: '🇳🇬 Fellow Anambrans — the 2027 election is our chance to reshape our future. Ifeanyi Okonkwo (LP) has a concrete plan for tech hubs and manufacturing revival. Register. Vote. Show up. Forward this to 5 people you trust. — Solon Intelligence',
    estimatedReach: 38_000, engagementScore: 84,
  },
  'Market traders (Onitsha)-sms': {
    id: 'm2', cluster: 'Market traders (Onitsha)', channel: 'sms',
    content: 'Onitsha traders: LP candidate Ifeanyi Okonkwo supports market security & naira stability. Vote Feb 2027. Details: solon.ng/anambra',
    estimatedReach: 52_000, engagementScore: 71,
  },
};

function getMockMessage(cluster: string, channel: string): MessageTemplate {
  const key = `${cluster}-${channel}`;
  return MOCK_MESSAGES[key] ?? {
    id: 'mx', cluster, channel: channel as MessageTemplate['channel'],
    content: `This is a tailored message for ${cluster} delivered via ${channel}. Ifeanyi Okonkwo (LP) stands for your priorities — cost of living relief, security, and economic revival. Your vote matters. Elections: February 2027.`,
    estimatedReach: 25_000, engagementScore: 68,
  };
}

const SCORE_COLOR = (score: number) => score >= 80 ? 'var(--forest-700)' : score >= 60 ? 'var(--ink-2)' : 'var(--orange)';

export default function VoterIntelMessagesScreen() {
  const { sessionId } = useDemoSession();
  const [cluster, setCluster] = useState<string>(CLUSTERS[0] ?? 'Young urban professionals');
  const [channel, setChannel] = useState<'sms' | 'whatsapp' | 'voice'>('whatsapp');
  const [result, setResult] = useState<MessageTemplate | null>(null);
  const [copied, setCopied] = useState(false);

  const { mutate: generate, isPending } = useMutation({
    mutationFn: () => demoClient.post<MessageTemplate>(DEMO_EP.VOTER_MESSAGE_GENERATE, { cluster, channel }, sessionId ?? undefined),
    onSuccess: (res) => setResult(res),
    onError: () => setResult(getMockMessage(cluster, channel)),
  });

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div
      className="flex flex-col md:grid min-h-full"
      style={{ gridTemplateColumns: '320px 1fr' }}
    >
      {/* Left — controls */}
      <div className="border-b md:border-b-0 md:border-r p-5 flex flex-col gap-5" style={{ borderColor: 'var(--hair)' }}>
        <div>
          <h2 className="font-serif font-semibold text-[18px]" style={{ color: 'var(--ink)' }}>Message generator</h2>
          <p className="font-serif italic text-[12px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
            — AI-tailored outreach by cluster & channel
          </p>
        </div>

        <FieldLabel label="Voter cluster" required>
          <Select value={cluster} onChange={(e) => setCluster(e.target.value)}>
            {CLUSTERS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </FieldLabel>

        <FieldLabel label="Channel">
          <Select value={channel} onChange={(e) => setChannel(e.target.value as typeof channel)}>
            {CHANNELS.map((ch) => (
              <option key={ch.value} value={ch.value}>{ch.label}</option>
            ))}
          </Select>
        </FieldLabel>

        <Button variant="primary" onClick={() => generate()} disabled={isPending}>
          {isPending ? 'Generating…' : 'Generate message'}
        </Button>

        {/* Stats */}
        <div className="rounded-[6px] p-4 mt-2" style={{ background: 'var(--paper-2)', border: '1px solid var(--hair)' }}>
          <div className="font-mono text-[9px] uppercase mb-3" style={{ color: 'var(--ink-4)' }}>Model context</div>
          <div className="space-y-2">
            {[
              { label: 'Clusters tracked', value: '5' },
              { label: 'Channels supported', value: '3' },
              { label: 'Templates generated', value: '47' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>{label}</span>
                <span className="font-sans text-[12px] font-medium" style={{ color: 'var(--ink-2)' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — output */}
      <div className="p-5 md:p-6 flex flex-col gap-4">
        {!result ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 opacity-50">
            <div className="font-serif italic text-[14px]" style={{ color: 'var(--ink-3)' }}>
              Select a cluster and channel, then generate a message.
            </div>
          </div>
        ) : (
          <>
            {/* Result card */}
            <div className="rounded-[6px] overflow-hidden" style={{ border: '1px solid var(--hair)', background: 'var(--sheet)' }}>
              <div className="px-4 py-2.5 flex items-center justify-between border-b" style={{ background: 'var(--paper-2)', borderColor: 'var(--hair)' }}>
                <div>
                  <span className="font-mono text-[10px] uppercase" style={{ color: 'var(--ink-3)' }}>
                    {result.cluster}
                  </span>
                  <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}> · {result.channel}</span>
                </div>
                <StatusPill variant="ok" label="Generated" />
              </div>
              <div className="p-5">
                <p className="font-sans text-[14px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                  {result.content}
                </p>
              </div>
              <div className="border-t px-4 py-3 flex items-center justify-between flex-wrap gap-3" style={{ borderColor: 'var(--hair)' }}>
                <div className="flex gap-5">
                  <div>
                    <div className="font-mono text-[9px] uppercase" style={{ color: 'var(--ink-4)' }}>Est. reach</div>
                    <div className="font-sans font-semibold text-[15px]" style={{ color: 'var(--ink-2)' }}>
                      {result.estimatedReach.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase" style={{ color: 'var(--ink-4)' }}>Engagement score</div>
                    <div className="font-serif font-bold text-[18px]" style={{ color: SCORE_COLOR(result.engagementScore) }}>
                      {result.engagementScore}<span className="font-sans font-normal text-[12px]" style={{ color: 'var(--ink-4)' }}>/100</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] font-sans text-[12px] border transition-colors"
                  style={copied
                    ? { background: 'var(--forest-50)', color: 'var(--forest-700)', borderColor: 'var(--forest-600)' }
                    : { background: 'var(--paper)', color: 'var(--ink-2)', borderColor: 'var(--hair)' }
                  }
                >
                  {copied ? <IconCheck size={13} /> : <IconCopy size={13} />}
                  {copied ? 'Copied!' : 'Copy text'}
                </button>
              </div>
            </div>

            {/* Suggested edits note */}
            <div
              className="rounded-[4px] px-4 py-3"
              style={{ background: 'var(--forest-50)', borderTop: '3px solid var(--forest-600)' }}
            >
              <div className="font-mono text-[9px] uppercase mb-1" style={{ color: 'var(--forest-700)' }}>Solon · message intelligence</div>
              <p className="font-serif italic text-[12px]" style={{ color: 'var(--ink-2)' }}>
                This message tests best with the {result.cluster} cluster when sent before 18:00 WAT. Engagement score above 80 indicates strong resonance with the top issue: <em>cost of living</em>.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
