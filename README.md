<div align="center">

# Discord for AI Agents

### Hand Claude a bot token. Get a fully-built Discord server.

Channels, roles, embeds, AutoMod, welcome screens, scheduled events — described in plain English and applied with one tool call. Or hand Claude a one-line brief and watch a whole server materialize.

[![Discord](https://img.shields.io/badge/Join_the_community-Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/babcVNJBet)

[Quick Start](#quick-start) · [Try it](#try-it) · [Discord](https://discord.gg/babcVNJBet)

</div>

---

## Quick Start

**1. Install the plugin** — inside Claude Code, run:

```
/plugin marketplace add JCodesMore/jcodesmore-plugins
/plugin install discord@jcodesmore-plugins
```

No prompts, no restart. Install takes a second.

**2. Run the setup wizard** — type:

```
/discord:setup
```

Claude walks you through creating a Discord bot (or grabbing the token from one you already own), pasting it in, inviting it to a server, and locking in an active guild. The whole thing happens in chat.

**3. That's it.** Talk to Claude like a sysadmin who actually wants to help.

## Try it

Talk to Claude like a friend who happens to know Discord inside-out:

- *"Make me a Magic: The Gathering trading server."* → `/discord:server-from-prompt`
- *"Apply the dev-community template to this server."* → `/discord:apply-template`
- *"Create a #welcome channel under a category called Info, with a topic of 'Read the rules first.'"*
- *"Add a Moderator role with kick and ban perms, blurple color, and grant it to me."*
- *"Drop an embed announcement in #announcements with the stream schedule and a thumbnail."*
- *"Set up an AutoMod rule that blocks invite links for non-mods."*
- *"Configure the welcome screen with three intro channels and a friendly description."*
- *"Schedule a community game night in the Lobby voice channel for next Friday at 7pm."*

The agent figures out which Discord primitives to call, validates inputs, and reports back what changed (and what failed, with Discord's actual error messages).

## What's inside

**52 Discord tools** wrapped in **three skills** and **one agent** — covering channels, roles, messages, embeds, AutoMod, onboarding, welcome screens, scheduled events, members, webhooks, and bulk server templates.

| Capability | Try saying |
|---|---|
| Build a server from a prompt | *"make me a server for [X]"* |
| Apply a starter template | *"apply the gaming-community template"* |
| Channels & categories | *"create a #general channel under Welcome"* |
| Roles & permissions | *"add a Mod role with kick perms and grant it to me"* |
| Messages & embeds | *"send a multi-field embed to #announcements"* |
| AutoMod rules | *"block invite links from non-mods"* |
| Welcome screen | *"set up a welcome screen with rules and intros"* |
| Scheduled events | *"schedule a movie night for Saturday at 8pm"* |
| Members & moderation | *"kick the user named X with reason: spam"* |
| Webhooks | *"create a webhook in #releases and post the changelog"* |
| Anything else | `discord_raw_request` — direct REST escape hatch |

**Bundled server templates:** `gaming-community`, `study-group`, `dev-community`, `content-creator`. Compose your own as a JSON spec or describe what you want and let the architect agent draft one.

## Making a bot

`/discord:setup` walks you through this in chat — these manual steps are here in case you'd rather do it before running the wizard:

1. Go to <https://discord.com/developers/applications> and click **New Application**.
2. Pick a name, accept the ToS, and open the **Bot** tab.
3. Click **Reset Token** → **Yes, do it!** → **Copy** the token. Keep it secret.
4. Optional: turn on **Server Members Intent** under Privileged Gateway Intents if you want member listing. (Not required for most admin tasks.)
5. Run `/discord:setup` in Claude Code and paste the token when asked. If your bot isn't in a server yet, the wizard generates an invite URL with the right permissions — open it in a browser and add the bot to a test server.

For full admin tasks, give the bot **Administrator** permission. You can scope it down later once you know exactly which permissions you need.

## Community

[**Discord**](https://discord.gg/babcVNJBet) — chat, help, show-and-tell · [**Issues**](https://github.com/JCodesMore/discord-for-ai-agents/issues) — bugs & feature requests · [**More plugins**](https://github.com/JCodesMore/jcodesmore-plugins)

<details>
<summary><b>Heads-up: <code>discord_apply_template</code> is create-only</b></summary>

Templates and the architect agent never delete or modify existing entities. Anything matching an existing channel/role/AutoMod rule by name is silently skipped. If you want a clean slate before applying, ask Claude to delete the existing channels first — but only do that on a fresh test guild, never on something with active conversations.

</details>

<details>
<summary><b>Bot token storage</b></summary>

The token you paste during `/discord:setup` is saved to `${CLAUDE_PLUGIN_DATA}/credentials.json` as plaintext JSON — that's a file under your Claude Code plugin data directory. Because you paste it in chat, it also lives in your local Claude Code session history file (the `.jsonl` for this conversation). Active-guild id and a verification timestamp live alongside it in `state.json`.

This is a local-machine trust model: anyone with read access to your home directory can read the token. Don't paste production bot tokens on shared computers. If a token leaks, reset it at <https://discord.com/developers/applications> → your app → **Bot** → **Reset Token** and re-run `/discord:setup`.

If you have a Discord owner account with 2FA enabled, also tick **Bot owner has MFA enabled** in `/plugin` config. Some destructive actions (kick, ban, certain deletes) require the MFA flag in production servers.

</details>

<details>
<summary><b>Advanced install (without the marketplace)</b></summary>

Clone and build it yourself:

```bash
git clone https://github.com/JCodesMore/discord-for-ai-agents.git
cd discord-for-ai-agents
npm install
npm run build
```

Then in Claude Code:

```
/plugin marketplace add file:///<absolute-path-to-repo>
/plugin install discord
```

**Requirements:** Node.js ≥ 18. Bot token from <https://discord.com/developers/applications>.

</details>

<details>
<summary><b>Built on</b></summary>

- [Model Context Protocol SDK](https://modelcontextprotocol.io/) — exposes Discord tools to Claude
- [@discordjs/rest](https://discord.js.org/docs/packages/rest/main) — REST client with rate-limit handling
- [discord-api-types](https://github.com/discordjs/discord-api-types) — typed Discord API routes
- [Zod](https://zod.dev/) — schema validation

</details>

## License

[Apache License 2.0](LICENSE) — © 2026 JCodesMore

> Not affiliated with, endorsed by, or associated with Discord Inc.

---

*Part of [jcodesmore-plugins](https://github.com/JCodesMore/jcodesmore-plugins).*
