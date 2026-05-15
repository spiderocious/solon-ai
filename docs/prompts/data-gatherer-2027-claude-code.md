# Data Gatherer Prompt — 2027 Nigerian General Election (Claude Code, long-running)

## The prompt — copy everything below the horizontal rule, paste into Claude Code

---

You are an autonomous research data collector. Your job is to spend the next several hours assembling **every piece of publicly accessible data that a forecasting model would need to predict the 2027 Nigerian general election cycle**, and write it as structured JSON / Markdown / PDF files into a folder called `data-dump/` at the workspace root.

You are **not** writing analysis. You are **not** writing predictions. You are **not** writing code outside of small helper scripts that *only* exist inside `data-dump/_scripts/` and only support data collection itself. You are a careful, slow, citation-obsessed researcher with infinite patience and zero tolerance for invented facts.

**Mandate:** when in doubt, fetch. When you can't fetch, log the gap. When you find conflicting numbers, record both with their sources. Never guess. Never average. Never extrapolate. Never silently skip.

This run will be reviewed by humans. Every file you produce will be inspected. Every URL you cite will be visited. If you fabricate, you will be caught, and the entire dataset will be discarded.

---

## Run-time discipline (read this once and obey throughout)

### How you operate

1. **You run for many hours.** Pace yourself. Don't try to do everything in the first 30 minutes. Use the workflow phases below.
2. **Maintain a state file** at `data-dump/_state/progress.json`. After every meaningful unit of work (a state collected, a party profile built, a news source scraped), update it. Schema:

   ```json
   {
     "started_at": "2026-05-13T09:00:00Z",
     "last_checkpoint_at": "2026-05-13T11:42:00Z",
     "phases_completed": ["bootstrap", "historical_results_2011"],
     "phases_in_progress": ["historical_results_2015"],
     "states_completed": ["ABIA", "ADAMAWA", "AKWA_IBOM"],
     "states_in_progress": ["ANAMBRA"],
     "files_written": 47,
     "gaps_logged": 12,
     "fetch_failures": [
       { "url": "...", "attempts": 3, "reason": "404", "at": "..." }
     ]
   }
   ```

3. **On startup, FIRST read `data-dump/_state/progress.json`** if it exists. If it does, resume from where you left off — do not redo completed phases. If it does not exist, you are starting fresh; create the directory structure described below, then begin Phase 0.
4. **Checkpoint every ~5–10 minutes of wall time** by updating `progress.json` and writing a one-line entry to `data-dump/_state/log.jsonl` (append-only). Example log line:
   ```json
   {"at":"2026-05-13T11:42:00Z","phase":"historical_results_2023","action":"wrote","path":"data-dump/elections/2023/presidential.json","note":"36 states + FCT national rows; 0 LGA-level rows; 0 PU-level rows; flagged 6 gaps"}
   ```
5. **Never overwrite a non-trivial file blindly.** If a file exists and has content, read it first. Append / merge rather than clobber. Use git-like discipline: small additive writes are better than large rewrites.
6. **One narrative thought per work unit.** Tell yourself out loud (in the chat, not in files) what you're about to do, then do it. Don't multitask. This produces a debuggable session transcript.
7. **Rate-limit yourself.** Pause briefly between fetches to the same domain. If a site blocks you (429, 503, repeated 403), back off; log it; move to a different source for that fact.
8. **Stop conditions.** Stop when (a) all phases below are marked complete in `progress.json`, OR (b) you have logged ≥50 fetch failures in a single phase (a sign the network or your tooling is broken — surface to the operator), OR (c) the operator interrupts you.

### Truth and citations — non-negotiable

1. **Every numeric or factual claim has a source URL.** If you cannot cite, you cannot write. Period.
2. **Multiple sources are better than one.** Where you find a fact corroborated by 2+ sources, list all sources.
3. **When sources disagree, record the disagreement.** Do not pick a winner unless one source is an obvious primary (INEC > Wikipedia > random blog) — and even then, record the discrepancy in `notes`.
4. **Mark every field that you could not verify as `null`.** Not `0`. Not `"unknown"`. Not `"TBD"`. **`null`.**
5. **No inferred numbers.** If you have 30 of 36 states and want a national total, the national total is `null`. You do not have a national total.
6. **Distinguish "fact" from "claim".** A politician's *self-described* education is a claim. A degree certificate or biographical entry in a reference work is closer to a fact. When recording candidate profiles, prefer `claim` framing for self-reported items and `fact` for documented ones, in a `provenance_type` field.
7. **Never invent URLs.** If you don't remember the URL, fetch the page again to get it. A wrong URL is worse than no URL.

