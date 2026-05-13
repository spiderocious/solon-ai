# Solon — Features Skipped, Trimmed, or Deferred from MVP

Companion to [`features.md`](features.md). Every feature in `mvp.md` that is **not** shipping in v1, with the reason and the v1.1+ plan. Use this as the source of truth when prioritising the next release and when answering customer/GTM questions about gaps.

**Section headers**

- 🟥 **Skipped (entire module)** — module dropped from v1.
- ❌ **Removed** — feature dropped from v1; rating UI or shell may remain.
- ✂️ **Trimmed** — feature shipped in v1, but a sub-capability was deferred.
- 🕓 **Deferred (per spec)** — items `mvp.md` already explicitly defers to v2.

---

## Module 0 — Election Simulator

### ❌ Removed from v1

*(none — M0 is the wedge product; full scope shipping.)*

### ✂️ Trimmed in v1

| Trimmed bit | What ships in v1 | What's deferred | v1.1+ plan |
| --- | --- | --- | --- |
| AI scenario copilot — NL input UX | Best-guess parse + warning banner; user reviews structured form before "Run". | Silent auto-run on low-confidence parses. | No change planned — best-guess + banner is the intended steady-state. |
| AI scenario copilot — follow-up Q&A | 3 canned question shapes ("why did X bump?", "what would flip this race?", "what's the most sensitive lever?"). | Freeform follow-up Q&A. | Add freeform after the M4 War Room freeform copilot has proven the grounding pattern. |

### 🕓 Deferred (per `mvp.md`)

- Multi-race national rollup ("what does the Senate look like under scenario X?").
- Real-time scenario updates as news breaks.
- Automated daily scenario re-runs.
- Scenario marketplaces (strategists publishing scenarios for others to fork).
- Counterfactual historical scenarios ("what if Atiku had run with X running mate in 2019?").
- Polling integration (uploading proprietary poll data to refine the model).

---

## Module 1 — Voter Data & Segmentation

### ❌ Removed from v1

| Removed | Why | v1.1+ plan |
| --- | --- | --- |
| Online-learning rating feedback loop on message generation | Per-campaign online learning means per-campaign model state, eval, and rollback story — out of MVP scope. Rating UI stays; ratings route to a manual review queue. | Re-introduce after v1 once we have enough rating data to know which prompts need tuning. Build offline-eval pipeline first. |

### ✂️ Trimmed in v1

| Trimmed bit | What ships in v1 | What's deferred | v1.1+ plan |
| --- | --- | --- | --- |
| Message generation languages | English only. | Nigerian Pidgin, Hausa, Yoruba, Igbo. | Add Pidgin first (cheapest, broadest reach). Hausa / Yoruba / Igbo after a per-language eval set is built. **GTM note:** field-facing CMs in non-English-dominant constituencies will notice. |
| Issue salience sources | X (Twitter) + Nairaland. | Radio call-in transcripts, public WhatsApp channels. | Radio = own infra project (audio ingest + ASR + speaker diarisation). WhatsApp = legally-grey partner work. Tackle once X+Nairaland digest is proven useful. |

### 🕓 Deferred (per `mvp.md`)

- Synthetic persona testing.
- Integrated outbound SMS / WhatsApp send.
- A/B testing infrastructure.
- Real-time message performance dashboards.
- Individual voter records.

---

## Module 2 — Agent & Volunteer Coordination

### ❌ Removed from v1

| Removed | Why | v1.1+ plan |
| --- | --- | --- |
| Logistics & tasks — full accept/decline dispatch system | A real dispatch engine needs scheduling, availability tracking, and skill modelling — a v2 project on its own. Replaced with a simpler shared task list (Coordinator creates → marks done). | Re-introduce when a paying customer demands it or after the first election cycle reveals real dispatch patterns. |

### ✂️ Trimmed in v1

| Trimmed bit | What ships in v1 | What's deferred | v1.1+ plan |
| --- | --- | --- | --- |
| Training modules | 1 video + 1 quiz per agent role; 70% pass threshold. | 5–10 minute videos per role; richer training tracks. | Content production is the bottleneck. Add modules as content team produces them. |
| Voice incident transcription languages | English only. | Pidgin, Hausa, Yoruba, Igbo. | Same trajectory as M1 message-gen languages. Whisper handles Pidgin well at no extra cost — likely the first add-back. **GTM note:** narrows the agent persona we can credibly serve. |
| Readiness dashboard signals | `% trained` + `% verified`. | `% with working data plan` (self-reported). | Not planned. Self-reported flag adds noise without signal. |

### 🕓 Deferred (per `mvp.md`)

- Agent reliability / anomaly scoring.
- Full route optimisation.
- Biometric agent check-in.
- Integrated stipend disbursement to agents.
- Multi-day deployment for off-cycle elections.

---

## Module 3 — Finance & Compliance Tracking 🟥 SKIPPED IN MVP

> **Decision:** entire module deferred. Solon 2026 ships political intelligence (M0/M1) and election operations (M2/M4); compliance tracking ships in a later release ahead of the next cycle.
>
> **Eng savings:** ~6-10 weeks (PEP integration, receipt OCR pipeline, statutory cap engine, INEC PDF templates, donor risk workflow).
>
> **GTM stock answer:** *"Solon's MVP covers campaign intelligence and election day. Compliance tracking is on the roadmap for the 2027 cycle."*
>
> **Cheap optional partial (1 week, not committed):** a single screen — "Log expenses (free-form) + view total vs INEC cap" — with no OCR, no donor side, no anomalies, no PDF. Decide if a paying candidate surfaces the need.

