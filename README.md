# Hormozi Brain

A self-contained study system for Alex Hormozi's business methodology: the full framework library (Offers, Leads, Money Models, Sales, Scaling & Retention, Mindset & Operator, Voice & Persona) rendered as things you can actually walk through - now backed by evidence mined from the channel itself.

Built and maintained by [@jigsid](https://github.com/jigsid). Not affiliated with or endorsed by Alex Hormozi or Acquisition.com.

## What's inside

| Path | What it is |
|---|---|
| `index.html` | **The tree.** 343 nodes: 1 trunk -> 8 modules -> 64 frameworks -> 270 rules. Tap any node for the full explanation. 52 nodes carry verbatim transcript quotes with source links. Single file, zero dependencies. |
| `EVIDENCE.md` | **The evidence.** The transcript-derived benchmarks branch, readable as markdown. Every quote carries its source video. |
| `growth-engine.html` | **Branch 1 plan.** The first artifact: a B2B marketing growth engine from stranger to booked call, thresholds inline. |
| `graph/` | **The graph.** Interactive force-directed ("circular") view of the same brain with cross-links between modules. Next.js app. |
| `frameworks/` | The seven module texts, one file per framework. The source material the tree renders. |
| `sources/quotes.json` | 522 mined quotes with provenance (video title + id), keyed by topic. |
| `sources/videos.tsv` | The channel index: every video id, title, duration. |
| `harness.md` | How the harness is wired: skill + MCP + vault. |
| `skill/` | The agent skill (SKILL.md + references) that applies this methodology in Claude Code / opencode sessions. |
| `mcp/` | MCP server: offer scoring, offer audit, money-model math, framework retrieval, vault read/write. |
| `scripts/` | `sync-vault.mjs`, `enrich-from-transcripts.py`, `gen-evidence-module.py`. |
| `RESOURCES.md` | Open-source repos and official material. |
| `THIRD_PARTY_NOTICES.md` | Provenance and licenses. |

## The transcript corpus

The tree's frameworks came from written sources. `EVIDENCE.md` and the tree's **Evidence & Benchmarks** branch are what the spoken material adds on top - mostly the **benchmarks, ratios and thresholds** the written frameworks leave qualitative.

- **523 videos listed, 516 transcribed** - 2.9M words, ~219 hours of video. 7 videos have captions disabled by the channel.
- Transcripts were pulled with `yt-dlp` (YouTube's own transcript API IP-blocks after a couple of dozen requests), then sentence-mined for teachable passages carrying a number, mechanism, or polarity claim, and filtered against promo language.
- Quotes are **verbatim from auto-generated captions** - reliable on numbers, noisy on punctuation.
- The full corpus lives outside this repo at `~/youtube-transcripts/hormozi/` (15 MB of text); `sources/` here holds the index and the mined quotes.

What it surfaced that the books state as principle but rarely quantify:

| Finding | Number |
|---|---|
| Close rate -> price correction | 80%+ -> underpriced 3-4x · 50-60% -> 1.5-2x · 40-50% -> 1.25-1.5x · 30-40% -> correct |
| LTV from retention | LTV = annual payment / churn. 50% retention -> 2x · 80% -> 5x |
| LTV:CAC | 3:1 is a durability floor; his outsized returns came from four windows above 30:1 (Gym Launch year one: 100:1) |
| Sales rep quota | 35% close (1 in 3); above -> raise price, below -> fix process |
| Calendar utilisation | 70% is the sweet spot - fully booked drops conversion and raises CAC |
| Tiering | 5-10x price per tier, ~20% take, each tier must double revenue |
| Upsell uptake | 20-30% normal; 90%+ with an assume-close |
| Funnel decay | every added step loses ~50%; web pages 1-2%, trusted platform ~4% |

## Quick start

**Tree** - double-click `index.html`. No server needed. Drag to pan, scroll to move, cmd/ctrl + scroll to zoom, tap any node for the full breakdown.

**Graph**

```bash
cd graph
npm install
npm run dev
```

**MCP server**

```bash
cd mcp
npm install
npm run build
```

## Reading order (if you're new to this)

1. Start at the trunk in the tree (`index.html`). It carries the unit-economics gate every branch shares: LTGP:CAC 3:1 or better, payback inside 30-90 days, churn under 5%/month.
2. Walk module by module. Offers decides what you sell. Leads creates demand. Money Models sequences the offers. Sales converts. Scaling & Retention compounds. Mindset & Operator is how you run it. Voice is the tone.
3. When you want the numbers behind a rule, open **Evidence & Benchmarks** - every node there carries a verbatim quote and the video it came from.
4. Use the thresholds as checkpoints. Every rule in the tree carries a number, a rate, or a deadline.
5. When you want the connected view instead of the hierarchy, open the graph.

## Editing the tree

The entire tree lives in one `const DATA` block at the top of the script in `index.html`. Add a node with `id`, `title`, `spec`, optional `detail`, `quotes` and children, and the layout re-flows automatically. The header counts are computed from the data, never hardcoded.

Nodes may carry `quotes`:

```json
"quotes": [
  { "t": "verbatim quote text", "src": "Video Title", "vid": "youtubeId" }
]
```

To regenerate the graph's evidence module after editing the tree's `E` branch:

```bash
python3 scripts/gen-evidence-module.py
```
