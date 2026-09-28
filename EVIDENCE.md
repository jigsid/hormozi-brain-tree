# Evidence & Benchmarks

Numbers, ratios and thresholds mined from **516 transcripts** of the Alex Hormozi YouTube channel (2.9M words / 219 hours). Every quote is verbatim from auto-generated captions — reliable on numbers, noisy on punctuation.

Frameworks elsewhere in this repo state principles. This file is what the spoken material adds: the quantification.

---

## The corpus itself

*516 of 523 videos transcribed - 2.9M words, 219 hours. Every quote in this branch is traceable to a video.*

This branch is built from a full pass over the channel: **523 videos listed, 516 transcribed** (2.9M words / 219 hours of video; 7 have captions disabled). Quotes are verbatim from auto-generated captions, so expect occasional transcription noise in the wording - the numbers are reliable, the punctuation is not.

Method: transcripts pulled with yt-dlp, sentence-mined for teachable passages carrying a number, mechanism, or polarity claim, then filtered against promo language. The frameworks elsewhere in this tree came from the written sources; this branch is what the spoken material adds on top - mostly **benchmarks, ratios, and thresholds** that the books state as principles but rarely quantify.

Provenance for every quote: `sources/quotes.json` in this repo, keyed by video ID, with the full transcript corpus.

### 523 videos, 516 transcribed

*2.9M words. 7 videos have captions disabled by the channel.*

### Quote provenance

*Every quote carries title + video ID. Full index in sources/quotes.json.*

### What the transcripts add

*Benchmarks, ratios and thresholds - the numbers the written frameworks leave qualitative.*

## Pricing by close rate

*The single most actionable instrument in the corpus: your close rate tells you exactly how mispriced you are.*

From **The Mathematics of Business, Explained** - Hormozi's close-rate-to-price ladder, described as a rule of thumb collected over years of business:

| Close rate | Verdict | Move on a $100 price |
|---|---|---|
| **80%+** | underpriced 3-4x | charge $300-400 |
| **50-60%** | underpriced 1.5-2x | charge $150-200 |
| **40-50%** | underpriced 1.25-1.5x | charge $125-150 |
| **30-40%** | appropriately priced | hold |
| **<25%** | too expensive / broken | fix the process, not the price |

The insight that makes it work: a *high* close rate is expensive. Closing four out of five people means you left margin on every one of those deals, and the fix is a price rise, not a victory lap. The jumps compress as you approach the target zone - the further you are from 35%, the bigger the correction.

The 30-40% band is only 'correct' **conditional on having the mechanisms in place to educate the buyer before the pitch** - proof, pre-selling, content. Without those, the same close rate means something else.

### 80%+ close → underpriced 3-4x

*Four out of five buying means 3-4x left on the table.*

**Quote:** 'If you're closing at 80% or more in whatever you sell, so four out of five people you talk to buy your thing, you're typically underpriced by 3 to 4x. That might sound mindblowing to you, but that is just the data that I've, again, rule of thumb that I've collected over many years of business.'

> If you're closing at 80% or more in whatever you sell, so four out of five people you talk to buy your thing, you're typically underpriced by 3 to 4x.
>
> — *The Mathematics of Business, Explained* (youtu.be/A_tx40lNpf8)

### 50-60% close → underpriced 1.5-2x

*$100 should probably be $150-200.*

**Quote:** 'If you're between 50 and 60%, typically you're underpriced by one and a half to 2x. So that $100 price point should probably be one and a half. So $150 or $200.'

> If you're between 50 and 60%, typically you're underpriced by one and a half to 2x. So that $100 price point should probably be one and a half. So $150 or $200.
>
> — *The Mathematics of Business, Explained* (youtu.be/A_tx40lNpf8)

### 40-50% close → underpriced 1.25-1.5x

*$100 should probably be $125-150.*

**Quote:** 'Now if you're between 40 and 50% close rates, you're probably between 1.25 to 1.5x underpriced. Meaning now you should be at maybe 125 or consider 150 as a final price point.'

> Now if you're between 40 and 50% close rates, you're probably between 1.25 to 1.5x underpriced. Meaning now you should be at maybe 125 or consider 150 as a final price point.
>
> — *The Mathematics of Business, Explained* (youtu.be/A_tx40lNpf8)

### 30-40% close → appropriately priced

*The target band - conditional on pre-pitch education mechanisms.*

**Quote:** 'If you have that sales motion and you were closing 35%, you're appropriately priced - under the assumption you have all of the selling mechanisms in place to educate a consumer prior to the purchase so that you're not creating a pitch or a spiel. Instead, they've already consumed all of this stuff prior to the pitch and then the entire close call is about personalization.'

