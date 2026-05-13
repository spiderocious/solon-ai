# Solon — MVP Features (engineering recommendation)

Per-module MVP feature list — locked in after PM review. For features cut or deferred, see [`skipped-mvp-features.md`](skipped-mvp-features.md).

**Legend**

- ✅ **Keep** — ship in MVP as specified.
- ✂️ **Trim** — ship a slimmer version (sub-feature reduced / scope narrowed).
- ❌ **Removed from MVP** — see [`skipped-mvp-features.md`](skipped-mvp-features.md).
- 🕓 **Deferred** — already marked v2 in `mvp.md`; see [`skipped-mvp-features.md`](skipped-mvp-features.md).

Source spec: [`mvp.md`](mvp.md). Architecture: [`../architecture.html`](../architecture.html).

---

## Module 0 — Election Simulator

> Flagship / entry product. Lowest data-risk, broadest buyer base. **Do not trim Module 0 heavily — it's the funnel into everything else.**

### ✅ Keep

**Onboarding & access**

- Sign up with phone number + email (no candidate verification).
- Select user type: Aspirant, Strategist, Consultancy, Journalist, Researcher, Party Office (drives feature gating + pricing).
- Accept Simulator Use Agreement (probabilistic estimates disclosure).

**Race & scenario setup**

- Select race by office (President / Governor / Senate / House of Reps / State Assembly), state, constituency.
- View baseline scenario (current best-estimate vote share per party + confidence interval).
- See top 5 variables driving the projection, ranked by impact.

**Scenario building — candidate matchups**

- Define up to 4 candidates per race.
- Candidate attributes: party, age, gender, religion, ethnicity, state/LGA of origin, incumbency, prior office, godfather/backer, issue platform tags.
- Mark candidate as real (from platform DB) or hypothetical profile.
- Run simulation → projected vote share per candidate + confidence band + one-paragraph rationale.

**Scenario building — structural levers**

- Overall turnout (±X%).
- Turnout by demographic (youth, women, ethnoreligious blocks, urban vs rural).
- Party alliance / coalition merge.
- Candidate withdrawal (vote redistribution via second-preference model).
- Defection (sitting officeholder switches party).
- Boundary changes (apply pending delimitation if available).
- BVAS / accreditation failure modelling.
- Isolated impact vs combined impact view when multiple levers stacked.

**Scenario building — issue shocks**

- Pre-defined shocks: fuel subsidy collapse, security incident, currency crash, major endorsement (NLC/CAN/JNI), viral scandal, ethnic/religious flashpoint.
- Severity (1–5) + decay rate per shock.
- Projected vote-share movement + written rationale.

**Outputs & deliverables**

- Outputs: vote share bar chart, polling-unit map (where data supports), demographic crosstabs, plain-language summary.
- Save scenario with name + notes.
- Compare up to 4 saved scenarios side by side.
- Export scenario report as **branded PDF** with mandatory disclosure footer.
- Confidence indicator (High / Medium / Low) on every projection.

**Ethical guardrails (non-negotiable)**

- Block voter-suppression scenarios.
- Block individual-voter-data scenarios.
- Standardised disclosure on every exported PDF.
- Audit log of all scenario activity.
- Suspend accounts running adversarial patterns.

**Upsell path**

- One-step convert Aspirant → Candidate account.
- Import constituency + baseline + saved analyses into Module 1.
- Trigger Module 1 verification flow on upgrade.

### ✂️ Trim

- **AI scenario copilot — natural-language input. (PM-decided: best-guess + warning banner UX.)**
  Trim: keep NL → structured-inputs conversion. On low parse confidence, show the parsed structured form back to the user with a prominent warning banner highlighting the uncertain fields; the user can edit before "Run".
  - **High confidence:** auto-run, banner-free.
  - **Medium confidence:** show parsed form + warning banner + "Run anyway" CTA.
  - **Low confidence:** show empty/partial form + "We couldn't parse — please fill in" message.
  - The parsed form is the source of truth that the simulator runs on, never the raw prose.

