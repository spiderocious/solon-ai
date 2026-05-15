import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, FieldLabel, Select, StatusPill } from '@solon/ui';
import { IconCopy, IconCheck } from '@icons';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import { useVoterClusters } from '../api/use-voter-clusters';
import type { MessageTemplate } from '@shared/types/mock-data.types';
import { ScreenSkeleton } from '@shared/components/screen-skeleton';
import { ErrorState } from '@shared/components/error-state';

const CHANNELS = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'sms', label: 'SMS' },
  { value: 'voice', label: 'Voice script' },
] as const;

const SCORE_COLOR = (score: number) => score >= 80 ? 'var(--forest-700)' : score >= 60 ? 'var(--ink-2)' : 'var(--orange)';

export default function VoterIntelMessagesScreen() {
  const { sessionId } = useDemoSession();
  const { data: clusters, isLoading: clustersLoading, isError: clustersError, refetch: refetchClusters } = useVoterClusters();

  const [channel, setChannel] = useState<'sms' | 'whatsapp' | 'voice'>('whatsapp');
  const [result, setResult] = useState<MessageTemplate | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const firstCluster = clusters?.[0]?.name ?? '';
  const [cluster, setCluster] = useState<string>('');
  const activeCluster = cluster || firstCluster;

  const { mutate: generate, isPending } = useMutation({
    mutationFn: () => demoClient.post<MessageTemplate>(DEMO_EP.VOTER_MESSAGE_GENERATE, { cluster: activeCluster, channel }, sessionId ?? undefined),
    onSuccess: (res) => { setResult(res); setApiError(null); },
    onError: () => { setApiError('Message generation failed. Please try again.'); },
  });

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (clustersLoading) return <ScreenSkeleton rows={4} />;
  if (clustersError || !clusters?.length) {
    return <ErrorState message="Could not load voter clusters." onRetry={() => void refetchClusters()} />;
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
          <Select value={activeCluster} onChange={(e) => setCluster(e.target.value)}>
            {clusters.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
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

        <Button variant="primary" onClick={() => generate()} disabled={isPending || !activeCluster}>
          {isPending ? 'Generating…' : 'Generate message'}
        </Button>

        <div className="rounded-[6px] p-4 mt-2" style={{ background: 'var(--paper-2)', border: '1px solid var(--hair)' }}>
          <div className="font-mono text-[9px] uppercase mb-3" style={{ color: 'var(--ink-4)' }}>Model context</div>
          <div className="space-y-2">
            {[
              { label: 'Clusters tracked', value: String(clusters.length) },
              { label: 'Channels supported', value: String(CHANNELS.length) },
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
        {apiError && (
          <div className="rounded-[4px] px-4 py-3" style={{ background: '#FEF2F2', border: '1px solid var(--crit)' }}>
            <p className="font-sans text-[12px]" style={{ color: 'var(--crit)' }}>{apiError}</p>
          </div>
        )}

        {!result && !apiError ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 opacity-50">
            <div className="font-serif italic text-[14px]" style={{ color: 'var(--ink-3)' }}>
              Select a cluster and channel, then generate a message.
            </div>
          </div>
        ) : result ? (
          <>
            <div className="rounded-[6px] overflow-hidden" style={{ border: '1px solid var(--hair)', background: 'var(--sheet)' }}>
              <div className="px-4 py-2.5 flex items-center justify-between border-b" style={{ background: 'var(--paper-2)', borderColor: 'var(--hair)' }}>
                <div>
                  <span className="font-mono text-[10px] uppercase" style={{ color: 'var(--ink-3)' }}>{result.cluster}</span>
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

            <div
              className="rounded-[4px] px-4 py-3"
              style={{ background: 'var(--forest-50)', borderTop: '3px solid var(--forest-600)' }}
            >
              <div className="font-mono text-[9px] uppercase mb-1" style={{ color: 'var(--forest-700)' }}>Solon · message intelligence</div>
              <p className="font-serif italic text-[12px]" style={{ color: 'var(--ink-2)' }}>
                This message is tailored for the {result.cluster} cluster via {result.channel}. Engagement score above 80 indicates strong resonance with the cluster's top issues.
              </p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
