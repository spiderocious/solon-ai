# Solon Demo API — Documentation

**Base URL (local):** `http://localhost:3001/api/v1`  
**Base URL (production):** `https://solon-demo-api.up.railway.app/api/v1`

---

## Response Envelope

Every response — success or error — is wrapped in an envelope:

```json
{ "data": <payload> }
```

```json
{
  "error": {
    "code": "validation_error",
    "message": "Validation failed",
    "field_errors": {
      "rating": ["Number must be less than or equal to 5"]
    }
  }
}
```

`field_errors` is only present on `validation_error` responses.

---

## Authentication

Admin routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <token>
```

Tokens are obtained via `POST /admin/setup` (first run) or `POST /admin/login`.

---

## Rate Limiting

All endpoints: **200 requests per 15 minutes** per IP.  
Exceeding the limit returns `429` with a `Retry-After` header.

---

## Endpoints

### `GET /health`

Check service liveness.

**Auth required:** No

**Response 200**
```json
{
  "data": {
    "status": "ok",
    "service": "main-backend",
    "env": "development",
    "time": "2026-05-15T19:39:53.581Z"
  }
}
```

---

### `POST /sessions`

Create a new visitor session. Call once on first page load. Store the returned `sessionId` in memory for the session lifecycle.

**Auth required:** No

**Request body**
```json
{
  "userAgent": "Mozilla/5.0..."
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `userAgent` | string | No | Browser user-agent string |

**Response 201**
```json
{
  "data": {
    "sessionId": "ses_952b99142455a01c4e69"
  }
}
```

---

### `PATCH /sessions/:sessionId/ping`

Record a page visit. Call on every route change to build the session page trail.

**Auth required:** No

**Path params**

| Param | Type | Notes |
|---|---|---|
| `sessionId` | string | The `ses_...` ID from `POST /sessions` |

**Request body**
```json
{
  "page": "/modules/simulator"
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `page` | string | Yes | Current route path |

**Response 200**
```json
{
  "data": {
    "sessionId": "ses_952b99142455a01c4e69"
  }
}
```

**Response 404** — session not found
```json
{
  "error": {
    "code": "not_found",
    "message": "Session not found"
  }
}
```

---

### `POST /leads`

Capture visitor contact details. Call on lead capture form submit or skip.

**Auth required:** No

**Request body**
```json
{
  "sessionId": "ses_abc123...",
  "name": "Aminu Suleiman",
  "email": "aminu@example.com",
  "phone": "+2348012345678",
  "skipped": false
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `sessionId` | string | No | Associates lead with a session |
| `name` | string | No | Full name |
| `email` | string | No | Email address |
| `phone` | string | No | Phone number |
| `skipped` | boolean | No | `true` if visitor clicked skip — contact fields not required |

**Response 201**
```json
{
  "data": {
    "leadId": "ld_b508458407fdb781285a"
  }
}
```

---

### `POST /feedback`

Submit visitor feedback for a session.

**Auth required:** No

**Request body**
```json
{
  "sessionId": "ses_abc123...",
  "rating": 5,
  "comment": "Really impressive product",
  "page": "/modules/war-room"
}
```

| Field | Type | Required | Constraints | Notes |
|---|---|---|---|---|
| `sessionId` | string | No | — | Associates feedback with session |
| `rating` | integer | No | 1–5 | Star rating |
| `comment` | string | No | max 2000 chars | Free-text comment |
| `page` | string | No | — | Route where feedback was submitted |

**Response 201**
```json
{
  "data": {
    "feedbackId": "fb_b42a312e4d1fe7ff056d"
  }
}
```

**Response 400** — validation failure (example: rating out of range)
```json
{
  "error": {
    "code": "validation_error",
    "message": "Validation failed",
    "field_errors": {
      "rating": ["Number must be less than or equal to 5"]
    }
  }
}
```

---

### `GET /mock/:key`

Fetch a mock dataset by key. All keys return the same envelope shape.

**Auth required:** No

**Path params**

| Param | Type | Notes |
|---|---|---|
| `key` | string | Dot-namespaced key (see table below) |

**Available keys**

| Key | Description |
|---|---|
| `simulator.baseline` | Vote share projections, candidate list, top swing variables |
| `simulator.saved_scenarios` | 4 pre-saved scenario results |
| `voter_intelligence.constituency_map` | All 37 states with tier and voter data |
| `voter_intelligence.clusters` | 5 voter cluster profiles |
| `voter_intelligence.message_variants` | Pre-written message variants per cluster (`cluster_1`–`cluster_5`) |
| `voter_intelligence.issue_monitor` | Top 10 issues this week |
| `agents.readiness` | 30 field agents with readiness scores |
| `agents.election_day` | EC8A demo form (includes pre-loaded flags) |
| `agents.incidents` | Sample incident reports |
| `finance.dashboard` | Finance summary, alerts, KPIs |
| `finance.expenses` | 20 mock campaign expenses |
| `finance.donors` | 15 mock donors with risk scores |
| `warroom.tally` | Simulated live election tally (initial state) |
| `warroom.reconciliation` | PU reconciliation records |
| `candidate.profile` | Candidate and campaign profile |

**Response 200**
```json
{
  "data": {
    "key": "simulator.baseline",
    "label": "Simulator: Baseline Projections",
    "data": { ... }
  }
}
```

**Response 404** — key not found
```json
{
  "error": {
    "code": "not_found",
    "message": "Mock data key 'nonexistent.key' not found"
  }
}
```

#### Key: `simulator.baseline` — data shape

```json
{
  "bello_share": 29.0,
  "opposition_share": 32.0,
  "undecided_share": 19.0,
  "turnout_rate": 43.0,
  "swing_states": [...],
  "candidates": [
    {
      "id": "bello_afp",
      "name": "Emeka Adeyemi Bello",
      "party": "AFP",
      "party_colour": "#1D4ED8",
      "share": 29.0,
      "margin_of_error": 4.0,
      "confidence": "Medium"
    }
    // 5 total: bello_afp, apc_incumbent, pdp_candidate, lp_obi, others
  ],
  "top_variables": [
    {
      "rank": 1,
      "name": "Incumbent advantage (APC)",
      "impact": "−3.8pts for challengers",
      "direction": "negative"
    }
    // 5 total, directions: "positive" | "negative" | "neutral"
  ]
}
```

> **Note:** `simulator.baseline` is one of the 4 admin-editable keys. If the stored record has been PATCH'd with a partial payload (e.g. only `bello_share`), the `candidates` and `top_variables` arrays will be absent. Re-seed from `seeds/mock-data.json` to restore the full shape.

#### Key: `voter_intelligence.constituency_map` — data shape

```json
{
  "states": [
    {
      "name": "Lagos",
      "zone": "South-West",
      "registered_voters": 7058050,
      "turnout_2023": 18.1,
      "winner_2023": "APC",
      "afp_tier": "Swing"
    }
    // 37 total (36 states + FCT)
  ]
}
```

---

### `POST /simulator/run`

Run an election scenario simulation. Returns deterministic vote-share math plus an LLM-generated rationale (requires OpenAI).

**Auth required:** No

**Request body**
```json
{
  "scenario": "fuel_subsidy_restored"
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `scenario` | string (enum) | Yes | One of the 6 valid values below |

**Valid `scenario` values**

| Value | Description |
|---|---|
| `base` | No major shocks |
| `fuel_subsidy_restored` | Government reverses subsidy removal |
| `northern_coalition` | Major northern governors endorse Bello |
| `economic_crisis` | Naira collapses 40% |
| `opposition_merger` | Top two opposition candidates merge |
| `scandal` | Corruption allegation against Bello campaign |

**Response 200**
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
    "rationale": "The restoration of targeted fuel subsidies energises AFP's core constituency..."
  }
}
```

| Field | Type | Notes |
|---|---|---|
| `scenario` | string | Human-readable label |
| `bello_share` | number | AFP vote share % |
| `opposition_share` | number | Combined opposition % |
| `undecided_share` | number | Undecided % |
| `projected_turnout` | number | Projected national turnout % |
| `swing_state_outlook` | string | Qualitative swing state assessment |
| `win_probability` | integer | Win probability 0–100 |
| `rationale` | string | LLM-generated analysis paragraph |

**Response 400** — invalid scenario value
```json
{
  "error": {
    "code": "validation_error",
    "message": "Validation failed",
    "field_errors": {
      "scenario": [
        "Invalid enum value. Expected 'base' | 'fuel_subsidy_restored' | 'northern_coalition' | 'economic_crisis' | 'opposition_merger' | 'scandal', received 'invalid_scenario'"
      ]
    }
  }
}
```

**Response 502** — OpenAI unavailable
```json
{
  "error": {
    "code": "llm_error",
    "message": "Simulation analysis failed. Please try again."
  }
}
```

---

### `POST /simulator/followup`

Answer a follow-up question about the simulation. Uses keyword matching first, OpenAI as fallback.

**Auth required:** No

**Request body**
```json
{
  "question": "What would flip this race?"
}
```

| Field | Type | Required | Constraints | Notes |
|---|---|---|---|---|
| `question` | string | Yes | min 3 chars | The follow-up question text |

**Response 200**
```json
{
  "data": {
    "answer": "Kano is the single largest prize in the North — 7.8M registered voters. AFP needs 40%+ there to offset losses in the South-South..."
  }
}
```

**Response 400** — question too short
```json
{
  "error": {
    "code": "validation_error",
    "message": "Validation failed",
    "field_errors": {
      "question": ["String must contain at least 3 character(s)"]
    }
  }
}
```

---

### `POST /admin/setup`

First-run only. Creates the single admin account. Sealed permanently after first use.

**Auth required:** No

**Request body**
```json
{
  "email": "admin@solon.ng",
  "password": "your-secure-password"
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `email` | string | Yes | Admin email |
| `password` | string | Yes | Admin password |

**Response 201**
```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "adminId": "adm_abc123..."
  }
}
```

**Response 403** — admin already configured
```json
{
  "error": {
    "code": "admin_setup_disabled",
    "message": "Admin setup is disabled"
  }
}
```

---

### `POST /admin/login`

Authenticate as admin and receive a JWT.

**Auth required:** No

**Request body**
```json
{
  "email": "admin@solon.ng",
  "password": "your-secure-password"
}
```

**Response 200**
```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "adminId": "adm_abc123..."
  }
}
```

**Response 401** — wrong credentials
```json
{
  "error": {
    "code": "invalid_credentials",
    "message": "Invalid credentials"
  }
}
```

---

### `GET /admin/stats`

Dashboard summary: counts and recent leads.

**Auth required:** Yes

**Response 200**
```json
{
  "data": {
    "counts": {
      "sessions": 142,
      "leads": 87,
      "feedback": 34
    },
    "recentLeads": [
      {
        "name": "Aminu Suleiman",
        "email": "aminu@example.com",
        "createdAt": "2026-05-15T19:47:55.314Z"
      }
    ]
  }
}
```

---

### `GET /admin/sessions`

List recent visitor sessions with page trails.

**Auth required:** Yes

**Query params**

| Param | Type | Default | Max | Notes |
|---|---|---|---|---|
| `limit` | integer | 50 | 100 | Number of sessions to return |

**Response 200**
```json
{
  "data": [
    {
      "sessionId": "ses_952b99142455a01c4e69",
      "leadId": "ld_b508458407fdb781285a",
      "pageTrail": ["/login", "/dashboard", "/modules/simulator"],
      "createdAt": "2026-05-15T19:47:46.000Z"
    }
  ]
}
```

---

### `GET /admin/feedback`

All feedback submissions, newest first.

**Auth required:** Yes

**Response 200**
```json
{
  "data": [
    {
      "feedbackId": "fb_b42a312e4d1fe7ff056d",
      "sessionId": "ses_952b99142455a01c4e69",
      "rating": 5,
      "comment": "Great demo",
      "page": "/simulator",
      "createdAt": "2026-05-15T19:47:58.000Z"
    }
  ]
}
```

---

### `GET /admin/mock-data`

List all admin-editable mock data keys with their current stored values.

**Auth required:** Yes

**Editable keys:** `simulator.baseline`, `agents.readiness`, `finance.dashboard`, `warroom.tally`

**Response 200**
```json
{
  "data": [
    {
      "key": "simulator.baseline",
      "label": "Simulator: Baseline Projections",
      "data": { ... },
      "updatedAt": "2026-05-15T19:48:51.738Z"
    }
  ]
}
```

---

### `PATCH /admin/mock-data/:key`

Update an editable mock data key. Only the 4 designated keys accept writes.

**Auth required:** Yes

**Path params**

| Param | Type | Notes |
|---|---|---|
| `key` | string | Must be one of the 4 editable keys |

**Request body**
```json
{
  "data": {
    "bello_share": 31.5,
    "opposition_share": 30.0
  }
}
```

The `data` object is a **partial merge** — only the fields you provide are updated. Fields not included are preserved.

**Response 200**
```json
{
  "data": {
    "key": "simulator.baseline",
    "data": {
      "bello_share": 31.5,
      "opposition_share": 30.0
    },
    "updatedAt": "2026-05-15T19:48:51.738Z"
  }
}
```

**Response 403** — key is read-only
```json
{
  "error": {
    "code": "mock_key_not_editable",
    "message": "Key 'candidate.profile' is not editable"
  }
}
```

**Response 401** — missing or invalid token
```json
{
  "error": {
    "code": "unauthorized",
    "message": "Missing token"
  }
}
```

---

## Error Code Reference

| Code | HTTP | Meaning |
|---|---|---|
| `validation_error` | 400 | Schema validation failed — see `field_errors` for per-field messages |
| `unauthorized` | 401 | Missing or invalid JWT |
| `invalid_credentials` | 401 | Wrong email or password on login |
| `forbidden` | 403 | Authenticated but action not permitted |
| `admin_setup_disabled` | 403 | `/admin/setup` endpoint is permanently sealed |
| `mock_key_not_editable` | 403 | Attempted PATCH on a read-only mock key |
| `not_found` | 404 | Resource does not exist |
| `conflict` | 409 | Resource already exists |
| `rate_limited` | 429 | Too many requests — check `Retry-After` header |
| `internal` | 500 | Unexpected server error |
| `llm_error` | 502 | OpenAI call failed — show "Analysis unavailable, try again" |
