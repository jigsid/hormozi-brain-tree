#!/usr/bin/env node
// Smoke test for the Hormozi Harness MCP server.
//   1. Imports core logic from dist/core/*.js and asserts deterministic math.
//   2. Spawns the built stdio server, initializes an MCP client, lists tools,
//      asserts exactly the 6 expected tool names, and exits cleanly.
// Prints PASS/FAIL lines; exits non-zero on any failure.

import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

let failures = 0;

function pass(label, detail = '') {
  console.log(`PASS ${label}${detail ? ` - ${detail}` : ''}`);
}

function fail(label, detail = '') {
  failures += 1;
  console.log(`FAIL ${label}${detail ? ` - ${detail}` : ''}`);
}

function check(label, condition, detail = '') {
  if (condition) pass(label, detail);
  else fail(label, detail);
}

function approx(actual, expected, tolerance = 0.05) {
  return typeof actual === 'number' && Math.abs(actual - expected) <= tolerance;
}

function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

async function testCore() {
  let valueEquationScore;
  let moneyModelMath;
  let offerAudit;

  try {
    ({ valueEquationScore } = await import('../dist/core/value-equation.js'));
    ({ moneyModelMath } = await import('../dist/core/money-model.js'));
    ({ offerAudit } = await import('../dist/core/offer-audit.js'));
  } catch (error) {
    fail('core:import', `could not import dist/core/*.js (run npm run build first): ${error.message}`);
    return;
  }
  pass('core:import', 'dist/core/*.js loaded');

  try {
    const result = moneyModelMath({
      cac: 1000,
      arpu: 200,
      grossMarginPct: 80,
      monthlyChurnPct: 10,
    });
    const ratio = result.ltgpToCac.ratio;
    const payback = result.cacPayback.months;
    const ltgp = result.perCustomer.ltgp;

    check(
      'core:money_model_math LTGP:CAC ≈ 1.6',
      approx(ratio, 1.6, 0.02),
      `got ${ratio} (LTGP ${ltgp}, expected 1600)`,
    );
    check(
      'core:money_model_math CAC payback = 6.25 months',
      approx(payback, 6.25, 0.02),
      `got ${payback}`,
    );
    check(
      'core:money_model_math verdict = fragile',
      result.ltgpToCac.verdict === 'fragile',
      `got ${result.ltgpToCac.verdict}`,
    );
  } catch (error) {
    fail('core:money_model_math', error.message);
  }

  try {
    const result = valueEquationScore({ dreamOutcome: 10, likelihood: 10, timeDelay: 2, effort: 2 });
    check(
      'core:value_equation_score (10,10,2,2) band = grand slam',
      result.band === 'grand slam',
      `score ${result.score}, raw ${result.raw}`,
    );
    check(
      'core:value_equation_score bottleneck identified',
      typeof result.bottleneck?.factor === 'string' && result.fixes.length >= 3,
      `${result.bottleneck?.factor} - ${result.fixes.length} fixes`,
    );
  } catch (error) {
    fail('core:value_equation_score', error.message);
  }

  try {
    const sample =
      'Get 10 new clients in 30 days without cold calling. Our proven Client Engine system has helped 500 students add $10k/mo. Includes 12 done-for-you templates, weekly coaching calls, and a 30-day money-back guarantee. Only 20 spots this month - enrollment closes Friday. Book a free strategy call now.';
    const result = offerAudit(sample, 5000);
    check('core:offer_audit total > 0', result.total > 0, `total ${result.total}/22, verdict ${result.verdict}`);
    check('core:offer_audit returns 11 checks', result.checks.length === 11, `got ${result.checks.length}`);
    check('core:offer_audit returns 3 cheapest fixes', result.topFixes.length === 3, `got ${result.topFixes.length}`);
  } catch (error) {
    fail('core:offer_audit', error.message);
  }
}

async function testServer() {
  const serverPath = fileURLToPath(new URL('../dist/index.js', import.meta.url));
  const stderrChunks = [];
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [serverPath],
    stderr: 'pipe',
  });
  transport.stderr?.on('data', (chunk) => stderrChunks.push(chunk.toString()));

  const client = new Client({ name: 'hormozi-harness-smoke', version: '1.0.0' });

  try {
    await withTimeout(client.connect(transport), 15000, 'client.connect');
    pass('mcp:server initialize');

    const { tools } = await client.listTools();
    const names = tools.map((tool) => tool.name).sort();
    const expected = [
      'framework_guide',
      'money_model_math',
      'offer_audit',
      'value_equation_score',
      'vault_read',
      'vault_write',
    ].sort();

    check('mcp:tool count = 6', names.length === 6, `got ${names.length}: ${names.join(', ')}`);
    check(
      'mcp:exact tool names present',
      JSON.stringify(names) === JSON.stringify(expected),
      names.join(', '),
    );

    const resources = await client.listResources();
    const resourceUris = (resources.resources ?? []).map((r) => r.uri);
    check(
      'mcp:resources present',
      ['hormozi://frameworks', 'hormozi://persona', 'hormozi://vault/context'].every((uri) =>
        resourceUris.includes(uri),
      ),
      resourceUris.join(', '),
    );

    const prompts = await client.listPrompts();
    const promptNames = (prompts.prompts ?? []).map((p) => p.name);
    check('mcp:prompt hormozi_session present', promptNames.includes('hormozi_session'), promptNames.join(', '));
  } catch (error) {
    fail('mcp:server', error.message);
    if (stderrChunks.length > 0) {
      console.log('--- server stderr ---');
      console.log(stderrChunks.join('').trim());
      console.log('--- end stderr ---');
    }
  } finally {
    try {
      await client.close();
      pass('mcp:client closed cleanly');
    } catch (error) {
      fail('mcp:close', error.message);
    }
  }
}

console.log('Hormozi Harness MCP smoke test');
console.log('===============================');
await testCore();
console.log('-------------------------------');
await testServer();
console.log('-------------------------------');
if (failures === 0) {
  console.log('SMOKE: PASS');
} else {
  console.log(`SMOKE: FAIL (${failures} failing check${failures === 1 ? '' : 's'})`);
  process.exitCode = 1;
}