> If you have that sales motion and you were closing 35%, you're appropriately priced under the assumption you have all of the selling mechanisms in place to educate a consumer prior to the purchase.
>
> — *The Mathematics of Business, Explained* (youtu.be/A_tx40lNpf8)

### <25% close → fix the process first

*Never cut price as the opening move.*

**Quote:** 'If somebody's closing, let's say, 25% or less, they get bumped down.' And on the general principle: 'If it's below that, then I will fix the process before I even consider lowering the price.'

Price is the last lever. A low close rate is evidence of a broken mechanism - weak proof, no pre-selling, a pitch instead of an education - before it is evidence of a high price.

## Retention is the highest-leverage number

*LTV = annual payment ÷ churn rate. A 30-point retention gain multiplies customer value 2.5x.*

**LTV = annual payment ÷ churn rate.**

| Annual retention | LTV on $100/year |
|---|---|
| 50% | $200 (÷ 0.5) |
| 80% | $500 (÷ 0.2) |

A move from 50% to 80% retention looks like a 30-point improvement. In LTV terms it is **2.5x more value from the same customer** - which is why retention beats acquisition on leverage, and why 'raise your prices, decrease churn' is the whole recipe for making customers worth more.

The corollary on growth: model new inflow against churn before celebrating it. Growing to 300 members at 10% churn means a large slice of acquisition spend is replacing outflow rather than expanding the base.

### LTV = annual payment ÷ churn

*The core retention formula, stated plainly.*

**Quote:** 'You can take whatever your annual retention is and then you can basically reverse engineer into what your lifetime value of a customer is. So, if you have 50% annual retention, then you can take whatever someone pays over a year, let's use simple math and say someone pays $100 per year. If you have 50% annual retention, then it means that you can basically double it. So, you divide it by 50%. equals $200 is what you're going to make from a customer.'

> If you have 50% annual retention, then you can take whatever someone pays over a year - say $100 - and it means that you can basically double it. You divide it by 50%, equals $200 is what you're going to make from a customer.
>
> — *The Mathematics of Business, Explained* (youtu.be/A_tx40lNpf8)

### 80% retention → 5x, not 2x

*A 30-point gain is a 2.5x value gain. This is the punchline.*

**Quote:** 'Let's say that you have 80% annual retention. Doesn't seem like that much different, right? It's only 30%. What is it actually different from a math perspective? It means that you're going to get functionally four turns, five turns because every year you're going to lose 20%. And so simple math on that, back of napkin, is about $500.'

> Let's say that you have 80% annual retention. Doesn't seem like that much different, right? It's only 30%. It means that you're going to get functionally four turns, five turns because every year you're going to lose 20%.
>
> — *The Mathematics of Business, Explained* (youtu.be/A_tx40lNpf8)

### Inflow vs churn

*300 members at 10% churn - most new inflow replaces outflow.*

**Quote:** 'If you want to grow to let's say 300 members, and let's say your churn is 10%.' Growth math has to net churn off the top before any of it counts as growth.

> If you want to grow to let's say 300 members, and let's say your churn is 10%.
>
> — *Your Inflow Is Your Bottleneck* (youtu.be/XC_lklN9KmE)

## LTV:CAC - floor vs arbitrage

*3:1 keeps you alive. 30:1+ makes you rich. Gym Launch year one ran 100:1.*

The 3:1 LTV:CAC ratio is the traditional software-world rule of thumb, widely circulated and widely adopted. It is a **durability floor**, not an ambition.

Hormozi's outsized returns came from short windows where a channel was mispriced against customer value:

- **Gym Launch, year one: 100:1.** 'I spent a hundred grand and made 10 million.'
- **Four windows in his life, every one above 30:1.**

'Most of the money that I've made in my life has happened during these distinct windows of opportunity where there was huge arbitrage between what it cost me to get a customer and what a customer is worth to me.'

The operating instruction that follows: keep beating on the money model until you land in a window, then scale spend hard and **do not cap it**. He states he never caps launch ad spend while the ads are performing. When the window closes, the 3:1 floor is what keeps the business alive.

### Gym Launch year one: 100:1

*$100k spent, $10M made.*

**Quote:** 'The first year of gym launch, my LTV CAC was 100 to one. I spent a hundred grand and made 10 million. Wild recommend. It was wild, wild times.'

> The first year of gym launch, my LTV CAC was 100 to one. I spent a hundred grand and made 10 million.
>
> — *The Mathematics of Business, Explained* (youtu.be/A_tx40lNpf8)

