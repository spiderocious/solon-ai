# Decision needed — How the Simulator (Module 0) actually computes results

**For:** PM
**From:** Engineering
**Status:** open
**Decision needed by:** before we start Module 0 build

---

## What we're deciding

When a user clicks **"Run Scenario"** in the Simulator, *something* has to take their inputs (candidates, turnout levers, issue shocks) and produce vote-share projections + a rationale. There are two ways to build that "something." They feel similar from the outside but they're very different inside, and they have very different trade-offs.

You need to choose one. The choice can't be deferred — it shapes the whole module.

This document is the trade-off, framed for product decision-making. No code, no jargon. One clear question at the end.

---

## The two approaches in plain English

### Approach A — **"The model is a calculator"** (deterministic engine)

We build a **statistical model** (the same kind banks, pollsters, and academic political scientists build) that has been trained ahead of time on historical Nigerian election results. When the user submits a scenario, the model treats it as a math problem:

> "Given these candidates, this turnout, and this shock, the math says: APC 38%, LP 31%, PDP 24%, others 7%, confidence ±4 points."

The AI is only used at the **edges**: it reads the user's natural-language scenario and turns it into structured inputs ("turnout up 12% among urban youth"), then *after* the math has run, it writes a one-paragraph explanation of the result.

**Mental model:** like Excel with a really good spreadsheet model. The numbers are produced by formulas. The AI translates between English and the spreadsheet.

### Approach B — **"The model is an AI agent"** (LLM agent loop)

We give an AI assistant access to a set of tools — "look up historical results for this constituency", "filter by demographic", "apply a turnout adjustment" — and let the AI **reason its way to an answer**. It looks at the scenario, thinks, calls a tool, looks at the result, calls another tool, repeats. After some number of steps it produces a projection.

**Mental model:** like having a smart research analyst who has access to your data and methodically thinks through each scenario. The AI is doing the *reasoning*, not just translating.

---

## Side-by-side comparison

