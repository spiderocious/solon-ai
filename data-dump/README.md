# data-dump — 2027 Nigerian Election Data Collection

**Collected:** 2026-05-13  
**Collector:** claude-code-autonomous-run  
**Total files:** 120  
**Total size:** ~576 KB  
**Phases complete:** 13 / 13

---

## Phase Completion Status

| Phase | Status | Notes |
|-------|--------|-------|
| 0 · Bootstrap | COMPLETE | Directory tree, state files, sentiment stubs |
| 1 · Geography | COMPLETE (partial) | States + LGAs written; wards/PUs blocked by INEC |
| 2 · Elections | COMPLETE (partial) | National totals written; state-level results are gaps |
| 3 · Parties / Candidates / Coalitions | COMPLETE | All major parties, 6 declared candidates, 3 profiles |
| 4 · Economy | COMPLETE (partial) | Annual series only; monthly granularity needs CBN/NBS API |
| 5 · Security | COMPLETE (partial) | Narrative data written; ACLED incident counts need registration |
| 6 · INEC | COMPLETE (partial) | Election dates + litigation written; BVAS/IReV stubs |
| 7 · News | COMPLETE (partial) | Premium Times only; 10+ outlets returned HTTP 403 |
| 8 · Polls | COMPLETE (partial) | NOI Polls written; other pollsters not fetched |
| 9 · Sentiment | EMPTY | All sources require API keys or returned 403 |
| 10 · Issue Salience | COMPLETE (heuristic) | National ranking only; per-state requires Afrobarometer |
| 11 · Gaps | COMPLETE | 18 known gaps + 10 API-access items documented |
| 12 · Final Summary | COMPLETE | This file |

---

## Directory Structure

```
data-dump/
├── _state/           progress.json, log.jsonl
├── _scripts/         README (API collection helpers documented)
├── geography/        states.json (37), lgas.json (780), wards/PU/boundary stubs
├── elections/
│   ├── 2011-2023/    presidential, senate, house-of-reps, gubernatorial per cycle
│   └── off-cycle/    24 files — Anambra/Edo/Ekiti/Ondo/Osun/Kogi/Bayelsa/Imo
├── candidates-2027/  declared.json, primaries-status, profiles/ (3 candidates)
├── parties/          parties.json, strongholds, defections
├── coalitions/       regional-blocs, religious-blocs, godfathers, traditional-rulers
├── demographics/     population, ethnicity, religion, literacy, age, urban-rural, economic
├── economy/          inflation, naira-usd, pms-price, subsidy-timeline, unemployment, electricity, strikes
├── security/         insurgency-status, incidents-by-state, deployment, violence-politicians
├── inec/             announcements, litigation, bvas-deployment, irev-coverage, candidate-reg
├── news/             premium-times/ (19 headlines); 16 other outlet stubs (403/blocked)
├── polls/            noi-polls.json; 4 other pollster stubs
├── sentiment/        all stubs — Twitter/FB/TikTok/Nairaland/WhatsApp blocked or API-gated
├── issue-salience/   national top-10 (heuristic); by-state is empty
└── gaps/             known-gaps.json (18 items), needs-api-access.json (10 items)
```

---

## Network Status During Collection

- **INEC (inecnigeria.org, inec.gov.ng):** UNREACHABLE throughout — TLS certificate error / connection refused. No INEC-sourced data was collected. All electoral geography and official result forms are gaps.
- **Nigerian news outlets (Punch, TheCable, Vanguard, Daily Trust, Sahara Reporters, BusinessDay, The Nation, Channels, Arise, TVC):** HTTP 403 on all category/listing pages.
- **Nairaland:** HTTP 403.
- **Stears.co:** HTTP 404 (domain may be down).
- **Dataphyte.com:** HTTP 403.
- **Premium Times:** Accessible. 19 headlines collected.
- **Wikipedia:** Accessible. Primary source for most structured data.
- **NOI Polls:** Accessible. Approval ratings and issue polls collected.
- **WebFetch truncation:** Large Wikipedia articles (e.g., 2023 presidential election) were truncated before state-level tables — state-by-state results are gaps.

---

## Top 10 Gaps (Operator Priority)

| # | Gap | Severity | Unblock |
|---|-----|----------|---------|
| 1 | INEC PU register (~176,846 PUs with registered voter counts) | CRITICAL | Download from inecnigeria.org directly in a browser |
| 2 | State-by-state presidential results 2011–2023 | CRITICAL | Harvard Dataverse "Nigeria elections" dataset (free, no key) |
| 3 | INEC ward list (~8,809 wards with INEC codes) | HIGH | INEC ward register PDF/Excel from inecnigeria.org |
| 4 | ACLED monthly incident counts by state (2011–2026) | HIGH | Register at acleddata.com (free) and download Nigeria |
| 5 | Afrobarometer Round 9/10 subnational (per-state issue salience) | HIGH | Register at afrobarometer.org/data/ (free) |
| 6 | Harvard Dataverse LGA-level results (2011/2015/2019) | HIGH | https://dataverse.harvard.edu/ — search "Nigeria elections" |
| 7 | Monthly CPI series 2011–2026 (NBS) | HIGH | NBS monthly press releases at nigerianstat.gov.ng |
| 8 | Daily NGN/USD rates — official + parallel (2011–2026) | HIGH | CBN rates portal; AbokiFX historical archive |
| 9 | Twitter/X political sentiment | HIGH | Apply for Twitter API v2 Academic Research track |
| 10 | Nigerian news headlines (all major outlets) | MEDIUM | Use headless browser (Playwright) or RSS feeds; Wayback CDX API |

---

## Dataset Quality Assessment

This dataset provides a **structurally sound national-level skeleton** for 2027 Nigerian election analysis. It is reliable for: national presidential vote totals and seat tallies (2011–2023); party composition and defection history; major candidate profiles and declared positions; economy narrative (subsidy shock, naira float, inflation trajectory); security threat topology (Boko Haram, ISWAP, banditry, herder-farmer, IPOB); NOI Polls approval ratings (Jan 2024–Jan 2026); and the confirmed election calendar (2027-01-16 presidential, 2027-02-06 gubernatorial). It is **not reliable** for sub-national modelling: there are no state-level vote shares, no polling unit data, no per-state demographic breakdowns beyond population headcounts, no ACLED incident data, and no social media signals. Any forecast built on this dataset alone will be limited to national-level swing estimates using zone-level heuristics. The four highest-leverage gaps to close before serious modelling are: (1) Harvard Dataverse LGA results, (2) ACLED Nigeria, (3) Afrobarometer Round 10, and (4) INEC PU register — all free or low-cost to obtain.
