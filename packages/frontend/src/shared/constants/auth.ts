export const TOKEN_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

export const TOKENS_TTL = {
  ACCESS_TOKEN: 60 * 60 * 2, // 2 hours in seconds
  REFRESH_TOKEN: 60 * 60 * 24 * 30, // 30 days in seconds
} as const;