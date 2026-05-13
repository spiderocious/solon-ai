import type { Express } from 'express';

import pollingUnitsRoutes from './polling-units.routes.js';

export const register = (app: Express): void => {
  app.use('/internal/v1/polling-units', pollingUnitsRoutes);
};
