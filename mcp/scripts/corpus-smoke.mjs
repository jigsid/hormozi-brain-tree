// Smoke test for the corpus_search tool's core functions.
// Run: node --no-warnings scripts/corpus-smoke.mjs   (after `npm run build`)
import { corpusStatus, searchTranscripts, searchEvidence, videoEvidence } from '../dist/core/corpus.js';

let failures = 0;
function check(label, cond, detail) {
  console.log(`  ${cond ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`);
  if (!cond) failures++;
}

console.log('status:', JSON.stringify(corpusStatus()));

console.log('\n=== functional ===');
const t = searchTranscripts('value acceleration', 3);
check('transcript search returns hits', t.hits.length > 0, `${t.hits.length} hits`);
for (const h of t.hits) console.log(`        ${h.videoId}  ${h.title.slice(0, 58)}`);

const e = searchEvidence('950,000', { kind: 'number' });
check('number search finds the $950k figure', e.total > 0, `${e.total} matches`);

const m = searchEvidence('client finance', { kind: 'mechanism', limit: 5 });
check('mechanism search finds CFA across videos', m.total >= 3, `${m.total} matches`);
for (const r of m.rows) console.log(`        ${r.videoId}  ${r.claim}`);

const v = videoEvidence('OQf2Ba-Lp_4');
check('per-video evidence returns rows', v.rows.length > 0, `${v.rows.length} rows`);

const cs = searchEvidence('HVAC', { kind: 'case_study' });
check('case-study search works', cs.total > 0, `${cs.total} matches`);

console.log('\n=== robustness (must never throw, never return broken syntax) ===');
const hostile = [
  'what"s the "deal" with (parens) AND',
  'AND leading',
  'trailing OR',
  'a AND AND b',
  '"""""',
  '((((',
  '*',
  'NEAR(',
  '',
  '   ',
  'café — em-dash “smart quotes”',
  "it's a test's test",
];
for (const q of hostile) {
  const r = searchTranscripts(q, 2);
  check(`no syntax error: ${JSON.stringify(q).slice(0, 40)}`, !r.note, r.note ?? 'ok');
}

console.log('\n=== boolean expressions that SHOULD work ===');
for (const q of ['churn AND guarantee', 'churn OR guarantee']) {
  const r = searchTranscripts(q, 2);
  check(`boolean: ${q}`, !r.note, `${r.hits.length} hits${r.note ? ' | ' + r.note : ''}`);
}

console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : `${failures} CHECK(S) FAILED`}`);
process.exit(failures === 0 ? 0 : 1);