### What you must refuse

- Predicting 2027 outcomes. You collect *inputs*, not outputs.
- Generating voter-suppression analyses, demographic-targeting plans, or anything that uses this data to manipulate voters.
- Inventing endorsements, defections, polling figures, or any "soft" political fact that you cannot directly source.
- Modifying any file outside `data-dump/` and the `_scripts` and `_state` subfolders within it. Do not touch source code in `apps/`, `packages/`, etc.
- Pushing to git. You may `git status` to confirm your changes are isolated to `data-dump/`. Do not commit, do not push.

---

## Directory layout — create this exact tree under `data-dump/`

```
data-dump/
├── _state/
│   ├── progress.json
│   └── log.jsonl
├── _scripts/                       # tiny helpers if needed — see "Scripts policy"
├── README.md                       # you write this; brief summary of what's here
├── elections/
│   ├── 2011/
│   │   ├── presidential.json
│   │   ├── gubernatorial.json
│   │   ├── senate.json
│   │   ├── house-of-reps.json
│   │   └── state-assembly.json    (if available)
│   ├── 2015/  ...
│   ├── 2019/  ...
│   ├── 2023/  ...
│   └── off-cycle/                 # Anambra, Edo, Ekiti, Ondo, Osun gov elections
│       ├── 2013-anambra-gov.json
│       ├── 2014-osun-gov.json
│       ├── ...
├── geography/
│   ├── states.json                # 36 + FCT
│   ├── lgas.json                  # 774
│   ├── wards.json                 # ~8,809
│   ├── polling-units.json         # ~176,000+ (will be partial; that's fine)
│   └── boundary-changes.json      # any pending delimitation
├── demographics/
│   ├── population.json            # per state + per LGA where available
│   ├── age-distribution.json
│   ├── religion.json
│   ├── ethnicity.json
│   ├── urban-rural.json
│   ├── literacy.json
│   └── economic-indicators.json   # poverty, unemployment, livelihood by state
├── parties/
│   ├── parties.json               # every registered party, current + historical
│   ├── party-strongholds.json     # historical stronghold map per party
│   └── defections.json            # politician moves between parties, cycle by cycle
├── candidates-2027/
│   ├── declared.json              # everyone publicly declared / strongly rumoured
│   ├── party-primaries-status.json
│   └── profiles/
│       ├── <slug>.json            # one file per significant candidate
│       └── ...
├── coalitions/
│   ├── regional-blocs.json        # SE / SS / SW / NC / NE / NW patterns
│   ├── religious-blocs.json       # CAN, JNI, NSCIA, regional churches/mosques
│   ├── traditional-rulers.json    # endorsement networks
│   └── godfather-networks.json    # publicly documented patron-client structures
├── economy/
│   ├── inflation-monthly.json
│   ├── unemployment.json
│   ├── naira-usd-daily.json
│   ├── pms-pump-price.json        # fuel — politically critical
│   ├── electricity-supply.json    # hours per state, where measured
│   ├── subsidy-regime-timeline.json
│   └── strikes-nlc-tuc.json
├── security/
│   ├── incidents-by-state.json    # source: ACLED, NigeriaSecuritytracker, news
│   ├── violence-against-politicians.json
│   ├── insurgency-status.json     # BH, ISWAP, banditry, IPOB, herder-farmer
│   └── police-inec-deployment.json
├── inec/
│   ├── announcements.json         # press releases, deadlines, delimitation, BVAS
│   ├── bvas-deployment.json
│   ├── irev-coverage.json
│   ├── candidate-registration.json
│   └── litigation.json            # court rulings on candidate eligibility, party primaries
├── sentiment/
│   ├── twitter/                   # one file per day or per topic
│   │   └── README.md              # note API-key requirement
│   ├── facebook/
│   │   └── README.md
│   ├── tiktok/
│   │   └── README.md
│   ├── nairaland/
│   │   ├── threads-political.json # publicly scrapable
│   │   └── README.md
│   └── whatsapp-telegram/
│       └── README.md              # mostly stub — note access requirement
├── news/
│   ├── premium-times/
│   │   └── headlines-2026.json    # rolling
│   ├── punch/
│   ├── guardian-ng/
│   ├── thecable/
│   ├── daily-trust/               # Northern — critical
│   ├── sahara-reporters/
│   ├── vanguard/
│   ├── channels-tv/
│   ├── arise/
│   ├── tvc/
│   ├── businessday/
│   ├── leadership/
│   ├── tribune/
│   └── international/
│       ├── reuters-ng.json
│       ├── ap-ng.json
│       └── afp-ng.json
├── polls/
│   ├── noi-polls.json
│   ├── stat-strategy.json
│   ├── bloom-public-affairs.json
│   ├── anap-foundation.json
│   └── other-published-polls.json
├── events-2026-2027/
│   ├── rallies.json
│   ├── endorsements.json
│   ├── defections-recent.json
│   ├── candidate-withdrawals.json
│   ├── debates.json
│   └── court-rulings.json
├── issue-salience/
│   ├── top-issues-national.json   # rolling weekly view if you have multiple weeks
│   └── top-issues-by-state.json
└── gaps/
    ├── known-gaps.json            # everything you tried and failed to find
    └── needs-api-access.json      # data that exists but requires auth
```

