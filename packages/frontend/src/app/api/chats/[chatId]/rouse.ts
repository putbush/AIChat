import { ChatSchema } from '@aichat/shared';
import { requestWithRefresh } from '@shared/api/server';
import { buildApiResponse } from '@shared/api/server/buildApiResponse';
import { BACKEND_API_PATHS } from '@shared/constants/routes';
import { handleApiRoute } from '@shared/lib/handleApiRoute';

type GetChatByIdContext = {
  params: Promise<{
    chatId: string;
  }>;
};

export const GET = async (request: Request, context: GetChatByIdContext) => {
  const { chatId } = await context.params;

  return handleApiRoute(
    async () => {
      const response = await requestWithRefresh(
        {
          method: 'GET',
          url: BACKEND_API_PATHS.CHAT.GET(chatId),
        },
        ChatSchema,
      );
      return response;
    },
    async (response) => await buildApiResponse(response),
  );
};