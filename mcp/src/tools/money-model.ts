import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { moneyModelMath } from '../core/money-model.js';

export function registerMoneyModelTool(server: McpServer): void {
  server.registerTool(
    'money_model_math',
    {
      title: 'Money Model Math',
      description:
        'Unit economics for a money model: monthly gross profit per customer, LTGP, LTGP:CAC ratio with verdict, CAC payback in months and billing cycles, 30-day customer-financed acquisition check, annual churn, and price-raise impact. Returns all numbers plus echoed assumptions.',
      inputSchema: {
        cac: z.number().nonnegative().describe('Customer acquisition cost'),
        arpu: z.number().nonnegative().describe('Average revenue per user per month (or per transaction on a stated cycle)'),
        grossMarginPct: z.number().min(0).max(100).describe('Gross margin percentage, 0-100'),
        monthlyChurnPct: z.number().min(0).max(100).describe('Monthly churn percentage, 0-100'),
        first30DayRevenue: z.number().nonnegative().optional().describe('Revenue collected in the first 30 days per customer (enables the CFA check)'),
        currentPrice: z.number().positive().optional().describe('Current price (enables price-raise math with newPrice)'),
        newPrice: z.number().positive().optional().describe('Proposed price (enables price-raise math with currentPrice)'),
        billingCycleWeeks: z.number().positive().optional().describe('Billing cycle length in weeks (default 4)'),
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
        const result = moneyModelMath(args);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: 'text', text: `money_model_math failed: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    },
  );
}
