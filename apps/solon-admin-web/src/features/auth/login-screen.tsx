import { useState } from 'react';
import type { FormEvent } from 'react';
import { adminClient } from '@shared/admin-client';
import { setAdminToken } from '@shared/admin-client';
import { ADMIN_EP } from '@shared/admin-endpoints';

interface LoginResponse {
  token: string;
  adminId: string;
}

interface Props {
  onSuccess: () => void;
}

export function LoginScreen({ onSuccess }: Readonly<Props>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await adminClient.post<LoginResponse>(ADMIN_EP.LOGIN, { email, password });
      setAdminToken(res.token);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--paper-2)' }}>
      <div
        className="w-full max-w-[360px] rounded-[6px] border p-8"
        style={{ background: 'var(--sheet)', borderColor: 'var(--hair)' }}
      >
        <div className="mb-8">
          <div className="font-serif font-bold text-[28px]" style={{ color: 'var(--ink)' }}>
            Solon<span style={{ color: 'var(--orange)' }}>.</span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] mt-1" style={{ color: 'var(--ink-4)' }}>
            Admin · platform operations
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.1em] block mb-1.5" style={{ color: 'var(--ink-4)' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-3 py-2 rounded-[4px] border font-sans text-[13px] outline-none bg-transparent"
              style={{ borderColor: 'var(--hair)', color: 'var(--ink)' }}
            />
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.1em] block mb-1.5" style={{ color: 'var(--ink-4)' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-3 py-2 rounded-[4px] border font-sans text-[13px] outline-none bg-transparent"
              style={{ borderColor: 'var(--hair)', color: 'var(--ink)' }}
            />
          </div>

          {error && (
            <p className="font-sans text-[12px]" style={{ color: 'var(--orange)' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-[4px] font-sans font-medium text-[13px] transition-colors"
            style={{
              background: loading ? 'var(--ink-3)' : 'var(--ink)',
              color: 'var(--paper)',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
