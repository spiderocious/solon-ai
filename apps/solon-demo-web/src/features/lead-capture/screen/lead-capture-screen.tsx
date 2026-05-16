import { useNavigate, useLocation } from 'react-router-dom';
import { DEMO_ROUTES } from '@solon/core';
import { Button, FieldLabel, TextInput, Select } from '@solon/ui';
import { SolonLogo } from '@ui/SolonLogo';
import { useDemoSession } from '@shared/hooks/use-demo-session';
import { useLeadCaptureForm } from '../hooks/use-lead-capture-form';

const ROLES = [
  'Campaign Manager',
  'Candidate',
  'Political Analyst',
  'Party Official',
  'Journalist',
  'Researcher',
  'Other',
];

const NG_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara',
];

export default function LeadCaptureScreen() {
  const { sessionId, setLeadId } = useDemoSession();
  const navigate = useNavigate();
  const location = useLocation();
  const nextPath = new URLSearchParams(location.search).get('next') ?? '';

  const { form, setField, error, loading, handleSubmit } = useLeadCaptureForm({
    sessionId,
    onSuccess: (leadId) => {
      setLeadId(leadId);
      navigate(nextPath || DEMO_ROUTES.DASHBOARD);
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: 'var(--paper-2)' }}
    >
      <div className="w-full max-w-[480px]">
        {/* Card */}
        <div
          className="rounded-[6px] overflow-hidden"
          style={{ border: '1px solid var(--ink)', background: 'var(--sheet)' }}
        >
          {/* Header */}
          <div
            className="px-8 py-5 border-b flex items-center gap-4"
            style={{ background: 'var(--paper-2)', borderColor: 'var(--ink)' }}
          >
            <SolonLogo size="md" />
            <div>
              <h1 className="font-serif font-semibold text-[18px] leading-tight" style={{ color: 'var(--ink)' }}>
                Before you explore
              </h1>
              <p className="font-serif italic text-[12px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
                — help us tailor your demo. Under a minute.
              </p>
            </div>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit} className="px-8 py-6 flex flex-col gap-4">
            {/* Two-column on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <FieldLabel label="Full name" required>
                  <TextInput
                    value={form.name}
                    onChange={(e) => setField('name', e.target.value)}
                    placeholder="Chukwuemeka Obi"
                  />
                </FieldLabel>
              </div>

              <FieldLabel label="Email" required>
                <TextInput
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                  type="email"
                  placeholder="you@example.com"
                />
              </FieldLabel>

              <FieldLabel label="Phone">
                <TextInput
                  value={form.phone ?? ''}
                  onChange={(e) => setField('phone', e.target.value)}
                  type="tel"
                  placeholder="+234 800 000 0000"
                />
              </FieldLabel>

              <FieldLabel label="Your role" required>
                <Select
                  value={form.role}
                  onChange={(e) => setField('role', e.target.value)}
                >
                  <option value="">Select role…</option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </Select>
              </FieldLabel>

              <FieldLabel label="State of operation" required>
                <Select
                  value={form.state}
                  onChange={(e) => setField('state', e.target.value)}
                >
                  <option value="">Select state…</option>
                  {NG_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </Select>
              </FieldLabel>

              <div className="sm:col-span-2">
                <FieldLabel label="Party affiliation" hint="optional">
                  <TextInput
                    value={form.party ?? ''}
                    onChange={(e) => setField('party', e.target.value)}
                    placeholder="LP, APC, PDP, etc."
                  />
                </FieldLabel>
              </div>
            </div>

            {error && (
              <div
                className="rounded-[4px] px-3 py-2 font-sans text-[12px]"
                style={{ background: 'var(--crit-bg)', border: '1px solid var(--crit-edge)', color: 'var(--crit)' }}
              >
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" size="md" loading={loading} className="w-full mt-1">
              Enter demo
            </Button>
          </form>

          {/* Footer */}
          <div
            className="px-8 py-3 border-t font-mono text-[10px] text-center"
            style={{ borderColor: 'var(--hair)', color: 'var(--ink-4)' }}
          >
            Data used only to improve Solon demos. Never shared.
          </div>
        </div>
      </div>
    </div>
  );
}
