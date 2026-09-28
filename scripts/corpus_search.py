#!/usr/bin/env python
"""Query the Hormozi transcript corpus (SQLite FTS5).

The database lives OUTSIDE the repo at ~/youtube-transcripts/hormozi/corpus/corpus.db
because it contains transcript text. See sources/README.md for the contract.

Usage:
  corpus_search.py "value acceleration"
  corpus_search.py "20 to 30% uptake" --limit 3
  corpus_search.py "guarantee" --video j1tA4l7R2c0
  corpus_search.py "close rate" --context 2 --json
  corpus_search.py --stats
"""
import argparse, json, sqlite3, sys
from pathlib import Path

DB = Path.home() / "youtube-transcripts/hormozi/corpus/corpus.db"


def fts_query(q: str) -> str:
    """Turn a plain phrase into a safe FTS5 query."""
    q = q.strip()
    if not q:
        return q
    # quoted phrase if it has spaces and no operators, else AND the terms
    if any(op in q for op in ('"', " OR ", " AND ", " NOT ", "NEAR")):
        return q
    if " " in q:
        return '"%s"' % q.replace('"', "")
    return q


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("query", nargs="?", help="search phrase")
    ap.add_argument("--limit", type=int, default=8)
    ap.add_argument("--video", help="restrict to one video id")
    ap.add_argument("--tier", help="restrict to a tier (A/B/C/D/E/F/Z)")
    ap.add_argument("--context", type=int, default=0,
                    help="extra chunks of context from the same video")
    ap.add_argument("--json", action="store_true", help="emit JSON")
    ap.add_argument("--stats", action="store_true", help="corpus stats and exit")
    args = ap.parse_args()

    if not DB.exists():
        sys.exit(f"corpus db not found: {DB}\nRun scripts/corpus_build.py first.")

    con = sqlite3.connect(DB)

    if args.stats:
        n = con.execute("SELECT count(*) FROM chunks").fetchone()[0]
        v = con.execute("SELECT count(DISTINCT video_id) FROM chunks").fetchone()[0]
        print(f"chunks: {n}\nvideos: {v}\ndb: {DB} ({DB.stat().st_size/1_000_000:.1f} MB)")
        return

    if not args.query:
        sys.exit("need a query (or --stats). See --help.")

    where, params = [], []
    if args.video:
        where.append("video_id = ?"); params.append(args.video)
    if args.tier:
        idx = Path.home() / "youtube-transcripts/hormozi/corpus/index.jsonl"
        ids = [json.loads(l)["id"] for l in idx.read_text().splitlines()
               if json.loads(l)["tier"] == args.tier.upper()]
        if not ids:
            sys.exit(f"no videos in tier {args.tier}")
        where.append("video_id IN (%s)" % ",".join("?" * len(ids)))
        params.extend(ids)

    sql = ("SELECT video_id, title, chunk_idx, start_word, "
           "snippet(chunks, 4, '<<', '>>', '…', 24), rank "
           "FROM chunks WHERE chunks MATCH ? ")
    if where:
        sql += "AND " + " AND ".join(where) + " "
    sql += "ORDER BY rank LIMIT ?"
    params = [fts_query(args.query)] + params + [args.limit]

    try:
        rows = con.execute(sql, params).fetchall()
    except sqlite3.OperationalError as e:
        sys.exit(f"query error: {e}\n(tip: wrap phrases in quotes)")

    if args.json:
        print(json.dumps([{
            "video_id": r[0], "title": r[1], "chunk_idx": r[2],
            "start_word": r[3], "snippet": r[4],
            "url": f"https://youtu.be/{r[0]}",
        } for r in rows], indent=1, ensure_ascii=False))
        return

    if not rows:
        print(f"no hits for {args.query!r}")
        return

    print(f"{len(rows)} hit(s) for {args.query!r}\n")
    for vid, title, ci, sw, snip, _rank in rows:
        print(f"  [{vid}] {title[:66]}")
        print(f"      chunk {ci} · word {sw} · youtu.be/{vid}")
        print(f"      …{snip}…\n")


if __name__ == "__main__":
    main()
