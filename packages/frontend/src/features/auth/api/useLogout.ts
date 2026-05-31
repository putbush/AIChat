import type { AuthTokens } from '@aichat/shared';
import { FRONTEND_API_PATHS, LINK_PATHS } from '@shared/constants/routes';
import { useQueryClient } from '@tanstack/react-query';
import { apiMutation } from '@shared/api/client';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logout = async () => {
    await apiMutation<AuthTokens>(FRONTEND_API_PATHS.AUTH.LOGOUT);

    queryClient.clear();

    router.push(LINK_PATHS.LOGIN);
    router.refresh();
  };

  return logout;
};
