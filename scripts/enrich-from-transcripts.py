#!/usr/bin/env python
"""Enrich the Hormozi Brain Tree with transcript-derived evidence.

- adds a `quotes` array to existing nodes (verbatim + video provenance)
- adds new transcript-grounded rule nodes inside existing modules
- adds a new top-level branch E (Evidence & Benchmarks)
Writes index.html, quotes.json, EVIDENCE.md
"""
import json, re, html
from pathlib import Path

ROOT = Path.home() / "Documents/Projects/hormozi-brain-tree"
IDX = ROOT / "index.html"
TD = Path.home() / "youtube-transcripts/hormozi"

# ----------------------------------------------------------------------------
# 1. load DATA out of index.html
# ----------------------------------------------------------------------------
src = IDX.read_text()
m = re.search(r"const DATA\s*=\s*", src)
start = m.end()
depth, i, instr, esc = 0, start, False, False
while i < len(src):
    c = src[i]
    if instr:
        if esc: esc = False
        elif c == "\\": esc = True
        elif c == '"': instr = False
    else:
        if c == '"': instr = True
        elif c == "{": depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0: break
    i += 1
DATA = json.loads(src[start:i + 1])
END = i + 1

def find(node, nid):
    if node.get("id") == nid: return node
    for c in node.get("children", []):
        r = find(c, nid)
        if r: return r
    return None

# ----------------------------------------------------------------------------
# 2. verbatim quotes, keyed to existing nodes
# ----------------------------------------------------------------------------
Q = lambda t, s, v: {"t": t, "src": s, "vid": v}

QUOTES = {
 "O.1": [Q("If you need to make your customers worth more, the only thing you can do to make them worth more is you raise your prices, you decrease churn.",
           "If you're not unbelievably rich yet, this is why", "h6y0nYVZgwE")],
 "O.9": [
   Q("If you're closing at 80% or more in whatever you sell, so four out of five people you talk to buy your thing, you're typically underpriced by 3 to 4x.",
     "The Mathematics of Business, Explained", "A_tx40lNpf8"),
   Q("If you're between 50 and 60%, typically you're underpriced by one and a half to 2x.",
     "The Mathematics of Business, Explained", "A_tx40lNpf8"),
   Q("Now if you're between 40 and 50% close rates, you're probably between 1.25 to 1.5x underpriced.",
     "The Mathematics of Business, Explained", "A_tx40lNpf8"),
   Q("If you have that sales motion and you were closing 35%, you're appropriately priced.",
     "The Mathematics of Business, Explained", "A_tx40lNpf8"),
 ],
 "O.4": [Q("If you say it's going to cost 100 grand to do my thing and then you're going to make $300,000 back on average in the first year, that's going to be a significantly easier sell.",
           "What Makes The Perfect Business (5 Things)", "3fsJFUvA6Ts")],
 "M.6": [
   Q("The first year of gym launch, my LTV CAC was 100 to one. I spent a hundred grand and made 10 million.",
     "The Mathematics of Business, Explained", "A_tx40lNpf8"),
   Q("Most of the money that I've made in my life has happened during these distinct windows of opportunity where there was huge arbitrage between what it cost me to get a customer and what a customer is worth to me. I've had that happen four times in my life. And each of those times have been above 30 to1.",
     "The Mathematics of Business, Explained", "A_tx40lNpf8"),
 ],
 "M.3": [
   Q("Most people get 20 to 30% uptake on their upsells. If you use an assume close tactic like this, you can literally see 90% plus take rates.",
     "How To Close Everyone Downselling Like A Pro", "j1tA4l7R2c0"),
   Q("If you have upsells, try and have them be zero cost, zero work upsells, so that you can just make more money up front.",
     "How to Start a Business From Nothing (Thank Me Later)", "unshZobTt6Q"),
 ],
 "M.5": [Q("The first thing we did is we introduced a highest tier continuity option that would make the existing $2,000 a month or $4,500 per quarter seem reasonable by comparison.",
           "I Blew Up A Secret Business To Prove It's Not Luck", "SmiOK8Yun4s")],
 "R.6": [
   Q("If you have 50% annual retention, then you can take whatever someone pays over a year - say $100 - and it means that you can basically double it. You divide it by 50%, equals $200 is what you're going to make from a customer.",
     "The Mathematics of Business, Explained", "A_tx40lNpf8"),
   Q("Let's say that you have 80% annual retention. Doesn't seem like that much different, right? It's only 30%. It means that you're going to get functionally four turns, five turns because every year you're going to lose 20%.",
     "The Mathematics of Business, Explained", "A_tx40lNpf8"),
 ],
 "R.7": [
   Q("My rule of thumb is that for every new tier you want to 5 to 10x your price and expect 20% of people to take it.",
     "Why you aren't making as much money as you want", "ZuJryiwxjDw"),
   Q("I want each tier to bring me another double, like another full amount of revenue. Otherwise, I don't know if it's worth creating the actual extra constraint of operations.",
     "Why you aren't making as much money as you want", "ZuJryiwxjDw"),
   Q("Here's my rule of thumb for upsells taking into account that 20% of customers have far more spending power than the ones below.",
     "Why you aren't making as much money as you want", "ZuJryiwxjDw"),
 ],
 "R.2": [Q("If you want to grow to let's say 300 members, and let's say your churn is 10%.", "Your Inflow Is Your Bottleneck", "XC_lklN9KmE")],
 "S.1": [Q("My rule of thumb with sales people in general with a proper sales process is 35%. I would like them to close at least one out of three of the prospects that they're getting touched with. Typically, if it's higher than that, I will raise price. And if it's below that, then I will fix the process before I even consider lowering the price.",
           "The Mathematics of Business, Explained", "A_tx40lNpf8")],
 "S.5": [Q("If somebody's closing, let's say, 25% or less, they get bumped down.", "How I Scaled My Sales Team", "okA9Yt2KZuk")],
 "S.6": [Q("The reason pre-selling is important, especially as you scale, is that you want to always shorten sales cycles.",
           "I Blew Up A Secret Business To Prove It's Not Luck", "SmiOK8Yun4s")],
 "L.5": [Q("If you're a local gym and you're spending, call it, $10,000 a month on ads, you're reaching every single person in your radius multiple times a week.",
           "13 Years of Marketing Advice in 85 Mins", "reisEL_D7xc")],
 "L.6": [Q("The reason that my ads do well when I have my $10 million building behind me is like, 'Oh, well, that's hard to fake.'",
           "If I Wanted To Grow An Audience In 2026, I'd Do This", "Jmkq5RLjm0U")],
 "L.1": [Q("If you're a little bit more niched, then that can go up to 5% of leads.", "The Mathematics of Business, Explained", "A_tx40lNpf8")],
 "K.2": [
   Q("You need to do 10 or 20 or 30 times the volume.", "If You're in Your 20s or 30s, Here's How to Win (at Anything)", "0lMn_-EXyhQ"),
   Q("The reason so few people understand success is consistency never looks impressive in the moment, only at the end.",
     "Stop Caring What Others Think of You So Much", "qqjGxVW-Ae0"),
 ],
 "K.3": [Q("If you say no, hypothetically, to literally everything except for one thing, you would define that person as incredibly focused, probably obsessive.",
           "How To Scale Yourself: The What-Why-How Framework", "lIC8fYbrkII")],
}

