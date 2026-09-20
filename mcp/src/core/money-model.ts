export type LtgpVerdict = 'broken' | 'fragile' | 'healthy' | 'unknown';

export interface MoneyModelInput {
  /** Customer acquisition cost (currency). */
  cac: number;
  /** Average revenue per user per month (or per transaction on a stated cycle). */
  arpu: number;
  /** Gross margin percentage, 0-100. */
  grossMarginPct: number;
  /** Monthly churn percentage, 0-100. */
  monthlyChurnPct: number;
  /** Revenue collected in the first 30 days per customer (optional). */
  first30DayRevenue?: number;
  /** Existing price (optional, enables price-raise math). */
  currentPrice?: number;
  /** Proposed price (optional, enables price-raise math). */
  newPrice?: number;
  /** Billing cycle length in weeks. Defaults to 4. */
  billingCycleWeeks?: number;
}

export interface MoneyModelResult {
  inputs: MoneyModelInput & { billingCycleWeeks: number };
  perCustomer: {
    grossMarginFraction: number;
    monthlyChurnFraction: number;
    grossProfitPerMonth: number;
    ltgp: number | null;
    annualChurnPct: number;
  };
  ltgpToCac: {
    ratio: number | null;
    verdict: LtgpVerdict;
    note: string;
  };
  cacPayback: {
    months: number | null;
    cycles: number | null;
    days: number | null;
    billingCycleWeeks: number;
    note: string;
  };
  thirtyDayCfa: {
    first30DayRevenue: number;
    cac: number;
    ratio: number | null;
    financed: boolean;
    surplus: number;
    shortfall: number;
    note: string;
  } | null;
  priceIncrease: {
    currentPrice: number;
    newPrice: number;
    revenueDeltaPct: number;
    requiredVolumeRetention: number;
    requiredVolumeRetentionPct: number;
    note: string;
  } | null;
  warnings: string[];
  assumptions: string[];
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function round(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

function ltgpVerdictFor(ratio: number): { verdict: LtgpVerdict; note: string } {
  if (ratio < 1) {
    return {
      verdict: 'broken',
      note: `You spend more to acquire a customer than they are worth (${round(ratio, 2)}:1). Fix unit economics before scaling spend.`,
    };
  }
  if (ratio < 3) {
    return {
      verdict: 'fragile',
      note: `Marginal unit economics (${round(ratio, 2)}:1). Profitable but little room for error - improve LTGP or cut CAC before scaling hard.`,
    };
  }
  return {
    verdict: 'healthy',
    note: `Healthy unit economics (${round(ratio, 2)}:1). Every $1 of CAC returns more than $3 of lifetime gross profit - there is room to scale.`,
  };
}

export function moneyModelMath(input: MoneyModelInput): MoneyModelResult {
  const warnings: string[] = [];

  const cac = input.cac;
  const arpu = input.arpu;
  const billingCycleWeeks = input.billingCycleWeeks ?? 4;

  if (cac <= 0) warnings.push('CAC is zero or negative; ratio and payback are undefined.');
  if (arpu <= 0) warnings.push('ARPU is zero or negative; payback and LTGP are zero or undefined.');
  if (billingCycleWeeks <= 0) warnings.push('billingCycleWeeks must be positive; treated as 4 weeks.');

  const effectiveCycleWeeks = billingCycleWeeks > 0 ? billingCycleWeeks : 4;
  const marginFraction = clamp(input.grossMarginPct, 0, 100) / 100;
  const churnFraction = clamp(input.monthlyChurnPct, 0, 100) / 100;

  if (input.grossMarginPct > 100 || input.grossMarginPct < 0) {
    warnings.push('grossMarginPct was clamped to the 0-100 range.');
  }
  if (input.monthlyChurnPct > 100 || input.monthlyChurnPct < 0) {
    warnings.push('monthlyChurnPct was clamped to the 0-100 range.');
  }
  if (churnFraction === 0) {
    warnings.push('Monthly churn is 0%; LTGP is unbounded (no churn assumption to divide by).');
  }

  // Gross profit per customer per month.
  const grossProfitPerMonthRaw = arpu * marginFraction;
  const grossProfitPerMonth = round(grossProfitPerMonthRaw, 2);

  // LTGP = lifetime gross profit = (ARPUs gross profit per month) / monthly churn fraction.
  const ltgpRaw = churnFraction > 0 ? grossProfitPerMonthRaw / churnFraction : null;
  const ltgp = ltgpRaw === null ? null : round(ltgpRaw, 2);

  let ratioRaw: number | null = null;
  if (ltgpRaw !== null && cac > 0) ratioRaw = ltgpRaw / cac;
  const ratio = ratioRaw === null ? null : round(ratioRaw, 2);
  const ltgpToCac = ratioRaw === null
    ? {
        ratio: null,
        verdict: 'unknown' as LtgpVerdict,
        note: 'Cannot compute LTGP:CAC - need positive CAC and non-zero churn.',
      }
    : { ratio, ...ltgpVerdictFor(ratioRaw) };

  // CAC payback = CAC / monthly gross profit per customer.
  const paybackMonthsRaw =
    grossProfitPerMonthRaw > 0 && cac > 0 ? cac / grossProfitPerMonthRaw : null;
  const daysPerMonth = 30; // documented assumption
  const daysPerCycle = effectiveCycleWeeks * 7;
  const paybackDaysRaw = paybackMonthsRaw === null ? null : paybackMonthsRaw * daysPerMonth;
  const paybackCyclesRaw = paybackDaysRaw === null ? null : paybackDaysRaw / daysPerCycle;

  const cacPayback = {
    months: paybackMonthsRaw === null ? null : round(paybackMonthsRaw, 2),
    cycles: paybackCyclesRaw === null ? null : round(paybackCyclesRaw, 2),
    days: paybackDaysRaw === null ? null : round(paybackDaysRaw, 1),
    billingCycleWeeks: effectiveCycleWeeks,
    note:
      paybackMonthsRaw === null
        ? 'Cannot compute payback - need positive CAC and non-zero gross profit per customer.'
        : `CAC is repaid after ${round(paybackMonthsRaw, 2)} months, i.e. about ${round(paybackCyclesRaw ?? 0, 2)} billing cycles of ${effectiveCycleWeeks} weeks (assuming 30-day months).`,
  };

  // 30-day customer-financed acquisition (CFA) check.
  let thirtyDayCfa: MoneyModelResult['thirtyDayCfa'] = null;
  if (input.first30DayRevenue !== undefined) {
    const first = input.first30DayRevenue;
    const surplus = Math.max(0, round(first - cac, 2));
    const shortfall = Math.max(0, round(cac - first, 2));
    const financed = first >= cac;
    thirtyDayCfa = {
      first30DayRevenue: round(first, 2),
      cac: round(cac, 2),
      ratio: cac > 0 ? round(first / cac, 2) : null,
      financed,
      surplus,
      shortfall,
      note: financed
        ? `Customer-financed acquisition: first-30-day revenue covers CAC with $${surplus} to spare per customer. Growth funds itself.`
        : `Not customer-financed: first-30-day revenue leaves a $${shortfall} shortfall per customer. Growth consumes cash - raise front-end revenue, deposits, or reduce CAC.`,
    };
  }

  // Price raise impact.
  let priceIncrease: MoneyModelResult['priceIncrease'] = null;
  if (input.currentPrice !== undefined && input.newPrice !== undefined) {
    if (input.currentPrice > 0 && input.newPrice > 0) {
      const revenueDeltaPctRaw =
        ((input.newPrice - input.currentPrice) / input.currentPrice) * 100;
      const requiredVolumeRetentionRaw = input.currentPrice / input.newPrice;
      priceIncrease = {
        currentPrice: round(input.currentPrice, 2),
        newPrice: round(input.newPrice, 2),
        revenueDeltaPct: round(revenueDeltaPctRaw, 2),
        requiredVolumeRetention: round(requiredVolumeRetentionRaw, 4),
        requiredVolumeRetentionPct: round(requiredVolumeRetentionRaw * 100, 2),
        note: `Raising price from ${round(input.currentPrice, 2)} to ${round(input.newPrice, 2)} is +${round(revenueDeltaPctRaw, 2)}% revenue per unit at equal volume. You can lose up to ${round((1 - requiredVolumeRetentionRaw) * 100, 2)}% of units (keeping ${round(requiredVolumeRetentionRaw * 100, 2)}%) and still hold revenue flat.`,
      };
    } else {
      warnings.push('currentPrice and newPrice must both be positive to compute price-raise impact.');
    }
  }

  const annualChurnPctRaw = (1 - (1 - churnFraction) ** 12) * 100;

  return {
    inputs: { ...input, billingCycleWeeks: effectiveCycleWeeks },
    perCustomer: {
      grossMarginFraction: round(marginFraction, 4),
      monthlyChurnFraction: round(churnFraction, 4),
      grossProfitPerMonth,
      ltgp,
      annualChurnPct: round(annualChurnPctRaw, 2),
    },
    ltgpToCac,
    cacPayback,
    thirtyDayCfa,
    priceIncrease,
    warnings,
    assumptions: [
      'ARPUs are treated as gross revenue per customer per month on a consistent basis.',
      'Gross profit per month = arpu × grossMarginPct/100.',
      'LTGP = (arpu × grossMarginPct/100) ÷ monthly churn fraction (churn as a fraction, e.g. 10% = 0.10).',
      'CAC payback months = cac ÷ monthly gross profit per customer.',
      `Billing cycles use ${effectiveCycleWeeks}-week cycles and a 30-day month (1 cycle = ${daysPerCycle} days).`,
      'Annual churn = 1 − (1 − monthly churn)^12.',
      'Required volume retention after a price raise = oldPrice ÷ newPrice (revenue-neutral volume).',
    ],
  };
}
