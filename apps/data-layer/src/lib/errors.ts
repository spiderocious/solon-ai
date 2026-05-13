import type { ErrorCode } from '@shared/constants/error-codes.js';
import { HTTP_STATUS } from '@shared/constants/http-status.js';

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
    public readonly status = 400,
    public readonly fieldErrors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super('unauthorized', message, HTTP_STATUS.UNAUTHORIZED);
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super('not_found', `${resource} not found`, HTTP_STATUS.NOT_FOUND);
  }
}
