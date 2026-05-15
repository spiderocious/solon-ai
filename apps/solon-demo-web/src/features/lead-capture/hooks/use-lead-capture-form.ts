import { useState } from 'react';
import type { FormEvent } from 'react';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import type { LeadCapturePayload, LeadCaptureResponse } from '@shared/types/mock-data.types';

interface UseLeadCaptureFormOptions {
  readonly sessionId: string | null;
  readonly onSuccess: (leadId: string) => void;
}

interface UseLeadCaptureFormResult {
  readonly form: LeadCapturePayload;
  readonly setField: <K extends keyof LeadCapturePayload>(key: K, value: string) => void;
  readonly error: string;
  readonly loading: boolean;
  readonly handleSubmit: (e: FormEvent) => void;
}

export function useLeadCaptureForm({ sessionId, onSuccess }: UseLeadCaptureFormOptions): UseLeadCaptureFormResult {
  const [form, setForm] = useState<LeadCapturePayload>({
    name: '', email: '', phone: '', role: '', party: '', state: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function setField<K extends keyof LeadCapturePayload>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.role || !form.state) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await demoClient.post<LeadCaptureResponse>(
        DEMO_EP.LEAD_CAPTURE,
        form,
        sessionId ?? undefined,
      );
      onSuccess(res.leadId);
    } catch {
      // API unavailable in demo — proceed anyway
      onSuccess('demo-lead');
    } finally {
      setLoading(false);
    }
  }

  return { form, setField, error, loading, handleSubmit };
}