| Dimension | A — Deterministic engine | B — AI agent loop |
| --- | --- | --- |
| **Speed per scenario** | Fast. Sub-second to ~2 seconds. | Slow. 20-90 seconds per run. |
| **Same input → same output?** | Yes, always. Two users running the same scenario get the same numbers. | No. The AI may approach the problem differently across runs; numbers can drift by a few points between identical inputs. |
| **Cost per scenario** | Negligible. Fractions of a cent. | Material. $0.20 - $1.50 per run depending on complexity. At scale this adds up. |
| **Explainability** | Strong and provable. We can point to specific historical patterns and show how each lever moved the result. | Weak. We can show the AI's reasoning trace, but it's not the same as a derivation. Hard to defend in court. |
| **Auditability** | Strong. Every result is reproducible from the inputs forever. | Weak. We can replay the trace but the AI's exact reasoning is not perfectly reproducible. |
| **Quality of rationale ("why did LP get a 6-point bump?")** | Solid but mechanical. Lists the top features and their contributions. | Often better-feeling. The AI can string together a narrative. |
| **Handles questions outside the spec** ("what if the running mate is unpopular?", "what about a third-party endorsement?") | Limited to what we modeled. New question types need engineering. | Naturally handles novel framings without code changes. |
| **Risk of confident wrong answers** | Low. The math either has an answer or doesn't. Confidence intervals are honestly computed. | Higher. AI can produce plausible numbers that are wrong, with explanations that sound authoritative. |
| **Defensibility to a regulator, journalist, or court** | Strong. "Here's our model, here's its accuracy on past cycles, here's the math." | Weak. "We asked an AI" is not a defense. |
| **Engineering work — build** | 4-6 weeks for the v1 model + integration. Bulk of work is data prep (which we're doing either way). | 2-3 weeks for the harness. Faster to a first demo. |
| **Engineering work — maintain & improve** | Higher upfront, lower over time. Model improvements are deliberate. | Lower upfront, higher over time. Tuning prompts and tool definitions is a constant. |
| **Specialist hires we'd need** | A data scientist / political analyst (someone with stats background) to own the model. | Prompt-engineer / ML engineer to own the agent harness. |
| **Behavior on election day under load (100s of concurrent runs)** | Scales easily. Stateless math. | Strained. Each run holds an AI session for tens of seconds. AI vendor rate limits become a bottleneck. |
| **What you can put on a sales slide today** | "Our proprietary model, trained on every Nigerian election since 2011, predicts ... with X% accuracy on backtests." | "AI-powered scenario reasoning that responds to any question." |
| **What a sophisticated buyer asks next** | "What's your accuracy on hold-out cycles?" — we can answer. | "How do we know the AI isn't making things up?" — harder to answer. |

---

## What the spec asks for (mvp.md, Module 0)

For reference — these are the user-facing capabilities we have to deliver either way:

- Vote-share projections per candidate with a confidence band.
- A written rationale paragraph for every projection.
- Top 5 variables driving each projection, ranked by impact.
- Natural-language scenario input ("what happens in Anambra Central if Soludo backs the LP candidate?").
- Follow-up questions ("why did the model give LP a 6-point bump?").
- Confidence indicator (High / Medium / Low).
- Ethical guardrails — block voter-suppression scenarios.
- Standardised disclosure on every exported PDF.

**Both approaches can deliver these features.** The question is *how* and at what trade-off.

---

## The honest middle option — **Hybrid (Approach A with AI on top)**

This is what most serious political-modelling shops actually do, and it's what engineering recommends. It is **not a compromise** — it gives us the best of both:

| Stage | What it does | Who does it |
| --- | --- | --- |
| 1. Parse | "Turn the user's English scenario into structured inputs." | AI |
| 2. Guard | "Is this a suppression scenario? Block if so." | AI + rules |
| 3. Compute | "Run the actual projection." | Deterministic model |
| 4. Narrate | "Write the one-paragraph rationale using the model's real outputs." | AI |
| 5. Follow-up Q&A | "Answer 'why did LP get a 6-point bump?' grounded in the model's feature importances." | AI |

Result: the numbers are defensible math; the *experience* feels like talking to a smart analyst. The AI never makes up numbers because it never has the chance to — it only narrates what the math produced.

This is also the approach that's **consistent with how we designed Module 4 (war room)** — the freeform AI copilot you asked us to keep is exactly this pattern: AI on top of structured data, with grounding rules.

---

## Pros and cons summary (for the deck)

### Approach A — Deterministic engine
- **Pros:** fast, cheap, reproducible, defensible, scales on election day, has a real sales story ("our model, our accuracy").
- **Cons:** less flexible, novel scenario shapes need engineering work, rationale is mechanical.
- **Work:** 4-6 weeks for v1 (mostly model building).

### Approach B — AI agent loop
- **Pros:** flexible, fast to first demo, naturally handles novel questions, narrative feels smart.
- **Cons:** slow, expensive, non-reproducible, hard to defend, election-day load risk, no real moat (anyone with an Anthropic API key can do this).
- **Work:** 2-3 weeks to a working demo. Months of ongoing tuning to keep it accurate.

### Hybrid — A with AI at the edges *(engineering recommendation)*
- **Pros:** best UX + defensible math + reproducible + scales + has a sales story + handles natural language.
- **Cons:** slightly more upfront engineering than pure A. Requires us to be clear-headed about which stage uses which.
- **Work:** 5-7 weeks for v1.

---

## The one question for you

Across all the things we sell on — *defensibility*, *speed*, *cost*, *narrative quality*, *time-to-first-demo*, *election-day reliability* — which of these matters **most** to the product, and which can we trade against it?

The honest answer here drives the choice. Specifically:

1. **Who is the buyer you most want to win in 2026?** Aspirants who want a quick "what if" tool, or strategists / consultancies who will scrutinise our methodology?
2. **How do we plan to talk about accuracy?** Are we publishing a backtest? Are we comparing to past pollsters? (Approach A makes this easy. Approach B makes this hard.)
3. **On election night, if our projection disagrees with INEC's declared result, what do we want the post-mortem to say?** ("Here's where our model was wrong and here's why" — A. "The AI thought differently that day" — B.)

If you can answer those three, the choice is mechanical. Engineering's recommendation is the **hybrid**, but we'll build whichever you pick.