### Four windows, all above 30:1

*Wealth came from arbitrage windows, not steady-state margins.*

**Quote:** 'Most of the money that I've made in my life has happened during these distinct windows of opportunity where there was huge arbitrage between what it cost me to get a customer and what a customer is worth to me. And I've had that happen four times in my life. And each of those times have been above 30 to1. And so the reason I'm so adamant about this is that I know because I've had it happen that you have to just keep beating up the system. You have to keep tweaking the money model.'

> Most of the money that I've made in my life has happened during these distinct windows of opportunity where there was huge arbitrage between what it cost me to get a customer and what a customer is worth to me. I've had that happen four times in my life. And each of those times have been above 30 to1.
>
> — *The Mathematics of Business, Explained* (youtu.be/A_tx40lNpf8)

### Don't cap spend inside a window

*He never caps launch ad spend while ads are performing.*

**Quote:** 'I never go into my launch capping my total ad spend if the ads are performing as I want them to.' A live arbitrage window is the one time to scale spend aggressively.

> I never go into my launch capping my total ad spend if the ads are performing as I want them to.
>
> — *Building a $3,000,000 Business for a Stranger in 31 Minutes* (youtu.be/j2TZMFkj71Q)

### 30-day CAC payback target

*Recover CAC inside 30 days - the interest-free float on a credit card.*

**Quote:** 'My goal is within 30 days. Why? Because just about every business owner can typically gain access to a credit card which gives you 30 days of interest free money.' Payback inside 30 days means acquisition is effectively self-funding.

## Sales benchmarks

*35% close = quota. 70% calendar utilisation = sweet spot. Above quota → raise price.*

The numbers that grade a sales function:

- **35% close rate** - a rep should close at least one in three touched prospects. Above that, he raises price; below, he fixes the process.
- **25% or less** - the rep gets bumped down a tier.
- **70% calendar utilisation** - the sweet spot for booked sales capacity.

On utilisation, both extremes are bad. A fully-booked team makes more sales but **conversion drops and CAC rises**, because leads wait longer and book further out. Under-utilised is wasted payroll. 70% is the target that keeps conversion healthy while keeping reps busy.

### 35% close = rep quota

*One in three touched prospects.*

**Quote:** 'My rule of thumb with sales people in general with a proper sales process is 35%. I would like them to close at least one out of three of the prospects that they're getting touched with. Typically, if it's higher than that, I will raise price. And if it's below that, then I will fix the process before I even consider lowering the price.'

> My rule of thumb with sales people in general with a proper sales process is 35%. I would like them to close at least one out of three of the prospects that they're getting touched with.
>
> — *The Mathematics of Business, Explained* (youtu.be/A_tx40lNpf8)

### Above quota → raise price

*A rep closing better than 35% is evidence the price is low.*

**Quote:** 'If it's higher than that, I will raise price.' The rep's close rate and the product's price are read off the same instrument - see the close-rate ladder (E.2).

### 70% calendar utilisation

*Fully booked is not the goal - conversion falls and CAC rises.*

**Quote:** 'Rule number five. 70% calendar utilization. So when you have more salespeople, there's another issue that starts to come up, which is my sales team's underutilized or they're booked out. So what's the sweet spot? If you have your sales team completely booked out, here's two things that happen that are bad. Number one is that your total lead conversion will go down. You will make more sales because they're booked out for sure, but your conversion rates will go down, meaning your CAC, your cost to acquire customers will go up.'

### <25% → bump the rep down

*Below-quota reps move down a tier rather than getting a price cut.*

**Quote:** 'If somebody's closing, let's say, 25% or less, they get bumped down.'

> If somebody's closing, let's say, 25% or less, they get bumped down.
>
> — *How I Scaled My Sales Team* (youtu.be/okA9Yt2KZuk)

## Tiering and the demand fractal

*5-10x price per tier, ~20% take, each tier must double revenue. The top 20% outspend the bottom 80%.*

The pricing structure that follows from the Pareto distribution of spending power. The top 20% of customers hold far more purchasing power than the 80% beneath them, so price to the top and let the base buy the entry tier.

- **Each new tier: 5-10x the price.**
- **Expect ~20% to take it.**
- **Each tier must roughly double total revenue** - 'another full amount of revenue' - or the operational constraint it adds is not worth it.

Worked example, verbatim: 8 customers at $10/month = $80. Add 2 customers at $50/month = $100. The top two customers now out-earn the bottom eight, and total revenue has doubled - from serving the same ten people differently.

