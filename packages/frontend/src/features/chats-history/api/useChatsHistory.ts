import type { Chat } from '@aichat/shared';
import { apiQuery } from '@shared/api/client';
import { FRONTEND_API_PATHS } from '@shared/constants/routes';
import { useQuery } from '@tanstack/react-query';

export const useChatsHistory = () => {
  return useQuery<Chat[]>({
    queryKey: ['chats'],
    queryFn: () => apiQuery<Chat[]>(FRONTEND_API_PATHS.CHAT.LIST),
  });
};
