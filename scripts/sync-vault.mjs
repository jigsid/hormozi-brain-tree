#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const VAULT = process.env.OBSIDIAN_VAULT || '/Users/siddhammishra/Documents/siddham';
const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const REFS = join(ROOT, 'skill', 'references');
const OUT = join(VAULT, 'Startup', 'Hormozi', 'Frameworks');

const MODULES = {
  'voice.md': 'Voice & Persona',
  'offers.md': 'Offers',
  'leads.md': 'Leads',
  'money-models.md': 'Money Models',
  'sales.md': 'Sales',
  'scaling-retention.md': 'Scaling & Retention',
  'mindset-operator.md': 'Mindset & Operator',
};

const today = new Date().toISOString().slice(0, 10);
mkdirSync(OUT, { recursive: true });
mkdirSync(join(VAULT, 'Startup', 'Hormozi', 'Outputs'), { recursive: true });
writeFileSync(join(VAULT, 'Startup', 'Hormozi', 'Outputs', '.keep'), '');

for (const [file, title] of Object.entries(MODULES)) {
  const src = join(REFS, file);
  if (!existsSync(src)) {
    console.warn(`skip (missing): ${file}`);
    continue;
  }
  let body = readFileSync(src, 'utf8');
  body = body.replace(/^# .*\n/, '');
  const footer = '---\nPart of [[Hormozi Harness]].';
  if (!body.trimEnd().endsWith(footer)) {
    body = body.trimEnd() + '\n\n' + footer + '\n';
  }
  const fm = [
    '---',
    `created: ${today}`,
    'categories:',
    '  - "[[Skills]]"',
    '  - "[[GTM]]"',
    'type:',
    '  - reference',
    'status: active',
    `source: hormozi-harness/skill/references/${file}`,
    'tags:',
    '  - hormozi',
    '  - framework',
    '---',
    '',
    `# ${title}`,
    '',
  ].join('\n');
  const dest = join(OUT, `${title}.md`);
  writeFileSync(dest, fm + body.trimStart() + '\n');
  console.log(`synced: ${title}  <-  ${file}`);
}
console.log('done.');
