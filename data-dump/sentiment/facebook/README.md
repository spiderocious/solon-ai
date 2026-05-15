# Facebook — Sentiment Data

## What we want
- Public post volume and engagement (likes, shares, comments) on major Nigerian political pages and groups.
- Content from pages of APC, PDP, LP, NNPP, and major declared candidates.
- Timeline: January 2025 through election day 2027.

## API / scraping route
Meta Content Library and API (formerly CrowdTangle replacement).

## Auth requirement
- Apply at: https://transparency.meta.com/researchtools/meta-content-library/
- Requires academic/research institution affiliation and approval.
- Standard Graph API v20+ does not provide public post content for third-party pages.

## Free-tier limits
- No free tier for political content at scale.
- Meta Content Library: approval-gated, no cost once approved but access is non-trivial.

## Sample data shape
```json
{
  "schema_version": "1.0",
  "description": "Facebook engagement metrics for Nigerian political pages",
  "collected_at": null,
  "collector": "claude-code-autonomous-run",
  "source_count": 0,
  "data": [
    {
      "page_name": null,
      "page_url": null,
      "post_date": null,
      "post_text_snippet": null,
      "likes": null,
      "shares": null,
      "comments": null,
      "post_url": null,
      "sources": []
    }
  ]
}
```

## Status
BLOCKED — requires Meta Content Library approval. No data collected as of 2026-05-13.
