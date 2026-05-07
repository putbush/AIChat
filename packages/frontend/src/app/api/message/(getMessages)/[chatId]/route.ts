import { MessagesSchema } from '@aichat/shared';
import { requestWithRefresh } from '@shared/api/server';
import { buildApiResponse } from '@shared/api/server/buildApiResponse';
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

  return handleApiRoute(
    async () => {
      const response = await requestWithRefresh(
        {
          method: 'GET',
          url: BACKEND_API_PATHS.MESSAGE.LIST(chatId),
          params: limit ? { limit } : undefined,
        },
        MessagesSchema,
      );
      return response;
    },
    async (response) => await buildApiResponse(response),
  );
};