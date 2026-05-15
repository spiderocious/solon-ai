import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminClient } from '@shared/admin-client';
import { ADMIN_EP } from '@shared/admin-endpoints';

interface MockDataRow {
  key: string;
  label: string;
  data: Record<string, unknown>;
  updatedAt: string;
}

interface EditState {
  key: string;
  raw: string;
  error: string;
}

export function MockDataScreen() {
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState<EditState | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery<MockDataRow[]>({
    queryKey: ['admin-mock-data'],
    queryFn: () => adminClient.get<MockDataRow[]>(ADMIN_EP.MOCK_DATA),
  });

  const { mutate: save, isPending } = useMutation({
    mutationFn: ({ key, payload }: { key: string; payload: Record<string, unknown> }) =>
      adminClient.patch(ADMIN_EP.MOCK_DATA_KEY(key), { data: payload }),
    onSuccess: (_, { key }) => {
      setSaved(key);
      setEdit(null);
      void queryClient.invalidateQueries({ queryKey: ['admin-mock-data'] });
      setTimeout(() => setSaved(null), 2000);
    },
  });

  function startEdit(row: MockDataRow) {
    setEdit({ key: row.key, raw: JSON.stringify(row.data, null, 2), error: '' });
  }

  function handleSave() {
    if (!edit) return;
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(edit.raw) as Record<string, unknown>;
    } catch {
      setEdit((e) => e ? { ...e, error: 'Invalid JSON' } : null);
      return;
    }
    save({ key: edit.key, payload: parsed });
  }

  return (
    <div className="max-w-[900px]">
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>Mock data</div>
        <div className="font-serif font-bold text-[30px]" style={{ color: 'var(--ink)' }}>Editable mock data</div>
        <div className="font-serif italic text-[13px] mt-1" style={{ color: 'var(--ink-3)' }}>
          — changes take effect immediately in the demo app
        </div>
      </div>

      {isError && (
        <div className="mb-6 px-4 py-3 rounded-[4px] font-sans text-[12px]" style={{ background: 'var(--orange-soft)', color: 'var(--orange)' }}>
          Failed to load mock data.
        </div>
      )}

      {isLoading ? (
        <div className="font-serif italic text-[13px]" style={{ color: 'var(--ink-3)' }}>Loading…</div>
      ) : (
        <div className="space-y-4">
          {data?.map((row) => (
            <div
              key={row.key}
              className="rounded-[6px] border"
              style={{ background: 'var(--sheet)', borderColor: edit?.key === row.key ? 'var(--ink)' : 'var(--hair)' }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: 'var(--hair)', background: 'var(--paper-2)' }}
              >
                <div>
                  <span className="font-mono text-[11px]" style={{ color: 'var(--ink-2)' }}>{row.key}</span>
                  <span className="font-sans text-[12px] ml-3" style={{ color: 'var(--ink-3)' }}>{row.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px]" style={{ color: 'var(--ink-4)' }}>
                    updated {new Date(row.updatedAt).toLocaleDateString('en-NG')}
                  </span>
                  {saved === row.key ? (
                    <span className="font-mono text-[10px]" style={{ color: 'var(--forest-700)' }}>Saved ✓</span>
                  ) : edit?.key === row.key ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEdit(null)}
                        className="font-mono text-[10px] px-2 py-1 rounded-[3px] border"
                        style={{ borderColor: 'var(--hair)', color: 'var(--ink-3)' }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isPending}
                        className="font-mono text-[10px] px-2 py-1 rounded-[3px]"
                        style={{ background: 'var(--ink)', color: 'var(--paper)' }}
                      >
                        {isPending ? 'Saving…' : 'Save'}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEdit(row)}
                      className="font-mono text-[10px] px-2 py-1 rounded-[3px] border"
                      style={{ borderColor: 'var(--hair)', color: 'var(--ink-3)' }}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>

              {/* Editor or read-only */}
              {edit?.key === row.key ? (
                <div className="p-4">
                  {edit.error && (
                    <p className="font-mono text-[11px] mb-2" style={{ color: 'var(--orange)' }}>{edit.error}</p>
                  )}
                  <textarea
                    value={edit.raw}
                    onChange={(e) => setEdit((s) => s ? { ...s, raw: e.target.value, error: '' } : null)}
                    rows={16}
                    spellCheck={false}
                    className="w-full font-mono text-[11px] px-3 py-2 rounded-[4px] border outline-none bg-transparent resize-y"
                    style={{ borderColor: edit.error ? 'var(--orange)' : 'var(--hair)', color: 'var(--ink)' }}
                  />
                </div>
              ) : (
                <pre
                  className="px-4 py-3 font-mono text-[10px] overflow-x-auto max-h-48"
                  style={{ color: 'var(--ink-3)' }}
                >
                  {JSON.stringify(row.data, null, 2).slice(0, 800)}
                  {JSON.stringify(row.data, null, 2).length > 800 ? '\n…' : ''}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
