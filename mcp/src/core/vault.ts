import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';

export const DEFAULT_OUTPUT_SUBFOLDER = 'Startup/Hormozi/Outputs';
export const DEFAULT_NOTE_CAP = 60000;

export const VAULT_CONTEXT_NOTES = [
  'Personal/About Siddham.md',
  'Personal/GTM Stack.md',
  'Startup/Market/portfolio.md',
] as const;

export interface VaultListEntry {
  name: string;
  type: 'file' | 'dir';
  sizeBytes: number | null;
  path: string;
}

export interface VaultNoteResult {
  relativePath: string;
  absolutePath: string;
  content: string;
  bytes: number;
  truncated: boolean;
  cap: number;
}

export interface VaultWriteInput {
  title: string;
  content: string;
  subfolder?: string;
  tags?: string[];
  noteType?: string;
  overwrite?: boolean;
  /** Optional ISO date (YYYY-MM-DD) for deterministic frontmatter; defaults to today. */
  date?: string;
}

export interface VaultWriteResult {
  status: 'created' | 'overwritten';
  relativePath: string;
  absolutePath: string;
  bytes: number;
}

/**
 * Resolve a vault-root-relative path and guarantee it cannot escape the root.
 * `..` traversal and absolute paths are rejected.
 */
export function resolveInsideRoot(root: string, relativePath: string): string {
  const rootAbs = path.resolve(root);
  const trimmed = relativePath.trim();
  if (path.isAbsolute(trimmed)) {
    throw new Error(`Path must be vault-root-relative, not absolute: ${relativePath}`);
  }
  const target = path.resolve(rootAbs, trimmed);
  const rel = path.relative(rootAbs, target);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    throw new Error(`Path escapes the vault root and was rejected: ${relativePath}`);
  }
  return target;
}

function relativeOf(root: string, absolutePath: string): string {
  return path.relative(path.resolve(root), absolutePath);
}

export function readVaultNote(
  vaultRoot: string,
  relativePath: string,
  cap = DEFAULT_NOTE_CAP,
): VaultNoteResult {
  const absolutePath = resolveInsideRoot(vaultRoot, relativePath);
  if (!existsSync(absolutePath)) {
    throw new Error(`Note not found: ${relativePath}`);
  }
  const stat = statSync(absolutePath);
  if (stat.isDirectory()) {
    throw new Error(`Path is a directory, not a note: ${relativePath}. Use mode=list instead.`);
  }
  const raw = readFileSync(absolutePath, 'utf8');
  const truncated = raw.length > cap;
  return {
    relativePath: relativeOf(vaultRoot, absolutePath),
    absolutePath,
    content: truncated ? `${raw.slice(0, cap)}\n\n…[truncated at ${cap} characters]` : raw,
    bytes: stat.size,
    truncated,
    cap,
  };
}

export function listVaultDir(vaultRoot: string, relativePath = ''): VaultListEntry[] {
  const absolutePath = resolveInsideRoot(vaultRoot, relativePath);
  if (!existsSync(absolutePath)) {
    throw new Error(`Directory not found: ${relativePath || '.'}`);
  }
  const stat = statSync(absolutePath);
  if (!stat.isDirectory()) {
    throw new Error(`Not a directory: ${relativePath}. Use mode=note to read a file.`);
  }

  return readdirSync(absolutePath, { withFileTypes: true })
    .filter((entry) => !entry.name.startsWith('.'))
    .map((entry) => {
      const entryAbs = path.join(absolutePath, entry.name);
      const isDir = entry.isDirectory();
      return {
        name: entry.name,
        type: (isDir ? 'dir' : 'file') as 'dir' | 'file',
        sizeBytes: isDir ? null : statSync(entryAbs).size,
        path: relativeOf(vaultRoot, entryAbs),
      };
    })
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
}

export function slugifyTitle(title: string): string {
  const cleaned = title
    .replace(/[/\\:*?"<>|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned.length > 0 ? cleaned : 'Untitled';
}

function sanitizeTag(tag: string): string {
  return tag.replace(/^#+/, '').trim().toLowerCase().replace(/\s+/g, '-');
}

export function buildNoteMarkdown(input: VaultWriteInput): string {
  const title = input.title.trim();
  const noteType = (input.noteType ?? 'output').trim().toLowerCase();
  const date = input.date ?? new Date().toISOString().slice(0, 10);

  const tags = ['hormozi'];
  for (const tag of input.tags ?? []) {
    const clean = sanitizeTag(tag);
    if (clean.length > 0 && !tags.includes(clean)) tags.push(clean);
  }

  const body = input.content.trim();
  const alreadyLinked = /\[\[Hormozi Harness\]\]/.test(body);

  const lines: string[] = [
    '---',
    `created: ${date}`,
    'categories:',
    '  - "[[Hormozi]]"',
    'type:',
    `  - ${noteType}`,
    'status: active',
    'tags:',
    ...tags.map((tag) => `  - ${tag}`),
    '---',
    `# ${title}`,
    '',
    body,
  ];

  if (!alreadyLinked) {
    lines.push('', '---', 'Part of [[Hormozi Harness]] · [[Hormozi]].');
  }

  return `${lines.join('\n')}\n`;
}

export function writeVaultNote(vaultRoot: string, input: VaultWriteInput): VaultWriteResult {
  const subfolder = (input.subfolder ?? DEFAULT_OUTPUT_SUBFOLDER).trim();
  const filename = `${slugifyTitle(input.title)}.md`;
  const relativePath = path.join(subfolder, filename);
  const absolutePath = resolveInsideRoot(vaultRoot, relativePath);

  const existed = existsSync(absolutePath);
  if (existed && input.overwrite !== true) {
    throw new Error(
      `Refusing to overwrite existing note: ${relativeOf(vaultRoot, absolutePath)}. Pass overwrite=true to replace it.`,
    );
  }

  const markdown = buildNoteMarkdown(input);
  mkdirSync(path.dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, markdown, 'utf8');

  return {
    status: existed ? 'overwritten' : 'created',
    relativePath: relativeOf(vaultRoot, absolutePath),
    absolutePath,
    bytes: Buffer.byteLength(markdown, 'utf8'),
  };
}

export interface VaultContextResult {
  content: string;
  notes: Array<{ path: string; found: boolean }>;
}

/** Concatenate background notes for the hormozi://vault/context resource; missing notes are tolerated. */
export function buildVaultContext(
  vaultRoot: string,
  notes: readonly string[] = VAULT_CONTEXT_NOTES,
): VaultContextResult {
  const parts: string[] = [];
  const meta: Array<{ path: string; found: boolean }> = [];

  for (const note of notes) {
    let text: string;
    try {
      text = readVaultNote(vaultRoot, note, 20000).content;
      meta.push({ path: note, found: true });
    } catch {
      text = '_(note not found)_';
      meta.push({ path: note, found: false });
    }
    parts.push(`## ${note}\n\n${text}`);
  }

  return { content: parts.join('\n\n---\n\n'), notes: meta };
}
