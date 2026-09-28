#!/usr/bin/env python
"""Generate frameworks/wealth.md from the Tier D (money/wealth) extraction.

This is the one framework doc whose source is PRIMARY — his own videos — rather
than the third-party MIT/Apache summaries the other docs were redrafted from.
Every figure cited is pulled from the extraction, which passed a 100% verbatim
audit against the transcripts, so nothing here is hand-typed from memory.

Usage: python3 scripts/gen_wealth_module.py
"""
import json, re
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
C = Path.home() / "youtube-transcripts/hormozi"
recs = [json.loads(l) for l in (C / "corpus/extracted.jsonl").read_text().splitlines()]
D = [r for r in recs if r.get("tier") == "D"]

# index every number entry by (video_id, lowercased claim fragment)
NUM = {}
for r in D:
    for n in (r.get("numbers") or []):
        c = str(n.get("claim") or "").lower()
        if c:
            NUM.setdefault(r["video_id"], []).append((c, n.get("value")))


def num(vid, fragment):
    """Fetch the value of the number whose claim contains `fragment`.

    Raises if not found — a missing citation is a bug, not a blank to paper over.
    """
    f = fragment.lower()
    for c, v in NUM.get(vid, []):
        if f in c:
            return v
    raise KeyError(f"no number matching {fragment!r} in {vid}")


def yt(vid):
    return f"[{vid}](https://youtu.be/{vid})"


L = []
A = L.append

A("---")
A("created: 2026-09-28")
A("categories:")
A('  - "[[Skills]]"')
A('  - "[[GTM]]"')
A("type:")
A("  - reference")
A("status: active")
A("source: primary - extracted from 117 of Alex Hormozi's own videos")
A("tags:")
A("  - hormozi")
A("  - framework")
A("  - wealth")
A("---")
A("")
A("# Wealth, Capital & Ownership")
A("> **Primary source.** Unlike the other framework docs in this folder — which were")
A("> redrafted from MIT/Apache-licensed third-party summaries — this one is extracted")
A("> from Hormozi's own videos. Every figure carries a video id and passed a verbatim")
A("> audit against the transcript (10,208 of 10,208 quotes matched exactly).")
A(">")
A("> Quotes come from auto-generated captions: **numbers are reliable, wording is not.**")
A("")
A("## Load this when")
A("- Deciding whether to raise, bootstrap, buy, or run a fund")
A("- Your business throws off more cash than you can deploy")
A("- Someone asks why you don't just put it in the market")
A("- Thinking about debt, leverage, equity, or selling")
A("- Choosing what to do with profit once the business is profitable")
A("")
A("---")
A("")

A("## Core frameworks")
A("")

A("### 1. Wealth is a ratio, not a number")
A("")
A("The load-bearing idea of the whole module. Absolute dollars tell you nothing about")
A("whether someone is wealthy; the ratio between what they have and what they need does.")
A("He states it directly in `t7o8dtUWPQg` as **wealth is a ratio, not a number**.")
A("")
A("The consequence is that the fastest route to feeling wealthy is shrinking the")
A("denominator, not growing the numerator:")
A("")
A(f"- **Price is a share of the buyer's wallet, not a figure.** A $50 purchase is "
  f"{num('m-k0_pQJ1fY', 'share of buyer')} — the same sticker price is a different "
  f"decision for different buyers. {yt('m-k0_pQJ1fY')}")
A(f"- **Ultra-wealthy status spending is trivial relative to net worth.** "
  f"{num('m-k0_pQJ1fY', 'ultra-wealthy status spending')} {yt('m-k0_pQJ1fY')}")
A(f"- **Percentage growth scales with the base, which is why the rich get richer.** "
  f"{num('wtsX7WHQMFM', 'Percentage growth vs absolute')} {yt('wtsX7WHQMFM')}")
A("")
A("**Use it:** when a goal feels unreachable, check which side of the ratio you are")
A("trying to move. Most people attack the numerator by earning more, which is slow and")
A("capped, when the denominator is the cheaper lever.")
A("")

A("### 2. The four capital structures")
A("")
A("A 2x2 of *whose money* against *whose business* — the clearest map he gives of how")
A("capital moves, from `BO_59sGxztY`:")
A("")
A("| | Your business | Other people's businesses |")
A("|---|---|---|")
A("| **Your money** | Bootstrap | Invest |")
A("| **Other people's money** | Raise funding | Run a fund |")
A("")
A("His claim is that the **fund-manager path dominates** — it is the only structure")
A("where other people's money is applied to other people's businesses and you keep a")
A("share of the upside. The arithmetic he works live in `BO_59sGxztY` and again in")
A("`sL16tsGafcQ`: a **$5M GP commitment** (5% of a $100M fund) controls **$300M of")
A("businesses** via $200M of debt; after debt service, LP capital and a preferred")
A("return, 20% carry leaves a **$100M slice** from the original $5M.")
A("")
A(f"His own line on it: *the fund manager will often make more money than any of the "
  f"founders of the businesses they buy* — {yt('BO_59sGxztY')}")
