import { Chat } from '@aichat/shared';
import { requestWithRefresh } from '@shared/api';
import { buildApiResponse } from '@shared/api/buildApiResponse';
import { handleApiRoute } from '@shared/lib/handleApiRoute';

export const GET = async () => {
  return handleApiRoute<Chat[]>(
    async () => {
      const response = await requestWithRefresh<Chat[]>({
        method: 'GET',
        url: '/chats',
      });
      return response;
    },
    async (response) => await buildApiResponse<Chat[]>(response),
  );
};
