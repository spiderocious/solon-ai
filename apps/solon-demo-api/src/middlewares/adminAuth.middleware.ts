import type { Request, Response, NextFunction } from 'express';

import { UnauthorizedError } from '@lib/errors.js';
import { verifyAdminToken } from '@lib/auth/jwt.js';

export const adminAuth = (req: Request, _res: Response, next: NextFunction): void => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) throw new UnauthorizedError('Missing token');

  const token = header.slice(7);
  try {
    const payload = verifyAdminToken(token);
    (req as Request & { admin: typeof payload }).admin = payload;
    next();
  } catch {
    throw new UnauthorizedError('Invalid or expired token');
  }
};
