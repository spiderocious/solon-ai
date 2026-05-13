import { Router, type IRouter } from 'express';
import { z } from 'zod';

import { asyncHandler } from '@lib/http/asyncHandler.js';
import { ResponseUtil } from '@lib/response.js';

const router: IRouter = Router();

const ListQuery = z.object({
  state: z.string().optional(),
  office: z.enum(['president', 'governor', 'senate', 'house_of_reps', 'state_assembly']).optional(),
});

// Stub fixture. Replace with a real repo backed by the constituencies table
// (polling-unit-level historical data lives here too, behind /polling-units).
const FIXTURES = [
  { id: 'con_anambra_central_senate', name: 'Anambra Central', state: 'anambra', office: 'senate' },
  { id: 'con_ikorodu_hor', name: 'Ikorodu', state: 'lagos', office: 'house_of_reps' },
];

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const q = ListQuery.parse(req.query);
    const items = FIXTURES.filter(
      (c) => (!q.state || c.state === q.state) && (!q.office || c.office === q.office),
    );
    return ResponseUtil.ok(res, { items });
  }),
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params['id'];
    const item = FIXTURES.find((c) => c.id === id);
    if (!item) {
      return ResponseUtil.error(res, 404, { code: 'not_found', message: 'Constituency not found' });
    }
    return ResponseUtil.ok(res, item);
  }),
);

export default router;
