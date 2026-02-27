'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from './query-client';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={getQueryClient()}>{children}</QueryClientProvider>;
};
