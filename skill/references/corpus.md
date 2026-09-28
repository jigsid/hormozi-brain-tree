---
created: 2026-09-28
type:
  - reference
status: active
source: primary - the transcript corpus itself
tags:
  - hormozi
  - corpus
  - provenance
---

# The Corpus

> **This is the primary source.** Everything else in this harness — every framework doc,
> every rule, every number in the modules — is downstream of it. When a summary and the
> corpus disagree, the corpus wins.

## What's in it

Alex Hormozi's YouTube channel, transcribed in full.

| | |
|---|---|
| Videos on the channel | 523 |
| Transcripts captured | 516 |
| Videos with captions disabled | 7 |
| Words | ~2.9M |
| Runtime covered | 219 hours |
| Extraction records | 199 videos structured |
| Case studies | 69 |
| Named mechanisms | 1,853 |
| Numbers with verbatim quotes | 4,224 |
| Argument structures | 39 deep dives, 1,579 ordered steps |

## Where it lives

**Outside this repo, deliberately:**

```
~/youtube-transcripts/hormozi/
  transcripts.jsonl      one record per video: id, title, duration, text
  transcripts/           the same, one .txt per video
  videos.tsv             the channel index, all 523
  corpus/
    corpus.db            SQLite FTS5, 2,428 chunks over 516 transcripts
    chunks.jsonl         ~1,500-word overlapping chunks
    extracted.jsonl      the structured extraction (quote text lives here)
    extract/             per-batch JSONL + manifests
```

**Why external:** the corpus is ~49 MB of someone else's copyrighted speech. The repo
ships indexes *over* it, never the text itself. Run `python3 scripts/leak_audit.py` to
measure what fraction of each repo file appears verbatim in a transcript.

## How to query it

**From Hermes (preferred):** the `corpus_search` MCP tool.

```
corpus_search(query="value acceleration", mode="transcript")   # his own words
corpus_search(query="churn", mode="evidence", kind="number")   # a figure
corpus_search(query="client finance", mode="evidence", kind="mechanism")
corpus_search(query="", mode="video", video_id="OQf2Ba-Lp_4")  # one video, everything
```

**From the terminal:**

```bash
python3 scripts/corpus_search.py "20 to 30% uptake" --limit 5
python3 scripts/corpus_search.py --stats
python3 scripts/corpus_search.py "churn" --tier D
```

## Provenance conventions

Follow these or the harness degrades into the second-hand summaries it was built to
replace:

1. **Every number carries a video id.** If you cannot cite one, do not state the number.
2. **`numbers[].quote` is the audit trail, not `value`.** The value is normalised
   ("about $1,900,000"); the quote is verbatim ("we raised 1.9 million"). They will not
   match as strings — that is expected, and the quote is what was checked.
3. **Quotes come from auto-generated captions.** Numbers are reliable; wording and
   punctuation are not. Caption corruption is preserved and flagged in `gaps`, never
   silently repaired. Real examples: `"598 98"` for $59.98, `"21 like thousand a month"`,
   `"675 an hour"` for $6.75.
4. **Third-party claims are marked.** Tier D in particular contains figures about other
   people (Dave Ramsey describing Ramsey Solutions, a billionaire neighbour, Planet
   Fitness). These carry an explicit `context` marker. Do not attribute them to Hormozi.
5. **Contradictions are recorded, not resolved.** Where he says two different things —
   "$100M net worth at 31" and "at 32" in one video; a title claiming 54.1% against
   in-video 3.44% — both are kept and flagged in `gaps`. Do not average them.

## Which source answers which question

| You need | Go to | Not to |
|---|---|---|
| A specific figure | `corpus_search` mode=evidence, kind=number | the framework docs |
| What he actually said | mode=transcript | the summaries |
| A named concept he uses | mode=evidence, kind=mechanism | a general business glossary |
| A worked example of a business | mode=evidence, kind=case_study | a hypothetical |
| The theory, structured | the framework docs | the corpus (it is unstructured) |
| How he builds an argument over 90 min | `argument_structure` on tier Z records | a summary |

**Books and videos are complementary, not redundant.** The books hold structured theory
he rarely repeats on camera; the videos hold applied practice, teardowns, real numbers
and stories. Neither replaces the other.

## Known limitations

- **Mechanism naming did not converge.** 912 distinct names across 117 tier-D videos with
  only 14 recurring. Cross-video aggregation by mechanism *name* is unreliable; search by
  text instead. Numbers aggregate correctly.
- **7 videos have no transcript** (captions disabled upstream): `OVhNSzFSoZs`,
  `FXzDLLdxsCk`, `FKWEybUIda4`, `aO56wn5sBSA`, `sSEm3qJUh9s`, `A4L3byKcYQg`, `Gh9zWsP8JpI`.
- **Coverage is 199 of 516 videos** structured. The remainder are indexed and searchable
  in full text but not yet extracted.
- **Verification proves a quote exists in its video, not that it exists only there.** A
  quote lifted from the wrong video would pass if the identical phrase appeared in both.
