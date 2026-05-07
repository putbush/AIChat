import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FRONTEND_API_PATHS } from '@shared/constants/routes';
import type { SubscriptionResponse, SubscriptionType } from '@aichat/shared';
import { apiMutation } from '@shared/api/client';

export const useChangeSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { subscription: SubscriptionType }) => apiMutation<SubscriptionResponse>(FRONTEND_API_PATHS.USER.SUBSCRIPTION, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
