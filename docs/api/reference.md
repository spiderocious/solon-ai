# Solon Demo API — Reference

**Base URL (local):** `http://localhost:3001/api/v1`  
**Base URL (production):** `https://solon-demo-api.up.railway.app/api/v1`

All responses follow the envelope shape:

```json
{ "data": <payload> }           // success
{ "error": { "code": "...", "message": "...", "field_errors": {} } }  // error
```

---

## Authentication

Admin routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <token>
```

Tokens are obtained via `/admin/setup` (first run) or `/admin/login`.

---

## Health

### `GET /health`

No auth required.

**Response 200:**
```json
{ "data": { "status": "ok", "timestamp": "2026-05-15T10:00:00Z" } }
```

---

## Sessions

### `POST /sessions`

Create a new visitor session. Call on first page load.

**Body:**
```json
{ "userAgent": "Mozilla/5.0..." }
```

**Response 201:**
```json
{ "data": { "sessionId": "ses_abc123..." } }
```

### `PATCH /sessions/:sessionId/ping`

Record a page visit. Call on route change.

**Body:**
```json
{ "page": "/modules/simulator" }
```

**Response 200:**
```json
{ "data": { "sessionId": "ses_abc123..." } }
```

**Response 404** if sessionId not found.

---

## Leads

### `POST /leads`

Capture visitor contact details. Optional — visitor may skip.

**Body:**
```json
{
  "sessionId": "ses_abc123...",
  "name": "Aminu Suleiman",
  "email": "aminu@example.com",
  "phone": "+2348012345678",
  "skipped": false
}
```

All contact fields are optional. Set `skipped: true` to log a skip without contact info.

**Response 201:**
```json
{ "data": { "leadId": "ld_abc123..." } }
```

---

## Feedback

### `POST /feedback`

Submit session feedback.

**Body:**
```json
{
  "sessionId": "ses_abc123...",
  "rating": 5,
  "comment": "Really impressive product",
  "page": "/modules/war-room"
}
```

All fields optional except at least one of `rating` or `comment` is recommended.

**Response 201:**
```json
{ "data": { "feedbackId": "fb_abc123..." } }
```

---

## Mock Data

### `GET /mock/:key`

Fetch a mock dataset by key. No auth required.

**Keys available:**

| Key | Description |
|---|---|
| `simulator.baseline` | Vote share projections and candidates |
| `simulator.saved_scenarios` | 4 pre-saved scenarios |
| `voter_intelligence.constituency_map` | All 37 states with tier data |
| `voter_intelligence.clusters` | 5 voter cluster profiles |
| `voter_intelligence.message_variants` | Pre-written message variants per cluster |
| `voter_intelligence.issue_monitor` | Top 10 issues this week |
| `agents.readiness` | 30 agents with readiness data |
| `agents.election_day` | EC8A demo form |
| `agents.incidents` | Sample incident report |
| `finance.dashboard` | Finance summary and alerts |
| `finance.expenses` | 20 mock expenses |
| `finance.donors` | 15 mock donors with risk scores |
| `warroom.tally` | Simulated live election tally |
| `warroom.reconciliation` | PU reconciliation records |
| `candidate.profile` | Candidate and campaign info |

**Response 200:**
```json
{
  "data": {
    "key": "simulator.baseline",
    "label": "Simulator: Baseline Projections",
    "data": { ... }
  }
}
```

**Response 404** if key not found.

---

## Simulator

### `POST /simulator/run`

Run an election scenario. Returns deterministic vote-share math + LLM-generated rationale.

**Body:**
```json
{ "scenario": "fuel_subsidy_restored" }
```

**Valid scenarios:**
- `base` — No major shocks
- `fuel_subsidy_restored` — Government reverses subsidy removal
- `northern_coalition` — Major northern governors endorse Bello
- `economic_crisis` — Naira collapses 40%
- `opposition_merger` — Top two opposition candidates merge
- `scandal` — Corruption allegation against Bello campaign

**Response 200:**
```json
{
  "data": {
    "scenario": "Fuel Subsidy Restored",
    "bello_share": 32.2,
    "opposition_share": 30.1,
    "undecided_share": 17.9,
    "projected_turnout": 43.0,
    "swing_state_outlook": "Competitive — toss-up in most swing states",
    "win_probability": 52,
    "rationale": "The restoration of targeted fuel subsidies energises AFP's core constituency of urban middle-class and rural North-West voters who bore the brunt of the removal..."
  }
}
```

**Response 502** if OpenAI is unavailable.

### `POST /simulator/followup`

Answer a follow-up question about the simulation. Uses keyword matching first, OpenAI as fallback.

**Body:**
```json
{ "question": "What would flip this race?" }
```

**Response 200:**
```json
{ "data": { "answer": "The single highest-leverage flip factor is..." } }
```

---

## Admin

All admin routes require `Authorization: Bearer <token>`.

### `POST /admin/setup` — First run only

Creates the admin account. Works once — sealed permanently after first admin exists.

**Body:**
```json
{ "email": "admin@solon.ng", "password": "your-secure-password" }
```

**Response 201:**
```json
{ "data": { "token": "eyJ...", "adminId": "adm_abc123..." } }
```

**Response 403 `admin_setup_disabled`** after first admin created.

### `POST /admin/login`

**Body:**
```json
{ "email": "admin@solon.ng", "password": "your-secure-password" }
```

**Response 200:**
```json
{ "data": { "token": "eyJ...", "adminId": "adm_abc123..." } }
```

**Response 401 `invalid_credentials`** on wrong password.

### `GET /admin/stats`

Dashboard: session count, lead count, feedback count, recent leads.

**Response 200:**
```json
{
  "data": {
    "counts": { "sessions": 142, "leads": 87, "feedback": 34 },
    "recentLeads": [
      { "name": "Aminu Suleiman", "email": "aminu@example.com", "phone": "+234...", "createdAt": "..." }
    ]
  }
}
```

### `GET /admin/mock-data`

List all editable mock data keys.

**Response 200:**
```json
{
  "data": [
    { "key": "simulator.baseline", "label": "Simulator: Baseline Projections", "data": {...}, "updatedAt": "..." }
  ]
}
```

### `PATCH /admin/mock-data/:key`

Update an editable mock data key. Only the 4 designated editable keys are allowed.

**Editable keys:** `simulator.baseline`, `agents.readiness`, `finance.dashboard`, `warroom.tally`

**Body:**
```json
{ "data": { "bello_share": 31.5, ... } }
```

**Response 200:**
```json
{ "data": { "key": "simulator.baseline", "data": {...}, "updatedAt": "..." } }
```

**Response 403 `mock_key_not_editable`** for non-editable keys.

### `GET /admin/sessions`

List recent visitor sessions with page trails. Defaults to 50, max 100.

**Query params:** `?limit=20`

**Response 200:**
```json
{
  "data": [
    { "sessionId": "ses_...", "leadId": "ld_...", "pageTrail": ["/login", "/dashboard", "/modules/simulator"], "createdAt": "..." }
  ]
}
```

### `GET /admin/feedback`

All feedback submissions.

**Response 200:**
```json
{
  "data": [
    { "feedbackId": "fb_...", "sessionId": "ses_...", "rating": 5, "comment": "...", "page": "...", "createdAt": "..." }
  ]
}
```

---

## Error Codes

| Code | HTTP | Meaning |
|---|---|---|
| `validation_error` | 400 | Schema validation failed — see `field_errors` |
| `unauthorized` | 401 | Missing or invalid token |
| `forbidden` | 403 | Authenticated but not permitted |
| `not_found` | 404 | Resource not found |
| `conflict` | 409 | Resource already exists |
| `rate_limited` | 429 | Too many requests |
| `internal` | 500 | Unexpected server error |
| `admin_already_exists` | 409 | Admin already created (legacy, not used) |
| `admin_setup_disabled` | 403 | Setup endpoint sealed |
| `invalid_credentials` | 401 | Wrong email or password |
| `mock_key_not_found` | 404 | Mock data key doesn't exist |
| `mock_key_not_editable` | 403 | Attempted edit on read-only key |
| `llm_error` | 502 | OpenAI call failed |

---

## Rate Limiting

All endpoints: **200 requests per 15 minutes** per IP. Returns 429 with `Retry-After` header when exceeded.
