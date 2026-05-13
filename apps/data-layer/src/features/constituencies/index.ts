import type { Express } from 'express';

import constituenciesRoutes from './constituencies.routes.js';

export const register = (app: Express): void => {
  app.use('/internal/v1/constituencies', constituenciesRoutes);
};
