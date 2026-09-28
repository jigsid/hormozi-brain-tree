#!/usr/bin/env python
"""Leak audit: find transcript-verbatim text in repo files.

Builds an index of every 10-word sequence in the corpus, then scans repo text
files for shared runs. A 10-word run shared with a transcript is strong evidence
of copied phrasing (paraphrase residue or an intentional excerpt).

This exists because the repo-committable artifacts were described as "text-free"
and that claim needs to be checkable, not asserted.

Usage:
  python3 scripts/leak_audit.py            # scan the repo
  python3 scripts/leak_audit.py --top 30   # more rows
"""
import argparse, json, re
from pathlib import Path

CORPUS = Path.home() / "youtube-transcripts/hormozi"
REPO = Path(__file__).resolve().parent.parent
SUFFIXES = (".jsonl", ".json", ".md", ".html", ".py", ".ts", ".tsx", ".mjs", ".txt")
SKIP = (".git/", "node_modules/", ".next/")


def words(s):
    return re.findall(r"[a-z0-9']+", s.lower())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--top", type=int, default=20)
    args = ap.parse_args()

    tp = CORPUS / "transcripts.jsonl"
    if not tp.exists():
        raise SystemExit(f"corpus not found: {tp} (external by design — see sources/README.md)")

    grams = set()
    for line in tp.read_text().splitlines():
        w = words(json.loads(line)["text"])
        for i in range(len(w) - 9):
            grams.add(" ".join(w[i:i + 10]))
    print(f"transcript 10-gram index: {len(grams):,} sequences\n")

    rows = []
    for f in sorted(REPO.rglob("*")):
        s = str(f)
        if not f.is_file() or any(k in s for k in SKIP):
            continue
        if f.suffix not in SUFFIXES:
            continue
        try:
            w = words(f.read_text(errors="ignore"))
        except Exception:
            continue
        hits = sum(1 for i in range(len(w) - 9) if " ".join(w[i:i + 10]) in grams)
        if hits:
            rows.append((hits, len(w), str(f.relative_to(REPO))))

    print(f"=== repo files containing transcript-verbatim 10-word runs ===")
    if not rows:
        print("  none — clean")
    for hits, total, path in sorted(rows, reverse=True)[:args.top]:
        pct = hits / total * 100 if total else 0
        print(f"  {hits:6} runs / {total:7,} words  ({pct:4.1f}%)  {path}")

    print("\nInterpretation: a low percentage means paraphrase residue or short")
    print("excerpts. A high percentage means reproduced transcript text and is a")
    print("licensing problem — move that file out of the repo.")


if __name__ == "__main__":
    main()
