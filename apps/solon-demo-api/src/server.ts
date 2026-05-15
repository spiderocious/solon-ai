import { createServer, type Server } from 'node:http';

import { logger } from '@lib/logger.js';

import { buildApp } from './app.js';
import { connectDb, disconnectDb } from './lib/db.js';
import { env } from './env.js';

const startHttpApp = async (): Promise<Server> => {
  await connectDb();

  const app = buildApp();
  const server = createServer(app);
  server.listen(env.PORT, () => {
    logger.info({ port: env.PORT, env: env.NODE_ENV }, 'solon-demo-api listening');
  });
  return server;
};

const serverPromise = startHttpApp();

const shutdown = async (signal: string): Promise<void> => {
  logger.info({ signal }, 'shutting down gracefully');
  const server = await serverPromise;
  await new Promise<void>((resolve) => server.close(() => resolve()));
  await disconnectDb();
  process.exit(0);
};

process.on('SIGTERM', () => {
  void shutdown('SIGTERM');
});
process.on('SIGINT', () => {
  void shutdown('SIGINT');
});
