import type { AuthTokens, RegistrationDataDTO } from '@aichat/shared';
import { apiClient } from '@shared/api/axios';
import { FRONTEND_API_PATHS } from '@shared/constants/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (credentials: RegistrationDataDTO): Promise<AuthTokens> => {
      try {
        const { data } = await apiClient.post<AuthTokens>(
          FRONTEND_API_PATHS.AUTH.REGISTER,
          credentials,
        );
        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 409) {
          throw new Error('Email already in use. Please choose a different email.');
        }
        throw new Error('An unexpected error occurred. Please try again later.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
