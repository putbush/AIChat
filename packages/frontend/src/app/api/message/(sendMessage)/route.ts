import { buildApiStreamResponse, requestStreamWithRefresh } from '@shared/api/server';
import { BACKEND_API_PATHS } from '@shared/constants/routes';
import { handleStreamApiRoute } from '@shared/lib/handleApiRoute';

export const POST = async (req: Request) => {
  return handleStreamApiRoute(
    async () => {
      const body = await req.json();
      const response = await requestStreamWithRefresh({
        method: 'POST',
        url: BACKEND_API_PATHS.MESSAGE.SEND,
        body,
      });
      return response;
    },
    async (response) => await buildApiStreamResponse(response),
  );
};
