import type { Router as RouterType } from 'express';
import { Router } from 'express';
import { z } from 'zod';

import { asyncHandler } from '@lib/http/asyncHandler.js';
import { ResponseUtil } from '@lib/response.js';
import { ids } from '@lib/ids.js';

import { FeedbackModel } from './feedback.model.js';

const router: RouterType = Router();

const CreateFeedbackSchema = z.object({
  sessionId: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  comment: z.string().max(2000).optional(),
  page: z.string().optional(),
});

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const body = CreateFeedbackSchema.parse(req.body);

    const feedback = await FeedbackModel.create({
      feedbackId: ids.feedback(),
      sessionId: body.sessionId,
      rating: body.rating,
      comment: body.comment,
      page: body.page,
    });

    ResponseUtil.created(res, { feedbackId: feedback.feedbackId });
  }),
);

export default router;
