import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@shared/api/axios';
import type { User } from '@aichat/shared';

export const useUser = () => {
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: async (): Promise<User> => {
      const { data } = await apiClient.get<User>('/user/profile');
      return data;
    },
  });
};
