import { MessagesPageSchema } from '@aichat/shared';
import { requestWithRefresh } from '@shared/api/server';
import { buildApiResponse } from '@shared/api/server/response/buildApiResponse';
import { API } from '@shared/constants/api';
import { BACKEND_API_PATHS } from '@shared/constants/routes';
import { handleApiRoute } from '@shared/lib/handleApiRoute';

type GetMessagesRouteContext = {
  params: Promise<{
    chatId: string;
  }>;
};

export const GET = async (request: Request, context: GetMessagesRouteContext) => {
  const { chatId } = await context.params;
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get(API.LIMIT);
  const cursor = searchParams.get(API.CURSOR);

  return handleApiRoute(
    async () => {
      const response = await requestWithRefresh(
        {
          method: 'GET',
          url: BACKEND_API_PATHS.MESSAGE.LIST(chatId),
          params: { limit, cursor},
        },
        MessagesPageSchema,
      );
      return response;
    },
    async (response) => await buildApiResponse(response),
  );
};