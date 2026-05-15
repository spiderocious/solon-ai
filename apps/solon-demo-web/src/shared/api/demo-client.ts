const BASE_URL = import.meta.env.VITE_DEMO_API_BASE_URL ?? 'http://localhost:3001/api/v1';

async function request<T>(path: string, init?: RequestInit & { sessionId?: string }): Promise<T> {
  const { sessionId, ...fetchInit } = init ?? {};
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchInit.headers as Record<string, string>),
  };
  if (sessionId) headers['x-session-id'] = sessionId;

  const res = await fetch(`${BASE_URL}${path}`, { ...fetchInit, headers });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`[demo-api] ${res.status} ${path}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export const demoClient = {
  get: <T>(path: string, sessionId?: string) =>
    request<T>(path, { method: 'GET', sessionId }),
  post: <T>(path: string, body: unknown, sessionId?: string) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body), sessionId }),
};
