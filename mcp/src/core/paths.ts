import path from 'node:path';

export const DEFAULT_HARNESS_ROOT = '/Users/siddhammishra/hormozi-harness';
export const DEFAULT_VAULT_ROOT = '/Users/siddhammishra/Documents/siddham';

export type FrameworkModuleId =
  | 'offers'
  | 'leads'
  | 'money-models'
  | 'sales'
  | 'scaling-retention'
  | 'mindset-operator'
  | 'voice';

export interface FrameworkModule {
  id: FrameworkModuleId;
  label: string;
  description: string;
}

export const MODULES: readonly FrameworkModule[] = [
  {
    id: 'offers',
    label: 'Offers',
    description: 'Offer construction: value equation, bonuses, guarantees, naming, price framing',
  },
  {
    id: 'leads',
    label: 'Leads',
    description: 'Lead generation: hooks, ads, outreach, content, lead magnets, lead flow math',
  },
  {
    id: 'money-models',
    label: 'Money Models',
    description: 'Monetization: LTGP, CAC, payback, customer-financed acquisition, pricing, continuity',
  },
  {
    id: 'sales',
    label: 'Sales',
    description: 'Sales: call structure, scripts, objections, follow-up, closing',
  },
  {
    id: 'scaling-retention',
    label: 'Scaling & Retention',
    description: 'Scaling and retention: churn, LTV, systems, hiring, delivery, operations',
  },
  {
    id: 'mindset-operator',
    label: 'Mindset & Operator',
    description: 'Operator mindset: focus, standards, identity, decision-making, execution rhythm',
  },
  {
    id: 'voice',
    label: 'Voice',
    description: 'Voice and persona guidance for how the harness should sound and communicate',
  },
];

export const MODULE_IDS: FrameworkModuleId[] = MODULES.map((m) => m.id);

export type ModuleSelector = FrameworkModuleId | 'all';

export const MODULE_SELECTORS = [...MODULE_IDS, 'all'] as const;

export function isFrameworkModuleId(value: string): value is FrameworkModuleId {
  return (MODULE_IDS as string[]).includes(value);
}

export function getModule(id: FrameworkModuleId): FrameworkModule | undefined {
  return MODULES.find((m) => m.id === id);
}

/**
 * Resolve the harness root. Reads env by default (I/O-free otherwise).
 * HORMOZI_HARNESS overrides the default location.
 */
export function resolveHarnessRoot(env: Record<string, string | undefined> = process.env): string {
  const override = env.HORMOZI_HARNESS?.trim();
  return override && override.length > 0 ? override : DEFAULT_HARNESS_ROOT;
}

/**
 * Resolve the Obsidian vault root. Reads env by default (I/O-free otherwise).
 * OBSIDIAN_VAULT overrides the default location.
 */
export function resolveVaultRoot(env: Record<string, string | undefined> = process.env): string {
  const override = env.OBSIDIAN_VAULT?.trim();
  return override && override.length > 0 ? override : DEFAULT_VAULT_ROOT;
}

export function referencePath(harnessRoot: string, module: FrameworkModuleId): string {
  return path.join(harnessRoot, 'skill', 'references', `${module}.md`);
}
