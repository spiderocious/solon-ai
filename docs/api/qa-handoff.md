# Solon Demo API — QA & Frontend Handoff

This document is the complete handoff for testing and frontend integration of `solon-demo-api`.

**API Reference:** See `docs/api/reference.md` for full endpoint specs.  
**Seed data:** See `apps/solon-demo-api/seeds/README.md` for import instructions.

---

## Environment Setup

1. Copy `.env.example` to `.env` in `apps/solon-demo-api/`
2. Set all required variables (see table below)
3. Import seed data: `mongoimport --db solon_demo --collection mockdatas --file seeds/mock-data.json --jsonArray --drop`
4. Run: `pnpm nx dev solon-demo-api`

### Required `.env` Variables

| Variable | Example | Notes |
|---|---|---|
| `MONGODB_URI` | `mongodb://localhost:27017/solon_demo` | Local MongoDB |
| `JWT_SECRET` | any 32+ char string | Keep secret |
| `JWT_EXPIRES_IN` | `7d` | Default fine |
| `OPENAI_API_KEY` | `sk-...` | Required for simulator |
| `OPENAI_MODEL` | `gpt-4o-mini` | Default fine |
| `APP_BASE_URL` | `http://localhost:3001` | |
| `CORS_ORIGIN` | `http://localhost:5173` | Frontend origin |
| `PORT` | `3001` | |

---

## Test Flows

### Flow 1 — Admin First-Run Setup

1. `GET /api/v1/health` → expect `{ "data": { "status": "ok" } }`
2. `POST /api/v1/admin/setup` with `{ "email": "admin@test.com", "password": "password123" }`
   - Expect 201 with `token` and `adminId`
3. `POST /api/v1/admin/setup` again with same or different body
   - Expect **403** `admin_setup_disabled`
4. `POST /api/v1/admin/login` with wrong password
   - Expect **401** `invalid_credentials`
5. `POST /api/v1/admin/login` with correct credentials
   - Expect **200** with `token`
6. Store token for all subsequent admin tests

### Flow 2 — Session + Lead Capture

1. `POST /api/v1/sessions` with `{ "userAgent": "Chrome/120" }`
   - Expect 201 with `sessionId`
2. `PATCH /api/v1/sessions/{sessionId}/ping` with `{ "page": "/login" }`
   - Expect 200
3. `PATCH /api/v1/sessions/{sessionId}/ping` with `{ "page": "/dashboard" }`
4. `POST /api/v1/leads` with `{ "sessionId": "{sessionId}", "name": "Test User", "email": "test@test.com", "skipped": false }`
   - Expect 201 with `leadId`
5. `POST /api/v1/leads` with `{ "sessionId": "{sessionId}", "skipped": true }`
   - Expect 201 (skip is valid)
6. `PATCH /api/v1/sessions/nonexistent_id/ping`
   - Expect **404** `not_found`

### Flow 3 — Mock Data Reads

Test each key returns valid data:

```
GET /api/v1/mock/simulator.baseline         → 200
GET /api/v1/mock/simulator.saved_scenarios  → 200
GET /api/v1/mock/voter_intelligence.constituency_map → 200
GET /api/v1/mock/voter_intelligence.clusters → 200
GET /api/v1/mock/voter_intelligence.message_variants → 200
GET /api/v1/mock/voter_intelligence.issue_monitor → 200
GET /api/v1/mock/agents.readiness           → 200
GET /api/v1/mock/agents.election_day        → 200
GET /api/v1/mock/agents.incidents           → 200
GET /api/v1/mock/finance.dashboard          → 200
GET /api/v1/mock/finance.expenses           → 200
GET /api/v1/mock/finance.donors             → 200
GET /api/v1/mock/warroom.tally              → 200
GET /api/v1/mock/warroom.reconciliation     → 200
GET /api/v1/mock/candidate.profile          → 200
GET /api/v1/mock/nonexistent.key            → 404 not_found
```

Verify shape of `simulator.baseline`:
- `data.candidates` is array of 5
- `data.top_variables` is array of 5
- `data.bello_share` is number

Verify shape of `voter_intelligence.constituency_map`:
- `data.states` is array of 37 (36 states + FCT)
- Each state has `name`, `zone`, `registered_voters`, `winner_2023`, `afp_tier`

### Flow 4 — Simulator

1. `POST /api/v1/simulator/run` with `{ "scenario": "base" }`
   - Expect 200 with `bello_share`, `opposition_share`, `undecided_share`, `win_probability`, `rationale`
   - `rationale` must be a non-empty string (LLM output)
2. Test all 6 scenarios: `base`, `fuel_subsidy_restored`, `northern_coalition`, `economic_crisis`, `opposition_merger`, `scandal`
   - Verify percentages sum to ~100 (`bello_share + opposition_share + undecided_share`)
   - `bello_share` for `economic_crisis` should be higher than `base`
   - `bello_share` for `scandal` should be lower than `base`
3. `POST /api/v1/simulator/run` with `{ "scenario": "invalid_scenario" }`
   - Expect **400** `validation_error`
