import { Chat, ChatsSchema } from '@aichat/shared';
import { requestWithRefresh } from '@shared/api';
import { buildApiResponse } from '@shared/api/buildApiResponse';
import { BACKEND_API_PATHS } from '@shared/constants/routes';
import { handleApiRoute } from '@shared/lib/handleApiRoute';

export const GET = async () => {
  return handleApiRoute<Chat[]>(
    async () => {
      const response = await requestWithRefresh(
        {
          method: 'GET',
          url: BACKEND_API_PATHS.CHATS.LIST,
        },
        ChatsSchema,
      );
      return response;
    },
    async (response) => await buildApiResponse<Chat[]>(response),
  );
};
