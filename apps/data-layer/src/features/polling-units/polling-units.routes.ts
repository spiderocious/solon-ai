import { Router, type IRouter } from 'express';

import { asyncHandler } from '@lib/http/asyncHandler.js';
import { ResponseUtil } from '@lib/response.js';

const router: IRouter = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const constituencyId = req.query['constituency_id'];
    return ResponseUtil.ok(res, {
      constituencyId,
      items: [
        { code: 'PU-001', registered: 540, accredited: 312 },
        { code: 'PU-002', registered: 612, accredited: 388 },
      ],
    });
  }),
);

export default router;
