import { useNavigate } from 'react-router-dom';
import { DEMO_ROUTES } from '@solon/core';
import { Button, FieldLabel, TextInput } from '@solon/ui';
import { SolonLogo } from '@ui/SolonLogo';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import { useLoginForm } from '../hooks/use-login-form';

export default function LoginScreen() {
  const { login } = useDemoSession();
  const navigate = useNavigate();

  const { fields, error, loading, handleSubmit } = useLoginForm({
    onSuccess: (sessionId) => {
      login(sessionId, null);
      navigate(DEMO_ROUTES.LEAD_CAPTURE);
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: 'var(--paper-2)' }}
    >
      <div className="w-full max-w-[400px]">
        {/* Card */}
        <div
          className="rounded-[6px] overflow-hidden"
          style={{ border: '1px solid var(--ink)', background: 'var(--sheet)' }}
        >
          {/* Card header */}
          <div
            className="px-8 py-5 border-b flex flex-col items-center gap-3"
            style={{ background: 'var(--paper-2)', borderColor: 'var(--ink)' }}
          >
            <SolonLogo size="lg" />
            <div className="text-center">
              <h1 className="font-serif font-semibold text-[20px] leading-tight" style={{ color: 'var(--ink)' }}>
                Welcome back
              </h1>
              <p className="font-sans text-[13px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
                Sign in to your demo session
              </p>
            </div>
          </div>

          {/* Card body */}
          <form onSubmit={handleSubmit} className="px-8 py-6 flex flex-col gap-4">
            <FieldLabel label="Email" required>
              <TextInput
                {...fields.email}
                placeholder="demo@solon.ng"
                type="email"
                autoComplete="email"
              />
            </FieldLabel>

            <FieldLabel label="Password" required>
              <TextInput
                {...fields.password}
                placeholder="••••••••"
                type="password"
                autoComplete="current-password"
              />
            </FieldLabel>

            {error && (
              <div
                className="rounded-[4px] px-3 py-2 font-sans text-[12px]"
                style={{ background: 'var(--crit-bg)', border: '1px solid var(--crit-edge)', color: 'var(--crit)' }}
              >
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" size="md" loading={loading} className="w-full mt-1">
              Sign in
            </Button>
          </form>

          {/* Card footer */}
          <div
            className="px-8 py-4 border-t font-mono text-[10px] text-center"
            style={{ borderColor: 'var(--hair)', color: 'var(--ink-4)' }}
          >
            demo@solon.ng · demo2027
          </div>
        </div>
      </div>
    </div>
  );
}
