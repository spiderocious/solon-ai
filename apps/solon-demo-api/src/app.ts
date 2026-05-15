import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { register as registerHealth } from '@features/health/index.js';
import { register as registerMockData } from '@features/mock-data/index.js';
import { register as registerSessions } from '@features/sessions/index.js';
import { register as registerLeads } from '@features/leads/index.js';
import { register as registerFeedback } from '@features/feedback/index.js';
import { register as registerAdmin } from '@features/admin/index.js';
import { register as registerSimulator } from '@features/simulator/index.js';
import { errorHandler } from '@middlewares/errorHandler.middleware.js';
import { requestIdMiddleware } from '@middlewares/requestId.middleware.js';
import { requestLogMiddleware } from '@middlewares/requestLog.middleware.js';

import { env } from './env.js';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

const features = [
  registerHealth,
  registerMockData,
  registerSessions,
  registerLeads,
  registerFeedback,
  registerAdmin,
  registerSimulator,
];

export const buildApp = (): express.Express => {
  const app = express();

  app.set('trust proxy', 1);

  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN,
      credentials: true,
    }),
  );

  app.use(limiter);
  app.use(requestIdMiddleware);
  app.use(requestLogMiddleware);

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(compression());

  features.forEach((register) => register(app));

  app.use((_req, res) => {
    res.status(404).json({ error: { code: 'not_found', message: 'Route not found' } });
  });

  app.use(errorHandler);

  return app;
};
