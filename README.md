<div align="center">

# Discord for AI Agents

### Hand Claude a bot token. Get a fully-built Discord server.

Channels, roles, embeds, AutoMod, welcome screens, scheduled events — described in plain English, applied with one tool call. Built as a Claude Code plugin.

</div>

---

## Status

Early scaffold (v0.0.1). Phase 0 of 10 complete:

- [x] **Phase 0** — repo skeleton, manifest, MCP server boots
- [x] **Phase 1** — `discord_whoami` proves token wiring works
- [ ] Phase 2 — `/discord:setup` wizard + active-guild state
- [ ] Phase 3 — channels & categories
- [ ] Phase 4 — roles & permissions
- [ ] Phase 5 — messages & embeds
- [ ] Phase 6 — AutoMod, onboarding, welcome screen, scheduled events
- [ ] Phase 7 — members, webhooks, raw-request escape hatch
- [ ] Phase 8 — server-template macro
- [ ] Phase 9 — `discord-architect` agent + `/discord:server-from-prompt`
- [ ] Phase 10 — polish, docs, marketplace listing

## Quick Start (developer install)

This plugin isn't on a marketplace yet. To try it locally:

```bash
git clone <this-repo>
cd discord-for-ai-agents
npm install
npm run build
```

Then in Claude Code:

```
/plugin marketplace add file:///<absolute-path-to-repo>
/plugin install discord
```

When prompted, paste your Discord bot token (create one at https://discord.com/developers/applications). Restart Claude Code so the MCP server picks up the token, then ask:

> *"Verify my Discord bot is working."*

Claude will call `discord_whoami` and report the bot's username and ID.

## Built on

- [Model Context Protocol SDK](https://modelcontextprotocol.io/) — exposes Discord tools to Claude
- [@discordjs/rest](https://discord.js.org/docs/packages/rest/main) — REST client with rate-limit handling
- [discord-api-types](https://github.com/discordjs/discord-api-types) — typed Discord API routes
- [Zod](https://zod.dev/) — schema validation

## License

[Apache License 2.0](LICENSE) — © 2026 JCodesMore
