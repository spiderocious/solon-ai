# Solon Demo Web — Frontend Plan

**App:** `apps/solon-demo-web`  
**Design System:** `packages/ui`  
**Design System Previewer:** `apps/design-system` (port 5176)  
**API:** `apps/solon-demo-api` (port 3001)

---

## Architecture

### Pattern: Feature-Sliced Design (FSD)

Code is organised by business feature, not by technical layer. Every feature is self-contained: its own screen, parts, API hooks, providers, and helpers all live together.

```
src/
  features/           ← one folder per route/module
  shared/             ← used by 2+ features
  ui/                 ← app-level layout shells (not in packages/ui)
  app.tsx
  app.routes.tsx
  app.provider.tsx
  main.tsx
```

### State layers

| Layer | Where | What |
|---|---|---|
| Server state | `feature/api/` via React Query | All API data |
| Feature state | `feature/providers/` via React Context | Shared state within one feature |
| Global demo state | `shared/providers/demo-session-provider.tsx` | `sessionId`, `leadId`, `isAuthenticated` |
| UI/local state | `useState` in screens/parts | Tabs, toggles, form fields |

No Redux, no Zustand, no other global store.

### API client

Demo API calls use a lightweight `ky` instance defined in `@shared/api/demo-client.ts`. It is **not** the `apiClient` from `@solon/api` — that client is for the real backend with JWT refresh. The demo client is stateless: no auth headers injected, no token refresh.

Endpoint constants live in `@shared/api/demo-endpoints.ts` as `DEMO_EP`.

---

## Route map

```
/login                                 → LoginScreen
/lead-capture                          → LeadCaptureScreen
/dashboard                             → DashboardScreen
/simulator                             → SimulatorScreen
/simulator/scenario-builder            → ScenarioBuilderScreen
/modules/voter-intelligence            → VoterIntelligenceScreen (redirect → /map)
/modules/voter-intelligence/map        → ConstituencyMapScreen
/modules/voter-intelligence/clusters   → VoterClustersScreen
/modules/voter-intelligence/messages   → MessageGeneratorScreen
/modules/voter-intelligence/issues     → IssueMonitorScreen
/modules/agents                        → AgentsScreen (redirect → /roster)
/modules/agents/roster                 → RosterScreen
/modules/agents/coverage               → CoverageMapScreen
/modules/agents/readiness              → ReadinessScreen
/modules/agents/election-day           → ElectionDayScreen
/modules/finance                       → FinanceScreen (coming soon banner on all sub-routes)
/modules/finance/dashboard             → FinanceDashboardScreen
/modules/finance/expenses              → ExpensesScreen
/modules/finance/donors                → DonorsScreen
/modules/finance/compliance            → ComplianceScreen
/modules/war-room                      → WarRoomScreen
```

### Auth guard

`DemoAuthGuard` wraps all routes except `/login` and `/lead-capture`. Reads `isAuthenticated` from `DemoSessionContext`. Redirects to `/login` if false.

Demo login is **client-side only**: check `demo@solon.ng / demo2027` in the guard, set flag in context memory (not localStorage — demo resets on refresh by design).

---

## Shared layer

```
src/shared/
  api/
    demo-client.ts          ← ky instance → http://localhost:3001/api/v1
    demo-endpoints.ts       ← DEMO_EP constants
  providers/
    demo-session-provider.tsx  ← sessionId, leadId, isAuthenticated + setters
  types/
    mock-data.types.ts      ← TS interfaces for all 15 mock data shapes
    api.types.ts            ← ApiEnvelope<T>, ApiError
  helpers/
    format-naira.ts
    format-pct.ts
    format-number.ts
  hooks/
    use-mock-data.ts        ← useQuery wrapper for GET /mock/:key
    use-demo-session.ts     ← reads DemoSessionContext
```

---

## App-level UI (not in packages/ui)

