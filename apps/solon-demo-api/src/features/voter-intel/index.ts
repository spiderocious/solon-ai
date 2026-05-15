import type { Express } from 'express';

import voterIntelRoutes from './voter-intel.routes.js';

export const register = (app: Express): void => {
  app.use('/api/v1/voter-intel', voterIntelRoutes);
};