- **AI scenario copilot — follow-up questions.**
  Trim: limit to **3 canned question shapes** in v1 ("why did X bump?", "what would flip this race?", "what's the most sensitive lever?"). Freeform follow-up deferred to v1.1.
  *Why:* Grounded explainability is hard. Three templates over the run's actual feature importances is defensible; freeform is not.

### ❌ Removed from MVP

*(none — Module 0 is the wedge product; full scope held.)*

### 🕓 Deferred to v2

See [`skipped-mvp-features.md`](skipped-mvp-features.md) for the M0 deferred list.

---

## Module 1 — Voter Data & Segmentation

> Most data-heavy module. Trim aggressively inside it; keep the headline capabilities.

### ✅ Keep

**Onboarding & access**

- Candidate signup with office sought + state + constituency.
- Candidate identity verification (NIN **or** INEC candidate registration receipt) before any voter data is shown.
- CM invites team members by phone/email, assigns roles (CM, Coordinator, Analyst, Viewer).
- Accept NDPR-aligned Data Use Agreement before voter data unlocks.

**Constituency intelligence**

- Polling-unit map for the constituency, colour-coded by 2015 / 2019 / 2023 historical results.
- Per-PU drill-in: registered voters, BVAS-accredited count, votes per party per cycle, turnout rate.
- Filter PUs by win-probability tier (Strong Hold / Lean Hold / Toss-up / Lean Opponent / Strong Opponent).
- Top 3 features driving the win-probability score per PU.

**AI-driven segmentation**

- 3–5 voter clusters per constituency with auto-generated labels.
- Per cluster: estimated size, dominant PUs, top 3 issue concerns, recommended outreach channel.
- CSV export of PUs tagged by cluster + priority for offline use.

**Message generation**

- CM inputs policy point → AI generates up to 5 variants per target cluster.
- 👍 / 👎 rating UI on each variant.
- Disclaimer flag when generated message contains unverifiable claims vs candidate's stated platform.

**Issue salience monitor**

- Weekly digest of top 10 issues in the constituency.
- Per issue: trend direction, sentiment toward incumbent, 2–3 anonymised verbatim quotes.
- Click into issue → source breakdown + suggested response talking point.

### ✂️ Trim

- **Message generation — output languages. (PM-decided: English only.)**
  Trim: **English only in v1.** Pidgin, Hausa, Yoruba, Igbo all deferred.
  - **Engineering note (for record):** Pidgin was the lowest-cost additional language (~3-5 days). English-only narrows the field-CM persona we can serve credibly. GTM should be aware before pitching to non-urban constituencies.

- **Issue salience — sources.**
  Trim: **X (Twitter) + Nairaland only in v1.** Radio call-in transcripts and public WhatsApp scraping deferred.
  *Why:* Radio transcription + WhatsApp scraping are each their own infra project. Two clean text sources first; prove the digest is useful before adding messy ingestion paths.

### ❌ Removed from MVP

- **Online-learning rating feedback loop.** Rating UI stays; feedback routes to a manual review queue, not an online learner. See [`skipped-mvp-features.md`](skipped-mvp-features.md).

### 🕓 Deferred to v2

See [`skipped-mvp-features.md`](skipped-mvp-features.md) for the M1 deferred list.

---

## Module 2 — Agent & Volunteer Coordination

### ✅ Keep

**Recruitment & assignment**

- CSV upload **or** manual entry of agents (name, phone, NIN optional, LGA, assigned PU).
- WhatsApp / SMS invite link → opens agent app pre-filled with assignment.
- Agent 3-step verification: phone OTP + selfie + home address + party card.
- CM coverage map: confirmed-agent PUs vs gaps.

**Election day — Form EC8A capture**

- Agent photographs Form EC8A in-app and submits.
- AI extraction: PU code, registered voters, accredited voters, votes per party, total valid votes, rejected votes, signatures present.
- Agent reviews & corrects extracted values before final submit.
- System auto-flags: totals don't reconcile, votes > accredited, suspected alteration, low image quality.
- CM dashboard of all submitted forms + flag status.

**Voice & incident reporting**

