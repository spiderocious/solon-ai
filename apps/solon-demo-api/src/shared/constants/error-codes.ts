export const ERROR_CODES = [
  'validation_error',
  'unauthorized',
  'forbidden',
  'not_found',
  'conflict',
  'rate_limited',
  'internal',
  'admin_already_exists',
  'admin_setup_disabled',
  'invalid_credentials',
  'mock_key_not_found',
  'mock_key_not_editable',
  'llm_error',
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];
