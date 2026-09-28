#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { readFileSync } from 'node:fs';
import { z } from 'zod';
import { frameworkIndex } from './core/frameworks.js';
import { MODULES, referencePath, resolveHarnessRoot, resolveVaultRoot } from './core/paths.js';
import { buildVaultContext } from './core/vault.js';
import { registerFrameworkGuideTool } from './tools/frameworks.js';
import { registerCorpusSearchTool } from './tools/corpus.js';
import { registerMoneyModelTool } from './tools/money-model.js';
import { registerOfferAuditTool } from './tools/offer-audit.js';
import { registerValueEquationTool } from './tools/value-equation.js';
import { registerVaultReadTool, registerVaultWriteTool } from './tools/vault.js';

const harnessRoot = resolveHarnessRoot();
const vaultRoot = resolveVaultRoot();

const server = new McpServer({
  name: 'hormozi-harness',
  version: '1.0.0',
});

registerValueEquationTool(server);
registerOfferAuditTool(server);
registerMoneyModelTool(server);
registerFrameworkGuideTool(server, harnessRoot);
registerCorpusSearchTool(server);
registerVaultReadTool(server, vaultRoot);
registerVaultWriteTool(server, vaultRoot);

server.registerResource(
  'hormozi-frameworks',
  'hormozi://frameworks',
  {
    title: 'Hormozi Harness Framework Index',
    description: 'All harness modules with their reference file paths and availability',
    mimeType: 'application/json',
  },
  async (uri) => {
    const entries = frameworkIndex(harnessRoot);
    const payload = {
      harnessRoot,
      modules: MODULES.map((module) => ({
        id: module.id,
        label: module.label,
        description: module.description,
      })),
      files: entries.map((entry) => ({ id: entry.id, filePath: entry.filePath, exists: entry.exists })),
    };
    return {
      contents: [{ uri: uri.href, mimeType: 'application/json', text: JSON.stringify(payload, null, 2) }],
    };
  },
);

server.registerResource(
  'hormozi-persona',
  'hormozi://persona',
  {
    title: 'Hormozi Harness Persona / Voice',
    description: 'The voice.md reference: how the harness should sound',
    mimeType: 'text/markdown',
  },
  async (uri) => {
    const voicePath = referencePath(harnessRoot, 'voice');
    let text: string;
    try {
      text = readFileSync(voicePath, 'utf8');
    } catch {
      text = `_(voice reference not found at ${voicePath}; use a direct, specific, operator tone: concrete numbers, no fluff, challenge weak assumptions.)_`;
    }
    return { contents: [{ uri: uri.href, mimeType: 'text/markdown', text }] };
  },
);

server.registerResource(
  'hormozi-vault-context',
  'hormozi://vault/context',
  {
    title: 'Operator Vault Context',
    description:
      'Concatenated background notes from the vault (Personal/About Siddham.md, Personal/GTM Stack.md, Startup/Market/portfolio.md); missing notes are marked',
    mimeType: 'text/markdown',
  },
  async (uri) => {
    const context = buildVaultContext(vaultRoot);
    return { contents: [{ uri: uri.href, mimeType: 'text/markdown', text: context.content }] };
  },
);

server.registerPrompt(
  'hormozi_session',
  {
    title: 'Hormozi Session',
    description:
      'Run a Hormozi Harness advisory session: load voice + the relevant module, ask at most 3 missing-info questions if needed, produce the artifact, then offer to save it to the vault',
    argsSchema: {
      goal: z.string().optional().describe('Optional session goal (e.g. "audit my offer", "price my program")'),
    },
  },
  ({ goal }) => {
    const goalLine = goal?.trim()
      ? `Goal: ${goal.trim()}`
      : 'Goal: not stated - infer it from the conversation, or ask if it is genuinely unclear.';

    const text = `You are running a Hormozi Harness session.

${goalLine}

Process:
1. Read the persona resource hormozi://persona so your tone matches the operator voice. Do not skip this.
2. Read hormozi://frameworks, choose the relevant module(s) (offers, leads, money-models, sales, scaling-retention, mindset-operator, voice), and pull the relevant playbook with framework_guide (use a query when you only need matching sections).
3. Read hormozi://vault/context for background on the operator. If you already have enough context to produce a strong artifact, SKIP questions entirely. Otherwise ask at most 3 missing-information questions - only the highest-leverage ones, all in one message.
4. Produce the artifact using the harness tools where they fit: value_equation_score for offer strength, offer_audit for copy screens (state that it is a heuristic screen), money_model_math for unit economics and pricing, framework_guide for playbooks and checklists.
5. Show assumptions and numbers explicitly. Prefer concrete fixes over generic advice.

Finish by offering to save the artifact with vault_write (suggest subfolder Startup/Hormozi/Outputs and relevant tags). Only write after the user confirms, and never overwrite without overwrite=true.`;

    return {
      messages: [{ role: 'user', content: { type: 'text', text } }],
    };
  },
);

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Hormozi Harness MCP server running on stdio');
}

process.on('SIGINT', () => {
  console.error('Shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('Shutting down...');
  process.exit(0);
});

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
