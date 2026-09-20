// End-to-end verification: speaks to the built MCP server over stdio and
// exercises framework_guide, vault_read, and vault_write, then cleans up.
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { existsSync, readFileSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

const VAULT = process.env.OBSIDIAN_VAULT || '/Users/siddhammishra/Documents/siddham';
const TEST_NOTE = join(VAULT, 'Startup', 'Hormozi', 'Outputs', '_harness selftest.md');

const transport = new StdioClientTransport({
  command: 'node',
  args: [new URL('../dist/index.js', import.meta.url).pathname],
});

const client = new Client({ name: 'hormozi-e2e', version: '1.0.0' }, { capabilities: {} });
await client.connect(transport);
console.log('connected');

const fg = await client.callTool({ name: 'framework_guide', arguments: { module: 'voice' } });
const fgText = fg.content.map((c) => c.text).join('');
console.log(`framework_guide(voice): ${fgText.length} chars, has rubric: ${fgText.includes('Directness rubric')}`);

const rl = await client.callTool({ name: 'vault_read', arguments: { mode: 'list', path: 'Startup/Hormozi' } });
console.log(`vault_read(list Startup/Hormozi): ${rl.content.map((c) => c.text).join('').slice(0, 220)}`);

const w = await client.callTool({
  name: 'vault_write',
  arguments: {
    title: '_harness selftest',
    content: 'Temporary end-to-end test note. Safe to delete.',
    subfolder: 'Startup/Hormozi/Outputs',
    overwrite: true,
  },
});
console.log(`vault_write: ${w.content.map((c) => c.text).join('').slice(0, 200)}`);
console.log(`file exists on disk: ${existsSync(TEST_NOTE)}`);
if (existsSync(TEST_NOTE)) {
  const head = readFileSync(TEST_NOTE, 'utf8').slice(0, 120).replace(/\n/g, ' | ');
  console.log(`frontmatter head: ${head}`);
  unlinkSync(TEST_NOTE);
  console.log('test note deleted');
}

const rc = await client.callTool({ name: 'vault_read', arguments: { mode: 'note', path: 'Personal/About Siddham.md' } });
console.log(`vault_read(About Siddham): ${rc.isError ? 'MISSING (ok)' : rc.content.map((c) => c.text).join('').slice(0, 80)}`);

await client.close();
console.log('e2e: PASS');
