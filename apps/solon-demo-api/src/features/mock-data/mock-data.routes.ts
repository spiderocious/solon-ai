import type { Router as RouterType } from 'express';
import { Router } from 'express';
import { z } from 'zod';

import { asyncHandler } from '@lib/http/asyncHandler.js';
import { NotFoundError } from '@lib/errors.js';
import { ResponseUtil } from '@lib/response.js';

import { MockDataModel } from './mock-data.model.js';

const router: RouterType = Router();

router.get(
  '/:key',
  asyncHandler(async (req, res) => {
    const key = z.string().min(1).parse(req.params.key);
    const doc = await MockDataModel.findOne({ key }).lean();
    if (!doc) throw new NotFoundError(`Mock data key '${key}'`);
    ResponseUtil.ok(res, { key: doc.key, label: doc.label, data: doc.data });
  }),
);

export default router;
