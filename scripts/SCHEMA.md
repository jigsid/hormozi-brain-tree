# Extraction schema

One JSON object per video. Written as JSONL, one line per video.

The purpose is to convert a 5,000–100,000 word transcript into structured,
queryable, **verifiable** claims. Anything that cannot be tied to a locatable
quote is dropped, not softened.

## Hard rules

1. **Every number must carry a verbatim quote.** If you cannot find the exact
   sentence, the number does not exist. Never infer, round, or compute a number
   the speaker did not say.
2. **Never paraphrase a quote.** Copy it character-for-character from the
   transcript, including disfluencies. Quotes are marked `auto-caption` because
   they come from machine captions — numbers are reliable, wording is not.
3. **Drop, don't soften.** If a claim is interesting but unquotable, omit it.
   A short accurate record beats a long plausible one.
4. **`null` over invention.** Use `null` for a field with no data. Never fill a
   field to look complete.
5. **Attribute correctly.** Only record what the speaker asserts. If he quotes
   someone else or describes a third party's numbers, say so in `context`.

## Schema

```json
{
  "video_id": "string — 11 char YouTube id",
  "title": "string",
  "one_line": "string — what this video actually teaches, in one sentence",

  "frameworks_used": [
    "dotted id from the existing tree, e.g. offers.value-equation, sales.closer, money.cfa"
  ],

  "numbers": [
    {
      "claim": "what the number measures, in plain words",
      "value": "the number as stated, e.g. '35%', '$2,000/month', '100:1'",
      "context": "the condition it holds under — segment, timeframe, caveat",
      "quote": "verbatim sentence containing the number",
      "quote_type": "auto-caption"
    }
  ],

  "named_mechanisms": [
    {
      "name": "the speaker's own term, e.g. 'Value Acceleration'",
      "definition": "what it means, in his words where possible",
      "quote": "verbatim",
      "quote_type": "auto-caption"
    }
  ],

  "stories": [
    {
      "setup": "the situation",
      "numbers": ["any figures in the story"],
      "lesson": "the point it makes",
      "quote": "verbatim, the most load-bearing sentence",
      "quote_type": "auto-caption"
    }
  ],

  "case_study": {
    "business": "what the business is / does",
    "starting_state": "revenue, margin, headcount, the problem",
    "diagnosis": "what he identified as the actual constraint",
    "intervention": ["the specific changes, in order"],
    "result": "what happened, with figures",
    "numbers": [{"claim": "", "value": "", "quote": ""}],
    "frameworks_applied": ["dotted ids"],
    "transferable_pattern": "the generalisable lesson — what to copy"
  },

  "quotes": [
    {"text": "verbatim", "why": "why this sentence is worth keeping", "quote_type": "auto-caption"}
  ],

  "gaps": [
    "things the written framework summaries get wrong, omit, or state without the numbers he gives here"
  ]
}
```

## Tier A (case studies) — extra requirement

Tier A videos are teardowns: a real business, a diagnosis, an intervention, a
result. For these, `case_study` is **mandatory and must be filled as completely
as the transcript allows**. The `transferable_pattern` field is the point of the
exercise — what a reader should copy.

If a teardown covers multiple businesses or multiple owners, emit one object per
business, sharing the same `video_id`, and add `"case_study_index": 1..n`.

## Output

One file per batch:

```
~/youtube-transcripts/hormozi/corpus/extract/tier-A-<batch>.jsonl
```

Then merge to `~/youtube-transcripts/hormozi/corpus/extracted.jsonl`.

**External only.** This contains quote text and must never be committed.
