const BASE_URL = import.meta.env.VITE_DEMO_API_BASE_URL;

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
  const json = await res.json() as { data: T } | T;
  return (json !== null && typeof json === 'object' && 'data' in json ? (json as { data: T }).data : json) as T;
}

export const demoClient = {
  get: <T>(path: string, sessionId?: string) =>
    request<T>(path, { method: 'GET', sessionId }),
  post: <T>(path: string, body: unknown, sessionId?: string) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body), sessionId }),
  patch: <T>(path: string, body: unknown, sessionId?: string) =>
    request<T>(path, { method: 'PATCH', body: JSON.stringify(body), sessionId }),
  // GET /mock/:key — response is { data: { key, label, data: <payload> } }
  // outer envelope is unwrapped by request(), then we unwrap the inner .data
  getMock: <T>(key: string, sessionId?: string) =>
    request<{ key: string; label: string; data: T }>(`/mock/${key}`, { method: 'GET', sessionId })
      .then((envelope) => envelope.data),
};
