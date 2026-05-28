import { AI_PROVIDERS, type AiProvider } from '../ai.constants';

export const isAiProvider = (value: string): value is AiProvider =>
  Object.values(AI_PROVIDERS).includes(value as AiProvider);
