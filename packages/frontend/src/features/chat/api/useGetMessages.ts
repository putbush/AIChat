import type { Message } from '@aichat/shared';
import { FRONTEND_API_PATHS } from '@shared/constants/routes';
import { useQuery } from '@tanstack/react-query';
import { LIMIT_MESSAGES } from '@entities/chat/constants';
import { apiQuery } from '@shared/api/client';

export const useGetMessages = (chatId: string, limit?: number) => {
  const effectiveLimit = limit ?? LIMIT_MESSAGES;

  return useQuery({
    queryKey: [chatId],
    queryFn: () => apiQuery<Message[]>(FRONTEND_API_PATHS.MESSAGE.LIST(chatId), { limit: effectiveLimit }),
    enabled: Boolean(chatId),
  });
};
