import { randomBytes } from 'node:crypto';

const gen = (prefix: string): string =>
  `${prefix}_${randomBytes(10).toString('hex')}`;

// Sufficient for request IDs and idempotency keys. Not for tokens.
export const newRawId = (): string => randomBytes(12).toString('hex');

export const ids = {
  raw: (): string => newRawId(),
  session: (): string => gen('ses'),
  lead: (): string => gen('ld'),
  feedback: (): string => gen('fb'),
  admin: (): string => gen('adm'),
  mockData: (): string => gen('md'),
};
