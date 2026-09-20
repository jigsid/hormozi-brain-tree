import { n, group, bullets, rules, checklist, mistakes, examples, table } from "../dsl";

export const leads = n("leads", "Leads", {
  type: "module",
  summary:
    "Get attention and turn it into engaged leads: channel choice, lead magnets, outreach, ads, content, hooks, nurture, and the More/Better/New growth levers.",
  children: [
    bullets(
      "triggers",
      "Load this when",
      [
        "You need more leads and don't know which channel to pick",
        "You're choosing a first acquisition channel or deciding when to add a second",
        "You're building, naming, or fixing a lead magnet",
        "Warm or cold outreach is getting silence; you need volume targets, scripts, and follow-up structure",
        "You're planning paid ads and need budget, testing, and kill rules",
        "You're building a content engine, hook batch, or repurposing system",
        "You're diagnosing why leads are low: offer, channel, targeting, hook, or follow-up",
        "You're setting speed-to-lead and nurture cadence",
        "You're deciding between more volume, fixing the constraint, or opening a new channel",
      ],
      { type: "trigger", summary: "Triggers that route a session into the Leads module." },
    ),

    group(
      "core-four",
      "Core Four (warm/cold × 1:1/1:many)",
      "Every way to advertise fits one box. Warm = people who gave you permission to contact them. Cold = strangers. The difference in execution is trust.",
      [
        table(
          "matrix",
          "The matrix",
          [
            ["1-to-1 × warm - Warm outreach", "Private messages to people who know you."],
            ["1-to-1 × cold - Cold outreach", "Private messages to strangers."],
            ["1-to-many × warm - Post free content", "Public content to your own audience."],
            ["1-to-many × cold - Run paid ads", "Public advertising to other people's audiences."],
          ],
          { summary: "Warm = permission. Cold = strangers." },
        ),
        bullets(
          "definitions",
          "Lead vs engaged lead",
          [
            ["Lead", "Anyone you can contact."],
            ["Engaged lead", "Someone who shows interest (replies, follows, gives info, raises a hand)."],
            "Optimize for engaged leads, not raw names.",
          ],
          { type: "tactic", parentType: "component" },
        ),
        n("first-move", "First move: advertise the core offer directly", {
          type: "tactic",
          summary:
            "Build a lead magnet only when the offer is expensive, complex, or has a long decision cycle.",
        }),
        bullets(
          "channel-selection",
          "Channel selection",
          [
            ["$0 budget, no audience", "Fastest path to first sale → warm outreach."],
            ["Some audience, limited budget", "Want compounding → post free content."],
            ["B2B, high-ticket, no audience", "List available → cold outreach."],
            ["Proven offer plus budget", "Want scale → paid ads (do this last)."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        n("master-one", "Master one before adding another", {
          type: "rule",
          summary:
            "Most operators run all four badly instead of one well. If leads are short, the problem is almost never \"wrong strategy\" - it's insufficient skill or insufficient volume in the channel you already picked.",
        }),
        n("channel-order", "When you max a channel", {
          type: "tactic",
          summary: "Add the next one in this order: warm outreach → content → cold and/or paid.",
        }),
        group(
          "lead-getters",
          "Four Lead Getters (leverage)",
          "Other people advertise for you.",
          [
            n("referrals", "Customer referrals", {
              type: "tactic",
              summary: "Cheapest, highest quality. Check referrals > churn. Aim for ≥25% of new business from referrals.",
            }),
            n("employees", "Employees", {
              type: "tactic",
              summary: "Recruit with the Internal Core Four; train with Document, Demonstrate, Duplicate.",
            }),
            n("agencies", "Agencies", {
              type: "tactic",
              summary: "Use to learn a method on a deadline, then take it in-house.",
            }),
            n("affiliates", "Affiliates / partners", {
              type: "tactic",
              summary:
                "Highest leverage. Pay 25% / 50% / 100% of max CAC on agree / activate / sustain. Certification ≈ 10-20% of an active affiliate's year-1 earnings.",
            }),
          ],
          { type: "component" },
        ),
      ],
      { links: ["money.attraction", "scaling.growth-levers", "mindset.leverage"] },
    ),

    group(
      "lead-magnets",
      "Lead magnets",
      "A lead magnet is a complete solution to a narrow problem. Solving it exposes the next problem - the one your core offer fixes. Someone who pays with time now is more likely to pay with money later. Give away the secrets; sell the implementation.",
      [
        bullets(
          "types",
          "Three types",
          [
            ["Reveal Their Problem", "Diagnosis, audit, assessment, quiz."],
            ["Samples & Trials", "Short version of the core offer."],
            ["One Step of a Multi-Step Process", "Solve one stage so the rest becomes obvious."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        bullets(
          "delivery",
          "Four delivery methods",
          [
            "Software / Tool",
            "Information (PDF, video, checklist, training)",
            "Services",
            "Physical product",
            "Three types × four deliveries = up to 12 versions; build the ones your audience will actually consume.",
          ],
          { type: "tactic" },
        ),
        bullets(
          "creation",
          "Seven-step creation process",
          [
            "Pick the narrow, meaningful problem and exactly who has it. It must sit one step before your core offer.",
            "Choose how to solve it (pick one of the three types).",
            "Choose delivery (pick a method; make a few versions).",
            "Test the name. Headline beats image beats subheadline. Name the outcome, not the format: \"5-Minute Close-Rate Doubler,\" not \"Free PDF.\"",
            "Make it easy to consume - finish in one sitting, in every format, value delivered in minutes.",
            "Make it darn good - good enough that you could charge for it.",
            "End with a CTA.",
          ],
          { type: "tactic" },
        ),
        n("cta-formula", "CTA formula", {
          type: "tactic",
          summary:
            "What to do (clear, single action) + a reason to act now - real scarcity, real urgency (deadline or expiring bonus), and a because-reason. Don't stack multiple CTAs.",
        }),
        n("math", "Lead magnet math", {
          type: "rule",
          summary:
            "Advertising a free lead magnet instead of the core offer can produce roughly 10× the engaged leads at the same spend (about 3× lower CAC).",
        }),
      ],
      { links: ["offers.dream-outcome", "leads.nurture", "money.attraction"] },
    ),

    group(
      "warm-outreach",
      "Warm outreach",
      "Work highest-to-lowest conversion: past customers → people who inquired but didn't buy → personal network → engaged followers → (only then) cold.",
      [
        n("volume", "Volume: contact 100 people per day", {
          type: "rule",
          summary: "Follow up up to 3 times per person.",
        }),
        n("channel", "Pick one platform and exhaust it", {
          type: "tactic",
          summary: "Exhaust one platform before adding another.",
        }),
        n("message", "Message shape: A-C-A", {
          type: "tactic",
          summary:
            "Personalize the greeting, then Acknowledge something real, Compliment something specific, Ask a low-friction question. Variant: Compliment → Bridge (why you're reaching out to them) → Ask.",
        }),
        bullets(
          "never",
          "Never",
          [
            "Lead with the pitch",
            "Send a wall of text",
            "Ask for too much in message one",
            "Keep it under five sentences with one ask.",
          ],
          { type: "mistake" },
        ),
        n("primer", "Primer offer: \"know anybody?\"", {
          type: "tactic",
          summary:
            "Ask if they know anybody who wants [dream outcome]. This removes pressure and people often self-identify.",
        }),
        n("case-study-ramp", "Case-study ramp", {
          type: "tactic",
          summary:
            "Take a few free clients for use + feedback + review. Then charge: first five at 80% off, raise 20% every five clients as referrals come in.",
        }),
        n("nine-word-email", "9-word email to keep the list warm", {
          type: "tactic",
          summary: "\"still looking to [4-word desire]?\"",
        }),
        n("benchmark", "Benchmark: ≈1 customer per 100 warm reach-outs", {
          type: "rule",
          summary: "Roughly 1 customer per 100 warm reach-outs.",
        }),
      ],
      { links: ["sales.closer", "leads.nurture", "mindset.volume"] },
    ),

    group(
      "cold-outreach",
      "Cold outreach (email/DM/calls)",
      "Trust is the only real difference from warm outreach. You must deliver Big Fast Value - blow their mind in under 30 seconds and give away things people normally pay for.",
      [
        bullets(
          "list-building",
          "List building",
          [
            "Software tools → list brokers → elbow grease (manual research).",
            "Build the first 1,000 by hand. Quality of list beats cleverness of copy.",
          ],
          { type: "tactic" },
        ),
        bullets(
          "volume",
          "Volume benchmarks",
          [
            ["Cold email", "100-200/day after warming up domain infrastructure. Aim ~3% engaged replies."],
            ["Cold DM", "30-50/day, more personalized per message."],
            ["Cold calls", "50-100 dials/day → roughly 3-5 real conversations. Phone math: ~20% pickup × ~25% take-rate ≈ 4 customers per 100 calls."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        n("floor", "Floor: LTGP:CAC ≥ 3:1", {
          type: "rule",
          summary: "Below that, fix the model or the offer before scaling volume.",
        }),
        bullets(
          "message-structure",
          "Message structure",
          [
            "Targeted list with criteria matching the ideal customer.",
            "Personalized opener: reference their company, content, recent news, or a specific situation detail.",
            "Lead with a free, specific resource - not a pitch. \"I built [specific tool/checklist] for [ICP] that [specific outcome]. Given [signal about them], want me to send it over?\"",
            "Short: 3-5 sentences, one idea, one CTA, written at a third-grade reading level (tested ~50% more replies).",
            "Guarantee opener as a stronger variant: \"I'll [specific outcome] in [timeframe] - if not, you pay nothing.\"",
          ],
          { type: "tactic" },
        ),
        bullets(
          "follow-up",
          "Follow-up",
          [
            "Follow up 5-7 times. Most replies arrive on touches 3-5. Space them 2-4 days apart.",
            "Sequence that works: message 1 gives a resource, no ask → message 2 (2 days later) asks a question about their situation → message 3 (3 days later) breaks up and leaves another free resource.",
            "Multi-channel: email → social connection → DM → comment on their post → email with a new angle → break-up. Never send \"just checking in.\"",
            "Every follow-up needs a new angle: new proof, new resource, new insight, new question, or genuine urgency.",
            "On reply, use A-C-A and never ask to book a call on the first reply. Get a micro-yes first.",
            "Re-run the same list every 3-6 months with a fresh angle; automate delivery and distribution so volume doesn't depend on memory.",
          ],
          { type: "tactic" },
        ),
        table(
          "platform-norms",
          "Platform DM norms",
          [
            ["LinkedIn", "Professional, insight-led, specific to their business."],
            ["Instagram DM", "Short, casual, reference their content, no walls of text."],
            ["Facebook", "Community feel, shared groups or mutual connections."],
            ["Email", "Longer is acceptable; subject line is the critical element."],
            ["X/Twitter DM", "Very short, one point, decide on a link before sending."],
          ],
          { summary: "Match the medium's norms before optimizing copy." },
        ),
      ],
      { links: ["sales.closer", "leads.hooks", "sales.call-structure"] },
    ),

    group(
      "paid-ads",
      "Paid ads",
      "Run ads last, after the offer converts in warm or cold channels.",
      [
        bullets(
          "platform",
          "Platform choice",
          [
            "Choose where your customers already are: Meta for B2C, LinkedIn for B2B, Google for intent, YouTube for education.",
            "Targeting: build lookalikes from your best customers first, then test warmer and colder audiences. More filters = more efficient spend but audiences burn out faster.",
          ],
          { type: "tactic" },
        ),
        bullets(
          "anatomy",
          "Ad anatomy - Callout + Value + CTA",
          [
            ["Callout devices", "Labels, yes-questions, if-then statements, ridiculous results, contrast, likeness."],
            ["Value = What-Who-When", "What they get, who it's for, when they get it. Walk the prospect through past, present, and future; show status change through other people's eyes."],
            ["CTA", "Exact next step + real scarcity, urgency, or bonus."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        n("landing-page", "Landing page continues the ad's experience", {
          type: "tactic",
          summary:
            "The ad's job is the click; the page's job is the conversion. Mismatch kills conversions.",
        }),
        n("hook-first", "Hook-first: ~80% of performance lives in the hook", {
          type: "rule",
          summary:
            "Test 5-10 hook variations per concept, always, even while winners run.",
        }),
        n("production-math", "Production math: 150-750 variants/week", {
          type: "rule",
          summary: "50 hooks × 3-5 meat variations × 1-3 CTAs = 150-750 ad variants per week.",
        }),
        bullets(
          "ad-types",
          "Four ad types to rotate",
          ["Direct response", "Content/value", "Social proof", "Pattern interrupt"],
          { type: "tactic" },
        ),
        bullets(
          "budget",
          "Budget rules",
          [
            "Three phases: Track (instrument everything) → Lose (treat spend as investing in a money-printing machine; test budget = 2× your 30-day cash; kill at 1× if zero leads came in) → Print (reverse-engineer from the customer goal, then pad ~20%).",
            "Kill any ad that exceeds 2× your target cost-per-lead without converting. Judge only after 20-50 leads.",
            "Scale winners by ~20% per day max; bigger jumps reset the learning phase.",
            "LTGP:CAC ≥ 3:1. If CAC sits below 3× industry average, fix the business model; if above, fix the ads.",
            "Client-Financed Acquisition: recover acquisition + fulfillment cost within 30 days via an upsell so customers fund their own acquisition. Use the upsell to close the gap, not a smaller ad budget.",
            "Don't confuse a sales problem with an advertising problem: check whether engaged leads actually have the problem you solve and the money to buy.",
          ],
          { type: "tactic" },
        ),
      ],
      { links: ["money.cfa", "leads.hooks", "sales.audit", "money.attraction"] },
    ),

    group(
      "content-engine",
      "Content engine",
      "The audience is the compounding asset. Content is advertising you don't pay per impression.",
      [
        n("content-unit", "Content Unit = Hook + Retain + Reward", {
          type: "tactic",
          summary:
            "Hook (topic + headline + format) + Retain (curiosity via lists, steps, stories) + Reward (value per second). Nothing is too long - only too boring.",
        }),
        n("give-ask", "Give:ask ≥ 3:1", {
          type: "rule",
          summary:
            "Best mode: give until they ask. Give in public, ask in private. Integrated ask: a CTA in every piece. Intermittent ask: offer roughly every 11th piece.",
        }),
        n("posting-system", "Posting system: 1 long-form → 7+ derivatives", {
          type: "tactic",
          summary:
            "One long-form piece per week (YouTube, podcast, newsletter) → chop into 7+ short-form pieces (Reels, Shorts, TikToks, threads, LinkedIn posts) → adapt to each platform → post daily where your buyers are.",
        }),
        bullets(
          "rules",
          "Content rules",
          [
            "Consistency beats virality. One post per day for a year outperforms one lucky viral hit.",
            "Repurpose the same message across platforms, adjusted for format - don't create from scratch for each channel.",
            "Narrow first: puddles → ponds → lakes → oceans. Own one specific audience before broadening.",
            "Depth-then-width or width-then-depth - pick one and run it; don't drift between the two.",
            "Say \"How I,\" not \"How to.\" Document what you actually do; don't manufacture content.",
            "Content types that build trust fastest: results you got (with proof), mistakes you made (with lessons), process you follow (step by step), opinions that polarize (a real stance).",
            "Manual beats pre-scheduled. Post in the moment where the platform rewards it; avoid blaming short attention spans for weak hooks.",
          ],
          { type: "tactic" },
        ),
      ],
      { links: ["leads.hooks", "mindset.volume", "leads.core-four"] },
    ),

    group(
      "hooks",
      "Hook writing",
      "A hook is a compressed value equation - it raises perceived outcome and belief while lowering time and effort. Hook = Pattern Interrupt + Promise of Value. It has two parts: the callout that grabs attention and the promise that pays it off.",
      [
        n("formula", "Core formula: WHO + RESULT + SPEED/EASE + OBJECTION REMOVAL", {
          type: "tactic",
          summary: "Example shape: \"Coaches: get 3 clients this week without ads.\"",
        }),
        bullets(
          "families",
          "Hook families",
          [
            ["Outcome", "Get [result]."],
            ["Time-based", "Get [result] in [time]."],
            ["Effort reduction", "Get [result] without [pain or sacrifice]."],
            ["Callout", "If you are [audience], this is for you."],
            ["Proof / \"How I\"", "How I [achieved result] in [time] without [pain]."],
            ["Contrarian", "[Common belief] is wrong."],
            ["Pain", "If you struggle with [pain], read this."],
            ["Mechanism", "The [system] that gets you [result]."],
            ["Transformation", "From [bad state] to [desired state]."],
            ["Story", "I was [negative state] until [event]."],
            ["Direct", "Want [outcome]? Read this."],
            ["Contrast", "Stop [common action]. Start [better action]."],
            ["Question", "Why do most [audience] never [outcome]?"],
            ["Hybrid", "Combine WHO + RESULT + TIME + WITHOUT X (best performers)."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        bullets(
          "rules",
          "Hook rules",
          [
            "Lead with the result, not the topic.",
            "Add numbers, constraints, timeframes. Specific beats general every time.",
            "Kill objections inside the hook: \"even if…\", \"without…\", \"no experience needed.\"",
            "One idea per hook, short sentences, no clever wordplay. Clarity over creativity.",
            "Hooks should attract buyers, not just clicks. If it doesn't promise something useful, rewrite it.",
          ],
          { type: "tactic" },
        ),
        bullets(
          "process",
          "Process",
          [
            "Write 20+ variations per piece (50 if you can).",
            "Pick the top 3-10 on specificity, clarity, relevance, and outcome strength.",
            "Test as titles, subject lines, or opening lines.",
            "Keep the pattern that wins; add it to a swipe file.",
            "Repeat weekly: write 50, select 10, build variations, launch, analyze, double winners and kill losers, document learnings.",
            "Add specificity when generic; add speed when decisions feel slow; add ease when effort feels high; add a callout when the audience is broad; add contrast when value isn't obvious.",
          ],
          { type: "tactic" },
        ),
      ],
      { links: ["offers.value-equation", "leads.paid-ads", "sales.belief", "voice.signature"] },
    ),

    group(
      "nurture",
      "Lead nurturing / follow-up",
      "Speed and touch count decide more than copy.",
      [
        n("speed-to-lead", "Speed to first contact: 5 minutes", {
          type: "rule",
          summary:
            "Response rates fall ~80% after 30 minutes. Litmus test: get at least one \"wow, that was fast\" per day.",
        }),
        n("speed-appointment", "Speed to first appointment: same-day or next-day", {
          type: "rule",
          summary: "The longer the gap, the higher the no-show rate.",
        }),
        n("speed-response", "Speed of response: minutes, not hours", {
          type: "tactic",
          summary: "Fast replies signal interest and make the close easier.",
        }),
        n("touch-count", "Touch count: 7+ touchpoints", {
          type: "rule",
          summary: "Assume they didn't see it. Most people need 7+ touchpoints before acting.",
        }),
        n("multi-channel", "Multi-channel", {
          type: "tactic",
          summary:
            "Text immediately, email the same day, call within 24-48 hours, keep DMs going for the relationship, retarget with ads.",
        }),
        bullets(
          "sequence",
          "Email/DM sequence",
          [
            ["Day 0", "Deliver the magnet + welcome."],
            ["Day 1", "Quick win or insight."],
            ["Day 2", "Transformation story."],
            ["Day 3", "Teach value + soft offer."],
            ["Day 5", "Handle the #1 objection."],
            ["Day 7", "Direct offer with full stack and CTA."],
            ["Day 10", "Deadline reminder."],
            ["Day 14", "Final chance recap."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        n("value-every-touch", "Every touch must deliver value", {
          type: "rule",
          summary: "Or move them a step forward. Never \"just checking in.\"",
        }),
        n("track", "Track cost per lead, cost per booked call, CAC", {
          type: "tactic",
          summary: "Per channel, always.",
        }),
      ],
      { links: ["sales.call-structure", "leads.cold-outreach", "leads.lead-magnets"] },
    ),

    group(
      "growth-levers",
      "Growth levers: More / Better / New",
      "Use these in order. This is the antidote to the Size-of-the-Pie Fallacy - believing a bigger market exists instead of doing more of what works.",
      [
        n("more", "More - Rule of 100", {
          type: "tactic",
          summary:
            "100 primary actions per day for 100 days (100 reach-outs, 100 dials, 100 minutes of content, $100/day of ads).",
        }),
        n("better", "Better - fix the constraint", {
          type: "tactic",
          summary:
            "Find the biggest drop-off in the funnel and improve only that. Test one thing per week per platform. Abandon a constraint after 4 tries or 1 month, then move to the next biggest.",
        }),
        n("new", "New - only after More and Better", {
          type: "tactic",
          summary: "New placement → new platform → new activity.",
        }),
        n("open-to-goal", "Open to Goal", {
          type: "rule",
          summary:
            "Commit to the outcome regardless of how long it takes. Expect 3-6 months to crack a new source; stick with one pick for years. Reinvest a fixed percentage of revenue into testing every month.",
        }),
      ],
      { links: ["mindset.volume", "mindset.hypothesis", "scaling.growth-levers", "mindset.focus"] },
    ),

    rules("rules", "Decision rules & thresholds", [
      "Rule of 100: 100 primary actions/day × 100 days.",
      "Open to Goal - no time-based quitting criteria.",
      "Warm outreach: 100 contacts/day, follow up ≤3×, ≈1 customer per 100 reach-outs.",
      "Case-study ramp: first 5 free → 80% off next 5 → raise 20% every 5.",
      "Warm list maintenance: 9-word email to stay top of mind.",
      "Cold email: 100-200/day, ~3% engaged; cold DM: 30-50/day; cold calls: 50-100 dials/day.",
      "Phone math: ~20% pickup × ~25% take-rate ≈ 4/100.",
      "Cold follow-up: 5-7 touches, most replies on 3-5, spaced 2-4 days; re-run list in 3-6 months.",
      "Cold copy: 3-5 sentences, one idea, one CTA, third-grade reading level.",
      "Paid ads: run last; test budget 2× 30-day cash, kill at 1× if zero leads; kill ads at 2× target CPL; require 20-50 leads before judging; scale winners +20%/day max.",
      "Paid creative: 5-10 hook variations per concept; 50 × 3-5 × 1-3 = 150-750 variants/week.",
      "Unit economics: LTGP:CAC ≥ 3:1; CFA payback within 30 days; CAC benchmarked against 3× industry average.",
      "Lead magnet: ~10× engaged leads vs advertising the core offer, ~3× lower CAC.",
      "Content: ≥1 post/day; give:ask ≥ 3:1; intermittent ask every ~11th piece; 1 long-form → 7+ derivatives weekly.",
      "Hooks: 20+ written per piece; weekly batch of 50 with top 10 tested.",
      "Nurture: contact within 5 minutes; 7+ touchpoints; bookings same-day or next-day.",
      "Growth: 1 test/week on the constraint; abandon after 4 tries/1 month; More & Better before New; expect 3-6 months per new source.",
      "Referrals: referrals > churn; target ≥25% of new customers from referrals; follow up on referrals within 24 hours.",
      "Affiliates: certification ≈ 10-20% of an active affiliate's year-1 earnings; payout 25%/50%/100% of max CAC at agree/activate/sustain.",
    ]),

    checklist("build", "Build checklist", [
      "Core offer written as a Grand Slam offer before any lead spend.",
      "Decided: advertise core offer directly, or build a lead magnet first.",
      "One channel chosen as primary, with a defined \"enough volume\" number.",
      "Lead magnet solves one narrow problem in one sitting and names the outcome.",
      "CTA includes a single action plus real scarcity, urgency, or bonus.",
      "Warm list built (past customers, old inquiries, network, followers) and worked 100/day.",
      "Warm sequence uses A-C-A and the \"know anybody\" primer; ≤3 follows.",
      "Cold list built to 1,000+ with matching criteria; personalization field per contact.",
      "Cold messages lead with value, run 3-5 sentences, and follow a 5-7 touch cadence.",
      "Platform-specific DM/email norms respected per channel.",
      "Paid: pixel/tracking live, test budget = 2× 30-day cash, kill and scale rules written down.",
      "Ad concepts built hook-first with 5-10 variations and a matching landing page.",
      "Content engine produces 1 long-form/week → 7+ derivatives → daily posts.",
      "Hook batch cadence scheduled (weekly 50 → top 10).",
      "Speed-to-lead standard <5 minutes with an owner and an alert.",
      "Nurture sequence loaded (Day 0/1/2/3/5/7/10/14) and tracked by channel.",
      "LTGP:CAC tracked per channel; nothing scales below 3:1.",
      "Referral ask built into delivery milestones with a shareable link and mutual incentive.",
      "Review: More, then Better (1 test/week), only then New.",
    ]),

    checklist("audit", "Audit checklist (why leads are low)", [
      ["Offer", "Do engaged leads have the problem you solve and the money to pay? Is the core offer a Grand Slam offer, or is this actually a sales problem misread as an advertising problem?"],
      ["Channel fit", "Are you using the right box of the Core Four for your price point, budget, and audience? Are you running all four badly instead of one well?"],
      ["Volume", "Are you hitting the Rule of 100? Have you done 10× the volume you think you've done, for at least 100 days? Is low effort, not strategy, the real reason?"],
      ["Targeting", "Does the list actually match the ideal customer? Are you reaching people without the problem (warm) or without the budget (cold)?"],
      ["Lead magnet", "Is it narrow, complete, fast to consume, and good enough to charge for? Does it expose the problem the core offer solves?"],
      ["Hook/creative", "Write 20+ new hooks and test the top 3-10. Is ~80% of ad performance being lost at the hook? Does the opening line show you looked at them specifically?"],
      ["Message", "Does message one give value and one CTA? Is it under 3-5 sentences? Third-grade reading level? Remove the pitch if there is one."],
      ["Follow-up", "Are you following up 5-7 times across channels with a new angle each time? Most replies come on touches 3-5."],
      ["Speed", "Are you contacting within 5 minutes and booking same-day or next-day?"],
      ["Nurture", "Are there 7+ value-adding touches before the offer? Any \"just checking in\" messages?"],
      ["Economics", "Is LTGP:CAC ≥ 3:1? CFA paid back within 30 days? CAC compared to 3× industry average?"],
      ["Testing discipline", "One variable per week on the biggest drop-off? Or many things at once on non-constraints?"],
      ["Premature 'New'", "Have More and Better been truly exhausted before opening a new platform or offer?"],
    ]),

    mistakes("mistakes", "Common mistakes", [
      "Not advertising enough; treating a volume deficit as a strategy deficit",
      "Confusing leads with engaged leads and celebrating names instead of interest",
      "Advertising the core offer only, or having a weak lead magnet and hoarding the secrets",
      "Never doing warm outreach because it feels awkward - it's the fastest path to first revenue",
      "Dismissing content as \"not trackable\" when the audience is the compounding asset",
      "Asking for money too soon; give until they ask",
      "Cold outreach: sending once, underestimating volume and time, or no follow-up system",
      "Cold copy that reads at an adult reading level, leads with the pitch, or asks for a call in message one",
      "Paid: chasing creative perfection over efficiency, quitting winners early, running losers too long",
      "Mistaking a bad model (low LTGP) for bad ads (high CAC), or a sales problem for an advertising problem",
      "Size-of-the-Pie Fallacy - chasing a new market instead of maximizing the constraint in front of you",
      "Testing many things at once or improving non-constraints; abandoning after one or two losses",
      "Referrals: assuming the product is good enough, never asking, neglecting the back end",
      "Agencies: dependency without a deadline; being cheap instead of learning the method",
      "Affiliates: no investment required, no launch, capping payouts",
      "Quitting or switching channels after a few losses instead of sticking with one pick for years",
    ]),

    group(
      "output",
      "Output contract",
      "When asked to build a lead engine, produce these sections.",
      [
        bullets(
          "sections",
          "Sections",
          [
            "Offer check (core offer vs lead magnet decision)",
            "Channel pick (Core Four box + why + enough-volume target)",
            "Lead magnet design (type, delivery, name options, CTA)",
            "Outreach plan (warm list, cold list, scripts, cadence, platform norms)",
            "Paid plan (platform, targeting, budget rules, 5-10 hook variations, kill/scale rules)",
            "Content engine (long-form → derivatives calendar, give:ask ratio)",
            "Hook batch (20+ hooks across families, top 3 with reasoning)",
            "Nurture sequence (Day 0-14 with channels)",
            "Metrics dashboard (CPL, cost per booked call, CAC, LTGP:CAC, speed-to-lead)",
            "More/Better/New next actions (this week's one test)",
          ],
          { type: "tactic" },
        ),
        n("artifact", "Save artifact: LEADS_PLAN.md", {
          type: "artifact",
          summary: "Artifacts save to Startup/Hormozi/Outputs/ in the vault.",
        }),
      ],
      { links: ["harness.artifacts"] },
    ),

    examples("examples", "Worked examples", [
      [
        "Channel choice (solo coach, $2k offer, zero audience)",
        "Pick warm outreach: 100 contacts/day from past clients, old inquiries, network, and followers; A-C-A script; \"know anybody\" primer; first 5 free for use + feedback + review; ~1 customer per 100 contacts. Add content only after the list is exhausted or 100/day is sustainable.",
      ],
      [
        "Cold email rewrite",
        "Original: \"Hi, I'm a consultant helping businesses grow. I'd love to hop on a call to see if we're a fit.\" Rewrite: \"Built a 12-point checklist that shows which of your 3 pricing tiers is leaking margin - used it with 2 other Shopify brands last month. Want me to send it over?\" Value first, specific, 3 sentences, one CTA, no call ask.",
      ],
      [
        "Hook batch (Facebook ads for med spas)",
        "Offer = Facebook ads for med spas; result = 40 booked consults/month. Outcome: \"Med spas: book 40 consults/month.\" Time: \"Fill next week's calendar in 48 hours.\" Effort reduction: \"40 consults/month without boosting posts.\" Callout: \"If you run a med spa doing $50k-$200k/month, read this.\" Contrarian: \"More ad spend is why your med spa is stuck.\" Mechanism: \"The 3-ad system that fills med spa calendars.\" Hybrid (top pick): \"Med spas: 40 booked consults in 30 days without boosting posts - even if you've burned budget on ads before.\"",
      ],
    ]),
  ],
});
