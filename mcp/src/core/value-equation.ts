export type ValueFactor = 'dreamOutcome' | 'likelihood' | 'timeDelay' | 'effort';

export type ValueBand = 'weak' | 'below average' | 'good' | 'strong' | 'grand slam';

export interface ValueEquationInput {
  /** 1-10, higher is better. */
  dreamOutcome: number;
  /** 1-10, higher is better. */
  likelihood: number;
  /** 1-10, higher is WORSE (perceived time to result). */
  timeDelay: number;
  /** 1-10, higher is WORSE (perceived effort / sacrifice). */
  effort: number;
  context?: string;
}

export interface ValueBottleneck {
  factor: ValueFactor;
  label: string;
  kind: 'weakest driver' | 'biggest drain';
  value: number;
  why: string;
}

export interface ValueEquationResult {
  inputs: {
    dreamOutcome: number;
    likelihood: number;
    timeDelay: number;
    effort: number;
  };
  context?: string;
  raw: number;
  score: number;
  band: ValueBand;
  bottleneck: ValueBottleneck;
  fixes: string[];
  formula: string;
  assumptions: string[];
}

export const VALUE_BANDS: ReadonlyArray<{ min: number; max: number; band: ValueBand }> = [
  { min: 0, max: 25, band: 'weak' },
  { min: 25, max: 45, band: 'below average' },
  { min: 45, max: 65, band: 'good' },
  { min: 65, max: 82, band: 'strong' },
  { min: 82, max: 100.0001, band: 'grand slam' },
];

const FACTOR_LABELS: Record<ValueFactor, string> = {
  dreamOutcome: 'Dream outcome',
  likelihood: 'Perceived likelihood of achievement',
  timeDelay: 'Time delay',
  effort: 'Effort & sacrifice',
};

const FIXES: Record<ValueFactor, string[]> = {
  dreamOutcome: [
    'Rewrite the promise as a specific end state: who gets what, how much, by when (e.g. "$100k/mo agency in 12 months").',
    'Quantify the dream with the customer\'s own words pulled from sales calls, not your marketing language.',
    'Show a before/after case that mirrors the exact avatar you are selling to.',
    'Split one vague promise into 2-3 stacked, measurable outcomes and lead with the biggest one.',
  ],
  likelihood: [
    'Add proof: 3 case studies with numbers from customers who match the avatar.',
    'Attach a conditional guarantee that transfers risk when they do the work.',
    'Show the mechanism (why it works) and the plan (the exact next 3 steps after purchase).',
    'Replace hope language with track-record language: "X of Y clients hit Z" plus screenshots.',
  ],
  timeDelay: [
    'Add a "first win in 24-72 hours" onboarding milestone so results start immediately.',
    'Sell the speed of the mechanism, not just the result (fastest path, done-with-you setup).',
    'Schedule kickoff within 48 hours of purchase and say so in the offer.',
    'Replace "months to results" language with the earliest credible milestone and a dated roadmap.',
  ],
  effort: [
    'Add done-for-you components or templates so the customer does less work.',
    'Replace "you will learn" with "you will receive" deliverables that show up finished.',
    'Bundle accountability/coaching so the customer cannot fail alone.',
    'Kill prerequisites: cut pre-work and setup to minutes, not weeks.',
  ],
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function round(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function bandForScore(score: number): ValueBand {
  for (const entry of VALUE_BANDS) {
    if (score < entry.max) return entry.band;
  }
  return 'grand slam';
}

function pickBottleneck(
  dreamOutcome: number,
  likelihood: number,
  timeDelay: number,
  effort: number,
): ValueBottleneck {
  // Weakness of the two drivers (being far from 10) vs severity of the two drains
  // (being far from 1). Whichever has more room to give is the bottleneck.
  const weakestDriverRoom = Math.max(10 - dreamOutcome, 10 - likelihood);
  const biggestDrainRoom = Math.max(timeDelay, effort) - 1;

  if (weakestDriverRoom > biggestDrainRoom) {
    const factor: ValueFactor =
      dreamOutcome <= likelihood ? 'dreamOutcome' : 'likelihood';
    const value = factor === 'dreamOutcome' ? dreamOutcome : likelihood;
    return {
      factor,
      label: FACTOR_LABELS[factor],
      kind: 'weakest driver',
      value,
      why: `${FACTOR_LABELS[factor]} is the weakest value driver at ${value}/10, which caps how much value the market perceives.`,
    };
  }

  const factor: ValueFactor = timeDelay >= effort ? 'timeDelay' : 'effort';
  const value = factor === 'timeDelay' ? timeDelay : effort;
  return {
    factor,
    label: FACTOR_LABELS[factor],
    kind: 'biggest drain',
    value,
    why: `${FACTOR_LABELS[factor]} is the biggest drain at ${value}/10 (higher is worse), which discounts the promise the most.`,
  };
}

export function valueEquationScore(input: ValueEquationInput): ValueEquationResult {
  const dreamOutcome = clamp(input.dreamOutcome, 1, 10);
  const likelihood = clamp(input.likelihood, 1, 10);
  const timeDelay = clamp(input.timeDelay, 1, 10);
  const effort = clamp(input.effort, 1, 10);

  // raw = (dream * likelihood) / (timeDelay * effort). Range: [1/100, 100].
  const raw = (dreamOutcome * likelihood) / (timeDelay * effort);

  // Bounded 0-100 mapping on a log scale:
  //   score = clamp(((log10(raw) + 2) / 4) * 100, 0, 100)
  // raw = 0.01 -> 0, raw = 1 -> 50, raw = 25 -> ~85, raw = 100 -> 100.
  // Each 10x change in the raw ratio moves the score about 25 points.
  const score = clamp(((Math.log10(raw) + 2) / 4) * 100, 0, 100);

  const bottleneck = pickBottleneck(dreamOutcome, likelihood, timeDelay, effort);

  return {
    inputs: { dreamOutcome, likelihood, timeDelay, effort },
    ...(input.context ? { context: input.context } : {}),
    raw: round(raw, 3),
    score: round(score, 1),
    band: bandForScore(score),
    bottleneck,
    fixes: FIXES[bottleneck.factor].slice(0, 4),
    formula: 'raw = (dreamOutcome * likelihood) / (timeDelay * effort); score = clamp(((log10(raw) + 2) / 4) * 100, 0, 100)',
    assumptions: [
      'Inputs are clamped to the 1-10 range; higher is better for dreamOutcome and likelihood.',
      'timeDelay and effort are inverted: higher means worse (more delay, more effort).',
      'Score is a relative index, not a prediction; use band + bottleneck to choose the next fix.',
    ],
  };
}
