import OpenAI from 'openai';

import { env } from '../../env.js';
import { AppError } from '@lib/errors.js';
import { MockDataModel } from '../mock-data/mock-data.model.js';

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export interface BaselineData {
  bello_share: number;
  opposition_share: number;
  undecided_share: number;
  turnout_rate: number;
  swing_states: string[];
}

export interface SimulationScenario {
  name: string;
  description: string;
  bello_delta: number;
  turnout_delta: number;
}

export interface SimulationResult {
  scenario: string;
  bello_share: number;
  opposition_share: number;
  undecided_share: number;
  projected_turnout: number;
  swing_state_outlook: string;
  win_probability: number;
  rationale: string;
}

export interface FollowUpResult {
  answer: string;
}

const SCENARIO_PRESETS: Record<string, SimulationScenario> = {
  base: {
    name: 'Base Case',
    description: 'No major shocks, current trajectory',
    bello_delta: 0,
    turnout_delta: 0,
  },
  fuel_subsidy_restored: {
    name: 'Fuel Subsidy Restored',
    description: 'Government reverses fuel subsidy removal 6 months before election',
    bello_delta: 3.2,
    turnout_delta: 4.5,
  },
  northern_coalition: {
    name: 'Northern Coalition Formed',
    description: 'Major northern governors endorse Bello en bloc',
    bello_delta: 5.8,
    turnout_delta: 2.1,
  },
  economic_crisis: {
    name: 'Economic Crisis',
    description: 'Naira collapses 40% in Q2 2027, incumbent blamed',
    bello_delta: 7.1,
    turnout_delta: 6.3,
  },
  opposition_merger: {
    name: 'Opposition Merger',
    description: 'Top two opposition candidates unite on one ticket',
    bello_delta: -6.4,
    turnout_delta: 3.8,
  },
  scandal: {
    name: 'Campaign Scandal',
    description: 'Major corruption allegation breaks against Bello campaign',
    bello_delta: -8.2,
    turnout_delta: -2.5,
  },
};

export const runSimulation = async (scenario: string): Promise<SimulationResult> => {
  const preset = (SCENARIO_PRESETS[scenario] ?? SCENARIO_PRESETS['base'])!;

  const baselineDoc = await MockDataModel.findOne({ key: 'simulator.baseline' }).lean();
  const baseline: BaselineData = (baselineDoc?.data as BaselineData) ?? {
    bello_share: 34.2,
    opposition_share: 41.8,
    undecided_share: 24.0,
    turnout_rate: 38.5,
    swing_states: ['Kano', 'Rivers', 'Oyo', 'Borno', 'Delta'],
  };

  const rawBello = Math.min(95, Math.max(5, baseline.bello_share + preset.bello_delta));
  const rawOpp = Math.min(95, Math.max(5, baseline.opposition_share - preset.bello_delta * 0.6));
  const total = rawBello + rawOpp + baseline.undecided_share;

  const bello_share = Math.round((rawBello / total) * 100 * 10) / 10;
  const opposition_share = Math.round((rawOpp / total) * 100 * 10) / 10;
  const undecided_share = Math.round(100 - bello_share - opposition_share);
  const projected_turnout = Math.min(85, Math.max(20, baseline.turnout_rate + preset.turnout_delta));
  const win_probability = Math.round(Math.min(95, Math.max(5, 35 + (bello_share - opposition_share) * 2.5)));

  const swing_outlook = bello_share > opposition_share + 3
    ? 'Favourable — AFP leading in 3 of 5 swing states'
    : bello_share > opposition_share
    ? 'Competitive — toss-up in most swing states'
    : 'Difficult — opposition holding swing states';

  const prompt = `You are a Nigerian political analyst writing a concise 2-sentence briefing for a presidential campaign team.

Scenario: ${preset.name} — ${preset.description}
Results: Bello ${bello_share}%, Opposition ${opposition_share}%, Undecided ${undecided_share}%
Projected national turnout: ${projected_turnout.toFixed(1)}%
Win probability: ${win_probability}%

Write a 2-sentence analytical rationale for these numbers. Be specific about which voter blocs drive the change and what the campaign must do next. No fluff.`;

  let rationale: string;
  try {
    const completion = await openai.chat.completions.create({
      model: env.OPENAI_MODEL,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
      temperature: 0.7,
    });
    rationale = completion.choices[0]?.message?.content?.trim() ?? 'Analysis unavailable.';
  } catch (err) {
    throw new AppError('llm_error', 'Simulation analysis failed. Please try again.', 502);
  }

  return {
    scenario: preset.name,
    bello_share,
    opposition_share,
    undecided_share,
    projected_turnout: Math.round(projected_turnout * 10) / 10,
    swing_state_outlook: swing_outlook,
    win_probability,
    rationale,
  };
};

const FOLLOWUP_KEYWORDS: Record<string, string> = {
  kano: 'Kano is the single largest prize in the North — 7.8M registered voters. AFP needs 40%+ there to offset losses in the South-South. Current polling shows 29%. Key lever: Emirate influence and NNPP cross-over voters who backed Kwankwaso in 2023.',
  'south-east': 'South-East presents a ceiling problem: IPOB boycott calls historically suppress turnout to 15-20%. Bello\'s Igbo middle name (Adeyemi is Yoruba, but his mother is Enugu-born) gives a soft opening. Target: 25% share on 30% turnout = net positive.',
  south: 'South-South is swing territory worth 6.2M votes. The region follows cash and infrastructure promises. Niger Delta Development Commission funding announcements in Q1 2027 would move 3-4 points.',
  youth: 'Obidient wave in 2023 proves 18-35s will vote if mobilised. AFP needs 200k PVC registration drives targeting NYSC-age Nigerians in Lagos, Abuja, and Kano. Social media spend ROI is 3x TV for this cohort.',
  tv: 'National TV (NTA, Channels, TVC) still drives opinion among 45+ voters in the North and South-West — this is Bello\'s base. Recommend 60% of media budget on broadcast in H2 2027.',
  finance: 'Campaign finance ceiling under INEC regulations is ₦5B for presidential. AFP is currently tracking at ₦3.2B raised. GAP: ₦1.8B. Priority: diaspora remittance fundraising (UK, US, Canada chapters) and mid-tier party donors in Lagos and Abuja.',
};

export const answerFollowUp = async (question: string): Promise<FollowUpResult> => {
  const lower = question.toLowerCase();

  for (const [keyword, canned] of Object.entries(FOLLOWUP_KEYWORDS)) {
    if (lower.includes(keyword)) {
      return { answer: canned };
    }
  }

  const prompt = `You are a senior strategist for Emeka Adeyemi Bello, presidential candidate for AFP (Action For People) in Nigeria's 2027 election. Answer this campaign question in 2-3 sentences, grounded in Nigerian political reality. Be direct and actionable.

Question: ${question}`;

  try {
    const completion = await openai.chat.completions.create({
      model: env.OPENAI_MODEL,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 250,
      temperature: 0.7,
    });
    const answer = completion.choices[0]?.message?.content?.trim() ?? 'Analysis unavailable.';
    return { answer };
  } catch {
    throw new AppError('llm_error', 'Could not process your question. Please try again.', 502);
  }
};