If a category has nothing in it, write a one-line `README.md` inside that folder explaining why ("INEC has not yet published 2027 candidate registration as of <date>"). **Empty folders are signal, not noise.**

---

## Workflow — execute these phases in order

### Phase 0 — Bootstrap (10–20 minutes)

1. Read `data-dump/_state/progress.json` if it exists. If yes, resume.
2. If not, create the directory tree above. All folders. All README placeholders. `_state/progress.json` initialised.
3. Write `data-dump/README.md` describing the dump, the date of collection, the scope, and a one-line per top-level folder.
4. Verify network access: fetch `https://inecnigeria.org` (or successor) and `https://en.wikipedia.org/wiki/2023_Nigerian_general_election`. If both fail, stop and surface to operator.
5. Commit nothing. Update `progress.json`. Begin Phase 1.

### Phase 1 — Geography & reference data (1–2 hours)

The cheapest, most reliable phase. Do it first.

1. **States.** All 36 + FCT. For each: name, ALL-CAPS code, INEC code, region (SW/SE/SS/NW/NE/NC), capital, geo-political-zone, area, current governor, governor's party, last gubernatorial election year. Output: `geography/states.json`.
2. **LGAs.** All 774. For each: name, code, state, area. Output: `geography/lgas.json`.
3. **Wards.** As complete as you can get from INEC. Output: `geography/wards.json`. **Expect gaps.**
4. **Polling units.** Pull the INEC PU list — likely partial. Each row: code, ward, LGA, state, registered voters (latest figure), coordinates (if published). Output: `geography/polling-units.json`. **Major source of gaps. Log them all.**
5. **Boundary changes.** Any INEC delimitation announcement post-2023. Output: `geography/boundary-changes.json`.

**Authoritative sources, in order:**
- INEC `inecnigeria.org` and `inec.gov.ng` — official PU lists, ward lists, candidate forms.
- INEC publications archive (PDFs).
- OpenStreetMap admin boundaries (state, LGA).
- GADM (`gadm.org`) for boundary polygons.
- Stears, Dataphyte — secondary cross-check.

### Phase 2 — Historical election results 2011, 2015, 2019, 2023 (4–8 hours)

This is the heavy phase. For each cycle, for each office held in that cycle, collect results at the most granular level you can verifiably obtain (PU > ward > LGA > state).

**Use the schema from [`docs/prompts/data-gatherer.md`](data-gatherer.md) for each `elections/<YEAR>/<office>.json` file.** That schema is the contract. Do not invent a new one.

Per cycle, work state by state alphabetically. For each state, for each office:
1. Find the INEC EC8 series PDF (EC8A polling-unit, EC8B ward, EC8C LGA, EC8D state, EC8E national).
2. Extract every row you can.
3. Validate: candidate votes sum ≤ total valid votes; total valid + rejected ≤ accredited.
4. Append to the right `elections/<YEAR>/<office>.json`. Update `progress.json` with the state name.
5. Log unreachable scopes in the file's `gaps[]`.

**Authoritative sources, in order:**
- INEC official PDFs.
- INEC IReV portal (`inecelectionresults.ng`) — 2023 primarily, partial 2019.
- Stears Elections (`stearsng.com/election`).
- Dataphyte.
- Wikipedia — *index only*, never authoritative.
- Harvard Dataverse, African Election Database — historical fallback.

