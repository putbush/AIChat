import type { Chat } from '@aichat/shared';
import { apiClient } from '@shared/api/axios';
import { useQuery } from '@tanstack/react-query';


export const useChatsHistory = () => {
  return useQuery<Chat[]>({
    queryKey: ['chatsHistory'],
    queryFn: async (): Promise<Chat[]> => {
      const { data } = await apiClient.get('/chats');
      return data;
    },
  });
};
