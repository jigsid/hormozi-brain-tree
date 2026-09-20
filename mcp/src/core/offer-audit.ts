export interface OfferCheck {
  id: string;
  label: string;
  score: number;
  max: number;
  evidence: string | null;
  fix: string;
}

export interface OfferAuditResult {
  price?: number;
  wordCount: number;
  total: number;
  max: number;
  verdict: string;
  checks: OfferCheck[];
  topFixes: Array<{ id: string; label: string; fix: string }>;
  disclaimer: string;
}

interface CheckDef {
  id: string;
  label: string;
  patterns: RegExp[];
  fix: string;
  kind: 'keyword' | 'numeric';
}

// Heuristic screen only: these are regex/keyword/structural signals, not judgment.
// Each check scores 0, 1, or 2 -> 11 checks -> 22 points total.
const CHECKS: CheckDef[] = [
  {
    id: 'dream_outcome',
    label: 'Dream outcome present',
    kind: 'keyword',
    patterns: [
      /\bdream outcom/i,
      /\bdream\b/i,
      /\btransform/i,
      /\bimagine\b/i,
      /\bfinally\b/i,
      /\bbecome\b/i,
      /\bachieve\b/i,
      /\bdouble\b/i,
      /\btriple\b/i,
      /\b10x\b/i,
      /\bfreedom\b/i,
      /\blife[- ]chang/i,
      /\bmore (clients|customers|revenue|profit|leads|sales)\b/i,
    ],
    fix: 'Name the specific end state the buyer gets: who, what, how much, by when. Replace feature talk with the after picture.',
  },
  {
    id: 'timeframe',
    label: 'Timeframe / speed to result',
    kind: 'keyword',
    patterns: [
      /\b\d+\s*(day|days|week|weeks|month|months|hour|hours|minute|minutes|year|years|d)\b/i,
      /\bin \d+\b/i,
      /\bwithin \d+\b/i,
      /\bfast\b/i,
      /\bquickly\b/i,
      /\bimmediate/i,
      /\binstant/i,
      /\bovernight\b/i,
    ],
    fix: 'Add a credible timeframe to the promise ("in 30 days", "first win in 48 hours") and show the milestone path.',
  },
  {
    id: 'risk_reversal',
    label: 'Risk reversal / guarantee',
    kind: 'keyword',
    patterns: [
      /\bguarantee/i,
      /money[- ]back/i,
      /\brefund/i,
      /risk[- ]free/i,
      /\bno risk\b/i,
      /\bwarranty\b/i,
      /or we (pay|work|do)/i,
      /pay only if/i,
      /cancel any ?time/i,
      /\bsatisfaction\b/i,
    ],
    fix: 'Add a guarantee that flips the risk: conditional ("if you do X and do not get Y, we Z") beats unconditional.',
  },
  {
    id: 'scarcity',
    label: 'Scarcity',
    kind: 'keyword',
    patterns: [
      /\bonly \d+/i,
      /\blimited\b/i,
      /\bspots?\b/i,
      /\bseats?\b/i,
      /\bcapacity\b/i,
      /\bfirst \d+/i,
      /next \d+ (people|clients|customers|students|members)/i,
      /while (supplies|spots|seats)/i,
    ],
    fix: 'Add a real limit (spots, seats, cohort size, capacity) with the number stated and a reason it exists.',
  },
  {
    id: 'urgency',
    label: 'Urgency / deadline',
    kind: 'keyword',
    patterns: [
      /\bdeadline\b/i,
      /\bends?\b/i,
      /\bexpires?\b/i,
      /\btoday\b/i,
      /\btonight\b/i,
      /last chance/i,
      /\bcloses?\b/i,
      /before (midnight|friday|the end|monday)/i,
      /this week only/i,
      /\bhurry\b/i,
    ],
    fix: 'Attach a dated deadline to the offer ("enrollment closes Friday at midnight") instead of an evergreen "act now".',
  },
  {
    id: 'bonuses',
    label: 'Bonuses / value stack',
    kind: 'keyword',
    patterns: [
      /\bbonus(es)?\b/i,
      /\bstack\b/i,
      /comes with/i,
      /\bincludes?\b/i,
      /\bplus\b/i,
      /\badditional\b/i,
      /\bfree\b/i,
      /fast[- ]action/i,
    ],
    fix: 'Stack 3-5 named bonuses, each solving the next objection, with a stated value and a reason it is included.',
  },
  {
    id: 'price_framing',
    label: 'Price anchoring / value framing',
    kind: 'keyword',
    patterns: [
      /\$[\d,]+/,
      /\bvalue\b/i,
      /\bworth\b/i,
      /normally/i,
      /instead of/i,
      /compared to/i,
      /\broi\b/i,
      /return on/i,
      /valued at/i,
      /\binvestment\b/i,
    ],
    fix: 'Anchor price against the cost of the problem and the value of the outcome (dollars, hours, or opportunity cost).',
  },
  {
    id: 'proof',
    label: 'Proof / social proof',
    kind: 'keyword',
    patterns: [
      /testimonial/i,
      /\breviews?\b/i,
      /\bclients?\b/i,
      /\bstudents?\b/i,
      /\bcustomers?\b/i,
      /case stud/i,
      /\bresults\b/i,
      /trusted by/i,
      /featured in/i,
      /\b\d{2,} (clients|students|customers|businesses|people|members)\b/i,
      /as seen/i,
    ],
    fix: 'Add specific proof: named customers, numbers, screenshots, or logos. "500 students" beats "many happy clients".',
  },
  {
    id: 'unique_mechanism',
    label: 'Unique mechanism / named system',
    kind: 'keyword',
    patterns: [
      /\bsystem\b/i,
      /\bmethod\b/i,
      /\bframework\b/i,
      /\bformula\b/i,
      /\bblueprint\b/i,
      /\bprocess\b/i,
      /\bplaybook\b/i,
      /\bengine\b/i,
      /\bproprietary\b/i,
      /\bunique\b/i,
      /patented/i,
      /\b[a-z]+ (system|method|framework|formula|blueprint|process|playbook|engine)\b/i,
    ],
    fix: 'Name the mechanism (e.g. "The Client Engine System") and explain in one line why it gets the result others do not.',
  },
  {
    id: 'specificity',
    label: 'Specificity (numbers)',
    kind: 'numeric',
    patterns: [],
    fix: 'Inject concrete numbers: prices, timeframes, quantities, results, percentages. Specificity signals competence.',
  },
  {
    id: 'cta',
    label: 'Clear CTA / next step',
    kind: 'keyword',
    patterns: [
      /\bcall\b/i,
      /\bbook\b/i,
      /\bapply\b/i,
      /sign ?up/i,
      /\bjoin\b/i,
      /get started/i,
      /\bclick\b/i,
      /\breply\b/i,
      /\bdm\b/i,
      /\bschedule\b/i,
      /\benroll\b/i,
      /\bregister\b/i,
      /buy now/i,
      /\bvisit\b/i,
    ],
    fix: 'End with one unambiguous next step and a single instruction ("Book a call", "Reply YES", "Apply now").',
  },
];

function normalizeWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

function snippetAround(text: string, match: string, radius = 45): string {
  const idx = text.toLowerCase().indexOf(match.toLowerCase());
  if (idx === -1) return normalizeWhitespace(match).slice(0, 90);
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + match.length + radius);
  const prefix = start > 0 ? '…' : '';
  const suffix = end < text.length ? '…' : '';
  return `${prefix}${normalizeWhitespace(text.slice(start, end))}${suffix}`;
}

function matchedPatterns(text: string, patterns: RegExp[]): string[] {
  const hits: string[] = [];
  const seen = new Set<string>();
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[0]) {
      const key = match[0].toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        hits.push(match[0]);
      }
    }
  }
  return hits;
}

function scoreKeywordCheck(text: string, patterns: RegExp[]): { score: number; evidence: string | null } {
  const hits = matchedPatterns(text, patterns);
  const score = hits.length >= 2 ? 2 : hits.length === 1 ? 1 : 0;
  return { score, evidence: hits[0] ? snippetAround(text, hits[0]) : null };
}

function scoreNumericCheck(text: string): { score: number; evidence: string | null } {
  const numbers = text.match(/\d+(?:[.,]\d+)?%?/g) ?? [];
  const distinct = new Set(numbers);
  const score = distinct.size >= 3 ? 2 : distinct.size >= 1 ? 1 : 0;
  const first = [...distinct][0] ?? null;
  return { score, evidence: first ? snippetAround(text, first) : null };
}

function verdictFor(total: number): string {
  if (total >= 18) return `strong (${total}/22)`;
  if (total >= 13) return `good (${total}/22)`;
  if (total >= 8) return `below average (${total}/22)`;
  return `weak (${total}/22)`;
}

export function offerAudit(offerText: string, price?: number): OfferAuditResult {
  const text = offerText ?? '';
  const normalized = normalizeWhitespace(text);

  const checks: OfferCheck[] = CHECKS.map((def) => {
    let result =
      def.kind === 'numeric' ? scoreNumericCheck(text) : scoreKeywordCheck(text, def.patterns);

    // A known price plus any dollar amount in the copy is at least partial price framing.
    if (def.id === 'price_framing' && price !== undefined && /\$/.test(text) && result.score < 1) {
      result = { score: 1, evidence: snippetAround(text, '$') };
    }

    return {
      id: def.id,
      label: def.label,
      score: result.score,
      max: 2,
      evidence: result.evidence,
      fix: def.fix,
    };
  });

  const total = checks.reduce((sum, check) => sum + check.score, 0);

  // "Cheapest fixes" = the lowest-scoring checks first, in canonical order on ties.
  const topFixes = checks
    .map((check, index) => ({ check, index }))
    .sort((a, b) => a.check.score - b.check.score || a.index - b.index)
    .slice(0, 3)
    .map(({ check }) => ({ id: check.id, label: check.label, fix: check.fix }));

  return {
    ...(price !== undefined ? { price } : {}),
    wordCount: normalized.length === 0 ? 0 : normalized.split(' ').length,
    total,
    max: 22,
    verdict: verdictFor(total),
    checks,
    topFixes,
    disclaimer:
      'Heuristic keyword/structural screen only - NOT an LLM judgment and not a substitute for human review. Use it as a checklist to find cheap gaps, then apply judgment.',
  };
}