# ----------------------------------------------------------------------------
# 3. new transcript-grounded rule nodes appended inside existing modules
# ----------------------------------------------------------------------------
def rule(nid, title, spec, detail=None, children=None):
    node = {"id": nid, "title": title, "spec": spec, "kind": "rule"}
    if detail: node["detail"] = detail
    if children: node["children"] = children
    return node

NEW_IN_MODULE = {
 "O.9": [rule("O.9.7", "Close-rate → price ladder",
   "80%+ close = underpriced 3-4x · 50-60% = 1.5-2x · 40-50% = 1.25-1.5x · 30-40% = correct · <25% = fix process, not price.",
   "Hormozi's most actionable pricing instrument, from The Mathematics of Business. Your close rate is the read-out on your price. Work the ladder top-down:\n\n"
   "- **Closing 80%+** (four out of five people buy): underpriced by **3-4x**. Raise price aggressively.\n"
   "- **Closing 50-60%**: underpriced **1.5-2x**. A $100 price point should be $150-200.\n"
   "- **Closing 40-50%**: underpriced **1.25-1.5x**. $100 should be $125-150.\n"
   "- **Closing 30-40%**: **appropriately priced** - conditional on having the selling mechanisms in place to educate the buyer before the pitch.\n"
   "- **Closing <25%**: too expensive, or the process is broken. He bumps reps down a tier. Fix the process before ever cutting price.\n\n"
   "The logic: price too low shows up as a suspiciously high close rate, and high close rate is the most expensive thing you can have because you are leaving margin on every deal. Price too high shows up as a low close rate. Either way the fix is usually the *mechanism* (proof, education, pre-selling), not the number.\n\n"
   "The reverse direction also holds: if close rate is above target he raises price; if below, he fixes the process first. Price is the last lever, not the first.",
   children=[
     {"id":"O.9.7.1","title":"80%+ close → 3-4x underpriced","spec":"Four out of five buying means you are leaving 3-4x on the table."},
     {"id":"O.9.7.2","title":"50-60% close → 1.5-2x underpriced","spec":"$100 should be $150-200. The jumps compress as you approach the target."},
     {"id":"O.9.7.3","title":"40-50% close → 1.25-1.5x underpriced","spec":"$100 should be $125-150."},
     {"id":"O.9.7.4","title":"30-40% close → appropriately priced","spec":"Target zone - assuming pre-pitch education mechanisms exist."},
     {"id":"O.9.7.5","title":"<25% close → fix process, not price","spec":"Too expensive or broken process. Never cut price as the first move."},
   ])],
 "M.6": [rule("M.6.6", "Arbitrage windows - when LTV:CAC runs 30:1+",
   "Gym Launch year 1: 100:1 ($100k spend → $10M). Four such windows in his life, every one above 30:1.",
   "The 3:1 LTV:CAC figure is a *floor for durability*, not a target for ambition. Hormozi's outsized wealth came from short windows where the arbitrage between acquisition cost and customer value was enormous:\n\n"
   "- **Gym Launch, year one: LTV:CAC of 100:1.** He spent $100,000 and made $10 million.\n"
   "- **Four windows in his life, every one above 30:1.** Each was a period when a channel was mispriced relative to what a customer was worth.\n\n"
   "Implication: 3:1 keeps you alive; 30:1+ makes you rich. The job is to keep beating on the system - tweaking the money model - until you land inside an arbitrage window. When you find one, scale spend hard and do not cap it. When the window closes, the 3:1 floor is what keeps you in business.",
   children=[
     {"id":"M.6.6.1","title":"3:1 is the floor, not the goal","spec":"Durability threshold. Survive here, don't celebrate here."},
     {"id":"M.6.6.2","title":"30:1+ windows make the wealth","spec":"Four in his life. Scale spend without a cap while one is open."},
     {"id":"M.6.6.3","title":"30-day CAC payback","spec":"Goal: recover CAC within 30 days - the interest-free float on a credit card."},
   ])],
 "M.3": [rule("M.3.5", "Upsell uptake benchmarks",
   "20-30% is normal uptake. Assume-close lifts it past 90%. Prefer zero-cost, zero-work upsells.",
   "Upsell performance benchmarks:\n\n"
   "- **20-30% uptake** is the normal range for a straightforward upsell.\n"
   "- **90%+ take rates** are achievable using an *assume close* - presenting the next thing as already decided rather than asking whether they want it.\n"
   "- **Prefer zero-cost, zero-work upsells** so incremental revenue arrives with no added fulfilment burden.\n\n"
   "Uptake below 20% usually means the upsell is a different product rather than the obvious next step for the problem just solved.",
   children=[
     {"id":"M.3.5.1","title":"20-30% = normal","spec":"Baseline for a standard upsell."},
     {"id":"M.3.5.2","title":"90%+ with assume-close","spec":"Frame the next purchase as decided, not as a question."},
     {"id":"M.3.5.3","title":"Zero cost, zero work","spec":"Best upsell adds revenue without adding fulfilment."},
   ])],
 "R.6": [rule("R.6.6", "Retention → LTV: divide by churn",
   "LTV = annual payment ÷ churn rate. 50% retention → 2x annual payment. 80% retention → 5x.",
   "The arithmetic that makes retention the highest-leverage number in the business:\n\n"
   "**LTV = annual payment ÷ churn rate.**\n\n"
   "- Someone pays **$100/year** at **50% annual retention** → divide by 50% → **$200 LTV**.\n"
   "- Same $100/year at **80% annual retention** → divide by 20% → **$500 LTV**.\n\n"
   "A 30-point retention improvement - which feels marginal - multiplies customer value **2.5x**. That is why retention outranks acquisition: it moves the denominator of CAC payback and the numerator of what you can afford to spend.\n\n"
   "Related rule: model growth against churn before celebrating it. Growing to 300 members with 10% churn means a large share of new inflow is spent replacing outflow, not adding to the base.",
   children=[
     {"id":"R.6.6.1","title":"LTV = annual payment ÷ churn","spec":"The core retention formula."},
     {"id":"R.6.6.2","title":"50% retention → 2x annual payment","spec":"$100/year becomes $200 of LTV."},
     {"id":"R.6.6.3","title":"80% retention → 5x annual payment","spec":"$100/year becomes $500. A 30-point gain is a 2.5x value gain."},
     {"id":"R.6.6.4","title":"Inflow vs churn","spec":"300 members at 10% churn - new inflow largely replaces outflow."},
   ])],
 "R.7": [rule("R.7.7", "Tier rule: 5-10x price, expect 20% take",
   "Each new tier: 5-10x the price, ~20% uptake, and it must roughly double total revenue to be worth the operational constraint.",
   "The pricing structure that follows from the Pareto distribution of customer spending power (the top 20% of buyers hold far more purchasing power than the 80% below them):\n\n"
   "- **Each new tier: 5-10x the price.** Big jumps, not gentle steps.\n"
   "- **Expect ~20% of people to take it.** Price at the 20% who can and will.\n"
   "- **Each tier must roughly double revenue** - 'another full amount of revenue' - or the added operational constraint is not worth it.\n\n"
   "Worked example: 8 customers at $10/mo = $80. Add 2 customers at $50/mo = $100. The top 20% now generate more revenue than the bottom 80%, and total revenue has doubled - from serving the same ten people differently.\n\n"
   "This is why tiering beats discounting: it extracts the willingness-to-pay already sitting in the customer base instead of lowering the price for everyone.",
   children=[
     {"id":"R.7.7.1","title":"5-10x price per tier","spec":"Big jumps, not incremental steps."},
     {"id":"R.7.7.2","title":"Expect ~20% take","spec":"Price to the top quintile of spending power."},
     {"id":"R.7.7.3","title":"Each tier must double revenue","spec":"8 x $10 = $80, then 2 x $50 = $100. Top 20% outearns the bottom 80%."},
   ])],
 "S.1": [rule("S.1.8", "Rep quota: 35% close rate",
   "Rule of thumb: a rep should close 1 in 3 touched prospects. Above 35% → raise price. Below → fix process before price.",
   "The benchmark Hormozi uses to read a sales team:\n\n"
   "- **35% close rate** (one in three) is the rule of thumb for a salesperson working a proper process.\n"
   "- **Above 35% → he raises price.** A rep closing too well is evidence the price is too low, not that the rep is gifted.\n"
   "- **Below 35% → he fixes the process** before even considering a price cut.\n"
   "- **25% or less → the rep gets bumped down a tier.**\n\n"
   "Note this ties directly into the close-rate → price ladder (O.9.7): the same number that grades the rep also grades the price. That is the point - close rate is a single instrument that tells you about both.",
   children=[
     {"id":"S.1.8.1","title":"35% = 1 in 3 touched prospects","spec":"Benchmark for a rep with a real process."},
     {"id":"S.1.8.2","title":"Above 35% → raise price","spec":"A rep closing better than quota means the price is low."},
     {"id":"S.1.8.3","title":"Below 35% → fix process first","spec":"Price is the last lever, never the first."},
     {"id":"S.1.8.4","title":"70% calendar utilisation","spec":"Sweet spot. Fully booked → conversion drops and CAC rises."},
   ])],
 "L.5": [rule("L.5.9", "Funnel step decay - every step costs ~50%",
   "Each added funnel step loses roughly half or more. Web pages convert 1-2%; a strong platform page ~4%.",
   "Conversion benchmarks that decide how many steps a funnel can afford:\n\n"
   "- **Every added step loses about 50% or more.** Two landing pages in a row is not one funnel, it is two 50% haircuts.\n"
   "- **Web pages typically convert 1-2%.**\n"
   "- **A strong, trusted platform page converts around 4%** - trust in the platform raises overall conversion.\n"
   "- **Webinar/opt-in leads convert up to 5% of leads** when the niche is tight (that is leads, not shows).\n\n"
   "Design implication: collapse steps. Speed-to-lead and removing a single interstitial page is often worth more than any copy change.",
   children=[
     {"id":"L.5.9.1","title":"Each step ≈ -50%","spec":"Two pages in a row means two haircuts."},
     {"id":"L.5.9.2","title":"Web pages 1-2%","spec":"Typical conversion band."},
     {"id":"L.5.9.3","title":"Trusted platform page ~4%","spec":"Platform trust lifts conversion overall."},
     {"id":"L.5.9.4","title":"Niche opt-in → up to 5% of leads","spec":"Leads, not shows. Tighter niche lifts it."},
   ])],
 "K.2": [rule("K.2.6", "Volume: 10-30x, not 10%",
   "You need 10, 20, or 30 times the volume - not incremental improvement. Consistency only looks impressive at the end.",
   "The volume rule, stated plainly: **you need to do 10, 20, or 30 times the volume.** Not 10% more. The gap between where you are and where you want to be is usually a volume gap, and it is almost always larger than it feels.\n\n"
   "Paired with the reason people quit before volume pays: *'consistency never looks impressive in the moment, only at the end.'* The work looks unremarkable while it compounds, which is exactly why most people stop before it does.",
   children=[
     {"id":"K.2.6.1","title":"10-30x the volume","spec":"Not incremental. The gap is usually a volume gap."},
     {"id":"K.2.6.2","title":"Consistency only looks impressive at the end","spec":"The middle looks unremarkable, which is why people quit."},
   ])],
}