This is why tiering beats discounting. It extracts willingness-to-pay already present in the base instead of lowering the price for everyone.

### 5-10x price per tier, ~20% take

*Big jumps, priced to the top quintile.*

**Quote:** 'My rule of thumb is that for every new tier you want to 5 to 10x your price and expect 20% of people to take it.'

> My rule of thumb is that for every new tier you want to 5 to 10x your price and expect 20% of people to take it.
>
> — *Why you aren't making as much money as you want* (youtu.be/ZuJryiwxjDw)

### Each tier must double revenue

*Otherwise the operational constraint isn't worth it.*

**Quote:** 'I want each tier to bring me another double, like another full amount of revenue. Otherwise, I'm like, I don't know if it's worth creating the actual extra constraint of operations.'

> I want each tier to bring me another double, like another full amount of revenue. Otherwise, I don't know if it's worth creating the actual extra constraint of operations.
>
> — *Why you aren't making as much money as you want* (youtu.be/ZuJryiwxjDw)

### The 8 x $10 + 2 x $50 example

*Top 20% outearn the bottom 80%: $100 vs $80.*

**Quote:** 'If you have eight of these customers at $10 per month and you've got two of them at $50 per month, how much am I making? I'm making $80 per month in total on the bottom 80 and then I'm making $100 per month on my top 20%. And so, by serving these two customers differently, we double the revenue of the business.'

> If you have eight of these customers at $10 per month and you've got two of them at $50 per month, I'm making $80 per month in total on the bottom 80 and then I'm making $100 per month on my top 20%. By serving these two customers differently, we double the revenue of the business.
>
> — *Why you aren't making as much money as you want* (youtu.be/ZuJryiwxjDw)

### 20% of buyers hold the spending power

*The Pareto read that makes tiering work.*

**Quote:** 'Here's my rule of thumb for upsells taking into account that 20% of customers have far more spending power than the ones below.'

> Here's my rule of thumb for upsells taking into account that 20% of customers have far more spending power than the ones below.
>
> — *Why you aren't making as much money as you want* (youtu.be/ZuJryiwxjDw)

## Upsell and downsell uptake

*20-30% uptake is normal. Assume-close lifts it past 90%. Prefer zero-cost, zero-work upsells.*

- **20-30% uptake** is the normal range for a straightforward upsell.
- **90%+ take rates** are achievable with an *assume close* - presenting the next purchase as already decided rather than asking if they want it.
- **Zero cost, zero work** upsells are preferred: incremental revenue with no added fulfilment burden.

The assume-close works because it exploits a pre-programmed response: people are so conditioned to try not to buy things that they end up agreeing when the question is never framed as a yes/no.

### 20-30% = normal uptake

*The baseline for a standard upsell.*

**Quote:** 'Most people get 20 to 30% uptake on their upsells. If you use an assume close tactic like this, you can literally see 90% plus take rates on this.'

> Most people get 20 to 30% uptake on their upsells. If you use an assume close tactic like this, you can literally see 90% plus take rates.
>
> — *How To Close Everyone Downselling Like A Pro* (youtu.be/j1tA4l7R2c0)

### Zero cost, zero work

*Best upsell adds revenue without adding fulfilment.*

**Quote:** 'If you have upsells, try and have them be zero cost, zero work upsells, so that you can just make more money up front.'

> If you have upsells, try and have them be zero cost, zero work upsells, so that you can just make more money up front.
>
> — *How to Start a Business From Nothing (Thank Me Later)* (youtu.be/unshZobTt6Q)

### Anchor with a top continuity tier

*A high tier makes the existing price look reasonable.*

**Quote:** 'The first thing we did is we introduced a highest tier continuity option that would make the existing $2,000 a month or $4,500 per quarter seem reasonable by comparison.'

> The first thing we did is we introduced a highest tier continuity option that would make the existing $2,000 a month or $4,500 per quarter seem reasonable by comparison.
>
> — *I Blew Up A Secret Business To Prove It's Not Luck* (youtu.be/SmiOK8Yun4s)

## Funnel conversion benchmarks

*Every added step loses ~50%. Web pages 1-2%. Trusted platform page ~4%. Niche opt-in up to 5% of leads.*

The decay numbers that decide how many steps a funnel can afford:

- **Every added step loses about 50% or more.** Two landing pages in a row is not one funnel; it is two 50% haircuts.
- **Web pages typically convert 1-2%.**
- **A strong, trusted platform page converts around 4%** - platform trust lifts overall conversion.
- **Niche opt-in leads convert up to 5% of leads** (leads, not shows).

