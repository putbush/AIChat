import type { AuthResponse, LoginDataDTO } from '@aichat/shared';
import { apiClient } from '@shared/api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (credentials: LoginDataDTO): Promise<AuthResponse> => {
      try {
        const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials);
        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          throw new Error('Invalid email or password. Please try again.');
        }
        throw new Error('An unexpected error occurred. Please try again later.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
