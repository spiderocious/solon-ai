import type { Express } from 'express';

import mockDataRoutes from './mock-data.routes.js';

export const register = (app: Express): void => {
  app.use('/api/v1/mock', mockDataRoutes);
};
