import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

const DEMO_EMAIL = 'demo@solon.ng';
const DEMO_PASSWORD = 'demo2027';

interface UseLoginFormOptions {
  readonly onSuccess: (sessionId: string) => void;
}

interface FieldProps {
  readonly value: string;
  readonly onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface UseLoginFormResult {
  readonly fields: {
    readonly email: FieldProps;
    readonly password: FieldProps;
  };
  readonly error: string;
  readonly loading: boolean;
  readonly handleSubmit: (e: FormEvent) => void;
}

export function useLoginForm({ onSuccess }: UseLoginFormOptions): UseLoginFormResult {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulated async check
    setTimeout(() => {
      if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
        onSuccess(`demo-session-${Date.now()}`);
      } else {
        setError('Invalid credentials. Use demo@solon.ng / demo2027');
        setLoading(false);
      }
    }, 600);
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
