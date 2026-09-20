# Hormozi Brain Tree

A single-file, interactive 2D tree of the Hormozi business methodology — built to study the whole system top to bottom.

Open `index.html` in any browser. No server, no dependencies.

## What it covers

- **263 nodes** in one tree: 1 trunk → 7 modules → 55 frameworks → 200 rules
- **Modules**: Offers · Leads · Money Models · Sales · Scaling & Retention · Mindset & Operator · Voice & Persona
- Every rule carries its threshold (LTGP:CAC ≥ 3:1, Rule of 100, churn < 5%/mo, CLOSER, CFA 30-day rule, hook families, and so on)

## How to use it

- Opens with all layers expanded, fit to screen
- **Tap any box** → a detail drawer opens with the full explanation for that node (pulled from the framework references)
- Each rule shows its parent framework's full text as context, plus links to sibling rules
- **Drag** to pan · **scroll** to move · **⌘/ctrl + scroll** or **±×** to zoom · **FIT** for the overview
- **− / +** buttons collapse to frameworks-only or expand everything

## Structure

```
index.html   — the entire app: tree data + layout engine + detail panel
```

The tree data sits in a single `const DATA` block at the top of the script — edit it, add children, and the tree re-flows automatically.

## Provenance

Redrafted for personal use from publicly circulating Hormozi methodology summaries (MIT/Apache-licensed community sources), via the Hormozi Harness skill + MCP setup.

Not affiliated with or endorsed by Alex Hormozi or Acquisition.com.
