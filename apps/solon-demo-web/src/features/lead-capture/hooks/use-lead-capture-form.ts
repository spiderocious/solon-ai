import { useState } from 'react';
import type { FormEvent } from 'react';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import type { LeadCapturePayload, LeadCaptureResponse } from '@shared/types/mock-data.types';

interface UseLeadCaptureFormOptions {
  sessionId: string | null;
  onSuccess: (leadId: string) => void;
}

interface UseLeadCaptureFormResult {
  form: LeadCapturePayload;
  setField: <K extends keyof LeadCapturePayload>(key: K, value: string) => void;
  error: string;
  loading: boolean;
  handleSubmit: (e: FormEvent) => void;
}

export function useLeadCaptureForm({ sessionId, onSuccess }: Readonly<UseLeadCaptureFormOptions>): Readonly<UseLeadCaptureFormResult> {
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return { form, setField, error, loading, handleSubmit };
}
