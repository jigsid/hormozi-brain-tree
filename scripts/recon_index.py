#!/usr/bin/env python3
"""Build per-module reconciliation digests from the extraction.

Every record carries `frameworks_used` (e.g. "offers.value-equation"), which maps a
video directly to the module sections it speaks to. This script inverts that index and
emits one compact digest per module prefix, so a reconciliation agent starts from its
exact working set instead of searching the corpus blind.

Output: <corpus>/reconcile/index/<prefix>.json  (+ an _all.json summary)

Runs on python3.9.
"""
import json
import os
import sys
from collections import Counter, defaultdict

CORPUS = os.path.expanduser("~/youtube-transcripts/hormozi/corpus")
SRC = os.path.join(CORPUS, "extracted.jsonl")
OUT = os.path.join(CORPUS, "reconcile", "index")


def load():
    recs = []
    with open(SRC) as fh:
        for line in fh:
            line = line.strip()
            if line:
                recs.append(json.loads(line))
    return recs


def num_text(n):
    """Numbers batches vary: some use 'claim', some 'context'."""
    val = n.get("value") or n.get("figure") or ""
    lab = n.get("claim") or n.get("context") or n.get("label") or ""
    return {"value": val, "label": lab, "quote": (n.get("quote") or "")[:400]}


def digest(rec, fids):
    """Compact view of one record, limited to the framework ids that matched."""
    cs = rec.get("case_study") or None
    if cs:
        cs = {
            "business": cs.get("business"),
            "starting_state": (cs.get("starting_state") or "")[:300],
            "diagnosis": (cs.get("diagnosis") or "")[:300],
            "intervention": (cs.get("intervention") or "")[:300],
            "result": (cs.get("result") or "")[:300],
        }
    return {
        "video_id": rec.get("video_id"),
        "title": rec.get("title"),
        "tier": rec.get("tier"),
        "one_line": rec.get("one_line"),
        "matched_frameworks": sorted(fids),
        "numbers": [num_text(n) for n in (rec.get("numbers") or [])],
        "mechanisms": [
            {"name": m.get("name"), "definition": (m.get("definition") or "")[:300],
             "quote": (m.get("quote") or "")[:400]}
            for m in (rec.get("named_mechanisms") or [])
        ],
        "quotes": [{"text": (q.get("text") or "")[:400]} for q in (rec.get("quotes") or [])][:6],
        "case_study": cs,
        "gaps": rec.get("gaps") or [],
    }


def main():
    recs = load()
    by_prefix = defaultdict(list)
    id_counts = Counter()
    missing = []

    for rec in recs:
        fids = rec.get("frameworks_used") or []
        if not fids:
            missing.append(rec.get("video_id"))
            continue
        grouped = defaultdict(set)
        for f in fids:
            pref = f.split(".")[0]
            grouped[pref].add(f)
            id_counts[f] += 1
        for pref, fset in grouped.items():
            by_prefix[pref].append(digest(rec, fset))

    if not os.path.isdir(OUT):
        os.makedirs(OUT)

    summary = {}
    for pref, items in sorted(by_prefix.items(), key=lambda x: -len(x[1])):
        items.sort(key=lambda d: -len(d["numbers"]))
        path = os.path.join(OUT, pref + ".json")
        with open(path, "w") as fh:
            json.dump(items, fh, indent=1)
        summary[pref] = {
            "videos": len(items),
            "numbers": sum(len(i["numbers"]) for i in items),
            "mechanisms": sum(len(i["mechanisms"]) for i in items),
            "case_studies": sum(1 for i in items if i["case_study"]),
            "path": path,
        }
        print("%-16s %3d videos  %5d numbers  %4d mechanisms  %2d case studies"
              % (pref, len(items), summary[pref]["numbers"],
                 summary[pref]["mechanisms"], summary[pref]["case_studies"]))

    with open(os.path.join(OUT, "_summary.json"), "w") as fh:
        json.dump({"modules": summary,
                   "records": len(recs),
                   "records_without_frameworks_used": missing,
                   "distinct_framework_ids": len(id_counts)}, fh, indent=1)
    print("\n%d records, %d distinct framework ids, %d records with no tag"
          % (len(recs), len(id_counts), len(missing)))
    if missing:
        print("untagged:", missing)


if __name__ == "__main__":
    sys.exit(main())