4. `POST /api/v1/simulator/followup` with `{ "question": "What about Kano?" }`
   - Expect 200 with `answer` string (keyword match — should reference Kano NNPP/voters)
5. `POST /api/v1/simulator/followup` with `{ "question": "Tell me about youth voters" }`
   - Expect 200 with `answer` string (keyword match on "youth")
6. `POST /api/v1/simulator/followup` with `{ "question": "x" }`
   - Expect **400** `validation_error` (min length 3)

### Flow 5 — Feedback

1. `POST /api/v1/feedback` with `{ "sessionId": "{sessionId}", "rating": 5, "comment": "Great demo", "page": "/simulator" }`
   - Expect 201 with `feedbackId`
2. `POST /api/v1/feedback` with `{ "rating": 6 }`
   - Expect **400** `validation_error` (max 5)
3. `POST /api/v1/feedback` with `{ "comment": "a".repeat(2001) }`
   - Expect **400** `validation_error` (max 2000 chars)

### Flow 6 — Admin Dashboard

Use admin token from Flow 1.

1. `GET /api/v1/admin/stats`
   - Expect 200 with `counts.sessions > 0` (from Flow 2)
   - `counts.leads > 0`
2. `GET /api/v1/admin/sessions`
   - Expect array of sessions, each with `pageTrail`
3. `GET /api/v1/admin/feedback`
   - Expect array with entry from Flow 5
4. `GET /api/v1/admin/mock-data`
   - Expect array of 4 editable entries (keys: simulator.baseline, agents.readiness, finance.dashboard, warroom.tally)

### Flow 7 — Admin Mock Data Editing

1. `GET /api/v1/mock/simulator.baseline` — note current `bello_share`
2. `PATCH /api/v1/admin/mock-data/simulator.baseline` (with admin token) with:
   ```json
   { "data": { "bello_share": 35.0, "opposition_share": 30.0 } }
   ```
   - Expect 200 with updated `data`
3. `GET /api/v1/mock/simulator.baseline`
   - Expect `bello_share` is now `35.0`
4. `PATCH /api/v1/admin/mock-data/candidate.profile` (with admin token)
   - Expect **403** `mock_key_not_editable`
5. `PATCH /api/v1/admin/mock-data/simulator.baseline` without auth token
   - Expect **401** `unauthorized`

### Flow 8 — Auth Guard Tests

1. `GET /api/v1/admin/stats` with no token → **401**
2. `GET /api/v1/admin/stats` with `Authorization: Bearer bad_token` → **401**
3. `GET /api/v1/admin/stats` with `Authorization: Bearer ` (empty) → **401**

---

## Frontend Integration Notes

### Session Lifecycle

- On app mount: `POST /sessions` → store `sessionId` in memory (not localStorage — demo only)
- On every route change: `PATCH /sessions/{id}/ping` with current route path
- On lead capture form submit (or skip): `POST /leads` with `sessionId`
- On feedback form submit: `POST /feedback` with `sessionId`

### Demo Login

The frontend must show demo credentials on the login screen:  
**`demo@solon.ng / demo2027`**

This is a frontend-only auth simulation. There is no `POST /auth/login` for the demo viewer — the demo web app handles login by checking these hardcoded credentials client-side and storing a flag in memory. The admin API (`POST /admin/login`) is only for the admin dashboard (Solon operator), not for demo visitors.

### Mock Data Caching

All `/mock/:key` calls can be cached in React Query or similar with a long stale time (e.g., 10 minutes). The data only changes if an admin edits it.

### Simulator Loading State

`POST /simulator/run` hits OpenAI and can take 2–5 seconds. Show a loading skeleton for the full result panel. Do not disable the button — just replace it with a spinner.

`POST /simulator/followup` can use same pattern.

### Message Variants — Cluster Mapping

When fetching `/mock/voter_intelligence.message_variants`:
- The response object has keys `cluster_1` through `cluster_5`
- Map these to the cluster IDs in `/mock/voter_intelligence.clusters`
- The cluster dropdown in the Message Generator should render `cluster.name` and submit the selected cluster's position (1–5)

### War Room Simulation

The war room uses `/mock/warroom.tally` as the initial state. To simulate live updates, the frontend polls or intervals-updates by incrementing `pus_reporting` and `running_tally` locally on the client — no additional API calls needed. The "Simulated Election Day" toggle is always on.

### EC8A Flagged Form

The `agents.election_day` key returns one pre-loaded form with a `flags` array. Any form with `flags.length > 0` should render the flag banner UI with editable correction fields.

---

## Known Limitations (By Design)

| Limitation | Reason |
|---|---|
| Simulator rationale fails if OpenAI is down | Returns 502 `llm_error` — frontend should show "Analysis unavailable, try again" |
| No demo viewer auth endpoint | Demo login is frontend-only (hardcoded creds) |
| No real-time WebSocket | War room simulation is client-side interval animation |
| Finance INEC PDF is a static file | Served from `public/` as `GET /assets/demo/inec-report.pdf` |
| Single campaign only | No multi-tenant support — all data is for Bello 2027 |
