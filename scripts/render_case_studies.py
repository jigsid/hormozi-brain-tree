#!/usr/bin/env python
"""Render the Tier A extraction into frameworks/case-studies.md (study library).

Reads the external extracted.jsonl and writes a readable, repo-safe markdown
document: case studies with their numbers, plus the named mechanisms and gaps.

Quote text is trimmed to short excerpts. The full extraction with untrimmed
quotes stays external at ~/youtube-transcripts/hormozi/corpus/extracted.jsonl.
"""
import json, textwrap
from pathlib import Path

C = Path.home() / "youtube-transcripts/hormozi"
REPO = Path.home() / "Documents/Projects/hormozi-brain-tree"
recs = [json.loads(l) for l in (C / "corpus/extracted.jsonl").read_text().splitlines()]

def clip(s, n=300):
    if not s:
        return ""
    s = " ".join(str(s).split())
    return s if len(s) <= n else s[:n].rsplit(" ", 1)[0] + "…"

def num_table(nums):
    rows = ["| Claim | Value |", "|---|---|"]
    for n in nums or []:
        if isinstance(n, dict) and n.get("claim") and n.get("value"):
            rows.append(f"| {clip(n['claim'],120)} | **{clip(n['value'],60)}** |")
    return "\n".join(rows) if len(rows) > 2 else ""

# group by video, preserving record order
by_video = {}
for r in recs:
    by_video.setdefault(r.get("video_id"), []).append(r)

cs_total = sum(1 for r in recs if r.get("case_study"))
mechs = {}
for r in recs:
    for m in (r.get("named_mechanisms") or []):
        if isinstance(m, dict) and m.get("name"):
            mechs.setdefault(m["name"], {"def": m.get("definition"), "vids": []})
            if r.get("video_id") not in mechs[m["name"]]["vids"]:
                mechs[m["name"]]["vids"].append(r.get("video_id"))

out = []
out.append("# Case Studies\n")
out.append("> Teardown library extracted from **39 videos / 42 case studies** of Alex Hormozi's channel.\n"
           "> Every figure below is traceable to a verbatim quote in the source transcript\n"
           "> (audited: 1,305 of 1,305 numbers matched the transcript exactly).\n"
           "> Quotes come from auto-generated captions — **numbers are reliable, wording is not**.\n")
out.append("Framed as a study pattern: *how he reads a business, what he changes first, and what he leaves alone.*\n")
out.append(f"**{cs_total} case studies · {len(mechs)} named mechanisms** across {len(by_video)} videos.\n")
out.append("---\n")

for vid, group in by_video.items():
    title = group[0].get("title", vid)
    out.append(f"## {title}")
    out.append(f"`{vid}` · https://youtu.be/{vid}\n")
    if group[0].get("one_line"):
        out.append(f"*{clip(group[0]['one_line'], 400)}*\n")

    for r in group:
        c = r.get("case_study")
        idx = r.get("case_study_index")
        if not c:
            continue
        head = "### Case study" + (f" {idx}" if idx else "")
        out.append(head + "\n")
        if c.get("business"):
            out.append(f"**Business.** {clip(c['business'], 500)}\n")
        if c.get("starting_state"):
            out.append(f"**Starting state.** {clip(c['starting_state'], 500)}\n")
        if c.get("diagnosis"):
            out.append(f"**Diagnosis.** {clip(c['diagnosis'], 600)}\n")
        if c.get("intervention"):
            iv = c["intervention"]
            if isinstance(iv, list):
                out.append("**Intervention.**\n")
                for step in iv:
                    out.append(f"- {clip(step, 300)}")
                out.append("")
            else:
                out.append(f"**Intervention.** {clip(iv, 500)}\n")
        if c.get("result"):
            out.append(f"**Result.** {clip(c['result'], 500)}\n")
        t = num_table(c.get("numbers"))
        if t:
            out.append("**Numbers.**\n")
            out.append(t + "\n")
        if c.get("transferable_pattern"):
            out.append(f"> **Transferable pattern.** {clip(c['transferable_pattern'], 600)}\n")

    # gaps
    gs = [g for r in group for g in (r.get("gaps") or [])]
    if gs:
        out.append("**Where this corrects or extends the written summaries.**\n")
        for g in gs[:6]:
            out.append(f"- {clip(g, 300)}")
        out.append("")
    out.append("---\n")

# mechanism index
out.append("## Named mechanisms (his vocabulary)\n")
out.append("Terms Hormozi coins or uses that do not appear in the written framework summaries.\n")
out.append("| Mechanism | Definition | Source |")
out.append("|---|---|---|")
for name, m in sorted(mechs.items(), key=lambda x: x[0].lower()):
    vids = ", ".join(f"[{v}](https://youtu.be/{v})" for v in m["vids"][:3])
    out.append(f"| **{name}** | {clip(m['def'], 220)} | {vids} |")
out.append("")

(REPO / "frameworks/case-studies.md").write_text("\n".join(out))
print(f"wrote frameworks/case-studies.md ({(REPO/'frameworks/case-studies.md').stat().st_size:,} bytes)")
print(f"  {cs_total} case studies, {len(mechs)} named mechanisms, {len(by_video)} videos")
