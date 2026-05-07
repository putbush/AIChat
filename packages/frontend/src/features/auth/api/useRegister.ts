import type { AuthTokens, RegistrationDataDTO } from '@aichat/shared';
import { FRONTEND_API_PATHS } from '@shared/constants/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiMutation } from '@shared/api/client';

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials: RegistrationDataDTO) =>
      apiMutation<AuthTokens>(FRONTEND_API_PATHS.AUTH.REGISTER, credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
