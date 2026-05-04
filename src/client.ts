import { REST } from '@discordjs/rest';

const TOKEN_ENV = 'CLAUDE_PLUGIN_OPTION_BOT_TOKEN';

let cachedRest: REST | null = null;
let cachedTokenSignature: string | null = null;

export class MissingTokenError extends Error {
  constructor() {
    super(
      'Discord bot token is not configured. The user should open `/plugin`, find **discord**, and set the **Discord Bot Token** field. They can create a bot at https://discord.com/developers/applications.',
    );
    this.name = 'MissingTokenError';
  }
}

export function getBotToken(): string {
  const raw = process.env[TOKEN_ENV];
  const token = (raw ?? '').trim();
  if (!token) throw new MissingTokenError();
  return token;
}

export function hasBotToken(): boolean {
  return !!(process.env[TOKEN_ENV] ?? '').trim();
}

export function getRest(): REST {
  const token = getBotToken();
  if (cachedRest && cachedTokenSignature === token) return cachedRest;
  cachedRest = new REST({ version: '10' }).setToken(token);
  cachedTokenSignature = token;
  return cachedRest;
}

export function isMfaEnabled(): boolean {
  const v = (process.env.CLAUDE_PLUGIN_OPTION_MFA_ENABLED ?? '').trim().toLowerCase();
  return v === 'true' || v === '1' || v === 'yes';
}

export interface DiscordApiError {
  status?: number;
  code?: number;
  message?: string;
  rawError?: unknown;
}

export function formatDiscordError(err: unknown): string {
  const e = err as DiscordApiError & { name?: string };
  if (e?.name === 'MissingTokenError' && e?.message) return e.message;
  const status = e?.status ? ` (HTTP ${e.status})` : '';
  const code = e?.code ? ` [code ${e.code}]` : '';
  const msg = e?.message ?? String(err);
  return `Discord API error${status}${code}: ${msg}`;
}
