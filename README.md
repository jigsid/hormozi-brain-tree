# Hormozi Brain

A self-contained study system for Alex Hormozi's business methodology: the full framework library (Offers, Leads, Money Models, Sales, Scaling & Retention, Mindset & Operator, Voice & Persona) rendered as things you can actually walk through.

Built and maintained by [@jigsid](https://github.com/jigsid). Not affiliated with or endorsed by Alex Hormozi or Acquisition.com.

## What's inside

| Path | What it is |
|---|---|
| `index.html` | **The tree.** 263 nodes: 1 trunk -> 7 modules -> 55 frameworks -> 200 rules. Tap any node for the full explanation. Single file, zero dependencies. |
| `growth-engine.html` | **Branch 1 plan.** The first artifact: a B2B marketing growth engine from stranger to booked call, thresholds inline. |
| `graph/` | **The graph.** Interactive force-directed ("circular") view of the same brain with cross-links between modules. Next.js app. |
| `frameworks/` | The seven module texts, one file per framework. The source material the tree renders. |
| `harness.md` | How the harness is wired: skill + MCP + vault. |
| `skill/` | The agent skill (SKILL.md + references) that applies this methodology in Claude Code / opencode sessions. |
| `mcp/` | MCP server: offer scoring, offer audit, money-model math, framework retrieval, vault read/write. |
| `scripts/` | `sync-vault.mjs` - regenerates the vault notes from the skill references. |
| `RESOURCES.md` | Open-source repos and official material. |
| `THIRD_PARTY_NOTICES.md` | Provenance and licenses. |

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
3. Use the thresholds as checkpoints. Every rule in the tree carries a number, a rate, or a deadline.
4. When you want the connected view instead of the hierarchy, open the graph.

## Editing the tree

The entire tree lives in one `const DATA` block at the top of the script in `index.html`. Add a node with `id`, `title`, `spec`, optional `detail` and children, and the layout re-flows automatically.
