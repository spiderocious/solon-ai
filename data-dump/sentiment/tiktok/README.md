# TikTok — Sentiment Data

## What we want
- Video view counts, like counts, and comment counts for political content in Nigeria.
- Top creators discussing 2027 election, candidates, parties.
- Hashtag volume: #Nigeria2027, #NigeriaElection, #APC, #PDP, #LP, etc.
- Timeline: January 2025 through election day 2027.

## API / scraping route
TikTok Research API (https://developers.tiktok.com/products/research-api/).

## Auth requirement
- Apply at: https://developers.tiktok.com/products/research-api/
- Requires academic or non-profit research organisation.
- Access to: Query API (video metadata, user info), Comment API.

## Free-tier limits
- No commercial free tier for bulk research.
- Research API: free once approved; rate limits apply (1,000 requests/day default).

## Sample data shape
```json
{
  "schema_version": "1.0",
  "description": "TikTok video metrics for Nigerian political content",
  "collected_at": null,
  "collector": "claude-code-autonomous-run",
  "source_count": 0,
  "data": [
    {
      "video_id": null,
      "creator_username": null,
      "published_at": null,
      "description_snippet": null,
      "view_count": null,
      "like_count": null,
      "comment_count": null,
      "share_count": null,
      "hashtags": [],
      "video_url": null,
      "sources": []
    }
  ]
}
```

## Status
BLOCKED — requires TikTok Research API approval. No data collected as of 2026-05-13.
