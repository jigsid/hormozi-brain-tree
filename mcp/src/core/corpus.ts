/**
 * Corpus access: full-text search over the transcripts, plus structured lookup
 * over the extracted evidence.
 *
 * The corpus lives OUTSIDE this repo at ~/youtube-transcripts/hormozi/ because it
 * holds transcript text (see sources/README.md). Every function here degrades to a
 * clear "not available" result rather than throwing when the corpus is absent, so
 * the MCP server still starts on a machine that only has the repo.
 */
import { DatabaseSync } from 'node:sqlite';
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const CORPUS_ROOT = process.env.HORMOZI_CORPUS_ROOT ?? join(homedir(), 'youtube-transcripts', 'hormozi');
const DB_PATH = join(CORPUS_ROOT, 'corpus', 'corpus.db');
const EXTRACTED_PATH = join(CORPUS_ROOT, 'corpus', 'extracted.jsonl');

export function corpusStatus(): { db: boolean; extracted: boolean; root: string } {
  return { db: existsSync(DB_PATH), extracted: existsSync(EXTRACTED_PATH), root: CORPUS_ROOT };
}

/**
 * FTS5 is fussy: bare punctuation becomes syntax, an unbalanced quote kills the query,
 * and a dangling operator (leading/trailing/adjacent AND-OR-NOT-NEAR) is also a syntax
 * error. So: strip metacharacters, then only pass through as a boolean expression when
 * the operator placement is actually valid; otherwise wrap as a phrase. Arbitrary user
 * input can never reach SQLite as broken syntax.
 */
function ftsQuery(raw: string): string {
  const cleaned = raw
    .replace(/["()^:{}[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) return '""';

  const tokens = cleaned.split(' ');
  const isOp = (t: string) => /^(AND|OR|NOT|NEAR)$/.test(t);
  const hasOp = tokens.some(isOp);
  const danglingOp = isOp(tokens[0]) || isOp(tokens[tokens.length - 1]);
  const adjacentOps = tokens.some((t, i) => i > 0 && isOp(t) && isOp(tokens[i - 1]));

  if (hasOp && !danglingOp && !adjacentOps) return cleaned;
  return `"${cleaned}"`;
}

export interface ChunkHit {
  videoId: string;
  title: string;
  url: string;
  chunkIdx: number;
  startWord: number;
  text: string;
}

export function searchTranscripts(
  query: string,
  limit = 10,
  videoId?: string,
): { available: boolean; hits: ChunkHit[]; note?: string } {
  if (!existsSync(DB_PATH)) {
    return { available: false, hits: [], note: `corpus db not found at ${DB_PATH}` };
  }
  const db = new DatabaseSync(DB_PATH, { readOnly: true });
  try {
    const sql = videoId
      ? `SELECT video_id, title, chunk_idx, start_word, text FROM chunks
         WHERE chunks MATCH ? AND video_id = ? ORDER BY rank LIMIT ?`
      : `SELECT video_id, title, chunk_idx, start_word, text FROM chunks
         WHERE chunks MATCH ? ORDER BY rank LIMIT ?`;
    const params = videoId ? [ftsQuery(query), videoId, limit] : [ftsQuery(query), limit];
    const rows = db.prepare(sql).all(...(params as never[])) as Record<string, unknown>[];
    return {
      available: true,
      hits: rows.map((r) => ({
        videoId: String(r.video_id),
        title: String(r.title),
        url: `https://youtu.be/${r.video_id}`,
        chunkIdx: Number(r.chunk_idx),
        startWord: Number(r.start_word),
        text: String(r.text),
      })),
    };
  } catch (error) {
    return {
      available: true,
      hits: [],
      note: `query failed (FTS5 syntax?): ${error instanceof Error ? error.message : String(error)}`,
    };
  } finally {
    db.close();
  }
}

export interface EvidenceRow {
  videoId: string;
  url: string;
  title: string;
  kind: 'number' | 'mechanism' | 'case_study';
  claim: string;
  value: string | null;
  context: string | null;
}

let evidenceCache: EvidenceRow[] | null = null;

function loadEvidence(): EvidenceRow[] {
  if (evidenceCache) return evidenceCache;
  if (!existsSync(EXTRACTED_PATH)) return (evidenceCache = []);
  const rows: EvidenceRow[] = [];
  for (const line of readFileSync(EXTRACTED_PATH, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    let rec: Record<string, unknown>;
    try {
      rec = JSON.parse(line) as Record<string, unknown>;
    } catch {
      continue;
    }
    const vid = String(rec.video_id ?? '');
    const title = String(rec.title ?? '');
    const push = (kind: EvidenceRow['kind'], claim: unknown, value: unknown, context: unknown) => {
      if (!claim) return;
      rows.push({
        videoId: vid,
        url: `https://youtu.be/${vid}`,
        title,
        kind,
        claim: String(claim),
        value: value == null ? null : String(value),
        context: context == null ? null : String(context),
      });
    };
    for (const n of (rec.numbers as Record<string, unknown>[]) ?? []) {
      push('number', n?.claim, n?.value, n?.context);
    }
    for (const m of (rec.named_mechanisms as Record<string, unknown>[]) ?? []) {
      push('mechanism', m?.name, null, m?.definition);
    }
    const cs = rec.case_study as Record<string, unknown> | null;
    if (cs?.business) push('case_study', cs.business, cs.result, cs.transferable_pattern);
  }
  return (evidenceCache = rows);
}

/** Substring search over the structured evidence. Not ranked — filters, then caps. */
export function searchEvidence(
  query: string,
  opts: { kind?: EvidenceRow['kind']; limit?: number } = {},
): { available: boolean; rows: EvidenceRow[]; total: number; note?: string } {
  if (!existsSync(EXTRACTED_PATH)) {
    return { available: false, rows: [], total: 0, note: `extraction not found at ${EXTRACTED_PATH}` };
  }
  const q = query.trim().toLowerCase();
  const all = loadEvidence();
  const matched = all.filter((r) => {
    if (opts.kind && r.kind !== opts.kind) return false;
    if (!q) return true;
    return (
      r.claim.toLowerCase().includes(q) ||
      (r.value ?? '').toLowerCase().includes(q) ||
      (r.context ?? '').toLowerCase().includes(q)
    );
  });
  return { available: true, rows: matched.slice(0, opts.limit ?? 25), total: matched.length };
}

/** Fetch every extracted record for one video — the full picture for a single source. */
export function videoEvidence(videoId: string): { available: boolean; rows: EvidenceRow[]; note?: string } {
  if (!existsSync(EXTRACTED_PATH)) {
    return { available: false, rows: [], note: `extraction not found at ${EXTRACTED_PATH}` };
  }
  const rows = loadEvidence().filter((r) => r.videoId === videoId);
  return { available: true, rows };
}
