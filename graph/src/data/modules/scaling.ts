import { n, group, bullets, rules, checklist, mistakes, examples, table } from "../dsl";

export const scaling = n("scaling", "Scaling & Retention", {
  type: "module",
  summary:
    "Revenue = Customers × Revenue per Customer × Purchase Frequency. Pull price first, frequency second, new customers last. Diagnose in reverse: profit → retention → delivery → conversion → leads.",
  children: [
    bullets(
      "triggers",
      "Load this when",
      [
        "Growth has flatlined and you cannot tell whether the constraint is leads, sales, delivery, or retention",
        "You are deciding whether to raise prices, by how much, and how to tell customers",
        "Churn is rising, or you cannot explain why customers leave",
        "You need to pick or switch a business model: service, productized, product, subscription, high-ticket, hybrid",
        "You are making a first hire, adding a manager, or trying to stop being the bottleneck",
        "You want more revenue per customer without buying more traffic",
        "You are planning capacity before the next demand spike",
        "You are evaluating an exit, a hold, or a portfolio move",
      ],
      { type: "trigger", summary: "Triggers that route a session into the Scaling module." },
    ),

    group(
      "growth-levers",
      "Growth levers & leverage types",
      "Revenue moves through exactly three levers. Every tactic feeds one of them.",
      [
        n("equation", "Revenue = Customers × Revenue per Customer × Purchase Frequency", {
          type: "rule",
          summary: "Pull them in this order: 1) Price first - the increase costs almost nothing beyond a conversation and flows straight to profit. Test it before spending another dollar on ads. 2) Frequency second - more purchases per customer beats buying strangers. 3) New customers last - acquisition is the most expensive lever.",
        }),
        bullets(
          "rpc-tactics",
          "Revenue-per-customer tactics",
          [
            "Raise list price",
            "Add a premium tier",
            "Bundle",
            "Upsell at point of sale",
            "Cross-sell an adjacent need",
          ],
          { type: "tactic" },
        ),
        bullets(
          "frequency-tactics",
          "Frequency tactics",
          [
            "Membership or subscription",
            "Consumables",
            "Sequential programs (Level 1 → 2 → 3)",
            "Reactivation campaigns",
            "Retention work that extends lifespan",
          ],
          { type: "tactic" },
        ),
        table(
          "leverage-types",
          "Four leverage types (stack in sequence)",
          [
            ["Labor", "Other people's work - hire, train, build a management layer."],
            ["Capital", "Other people's money - paid ads, inventory, acquisitions, tooling."],
            ["Code", "Software and automation - self-serve onboarding, digital products, AI."],
            ["Media", "Content and brand - videos, books, podcasts that compound while you sleep."],
          ],
          { summary: "Most operators only use labor, and only their own. The compounding sits in stacking code and media on top of labor and capital." },
        ),
      ],
      { links: ["money.stack", "mindset.leverage", "leads.growth-levers"] },
    ),

    group(
      "stages",
      "Scaling stages roadmap (0-9)",
      "Do not skip stages. Each one installs the muscle the next one needs.",
      [
        group(
          "roadmap",
          "Stage → what changes → your job → graduation test",
          "Re-run the model at every stage. The skill that got you to $1M will not get you to $10M.",
          [
            group("s0", "0 - Improvise", "Nothing proven yet.", [
              n("changes", "What changes", { type: "tactic", summary: "Nothing proven yet." }),
              n("job", "Your job", { type: "tactic", summary: "Talk to prospects, hand-deliver, find a repeated problem." }),
              n("graduate", "Graduate when", { type: "rule", summary: "People try it for free and come back." }),
            ], { type: "component" }),
            group("s1", "1 - Monetize", "First revenue.", [
              n("changes", "What changes", { type: "tactic", summary: "First revenue." }),
              n("job", "Your job", { type: "tactic", summary: "Sell manually, validate the price, prove people pay." }),
              n("graduate", "Graduate when", { type: "rule", summary: "Sales become consistent." }),
            ], { type: "component" }),
            group("s2", "2 - Advertise", "Predictable acquisition.", [
              n("changes", "What changes", { type: "tactic", summary: "Predictable acquisition." }),
              n("job", "Your job", { type: "tactic", summary: "Run paid or repeatable lead gen, track CAC." }),
              n("graduate", "Graduate when", { type: "rule", summary: "You acquire customers at a profit." }),
            ], { type: "component" }),
            group("s3", "3 - Stabilize", "Systems and a small team. The hard stage.", [
              n("changes", "What changes", { type: "tactic", summary: "Systems and a small team." }),
              n("job", "Your job", { type: "tactic", summary: "Document processes, hire delivery, reduce founder hours." }),
              n("graduate", "Graduate when", { type: "rule", summary: "The business runs two weeks without you." }),
            ], { type: "component" }),
            group("s4", "4 - Prioritize", "Focus.", [
              n("changes", "What changes", { type: "tactic", summary: "Focus." }),
              n("job", "Your job", { type: "tactic", summary: "Audit every activity, kill low-value work, keep 1-2 channels." }),
              n("graduate", "Graduate when", { type: "rule", summary: "You say no by default." }),
            ], { type: "component" }),
            group("s5", "5 - Productize", "Scalable delivery.", [
              n("changes", "What changes", { type: "tactic", summary: "Scalable delivery." }),
              n("job", "Your job", { type: "tactic", summary: "Standardize the offer, make onboarding self-serve." }),
              n("graduate", "Graduate when", { type: "rule", summary: "New customers onboard with no calls." }),
            ], { type: "component" }),
            group("s6", "6 - Optimize", "Margins and retention.", [
              n("changes", "What changes", { type: "tactic", summary: "Margins and retention." }),
              n("job", "Your job", { type: "tactic", summary: "Test everything, cut churn, lift LTV." }),
              n("graduate", "Graduate when", { type: "rule", summary: "Every key metric is tracked and improving." }),
            ], { type: "component" }),
            group("s7", "7 - Categorize", "Positioning.", [
              n("changes", "What changes", { type: "tactic", summary: "Positioning." }),
              n("job", "Your job", { type: "tactic", summary: "Name the category you want to own, become the reference." }),
              n("graduate", "Graduate when", { type: "rule", summary: "Media and competitors cite you." }),
            ], { type: "component" }),
            group("s8", "8 - Specialize", "Depth, not breadth.", [
              n("changes", "What changes", { type: "tactic", summary: "Depth, not breadth." }),
              n("job", "Your job", { type: "tactic", summary: "Go deeper on the one thing you are best at." }),
              n("graduate", "Graduate when", { type: "rule", summary: "Premium pricing, inbound demand." }),
            ], { type: "component" }),
            group("s9", "9 - Capitalize", "Endgame.", [
              n("changes", "What changes", { type: "tactic", summary: "Endgame." }),
              n("job", "Your job", { type: "tactic", summary: "Clean the books, evaluate options, decide." }),
              n("graduate", "Graduate when", { type: "rule", summary: "Exit or hold decision is made." }),
            ], { type: "component" }),
          ],
          { type: "component" },
        ),
        n("stage-3", "Stage 3 is the hard one", {
          type: "rule",
          summary: "If a two-week absence breaks the business, you have not graduated.",
        }),
      ],
      { links: ["offers.market", "scaling.operator-owner", "mindset.focus"] },
    ),

    group(
      "bottleneck",
      "Bottleneck diagnosis",
      "Diagnose in reverse order: profit → retention → delivery → conversion → leads. Most stalled businesses assume they have a lead problem when they actually have a delivery or retention problem.",
      [
        table(
          "symptoms",
          "Symptom → bottleneck → first fix",
          [
            ["Revenue is fine, margins are thin", "Profit → raise price, cut unprofitable products or customers, cut delivery cost."],
            ["Customers leave within 90 days", "Retention → fix onboarding, prove results, add touchpoints and community."],
            ["Quality drops as volume rises; waitlist forms", "Delivery → productize, standardize, hire, add capacity."],
            ["Traffic is fine, close rate is low", "Conversion → sharpen the offer, add proof, fix the sales process."],
            ["Pipeline is empty", "Leads → add volume and a second channel; fix downstream first."],
          ],
          { summary: "Work one bottleneck at a time. Pumping more traffic into a broken delivery or leaky retention system just makes the leak bigger." },
        ),
      ],
      { links: ["leads.audit", "sales.audit", "scaling.retention", "scaling.model-choice"] },
    ),

    group(
      "model-choice",
      "Business model choice",
      "No proof, no audience, cash needed → sell a service. Repeatable delivery and time is the constraint → productize the service. Audience or cheap traffic plus scale ambition → build a product. Ongoing value plus retention capability → add subscription. Strong trust plus a transformation → go high-ticket.",
      [
        table(
          "models",
          "Model → best when → tradeoff",
          [
            ["DFY service", "You have skill and no proof or audience; you need cash now → capped by your hours."],
            ["Productized service (DWY)", "Results repeat and you want leverage → still some time per customer."],
            ["Digital product (DIY)", "You have traffic or an audience → needs distribution; lower perceived value."],
            ["Subscription / continuity", "Ongoing value exists and you can retain people → churn becomes the whole game."],
            ["High-ticket", "Trust and proof are strong → fewer buyers; longer sales cycle."],
            ["Low-ticket volume", "Traffic is cheap and able to scale → thin margin per unit; volume dependent."],
            ["Hybrid", "You want income now and scale later → more moving parts to manage."],
          ],
          { summary: "Hybrid means one cash engine plus one leverage engine. Do not run four models before either one works." },
        ),
        n("evolution", "Typical evolution", {
          type: "rule",
          summary:
            "Service → productized service → product → ecosystem/portfolio. Each step demands a different skill set; plan the transition before the ceiling arrives.",
        }),
      ],
      { links: ["offers.delivery", "money.stack", "mindset.leverage"] },
    ),

    group(
      "operator-owner",
      "Operator → owner transition",
      "Four phases, in order. Your direct reports should run departments, not tasks.",
      [
        bullets(
          "phases",
          "The four phases",
          [
            ["Write it down", "Record yourself doing every task for a week. Convert recordings into step-by-step checklists with decision trees for judgment calls. Define what \"done right\" means with numbers."],
            ["Hire against the document", "Interview with the SOP, not your gut. Train by demonstrating, then co-delivering, then observing them run it solo. Set KPIs per role and review a scorecard weekly."],
            ["Build the management layer", "Promote proven performers to run their function. Give managers authority over their domain - process, hiring, firing - and hold them to team results."],
            ["Remove yourself", "Stop attending operational meetings. Spend your time on capital allocation, strategy, and talent. Leave for two weeks; every interruption that reaches you is an unfinished system - fix it."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        bullets(
          "hiring-rules",
          "Hiring rules",
          [
            "Run the $/hour test. Anything a $20/hour person can do that a $200/hour person is doing is a delegation leak.",
            "Hire only when the task recurs weekly, a written process exists, and the role's output covers roughly three times its loaded cost.",
            "Span of control: 5-7 direct reports per manager. Beyond that, add a layer or split the team.",
            "Hire deliberately, exit quickly - slow decisions on the wrong person cost more than a bad two weeks.",
          ],
          { type: "tactic" },
        ),
      ],
      { links: ["mindset.leverage", "scaling.stages", "scaling.rules"] },
    ),

    group(
      "retention",
      "Retention system",
      "Track five drivers of staying power. Fix retention before buying more traffic.",
      [
        group(
          "drivers",
          "Five drivers of staying power",
          "Every driver has an owner and a trigger.",
          [
            group("results", "Results", "They get what they paid for.", [
              n("move", "Your move", { type: "tactic", summary: "Track usage and outcomes; intervene when results stall." }),
            ], { type: "component" }),
            group("engagement", "Engagement", "They actively use the product.", [
              n("move", "Your move", { type: "tactic", summary: "Flag drop-offs within 7 days and reach out." }),
            ], { type: "component" }),
            group("community", "Community", "They belong.", [
              n("move", "Your move", { type: "tactic", summary: "Rituals, groups, member events, peer connections." }),
            ], { type: "component" }),
            group("progress", "Progress", "They can see improvement.", [
              n("move", "Your move", { type: "tactic", summary: "Dashboards, milestones, visible wins." }),
            ], { type: "component" }),
            group("surprise", "Surprise", "You beat expectations.", [
              n("move", "Your move", { type: "tactic", summary: "Unexpected extras, personal touches, over-delivery." }),
            ], { type: "component" }),
          ],
          { type: "component" },
        ),
        group(
          "churn-taxonomy",
          "Churn taxonomy and save plays",
          "Treating all churn as one problem hides the fix. Each type has a different save play.",
          [
            group("happy", "Happy churn", "They got the result and no longer need you.", [
              n("fix", "Fix", { type: "tactic", summary: "Build an ascension path to the next level." }),
            ], { type: "component" }),
            group("unhappy", "Unhappy churn", "They did not get the result.", [
              n("fix", "Fix", { type: "tactic", summary: "Better onboarding and delivery." }),
            ], { type: "component" }),
            group("payment", "Payment churn", "Declines and failed charges.", [
              n("fix", "Fix", { type: "tactic", summary: "Card updaters, dunning, grace periods." }),
            ], { type: "component" }),
            group("life", "Life churn", "Moves, job changes, budget shifts.", [
              n("fix", "Fix", { type: "tactic", summary: "Pause and downgrade options before cancellation." }),
            ], { type: "component" }),
          ],
          { type: "component" },
        ),
        bullets(
          "cadence",
          "Cadence rules",
          [
            "The first 48 hours decide the relationship. Engineer one quick win immediately.",
            "One meaningful touch weekly minimum; one progress artifact monthly; one renewal or review conversation quarterly.",
            "Trigger a human outreach when usage drops for 7 days, before the customer ever clicks cancel.",
            "At cancellation intent, offer pause or downgrade first, then ask what change would keep them and genuinely try to solve it.",
            "Celebrate milestones publicly - recognition is cheaper than advertising and compounds.",
            "Sell prepay where possible: annual pricing or \"pay 10, get 12\" locks commitment and funds growth.",
            "Fix billing hygiene early; silent payment failure is the easiest churn to prevent.",
          ],
          { type: "tactic" },
        ),
        n("churn-math", "Churn math", {
          type: "rule",
          summary:
            "15% monthly churn → only ~17% of a cohort survives a year (lose ~83%). Reduce monthly churn from 10% to 5% → average lifespan doubles (10 → 20 months). At $100/mo, that doubles LTV from $1,000 to $2,000.",
        }),
      ],
      { links: ["money.continuity", "money.downsells", "scaling.ltv", "sales.audit"] },
    ),

    group(
      "ltv",
      "LTV expansion",
      "LTV = Revenue per Customer × Average Lifespan × Gross Margin %. Every monetization decision should move one of these three numbers. LTV sets how much you can afford to pay for a customer - and whoever can pay the most to acquire one, wins.",
      [
        table(
          "ascension",
          "Ascension ladder",
          [
            ["Rung 1 - Free", "Content, community. Build trust and capture contact info."],
            ["Rung 2 - $7-97", "Book, template, mini-course. Convert followers into buyers."],
            ["Rung 3 - $500-2,000", "Course, workshop, group program. Deliver the core transformation."],
            ["Rung 4 - $3,000-25,000", "Coaching, done-with-you, intensive. Accelerate results."],
            ["Rung 5 - $25,000+", "Done-for-you, mastermind, 1:1. Maximum speed and personalization."],
          ],
          { summary: "Build rungs that create demand for the next rung." },
        ),
        bullets(
          "levers",
          "Eight levers to raise LTV",
          [
            "Raise price on new buyers.",
            "Cut delivery cost per customer.",
            "Increase how often they buy.",
            "Cross-sell a complementary product.",
            "Sell larger quantities or bigger packages.",
            "Upgrade them to a higher-quality tier.",
            "Reduce how many take the cheap downsell.",
            "Repackage the downsell so it still carries margin.",
          ],
          { type: "tactic" },
        ),
        bullets(
          "expansion-plays",
          "Other expansion plays",
          [
            "Upsell immediately after the first purchase, while intent is hot; save high-ticket asks for built trust.",
            "Add continuity so revenue recurs instead of resetting to zero each month.",
            "Prefer annual prepay: $200/mo becomes $1,500/yr - the customer saves, you get cash and commitment now.",
            "Move customers up the margin stack over time: digital (90%+) → group (70-85%) → productized (50-70%) → bespoke (30-50%).",
            "LTV math to remember: 190 sales at $50 profit = $9,500; converting 5% to a $9,500-profit backend = $90,250 from the same customers.",
          ],
          { type: "tactic" },
        ),
      ],
      { links: ["money.cfa", "money.continuity", "scaling.retention", "leads.rules"] },
    ),

    group(
      "price-raises",
      "Raising prices",
      "Raise when: close rate is high, capacity or waitlist is tight, demand outruns supply, or you have not raised in 6-12 months. Do not raise to fix a weak offer - fix the offer first, then price.",
      [
        n("impact-math", "Impact math", {
          type: "rule",
          summary:
            "Double the price, lose 20% of buyers: Before 10 × $5,000 = $50,000. After 8 × $10,000 = $80,000. 60% more revenue with 20% less delivery work.",
        }),
        bullets(
          "communication",
          "Communication plan (the five moves)",
          [
            ["Recap the value already delivered", "Pull real usage and outcome numbers, personalized to the customer. Make the past concrete before mentioning the future."],
            ["State the change plainly, up front", "One sentence. Do not bury it under paragraphs of praise."],
            ["Show where the money goes", "Two or three investments you are already committed to, each paired with a direct benefit to them."],
            ["Give loyal customers a buffer", "A credit, a lock-in window at the old rate, or stair-stepped discounts so the increase lands in smaller steps."],
            ["Open a private door", "End with a personal line inviting anyone in genuine hardship to reply so you can find a workable arrangement, handled privately."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        bullets(
          "execution",
          "Execution checklist",
          [
            "Test on new customers first. Watch conversion and early retention for 60-90 days before rolling out.",
            "Segment existing customers from new ones before you announce anything.",
            "Grandfather current customers with a clear end date; urgency today, clarity about tomorrow.",
            "If the increase is 50% or more, deliver it individually where call volume allows.",
            "For large jumps, stair-step: let a discount expire in stages rather than raising the headline price in one leap. People tolerate fading discounts better than sudden increases.",
            "Send and sign personally. All replies should reach you, not a support queue.",
          ],
          { type: "tactic" },
        ),
        n("template", "Fresh email template (write your own numbers in)", {
          type: "tactic",
          summary:
            "Subject: Your [product] rate changes on [date]. Short version first; recap their usage/outcomes since joining; state new price and grandfather window; show where the increase goes (investment → benefit); close with a private reply line for hardship cases. Send and sign personally.",
        }),
      ],
      { links: ["offers.pricing", "money.fast-cash", "sales.rules", "money.cfa"] },
    ),

    rules("rules", "Decision rules & thresholds", [
      "Monthly churn: under 5% is healthy; above 5% investigate immediately; above 10% is an emergency. 15% monthly wipes out ~83% of a year's customers.",
      "LTV:CAC must be at least 3:1 before you scale spend; below 1:1, stop acquiring and fix the model.",
      "Payback period: under 30 days is excellent, under 90 days is solid, beyond 12 months is only survivable with prepay or capital.",
      "Net revenue retention above 100% means expansion revenue outruns churn; below 100% means the bucket leaks.",
      "Gross margin targets: services above 70%, products above 50%.",
      "Raise price when close rate exceeds 50%, capacity is full, or it has been 6-12 months since the last increase. Never raise while conversion is weak.",
      "Fix retention before buying more traffic. Acquiring into a leak is the most expensive mistake in the business.",
      "Start hiring or productizing when delivery utilization passes 80%; do not push more demand first.",
      "Hire when: the task repeats weekly, the process is written, the role's output covers ~3× its cost, and it removes you from the constraint. Otherwise, wait.",
      "One growth channel at a time until it saturates. Two half-run channels beat nothing.",
      "Revenue per employee should rise over time; founder hours inside delivery should fall.",
      "If a two-week absence breaks the business, systems work outranks growth work.",
    ]),

    checklist("build", "Build checklist", [
      "Write your revenue equation with real numbers: customers × revenue per customer × frequency.",
      "Identify which growth lever is weakest and fix it before adding spend.",
      "Map your current stage (0-9) and the one graduation test you have not passed.",
      "Name the single current bottleneck (profit, retention, delivery, conversion, or leads).",
      "Write your LTV, CAC, payback period, and gross margin on one page.",
      "Build or repair onboarding so a customer gets a visible win within 48 hours.",
      "Install a weekly touch and a monthly progress artifact for every customer.",
      "Build one save sequence: usage-drop trigger, cancel-intent trigger, pause/downgrade option.",
      "Add one continuity or prepay offer with clear math.",
      "List your ascension ladder from free to premium and price each rung.",
      "Schedule the next price raise window and the test group for it.",
      "Document the one task you repeat most often; it is your first delegation target.",
      "Run the $/hour test on your calendar for one week.",
      "Set the two-week absence test date and list everything that pings you.",
    ]),

    checklist("audit", "Audit checklist (stalled growth / leaky bucket)", [
      "Is gross margin positive after delivery costs? If not, fix pricing and delivery cost first.",
      "Is monthly churn under 5%? If not, retention is the project.",
      "Does a new customer get a result or visible win inside 48 hours? If not, fix onboarding.",
      "Does usage data trigger human outreach within 7 days of a drop? If not, add the trigger.",
      "Is delivery capacity under 80% utilization? If not, hire or productize before more demand.",
      "Is close rate healthy? If not, repair the offer, proof, and sales process.",
      "Is LTV:CAC at 3:1 or better? If not, do not scale acquisition.",
      "Is payback under 90 days? If not, add prepay or a front-end offer to finance acquisition.",
      "Is pipeline full? If not - and only if the earlier checks pass - add lead volume.",
      "Is the founder still in delivery? If yes, document and delegate the top recurring task.",
      "Is revenue per employee trending up? If not, cut low-value work and low-value customers.",
      "Is there a written plan for the next stage (0-9) and its graduation test? If not, write it.",
      "Work down this ladder and stop at the first failure.",
    ]),

    mistakes("mistakes", "Common mistakes", [
      "Buying more traffic before fixing retention or delivery - scaling a leak",
      "Hiring before documenting the role, then blaming the hire",
      "Keeping customers who are unprofitable because their revenue looks good",
      "Cutting price to grow instead of adding bonuses or raising value",
      "Building a product ladder and never inviting anyone to the next rung",
      "Treating all churn as one problem instead of separating happy, unhappy, payment, and life churn",
      "Choosing a model that fights your constraints (a high-touch service with no time, a volume product with no traffic)",
      "Raising price silently, or announcing it without a grandfather window, and torching goodwill",
      "Confusing revenue growth with profit growth",
      "Letting the founder stay the highest-paid delivery person in the company",
      "Running four leverage types or four channels at once, so none gets enough attention",
      "Skipping the two-week absence test and discovering the dependency during a crisis",
    ]),

    group(
      "output",
      "Output contract",
      "When asked to plan scaling, produce these sections.",
      [
        n("scaling-sections", "Scaling plan sections", {
          type: "tactic",
          summary:
            "Current stage (0-9) and evidence; bottleneck diagnosis; model and leverage assessment; retention plan (churn taxonomy, levers, cadence); LTV expansion plan (ascension ladder, pricing); hiring and systems plan; 90-day actions with owners; metrics and thresholds to watch.",
        }),
        n("retention-sections", "Retention / pricing plan sections", {
          type: "tactic",
          summary:
            "Baseline metrics (churn, LTV, CAC, payback); diagnosis; proposed changes with impact math; communication plan; test design and timeline; rollback criteria.",
        }),
        n("artifact", "Save artifact: SCALING_PLAN.md / RETENTION_PLAN.md", {
          type: "artifact",
          summary: "Artifacts save to Startup/Hormozi/Outputs/ in the vault.",
        }),
      ],
      { links: ["harness.artifacts"] },
    ),

    examples("examples", "Worked examples", [
      [
        "Churn impact math",
        "$100/mo membership, 10% monthly churn → ~10-month average life → LTV ≈ $1,000. Cut churn to 5% → ~20 months → LTV ≈ $2,000. With CAC of $500, LTV:CAC moves from 2:1 (unsafe to scale) to 4:1 (room to buy customers aggressively). One retention fix doubled the money available for growth.",
      ],
      [
        "Price raise plan",
        "10 buyers/quarter at $5,000. Test $10,000 on new buyers for 60 days: 8 close, similar retention → $80,000 vs $50,000 per cohort. Then notify existing customers: recap each account's outcomes, hold their old rate for six months, drop a credit, and reply personally to hardship cases. Result: 60% more revenue on 20% less delivery.",
      ],
      [
        "First hire decision",
        "Founder spends 15 hours/week on onboarding (a $20/hour task) while $200/hour offer work waits. Document onboarding as a checklist, measure it for two weeks, then hire at ~$3,000/month. The role unlocks 15 founder hours plus faster onboarding. If it does not cover roughly three times its cost in recovered capacity or retention, do not hire yet.",
      ],
    ]),
  ],
});
