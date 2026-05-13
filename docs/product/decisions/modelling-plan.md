# Modelling Plan — Simulator Engine & Data Requirements

**Status:** Open for product review
**Companion doc:** [`simulator-engine-approach.md`](simulator-engine-approach.md)
**Audience:** Product, engineering, founder/CEO

This doc collates the input we have so far on **how the Module 0 Simulator should compute its results**, and the **data requirements** that any approach implies. It is presented without recommendation. Decide after reading.

---

## 1. Background — the three options on the table

These were laid out for the PM (see [`simulator-engine-approach.md`](simulator-engine-approach.md)):

- **Option A — Deterministic statistical model.** A trained model produces vote-share numbers. LLMs are used only to parse natural-language scenarios into structured inputs at the start, and to write the rationale paragraph at the end. The LLM never produces a number.
- **Option B — LLM agent loop.** An LLM is given tools (lookup historical results, filter by demographic, apply turnout adjustments, etc.) and reasons its way to a projection. The LLM is the engine and produces the numbers.
- **Option C — Ensemble.** Both A and B produce projections; the system reconciles them (e.g. average, pick higher confidence, show both) before showing the user.

---

## 2. Position from internal review (CEO)

The CEO pushed back on the engineering-recommended hybrid (A with LLM at the edges), reasoning that **Option C — running both A and B and merging answers — could be smarter than constraining the LLM to a narrator role.** Stated concerns:

- LLMs are "way smarter" than fitted statistical models, including at numerical estimation.
- Pure A may yield more incorrect outputs than an ensemble that combines both signals.
- Constraining the LLM to narration alone underuses what AI can do for the product.

The CEO requested external expert input before locking the decision.

---

## 3. Expert #1 — response (verbatim)

> **Build A properly. Use an LLM for input parsing, rationale generation, and as an offline sanity-check tool during model development. Don't let any LLM produce the numbers. If you build C at all, use it to display disagreement, not to resolve it.**

Expanded by the expert into three LLM roles:

1. **Input parsing.** User types English; LLM converts to structured inputs the model can consume.
2. **Rationale generation, post-hoc.** Model runs and produces numbers + feature importances; LLM writes the explanatory paragraph from those outputs.
3. **Offline sanity-check during model development.** LLM acts as a second pair of eyes while the deterministic model is being built and tuned ("model says APC wins by 12; does that look reasonable given what's publicly known?"). Used as a debugging tool, never in production for users.

On Option C:

> *"If you build C at all, use it to display disagreement, not to resolve it."*

I.e. if both A and B's answers are surfaced, show them as separate views and tell the user they disagree — do not merge.

---

## 4. Expert #2 — response (verbatim)