- Agent records voice note → AI transcribes + structures into incident type, severity (1–5), location, recommended action.
- Attach photo / short video to incident report.
- Real-time alert to CM for severity 4 or 5.
- CM marks incident: Acknowledged / Dispatched (legal/security) / Resolved / Escalated.

### ✂️ Trim

- **Training modules.**
  Spec: "5–10 minute videos + quiz". Trim to **1 video + 1 quiz per agent role**, 70% pass threshold kept.
  *Why:* Content production is the bottleneck, not engineering. Ship the readiness gate with one solid video per role; add more videos as content team produces them.

- **Voice incident transcription — languages. (PM-decided: English only, aligned with M1.)**
  Trim: **English transcription only in v1.** Other languages deferred.
  - **Engineering note (for record):** Whisper handles Pidgin well at no extra cost; English-only narrows the agent persona we can serve. GTM should flag.

- **Readiness dashboard signals.**
  Trim to **% trained + % verified**. Cut "% with working data plan (self-reported)".
  *Why:* Self-reported data-plan status is noise. The 3-step verification already gates readiness; one more self-reported field doesn't add signal.

### ❌ Removed from MVP

- **Logistics & tasks — accept / decline dispatch system.** Replaced with a simpler shared task list (Coordinator creates → marks done). See [`skipped-mvp-features.md`](skipped-mvp-features.md).

### 🕓 Deferred to v2

See [`skipped-mvp-features.md`](skipped-mvp-features.md) for the M2 deferred list.

---

## Module 3 — Finance & Compliance Tracking — **SKIPPED IN MVP** ❌

