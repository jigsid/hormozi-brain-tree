# sources/

Indexes over the Hormozi transcript corpus. **No transcript text lives in this repo.**

## The external-corpus contract

The full corpus (~2.9M words, 516 videos) lives **outside** this repository at:

```
~/youtube-transcripts/hormozi/
├── transcripts.jsonl      # 516 transcripts: id, title, duration, chars, text
├── videos.tsv             # channel index: 523 rows (id, title, duration)
├── raw/*.vtt              # raw caption files
├── corpus/                # built by scripts/corpus_build.py
│   ├── index.jsonl        # per-video metadata + themes + tier
│   ├── chunks.jsonl       # 2,428 chunks of 1,500 words (200 overlap) — TEXT
│   └── corpus.db          # SQLite FTS5 index — TEXT
└── transcripts/           # 516 individual .txt files
```

**Rule:** anything containing transcript *text* stays external. Only indexes *over* it are committed here. This keeps the repo free of a large body of third-party spoken content while still making the corpus fully queryable and reproducible.

## What ships in this directory

| File | Contains transcript text? | Purpose |
|---|---|---|
| `videos.tsv` | no | channel index — id, title, duration for all 523 videos |
| `corpus-index.jsonl` | no | per-video metadata: words, publish order, themes, extraction tier |
| `quotes.json` | short excerpts | 522 mined quotes with video provenance |
| `evidence-index.jsonl` | **synthesized prose only** | extracted numbers + named mechanisms + case-study summaries with video ids. No quote bodies — but see the caveat below. |

### Caveat: "text-free" is a spectrum, not a binary

`evidence-index.jsonl` and `frameworks/case-studies.md` contain **no quote bodies**, but
they are written *about* the transcripts and carry paraphrase residue — short runs of
wording that also appear in the source. Run the audit rather than trusting the label:

```bash
python3 scripts/leak_audit.py
```

It indexes every 10-word sequence in the corpus and reports what share of each repo
file's words appear verbatim in a transcript. A low percentage is normal paraphrase
residue. A high percentage means reproduced text and belongs outside the repo.

**Current state (measured, not asserted):** the largest offenders are `quotes.json`,
`index.html`, and `EVIDENCE.md`, which are *deliberate short excerpts* — the thing the
licensing decision permits. The synthesized files sit at well under 1%.

## Rebuilding

```bash
# 1. fetch the corpus (external) — see the youtube-content skill
# 2. build the index, chunks, and FTS5 database
python3 scripts/corpus_build.py

# 3. refresh the committed, text-free index
python3 scripts/corpus_build.py --emit-repo-index sources/corpus-index.jsonl

# 4. query it
python3 scripts/corpus_search.py "value acceleration"
python3 scripts/corpus_search.py "20 to 30% uptake" --limit 3
python3 scripts/corpus_search.py "guarantee" --video j1tA4l7R2c0
python3 scripts/corpus_search.py --stats
```

`scripts/corpus_build.py` also owns the theme classifier and tier assignment, so tier
membership is reproducible rather than hand-maintained.

## Extraction tiers

Single-assignment, priority-ordered, used to batch the Phase 1 extraction:

| Tier | Meaning | Videos |
|---|---|---|
| **A** | case-study teardowns — highest value | 39 |
| **B** | sales training | 36 |
| **C** | content / audience | 20 |
| **D** | money / wealth / investing | 117 |
| **E** | acquisition / PE / exits | 2 |
| **Z** | 40 min+ deep dive, unclassified by title | 38 |
| **F** | everything else (lessons, clips) | 264 |

A video also carries a multi-valued `themes` list, so nothing is lost to the
single tier label.

## Provenance rule

Every extracted claim carries either:
- `book` — from `frameworks/*.md`, which are MIT/Apache redrafts of third-party summaries, or
- `video` — from the transcript corpus, with a `video_id`

Never blended silently. Quotes come from auto-generated captions: **numbers are reliable, wording is not.**
