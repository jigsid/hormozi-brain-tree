import { n, group, bullets, rules, checklist, mistakes, examples } from "../dsl";

export const mindset = n("mindset", "Mindset & Operator", {
  type: "module",
  summary:
    "Fear triage, volume over volatility, one thing at a time, hypothesis-first execution, the learning loop, the leverage ladder, and stage gates from idea to product.",
  children: [
    bullets(
      "triggers",
      "Load this when",
      [
        "You feel stuck, frozen, or unable to start",
        "You are scared to leave a job, launch publicly, or be seen failing",
        "You have more than three active ideas and none is compounding",
        "Your channel \"doesn't work\" but your weekly activity numbers are tiny",
        "You need to commit to one vehicle for years, not weeks",
        "You keep restarting (new offer, new niche, new name) and the clock resets to zero",
        "You need a fast, validated path from idea to a sellable offer",
        "You must decide whether to double down, improve, or kill the current bet",
        "You are asking whether the hard work is worth it, or what \"balance\" should look like",
        "You are deciding between quitting and sticking, and want a rule instead of a mood",
      ],
      { type: "trigger", summary: "Triggers that route a session into the Mindset module." },
    ),

    group(
      "fear",
      "Fear triage",
      "Fear keeps its power while it stays abstract. Put it on paper and it becomes a list of events you can price, schedule, and survive.",
      [
        bullets(
          "steps",
          "Steps",
          [
            "Write the vague version exactly as it runs in your head: \"I'll quit, it fails, everyone judges me, I'm finished.\"",
            "Play it forward as discrete events. Quit → business stalls → burn 4 months of savings → take contract work at similar pay within 8 weeks → skill set now includes operator plus founder experience. Add the true worst case and the real permanent loss.",
            "Label each step: certain, likely, possible, fantasy. Most fear chains collapse at fantasy.",
            "Compare paths honestly. If staying guarantees an outcome you don't want, and leaving buys a chance at one you do, the math already favors the leap.",
            "Name the audience whose approval you're protecting. That, not the math, is usually the actual constraint.",
            "Apply the humor test: if this will be a funny story in 12-18 months, you can treat it as one now.",
          ],
          { type: "tactic" },
        ),
        bullets(
          "fear-objects",
          "Common fear objects, made specific",
          [
            ["Quitting a job", "Write the exact month-by-month burn, the exact fallback job, the exact pay cut, the exact person you'd ask for a room."],
            ["Launching publicly", "Write the worst comment you could receive, who would write it, and what it would cost you. Usually zero customers change behavior."],
            ["Raising prices", "Write the number of current customers you can afford to lose and still net more revenue. Then say the line out loud."],
            ["Hiring or firing", "Write the 90-day cost of inaction versus the one-week discomfort of the conversation."],
            ["Betting on one niche", "Write what you give up (a smaller list of options) versus what you gain (compounding, referrals, word of mouth)."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        n("frozen-decision", "A frozen decision is a fear decision", {
          type: "rule",
          summary:
            "For founders already operating: run the same loop on any decision frozen for two weeks - firing, raising prices, sunsetting a product, confronting a partner.",
        }),
        n("shame-ledger", "Keep a shame ledger", {
          type: "tactic",
          summary:
            "List every feared judgment, who would deliver it, and what it would actually cost you in money, customers, or relationships. Most entries price out at zero. The few that don't get a mitigation plan instead of avoidance.",
        }),
        n("fear-vs-signal", "Distinguish fear from signal", {
          type: "rule",
          summary:
            "Fear predicts disaster without evidence and grows when you avoid it. Signal is specific, testable, and shrinks when you gather data. If you can't name the metric that would resolve it, it's fear wearing a business costume.",
        }),
        n("job-exit-gate", "Job-exit gate", {
          type: "rule",
          summary:
            "3-6 months of runway saved, side income matching or approaching salary, income held 3-6 months. Hit all three and the only remaining blocker is shame. Decide anyway.",
        }),
        n("courage", "Courage is a decision plus a calendar entry", {
          type: "tactic",
          summary: "Give the feared action a date, then treat the date as binding.",
        }),
      ],
      { links: ["mindset.focus", "mindset.hypothesis", "voice.moves"] },
    ),

    group(
      "volume",
      "Volume beats volatility",
      "Sporadic sales feel like an unstable market. Usually they are a starved channel. Before you declare anything broken, compare your volume to a leader's. The typical gap is 100-500x, not 20%.",
      [
        bullets(
          "steps",
          "Steps",
          [
            "Pick one channel. Record your actual weekly volume in inputs, not outcomes.",
            "Look up what a full-time operator in that channel runs weekly. Write the number down where you can see it.",
            "Set a test size large enough to produce signal. A few hundred units is a sample, not a test; thousands per day is a test.",
            "Run the volume daily for the full window. Do not evaluate mid-test. Do not rewrite copy until the test size is met.",
            "Judge at the end: below threshold at real volume means iterate or kill. Never reaching volume means you learned nothing, regardless of results.",
          ],
          { type: "tactic" },
        ),
        n("ledger", "Weekly ledger", {
          type: "tactic",
          summary:
            "Sends, calls, conversations, offers made, closes, revenue. Review inputs on Monday and outputs on Friday. When results dip, assume volume first and channel second.",
        }),
        n("activity-math", "Run the activity math backwards from the goal", {
          type: "tactic",
          summary:
            "10 new customers a month at a one-in-five close rate needs 50 qualified conversations; at a one-in-four reply rate that is 200 real conversations started; with follow-up that is several hundred sends or calls per week. Do this on one line of paper before choosing a feeling about the channel.",
        }),
        bullets(
          "question-types",
          "Two question types never need outside advice",
          [
            ["Spreadsheet questions", "CAC, LTV, margin, payback, close rate. Open the sheet and compute."],
            ["Test questions", "Anything answerable by running an experiment. Run it, then read the data."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        n("experimentation", "Win on your rate of experimentation", {
          type: "rule",
          summary:
            "Not on your ability to guess the right answer. Follow-up matters as much as reach: most replies and closes arrive after multiple touches, so a single send is not a test either.",
        }),
      ],
      { links: ["leads.growth-levers", "leads.warm-outreach", "mindset.hypothesis"] },
    ),

    group(
      "focus",
      "One thing at a time",
      "Compounding only accrues to the same asset over a long period. Every operator who built something lasting stayed on one vehicle far longer than felt reasonable.",
      [
        n("boss-trap", "The boss trap", {
          type: "tactic",
          summary:
            "You can beat levels one through three of any new game, then stall at the same boss four, wearing a different skin. The level you avoid follows you into every new venture. Switching never removes it; it only delays it.",
        }),
        bullets(
          "rules",
          "Rules",
          [
            "Compare year 0 of the new idea against year 3-4 of the current one, never against year 0. A new thing must outgrow an incumbent with years of compounding to justify the switch. It rarely does.",
            "Early traction from a new project produces a dopamine spike that trains you to quit again. After your first real leap, unlearn that reflex immediately. Stick.",
            "One primary vehicle; side bets capped at 10% of resources; a switch requires written evidence the current vehicle is dead (real volume, zero sales for 90 days), not boredom.",
            "Count cumulative reps on the same vehicle, not attempts. Five years in the game with six months on the current thing means you are six months in.",
          ],
          { type: "tactic" },
        ),
        n("vehicle", "Define \"vehicle\" in writing", {
          type: "rule",
          summary:
            "The customer, the offer, and the channel. You may change tactics inside a vehicle freely. You may not change the vehicle without the 90-day evidence file.",
        }),
        n("score-ideas", "When two ideas compete, score them", {
          type: "tactic",
          summary:
            "Pain intensity, your unfair knowledge, speed to first dollar, and referral potential. Pick the winner and shelve the loser in the 10% bucket with a review date. Do not split primary effort.",
        }),
        n("quarterly-review", "Quarterly vehicle review", {
          type: "tactic",
          summary:
            "Three questions: Did I hit my volume every week this quarter? Is the constraint the tactic or the vehicle? What would I need to see to justify a switch, in writing, before emotion enters the room? Answer in advance so the decision is rules-based, not mood-based.",
        }),
        n("restart-detection", "Restart detection", {
          type: "rule",
          summary:
            "Check whether your current effort's start date keeps moving. If the answer to \"how long have you been doing this?\" is \"about six months\" in every quarter, you are running a restart loop wearing a growth costume.",
        }),
      ],
      { links: ["mindset.volume", "mindset.fear", "leads.growth-levers"] },
    ),

    group(
      "hypothesis",
      "Hypothesis-first execution",
      "First-time operators treat a wrong hypothesis as a verdict on the business. Experienced ones assume every launch starts wrong and treat starting as the process of correcting it. Separate being right from being successful.",
      [
        n("component-level", "Diagnose at the component level", {
          type: "tactic",
          summary:
            "Never \"ads don't work.\" Say exactly which link broke: hook, click-through, landing page, offer, price, follow-up, or delivery. Name the step, then fix the step.",
        }),
        n("cycle", "The cycle", {
          type: "tactic",
          summary:
            "Write hypothesis → define one metric and threshold → run test → review → scale, iterate, or kill.",
        }),
        n("gut-call", "When data is incomplete but direction is clear", {
          type: "tactic",
          summary:
            "Make one gut call and convert it into a single measurable constraint the team works against. Then validate it with the next cycle.",
        }),
        n("above-role", "Put the business's success above your role", {
          type: "rule",
          summary: "If you aren't the best person for a seat, recruit over yourself and move.",
        }),
        bullets(
          "diagnosis-compare",
          "Expert vs beginner diagnosis",
          [
            ["Beginner", "\"Marketing doesn't work.\""],
            ["Expert", "\"Click-through was too low to deliver qualified visitors to a page that converted poorly at a price too high for the urgency we created.\""],
            ["Expert habit", "Track 15-20 metrics per function and know which lever moves which number."],
            ["Beginner habit", "Binary worked/didn't-work thinking."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        n("review", "Failed-experiment review (four questions)", {
          type: "tactic",
          summary:
            "What exactly did we predict? What actually happened? Which step diverged? What single change goes into the next test? Write the answer in the experiment log, not in your head.",
        }),
      ],
      { links: ["leads.growth-levers", "mindset.volume", "mindset.learning"] },
    ),

    group(
      "learning",
      "Learning loop",
      "There is no scarcity of information, only scarcity of filtering. Experts already paid for the filters. Borrow theirs.",
      [
        bullets(
          "expert-chain",
          "The 5-expert chain",
          [
            "Ask someone you trust: who are the five best people you know at this?",
            "Interview each one. Take notes by category, not by person.",
            "Ask each: who are the five best people you know at this?",
            "Repeat until names begin to recur. Repeats are the real map.",
            "Distill in four stages: raw notes → reorganize by function → keep beliefs that appear across multiple sources → infer what the correct solution must look like.",
          ],
          { type: "tactic" },
        ),
        bullets(
          "categories",
          "Note categories that work",
          [
            "Metrics tracked",
            "Daily behaviors",
            "Tooling",
            "Pricing logic",
            "Hiring bar",
            "Common failure modes",
            "First 30-day actions",
          ],
          { type: "tactic" },
        ),
        bullets(
          "study-order",
          "Study order that saves time",
          [
            "Read practitioners with current operating experience before academics.",
            "Read case studies with numbers before theory.",
            "Study the constraint you have today, not the phase you wish you were in.",
            "Depth on one domain beats coverage of five.",
          ],
          { type: "tactic" },
        ),
        n("output-first", "Output-first study", {
          type: "rule",
          summary:
            "Every conversation ends with a written \"what I will do differently this week.\" If nothing changes, the input was entertainment. Schedule the action before the next conversation.",
        }),
        n("hiring-method", "Apply the same method to hiring", {
          type: "tactic",
          summary:
            "Interviews are free consulting. Run 10-50 for key roles, compare answers, and you will recognize good before you hire it. For a critical seat, spend 12-18 months recruiting rather than settling. Ask every candidate to explain their function as if you were a beginner; confusion means they either don't understand it or are hiding something.",
        }),
      ],
      { links: ["sales.belief", "scaling.operator-owner", "mindset.leverage"] },
    ),

    group(
      "leverage",
      "Leverage ladder",
      "Every business must attract attention, convert attention, and deliver. In each function, climb rungs in order: effort → skill → systems → capital.",
      [
        bullets(
          "rungs",
          "The rungs",
          [
            ["Effort", "You do it live, one unit at a time - 1:1 outreach, live calls, personal fulfillment."],
            ["Skill", "The same hour produces more output - better hooks, scripts, sequencing, close rate."],
            ["Systems", "Employees, checklists, SOPs, recordings, and media replicate your output without you - webinars, videos, automated checkout."],
            ["Capital", "Paid distribution and build-once-deliver-infinitely fulfillment - ads, content libraries, software, products."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        bullets(
          "functions",
          "How each function climbs",
          [
            ["Attract", "Manual outreach → refined hooks and targeting → content and webinars → paid distribution at scale."],
            ["Convert", "Live calls → scripted calls and set follow-up cadences → recorded sales assets → self-serve purchase."],
            ["Deliver", "You deliver live → trained team delivers → templated and recorded delivery → software or media that delivers infinitely."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        bullets(
          "rules",
          "Rules",
          [
            "Never climb a rung before the rung below has a measured conversion rate. You cannot systematize chaos.",
            "Once a rung works, document it as a checklist, demonstrate it in front of someone, then require them to duplicate the demonstrated output. Fix the checklist until it matches your actual behavior.",
            "Audit monthly: name the bottleneck function among attract, convert, deliver. Move only that function up one rung.",
            "Keep recruiting standards high: strong operators attract strong operators, weak ones hire beneath themselves to feel safe.",
          ],
          { type: "tactic" },
        ),
        n("barrels", "Hire barrels, not ammunition", {
          type: "rule",
          summary:
            "A barrel directs throughput; adding executors to a capped barrel changes nothing. Roughly the square root of headcount generates half the value, so growth means finding more barrels, not more hands. Barrel test: a barrel owns an outcome, sets the pace for others, and ships without reminders. An executor waits for instructions and completes tasks. Spot barrels by who unblocks the team and who the team copies.",
        }),
      ],
      { links: ["scaling.growth-levers", "scaling.operator-owner", "leads.core-four"] },
    ),

    group(
      "idea-product",
      "Idea → product (stage gates)",
      "Do not build before demand is proven with money. Run gates in order; skip none.",
      [
        bullets(
          "gates",
          "The gates",
          [
            ["Gate 0 - market", "One-sentence avatar. Urgent pain, ability to pay, reachable channel. If pain is \"nice to have,\" refine the niche or stop."],
            ["Gate 1 - demand evidence", "Collect 3-10 paid pilot users. Start with people who already know you (warm outreach converts fastest), then strangers. No build until payment clears."],
            ["Gate 2 - offer", "Define one measurable outcome. List every obstacle between the customer and that outcome. Convert each obstacle into a solution and an asset. Choose delivery: DIY scales, DWY balances, DFY earns premium pricing. Add speed and ease: a win inside the first session, templates instead of thinking, fewer steps."],
            ["Gate 3 - value", "Stack core deliverable plus bonuses, and tie every bonus to a specific objection. Show total value before price. Price as a fraction of perceived value; under-pricing lowers trust."],
            ["Gate 4 - pitch", "Who it's for, what it does, why it's different. Hook frame: WHO + RESULT + SPEED/EASE + OBJECTION REMOVAL. Map each objection to the missing belief and the proof that resolves it."],
            ["Gate 5 - scale", "Only after retention or repurchase appears. Then allocate resources 70/20/10 and protect the core."],
          ],
          { type: "tactic", parentType: "component" },
        ),
        n("idea-source", "Source of ideas: the 3 Ps", {
          type: "tactic",
          summary:
            "Pain you lived, profession you left, or passion you already spend free time on. One source is enough; two is strong; all three is close to bulletproof. Missionary stories (I had this problem and fixed it) outperform mercenary stories (I analyzed the market) in trust, content, and longevity.",
        }),
        n("goal-calibration", "Goal calibration", {
          type: "rule",
          summary:
            "A $10M outcome fits almost any business on a long timeline; a trillion-dollar outcome requires technology. Pick a target that fits the life you actually want rather than a number that sounds ambitious.",
        }),
      ],
      { links: ["offers.grand-slam", "offers.market", "money.sequencing", "leads.warm-outreach"] },
    ),

    rules("rules", "Decision rules & thresholds", [
      "Outreach order: warm audience first (20-50 personal contacts), cold channels second.",
      "Channel test minimums before judgement: 100-300 targeted DMs or emails with follow-ups; 500+ flyers/drop pieces; 1,000+ qualified impressions for paid creative. Sustain daily volume, not weekly.",
      "Content: 1-2 posts per week is not a test. Minimum 1-2 per day for 90 days; elite operators run hundreds per week.",
      "Test window: 14-30 days per hypothesis, one variable at a time. Kill when conversion stays below threshold at target volume.",
      "Kill criteria: no paying customer after 90 days at true minimum volume; unit economics that fail at 3× current price; founder dread persisting past month 6. Kill tactics and channels freely; kill the vehicle only with written evidence.",
      "Commitment rules: 12-18 months minimum on a vehicle; one primary bet; new bets capped at 10% of resources; never move star performers off the core to staff a new project.",
      "Resource split once profitable: 70% more of what works, 20% better versions of what works, 10% new experiments.",
      "Job-exit gate: 3-6 months runway, side income matching or approaching salary, income held 3-6 months.",
      "Hiring: 10-50 interviews per key role, compare solutions across candidates, 12-18 months of patience for an A-player seat.",
      "Question routing: spreadsheet-math or test-answerable questions never go to advisors. Do the math or run the test.",
      "Gut calls: allowed once per uncertain decision; immediately convert to one measurable metric and constraint.",
      "Follow-up minimums: 3-5 touches per prospect before marking dead; most conversions happen after the first touch.",
      "Pricing floor: price high enough that one in three qualified buyers saying yes still leaves healthy margin; if nobody flinches, the price is too low.",
      "Commitment default: when unsure between two actions, choose the one that compounds (same audience, same offer, same channel) over the one that merely feels new.",
      "Reset rules: a new day starts the streak at zero - never skip two consecutive days of primary activity; one miss is noise, two is a pattern.",
      "Decision deadlines: any frozen decision gets a date within 7 days; decide then with available data, correct after.",
    ]),

    checklist("operating", "Operating checklist", [
      "Daily: hit the activity target for your one vehicle (outreach, calls, or content) before anything else.",
      "Daily: log input volume; never end the day not knowing your number.",
      "Daily: ship one output - a post, a send, a call, or a committed improvement.",
      "Daily: 15-30 minute metrics review; change one variable at most.",
      "Weekly: spreadsheet pass on CAC, LTV, margin, close rate; act on math, not mood.",
      "Weekly: launch one experiment with a written hypothesis and threshold.",
      "Weekly: one practitioner conversation converted into one action this week.",
      "Weekly: protect the core - proven people stay on the proven thing.",
      "Monthly: bottleneck audit across attract, convert, deliver; move the constraint one rung.",
      "Monthly: fear triage on anything avoided for more than two weeks; make it specific, then decide.",
      "Monthly: clock check - same vehicle, or a silent restart in progress?",
      "Monthly: verify follow-up cadences are actually running on all open prospects.",
      "Monthly: prune the side-bet list to the fixed 10% cap; park or cut the rest.",
      "Quarterly: scale/kill review; document the lesson either way.",
    ]),

    mistakes("anti-patterns", "Anti-patterns", [
      "Diagnosing at category level (\"ads don't work\") instead of naming the broken step",
      "Judging a channel before hitting minimum test volume",
      "Restarting on a new boss four because it feels faster than grinding the current one",
      "Comparing year 0 of a shiny idea against year 0 of your running business",
      "Building product before collecting payment evidence",
      "Asking people questions a spreadsheet or a test would settle",
      "Optimizing for the loud 20% instead of the silent majority who actually buy",
      "Hiring headcount instead of barrels; adding ammunition to a capped barrel",
      "Pulling star performers off the core to staff unproven projects",
      "Keeping a fear vague, or waiting for a guarantee, to avoid deciding",
      "Refusing to pivot because pivoting would mean you were wrong",
      "Under-pricing to feel safe, which lowers trust and attracts worse customers",
    ]),

    group(
      "output",
      "Output contract",
      "When asked to coach through a stuck point, produce: diagnosis → one prescription → minimum viable action today.",
      [
        n("artifact", "Save artifact: OPERATOR_NOTES.md", {
          type: "artifact",
          summary: "Artifacts save to Startup/Hormozi/Outputs/ in the vault.",
        }),
      ],
      { links: ["harness.artifacts"] },
    ),

    examples("examples", "Worked examples", [
      [
        "Idea triage (3 Ps scan)",
        "Pain: 20 years of sleep apnea, thirty failed products. Profession: operations at a sleep clinic. Passion: builds electronics on weekends. Score 3/3, so lead with the pain story. Avatar: diagnosed apnea sufferers who refuse CPAP. Gate 1 this week: message 30 former clinic contacts, offer a paid pilot, target 5 buyers in 14 days. No manufacturing until pilots clear.",
      ],
      [
        "Volume plan (cold email, gym owners)",
        "Current: 40 sends per week, one reply. Leader benchmark: roughly 1,000+ sends weekly with four-step follow-up. Set test: 200 per day for 14 days on one offer, tracking open → reply → call → close. Judge on day 15 at full volume. Kill if reply rate stays under 1% across ~2,800 sends, because the volume excuse is spent.",
      ],
      [
        "Fear made specific",
        "Vague: \"If I leave and fail, I'm ruined and everyone will know.\" Specific: quit → 4 months of savings spent → income dips 40% → contract work at comparable pay within 8 weeks (two of my last three colleagues did exactly this) → worst case, a room at my brother's place for 3 months → permanent loss: $18K. Compare: staying guarantees the resentment; leaving buys the chance. Decide today, write the date, act on it.",
      ],
    ]),
  ],
});
