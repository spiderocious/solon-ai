import type { Router as RouterType } from 'express';
import { Router } from 'express';
import { z } from 'zod';
import OpenAI from 'openai';

import { asyncHandler } from '@lib/http/asyncHandler.js';
import { AppError } from '@lib/errors.js';
import { ResponseUtil } from '@lib/response.js';
import { env } from '../../env.js';

const router: RouterType = Router();
const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

const MessageGenerateSchema = z.object({
  cluster: z.string().min(1).max(200),
  channel: z.enum(['sms', 'whatsapp', 'voice']),
});

const CHANNEL_CONSTRAINTS: Record<string, string> = {
  sms: 'Keep under 160 characters. No emoji. Plain text only.',
  whatsapp: 'Up to 300 characters. One or two emoji allowed. Conversational tone.',
  voice: 'Write a spoken script for a 30-second voice note. Natural speech cadence.',
};

router.post(
  '/message-generate',
  asyncHandler(async (req, res) => {
    const { cluster, channel } = MessageGenerateSchema.parse(req.body);

    const constraint = CHANNEL_CONSTRAINTS[channel] ?? '';

    const prompt = `You are a political messaging expert for LP candidate Ifeanyi Okonkwo's Senate campaign in Anambra Central (2027 election). Write a persuasive outreach message for the "${cluster}" voter cluster delivered via ${channel}.

Constraints: ${constraint}
Tone: Direct, locally grounded, authentic. Reference concrete policies relevant to this cluster.

Return ONLY the message text, nothing else.`;

    let content: string;
    try {
      const completion = await openai.chat.completions.create({
        model: env.OPENAI_MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
        temperature: 0.8,
      });
      content = completion.choices[0]?.message?.content?.trim() ?? '';
      if (!content) throw new Error('empty response');
    } catch {
      throw new AppError('llm_error', 'Message generation failed. Please try again.', 502);
    }

    const estimatedReach = Math.floor(Math.random() * 30_000) + 15_000;
    const engagementScore = Math.floor(Math.random() * 30) + 60;

    ResponseUtil.ok(res, {
      id: `msg-${Date.now()}`,
      cluster,
      channel,
      content,
      estimatedReach,
      engagementScore,
    });
  }),
);

export default router;
