# selectic-mcp

MCP connector for [Selectic](https://selectic.ai) — give Claude or ChatGPT the ability to **call, text, and email businesses** for you (get a price, book a slot, ask a question) and read back the transcript, recording, and replies.

Most clients can use the hosted endpoint directly (`https://selectic.ai/api/mcp`, `Authorization: Bearer <key>`). For stdio-only clients (e.g. Claude Desktop), this package bridges stdio ↔ the hosted endpoint.

## Use

Get an API key at https://selectic.ai/dashboard, then:

```bash
SELECTIC_API_KEY=slc_your_key npx selectic-mcp
```

Claude Desktop (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "selectic": {
      "command": "npx",
      "args": ["-y", "selectic-mcp"],
      "env": { "SELECTIC_API_KEY": "slc_your_key" }
    }
  }
}
```

## Tools
`place_call`, `get_call`, `send_sms`, `send_email`, `get_replies`, `list_outreach`. See https://selectic.ai/docs.
