import type { Router as RouterType } from 'express';
import { Router } from 'express';
import { z } from 'zod';

import { asyncHandler } from '@lib/http/asyncHandler.js';
import { ResponseUtil } from '@lib/response.js';

import { runSimulation, answerFollowUp, answerCopilot } from './simulator.service.js';

const router: RouterType = Router();

const VALID_SCENARIOS = [
  'base',
  'fuel_subsidy_restored',
  'northern_coalition',
  'economic_crisis',
  'opposition_merger',
  'scandal',
] as const;

const RunSchema = z.object({
  scenario: z.enum(VALID_SCENARIOS),
});

const FollowUpSchema = z.object({
  question: z.string().min(3).max(500),
  context: z.object({ scenario: z.string().optional() }).optional(),
});

const CopilotSchema = z.object({
  message: z.string().min(1).max(1000),
});

router.post(
  '/run',
  asyncHandler(async (req, res) => {
    const { scenario } = RunSchema.parse(req.body);
    const result = await runSimulation(scenario);
    ResponseUtil.ok(res, result);
  }),
);

router.post(
  '/followup',
  asyncHandler(async (req, res) => {
    const { question } = FollowUpSchema.parse(req.body);
    const result = await answerFollowUp(question);
    ResponseUtil.ok(res, result);
  }),
);

router.post(
  '/copilot',
  asyncHandler(async (req, res) => {
    const { message } = CopilotSchema.parse(req.body);
    const result = await answerCopilot(message);
    ResponseUtil.ok(res, result);
  }),
);

export default router;
