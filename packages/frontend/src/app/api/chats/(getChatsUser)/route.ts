import { ChatsSchema } from '@aichat/shared';
import { requestWithRefresh } from '@shared/api/server';
import { buildApiResponse } from '@shared/api/server/buildApiResponse';
import { BACKEND_API_PATHS } from '@shared/constants/routes';
import { handleApiRoute } from '@shared/lib/handleApiRoute';

export const GET = async () => {
  return handleApiRoute(
    async () => {
      const response = await requestWithRefresh(
        {
          method: 'GET',
          url: BACKEND_API_PATHS.CHAT.LIST,
        },
        ChatsSchema,
      );
      return response;
    },
    async (response) => await buildApiResponse(response),
  );
};
