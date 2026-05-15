# Solon Demo API — Test Report

**Date:** 2026-05-15  
**Environment:** Local (`http://localhost:3001/api/v1`)  
**Total tests:** 40  
**Passed:** 39 &nbsp;|&nbsp; **Failed:** 1 (environment only)

> **Re-test note (2026-05-15):** BUG-01 and BUG-02 were fixed and verified. BUG-03 is a missing env variable, not a code defect.

---

## What Works

- `GET /health` — returns full service metadata including `service`, `env`, and `time`.
- `POST /admin/setup` — correctly seals after first use; returns `403 admin_setup_disabled` on repeat calls.
- `POST /admin/login` — issues valid JWTs; rejects wrong passwords with `401 invalid_credentials`.
- `POST /sessions` — creates sessions with prefixed IDs (`ses_...`).
- `PATCH /sessions/:id/ping` — appends pages to the trail; returns `404` for unknown session IDs.
- `POST /leads` (with contact) — captures name, email; returns `ld_...` ID.
- `POST /leads` (skipped) — accepts `skipped: true` with no contact fields.
- `POST /feedback` — accepts rating 1–5, comment up to 2000 chars, returns `fb_...` ID.
- `POST /feedback` validation — rejects `rating > 5` and `comment > 2000 chars` with correct `field_errors`.
- All 15 `GET /mock/:key` endpoints — return `200` for every valid key.
- `GET /mock/nonexistent.key` — returns `404 not_found` with the key name in the message.
- `voter_intelligence.constituency_map` shape — returns exactly 37 states, each with `name`, `zone`, `registered_voters`, `turnout_2023`, `winner_2023`, `afp_tier`.
- `POST /simulator/run` validation — rejects unknown scenarios with `400 validation_error` and lists all 6 valid enum values in the error message.
- `POST /simulator/followup` — returns canned keyword-matched answers without requiring OpenAI (tested: "What about Kano?" → references NNPP / 7.8M voters).
- `POST /simulator/followup` validation — rejects questions shorter than 3 chars with `400 validation_error`.
- `GET /admin/stats` — returns session, lead, and feedback counts plus recent lead list.
- `GET /admin/sessions` — returns sessions with `pageTrail` arrays reflecting actual navigation.
- `GET /admin/feedback` — returns all feedback entries with full fields.
- `GET /admin/mock-data` — returns exactly 4 editable keys: `simulator.baseline`, `agents.readiness`, `finance.dashboard`, `warroom.tally`.
- `PATCH /admin/mock-data/simulator.baseline` — updates stored values; immediately reflected by subsequent `GET /mock/simulator.baseline`.
- `PATCH /admin/mock-data/candidate.profile` — correctly blocked with `403 mock_key_not_editable`.
- `PATCH /admin/mock-data/:key` without token — returns `401 unauthorized`.
- Auth guard (no token) — `401 unauthorized` with message "Missing token".
- Auth guard (bad token) — `401 unauthorized` with message "Invalid or expired token".
- Auth guard (empty bearer) — `401 unauthorized` treated same as no token.

---

## Bugs

### ~~BUG-01~~ FIXED — `simulator.baseline` loses `candidates` and `top_variables` after any PATCH

**Severity:** High  
**Endpoint:** `GET /mock/simulator.baseline` (after any `PATCH /admin/mock-data/simulator.baseline`)  
**Status:** ~~Reproducible~~ **Fixed and verified** — PATCH now uses dot-notation `$set` paths so unspecified fields are preserved

**What happens:**  
`GET /mock/simulator.baseline` returns a data object missing `candidates` (array of 5) and `top_variables` (array of 5). Both are completely absent from the response. `bello_share` is present.

**Root cause:**  
`PATCH /admin/mock-data/:key` performs a **full replace** of the `data` field, not a deep merge. When an admin patches only `{ "bello_share": 35.0, "opposition_share": 30.0 }`, the stored record is replaced with just those two fields. The full seed shape — which includes `candidates` and `top_variables` — is lost.

