import { AvatarUrlResponse } from '@aichat/shared';
import { apiMutation } from '@shared/api/client';
import { FRONTEND_API_PATHS } from '@shared/constants/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: FormData) =>
      apiMutation<AvatarUrlResponse, FormData>(FRONTEND_API_PATHS.USER.UPDATE_AVATAR, payload, {
        method: 'patch',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