> **PM-decided: skip Module 3 entirely from v1.** Solon 2026 covers political intelligence (M0/M1) and election operations (M2/M4); compliance tracking ships in a later release ahead of the next cycle.
>
> Saves ~6-10 weeks of engineering (PEP integration, receipt OCR, statutory cap engine, INEC PDF templates, donor risk pipeline). Frees the team to harden M0, M2, M4 ahead of election day.
>
> Full module feature list lives in [`skipped-mvp-features.md`](skipped-mvp-features.md#module-3--finance--compliance-tracking).
>
> **GTM ask:** stock answer for candidates who ask about compliance — *"Solon's MVP covers campaign intelligence and election day. Compliance tracking is on the roadmap for the 2027 cycle."*

---

## Module 4 — Election Day War Room

> Hardest engineering in MVP. **Take it seriously even if you cut elsewhere.** Trim feature edges, not the core real-time pipeline.

### ✅ Keep

**Internal War Room dashboard**

- Dedicated full-screen War Room view on election day.
- Live constituency map.
- Live vote tally per party (from EC8A captures + verified citizen reports).
- PUs reported vs outstanding, % coverage.
- Incident feed sorted by severity.
- Turnout heatmap vs historical baselines.
- AI anomaly flags on PUs whose reported results diverge from model.
- Drill into any PU: source type (agent / citizen / both), confidence score, raw photo evidence.
- Export snapshot PDF of War Room state (legal-challenge use).

**Citizen Reporter mode (publicly accessible)**

- Public link access, OTP-verified phone, no full account required.
- Submit a PU result: select PU from searchable list, photograph EC8A, optional short note.
- Submit incident report: type, location (auto-geotagged), photo/video, optional voice note.
- AI extraction pipeline runs on citizen submissions (same as agent).
- Anonymous submission option (phone hidden from public-facing displays).

**Reconciliation & verification**

- Per-PU side-by-side view of all submissions (agent + citizen) with status: Confirmed / Pending / Disputed.
- Manual verify / reject with required reason.
- Auto-confirm when **2+ independent submissions match** within tolerance.

**Public War Room (opt-in)**

- Candidate toggles public version, OTP confirmation required.
- Configure what public sees: tallies only / tallies + incidents / full dashboard.
- Public view shows aggregated tallies, % reporting, anonymised incident map, last-updated timestamp.
- Public view never exposes: agent identities, citizen phone numbers, internal AI predictions, unverified single-source submissions.
- Public can view without account + share permalink.

### ✅ Keep (additional — promoted from "trim" per PM)

- **AI War Room copilot — freeform Q&A with strict grounding. (PM-decided: keep freeform.)**
  Full freeform natural-language Q&A over war-room data. **Required engineering safeguards on the freeform path:**
  - **Data-coverage gate** on every answer: refuse / hedge when PU reporting coverage is below a configured threshold for the queried scope.
  - **Coverage indicator** rendered with every answer ("based on 312 of 540 PUs reporting · 58%").
  - **Source citations** on every numeric claim — every figure links back to the underlying submissions / reconciliation rows.
  - **Refusal vocabulary** for unanswerable / out-of-scope / insufficient-data cases. The copilot must say "I don't have enough data to answer" in those cases, not extrapolate.
  - **Pre-launch eval set** of 200+ representative election-day queries with expected behaviour, run on every model/prompt change.
  - **Legal sign-off** on the disclaimer language attached to every answer.
  - **Roadmap impact:** add 4-6 weeks of LLM hardening + eval work to the M4 timeline.

### ✂️ Trim

- **Citizen submission trust score — signals.**
  Trim to **4 signals**: phone number history, geotag plausibility, image hash dup-detect, corroboration count from same PU. **Cut "image authenticity checks"** (deepfake / manipulation detection).
  *Why:* Image authenticity vendors are immature and noisy. The four kept signals catch the realistic abuse patterns (spam, off-location reports, dup-flooding).

### ❌ Removed from MVP

- **USSD access for Citizen Reporter. (PM-decided: cut, flag GTM reach loss.)** Web + SMS only in v1. See [`skipped-mvp-features.md`](skipped-mvp-features.md).
  - **GTM ask:** position the reach loss honestly — feature-phone-only citizens won't be able to submit until USSD ships in v1.1.

### 🕓 Deferred to v2

See [`skipped-mvp-features.md`](skipped-mvp-features.md) for the M4 deferred list.

---

## Cross-cutting MVP requirements (apply to every shipped module)

### ✅ Keep all

- Mobile browser support at minimum (agent app native; everything else responsive web).
- 2G/3G operation with offline submission queueing for agent + citizen flows.
- UI language switch: English + Nigerian Pidgin minimum (Hausa/Yoruba/Igbo deferred for UI — already in spec).
- NDPR-aligned audit log of every data access + admin action.
- Per-campaign data export at any time.
- Per-campaign deletion request within 30 days of election conclusion.

---

## Summary table — locked MVP scope

| Module | Status | ✅ Keep | ✂️ Trim | ❌ Removed | 🕓 Deferred |
| --- | --- | --- | --- | --- | --- |
| M0 — Simulator | shipping | ~32 sub-features | 2 | 0 | 6 |
| M1 — Voter Data | shipping | ~14 sub-features | 2 | 1 | 5 |
| M2 — Agents | shipping | ~14 sub-features | 3 | 1 | 5 |
| M3 — Finance | **skipped** | — | — | entire module | — |
| M4 — War Room | shipping | ~23 sub-features (incl. freeform copilot) | 1 | 1 | 5 |

Removed / deferred / skipped items are catalogued in [`skipped-mvp-features.md`](skipped-mvp-features.md).

---

## Decisions log (PM, post-review)

| # | Topic | PM call | Engineering view |
| --- | --- | --- | --- |
| 1 | M0 NL copilot UX | Best-guess + warning banner | Agreed; locked. |
| 2 | M1 message-gen languages | English only | Locked, but flagged: Pidgin was low-cost; English-only narrows the field-CM persona. GTM should know. |
| 3 | M2 task dispatch | Ship simplified shared list | Locked. |
| 4 | M3 Finance module | Skip entirely in MVP | Locked. Saves ~6-10 weeks; GTM gets a stock answer. |
| 5 | M4 USSD | Cut; GTM flags reach loss | Locked. |
| 6 | M4 freeform copilot | Keep freeform, strict grounding | Locked **with conditions** (data-coverage gate, citations, refusal vocab, eval set, legal sign-off). Adds 4-6 weeks to M4. |
