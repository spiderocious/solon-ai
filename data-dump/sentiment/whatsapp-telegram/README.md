# WhatsApp & Telegram — Sentiment Data

## What we want
- Political message volume and narrative themes from Nigerian political WhatsApp groups and Telegram channels.
- Monitoring of misinformation / disinformation narratives circulating before the 2027 election.

## API / scraping route
- **WhatsApp:** No public API for group monitoring. WhatsApp Business API (Meta) is for business messaging only, not political monitoring.
- **Telegram:** Telegram Bot API can read messages from groups the bot is added to. `telethon` Python library enables scraping public Telegram channels without a bot.

## Auth requirement
- **WhatsApp:** No viable API route. Requires physical device access to WhatsApp groups.
- **Telegram:** Telegram API key from https://my.telegram.org — free, requires phone number.
  - Public channels: scrapable with `telethon`.
  - Private groups: requires membership.

## Free-tier limits
- Telegram API: free, generous rate limits.
- WhatsApp: no viable route.

## Recommended approach
1. Identify major Nigerian political Telegram channels (e.g. APC official, PDP official, candidate channels).
2. Use `telethon` to pull message history from public channels.
3. WhatsApp: rely on academic studies or investigative journalism that has already sampled these networks.

## Sample data shape
```json
{
  "schema_version": "1.0",
  "description": "Telegram channel messages from Nigerian political channels",
  "collected_at": null,
  "collector": "claude-code-autonomous-run",
  "source_count": 0,
  "data": [
    {
      "channel_name": null,
      "channel_url": null,
      "message_date": null,
      "message_snippet": null,
      "views": null,
      "forwards": null,
      "replies": null,
      "sources": []
    }
  ]
}
```

## Status
PARTIALLY BLOCKED — WhatsApp has no viable route. Telegram is collectible with `telethon` + API key (free). No data collected as of 2026-05-13.
