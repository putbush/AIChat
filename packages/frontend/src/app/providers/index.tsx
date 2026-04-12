'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from './query-client';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <AntdRegistry>{children}</AntdRegistry>
    </QueryClientProvider>
  );
};