> You're basically deciding between a *forecasting system* and a *reasoning system pretending to forecast*. Those are not the same thing.
>
> **My short answer:**
>
> - For numerical election projections → I would trust **Option A** far more.
> - For narrative interpretation / edge-case reasoning → I would use an LLM.
> - For production → I'd build a **disciplined version of Option C**, but with A as the authority and B as an auxiliary analyst, *not* as an equal voting partner.
>
> This is one of those domains where "sounds intelligent" and "is calibrated" diverge hard.
>
> ## 1. Statistical model vs LLM agent for numerical prediction
>
> ### I'd trust A for the numbers. Strongly.
>
> Why:
>
> ### A is optimizing for the correct thing
>
> A is trained against:
>
> - actual election outcomes
> - measurable covariates
> - historical relationships
> - error minimization
>
> That means:
>
> - you can backtest
> - measure calibration
> - compute uncertainty
> - identify drift
> - improve systematically
>
> You can say:
>
> > "On held-out gubernatorial races from 2015–2023, median ward-level error was X."
>
> That matters enormously if politicians, journalists, donors, or civic groups will rely on this.
>
> An LLM agent cannot naturally provide this kind of statistical accountability.
>
> ---
>
> ### LLMs are excellent political analysts, weak forecasters
>
> LLMs are:
>
> - superb at synthesizing narratives
> - good at qualitative causal hypotheses
> - good at extracting latent factors from text
> - terrible at calibrated probabilistic prediction unless heavily constrained
>
> The danger is that Option B *feels* smart because it reasons in language:
>
> > "Youth turnout increases in urban southwest due to subsidy unrest…"
>
> But underneath, it has:
>
> - no stable parameterization
> - no guaranteed weighting logic
> - no calibration
> - no consistent latent structure
> - stochastic outputs
>
> You can run the exact same prompt twice and get:
>
> - APC 38%
> - APC 33%
>
> …with equally persuasive explanations.
>
> That's deadly for trust in a political-intelligence product.
>
> ---
>
> ### Elections are mostly structured-data problems
>
> Especially in Nigeria.
>
> The strongest signals are usually:
>
> - incumbency
> - ethnicity
> - religion
> - urban/rural split
> - turnout elasticity
> - party historical strength
> - local machine structure
> - regional swing patterns
> - candidate familiarity
> - economic indicators
> - security events
> - voter suppression/disruption patterns
>
> These are fundamentally statistical relationships.
>
> The *language* around politics changes faster than the underlying voting behavior.
>
> ---
>
> ### Where Option B *is* valuable
>
> LLMs shine where the structure breaks:
>
> - unprecedented coalitions
> - candidate scandal interpretation
> - elite defections
> - viral narratives
> - sudden unrest
> - factional dynamics
> - interpreting unstructured news/social data
> - "what if" conditions humans naturally ask
>
> Example:
>
> > "What if the governor privately backs the opposition but doesn't defect publicly?"
>
> A pure statistical engine struggles unless you engineered a feature for it.
>
> The LLM can reason about analogies and soft political signals.
>
> But that reasoning should become:
>
> - a feature proposal
> - a scenario modifier
> - a qualitative overlay
>
> —not the final vote-share generator.
>
> ## 2. Is there a defensible merge strategy?
>
> Yes — but not "simple averaging."
>
> A naive merge:
>
> - A = 38
> - B = 34
> - output = 36
>
> …is statistically meaningless unless both systems are calibrated estimators of the same latent quantity.
>
> Right now:
>
> - A is a forecasting model
> - B is a narrative simulator
>
> Those are different objects.
>
> ### The best architecture is probably:
>
> ### "A generates numbers. B critiques and perturbs."
>
> Meaning:
>
> #### Layer 1 — Core Forecast Engine (authoritative)
>
> This is your deterministic/statistical system:
>
> - hierarchical Bayesian model
> - gradient boosting
> - multilevel regression
> - turnout model
> - geographic smoothing
> - coalition transfer modeling
>
> This produces:
>
> - baseline vote shares
> - confidence intervals
> - turnout estimates
> - uncertainty decomposition
>
> This is the "official" forecast.
>
> ---
>
> #### Layer 2 — LLM Scenario Interpreter
>
> LLM converts:
>
> > "fuel subsidy collapses + youth anger + northern turnout suppression"
>
> into structured deltas:
>
> - youth turnout +8%
> - incumbent approval −6
> - urban swing +3 opposition
> - inflation salience +0.7
> - northern turnout −4%
>
> Then A runs again.
>
> This is the highest-value use of AI in your setup.
>
> ---
>
> #### Layer 3 — LLM Auditor / Political Strategist
>
> After the statistical forecast:
>
> - the LLM explains
> - stress-tests assumptions
> - identifies historical analogues
> - surfaces hidden risks
>
> Example:
>
> > "Model confidence may be overstated because similar turnout patterns did not occur during major fuel shocks."
>
> That's extremely valuable.
>
> ---
>
> ### If you REALLY want ensemble behavior
>
> Then do it like modern quantitative finance:
>
> - treat B as a weak prior adjustment signal
> - never equal-weight it with A
>
> Example:
>
> Final forecast:
>
> $$F = A + \lambda(B - A)$$
>
> Where:
>
> - $A$ = statistical forecast
> - $B$ = LLM forecast
> - $\lambda$ = trust coefficient
>
> And $\lambda$ should usually be small:
>
> - 0.05
> - 0.1
> - maybe 0.2 in novel environments
>
> Not 0.5.
>
> Because B is not calibrated.
>
> ---
>
> ### Better: use B to adjust uncertainty, not means
>
> This is much more defensible.
>
> If the LLM detects:
>
> - unprecedented coalition
> - constitutional crisis
> - insurgency escalation
> - candidate death risk
> - elite fragmentation
>
> …it can widen confidence intervals rather than shift the forecast aggressively.
>
> That's actually elegant.
>
> Example:
>
> - A says APC 38 ± 2
> - B detects instability
> - final becomes APC 38 ± 6
>
> That's intellectually honest.
>
> ## 3. What you might be missing
>
> A few important things.
>
> ---
>
> ### A. Nigerian election data is *messy beyond normal ML assumptions*
>
> You probably already know this, but:
>
> - missing PU data
> - inconsistent collation
> - violence/disruption
> - boundary changes
> - turnout anomalies
> - vote inflation
> - suppressed areas
> - INEC irregularities
> - delayed uploads
> - strategic nonparticipation
>
> Your biggest challenge may not be modeling.
> It may be:
>
> > building a trustworthy canonical dataset.
>
> That becomes a moat.
>
> ---
>
> ### B. You need causal structure, not just prediction
>
> Pure predictive ML may overfit correlations.
>
> You want explicit modeling of:
>
> - turnout effects
> - ethnic bloc transfer
> - incumbency decay
> - candidate favorability
> - urbanization effects
> - economic shocks
>
> Otherwise your scenario simulator becomes:
>
> > "interpolate near historical data only."
>
> But users want:
>
> > counterfactuals.
>
> That pushes you toward:
>
> - structural models
> - Bayesian causal frameworks
> - simulation engines
>
> —not just XGBoost on historical rows.
>
> ---
>
> ### C. Confidence intervals are the real product
>
> Most political tools fake confidence.
>
> If you can genuinely produce:
>
> - calibrated uncertainty
> - probabilistic ranges
> - scenario sensitivity
>
> …you instantly look more serious than most African political-tech products.
>
> A lot of users care less about:
>
> > "APC 37.4"
>
> and more about:
>
> > "This race is highly unstable and turnout-sensitive."
>
> ---
>
> ### D. Don't let the LLM invent political facts
>
> This is critical.
>
> Never allow:
>
> - hallucinated defections
> - fake endorsements
> - invented polling
> - fabricated ethnic dynamics
>
> The LLM should only reason over:
>
> - verified retrieval
> - structured facts
> - approved inputs
>
> Political misinformation risk is massive.
>
> ---
>
> ### E. Your moat is probably not the model
>
> It's likely:
>
> - proprietary cleaned election data
> - ward/PU normalization
> - local political ontology
> - turnout elasticity estimates
> - regional behavior priors
> - elite network mapping
> - scenario UX
>
> The model itself is replaceable faster than the data layer.
>
> ## What I would personally build
>
> If I were architecting this:
>
> ### Core stack
>
> #### Forecast layer
>
> - hierarchical Bayesian model
> - geographic partial pooling
> - turnout submodel
> - candidate-strength latent variables
> - uncertainty propagation
>
> #### AI layer
>
> LLM only does:
>
> 1. scenario parsing
> 2. feature extraction
> 3. qualitative reasoning
> 4. explanation generation
> 5. anomaly detection
> 6. confidence stress-testing
>
> #### UX layer
>
> Show:
>
> - baseline
> - scenario deltas
> - uncertainty
> - key drivers
> - "why forecast changed"
>
> Example:
>
> > APC drops 4.2 points primarily due to urban youth turnout increase in Lagos, Rivers, and Abuja.
>
> That's gold.
>
> ## My strongest recommendation
>
> Do not let the LLM be the final numerical authority.
>
> You'll eventually get burned by:
>
> - inconsistency
> - hallucinated reasoning
> - irreproducibility
> - inability to defend forecasts publicly
>
> Use the LLM as:
>
> - translator
> - strategist
> - explainer
> - critic
>
> Use the statistical engine as:
>
> - forecaster of record.
>
> That separation is clean, defensible, and scalable.

