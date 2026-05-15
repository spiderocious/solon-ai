export const DEMO_APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:5173';

export const EXTERNAL_LINKS = {
  demo: DEMO_APP_URL,
  contact: 'mailto:devferanmi@gmail.com',
  twitter: 'https://twitter.com/solonhq',
} as const;
