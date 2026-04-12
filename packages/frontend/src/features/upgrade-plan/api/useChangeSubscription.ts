import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@shared/api/axios';
import { FRONTEND_API_PATHS } from '@shared/constants/routes';
import type { SubscriptionResponse, SubscriptionType } from '@aichat/shared';

export const useChangeSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (credentials: {
      subscription: SubscriptionType;
    }): Promise<SubscriptionResponse> => {
      const { data } = await apiClient.post<SubscriptionResponse>(
        FRONTEND_API_PATHS.USER.SUBSCRIPTION,
        credentials,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
