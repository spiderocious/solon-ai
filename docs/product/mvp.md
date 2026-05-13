# Solon — MVP Feature Spec

**Political intelligence & campaign platform for Nigeria.**

Named after Solon of Athens (c. 630–560 BCE), one of the Seven Sages of Ancient Greece and the political reformer whose laws laid the groundwork for Athenian democracy. The name signals wisdom, reform, and political neutrality — Solon famously refused to make himself king when given the chance.

Palette:

Primary: Deep Forest Green (#1B4332 or #2D5A3D)
Accent: Cream (#F5EFE0) or Soft Ivory
Highlight: Burnt Orange (#C7522A) for alerts/CTAs only
Neutrals: Charcoal, off-white

Font:  Fraunces + Inter

---

User stories for the v1 (Minimum Viable Product) of each module. The Simulator (Module 0) is the entry-point product; Modules 1–4 are the operational campaign stack. Anything not listed here is deferred to v2.

User roles referenced:
- **Aspirant** — considering running, not yet a declared candidate (Simulator-only)
- **Strategist** — party official, consultant, or analyst using the Simulator without running a campaign
- **Candidate** — the politician themselves, declared and running
- **Campaign Manager (CM)** — top operational lead
- **Ward/LGA Coordinator** — mid-level field lead
- **Agent** — polling-unit agent on election day
- **Citizen Reporter** — non-affiliated public user (War Room only)
- **Finance Officer** — money handler
- **Admin** — platform-side super user

---

## Module 0 — Election Simulator (Flagship / Entry Product)

Pre-campaign and strategic planning tool. Lower data-handling risk than the operational modules, broader buyer base (aspirants, strategists, party officials, consultancies, media), and the natural funnel into Modules 1–4. No voter-level data, no money flows — only aggregate models built on public electoral and demographic data.

### Onboarding & access

- As an Aspirant or Strategist, a user can sign up with a phone number and email — **no candidate verification required** at this stage (lower friction than the campaign modules).
- A user must select a **user type** (Aspirant, Strategist, Consultancy, Journalist, Researcher, Party Office) which determines available features and pricing tier.
- A user must accept a **Simulator Use Agreement** acknowledging that outputs are probabilistic estimates, not predictions, and must not be presented publicly as official forecasts without disclosure.

### Race & scenario setup

- As a user, a user can **select a race** to simulate by: office (President / Governor / Senate / House of Reps / State Assembly), state, and constituency where applicable.
- A user will be able to view the **baseline scenario** for that race — the model's current best-estimate outcome using the most recent available data, with projected vote share per party and a confidence interval.
- A user can see, on the baseline view: the top 5 variables driving the projection (e.g., incumbent advantage, demographic shift, 2023 turnout pattern, party defection signal) ranked by impact.

### Scenario building — candidate matchups

- As a user, a user will be able to define **up to 4 candidates** per race with attributes: party, age, gender, religion, ethnicity, state/LGA of origin, incumbency status, prior office held, godfather/backer affiliation (optional), and known issue platform tags.
- A user can mark any candidate as a **real person** (selected from a database of declared/likely candidates the platform maintains) or as a **hypothetical profile**.
- The system must run the simulation and return projected vote share per candidate with a confidence band, plus a written one-paragraph explanation of why the result lands where it does.

### Scenario building — structural variables

- As a user, a user can adjust the following levers and re-run:
  - **Overall turnout** (±X% from baseline)
  - **Turnout by demographic** (youth, women, specific ethnoreligious blocks, urban vs rural)
  - **Party alliance / coalition** (e.g., merge Party A and Party B votes in this race)
  - **Candidate withdrawal** (remove a candidate; redistribute their projected votes based on second-preference models)
  - **Defection** (sitting officeholder switches party — model the carry-over of their personal vote)
  - **Boundary changes** (apply pending ward/LGA delimitation if available)
  - **BVAS / accreditation failure** (model impact of X% of polling units failing to record)
- A user will be able to see each lever's **isolated impact** vs combined impact when multiple are stacked.

### Scenario building — issue shocks

- As a user, a user can apply pre-defined **issue shock scenarios**: fuel subsidy collapse, security incident in constituency, currency crash, major endorsement (e.g., NLC, CAN, JNI), viral scandal involving a named candidate, ethnic/religious flashpoint.
- A user can adjust the **severity (1–5)** and **decay rate** (how fast public attention fades) for each shock.
- The system must show the projected vote-share movement attributable to the shock with a written rationale.

### Outputs & deliverables

- As a user, a user will be able to view simulation outputs as: vote share bar chart, polling-unit-level map (where data supports it), demographic crosstabs, and a plain-language summary.
- A user can **save any scenario** with a name and notes, and **compare up to 4 saved scenarios side by side**.
- A user will be able to **export a scenario report as PDF** branded for their organisation, with a mandatory footer disclosing model assumptions and confidence limits.
- A user must see a **confidence indicator** (High / Medium / Low) on every projection based on data coverage for that constituency and the magnitude of departures from baseline.

### AI scenario copilot

- As a user, a user will be able to **describe a scenario in natural language** ("what happens in Anambra Central if Soludo backs the LP candidate and APGA fields a weak alternative?") and the AI must convert it into structured scenario inputs and run the simulation.
- A user can ask **follow-up questions** in plain language ("why did the model give LP a 6-point bump?" / "what would it take to flip this race?") and receive grounded explanations tied to the underlying model features.
- The AI must refuse to answer questions that would require individual voter data, and must flag when a user is pushing the model beyond its confidence range.

### Ethical guardrails (non-negotiable in MVP)

- The system must **not generate or recommend voter suppression scenarios** (e.g., "show me how to depress turnout in opposition wards"). Such queries must be blocked and logged.
- A user must not be able to model scenarios using **individually identifiable voter data** — only aggregate demographic levers are exposed.
- Every exported report must include a **standardised disclosure**: model name, data sources, last updated date, confidence band, and a statement that outputs are not endorsements or predictions.
- All scenario activity is logged for audit, and the platform reserves the right to suspend accounts running adversarial or manipulative simulation patterns.

### Upsell path to campaign modules

- As an Aspirant who decides to run, a user will be able to **convert their account to a Candidate account** in one step, importing their constituency, baseline scenario, and saved analyses into Module 1 (Voter Data & Segmentation).
- A user who upgrades must complete the full candidate verification flow described in Module 1.

### What's deferred to v2

Multi-race national rollup ("what does the Senate look like under scenario X?"), real-time scenario updates as news breaks, automated daily scenario re-runs, scenario marketplaces (strategists publishing scenarios for others to fork), counterfactual historical scenarios ("what if Atiku had run with X running mate in 2019?"), polling integration (uploading proprietary poll data to refine the model).

---

## Module 1 — Voter Data & Segmentation

### Onboarding & access

- As a Candidate, a user can sign up by selecting their **office sought, state, and constituency**, and must verify their identity with a valid Nigerian ID (NIN or INEC candidate registration receipt) before accessing constituency data.
- As a Campaign Manager, a user will be able to invite team members by phone number or email and assign them roles (CM, Coordinator, Analyst, Viewer).
- A user must accept the **Data Use Agreement** (NDPR-aligned) before any voter data is shown.

### Constituency intelligence

- As a Candidate or CM, a user will be able to view a **map of every polling unit in their constituency**, colour-coded by historical results (2015, 2019, 2023).
- A user can click any polling unit and see: registered voter count, BVAS-accredited count, vote totals per party per cycle, and turnout rate.
- A user will be able to filter polling units by **win probability tier** (Strong Hold, Lean Hold, Toss-up, Lean Opponent, Strong Opponent) generated by the AI model.
- A user can view the **top 3 features driving the win-probability score** for any polling unit (e.g., "incumbent advantage, ethnoreligious composition, 2023 turnout drop").

### AI-driven segmentation

- As a CM, a user will be able to view their constituency segmented into **3–5 voter clusters** with auto-generated labels (e.g., "Persuadable urban youth, low-turnout", "Rural party-loyal, high-turnout").
- A user can view each cluster's: estimated size, dominant polling units, top 3 issue concerns (extracted from local-language sources), and recommended outreach channel.
- A user must be able to **download a CSV** of polling units tagged by cluster and priority for offline use by ground staff.

### Message generation

- As a CM, a user can input a **policy point or campaign message** (in English) and the AI will generate up to 5 variants per target cluster.
- A user will be able to specify the output language: **English, Hausa, Yoruba, Igbo, or Nigerian Pidgin.**
- A user can rate each variant (👍 / 👎) and the system must store ratings to improve future generations for that campaign.
- A user must see a **disclaimer flag** if a generated message contains claims that the AI cannot verify against the candidate's stated platform.

### Issue salience monitor

- As a Candidate or CM, a user will receive a **weekly digest** of the top 10 issues being discussed in their constituency, sourced from radio call-in transcripts, Nairaland, public X posts, and public WhatsApp channels.
- A user will be able to see, for each issue: trend direction (rising / steady / falling), sentiment (positive / neutral / negative toward incumbent), and 2–3 verbatim quotes (anonymised).
- A user can click any issue to see source breakdown and a suggested response talking point.

### What's deferred to v2

Synthetic persona testing, integrated outbound SMS/WhatsApp, A/B testing infrastructure, real-time message performance dashboards, individual voter records.

---

## Module 2 — Agent & Volunteer Coordination

### Recruitment & assignment

- As a CM, a user can create an **agent roster** by uploading a CSV or adding individuals manually with name, phone, NIN (optional), LGA, and assigned polling unit.
- A user will be able to send each agent a **WhatsApp/SMS invite link** that opens the agent mobile app and pre-fills their assignment.
- As an Agent, a user must complete a **3-step verification** (phone OTP, selfie, geotag of home address) before being activated.
- As a CM, a user can view the **agent coverage map** showing which polling units have a confirmed agent vs gaps.

### Training & readiness

- As an Agent, a user will be able to access **mandatory training modules** (5–10 minute videos + quiz) in their preferred language before election day.
- A user must score at least 70% on the readiness quiz to be marked "Election Ready" — agents below this threshold are flagged to the CM.
- As a CM, a user can view a **readiness dashboard** showing % of agents trained, % verified, % with working data plan (via a self-reported check).

### Election day — Form EC8A capture

- As an Agent, a user can **photograph the official polling unit result sheet (Form EC8A)** within the app and submit it.
- The AI must extract: polling unit code, registered voters, accredited voters, votes per party, total valid votes, rejected votes, and signatures present (yes/no).
- A user will be able to **review and correct** the AI-extracted values before submitting.
- The system must flag any sheet where: totals don't reconcile, vote counts exceed accredited voters, handwriting suggests alteration, or the image quality is below threshold.
- As a CM, a user can view all submitted forms and their flag status from a single dashboard.

### Voice & incident reporting

- As an Agent, a user will be able to **record a voice note in any Nigerian language** to report an incident, and the AI must transcribe and structure it into: incident type (violence, BVAS failure, vote-buying, intimidation, other), severity (1–5), location, and recommended action.
- A user can attach a photo or short video to any incident report.
- As a CM, a user will receive a **real-time alert** for any incident rated severity 4 or 5.
- A user can mark any incident as: Acknowledged, Dispatched (legal/security), Resolved, or Escalated.

### Logistics & tasks

- As a Ward Coordinator, a user can **dispatch tasks** to volunteers within their ward (e.g., "deliver materials to PU 008") and see acceptance/completion status.
- As a Volunteer, a user will receive task assignments based on their location, availability, and skills, and can accept or decline.
- A user can mark a task complete with an optional photo proof and geotag.

### What's deferred to v2

Agent reliability/anomaly scoring, full route optimisation, biometric agent check-in, integrated stipend disbursement to agents, multi-day deployment for off-cycle elections.

---

## Module 3 — Finance & Compliance Tracking

### Setup

- As a Candidate or CM, a user can configure their **campaign finance profile**: office sought (sets INEC statutory spending cap), expected campaign duration, and reporting currency (default NGN).
- A user will be able to define **expense categories** matching INEC's reporting buckets (media, transport, logistics, personnel, materials, etc.).
- A user can invite a **Finance Officer** with restricted permissions (view all, edit expenses, no team management).

### Expense capture

- As any team member, a user can **photograph a receipt or voucher** and the AI must extract: vendor name, date, amount, category (suggested), and tax/VAT.
- A user will be able to review, correct, and submit the extracted record, attaching the original image for audit.
- A user must tag every expense with: paying officer, beneficiary (if applicable), LGA, and purpose.
- As a Finance Officer, a user can **approve, reject, or query** any submitted expense and the submitter must receive a notification.

### Donor & income capture

- As a Finance Officer, a user can record incoming donations with: donor name, amount, payment method, date, and donor type (individual, corporate, party).
- The AI must run each donor through a **risk screening**: PEP lists, EFCC/ICPC public records, sanctions lists, and obvious red flags (round-number cash donations near statutory limits).
- A user will be able to see a **risk score (Low / Medium / High)** for every donor with a one-line explanation.
- A user must explicitly **acknowledge any High-risk donor** before the donation is accepted into the books.

### Compliance dashboard

- As a Candidate or CM, a user will be able to see a **live spending dashboard** with: total spent, % of INEC statutory cap used, projected final spend at current burn rate, and days until next reporting deadline.
- A user can view spending broken down by category, LGA, and time period.
- The system must **alert the CM** when spending in any category exceeds 75% of its statutory sub-cap.
- A user will be able to generate a **draft INEC compliance report** (PDF) at any time, pre-filled from logged data.

### Anomaly flags

- The AI must surface a **weekly anomaly report** highlighting: duplicate invoices, vendors used only once for unusually high amounts, expenses with weak documentation, coordinators whose claimed expenses statistically diverge from peers in similar LGAs.
- As a CM, a user can mark each anomaly as: Investigated–OK, Investigated–Action Taken, or Dismissed (with a required note).

### What's deferred to v2

Bank/mobile-money API integration for auto-reconciliation, biometric verification on cash disbursement, multi-currency, commitment-to-budget bridge (rally promise tracking), constituency project CRM post-election.

---

## Module 4 — Election Day War Room (with Citizen Reporting)

This module pulls agent data from Module 2 but is **deliberately structured so non-agent citizens can also contribute reports.** It can be enabled standalone (a campaign that doesn't use the full agent module can still run the War Room with citizen-only data).

### Internal War Room dashboard

- As a Candidate or CM, a user will be able to enter a **dedicated full-screen War Room view** on election day showing a live map of their constituency.
- A user can see, in real time:
  - **Vote tally per party**, aggregated from submitted Form EC8A captures (Module 2) plus verified citizen reports
  - **Polling units reported vs outstanding**, with % coverage
  - **Incident feed**, sorted by severity
  - **Turnout heatmap** comparing live accredited-voter data against historical baselines
  - **AI anomaly flags** highlighting polling units where reported results diverge sharply from model predictions
- A user will be able to **drill into any polling unit** to see: who reported, source type (agent / citizen / both), confidence score, and the raw photo evidence.
- A user can **export a snapshot PDF** of the War Room state at any point (useful for legal challenges).

### AI War Room copilot

- As a CM, a user will be able to **ask natural-language questions** of the War Room data ("which LGAs are underperforming the model?", "show me all severity-5 incidents in the last hour", "what's our projected final margin in Ikorodu?") and receive a structured response with linked source data.
- A user must see a **confidence indicator** on every AI answer based on data coverage and reconciliation status.

### Citizen Reporter mode (publicly accessible)

- As a Citizen Reporter, a user can access the platform via a **public link or USSD code** without creating a full account — only a phone number (OTP-verified) is required.
- A user will be able to **submit a polling unit result** by: selecting their PU from a searchable list, taking a photo of the Form EC8A, and optionally adding a short note.
- A user can submit an **incident report** with: incident type, location (auto-geotagged), photo/video, and an optional voice note in any language.
- The AI must run the same extraction pipeline on citizen-submitted forms as on agent submissions, and assign each submission a **trust score** based on: phone number history, geotag plausibility, image authenticity checks, and corroboration with other reports from the same PU.
- A user must be able to submit anonymously (phone number hidden from public-facing displays).

### Reconciliation & verification

- As a CM, a user will be able to see, per polling unit, **all submissions side-by-side** (agent + citizen) with reconciliation status: Confirmed (match), Pending (only one source), Disputed (conflict).
- A user can manually **mark a submission as verified or rejected** with a required reason.
- The AI must auto-confirm a polling unit's result when **2+ independent submissions match** within a tolerance threshold.

### Public War Room (opt-in transparency mode)

- As a Candidate, a user can **choose to publish a public version** of the War Room with one toggle, and must confirm via OTP.
- A user will be able to configure what the public sees: vote tallies only, or tallies + incidents, or full dashboard.
- The public view must show: aggregated tallies, % polling units reporting, anonymised incident map, and a "last updated" timestamp.
- The public view must **never expose**: agent identities, citizen reporter phone numbers, internal AI predictions, or unverified single-source submissions.
- As any member of the public, a user can view the public War Room without an account and share a permalink.

### What's deferred to v2

Multi-candidate cross-referencing, integration with INEC IReV API (when/if opened), live-streaming embeds, predictive call (declaring winners before INEC), SMS broadcast from War Room to a candidate's supporter base.

---

## Cross-cutting MVP requirements

These apply to every module:

- A user must be able to use the platform on a **mobile browser at minimum** (agent mobile app is native; everything else is responsive web for v1).
- A user must be able to operate the agent and citizen reporter flows on a **2G/3G connection** with offline submission queueing.
- A user must be able to **switch UI language** between English and Nigerian Pidgin at minimum (Hausa/Yoruba/Igbo deferred to v2 for UI; already supported for content generation and voice transcription).
- The system must log every data access and admin action for **NDPR audit compliance**.
- A user (Candidate or CM) can **export all their campaign data** at any time and request full deletion within 30 days of election conclusion.