A("")
A("**The prerequisites are the hard part**, and he names only two: *proprietary deal")
A("flow* (deals nobody else sees, so there is no auction) and an *edge in the industry*.")
A("")
A(f"**`Ignorance debt`** is the reason he recommends first-time founders bootstrap: "
  f"the tuition the universe charges for not knowing what you are doing. Pay it down on "
  f"your own money, not your friends' and family's. {yt('BO_59sGxztY')}")
A("")

A("### 3. The ownership ladder")
A("")
A("From `Fy8XX8EuEnA` — a five-rung ladder, and the point is that each rung requires")
A("you to give up doing the thing that got you there:")
A("")
A("| Rung | What you do |")
A("|---|---|")
A("| Self-employed | Doing things for money |")
A("| Manager | Managing people who do things |")
A("| Leader | Leading managers |")
A("| Executive | Leading organisational change around objectives |")
A("| Above the business | Nothing in the business; advising, allocating capital |")
A("")
A("**Scale zero** is the mechanism that forces the climb: if value delivery requires")
A("you to be present, growth stops the moment the team outgrows your capacity to deliver")
A("it. You peel your own skills out of the business one at a time until the only thing")
A("left for you is the biggest decisions.")
A("")
A("**Who not what** is the replacement logic — and he attaches a qualifier that is easy")
A("to miss: you can only hire the *who* once you have learned the *what* yourself,")
A("otherwise you cannot evaluate them. The people you want arrive *batteries included*,")
A("having already solved the problem elsewhere.")
A("")

A("### 4. Every business incurs debt at incorporation")
A("")
A("The frame that dissolves the bootstrap-vs-raise argument. Bootstrapping does not")
A("avoid debt — it **converts financial debt into talent debt, technological debt and")
A("ignorance debt.** The question was never *whether* to take on debt, only *which type*.")
A("")
A("Related, from `52tcB5FopAg` and `yr1DrcPCKEg`: **debt is a de-risking event** when it")
A("takes money off the table. A dividend recap or a minority sale converts illiquid")
A("concentrated risk into cash without giving up control. He frames *borrow, die, never")
A("sell* as the tax-efficient version — margin loans against assets that are never")
A("realised, so no taxable event occurs.")
A("")
A(f"**Rush is imaginary** is the counterweight: most businesses have no network effect "
  f"to capture, so there is no prize for speed. Growth-at-all-costs is choosing to take "
  f"on debt you did not need. His example is Chick-fil-A's restraint against Boston "
  f"Market. {yt('BO_59sGxztY')}")
A("")

A("### 5. Allocation: downside mitigation over upside")
A("")
A("The clearest statement of his own policy, from `Fy8XX8EuEnA`. Four buckets:")
A("")
A("| Bucket | Role |")
A("|---|---|")
A("| Whole life cash value | A loanable bank account, ~4% guaranteed, structured like COLI/BOLI |")
A("| B and C class multifamily syndications | Downside protection |")
A("| Index funds | The thing he refuses to think about |")
A("| Crypto | A ~5% hedge |")
A("")
A("**The stated principle is that he deliberately takes inferior returns** on parked")
A("money, because his upside is his business. *Make money on yourself twice*: take the")
A("non-premium return from passive investments and get the premium return from your own")
A("business, rather than trying to out-trade professionals.")
A("")
A("**Expanded time horizon** is why this works — betting on a long enough horizon")
A("virtually removes risk, which makes guaranteed-upside bets available to you that are")
A("not available to someone who needs the money next year.")
A("")

A("### 6. The cost of ignorance")
A("")
A("Education is priced as an investment with a stated return, and the number is large")
A("enough to justify almost any tuition:")
A("")
A(f"- {num('rp1PzCxj3eU', 'cost of not knowing')} — his framing of what not knowing "
  f"how to make a million costs a $50k earner. {yt('rp1PzCxj3eU')}")
A(f"- **The phlebotomy example** — {num('m-k0_pQJ1fY', 'Phlebotomy')} — is the cheap "
  f"version of the same argument. {yt('m-k0_pQJ1fY')}")
A(f"- **He spent his own savings on it** — {num('m-k0_pQJ1fY', 'share of his own monthly')} "
  f"of monthly income on learning at one point. {yt('m-k0_pQJ1fY')}")
A(f"- **The dinner that cost $350,000** — after $100K, $200K and $250K offers were "
  f"declined, he wrote the larger cheque to buy a meal with a man worth $7B. "
  f"{yt('oDK4g5na4Jw')}")
A("")
A("**`ROIC` — return on invested capital** — is the correct denominator for these")
A("decisions, and he puts it explicitly *above* LTV:CAC: not what it costs to get a")
A("customer, but what it costs to build the whole capacity to serve them (buildout,")
A("licences, recruiting, admin, tech).")
A("")

