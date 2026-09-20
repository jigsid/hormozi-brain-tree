import { existsSync, readFileSync } from 'node:fs';
import {
  MODULES,
  referencePath,
  type FrameworkModuleId,
  type ModuleSelector,
} from './paths.js';

export const MATCHED_CAP = 12000;
export const FULL_CAP = 40000;

export interface MarkdownSection {
  heading: string;
  level: number;
  body: string;
}

export interface ModuleIndexEntry {
  id: FrameworkModuleId;
  label: string;
  description: string;
  filePath: string;
  exists: boolean;
}

export interface FrameworkGuideResult {
  module: ModuleSelector;
  sourcePath: string | null;
  mode: 'index' | 'full' | 'matched';
  content: string;
  truncated: boolean;
  matchedSections?: number;
  error?: string;
  notes: string[];
}

export function frameworkIndex(harnessRoot: string): ModuleIndexEntry[] {
  return MODULES.map((module) => {
    const filePath = referencePath(harnessRoot, module.id);
    return {
      id: module.id,
      label: module.label,
      description: module.description,
      filePath,
      exists: existsSync(filePath),
    };
  });
}

export function splitSections(markdown: string): MarkdownSection[] {
  const lines = markdown.split(/\r?\n/);
  const sections: MarkdownSection[] = [];
  const preamble: string[] = [];
  let current: MarkdownSection | null = null;

  const pushCurrent = () => {
    if (current) {
      sections.push({ ...current, body: current.body.trim() });
      current = null;
    }
  };

  for (const line of lines) {
    const match = /^(#{1,6})\s+(.*)$/.exec(line);
    if (match) {
      if (!current && preamble.join('\n').trim().length > 0) {
        sections.push({ heading: '(preamble)', level: 0, body: preamble.join('\n').trim() });
      }
      pushCurrent();
      current = { heading: (match[2] ?? '').trim(), level: (match[1] ?? '#').length, body: '' };
    } else if (current) {
      current.body += `${current.body ? '\n' : ''}${line}`;
    } else {
      preamble.push(line);
    }
  }
  pushCurrent();
  if (sections.length === 0 && preamble.join('\n').trim().length > 0) {
    sections.push({ heading: '(preamble)', level: 0, body: preamble.join('\n').trim() });
  }
  return sections;
}

export function firstHeadings(markdown: string, count = 5): string[] {
  return splitSections(markdown)
    .filter((section) => section.level > 0)
    .slice(0, count)
    .map((section) => `${'#'.repeat(section.level)} ${section.heading}`);
}

function renderSection(section: MarkdownSection): string {
  if (section.level === 0) return section.body;
  return `${'#'.repeat(section.level)} ${section.heading}\n\n${section.body}`.trim();
}

function capContent(content: string, cap: number): { content: string; truncated: boolean } {
  if (content.length <= cap) return { content, truncated: false };
  return {
    content: `${content.slice(0, cap)}\n\n…[truncated at ${cap} characters]`,
    truncated: true,
  };
}

export function matchSections(markdown: string, query: string, cap = MATCHED_CAP): {
  content: string;
  matchedSections: number;
  truncated: boolean;
} {
  const needle = query.trim().toLowerCase();
  const sections = splitSections(markdown);
  const matched = sections.filter((section) =>
    `${section.heading}\n${section.body}`.toLowerCase().includes(needle),
  );

  let content = matched.map(renderSection).join('\n\n---\n\n').trim();
  if (content.length === 0) {
    // Fallback: paragraph-level match when headings do not contain the query.
    const paragraphs = markdown
      .split(/\n{2,}/)
      .filter((paragraph) => paragraph.toLowerCase().includes(needle));
    content = paragraphs.slice(0, 12).join('\n\n').trim();
  }

  const capped = capContent(content, cap);
  return { content: capped.content, matchedSections: matched.length, truncated: capped.truncated };
}

/** Reads harness reference files from disk (I/O). Missing files fail gracefully. */
export function readFrameworkGuide(
  harnessRoot: string,
  module: ModuleSelector,
  query?: string,
): FrameworkGuideResult {
  const notes: string[] = [];

  if (module === 'all') {
    const index = frameworkIndex(harnessRoot);
    const lines: string[] = ['# Hormozi Harness - Framework Modules', ''];
    for (const entry of index) {
      lines.push(`## ${entry.id} - ${entry.label}`);
      lines.push('');
      lines.push(`Path: ${entry.filePath}`);
      lines.push('');
      if (!entry.exists) {
        lines.push('_(reference file not found)_');
      } else {
        const content = readFileSync(entry.filePath, 'utf8');
        const headings = firstHeadings(content, 5);
        if (headings.length === 0) {
          lines.push('_(no headings found)_');
        } else {
          for (const heading of headings) lines.push(`- ${heading}`);
        }
      }
      lines.push('');
    }
    const missing = index.filter((entry) => !entry.exists).map((entry) => entry.id);
    if (missing.length > 0) notes.push(`Missing reference files: ${missing.join(', ')}.`);
    return {
      module,
      sourcePath: null,
      mode: 'index',
      content: lines.join('\n').trim(),
      truncated: false,
      notes,
    };
  }

  const sourcePath = referencePath(harnessRoot, module);
  if (!existsSync(sourcePath)) {
    return {
      module,
      sourcePath,
      mode: query ? 'matched' : 'full',
      content: '',
      truncated: false,
      error: `Reference file not found: ${sourcePath}. The harness skill/references directory may not be populated yet.`,
      notes,
    };
  }

  const raw = readFileSync(sourcePath, 'utf8');

  if (query && query.trim().length > 0) {
    const matched = matchSections(raw, query, MATCHED_CAP);
    if (matched.matchedSections === 0 && matched.content.length === 0) {
      notes.push(`No sections matched query "${query}".`);
    }
    return {
      module,
      sourcePath,
      mode: 'matched',
      content: matched.content,
      truncated: matched.truncated,
      matchedSections: matched.matchedSections,
      notes,
    };
  }

  const full = capContent(raw, FULL_CAP);
  return {
    module,
    sourcePath,
    mode: 'full',
    content: full.content,
    truncated: full.truncated,
    notes,
  };
}