**Confirmed in seed:** `seeds/mock-data.json` has the correct full shape including 5 candidates and 5 top_variables. The data is present at seed time but gets destroyed on first partial PATCH.

**Impact:**  
The simulator UI depends on `candidates` to render the vote-share bar chart and `top_variables` to render the swing variables panel. Both will render empty or crash after any admin edit of this key.

**Fix options:**
- Implement deep merge on PATCH so unspecified fields are preserved (preferred).
- Or: document that PATCH requires the complete `data` payload and enforce it with schema validation — but this is a worse DX.

**Reproduce:**
```bash
# 1. Patch with partial payload
curl -X PATCH http://localhost:3001/api/v1/admin/mock-data/simulator.baseline \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"data":{"bello_share":35.0}}'

# 2. Fetch and observe missing fields
curl http://localhost:3001/api/v1/mock/simulator.baseline
# data.data only has bello_share — candidates and top_variables are gone
```

---

### ~~BUG-02~~ FIXED — `POST /simulator/run` with empty body returns `502` instead of `400`

**Severity:** Medium  
**Endpoint:** `POST /simulator/run`  
**Status:** ~~Reproducible~~ **Fixed and verified** — `scenario` field is now required at the Zod layer; empty body returns `400 validation_error { "scenario": ["Required"] }`

**What happens:**  
Sending `{}` (empty body) to `/simulator/run` returns `502 llm_error` instead of `400 validation_error`. The `scenario` field is required, so this should be caught at the validation layer before any LLM call is attempted.

**Expected:** `400 validation_error` with `field_errors.scenario: ["Required"]`  
**Actual:** `502` — `"Simulation analysis failed. Please try again."`

**Impact:**  
The frontend receives an opaque server error instead of a clear validation message. A user submitting before selecting a scenario would see "Analysis unavailable, try again" — misleading, since the problem is a missing field, not an OpenAI failure.

**Fix:** Add required field validation for `scenario` before the LLM call path. The invalid enum case (`invalid_scenario`) correctly returns `400`, so the enum check works — but the missing field case bypasses it.

**Reproduce:**
```bash
curl -X POST http://localhost:3001/api/v1/simulator/run \
  -H "Content-Type: application/json" \
  -d '{}'
# Returns: {"error":{"code":"llm_error","message":"Simulation analysis failed. Please try again."}}
```

---

### BUG-03 — `POST /simulator/run` (all 6 scenarios) returns `502` when OpenAI key is not configured

**Severity:** Low (environment setup issue, not a code bug)  
**Endpoint:** `POST /simulator/run`  
**Status:** Expected per design — documented as known limitation

**What happens:**  
All valid scenario requests return `502 llm_error` because `OPENAI_API_KEY` is not set in `.env`.

**This is not a code defect.** The 502 path is the documented fallback when OpenAI is unavailable. Listed here because the full scenario flow (vote share math + rationale) could not be validated in this test run. Once the key is configured, this flow should be re-tested against all 6 scenarios to verify:
- Percentages sum to ~100 (`bello_share + opposition_share + undecided_share`)
- `economic_crisis` `bello_share` > `base` `bello_share`
- `scandal` `bello_share` < `base` `bello_share`
- `rationale` is a non-empty string

**Action:** Set `OPENAI_API_KEY` in `apps/solon-demo-api/.env` and re-run Flow 4.

---

## DB Restore

`simulator.baseline` was restored to the full seed shape. To re-seed from scratch:

```bash
mongoimport --db solon_demo --collection mockdatas \
  --file apps/solon-demo-api/seeds/mock-data.json \
  --jsonArray --drop
```

> **Note:** The collection name is `mockdatas` (Mongoose pluralises it automatically). The `qa-handoff.md` previously had this wrong (`mockdata`) — corrected.

