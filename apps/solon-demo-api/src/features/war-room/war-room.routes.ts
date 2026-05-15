import type { Router as RouterType } from 'express';
import { Router } from 'express';
import { z } from 'zod';
import OpenAI from 'openai';

import { asyncHandler } from '@lib/http/asyncHandler.js';
import { AppError } from '@lib/errors.js';
import { ResponseUtil } from '@lib/response.js';
import { MockDataModel } from '../mock-data/mock-data.model.js';
import { env } from '../../env.js';

const router: RouterType = Router();
const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

const CopilotSchema = z.object({
  message: z.string().min(1).max(1000),
});

// GET /api/v1/war-room/live — returns live updates feed from mock data
router.get(
  '/live',
  asyncHandler(async (_req, res) => {
    const doc = await MockDataModel.findOne({ key: 'warroom.tally' }).lean();
    const tally = (doc?.data as Record<string, unknown>) ?? {};

    // Return a synthetic live updates list based on tally mock data
    const updates = [
      {
        id: 'u1',
        type: 'milestone',
        message: '304 agents deployed across Anambra Central.',
        timestamp: new Date(Date.now() - 15 * 60_000).toISOString(),
      },
      {
        id: 'u2',
        type: 'alert',
        message: 'Ogbaru Ward 2: delayed card reader deployment.',
        timestamp: new Date(Date.now() - 30 * 60_000).toISOString(),
        severity: 'medium',
      },
      {
        id: 'u3',
        type: 'tally',
        message: `LP leading with ${typeof tally.lpTotal === 'number' ? tally.lpTotal.toLocaleString() : '40,538'} votes from ${typeof tally.reportedPUs === 'number' ? tally.reportedPUs : 263} PUs.`,
        timestamp: new Date(Date.now() - 5 * 60_000).toISOString(),
      },
    ];

    ResponseUtil.ok(res, updates);
  }),
);

// POST /api/v1/war-room/copilot
router.post(
  '/copilot',
  asyncHandler(async (req, res) => {
    const { message } = CopilotSchema.parse(req.body);

    const tallyDoc = await MockDataModel.findOne({ key: 'warroom.tally' }).lean();
    const tally = (tallyDoc?.data as Record<string, unknown>) ?? {};

    const prompt = `You are the Solon War Room Copilot, providing real-time election day intelligence for LP's campaign in Anambra Central (20 February 2027).

Current data: ${typeof tally.reportedPUs === 'number' ? tally.reportedPUs : 263} of ${typeof tally.totalPUs === 'number' ? tally.totalPUs : 412} PUs reported. LP at approximately 49.8%, leading by ~28 points. 14 open incidents.

Answer in 2-3 sentences, specific and actionable. You refuse voter-suppression queries.

Query: ${message}`;

    let content: string;
    try {
      const completion = await openai.chat.completions.create({
        model: env.OPENAI_MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 250,
        temperature: 0.6,
      });
      content = completion.choices[0]?.message?.content?.trim() ?? 'Analysis unavailable.';
    } catch {
      throw new AppError('llm_error', 'War Room Copilot is temporarily unavailable.', 502);
    }

    ResponseUtil.ok(res, {
      message: {
        role: 'assistant',
        content,
        timestamp: new Date().toISOString(),
      },
    });
  }),
);

export default router;
