import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { readFrameworkGuide } from '../core/frameworks.js';
import { MODULE_SELECTORS } from '../core/paths.js';

export function registerFrameworkGuideTool(server: McpServer, harnessRoot: string): void {
  server.registerTool(
    'framework_guide',
    {
      title: 'Framework Guide',
      description:
        'Read the Hormozi Harness framework references. module=all returns an index of every module with its file path and first headings. A specific module returns the full reference (capped) or, when query is provided, only the matching markdown sections (capped). Output includes the source file path.',
      inputSchema: {
        module: z
          .enum(MODULE_SELECTORS as unknown as [string, ...string[]])
          .describe('Framework module to read, or "all" for the module index'),
        query: z.string().optional().describe('Optional keyword; returns only matching sections'),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async ({ module, query }) => {
      try {
        const result = readFrameworkGuide(harnessRoot, module as never, query);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: 'text', text: `framework_guide failed: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    },
  );
}
