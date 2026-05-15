# Twitter / X — Sentiment Data

## What we want
- Tweets mentioning major 2027 candidates, parties (APC, PDP, LP, NNPP, etc.), and political keywords in Nigerian English, Pidgin, Yoruba, Igbo, and Hausa.
- Daily volume per keyword/candidate, sentiment polarity, top retweeted posts.
- Timeline: January 2025 through election day 2027.

## API / scraping route
Twitter API v2 (Search endpoint: `GET /2/tweets/search/recent` and `GET /2/tweets/search/all` for full archive).

## Auth requirement
- Apply at: https://developer.twitter.com/en/portal/dashboard
- Required tier: **Basic** (free) gives 1 million tweets/month read; **Pro** ($5,000/month) gives full-archive search.
- For a research dataset this size, apply for the **Academic Research** product track (free but requires application).

## Free-tier limits
- Free tier: 1 request/15 min, 10 tweets/request — inadequate for this dataset.
- Basic tier: 100 requests/15 min, 100 tweets/request.

## Sample data shape
```json
{
  "schema_version": "1.0",
  "description": "Daily Twitter volume and sentiment for 2027 election keywords",
  "collected_at": null,
  "collector": "claude-code-autonomous-run",
  "source_count": 0,
  "data": [
    {
      "date": "2026-01-01",
      "keyword": "Tinubu 2027",
      "tweet_count": null,
      "retweet_count": null,
      "sentiment_positive_pct": null,
      "sentiment_negative_pct": null,
      "sentiment_neutral_pct": null,
      "top_tweet_url": null,
      "sources": []
    }
  ]
}
```

## Status
BLOCKED — requires API key. No data collected as of 2026-05-13.
