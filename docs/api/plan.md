# solon-demo-api — Build Plan

Express + TypeScript + MongoDB backend for the Solon demo.
Follows the patterns in `docs/guides/backend.md` exactly.

---

## Repo

`solon-demo-api` — lives inside the existing Nx monorepo at `apps/solon-demo-api`.

---

## What this backend does

1. **Serves all demo mock data** from MongoDB (every module's data — vote shares, agents, finance, war room, etc.)
2. **Handles lead capture** — name, email, phone collected before the demo
3. **One real LLM endpoint** — M0 simulator NL parse + rationale + follow-up Q&A
4. **Session logging** — every demo visit logged (timestamp, referrer, lead ID if filled)
5. **Feedback inbox** — receives feedback form submissions from the demo
6. **Admin panel** — password-protected, shows visits + feedback + allows tweaking of key display numbers

---

## Stack

| Concern | Choice |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express 4 |
| Database | MongoDB + Mongoose |
| Validation | express-validator |
| Auth (admin only) | JWT (single hardcoded admin credential) |
| LLM | OpenAI SDK |
| Hosting | Railway |

No Redis, no queues, no WebSockets — this is a demo backend.

---

## Folder structure

```
src/
├── server.ts
├── app.ts
├── controllers/
│   ├── lead.controller.ts
│   ├── session.controller.ts
│   ├── feedback.controller.ts
│   ├── simulator.controller.ts
│   ├── module.controller.ts        # serves all mock module data
│   └── admin.controller.ts
├── services/
│   ├── lead.service.ts
│   ├── session.service.ts
│   ├── feedback.service.ts
│   ├── simulator.service.ts        # LLM calls live here
│   ├── module.service.ts           # reads mock data from MongoDB
│   └── admin.service.ts
├── models/
│   ├── lead.model.ts
│   ├── session.model.ts
│   ├── feedback.model.ts
│   ├── mock-data.model.ts          # all tweakable demo data in one collection
│   └── admin.model.ts
├── routes/
│   ├── index.ts
│   ├── lead.routes.ts
│   ├── session.routes.ts
│   ├── feedback.routes.ts
│   ├── simulator.routes.ts
│   ├── module.routes.ts
│   └── admin.routes.ts
├── middlewares/
│   ├── auth.middleware.ts           # admin JWT guard
│   ├── validateRequest.middleware.ts
│   └── rateLimit.middleware.ts
├── requests/
│   ├── lead.validation.ts
│   ├── feedback.validation.ts
│   └── simulator.validation.ts
├── configs/
│   ├── env.config.ts
│   ├── database.config.ts
│   ├── cors.config.ts
│   └── index.ts
├── shared/
│   ├── types/
│   │   ├── service.types.ts
│   │   ├── lead.types.ts
│   │   ├── session.types.ts
│   │   ├── feedback.types.ts
│   │   ├── mock-data.types.ts
│   │   └── index.ts
│   └── constants/
│       ├── http.constants.ts
│       ├── messages.constants.ts
│       └── index.ts
└── utils/
    ├── response.util.ts
    ├── logger.util.ts
    ├── asyncHandler.util.ts
    ├── jwt.util.ts
    └── id.util.ts

seeds/                               # JSON files — import to MongoDB
├── mock-simulator.json
├── mock-agents.json
├── mock-finance.json
├── mock-warroom.json
├── mock-voter-intelligence.json
└── README.md                        # instructions for local import + prod import
```

---

## MongoDB collections

| Collection | Purpose | Tweakable via admin? |
|---|---|---|
| `leads` | Name, email, phone, skipped flag, timestamp | No |
| `sessions` | Every demo visit — timestamp, referrer, lead ID, pages visited | No |
| `feedback` | Feedback form submissions | No (read-only in admin) |
| `mock_data` | All demo mock datasets — keyed by module + data type | Key numbers only |
| `admins` | Admin users — max one record ever | N/A |

### `mock_data` collection shape

All mock data lives here, keyed by a `key` field. The frontend always fetches by key.

```
{ key: "simulator.baseline", data: { ... }, updatedAt: Date }
{ key: "simulator.saved_scenarios", data: [ ... ], updatedAt: Date }
{ key: "agents.roster", data: [ ... ], updatedAt: Date }
{ key: "agents.readiness", data: { trained_pct: 68, verified_pct: 54 }, updatedAt: Date }
{ key: "finance.dashboard", data: { ... }, updatedAt: Date }
{ key: "finance.expenses", data: [ ... ], updatedAt: Date }
{ key: "finance.donors", data: [ ... ], updatedAt: Date }
{ key: "warroom.tally", data: { ... }, updatedAt: Date }
{ key: "warroom.incidents", data: [ ... ], updatedAt: Date }
{ key: "voter.clusters", data: [ ... ], updatedAt: Date }
{ key: "voter.issues", data: [ ... ], updatedAt: Date }
{ key: "voter.message_variants", data: { ... }, updatedAt: Date }
{ key: "m1.map_states", data: [ ... ], updatedAt: Date }
```

**Admin-tweakable keys** (the numbers a buyer would notice):
- `simulator.baseline` — vote share percentages, confidence bands
- `agents.readiness` — % trained, % verified
- `finance.dashboard` — total spent, cap, burn rate
- `warroom.tally` — vote counts per party

Everything else is read-only from the admin perspective.

---

## API routes

### Public

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/api/leads` | Submit lead (name, email, phone) |
| `POST` | `/api/sessions` | Log a new demo session on page load |
| `PATCH` | `/api/sessions/:id/ping` | Update last-seen on a session |
| `POST` | `/api/feedback` | Submit feedback form |
| `GET` | `/api/mock/:key` | Fetch any mock dataset by key |
| `POST` | `/api/simulator/run` | Run NL scenario → LLM parse + result + rationale |
| `POST` | `/api/simulator/followup` | Follow-up Q&A on a scenario result |
| `GET` | `/api/health` | Health check |

### Admin (JWT-protected)

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/api/admin/setup` | One-time admin registration — only works if zero admin users exist in DB, returns 403 forever after |
| `POST` | `/api/admin/login` | Returns JWT |
| `GET` | `/api/admin/sessions` | All demo sessions, paginated, with lead info joined |
| `GET` | `/api/admin/leads` | All leads, paginated |
| `GET` | `/api/admin/feedback` | All feedback submissions, paginated |
| `GET` | `/api/admin/mock` | List all mock data keys |
| `PATCH` | `/api/admin/mock/:key` | Update a tweakable mock data key |

---

## Lead capture flow

1. Demo frontend loads → immediately calls `POST /api/sessions` → gets back a `sessionId`
2. Lead gate screen shown (name + email + phone + "Skip for now")
3. If filled → `POST /api/leads` → returns `leadId` → stored in frontend state + localStorage
4. If skipped → `leadId` is null, session continues unlinked
5. On every page navigation → frontend pings `PATCH /api/sessions/:id/ping` with current page — this builds a visit trail

---

## LLM endpoint (M0 simulator only)

`POST /api/simulator/run`

Request:
```json
{
  "input_type": "natural_language" | "structured",
  "nl_input": "What happens if NLC endorses Bello...",
  "structured": { "levers": [...], "shocks": [...], "candidates": [...] }
}
```

What the service does:
1. If `nl_input` — calls Claude to parse it into structured inputs, returns parse + confidence
2. Takes structured inputs (parsed or directly submitted) + current baseline from MongoDB
3. Calls Claude to generate a one-paragraph rationale grounded in the structured inputs
4. Returns: updated vote shares (deterministic mock math, not LLM-generated numbers), confidence band, rationale paragraph, parse confidence if applicable

**The LLM never produces the numbers.** Vote share deltas are computed by a simple deterministic function in the service (lever weights hardcoded). Claude only writes the rationale paragraph and parses NL input.

`POST /api/simulator/followup`

Request:
```json
{
  "question_type": "why_bump" | "flip_race" | "sensitive_lever",
  "scenario_context": { ... }
}
```

Calls Claude with the scenario context + question type → returns a grounded explanation. Context is passed in by the frontend (not stored server-side between calls).

---

## Admin setup (first-run pattern)

`POST /api/admin/setup` accepts `{ email, password }`. The service checks if any document exists in the `admins` collection — if yes, returns 403 immediately with no further processing. If no admin exists, it hashes the password, creates the record, and returns a JWT. After that, the endpoint is permanently locked.

This means: after deploying to Railway, you hit `/api/admin/setup` once with your credentials, then it's sealed. No env var credentials, no seed scripts, no re-registration possible.

---

## Admin panel

A separate minimal frontend (can be same repo under `/admin`, served as static HTML or a simple React page). Not part of `solon-demo-web`.

Screens:
1. **Login** — email + password → JWT stored in localStorage
2. **Sessions** — table of all visits, columns: timestamp, pages visited, lead name (if filled), referrer. Sortable by date.
3. **Leads** — table of all collected leads: name, email, phone, timestamp, linked session.
4. **Feedback** — inbox view of all feedback submissions: message, timestamp, session/lead linked.
5. **Data editor** — list of tweakable keys only (`simulator.baseline`, `agents.readiness`, `finance.dashboard`, `warroom.tally`). Click any key → JSON editor → Save → hits `PATCH /api/admin/mock/:key`.

Admin frontend is intentionally simple — plain HTML + vanilla JS or a single React file is fine. It's internal tooling, not a product.

---

## Seed data

All mock data is generated as JSON files in `seeds/`. These are the source of truth.

**Local setup:**
```bash
mongoimport --db solon_demo --collection mock_data --file seeds/mock-simulator.json --jsonArray
# (repeated for each seed file — a setup script will wrap this)
```

**Production (Railway):**
- Upload JSON files → run `mongoimport` via Railway's shell, or use MongoDB Atlas import UI
- One-time operation. After that, admin panel handles any updates.

`seeds/README.md` will have the exact commands.

---

## Env vars

```bash
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/solon_demo
JWT_SECRET=                  # admin JWT — min 32 chars
OPENAI_API_KEY=              # OpenAI API key
CORS_ORIGIN=http://localhost:5173  # demo frontend origin
ADMIN_JWT_SECRET=            # separate secret for admin tokens — min 32 chars
```

---

## Build order

1. Scaffold repo — folder structure, tsconfig, package.json, path aliases
2. Core utilities — logger, asyncHandler, ResponseUtil, IDUtil, JWTUtil
3. DB connection — DatabaseUtil, env/database config
4. `mock_data` model + `GET /api/mock/:key` — unblocks frontend development immediately
5. Seed JSON files — generate all mock data for every module
6. Lead + session endpoints — capture flow
7. Feedback endpoint
8. Simulator LLM endpoint — NL parse + rationale
9. Admin routes + JWT auth middleware
10. Admin frontend (minimal)
11. Deploy to Railway — env vars, seed prod DB
