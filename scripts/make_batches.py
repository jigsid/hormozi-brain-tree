#!/usr/bin/env python
"""Build balanced extraction batches for a tier (greedy, by word count).

Usage:
  python3 scripts/make_batches.py --tier Z --batches 5
  python3 scripts/make_batches.py --tier D --batches 5

Writes <tier>-batch<N>.manifest.json into the external extract dir.
Videos already present in extracted.jsonl are skipped, so re-running is safe.
"""
import argparse, json
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
CORPUS = Path.home() / "youtube-transcripts/hormozi"
OUT = CORPUS / "corpus/extract"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tier", required=True)
    ap.add_argument("--batches", type=int, required=True)
    ap.add_argument("--include-done", action="store_true")
    args = ap.parse_args()

    rows = [json.loads(l) for l in (REPO / "sources/corpus-index.jsonl").read_text().splitlines()]
    if not args.include_done:
        done = {json.loads(l)["video_id"]
                for l in (CORPUS / "corpus/extracted.jsonl").read_text().splitlines()}
        rows = [r for r in rows if r["id"] not in done]

    sel = [r for r in rows if r["tier"] == args.tier]
    if not sel:
        raise SystemExit(f"no videos left in tier {args.tier}")

    # greedy: largest-first into the currently-lightest batch
    sel.sort(key=lambda r: -r["words"])
    buckets = [[] for _ in range(args.batches)]
    for r in sel:
        buckets.sort(key=lambda b: sum(x["words"] for x in b))
        buckets[0].append(r)

    OUT.mkdir(parents=True, exist_ok=True)
    total = sum(r["words"] for r in sel)
    print(f"tier {args.tier}: {len(sel)} videos, {total:,} words -> {args.batches} batches")
    for i, b in enumerate(buckets, 1):
        b.sort(key=lambda r: r["publish_order"])
        w = sum(r["words"] for r in b)
        p = OUT / f"{args.tier.lower()}-batch{i}.manifest.json"
        p.write_text(json.dumps(
            [{"id": r["id"], "title": r["title"], "duration": r["duration"],
              "words": r["words"]} for r in b], indent=1))
        print(f"  batch{i}: {len(b):3} videos  {w:8,} words  -> {p.name}")


if __name__ == "__main__":
    main()
