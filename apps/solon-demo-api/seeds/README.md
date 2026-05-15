# Seeds — Solon Demo API

All demo mock data lives in this directory as JSON files. Import them into MongoDB before starting the app.

## Local Setup

Make sure MongoDB is running and you have a database named `solon_demo` (or whatever `MONGODB_URI` points to).

```bash
# Import all mock data (run from the solon-demo-api directory)
mongoimport \
  --uri "$MONGODB_URI" \
  --collection mockdatas \
  --file seeds/mock-data.json \
  --jsonArray \
  --drop
```

Or if running without `$MONGODB_URI` set:

```bash
mongoimport \
  --host localhost:27017 \
  --db solon_demo \
  --collection mockdatas \
  --file seeds/mock-data.json \
  --jsonArray \
  --drop
```

## Production (Railway)

Railway exposes `MONGODB_URI` as an environment variable. Run the import as a one-shot deploy command or via Railway's shell:

```bash
mongoimport \
  --uri "$MONGODB_URI" \
  --collection mockdatas \
  --file seeds/mock-data.json \
  --jsonArray \
  --drop
```

## Re-seeding

The `--drop` flag wipes and replaces the collection. Safe to re-run — it is idempotent.

Admin credentials are **not** seeded here. Use the first-run setup endpoint:

```
POST /api/v1/admin/setup
{ "email": "your@email.com", "password": "your-password" }
```

This endpoint is permanently disabled after the first admin is created.

## Seed Files

| File | Collection | Description |
|---|---|---|
| `mock-data.json` | `mockdatas` | All module mock data — simulator projections, voter intelligence, agents, finance, war room, candidate profile |

## Editable Keys

The following `mock_data` keys can be updated via the admin API (`PATCH /api/v1/admin/mock-data/:key`):

| Key | Description |
|---|---|
| `simulator.baseline` | Vote share percentages and candidate list |
| `agents.readiness` | Agent counts, verified/ready stats |
| `finance.dashboard` | Spend totals, cap, deadline |
| `warroom.tally` | Live PU tally and running votes |
