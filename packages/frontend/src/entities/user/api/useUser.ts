import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@shared/api/client/axios';
import { FRONTEND_API_PATHS } from '@shared/constants/routes';
import type { User } from '@aichat/shared';

export const useUser = () => {
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: async (): Promise<User> => {
      const { data } = await apiClient.get<User>(FRONTEND_API_PATHS.USER.PROFILE);
      return data;
    },
  });
};