```
src/ui/
  app-layout.tsx        ← persistent sidebar + topbar + <Outlet>
  solon-logo.tsx        ← SVG logo, standalone reusable component
  demo-mode-pill.tsx    ← fixed "Demo Mode" badge top-right
  sidebar-nav.tsx       ← module navigation with active state
  module-shell.tsx      ← consistent module page wrapper (title, subnav, content area)
  coming-soon-banner.tsx ← "Coming Q3 2027" full-width banner
```

---

## Chart system

### Principle

Charts that need a library go through `packages/ui`. The chart library (`recharts`) is **never imported directly** in app code — only through the `@solon/ui` proxy. This means the library can be swapped in one file without touching any screen.

### Structure in packages/ui

```
packages/ui/src/
  recharts/
    index.ts              ← export * from 'recharts'   (the raw proxy)
  charts/
    vote-share-bar/
      vote-share-bar.tsx  ← recharts BarChart, Solon palette, horizontal layout
      index.ts
    turnout-gauge/
      turnout-gauge.tsx   ← recharts RadialBarChart, win probability + turnout %
      index.ts
    spending-breakdown/
      spending-breakdown.tsx  ← recharts BarChart grouped, finance categories
      index.ts
    tally-ticker/
      tally-ticker.tsx    ← recharts BarChart, animates on data change
      index.ts
```

### Wrapping convention

Each chart wrapper in `charts/`:
- Imports `BarChart`, `ResponsiveContainer`, etc. from `'../recharts'` (never from `'recharts'` directly)
- Applies Solon CSS vars (`var(--forest-600)`, `var(--ink)`, `var(--orange)`) to all fill/stroke props
- Uses Fraunces/Inter font stack via `style` on axis tick elements
- Exports a clean typed props interface (no `any`)
- Is exported from `packages/ui/src/index.ts` alongside all other components

### Design system preview

Every new chart component gets a scene added to `apps/design-system/src/features/charts/charts-screen.tsx` showing:
- The component with realistic sample data
- The exact import line
- Props reference in a comment block

This is mandatory — no chart ships without its design system scene.

### Chart → screen mapping

| Component | Used in |
|---|---|
| `VoteShareBar` | Simulator baseline, Dashboard snapshot, War Room tally |
| `TurnoutGauge` | Simulator run result (win probability %, projected turnout) |
| `SpendingBreakdown` | Finance dashboard — spending by category |
| `TallyTicker` | War Room live dashboard — animated live PU tally |

Charts that don't need recharts (issue salience bar, scenario delta bars, issue monitor trend bars) are plain Tailwind `div`s with `style={{ width: '${pct}%' }}` — those stay hand-rolled, no library overhead needed.

---

## Build order

Work through these steps in sequence. Each step must typecheck clean before moving to the next.

### Step 1 — Shared infrastructure

- [ ] Add `recharts` to `packages/ui/package.json`
- [ ] Create `packages/ui/src/recharts/index.ts` (proxy)
- [ ] Extend `packages/ui/src/icons/index.ts` with missing icons needed across all features (see icons list below)
- [ ] Create `src/shared/api/demo-client.ts`
- [ ] Create `src/shared/api/demo-endpoints.ts` with `DEMO_EP`
- [ ] Create `src/shared/types/mock-data.types.ts` — TS interfaces for all 15 mock data shapes
- [ ] Create `src/shared/types/api.types.ts` — `ApiEnvelope<T>`, `ApiError`
- [ ] Create `src/shared/hooks/use-mock-data.ts`
- [ ] Create `src/shared/helpers/format-naira.ts`, `format-pct.ts`, `format-number.ts`
- [ ] Create `src/shared/providers/demo-session-provider.tsx`
- [ ] Create `src/shared/hooks/use-demo-session.ts`
- [ ] Update `ROUTES` in `packages/core/src/constants/routes.ts` with all demo paths
- [ ] Typecheck `packages/ui` and `solon-demo-web`

### Step 2 — Chart components + design system previews