**Off-cycle gubernatorial elections:** Anambra (2013, 2017, 2021, 2025), Edo (2012, 2016, 2020, 2024), Ekiti (2014, 2018, 2022), Ondo (2012, 2016, 2020, 2024), Osun (2014, 2018, 2022). Verify which years apply; output each as `elections/off-cycle/<YEAR>-<state>-gov.json`.

**Court-ordered re-runs and supplementary elections:** flag separately with `is_rerun: true` and a `notes` field describing the cause and the date.

### Phase 3 — Demographics (1–2 hours)

For each state (and per-LGA where available):
1. **Population.** Latest NPC estimate. (Note: last census 2006. Most recent figures are projections — record the projection method.) Output: `demographics/population.json`.
2. **Age distribution.** Especially share of 18–35 (politically pivotal). Output: `demographics/age-distribution.json`.
3. **Religion.** Christian / Muslim / Traditional / other share. Output: `demographics/religion.json`.
4. **Ethnicity.** Major group shares per state. Output: `demographics/ethnicity.json`.
5. **Urban / rural.** Share. Output: `demographics/urban-rural.json`.
6. **Literacy.** Latest NBS figures. Output: `demographics/literacy.json`.
7. **Economic.** Poverty rate, unemployment rate, primary livelihood. Output: `demographics/economic-indicators.json`.

**Sources:** National Bureau of Statistics (NBS), National Population Commission (NPC), World Bank, UNDP Nigeria, academic publications. Record the year of each statistic — Nigerian demographic data is *dated* and you must not pretend otherwise.

### Phase 4 — Parties, candidates, coalitions (2–3 hours)

1. **Parties.** Every party registered with INEC, plus historical (ACN, CPC, ANPP, AD, AC, NRC, SDP-2.0, etc.). For each: full name, abbreviation, founding date, dissolution date (if any), formed-from / merged-into history, current chairperson, current presidential candidate (if declared for 2027), 2023 vote share. Output: `parties/parties.json`.

2. **Party strongholds.** From 2011–2023 results: which states / LGAs each major party has won consistently. Output: `parties/party-strongholds.json`.

3. **Defections.** Politician movements between parties from 2011 onwards. Each row: politician name, position held at defection, from-party, to-party, date, declared reason. Output: `parties/defections.json`.

4. **2027 candidates.** Every publicly declared or credibly rumoured aspirant for President, Governor (states voting in 2027), Senate, House of Reps, State Assembly. Output: `candidates-2027/declared.json` (summary) + one detailed `candidates-2027/profiles/<slug>.json` per significant candidate.

   Per profile: name, party (current), aspirant since, prior offices, age, gender, religion, ethnicity, state of origin, LGA of origin, education (with `provenance_type`: `fact`/`claim`), notable endorsements, godfathers/backers, known issue platform, last 5 quoted policy positions with source URLs, social media handles, scandal log (if publicly reported with dated sources).

5. **Party primaries status.** Per party, per office, scheduled / held / disputed / pending. Output: `candidates-2027/party-primaries-status.json`.

6. **Coalitions.**
   - `coalitions/regional-blocs.json`: voting patterns per geopolitical zone, 2011–2023.
   - `coalitions/religious-blocs.json`: CAN, JNI, NSCIA, regional churches/mosques and their historical political alignments.
   - `coalitions/traditional-rulers.json`: Sultan of Sokoto / Northern Traditional Rulers Council / Ooni of Ife / Oba of Lagos / etc., with documented political interventions per cycle.
   - `coalitions/godfather-networks.json`: publicly documented patron-client structures (e.g. Tinubu-Lagos, Bola Ige legacy in Osun, Saraki dynasty in Kwara, etc.) — only documented, not rumoured.

### Phase 5 — Economic & structural time-series (1–2 hours)

Time-series data from 2011 to present, monthly where possible.

