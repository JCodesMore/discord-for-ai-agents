# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.1.0] - 2026-05-04

First public release. Hand Claude a Discord bot token, get a fully-administered server.

### Added

**Setup & state**
- `userConfig.bot_token` (sensitive) — token captured at install via Claude Code's keychain-backed prompt.
- `userConfig.mfa_enabled` flag for accounts with 2FA.
- `${CLAUDE_PLUGIN_DATA}/state.json` for non-sensitive state (active guild id, last verified timestamp).
- `SessionStart` hooks: `ensure-deps.mjs` installs runtime deps lazily; `session-banner.mjs` surfaces token + active-guild status to the assistant on every session.
- `/discord:setup` skill — interactive wizard: verifies token, lists bot's guilds, generates an OAuth2 invite URL when needed, sets the active guild.

**MCP tools (51 total)**
- `discord_whoami` — prove the bot token works.
- Guild setup: `discord_list_guilds`, `discord_set_active_guild`, `discord_get_active_guild`, `discord_get_invite_url`.
- Channels: `discord_list_channels`, `discord_create_channel` (text/voice/forum/stage/category/announcement), `discord_modify_channel`, `discord_delete_channel`, `discord_modify_channel_positions`.
- Roles: `discord_list_roles`, `discord_create_role`, `discord_modify_role`, `discord_delete_role`, `discord_modify_role_positions`, `discord_assign_role`, `discord_remove_role`, `discord_set_channel_permission_overwrite`.
- Messages & embeds: `discord_send_message`, `discord_send_embed`, `discord_edit_message`, `discord_delete_message`, `discord_add_reaction`, `discord_pin_message`.
- AutoMod: `discord_list_automod_rules`, `discord_create_automod_rule` (keyword / keyword_preset / spam / mention_spam / member_profile triggers), `discord_modify_automod_rule`, `discord_delete_automod_rule`.
- Onboarding: `discord_get_onboarding`, `discord_modify_onboarding`.
- Welcome screen: `discord_get_welcome_screen`, `discord_modify_welcome_screen`.
- Scheduled events: `discord_list_scheduled_events`, `discord_create_scheduled_event`, `discord_modify_scheduled_event`, `discord_delete_scheduled_event`.
- Guild settings: `discord_get_guild`, `discord_modify_guild_settings`.
- Members: `discord_list_members`, `discord_get_member`, `discord_modify_member`, `discord_kick_member`, `discord_ban_member`, `discord_unban_member`.
- Webhooks: `discord_list_webhooks`, `discord_create_webhook`, `discord_send_via_webhook`, `discord_delete_webhook`.
- `discord_raw_request` — escape hatch for any REST endpoint not yet wrapped, plus forward-compat with new Discord API releases.

**Templates & macros**
- `discord_apply_template` macro — bulk-creates roles, categories, channels, welcome screen, AutoMod rules, and scheduled events from a single JSON spec. Idempotent: anything matching by name is skipped, never overwritten. Cross-references resolved by name (case-insensitive).
- `discord_list_templates` — discover bundled starter templates.
- Bundled templates: `gaming-community`, `study-group`, `dev-community`, `content-creator`.
- `/discord:apply-template` skill — pick a template (or paste a custom spec), optional dry-run preview, apply on confirmation.

**Server-from-prompt**
- `discord-architect` sub-agent — translates a natural-language brief ("make me a Magic: The Gathering trading server") into a structured template spec, dry-runs it, asks for approval via `AskUserQuestion`, then applies. Restricted to four tools (`discord_get_active_guild`, `discord_list_templates`, `discord_apply_template`, `AskUserQuestion`) so it can't bypass the macro.
- `/discord:server-from-prompt` skill — thin orchestrator that confirms the active guild and spawns the architect.

### Built on

- [@modelcontextprotocol/sdk](https://modelcontextprotocol.io/) for tool exposure
- [@discordjs/rest](https://discord.js.org/docs/packages/rest/main) — REST client with built-in rate-limit handling
- [discord-api-types](https://github.com/discordjs/discord-api-types) — typed REST routes
- [zod](https://zod.dev/) for input validation
