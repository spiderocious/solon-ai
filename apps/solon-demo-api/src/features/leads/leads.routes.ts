import type { Router as RouterType } from 'express';
import { Router } from 'express';
import { z } from 'zod';

import { asyncHandler } from '@lib/http/asyncHandler.js';
import { ResponseUtil } from '@lib/response.js';
import { ids } from '@lib/ids.js';

import { LeadModel } from './lead.model.js';

const router: RouterType = Router();

const CreateLeadSchema = z.object({
  sessionId: z.string().optional(),
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(7).max(20).optional(),
  skipped: z.boolean().default(false),
});

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const body = CreateLeadSchema.parse(req.body);

    const lead = await LeadModel.create({
      leadId: ids.lead(),
      sessionId: body.sessionId,
      name: body.name,
      email: body.email,
      phone: body.phone,
      skipped: body.skipped,
    });

    if (body.sessionId) {
      const { SessionModel } = await import('../sessions/session.model.js');
      await SessionModel.updateOne({ sessionId: body.sessionId }, { $set: { leadId: lead.leadId } });
    }

    ResponseUtil.created(res, { leadId: lead.leadId });
  }),
);

export default router;
