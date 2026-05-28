import type { MessagesPage } from '@aichat/shared';
import { FRONTEND_API_PATHS } from '@shared/constants/routes';
import { useInfiniteQuery } from '@tanstack/react-query';
import { LIMIT_MESSAGES } from '@entities/chat/constants';
import { apiQuery } from '@shared/api/client';

export const useGetMessages = (chatId: string, limit = LIMIT_MESSAGES) => {
  return useInfiniteQuery({
    queryKey: [chatId],
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) =>
      apiQuery<MessagesPage>(FRONTEND_API_PATHS.MESSAGE.LIST(chatId), {
        limit,
        cursor: pageParam,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: Boolean(chatId),
  });
};