- [ ] `VoteShareBar` — horizontal bar per candidate, colour prop per party, margin-of-error whisker
- [ ] Add `VoteShareBar` scene to `apps/design-system` charts screen
- [ ] `TurnoutGauge` — radial bar, 0–100 range, two data points (turnout %, win probability)
- [ ] Add `TurnoutGauge` scene to design system
- [ ] `SpendingBreakdown` — grouped horizontal bar, category names on Y axis, ₦ formatted tooltip
- [ ] Add `SpendingBreakdown` scene to design system
- [ ] `TallyTicker` — bar chart animating on data prop change, dark background for war room
- [ ] Add `TallyTicker` scene to design system
- [ ] Export all 4 from `packages/ui/src/index.ts`
- [ ] Typecheck `packages/ui`

### Step 3 — App shell

- [ ] `src/ui/solon-logo.tsx`
- [ ] `src/ui/demo-mode-pill.tsx`
- [ ] `src/ui/sidebar-nav.tsx` — module links, active state, AFP candidate header
- [ ] `src/ui/app-layout.tsx` — sidebar + topbar + `<Outlet />`
- [ ] `src/ui/module-shell.tsx` — page title, optional sub-nav tabs, content area
- [ ] `src/ui/coming-soon-banner.tsx`
- [ ] `DemoAuthGuard` at `src/shared/guards/demo-auth-guard.tsx`
- [ ] Update `app.routes.tsx` with all routes, lazy-loaded, wrapped in `DemoAuthGuard`
- [ ] Update `app.provider.tsx` to mount `DemoSessionProvider` + `ModalHost` + `ToastHost`

### Step 4 — Login feature

**Path:** `src/features/login/`

- [ ] `screen/login-screen.tsx` — Solon logo, email + password fields, "Sign in" button
- [ ] `screen/parts/demo-credential-banner.tsx` — subtle inline banner showing `demo@solon.ng / demo2027`
- [ ] On submit: validate against hardcoded demo creds, call `POST /api/v1/sessions`, store `sessionId` in `DemoSessionContext`, set `isAuthenticated`, navigate to `/lead-capture`
- [ ] Inline error on wrong credentials (not a toast)

### Step 5 — Lead capture feature

**Path:** `src/features/lead-capture/`

- [ ] `api/use-create-lead.ts` — `useMutation` → `POST /leads`
- [ ] `screen/lead-capture-screen.tsx` — name, email, phone fields + skip button
- [ ] On submit or skip: call `POST /leads`, store `leadId` in context, navigate to `/dashboard`
- [ ] Inline field-level errors from API `field_errors`

### Step 6 — Dashboard feature

**Path:** `src/features/dashboard/`

- [ ] `api/use-dashboard-data.ts` — parallel `useQuery` calls for `simulator.baseline`, `agents.readiness`, `finance.dashboard`, `warroom.tally`, `voter_intelligence.issue_monitor`
- [ ] `screen/dashboard-screen.tsx` — 5-panel grid layout
- [ ] `screen/parts/simulator-snapshot.tsx` — `VoteShareBar` with top-3 candidates, "Build a Scenario" link
- [ ] `screen/parts/agent-readiness-panel.tsx` — verified/ready counts, progress bar, link to M2
- [ ] `screen/parts/finance-pulse-panel.tsx` — ₦ spent of ₦ cap, days to deadline, link to M3
- [ ] `screen/parts/war-room-status-panel.tsx` — `Countdown` to Jan 16 2027, link to M4
- [ ] `screen/parts/issue-alert-panel.tsx` — rank-1 issue from issue monitor, trend badge

### Step 7 — Simulator feature

**Path:** `src/features/simulator/`