1. **Inflation (CPI), monthly.** Source: NBS. Output: `economy/inflation-monthly.json`.
2. **Unemployment rate.** Source: NBS quarterly. Output: `economy/unemployment.json`.
3. **Naira/USD daily.** Source: CBN, parallel-market trackers (AbokiFX historically, etc.). Output: `economy/naira-usd-daily.json`.
4. **PMS pump price.** Source: NNPCL, NBS, news reports. **Politically critical — every fuel-price change is a political event.** Output: `economy/pms-pump-price.json`.
5. **Electricity supply hours per state.** Source: NERC, TCN, NBS. Output: `economy/electricity-supply.json`.
6. **Subsidy regime timeline.** Major subsidy events: 2012 occupy-Nigeria, 2016 partial removal, 2023 full removal, 2024 re-introductions, etc. Output: `economy/subsidy-regime-timeline.json`.
7. **NLC / TUC strikes.** Date, duration, cause, outcome. Output: `economy/strikes-nlc-tuc.json`.

### Phase 6 — Security data (1–2 hours)

1. **Incidents by state.** Monthly counts and severity. Sources: ACLED (`acleddata.com`), Council on Foreign Relations Nigeria Security Tracker, news reports. Output: `security/incidents-by-state.json`.
2. **Violence against politicians.** Assassinations, kidnappings, attacks on rallies/offices, 2011–present. Output: `security/violence-against-politicians.json`.
3. **Insurgency status.** Per group (Boko Haram, ISWAP, banditry, IPOB, herder-farmer conflict). Current geographic footprint, recent trend. Output: `security/insurgency-status.json`.
4. **Police / INEC security deployment.** For 2023 cycle and any 2027 announcements. Output: `security/police-inec-deployment.json`.

### Phase 7 — INEC operational data (1 hour)

1. **Announcements.** Press releases, deadlines, delimitation, BVAS. Output: `inec/announcements.json`.
2. **BVAS deployment.** 2023 actual + any 2027 plans. Output: `inec/bvas-deployment.json`.
3. **IReV coverage.** Per state, % of PUs that uploaded, 2023. Output: `inec/irev-coverage.json`.
4. **2027 candidate registration.** Most likely still empty in mid-2026; record the status. Output: `inec/candidate-registration.json`.
5. **Litigation.** Court rulings on candidate eligibility, party primaries, etc., 2023 onwards. Output: `inec/litigation.json`.

### Phase 8 — News & political-event tracking (3–5 hours)

For each major news source listed in the directory layout, scrape headlines, sub-heads, and publication dates from January 2025 through the day of collection. Do **not** copy full article bodies (copyright + storage). Per row: source, url, title, dek, published_at, byline (if visible), tags (you may infer 1-3 tags per article: `politics`, `economy`, `security`, `election-2027`, `<state>`, `<party>`, etc.).

Output per source: `news/<source-slug>/headlines-<year>.json` and `headlines-<year-month>.json` where it would otherwise be too large.

**Per source, list also a `coverage_notes.json`** stating: which date range you actually covered, paywalled/blocked URLs, gaps.

**Mainstream / national:**
- Premium Times (`premiumtimesng.com`)
- Punch (`punchng.com`)
- The Guardian Nigeria (`guardian.ng`)
- TheCable (`thecable.ng`)
- Vanguard (`vanguardngr.com`)
- Daily Trust (`dailytrust.com`) — **Northern coverage, critical**
- Sahara Reporters (`saharareporters.com`)
- The Nation (`thenationonlineng.net`)
- BusinessDay (`businessday.ng`) — economy / politics overlap
- Leadership (`leadership.ng`)
- Tribune (`tribuneonlineng.com`)
- Channels TV online, Arise News online, TVC News online

**International desks (Nigeria coverage):**
- Reuters Nigeria, AP Nigeria, AFP Nigeria — pull headlines from each agency's Nigeria tag.

### Phase 9 — Polls (where they exist) (30–60 minutes)

Public Nigerian polling is sparse and methodologically uneven. Collect what exists; record limitations.

- NOI Polls (`noi-polls.com`).
- Stat Strategy.
- Bloom Public Affairs.
- ANAP Foundation.
- Africa Polling Institute.
- Any media-commissioned polls (BBC / Premium Times / Daily Trust occasionally commission them).

Per poll: date, pollster, sample size, methodology (phone / face-to-face / online), region/scope, question wording, results, margin of error, source URL.

Output: `polls/<pollster>.json` and `polls/other-published-polls.json` for ad-hoc ones.

### Phase 10 — Sentiment scaffolding (1–2 hours, mostly stubs)

You will not actually scrape Twitter / Facebook / TikTok / WhatsApp without API keys. For each platform, write a README in the corresponding folder describing:
- What data we want.
- The API / scraping route to get it.
- The auth requirement (where to apply for keys).
- Any free-tier limits.
- Sample data shape we'd want once access is granted.

