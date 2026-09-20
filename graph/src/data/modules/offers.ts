import { n, group, bullets, rules, checklist, mistakes, examples, table } from "../dsl";

export const offers = n("offers", "Offers", {
  type: "module",
  summary:
    "Build an offer people feel stupid saying no to. Market first, then the Value Equation, then packaging, bonuses, guarantees, scarcity, price, and name.",
  children: [
    bullets(
      "triggers",
      "Load this when",
      [
        "Building a new offer, package, or service tier from scratch",
        "An offer converts poorly, attracts price shoppers, or stalls at \"I'll think about it\"",
        "Choosing, narrowing, or repositioning a market and avatar",
        "Writing value stacks, bonuses, guarantees, or pricing pages",
        "Deciding when and how to raise price without killing demand",
        "Auditing a sales page, pitch, or proposal against the Value Equation",
        "An offer sounds strong on calls but will not close",
      ],
      { type: "trigger", summary: "Triggers that route a session into the Offers module." },
    ),

    group(
      "value-equation",
      "Value Equation",
      "Perceived value = (Dream Outcome × Likelihood) ÷ (Time Delay × Effort). Division, not addition. Growing the numerator scales value linearly; collapsing the denominator lets value run toward infinity.",
      [
        n("formula", "Value = (DO × PL) ÷ (TD × E)", {
          type: "tactic",
          summary:
            "Value = (Dream Outcome × Perceived Likelihood of Achievement) ÷ (Time Delay × Effort & Sacrifice). When two offers promise the same outcome, the dream outcome term cancels - then likelihood, time, and effort decide who wins.",
        }),
        group(
          "drivers",
          "The four drivers",
          "Score all four 1-10. Benefits score higher-is-better; time and effort score higher-is-worse.",
          [
            bullets(
              "dream-outcome",
              "Dream Outcome ↑",
              ["Status, specificity, identity, event anchor"],
              { type: "tactic", parentType: "component" },
            ),
            bullets(
              "likelihood",
              "Perceived Likelihood ↑",
              ["Proof, testimonials, guarantees, clear path, named mechanism"],
              { type: "tactic", parentType: "component" },
            ),
            bullets(
              "time-delay",
              "Time Delay ↓",
              ["Fast first win, quick onboarding, staged delivery"],
              { type: "tactic", parentType: "component" },
            ),
            bullets(
              "effort",
              "Effort & Sacrifice ↓",
              ["DFY, automation, templates, removing steps, reframing"],
              { type: "tactic", parentType: "component" },
            ),
          ],
          { type: "component" },
        ),
        bullets(
          "apply",
          "How to apply it",
          [
            "Write the offer in one sentence.",
            "Score all four drivers 1-10. Score benefits so higher is better; score time and effort so higher means slower/harder (worse).",
            "Compute the index: (DO × PL) ÷ (T × E). Use it to compare versions, not to claim precision.",
            "If the dream outcome is vague, fix that first. Otherwise attack the bottom of the equation.",
            "Re-score after every change and keep the version with the highest index.",
          ],
          { type: "tactic" },
        ),
        group(
          "move-each-term",
          "How to move each term",
          "Concrete moves for each of the four drivers.",
          [
            group(
              "dream-up",
              "Dream outcome up",
              "Attach a number, a deadline, and an identity. Sell what changes after the result, not the result alone.",
              [
                n("number", "Attach a number", { type: "tactic", summary: "\"20 lbs,\" \"3 clients,\" \"$10k/month\" - a measurable after-state." }),
                n("deadline", "Attach a deadline", { type: "tactic", summary: "A short timeframe the buyer can picture." }),
                n("identity", "Attach an identity", { type: "tactic", summary: "\"Look like the fittest dad at the reunion.\"" }),
                n("after-result", "Sell what changes after the result", { type: "tactic", summary: "Not the result alone - the status, the relief, the knock-on effects." }),
              ],
              { type: "component" },
            ),
            group(
              "likelihood-up",
              "Likelihood up",
              "Make success feel mechanical, not lucky.",
              [
                n("proof", "Show proof for people who look like this buyer", { type: "tactic", summary: "Lookalike case studies beat generic testimonials." }),
                n("path", "Show the exact path", { type: "tactic", summary: "A clear, named, step-by-step route from here to the outcome." }),
                n("guarantee", "Add a guarantee", { type: "tactic", summary: "Put risk on you - see the Guarantees branch." }),
                n("mechanism", "Explain the mechanism", { type: "tactic", summary: "So success feels mechanical, not lucky." }),
              ],
              { type: "component" },
            ),
            group(
              "time-down",
              "Time down",
              "Front-load a win into day one.",
              [
                n("first-win", "Front-load a win into day one", { type: "tactic", summary: "The first useful thing arrives immediately." }),
                n("onboard", "Onboard in hours, not weeks", { type: "tactic", summary: "Compress the setup." }),
                n("staged", "Stage delivery", { type: "tactic", summary: "Sequence so progress starts before payment finishes." }),
                n("payment-progress", "Make payment feel like the start of progress", { type: "tactic", summary: "Reframe the transaction." }),
              ],
              { type: "component" },
            ),
            group(
              "effort-down",
              "Effort down",
              "Delete friction and say so.",
              [
                n("remove-steps", "Remove steps", { type: "tactic", summary: "Cut anything that is not the core action." }),
                n("pre-build", "Pre-build assets", { type: "tactic", summary: "Templates, checklists, swipe files." }),
                n("do-hard-part", "Do the hard part for them", { type: "tactic", summary: "DFY beats DWY beats DIY for effort perception." }),
                n("automate", "Automate the boring part", { type: "tactic", summary: "Tools and automations carry the repetition." }),
                n("announce", "Tell them what you removed", { type: "tactic", summary: "Unseen effort savings earn nothing." }),
              ],
              { type: "component" },
            ),
          ],
          { type: "component" },
        ),
        bullets(
          "perception",
          "Perception rules",
          [
            "Perception is reality: a shorter wait the buyer cannot see earns you nothing. Say each improvement out loud in the pitch.",
            "Beginners inflate claims; strong operators delete friction. Speed beats free - a paid result now usually beats a free result later.",
            "Push time and effort toward zero and value becomes unbounded.",
          ],
          { type: "tactic" },
        ),
      ],
      { links: ["leads.hooks", "sales.closer", "money.attraction"] },
    ),

    group(
      "market",
      "Market selection (starving crowd)",
      "Market > Offer > Persuasion. A great offer aimed at the wrong crowd loses to a mediocre offer aimed at a starving one. Channel demand that already exists instead of trying to manufacture it.",
      [
        n("order-of-leverage", "Order of leverage: Market > Offer > Persuasion", {
          type: "tactic",
          summary:
            "A great offer aimed at the wrong crowd loses to a mediocre offer aimed at a starving one. Channel demand that already exists instead of trying to manufacture it.",
        }),
        bullets(
          "criteria",
          "Four criteria (score 1-10 each)",
          [
            ["Massive pain", "Urgent, bleeding now."],
            ["Purchasing power", "Can pay today without saving up."],
            ["Easy to target", "Findable via communities, platforms, events, ads."],
            ["Growing", "Demand tailwind, not decline."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        bullets(
          "grid",
          "Niche scoring grid",
          [
            ["Massive pain", "1-3 fail: mild inconvenience. 7-10 commit: urgent, weekly, bleeding."],
            ["Purchasing power", "1-3 fail: cannot pay without strain. 7-10 commit: already spends on the problem."],
            ["Easy to target", "1-3 fail: \"everyone\". 7-10 commit: named communities, lists, events."],
            ["Growing", "1-3 fail: declining demand. 7-10 commit: demand tailwind, new buyers arriving."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        bullets(
          "demand-pools",
          "Evergreen demand pools",
          [
            "Health, Wealth, Relationships. Stand inside one, then pick its fastest-growing sub-niche.",
          ],
          { type: "tactic" },
        ),
        n("niche-ladder", "Niche ladder", {
          type: "tactic",
          summary:
            "\"help people lose weight\" → \"help people over 40 lose weight\" → \"help women over 40 lose weight\" → \"help female executives over 40 lose weight without giving up wine.\" Each rung lowers competition, sharpens targeting, and supports a higher price.",
        }),
        n("niche-math", "Niche math: up to ~100× same product", {
          type: "rule",
          summary:
            "The same product positioned narrowly can command up to ~100× more than the broad version. Under roughly $10M/year, keep niching. Beyond that, broaden per TAM.",
        }),
        n("commit-6-months", "Commit for 6+ months before judging", {
          type: "rule",
          summary:
            "Switching niches before compounding sets in is the most common self-inflicted death.",
        }),
        n("pain-insufficient", "Pain is necessary but insufficient", {
          type: "tactic",
          summary:
            "The buyer must know the problem exists, believe it is solvable, and believe you specifically can solve it.",
        }),
        bullets(
          "surface-questions",
          "Questions that surface the right niche fast",
          [
            "Who is the easiest person you can help right now?",
            "Who already knows they have this problem?",
            "Who feels it weekly rather than someday?",
            "Who has already tried and failed at other solutions?",
            "Who can pay without a long education?",
            "Whoever scores highest is your first market - the most reachable one you can serve today, not the largest you can imagine.",
          ],
          { type: "tactic" },
        ),
      ],
      { links: ["mindset.idea-product", "scaling.stages", "money.attraction"] },
    ),

    group(
      "dream-outcome",
      "Dream outcome",
      "Sell the destination, not the vehicle. \"Gym membership\" is the vehicle; \"lose 20 lbs in 6 weeks\" is the destination.",
      [
        n("formula", "Formula: [specific result] + [short timeframe] + [without the pain]", {
          type: "tactic",
          summary:
            "Result + timeframe + removed pain. Weak: \"grow your brand.\" Strong: \"book 3 premium clients in 30 days without cold outreach.\"",
        }),
        bullets(
          "five-moves",
          "Build it in five moves",
          [
            "Ask what they most want.",
            "Write it as a visible after-state in their own words.",
            "Attach a number and a deadline.",
            "Append the feared cost you remove.",
            "Tie it to an identity, event, or status shift.",
          ],
          { type: "tactic" },
        ),
        bullets(
          "not-vs-is",
          "Not a dream outcome vs is",
          [
            ["Not", "Features (\"AI analytics dashboard\"), deliverables (\"ten reports a month\"), or vehicles (\"a six-week program with daily videos\") - all describe the plane, not the beach."],
            ["Is", "\"Know which post will go viral before you publish,\" or \"get ten paying customers in 30 days without messaging strangers.\""],
          ],
          { type: "tactic", parentType: "component" },
        ),
        bullets(
          "four-questions",
          "The four silent questions",
          [
            "What do I get?",
            "How do I know it will happen?",
            "How long will it take?",
            "What do I have to do?",
            "Answer all four inside the offer and the copy.",
          ],
          { type: "tactic" },
        ),
        n("status", "Status is the strongest upgrade", {
          type: "rule",
          summary:
            "Outcomes that change how others see the buyer outpull raw utility. When unsure between two framings of equal effort, pick the one with the higher status shift.",
        }),
      ],
      { links: ["sales.closer", "leads.hooks", "money.attraction"] },
    ),

    group(
      "grand-slam",
      "Grand Slam Offer assembly",
      "A Grand Slam Offer cannot be line-item compared against a rival, combines an attractive promotion with a premium price and a guarantee that removes risk, and pays for customer acquisition through its money model.",
      [
        bullets(
          "steps",
          "Step sequence",
          [
            "Pick the market. Score the four criteria; refuse to proceed below 7/10 on any of them.",
            "Commit to premium pricing before designing anything. Price signals position as much as it captures it.",
            "State the dream outcome using the destination formula.",
            "List every problem the buyer faces on the way there - aim for 10-15+ obstacles. Tag each to the value-equation term it damages.",
            "Reverse each problem into a named solution: \"How to ___\" becomes a component with its own identity.",
            "Pick a delivery vehicle for each solution (see the delivery cube).",
            "Trim: cut high-cost/low-value first, then low-cost/low-value offerings.",
            "Stack survivors into one deliverable that handles every named problem. Price each component; the total value must dwarf the price and the bundle must be impossible to comparison-shop.",
            "Add scarcity, urgency, bonuses, and a guarantee.",
            "Name it with MAGIC.",
            "Launch, over-deliver even unscalably, collect cash, then systematize. Create flow first, monetize it, and only then add friction.",
          ],
          { type: "tactic" },
        ),
        bullets(
          "problem-territories",
          "Sweep four problem territories",
          [
            ["Before purchase", "Trust, risk, skepticism from past failures."],
            ["During use", "Confusion, awkward steps, time cost."],
            ["After the result", "Maintenance, relapse, next plateau."],
            ["Social", "What family, peers, or clients will think."],
            "Tag each obstacle to the value-equation term it damages - that tag dictates which lever fixes it, and it stops you from writing solutions that solve nothing the buyer actually fears.",
          ],
          { type: "tactic", parentType: "component" },
        ),
      ],
      { links: ["offers.delivery", "offers.bonuses", "offers.guarantees", "offers.naming", "mindset.idea-product"] },
    ),

    group(
      "delivery",
      "Delivery vehicles / delivery cube",
      "Decide how each solution ships by walking the cube.",
      [
        bullets(
          "cube",
          "The cube dimensions",
          [
            ["Attention", "1-on-1 / small group / one-to-many."],
            ["Effort shifted", "DIY / done-with-you / done-for-you."],
            ["Medium", "Live or recorded; audio, video, or written."],
            ["Response speed", "Async, scheduled, on-demand."],
            ["10× test", "What would you deliver if you charged 10×? Deliver that at premium tiers."],
            ["1/10th test", "Paid one-tenth, how would you make it more valuable? Usually one-to-many or software. That becomes your low tier."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        bullets(
          "trim",
          "Trim and stack by cost-to-value",
          [
            ["Low cost / high value", "Keep and scale - one-to-many lives here."],
            ["Low cost / low value", "Cut second."],
            ["High cost / high value", "Keep for premium tiers."],
            ["High cost / low value", "Cut first."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        bullets(
          "menu",
          "Delivery menu",
          [
            "Written tutorials and swipe files",
            "Templates, checklists, and frameworks",
            "Live calls and async support",
            "Communities",
            "Audits",
            "Workbooks",
            "Dashboards and automations",
            "Done-for-you assets",
            "Simple software tools",
          ],
          { type: "tactic" },
        ),
        n("sweet-spot", "One-to-many sweet spot", {
          type: "rule",
          summary:
            "One-to-many with near-zero marginal cost and high perceived value is the sweet spot. Start hands-on to win results and proof, then productize toward group and recorded formats as cash allows. Never let delivery format be chosen for your convenience over the buyer's outcome.",
        }),
      ],
      { links: ["scaling.model-choice", "scaling.ltv", "money.stack"] },
    ),

    group(
      "bonuses",
      "Bonus stacking",
      "Split one offer into priced parts and present them stacked - the same value reads as far larger when itemized.",
      [
        bullets(
          "rules",
          "Bonus rules",
          [
            "Give every bonus a benefit-driven name, never \"bonus videos.\"",
            "Tie each bonus to one specific objection it kills (time, complexity, trust, failure risk).",
            "Explain how you built it and why it exists.",
            "Prove its standalone value: what it costs elsewhere, what it saves, what it replaces.",
            "Paint the usage moment so the buyer sees themselves applying it.",
            "Ascribe and justify a dollar value, then show the sum.",
            "Tools, templates, and checklists beat trainings.",
            "Solve the buyer's next problem, not just the current one.",
            "The summed bonus value should eclipse the core price on its own.",
            "Attach scarcity or a deadline to at least one bonus.",
            "Keep the stack clean: cut any bonus that adds confusion or does not support the core outcome.",
            "Optional: license other people's products as bonuses by negotiating a bulk discount plus an affiliate commission back to you.",
          ],
          { type: "tactic" },
        ),
        bullets(
          "ordering",
          "Order the stack",
          [
            "Biggest objection first",
            "Highest perceived value early",
            "Logical progression",
            "Varied formats",
            "On a call, ask for the sale first; reveal bonuses after the yes as rewards. If the answer is no, present the bonus that answers the stated objection and ask again.",
            "Never discount the core to close - discounting teaches buyers to negotiate. Add a bonus instead.",
          ],
          { type: "tactic" },
        ),
        table(
          "objection-map",
          "Objection → bonus map",
          [
            ["\"No time\"", "Fast-start guide, done-for-you setup, pre-built templates."],
            ["\"Too complicated\"", "Step-by-step checklist, plug-and-play swipe file."],
            ["\"Won't work for me\"", "1-on-1 audit, case study library from similar buyers."],
            ["\"I might fail / fall off\"", "Accountability channel, live check-ins, community."],
            ["\"Too expensive\"", "High-value tool that visibly replaces a paid service."],
            ["\"I don't trust you yet\"", "Proof asset, trial component, conditional guarantee upgrade."],
          ],
          { summary: "Reusable map from stated objection to the bonus that kills it." },
        ),
        n("hidden-belief", "Look for the hidden belief", {
          type: "tactic",
          summary:
            "\"I'll think about it\" usually means trust is missing; \"no time\" usually means the effort looks heavy. Fix the belief, not just the sentence.",
        }),
      ],
      { links: ["sales.objections", "offers.guarantees", "money.upsells"] },
    ),

    group(
      "guarantees",
      "Guarantees",
      "Risk is the number-one objection. State the guarantee boldly, give it a reason-why, and give it teeth: \"If you don't get X in Y, we will Z.\"",
      [
        group(
          "types",
          "Types",
          undefined,
          [
            n("unconditional", "Unconditional", {
              type: "tactic",
              summary:
                "Full refund, no questions, 30/60/90 days. Strongest trust signal, highest refund exposure. Best for low-ticket B2C.",
            }),
            n("conditional", "Conditional", {
              type: "tactic",
              summary:
                "Tied to required success actions. Feels stronger because it implies confidence and filters out non-implementers. Upgrades: double or triple refund, keep-working-free until the result lands, credit toward another program, coverage of ancillary costs, pay-their-wage.",
            }),
            n("anti", "Anti-guarantee", {
              type: "tactic",
              summary:
                "All sales final with a compelling reason-why. Works for consumables, downloads, and once-seen content - and only with serious proof.",
            }),
            n("performance", "Implied / performance", {
              type: "tactic",
              summary:
                "Revenue share, profit share, or no-results-no-pay. Best alignment when outcomes are measurable and mutual trust exists.",
            }),
          ],
          { type: "component" },
        ),
        n("stacking", "Stack guarantees", {
          type: "tactic",
          summary:
            "\"Try 30 days. Complete the program, see no result, and you get every dollar back and keep the bonuses.\"",
        }),
        n("math", "Decide on net math, not fear", {
          type: "rule",
          summary:
            "Typical refund rates sit under ~5%; compare refund cost plus fulfillment cost against the conversion lift, and tighten conditions before removing the guarantee.",
        }),
        n("match-economics", "Match type to economics", {
          type: "tactic",
          summary:
            "High fulfillment cost favors conditional, anti, or performance; low-ticket digital favors unconditional; mid-ticket cohorts favor conditional with required actions; high-ticket services favor performance or partial-refund structures. Name every guarantee vividly.",
        }),
        n("enhancer", "A guarantee is an enhancer", {
          type: "rule",
          summary: "It cannot rescue a product that fails people.",
        }),
      ],
      { links: ["sales.objections", "offers.bonuses", "money.attraction", "sales.rules"] },
    ),

    group(
      "scarcity",
      "Scarcity & urgency (ethical limits)",
      "Raise perceived demand and lower perceived supply. Fear of loss moves harder than promise of gain. Hormozi Law: the longer you delay the ask, the bigger the ask you can make.",
      [
        n("scarcity", "Scarcity (quantity)", {
          type: "tactic",
          summary:
            "Limited seats or slots, limited bonuses, never-again windows. For services: total-business cap, growth-rate cap, or cohort cap.",
        }),
        n("urgency", "Urgency (time)", {
          type: "tactic",
          summary:
            "Cohort start dates, rolling seasonal wrappers (same offer, new named wrapper - strongest for local), expiring price or bonus, genuine decaying opportunity.",
        }),
        bullets(
          "mechanisms",
          "Concrete mechanisms that stay honest",
          [
            "Cap the cohort and publish the count (\"20 spots, 17 claimed\")",
            "Open enrollment only when a new cohort starts",
            "Name each seasonal wrapper while the core stays the same",
            "Expire the price or the bonus, never the service the buyer already owns",
            "Sell against a real decaying opportunity such as locked-in rates or a closing window",
          ],
          { type: "tactic" },
        ),
        bullets(
          "ethics",
          "Ethical limits",
          [
            "Advertise only real remaining capacity; deadlines must actually expire. Fake scarcity destroys trust permanently.",
            "When an offer fatigues, refresh the wrapper before the machine - change creative first, then body copy, headline/wrapper, duration, enhancer, and price last; go only as deep as needed.",
          ],
          { type: "tactic" },
        ),
        n("final-hours", "50-60% of sales in the final hours", {
          type: "rule",
          summary:
            "A final-hours spike means the deadline is believed; no spike means it is not. When you sell out, announce it - the sellout itself is proof.",
        }),
        n("fractal", "Demand is fractal", {
          type: "rule",
          summary:
            "Roughly 1 in 5 buyers pays about 5×. Keep supply under demand and leave room for the premium path.",
        }),
      ],
      { links: ["sales.closes", "money.fast-cash", "leads.paid-ads"] },
    ),

    group(
      "pricing",
      "Pricing",
      "Price on delivered value, not cost-plus. Commodities compete on price and race to the bottom; differentiation escapes the comparison.",
      [
        n("anchoring", "Anchor two ways", {
          type: "tactic",
          summary:
            "The buyer's perceived gap should be 10× to 100× between stacked value and price; and you can charge up to ~100× direct cost while still being a steal.",
        }),
        n("virtuous-cycle", "Virtuous Cycle of Price", {
          type: "tactic",
          summary:
            "Higher price → more emotional investment → better results → more proof → more demand → higher price. Cutting price runs the loop backward. Price should sting; those who pay the most pay the most attention.",
        }),
        n("model-match", "Match the delivery model", {
          type: "tactic",
          summary: "DIY sits low and volume-based, DWY mid, DFY premium.",
        }),
        n("tiers", "Tiers", {
          type: "tactic",
          summary:
            "Entry (DIY), Core (DWY), Premium (DFY). Engineer clear value jumps, make the middle tier the obvious pick, and let the top tier anchor it.",
        }),
        n("psychology", "Price psychology", {
          type: "tactic",
          summary:
            "Charm pricing (27/97/297) under ~$300; round numbers for premium tiers ($1,000+); show the highest anchor first.",
        }),
        bullets(
          "justification",
          "Justification story in five beats",
          [
            "Restate the outcome",
            "Quantify what it is worth in money gained, time saved, or pain avoided",
            "Compare against alternatives",
            "Anchor the full stack",
            "Reveal the price as a fraction of value",
          ],
          { type: "tactic" },
        ),
        n("raise-after-value", "Raise price only after raising value", {
          type: "rule",
          summary:
            "Being the most expensive carries strategic benefit; being second-cheapest carries none.",
        }),
        bullets(
          "raise-when",
          "Raise when",
          [
            "Demand exceeds capacity",
            "Close rates are high without price flinching",
            "Refunds are low",
            "The extra margin funds better delivery",
            "Test on new cohorts and grandfather existing buyers",
          ],
          { type: "tactic" },
        ),
        n("payment-plans", "Payment plans lower the entry barrier", {
          type: "rule",
          summary:
            "Use them never to lower the price. Chargebacks aside, a discount is a permanent education in negotiability.",
        }),
        bullets(
          "experiments",
          "Experiments to run in order",
          [
            "A/B the price point on new cohorts",
            "Test a payment plan against a single payment",
            "Test a bonus versus a discount of equal cost",
            "Test early-bird pricing against a hard deadline",
            "Test tier framing (which tier is presented as the default)",
            "Change one variable at a time and judge on cash collected, not units sold",
          ],
          { type: "tactic" },
        ),
      ],
      { links: ["money.cfa", "scaling.price-raises", "money.downsells", "sales.rules"] },
    ),

    group(
      "naming",
      "Naming (MAGIC) and positioning angles",
      "MAGIC gives you five slots to fill. Use 3-5 of the five slots, keep it short, and generate 5-10 variants before choosing. Kill generic labels like \"Gold Package.\"",
      [
        bullets(
          "magic",
          "MAGIC",
          [
            ["M - Magnetic reason-why", "Why this exists, why now."],
            ["A - Avatar", "Named plainly (\"for busy dads\")."],
            ["G - Goal", "A concrete goal (\"lose 20 lbs\")."],
            ["I - Interval", "A time interval (\"in 6 weeks\")."],
            ["C - Container", "A word to close the name: Blueprint, Challenge, Bootcamp, Accelerator, System."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        bullets(
          "angles",
          "Positioning angles",
          [
            "Niche ownership (\"the X for Y\")",
            "Named mechanism (name your process)",
            "Speed (\"in Z days\")",
            "Subtraction (\"without X\")",
            "Proof (\"used by N\")",
            "Category creation (make a category of one)",
          ],
          { type: "tactic" },
        ),
        n("refresh", "Refresh fatigued offers by changing the wrapper", {
          type: "tactic",
          summary:
            "New name, container, or mechanism framing - not the underlying machine.",
        }),
      ],
      { links: ["leads.hooks", "offers.scarcity"] },
    ),

    rules("rules", "Decision rules & thresholds", [
      "Market > Offer > Persuasion is non-negotiable. Fix the crowd before touching the copy.",
      "All four market criteria must score ≥7/10. Anything lower is a stop-and-reposition signal.",
      "Niche potential up to ~100× same product; below roughly $10M/year, niche further rather than broaden.",
      "Value gap: stacked component value ≥10× price (up to 100× acceptable for low-ticket digital). If the gap is under 10×, add components or raise price perception before spending on traffic.",
      "Price ceiling ≈100× direct cost, provided the buyer still sees a steal.",
      "Demand fractal ≈1/5 of buyers pay ≈5× - build a premium path or leave money on the table.",
      "Urgency math: 50-60% of sales landing in a final-hours spike means the deadline is believed; no spike means it is not.",
      "Guarantee math: compare refund + fulfillment cost to conversion lift. Typical refund rates under ~5%. Fix the guarantee terms, not the offer quality, when the math fails.",
      "Bonus threshold: summed bonus value must exceed the core price by itself.",
      "Refund watch: above ~5%, fix delivery and onboarding before scaling acquisition.",
      "Audit scoring per driver: below 7/10 means fix before scaling spend.",
      "Price resistance is usually a value-perception problem - raise value or add a bonus, never cut price.",
      "Naming: 3-5 MAGIC components; if it fails the \"who + result + timeframe\" test, rename.",
      "Grow-or-die baseline: flag sub-9% annual growth for a market or offer problem, not a funnel problem.",
    ]),

    checklist("build", "Build checklist", [
      "Market scores ≥7 on all four criteria and is growing",
      "Avatar fits in one sentence with a real, findable home",
      "Dream outcome stated as result + timeframe + removed pain",
      "All four value-equation drivers scored; weakest has a specific fix",
      "10-15+ obstacles mapped before, during, and after purchase",
      "Every obstacle has a named solution and a chosen delivery vehicle",
      "Trim pass complete (high-cost/low-value cut first)",
      "Components individually priced; total value ≥10× price",
      "Offer cannot be line-item compared to a competing product",
      "Three or more bonuses, each tied to one objection and priced",
      "Guarantee has teeth and matches ticket size and fulfillment cost",
      "Scarcity is real and stated in numbers (seats, slots, deadline)",
      "Urgency mechanism has a genuine expiry",
      "Name uses 3-5 MAGIC components",
      "First win engineered and stated in days, not months",
      "Premium-first price with payment plan if cash is the barrier",
    ]),

    checklist("audit", "Offer audit checklist", [
      ["Critical - market fails criteria", "Market fails one or more of the four criteria."],
      ["Critical - vague dream outcome", "Dream outcome is a feature or a vague verb (\"grow,\" \"improve\")."],
      ["Critical - no proof", "No proof raised for perceived likelihood (no testimonials, mechanism, or track record)."],
      ["Critical - price ignores value stack", "Price exceeds or ignores the value stack."],
      ["High - slow first win", "Time-to-first-win exceeds the buyer's patience horizon."],
      ["High - effort unchanged", "Effort unchanged versus alternatives (DIY sold to buyers who need DFY)."],
      ["High - no guarantee", "No guarantee, or a guarantee without teeth."],
      ["High - weak bonuses", "Bonuses generic, unpriced, or unrelated to objections."],
      ["High - urgency absent or faked", "Urgency absent or faked."],
      ["Medium - weak name", "Name lacks avatar, goal, or timeframe."],
      ["Medium - no payment plan", "No payment plan where price exceeds an impulse."],
      ["Medium - no category of one", "Positioning not in a category of one."],
      ["Medium - objections unanswered", "Objections unanswered at the point they arise."],
      ["Low - features before outcomes", "Copy leads with features before outcomes."],
      "Score each audit area 1-10: 1-3 critical, 4-6 needs work, 7-8 solid, 9-10 strong. Return the top three fixes with expected impact before listing the rest.",
    ]),

    mistakes("mistakes", "Common mistakes", [
      "Competing on price or benchmarking against broke rivals",
      "Cutting price instead of stacking bonuses",
      "Undercharging out of fear, starving delivery and proof in the process",
      "Niche-hopping before compounding has a chance to work",
      "Over-optimizing the top of the equation (bigger claims) while ignoring time and effort",
      "Solving only some of the buyer's problems, leaving the offer comparable",
      "Getting romantic about the delivery mechanism instead of the outcome",
      "Discounting the core and teaching buyers to negotiate",
      "Toothless guarantees, or none at all because refunds are feared without math",
      "Fake scarcity or urgency, and never announcing a real sellout",
      "Rebuilding the whole offer when only the wrapper was tired",
      "Generic naming and description (\"Premium Plan,\" \"bonus content\")",
      "Perfecting a scalable machine before demand exists",
    ]),

    group(
      "output",
      "Output contract",
      "Every offer build or audit ends with a fixed set of sections. Numbers everywhere: scores, timeframes, values, deadlines. No claim without a figure.",
      [
        n("build-sections", "Build sections", {
          type: "tactic",
          summary:
            "Market snapshot with four-criteria scores; avatar; dream outcome; obstacle map; solution map (obstacle → solution → vehicle); core offer; value stack (component → standalone value → total); bonus stack; guarantee with exact wording; scarcity/urgency mechanism with reason-why; price with justification story; name options; positioning statement; hooks and CTA; next actions.",
        }),
        n("audit-sections", "Audit sections", {
          type: "tactic",
          summary:
            "Offer summary; overall diagnosis (strengths, weaknesses); four-driver scores with issues and fixes each; market fit; offer structure; value stack; pricing; messaging; objections and trust; top three prioritized fixes; quick wins.",
        }),
        n("artifact", "Save artifact: OFFER.md / OFFER_AUDIT.md", {
          type: "artifact",
          summary: "Artifacts save to Startup/Hormozi/Outputs/ in the vault with frontmatter and a link back to the MOC.",
        }),
      ],
      { links: ["harness.artifacts"] },
    ),

    examples("examples", "Worked examples", [
      [
        "Offer scored and improved (online fitness coach at $99/mo)",
        "Before: dream outcome \"get fit\" (DO 3 - vague, no timeframe), no proof (PL 4), no fast win (T 5 - results in months), DIY meal planning (E 6). Index = (3×4)÷(5×6) = 0.4. After: \"Lose 20 lbs in 12 weeks without giving up restaurants\" (DO 8); 50 before/after cases plus a named method (PL 8); first win in week 1 via onboarding and a 24-hour plan (T 2); done-for-you weekly meal plans and grocery lists (E 2). Index = (8×8)÷(2×2) = 16 - roughly 40× the perceived value, same underlying service.",
      ],
      [
        "Pricing decision (course with a $2,400 stack)",
        "At $97 the gap is ~25× and the buyer discounts it as cheap; at $297 the gap is ~8× with a price that funds real support and signals premium. Ship $297, with a $97 entry tier (templates only) and a $1,200 DFY tier as anchor. Raise to $397 once demand exceeds cohort capacity and refunds stay under ~5%.",
      ],
      [
        "Guarantee choice",
        "Low-ticket digital ($39): unconditional 30-day refund. Mid-ticket cohort ($3,000, ~$800 fulfillment): conditional with teeth - complete 8 weeks of check-ins and if there is no measurable result, full refund plus 8 more weeks of coaching free. Consumable or download: anti-guarantee with a reason-why (\"all sales final - you receive the files immediately\"), backed by heavy social proof. Run the math on each: if refund exposure breaks the model, tighten the action requirements before weakening the promise.",
      ],
    ]),
  ],
});
