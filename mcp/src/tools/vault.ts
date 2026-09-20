import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { listVaultDir, readVaultNote, writeVaultNote } from '../core/vault.js';

export function registerVaultReadTool(server: McpServer, vaultRoot: string): void {
  server.registerTool(
    'vault_read',
    {
      title: 'Vault Read',
      description:
        'Read the Obsidian vault (root: VAULT_ROOT). mode=note reads a single vault-root-relative markdown note (capped at 60000 chars); mode=list lists a directory with file sizes and directories marked. Path traversal outside the vault is rejected.',
      inputSchema: {
        mode: z.enum(['note', 'list']).describe('note = read a file, list = list a directory'),
        path: z.string().describe('Vault-root-relative path (use "" for the vault root in list mode)'),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async ({ mode, path: relPath }) => {
      try {
        if (mode === 'note') {
          const result = readVaultNote(vaultRoot, relPath);
          return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
        }
        const entries = listVaultDir(vaultRoot, relPath);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ mode, relativePath: relPath, count: entries.length, entries }, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: 'text', text: `vault_read failed: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    },
  );
}

export function registerVaultWriteTool(server: McpServer, vaultRoot: string): void {
  server.registerTool(
    'vault_write',
    {
      title: 'Vault Write',
      description:
        'Write a markdown note to the Obsidian vault (root: VAULT_ROOT) with the vault\'s YAML frontmatter conventions (Hormozi category, type, status, tags). Refuses to overwrite an existing note unless overwrite=true. Returns the relative and absolute path written plus byte size.',
      inputSchema: {
        title: z.string().min(1).describe('Note title (also used for the filename)'),
        content: z.string().describe('Markdown body content'),
        subfolder: z.string().optional().describe('Vault-relative subfolder (default Startup/Hormozi/Outputs)'),
        tags: z.array(z.string()).optional().describe('Extra tags (hormozi is always included)'),
        noteType: z.string().optional().describe('Frontmatter "type" value (default output)'),
        overwrite: z.boolean().optional().describe('Allow replacing an existing note (default false)'),
      },
      annotations: {
        readOnlyHint: false,
        destructiveHint: true,
        idempotentHint: false,
        openWorldHint: false,
      },
    },
    async (args) => {
      try {
        const result = writeVaultNote(vaultRoot, args);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: 'text', text: `vault_write failed: ${error instanceof Error ? error.message : String(error)}` }],
        };
      }
    },
  );
}
