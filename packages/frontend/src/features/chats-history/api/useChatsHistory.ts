import type { Chat } from '@aichat/shared';
import { apiClient } from '@shared/api/axios';
import { FRONTEND_API_PATHS } from '@shared/constants/routes';
import { useQuery } from '@tanstack/react-query';


export const useChatsHistory = () => {
  return useQuery<Chat[]>({
    queryKey: ['chatsHistory'],
    queryFn: async (): Promise<Chat[]> => {
      const { data } = await apiClient.get(FRONTEND_API_PATHS.CHATS.LIST);
      return Array.isArray(data) ? data : [];
    },
  });
};
