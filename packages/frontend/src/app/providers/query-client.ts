import { QueryClient } from '@tanstack/react-query';
import { QUERY_CLIENT } from './query-client.constants';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: QUERY_CLIENT.STALE_TIME, retry: QUERY_CLIENT.RETRY_COUNT },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
