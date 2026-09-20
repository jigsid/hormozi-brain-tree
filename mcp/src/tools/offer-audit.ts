import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { offerAudit } from '../core/offer-audit.js';

export function registerOfferAuditTool(server: McpServer): void {
  server.registerTool(
    'offer_audit',
    {
      title: 'Offer Audit (heuristic screen)',
      description:
        'Deterministic keyword/structural screen of offer copy against 11 offer checks (dream outcome, timeframe, risk reversal, scarcity, urgency, bonuses, price framing, proof, unique mechanism, specificity, CTA). Scores each 0-2 for 22 points total and returns the 3 cheapest fixes. This is a heuristic checklist, NOT an LLM judgment or a substitute for human review.',
      inputSchema: {
        offerText: z.string().min(1).describe('The full offer copy to audit'),
        price: z.number().positive().optional().describe('Optional price for the offer; enables basic price-framing detection'),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async ({ offerText, price }) => {
      try {
        const result = offerAudit(offerText, price);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: 'text', text: `offer_audit failed: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    },
  );
}