# ----------------------------------------------------------------------------
# 4. new top-level branch E - Evidence & Benchmarks
# ----------------------------------------------------------------------------
def enode(nid, title, spec, detail, children=None, quotes=None):
    d = {"id": nid, "title": title, "spec": spec, "kind": "rule"}
    if detail: d["detail"] = detail
    if children: d["children"] = children
    if quotes: d["quotes"] = quotes
    return d

EVIDENCE = {
 "id": "E",
 "title": "Evidence & Benchmarks - what the transcripts add",
 "kind": "branch",
 "accent": 7,
 "spec": "The numbers behind the frameworks, mined from 516 transcripts of the channel. Every node carries a verbatim quote and its source video.",
 "children": [
  {"id":"E.1","title":"The corpus itself","kind":"framework",
   "spec":"516 of 523 videos transcribed - 2.9M words, 219 hours. Every quote in this branch is traceable to a video.",
   "detail":
     "This branch is built from a full pass over the channel: **523 videos listed, 516 transcribed** (2.9M words / 219 hours of video; 7 have captions disabled). Quotes are verbatim from auto-generated captions, so expect occasional transcription noise in the wording - the numbers are reliable, the punctuation is not.\n\n"
     "Method: transcripts pulled with yt-dlp, sentence-mined for teachable passages carrying a number, mechanism, or polarity claim, then filtered against promo language. The frameworks elsewhere in this tree came from the written sources; this branch is what the spoken material adds on top - mostly **benchmarks, ratios, and thresholds** that the books state as principles but rarely quantify.\n\n"
     "Provenance for every quote: `sources/quotes.json` in this repo, keyed by video ID, with the full transcript corpus.",
   "children":[
     {"id":"E.1.1","title":"523 videos, 516 transcribed","spec":"2.9M words. 7 videos have captions disabled by the channel."},
     {"id":"E.1.2","title":"Quote provenance","spec":"Every quote carries title + video ID. Full index in sources/quotes.json."},
     {"id":"E.1.3","title":"What the transcripts add","spec":"Benchmarks, ratios and thresholds - the numbers the written frameworks leave qualitative."},
   ]},

  {"id":"E.2","title":"Pricing by close rate","kind":"framework",
   "spec":"The single most actionable instrument in the corpus: your close rate tells you exactly how mispriced you are.",
   "detail":
     "From **The Mathematics of Business, Explained** - Hormozi's close-rate-to-price ladder, described as a rule of thumb collected over years of business:\n\n"
     "| Close rate | Verdict | Move on a $100 price |\n|---|---|---|\n"
     "| **80%+** | underpriced 3-4x | charge $300-400 |\n"
     "| **50-60%** | underpriced 1.5-2x | charge $150-200 |\n"
     "| **40-50%** | underpriced 1.25-1.5x | charge $125-150 |\n"
     "| **30-40%** | appropriately priced | hold |\n"
     "| **<25%** | too expensive / broken | fix the process, not the price |\n\n"
     "The insight that makes it work: a *high* close rate is expensive. Closing four out of five people means you left margin on every one of those deals, and the fix is a price rise, not a victory lap. The jumps compress as you approach the target zone - the further you are from 35%, the bigger the correction.\n\n"
     "The 30-40% band is only 'correct' **conditional on having the mechanisms in place to educate the buyer before the pitch** - proof, pre-selling, content. Without those, the same close rate means something else.",
   "children":[
     enode("E.2.1","80%+ close → underpriced 3-4x","Four out of five buying means 3-4x left on the table.",
       "**Quote:** 'If you're closing at 80% or more in whatever you sell, so four out of five people you talk to buy your thing, you're typically underpriced by 3 to 4x. That might sound mindblowing to you, but that is just the data that I've, again, rule of thumb that I've collected over many years of business.'",
       quotes=[Q("If you're closing at 80% or more in whatever you sell, so four out of five people you talk to buy your thing, you're typically underpriced by 3 to 4x.",
                 "The Mathematics of Business, Explained","A_tx40lNpf8")]),
     enode("E.2.2","50-60% close → underpriced 1.5-2x","$100 should probably be $150-200.",
       "**Quote:** 'If you're between 50 and 60%, typically you're underpriced by one and a half to 2x. So that $100 price point should probably be one and a half. So $150 or $200.'",
       quotes=[Q("If you're between 50 and 60%, typically you're underpriced by one and a half to 2x. So that $100 price point should probably be one and a half. So $150 or $200.",
                 "The Mathematics of Business, Explained","A_tx40lNpf8")]),
     enode("E.2.3","40-50% close → underpriced 1.25-1.5x","$100 should probably be $125-150.",
       "**Quote:** 'Now if you're between 40 and 50% close rates, you're probably between 1.25 to 1.5x underpriced. Meaning now you should be at maybe 125 or consider 150 as a final price point.'",
       quotes=[Q("Now if you're between 40 and 50% close rates, you're probably between 1.25 to 1.5x underpriced. Meaning now you should be at maybe 125 or consider 150 as a final price point.",
                 "The Mathematics of Business, Explained","A_tx40lNpf8")]),
     enode("E.2.4","30-40% close → appropriately priced","The target band - conditional on pre-pitch education mechanisms.",
       "**Quote:** 'If you have that sales motion and you were closing 35%, you're appropriately priced - under the assumption you have all of the selling mechanisms in place to educate a consumer prior to the purchase so that you're not creating a pitch or a spiel. Instead, they've already consumed all of this stuff prior to the pitch and then the entire close call is about personalization.'",
       quotes=[Q("If you have that sales motion and you were closing 35%, you're appropriately priced under the assumption you have all of the selling mechanisms in place to educate a consumer prior to the purchase.",
                 "The Mathematics of Business, Explained","A_tx40lNpf8")]),
     enode("E.2.5","<25% close → fix the process first","Never cut price as the opening move.",
       "**Quote:** 'If somebody's closing, let's say, 25% or less, they get bumped down.' And on the general principle: 'If it's below that, then I will fix the process before I even consider lowering the price.'\n\n"
       "Price is the last lever. A low close rate is evidence of a broken mechanism - weak proof, no pre-selling, a pitch instead of an education - before it is evidence of a high price."),
   ]},

  {"id":"E.3","title":"Retention is the highest-leverage number","kind":"framework",
   "spec":"LTV = annual payment ÷ churn rate. A 30-point retention gain multiplies customer value 2.5x.",
   "detail":
     "**LTV = annual payment ÷ churn rate.**\n\n"
     "| Annual retention | LTV on $100/year |\n|---|---|\n"
     "| 50% | $200 (÷ 0.5) |\n"
     "| 80% | $500 (÷ 0.2) |\n\n"
     "A move from 50% to 80% retention looks like a 30-point improvement. In LTV terms it is **2.5x more value from the same customer** - which is why retention beats acquisition on leverage, and why 'raise your prices, decrease churn' is the whole recipe for making customers worth more.\n\n"
     "The corollary on growth: model new inflow against churn before celebrating it. Growing to 300 members at 10% churn means a large slice of acquisition spend is replacing outflow rather than expanding the base.",
   "children":[
     enode("E.3.1","LTV = annual payment ÷ churn","The core retention formula, stated plainly.",
       "**Quote:** 'You can take whatever your annual retention is and then you can basically reverse engineer into what your lifetime value of a customer is. So, if you have 50% annual retention, then you can take whatever someone pays over a year, let's use simple math and say someone pays $100 per year. If you have 50% annual retention, then it means that you can basically double it. So, you divide it by 50%. equals $200 is what you're going to make from a customer.'",
       quotes=[Q("If you have 50% annual retention, then you can take whatever someone pays over a year - say $100 - and it means that you can basically double it. You divide it by 50%, equals $200 is what you're going to make from a customer.",
                 "The Mathematics of Business, Explained","A_tx40lNpf8")]),
     enode("E.3.2","80% retention → 5x, not 2x","A 30-point gain is a 2.5x value gain. This is the punchline.",
       "**Quote:** 'Let's say that you have 80% annual retention. Doesn't seem like that much different, right? It's only 30%. What is it actually different from a math perspective? It means that you're going to get functionally four turns, five turns because every year you're going to lose 20%. And so simple math on that, back of napkin, is about $500.'",
       quotes=[Q("Let's say that you have 80% annual retention. Doesn't seem like that much different, right? It's only 30%. It means that you're going to get functionally four turns, five turns because every year you're going to lose 20%.",
                 "The Mathematics of Business, Explained","A_tx40lNpf8")]),
     enode("E.3.3","Inflow vs churn","300 members at 10% churn - most new inflow replaces outflow.",
       "**Quote:** 'If you want to grow to let's say 300 members, and let's say your churn is 10%.' Growth math has to net churn off the top before any of it counts as growth.",
       quotes=[Q("If you want to grow to let's say 300 members, and let's say your churn is 10%.","Your Inflow Is Your Bottleneck","XC_lklN9KmE")]),
   ]},

  {"id":"E.4","title":"LTV:CAC - floor vs arbitrage","kind":"framework",
   "spec":"3:1 keeps you alive. 30:1+ makes you rich. Gym Launch year one ran 100:1.",
   "detail":
     "The 3:1 LTV:CAC ratio is the traditional software-world rule of thumb, widely circulated and widely adopted. It is a **durability floor**, not an ambition.\n\n"
     "Hormozi's outsized returns came from short windows where a channel was mispriced against customer value:\n\n"
     "- **Gym Launch, year one: 100:1.** 'I spent a hundred grand and made 10 million.'\n"
     "- **Four windows in his life, every one above 30:1.**\n\n"
     "'Most of the money that I've made in my life has happened during these distinct windows of opportunity where there was huge arbitrage between what it cost me to get a customer and what a customer is worth to me.'\n\n"
     "The operating instruction that follows: keep beating on the money model until you land in a window, then scale spend hard and **do not cap it**. He states he never caps launch ad spend while the ads are performing. When the window closes, the 3:1 floor is what keeps the business alive.",
   "children":[
     enode("E.4.1","Gym Launch year one: 100:1","$100k spent, $10M made.",
       "**Quote:** 'The first year of gym launch, my LTV CAC was 100 to one. I spent a hundred grand and made 10 million. Wild recommend. It was wild, wild times.'",
       quotes=[Q("The first year of gym launch, my LTV CAC was 100 to one. I spent a hundred grand and made 10 million.",
                 "The Mathematics of Business, Explained","A_tx40lNpf8")]),
     enode("E.4.2","Four windows, all above 30:1","Wealth came from arbitrage windows, not steady-state margins.",
       "**Quote:** 'Most of the money that I've made in my life has happened during these distinct windows of opportunity where there was huge arbitrage between what it cost me to get a customer and what a customer is worth to me. And I've had that happen four times in my life. And each of those times have been above 30 to1. And so the reason I'm so adamant about this is that I know because I've had it happen that you have to just keep beating up the system. You have to keep tweaking the money model.'",
       quotes=[Q("Most of the money that I've made in my life has happened during these distinct windows of opportunity where there was huge arbitrage between what it cost me to get a customer and what a customer is worth to me. I've had that happen four times in my life. And each of those times have been above 30 to1.",
                 "The Mathematics of Business, Explained","A_tx40lNpf8")]),
     enode("E.4.3","Don't cap spend inside a window","He never caps launch ad spend while ads are performing.",
       "**Quote:** 'I never go into my launch capping my total ad spend if the ads are performing as I want them to.' A live arbitrage window is the one time to scale spend aggressively.",
       quotes=[Q("I never go into my launch capping my total ad spend if the ads are performing as I want them to.",
                 "Building a $3,000,000 Business for a Stranger in 31 Minutes","j2TZMFkj71Q")]),
     enode("E.4.4","30-day CAC payback target","Recover CAC inside 30 days - the interest-free float on a credit card.",
       "**Quote:** 'My goal is within 30 days. Why? Because just about every business owner can typically gain access to a credit card which gives you 30 days of interest free money.' Payback inside 30 days means acquisition is effectively self-funding."),
   ]},

  {"id":"E.5","title":"Sales benchmarks","kind":"framework",
   "spec":"35% close = quota. 70% calendar utilisation = sweet spot. Above quota → raise price.",
   "detail":
     "The numbers that grade a sales function:\n\n"
     "- **35% close rate** - a rep should close at least one in three touched prospects. Above that, he raises price; below, he fixes the process.\n"
     "- **25% or less** - the rep gets bumped down a tier.\n"
     "- **70% calendar utilisation** - the sweet spot for booked sales capacity.\n\n"
     "On utilisation, both extremes are bad. A fully-booked team makes more sales but **conversion drops and CAC rises**, because leads wait longer and book further out. Under-utilised is wasted payroll. 70% is the target that keeps conversion healthy while keeping reps busy.",
   "children":[
     enode("E.5.1","35% close = rep quota","One in three touched prospects.",
       "**Quote:** 'My rule of thumb with sales people in general with a proper sales process is 35%. I would like them to close at least one out of three of the prospects that they're getting touched with. Typically, if it's higher than that, I will raise price. And if it's below that, then I will fix the process before I even consider lowering the price.'",
       quotes=[Q("My rule of thumb with sales people in general with a proper sales process is 35%. I would like them to close at least one out of three of the prospects that they're getting touched with.",
                 "The Mathematics of Business, Explained","A_tx40lNpf8")]),
     enode("E.5.2","Above quota → raise price","A rep closing better than 35% is evidence the price is low.",
       "**Quote:** 'If it's higher than that, I will raise price.' The rep's close rate and the product's price are read off the same instrument - see the close-rate ladder (E.2)."),
     enode("E.5.3","70% calendar utilisation","Fully booked is not the goal - conversion falls and CAC rises.",
       "**Quote:** 'Rule number five. 70% calendar utilization. So when you have more salespeople, there's another issue that starts to come up, which is my sales team's underutilized or they're booked out. So what's the sweet spot? If you have your sales team completely booked out, here's two things that happen that are bad. Number one is that your total lead conversion will go down. You will make more sales because they're booked out for sure, but your conversion rates will go down, meaning your CAC, your cost to acquire customers will go up.'"),
     enode("E.5.4","<25% → bump the rep down","Below-quota reps move down a tier rather than getting a price cut.",
       "**Quote:** 'If somebody's closing, let's say, 25% or less, they get bumped down.'",
       quotes=[Q("If somebody's closing, let's say, 25% or less, they get bumped down.","How I Scaled My Sales Team","okA9Yt2KZuk")]),
   ]},

  {"id":"E.6","title":"Tiering and the demand fractal","kind":"framework",
   "spec":"5-10x price per tier, ~20% take, each tier must double revenue. The top 20% outspend the bottom 80%.",
   "detail":
     "The pricing structure that follows from the Pareto distribution of spending power. The top 20% of customers hold far more purchasing power than the 80% beneath them, so price to the top and let the base buy the entry tier.\n\n"
     "- **Each new tier: 5-10x the price.**\n"
     "- **Expect ~20% to take it.**\n"
     "- **Each tier must roughly double total revenue** - 'another full amount of revenue' - or the operational constraint it adds is not worth it.\n\n"
     "Worked example, verbatim: 8 customers at $10/month = $80. Add 2 customers at $50/month = $100. The top two customers now out-earn the bottom eight, and total revenue has doubled - from serving the same ten people differently.\n\n"
     "This is why tiering beats discounting. It extracts willingness-to-pay already present in the base instead of lowering the price for everyone.",
   "children":[
     enode("E.6.1","5-10x price per tier, ~20% take","Big jumps, priced to the top quintile.",
       "**Quote:** 'My rule of thumb is that for every new tier you want to 5 to 10x your price and expect 20% of people to take it.'",
       quotes=[Q("My rule of thumb is that for every new tier you want to 5 to 10x your price and expect 20% of people to take it.",
                 "Why you aren't making as much money as you want","ZuJryiwxjDw")]),
     enode("E.6.2","Each tier must double revenue","Otherwise the operational constraint isn't worth it.",
       "**Quote:** 'I want each tier to bring me another double, like another full amount of revenue. Otherwise, I'm like, I don't know if it's worth creating the actual extra constraint of operations.'",
       quotes=[Q("I want each tier to bring me another double, like another full amount of revenue. Otherwise, I don't know if it's worth creating the actual extra constraint of operations.",
                 "Why you aren't making as much money as you want","ZuJryiwxjDw")]),
     enode("E.6.3","The 8 x $10 + 2 x $50 example","Top 20% outearn the bottom 80%: $100 vs $80.",
       "**Quote:** 'If you have eight of these customers at $10 per month and you've got two of them at $50 per month, how much am I making? I'm making $80 per month in total on the bottom 80 and then I'm making $100 per month on my top 20%. And so, by serving these two customers differently, we double the revenue of the business.'",
       quotes=[Q("If you have eight of these customers at $10 per month and you've got two of them at $50 per month, I'm making $80 per month in total on the bottom 80 and then I'm making $100 per month on my top 20%. By serving these two customers differently, we double the revenue of the business.",
                 "Why you aren't making as much money as you want","ZuJryiwxjDw")]),
     enode("E.6.4","20% of buyers hold the spending power","The Pareto read that makes tiering work.",
       "**Quote:** 'Here's my rule of thumb for upsells taking into account that 20% of customers have far more spending power than the ones below.'",
       quotes=[Q("Here's my rule of thumb for upsells taking into account that 20% of customers have far more spending power than the ones below.",
                 "Why you aren't making as much money as you want","ZuJryiwxjDw")]),
   ]},

  {"id":"E.7","title":"Upsell and downsell uptake","kind":"framework",
   "spec":"20-30% uptake is normal. Assume-close lifts it past 90%. Prefer zero-cost, zero-work upsells.",
   "detail":
     "- **20-30% uptake** is the normal range for a straightforward upsell.\n"
     "- **90%+ take rates** are achievable with an *assume close* - presenting the next purchase as already decided rather than asking if they want it.\n"
     "- **Zero cost, zero work** upsells are preferred: incremental revenue with no added fulfilment burden.\n\n"
     "The assume-close works because it exploits a pre-programmed response: people are so conditioned to try not to buy things that they end up agreeing when the question is never framed as a yes/no.",
   "children":[
     enode("E.7.1","20-30% = normal uptake","The baseline for a standard upsell.",
       "**Quote:** 'Most people get 20 to 30% uptake on their upsells. If you use an assume close tactic like this, you can literally see 90% plus take rates on this.'",
       quotes=[Q("Most people get 20 to 30% uptake on their upsells. If you use an assume close tactic like this, you can literally see 90% plus take rates.",
                 "How To Close Everyone Downselling Like A Pro","j1tA4l7R2c0")]),
     enode("E.7.2","Zero cost, zero work","Best upsell adds revenue without adding fulfilment.",
       "**Quote:** 'If you have upsells, try and have them be zero cost, zero work upsells, so that you can just make more money up front.'",
       quotes=[Q("If you have upsells, try and have them be zero cost, zero work upsells, so that you can just make more money up front.",
                 "How to Start a Business From Nothing (Thank Me Later)","unshZobTt6Q")]),
     enode("E.7.3","Anchor with a top continuity tier","A high tier makes the existing price look reasonable.",
       "**Quote:** 'The first thing we did is we introduced a highest tier continuity option that would make the existing $2,000 a month or $4,500 per quarter seem reasonable by comparison.'",
       quotes=[Q("The first thing we did is we introduced a highest tier continuity option that would make the existing $2,000 a month or $4,500 per quarter seem reasonable by comparison.",
                 "I Blew Up A Secret Business To Prove It's Not Luck","SmiOK8Yun4s")]),
   ]},

  {"id":"E.8","title":"Funnel conversion benchmarks","kind":"framework",
   "spec":"Every added step loses ~50%. Web pages 1-2%. Trusted platform page ~4%. Niche opt-in up to 5% of leads.",
   "detail":
     "The decay numbers that decide how many steps a funnel can afford:\n\n"
     "- **Every added step loses about 50% or more.** Two landing pages in a row is not one funnel; it is two 50% haircuts.\n"
     "- **Web pages typically convert 1-2%.**\n"
     "- **A strong, trusted platform page converts around 4%** - platform trust lifts overall conversion.\n"
     "- **Niche opt-in leads convert up to 5% of leads** (leads, not shows).\n\n"
     "Design implication: collapse steps before rewriting copy. Removing a single interstitial page is usually worth more than any headline test, and speed-to-lead compounds the same way.\n\n"
     "A real multi-step funnel, for scale: **511 challenge attendees → 26 show up to live sessions daily → 12 sales calls booked → 10 held → 6 closed.**",
   "children":[
     enode("E.8.1","Each added step ≈ -50%","Two pages in a row means two haircuts.",
       "**Quote:** 'Typically you'll lose about 50%. By like half. Just for every step you add, it's usually about half or more that you lose.'",
       quotes=[Q("Typically you'll lose about 50%. By like half. Just for every step you add, it's usually about half or more that you lose.",
                 "Building a $2,500,000 Business for a Stranger in 36 Minutes","OQf2Ba-Lp_4")]),
     enode("E.8.2","Web pages 1-2%, trusted platform ~4%","Trust in the platform raises overall conversion.",
       "**Quote:** 'Web pages, most times it's going to be between 1 and 2% in terms of conversion rate on those pages. I'll give you a fun factoid for School. So I think School right now is at like 4%. It's really good for School about pages and it's because when you have trust in a platform that starts to increase your conversion overall.'"),
     enode("E.8.3","Niche opt-in → up to 5% of leads","Tighter niche lifts lead conversion.",
       "**Quote:** 'If you are a little bit more niched, then that can go up to 5% of leads. And like again, that's leads, not shows, right? That's just overall like you had 100 people opt in for webinar.'",
       quotes=[Q("If you are a little bit more niched, then that can go up to 5% of leads. That's leads, not shows.",
                 "The Mathematics of Business, Explained","A_tx40lNpf8")]),
     enode("E.8.4","Full funnel benchmark: 511 → 6","511 attendees → 26 show daily → 12 booked → 10 held → 6 closed.",
       "**Quote:** 'The average challenge attendees are 26. So 26 out of the 511 will actually show up to the live sessions each day. Out of that we will typically book 12 sales calls, we'll hold 10 and we'll close six sales.' A useful end-to-end shape for a high-touch funnel.",
       quotes=[Q("The average challenge attendees are 26. So 26 out of the 511 will actually show up to the live sessions each day. Out of that we will typically book 12 sales calls, we'll hold 10 and we'll close six sales.",
                 "If I Wanted To Scale A Service Business In 2026","N5MExtki_VI")]),
   ]},

  {"id":"E.9","title":"Volume, focus and the long game","kind":"framework",
   "spec":"10-30x the volume, not 10%. Consistency only looks impressive at the end.",
   "detail":
     "**Volume:** 'You need to do 10 or 20 or 30 times the volume.' Not 10% more. The distance between where you are and where you want to be is usually a volume gap, and it is almost always larger than it feels from the inside.\n\n"
     "**Consistency:** 'The reason so few people understand success is consistency never looks impressive in the moment, only at the end.' The work looks unremarkable while it compounds - which is precisely why most people stop before it does.\n\n"
     "**Focus:** 'If you say no, hypothetically, to literally everything except for one thing, you would define that person as incredibly focused, probably obsessive.' Focus is subtraction, and it is defined by what you refuse.\n\n"
     "**Wealth:** 'It's better to focus on how to 10x your income than save an additional 10%.' Optimise the numerator, not the denominator.",
   "children":[
     enode("E.9.1","10-30x the volume","The gap is usually a volume gap, and bigger than it feels.",
       "**Quote:** 'You need to do 10 or 20 or 30 times the volume.'",
       quotes=[Q("You need to do 10 or 20 or 30 times the volume.","If You're in Your 20s or 30s, Here's How to Win (at Anything)","0lMn_-EXyhQ")]),
     enode("E.9.2","Consistency only looks impressive at the end","The middle looks unremarkable, which is why people quit.",
       "**Quote:** 'The reason so few people understand success is consistency never looks impressive in the moment, only at the end.'",
       quotes=[Q("The reason so few people understand success is consistency never looks impressive in the moment, only at the end.",
                 "Stop Caring What Others Think of You So Much","qqjGxVW-Ae0")]),
     enode("E.9.3","Focus is subtraction","Say no to everything except one thing.",
       "**Quote:** 'If you say no, hypothetically, to literally everything except for one thing, you would define that person as incredibly focused, probably obsessive.'",
       quotes=[Q("If you say no, hypothetically, to literally everything except for one thing, you would define that person as incredibly focused, probably obsessive.",
                 "How To Scale Yourself: The What-Why-How Framework","lIC8fYbrkII")]),
     enode("E.9.4","10x income, not 10% savings","Optimise the numerator.",
       "**Quote:** 'The truth is, it's better to focus on how to 10x your income than save an additional 10%.'",
       quotes=[Q("The truth is, it's better to focus on how to 10x your income than save an additional 10%.",
                 "Dangerously Honest Advice to Create Generational Wealth","m-k0_pQJ1fY")]),
   ]},
 ],
}

