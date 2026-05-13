import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { register as registerConstituencies } from '@features/constituencies/index.js';
import { register as registerHealth } from '@features/health/index.js';
import { register as registerPollingUnits } from '@features/polling-units/index.js';
import { errorHandler } from '@middlewares/errorHandler.middleware.js';
import { internalAuthMiddleware } from '@middlewares/internalAuth.middleware.js';

const features = [registerHealth, registerConstituencies, registerPollingUnits];

export const buildApp = (): express.Express => {
  const app = express();
  app.set('trust proxy', 1);

  app.use(helmet());
  app.use(cors({ origin: false }));
  app.use(express.json({ limit: '4mb' }));
  app.use(compression());

  // Every route under /internal/v1 except /health requires the shared secret.
  app.use('/internal/v1', (req, res, next) => {
    if (req.path.startsWith('/health')) return next();
    return internalAuthMiddleware(req, res, next);
  });

  features.forEach((register) => register(app));

  app.use((_req, res) => {
    res.status(404).json({ error: { code: 'not_found', message: 'Route not found' } });
  });

  app.use(errorHandler);
  return app;
};
