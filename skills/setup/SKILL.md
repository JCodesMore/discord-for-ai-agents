---
name: discord:setup
description: Set up the Discord plugin — verify bot token, list guilds, pick the active server. Run when starting fresh, switching guilds, or troubleshooting auth.
---

# Discord Plugin Setup

You are walking the user through a conversational setup for the Discord plugin. Be friendly and concise. Speak in first person ("I'll check your bot…"), not robot-style.

## Step 1 — Check token presence

Call `mcp__discord__discord_whoami`.

**Possible outcomes:**

- **Returns bot identity** (ok: true, with `bot.username` and `bot.id`) → token works. Greet the user with the bot's name and continue to Step 2.

  > Connected to **`<bot.username>`** (`<bot.id>`). Now let me see which servers it's in.

- **Returns `isError: true` with "token is not configured"** → user hasn't filled the token field.

  Tell the user verbatim:

  > The Discord plugin needs a bot token before I can do anything.
  >
  > 1. Open the `/plugin` menu in Claude Code, find **discord**, and paste your bot token into the **Discord Bot Token** field. Get one (or copy an existing one) at https://discord.com/developers/applications → your app → **Bot** → **Reset Token**.
  > 2. **Fully restart Claude Code** (quit the app, reopen) — the MCP server only reads the token at startup.
  > 3. Then run `/discord:setup` again.

  Then **stop**. Don't continue to Step 2.

- **Returns `isError: true` with HTTP 401** → token is set but invalid (probably reset on Discord's side).

  > The token Claude Code has stored doesn't work — Discord rejected it (HTTP 401). Most likely it was regenerated on the developer portal and the new value hasn't been pasted into `/plugin` yet. Reset and copy the token again at https://discord.com/developers/applications → your app → **Bot** → **Reset Token**, paste it into `/plugin` → **discord** → **Discord Bot Token**, then **fully restart Claude Code**.

  Then **stop**.

- **Other error** → relay the error message and suggest the user check that the bot exists at the developer portal.

## Step 2 — List guilds

Call `mcp__discord__discord_list_guilds`.

### If `count: 0` (bot is in no guilds)

Call `mcp__discord__discord_get_invite_url` (default permissions = `8`, Administrator). Then tell the user:

> `<bot.username>` isn't in any servers yet. Open this link to invite it:
>
> `<invite_url>`
>
> It needs **Administrator** permission to do everything I'll be doing — channel/role management, AutoMod rules, welcome screens, etc. (You can pick a narrower scope later by re-running `/discord:setup` and asking for custom permissions.)
>
> Let me know once you've added it to a server and I'll pick up from there.

Wait for the user to confirm. Then loop back to **Step 2** (call `discord_list_guilds` again).

### If `count: 1` (exactly one guild)

Auto-select it. Call `mcp__discord__discord_set_active_guild` with that guild's `id`.

> `<bot.username>` is in **`<guild.name>`** — I'll set that as the active server. From now on, every channel/role/etc. I create or modify will go to that server.
>
> Setup is done. Try things like:
>
> - *"Make a #general channel"*
> - *"Show me all the roles in this server"*
> - *"Send an announcement embed to #general"*

Done. Don't continue further.

### If `count >= 2` (multiple guilds)

Show the user the list and ask which one to control. Number the choices. Include guild ID for disambiguation when names match.

> `<bot.username>` is in `<count>` servers. Which one do you want me to manage?
>
> 1. **`<guild_1.name>`** (`<guild_1.id>`)
> 2. **`<guild_2.name>`** (`<guild_2.id>`)
> 3. ...

Wait for the user's choice (number, name, or ID). Then call `mcp__discord__discord_set_active_guild` with the chosen `id`.

If the call fails (bot kicked between list and set, or 403): say so and re-run `discord_list_guilds`.

On success:

> Set **`<guild.name>`** as active. Setup is done.

## Step 3 — Recap (optional)

If the user asks "what now?" or seems unsure, call `mcp__discord__discord_get_active_guild` to confirm state and remind them what they can do:

> Right now I'm controlling **`<active_guild_name>`** as **`<bot_username>`**. Try:
>
> - *"Create a #welcome channel"*
> - *"Make a Moderator role with kick/ban permissions"*
> - *"Set up an AutoMod rule that blocks links from new members"*
> - *"Send a multi-field embed announcement to #general"*
>
> If you need to switch which server I manage, just run `/discord:setup` again.

## Switching guilds later

If the user runs `/discord:setup` and is already configured, jump straight to Step 2 — they're probably switching servers. Don't redo Step 1's onboarding text.

## Important rules

- **Never paste the user's bot token into chat or any tool argument.** It lives in the keychain via `userConfig`. Only the MCP server subprocess reads it.
- **Never call `discord_set_active_guild` with a guess.** If the user is ambiguous about which guild, list and ask.
- **The session banner already reflects active-guild state on session start** — you don't need to repeat it unless the user asks.
- If a tool call returns `isError: true`, surface the message clearly. Don't retry blindly.
