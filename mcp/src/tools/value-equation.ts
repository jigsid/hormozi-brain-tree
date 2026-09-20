import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { valueEquationScore } from '../core/value-equation.js';

export function registerValueEquationTool(server: McpServer): void {
  server.registerTool(
    'value_equation_score',
    {
      title: 'Value Equation Score',
      description:
        'Score an offer concept with Hormozi\'s value equation: raw = (dream × likelihood) / (timeDelay × effort), mapped to a 0-100 index with a band, the binding bottleneck, and concrete fixes targeting it. Higher is better for dreamOutcome/likelihood; higher is worse for timeDelay/effort.',
      inputSchema: {
        dreamOutcome: z.number().min(1).max(10).describe('Strength of the dream outcome, 1-10 (higher is better)'),
        likelihood: z.number().min(1).max(10).describe('Perceived likelihood of achievement, 1-10 (higher is better)'),
        timeDelay: z.number().min(1).max(10).describe('Perceived time to result, 1-10 (higher = worse)'),
        effort: z.number().min(1).max(10).describe('Perceived effort and sacrifice, 1-10 (higher = worse)'),
        context: z.string().optional().describe('Optional context about the offer, avatar, or market'),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async (args) => {
      try {
        const result = valueEquationScore(args);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: 'text', text: `value_equation_score failed: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    },
  );
}