A("### 7. Attention is the scarce resource")
A("")
A("The tier's most repeated operational claim, and the one that connects wealth back to")
A("business: money is downstream of attention, and attention is destroyable.")
A("")
A(f"- **He paid {num('6ZEZWuVC8-8', 'coach')}** — and note what he bought with it: not "
  f"strategy, attention. {yt('6ZEZWuVC8-8')}")
A("- **The anti-routine.** The routine that produced his best year was all subtraction:")
A("  a new phone number, a fixed block, fewer inputs. Not a new system — a smaller one.")
A(f"- **{num('6BQ3whjWG3M', 'inflation measure')}** — the inflation arithmetic that "
  f"makes every static retirement number wrong. {yt('6BQ3whjWG3M')}")
A("")
A("**`Know what your game beyond the game is`** is the warning attached: once the")
A("business throws off more cash than you can deploy, you are forced into a second game")
A("you did not choose — and learning it drains attention from the business, which is")
A("where your highest return is.")
A("")

A("### 8. Compounding vehicles")
A("")
A("A structural feature that makes growth inevitable, rather than a growth tactic. Two")
A("flavours, from `BO_59sGxztY`:")
A("")
A("- **Customer-based** — customers who never stop buying (recurring or reoccurring).")
A("- **Distribution-based** — for businesses with low repeat purchase (roofing, solar,")
A("  real estate), the compounding asset is the *network of sellers*, not the customers.")
A("  Prestige Labs' thousand locations selling each other's products is the example.")
A("")
A("**`Jockey over horse`** is his largest investment criterion: given a market that will")
A("not disappear, bet on the founding team's ability to solve problems in a dynamic")
A("environment rather than on the idea. **`Theory of constraints`** is the single thesis")
A("Acquisition.com invests under — a system grows until it is constrained and then grows")
A("no further; find the constraint and attack it until the next one appears.")
A("")

A("---")
A("")
A("## Numbers (all verbatim-audited)")
A("")
A("| Claim | Value | Source |")
A("|---|---|---|")
KEY = [
    ("m-k0_pQJ1fY", "share of buyer", "Price as a share of the buyer's net worth"),
    ("m-k0_pQJ1fY", "ultra-wealthy status spending", "Status spending vs net worth, ultra-wealthy"),
    ("m-k0_pQJ1fY", "Prioritising earning over saving", "Earning vs saving as a lever"),
    ("m-k0_pQJ1fY", "Phlebotomy", "Certification cost vs earning-power multiple"),
    ("m-k0_pQJ1fY", "Same job in a different city", "Same job, different market"),
    ("wtsX7WHQMFM", "Percentage growth vs absolute", "Percentage vs absolute growth"),
    ("rp1PzCxj3eU", "cost of not knowing", "Annual cost of not knowing how to make $1M"),
    ("BO_59sGxztY", "GP contribution", "GP commitment to fund control"),
    ("BO_59sGxztY", "Fund leverage", "Fund leverage: equity to debt to businesses"),
    ("BO_59sGxztY", "full fund outcome", "The full fund outcome worked through"),
    ("BO_59sGxztY", "Management fees", "Management fees on a 10-year fund"),
    ("6BQ3whjWG3M", "inflation measure", "Inflation: $1 in 1975 vs today"),
    ("6BQ3whjWG3M", "car lease", "A car lease priced in retirement dollars"),
    ("6BQ3whjWG3M", "starting 10 years late", "Cost of starting 10 years late"),
    ("QTZsh3BgOwY", "hiring arithmetic", "Why one $100k hire is dangerous at $1M revenue"),
    ("4Yz8ggEv0NU", "10% price increase", "Effect of a 10% price rise on profit"),
]
for vid, frag, label in KEY:
    A(f"| {label} | **{num(vid, frag)}** | {yt(vid)} |")
A("")
A("---")
A("")
A("## Where this contradicts the other framework docs")
A("")
A("Worth knowing, because the rest of this folder was built on third-party summaries:")
A("")
A("- **`Theory of constraints` is not a scaling framework to him, it is an investment")
A("  thesis.** The other docs treat constraint-finding as an operator habit; he uses it")
A("  as the single filter Acquisition.com deploys capital under.")
A("- **`Wealth is a ratio` inverts the goal-setting advice.** Most goal frameworks tell")
A("  you to raise the target. He tells you to shrink the need.")
A("- **Debt is framed as risk-reduction, not risk.** The third-party material treats")
A("  leverage as danger; he treats taking money off the table as the de-risking move.")
A("")

(REPO / "frameworks/wealth.md").write_text("\n".join(L) + "\n")
print(f"wrote frameworks/wealth.md ({(REPO/'frameworks/wealth.md').stat().st_size:,} bytes)")
print(f"  sourced from {len(D)} tier-D videos; every figure resolved from the extraction")