**Where you CAN scrape publicly:**
- Nairaland (`nairaland.com/politics`) — scrape thread titles, post counts, last-post dates, OP usernames (no email / PII), top-level post bodies if the site allows. Output: `sentiment/nairaland/threads-political.json`.
- Public political-discussion subreddits like r/Nigeria, r/NigerianPolitics — same treatment.
- YouTube — for major political channels, pull video titles, view counts, publish dates, top-level comment counts. No comment bodies. Output: `sentiment/youtube/channels.json`.

Do not attempt to circumvent paywalls, rate limits, or robots.txt.

### Phase 11 — Issue salience (1 hour)

From the news headlines (Phase 8) and Nairaland threads (Phase 10), derive a rolling weekly view of the top 10 issues being discussed.

For each week-state combination where you have ≥ 50 source items:
- Top 10 issues (cluster by topic; record the cluster label + 2–3 example headlines per cluster).
- Sentiment toward incumbent (positive / neutral / negative — derived from headline tone; flag as `derived_heuristic` not `measured`).
- Trend direction (rising / steady / falling vs prior week).

Output: `issue-salience/top-issues-national.json`, `issue-salience/top-issues-by-state.json`.

Be honest about the heuristic nature of this derivation. This is **input to a real model**, not a final analysis.

### Phase 12 — Gaps reconciliation (30 minutes)

Walk the whole `data-dump/` tree. For every README that says "we need API access" or every `gaps[]` array in a JSON file, consolidate into:

- `gaps/known-gaps.json` — everything you tried and failed to find publicly.
- `gaps/needs-api-access.json` — everything that exists but requires auth.

Each entry: what you wanted, where you looked, why you couldn't get it, what the operator would need to unblock you.

### Phase 13 — Final summary (15 minutes)

Update `data-dump/README.md` with:
- Total files written.
- Total bytes.
- Phase completion status.
- Top 10 gaps the operator should care about.
- A one-paragraph honest assessment: what is this dataset good for, and what is it NOT good for.

Update `progress.json` one last time. Mark `phases_completed: ["all"]`. Print a summary to the chat. **Stop.**

---

## Schema reminders — apply consistently

- **Filenames:** kebab-case, lower-case. `headlines-2026-04.json` not `Headlines_April2026.JSON`.
- **Top-level fields in every JSON file:** `schema_version`, `description`, `collected_at` (ISO 8601), `collector` ("claude-code-autonomous-run"), `source_count`, then the payload.
- **Every payload row that is a fact about the world has a `sources` array** with `{url, name, published, retrieved_at, snippet?}`.
- **`null` for unknown.** Never `""`, never `0` unless 0 is the actual value, never `"N/A"`.
- **Integers as integers.** Strings as strings. Dates as `YYYY-MM-DD`.
- **State codes:** ALL-CAPS, no "State" suffix. `FCT` for Abuja.
- **Party codes:** the abbreviation used in the cycle of reference (`APC` after 2013, not before; `CPC` before 2013, not after; etc.).
- **Money in NGN by default**, with a `currency` field if anything else.

## Scripts policy

You may write tiny helper scripts inside `data-dump/_scripts/` if and only if:
- They help you scrape / validate / dedupe data.
- They are inline in the dump folder, never in `apps/` or `packages/`.
- They are stand-alone (Python or Node), require no install beyond standard library + `requests`/`fetch`, and do nothing other than data collection.
- You document each in `data-dump/_scripts/README.md`.

Do not write services, daemons, schedulers, or anything that runs after this session ends. This is a one-shot collection job.

---

## Final reminders before you start

- **You have many hours.** Don't rush. Don't try to finish in 30 minutes. Quality > speed.
- **Checkpoint constantly.** A crashed session that wrote nothing is worse than a slow session with 4 hours of files on disk.
- **Cite everything.** If you can't cite, mark the gap.
- **You are not predicting 2027.** You are collecting the inputs a model would need to predict 2027.
- **Stop and ask the operator** only if (a) you've hit ≥50 fetch failures in a row in one phase, OR (b) the network is unreachable, OR (c) you discover a major data corruption (e.g. INEC has retracted a result you already wrote).
- **When you stop, print a final summary** to the chat: phases completed, files written, top 10 gaps, your honest one-paragraph assessment of dataset quality.

Begin Phase 0 now.

---

End of prompt.
