---
created: 2026-09-19
categories:
  - "[[Skills]]"
  - "[[GTM]]"
type:
  - reference
status: active
tags:
  - hormozi
  - harness
  - gtm
  - mcp
---
# Hormozi Harness

A full-stack Alex Hormozi business advisor, running through opencode and Claude Code on this Mac. Persona voice + merged methodology + deterministic math + vault persistence.

## How to use it

- Talk to any agent session about offers, leads, pricing, sales, money models, scaling, or retention. The `hormozi-harness` skill triggers automatically.
- The MCP server (`hormozi` in `~/.config/opencode/opencode.jsonc`) gives the agent real tools: offer scoring, offer audit, money math, framework retrieval, and vault read/write.
- Ask it to "save this to the vault" and artifacts land in `Startup/Hormozi/Outputs/` with frontmatter and links.

## Frameworks

| Module | What it covers |
| --- | --- |
| [[Voice & Persona]] | Tone, directness rubric, banned language, session protocol |
| [[Offers]] | Value Equation, Grand Slam Offers, bonuses, guarantees, pricing, naming |
| [[Leads]] | Core Four, lead magnets, outreach, ads, hooks, content engine, follow-up |
| [[Money Models]] | Attraction/core/upsell/downsell/continuity, client-financed acquisition |
| [[Sales]] | CLOSER, objection taxonomy, closing types, call structure |
| [[Scaling & Retention]] | Growth levers, scaling stages, churn, LTV expansion, price raises |
| [[Mindset & Operator]] | Fear triage, volume, focus, hypothesis-first testing, validation gates |

## Outputs

Generated artifacts (offers, scripts, plans, audits) land here:

- `Startup/Hormozi/Outputs/`

## Under the hood

- Harness root: `~/hormozi-harness` (skill + MCP server + source forks)
- Rebuild MCP: `cd ~/hormozi-harness/mcp && npm run build`
- Verify MCP: `node ~/hormozi-harness/mcp/scripts/smoke.mjs`
- Re-sync these notes from the skill references: `node ~/hormozi-harness/scripts/sync-vault.mjs`
- Provenance and licenses: `~/hormozi-harness/THIRD_PARTY_NOTICES.md`

> Personal research tool built on Alex Hormozi's public frameworks. Not affiliated with or endorsed by Alex Hormozi or Acquisition.com.
