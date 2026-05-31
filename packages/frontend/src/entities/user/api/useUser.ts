import { useQuery } from '@tanstack/react-query';
import { FRONTEND_API_PATHS } from '@shared/constants/routes';
import type { User } from '@aichat/shared';
import { apiQuery } from '@shared/api/client';

export const useUser = () => {
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: () => apiQuery<User>(FRONTEND_API_PATHS.USER.PROFILE)
  });
};
