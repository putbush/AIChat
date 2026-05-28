export const AI_PROVIDERS = {
  GEMINI: 'gemini',
} as const;

export type AiProvider = (typeof AI_PROVIDERS)[keyof typeof AI_PROVIDERS];