Design implication: collapse steps before rewriting copy. Removing a single interstitial page is usually worth more than any headline test, and speed-to-lead compounds the same way.

A real multi-step funnel, for scale: **511 challenge attendees → 26 show up to live sessions daily → 12 sales calls booked → 10 held → 6 closed.**

### Each added step ≈ -50%

*Two pages in a row means two haircuts.*

**Quote:** 'Typically you'll lose about 50%. By like half. Just for every step you add, it's usually about half or more that you lose.'

> Typically you'll lose about 50%. By like half. Just for every step you add, it's usually about half or more that you lose.
>
> — *Building a $2,500,000 Business for a Stranger in 36 Minutes* (youtu.be/OQf2Ba-Lp_4)

### Web pages 1-2%, trusted platform ~4%

*Trust in the platform raises overall conversion.*

**Quote:** 'Web pages, most times it's going to be between 1 and 2% in terms of conversion rate on those pages. I'll give you a fun factoid for School. So I think School right now is at like 4%. It's really good for School about pages and it's because when you have trust in a platform that starts to increase your conversion overall.'

### Niche opt-in → up to 5% of leads

*Tighter niche lifts lead conversion.*

**Quote:** 'If you are a little bit more niched, then that can go up to 5% of leads. And like again, that's leads, not shows, right? That's just overall like you had 100 people opt in for webinar.'

> If you are a little bit more niched, then that can go up to 5% of leads. That's leads, not shows.
>
> — *The Mathematics of Business, Explained* (youtu.be/A_tx40lNpf8)

### Full funnel benchmark: 511 → 6

*511 attendees → 26 show daily → 12 booked → 10 held → 6 closed.*

**Quote:** 'The average challenge attendees are 26. So 26 out of the 511 will actually show up to the live sessions each day. Out of that we will typically book 12 sales calls, we'll hold 10 and we'll close six sales.' A useful end-to-end shape for a high-touch funnel.

> The average challenge attendees are 26. So 26 out of the 511 will actually show up to the live sessions each day. Out of that we will typically book 12 sales calls, we'll hold 10 and we'll close six sales.
>
> — *If I Wanted To Scale A Service Business In 2026* (youtu.be/N5MExtki_VI)

## Volume, focus and the long game

*10-30x the volume, not 10%. Consistency only looks impressive at the end.*

**Volume:** 'You need to do 10 or 20 or 30 times the volume.' Not 10% more. The distance between where you are and where you want to be is usually a volume gap, and it is almost always larger than it feels from the inside.

**Consistency:** 'The reason so few people understand success is consistency never looks impressive in the moment, only at the end.' The work looks unremarkable while it compounds - which is precisely why most people stop before it does.

**Focus:** 'If you say no, hypothetically, to literally everything except for one thing, you would define that person as incredibly focused, probably obsessive.' Focus is subtraction, and it is defined by what you refuse.

**Wealth:** 'It's better to focus on how to 10x your income than save an additional 10%.' Optimise the numerator, not the denominator.

### 10-30x the volume

*The gap is usually a volume gap, and bigger than it feels.*

**Quote:** 'You need to do 10 or 20 or 30 times the volume.'

> You need to do 10 or 20 or 30 times the volume.
>
> — *If You're in Your 20s or 30s, Here's How to Win (at Anything)* (youtu.be/0lMn_-EXyhQ)

### Consistency only looks impressive at the end

*The middle looks unremarkable, which is why people quit.*

**Quote:** 'The reason so few people understand success is consistency never looks impressive in the moment, only at the end.'

> The reason so few people understand success is consistency never looks impressive in the moment, only at the end.
>
> — *Stop Caring What Others Think of You So Much* (youtu.be/qqjGxVW-Ae0)

### Focus is subtraction

*Say no to everything except one thing.*

**Quote:** 'If you say no, hypothetically, to literally everything except for one thing, you would define that person as incredibly focused, probably obsessive.'

> If you say no, hypothetically, to literally everything except for one thing, you would define that person as incredibly focused, probably obsessive.
>
> — *How To Scale Yourself: The What-Why-How Framework* (youtu.be/lIC8fYbrkII)

### 10x income, not 10% savings

*Optimise the numerator.*

**Quote:** 'The truth is, it's better to focus on how to 10x your income than save an additional 10%.'

> The truth is, it's better to focus on how to 10x your income than save an additional 10%.
>
> — *Dangerously Honest Advice to Create Generational Wealth* (youtu.be/m-k0_pQJ1fY)

