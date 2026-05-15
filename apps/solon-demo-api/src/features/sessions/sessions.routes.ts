import type { Router as RouterType } from 'express';
import { Router } from 'express';
import { z } from 'zod';
import { createHash } from 'node:crypto';

import { asyncHandler } from '@lib/http/asyncHandler.js';
import { NotFoundError } from '@lib/errors.js';
import { ResponseUtil } from '@lib/response.js';
import { ids } from '@lib/ids.js';

import { SessionModel } from './session.model.js';

const router: RouterType = Router();

const CreateSessionSchema = z.object({
  userAgent: z.string().optional(),
});

const PingSchema = z.object({
  page: z.string().min(1),
});

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const body = CreateSessionSchema.parse(req.body);
    const ip = req.ip ?? req.socket.remoteAddress ?? 'unknown';
    const ipHash = createHash('sha256').update(ip).digest('hex').slice(0, 16);

    const session = await SessionModel.create({
      sessionId: ids.session(),
      userAgent: body.userAgent,
      ipHash,
      pageTrail: [],
    });

    ResponseUtil.created(res, { sessionId: session.sessionId });
  }),
);

router.patch(
  '/:sessionId/ping',
  asyncHandler(async (req, res) => {
    const { page } = PingSchema.parse(req.body);
    const session = await SessionModel.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      { $push: { pageTrail: page }, $set: { updatedAt: new Date() } },
      { new: true },
    ).lean();

    if (!session) throw new NotFoundError('Session');
    ResponseUtil.ok(res, { sessionId: session.sessionId });
  }),
);

export default router;