### Full module backlog (for the future release)

**Setup**

- Configure campaign finance profile: office sought → INEC statutory spending cap, expected duration, reporting currency (NGN default).
- Expense categories matching INEC reporting buckets (media, transport, logistics, personnel, materials, etc.).
- Invite Finance Officer with restricted permissions (view all, edit expenses, no team management).

**Expense capture**

- Photograph receipt → AI extracts vendor, date, amount, category, tax/VAT.
- Reviewer edits + submits with original image attached.
- Tag every expense with paying officer, beneficiary, LGA, purpose.
- FO can approve / reject / query any expense; submitter notified.

**Donor & income capture**

- Record incoming donations: donor name, amount, payment method, date, donor type.
- Donor risk score (Low / Medium / High) with explanation.
- Explicit acknowledgement required to accept a High-risk donor.

**Compliance dashboard**

- Live spending dashboard: total spent, % of INEC cap, projected final spend, days until next reporting deadline.
- Breakdowns by category, LGA, time period.
- Alert CM when any category exceeds 75% of statutory sub-cap.
- Generate draft INEC compliance report (PDF), pre-filled from logged data.

**Anomaly flags**

- Weekly anomaly report (duplicate invoices, single-use high-value vendors, weak-doc expenses).
- Mark anomaly: Investigated–OK / Investigated–Action Taken / Dismissed (note required).
- Peer-divergence anomaly type (needs multi-campaign peer data — won't be available even in v1.1; pushed further).

**Other**

- Multi-currency reporting (NGN default; USD/GBP added only if a paying customer asks).

### 🕓 Already deferred (per `mvp.md`, will stay deferred even after M3 lands)

- Bank / mobile-money API integration for auto-reconciliation.
- Biometric verification on cash disbursement.
- Commitment-to-budget bridge (rally promise tracking).
- Constituency project CRM post-election.

---

## Module 4 — Election Day War Room

### ❌ Removed from v1

| Removed | Why | v1.1+ plan |
| --- | --- | --- |
| USSD access for Citizen Reporter | Each telco partner (MTN / Glo / Airtel / 9mobile) is a 6-12 week procurement; not a feasible MVP path. Web + SMS only in v1. | Re-add once a single telco partnership exists. **GTM note:** feature-phone-only citizens won't be able to submit in v1 — flag the reach loss in pitch. |

### ✂️ Trimmed in v1

| Trimmed bit | What ships in v1 | What's deferred | v1.1+ plan |
| --- | --- | --- | --- |
| Citizen submission trust score signals | 4 signals — phone number history, geotag plausibility, image hash dup-detect, corroboration count from same PU. | Image authenticity / deepfake detection. | Re-evaluate as image-authenticity vendors mature. Likely v2+. |

### ✅ Kept *with conditions* (was originally a trim — PM overrode)

- **Freeform AI War Room copilot.** Shipping freeform NL Q&A over war-room data. **Pre-launch eng conditions are non-negotiable:**
  - Data-coverage gate on every answer (refuse / hedge when coverage < threshold).
  - Coverage indicator rendered with every answer.
  - Source citations on every numeric claim.
  - Refusal vocabulary for insufficient-data cases.
  - 200+ query eval set, run on every model/prompt change.
  - Legal sign-off on the disclaimer attached to every answer.
  - Adds 4-6 weeks to the M4 timeline.

### 🕓 Deferred (per `mvp.md`)

- Multi-candidate cross-referencing.
- Integration with INEC IReV API (when/if opened).
- Live-streaming embeds.
- Predictive call (declaring winners before INEC).
- SMS broadcast from War Room to a candidate's supporter base.

---

## Cross-cutting items deferred

These are spec-level cross-cutting concerns that are explicitly partial in v1:

| Concern | v1 scope | v1.1+ |
| --- | --- | --- |
| UI language switch | English + Nigerian Pidgin only. | Hausa / Yoruba / Igbo UI strings. Content generation languages move separately (see M1). |
| Agent native app | Native mobile app for agents only; everything else is responsive web. | Native apps for CM / Coordinator / Citizen are not planned for v1.1 — responsive web continues to serve them. |
| Audit log retention | Default 7-year retention on `audit.events`. | Configurable per-campaign retention windows. |

---

## Summary — what's not in MVP

| Source | Count |
| --- | --- |
| 🟥 Entire module skipped | 1 (M3 Finance) |
| ❌ Features removed from v1 | 3 (M1 online-learning loop, M2 dispatch, M4 USSD) |
| ✂️ Features trimmed in v1 | 8 sub-feature reductions across M0 / M1 / M2 / M4 |
| 🕓 Spec-deferred items | 26 items across all five modules |

**Engineering effort saved by these cuts:** ~12-16 weeks (the dominant savings is M3 at ~6-10 weeks and M2 dispatch at ~2 weeks).

**Engineering effort added by PM overrides:** ~4-6 weeks (M4 freeform copilot hardening).

**Net:** ~8-10 weeks shaved off the spec-as-written MVP timeline.

---

## How this list gets updated

- New deferrals land here, not in `features.md`.
- When a deferred item is committed to a release, move it back to `features.md` and delete it from this file (don't dual-source).
- The decisions log lives in `features.md`. Use that as the change history for *why* items are in this file.