- [ ] `api/use-baseline.ts` — `useQuery` → `GET /mock/simulator.baseline`
- [ ] `api/use-saved-scenarios.ts` — `useQuery` → `GET /mock/simulator.saved_scenarios`
- [ ] `api/use-run-simulation.ts` — `useMutation` → `POST /simulator/run`
- [ ] `api/use-followup.ts` — `useMutation` → `POST /simulator/followup`
- [ ] `providers/simulator-provider.tsx` — active scenario, results, compare selection list
- [ ] `screen/simulator-screen.tsx` — sub-nav: Baseline / Scenario Builder / Saved / Compare
- [ ] `screen/parts/baseline-view.tsx` — `VoteShareBar` per candidate, `ConfidenceBar`, top-5 variables table
- [ ] `screen/parts/scenario-builder/` — `SegmentControl` for 3 tabs
  - [ ] `candidates-tab.tsx` — 4 candidate radio cards, "Run Simulation" button
  - [ ] `structural-levers-tab.tsx` — `Scrubber` for each lever (turnout, youth, women, urban/rural), coalition merge, BVAS failure
  - [ ] `issue-shocks-tab.tsx` — shock cards with `SeveritySlider`, decay rate `Select`
- [ ] `screen/parts/nl-copilot.tsx` — `CopilotPrompt`, 1.5s loading, result + 3 follow-up chips
- [ ] `screen/parts/simulation-result.tsx` — `VoteShareBar`, `TurnoutGauge`, rationale paragraph, `OfficialStamp variant="simulation"`
- [ ] `screen/parts/saved-scenarios.tsx` — list with compare checkboxes
- [ ] `screen/parts/compare-view.tsx` — side-by-side table, delta columns

### Step 8 — Voter Intelligence feature

**Path:** `src/features/voter-intelligence/`

- [ ] `api/use-constituency-map.ts` — `useQuery` → `GET /mock/voter_intelligence.constituency_map`
- [ ] `api/use-voter-clusters.ts` — `useQuery` → `GET /mock/voter_intelligence.clusters`
- [ ] `api/use-message-variants.ts` — `useQuery` → `GET /mock/voter_intelligence.message_variants`
- [ ] `api/use-issue-monitor.ts` — `useQuery` → `GET /mock/voter_intelligence.issue_monitor`
- [ ] `screen/voter-intelligence-screen.tsx` — sub-nav: Map / Clusters / Messages / Issues
- [ ] `screen/parts/constituency-map.tsx` — state grid table coloured by `afp_tier`, click → side panel with state detail, `TierChip` per row
- [ ] `screen/parts/voter-clusters.tsx` — 5 cluster cards with size, dominant states, top issues, `StatusPill` for reach %
- [ ] `screen/parts/message-generator.tsx` — talking point input (pre-filled), cluster `Select`, 1.5s loading, 5 variant cards with 👍/👎 and disclaimer flag on variant 3
- [ ] `screen/parts/issue-monitor.tsx` — top 10 issues, trend arrow, inline Tailwind salience bar, click → expanded panel with quotes + response suggestion

### Step 9 — Agents feature

**Path:** `src/features/agents/`

- [ ] `api/use-agents.ts` — `useQuery` → `GET /mock/agents.readiness`
- [ ] `api/use-election-day.ts` — `useQuery` → `GET /mock/agents.election_day`
- [ ] `api/use-incidents.ts` — `useQuery` → `GET /mock/agents.incidents`
- [ ] `screen/agents-screen.tsx` — sub-nav: Roster / Coverage / Readiness / Election Day
- [ ] `screen/parts/roster.tsx` — table of 30 agents, `SearchBar` filter by LGA/status, `StatusPill` per row, mock "Send Invite" toast
- [ ] `screen/parts/coverage-map.tsx` — national state grid (coloured by agent density), Kano drill-in showing agent list with `StatusPill`, summary stat "1,240 of 176,846 PUs"
- [ ] `screen/parts/readiness-dashboard.tsx` — % trained, % verified stat cards, not-ready agent list, "Send reminder" mock action
- [ ] `screen/parts/election-day.tsx` — pre-loaded EC8A form with flag banner, editable correction fields, `OfficialStamp variant="verified"`, CM panel

### Step 10 — Finance feature

**Path:** `src/features/finance/`

