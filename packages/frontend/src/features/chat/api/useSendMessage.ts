import type { CreateMessage, Message } from '@aichat/shared';
import { FRONTEND_API_PATHS } from '@shared/constants/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiMutation } from '@shared/api/client';

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateMessage) =>
      apiMutation<Message>(FRONTEND_API_PATHS.MESSAGE.SEND, payload),
    onSuccess: (message: Message) => {
      queryClient.invalidateQueries({ queryKey: [message.chatId] });
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });
};