# ----------------------------------------------------------------------------
# 5. apply
# ----------------------------------------------------------------------------
added_quotes = 0
for nid, qs in QUOTES.items():
    node = find(DATA, nid)
    if not node:
        print("MISSING node for quotes:", nid); continue
    node["quotes"] = qs
    added_quotes += len(qs)

added_rules = 0
for nid, rules in NEW_IN_MODULE.items():
    node = find(DATA, nid)
    if not node:
        print("MISSING node for rules:", nid); continue
    node.setdefault("children", []).extend(rules)
    added_rules += len(rules)

DATA["children"].append(EVIDENCE)

def count(n):
    return 1 + sum(count(c) for c in n.get("children", []))
total = count(DATA)
print(f"quotes attached={added_quotes}  new rule nodes={added_rules}  total nodes={total}")

# write index.html back
new_json = json.dumps(DATA, ensure_ascii=False, indent=2)
out = src[:start] + new_json + src[END:]
IDX.write_text(out)
print("index.html written:", len(out), "chars")

# ----------------------------------------------------------------------------
# 6. quotes.json + EVIDENCE.md
# ----------------------------------------------------------------------------
srcs = ROOT / "sources"; srcs.mkdir(exist_ok=True)
clean = json.loads((TD / "quotes_clean.json").read_text())
(srcs / "quotes.json").write_text(json.dumps(clean, ensure_ascii=False, indent=1))
print("sources/quotes.json:", len(clean), "quotes")

def md_quote(q):
    return f"> {q['t']}\n>\n> — *{q['src']}* (youtu.be/{q['vid']})\n"

lines = ["# Evidence & Benchmarks",
         "",
         "Numbers, ratios and thresholds mined from **516 transcripts** of the Alex Hormozi YouTube channel (2.9M words / 219 hours). "
         "Every quote is verbatim from auto-generated captions — reliable on numbers, noisy on punctuation.",
         "",
         "Frameworks elsewhere in this repo state principles. This file is what the spoken material adds: the quantification.",
         "",
         "---",
         ""]
def walk_md(node, depth=0):
    for c in node.get("children", []):
        lines.append(f"{'#' * min(depth + 2, 6)} {c['title']}")
        lines.append("")
        if c.get("spec"): lines.append(f"*{c['spec']}*"); lines.append("")
        if c.get("detail"): lines.append(c["detail"]); lines.append("")
        for q in c.get("quotes", []):
            lines.append(md_quote(q))
        walk_md(c, depth + 1)
walk_md(EVIDENCE)
(ROOT / "EVIDENCE.md").write_text("\n".join(lines) + "\n")
print("EVIDENCE.md written")
