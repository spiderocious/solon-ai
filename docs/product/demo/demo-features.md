# Solon — Demo Feature Spec

**Purpose:** A fully clickable demo covering all 5 modules. Not a prototype — a working full-stack app with mock data and live LLM calls. Intended for investor pitches, buyer demos, and vision communication.

**Repos:**
- `solon-demo-web` — React frontend
- `solon-demo-api` — Express backend, mock data, one real LLM endpoint (M0 simulator only)

**AFP party colour:** Royal Blue `#1D4ED8` — used in all charts and party badges.

**Palette / fonts:** as per `mvp.md` (Forest Green #1B4332, Cream #F5EFE0, Burnt Orange #C7522A — Fraunces + Inter)

---

## Pre-loaded Demo Context

The entire demo is pre-loaded around one fictional campaign:

| Field | Value |
|---|---|
| Candidate | **Emeka Adeyemi Bello** |
| Party | **AFP — Action For People** |
| Office | President of the Federal Republic of Nigeria |
| Election | 2027 General Election |
| Running mate | TBD (shown as "not yet announced" in the UI) |
| Campaign Manager | Ngozi Eze |

All screens are pre-populated with data for this campaign. Visitors do not need to configure anything — they log in and land directly in the full admin/CM view.

---

## Authentication

A login screen is present — not skipped. This gives investors and buyers the impression of a real, secure product.

- **Login page:** Solon logo, email + password fields, "Sign in" button. Palette-styled, full-screen.
- **Demo credentials shown on screen** in a subtle banner: `demo@solon.ng / demo2027` — so any visitor can log in without being told the password out of band.
- On login: land directly on the **Campaign Dashboard** (admin/CM view — sees everything across all modules).
- No sign-up flow, no onboarding steps, no user-type selection — the demo account is pre-configured as Campaign Manager for Bello 2027.
- A "Demo Mode" pill is pinned to the top bar throughout to make clear this is a demo environment.

---

## Navigation

Persistent left sidebar (desktop) / hamburger (mobile) with:

```
Solon                          [AFP logo pill]
Emeka Adeyemi Bello
President · AFP · 2027
─────────────────────
  Dashboard
  ── M0  Simulator
  ── M1  Voter Intelligence
  ── M2  Agents & Field
  ── M3  Finance
  ── M4  War Room
─────────────────────
  Settings
  Help
```

Each module has its own sub-nav once entered.

---

## Campaign Dashboard (Landing screen post-login)

A single-page overview — the "home base" for the CM. Shows the health of the entire campaign at a glance.

**Panels:**
- **Simulator snapshot** — current baseline projection for Bello (AFP) vs top 3 opponents. Vote share bars, confidence band.
- **Agent readiness** — X of Y agents verified, % election-ready. Link → M2.
- **Finance pulse** — ₦Xbn spent of ₦Ybn statutory cap. % used. Days to next INEC deadline. Link → M3.
- **War Room status** — "Election day not started" with a countdown to Jan 16 2027. Link → M4.
- **Issue alert** — one rising issue this week in a banner (e.g., "Fuel price increase trending in South-West — 3 mentions today"). Link → M1 issue monitor.

---

## Module 0 — Election Simulator

### Sidebar sub-nav
`Baseline · Scenario Builder · Saved Scenarios · Compare`

### Baseline View
- Race pre-selected: **Presidential, 2027, National**
- Projected vote share chart (horizontal bars, branded colours per party):
  - AFP — Emeka Adeyemi Bello: **29%** ± 4pts — *Confidence: Medium*
  - APC — Incumbent: **32%** ± 3pts
  - PDP — Candidate TBA: **26%** ± 5pts
  - LP — Peter Obi (retained): **10%** ± 3pts
  - Others: 3%
- **Top 5 variables driving this projection**, ranked by impact (e.g., incumbent advantage, South-West sentiment shift, youth turnout trajectory, ethnic bloc alignment, economic shock exposure)
- Confidence badge per projection row (High / Medium / Low)
- "Build a Scenario" CTA

### Scenario Builder
Three tabs: **Candidates · Structural Levers · Issue Shocks**

**Candidates tab**
- 4 candidate cards pre-filled (can edit attributes: party, age, gender, religion, ethnicity, state of origin, incumbency, prior office, godfather/backer, issue tags)
- "Real person" vs "Hypothetical" toggle per candidate
- "Run Simulation" button — triggers a 2-second loading animation then returns updated vote share chart + one-paragraph AI rationale

**Structural Levers tab**
- Sliders / toggles for:
  - Overall turnout (−20% to +20% from baseline)
  - Youth turnout (−20% to +20%)
  - Women turnout (−20% to +20%)
  - Urban vs rural weight
  - Party coalition merge (select two parties to merge votes)
  - Candidate withdrawal (select a candidate → second-preference redistribution)
  - Defection (select a sitting officeholder → carry-over % slider)
  - BVAS failure (% of PUs failing accreditation)
- Each lever shows its **isolated impact** (e.g., "+3pts AFP if youth turnout +15%") when hovered
- "Combined impact" toggle to stack all active levers
- Run Simulation CTA

**Issue Shocks tab**
- Pre-defined shock cards:
  - Fuel subsidy collapse
  - Security incident (select region)
  - Currency crash
  - Major endorsement (NLC / CAN / JNI — select one)
  - Viral scandal (select candidate)
  - Ethnic/religious flashpoint (select region)
- Each shock: severity slider 1–5 + decay rate (fast / medium / slow)
- Projected vote-share movement shown per shock before running
- Run Simulation CTA

### NL Scenario Copilot
- Floating input bar at the bottom of the Scenario Builder: *"Describe a scenario in plain English…"*
- Demo pre-fill: *"What happens if the NLC endorses Bello two weeks before the election and APC loses Kano?"*
- On submit: AI parses → shows structured form back with parsed fields highlighted + confidence banner (High / Medium / Low parse confidence)
- "Run this scenario" CTA on the parsed form
- After run: result + rationale paragraph
- **3 canned follow-up question chips** below the result:
  - "Why did AFP get a bump?"
  - "What would flip this race?"
  - "What's the most sensitive lever?"
- Clicking any chip returns a grounded AI answer citing the model's top features

### Saved Scenarios
- List of 4 pre-saved scenarios with names, dates, summary vote share
- "Compare" checkbox on each row

### Compare View
- Side-by-side table of up to 4 saved scenarios
- Vote share per candidate per scenario
- Delta columns (vs baseline)
- Export as PDF button — generates a branded PDF with mandatory disclosure footer

---

## Module 1 — Voter Intelligence

### Sidebar sub-nav
`Constituency Map · Voter Clusters · Message Generator · Issue Monitor`

### Constituency Map
- Full-screen Nigeria map (presidential = national view, broken into states)
- States colour-coded by 2023 presidential result (party that won each state)
- **Win-probability tier overlay toggle**: Strong Hold / Lean Hold / Toss-up / Lean Opponent / Strong Opponent (coloured tiers)
- Click any state → side panel:
  - Registered voters, BVAS-accredited, votes per party (2023), turnout rate
  - Top 3 features driving win-probability score
  - Historical results tabs: 2015 / 2019 / 2023
- Filter bar: filter states by tier, geopolitical zone, registered voter count

### Voter Clusters (National)
- 5 pre-generated national voter cluster cards:
  1. *"Persuadable urban South-West youth — low turnout history"*
  2. *"Rural North-West party-loyal — high turnout, APC-leaning"*
  3. *"South-East mobilised opposition — LP/ADC cross-voters"*
  4. *"Middle Belt swing — security-sensitive, PDP legacy"*
  5. *"Urban North-Central professionals — economy-first, volatile"*
- Each card: estimated size (millions), dominant states, top 3 issue concerns, recommended outreach channel
- "Download CSV" button — returns a mock CSV of states tagged by cluster + priority

### Message Generator
- Policy input field: *"Type a campaign talking point…"*
- Demo pre-fill: *"Bello will restore the fuel subsidy for the poorest 40% of Nigerians"*
- Target cluster selector (dropdown of the 5 clusters above)
- Output language: **English only** (v1 — per features.md decision)
- Submit → 1.5s loading animation → returns 5 **pre-written mock variants** (hardcoded per cluster, selected based on which cluster is chosen)
- 👍 / 👎 rating on each variant (stored in frontend state only, no backend call)
- Disclaimer flag shown on variant 3 of every set: *"This message contains claims that could not be verified against the candidate's stated platform."*

**Pre-written variants for "fuel subsidy / poorest 40%" — Persuadable urban South-West youth cluster:**
1. "Bello's plan puts ₦18,000/month back in the pockets of the 40% who need it most — not oil traders."
2. "While others talk, AFP has a number: 40% of Nigerians get direct subsidy relief from day one."
3. "The subsidy wasn't the problem. Who it went to was. Bello fixes the targeting, not the people." ⚠️ *disclaimer flag*
4. "No more subsidy for the rich. Under AFP, fuel relief goes to those earning below ₦150k/month — automatically."
5. "Bello 2027: restore the subsidy where it belongs — the bottom 40%, verified by BVN."

**Pre-written variants for "fuel subsidy / poorest 40%" — Rural North-West party-loyal cluster:**
1. "Bello ya yi alkawari: tallafin mai zai koma ga talakawa 40% — ba 'yan kasuwa ba."
2. "AFP ta san ciwon talaka. Zai mayar da tallafin man fetur ga waɗanda suka cancanta."
3. "Ba siyasa ba ce — lissafi ne. Kashi 40 cikin ɗari na Najeriya za su sami tallafi kai tsaye." ⚠️ *disclaimer flag*
4. "Bello: man fetur mai araha ga iyalai masu ƙarancin kuɗi — farawa daga rana ta farko."
5. "Tallafi ba ya tafiya zuwa manyan kamfanoni. Yana zuwa gidanku. Wannan alkawarin AFP ne."

*(Same pattern pre-written for remaining 3 clusters — hardcoded in the API mock data file.)*

> ⚠️ **Before first pitch:** Get all Hausa variants reviewed by a native Hausa speaker with political comms experience — not an AI translation check. One hour of their time. A grammatical error or unnatural register caught by a Northern buyer kills credibility instantly.

### Issue Monitor
- **Weekly digest** card: "Top 10 issues this week — National"
- Each issue row: issue name, trend arrow (↑ rising / → steady / ↓ falling), sentiment toward Tinubu administration (positive / neutral / negative), 2 anonymised verbatim quotes
- Click any issue → expanded panel: source breakdown (X, Nairaland proportions), suggested response talking point
- Sources shown: X (Twitter) + Nairaland (per features.md trim decision)

---

## Module 2 — Agents & Field

### Sidebar sub-nav
`Roster · Coverage Map · Readiness · Election Day`

### Roster
- Table of 30 mock agents: name, phone, LGA assigned, PU assigned, verification status (Verified / Pending / Failed), readiness (Election Ready / Not Ready)
- "Add Agent" button → manual entry form (name, phone, NIN optional, LGA, PU)
- "Upload CSV" button → shows a mock upload success with 5 agents added
- "Send Invite" button per row → shows a toast: "WhatsApp invite sent to +234…"
- Filter by LGA, status, readiness

### Coverage Map
- **National Nigeria map** showing all 36 states + FCT, with Kano state highlighted/zoomed as the example drill-in state.
- State-level dots coloured by coverage density (green = good coverage, red = gap)
- Drill into Kano: PU-level pins showing:
  - Green pins: PUs with a confirmed, verified agent
  - Orange pins: PUs with an unverified agent
  - Red pins: PUs with no agent assigned
- Summary stat: "1,240 of 176,846 PUs have a confirmed agent (0.7%)"
- Click any pin → agent name, status, last active

### Readiness Dashboard
- Stat cards:
  - % agents trained (mock: 68%)
  - % agents verified (mock: 54%)
- Agent list filtered to "Not Election Ready" — flagged to CM
- "Send reminder" bulk action

### Election Day (EC8A Capture demo)
- One pre-loaded submitted EC8A form with:
  - Photo of a mock result sheet
  - AI-extracted values shown alongside: PU code, registered voters, accredited voters, votes per party, total valid, rejected, signatures present
  - One field flagged: "Votes cast (847) exceeds accredited voters (801) — review required"
  - Agent review + correct UI: editable fields, "Confirm & Submit" CTA
- CM dashboard panel showing all submitted forms, flag count, % reconciled

### Incident Report (demo)
- One pre-loaded incident: "Vote buying reported — Kano Municipal, Severity 4"
- Shows transcribed voice note + structured fields (type, severity, location, recommended action)
- Attached photo shown
- CM action buttons: Acknowledged / Dispatched / Resolved / Escalated

---

## Module 3 — Finance & Compliance

> Module 3 is shown in the demo to communicate the full vision. The demo UI must display a **"Coming Q3 2027 — join the beta"** label on the M3 sidebar entry and as a banner at the top of every M3 screen, so buyers who ask about timeline get a crisp answer rather than an evasive one.

### Sidebar sub-nav
`Dashboard · Expenses · Donors · Compliance Report`

### Dashboard
- Live spending panel:
  - Total spent: ₦1.2bn of ₦5bn INEC cap (24%)
  - Projected final spend at current burn rate: ₦4.1bn
  - Days to next INEC reporting deadline: 47
  - Spending by category (bar chart): Media, Transport, Logistics, Personnel, Materials
  - Spending by geopolitical zone (map)
- Alert banner: "Media spend at 78% of sub-cap — approaching limit"

### Expenses
- Expense table with 20 mock entries: date, vendor, category, LGA, amount, status (Approved / Pending / Flagged)
- "Add Expense" → plain form (vendor name, date, amount, category dropdown, LGA, purpose) → Submit appends a new row to the table with status "Pending". No OCR, no file upload.
- Weekly anomaly report panel: one flagged item ("Vendor XYZ: single invoice ₦48m — unusually high for one-time vendor")

### Donors
- Donor table: 15 mock donors, risk score column (Low / Medium / High)
- One donor flagged High risk — CM must acknowledge before accepting
- Risk explanation shown: "Donor appears on EFCC public watchlist — further verification required"

### Compliance Report
- "Download Draft INEC Report" button → immediately downloads a **pre-built branded PDF** (static file served from the API). No generation, no processing delay.
- PDF contains: campaign name, office, spending summary table, category breakdown, INEC cap vs actual, mandatory disclosure footer, Solon branding.

---

## Module 4 — War Room

### Sidebar sub-nav
`Live Dashboard · Citizen Reporter · Reconciliation · Public View`

### Live Dashboard (simulated election day)
- Full-screen dark-mode war room view
- **"Simulated Election Day" toggle** at the top — always on in the demo regardless of real date. This means the War Room shows live activity whether you're demoing in June 2026 or December 2026 without needing to explain why nothing is live.
- Live Nigeria map with PU-level dots animating in as "reports received"
- Running vote tally per party (numbers ticking up every few seconds — simulated)
- Stat bar at top: "312 / 176,846 PUs reporting · 0.18% · Last update: just now"
- Incident feed (right panel): sorted by severity, live-ish (new incidents appearing every ~30s)
- Turnout heatmap toggle: live accredited vs 2023 baseline, colour-coded delta
- AI anomaly flag banner: "3 PUs in Kano showing results diverging >15% from model — review"
- Click any PU dot → drill-in panel: source type (agent / citizen / both), confidence score, photo evidence thumbnail, reconciliation status

### AI War Room Copilot
- Chat panel (slide-in from right)
- Pre-loaded demo exchange visible on open:
  - Q: *"Which states are underperforming the model right now?"*
  - A: Structured response listing 3 states with delta figures, source coverage %, linked to underlying PU data
  - Coverage indicator shown: "Based on 312 of 176,846 PUs reporting · 0.18% — treat this as very early signal"
- Input box for live typing — **fuzzy-matched against a pre-written Q&A bank** (no LLM call); closest match returned after a 2s loading animation
- Every numeric claim in AI answer links to the relevant mock PU row in the reconciliation table

**Pre-written Q&A bank (hardcoded in API mock):**

| Trigger keywords | Response shown |
|---|---|
| underperform / model / behind | "Kano (−6pts vs model), Rivers (−4pts), Borno (−9pts, but only 3 PUs reporting). Coverage on these states is below 5% — treat as early signal." |
| severity / incident / serious | "2 severity-5 incidents in the last hour: vote-buying allegation at Kano Municipal PU 014 (unverified, 1 source) and BVAS failure at Surulere Ward 3 PU 008 (confirmed, agent + citizen). Legal has been notified on the second." |
| margin / projected / win / final | "Based on current 0.18% reporting: AFP 33%, APC 31%, PDP 21%, LP 13%. Margin within noise — do not read into this yet. Check back when coverage exceeds 10%." |
| Ikorodu / Lagos / south-west | "Ikorodu: 4 of 12 PUs reporting. AFP 38%, APC 29%. Strong Hold tier — holding. Turnout tracking 3pts above 2023 baseline in this area." |
| turnout / accreditation | "National accreditation so far: 847 voters across 312 PUs — too early for a turnout projection. North-West PUs are running 12% below 2023 accreditation pace at this hour." |
| anything else | "I don't have enough data to answer that confidently yet. Ask me again when reporting coverage is above 10%." |

### Citizen Reporter
- "Public link" shown: `solon.ng/report/adekunle2027` (mock)
- Demo walkthrough panel showing the citizen flow:
  1. Enter phone → OTP verified
  2. Select PU from searchable list
  3. Photograph EC8A
  4. Optional note
  5. Submit → trust score assigned (shown: 72 / 100 — "Corroboration pending")
- Anonymous toggle shown

### Reconciliation
- Per-PU table: PU name, agent submission, citizen submission(s), status (Confirmed / Pending / Disputed)
- One disputed PU shown: agent says APC 142 / AFP 98; citizen says APC 120 / AFP 115
- Manual verify / reject with reason field
- Auto-confirmed PUs shown with green badge

### Public War Room
- Toggle: "Publish public view" → OTP confirmation dialog
- Configure panel: tallies only / tallies + incidents / full dashboard
- Preview of public view (read-only, no agent names, no phone numbers, no AI predictions, no single-source unverified data)
- "Copy permalink" button

---

## Cross-cutting Demo Details

**"Demo Mode" pill** — always visible top-right. On click: tooltip explaining "This is a demonstration environment. All data is fictional."

**Mobile responsive** — every screen works on mobile. The demo should be shareable as a link and work on a phone for a buyer who opens it during a meeting.

**Loading states** — every AI call and simulation run should have a realistic loading animation (1.5–3 seconds). Instant results feel fake. Slow results feel real.

**Toast notifications** — use sparingly but present: "Scenario saved", "Invite sent", "Report exported", etc.

**Error states** — at least one visible error state in the demo (e.g., the flagged EC8A form) so it doesn't look like a toy.

**No real voter data** — all constituency data, voter counts, and results are fictional but plausible for Nigeria. State names and geopolitical zones are real.

---

## What the demo does NOT include

- Real sign-up / user management
- Real payment / billing
- Real NDPR data handling
- Real SMS / WhatsApp sending
- Real INEC data
- Multi-tenant isolation (only one campaign pre-loaded)
- The upsell flow (Aspirant → Candidate conversion)
