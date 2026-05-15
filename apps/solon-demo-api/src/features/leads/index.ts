import type { Express } from 'express';

import leadRoutes from './leads.routes.js';

export const register = (app: Express): void => {
  app.use('/api/v1/leads', leadRoutes);
};