- [ ] `api/use-finance-dashboard.ts` — `useQuery` → `GET /mock/finance.dashboard`
- [ ] `api/use-expenses.ts` — `useQuery` → `GET /mock/finance.expenses`
- [ ] `api/use-donors.ts` — `useQuery` → `GET /mock/finance.donors`
- [ ] All screens wrapped in `ComingSoonBanner` at the top
- [ ] `screen/finance-screen.tsx` — sub-nav: Dashboard / Expenses / Donors / Compliance
- [ ] `screen/parts/finance-dashboard.tsx` — `SpendingBreakdown` chart, spend vs cap stats, `StatusPill` alert
- [ ] `screen/parts/expenses.tsx` — table of 20 expenses, `StatusPill` per row, inline "Add Expense" form appending a Pending row (no API call)
- [ ] `screen/parts/donors.tsx` — table of 15 donors, `StatusPill` for risk score, flagged donor acknowledgement
- [ ] `screen/parts/compliance.tsx` — "Download Draft INEC Report" button → static PDF served from API `/assets`

### Step 11 — War Room feature

**Path:** `src/features/war-room/`

- [ ] `api/use-war-room-tally.ts` — `useQuery` → `GET /mock/warroom.tally`
- [ ] `api/use-reconciliation.ts` — `useQuery` → `GET /mock/warroom.reconciliation`
- [ ] `providers/war-room-provider.tsx` — ticking tally state (simulated), copilot open/close
- [ ] `screen/war-room-screen.tsx` — dark mode, sub-nav: Live / Citizen / Reconciliation / Public View
- [ ] `screen/parts/live-dashboard.tsx` — `TallyTicker` (ticks every 3s via `useEffect` interval), `LivePulse`, `Countdown`, stat bar, incident feed, anomaly flag banner
- [ ] `screen/parts/ai-copilot.tsx` — slide-in chat panel, `CopilotPrompt`, pre-loaded Q&A exchange, 2s loading on new question, keyword-matched response from mock bank
- [ ] `screen/parts/reconciliation.tsx` — per-PU table, `OfficialStamp variant="verified"` for auto-confirmed, disputed PU with manual verify/reject
- [ ] `screen/parts/citizen-reporter.tsx` — public link display, walkthrough panel of citizen flow steps
- [ ] `screen/parts/public-view-toggle.tsx` — publish toggle, configure panel, copy permalink mock

---

## Icons to add to packages/ui/src/icons/index.ts

These are needed across features and aren't in the current proxy:

```
Zap               → IconZap          (simulator)
Users             → IconUsers        (agents, clusters)
DollarSign        → IconMoney        (finance)
Shield            → IconShield       (war room, compliance)
TrendingUp        → IconTrending     (issue monitor)
TrendingDown      → IconTrendingDown (issue monitor)
Minus             → IconSteady       (issue monitor → steady trend)
MapPin            → IconPin          (coverage map)
CheckCircle2      → IconVerified     (agent verified)
XCircle           → IconFailed       (agent failed)
Clock             → IconPending      (pending status)
ChevronDown       → IconChevronDown  (dropdowns, expand)
ChevronUp         → IconChevronUp
SlidersHorizontal → IconSliders      (scenario builder levers)
Play              → IconRun          (run simulation)
Save              → IconSave         (save scenario)
Copy              → IconCopy         (copy permalink)
Download          → IconDownload     (export, CSV)
Send              → IconSend         (invite agent)
MessageSquare     → IconMessage      (copilot, messaging)
Flag              → IconFlag         (incident, compliance flag)
AlertCircle       → IconWarning      (flagged items, EC8A)
BarChart2         → IconBarChart     (finance, charts)
PieChart          → IconPieChart     (finance breakdown)
Radio             → IconLive         (war room live)
Eye               → IconPublic       (public view toggle)
EyeOff            → IconPrivate
SkipForward       → IconSkip         (lead capture skip)
```

---

## Rules

These apply to every file written in this project. Non-negotiable.

### TypeScript

- Strict mode. No `any`. Use interfaces, generics, or discriminated unions.
- All component props must be a named interface, declared in the same file, marked `Readonly<Props>`. No inline object types as props.
- `noUnusedLocals`, `noUnusedParameters` — fix, don't suppress.

### Naming

