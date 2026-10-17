# selectic-mcp

MCP connector for [Selectic](https://selectic.ai) — give your AI assistant (Claude, ChatGPT, Perplexity, or any MCP-compatible app) the ability to **call, text, and email businesses** for you: get quotes, book appointments, ask questions — and read back the transcript, recording, and replies. New accounts start with **$2 free**. US businesses for now.

Most apps can add the hosted endpoint directly as a custom connector:

```
https://selectic.ai/api/mcp
```

You'll be prompted to **sign in (OAuth)** the first time — no API key to manage. For stdio-only clients (e.g. Claude Desktop), this package bridges stdio ↔ the hosted endpoint.

## Use

```bash
npx -y @selectic/mcp@latest
```

It opens a browser the first time so you can sign in to Selectic.

Claude Desktop (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "selectic": {
      "command": "npx",
      "args": ["-y", "@selectic/mcp@latest"]
    }
  }
}
```

## Tools
`place_call`, `get_call`, `send_sms`, `send_email`, `get_replies`, `list_outreach`, `list_call_types`. See https://selectic.ai/docs.

## Optional: find businesses before contacting them

Pair Selectic with [Parallel Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp)
to find businesses on the web and read their sites before deciding who to contact.
Parallel provides free web search (Fast mode) and page fetching without a Parallel
account or API key, subject to free-tier rate limits. Selectic still requires its
own browser sign-in and funds to place calls or send messages; see [Selectic's docs](https://selectic.ai/docs).

For Claude Desktop, add `parallel-search` to the existing `mcpServers` object in
`claude_desktop_config.json`, keeping your other servers. The combined setup is:

```json
{
  "mcpServers": {
    "selectic": {
      "command": "npx",
      "args": ["-y", "@selectic/mcp@latest"]
    },
    "parallel-search": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://search.parallel.ai/mcp",
        "--header",
        "User-Agent: selectic-mcp"
      ]
    }
  }
}
```

Use Node.js 20.18.1 or newer with `npx` for this companion setup. Restart Claude
Desktop after saving, then check that `parallel-search` offers `web_search` and
`web_fetch` alongside Selectic's tools.

For example, ask:

> Use Parallel to find three plumbers serving Austin, Texas. Read their official
> sites to verify service areas and business phone numbers. Show a shortlist with
> source links and any details you couldn't verify. Do not contact anyone yet.

After reviewing the shortlist, choose the businesses and tell Selectic what to ask,
for example: "Use Selectic to call the first business at the verified number and
ask whether they can repair a leaking faucet this week. Do not book an appointment."
Use this for legitimate, user-directed contact with US businesses, as described in
[Selectic's usage guidance](https://selectic.ai/docs).
