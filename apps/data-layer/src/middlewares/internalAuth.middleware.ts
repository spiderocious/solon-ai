import type { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '@lib/errors.js';

import { env } from '../env.js';

// Service-to-service auth. main-backend sends INTERNAL_SHARED_SECRET in the
// `x-internal-secret` header. We compare against the configured value before
// any data-layer route runs. Public clients never reach this service directly.
export const internalAuthMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  const provided = req.header('x-internal-secret');
  if (!provided || provided !== env.INTERNAL_SHARED_SECRET) {
    next(new UnauthorizedError('Invalid internal secret'));
    return;
  }
  next();
};
