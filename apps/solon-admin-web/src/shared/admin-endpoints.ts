export const ADMIN_EP = {
  LOGIN: '/admin/login',
  SETUP: '/admin/setup',
  STATS: '/admin/stats',
  SESSIONS: '/admin/sessions',
  FEEDBACK: '/admin/feedback',
  MOCK_DATA: '/admin/mock-data',
  MOCK_DATA_KEY: (key: string) => `/admin/mock-data/${key}`,
} as const;
