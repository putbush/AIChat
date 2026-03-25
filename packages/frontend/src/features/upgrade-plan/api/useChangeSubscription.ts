import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@shared/api/axios';
import type { SubscriptionType } from '@aichat/shared';

export const useChangeSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (credentials: {
      subscription: SubscriptionType;
    }): Promise<SubscriptionType> => {
      const { data } = await apiClient.post<SubscriptionType>('/user/subscription', credentials);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
