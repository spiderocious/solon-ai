const BASE_URL = import.meta.env.VITE_DEMO_API_BASE_URL ?? 'http://localhost:3001/api/v1';
const TOKEN_KEY = 'solon_admin_token';

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getAdminToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init?.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...init, headers });

  if (res.status === 401) {
    clearAdminToken();
    window.location.href = '/admin/login';
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`[admin-api] ${res.status} ${path}: ${text}`);
  }

  const json = await res.json() as { data: T } | T;
  return (json !== null && typeof json === 'object' && 'data' in json
    ? (json as { data: T }).data
    : json) as T;
}

export const adminClient = {
  get: <T>(path: string) => request<T>(path, { method: 'GET' }),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
};
