#!/usr/bin/env python
"""Merge Tier extraction JSONL batches and run the anti-hallucination audit.

Phase 1 closer. Merges batch files into extracted.jsonl, then independently
verifies every recorded number against the source transcript.

The audit is deliberately independent of the subagents that produced the data:
it re-reads the transcript from disk and string-matches each quote. A subagent
claiming "verified" is not evidence; this is.

Usage:
  merge_extract.py --merge                 # merge batches -> extracted.jsonl
  merge_extract.py --audit                 # verify every number's quote
  merge_extract.py --audit --sample 25     # random sample of N numbers
  merge_extract.py --emit-repo-index PATH  # text-free evidence index for the repo
"""
import argparse, json, random, sys
from pathlib import Path

CORPUS = Path.home() / "youtube-transcripts/hormozi"
EXTRACT = CORPUS / "corpus/extract"
MERGED = CORPUS / "corpus/extracted.jsonl"
REPO = Path(__file__).resolve().parent.parent


def load_transcripts() -> dict[str, str]:
    return {json.loads(l)["id"]: json.loads(l)["text"]
            for l in (CORPUS / "transcripts.jsonl").read_text().splitlines()}


def norm(s: str) -> str:
    """Loose match: captions vary in whitespace and punctuation."""
    import re
    return re.sub(r"[^a-z0-9]", "", (s or "").lower())


def merge() -> list[dict]:
    files = sorted(EXTRACT.glob("*.jsonl"))
    if not files:
        sys.exit(f"no batch files in {EXTRACT}")
    recs, bad = [], 0
    for f in files:
        for i, line in enumerate(f.read_text().splitlines(), 1):
            line = line.strip()
            if not line:
                continue
            try:
                recs.append(json.loads(line))
            except json.JSONDecodeError as e:
                bad += 1
                print(f"  !! {f.name}:{i} unparseable: {e}")
    print(f"merged {len(recs)} records from {len(files)} files ({bad} bad lines)")
    # dedupe on (video_id, case_study_index, one_line)
    seen, uniq = set(), []
    for r in recs:
        k = (r.get("video_id"), r.get("case_study_index"), r.get("one_line"))
        if k in seen:
            continue
        seen.add(k)
        uniq.append(r)
    print(f"deduped -> {len(uniq)} records")
    # Enrich with tier from the repo index so downstream work can filter by it.
    # Subagents were never asked to emit `tier`, so it is absent on every record.
    try:
        idx = REPO / "sources/corpus-index.jsonl"
        tiers = {json.loads(l)["id"]: json.loads(l)["tier"] for l in idx.read_text().splitlines()}
        for r in uniq:
            if not r.get("tier"):
                r["tier"] = tiers.get(r.get("video_id"))
    except Exception as e:
        print(f"  (tier enrichment skipped: {e})")
    MERGED.write_text("".join(json.dumps(r, ensure_ascii=False) + "\n" for r in uniq))
    print(f"wrote {MERGED}")
    return uniq


def all_numbers(rec: dict) -> list[dict]:
    out = list(rec.get("numbers") or [])
    cs = rec.get("case_study") or {}
    for n in (cs.get("numbers") or []):
        out.append(n if isinstance(n, dict) else {"value": str(n)})
    return [n for n in out if isinstance(n, dict)]


def all_quotes(rec: dict) -> list[tuple[str, str]]:
    """Recursively collect every quote-bearing field.

    Returns (path, quote_text). A subagent that verified only numbers[].quote
    would leave argument_structure.steps[].quote and case_study.numbers[].quote
    unchecked — this walks the whole record so nothing is exempt.
    """
    found = []

    def walk(node, path):
        if isinstance(node, dict):
            for k, v in node.items():
                p = f"{path}.{k}" if path else k
                if k in ("quote", "text", "quotes") and isinstance(v, str):
                    found.append((p, v))
                else:
                    walk(v, p)
        elif isinstance(node, list):
            for i, v in enumerate(node):
                walk(v, f"{path}[{i}]")

    walk(rec, "")
    # 'text' only counts under quotes[] — elsewhere it may be prose
    return [(p, q) for p, q in found if q.strip()]


def audit(sample=None):
    """sample: int or None (Python 3.9 compatible signature)."""
    recs = [json.loads(l) for l in MERGED.read_text().splitlines()]
    tr = load_transcripts()
    # Normalize each transcript ONCE. Normalizing per quote is O(quotes x corpus)
    # and makes a 10k-quote audit take hours instead of seconds.
    ntr = {}
    checks = []
    for r in recs:
        vid = r.get("video_id")
        if vid not in ntr:
            ntr[vid] = norm(tr.get(vid, ""))
        for path, q in all_quotes(r):
            if not path.startswith("quotes[") and path.endswith(".text"):
                continue          # only quotes[].text is a quote field
            checks.append((vid, path, q))

    if sample and sample < len(checks):
        checks = random.sample(checks, sample)

    ok = miss = 0
    failures = []
    for vid, path, q in checks:
        nq = norm(q)
        if nq and nq in ntr.get(vid, ""):
            ok += 1
        else:
            miss += 1
            failures.append((vid, path, q[:80]))

    total = ok + miss
    print(f"\n=== AUDIT: {total} quotes checked (all paths, recursive) ===")
    print(f"  verbatim match : {ok}")
    print(f"  NOT FOUND      : {miss}")
    if total:
        print(f"  pass rate      : {ok/total*100:.1f}%")
    for vid, path, q in failures[:25]:
        print(f"    x [{vid}] {path} — {q!r}")
    return ok, total


def emit_repo_index(path: str):
    """Text-free: numbers + named mechanisms + provenance, no quote bodies."""
    recs = [json.loads(l) for l in MERGED.read_text().splitlines()]
    rows = []
    for r in recs:
        for n in all_numbers(r):
            if n.get("value"):
                rows.append({"video_id": r.get("video_id"), "title": r.get("title"),
                             "kind": "number", "claim": n.get("claim"),
                             "value": n.get("value"), "context": n.get("context")})
        for m in (r.get("named_mechanisms") or []):
            if isinstance(m, dict) and m.get("name"):
                rows.append({"video_id": r.get("video_id"), "title": r.get("title"),
                             "kind": "mechanism", "claim": m.get("name"),
                             "value": None, "context": m.get("definition")})
        cs = r.get("case_study") or {}
        if cs.get("business"):
            rows.append({"video_id": r.get("video_id"), "title": r.get("title"),
                         "kind": "case_study", "claim": cs.get("business"),
                         "value": cs.get("result"), "context": cs.get("transferable_pattern")})
    dst = Path(path).expanduser()
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text("".join(json.dumps(x, ensure_ascii=False) + "\n" for x in rows))
    print(f"wrote {dst}: {len(rows)} evidence rows (no quote text)")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--merge", action="store_true")
    ap.add_argument("--audit", action="store_true")
    ap.add_argument("--sample", type=int)
    ap.add_argument("--emit-repo-index", metavar="PATH")
    a = ap.parse_args()
    if a.merge:
        merge()
    if a.audit:
        if not MERGED.exists():
            sys.exit("run --merge first")
        audit(a.sample)
    if a.emit_repo_index:
        emit_repo_index(a.emit_repo_index)
    if not any([a.merge, a.audit, a.emit_repo_index]):
        ap.print_help()


if __name__ == "__main__":
    main()
