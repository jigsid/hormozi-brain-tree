import { n, group, bullets, rules, checklist, mistakes, examples, table } from "../dsl";

export const sales = n("sales", "Sales", {
  type: "module",
  summary:
    "Run every call through CLOSER, name each objection before answering it, move belief instead of pressure, and never let a deal die in the silence after the call.",
  children: [
    bullets(
      "triggers",
      "Load this when",
      [
        "Writing or rebuilding a sales script, call outline, or DM-to-call flow",
        "Preparing for a high-ticket or consultative sales call",
        "An offer converts well but close rates stall, or buyers keep saying \"I'll think about it\"",
        "Handling price, spouse, time, trust, effort, identity, or risk objections live",
        "Choosing between a one-call close and a two-step set-then-close process",
        "Designing pre-call priming, reminders, speed-to-lead, and post-call follow-up",
        "Auditing why deals die on the call or in the silence after it",
        "Training a setter or closer, or reviewing recorded calls",
        "Building the pitch layer that feeds the close: value stack, guarantee, price framing",
      ],
      { type: "trigger", summary: "Triggers that route a session into the Sales module." },
    ),

    group(
      "closer",
      "CLOSER framework",
      "Run every call through these six stages in order. Skipping a stage shows up later as an objection you cannot trace.",
      [
        group(
          "c",
          "C - Clarify why they are here",
          "Open with a single question: \"What made you decide to book this call today?\" Then stop talking.",
          [
            n("q1", "Stock question", {
              type: "tactic",
              summary: "\"What made you decide to book this call today?\" Then stop talking.",
            }),
            n("follow", "Follow with \"Tell me more about that\"", {
              type: "tactic",
              summary:
                "Repeat their own words back. Let them spend this phase describing the problem; the more they articulate it, the more they convince themselves.",
            }),
            n("listen-for", "Listen for", {
              type: "tactic",
              summary:
                "Emotional language, past spending, deadlines, and who else is affected. Note their exact phrases - you will reuse them in the label and the close.",
            }),
            n("price-deflect", "If they open with a price question", {
              type: "tactic",
              summary:
                "Deflect once: \"I'll answer that fully. First I need to understand your situation so the answer is accurate.\"",
            }),
          ],
          { type: "component" },
        ),
        group(
          "l",
          "L - Label their problem inside a pattern",
          "Stock line: \"So it sounds like you have tried X and Y, they worked for a while, and you ended up back where you started because of Z. Does that sound right?\"",
          [
            n("two-jobs", "Two jobs", {
              type: "tactic",
              summary:
                "Demonstrate you have seen this pattern before, and make them feel understood.",
            }),
            n("signal", "Read the signal", {
              type: "tactic",
              summary:
                "\"Yes, exactly\" means continue. A shrug or correction means you misdiagnosed - go back and dig.",
            }),
          ],
          { type: "component" },
        ),
        group(
          "o",
          "O - Overview their past attempts",
          "Stock question: \"What have you tried so far, and what happened with each?\"",
          [
            n("three-uses", "Three uses", {
              type: "tactic",
              summary:
                "Show you care about their history; learn what not to position against (someone burned by a DIY course will not buy another DIY course); and set up your mechanism as the missing piece - \"Those stalled because they were missing [your mechanism].\"",
            }),
            n("log", "Log every failed attempt", {
              type: "tactic",
              summary:
                "Each one becomes objection-proofing material for the pitch.",
            }),
          ],
          { type: "component" },
        ),
        group(
          "s",
          "S - Sell the vacation, not the plane ride",
          "Stock line: \"Imagine [timeframe] from now. You have [specific outcome]. How would that change things for you?\"",
          [
            n("after-state", "Have them describe the after-state out loud", {
              type: "tactic",
              summary: "In their own words. They sell themselves here.",
            }),
            n("mechanism", "Connect your mechanism to that destination", {
              type: "tactic",
              summary:
                "Three phases at most. Keep the how high-level; the beach matters, not the flight.",
            }),
            n("four-questions", "Verify the four silent questions are answered", {
              type: "tactic",
              summary: "What do I get, how do I know it works, how long will it take, what do I have to do.",
            }),
          ],
          { type: "component" },
        ),
        group(
          "e",
          "E - Explain away their concerns",
          "Transition with: \"What questions do you have for me?\" Never \"What do you think?\" - it invites noise. Never \"Are you ready to start?\" - too early and it triggers retreat.",
          [
            n("hidden-question", "Translate every objection into its hidden question", {
              type: "tactic",
              summary: "\"Will this work in my specific case, given [worry]?\"",
            }),
            group(
              "three-moves",
              "Handle with three moves",
              "Isolate → Restate → Answer with proof.",
              [
                n("isolate", "Isolate", { type: "tactic", summary: "\"Is that the only thing holding you back?\"" }),
                n("restate", "Restate", { type: "tactic", summary: "\"If I can show you [evidence], do we move forward?\"" }),
                n("answer", "Answer with proof", { type: "tactic", summary: "Matched case study, mechanism explanation, guarantee, or logic." }),
              ],
              { type: "component" },
            ),
            n("one-at-a-time", "Handle one objection at a time", {
              type: "tactic",
              summary: "Confirm resolution before advancing.",
            }),
          ],
          { type: "component" },
        ),
        group(
          "r",
          "R - Reinforce the decision",
          "Immediately after yes: \"You made a great decision. Here is exactly what happens next.\"",
          [
            n("onboard-live", "Walk through onboarding live", {
              type: "tactic",
              summary:
                "Book the next step, and confirm the first action before hanging up.",
            }),
            n("first-action", "The sale is not complete until they take the first action", {
              type: "rule",
              summary: "Reinforcement prevents buyer's remorse and no-shows.",
            }),
          ],
          { type: "component" },
        ),
      ],
      { links: ["offers.value-equation", "offers.dream-outcome", "money.upsells", "voice.moves"] },
    ),

    group(
      "objections",
      "Objection taxonomy",
      "Every objection enters through one of a handful of doors. Name the category before you answer - the wrong framework on the right objection still loses.",
      [
        bullets(
          "loop",
          "Universal handling loop",
          [
            "Acknowledge without conceding: \"That is fair, and most of our best clients said something similar early on.\"",
            "Isolate: \"Is that the only thing holding you back?\"",
            "Restate: \"If I can address that, do we move forward today?\"",
            "Answer with proof: lookalike case study, mechanism, guarantee, or arithmetic.",
            "Confirm and re-ask for the decision, then stay silent.",
          ],
          { type: "tactic" },
        ),
        bullets(
          "price",
          "Price / money",
          [
            ["Words", "\"Too expensive,\" \"I cannot afford it right now.\""],
            ["Hidden belief", "\"I am not convinced it is worth it\" or \"I fear the value will not materialize.\""],
            ["Script", "\"If price were not a factor at all, is this something you would want?\" Yes → the problem is logistics; present payment options. No → it is a value or trust objection wearing a price costume; return to mechanism and proof."],
            ["Reframe", "\"What is this problem costing you every month it stays unsolved?\""],
            ["Rule", "Never discount the core. Add a deadline-bound bonus, restructure payments, or change scope. Hold the number against the stacked value, not against their bank balance."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        bullets(
          "spouse",
          "Spouse / partner",
          [
            ["Words", "\"I need to talk to my spouse.\""],
            ["Hidden belief", "Usually their own uncertainty, outsourced to an absent third party."],
            ["Script", "\"When you bring it up, what do you think they will say?\" If positive → offer a short joint call to answer questions. If negative or vague → \"What specifically would worry them?\" and handle that concern as if it were theirs, because it is."],
            ["Close test", "\"If your partner had heard everything on this call, would they support it?\""],
          ],
          { type: "tactic", parentType: "component" },
        ),
        bullets(
          "time",
          "Time / stall",
          [
            ["Words", "\"I need to think about it,\" \"Not the right time.\""],
            ["Hidden belief", "\"I do not trust this enough yet,\" or \"This will take more effort than I have.\""],
            ["Force specificity", "\"What exactly do you want to think about - the offer, the price, or whether it can work for you?\" Vague objections get vague answers, specific ones get resolved."],
            ["Timing test", "\"When would be the right time? What has to change first?\" Most prospects discover nothing external needs to change."],
            ["Real timing", "If the timing is real (cash cycle, seasonality), book the follow-up before they leave and send a written recap the same day."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        bullets(
          "trust",
          "Trust / credibility",
          [
            ["Words", "\"How do I know this works?\" \"I have been burned before.\""],
            ["Hidden belief", "\"I cannot afford another failure.\""],
            ["Normalize", "\"You were let down before and you do not want that again. That is smart, not cynical.\""],
            ["Proof specificity", "One case study that mirrors their exact situation beats ten generic testimonials."],
            ["Guarantee", "Put risk on you with a guarantee that has teeth and plain terms."],
            ["Script", "\"You do not have to trust me on faith - judge the guarantee and the results we have already produced.\""],
          ],
          { type: "tactic", parentType: "component" },
        ),
        bullets(
          "effort",
          "Effort / complexity",
          [
            ["Words", "\"I do not have time for this.\""],
            ["Hidden belief", "\"This will be another hard project I abandon.\""],
            ["Move", "Reduce perceived effort live: show the templates, the onboarding, the done-for-you pieces. State honest hours per week and point at what you remove."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        bullets(
          "identity",
          "Identity",
          [
            ["Words", "\"This is not for someone like me.\""],
            ["Hidden belief", "\"People who succeed at this are different from me.\""],
            ["Reframe", "Use a lookalike: \"One of our best clients was exactly where you are, same background, same doubts.\""],
          ],
          { type: "tactic", parentType: "component" },
        ),
        bullets(
          "risk",
          "Risk",
          [
            ["Hidden belief", "Fear of loss, failure, or looking foolish to others."],
            ["Move", "Match the guarantee type to the stakes: unconditional, conditional (action-based), outcome-based (results-tied), or anti-guarantee. Never promise what fulfillment cannot support."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        bullets(
          "belief-shift",
          "Belief-shift method",
          [
            "Map: surface objection → hidden belief → new belief → proof.",
            "Keep the new belief simple, believable, and grounded in reality. \"This is risky\" becomes \"This is a guided path with the risk on them.\"",
            "Rewrite each as a selling point: objection → reframe → proof. Example: \"No time\" → \"Built to save you time\" → \"First result under 30 minutes with the starter template.\"",
            "Place the top 3-5 objection responses in the pitch itself, the sales page, FAQs, and DMs so fewer of them ever reach the call.",
            "If an objection repeats across calls, treat it as an offer defect: add proof, simplify the process, lower effort, clarify the outcome, or strengthen the guarantee.",
          ],
          { type: "tactic" },
        ),
      ],
      { links: ["offers.bonuses", "offers.guarantees", "money.downsells", "sales.belief"] },
    ),

    group(
      "closes",
      "Closing types",
      "Pick one close type per call. Stacking closes reads as pressure. If a close fails, go back to the unresolved objection, not to a fresh tactic.",
      [
        bullets(
          "types",
          "The closes",
          [
            ["Obstacle close", "After discovery, name the blockers and list them: \"It sounds like a few things stand between you and starting. Can we take them one at a time?\" Address each, then cross it off out loud. Visible progress makes the final ask feel small."],
            ["Decision framework close", "Lay out three paths: stay where you are, keep grinding alone, or use the proven system with help. Quantify the do-nothing cost honestly. \"Which one makes the most sense for you?\""],
            ["Future-pacing close", "\"Six months from now you are at [outcome]. How does that feel? The only difference between that and today is the decision you make in the next few minutes.\""],
            ["Silence close", "Make the ask, then go quiet. Hold the pause. The first person to speak carries the tension, and that should not be you."],
            ["Payment-plan / downsell close", "After a no, change how they pay or what they get. Never the same package for less; that trains buyers to refuse the first price."],
            ["Urgency close", "Real constraints only: bonus expiry, cohort start, genuine capacity. Manufactured deadlines poison referrals and refunds."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        n("sequencing", "Sequencing rule", {
          type: "rule",
          summary:
            "Pick one close type per call. Stacking closes reads as pressure. If a close fails, go back to the unresolved objection, not to a fresh tactic.",
        }),
      ],
      { links: ["money.downsells", "offers.scarcity", "sales.objections"] },
    ),

    group(
      "tonality",
      "Tonality and delivery rules",
      "Posture: a diagnostician prescribing treatment, not a pressure seller. You are willing to walk away, and you act like it.",
      [
        bullets(
          "rules",
          "Rules",
          [
            "Concerned curiosity during discovery - you are genuinely digging into their situation, and it shows.",
            "Confident authority when presenting the mechanism - you have watched it work repeatedly.",
            "Calm certainty during objections - no flinching at the price, no rushing to fill silence.",
            "Warm reinforcement after the close - they should feel good about the decision within seconds.",
            "After every question, pause. Let silence pull the answer out; do not answer for them.",
            "Match their pace, then slow down. Rushed, clipped speech reads as nervous; steady and slow reads as certain.",
            "Use their words, not yours. Mirror the exact phrases from discovery in the label, pitch, and close.",
            "One question at a time. Stacking questions when they hesitate signals you are not listening.",
            "No jargon, no feature dumping. Translate every feature into an outcome or a removed cost.",
          ],
          { type: "tactic" },
        ),
      ],
      { links: ["voice.tone", "voice.rubric", "sales.belief"] },
    ),

    group(
      "call-structure",
      "Call structure and timing",
      "Pre-call → call → follow-up.",
      [
        bullets(
          "pre-call",
          "Pre-call",
          [
            "Qualify at booking: budget range, decision authority, timeline, and why now.",
            "Prime the call: confirmation message with agenda, duration, and what to have ready; reminders at 24 hours and 1 hour before. No-shows are usually a priming failure, not a lead failure.",
            "Prepare the two or three proof assets closest to this prospect's situation, the guarantee wording, and the payment options.",
            "Review their form answers, DMs, and notes beforehand. Walk in already knowing the likely top objection.",
          ],
          { type: "tactic" },
        ),
        table(
          "timeline",
          "45-minute high-ticket shape",
          [
            ["0-5 min", "Rapport + clarify why they are here."],
            ["5-15 min", "Problem deep-dive + past attempts."],
            ["15-20 min", "Dream outcome + transition to solution."],
            ["20-30 min", "Offer + value stack + price."],
            ["30-40 min", "Objections + isolation."],
            ["40-45 min", "Close + reinforce + schedule the next step."],
          ],
          { summary: "Target roughly 70% of the call on their situation, 30% on your solution." },
        ),
        n("price-timing", "Present the mechanism before the price", {
          type: "rule",
          summary:
            "Present price as a contrast to the stack, never as a naked number. If the offer is still landing after minute 30, you spent too long on biography.",
        }),
        n("next-action", "End every held call with a scheduled next action", {
          type: "rule",
          summary: "Including the noes.",
        }),
        table(
          "follow-up-grid",
          "Follow-up grid",
          [
            ["Text", "Within minutes - confirm, answer, schedule."],
            ["Email", "Same day - recap, details, value."],
            ["Phone", "24-48 hours - personal touch, reschedule."],
            ["DM", "Ongoing - relationship, keep warm."],
          ],
          { summary: "Every contact delivers value or moves them to a next step." },
        ),
        bullets(
          "follow-up-sequence",
          "Base sequence",
          [
            "Answer every new lead within five minutes where humanly possible. If nobody ever marvels at your response speed, you are too slow.",
            "Book same-day or next-day appointments. Every extra day between booking and call raises the no-show rate.",
            "Plan seven or more touches. Never send \"just checking in.\"",
            "Immediate text, same-day email plus one call attempt, day 2-3 case study with two concrete time slots, day 4-7 personal call and objection FAQ, week 2+ weekly value touch.",
            "Re-contact no-decision leads in 30-90 days with a new reason to talk (new proof, bonus window, price change). Re-run dormant cold lists every 3-6 months.",
          ],
          { type: "tactic" },
        ),
      ],
      { links: ["leads.nurture", "sales.closer", "money.downsells"] },
    ),

    group(
      "one-vs-two",
      "One-call vs two-step close",
      "Choose the structure that matches decision complexity and trust.",
      [
        n("one-call", "One-call close", {
          type: "tactic",
          summary:
            "Use when budget is qualified before the call, intent is high, the offer is simple enough to explain in one sitting, and the decision-maker is on the line. Fastest cash; it demands a strong closer and a clean pre-call frame.",
        }),
        n("two-step", "Two-step close", {
          type: "tactic",
          summary:
            "Use when multiple stakeholders decide, the offer is complex or regulated, trust must be built, or the prospect is low-awareness and needs education first. Step one diagnoses and educates; step two decides.",
        }),
        bullets(
          "add-a-step",
          "Add a step when",
          [
            "Calls routinely run past 60 minutes",
            "Most calls end with \"I need to talk to my partner\"",
            "Decision-makers no-show",
            "The price is high relative to existing trust",
          ],
          { type: "tactic" },
        ),
        bullets(
          "collapse",
          "Collapse back to one call when",
          [
            "Second-call show rates fall under roughly 50-60%",
            "The gap between calls cools interest",
            "The first call already delivers full clarity",
          ],
          { type: "tactic" },
        ),
        n("handoff", "Keep the promise consistent across steps", {
          type: "rule",
          summary:
            "The setter's framing must match the closer's agenda, or distrust shows up in the first five minutes. When a one-call process underperforms, fix the set-to-close handoff before adding another call.",
        }),
      ],
      { links: ["sales.call-structure", "leads.core-four"] },
    ),

    group(
      "belief",
      "Belief transfer and conviction",
      "Treat every sale as transference of belief. The prospect already wants the outcome; what is missing is certainty that the path works for them specifically. Move belief, not pressure.",
      [
        bullets(
          "four-beliefs",
          "Four beliefs must land before the close",
          [
            "The problem is solvable.",
            "Your mechanism is why it gets solved.",
            "You and your team can execute.",
            "They can do their part.",
          ],
          { type: "tactic" },
        ),
        n("certainty", "Certainty beats cleverness", {
          type: "rule",
          summary:
            "The party with more conviction usually takes the exchange, and neediness is felt instantly - on calls and in text.",
        }),
        n("earn-conviction", "Earn conviction before the call", {
          type: "tactic",
          summary:
            "Know the mechanism cold, hold three concrete proofs, and rehearse the explanation until it is simple enough for a skeptic.",
        }),
        n("mechanism-story", "Build the mechanism story", {
          type: "tactic",
          summary:
            "\"Those methods failed because of [root cause]. We solve that with [mechanism].\" It must be simple, believable, and grounded - no magic language.",
        }),
        n("proof-sequence", "Sequence proof by closeness", {
          type: "tactic",
          summary:
            "Their own words repeated back → logical mechanism → lookalike case study → guarantee.",
        }),
        n("delivery-leaks", "Delivery leaks uncertainty", {
          type: "tactic",
          summary:
            "Hedges, rushed speech, over-explaining, and talking past the ask all read as doubt. Say the thing, then stop.",
        }),
        n("real-conviction", "Conviction must be real", {
          type: "rule",
          summary:
            "If you cannot honestly be certain the offer fits this buyer, disqualify instead of pushing. That honesty is what makes your certainty credible on every other call.",
        }),
      ],
      { links: ["voice.moves", "leads.hooks", "sales.objections", "mindset.learning"] },
    ),

    rules("rules", "Decision rules & thresholds", [
      "Reserve at least 60-70% of call time for discovery and their situation. Present only after the dream outcome has been spoken in their words.",
      "Default to a 45-minute call for high-ticket. Past 60 minutes, you are usually treating an offer or qualification problem as a call problem.",
      "Never present price before the mechanism and stack land. Value before cost, every time.",
      "Price sits well under itemized value - a workable range is roughly 10-25% of total stacked value. When close rates run very high, raise price before adding tactics; eight deals at $10k beats ten at $5k with less work.",
      "Never discount the core. Change payment structure, scope, or bonus stack instead.",
      "Handle one objection at a time; confirm resolution before advancing.",
      "Speed-to-lead: first response inside 5 minutes, appointment same or next day, 7+ touches per lead, new value in every touch.",
      "Re-contact unclosed leads in 30-90 days; re-run dormant cold lists every 3-6 months.",
      "Early funnel health: aim for a 50-60%+ show rate on booked calls; investigate close rates under ~20% on held calls, and suspect under-priced offers above ~40%.",
      "Scale only at LTGP:CAC ≥ 3:1, and recover acquisition plus fulfillment cost within 30 days (client-financed acquisition); one customer's early profit should fund 2+ more.",
      "Decide guarantees on net revenue, not fear. A large sales jump can outweigh doubled refunds - e.g., +130% sales at 2× refunds still nets ~1.23×.",
      "Respect refund red lines: money-back offers only while refunds stay under ~5%; pay-later cancellations above ~10% mean the offer is weak, not the closer.",
      "One offer per call. Do not co-present tiers; let the buyer pick scope, not a menu.",
    ]),

    checklist("build", "Build checklist (for a sales script)", [
      "Confirm the offer passes the Value Equation test first - a weak offer cannot be scripted into strong conversion.",
      "Write the offer one-liner: who it is for, what result, in what timeframe, through what mechanism.",
      "Build the value stack: named components, each mapped to an objection, with worth stated.",
      "Choose the guarantee type - unconditional, conditional, outcome-based, or anti - and write exact wording with teeth.",
      "Name the mechanism and practice explaining it in one sentence, in plain language.",
      "Draft discovery questions for every CLOSER stage, including follow-ups (\"Tell me more,\" \"What happened next?\").",
      "Prepare price framing and two or three payment options before the call.",
      "Script the top five objections with the isolate → restate → proof loop.",
      "Assemble proof: two lookalike case studies, screenshots, numbers, and testimonials.",
      "Write the pre-call priming sequence: confirmation, 24-hour reminder, 1-hour reminder.",
      "Lay out the minute-by-minute call timeline for the target duration.",
      "Write the close question verbatim and mark exactly where to stay silent.",
      "Prepare the onboarding actions to execute live after a yes - link, agreement, kickoff booking.",
      "Define the follow-up sequence with timings and a hard re-contact rule.",
      "Annotate tonality cues per section and rehearse on recorded calls before going live.",
    ]),

    checklist("audit", "Audit checklist (why close rates are low)", [
      ["Offer", "Is the value-to-price gap obvious? Outcome specific, proof matched, guarantee real, effort low?"],
      ["Audience", "Are the right people booking - in pain, with purchasing power, reachable - or is nobody filtering?"],
      ["Qualification", "Are budget, authority, and timeline checked before the call?"],
      ["Priming", "Does the prospect arrive knowing the agenda, the duration, and what the call is for?"],
      ["Show rate", "Are reminders in place at 24 hours and 1 hour? Are appointments same or next day?"],
      ["Discovery", "Does the closer talk more than the prospect? Is the pain quantified in the prospect's own words?"],
      ["Pitch", "Is the destination painted before the vehicle? Is the mechanism clear? Is the stack itemized?"],
      ["Price timing", "Presented after value, with options, and held without flinching or rushing?"],
      ["Objections", "Isolated, restated, answered with proof - or argued and stacked?"],
      ["Close", "Direct ask made, silence held, next step scheduled before hanging up?"],
      ["Follow-up", "5-minute first response? 7+ touches? Value in every message? A re-contact date on the calendar?"],
      ["Evidence", "Are calls recorded and reviewed? Can you name the top three objections from the last 20 calls?"],
      ["Diagnosis", "Objections repeating across calls are offer problems, not closer problems. Fix the offer."],
      "Work this ladder from top to bottom and stop at the first honest failure - earlier causes masquerade as later ones.",
    ]),

    mistakes("mistakes", "Common mistakes", [
      "Blaming closing technique for an offer that is weak on value, proof, or guarantee",
      "Presenting before diagnosing - pitching before the prospect has described the outcome in their own words",
      "Talking after the ask instead of holding silence",
      "Discounting the core under pressure; bonuses or payment options are the correct lever",
      "Arguing with objections, stacking rebuttals, or answering a concern they never raised",
      "Accepting the first stated objection at face value instead of isolating the real one",
      "Taking \"I need to talk to my spouse\" literally when it usually means internal uncertainty",
      "Skipping reinforcement and leaving onboarding to email; no first action taken on the call",
      "Slow lead response and lazy follow-up - \"just checking in\" carries no value and no next step",
      "Fabricated scarcity or urgency; buyers detect it and referrals die quietly",
      "Ignoring recordings and notes, so the same mistakes repeat unreviewed",
      "Confusing a sales problem with an advertising problem - fixing the closer when traffic or the offer is the constraint",
    ]),

    group(
      "output",
      "Output contract",
      "When asked to write a sales script or prep a call, produce these sections.",
      [
        bullets(
          "sections",
          "Sections",
          [
            "Offer one-liner - who it serves, the result, the timeframe, the mechanism.",
            "Value stack - named components with worth, core separated from bonuses.",
            "Guarantee - type, exact wording, and honest risk level.",
            "Price and payment framing - contrast against the stack, payment options, and what is never discounted.",
            "Discovery question bank - mapped to each CLOSER stage.",
            "Pitch in three lengths - short (hook/DM), medium (landing page), long (call delivery), all destination-first.",
            "Objection-response table - top five, each with hidden belief, reframe, proof, and a one-line script.",
            "Call timeline - minute marks for the target duration, with talk-ratio guidance.",
            "Close sequence - verbatim question, silence cue, and the next-step script.",
            "Pre-call priming - confirmation, reminders, and prep questions.",
            "Follow-up sequence - timings, channel, value content, and the re-contact rule.",
            "Tonality cues - annotation per segment: curiosity, authority, certainty, reinforcement.",
          ],
          { type: "tactic" },
        ),
        n("artifact", "Save artifact: SALES_SCRIPT.md", {
          type: "artifact",
          summary: "Artifacts save to Startup/Hormozi/Outputs/ in the vault.",
        }),
      ],
      { links: ["harness.artifacts"] },
    ),

    examples("examples", "Worked examples", [
      [
        "Price objection, handled",
        "Prospect: \"It is just too much right now.\" Closer: \"Fair. Most of our best clients said that early on. If budget were not a factor at all, is this something you would want to do?\" Prospect: \"Yes, definitely.\" Closer: \"Then the real question is how we make it work, not whether it is right for you. Two options: pay in full, or [payment plan]. The guarantee covers either. Which is easier?\" If the answer had been no, treat it as value or trust wearing a price costume - return to mechanism and proof. Do not touch the number.",
      ],
      [
        "Discovery question set (CLOSER-mapped)",
        "C: \"What made you book this call today?\" / \"Why now rather than six months ago?\" L: \"It sounds like you keep ending up back at square one because of [root cause]. Fair?\" O: \"What have you tried so far, and what happened with each?\" / \"Why do you think it stalled?\" S: \"If this worked, what would life look like in 90 days?\" / \"What would that change for you?\" E: \"What questions do you have?\" / \"What is the first thing that worries you about starting?\" R (post-yes): \"Here is exactly what happens next - step one is [action], and I am sending it now while we are on the call.\"",
      ],
      [
        "Follow-up sequence (lead went quiet after a quote)",
        "Minute 0-5: text - \"Thanks for the time today. Sending the recap and the [offer] summary now - anything you want clarified?\" Same day: email with the recap, exact numbers, and one lookalike case study. Day 2: text with a new angle - \"Two questions after you review with your partner?\" plus two concrete call slots. Day 4-7: phone call, then an FAQ email answering the top three objections. Day 10: deadline touch - bonus or price window expiring, with the honest reason stated plainly. Day 30 and day 90: re-contact with new proof or a new reason. Archive with a tagged reason if still no.",
      ],
    ]),
  ],
});
