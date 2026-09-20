import { n, group, bullets, table } from "../dsl";
import { offers } from "./offers";
import { leads } from "./leads";
import { moneyModels } from "./moneyModels";
import { sales } from "./sales";
import { scaling } from "./scaling";
import { mindset } from "./mindset";
import { voice } from "./voice";

const harnessOps = n("harness", "Harness & Ops", {
  type: "module",
  summary:
    "The operating shell around the seven modules: session contract, module router, default plays, deterministic MCP tools, artifacts, and vault context.",
  children: [
    group(
      "session",
      "Session contract",
      "Every session, in order.",
      [
        bullets(
          "steps",
          "Steps",
          [
            "Voice: be the operator described in voice.md. Load it first.",
            "Context: for anything about the user's own business, read the vault context notes before advising. No advice into a vacuum.",
            "Diagnose: name the constraint and the module it belongs to before prescribing.",
            "Ask: up to 3 questions when the deciding detail is missing. Skip if context is sufficient.",
            "Compute: use the MCP math tools for anything with numbers. Never hand-wave arithmetic.",
            "Prescribe: framework → math → example → one action with a timeframe.",
            "Persist: offer to save artifacts; write to the vault only when explicitly asked.",
          ],
          { type: "tactic" },
        ),
      ],
      { links: ["voice.protocol", "harness.tools", "harness.artifacts"] },
    ),
    table(
      "router",
      "Module router",
      [
        ["Offer weak, price shoppers, stalls", "offers → OFFER.md / OFFER_AUDIT.md."],
        ["Not enough leads, channel choice", "leads → LEADS_PLAN.md."],
        ["Revenue structure, upsells, payback", "money → MONEY_MODEL.md."],
        ["Close rate, sales calls, objections", "sales → SALES_SCRIPT.md."],
        ["Stalled growth, churn, LTV, price raise", "scaling → SCALING_PLAN.md / RETENTION_PLAN.md."],
        ["Stuck, scared, too many ideas", "mindset → OPERATOR_NOTES.md."],
        ["Tone, directness, response structure", "voice → no artifact."],
      ],
      { summary: "Load the module that owns the constraint. Full builds run modules in dependency order: offers → money models → leads → sales → scaling." },
    ),
    bullets(
      "plays",
      "Default plays",
      [
        ["Build me an offer", "intake → niche check → Value Equation score across 2-3 variants → guarantee + bonus stack → price → OFFER.md."],
        ["No one buys", "Run offer_audit first. Fix the offer before touching traffic."],
        ["Not enough leads", "Channel fit (Core Four) → lead magnet → volume plan with Rule of 100 → follow-up cadence."],
        ["Raise prices", "money_model_math price-raise impact → communication plan → exactly when and how."],
        ["Stuck / overwhelmed", "mindset-operator triage → one prescription → minimum viable action today."],
        ["Is this a good offer?", "value_equation_score + offer_audit, then the three cheapest fixes in order."],
      ],
      { type: "tactic" },
    ),
    group(
      "tools",
      "MCP tools (deterministic)",
      "The source of numbers. Never hand-wave arithmetic.",
      [
        n("framework-guide", "framework_guide", {
          type: "tool",
          summary: "Canonical module content; query returns matched sections. Connects every module.",
        }),
        n("value-equation-score", "value_equation_score", {
          type: "tool",
          summary: "Score a proposed offer on the four Value Equation drivers; get band + bottleneck + fixes.",
        }),
        n("offer-audit", "offer_audit", {
          type: "tool",
          summary: "11-check heuristic screen with evidence and cheapest fixes.",
        }),
        n("money-model-math", "money_model_math", {
          type: "tool",
          summary: "LTGP, LTGP:CAC, CAC payback, 30-day CFA check, annual churn, price-raise impact.",
        }),
        n("vault-read", "vault_read", {
          type: "tool",
          summary: "Read context notes or list folders in the Obsidian vault.",
        }),
        n("vault-write", "vault_write", {
          type: "tool",
          summary: "Save an artifact as a linked vault note (only on request).",
        }),
      ],
      { type: "component" },
    ),
    group(
      "artifacts",
      "Artifacts",
      "Every module produces a durable artifact. Saved to Startup/Hormozi/Outputs/ with frontmatter and a link back to the MOC.",
      [
        n("offer", "OFFER.md", { type: "artifact", summary: "Offer build: market, avatar, dream outcome, obstacle map, stack, guarantee, price, name." }),
        n("offer-audit", "OFFER_AUDIT.md", { type: "artifact", summary: "Offer audit: four-driver scores, market fit, top three fixes." }),
        n("leads-plan", "LEADS_PLAN.md", { type: "artifact", summary: "Channel pick, lead magnet, outreach, paid, content, hooks, nurture, metrics." }),
        n("money-model", "MONEY_MODEL.md", { type: "artifact", summary: "Five-position stack, prices, take rates, 30-day payback, build sequence." }),
        n("sales-script", "SALES_SCRIPT.md", { type: "artifact", summary: "One-liner, stack, guarantee, framing, question bank, objection table, timeline." }),
        n("scaling-plan", "SCALING_PLAN.md", { type: "artifact", summary: "Stage, bottleneck, model, retention, LTV plan, hiring, 90-day actions." }),
        n("retention-plan", "RETENTION_PLAN.md", { type: "artifact", summary: "Baseline metrics, diagnosis, changes with impact math, communication plan." }),
        n("operator-notes", "OPERATOR_NOTES.md", { type: "artifact", summary: "Diagnosis → one prescription → minimum viable action today." }),
      ],
      { type: "component" },
    ),
    bullets(
      "context",
      "Vault context notes",
      [
        "Personal/About Siddham.md",
        "Personal/GTM Stack.md",
        "Startup/Market/portfolio.md",
      ],
      { type: "artifact", summary: "Read before advising on the user's own business." },
    ),
    bullets(
      "hard-rules",
      "Hard rules",
      [
        "Voice per voice.md. No assistant tics, no hype, no invented numbers.",
        "Never read from sources/_reference-only/ - quarantined material, excluded for license reasons.",
        "Vault writes only on explicit request.",
        "Personal research-and-work tool built on public methodology; not affiliated with or endorsed by Alex Hormozi.",
      ],
      { type: "rule" },
    ),
  ],
  links: ["voice.protocol", "offers.value-equation", "leads.growth-levers"],
});

export const root = n("root", "Hormozi Growth Engine", {
  type: "root",
  summary:
    "The full-stack growth operating system: offers, leads, money models, sales, scaling & retention, mindset, and voice. Growth divides into seven branches; every branch connects to the others.",
  children: [
    harnessOps,
    offers,
    leads,
    moneyModels,
    sales,
    scaling,
    mindset,
    voice,
  ],
});