---

## 5. Data requirements

Both experts independently flagged the same point: **the dataset is likely the moat, more than the model itself.** Whichever engine option is chosen, the data requirements below apply.

These requirements have two natures:

- **Slow-moving / historical** — collected once, refreshed per cycle. Source: official records, archives.
- **Fast-moving / live** — collected continuously (daily or near-daily) during a live campaign window. Source: news, social, sentiment scrapers, structured-data pulls.

### 5.1 Slow-moving / historical data (one-time + per-cycle refresh)

**Electoral history**

- INEC official results, every cycle from 2011 to present, at polling-unit (PU) level where available, falling back to ward → LGA → state.
- Per-cycle scope: presidential, gubernatorial (only states that voted in that cycle), Senate, House of Reps, State Houses of Assembly.
- For every row: registered voters, accredited voters, valid votes per party, rejected votes, source URL.
- Court-ordered re-runs, supplementary elections, annulled-and-rerun races flagged separately.
- INEC IReV portal data for 2023 onwards (and partial 2019).
- *(See [`docs/prompts/data-gatherer.md`](../../prompts/data-gatherer.md) for the historical-collection process.)*

**Geography (reference data)**

- 36 states + FCT, with codes.
- 774 LGAs.
- ~8,809 wards (subject to delimitation changes).
- ~176,000+ polling units, with geographic coordinates where INEC publishes them.
- Boundary polygons (state, LGA, ward) — sourced from INEC / Open Street Map / GADM.
- Pending delimitation changes published by INEC.

