# Changelog

## 0.0.1 — Phase 0 + 1 (initial scaffold)

- Plugin manifest with `userConfig.bot_token` (sensitive) and SessionStart deps installer.
- TypeScript MCP server skeleton built on `@discordjs/rest`.
- `discord_whoami` tool — verifies the bot token by fetching `GET /users/@me`.
- Session banner hook surfaces token/active-guild status to the assistant.
- State file at `${CLAUDE_PLUGIN_DATA}/state.json` for non-sensitive config.
