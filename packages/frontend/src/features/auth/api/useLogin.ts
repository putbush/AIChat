import type { AuthTokens, LoginDataDTO } from '@aichat/shared';
import { FRONTEND_API_PATHS } from '@shared/constants/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiMutation } from '@shared/api/client';

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials: LoginDataDTO) =>
      apiMutation<AuthTokens>(FRONTEND_API_PATHS.AUTH.LOGIN, credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
