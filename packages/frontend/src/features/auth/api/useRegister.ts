import type { AuthResponse, RegistrationDataDTO } from '@aichat/shared';
import { apiClient } from '@shared/api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (credentials: RegistrationDataDTO): Promise<AuthResponse> => {
      try {
        const { data } = await apiClient.post<AuthResponse>('/auth/register', credentials);
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
