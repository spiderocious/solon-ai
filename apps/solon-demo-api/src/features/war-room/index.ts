import type { Express } from 'express';

import warRoomRoutes from './war-room.routes.js';

export const register = (app: Express): void => {
  app.use('/api/v1/war-room', warRoomRoutes);
};
