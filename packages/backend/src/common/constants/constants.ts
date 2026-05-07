export const REFRESH_TOKEN_COOKIE_NAME = 'refresh_token';

export const CONFIG_KEYS = {
  APP: {
    PORT: 'app.port',
    NODE_ENV: 'app.nodeEnv',
  },
  DATABASE: {
    URL: 'database.url',
  },
  JWT: {
    SECRET: 'jwt.secret',
    ACCESS_TOKEN_TTL: 'jwt.accessTokenTtl',
    REFRESH_TOKEN_TTL: 'jwt.refreshTokenTtl',
    ALGORITHM: 'jwt.algorithm',
  },
  AI: {
    PROVIDER: 'ai.provider',
    GEMINI_API_KEY: 'ai.gemini.apiKey',
  },
} as const;

export const AI_PROVIDERS = {
  GEMINI: 'gemini',
} as const;

export type AiProvider = (typeof AI_PROVIDERS)[keyof typeof AI_PROVIDERS];
