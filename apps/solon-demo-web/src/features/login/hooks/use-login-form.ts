import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';
import type { DemoSession } from '@shared/types/mock-data.types';

const DEMO_EMAIL = 'demo@solon.ng';
const DEMO_PASSWORD = 'demo2027';

interface UseLoginFormOptions {
  onSuccess: (sessionId: string) => void;
}

interface FieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface UseLoginFormResult {
  fields: {
    email: FieldProps;
    password: FieldProps;
  };
  error: string;
  loading: boolean;
  handleSubmit: (e: FormEvent) => void;
}

export function useLoginForm({ onSuccess }: Readonly<UseLoginFormOptions>): Readonly<UseLoginFormResult> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError('Invalid credentials. Use demo@solon.ng / demo2027');
      return;
    }

    setLoading(true);
    try {
      const session = await demoClient.post<DemoSession>(
        DEMO_EP.SESSION_CREATE,
        { userAgent: navigator.userAgent },
      );
      onSuccess(session.sessionId);
    } catch {
      // API unavailable — create a client-side session id so demo still works
      onSuccess(`demo-session-${Date.now()}`);
    } finally {
      setLoading(false);
    }
  }

  return {
    fields: {
      email: { value: email, onChange: (e) => setEmail(e.target.value) },
      password: { value: password, onChange: (e) => setPassword(e.target.value) },
    },
    error,
    loading,
    handleSubmit,
  };
}