| Thing | Convention | Example |
|---|---|---|
| Files | `kebab-case` | `vote-share-bar.tsx` |
| Components | `PascalCase` function | `export function VoteShareBar()` |
| Hooks | `camelCase`, `use-` prefix | `useMockData` |
| Helpers | `camelCase` describing the action | `formatNaira` |
| Prop interfaces | `${ComponentName}Props` | `VoteShareBarProps` |
| Route constants | `SCREAMING_SNAKE` | `DEMO_EP.MOCK_DATA` |

### Components

- All components are named function declarations — no arrow function components, no anonymous defaults.
- No inline styles except when consuming CSS variables (`style={{ color: 'var(--ink)' }}`). Everything else is Tailwind.
- Icons from `@icons` only — never import `lucide-react` directly in app code.
- Use `cn()` from `@solon/ui` for conditional class merging.

### Errors

- Inline errors over toasts for all form validation and API errors.
- Field-level errors from `field_errors` in API response mapped to individual fields.
- Network/unexpected errors shown as an inline error banner below the form, not a toast.
- Toasts reserved for positive confirmations only ("Scenario saved", "Invite sent").

### API / data fetching

- All data fetching through Tanstack Query. No `useEffect` + `fetch`.
- Query hooks live in the feature's `api/` folder.
- `use-mock-data.ts` in `@shared/hooks/` is the only shared query hook — use it for all `GET /mock/:key` calls.
- Mutations return `useMutation` — never call API in event handlers directly.
- Loading states: use `Skeleton` / `SkeletonCard` from `@solon/ui` while queries are pending.

### Design system

- Import all UI components from `@solon/ui`.
- Import all icons from `@icons`.
- Import all chart components from `@solon/ui` — never from `recharts` directly.
- Never import from `packages/ui/src/...` with a relative path — always via the alias.
- Any new reusable component that could serve 2+ features goes in `packages/ui`, not in `src/ui/`.
- Every new `packages/ui` component added gets a scene in `apps/design-system` before it's used in the app.

### Charts

- Chart wrappers in `packages/ui/src/charts/` import Recharts from `'../recharts'`, not from `'recharts'`.
- Solon palette only: `var(--forest-600)` for AFP/primary, `var(--ink)` for APC, `var(--paper-3)` for PDP, `var(--orange)` for LP, `var(--ink-4)` for Others.
- Tooltips use `font-sans`, axes use `font-mono text-[10px]` to match design system type scale.
- All chart components are responsive via `ResponsiveContainer`.

### Lazy loading

- Every feature screen is lazy-loaded in `app.routes.tsx`.
- Use the pattern: `lazy(() => import('./...').then(m => ({ default: m.FeatureScreen })))`.

### File structure within a feature

```
features/my-feature/
  api/
    use-my-data.ts
  providers/            (only if feature needs shared state across parts)
    my-feature-provider.tsx
  screen/
    my-feature-screen.tsx
    parts/
      some-section.tsx
  helpers/              (only if pure util functions needed)
    some-helper.ts
  my-feature.routes.ts  (only if feature has sub-routes)
```

No empty folders. If a folder would have only one file, consider whether the file can live one level up instead.

### Barrel exports

Each feature folder that exports something exports via an `index.ts`. Don't import from deep paths across feature boundaries — import from the feature's barrel.

### Demo-specific behaviour

- `DemoSessionContext` is the single source of truth for `sessionId`, `leadId`, and `isAuthenticated`.
- `sessionId` is created once on login via `POST /sessions`. It must be passed in the body of `POST /leads` and `POST /feedback`.
- The "Simulated Election Day" toggle in War Room is always `true` — no real date check.
- The Finance module always shows `ComingSoonBanner` — no feature flag, it's permanent for the demo.
- Artificial loading delays (1.5–2s `setTimeout`) on simulator run and message generation so results feel earned. Implement with a `useSimulatedDelay` hook in `@shared/hooks/`.
- All "toast confirmations" (Scenario saved, Invite sent, Report downloaded) use `DrawerService.toast()` from `@solon/ui`.
