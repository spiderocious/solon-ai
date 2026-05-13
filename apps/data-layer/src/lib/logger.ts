import pino, { type Logger, type LoggerOptions } from 'pino';

import { env } from '../env.js';

const transport: LoggerOptions['transport'] =
  env.NODE_ENV !== 'production'
    ? {
        target: 'pino-pretty',
        options: { colorize: true, singleLine: true, translateTime: 'HH:MM:ss.l' },
      }
    : undefined;

export const logger: Logger = pino({
  level: env.LOG_LEVEL,
  base: { service: 'solon-data-layer', env: env.NODE_ENV },
  ...(transport !== undefined ? { transport } : {}),
});
