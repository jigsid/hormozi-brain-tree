#!/usr/bin/env python
"""Build the Hormozi corpus index, chunk store, and FTS5 search database.

Phase 0 of the Hormozi Brain v2 plan.

Inputs (external, never committed):
  ~/youtube-transcripts/hormozi/transcripts.jsonl
  ~/youtube-transcripts/hormozi/videos.tsv

Outputs:
  EXTERNAL  ~/youtube-transcripts/hormozi/corpus/index.jsonl    (metadata + themes + tier)
  EXTERNAL  ~/youtube-transcripts/hormozi/corpus/chunks.jsonl   (transcript text)
  EXTERNAL  ~/youtube-transcripts/hormozi/corpus/corpus.db      (SQLite FTS5)

The repo-committable derivative is written separately by --emit-repo-index,
which strips all transcript text (see sources/README.md for the contract).

Usage:
  corpus_build.py                # build everything
  corpus_build.py --emit-repo-index ~/Documents/Projects/hormozi-brain-tree/sources/corpus-index.jsonl
"""
import argparse, json, re, sqlite3, sys
from pathlib import Path

CORPUS = Path.home() / "youtube-transcripts/hormozi"
OUT = CORPUS / "corpus"
CHUNK_WORDS = 1500
CHUNK_OVERLAP = 200

# ---------------------------------------------------------------------------
# theme + tier classification
# ---------------------------------------------------------------------------
THEMES = {
    "content": r"content|audience|brand|social media|youtube|followers|posting|personal brand|influencer|algorithm|podcast",
    "sales": r"sales|sell|clos|objection|pitch|negotiat|prospect|deal|setter|commission",
    "money": r"money|wealth|rich|invest|million|billion|net worth|portfolio|stock|crypto|tax|financial freedom",
    "mindset": r"mindset|disciplin|habit|focus|fear|purpose|life|happiness|health|diet|gym|body|relationship|family|death|regret|advice to|lonely|depress",
    "business": r"business|scale|scaling|grow|startup|entrepreneur|company|hire|hiring|team|manage|leader|operat|process|system|franchise",
    "offers": r"offer|pricing|price|market|ad |ads|advertis|lead|funnel|guarantee|customer acquisition|marketing",
    "teardown": r"interview|teardown|stranger|i built|he makes|she makes|saved|failing|broke|helping a|audit|reaction|scale or fail|confronted|blew up|not luck",
    "capital": r"acquisition|private equity|exit|acquire|buy a business|sell my business|valuation|capital|licensing",
}

# extraction priority: first match wins
TIER_RULES = [
    ("A", re.compile(THEMES["teardown"], re.I)),   # case studies - highest value
    ("B", re.compile(THEMES["sales"], re.I)),
    ("C", re.compile(THEMES["content"], re.I)),
    ("D", re.compile(THEMES["money"], re.I)),
    ("E", re.compile(THEMES["capital"], re.I)),
]


def themes_of(title: str) -> list[str]:
    return [k for k, pat in THEMES.items() if re.search(pat, title, re.I)]


def tier_of(title: str, duration: int) -> str:
    for tag, rx in TIER_RULES:
        if rx.search(title):
            return tag
    if duration >= 2400:
        return "Z"          # deep dive, unclassified by title
    return "F"              # default lesson/clip


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--emit-repo-index", metavar="PATH",
                    help="write the text-free repo index here and exit")
    args = ap.parse_args()

    OUT.mkdir(parents=True, exist_ok=True)
    recs = [json.loads(l) for l in (CORPUS / "transcripts.jsonl").read_text().splitlines()]

    # publish order from the channel listing (newest first in videos.tsv)
    order = {}
    for i, line in enumerate((CORPUS / "videos.tsv").read_text().splitlines()):
        p = line.replace("\\t", "\t").split("\t")
        if p and len(p[0].strip()) == 11:
            order[p[0].strip()] = i

    index = []
    for r in recs:
        try:
            dur = int(r["duration"])
        except (KeyError, ValueError, TypeError):
            dur = 0
        title = r["title"]
        index.append({
            "id": r["id"],
            "title": title,
            "duration": dur,
            "words": len(r["text"].split()),
            "publish_order": order.get(r["id"], -1),
            "themes": themes_of(title),
            "tier": tier_of(title, dur),
        })
    index.sort(key=lambda x: x["publish_order"])

    # ---- repo-committable, text-free ----
    if args.emit_repo_index:
        dst = Path(args.emit_repo_index).expanduser()
        dst.parent.mkdir(parents=True, exist_ok=True)
        with dst.open("w") as f:
            for row in index:
                f.write(json.dumps(row, ensure_ascii=False) + "\n")
        print(f"wrote repo index: {dst} ({len(index)} rows, no transcript text)")
        return

    (OUT / "index.jsonl").write_text(
        "".join(json.dumps(r, ensure_ascii=False) + "\n" for r in index))

    # ---- chunks (transcript text; stays external) ----
    nchunks = 0
    with (OUT / "chunks.jsonl").open("w") as f:
        for r in recs:
            words = r["text"].split()
            step = CHUNK_WORDS - CHUNK_OVERLAP
            for ci, start in enumerate(range(0, max(1, len(words)), step)):
                piece = words[start:start + CHUNK_WORDS]
                if not piece:
                    break
                f.write(json.dumps({
                    "video_id": r["id"],
                    "title": r["title"],
                    "chunk_idx": ci,
                    "start_word": start,
                    "text": " ".join(piece),
                }, ensure_ascii=False) + "\n")
                nchunks += 1
                if start + CHUNK_WORDS >= len(words):
                    break

    # ---- FTS5 db ----
    db = OUT / "corpus.db"
    if db.exists():
        db.unlink()
    con = sqlite3.connect(db)
    con.executescript("""
        CREATE VIRTUAL TABLE chunks USING fts5(
            video_id, title, chunk_idx UNINDEXED, start_word UNINDEXED, text,
            tokenize='porter unicode61'
        );
    """)
    rows = []
    with (OUT / "chunks.jsonl").open() as f:
        for line in f:
            c = json.loads(line)
            rows.append((c["video_id"], c["title"], c["chunk_idx"], c["start_word"], c["text"]))
            if len(rows) >= 500:
                con.executemany("INSERT INTO chunks VALUES (?,?,?,?,?)", rows)
                rows = []
    if rows:
        con.executemany("INSERT INTO chunks VALUES (?,?,?,?,?)", rows)
    con.commit()
    con.execute("INSERT INTO chunks(chunks) VALUES ('optimize')")
    con.commit()
    con.close()

    from collections import Counter
    tiers = Counter(r["tier"] for r in index)
    print(f"index.jsonl   {len(index)} videos")
    print(f"chunks.jsonl  {nchunks} chunks ({CHUNK_WORDS}w / {CHUNK_OVERLAP}w overlap)")
    print(f"corpus.db     {db.stat().st_size/1_000_000:.1f} MB")
    print(f"tiers: {dict(sorted(tiers.items()))}")


if __name__ == "__main__":
    main()