**Demographics (per geographic unit)**

- Population estimates.
- Age distribution (especially youth share — 18–35 is politically pivotal).
- Gender split.
- Religious composition (Christian / Muslim / Traditional / other).
- Ethnic composition by major group.
- Urban / rural classification.
- Literacy and education levels.
- Economic indicators where available (poverty rate, unemployment, primary livelihood).
- Source: NPC census + NBS surveys + academic datasets. (Note: Nigerian census data is dated — last full census 2006 — requires careful extrapolation.)

**Party history**

- Party formation dates, mergers, dissolutions (APC formed 2013 from ACN/CPC/ANPP/APGA-faction merger; APGA factional history; PDP splits; LP rise 2022–23; NNPP rise; etc.).
- Per-party historical strongholds at state / LGA level.
- Defection records (politicians moving between parties, cycle by cycle).

**Candidate profiles**

- Name, party, age, gender, religion, ethnicity, state/LGA of origin.
- Prior offices held.
- Education.
- Known endorsements (party leadership, religious figures, traditional rulers, godfathers).
- Faction affiliations.
- Past electoral performance.

**Economic / structural indicators (national + per state, time-series)**

- Inflation rate (monthly).
- Unemployment rate.
- Naira exchange rate vs USD.
- Fuel price (PMS pump price — major political variable in Nigeria).
- Electricity supply hours per state (proxy for service-delivery sentiment).
- Subsidy regime status.
- Insecurity incidents (kidnapping, banditry, communal clashes, terrorism) per state — sourced from ACLED, Nigeria Watch, NigeriaSecuritytracker.

**Coalition / political-bloc data**

- Regional bloc voting patterns (South-East, South-South, South-West, North-Central, North-East, North-West).
- Ethnoreligious bloc data: Christian South-East / Muslim North-West / mixed Middle Belt, etc.
- Traditional ruler endorsement networks (Sultan of Sokoto, Sultanate Council, Ooni of Ife, Oba of Lagos, Northern Traditional Rulers Council, etc.).

### 5.2 Fast-moving / live data (continuous collection during campaign windows)

This is the data that **does need to be gathered daily — or near-daily — by a combination of scrapers, retrieval-AI, and structured-API pulls.** It captures the political weather around an election cycle.

**Social-media sentiment**

- X (Twitter) — hashtags, candidate mentions, party mentions, key political accounts, viral tweets.
- Facebook — public pages, political-group activity (subject to Meta API access).
- TikTok — short-form political content, especially among youth.
- Instagram — political-influencer activity, candidate accounts.
- YouTube — political channels, debate coverage, town-hall recordings.
- LinkedIn — elite-class commentary (small but signal-dense).
- *Per-platform: volume, sentiment, top topics, top quotes, demographic skew where derivable.*

**Public chat / community platforms**

- Nairaland — political subforum threads, post velocity, sentiment.
- WhatsApp public channels and broadcast lists — where access is legally available.
- Telegram political groups — public channels only.
- Threads / Bluesky — small but growing.

**News (mainstream and local)**

- Premium Times.
- Punch.
- The Guardian Nigeria.
- TheCable.
- Vanguard.
- Daily Trust (Northern coverage, critical).
- Sahara Reporters.
- The Nation.
- Channels TV / Arise / TVC online coverage.
- BusinessDay (economy-and-politics overlap).
- Reuters / AP / AFP Nigeria desks.
- State-specific local papers (Tribune in Oyo, BusinessHallmark, Leadership).

**Radio call-in transcripts** *(per `mvp.md`; deferred from MVP for ingestion infra reasons, but listed for completeness)*

- Major Lagos / Abuja / regional FM stations.
- Hausa-language stations in the North (Freedom Radio, Cool FM Kano).
- Yoruba-language stations in South-West.
- Igbo-language stations in South-East.

**Political-event tracking**

- Rally dates, locations, attendance estimates.
- Endorsements (newly announced, daily).
- Defections (newly announced, daily).
- Candidate withdrawals.
- Court rulings on candidate eligibility.
- INEC announcements (deadlines, delimitation, BVAS deployment).

**Security incidents during campaign window**

- ACLED daily feed.
- NigeriaSecuritytracker.
- News reports of political-violence incidents.
- Per-state incident counts, severity, target type (campaign office / candidate / supporters / polling staff).

