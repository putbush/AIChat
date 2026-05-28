import { useMutation, useQueryClient } from '@tanstack/react-query';
import { streamMessage } from './streamMessage';

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: streamMessage,
    onSuccess: (_answer, variables) => {
      const chatId = variables.payload.chatId;

      if (chatId) {
        queryClient.invalidateQueries({ queryKey: [chatId] });
      }

      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });
};
