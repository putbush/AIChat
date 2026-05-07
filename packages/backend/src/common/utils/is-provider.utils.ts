import { AI_PROVIDERS, AiProvider } from '@common/constants';

export const isAiProvider = (value: string): value is AiProvider =>
  Object.values(AI_PROVIDERS).includes(value as AiProvider);