**Economic-shock signals**

- Daily PMS pump price.
- Weekly inflation reports.
- NLC / TUC strike announcements.
- Fuel-queue reporting.
- Power-grid collapse events (these correlate with anti-incumbent sentiment).

**INEC operational signals (election week and day)**

- BVAS deployment status.
- IReV upload latency.
- Result-sheet upload activity.
- Polling-unit-level disruption reports.

**Polling data (where available)**

- Public opinion polls from NOI Polls, Stat Strategy, Bloom Public Affairs, ANAP Foundation, etc.
- Polls have low frequency and questionable methodology in Nigeria — treat as one of many signals, not as ground truth.

**Issue salience (extracted from above sources)**

- Top 10 issues being discussed per constituency per week.
- Sentiment per issue.
- Trend direction (rising / steady / falling).
- *(This is the input to the M1 "issue salience monitor" feature in `mvp.md`.)*

### 5.3 Data collection cadence — what runs when

| Cadence | What gets collected | Method |
| --- | --- | --- |
| **One-time** | Historical INEC results 2011–latest, geographic reference data, party/candidate baseline profiles | AI agent harness over a few days, then human-validated. See [`data-gatherer.md`](../../prompts/data-gatherer.md). |
| **Per-cycle** (every general election) | Refresh of INEC results for that cycle, updated candidate profiles, updated coalition map | Repeat of the historical pipeline, scoped to the new cycle. |
| **Monthly** | Demographics refresh, economic indicators, party-strongholds revision | Pulls from NBS, INEC press releases, news archives. |
| **Weekly** | Issue salience digest, polling-data updates, endorsement / defection log | Scraper pipelines + AI summarisation. |
| **Daily** *(during a campaign window — say 6 months before election day)* | Social-media sentiment across X / Facebook / TikTok / Nairaland, news headlines, rally / event tracking, security incidents, economic-shock indicators | Continuous scrapers + AI agent summarisation jobs running on a daily cadence. |
| **Hourly** *(election week)* | INEC operational signals, BVAS / IReV upload status, real-time incident reports | Higher-frequency polling of the same pipelines. |
| **Per-event** | Endorsements, defections, court rulings, candidate withdrawals, debate transcripts | Triggered by news-detection or manual entry. |

### 5.4 Implications for build

- The **historical dataset is a one-time-ish build** (refreshed each cycle). It is the foundation. Without it, no engine option works.
- The **live data stream is an ongoing operational system.** Scrapers, AI summarisation jobs, sentiment pipelines, news ingestion, security feeds — all running on a daily or sub-daily cadence during campaign windows. This is its own engineering surface, comparable in size to the simulator engine itself.
- Whichever engine option is chosen, the data layer needs to be built. The data layer is approach-agnostic.
- The data layer's quality determines the ceiling on accuracy for **any** of the three options.

---

## 6. Summary — what's been said

| Source | Position on the engine question |
| --- | --- |
| Engineering (initial doc) | Hybrid (A with LLM at edges). |
| CEO | Pushed back; argued ensemble (C) may be smarter; asked for external input. |
| Expert #1 | Build A properly. LLM at edges only. Do not let LLM produce numbers. If C is built, use it to *display* disagreement, not *resolve* it. |
| Expert #2 | A is the authority. B is an auxiliary analyst. Three LLM layers: scenario parser, scenario interpreter, post-hoc auditor. If ensemble behavior is wanted, use it to widen confidence intervals — not to shift the mean. Naïve averaging is "statistically meaningless." |

| Source | Position on data |
| --- | --- |
| Engineering | Historical dataset + live ingestion pipeline are both required and substantial. |
| Expert #2 | "Your moat is probably not the model. It's likely: proprietary cleaned election data, ward/PU normalization, local political ontology, turnout elasticity estimates, regional behavior priors..." |

---

## 7. What product needs to decide

1. **Engine approach** — pick one of A, B, C, or a specified variant. The expert input is on file; the decision is the PM's / CEO's.
2. **Data-pipeline commitment** — confirm scope of historical + live-data collection. This drives hiring, infra, and timeline more than the engine choice does.
3. **Live-data cadence** — confirm whether daily social/news/sentiment collection ships in MVP or later. (Currently in `mvp.md` M1 as "issue salience" with weekly cadence; daily cadence is an expansion.)
4. **Moat statement** — agree on the public-facing answer to "what is Solon's moat?" — model, data, both, or something else. This shapes the sales narrative.

Decisions captured here will close [`simulator-engine-approach.md`](simulator-engine-approach.md).
